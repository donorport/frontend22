import React from 'react';
import PropTypes from 'prop-types';

import { Nav } from 'react-bootstrap';
import {
  ProfileIcon,
  AccountsIcon,
  BillingIcon,
  ControlsIcon,
  AdministratorIcon
} from './tab-icons';
import { Link, useLocation } from 'react-router-dom';

import './style.scss';

const propTypes = {
  activeKey: PropTypes.string
};

function SettingsTabs({ activeKey, data, _onClick, ...otherProps }) {
  const location = useLocation();
  let currentOption = location.pathname.split('/')[4];
  
  const userData = JSON.parse(localStorage.getItem('userData'));
  let newSlug = userData?.name.split(/\s/).join('');

  // let userName = data?.name
  // let newSlug =userName?.split(/\s/).join('');

  return (
    <div className="settings-tabs">
      <Nav variant="link" {...otherProps} onClick={_onClick}>
        <Link to={'/user/' + newSlug + '/settings/profile'}>
          <Nav.Item>
            <Nav.Link
              eventKey="profile"
              className={
                currentOption === 'profile'
                  ? 'stab__btn d-flex align-items-center active'
                  : 'stab__btn d-flex align-items-center'
              }
              // className={}
            >
              <span className="stab__icon">
                <ProfileIcon active={activeKey === 'profile'} />
              </span>
              <span className="stab__text">Profile</span>
              <div className="tab__active--indicator"></div>
            </Nav.Link>
          </Nav.Item>
        </Link>

        <Link to={'/user/' + newSlug + '/settings/accounts'}>
          <Nav.Item>
            <Nav.Link
              eventKey="accounts"
              className={
                currentOption === 'accounts'
                  ? 'stab__btn d-flex align-items-center active'
                  : 'stab__btn d-flex align-items-center'
              }
            >
              <span className="stab__icon">
                <AccountsIcon active={activeKey === 'accounts'} />
              </span>
              <span className="stab__text">Accounts</span>
              <div className="tab__active--indicator"></div>
            </Nav.Link>
          </Nav.Item>
        </Link>

        <Link to={'/user/' + newSlug + '/settings/billing'}>
          <Nav.Item onClick={_onClick}>
            <Nav.Link
              eventKey="billing"
              className={
                currentOption === 'billing'
                  ? 'stab__btn d-flex align-items-center active'
                  : 'stab__btn d-flex align-items-center'
              }
            >
              <span className="stab__icon">
                <BillingIcon active={activeKey === 'billing'} />
              </span>
              <span className="stab__text">Billing</span>
              <div className="tab__active--indicator"></div>
            </Nav.Link>
          </Nav.Item>
        </Link>

        {/* <Link to={'/user/' +newSlug + '/settings/controls'}>
          <Nav.Item >
            <Nav.Link
              eventKey="controls"
              className={currentOption === 'controls' ? "stab__btn d-flex align-items-center active" : "stab__btn d-flex align-items-center"}
            >
              <span className="stab__icon">
                <ControlsIcon active={activeKey === "controls"} />
              </span>
              <span className="stab__text">Controls</span>
              <div className="tab__active--indicator"></div>
            </Nav.Link>
          </Nav.Item>
        </Link>*/}

        <Link to={'/user/' + newSlug + '/settings/administrator'}>
          <Nav.Item>
            <Nav.Link
              eventKey="administrator"
              className={
                currentOption === 'administrator'
                  ? 'stab__btn d-flex align-items-center active'
                  : 'stab__btn d-flex align-items-center'
              }
            >
              <span className="stab__icon">
                <AdministratorIcon active={activeKey === 'administrator'} />
              </span>
              <span className="stab__text">Administrator</span>
              <div className="tab__active--indicator" style={{ marginLeft: '10px' }}></div>
            </Nav.Link>
          </Nav.Item>
        </Link>
      </Nav>
    </div>
  );
}

SettingsTabs.propTypes = propTypes;

export default SettingsTabs;
