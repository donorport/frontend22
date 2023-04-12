import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Logo from '../../atoms/logo';
import ShoppingCart from '../shopping-cart';
import Activity from '../activity';
import UserSettings from '../user-settings';
import GeoLocation from '../geo-location';

import './style.scss';

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
  addProductToWishlist,
  getAuthToken,
  isHeaderGeo = false,
}) => {
  const userAuthToken = localStorage.getItem('userAuthToken');

  const location = useLocation();
  const pathWords = location.pathname.split('/');
  const isPathnameNotCategories = pathWords[1].toLowerCase() !== 'categories';

  //console.log(`Header${isHeaderGeo ? "GEO" : ''} component render:`, { isHeaderGeo, location, pathname: location.pathname, pathWords, isPathnameNotCategories });

  return (
    <header className="d-flex frontend_pages main-header">
      <Container className="d-flex align-items-center" fluid>
        <Logo />
        <div className="position-relative ms-auto header__right d-flex gap-1">

          { isHeaderGeo && isPathnameNotCategories && <GeoLocation /> }

          {userAuthToken ? (
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
          ) : (
            <></>
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
