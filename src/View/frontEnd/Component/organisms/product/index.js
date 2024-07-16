import React, { useState, useEffect, useContext } from 'react';
// import { UserContext } from '../../../../../App';
import { ProgressBar, Button } from 'react-bootstrap';
// import { ReactComponent as HeartSvg } from "@assets/svg/heart-o.svg";
import { ReactComponent as HeartSvg } from '../../../../../assets/svg/heart-o.svg';
import helper, {
  getCalculatedPrice,
  priceFormat,
  convertAddress
} from '../../../../../Common/Helper';
import moment from 'moment';
import { Link } from 'react-router-dom';
import IconToggle from '../../atoms/icon-toggle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid, light } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Icon } from '@iconify/react';
import { useSelector, useDispatch } from 'react-redux';
import { setIsUpdateCart } from '../../../../../user/user.action';
import receipt from '../../../../../assets/images/receipt.svg';
import profile from '../../../../../assets/images/avatar.png';
import axios from 'axios';

import './style.scss';

const Product = (props) => {
  const generateRepeatedText = (text, repeatCount) => {
    let repeatedText = props.categoryDetails?.slug;
    for (let i = 0; i < repeatCount; i++) {
      repeatedText += `${text} `;
    }
    return repeatedText.trim();
  };
  const repeatedText = generateRepeatedText(props.categoryDetails?.slug || 'Default Text', 50); // Adjust repeat count as needed

  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');

  // console.log(props)
  let name = props.headline;
  let sold = props.soldout;
  let total = props.quantity;
  let location = props.cityDetails?.length > 0 && props.cityDetails[0]?.city;

  // 30/40*100 = 75.
  let unlimited = props.unlimited;
  let media = props.media ? props.media : false;

  let address = props.address ? convertAddress(props.address) : '';

  let progress = unlimited ? 100 : Math.round((sold / total) * 100);

  const getCalc = getCalculatedPrice();

  // let price = getCalc.getData(props.price)
  let price = props.displayPrice ? props.displayPrice : props.price;

  let currencySymbol = getCalc.currencySymbol();

  let theme_color = props.categoryDetails?.color;
  let categorySlug = props.categoryDetails?.slug;
  let category = props.subCategoryDetails?.name;
  let isFulfiled = props.isFulfiled;

  let organization =
    props.campaignDetails?.logo && props.campaignDetails?.logo
      ? helper.CampaignAdminLogoPath + props.campaignDetails?.logo
      : profile;

  // console.log(props.campaignDetails?.logo)
  let img = props.image;
  let date = moment(props.updated_at).format('MMM DD');
  let catIcon = props.categoryDetails?.iconDetails?.class;
  // let subCatIcon = props.subCategoryDetails?.iconDetails?.class;
  let subCatIcon = props.subCategoryDetails?.icon;

  // const user = useContext(UserContext)
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    added_to_cart: false
  });
  useEffect(() => {
    (async () => {
      if (!CampaignAdminAuthToken) {
        setState({
          added_to_cart: props.cartProductIds.includes(props._id)
        });
        const checkItem = await props.checkItemInCart(props._id);
        if (checkItem === true) {
          setState({
            added_to_cart: true
          });
        } else {
          setState({
            added_to_cart: false
          });
        }
      }
    })();
  }, [!user.isUpdateCart, props.cartProductIds, props.t]);

  let isFinish = !unlimited && sold >= total ? true : false;

  // const {

  //   sold,
  //   total,
  //   location,
  //   progress,
  //   price,
  //   img,
  //   date,
  //   theme_color,
  //   category,
  //   organization,
  // } = props;

  const { added_to_cart } = state;

  const addToCart = async () => {
    // alert(props._id)
    // user.setCart(true)
    // user.setCart(!user.isUpdateCart)

    await props.addToCart(props._id);
    if (!CampaignAdminAuthToken) {
      setState({ added_to_cart: true });

      dispatch(setIsUpdateCart(!user.isUpdateCart));
    }
  };

  const removeFromCart = async () => {
    // user.setCart(!user.isUpdateCart)
    dispatch(setIsUpdateCart(!user.isUpdateCart));
    await props.removeCartItem(props._id);
    setState({ added_to_cart: false });
  };

  const onClickFilter = async (e) => {
    await props.addProductToWishlist(props._id);
  };

  const cart_btn = added_to_cart ? (
    <Button size="sm" variant="secondary" className="fw-bolder" onClick={() => addToCart()}>
        <FontAwesomeIcon icon={solid('circle-check')} className="fs-4" />
    </Button>
  ) : (
    <Button size="sm" variant="info" className="fw-bolder" onClick={() => addToCart()}>
      <span>{currencySymbol}</span>
      <span>{Math.round(props.displayPrice)}</span>
    </Button>
  );
  const btn =
    isFinish || (isFulfiled && !unlimited) ? (
      <span className="d-flex align-items-center fw-bold p-1 bg-success text-white">
        <FontAwesomeIcon icon={solid('circle-check')} className="sold__icon me-1" />
        <span> Funded</span>
      </span>
    ) : (
      cart_btn
    );
  if (props.isFirst) {
    return (
      <div className="flex-grow-1 item item--feature">
        <div className="item__bg feature">
          <div className="feature__header">
            <h4>Top Pick</h4>
            <div className="feature__price">
              <span>{currencySymbol}</span>
              <span>{priceFormat(props.displayPrice)}</span>
            </div>
          </div>
          <img src={helper.CampaignProductFullImagePath + img} className="feature__img" />
          <Button variant="primary" className="feature__btn">
            <FontAwesomeIcon className="fs-4" icon={solid('arrow-up-right-from-square')} />
          </Button>
          <div className="feature__bg">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="item">
      <div className="item__bg">
        <div className="item__imgwrap">
          <img src={helper.CampaignProductFullImagePath + img} className="item__img" />
        </div>
        <div className="item__words">
          <div className="text-block">{repeatedText}</div>
        </div>
      </div>
      <div className="div-block-32">
        <div className="div-block-36">
          <Link to={'/item/' + props.slug} className="d-inline-block">
            <h4 className="heading-7">{name}</h4>
          </Link>
          <div className="text-light">{props.campaignDetails?.name}</div>
        </div>
        {cart_btn}
      </div>
    </div>
  );
};

export default Product;
