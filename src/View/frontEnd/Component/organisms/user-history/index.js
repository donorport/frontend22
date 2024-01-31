import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';

import IconToggle from '../../atoms/icon-toggle';
// import { HistoryList } from "@components/organisms"
import HistoryList from '../history-list';
import React, { useState, useEffect, useCallback } from 'react';
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
  //const data = useSelector((state) => state.user);
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
  // masterList holds combined orders + donations (NOT sorted or filtered)
  const [masterList, setMasterList] = useState([]);
  // the list to be pulled from for displaying: is sorted and filtered
  const [displayList, setDisplayList] = useState([]);
  // thisPageList holds the items for this page only (10 items)
  const [thisPageList, setThisPageList] = useState([]);
  const [totalPriceArray, setTotalPriceArray] = useState([]);

  const [isFetching, setIsFetching] = useState(true);

  const [historyFilter, setHistoryFilter] = useState(HISTORY_FILTER_OPTIONS.ALL.value);

  const getAllUserOrders = useCallback(
    async (userId) => {
      const formData = {
        userId
      };
      const getAllUserOrderDetails = await userApi.getAllUserOrderDetails(userAuthToken, formData);
      if (getAllUserOrderDetails.data.success) {
        return getAllUserOrderDetails.data.data;
      }

      console.error({ getAllUserOrderDetails });
      return [];
    },
    [userAuthToken]
  );

  const getUserDonations = useCallback(
    async (userId) => {
      const formData = { userId };
      //console.log({data, formData});
      const userDonations = await organizationApi.getDonationsByUserId(userAuthToken, formData);
      if (userDonations.data.success) {
        return userDonations.data.data;
      }

      console.error({ userDonations });
      return [];
    },
    [userAuthToken]
  );

  // should run once to fetch all data and sort it
  const fetchAndCombineOrdersAndDonations = useCallback(async (userId) => {
    // fetch list
    const [orders, donations] = await Promise.all([
      getAllUserOrders(userId),
      getUserDonations(userId)
    ]);
    console.log({
      orders,
      donations: donations.map((d) => ({
        ...d,
        paymentResponse: JSON.parse(d.paymentResponse ?? '{}')
      }))
    });
    const list = orders.concat(donations);

    // Calculate grand total
    const grandTotal = list.reduce((accumulator, item) => {
      if (item.total !== undefined) {
        accumulator += Number(item.total);
      } else if (item.amount !== undefined) {
        // Handle donations or other cases
        accumulator += Number(item.amount);
      }
      return accumulator;
    }, 0);
    // Update totalPriceArray state with the grand total
    setTotalPriceArray([grandTotal]);
    // set into masterList
    setMasterList(list);
    console.log('Combined List:', list);
    return list;
  }, []);

  const setDisplayAndPageList = useCallback(
    (list) => {
      setTotalPages(Math.ceil(list.length / 10));
      setTotalRecord(list.length);

      setDisplayList(list);
      // get 10 items for this page
      getThisPage10ItemsList(list, pageNo);
    },
    [pageNo]
  );

  const getThisPage10ItemsList = useCallback((list, pageNo) => {
    const start = (pageNo - 1) * 10;
    const end = pageNo * 10;
    setThisPageList(list.slice(start, end));
  }, []);

  // when the component renders, we want to fetch all orders & donations and save them in the masterList
  // We also want to set our displayList to our (default) sorted & filtered list
  // then we can set our thisPageList
  //
  // When the sorting OR filtering is changed, we want to:
  // - take again the masterList, sort it, filter
  // - then we can set our displayList & thisPageList
  const initializeHistoryList = useCallback(async () => {
    setIsFetching(true);
    // fetch and set masterList
    const list = await fetchAndCombineOrdersAndDonations(data._id);

    const readyList = sortAndFilterList(list, sortingOrder, historyFilter);
    console.log('sorted:', { readyList });

    // set the filtered/display list & the current page's 10 items
    setDisplayAndPageList(readyList);
    setIsFetching(false);
  }, [sortingOrder, historyFilter, data._id]);

  useEffect(() => {
    (async () => {
      console.log({ data });
      if (JSON.stringify(data) !== '{}' && data?._id !== undefined) {
        console.log('before initializeHistoryList:', { data });
        initializeHistoryList();
      }
    })();
  }, [data._id]);

  //console.log('fetched userDonations:', {allUserOrderDetails, userDonations, masterList, thisPageList });

  const handleChangePage = useCallback(
    async (e, v) => {
      setActiveList([]);
      setIsChecked(false);
      const nextPage = Number(v);
      setPageNo(nextPage);

      getThisPage10ItemsList(displayList, nextPage);
    },
    [displayList]
  );

  // sorting by date
  const handleSortingChange = useCallback(
    async (accessor) => {
      const newSortingOrder = accessor === sortField && sortingOrder === 'asc' ? 'desc' : 'asc';
      setSortField(accessor);
      setSortingOrder(newSortingOrder);

      const readyList = sortAndFilterList(masterList, newSortingOrder, historyFilter);
      setDisplayAndPageList(readyList);
    },
    [sortField, sortingOrder, masterList, historyFilter]
  );

  // filtering by type
  const handleHistoryFilterChange = useCallback(
    async (e) => {
      console.log('handleFilterChange:', { e });
      const newHistoryFilter = e.target.value;
      setHistoryFilter(newHistoryFilter);

      const readyList = sortAndFilterList(masterList, sortingOrder, newHistoryFilter);
      setDisplayAndPageList(readyList);
    },
    [masterList, sortingOrder]
  );

  // expand/contract the activeList
  const onClickFilter = useCallback(
    (e) => {
      // console.log(e.target.checked)
      let newActiveList = [];
      if (e.target.checked && thisPageList.length > 0) {
        newActiveList = thisPageList.map((list) => list._id);
      }
      setActiveList(newActiveList);
      setIsChecked(e.target.checked);
    },
    [thisPageList]
  );

  console.log('user-history rerender');
  return (
    <>
      {/*<FrontLoader loading={loading} />*/}
      <header className="py-sm-2 pb-2 mb-2 w-100 d-none d-sm-flex align-items-start">
        <div className="me-sm-2 flex-grow-1">
          <h1 className="d-none d-sm-flex page__title mb-0 fs-3 fw-bolder me-2">Order History</h1>
          <p className="d-sm-block fs-5 text-light">
            View your order history by transaction. See the transaction details for all of the items
            you donated to.
          </p>
          <span className="d-none d-sm-flex text-light fs-5 ml-2">({totalRecord})</span>
        </div>
        {/* <IconToggle
          className="text-info ms-2 d-none d-sm-block"
          icon={<FontAwesomeIcon icon={regular('maximize')} />}
          checkedIcon={<FontAwesomeIcon icon={regular('minimize')} />}
          ischecked={isChecked}
          onClickFilter={onClickFilter}
          name="expand"
        /> */}
        {totalPriceArray !== null && (
          <span className="d-none d-sm-flex item__total-wrap d-flex ms-3">
            <FontAwesomeIcon icon={solid('square-dollar')} className=" mr-12p fs-4" />
            <span>$</span>
            {totalPriceArray
              .reduce((acc, value) => acc + value, 0)
              .toLocaleString('en-US', {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
              })}
          </span>
        )}
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
