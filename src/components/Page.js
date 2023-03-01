import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { forwardRef } from 'react';
// material
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

const Page = forwardRef(({ children, title, img, description, url, showTags, ...other }, ref) => (
  <Box ref={ref} {...other}>
    {showTags && (
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        {/* Facebook Meta Tags */}
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={img} />
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="donorport.com" />
        <meta property="twitter:url" content={url} />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={img} />
      </Helmet>
    )}
    {children}
  </Box>
));

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  img: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  showTags: PropTypes.bool
};

Page.defaultProps = {
  title: '',
  img: '',
  description: '',
  url: '',
  showTags: true
};

export default Page;
