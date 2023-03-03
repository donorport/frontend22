import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Button } from 'react-bootstrap';
import ListItemImg from '../../atoms/list-item-img';
import helper from '../../../../../Common/Helper';
import { Link } from 'react-router-dom';
import profile from '../../../../../assets/images/avatar.png';

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

  let avatar = data?.CampaignAdminDetails?.logo
    ? helper.CampaignAdminLogoPath + data?.CampaignAdminDetails?.logo
    : profile;

  return (
    <li className="ad__activity__item p-1 d-flex align-items-center border-bottom bg-white">
      <div className="d-flex align-items-center flex-grow-1">
        <ListItemImg size={56} imgSrc={avatar} className="charity_avatar_bg" />
        <div className="ad__activity__main px-12p" style={{ width: '110px' }}>
          <div className="ad__activity__title">
            <Link
              to={'/organization/' + data.CampaignAdminDetails.slug}
              className="ad__activity__name mb-0 text-decoration-none text-dark fw-bold"
            >
              {data?.CampaignAdminDetails?.name}
            </Link>
          </div>
        </div>
        <div className="ad__activity__right d-flex align-items-center me-2">
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
