import React from 'react';
import WishlistItem from '../../molecules/wishlist-item';
import './style.scss';
import lines from '../../../../../assets/images/text-lines.svg';

function WishList({ addProductToWishlist, wishListproductList }) {
  console.log('inside WishList component AKA FollowingList', { wishListproductList });
  return wishListproductList.length > 0 ? (
    <ul className="wishlist list-unstyled mb-0">
      {wishListproductList.map((item, key) => (
        <WishlistItem key={key} item={item} addProductToWishlist={addProductToWishlist} />
      ))}
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
