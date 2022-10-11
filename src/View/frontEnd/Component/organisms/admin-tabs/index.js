import React from 'react';
import PropTypes from 'prop-types';

import { Nav } from 'react-bootstrap';
import {
  DashboardIcon,
  PostsIcon,
  ActivityIcon,
  TaxIcon,
  ProjectIcon,
  SettingsIcon
} from './tab-icons';

import './style.scss';
import { Link, useLocation } from 'react-router-dom';

const propTypes = {
  activeKey: PropTypes.string
};

function AdminTabs({ activeKey, data, _onClick, ...otherProps }) {
  const location = useLocation();
  let currentOption = location.pathname.split('/')[3];
  // console.log(location.pathname.split('/')[3])
  return (
    <>
      <Nav variant="pills" {...otherProps} onClick={_onClick}>
        <Link to={'/campaign/' + data?.slug + '/dashboard'}>
          <Nav.Item>
            <Nav.Link
              eventKey="dashboard"
              className={
                currentOption === 'dashboard'
                  ? 'tab__btn d-flex align-items-center text-dark active d-none d-sm-flex'
                  : 'tab__btn d-flex align-items-center text-dark '
              }
            >
              <span className="tab__icon">
                <DashboardIcon active={activeKey === 'dashboard'} />
              </span>
              <span className="tab__text">Dashboard</span>
            </Nav.Link>
          </Nav.Item>
        </Link>

        <Link to={'/campaign/' + data?.slug + '/posts'}>
          <Nav.Item>
            <Nav.Link
              eventKey="posts"
              className={
                currentOption === 'posts'
                  ? 'tab__btn d-flex align-items-center text-dark active d-none d-sm-flex'
                  : 'tab__btn d-flex align-items-center text-dark'
              }
            >
              <span className="tab__icon">
                <PostsIcon active={activeKey === 'posts'} />
              </span>
              <span className="tab__text">Posts</span>
            </Nav.Link>
          </Nav.Item>
        </Link>

        <Link to={'/campaign/' + data?.slug + '/activity'}>
          <Nav.Item onClick={_onClick}>
            <Nav.Link
              eventKey="activity"
              className={
                currentOption === 'activity'
                  ? 'tab__btn d-flex align-items-center text-dark active d-none d-sm-flex'
                  : 'tab__btn d-flex align-items-center text-dark '
              }
            >
              <span className="tab__icon">
                <ActivityIcon active={activeKey === 'activity'} />
              </span>
              <span className="tab__text">Activity</span>
            </Nav.Link>
          </Nav.Item>
        </Link>

        <Link to={'/campaign/' + data?.slug + '/tax'}>
          <Nav.Item onClick={_onClick}>
            <Nav.Link
              eventKey="tax"
              className={
                currentOption === 'tax'
                  ? 'tab__btn d-flex align-items-center text-dark active d-none d-sm-flex'
                  : 'tab__btn d-flex align-items-center text-dark '
              }
            >
              <span className="tab__icon">
                <TaxIcon active={activeKey === 'tax'} />
              </span>
              <span className="tab__text">Tax</span>
            </Nav.Link>
          </Nav.Item>
        </Link>

        <Link to={'/campaign/' + data?.slug + '/project'}>
          <Nav.Item onClick={_onClick}>
            <Nav.Link
              eventKey="project"
              className={
                currentOption === 'project'
                  ? 'tab__btn d-flex align-items-center text-dark active d-none d-sm-flex'
                  : 'tab__btn d-flex align-items-center text-dark '
              }
            >
              <span className="tab__icon">
                <ProjectIcon active={activeKey === 'project'} />
              </span>
              <span className="tab__text">Project</span>
            </Nav.Link>
          </Nav.Item>
        </Link>

        <Link to={'/campaign/' + data?.slug + '/settings/company'}>
          <Nav.Item className="" onClick={_onClick}>
            <Nav.Link
              eventKey="settings"
              className={
                currentOption === 'settings'
                  ? 'tab__btn d-flex align-items-center text-dark active d-none d-sm-flex'
                  : 'tab__btn d-flex align-items-center text-dark '
              }
            >
              <span className="tab__icon">
                <SettingsIcon active={activeKey === 'settings'} />
              </span>
              <span className="tab__text">Settings</span>
            </Nav.Link>
          </Nav.Item>
        </Link>
      </Nav>
    </>
  );
}

AdminTabs.propTypes = propTypes;

export default AdminTabs;
