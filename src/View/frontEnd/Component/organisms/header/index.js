import React from 'react';
import { Container } from 'react-bootstrap';
import Logo from '../../atoms/logo';
import ShoppingCart from '../shopping-cart';
import Activity from '../activity';
import UserSettings from '../user-settings';

import './style.scss';

const Header = (props) => {
  const adminAuthToken = localStorage.getItem('adminAuthToken');
  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  const userAuthToken = localStorage.getItem('userAuthToken');

  return (
    <header className="d-flex frontend_pages main-header">
      <Container className="d-flex align-items-center" fluid>
        <Logo />
        {
          // adminAuthToken || CampaignAdminAuthToken || userAuthToken ?

          <div className="position-relative ms-auto header__right d-flex gap-1">
            {/*  <GeoLocation />*/}
            {/* {
              userAuthToken || CampaignAdminAuthToken ?
                <GeoLocation />
                :
                <></>

            } */}
            {userAuthToken ? (
              <>
                {/* <GeoLocation /> */}

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
          //  : <></>
        }
      </Container>
    </header>
  );
};

export default Header;
