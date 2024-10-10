import React, { useState, useEffect } from 'react';
import { Tab, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import Page from '../../../components/Page';
import AdminTabs from '../Component/organisms/admin-tabs';
import useWindowSize from '../../../hooks/device-check';
import {
  PostsIcon,
  ActivityIcon,
  TaxIcon,
  ProjectIcon,
  SettingsIcon,
  CrowdfundingIcon
} from '../Component/organisms/admin-tabs/tab-icons';
import './style.scss';
import helper from '../../../Common/Helper';
import adminCampaignApi from '../../../Api/admin/adminCampaign';
import { Outlet, useLocation } from 'react-router-dom';
import noimg from '../../../assets/images/avatar.png';
import { useSelector } from 'react-redux';
import NoFooter from '../Component/templates/no-footer';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';

function AdminDetail() {
  // const user = useContext(UserContext)
  const user = useSelector((state) => state.user);
  const [totalPriceArray, setTotalPriceArray] = useState([]);
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
  //let currentOption = location.pathname.split('/')[3];
  const [logoImg, setlogoImg] = useState('');

  useEffect(() => {
    if (dropdown) {
      // Disable scrolling when the dropdown is open
      document.body.style.overflow = 'hidden';
    } else {
      // Enable scrolling when the dropdown is closed
      document.body.style.overflow = 'auto';
    }

    // Make sure to reset the scroll behavior when the component unmounts
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [dropdown]);
  
  useEffect(() => {
    (async () => {
      // console.log(location?.state?.type)
      setLoading(true);
      const getCampaignDetails = await adminCampaignApi.getCampaignDetails(token);
      if (getCampaignDetails.data.success) {
        // console.log(getCampaignDetails.data.data.description)
        setlogoImg(
          getCampaignDetails.data.data?.logo
            ? helper.CampaignAdminLogoPath + getCampaignDetails.data.data?.logo
            : noimg
        );
        console.log('admin-detail component:\n~~ useEffect:', {
          campaignDetails_results: getCampaignDetails.data.data
        });
        setData(getCampaignDetails.data.data);
      }

      setLoading(false);
    })();
    setSelectedTabKey(location.pathname.split('/')[3]);
  }, [user.isUpdateOrg, location]);

  // let data ={}
  return (
    <Page title="Donorport | Admin" description="Access to dministrator settings">
      <NoFooter>
        <Container fluid>
          <Tab.Container
            defaultActiveKey={selectedTabKey}
            onSelect={(key) => setSelectedTabKey(key)}
          >
            <div className="user__detail-wrap d-sm-flex">
              <div className="user__detail d-sm-flex px-sm-1">
                <div className="tab__menu d-sm-flex flex-column align-items-center">
                  <div className="user__img-wrap mb-4 w-100 d-none d-sm-block">
                    <div className="user__img-content py-3">
                      <div
                        className="user__img user__img--admin charity_avatar_bg"
                        style={{
                          backgroundImage:
                            // "url()",
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
                        className="toggle__btn d-flex align-items-center "
                      >
                        <span className="tab__icon">
                          {/* {selectedTabKey === 'dashboard' ? <DashboardIcon active={true} /> : ''} */}
                          {selectedTabKey === 'posts' ? <PostsIcon active={true} /> : ''}
                          {selectedTabKey === 'activity' ? <ActivityIcon active={true} /> : ''}
                          {selectedTabKey === 'tax' ? <TaxIcon active={true} /> : ''}
                          {selectedTabKey === 'project' ? <ProjectIcon active={true} /> : ''}
                          {selectedTabKey === 'settings' ? <SettingsIcon active={true} /> : ''}
                          {selectedTabKey === 'crowdfunding' ? <CrowdfundingIcon active={true} /> : ''}
                        </span>
                        <span className="tab__text text-capitalize">{selectedTabKey}</span>
                        <span className="d-flex align-items-center ms-auto">
                          {selectedTabKey === 'items' && (
                            <div>
                              {totalPriceArray.length > 0 &&
                                totalPriceArray.map((val, key) => (
                                  <span
                                    key={key}
                                    className="d-none d-sm-flex item__total-wrap d-flex ms-3"
                                  >
                                    <FontAwesomeIcon
                                      icon={solid('money-bills-simple')}
                                      className=" mr-12p fs-4"
                                    />
                                    {val[0]} {val[1]}
                                  </span>
                                ))}
                            </div>
                          )}

                          <FontAwesomeIcon icon={solid('caret-down')} className="ms-auto" />
                        </span>
                      </Button>

                      {dropdown ? (
                        <div className="tab__dropdown pt-0 w-100">
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
                    <div className="desktop__tab w-100">
                      <AdminTabs activeKey={selectedTabKey} data={data} />
                    </div>
                  )}
                </div>
              </div>
              <div className="d-flex flex-column gap-4 flex-grow-1 tab-content mt-3 mt-sm-0">
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
        <div className="App">
          <TawkMessengerReact propertyId="647f8495cc26a871b0210594" widgetId="1h291rq9e" />
        </div>
      </NoFooter>
    </Page>
  );
}

export default AdminDetail;
