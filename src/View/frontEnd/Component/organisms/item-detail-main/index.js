import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Button, ProgressBar, Card } from 'react-bootstrap';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

import IconToggle from '../../atoms/icon-toggle';
import ShareWidget from '../share-widget';
import IconText from '../../molecules/icon-text';
import ProjectGallery from '../project-gallery';
import moment from 'moment';
import helper, {
  getCalculatedPrice,
  priceFormat,
  convertAddress
} from '../../../../../Common/Helper';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './style.scss';
import { GalleryImg } from '../../atoms';
import { CircularProgress } from '@mui/material';
import advertisementApi from "../../../../../Api/admin/advertisement"


function ProjectDetailMain(props) {
  console.log('iFrame, item-detail-main');
  let productDetails = props.productDetails;
  
  let videoid = productDetails.galleryUrl ? productDetails.galleryUrl.split("?v=")[1] : "";
  let embedlink = videoid ? "http://www.youtube.com/embed/" + videoid : "";
  const getCalc = getCalculatedPrice();
  // let price = getCalc.getData(productDetails?.price)
  let price = productDetails?.displayPrice ? productDetails?.displayPrice : productDetails?.price;

  let currencySymbol = getCalc.currencySymbol();

  let per = (productDetails.soldout / productDetails.quantity) * 100;

  let address = productDetails?.address ? convertAddress(productDetails?.address) : '';

  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [allStateAds, setAllStateAds] = useState();
  const [addedToCard, setAddedToCard] = useState(false);
  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let maxQuentity = productDetails.unlimited
    ? 1000
    : productDetails.quantity - productDetails.soldout;


  useEffect(() => {
    (async () => {
      if (!CampaignAdminAuthToken) {
        const checkItem = await props.checkItemInCart(productDetails._id);
        if (checkItem === true) {
          setAddedToCard(true);
        } else {
          setAddedToCard(false);
        }
      }
    })();
  }, [!user.isUpdateCart, productDetails._id]);
  
  useEffect(() => {
    (async () => {
      const res = await advertisementApi.allStateAds()
      setAllStateAds(res.data.data)
    })();
  },[]);

  const onClickFilter = async (e) => {
    await props.addProductToWishlist(productDetails._id);
  };

  const cart_btn = addedToCard ? (
    <Button
      variant="success"
      size="lg"
      className="icon icon__pro fw-semibold"
      style={{ minWidth: '250px' }}
    >
      Added In cart &nbsp;
      <FontAwesomeIcon icon={solid('circle-check')} />
    </Button>
  ) : (
    <Button
      variant="primary"
      size="lg"
      className="btn--addtocart fw-semibold"
      style={{ minWidth: '250px' }}
      onClick={() => {
        props.addToCart(productDetails._id, quantity);
        // dispatch(setIsUpdateCart(!user.isUpdateCart))
      }}
    >
      Add to cart ({quantity})
    </Button>
  );
  // let isFinish = !productDetails.unlimited && productDetails.soldout >= productDetails.quantity ? true : false
  let isFinish =
    !productDetails.unlimited && productDetails.quantity <= productDetails.soldout ? true : false;

  // isFinish || productDetails.isFulfiled && !productDetails.unlimited
  // sold >= total
  const btn =
    isFinish || (productDetails.isFulfiled && !productDetails.unlimited) ? (
      /*<span className="btn btn-outline-danger btn-lg btn__sold"> 
        <FontAwesomeIcon icon={solid('circle-check')} className="sold__icon" />
        Funded</span>*/
      <></>
    ) : (
      cart_btn
    );


  return (
    <div className="project__detail-main">
      <div className="d-flex flex-column">
        <h4 className="project__detail-label mb-3p">Item</h4>
        <h1 className="project__detail-title text-dark" style={{ textTransform: 'capitalize' }}>
          {productDetails?.headline}
        </h1>
        <h5 className="project__detail-sublabel mb-0 fw-bolder">Product</h5>
        <div className="project__detail-subtitle mb-12p fw-bold">{productDetails?.brand} ™</div>
        <div className="project__detail-price fs-1 text-price">
          {currencySymbol}
          {priceFormat(price)}
        </div>
        <div className="project__detail-meta d-flex align-items-center">
          <div className="d-flex align-items-center me-2">
            <FontAwesomeIcon icon={regular('clock')} className="me-1" />
            {moment(productDetails?.created_at).format('MMMM DD, YYYY')}
          </div>
          {productDetails?.address && (
            <div className="d-flex align-items-center me-2">
              <FontAwesomeIcon icon={regular('circle-location-arrow')} className="me-1" />
              {address}
            </div>
          )}
        </div>

        {/* show for mobile view */}

        <div className="note d-sm-none project__detail-img mb-3">
          <img
            className="img-fluid"
            alt=""
            src={helper.CampaignProductFullImagePath + productDetails?.image}
          />
        </div>

        <div className="product__top px-0 mb-1 d-flex align-items-center">
          <div className="page__bar d-flex align-items-center flex-grow-1">
            <ProgressBar
              variant={productDetails.unlimited ? 'infinity' : 'success'}
              now={productDetails.unlimited ? 100 : per}
              className="page__progress flex-grow-1 me-1"
            />
            {productDetails.unlimited ? (
              <span className="tag tag__ongoing tag__rounded fs-9">
                <FontAwesomeIcon icon={regular('infinity')} />
              </span>
            ) : (
              <span className="fw-bold" style={{ whiteSpace: 'nowrap' }}>
                {productDetails.soldout} / {productDetails.quantity}{' '}
                <span className="fs-9 fw-normal">sold</span>
              </span>
            )}
          </div>
          <div className="text-light d-flex align-items-center ms-3 gap-1">
            <IconToggle
              activeColor="rgb(246, 100, 97)"
              icon={<FontAwesomeIcon icon={regular('heart')} />}
              ischecked={props.wishListproductIds.includes(productDetails._id)}
              checkedIcon={<FontAwesomeIcon icon={solid('heart')} />}
              onClickFilter={onClickFilter}
            />

            <IconToggle
              icon={<FontAwesomeIcon icon={regular('bell')} />}
              checkedIcon={<FontAwesomeIcon icon={solid('bell')} />}
              onClickFilter={(e) => props.followToProduct(e)}
              name="Product"
              ischecked={props.isFollow}
            />

            <ShareWidget />
          </div>
        </div>
        <div className="category__icons d-flex align-items-center mb-3 order--1 order-sm-0">
          <Link
            size="lg"
            variant="link"
            className="btn__category text-decoration-none"
            to={'/categories/' + productDetails?.categoryDetails?.slug}
          >
            <span
              className="d-flex align-items-center icon__category ms-1"
              style={{
                fontFamily: 'fontAwesome',
                color: productDetails?.categoryDetails?.color,
                fontStyle: 'normal'
              }}
            >
              {/* <span style={{ fontSize: "x-large" }} className={productDetails?.subCategoryDetails?.iconDetails.class} ></span> */}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 640 512">
                <path
                  d={productDetails?.subCategoryDetails?.icon}
                  fill={productDetails?.categoryDetails?.color}
                ></path>{' '}
              </svg>
            </span>{' '}
            <span className="fs-6 text-dark fw-bold ms-1" style={{ textTransform: 'capitalize' }}>
              {productDetails?.subCategoryDetails?.name}
            </span>
          </Link>
          <Link
            size="lg"
            variant="link"
            className="btn__category text-decoration-none btn btn-link btn-lg"
            to={'/organization/' + productDetails?.campaignDetails?.slug}
          >
            <span className="d-flex align-items-center icon__category">
              {/* <CategoryIcon /> */}
              {/* <div className="page__logo page__logo--org ms-auto" > */}
              <img
                alt=""
                style={{ width: 'auto', maxHeight: '90%', maxWidth: '90%' }}
                src={helper.CampaignAdminLogoPath + productDetails?.campaignDetails?.logo}
              />
              {/* </div> */}
            </span>
            <span className="fs-6 text-dark fw-bold ms-1" style={{ textTransform: 'capitalize' }}>
              {productDetails?.campaignDetails?.name}
            </span>
          </Link>
          {/* <Button
          size="lg"
          variant="link"
          className="btn__category text-decoration-none btn btn-link btn-lg"
        >
          <span className="d-flex align-items-center icon__category">
            <img
              alt=""
              className="img-fluid"
              src=""
            />
          </span>
        </Button> */}
          {/* <Button size="lg" variant="success" className=" text-decoration-none">
          <span className="fs-6">Shelter</span>
        </Button>*/}
        </div>
      </div>

      {embedlink && (
        <div className="project-video-wrap mb-1">
          <iframe
            title="product-details-video"
            key="product-details-video"
            width="498"
            height="280"
            src={embedlink}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      )}

      <h4 className="page__blurb mt-1 fw-bolder">{productDetails.needheadline}</h4>
      <div className="page__paragraph">
        {productDetails?.description?.replace(/<\/?[^>]+(>|$)/g, '')}
      </div>

      {productDetails?.productImages &&
        productDetails?.productImages.length > 0 &&
        productDetails?.productImages.filter((e) => e.type === 'galleryImage').length > 0 && (
          <div className="mt-5">
            <ProjectGallery
              className="mb-3"
              title={true}
              tagTitle="Products"
              images={productDetails?.productImages}
            />
          </div>
        )}

      <div className="d-flex flex-column project__calculate">
        {isFinish || (productDetails.isFulfiled && !productDetails.unlimited) ? (
          <></>
        ) : (
          <>
            <div className="sub__total mt-2">
              <div className="text-dark fw-bold me-2">Subtotal:</div>
              <div className="price fs-4 fw-bold text-success">
                {currencySymbol}
                {priceFormat(Number(price * quantity))}
              </div>
            </div>
            <div className="d-flex align-items-center fs-5 py-1 mb-3">
              <div className="project__count d-flex align-items-center justify-content-center mt-3p">
                1
              </div>
              <div className="flex-grow-1 mx-2">
                <Slider
                  handleStyle={{
                    width: '26px',
                    height: '26px',
                    border: 'none',
                    background: '#3596F3',
                    marginTop: '-10px',
                    opacity: '1'
                  }}
                  min={1}
                  max={maxQuentity}
                  railStyle={{ backgroundColor: '#C7E3FB', height: '9px' }}
                  onChange={(e) => setQuantity(e)}
                />
              </div>
              <div className="project__count d-flex align-items-center justify-content-center mt-3p">
                {maxQuentity}
              </div>
            </div>
          </>
        )}

        {/* <Button size="lg" className="w-100">
            <span className="fw-bold">Add to cart ( {quantity} )</span>
          </Button> */}

        {/* {productDetails.quantity !== productDetails.soldout && cart_btn} */}
        {!CampaignAdminAuthToken && btn}
      </div>

      {!isFinish && (
        <div className="product__badge mt-5 text-light">
          {productDetails.postTag && (
            <IconText
              className="pt-12p pb-12p"
              icon={
                <FontAwesomeIcon icon={solid('tag')} className="fs-3 text-info pt-12p pb-12p" />
              }
            >
              Item was already purchased by the organization. Your purchase will cover those costs.
            </IconText>
          )}
          {productDetails.unlimited && (
            <IconText
              className="pt-12p pb-12p"
              icon={
                <FontAwesomeIcon
                  icon={solid('infinity')}
                  className="fs-3 text-info pt-12p pb-12p"
                />
              }
            >
              Item is ongoing - there is no fixed quantity.
            </IconText>
          )}

          {productDetails.tax && (
            <IconText
              className="pt-12p pb-12p"
              icon={<FontAwesomeIcon icon={solid('calculator')} className="fs-3 text-info" />}
            >
              These items are tax deductible.
            </IconText>
          )}
          {productDetails.media && (
            <IconText
              className="pt-12p pb-12p"
              icon={<FontAwesomeIcon icon={solid('image')} className="fs-3 text-info" />}
            >
              The organization has indicated that they will upload Media from their purchase.
            </IconText>
          )}
          {allStateAds?.length > 0 && (
            allStateAds.filter(ad => ad.categoryId === productDetails?.categoryDetails?._id && ad.countryId === productDetails?.campaignDetails?.country_id && ad.stateId === productDetails?.campaignDetails?.state_id).map((ad, i) => {
              return (
                  <IconText
                    className="pt-12p pb-12p"
                    icon={
                      // <FontAwesomeIcon icon="fa-solid fa-rectangle-ad" />
                      <FontAwesomeIcon icon={solid('rectangle-ad')} className="fs-3 text-info" />
                    }
                    key={ad._id}
                  >
                  <a href={ad.advertisementsDetails[0]?.website} target="_blank" rel="noreferrer" key={i}>
                    <img
                      src={helper.sponsorLogoResizePath + ad.advertisementsDetails[0]?.logo}
                      alt="sponsor"
                      className="p-1"
                    ></img>
                  </a>
                  </IconText>
                );
              })
          )}
        </div>
      )}

      {isFinish || (productDetails.isFulfiled && !productDetails.unlimited) ? (
        <div className="note note-info d-flex align-items-center mt-3">
          <span className="post__badge post__badge--sold me-2 text-primary fs-3">
            <FontAwesomeIcon icon={solid('circle-check')} />
          </span>
          <span className="fs-6 text-subtext">This item has been fully funded.</span>
        </div>
      ) : (
        <></>
      )}

      {productDetails.isFulfiled ? (
        <>
          {/* <div className="note note-info d-flex align-items-center mt-5">
              <span className="post__badge post__badge--sold me-2 text-primary fs-3">
                <FontAwesomeIcon icon={solid("circle-check")} />
              </span>
              <span className="fs-6 text-subtext">
                This item has been fully funded.
              </span>
            </div> */}

          {productDetails.isFulfiled && productDetails.fulfiledproductsDetails.video && (
            <>
              <div className="note note-info align-items-center mt-5">
                <Card.Header className="post__accordion-header pb-2 pt-2">
                  <span className="fs-3 fw-bolder text-dark">Followup</span>
                  <div className="project__detail-subtitle mb-12p fw-bold">Media</div>
                </Card.Header>

                <div className="project-video-wrap mb-1">
                  <iframe
                    title="product-details-video"
                    key="product-details-video"
                    width="498"
                    height="280"
                    src={embedlink}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>

                <div className="gallery__container my-2">
                  {productDetails?.productImages &&
                    productDetails?.productImages.length > 0 &&
                    productDetails?.productImages.map((img, i) => {
                      if (img.type === 'fulfillImage') {
                        return (
                          <GalleryImg
                            key={i}
                            thumbImgSrc={helper.CampaignProductFullImagePath + img.image}
                            bigImgSrc={helper.CampaignProductFullImagePath + img.image}
                          />
                        );
                      }
                    })}
                </div>
              </div>
            </>
          )}
        </>
      ) : (
        <></>
      )}

      {/* <div className="gallery__container my-2">
        {productDetails?.productImages &&
          productDetails?.productImages.length > 0 &&
          productDetails?.productImages.map((img, i) => {
            if (img.type === 'fulfillImage') {
              return (
                <GalleryImg
                  key={i}
                  thumbImgSrc={helper.CampaignProductFullImagePath + img.image}
                  bigImgSrc={helper.CampaignProductFullImagePath + img.image}
                />
              );
            }
          })}
      </div> */}
    </div>
  );
}

export default ProjectDetailMain;
