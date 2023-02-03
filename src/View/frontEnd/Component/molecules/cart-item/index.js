import React, { useState, useEffect, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Button } from 'react-bootstrap';
import ListItemImg from '../../atoms/list-item-img';
import helper, { priceFormat, getCalculatedPrice } from '../../../../../Common/Helper';
import { Link } from 'react-router-dom';

import './style.scss';
import { debounce } from 'lodash';

function CartItem(props) {
  let cartItem = props.cartItem;
  console.log(cartItem);
  // console.log(cartItem)
  const [quantity, setQuantity] = useState();
  // const CalculatePrice = getCalculatedPrice()
  // console.log(cartItem)

  // let transactionFee = props.pricingFees?.transactionFee
  // let platformFee = props.pricingFees?.platformFee
  // let totalCharge = Number(transactionFee) + Number(platformFee)
  // let price = props.CalculatePrice.getData(cartItem?.productDetails?.price)
  let price = cartItem.productDetails?.displayPrice
    ? cartItem.productDetails?.displayPrice
    : cartItem.productDetails?.price;

  let currencySymbol = props.currencySymbol;

  // console.log(location)

  const minusValue = async (value) => {
    // console.log('minusValue', value)
    if (value > 1) {
      value--;
      await props.updateCartItem(value, cartItem?._id, cartItem?.productDetails?._id, 'minus');
    }
    // setQuantity(value)
  };

  const plusValue = async (value) => {
    // console.log('plusValue', value)
    //value++;
    // setQuantity(value)
  };
  // console.log(props.cartItem)

  // const myfunction = debounce(async (quantity) => {
  //   // await props.updateCartItem(quantity, cartItem?._id, cartItem?.productDetails?._id, 'plus');
  //   console.log('My function: ', quantity);
  // }, 5000);
  const updateQuantity = useCallback(
    debounce(async (quantity) => {
      await props.updateCartItem(quantity, cartItem?._id, cartItem?.productDetails?._id, 'plus');
    }, 1000),
    []
  );
  useEffect(() => {
    setQuantity(cartItem?.quantity);
  }, [cartItem]);

  useEffect(() => {
    updateQuantity(quantity);
  }, [quantity]);

  return (
    <li className="cd__cart__item px-1 py-2 d-flex align-items-center border-bottom">
      <div className="d-flex align-items-center">
        <ListItemImg
          size={62}
          imgSrc={helper.CampaignProductImagePath + cartItem?.productDetails?.image}
        />
        <div className="cd__cart__main pl-12p" style={{ width: '105px' }}>
          <div className="cd__cart__title pr-12p">
            <Link
              to={'/item/' + cartItem?.productDetails.slug}
              className="cd__cart__name text-decoration-none text-dark fs-5"
            >
              {cartItem?.productDetails?.headline}
            </Link>
            <div className="cd__cart__location fw-semibold fs-7 mb-3p mt-3p">
              {cartItem?.productDetails?.organizationDetails?.name}
            </div>
          </div>
          <div className="cd__cart__price text-light fw-bold">
            {currencySymbol + priceFormat(price)}
          </div>
        </div>
        <div className="cd__cart__right d-flex align-items-center">
          <Button variant="link" className="text-decoration-none btn__link-light p-0">
            <FontAwesomeIcon
              icon={regular('angle-down')}
              onClick={() => {
                if (quantity > 1) setQuantity(quantity - 1);
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
              if (
                cartItem?.productDetails.soldout + +e.target.value <=
                cartItem?.productDetails.quantity
              )
                setQuantity(+e.target.value === 0 ? '' : +e.target.value);
            }}
          />
          <Button variant="link" className="btn__link-light text-decoration-none p-0">
            <FontAwesomeIcon
              icon={regular('angle-up')}
              onClick={() => {
                if (cartItem?.productDetails.soldout + quantity < cartItem?.productDetails.quantity)
                  setQuantity(quantity + 1);
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

export default CartItem;
