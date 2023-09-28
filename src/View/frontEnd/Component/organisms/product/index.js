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
import profile from '../../../../../assets/images/avatar.png';

import './style.scss';

const Product = (props) => {
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
      className="p-1 text-success rounded-3 fw-bold"
      // variant="success"
      //size="sm"
      // className="icon icon__pro"
      // onClick={removeFromCart}
    >
      <FontAwesomeIcon icon={solid('circle-check')} /> In Cart
    </a>
  ) : (
    <a
      className="btn-outline-primary btn p-1 rounded-3 fw-bold"
      // variant="primary"
      // style={{ width: '56px', fontSize: '16px' }}
      // className="icon icon__pro"
      onClick={() => addToCart()}
    >
      Add to Cart
      {/* <FontAwesomeIcon icon={regular('cart-shopping')} /> */}
    </a>
  );
  const btn =
    isFinish || (isFulfiled && !unlimited) ? (
      <span className="d-flex align-items-center fw-bold rounded-3 p-1 bg-success text-white">
        <FontAwesomeIcon icon={solid('circle-check')} className="sold__icon me-1" />
        <span> Funded</span>
      </span>
    ) : (
      cart_btn
    );
  return (
    <div className="product p-1">
      <Link
        to={'/categories/' + categorySlug}
        // params={{ testvalue: "hello" }}
        // to={{ pathname: "/categories/" + categorySlug, state: {key:props.categoryDetails?._id} }}
        className="product__header d-block text-decoration-none"
        style={{ backgroundColor: theme_color }}
        state={{
          id: props.categoryDetails?._id,
          catIcon: catIcon,
          theme_color: theme_color,
          catName: props.categoryDetails?.name
        }}
      >
        &nbsp;
      </Link>
      <div className="product__columns d-flex align-items-center pt-1 pb-2 px-2">
        <div className="d-flex product__left d-flex flex-column">
          <div className="d-flex flex-grow-1 flex-column product__order">
            <Link to={'/item/' + props.slug} className="d-inline-block">
              <h4 className="product__title mt-12p ">{name}</h4>
            </Link>
            <div className="mt-1 product__date d-flex align-items-center">
              <FontAwesomeIcon icon={regular('clock')} className="mr-6p" />

              <span className="date__name">{date}</span>
            </div>
            <div className="d-flex flex-column flex-grow-1 justify-content-end">
              {/* <div className="small">Each:</div> */}
              <div className="product__price fs-5 fw-bold ">
                <span>{currencySymbol}</span>
                <span className="cost">{priceFormat(props.displayPrice)}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="product__mid d-flex align-items-center justify-content-center">
          <div className="margin-auto position-absolute proudct__img-wrap d-flex align-items-center justify-content-center">
            <Link to={'/item/' + props.slug}>
              <img
                className="product__img img-fluid"
                alt=""
                src={helper.CampaignProductImagePath + img}
              />
            </Link>
          </div>
        </div>
        <div className="product__right position-relative d-flex flex-column align-items-center pt-12p">
          <div className="d-flex me-1 justify-content-end product__org">
            <Link to={'/organization/' + props.campaignDetails?.slug} className="">
              <img alt="" className="img-fluid org__img charity_avatar_bg" src={organization} />
            </Link>
          </div>
          {address && (
            <div className="product__location position-absolute d-flex align-items-center mt-auto">
              <FontAwesomeIcon icon={regular('circle-location-arrow')} className="mr-6p" />
              <span className="date__name">{address}</span>
            </div>
          )}
        </div>
      </div>
      <div className="product__category d-flex align-items-center flex-grow-1 pt-2 pb-1 px-2">
        <div className="product__subcategory d-flex align-items-center ">
          <div className="product__cat-icon mr-6p">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 640 512">
              <path d={subCatIcon} fill="#6f6f90"></path>{' '}
            </svg>
          </div>
          <span>{category}</span>
        </div>
        {unlimited ? (
          <div className="product__count d-flex align-items-center ms-auto ">
            <span>{sold} sold</span>
          </div>
        ) : (
          <div className="product__count d-flex align-items-center ms-auto ">
            <span>
              {sold}&nbsp;/&nbsp;{total} sold
            </span>
          </div>
        )}
      </div>
      <div className="d-flex align-items-center p-1 me-1">
        <div className="wish me-1">
          <IconToggle
            activeColor="rgb(246, 100, 97)"
            ischecked={props.wishListproductIds.includes(props._id)}
            icon={<FontAwesomeIcon icon={regular('heart')} />}
            checkedIcon={<FontAwesomeIcon icon={solid('heart')} />}
            name={props._id}
            onClickFilter={onClickFilter}
          />
        </div>
        <div className="flex-grow-1">
          <ProgressBar variant={unlimited ? 'infinity' : 'success'} now={progress} />
        </div>
        {!unlimited ? (
          <span className="ms-1">{progress}%</span>
        ) : (
          <div className="unlimited unlimited--home" style={{ marginLeft: '10px' }}>
            <div className="tag tag--ongoing _2">
              <div className="d-flex icon icon--unlimited">
                <FontAwesomeIcon icon={solid('infinity')} className="" />
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="product__details d-flex align-items-center py-2 px-2">
        <div className="d-flex">{btn}</div>
        <div className="product__meta d-flex align-items-center ms-auto">
          {(props.projectDetails?.length > 0 || props.projectProducts.length > 0) && (
            <span className="product__type icon icon__solid-900 text-success">
              <FontAwesomeIcon icon={solid('bolt')} style={{ color: '#5f5df8' }} />
            </span>
          )}
          {props.postTag && (
            <span className="product__type product__type-tab icon icon__solid-900">
              <FontAwesomeIcon icon={solid('tag')} color="#947ada" />
            </span>
          )}
          {props.tax && (
            <span className="product__type product__type-tax icon icon__solid-900">
              <FontAwesomeIcon icon={solid('paperclip')} />
            </span>
          )}
          {props.media && (
            <span className="product__type product__type-media icon icon__solid-900">
              <FontAwesomeIcon className="fs-3 text-primary" icon={solid('camera')} />
            </span>
          )}
        </div>
      </div>
    </div>
    // <div className="product">
    //   <Link
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
    //   </Link>
    //   {/* <button
    //     className="product__header d-block"
    //     style={{ backgroundColor: theme_color }}
    //     onClick={()=>alert('k')}
    //     variant='link'
    //   >
    //     &nbsp;
    //   </button> */}

    //   <div className="border-bottom d-flex align-items-center p-1 me-1">
    //     <div className="wish me-1">
    //       <IconToggle
    //         activeColor="rgb(246, 100, 97)"
    //         ischecked={props.wishListproductIds.includes(props._id)}
    //         icon={<FontAwesomeIcon icon={regular('heart')} />}
    //         checkedIcon={<FontAwesomeIcon icon={solid('heart')} />}
    //         name={props._id}
    //         onClickFilter={onClickFilter}
    //       />
    //     </div>
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
    //   </div>

    //   <div className="product__columns border-bottom d-flex align-items-center">
    //     <div className="product__left d-flex flex-column">
    //       <div className="product__order">
    //         <Link to={'/item/' + props.slug} className="d-inline-block">
    //           <h4 className="product__title mt-12p ">{name}</h4>
    //         </Link>
    //         <div className="small">Price:</div>
    //         <div className="product__price">
    //           <span>{currencySymbol}</span>
    //           <span className="cost">{priceFormat(props.displayPrice)}</span>
    //           {/* <span className="cost">{(price)}</span> */}
    //         </div>
    //       </div>
    //       {
    //         // !CampaignAdminAuthToken &&
    //         // <div className="mt-auto mb-12p"> {!unlimited ? btn : cart_btn}</div>
    //         <div className="d-flex mt-auto mb-12p"> {btn}</div>
    //       }
    //     </div>
    //     <div className="product__mid d-flex align-items-center justify-content-center">
    //       <div className="proudct__img-wrap d-flex align-items-center justify-content-center">
    //         <Link to={'/item/' + props.slug}>
    //           <img
    //             className="product__img img-fluid"
    //             alt=""
    //             src={helper.CampaignProductImagePath + img}
    //           />
    //         </Link>
    //       </div>
    //     </div>
    //     <div className="product__right position-relative d-flex flex-column align-items-center pt-12p pb-2">
    //       <div className="product__org">
    //         <Link to={'/organization/' + props.campaignDetails?.slug} className="">
    //           <img alt="" className="img-fluid org__img charity_avatar_bg" src={organization} />
    //         </Link>
    //       </div>
    //       {address && (
    //         <div className="product__location position-absolute d-flex align-items-center mt-auto">
    //           {/* <span className="icon icon__pro"></span> */}
    //           {/* <FontAwesomeIcon icon="fa-light fa-circle-location-arrow" /> */}
    //           <FontAwesomeIcon icon={regular('circle-location-arrow')} className="mr-6p" />

    //           <span className="date__name">{address}</span>
    //         </div>
    //       )}
    //     </div>
    //   </div>

    //   <div className="product__details border-bottom d-flex align-items-center">
    //     <div className="product__date d-flex align-items-center">
    //       {/* <span className="icon icon__pro-400 date__icon mr-6p"></span> */}
    //       <FontAwesomeIcon icon={regular('clock')} className="mr-6p" />

    //       <span className="date__name">{date}</span>
    //     </div>
    //     <div className="product__meta d-flex align-items-center ms-auto">
    //       {(props.projectDetails?.length > 0 || props.projectProducts.length > 0) && (
    //         <span className="product__type icon icon__solid-900 text-success">
    //           <FontAwesomeIcon icon={solid('bolt')} style={{ color: '#5f5df8' }} />
    //         </span>
    //       )}

    //       {props.postTag && (
    //         <span className="product__type product__type-tab icon icon__solid-900">
    //           {/* <Icon icon="bxs:purchase-tag" color="#947ada" /> */}
    //           <FontAwesomeIcon icon={solid('tag')} color="#947ada" />
    //         </span>
    //       )}

    //       {props.tax && (
    //         <span className="product__type product__type-tax icon icon__solid-900">
    //           {/*  */}
    //           {/* <FontAwesomeIcon icon="fa-solid fa-calculator" /> */}
    //           <FontAwesomeIcon icon={solid('paperclip')} />
    //         </span>
    //       )}

    //       {props.media && (
    //         <span className="product__type product__type-tab icon icon__solid-900">
    //           {/* <Icon icon="bxs:purchase-tag" color="#947ada" /> */}
    //           {/* <FontAwesomeIcon icon={solid("tag")} color="#947ada" /> */}
    //           <FontAwesomeIcon className="fs-3 text-primary" icon={solid('camera')} />
    //         </span>
    //       )}
    //     </div>
    //   </div>

    //   <div className="product__category d-flex align-items-center flex-grow-1">
    //     {/*  <Link
    //       to={"/categories/" + categorySlug}
    //       className="product__category-icon me-1"
    //       style={{ backgroundColor: theme_color }}
    //       state={{ id: props.categoryDetails?._id, catIcon: catIcon, theme_color: theme_color, catName: props.categoryDetails?.name }}
    //     >
    //       <i className={catIcon} style={{ fontFamily: "fontAwesome", color: "white", fontStyle: "normal", marginLeft: "1.5px" }}></i>
    //       {/* <img
    //           src=""
    //           className="img-fluid"
    //           alt=""
    //         />
    //     </Link> */}
    //     <div className="product__subcategory d-flex align-items-center ">
    //       <div className="product__cat-icon mr-6p">
    //         {/* <i className={subCatIcon} style={{ fontFamily: "fontAwesome", fontStyle: "normal" }}></i> */}

    //         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 640 512">
    //           <path d={subCatIcon} fill="#6f6f90"></path>{' '}
    //         </svg>

    //         {/* <svg
    //             viewBox="0 0 25 25"
    //             height="20"
    //             xmlns="http://www.w3.org/2000/svg"
    //           >
    //             <path
    //               fill="#6f6f90"
    //               d="M17.738 17.264H16.445v.955h1.294c.245 0 .453-.219.453-.477 0-.26-.208-.478-.454-.478zM17.697 15.947a.47.47 0 0 0-.454-.472h-.798v.835h1.08a.46.46 0 0 0 .172-.363z"
    //             ></path>
    //             <path
    //               fill="#6f6f90"
    //               d="M19.371 12.79H16.33c1.128 0 2.025-.933 2.025-2.06V6.11c0-1.127-.897-2.029-2.025-2.029h-4.62c-1.127 0-2.064.902-2.064 2.03v4.619c0 .419.136.808.353 1.133l-.082-.087a2.025 2.025 0 0 0-1.443-.597c-.548 0-1.06.212-1.445.597L4.2 14.603a2.047 2.047 0 0 0 0 2.892l2.828 2.827c.385.385.899.597 1.446.597a2.03 2.03 0 0 0 1.446-.597l2.817-2.827c.293-.293.486-.653.546-1.03v2.378c0 1.127.937 2.06 2.064 2.06h4.023c1.128 0 2.025-.933 2.025-2.06V14.82c0-1.128-.897-2.03-2.025-2.03zm-5.096-7.008c.69 0 1.342.267 1.833.752a.477.477 0 1 1-.67.68 1.658 1.658 0 0 0-2.818 1.179 1.658 1.658 0 0 0 2.913 1.076.477.477 0 1 1 .724.622c-.497.58-1.219.911-1.982.911-1.439 0-2.61-1.17-2.61-2.61s1.171-2.61 2.61-2.61zm-2.752 10.432a.477.477 0 0 1-.606.296l-.704-.243-1.511 1.511.236.719a.477.477 0 1 1-.907.298l-1.29-3.923a.477.477 0 0 1 .609-.6l3.878 1.335c.249.086.381.358.295.607zm1.76-1.394v.813a1.89 1.89 0 0 0-.545-1.03l-2.166-2.164c.324.217.719.352 1.138.352h3.638c-1.127 0-2.064.901-2.064 2.029zm4.455 4.353h-1.75a.508.508 0 0 1-.497-.492v-3.699c0-.264.233-.462.497-.462h1.255a1.413 1.413 0 0 1 1.273 2.017c.38.257.63.702.63 1.199 0 .79-.631 1.437-1.408 1.437z"
    //             ></path>
    //           </svg> */}
    //       </div>
    //       <span>{category}</span>
    //     </div>
    //     {unlimited ? (
    //       <div className="product__count d-flex align-items-center ms-auto ">
    //         <span>{sold} sold</span>
    //       </div>
    //     ) : (
    //       <div className="product__count d-flex align-items-center ms-auto ">
    //         <span>
    //           {sold}&nbsp;/&nbsp;{total} sold
    //         </span>
    //       </div>
    //     )}
    //   </div>

    //   <div style={{ backgroundColor: theme_color }} className="product__footer"></div>
    // </div>
  );
};

export default Product;
