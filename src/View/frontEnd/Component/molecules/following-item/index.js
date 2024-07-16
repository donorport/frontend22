import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Button } from 'react-bootstrap';
import ListItemImg from '../../atoms/list-item-img';
import helper from '../../../../../Common/Helper';
import { Link } from 'react-router-dom';
//import profile from '../../../../../assets/images/avatar.png';

import './style.scss';

function FollowingItem(props) {
  const data = props.data;
  const followToOrganization = props.followToOrganization;
  const removeFollowedOrganization = props.removeFollowedOrganization;

  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(data.isFollow);
  }, [data]);

  const onClickBell = async () => {
    await followToOrganization(data?.CampaignAdminDetails?._id, !active);
  };

  const removeOrg = async () => {
    await removeFollowedOrganization(data?._id);
  };
  let notificationType = data.type;
  let avatar = '';
  switch (notificationType) {
    case 'PROJECT':
      avatar = data?.projImageDetails[0]?.image
        ? helper.ProjectFullImagePath + data?.projImageDetails[0]?.image
        : 'https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/5f4ab31be9fe7d7453a60b1f_user.svg';
      break;
    case 'PRODUCT':
      avatar = data?.productDetails[0]?.image
        ? helper.CampaignProductFullImagePath + data?.productDetails[0]?.image
        : 'https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/5f4ab31be9fe7d7453a60b1f_user.svg';
      break;
    case 'ORGANIZATION':
      avatar = data?.CampaignAdminDetails?.logo
        ? helper.CampaignAdminLogoPath + data?.CampaignAdminDetails?.logo
        : 'https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/5f4ab31be9fe7d7453a60b1f_user.svg';
      break;

    default:
      break;
  }

  return (
    <li className="ad__activity__item px-2 py-4 d-flex align-items-center border-bottom ">
      <div className="d-flex align-items-center flex-grow-1">
        {data.type === 'PROJECT' && (
          <div className="charity_avatar_cover">
            <img src={avatar} alt="avatar"/>
          </div>
        )}
        {data.type !== 'PROJECT' && (
          <ListItemImg size={56} imgSrc={avatar} className="charity_avatar_bg" />
        )}
        <div className="ad__activity__main px-12p" style={{ width: '110px' }}>
          <div className="ad__activity__title">
            {data.type === 'PROJECT' && (
              <Link
                to={'/project/' + data?.projectDetails?.slug}
                className="ad__activity__name mb-0 text-decoration-none  fw-bold"
              >
                {data?.projectDetails[0]?.name}
              </Link>
            )}
            {data.type === 'PRODUCT' && (
              <Link
                to={'/item/' + data?.productDetails[0]?.slug}
                className="ad__activity__name mb-0 text-decoration-none  fw-bold"
              >
                {data?.productDetails[0]?.headline}
              </Link>
            )}
            {data.type === 'ORGANIZATION' && (
              <Link
                to={'/organization/' + data?.CampaignAdminDetails?.slug}
                className="ad__activity__name mb-0 text-decoration-none  fw-bold"
              >
                {data?.CampaignAdminDetails?.name}
              </Link>
            )}
          </div>
        </div>
        <div className="ad__activity__right d-flex align-items-center me-2 text-nowrap">
          <Button
            variant="link"
            className="btn__link-light p-0 text-decoration-none btn__follow fs-3"
            // onClick={() => setActive(!active)}
            onClick={() => onClickBell()}
          >
            {active ? (
              <FontAwesomeIcon icon={solid('bell')} />
            ) : (
              <FontAwesomeIcon icon={regular('bell-slash')} />
            )}
          </Button>
        </div>
      </div>
      <div className="ad__activity__remove ms-auto">
        <Button
          variant="danger"
          size="md"
          className="btn__remove-follow text-decoration-none"
          onClick={() => removeOrg()}
        >
          <FontAwesomeIcon icon={regular('circle-minus')} />
        </Button>
      </div>
    </li>
  );
}

export default FollowingItem;
