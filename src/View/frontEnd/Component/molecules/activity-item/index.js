import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Button } from 'react-bootstrap';
import ListItemImg from '../../atoms/list-item-img';
import helper from '../../../../../Common/Helper';
import moment from 'moment';
import { Link } from 'react-router-dom';
import download from '../../../../../assets/images/download.svg';
import camera from '../../../../../assets/images/camera.svg';

function ActivityItem(props) {
  // Use active state from the notification's watched value
  const [active, setActive] = useState(props.notification.userNotificationDetails?.watched || false);

  const toggleNotification = async () => {
    const newActiveState = !active;
    try {
      // Call the backend to toggle watched/unwatched state
      await props.setWatchNotification(
        newActiveState,
        props.notification._id,
        newActiveState ? 'watched' : 'unwatched'
      );
      setActive(newActiveState);

      console.log(`Notification ${props.notification._id} is now ${newActiveState ? 'watched' : 'unwatched'}`);

      // Notify parent component (Activity) to check if all notifications are read/unread
      if (props.onNotificationUpdate) {
        props.onNotificationUpdate(); // Call the function if it's provided
      }
    } catch (error) {
      console.error("Error toggling notification:", error);
    }
  };

  useEffect(() => {
    // Update the local active state when the parent passes a new watched state
    setActive(props.notification.userNotificationDetails?.watched || false);
  }, [props.notification.userNotificationDetails?.watched]);

  let notification = props.notification;
  let name =
    notification.type === 'PRODUCT'
      ? notification?.productDetails?.headline
      : notification?.projectDetails?.name;
  let image =
    notification.type === 'PRODUCT'
      ? helper.CampaignProductImagePath + notification?.productDetails?.image
      : helper.CampaignAdminLogoPath + notification?.campaignadminDetails?.logo;
  let organizationName = notification?.campaignadminDetails?.name;

  let watched = notification?.userNotificationDetails?.watched || false;
  let date = notification.created_at;
  let info = notification.info;
  let infoType = notification.infoType;
  let mediaImage = camera;
  let uploadImage = download;

  let orgLogo = helper.CampaignAdminLogoPath + notification?.campaignadminDetails?.logo;
  let displayImg = notification.type === 'PRODUCT' && infoType === 'FUNDED' ? image : orgLogo;

  if (infoType && infoType === 'MEDIA') {
    displayImg = mediaImage;
  }
  if (infoType === 'TAX_RECEIPT' || infoType === 'SALES_RECEIPT') {
    displayImg = uploadImage;
  }

  return (
    <li
      style={{ background: active ? '$secondary-3' : '$neutral-300' }}
      className="ad__activity__item px-1 py-2 d-flex align-items-center border-bottom"
    >
      <div className="d-flex gap-2 align-items-center flex-grow-1">
        <ListItemImg size={56} imgSrc={displayImg} />
        <div className="ad__activity__main">
          <div className="ad__activity__title">
            {info && infoType !== 'FUNDED' ? (
              <h6 className="ad__activity__name">{organizationName}</h6>
            ) : (
              <Link
                to={'/item/' + notification?.productDetails?.slug}
                className="fw-bold fs-6 ad__activity__sub-name"
              >
                {name}
              </Link>
            )}

            {info ? (
              <div className="fs-7 ad__activity__sub-name mt-3p fw-semibold">{info}</div>
            ) : (
              <div className="fs-7 ad__activity__sub-name mt-3p fw-semibold">
                {organizationName}
              </div>
            )}

            {notification.type === 'PROJECT' && infoType !== 'FUNDED' && !info && (
              <div className="ad__activity__title fs-7">
                {notification?.projectDetails?.fundingPercentage}% Funded
              </div>
            )}

            <div className="ad__activity__sub-name">{moment(date).fromNow()}</div>
          </div>
        </div>
        <div className="ad__activity__right d-flex align-items-center">
          <Button
            size="sm"
            variant="link"
            className="text-decoration-none"
            onClick={toggleNotification}
          >
            {!active ? (
              <FontAwesomeIcon icon={solid('circle')} />
            ) : (
              <FontAwesomeIcon icon={regular('circle')} />
            )}
          </Button>
        </div>
      </div>
      <div className="ad__activity__remove ms-auto">
        <Button
          size="sm"
          variant="link"
          className="btn__link-light text-decoration-none"
          onClick={() => props.removeNotification(notification._id)}
        >
          <FontAwesomeIcon icon={solid('xmark')} />
        </Button>
      </div>
    </li>
  );
}

export default ActivityItem;
