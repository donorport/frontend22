import React, { useState, useEffect, useContext } from 'react';
import { Tab, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
// import { UserContext } from '../../../App';
// import {
//   AdminDashboard,
//   AdminTabs,
//   AdminPosts,
//   UserXp,
//   UserTax,
//   UserHistory,
//   UserSettingsTab,
// } from "@components/organisms";

import AdminDashboard from '../Component/organisms/admin-dashboard';
import AdminTabs from '../Component/organisms/admin-tabs';
import AdminPosts from '../Component/organisms/admin-posts';
import UserXp from '../Component/organisms/user-history';
import UserTax from '../Component/organisms/user-tax';
// import UserXp from "../Component/organisms/user-history";
import UserSettingsTab from '../Component/organisms/user-settings-tab';
// import { BrowserRouter as Router, Route, Routes, useLocation, Link as RouterLink } from 'react-router-dom'
// import useWindowSize from "@hooks/device-check";
import useWindowSize from '../../../hooks/device-check';
import {
  DashboardIcon,
  PostsIcon,
  ActivityIcon,
  TaxIcon,
  ProjectIcon,
  SettingsIcon
} from '../Component/organisms/admin-tabs/tab-icons';
// import { Outlet } from 'react-router-dom';

import DefaultLayout from '../Component/templates/default-layout';

import './style.scss';
import helper, { ImageExist } from '../../../Common/Helper';
import adminCampaignApi from '../../../Api/admin/adminCampaign';
import FrontLoader from '../../../Common/FrontLoader';
import { Outlet, Link, useLocation } from 'react-router-dom';
import noimg from '../../../assets/images/noimg.jpg';
import { useSelector, useDispatch } from 'react-redux';
// import { setLogout } from "../../../user/user.action"
import NoFooter from '../Component/templates/no-footer';

function AdminDetail() {
  // const user = useContext(UserContext)
  const user = useSelector((state) => state.user);

  const [selectedTabKey, setSelectedTabKey] = useState('');
  // const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  // const tempCampaignAdminAuthToken = localStorage.getItem('tempCampaignAdminAuthToken');

  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  const type = localStorage.getItem('type');
  const tempCampaignAdminAuthToken = localStorage.getItem('tempCampaignAdminAuthToken');
  const token = type
    ? type === 'temp'
      ? tempCampaignAdminAuthToken
      : CampaignAdminAuthToken
    : CampaignAdminAuthToken;

  const [dropdown, setDropdown] = useState(false);
  const isMobile = useWindowSize() <= 575;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const location = useLocation();
  let currentOption = location.pathname.split('/')[3];
  const [logoImg, setlogoImg] = useState('');

  useEffect(() => {
    (async () => {
      // console.log(location?.state?.type)
      setLoading(false);
      const getCampaignDetails = await adminCampaignApi.getCampaignDetails(token);
      if (getCampaignDetails.data.success) {
        // console.log(getCampaignDetails.data.data.description)
        setlogoImg(
          helper.CampaignAdminLogoPath + getCampaignDetails.data.data?.logo
            ? helper.CampaignAdminLogoPath + getCampaignDetails.data.data?.logo
            : noimg
        );
        // console.log(getCampaignDetails.data.data)
        setData(getCampaignDetails.data.data);
      }

      setLoading(false);
    })();
  }, [user.isUpdateOrg, location]);

  // let data ={}
  return (
    <NoFooter>
      <Container fluid>
        <Tab.Container defaultActiveKey={selectedTabKey} onSelect={(key) => setSelectedTabKey(key)}>
          <div className="user__detail-wrap d-sm-flex">
            <div className="user__detail d-sm-flex px-sm-1">
              <div className="tab__menu d-sm-flex flex-column align-items-center">
                <div className="user__img-wrap mt-4 mb-5 w-100 d-none d-sm-block">
                  <div className="user__img-content">
                    <div
                      className="user__img"
                      style={{
                        backgroundImage:
                          // "url(https://uploads-ssl.webflow.com/59df9e77ad9420000140eafe/5d379d1d11c09e5a51bdeb78_image-250nw-1124572691.jpg)",
                          'url(' + logoImg + ')',
                        width: '120px'
                      }}
                    >
                      {/* <img src={ImageExist(helper.CampaignAdminLogoPath + data?.logo) ? helper.CampaignAdminLogoPath + data?.logo : noimg} alt='logo' /> */}
                    </div>
                  </div>
                </div>

                {/* for mobile */}
                {isMobile ? (
                  <div className="mobile-tab">
                    <Button
                      variant="link"
                      onClick={() => setDropdown(!dropdown)}
                      className="toggle__btn d-flex align-items-center text-dark"
                    >
                      <span className="tab__icon">
                        {selectedTabKey === 'dashboard' ? <DashboardIcon active={true} /> : ''}
                        {selectedTabKey === 'posts' ? <PostsIcon active={true} /> : ''}
                        {selectedTabKey === 'xp' ? <ActivityIcon active={true} /> : ''}
                        {selectedTabKey === 'tax' ? <TaxIcon active={true} /> : ''}
                        {selectedTabKey === 'history' ? <ProjectIcon active={true} /> : ''}
                        {selectedTabKey === 'settings' ? <SettingsIcon active={true} /> : ''}
                      </span>
                      <span className="tab__text text-capitalize">{selectedTabKey}</span>
                      <span className="d-flex align-items-center ms-auto">
                        {selectedTabKey === 'items' ? (
                          <span className="item__total-wrap d-flex ms-3">
                            <FontAwesomeIcon
                              icon={solid('money-bills-simple')}
                              className="text-dark mr-12p fs-4"
                            />
                            USD $1,309.00
                          </span>
                        ) : (
                          ''
                        )}

                        <FontAwesomeIcon icon={solid('caret-down')} className="ms-auto" />
                      </span>
                    </Button>

                    {dropdown ? (
                      <div className="tab__dropdown w-100">
                        <AdminTabs
                          _onClick={() => setDropdown(false)}
                          activeKey={selectedTabKey}
                          data={data}
                        />
                      </div>
                    ) : (
                      ''
                    )}
                  </div>
                ) : (
                  <div className="desktop__tab">
                    <AdminTabs activeKey={selectedTabKey} data={data} />
                  </div>
                )}
              </div>
            </div>
            <div className="flex-grow-1 tab-content">
              <Outlet context={[data, setData]} />
            </div>
            {/* <Tab.Content className="flex-grow-1">
              <Tab.Pane eventKey="dashboard">
                <AdminDashboard />
              </Tab.Pane>
              <Tab.Pane eventKey="posts">
              
                <AdminPosts organizationDetails={props.organizationDetails}  getProductList={props.getProductList} productList={props.productList}   />
              </Tab.Pane>
              <Tab.Pane eventKey="activity">
                <UserXp />
              </Tab.Pane>
              <Tab.Pane eventKey="tax">
                <UserTax />
              </Tab.Pane>
              <Tab.Pane eventKey="project">
                <UserXp />
              </Tab.Pane>
              <Tab.Pane eventKey="settings">
                <UserSettingsTab organizationDetails={props.organizationDetails} />
              </Tab.Pane>
            </Tab.Content> */}
          </div>
        </Tab.Container>
      </Container>
    </NoFooter>
  );
}

export default AdminDetail;
