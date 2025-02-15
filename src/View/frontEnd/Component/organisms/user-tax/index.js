
import { useState, useEffect } from 'react';
import LadderMenu from '../ladder-menu';
import TaxTable from '../tax-table';
import { Outlet, Link, useLocation, useOutletContext } from 'react-router-dom';
import userApi from '../../../../../Api/frontEnd/user';
import FrontLoader from '../../../../../Common/FrontLoader';
import moment from 'moment';
import helper, { priceFormat } from '../../../../../Common/Helper';
import './style.scss';
import { validateBBox } from '@turf/turf';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';

const UserTax = () => {
  const userAuthToken = localStorage.getItem('userAuthToken');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useOutletContext();
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecord, setTotalRecord] = useState(0);
  const [sortField, setSortField] = useState('created_at');
  const [order, setOrder] = useState('asc');
  const [taxList, setTaxList] = useState([]);
  const [activeKey, setActiveKey] = useState(0);
  const [activeYear, setActiveYear] = useState('Show All');
  const [all, setAll] = useState([]);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [currentYear, setCurrentYear] = useState(moment().year().toString());
  const [csvData, setCsvData] = useState([]);

  const headers = [
    { label: 'Date', key: 'date' },
    { label: 'Amount', key: 'amount' },
    { label: 'Transaction Id', key: 'TransactionId' },
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

  const totalVal = (data) => {
    let tempSub = [];
    let sum;
    if (data.length > 0) {
      data.map((i, k) => {
        if (i.type === 'Purchased') {
          tempSub.push(i.orderItemDetails?.totalPrice);
        } else {
          tempSub.push(i.amount);
        }
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
    setLoading(true);
    let formData = {};
    formData.pageNo = page;
    formData.sortField = field;
    formData.sortType = type;
    formData.isAll = false;
    formData.year = year;

    const getTaxDataList = await userApi.userTaxlist(userAuthToken, formData);
    if (getTaxDataList.data.success) {
      setTaxList(getTaxDataList.data.data);
      setTotalPages(getTaxDataList.data.totalPages);
      setTotalRecord(getTaxDataList.data.totalRecord);
      setAll(getTaxDataList.data.allData);
      if (getTaxDataList.data.allData.length > 0) {
        let tempAr = [];
        getTaxDataList.data.allData.map((v, k) => {
          let tempobj = {};
          tempobj.date = moment(v.created_at).format('DD MMMM YY');
          tempobj.amount = v[0].currencySymbol + totalVal(v);
          tempobj.TransactionId = v[0].uniqueTransactionId
            ? v[0].uniqueTransactionId
            : v[0].orderId;
          tempobj.products = getProductsName(v);
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
      await getTaxDataList(pageNo, sortField, order, currentYear);
    })();
  }, [data._id, currentYear]);

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
    setLoading(true);
    await getTaxDataList(pageNo, sortField, order, v);
    setActiveYear(v);
    setActiveKey(e);
    setLoading(false);
  };

  const countProjectAmount = (data) => {
    let totalQArray = [];
    let per = 0;

    if (data?.length > 0) {
      data?.map((p, i) => {
        p?.map((p1, i1) => {
          if (p1?.orderItemDetails?.totalPrice || p1?.amount) {
            let productTotal = p1?.orderItemDetails?.totalPrice || 0;
            let donationTotal = p1.amount || 0;
            let taxableProduct = Number(productTotal);
            let taxableDonation = Number(donationTotal);

            if (p1.currency === userData.currency) {
              totalQArray.push(p1.type === 'Purchased' ? taxableProduct : taxableDonation);
            }
          }
        });
      });

      const total = totalQArray.reduce(
        (partialSum, a) => parseFloat(partialSum) + parseFloat(a),
        0
      );

      per = total;
    } else {
      per = 0;
    }
    return priceFormat(per);
  };

  return (
    <>
      <header className="w-100 d-flex flex-column flex-lg-row align-items-start gap-2">
        <div className="me-sm-2 flex-grow-1">
          <h1 className="d-sm-flex page__title fs-3 fw-bolder">Annual Tax Receipts</h1>
          <p className="d-sm-block">
            View your order history and download your tax receipts here. Your files will be
            available for download once they have been uploaded by the charity. The values listed in
            the table below represent the amount paid to the charity less any non-deductible service
            charges. Transaction fees are not tax deductible.
          </p>
          <div className="d-flex flex-wrap gap-2 fw-semibold mt-5 pt-sm-0">
            <span>
              <FontAwesomeIcon icon={solid('clock')} className="fs-5 me-1 text-warning" />
              The charity has yet to upload your tax document
            </span>
          </div>
        </div>

        <div className="ms-sm-auto">
          <LadderMenu
            loading={loading}
            activeKey={activeKey}
            onChangeFilterOption={onChangeFilterOption}
          />
        </div>
      </header>

      <div className="fs-5 fw-bolder d-flex align-items-center gap-1">
        <span className="fs-7 text-light fw-bolder flex-grow-1">DONATION HISTORY</span>
        <div className="fs-6 text-light fw-semibold d-flex align-items-center gap-1 justify-content-end">
          taxable amount:
          <h5 className="price ">
            {userData.symbol}
            {countProjectAmount(all).toLocaleString('en-US', {
              maximumFractionDigits: 2
            })}
          </h5>
          <small className="fs-5 text-light">{userData.currency} </small>{' '}
        </div>
      </div>

      <TaxTable
        handleClick={handleClick}
        totalPages={totalPages}
        totalRecord={totalRecord}
        loading={loading}
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
