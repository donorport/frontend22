import React from "react";
import { Button } from "react-bootstrap";
// import ListItemImg from "@components/atoms/list-item-img";
import { ListItemImg } from "../../atoms";
import "./style.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import helper,{getCalculatedPrice,priceFormat} from "../../../../../Common/Helper";

function WishlistItem(props) {
  let item = props.item
  const getCalc = getCalculatedPrice()
  let price =getCalc.getData(item.productDetails.price)  
 
  return (
    <li className="wishlist__item p-1 d-flex align-items-center border-bottom">
      <div className="d-flex align-items-center">
        <ListItemImg imgSrc={helper.CampaignProductImagePath+ item.productDetails.image}/>

        <div className="wishlist__item__main pl-12p">
          <div className="wishlist__item__title pr-12p">
          <Link variant="link" className="wishlist__item__name" to={'/item/' + product.slug}>
          {item.productDetails.headline}
           </Link>
            {/* <div className="wishlist__item__location">Canada</div> */}
          </div>
          <div className="wishlist__item__price">{ getCalc.currencySymbol()}{priceFormat(price)}</div>
        </div>
      </div>
      <div className="wishlist__item__remove ms-auto">
        <Button variant="link" className="text-decoration-none" onClick={()=>props.addProductToWishlist(item.productDetails._id)}>
          <FontAwesomeIcon icon={solid('heart')} style={{ color: "#f66461" }} className="fs-4" />
        </Button>
      </div>
    </li>
  );
}

export default WishlistItem;
