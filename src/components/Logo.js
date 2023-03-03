import PropTypes from 'prop-types';
// material
import { Box } from '@mui/material';
import logo from '../assets/images/logo.svg';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  return < ><Box component="img" 
  // src=""" 
  src={logo}

  sx={{ width: 40, height: 30, ...sx }} />
  {/* <div className="logo-name ms-1">Donorport</div> */}
  </>;
}
