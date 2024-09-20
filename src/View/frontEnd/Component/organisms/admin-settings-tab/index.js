import { useState } from 'react';
import { Tab } from 'react-bootstrap';
import SettingsTabsAdmin from '../settings-tabs-admin';
import { Outlet, Link, useOutletContext } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './style.scss';

const AdminSettingsTab = () => {
  const [selectedTabKey, setSelectedTabKey] = useState('');
  const [data, setData] = useOutletContext();
  const user = useSelector((state) => state.user);

  return (
    <>
      <header className="w-100 d-sm-flex flex-column flex-lg-row align-items-start gap-2 d-none">
        <div className="me-sm-2 flex-grow-1">
          <h1 className="d-none d-sm-flex page__title fs-3 fw-bolder">Settings</h1>
        </div>
      </header>
      {!user.isAccountAdded && (
        <div id="error_bank" className="note--attention">
          <div>
            Your account is active and may be receiving donations. Please add a{' '}
            <Link
              to={'/campaign/' + data?.slug + '/settings/payments'}
              className="note__span note__span--text"
              style={{ color: '#3a94d4' }}
            >
              payment method
            </Link>{' '}
            to receive your deposits.
          </div>
        </div>
      )}
      <Tab.Container defaultActiveKey={selectedTabKey} onSelect={(key) => setSelectedTabKey(key)}>
        <div className="d-md-flex align-items-start">
          <SettingsTabsAdmin activeKey={selectedTabKey} data={data} />
          <div className="user__settings-content flex-grow-1">
            <Outlet context={[data, setData]} />
          </div>
        </div>
      </Tab.Container>
    </>
  );
};

export default AdminSettingsTab;
