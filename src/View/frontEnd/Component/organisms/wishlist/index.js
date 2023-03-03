import React from 'react';
import WishlistItem from '../../molecules/wishlist-item';
import './style.scss';
import lines from '../../../../../assets/images/text-lines.svg';

function WishList(props) {
  let wishListproductList = props.wishListproductList;
  return wishListproductList.length > 0 ? (
    <ul className="wishlist list-unstyled mb-0">
      {wishListproductList.length > 0 &&
        wishListproductList.map((item, i) => {
          return <WishlistItem item={item} addProductToWishlist={props.addProductToWishlist} />;
        })}
    </ul>
  ) : (
    <div className="empty__block pt-5">
      <div className="empty__cart mb-2">
        <img src={lines} alt="" width="90%" />
      </div>
      <div className="no__items-found fw-bold">Your Wishlist is empty.</div>
    </div>
  );
}

export default WishList;
