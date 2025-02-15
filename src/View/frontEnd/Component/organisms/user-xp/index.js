import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import IconButton from '../../molecules/icon-button';
import ShareWidget from '../share-widget';
import LadderMenuXp from '../ladder-menu-xp';
import XpTable from '../xp-table';
import Avatar from '../../atoms/avatar';
import { useSelector } from 'react-redux';
import { useState, useEffect, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import userApi from '../../../../../Api/frontEnd/user';
import helper, { getCalculatedPrice } from '../../../../../Common/Helper';

import './style.scss';

const UserXp = () => {
  const user = useSelector((state) => state.user);
  const [sortField, setSortField] = useState('created_at');
  const [order, setOrder] = useState('asc');
  const userAuthToken = localStorage.getItem('userAuthToken');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useOutletContext();
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecord, setTotalRecord] = useState(0);
  const [ItemList, setItemList] = useState([]);
  const [listBy, setListBy] = useState('ALL');
  const [urlIcon, seturlIcon] = useState('');

  const getC = getCalculatedPrice();

  const getItemList = async (page, field, type) => {
    setLoading(true);
    let formData = {};

    formData.pageNo = page;
    formData.sortField = field;
    formData.sortType = type;
    formData.type = listBy;

    const geXpItem = await userApi.userXpEarnlist(userAuthToken, formData);
    if (geXpItem.data.success === true) {
      setItemList(geXpItem.data.data);
      setTotalPages(geXpItem.data.totalPages);
      setTotalRecord(geXpItem.data.totalRecord);
    }
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      await getItemList(pageNo, sortField, order);
    })();
  }, [data._id, listBy]);

  const handleClick = async (e, v) => {
    setPageNo(Number(v));
    await getItemList(Number(v), sortField, order);
  };

  const handleSortingChange = async (accessor) => {
    const sortOrder = accessor === sortField && order === 'asc' ? 'desc' : 'asc';
    setSortField(accessor);
    setOrder(sortOrder);
    await getItemList(pageNo, accessor, sortOrder);
  };

  const onChangeDropdown = async (type, url) => {
    // console.log(type, url)
    setListBy(type);
    seturlIcon(url);
  };

  const currUrlToken = useMemo(() => {
    if (user) {
      let rank = getC.getUserRankLabel(Number(user.xp));

      console.log('data', `${rank}-${user.xp || ""}`);

      return `${rank}-${user.xp || ""}`;
    }
    return btoa("{}");
  }, [getC, user])

  return (
    <>
      <header className="w-100 d-sm-flex align-items-center d-none">
        <div className="d-flex align-items-center me-sm-2 flex-grow-1 flex-wrap">
          <h4 className="d-none d-sm-flex page__title mb-0fw-bolder me-2">My XP</h4>
          <Avatar
            size={46}
            avatarUrl={user.profileImage}
            border={0}
            shadow={false}
            className="mr-12p donor_avatar_bg"
          />

          <span className="fs-6 text-light mr-2">Your Rank</span>
          {/* <span className="ms-1">{getC.getUserRank(user.xp)}</span> */}
          <span className="btn-sm ">{getC.getUserRank(Number(user.xp))}</span>
          {/* <IconButton
            bgColor="#a278fc"
            className="btn__xs rounded-pill ms-2"
            icon={<FontAwesomeIcon icon={solid("narwhal")} />}
          >
            Norwhal
          </IconButton> */}

          <a href="/" className=" ms-auto me-1">
            {Number(user.xp).toLocaleString('en-US', { maximumFractionDigits: 2 })} xp
          </a>
          <ShareWidget
            page="leaderboard"
            text={`I'm up to ${user.xp} XP on Donorport! 🚀🚀🚀`}
            pageTitle={user.xp}
            currUrl={`https://api.donorport.com/leaderboard/${currUrlToken}`}
          />
        </div>
        <div className="ms-sm-auto">
          <LadderMenuXp onChangeDropdown={onChangeDropdown} listBy={listBy} urlIcon={urlIcon} />
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
