import React from "react";
import PropTypes from "prop-types";

import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

import {
  DashboardIcon,
  ItemsIcon,
  XpIcon,
  TaxIcon,
  HistoryIcon,
  SettingsIcon,
} from "./tab-icons";

import "./style.scss";

const propTypes = {
  activeKey: PropTypes.string,
};
const navItemStyle = {
  display: "inline-grid"
}

function UserTabs({ activeKey, data, _onClick, ...otherProps }) {

  const location = useLocation()
  let currentOption = location.pathname.split('/')[3]
  // let userName = data?.name
  // let newSlug =userName?.split(/\s/).join('');

  const userData = JSON.parse(localStorage.getItem('userData')) ;
  let newSlug =userData.name.split(/\s/).join('');
  // console.log(currentOption)
  return (
    <>
      <Nav variant="pills" {...otherProps} onClick={_onClick} style={navItemStyle}>

        <Link to={'/user/' + newSlug + '/dashboard'}>
          <Nav.Item >
            <Nav.Link
              eventKey="dashboard"
              className={currentOption === "dashboard" ? "tab__btn d-flex align-items-center text-dark active" : "tab__btn d-flex align-items-center text-dark"}
            >
              <span className="tab__icon" >
                <DashboardIcon active={activeKey === "dashboard"} />
              </span>
              <span className="tab__text">Dashboard</span>
            </Nav.Link>
          </Nav.Item>
        </Link>

        <Link to={'/user/' + newSlug + '/items'}>
          <Nav.Item >
            <Nav.Link
              eventKey="items"
              className={currentOption === "items" ? "tab__btn d-flex align-items-center text-dark active" : "tab__btn d-flex align-items-center text-dark"}
            >
              <span className="tab__icon">
                <ItemsIcon active={activeKey === "items"} />
              </span>
              <span className="tab__text">Items</span>
            </Nav.Link>
          </Nav.Item>
        </Link>


        <Link to={'/user/' + newSlug + '/xp'}>
          <Nav.Item  >
            <Nav.Link
              eventKey="xp"
              className={currentOption === "xp" ? "tab__btn d-flex align-items-center text-dark active" : "tab__btn d-flex align-items-center text-dark"}
            >
              <span className="tab__icon">
                <XpIcon active={activeKey === "xp"} />
              </span>
              <span className="tab__text">XP</span>
            </Nav.Link>
          </Nav.Item>
        </Link>

        <Link to={'/user/' + newSlug + '/tax'}>
          <Nav.Item >
            <Nav.Link
              eventKey="tax"
              className={currentOption === "tax" ? "tab__btn d-flex align-items-center text-dark active" : "tab__btn d-flex align-items-center text-dark"}
            >
              <span className="tab__icon">
                <TaxIcon active={activeKey === "tax"} />
              </span>
              <span className="tab__text">Tax</span>
            </Nav.Link>
          </Nav.Item>
        </Link>


        <Link to={'/user/' + newSlug + '/history'}>
          <Nav.Item >
            <Nav.Link
              eventKey="history"
              className={currentOption === "history" ? "tab__btn d-flex align-items-center text-dark active" : "tab__btn d-flex align-items-center text-dark"}
            >
              <span className="tab__icon">
                <HistoryIcon active={activeKey === "history"} />
              </span>
              <span className="tab__text">History</span>
            </Nav.Link>
          </Nav.Item>
        </Link>


        <Link to={'/user/' + newSlug + '/settings/profile'}>
          <Nav.Item className="">
            <Nav.Link
              eventKey="settings"
              className={currentOption === "settings" ? "tab__btn d-flex align-items-center text-dark active" : "tab__btn d-flex align-items-center text-dark"}
            >
              <span className="tab__icon">
                <SettingsIcon active={activeKey === "settings"} />
              </span>
              <span className="tab__text">Settings</span>
            </Nav.Link>
          </Nav.Item>
        </Link>
      </Nav>
    </>
  );
}

UserTabs.propTypes = propTypes;

export default UserTabs;
