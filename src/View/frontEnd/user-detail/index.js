import React, { useState, useEffect } from 'react';
import { Tab, Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import useWindowSize from '../../../hooks/device-check';
import UserTabs from '../Component/organisms/user-tabs';
import {
  ItemsIcon,
  XpIcon,
  TaxIcon,
  HistoryIcon,
  SettingsIcon
} from '../Component/organisms/user-tabs/tab-icons';
import userApi from '../../../Api/frontEnd/user';
import helper from '../../../Common/Helper'; //, { ImageExist }
import AvatarImg from '../../../assets/images/avatar.png';
import { useSelector } from 'react-redux';
import NoFooter from '../Component/templates/no-footer';
import Page from '../../../components/Page';

import './style.scss';

function UserDetail(props) {
  // const user = useContext(UserContext)
  const user = useSelector((state) => state.user);
  const [totalPriceArray, setTotalPriceArray] = useState([]);
  const userAuthToken = localStorage.getItem('userAuthToken');
  const [selectedTabKey, setSelectedTabKey] = useState('');
  const [dropdown, setDropdown] = useState(false);
  const isMobile = useWindowSize() <= 575;
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [profileImg, setProfileImg] = useState('');
  const location = useLocation();

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
      setLoading(true);
      const getUserDetails = await userApi.getUserDetails(userAuthToken);
      if (getUserDetails) {
        if (getUserDetails.data.success) {
          setProfileImg(
            getUserDetails.data.data?.image &&
            (getUserDetails.data.data.image.startsWith('http://') || getUserDetails.data.data.image.startsWith('https://'))
              ? getUserDetails.data.data.image
              : getUserDetails.data.data?.image
                ? helper.DonorImagePath + getUserDetails.data.data.image
                : AvatarImg // Fallback to AvatarImg if no image is provided
          );
          setData(getUserDetails.data.data);
        } else {
          localStorage.clear();
          navigate('/');
        }
      } else {
        localStorage.clear();
        navigate('/');
      }
  
      setLoading(false);
    })();
  
    setSelectedTabKey(location.pathname.split('/')[3]);
  }, [user.isUpdateUserDetails]);
  

  return (
    <Page title={'Donorport | ' + data?.name}>
      <NoFooter>
  
        <Container fluid>
          <Tab.Container
            defaultActiveKey={selectedTabKey}
            onSelect={(key) => setSelectedTabKey(key)}
          >
            <div className="user__detail-wrap d-sm-flex">
              <div className="user__detail d-sm-flex px-sm-1">
                <div className="tab__menu d-sm-flex flex-column align-items-center">
                  <div className="user__img-wrap mb-4 py-3 w-100 d-none d-sm-block">
                    <div className="user__img-content">
                      <div
                        className="user__img donor_avatar_bg"
                        style={{
                          backgroundImage: 'url(' + profileImg + ')'
                        }}
                      ></div>
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
                          {/* {selectedTabKey === 'dashboard' ? <DashboardIcon active={true} /> : ''}*/}
                          {selectedTabKey === 'items' ? <ItemsIcon active={true} /> : ''}
                          {selectedTabKey === 'xp' ? <XpIcon active={true} /> : ''}
                          {selectedTabKey === 'tax' ? <TaxIcon active={true} /> : ''}
                          {selectedTabKey === 'history' ? <HistoryIcon active={true} /> : ''}
                          {selectedTabKey === 'settings' ? <SettingsIcon active={true} /> : ''}
                        </span>
                        <span className="tab__text text-capitalize">{selectedTabKey}</span>
                        <span className="d-flex align-items-center ms-auto">
                          {selectedTabKey === 'items' ? (
                            <div>
                              {totalPriceArray.length > 0 &&
                                totalPriceArray.map((val, key) => {
                                  return (
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
                                  );
                                })}
                            </div>
                          ) : (
                            ''
                          )}

                          <FontAwesomeIcon icon={solid('caret-down')} className="ms-auto" />
                        </span>
                      </Button>

                      {dropdown ? (
                        <div className="tab__dropdown w-100">
                          <UserTabs
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
                      <UserTabs activeKey={selectedTabKey} data={data} />
                    </div>
                  )}
                </div>
              </div>

              <div className="d-flex flex-column gap-4 flex-grow-1 tab-content">
                <Outlet context={[data, setData]} />
              </div>
              {/* <Tab.Content className="flex-grow-1">
              <Tab.Pane eventKey="dashboard">
                <UserDashboard />
              </Tab.Pane>
              <Tab.Pane eventKey="items">
                <UserItems />
              </Tab.Pane>
              <Tab.Pane eventKey="xp">
                <UserXp />
              </Tab.Pane>
              <Tab.Pane eventKey="tax">
                <UserTax />
              </Tab.Pane>
              <Tab.Pane eventKey="history">
                <UserHistory />
              </Tab.Pane>
              <Tab.Pane eventKey="settings">
                <UserSettingsTab />
              </Tab.Pane>
            </Tab.Content> */}
            </div>
          </Tab.Container>
        </Container>
      </NoFooter>
    </Page>
  );
}

export default UserDetail;
