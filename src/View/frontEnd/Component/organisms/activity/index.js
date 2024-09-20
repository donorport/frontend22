import React, { useState, useEffect } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import ActivityList from './activity-list';
import FollowingList from './following-list';
import NotificationSettings from '../../molecules/notification-settings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';

import './style.scss';

const Activity = (props) => {
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    empty: false,
    following: false,
    settings: false,
    allRead: false,
  });
  const [allNotificationList, setAllNotificationList] = useState([]);
  const [notificationList, setNotificationList] = useState([]);

  useEffect(() => {
    // Assuming you fetch the notification list from props or an API
    if (props.notificationList.length > 0) {
      const tempList = props.notificationList.filter(
        (notification) => !notification?.userNotificationDetails?.removed
      );
      setNotificationList(tempList);
      const allWatched = tempList.every(
        (notification) => notification.userNotificationDetails?.watched
      );
      setState((prevState) => ({ ...prevState, allRead: allWatched }));
      setAllNotificationList(tempList.map((notification) => notification._id));
    } else {
      setNotificationList([]);
    }
  }, [props.notificationList]);

  const markAllNotifications = async (isRead) => {
    setLoading(true);
    try {
      const response = await axios.post('/api/notification/read', {
        isRead,
        allNotificationList, // Send the array of notification IDs
      });

      // Update the notification list in state with the updated data from backend
      setNotificationList(response.data.notifications);

      // Update the "allRead" state based on the action performed
      setState((prevState) => ({ ...prevState, allRead: isRead }));
    } catch (error) {
      console.error('Error marking all notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleMarkAll = () => {
    const newReadState = !state.allRead;
    markAllNotifications(newReadState);
  };

  const ActivityButton = React.forwardRef(({ children, onClick }, ref) => (
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
  ));

  return (
    <>
      <Dropdown className="d-flex" autoClose="outside">
        <Dropdown.Toggle as={ActivityButton} id="dropdown-custom-components">
          {!state.allRead && (
            <div
              className="c__badge"
              style={{ width: '12px', height: '12px', background: '#cb6f74' }}
            ></div>
          )}
          <span className="icon activity-icon d-flex align-items-center">
            <FontAwesomeIcon icon={solid('bell')} />
          </span>
        </Dropdown.Toggle>

        <Dropdown.Menu
          className="activity__dropdown w-350 dropdown-top-arrow"
          style={{ transform: 'translate(45px, 30px) !important' }}
        >
          <div className="dropdown__inner">
            <div className="d-flex activity__dropdown-header border-bottom">
              {state.following || state.settings ? (
                <Button
                  variant="link"
                  className="btn__link-light px-6p text-decoration-none"
                  onClick={() => setState((prevState) => ({ ...prevState, following: false, settings: false }))}
                >
                  <FontAwesomeIcon icon={solid('chevron-left')} />
                </Button>
              ) : (
                ''
              )}

              <div>{state.following ? 'Following' : state.settings ? 'Notification Settings' : 'Activity'}</div>

              {!(state.following || state.settings) ? (
                <Button
                  variant="link"
                  className="ms-auto view__more-activity btn__link-light px-6p fs-4 text-decoration-none"
                  onClick={() => setState((prevState) => ({ ...prevState, following: true }))}
                >
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
                    onClick={toggleMarkAll}
                  >
                    {state.allRead ? 'Mark all unread' : 'Mark all read'}
                    {loading && <CircularProgress className="ms-1" color="inherit" size={10} />}
                  </Button>
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
                  notificationList={notificationList}
                  setWatchNotification={props.setWatchNotification}
                  removeNotification={props.removeNotification}
                />
              )}
            </div>
            <div className="activity__dropdown-footer border-top"></div>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default Activity;
