import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ListItemImg from '../../atoms/list-item-img';
import helper, { priceFormat } from '../../../../../Common/Helper';

import './style.scss';
import { debounce } from 'lodash';

function CartItem(props) {
  //console.log('CartItem component:', { cartItem: props.cartItem });
  let cartItem = props.cartItem;
  const [quantity, setQuantity] = useState();

  // const CalculatePrice = getCalculatedPrice()

  // let transactionFee = props.pricingFees?.transactionFee
  // let platformFee = props.pricingFees?.platformFee
  // let totalCharge = Number(transactionFee) + Number(platformFee)
  // let price = props.CalculatePrice.getData(cartItem?.productDetails?.price)
  let price = cartItem.productDetails?.displayPrice
    ? cartItem.productDetails?.displayPrice
    : cartItem.productDetails?.price;

  let currencySymbol = props.currencySymbol;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const updateQuantity = useCallback(
    debounce(async (oldQuantity, newQuantity) => {
      const type = oldQuantity > newQuantity ? 'plus' : 'minus';
      await props.updateCartItem(newQuantity, cartItem?._id, cartItem?.productDetails?._id, type);
    }, 1000),
    []
  );
  console.log({ props });
  useEffect(() => {
    setQuantity(cartItem?.quantity);
    props.updateChildCart();
  }, [cartItem]);

  useEffect(() => {
    //updateQuantity(quantity);
    props.updateChildCart();
  }, [quantity, updateQuantity]);

  console.log({ quantity });

  return (
    <li className="d-flex cd__cart__item ps-1 py-2 d-flex align-items-center border-bottom">
      <div className="flex-grow-1 d-flex align-items-center">
        <ListItemImg
          size={62}
          imgSrc={helper.CampaignProductImagePath + cartItem?.productDetails?.image}
        />
        <div className="flex-grow-1 cd__cart__main pl-12p">
          <div className="cd__cart__title pr-12p">
            <Link
              to={'/item/' + cartItem?.productDetails.slug}
              className="cd__cart__name text-decoration-none  fs-5"
            >
              {cartItem?.productDetails?.headline}
            </Link>
            <div className="fs-7 ad__activity__sub-name mt-3p fw-semibold">
              {cartItem?.productDetails?.organizationDetails?.name}
            </div>
          </div>
          <div className="cd__cart__price price fw-bold">
            {currencySymbol + priceFormat(price)}
          </div>
        </div>
        <div className="cd__cart__right d-flex align-items-center">
          <Button variant="link" className="text-decoration-none btn__link-light p-0">
            <FontAwesomeIcon
              icon={regular('angle-down')}
              onClick={() => {
                if (quantity > 1) {
                  setQuantity(quantity - 1);
                  updateQuantity(quantity, quantity - 1);
                }
              }}
            />
          </Button>
          {/* <div className="cd__cart__count text-light">{quantity}</div> */}
          <input
            type="text"
            className="qty__input"
            id={1}
            value={quantity}
            onChange={(e) => {
              const value = Number(e.target.value);
              const isIncrease = value > quantity;

              if (isIncrease) {
                const isUnlimited = cartItem.productDetails.unlimited;

                if (isUnlimited) {
                  setQuantity(value);
                  updateQuantity(quantity, value);
                  return;
                }

                // if we are limited, need to get the availableCount
                // e.g. 15 tents quantity, - 0 soldOut === 15 availableCount
                const availableCount =
                  cartItem?.productDetails.quantity - cartItem?.productDetails.soldout;
                const qty = (availableCount < value) ? availableCount : value;

                //console.log('~~ ~~ CART: ~~ ~~ limited qty available', {availableCount, qty});

                setQuantity(qty);
                updateQuantity(quantity, qty);

              } else {
                // decreasing, limit to 1
                const newQty = e.target.value === '' || value <= 0 ? 1 : value;
                setQuantity(newQty);
                updateQuantity(quantity, newQty);
              }
            }}
          />
          <Button
            variant="link"
            className={`position-relative btn__link-light text-decoration-none p-0 ${
              cartItem?.productDetails.soldout + quantity >= cartItem?.productDetails.quantity &&
              !cartItem.productDetails.unlimited &&
              'max-quantity'
            }`}
          >
            <FontAwesomeIcon
              icon={regular('angle-up')}
              onClick={() => {
                if (
                  cartItem?.productDetails.soldout + quantity < cartItem?.productDetails.quantity ||
                  cartItem.productDetails.unlimited
                ) {
                  setQuantity(quantity + 1);
                  updateQuantity(quantity, quantity + 1);
                }
              }}
            />
          </Button>
        </div>
      </div>
      <div className="cd__cart__remove ms-auto">
        <Button
          variant="link"
          className="btn__link-light text-decoration-none"
          style={{ fontSize: '18px' }}
          onClick={() => props.removeCartItem(cartItem._id)}
        >
          <FontAwesomeIcon icon={solid('trash')} />
        </Button>
      </div>
    </li>
  );
}

CartItem.propTypes = {
  cartItem: PropTypes.object.isRequired,
  removeCartItem: PropTypes.func,
  updateCartItem: PropTypes.func,
  currencySymbol: PropTypes.string
};

CartItem.defaultProps = {
  removeCartItem: () => console.log('removeCartItem, required'),
  updateCartItem: () => console.log('updateCartItem, required'),
  currencySymbol: ''
};

export default CartItem;
