import ActivityItem from "../../../molecules/activity-item";
import React, { useState, useEffect } from "react";
import snooze from '../../../../../../assets/images/mute.svg';

function ActivityList(props) {
  const [allNotificationList, setAllNotificationList] = useState([]);
  const notificationList = props.notificationList;

  useEffect(() => {
    if (notificationList.length > 0) {
      const temp = notificationList.filter((notification) => {
        // Only filter out notifications where removed is explicitly true
        const isRemoved = notification?.userNotificationDetails?.removed === true;
        return !isRemoved;
      });
      setAllNotificationList(temp);
    } else {
      setAllNotificationList([]);
    }
  }, [notificationList]);

  return allNotificationList.length > 0 ? (
    <ul className="cd__cart__list list-unstyled mb-0 p-0">
      {allNotificationList.map((notification, i) => (
        <ActivityItem
        notification={notification}
        setWatchNotification={props.setWatchNotification}
        removeNotification={props.removeNotification}
        onNotificationUpdate={props.onNotificationUpdate} // Pass it here
        key={i}
        />
      ))}
    </ul>
  ) : (
    <div className="empty__block pt-5">
      <div className="empty__cart mb-2">
        <img src={snooze} alt="" width="90%" />
      </div>
      <div className="no__items-found fw-bold">You have no notifications.</div>
    </div>
  );
}

export default ActivityList;
