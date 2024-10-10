import { useState } from 'react';
import { Tab } from 'react-bootstrap';
import SettingsTabs from '../settings-tabs';
import { Outlet, useOutletContext } from 'react-router-dom';

import './style.scss';

const UserSettingsTab = () => {
  const [selectedTabKey, setSelectedTabKey] = useState('');
  const [data, setData] = useOutletContext();

  return (
    <>
      <header className="w-100 d-flex flex-column flex-lg-row align-items-start gap-2 d-none">
        <div className="me-sm-2 flex-grow-1">
          <h1 className="d-none d-sm-flex page__title fs-3 fw-bolder">Settings</h1>
        </div>
      </header>
      <Tab.Container defaultActiveKey={selectedTabKey} onSelect={(key) => setSelectedTabKey(key)}>
        <div className="d-md-flex align-items-start">
          <SettingsTabs activeKey={selectedTabKey} data={data} />

          <div className="user__settings-content flex-grow-1">
            <Outlet context={[data, setData]} />
          </div>
        </div>
      </Tab.Container>
    </>
  );
};

export default UserSettingsTab;
