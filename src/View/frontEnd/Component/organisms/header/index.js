import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Logo from '../../atoms/logo';
import ShoppingCart from '../shopping-cart';
import Activity from '../activity';
import { useState, useEffect } from 'react';
import Toggle from '../toggle';
import UserSettings from '../user-settings';
import GeoLocation from '../geo-location';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import './style.scss';
import Tooltip from '@mui/material/Tooltip';
import { Button } from 'react-bootstrap';

const Header = ({
  cartItem,
  removeCartItem,
  updateCartItem,
  notificationList,
  setWatchNotification,
  removeNotification,
  followedOrganizationList,
  notificationMarkAsRead,
  followToOrganization,
  removeFollowedOrganization,
  wishListproductList,
  productList,
  addProductToWishlist,
  getAuthToken,
  isHeaderGeo = false
}) => {
  const userAuthToken = localStorage.getItem('userAuthToken');
  // redux get the user
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const pathWords = location.pathname.split('/');
  const isPathnameNotCategories = pathWords[1].toLowerCase() !== 'categories';
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust the threshold according to your needs
    };

    // Initial check on mount
    handleResize();

    // Event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  //console.log(`Header${isHeaderGeo ? "GEO" : ''} component render:`, { isHeaderGeo, location, pathname: location.pathname, pathWords, isPathnameNotCategories });

  return (
    <header className="d-flex frontend_pages main-header">
      <Container className="d-flex align-items-center" fluid>
        <Logo />
        {/* {!isMobile && (
          <div className="header__links ms-4 px-4 d-flex gap-4">
            <Link className="text-light fw-semibold p-0" to="/about">
              How it works
            </Link>
            <Link className="text-light fw-semibold p-0" to="/help">
              FAQ
            </Link>
            <Link className="text-light fw-semibold p-0" to="/login">
              Login
            </Link>
          </div>
        )} */}
        
        <div className="position-relative ms-auto header__right d-flex align-items-center gap-1">
          <Toggle />
          {isHeaderGeo && isPathnameNotCategories && (
            <GeoLocation productList={productList} wishListproductList={wishListproductList} />
          )}
          {/* {user.isAccountAdded && (
            <Tooltip title="Setup complete. You can start receiving donations.">
              <div className="me-2 fw-bold d-flex align-items-center badge--active text-white bg-secondary fs-6 px-1">
                <FontAwesomeIcon icon={solid('bolt-lightning')} className="fs-6 me-6pt" />
                <div className="active__text">Active</div>
              </div>
            </Tooltip>
          )} */}
          {userAuthToken && (
            <>
              <ShoppingCart
                cartItem={cartItem}
                removeCartItem={removeCartItem}
                updateCartItem={updateCartItem}
              />

              <Activity
                notificationList={notificationList}
                setWatchNotification={setWatchNotification}
                removeNotification={removeNotification}
                followedOrganizationList={followedOrganizationList}
                notificationMarkAsRead={notificationMarkAsRead}
                followToOrganization={followToOrganization}
                removeFollowedOrganization={removeFollowedOrganization}
              />
            </>
          )}

          <UserSettings
            wishListproductList={wishListproductList}
            addProductToWishlist={addProductToWishlist}
            getAuthToken={getAuthToken}
          />
        </div>
      </Container>
    </header>
  );
};

export default Header;
