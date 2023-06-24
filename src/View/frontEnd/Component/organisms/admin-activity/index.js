// import { LadderMenuXp, ActivityTable } from "@components/organisms";
import { useState, useEffect } from 'react';
import adminCampaignApi from '../../../../../Api/admin/adminCampaign';
import LadderMenuXp from '../ladder-menu-xp';
import ActivityTable from '../activity-table';
import { useOutletContext } from 'react-router-dom';

import './style.scss';

const AdminActivity = () => {
  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  const type = localStorage.getItem('type');
  const tempCampaignAdminAuthToken = localStorage.getItem('tempCampaignAdminAuthToken');
  const token = type
    ? type === 'temp'
      ? tempCampaignAdminAuthToken
      : CampaignAdminAuthToken
    : CampaignAdminAuthToken;
  const [data, setData] = useOutletContext();
  const [loading, setLoading] = useState(false);
  const [activityList, setActivityList] = useState([]);
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecord, setTotalRecord] = useState(0);
  const [sortField, setSortField] = useState('created_at');
  const [order, setOrder] = useState('asc');
  const [listBy, setListBy] = useState('ALL');
  const [urlIcon, seturlIcon] = useState('');

  const getActivityList = async (page, field, type) => {
    setLoading(true);
    let formData = {};
    formData.organizationId = data._id;
    formData.pageNo = page;
    formData.sortField = field;
    formData.sortType = type;
    formData.filter = true;
    formData.type = listBy;

    const getOrganizationActivities = await adminCampaignApi.activityList(token, formData);
    if (getOrganizationActivities.data.success === true) {
      setActivityList(getOrganizationActivities.data.data);
      setTotalPages(getOrganizationActivities.data.totalPages);
      setTotalRecord(getOrganizationActivities.data.totalRecord);
    }
    setLoading(false);
  };

  useEffect(() => {
    (async () => {
      await getActivityList(pageNo, sortField, order);
    })();
  }, [data._id, listBy]);

  const handleClick = async (e, v) => {
    setPageNo(Number(v));
    await getActivityList(Number(v), sortField, order);
  };

  const handleSortingChange = async (accessor) => {
    const sortOrder = accessor === sortField && order === 'asc' ? 'desc' : 'asc';
    setSortField(accessor);
    setOrder(sortOrder);
    await getActivityList(pageNo, accessor, sortOrder);
  };

  const onChangeDropdown = async (type, url) => {
    // console.log(type, url)
    setListBy(type);
    seturlIcon(url);
  };

  return (
    <>
      <header className="py-sm-2 pb-2 w-100 d-sm-flex align-items-center">
        <div className="d-none d-sm-flex align-items-center me-sm-2 flex-grow-1 mb-3 mb-sm-0 flex-wrap">
          <h1 className="d-none d-sm-flex page__title mb-0 fs-3 fw-bolder me-2">Activity</h1>
          <span className="d-none d-sm-flex text-light fs-5 ml-2">({totalRecord})</span>
        </div>
        <div className="ms-sm-auto">
          <LadderMenuXp onChangeDropdown={onChangeDropdown} listBy={listBy} urlIcon={urlIcon} />
        </div>
      </header>

      <ActivityTable
        handleClick={handleClick}
        activityList={activityList}
        totalPages={totalPages}
        totalRecord={totalRecord}
        pageNo={pageNo}
        handleSortingChange={handleSortingChange}
        order={order}
        sortField={sortField}
        data={data}
      />
    </>
  );
};

export default AdminActivity;
