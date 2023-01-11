// import { LadderMenu, TaxTable } from "@components/organisms";
import { useState, useEffect } from 'react';
import LadderMenu from '../ladder-menu';
import TaxTable from '../tax-table';
import { Outlet, Link, useLocation, useOutletContext } from 'react-router-dom';
import userApi from '../../../../../Api/frontEnd/user';
import FrontLoader from '../../../../../Common/FrontLoader';
import moment from 'moment';
import helper from '../../../../../Common/Helper';
import './style.scss';

const UserTax = () => {
  const userAuthToken = localStorage.getItem('userAuthToken');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useOutletContext();
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecord, setTotalRecord] = useState(1);
  const [sortField, setSortField] = useState('created_at');
  const [order, setOrder] = useState('asc');
  const [taxList, setTaxList] = useState([]);
  const [activeKey, setActiveKey] = useState(0);
  const [activeYear, setActiveYear] = useState('Show All');
  const [all, setAll] = useState([]);
  const userData = JSON.parse(localStorage.getItem('userData'));

  const [csvData, setCsvData] = useState([]);

  const headers = [
    { label: 'Date', key: 'date' },
    { label: 'Amount', key: 'amount' },
    { label: 'Transection Id', key: 'transectionId' },
    // { label: "Type", key: "type" },
    { label: 'Products', key: 'products' }
  ];
  const getProductsName = (products) => {
    let pr = '';
    if (products.length > 0) {
      products.map((p, i) => {
        // pr += i + 1 + ') ' + p.orderItemDetails?.productName + ' '
        if (p.type === 'Purchased') {
          pr += i + 1 + ') ' + p.orderItemDetails?.productName + ' ';
        } else {
          pr += i + 1 + ') ' + 'Donate' + ' ';
        }
      });
    }
    return pr;
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

  const getTaxDataList = async (page, field, type, year) => {
    setLoading(false);
    let formData = {};
    formData.pageNo = page;
    formData.sortField = field;
    formData.sortType = type;
    formData.isAll = false;
    formData.year = year;

    const getTaxDataList = await userApi.userTaxlist(userAuthToken, formData);
    if (getTaxDataList.data.success) {
      // console.log(getTaxDataList.data.data_temp)
      setTaxList(getTaxDataList.data.data);
      setTotalPages(getTaxDataList.data.totalPages);
      setTotalRecord(getTaxDataList.data.totalRecord);
      setAll(getTaxDataList.data.allData);
      if (getTaxDataList.data.allData.length > 0) {
        let tempAr = [];
        getTaxDataList.data.allData.map((item, k) => {
          let tempobj = {};
          tempobj.date = moment(item.created_at).format('DD MMMM YY');
          tempobj.amount = item[0].currencySymbol + totalVal(item);
          tempobj.transectionId = item[0].uniqueTransactionId
            ? item[0].uniqueTransactionId
            : item[0].orderId;
          // tempobj.type = item.type
          // if (item.type === 'Purchased') {
          tempobj.products = getProductsName(item);

          // } else {
          //   tempobj.products = ' - '
          // }
          tempAr.push(tempobj);
        });
        setCsvData(tempAr);
      }
    } else {
      setTaxList([]);
      setTotalPages(0);
      setTotalRecord(0);
    }
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      await getTaxDataList(pageNo, sortField, order, activeYear);
    })();
  }, [data._id]);

  const handleClick = async (e, v) => {
    setPageNo(Number(v));
    await getTaxDataList(Number(v), sortField, order, activeYear);
  };

  const handleSortingChange = async (accessor) => {
    const sortOrder = accessor === sortField && order === 'asc' ? 'desc' : 'asc';
    setSortField(accessor);
    setOrder(sortOrder);
    await getTaxDataList(pageNo, accessor, sortOrder, activeYear);
  };
  const onChangeFilterOption = async (e, v) => {
    await getTaxDataList(pageNo, sortField, order, v);
    setActiveYear(v);
    setActiveKey(e);
  };

  const countProjectAmount = (data) => {
    // console.log(data)
    let totalQArray = [];
    let soldOutQArray = [];
    let per = 0;

    if (data?.length > 0) {
      data?.map((p, i) => {
        p?.map((p1, i1) => {
          if (p1.currency === userData.currency) {
            totalQArray.push(Number(p1.amount));
          }
        });

        // console.log(p.itemDetails)
      });

      const total = totalQArray.reduce((partialSum, a) => partialSum + a, 0);

      per = total;
    } else {
      per = 0;
    }
    return per;
  };

  return (
    <>
      {/*<FrontLoader loading={loading} />*/}
      <header className="py-sm-2 pb-2 w-100 d-sm-flex align-items-center">
        <div className="me-sm-2 flex-grow-1">
          <h1 className="d-sm-flex page__title fs-3 fw-bolder">Annual Tax Receipts</h1>
          <p className="d-sm-block fs-6 text-light">
            View your order history and download your tax receipts here. Your files will be
            available for download once they have been uploaded by the charity.
          </p>
        </div>

        <div className="ms-sm-auto">
          <LadderMenu activeKey={activeKey} onChangeFilterOption={onChangeFilterOption} />
        </div>
      </header>

      <div className="fs-4 fw-bold d-flex align-items-center gap-1 mb-2">
        <span className="fs-7 text-light fw-bolder flex-grow-1">DONATION HISTORY</span>
        Total :
        <span className="text-success fs-4">
          {userData.symbol}
          {countProjectAmount(all).toLocaleString('en-US', {
            maximumFractionDigits: 2
          })}
        </span>
        <small className="fs-5 text-light">{userData.currency} </small>{' '}
      </div>

      <TaxTable
        handleClick={handleClick}
        totalPages={totalPages}
        totalRecord={totalRecord}
        pageNo={pageNo}
        handleSortingChange={handleSortingChange}
        order={order}
        sortField={sortField}
        taxList={taxList}
        csvData={csvData}
        headers={headers}
      />
    </>
  );
};

export default UserTax;
