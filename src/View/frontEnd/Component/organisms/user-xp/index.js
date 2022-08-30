import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
// import IconButton from "@components/molecules/icon-button";
import IconButton from "../../molecules/icon-button";
// import { LadderMenuXp, XpTable, ShareWidget } from "@components/organisms";
import ShareWidget from "../share-widget";
import LadderMenuXp from "../ladder-menu-xp";
import XpTable from "../xp-table";
import Avatar from "../../atoms/avatar";
import AvatarImg from "../../../../../assets/images/avatar.jpeg";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useOutletContext } from "react-router-dom";
import userApi from "../../../../../Api/frontEnd/user";
import FrontLoader from "../../../../../Common/FrontLoader";
import helper, { priceFormat, getCalculatedPrice } from "../../../../../Common/Helper";

import "./style.scss";

const UserXp = () => {
  const user = useSelector((state) => state.user);
  const [sortField, setSortField] = useState("created_at");
  const [order, setOrder] = useState("asc");
  const userAuthToken = localStorage.getItem('userAuthToken');
  const [loading, setLoading] = useState(false)
  const [data, setData] = useOutletContext();
  const [pageNo, setPageNo] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalRecord, setTotalRecord] = useState(1)
  const [ItemList, setItemList] = useState([])
  const [listBy, setListBy] = useState("ALL");
  const [urlIcon, seturlIcon] = useState("");

  const getC = getCalculatedPrice()



  const getItemList = async (page, field, type) => {
    setLoading(false)
    let formData = {}

    formData.pageNo = page
    formData.sortField = field
    formData.sortType = type
    formData.type = listBy





    const geXpItem = await userApi.userXpEarnlist(userAuthToken, formData);
    if (geXpItem.data.success === true) {
      setItemList(geXpItem.data.data)
      setTotalPages(geXpItem.data.totalPages)
      setTotalRecord(geXpItem.data.totalRecord)
    }
    setLoading(false)


  }

  useEffect(() => {
    (async () => {

      await getItemList(pageNo, sortField, order)

    })()
  }, [data._id, listBy])


  const handleClick = async (e, v) => {

    setPageNo(Number(v))
    await getItemList(Number(v), sortField, order)
  }


  const handleSortingChange = async (accessor) => {

    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    await getItemList(pageNo, accessor, sortOrder)


  };

  const onChangeDropdown = async (type, url) => {
    // console.log(type, url)
    setListBy(type)
    seturlIcon(url)
  }



  return (
    <>
      <FrontLoader loading={loading} />
      <header className="py-sm-2 pb-2 w-100 d-sm-flex align-items-center d-none">
        <div className="d-flex align-items-center me-sm-2 flex-grow-1 mb-3 mb-sm-0">
          <h1 className="d-none d-sm-flex page__title mb-0 fs-3 fw-bolder me-2">
            My XP
          </h1>
          <Avatar
            size={35}
            avatarUrl={user.profileImage}
            border={0}
            shadow={false}
            className="mr-12p donor_avatar_bg"
          />

          <span className="fs-7 text-light mr-2">Your Rank</span>
          <span className="ms-2">
            {
              getC.getUserRank(user.xp)
            }
          </span>

          {/* <IconButton
            bgColor="#a278fc"
            className="btn__xs rounded-pill ms-2"
            icon={<FontAwesomeIcon icon={solid("narwhal")} />}
          >
            Norwhal
          </IconButton> */}
          <a href="/" className="text-info fw-bold fs-5 ms-auto me-1">
            {priceFormat(user.xp)} xp
          </a>
          <ShareWidget />
        </div>
        <div className="ms-sm-auto">

          <LadderMenuXp
            onChangeDropdown={onChangeDropdown}
            listBy={listBy}
            urlIcon={urlIcon}
          />
        </div>
      </header>

      <XpTable
        handleClick={handleClick}
        totalPages={totalPages}
        totalRecord={totalRecord}
        pageNo={pageNo}
        handleSortingChange={handleSortingChange}
        order={order}
        sortField={sortField}
        ItemList={ItemList}


      />
    </>
  );
};

export default UserXp;
