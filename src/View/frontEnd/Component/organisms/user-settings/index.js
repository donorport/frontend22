import React, { useState } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import Avatar from '../../atoms/avatar';
import LinkedOrg from '../../molecules/linked-org';
import FollowingList from '../wishlist/index';
import UserSettingsList from './user-settings-list';
// import { Link } from "react-router-dom";
import AvatarImg from '../../../../../assets/images/avatar.png';
import { getCalculatedPrice } from '../../../../../Common/Helper';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import './style.scss';

const UserSettings = (props) => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const CampaignAdmin = JSON.parse(localStorage.getItem('CampaignAdmin'));
  //const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  //const userAuthToken = localStorage.getItem('userAuthToken');
  const user = useSelector((state) => state.user);
  const getC = getCalculatedPrice();
  const navigate = useNavigate();

  const [state, setState] = useState({
    wishlist: false,
    linked_org: false
  });

  const goBack = () => {
    setState({ ...state, wishlist: false, linked_org: false });
  };

  const showWishList = () => setState({ ...state, wishlist: true });

  const showOrg = () => setState({ ...state, linked_org: true });

  const UserButton = React.forwardRef(({ children, onClick }, ref) => {
    return (
      <Button
      size={46}
        ref={ref}
        variant="link"
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
        className="p-0 d-flex text-decoration-none"
      >
        {children}
      </Button>
    );
  });

  const onClickOrg = () => {
    localStorage.setItem('type', 'main');
    navigate(
      '/campaign/' + CampaignAdmin?.slug + '/posts',
      { state: { type: 'temp' } },
      { replace: true }
    );
  };
  const onClickLeaderBoard = () => {
    navigate('/leaderboard');
  };

  return (
    <>
      <Dropdown className="d-flex" autoClose="outside">
        <Dropdown.Toggle as={UserButton}>
          <Avatar
            size={39}
            className={userData ? 'donor_avatar_bg' : 'charity_avatar_bg'}
            avatarUrl={user.profileImage ? user.profileImage : AvatarImg}
          />
        </Dropdown.Toggle>

        <Dropdown.Menu className="profile__dropdown w-350 dropdown-top-arrow">
          <div className="dropdown__inner">
            <div className="d-flex activity__dropdown-header border-bottom">
              {state.wishlist || state.linked_org ? (
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

              {state.wishlist ? (
                <div>Wishlist</div>
              ) : state.linked_org ? (
                <div>Organizations</div>
              ) : (
                <div className="d-flex align-items-center w-100">
                  <Avatar
                    avatarUrl={user.profileImage}
                    className={userData ? 'donor_avatar_bg' : 'charity_avatar_bg'}
                  />

                  {CampaignAdmin?.name ? (
                    <Button
                      onClick={() => onClickOrg()}
                      // to={'/campaign/' + CampaignAdmin?.slug + '/dashboard'}
                      variant="link"
                      className="p-0 ms-2 text-decoration-none"
                      // state={{ type: "main" }}
                    >
                      {CampaignAdmin?.name}
                    </Button>
                  ) : userData ? (
                    <h6
                      className="p-0 ms-2 text-decoration-none"
                    >
                      {userData?.name ? userData.name : CampaignAdmin?.name}
                    </h6>
                  ) : (
                    <h6
                      className="p-0 ms-2 text-decoration-none"
                    >
                      Welcome User
                    </h6>
                  )}

                  {userData && (
                    <a href="/leaderboard" className="btn btn__xs  ms-auto">
                      <span className="mr-3p">{getC.getUserRank(user.xp)}</span>
                    </a>
                  )}
                </div>
              )}
            </div>

            <div className="activity__dropdown-body">
              {state.wishlist ? (
                <FollowingList
                  wishListproductList={props.wishListproductList}
                  addProductToWishlist={props.addProductToWishlist}
                />
              ) : state.linked_org ? (
                <LinkedOrg getAuthToken={props.getAuthToken} />
              ) : (
                <UserSettingsList
                  onWishlistClick={() => showWishList()}
                  onOrgClick={() => showOrg()}
                  userData={userData}
                  onClickLeaderBoard={onClickLeaderBoard}
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

export default UserSettings;
