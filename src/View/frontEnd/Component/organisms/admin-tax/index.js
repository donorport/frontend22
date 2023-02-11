import { Button } from 'react-bootstrap';
// import { LadderMenuXp, AdminTaxTable } from "@components/organisms";
// import LadderMenuXp from '../ladder-menu-xp';
import LadderMenu from '../ladder-menu';
import AdminTaxTable from '../admin-tax-table';
import './style.scss';
import organizationApi from '../../../../../Api/frontEnd/organization';
import { useState, useEffect } from 'react';
import FrontLoader from '../../../../../Common/FrontLoader';
import { Outlet, Link, useLocation, useOutletContext } from 'react-router-dom';
import ToastAlert from '../../../../../Common/ToastAlert';
import { CSVLink, CSVDownload } from 'react-csv';
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
  const [activeYear, setActiveYear] = useState('Show All');
  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecord, setTotalRecord] = useState(1);
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

    const taxList = await organizationApi.organizatationTaxlist(token, formData);
    if (taxList.data.success === true) {
      setTaxList(taxList.data.data);
      setTotalPages(taxList.data.totalPages);
      setTotalRecord(taxList.data.totalRecord);

      if (taxList.data.allData.length > 0) {
        let tempAr = [];
        taxList.data.allData.map((v, k) => {
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
          tempAr.push(tempObj);
        });
        setCsvData(tempAr);
        // done(true);
      } else {
        setCsvData([]);
      }
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
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
    setLoading(false);
    const uploadTax = await organizationApi.organizatationDeleteTaxReceipt(token, userId);
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

  const handleClick = async (e, v) => {
    setPageNo(Number(v));
    await getTaxList(Number(v), sortField, order, activeYear);
  };

  const totalVal = (data) => {
    let tempSub = [];
    let sum;
    if (data.length > 0) {
      data.map((i, k) => {
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
    await getTaxList(pageNo, accessor, sortOrder, activeYear);
  };

  const onChangeFilterOption = async (e, v) => {
    await getTaxList(pageNo, sortField, order, v);
    setActiveYear(v);
    setActiveKey(e);
  };
  console.log('helllo');
  return (
    <>
      {/*<FrontLoader loading={loading} />*/}
      <header className="py-sm-2 pb-2 w-100 d-flex align-items-center">
        <div className="me-sm-2 flex-grow-1 mb-3 mb-sm-0">
          <div className="d-flex align-items-center mb-1">
            <h1 className="d-none d-sm-flex page__title fs-3 fw-bolder mb-0">Tax Receipts</h1>
            <span className="d-none d-sm-flex text-light fs-5 ml-2 ms-2">({totalRecord})</span>
          </div>
          <p className="d-none d-sm-block fs-6 text-light">
            Tax receipts uploaded here will be encrypted and sent directly to the donor's profile
            where they will be able to view & download.
          </p>
        </div>
        <div className="ms-sm-auto">
          <LadderMenu activeKey={activeKey} onChangeFilterOption={onChangeFilterOption} />
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
        deleteReceipt={deleteReceipt}
        handleClick={handleClick}
        handleSortingChange={handleSortingChange}
        order={order}
        sortField={sortField}
        headers={headers}
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
