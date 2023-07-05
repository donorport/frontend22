import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';

import IconToggle from '../../atoms/icon-toggle';
// import { HistoryList } from "@components/organisms"
import HistoryList from '../history-list';
import React, { useState, useEffect } from 'react';
import { 
  //Outlet, 
  //Link, 
  //useLocation, 
  useOutletContext 
} from 'react-router-dom';
import userApi from '../../../../../Api/frontEnd/user';
//import FrontLoader from '../../../../../Common/FrontLoader';

import './style.scss';
import organizationApi from '../../../../../Api/frontEnd/organization';
//import { useSelector } from 'react-redux';

//TODO:
//const HISTORY_FILTER_OPTIONS = [
  //'ALL',
  //'ORDERS',
  //'DONATIONS',
//];

const UserHistory = () => {
  const [data, setData] = useOutletContext();
  //const [orderList, setOrderList] = useState([]);
  const userAuthToken = localStorage.getItem('userAuthToken');
  //const [loading, setLoading] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecord, setTotalRecord] = useState(0);
  const [activeList, setActiveList] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [sortField, setSortField] = useState('created_at');
  const [sortingOrder, setSortingOrder] = useState('asc');

  const [userDonations, setUserDonations] = useState([]);
  const [allUserOrderDetails, setAllUserOrderDetails] = useState([]);
  // masterList holds combined orders + donations, and is sorted based on sortingOrder
  const [masterList, setMasterList] = useState([]);
  // thisPageList holds the items for this page only (10 items)
  const [thisPageList, setThisPageList] = useState([]);

  const [isFetching, setIsFetching] = useState(true);

  //TODO:
  //const [historyFilter, setHistoryFilter] = useState(HISTORY_FILTER_OPTIONS[0]);


  //console.log('UserHistory:', {data});

  //const getUserOrders = async (page, field, type) => {
    //setLoading(true);
    //let formData = {};
    //formData.organizationId = data._id;
    //formData.pageNo = page;
    //formData.sortField = field;
    //formData.sortType = type;
    //formData.filter = true;

    //const getUserOrderDetails = await userApi.getUserOrderDetails(userAuthToken, formData);
    //if (getUserOrderDetails.data.success) {
      //// console.log(getUserOrderDetails.data)
      //setTotalPages(getUserOrderDetails.data.totalPages);
      //setTotalRecord(getUserOrderDetails.data.totalRecord);
      //setOrderList(getUserOrderDetails.data.data);
    //}
    //setLoading(false);
  //};

  const getAllUserOrders = async () => {
    const formData = {
      userId: data._id,
    };
    const getAllUserOrderDetails = await userApi.getAllUserOrderDetails(userAuthToken, formData);
    if (getAllUserOrderDetails.data.success) {
      setAllUserOrderDetails(getAllUserOrderDetails.data.data);
      return getAllUserOrderDetails.data.data;
    }

    console.error({getAllUserOrderDetails});
    return [];
  }

  const getUserDonations = async () => {
    const formData = {userId: data._id};
    const userDonations = await organizationApi.getDonationsByUserId(userAuthToken, formData);
    if (userDonations.data.success) {
      setUserDonations(userDonations.data.data);
      return userDonations.data.data;
    }

    console.error({userDonations});
    return [];
  }

  // should run once to fetch all data and sort it
  const fetchAndCombineOrdersAndDonations = async () => {

    // fetch list and save counts
    const [orders, donations] = await Promise.all([getAllUserOrders(), getUserDonations()]);
    const list = orders.concat(donations);
    setTotalPages(Math.ceil(list.length / 10));
    setTotalRecord(list.length);

    // sort it based on sortingOrder
    const sortedList = sortList(list, sortingOrder);
    //console.log({unsorted: list, sorted: sortedList});

    // set into masterList
    setMasterList(sortedList);

    // get 10 items for this page
    getThisPageList(sortedList, pageNo);

    return true;
  }

  // when changing sorting order, need to first change master list sorting order
  // then need to pluck the correct page from the master list

  const sortList = (_list, _sortingOrder) => {
    return _list.sort((a, b) => {
      if (a.created_at < b.created_at) {
        return _sortingOrder === 'asc' ? 1 : -1;
      }
      if (a.created_at > b.created_at) {
        return _sortingOrder === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  const getThisPageList = (list, pageNo) => {
    const start = (pageNo - 1) * 10;
    const end = pageNo * 10;
    setThisPageList(list.slice(start, end));
  }

  useEffect(() => {
    (async () => {
      if (data._id) {
        setIsFetching(true);
        await fetchAndCombineOrdersAndDonations();
        setIsFetching(false);
      }
    })();
  }, [data._id]);

  //console.log('fetched userDonations:', {allUserOrderDetails, userDonations, masterList, thisPageList });


  const handleChangePage = async (e, v) => {
    setActiveList([]);
    setIsChecked(false);
    const nextPage = Number(v);
    setPageNo(nextPage);

    getThisPageList(masterList, nextPage);
  };

  const handleSortingChange = async (accessor) => {
    const newSortOrder = accessor === sortField && sortingOrder === 'asc' ? 'desc' : 'asc';
    setSortField(accessor);
    setSortingOrder(newSortOrder);


    // sort the masterList based on sortingOrder
    // set thisPageList to the correct pagination of the masterList
    const sortedList = sortList(masterList, newSortOrder);
    setMasterList(sortedList);
    getThisPageList(sortedList, pageNo);

  };

  const onClickFilter = (e) => {
    // console.log(e.target.checked)
    let newActiveList = [];
    if (e.target.checked && thisPageList.length > 0) {
       newActiveList = thisPageList.map((list) => list._id);
    }
    setActiveList(newActiveList);
    setIsChecked(e.target.checked);
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
          ischecked={isChecked}
          onClickFilter={onClickFilter}
          name="expand"
        />
      </header>

      <HistoryList
        thisPageList={thisPageList}
        handleClick={handleChangePage}
        totalPages={totalPages}
        totalRecord={totalRecord}
        pageNo={pageNo}
        handleSortingChange={handleSortingChange}
        activeList={activeList}
        setActiveList={setActiveList}
        setIsChecked={setIsChecked}
        sortingOrder={sortingOrder}
        sortField={sortField}
        data={data}
        isFetching={isFetching}
      />
    </>
  );
};

export default UserHistory;
