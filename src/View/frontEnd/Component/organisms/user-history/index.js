import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';

import IconToggle from '../../atoms/icon-toggle';
// import { HistoryList } from "@components/organisms"
import HistoryList from '../history-list';
import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation, useOutletContext } from 'react-router-dom';
import userApi from '../../../../../Api/frontEnd/user';
import FrontLoader from '../../../../../Common/FrontLoader';

import './style.scss';

const UserHistory = () => {
  const [data, setData] = useOutletContext();
  const [orderList, setOrderList] = useState([]);
  const userAuthToken = localStorage.getItem('userAuthToken');
  const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecord, setTotalRecord] = useState(0);
  const [activeList, setActiveList] = useState([]);
  const [ischecked, setIschecked] = useState(false);
  const [sortField, setSortField] = useState('created_at');
  const [order, setOrder] = useState('asc');

  const getUserOrders = async (page, field, type) => {
    setLoading(true);
    let formData = {};
    formData.organizationId = data._id;
    formData.pageNo = page;
    formData.sortField = field;
    formData.sortType = type;
    formData.filter = true;

    const getUserOrderDetails = await userApi.getUserOrderDetails(userAuthToken, formData);
    if (getUserOrderDetails.data.success) {
      // console.log(getUserOrderDetails.data)
      setTotalPages(getUserOrderDetails.data.totalPages);
      setTotalRecord(getUserOrderDetails.data.totalRecord);
      setOrderList(getUserOrderDetails.data.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      await getUserOrders(pageNo, sortField, order);
    })();
  }, [data._id]);

  const handleClick = async (e, v) => {
    // setLoading(false)
    setActiveList([]);
    setIschecked(false);
    setPageNo(Number(v));
    await getUserOrders(Number(v), sortField, order);

    // setLoading(false)
  };

  const handleSortingChange = async (accessor) => {
    const sortOrder = accessor === sortField && order === 'asc' ? 'desc' : 'asc';
    setSortField(accessor);
    setOrder(sortOrder);
    await getUserOrders(pageNo, accessor, sortOrder);
  };

  const onClickFilter = (e) => {
    // console.log(e.target.checked)
    if (e.target.checked) {
      if (orderList.length > 0) {
        let temp = [];
        orderList.map((list, i) => {
          temp.push(list._id);
        });
        setActiveList(temp);
      } else {
        setActiveList([]);
      }
    } else {
      setActiveList([]);
    }

    setIschecked(e.target.checked);
  };

  return (
    <>
      {/*<FrontLoader loading={loading} />*/}
      <header className="py-sm-2 pb-2 mb-2 w-100 d-none d-sm-flex align-items-center">
        <div className="me-sm-2 flex-grow-1">
          <h1 className="d-none d-sm-flex page__title mb-0 fs-3 fw-bolder me-2">Order History</h1>
          <p className="d-sm-block fs-5 text-light">
            View your order history by transaction. See the transaction details for all of the items
            you donated to.
          </p>
          <span className="d-none d-sm-flex text-light fs-5 ml-2">({totalRecord})</span>
        </div>
        <IconToggle
          className="text-info ms-2 d-none d-sm-block"
          icon={<FontAwesomeIcon icon={regular('maximize')} />}
          checkedIcon={<FontAwesomeIcon icon={regular('minimize')} />}
          ischecked={ischecked}
          onClickFilter={onClickFilter}
          name="expand"
        />
      </header>

      <HistoryList
        orderList={orderList}
        handleClick={handleClick}
        totalPages={totalPages}
        totalRecord={totalRecord}
        pageNo={pageNo}
        handleSortingChange={handleSortingChange}
        activeList={activeList}
        setActiveList={setActiveList}
        setIschecked={setIschecked}
        order={order}
        sortField={sortField}
        data={data}
      />
    </>
  );
};

export default UserHistory;
