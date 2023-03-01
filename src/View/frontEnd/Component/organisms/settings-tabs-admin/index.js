import React from "react";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";
import {
  ProfileIcon,
  PaymentIcon,
  BillingIcon,
  ControlsIcon,
  AdministratorIcon,
} from "./tab-icons";

import "./style.scss";

const propTypes = {
  activeKey: PropTypes.string,
};

function SettingsTabsAdmin({ activeKey, data, _onClick, ...otherProps }) {


  const location = useLocation()
  let currentOption = location.pathname.split('/')[4]
  // console.log(currentOption)
  return (
    <div className="settings-tabs">

      <Nav variant="link" {...otherProps} onClick={_onClick}>

        <Link to={'/campaign/' + data?.slug + '/settings/profile'}>
          <Nav.Item>
            <Nav.Link
              eventKey="company"
              className={currentOption === 'company' ? "stab__btn d-flex align-items-center nav-link active" : 'stab__btn d-flex align-items-center nav-link '}
            >
              <span className="stab__icon">
                <ProfileIcon active={activeKey === "company"} />
              </span>
              <span className="stab__text">Profile</span>
              <div className="tab__active--indicator"></div>
            </Nav.Link>
          </Nav.Item>
        </Link>

        <Link to={'/campaign/' + data?.slug + '/settings/payments'}>
          <Nav.Item >
            <Nav.Link
              eventKey="payments"
              className={currentOption === 'payments' ? "stab__btn d-flex align-items-center nav-link active" : 'stab__btn d-flex align-items-center nav-link '}
            >
              <span className="stab__icon">
                <PaymentIcon active={activeKey === "payments"} />
              </span>
              <span className="stab__text">Payments</span>
              <div className="tab__active--indicator"></div>
            </Nav.Link>
          </Nav.Item>
        </Link>

        <Link to={'/campaign/' + data?.slug + '/settings/administrators'}>
          <Nav.Item >
            <Nav.Link
              eventKey="administrators"
              className={currentOption === 'administrators' ? "stab__btn d-flex align-items-center nav-link active" : 'stab__btn d-flex align-items-center nav-link '}
            >
              <span className="stab__icon">
                <AdministratorIcon active={activeKey === "administrators"} />
              </span>
              <span className="stab__text">Administrators</span>
              <div className="tab__active--indicator"></div>
            </Nav.Link>
          </Nav.Item>
        </Link>


        <Link to={'/campaign/' + data?.slug + '/settings/billing'}>
          <Nav.Item >
            <Nav.Link
              eventKey="billing"
              className={currentOption === 'billing' ? "stab__btn d-flex align-items-center nav-link active" : 'stab__btn d-flex align-items-center nav-link '}
            >
              <span className="stab__icon">
                <BillingIcon active={activeKey === "billing"} />
              </span>
              <span className="stab__text">Billing</span>
              <div className="tab__active--indicator"></div>
            </Nav.Link>
          </Nav.Item>
        </Link>

        <Link to={'/campaign/' + data?.slug + '/settings/controls'}>
          <Nav.Item>
            <Nav.Link
              eventKey="controls"
              className={currentOption === 'controls' ? "stab__btn d-flex align-items-center nav-link active" : 'stab__btn d-flex align-items-center nav-link '}
            >
              <span className="stab__icon">
                <ControlsIcon active={activeKey === "controls"} />
              </span>
              <span className="stab__text">Controls</span>
              <div className="tab__active--indicator"></div>
            </Nav.Link>
          </Nav.Item>
        </Link>

      </Nav>
    </div>
  );
}

SettingsTabsAdmin.propTypes = propTypes;

export default SettingsTabsAdmin;
