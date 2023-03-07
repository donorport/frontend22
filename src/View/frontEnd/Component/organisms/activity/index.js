import React, { useState, useEffect } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import ActivityList from './activity-list';
import FollowingList from './following-list';
import NotificationSettings from '../../molecules/notification-settings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { light, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import CircularProgress from '@mui/material/CircularProgress';

import './style.scss';

const Activity = (props) => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    empty: false,
    following: false,
    settings: false,
    allRead: false
  });
  const [allNotificationList, setAllNotificationList] = useState([]);

  const moreClick = () => {
    setState({ ...state, following: true });
  };

  const goBack = () => {
    setState({ ...state, following: false, settings: false });
  };

  const showSettings = () => {
    setState({ ...state, settings: true });
  };

  const markNotification = async () => {
    // setState({ ...state, allRead: !state.allRead });
    setLoading(true);
    await props.notificationMarkAsRead(!state.allRead, allNotificationList);
  };

  const ActivityButton = React.forwardRef(({ children, onClick }, ref) => {
    return (
      <Button
        ref={ref}
        variant="link"
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
        className="position-relative p-0 icon__btn text-decoration-none"
      >
        {children}
      </Button>
    );
  });
  // let len = !props.notificationList.filter(e => e?.userNotificationDetails) ? props.notificationList :
  // props.notificationList.filter(e => e?.userNotificationDetails?.removed === false)
  // console.log(props.notificationList)
  // console.log(props.notificationList.find(e => e.userNotificationDetails.removed === true))
  // console.log(props.notificationList.filter(e => e.userNotificationDetails.removed === true).length)
  useEffect(() => {
    // console.log(props.notificationList)
    if (props.notificationList.length > 0) {
      let n_id = [];
      let temprray = [];

      props.notificationList.map((notification, i) => {
        let isRemoved = notification?.userNotificationDetails?.removed
          ? notification?.userNotificationDetails?.removed
          : false;
        if (!isRemoved) {
          n_id.push(notification._id);
          temprray.push(notification);
        }
      });
      setLoading(false);
      setAllNotificationList(n_id);
      // console.log(temprray.filter(e => e.userNotificationDetails?.watched).length)

      // if (temprray.filter(e => e.userNotificationDetails?.watched === true)) {
      if (temprray.length > 0) {
        if (temprray.filter((e) => e.userNotificationDetails?.watched).length === temprray.length) {
          setState({ ...state, allRead: true });
        } else {
          setState({ ...state, allRead: false });
        }
      } else {
        setState({ ...state, allRead: true });
      }
      // console.log('watched',temprray.filter(e => e.userNotificationDetails?.watched).length )
      // console.log('all',temprray.length )
    } else {
      setState({ ...state, allRead: true });
    }

    // let isRemoved = props.notificationList.filter(e => e.userNotificationDetails.removed === true)
    // console.log(props.notificationList.filter(e => e?.userNotificationDetails?.removed===true && e?.userNotificationDetails?.watched===false ).length)
    // if (props.notificationList.filter(e => e.userNotificationDetails.watched === true).length === isRemoved.length) {
    //   setState({ ...state, allRead: true });
    // } else {
    //   setState({ ...state, allRead: false });

    // }
  }, [props.notificationList]);

  return (
    <>
      <Dropdown className="d-flex" autoClose="outside">
        <Dropdown.Toggle as={ActivityButton} id="dropdown-custom-components">
          {
            // props.notificationList.filter(e => e?.userNotificationDetails?.removed === false).length > 0 &&
            !state.allRead && (
              <div
                className="c__badge"
                style={{ width: '12px', height: '12px', background: '#cb6f74' }}
              ></div>
            )
          }
          <span className="icon activity-icon d-flex align-items-center">
            <FontAwesomeIcon icon={solid('bell')} />
          </span>
        </Dropdown.Toggle>

        <Dropdown.Menu
          className="activity__dropdown w-310 dropdown-top-arrow"
          style={{ transform: 'translate(45px, 30px) !important' }}
        >
          <div className="dropdown__inner">
            <div className="d-flex activity__dropdown-header">
              {state.following || state.settings ? (
                <Button
                  variant="link"
                  className="btn__link-light px-6p text-decoration-none"
                  onClick={() => goBack()}
                >
                  {/* <i className="fa-solid fa-chevron-left"></i> */}
                  <FontAwesomeIcon icon={solid('chevron-left')} />
                </Button>
              ) : (
                ''
              )}

              <div>
                {state.following
                  ? 'Following'
                  : state.settings
                  ? 'Notification Settings'
                  : 'Activity'}
              </div>

              {!(state.following || state.settings) ? (
                <Button
                  variant="link"
                  className="ms-auto view__more-activity btn__link-light px-6p fs-4 text-decoration-none"
                  onClick={() => moreClick()}
                >
                  {/* <i className="fa-regular fa-ellipsis-stroke-vertical"></i> */}
                  <FontAwesomeIcon icon={solid('ellipsis-stroke-vertical')} />
                </Button>
              ) : (
                ''
              )}
            </div>

            <div className="activity__dropdown-body">
              {!(state.following || state.settings) ? (
                <div className="activity__controls px-2">
                  <Button
                    variant="link"
                    className="px-0 btn__link-light mark__feed text-decoration-none"
                    onClick={() => !loading && markNotification()}
                  >
                    {state.allRead ? 'Mark all unread' : 'Mark all read'}
                    {loading && <CircularProgress className="ms-1" color="inherit" size={10} />}
                  </Button>

                  {/*   <Button
                    variant="link"
                    className="btn__link-light activity__settings ms-auto px-0"
                    onClick={() => showSettings()}
                  >
                    <FontAwesomeIcon icon={solid('gear')} />
                  </Button>*/}
                </div>
              ) : (
                ''
              )}

              {state.following ? (
                <FollowingList
                  followedOrganizationList={props.followedOrganizationList}
                  followToOrganization={props.followToOrganization}
                  removeFollowedOrganization={props.removeFollowedOrganization}
                />
              ) : state.settings ? (
                <NotificationSettings />
              ) : (
                <ActivityList
                  notificationList={props.notificationList}
                  setWatchNotification={props.setWatchNotification}
                  removeNotification={props.removeNotification}
                />
              )}
            </div>

            <div className="activity__dropdown-footer"></div>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default Activity;
