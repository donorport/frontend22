import React from 'react';
import PropTypes from 'prop-types';

import CartItem from '../../../molecules/cart-item';

function CartList(props) { 
  return (
    <ul className="cd__cart__list list-unstyled mb-0 p-0">
      {props.cartItem?.length > 0 &&
        props.cartItem.map((item, i) => {
          return (
            <CartItem
              updateChildCart={props.updateChildCart}
              cartItem={item}
              key={i}
              removeCartItem={props.removeCartItem}
              updateCartItem={props.updateCartItem}
              // CalculatePrice={props.CalculatePrice}
              currencySymbol={props.currencySymbol}
            />
          );
        })}
    </ul>
  );
}

CartList.propTypes = {
  cartItem: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeCartItem: PropTypes.func,
  updateCartItem: PropTypes.func,
  // CalculatePrice: PropTypes.func,
  currencySymbol: PropTypes.string,
  updateChildCart: PropTypes.func,
};

CartList.defaultProps = {
  removeCartItem: () => console.log('removeCartItem, required'),
  updateCartItem: () => console.log('updateCartItem, required'),
  // CalculatePrice: () => console.log('updateCartItem, required'),
  currencySymbol: ''
};

export default CartList;
