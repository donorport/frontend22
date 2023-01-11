import React, { useState, useEffect } from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { light, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link } from 'react-router-dom';
import helper, { getCalculatedPrice, priceFormat } from '../../../../../Common/Helper';
import EmptyCart from '../../atoms/empty-cart';
import CartList from './cart-list';

import './style.scss';

const ShoppingCart = (props) => {
  // console.log(props.cartItem)
  const [state, setState] = useState({
    empty: false,
    subTotal: '',
    totalQuantity: 0
  });

  const CalculatePrice = getCalculatedPrice();
  let currencySymbol = CalculatePrice.currencySymbol();

  const CartButton = React.forwardRef(({ children, onClick }, ref) => {
    return (
      <Button
        ref={ref}
        variant="link"
        onClick={(e) => {
          e.preventDefault();
          onClick(e);
        }}
        className="position-relative p-0 icon__btn text-decoration-none"
      >
        {children}
      </Button>
    );
  });

  useEffect(() => {
    if (props.cartItem.length === 0) {
      setState({
        empty: true
      });
    } else {
      let tempPriceArray = [];
      let tempQuantityArray = [];

      props.cartItem.map((item, i) => {
        // let price = CalculatePrice.getData(item.productDetails?.price)
        let price = item.productDetails?.displayPrice
          ? item.productDetails?.displayPrice
          : item.productDetails?.price;

        tempPriceArray.push(price * item.quantity);
        tempQuantityArray.push(item.quantity);
      });

      let sum = tempPriceArray.reduce(function (a, b) {
        return a + b;
      }, 0);
      let quantitySum = tempQuantityArray.reduce(function (a, b) {
        return a + b;
      }, 0);

      setState({
        ...state,
        empty: false,
        subTotal: Number(sum),
        totalQuantity: Number(quantitySum)
      });
    }
  }, [props.cartItem]);

  return (
    <>
      <Dropdown className="d-flex" autoClose="outside">
        <Dropdown.Toggle as={CartButton}>
          {state.totalQuantity > 0 && (
            <div className="c__badge">
              <span className="c__badge__count">{state.totalQuantity}</span>
            </div>
          )}
          <span className="d-flex align-items-center icon">
            <FontAwesomeIcon icon={solid('bag-shopping')} />
          </span>
        </Dropdown.Toggle>

        <Dropdown.Menu
          className="cart__dropdown w-310 dropdown-top-arrow"
          style={{ transform: 'translate(45px, 30px) !important' }}
        >
          <div className="dropdown__inner">
            <div className="d-flex cart__dropdown-header">
              <div className="fw-bolder">Cart</div>
              {!state.empty && (
                <Link
                  to="/cart"
                  variant="link"
                  className="p-0 ms-auto btn__link-light text-decoration-none fw-normal fs-7"
                >
                  view cart
                </Link>
              )}
            </div>
            <div className="cart_dropdown-body">
              {state.empty ? (
                <EmptyCart />
              ) : (
                <CartList
                  cartItem={props.cartItem}
                  removeCartItem={props.removeCartItem}
                  updateCartItem={props.updateCartItem}
                  CalculatePrice={CalculatePrice}
                  currencySymbol={currencySymbol}
                />
              )}
              {!state.empty && (
                <div className="cd__cart__controls d-flex align-items-center">
                  <div className="cd__cart__value fs-5 fw-semibold">
                    <span>Total:</span>
                    <span className="cd__cart__total text-light ml-6p fs-4 fw-bold">
                      {currencySymbol + priceFormat(Number(state?.subTotal))}
                    </span>
                  </div>
                  {/* <Button variant="info" href="/checkout" className="ms-auto">
                  Checkout
                </Button> */}
                  <Link to="/checkout" className=" btn btn-info ms-auto">
                    Checkout
                  </Link>
                </div>
              )}
            </div>

            <div className="cart__dropdown-footer"></div>
          </div>
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default ShoppingCart;
