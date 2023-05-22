import Index from '../../View/admin/Setting/Index';
import React, { useEffect } from 'react';
import { hasPermission } from '../../Common/Helper';
import { useNavigate } from 'react-router-dom';
import authApi from '../../Api/admin/auth';

function SettingController() {
  const navigate = useNavigate();
  const adminData = JSON.parse(localStorage.getItem('adminData'));
  const adminAuthToken = localStorage.getItem('adminAuthToken');

  useEffect(() => {
    (async () => {
      if (!hasPermission(adminData.roleName, 'SETTING')) {
        navigate('/admin/dashboard');
      }

      const verifyUser = await authApi.verifyToken(adminAuthToken);
      if (!verifyUser.data.success) {
        localStorage.clear();
        navigate('/admin/login');
      }
    })();
  }, []);

  return (
    <>
      <Index />
    </>
  );
}
export default SettingController;
