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
const HISTORY_FILTER_OPTIONS = {
  ALL: { value: 'ALL', label: 'All' },
  ORDERS: { value: 'ORDERS', label: 'Orders' },
  DONATIONS: { value: 'DONATIONS', label: 'Donations' }
};

// apply historyFilter to our list
const filterList = (_list, _filter) => {
  let newList = _list;
  if (_filter === HISTORY_FILTER_OPTIONS.DONATIONS.value) {
    newList = _list.filter((item) => item?.amount !== undefined);
  } else if (_filter === HISTORY_FILTER_OPTIONS.ORDERS.value) {
    newList = _list.filter((item) => item?.total !== undefined);
  }
  return newList;
};

// apply sortingOrder to our list
const sortList = (_list, _sortingOrder) =>
  _list.sort((a, b) => {
    if (a.created_at < b.created_at) {
      return _sortingOrder === 'asc' ? 1 : -1;
    }
    if (a.created_at > b.created_at) {
      return _sortingOrder === 'asc' ? -1 : 1;
    }
    return 0;
  });

const sortAndFilterList = (list, sortingOrder, historyFilter) =>
  filterList(sortList(list, sortingOrder), historyFilter);

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
  // masterList holds combined orders + donations (NOT sorted or filtered)
  const [masterList, setMasterList] = useState([]);
  // the list to be pulled from for displaying: is sorted and filtered
  const [displayList, setDisplayList] = useState([]);
  // thisPageList holds the items for this page only (10 items)
  const [thisPageList, setThisPageList] = useState([]);

  const [isFetching, setIsFetching] = useState(true);

  //TODO:
  const [historyFilter, setHistoryFilter] = useState(HISTORY_FILTER_OPTIONS.ALL.value);

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
      userId: data._id
    };
    const getAllUserOrderDetails = await userApi.getAllUserOrderDetails(userAuthToken, formData);
    if (getAllUserOrderDetails.data.success) {
      setAllUserOrderDetails(getAllUserOrderDetails.data.data);
      return getAllUserOrderDetails.data.data;
    }

    console.error({ getAllUserOrderDetails });
    return [];
  };

  const getUserDonations = async () => {
    const formData = { userId: data._id };
    const userDonations = await organizationApi.getDonationsByUserId(userAuthToken, formData);
    if (userDonations.data.success) {
      setUserDonations(userDonations.data.data);
      return userDonations.data.data;
    }

    console.error({ userDonations });
    return [];
  };

  // should run once to fetch all data and sort it
  const fetchAndCombineOrdersAndDonations = async () => {
    // fetch list
    const [orders, donations] = await Promise.all([getAllUserOrders(), getUserDonations()]);
    const list = orders.concat(donations);

    // set into masterList
    setMasterList(list);

    return list;
  };

  const setDisplayAndPageList = (list) => {
    setTotalPages(Math.ceil(list.length / 10));
    setTotalRecord(list.length);

    setDisplayList(list);
    // get 10 items for this page
    getThisPage10ItemsList(list, pageNo);
  };

  const getThisPage10ItemsList = (list, pageNo) => {
    const start = (pageNo - 1) * 10;
    const end = pageNo * 10;
    setThisPageList(list.slice(start, end));
  };

  // when the component renders, we want to fetch all orders & donations and save them in the masterList
  // We also want to set our displayList to our (default) sorted & filtered list
  // then we can set our thisPageList
  //
  // When the sorting OR filtering is changed, we want to:
  // - take again the masterList, sort it, filter
  // - then we can set our displayList & thisPageList
  useEffect(() => {
    (async () => {
      if (data._id) {
        setIsFetching(true);
        // fetch and set masterList
        const list = await fetchAndCombineOrdersAndDonations();

        const readyList = sortAndFilterList(list, sortingOrder, historyFilter);

        // set the filtered/display list & the current page's 10 items
        setDisplayAndPageList(readyList);
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

    getThisPage10ItemsList(displayList, nextPage);
  };

  // sorting by date
  const handleSortingChange = async (accessor) => {
    const newSortingOrder = accessor === sortField && sortingOrder === 'asc' ? 'desc' : 'asc';
    setSortField(accessor);
    setSortingOrder(newSortingOrder);

    const readyList = sortAndFilterList(masterList, newSortingOrder, historyFilter);
    setDisplayAndPageList(readyList);
  };

  // filtering by type
  const handleHistoryFilterChange = async (e) => {
    console.log('handleFilterChange:', { e });
    const newHistoryFilter = e.target.value;
    setHistoryFilter(newHistoryFilter);

    const readyList = sortAndFilterList(masterList, sortingOrder, newHistoryFilter);
    setDisplayAndPageList(readyList);
  };

  // expand/contract the activeList
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
        historyFilter={historyFilter}
        setHistoryFilter={setHistoryFilter}
        historyFilterOptions={HISTORY_FILTER_OPTIONS}
        handleHistoryFilterChange={handleHistoryFilterChange}
      />
    </>
  );
};

export default UserHistory;
