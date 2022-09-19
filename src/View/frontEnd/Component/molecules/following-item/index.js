import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Button } from "react-bootstrap";
import ListItemImg from "../../atoms/list-item-img";
import helper from "../../../../../Common/Helper";

import './style.scss';

function FollowingItem(props) {
  const data = props.data
  const followToOrganization = props.followToOrganization
  const removeFollowedOrganization = props.removeFollowedOrganization


  const [active, setActive] = useState(false);

  useEffect(() => {
    setActive(data.isFollow)
  }, [data])

  const onClickBell = async () => {
    await followToOrganization(data?.CampaignAdminDetails?._id, !active)

  }

  const removeOrg = async () => {
    await removeFollowedOrganization(data?._id)
  }

  let avatar = data?.CampaignAdminDetails?.logo ? helper.CampaignAdminLogoPath + data?.CampaignAdminDetails?.logo :  'https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/5f4ab31be9fe7d7453a60b1f_user.svg'




  return (
    <li
      className="ad__activity__item p-1 d-flex align-items-center border-bottom"
    >
      <div className="d-flex align-items-center">
        <ListItemImg imgSrc={avatar} className='charity_avatar_bg' />
        <div className="ad__activity__main px-12p" style={{ width: "135px" }}>
          <div className="ad__activity__title">
            <div className="ad__activity__name mb-0">{data?.CampaignAdminDetails?.name}</div>
          </div>
        </div>
        <div className="ad__activity__right d-flex align-items-center me-2">
          <Button
            variant="link"
            className="btn__link-light p-0 text-decoration-none btn__follow"
            // onClick={() => setActive(!active)}
            onClick={() => onClickBell()}

          >
            {active ? (
              <FontAwesomeIcon icon={solid("bell")} />
            ) : (
              <FontAwesomeIcon icon={regular("bell-slash")} />
            )}
          </Button>
        </div>
      </div>
      <div className="ad__activity__remove ms-auto">
        <Button variant="danger" className="btn__remove-follow text-decoration-none" onClick={() => removeOrg()}>
          <FontAwesomeIcon icon={regular("circle-minus")} />
        </Button>
      </div>
    </li>
  );
}

export default FollowingItem;
