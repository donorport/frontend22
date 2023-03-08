import React from "react";
import bag from '../../../../../assets/images/bag.svg';

function EmptyCart() {
  return (
    <div className="empty__block pt-5">
      <div className="empty__cart mb-2">
        <img
          src={bag}
          alt=""
        />
      </div>
      <div className="no__items-found fw-bold">No items in cart.</div>
    </div>
  );
}

export default EmptyCart;
