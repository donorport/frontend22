import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Logo from '../../atoms/logo';
import ShoppingCart from '../shopping-cart';
import Activity from '../activity';
import Toggle from '../toggle';
import UserSettings from '../user-settings';
import GeoLocation from '../geo-location';
import { useSelector } from 'react-redux';
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

  return (
    <header className="frontend_pages header">
      <Container className="d-flex gap-3 gap-sm-0 justify-content-stretch align-items-stretch align-items-sm-center flex-column flex-sm-row" fluid>
        <Logo />{' '}
        <div className="flex-grow-1 d-flex gap-2 justify-content-end align-items-center">
          {!isMobile && (
            <div className="d-flex gap-3 me-4">
              <Link variant="link" to="/about">
                About Us
              </Link>
              <Link variant="link" to="/apply">
                Charities
              </Link>
              <Link variant="link" to="/signup">
                Signup
              </Link>
            </div>
          )}
          <div className="d-flex align-items-center justify-content-end gap-5">
            <div className="position-relative header__right d-flex align-items-center gap-2">
              <Toggle />
              {isHeaderGeo && isPathnameNotCategories && (
                <GeoLocation productList={productList} wishListproductList={wishListproductList} />
              )}
              {userAuthToken && (
                <>
                  <ShoppingCart
                    cartItem={Array.isArray(cartItem) ? cartItem : []}
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
          </div>
        </div>
      </Container>
    </header>
  );
};

// Set default props to ensure cartItem is always an array
Header.defaultProps = {
  cartItem: [],
  notificationList: [],
  followedOrganizationList: [],
  wishListproductList: [],
  productList: []
};

export default Header;
