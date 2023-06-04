// import { Link as RouterLink, Outlet } from 'react-router-dom';
import { Route, Routes, Link as RouterLink } from 'react-router-dom'

// material
import { styled } from '@mui/material/styles';
// components
import Login from '../pages/Login';

import Logo from '../components/Logo';
//import Register from '../pages/Register';
//import VerifyOtp from '../pages/VerifyOtp';

// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0)
  }
}));

// ----------------------------------------------------------------------

export default function LogoOnlyLayout() {
  return (
    <>
      <HeaderStyle>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
      </HeaderStyle>
      <Routes>
        <Route exact path="/admin/login" element={<Login />} />
        {/* <Route exact path="/admin/register" element={<Register />} /> */}
        {/* <Route exact path="/admin/otp/:email" element={<VerifyOtp />} /> */}
        <Route exact path="*" element={<Login />} />

      </Routes>
    </>
  );
}
