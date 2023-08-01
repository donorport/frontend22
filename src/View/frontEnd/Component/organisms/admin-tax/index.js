// import { LadderMenuXp, AdminTaxTable } from "@components/organisms";
// import LadderMenuXp from '../ladder-menu-xp';
import LadderMenu from '../ladder-menu';
import AdminTaxTable from '../admin-tax-table';
import './style.scss';
import organizationApi from '../../../../../Api/frontEnd/organization';
import { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import ToastAlert from '../../../../../Common/ToastAlert';
import moment from 'moment';
import CSVExportBtn from '../../../CSVExportBtn';

const AdminTax = () => {
  const [data, setData] = useOutletContext();
  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  const type = localStorage.getItem('type');
  const tempCampaignAdminAuthToken = localStorage.getItem('tempCampaignAdminAuthToken');
  const token = type
    ? type === 'temp'
      ? tempCampaignAdminAuthToken
      : CampaignAdminAuthToken
    : CampaignAdminAuthToken;
  const [taxList, setTaxList] = useState([]);
  const [activeKey, setActiveKey] = useState(0);
  const [activeYear, setActiveYear] = useState(2023);
  const [loading, setLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecord, setTotalRecord] = useState(0);
  const [update, setUpdate] = useState(false);
  const [sortField, setSortField] = useState('created_at');
  const [order, setOrder] = useState('asc');
  const [csvData, setCsvData] = useState([]);

  const headers = [
    { label: 'Date', key: 'date' },
    { label: 'Amount', key: 'amount' },
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Type', key: 'type' },
    { label: 'Address', key: 'address' },
    { label: 'Products', key: 'products' }
  ];

  const getProductsName = (products) => {
    let pr = '';
    if (products.length > 0) {
      products.map((p, i) => {
        if (p.type === 'Purchased') {
          pr += i + 1 + ') ' + p.orderItemDetails?.productName + ' ';
        } else {
          pr += i + 1 + ') ' + 'Donate' + ' ';
        }
      });
    }
    return pr;
  };

  const getTaxList = async (page, field, type, year) => {
    let formData = {};
    formData.pageNo = page;
    formData.sortField = field;
    formData.sortType = type;
    formData.organizationId = data._id;
    formData.isAll = false;
    formData.year = year;
    formData.uploadYear = year;

    const LOGGING_time = Date.now();
    console.log('~~ getTaxList start fetch:', LOGGING_time)
    const taxListResponse = await organizationApi.organizatationTaxlist(token, formData); // this takes 12 seconds!!!!!! 12223ms
    console.log('~~ getTaxList end fetch:', {now: Date.now(), difference: Date.now() - LOGGING_time})
    console.log('should have taxListResponse.data.success && taxListResponse.data = {data, totalPages, totalRecord, ...}:', {taxListResponse});

    if (taxListResponse.data.success === true) {
      setTaxList(taxListResponse.data.data); // an array of arrays
      setTotalPages(taxListResponse.data.totalPages);
      setTotalRecord(taxListResponse.data.totalRecord);

      if (taxListResponse.data.allData.length <= 0) {
        setCsvData([]);
        return;
      }

      console.log('preparing taxListResponse...');
      let tempAr = taxListResponse.data.allData.map((v) => {
        console.log(v);
        let tempObj = {};
        tempObj.date = moment(v.created_at).format('DD MMMM YY');
        tempObj.amount = v[0].currencySymbol + totalVal(v);
        tempObj.name = v[0].userDetails?.name;
        tempObj.email = v[0].userDetails?.email;
        tempObj.type = v[0].type;
        tempObj.address =
          v[0].userDetails.street +
          ' , ' +
          v[0].userDetails.cityDetails[0]?.city +
          ' , ' +
          v[0].userDetails.stateDetails[0]?.state +
          ' ' +
          v[0].userDetails.zip +
          ' , ' +
          v[0].userDetails.countryDetails[0]?.country;
        // if (v.type === 'Purchased') {
        tempObj.products = getProductsName(v);

        // } else {
        //   tempObj.products = ' - '
        // }

        // console.log(v)
        return tempObj;
      });

      setCsvData(tempAr);
      // done(true);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (!data._id) return; // prevent the initial empty wasted fetch
      // WARNING: if no data._id, this will forever show the loading state!
      // BUT if you're on this page, you should have a data._id so it should be fine
      await getTaxList(pageNo, sortField, order, activeYear);
      setLoading(false);
    })();
  }, [data._id, update]);

  const uploadImage = async (e, orderId, email, name, userId) => {
    let file = e.target.files[0] ? e.target.files[0] : '';

    let fdata = {};
    fdata.image = file;
    fdata.orderId = orderId;
    fdata.email = email;
    fdata.name = name;
    fdata.organizationName = data.name;
    fdata.organizationCountryId = data.country_id;
    fdata.userId = userId;
    fdata.uploadYear = Number(activeYear);

    setLoading(true);
    const uploadTax = await organizationApi.organizatationTaxUpload(token, fdata);
    if (uploadTax) {
      if (uploadTax.data.success === false) {
        setLoading(false);
        ToastAlert({ msg: uploadTax.data.message, msgType: 'error' });
      } else {
        setUpdate(!update);
        setLoading(false);
        ToastAlert({ msg: uploadTax.data.message, msgType: 'success' });
      }
    } else {
      setLoading(false);
      ToastAlert({ msg: 'something Went wrong', msgType: 'error' });
    }
  };

  const deleteReceipt = async (userId) => {
    setLoading(true);
    const uploadTax = await organizationApi.organizatationDeleteTaxReceipt(
      token,
      userId,
      Number(activeYear)
    );
    if (uploadTax) {
      if (uploadTax.data.success === false) {
        ToastAlert({ msg: uploadTax.data.message, msgType: 'error' });
        setLoading(false);
      } else {
        setUpdate(!update);
        ToastAlert({ msg: uploadTax.data.message, msgType: 'success' });
        setLoading(false);
      }
    } else {
      ToastAlert({ msg: 'something Went wrong', msgType: 'error' });
      setLoading(false);
    }
  };

  const handleClick = async (e, v) => {
    setPageNo(Number(v));
    setLoading(true);
    await getTaxList(Number(v), sortField, order, activeYear);
    setLoading(false);
  };

  const totalVal = (data) => {
    let tempSub = [];
    let sum;
    if (data.length > 0) {
      data.map((i) => {
        tempSub.push(i.amount);
      });
      sum = tempSub.reduce(function (a, b) {
        return a + b;
      }, 0);
    } else {
      sum = 0;
    }
    return sum;
  };

  const handleSortingChange = async (accessor) => {
    const sortOrder = accessor === sortField && order === 'asc' ? 'desc' : 'asc';
    setSortField(accessor);
    setOrder(sortOrder);
    setLoading(true);
    await getTaxList(pageNo, accessor, sortOrder, activeYear);
    setLoading(false);
  };

  const onChangeFilterOption = async (e, v) => {
    setLoading(true);
    setActiveYear(v);
    setActiveKey(e);
    await getTaxList(pageNo, sortField, order, v);
    setLoading(false);
  };
  return (
    <>
      <header className="py-sm-2 pb-2 w-100 d-flex align-items-center">
        <div className="me-sm-2 flex-grow-1 mb-3 mb-sm-0">
          <div className="d-flex align-items-center mb-1">
            <h1 className="d-none d-sm-flex page__title fs-3 fw-bolder mb-0">Tax Receipts</h1>
            <span className="d-none d-sm-flex text-light fs-5 ml-2 ms-2">({totalRecord})</span>
          </div>
          <p className="d-none d-sm-block fs-5 text-light">
            Tax receipts uploaded here will be encrypted and sent directly to the donor's profile
            where they will be able to view & download.
          </p>
        </div>
        <div className="d-flex align-items-center ms-sm-auto">
          <LadderMenu loading={loading} activeKey={activeKey} onChangeFilterOption={onChangeFilterOption} />
        </div>
        {/*  <div className="d-flex align-items-center me-sm-2 flex-grow-1 mb-3 mb-sm-0">
          <h1 className="d-none d-sm-flex page__title mb-0 fs-3 fw-bolder me-2">Tax</h1>
          <span className="d-none d-sm-flex text-light fs-5 ml-2">({totalRecord})</span>
        </div>
        <div className="ms-sm-auto d-flex">
          {taxList.length > 0 && (
            <CSVExportBtn headers={headers} csvData={csvData} label="Download CSV" prifix="_tax" />
          )}
        </div>*/}
      </header>

      <AdminTaxTable
        taxList={taxList}
        uploadImage={uploadImage}
        totalPages={totalPages}
        totalRecord={totalRecord}
        pageNo={pageNo}
        loading={loading}
        deleteReceipt={deleteReceipt}
        handleClick={handleClick}
        handleSortingChange={handleSortingChange}
        order={order}
        sortField={sortField}
        headers={headers}
        activeYear={activeYear}
      />
      {/* <Button variant="info" size="lg" className='me-2 flex__1'>Download CSV</Button> */}
      {taxList.length > 0 && (
        <div className="mt-5 mb-5">
          <CSVExportBtn headers={headers} csvData={csvData} label="Download CSV" prifix="_tax" />
        </div>
      )}
    </>
  );
};

export default AdminTax;
