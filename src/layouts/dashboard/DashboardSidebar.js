import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { Box, Link, Drawer } from '@mui/material';
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
import { MHidden } from '../../components/@material-extend';
import sidebarConfig from './SidebarConfig';

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  }
}));

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();
  const adminData = JSON.parse(localStorage.getItem('adminData'));
  const sidebarRef = useRef(null);

  useEffect(() => {
    if (isOpenSidebar) {
      setSidebarOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, adminData]);

  useEffect(() => {
    function handleOutsideClick(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebarOpen(false);
      }
    }

    if (isSidebarOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isSidebarOpen]);

  const handleCloseSidebar = () => {
    setSidebarOpen(false);
    if ( onCloseSidebar ) onCloseSidebar();
  };

  const handleLinkClick = () => {
    if (isSidebarOpen) {
      setSidebarOpen(false);
    }
  };

  return (
    <RootStyle ref={sidebarRef}>
      <MHidden width="lgUp">
        <Drawer
          open={isSidebarOpen}
          onClose={handleCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          <SidebarContent handleLinkClick={handleLinkClick} />
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH,
              bgcolor: 'background.default'
            }
          }}
        >
          <SidebarContent handleLinkClick={handleLinkClick} />
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}

function SidebarContent({ handleLinkClick }) {
  return (
    <Scrollbar
      sx={{
        height: '100%',
        '& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' }
      }}
    >
      <Box sx={{ px: 2.5, py: 3 }}>
        <Box component={RouterLink} to="/" sx={{ display: 'inline-flex' }}>
          <Logo />
          <h2 className="logo-name ms-1  fs-2 fs-sm-0">Donorport</h2>
        </Box>
      </Box>

      <Box sx={{ mb: 5, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#" onClick={handleLinkClick}>
          {/* Account section */}
        </Link>
      </Box>

      <NavSection navConfig={sidebarConfig} handleLinkClick={handleLinkClick} />

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );
}
