import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular } from "@fortawesome/fontawesome-svg-core/import.macro";

import IconToggle from "../../atoms/icon-toggle";
// import { HistoryList } from "@components/organisms"
import HistoryList from "../history-list";
import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useOutletContext } from "react-router-dom";
import userApi from "../../../../../Api/frontEnd/user";
import FrontLoader from "../../../../../Common/FrontLoader";

import "./style.scss";

const UserHistory = () => {
  const [data, setData] = useOutletContext();
  const [orderList, setOrderList] = useState([])
  const userAuthToken = localStorage.getItem('userAuthToken');
  const [loading, setLoading] = useState(false)
  const [pageNo, setPageNo] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalRecord, setTotalRecord] = useState(1)


  const getUserOrders = async (page) => {
    setLoading(true)
    const getUserOrderDetails = await userApi.getUserOrderDetails(userAuthToken, page)
    if (getUserOrderDetails.data.success) {
      // console.log(getUserOrderDetails.data)
      setTotalPages(getUserOrderDetails.data.totalPages)
      setTotalRecord(getUserOrderDetails.data.totalRecord)
      setOrderList(getUserOrderDetails.data.data)
    }
    setLoading(false)

  }


  useEffect(() => {
    (async () => {
  
      await getUserOrders(pageNo)

    })()
  }, [data._id])

  const handleClick = async(e, v) => {
    // setLoading(true)
    setPageNo(Number(v))
    await getUserOrders(Number(v))
    // setLoading(false)
  }

  return (
    <>
      <FrontLoader loading={loading} />
      <header className="py-sm-2 pb-2 mb-3 w-100 d-sm-flex align-items-center">
        <h1 className="d-none d-sm-flex page__title mb-0 fs-3 fw-bolder me-2">
          Order History
        </h1>
        <span className="d-none d-sm-flex text-light fs-5 ml-2">({totalRecord})</span>

        <IconToggle
          className="text-info ms-2 d-none d-sm-block"
          icon={<FontAwesomeIcon icon={regular("maximize")} />}
          checkedIcon={<FontAwesomeIcon icon={regular("minimize")} />}
        />
      </header>

      <HistoryList orderList={orderList} handleClick={handleClick} totalPages={totalPages} totalRecord={totalRecord} pageNo={pageNo} />
    </>
  );
};

export default UserHistory;
