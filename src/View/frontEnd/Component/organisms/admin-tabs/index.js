import React from 'react';
import PropTypes from 'prop-types';
import { Nav } from 'react-bootstrap';
import {
  PostsIcon,
  ActivityIcon,
  TaxIcon,
  ProjectIcon,
  SettingsIcon,
  CrowdfundingIcon
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
      <Nav
        className="tab__nav d-flex flex-column gap-sm-1 gap-0"
        variant="pills"
        {...otherProps}
        onClick={_onClick}
      >
        <TabLink
          name="posts"
          title="Posts"
          Icon={PostsIcon}
          data={data}
          activeKey={activeKey}
          currentOption={currentOption}
        />

        <TabLink
          name="activity"
          title="Activity"
          Icon={ActivityIcon}
          data={data}
          activeKey={activeKey}
          currentOption={currentOption}
        />

        <TabLink
          name="tax"
          title="Tax"
          Icon={TaxIcon}
          data={data}
          activeKey={activeKey}
          currentOption={currentOption}
        />

        <TabLink
          name="project"
          title="Projects"
          Icon={ProjectIcon}
          data={data}
          activeKey={activeKey}
          currentOption={currentOption}
        />

        <TabLink
          name="crowdfunding"
          title="Crowdfundings"
          Icon={CrowdfundingIcon}
          data={data}
          activeKey={activeKey}
          currentOption={currentOption}
        />

        <TabLink
          name="settings"
          path="/settings/profile"
          title="Settings"
          Icon={SettingsIcon}
          data={data}
          activeKey={activeKey}
          currentOption={currentOption}
        />
      </Nav>
    </>
  );
}

AdminTabs.propTypes = propTypes;

export default AdminTabs;

// name === 'posts', lowercase name for url & type
// title === the display version of the name
const TabLink = ({ name, path, title, Icon, data, activeKey, currentOption }) => {
  return (
    <Link to={'/campaign/' + data?.slug + (path ? path : `/${name}`)}>
      <Nav.Item>
        <Nav.Link
          active={activeKey === name}
          className={
            currentOption === name
              ? 'tab__btn d-flex align-items-center text-dark justify-content-center justify-content-lg-start active d-none d-sm-flex'
              : 'tab__btn d-flex align-items-center text-dark justify-content-center justify-content-lg-start'
          }
        >
          <span className="tab__icon">
            <Icon active={activeKey === name} />
          </span>
          <span className="tab__text">{title}</span>
        </Nav.Link>
      </Nav.Item>
    </Link>
  );
};
