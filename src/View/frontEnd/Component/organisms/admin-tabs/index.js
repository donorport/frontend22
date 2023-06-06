import React from 'react';
import PropTypes from 'prop-types';
import { Nav } from 'react-bootstrap';
import { PostsIcon, ActivityIcon, TaxIcon, ProjectIcon, SettingsIcon } from './tab-icons';

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
      <Nav
        className="tab__nav d-flex flex-column gap-sm-1 gap-0"
        variant="pills"
        {...otherProps}
        onClick={_onClick}
      >
        <Link to={'/campaign/' + data?.slug + '/posts'}>
          <Nav.Item>
            <Nav.Link
              active={activeKey === 'posts'}
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
              active={activeKey === 'activity'}
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
              active={activeKey === 'tax'}
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
              active={activeKey === 'project'}
              className={
                currentOption === 'project'
                  ? 'tab__btn d-flex align-items-center text-dark active d-none d-sm-flex'
                  : 'tab__btn d-flex align-items-center text-dark '
              }
            >
              <span className="tab__icon">
                <ProjectIcon active={activeKey === 'project'} />
              </span>
              <span className="tab__text">Projects</span>
            </Nav.Link>
          </Nav.Item>
        </Link>

        <Link to={'/campaign/' + data?.slug + '/settings/profile'}>
          <Nav.Item className="" onClick={_onClick}>
            <Nav.Link
              active={activeKey === 'settings'}
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
