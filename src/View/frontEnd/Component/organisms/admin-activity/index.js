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
      <header className="w-100 d-sm-flex flex-column flex-lg-row align-items-start gap-2">
        <div className="me-sm-2 flex-grow-1">
          <div className="d-flex align-items-center mb-1">
            <h1 className="d-none d-sm-flex page__title fs-3 fw-bolder mb-0">Activity</h1>
            <span className="d-none d-sm-flex ml-2 ms-2">({totalRecord})</span>
          </div>
          <p className="d-none d-sm-block">
            Check out how donors have been interacting with your charity. Here is where you can see
            order activity and follows.
          </p>
        </div>
        <div className="ms-sm-auto">
          <LadderMenuXp onChangeDropdown={onChangeDropdown} listBy={listBy} urlIcon={urlIcon} />
        </div>
      </header>

      <ActivityTable
        handleClick={handleClick}
        activityList={activityList}
        loading={loading}
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
