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
  // const countProjectProcess = (data) => {
  //   // console.log(data)
  //   let totalQArray = []
  //   let soldOutQArray = []
  //   let per = 0

  //   if (data.length > 0) {
  //     data.map((p, i) => {
  //       // console.log(p.itemDetails)
  //       totalQArray.push(Number(p.itemDetails.quantity))
  //       soldOutQArray.push(Number(p.itemDetails.soldout))
  //     })

  //     const total = totalQArray.reduce((partialSum, a) => partialSum + a, 0);
  //     const soldout = soldOutQArray.reduce((partialSum, a) => partialSum + a, 0);

  //     per = soldout / total * 100
  //   } else {
  //     per = 0;

  //   }
  //   return Math.round(per);

  // }
  // const countProjectProcess = (data) => {
  //   // console.log(data)
  //   let totalQArray = []
  //   let soldOutQArray = []
  //   let per = 0

  //   if (data?.length > 0) {
  //     data.map((p, i) => {
  //       // console.log(p.itemDetails)
  //       if (!p.itemDetails.unlimited) {
  //         totalQArray.push(Number(p.itemDetails.quantity))
  //         soldOutQArray.push(Number(p.itemDetails.soldout))
  //       }

  //     })

  //     const total = totalQArray.reduce((partialSum, a) => partialSum + a, 0);
  //     const soldout = soldOutQArray.reduce((partialSum, a) => partialSum + a, 0);
  //     if (soldout === 0 || total === 0) {
  //       per = 0
  //     } else {
  //       per = Number(soldout) / Number(total) * 100
  //     }

  //   } else {
  //     per = 0;

  //   }
  //   return Math.round(per);

  // }
  //const CampaignAdmin = JSON.parse(localStorage.getItem('CampaignAdmin'));
  //const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  //const userAuthToken = localStorage.getItem('userAuthToken');
  //const token = userAuthToken ? userAuthToken : CampaignAdminAuthToken;

  let userData = props.userData;
  let newSlug;
  if (userData) {
    newSlug = userData.name.split(/\s/).join('');
  } else {
    newSlug = '';
  }
  const countProjectProcess = (data) => {
    let allProductPer = [];

    let per = 0;

    if (data?.length > 0) {
      data.map((p) => {
        if (!p.itemDetails.unlimited) {
          let itm = (Number(p.itemDetails.soldout) / Number(p.itemDetails.quantity)) * 100;
          allProductPer.push(itm);
        } else {
          allProductPer.push(0);
        }
      });

      const total = allProductPer.reduce((partialSum, a) => partialSum + a, 0);
      per = total / allProductPer.length;
      per = Math.round(per);
    } else {
      per = 0;
    }
    return Math.round(per);
  };

  const [active, setActive] = useState(false);
  let notification = props.notification;
  // console.log(notification)
  let name =
    notification.type === 'PRODUCT'
      ? notification?.productDetails?.headline
      : notification?.projectDetails?.name;
  let image =
    notification.type === 'PRODUCT'
      ? helper.CampaignProductImagePath + notification?.productDetails?.image
      : helper.CampaignAdminLogoPath + notification?.campaignadminDetails?.logo;
  let organizationName = notification?.campaignadminDetails?.name;

  // let watched = notification.watched
  let watched = notification?.userNotificationDetails?.watched
    ? notification?.userNotificationDetails?.watched
    : false;

  let date = notification.created_at;

  let info = notification.info;
  let infoType = notification.infoType;
  let mediaImage = camera;
  let uploadimage = download;

  let orgLogo = helper.CampaignAdminLogoPath + notification?.campaignadminDetails?.logo;

  let displayImg = notification.type === 'PRODUCT' && infoType === 'FUNDED' ? image : orgLogo;

  if (infoType && infoType === 'MEDIA') {
    displayImg = mediaImage;
  }
  if (infoType && infoType === 'TAX_RECEIPT' || infoType === 'SALES_RECEIPT') {
    displayImg = uploadimage;
  }

  useEffect(() => {
    // if(notification?.userNotificationDetails){

    // }else{

    // }
    setActive(watched);
  }, [watched]);

  return (
    <li
      style={{ background: active ? '#f8fafd' : '#fff' }}
      className="ad__activity__item px-1 py-2 d-flex align-items-center border-bottom"
    >
      <div className="d-flex align-items-center flex__1">
        <ListItemImg size={56} imgSrc={displayImg} />
        <div className="ad__activity__main px-12p">
          <div className="ad__activity__title">
            {info && infoType !== 'FUNDED' ? (
              <div className="ad__activity__name">{organizationName}</div>
            ) : (
              <Link
                to={'/item/' + notification?.productDetails.slug}
                className="text-dark fw-bold fs-6 ad__activity__sub-name"
              >
                {name}
              </Link>
            )}

            {/* <div className="ad__activity__name">{ notification.type}</div> */}
            {info ? (
              <div className="fs-7 ad__activity__sub-name mt-3p fw-semibold">{info}</div>
            ) : (
              <div className="fs-7 ad__activity__sub-name mt-3p fw-semibold">
                {organizationName}
              </div>
            )}

            {/*  {infoType === 'TAX_RECEIPT' ? (
              <Link
                to={'/user/' + newSlug + '/tax/'}
                className="fs-7 ad__activity__sub-name mt-3p fw-semibold"
                style={{ border: '1px solid' }}
              >
                {info}
              </Link>
            ) : (
              <div className="fs-7 ad__activity__sub-name mt-3p fw-semibold">{organizationName}</div>
            )}*/}

            {notification.type === 'PROJECT' && infoType !== 'FUNDED' && !info && (
              <div className="ad__activity__title fs-7">
                {countProjectProcess(notification.productDetails)}% Funded
              </div>
            )}

            <div className="ad__activity__sub-name">{moment(date).fromNow()}</div>
          </div>
        </div>
        <div className="ad__activity__right d-flex align-items-center">
          <Button
            variant="link"
            className="text-decoration-none"
            onClick={() => props.setWatchNotification(!active, notification._id)}
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
