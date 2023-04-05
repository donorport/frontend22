import React from 'react';
import { Container } from 'react-bootstrap';
import Logo from '../../atoms/logo';
import GeoLocation from '../geo-location';
import ShoppingCart from '../shopping-cart';
import Activity from '../activity';
import UserSettings from '../user-settings';

import './style.scss';
import { useLocation } from 'react-router-dom';

const HeaderGeo = (props) => {
  const userAuthToken = localStorage.getItem('userAuthToken');

  const location = useLocation();
  const pathWords = location.pathname.split('/');
  const isPathnameNotCategories = pathWords[1].toLowerCase() !== 'categories';
  //console.log('HeaderGeo component render:', { location, pathname: location.pathname, pathWords, isPathnameNotCategories });

  return (
    <header className="d-flex frontend_pages main-header">
      <Container className="d-flex align-items-center" fluid>
        <Logo />
        <div className="position-relative ms-auto header__right d-flex gap-1">
          {isPathnameNotCategories && <GeoLocation />}

          {userAuthToken ? (
            <>
              <ShoppingCart
                cartItem={props.cartItem}
                removeCartItem={props.removeCartItem}
                updateCartItem={props.updateCartItem}
              />

              <Activity
                notificationList={props.notificationList}
                setWatchNotification={props.setWatchNotification}
                removeNotification={props.removeNotification}
                followedOrganizationList={props.followedOrganizationList}
                notificationMarkAsRead={props.notificationMarkAsRead}
                followToOrganization={props.followToOrganization}
                removeFollowedOrganization={props.removeFollowedOrganization}
              />
            </>
          ) : (
            <></>
          )}
          <UserSettings
            wishListproductList={props.wishListproductList}
            addProductToWishlist={props.addProductToWishlist}
            getAuthToken={props.getAuthToken}
          />
        </div>
      </Container>
    </header>
  );
};

export default HeaderGeo;
