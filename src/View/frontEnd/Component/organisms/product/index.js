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
import ColorThief from 'colorthief';

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
    <a
      className="cart__button btn btn-primary d-flex gap-1 align-items-center justify-content-center fw-bold"
      // variant="success"
      //size="sm"
      // className="icon icon__pro"
      // onClick={removeFromCart}
    >
      <FontAwesomeIcon icon={solid('circle-check')} />
      In Cart
    </a>
  ) : (
    <a
      className="btn btn-secondary d-flex gap-1 fw-bold cart__button"
      // variant="primary"
      // style={{ width: '56px', fontSize: '16px' }}
      // className="icon icon__pro"
      onClick={() => addToCart()}
    >
      <FontAwesomeIcon icon={solid('plus')} />
      Donate {/* <FontAwesomeIcon icon={regular('cart-shopping')} /> */}
    </a>
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
  return (
    // <div className="product px-2">
    //   {/* <Link
    //     to={'/categories/' + categorySlug}
    //     // params={{ testvalue: "hello" }}
    //     // to={{ pathname: "/categories/" + categorySlug, state: {key:props.categoryDetails?._id} }}
    //     className="product__header d-block text-decoration-none"
    //     style={{ backgroundColor: theme_color }}
    //     state={{
    //       id: props.categoryDetails?._id,
    //       catIcon: catIcon,
    //       theme_color: theme_color,
    //       catName: props.categoryDetails?.name
    //     }}
    //   >
    //     &nbsp;
    //   </Link> */}
    //   <div className="product__columns mb-3 d-flex align-items-center position-relative">
    //     <div className="product__mid d-flex align-items-center justify-content-center">
    //       <Link
    //         className="proudct__img-wrap d-flex align-items-center justify-content-center"
    //         to={'/item/' + props.slug}
    //       >
    //         <img
    //           className="product__img img-fluid"
    //           alt=""
    //           src={helper.CampaignProductImagePath + img}
    //         />
    //       </Link>
    //     </div>
    //   </div>
    //   <div className="mt-1">
    //         <p className="m-0 fs-7">{props.campaignDetails?.name}</p>
    //       </div>
    //   <div className="mx-2 mt-2 d-flex flex-grow-1 product__order">
    //     <div className="d-flex flex-column flex-grow-1 me-1 me-sm-3">
    //       <Link to={'/item/' + props.slug} className="d-inline-block">
    //         <h5 className="product__title">{name}</h5>
    //       </Link>

    //       {/* <div className="mt-1 product__date d-flex align-items-center">
    //           <FontAwesomeIcon icon={regular('clock')} className="mr-6p" />

    //           <span className="date__name">{date}</span>
    //         </div> */}
    //     </div>
    //     {/*
    //   <div className="product__actions d-flex align-items-center p-1 me-1 mt-3">
    //     {props.organizationId !== '63fe5d48448eff9f0a6412d8' &&
    //     props.organizationId !== '63fe60f1448eff9f0a6412e6' ? (
    //       <>
    //         <div className="d-flex gap-1 me-2">
    //           <div className="wish">
    //             <IconToggle
    //               activeColor="rgb(246, 100, 97)"
    //               ischecked={props.wishListproductIds.includes(props._id)}
    //               icon={<FontAwesomeIcon icon={regular('heart')} />}
    //               checkedIcon={<FontAwesomeIcon icon={solid('heart')} />}
    //               name={props._id}
    //               onClickFilter={onClickFilter}
    //             />
    //           </div>
    //           <div className="d-flex align-items-center">{btn}</div>
    //         </div>
    //       </>
    //     ) : (
    //       <span className="d-flex gap-1 badge badge--example fs-7 fw-semibold me-2">
    //         <FontAwesomeIcon icon={regular('circle-info')} className="text-primary fs-7" />
    //       </span>
    //     )}

    //     <div className="flex-grow-1">
    //       <ProgressBar variant={unlimited ? 'infinity' : 'success'} now={progress} />
    //     </div>
    //     {!unlimited ? (
    //       <span className="ms-1">{progress}%</span>
    //     ) : (
    //       <div className="unlimited unlimited--home" style={{ marginLeft: '10px' }}>
    //         <div className="tag tag--ongoing _2">
    //           <div className="d-flex icon icon--unlimited">
    //             <FontAwesomeIcon icon={solid('infinity')} className="" />
    //           </div>
    //         </div>
    //       </div>
    //     )}
    //     <div className="product__category d-flex align-items-center ps-2">
    //       <div className="product__subcategory d-flex align-items-center ">
    //       <div className="product__cat-icon mr-6p">
    //         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 640 512">
    //           <path d={subCatIcon} fill="#6f6f90"></path>{' '}
    //         </svg>
    //       </div>
    //       <span>{category}</span>
    //     </div>
    //       {unlimited ? (
    //         <div className="product__count d-flex align-items-center ms-auto ">
    //           <span>{sold} sold</span>
    //         </div>
    //       ) : (
    //         <div className="product__count d-flex align-items-center ms-auto ">
    //           <span>
    //             {sold}&nbsp;/&nbsp;{total} sold
    //           </span>
    //         </div>
    //       )}
    //     </div>
    //   </div> */}
    //     <div className="d-flex flex-column">
    //       {' '}
    //       <div className="d-flex flex-column gap-1 justify-content-start align-items-end">
    //         {/* <div className="small">Each:</div> */}
    //         {address && (
    //           <div className="product__location fs-7 d-flex align-items-center">
    //             <FontAwesomeIcon icon={regular('circle-location-arrow')} className="mr-6p" />
    //             <span className="date__name">{address}</span>
    //           </div>
    //         )}
    //         <div className="price product__price fs-5 fw-bold ">
    //           <span>{currencySymbol}</span>
    //           <span>{priceFormat(props.displayPrice)}</span>
    //         </div>
    //         {unlimited ? (
    //           <div className="product__count d-flex align-items-center">
    //             <span>{sold} sold</span>
    //           </div>
    //         ) : (
    //           <div className="product__count d-flex align-items-center">
    //             <span>
    //               {sold}&nbsp;/&nbsp;{total} sold
    //             </span>
    //           </div>
    //         )}
    //       </div>
    //       <div className="product__meta d-flex align-items-center justify-content-end mt-2">
    //         {(props.projectDetails?.length > 0 || props.projectProducts.length > 0) && (
    //           <span className="product__type icon icon__solid-900 text-success">
    //             <FontAwesomeIcon icon={solid('bolt')} className="text-secondary" />
    //           </span>
    //         )}
    //         {props.postTag && (
    //           <span className="text-infinity d-flex align-items-center product__type product__type-tab">
    //             <FontAwesomeIcon icon={solid('clock-rotate-left')} />
    //           </span>
    //         )}
    //         {props.tax && (
    //           <span className="d-flex align-items-center product__type product__tax">
    //             <img className="" src={receipt}></img>
    //           </span>
    //         )}
    //         {props.media && (
    //           <span className="d-flex align-items-center product__type product__type-media">
    //             <FontAwesomeIcon className="text-primary" icon={solid('image')} />
    //           </span>
    //         )}
    //       </div>
    //     </div>
    //   </div>
    //   <div className="product__details d-flex align-items-center py-1 mt-auto pb-3">
    //       <div className="d-flex product__org">
    //       <Link to={'/organization/' + props.campaignDetails?.slug}>
    //         <img alt="" className="img-fluid org__img charity_avatar_bg" src={organization} />
    //       </Link>
    //     </div>
    //         {/* {props.organizationId !== '63fe5d48448eff9f0a6412d8' &&
    //         props.organizationId !== '63fe60f1448eff9f0a6412e6' ? (
    //           <div className="d-flex">{btn}</div>
    //         ) : (
    //           <span className="p-0 pt-1 d-flex gap-1 badge badge--example fs-7 fw-semibold">
    //             {' '}
    //             <FontAwesomeIcon icon={regular('circle-info')} className="text-primary fs-7" />
    //             Example Item
    //           </span>
    //         )} */}
    //         <div className="d-flex">{btn}</div>
    //       </div>
    // </div>
    <div class="item">
      <div class="item__bg">
        <div class="item__imgwrap">
          <img src={helper.CampaignProductImagePath + img} class="item__img"></img>
        </div>
        <div class="item__words">
          <div class="text-block">{repeatedText}</div>
        </div>
      </div>
      <div class="div-block-32">
        <div class="div-block-36">
          <Link to={'/item/' + props.slug} className="d-inline-block">
            <h4 className="heading-7">{name}</h4>
          </Link>
          <div>{props.campaignDetails?.name}</div>
        </div>
        <Button size="sm" variant="info">
          <span>{currencySymbol}</span>
          <span>{priceFormat(props.displayPrice)}</span>
        </Button>
      </div>
    </div>
  );
};

export default Product;
