import { Logout } from '@mui/icons-material';
import React from 'react';
import UserSettingsItem from '../../../molecules/user-settings-item';
import { NavLink as RouterLink, matchPath, useLocation, useNavigate, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { light, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useSelector, useDispatch } from 'react-redux';
import { setLogout } from '../../../../../../user/user.action';

function UserSettingsList(props) {
  const CampaignAdmin = JSON.parse(localStorage.getItem('CampaignAdmin'));
  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  const userAuthToken = localStorage.getItem('userAuthToken');
  const token = userAuthToken ? userAuthToken : CampaignAdminAuthToken;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let userData = props.userData;
  let newSlug;
  if (userData) {
    newSlug = userData.name.split(/\s/).join('');
  } else {
    newSlug = '';
  }

  const logout = () => {
    // localStorage.clear()
    dispatch(setLogout());
    navigate('/');
  };

  return (
    <ul className="user__settings__list list-unstyled mb-0">
      {userAuthToken ? (
        <>
          <Link to={'/user/' + newSlug + '/items/'}>
            <UserSettingsItem
              icon={<FontAwesomeIcon icon={solid('circle-user')} />}
              // icon={<i className="fa-solid fa-circle-user"></i>}
              label="Profile"
              itemClass="border-bottom"
            />
          </Link>
          <UserSettingsItem
            // icon={<i className="fa-solid fa-heart"></i>}
            icon={<FontAwesomeIcon icon={solid('heart')} />}
            nextIcon={<FontAwesomeIcon icon={solid('chevron-right')} />}
            label="Wishlist"
            onClick={props.onWishlistClick}
          />
          <UserSettingsItem
            icon={<FontAwesomeIcon icon={solid('signature')} />}
            nextIcon={<FontAwesomeIcon icon={solid('chevron-right')} />}
            label="Linked Organisations"
            onClick={props.onOrgClick}
          />
          <UserSettingsItem
            icon={<FontAwesomeIcon icon={solid('trophy-star')} />}
            label="Leaderboard"
            itemClass="border-bottom"
            onClick={() => props.onClickLeaderBoard()}
          />
          <UserSettingsItem
            icon={<FontAwesomeIcon icon={solid('right-from-bracket')} />}
            label="Sign out"
            onClick={() => logout()}
          />
        </>
      ) : CampaignAdminAuthToken ? (
        <>
          {/* SHOW THESE IF CHARITY IS LOGGED IN: */}
          {/*  <UserSettingsItem
                icon={<FontAwesomeIcon icon={solid("signature")} />}
                nextIcon={<FontAwesomeIcon icon={solid("chevron-right")} />}
                label="Linked Organisations"
                onClick={props.onOrgClick}
              />*/}
          <UserSettingsItem
            icon={<FontAwesomeIcon icon={solid('right-from-bracket')} />}
            label="Sign out"
            onClick={() => logout()}
          />
        </>
      ) : (
        <>
          {/* <UserSettingsItem
                icon={<FontAwesomeIcon icon={solid("signature")} />}
                nextIcon={<FontAwesomeIcon icon={solid("chevron-right")} />}
                label="Linked Organisations"
                onClick={props.onOrgClick}
              /> */}
          <UserSettingsItem
            icon={<FontAwesomeIcon icon={solid('right-from-bracket')} />}
            label="Log In / Sign up"
            onClick={() => navigate('/signIn')}
          />
        </>
      )}
    </ul>
  );
}

export default UserSettingsList;
