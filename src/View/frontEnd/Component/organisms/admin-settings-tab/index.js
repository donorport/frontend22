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
      <header className="py-sm-2 pb-2 w-100 d-sm-flex align-items-center d-none">
        <div className="me-sm-2 flex-grow-1 mb-3 mb-sm-0">
          <h1 className="d-none d-sm-flex page__title fs-3 fw-bolder">Settings</h1>
        </div>
      </header>
      {!user.isAccountAdded && (
        <div
          id="error_bank"
          className="note note--attention"
          style={{
            display: 'flex',
            maxWidth: '100%',
            paddingTop: '9px',
            paddingBottom: '9px',
            background: '#fffbdf',
            color: '#3d4279'
          }}
        >
          <div>
            Your account is actively receiving donations. Please add a{' '}
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
