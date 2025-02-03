import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Button, ProgressBar, Card } from 'react-bootstrap';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import IconToggle from '../../atoms/icon-toggle';
import ShareWidget from '../share-widget';
import IconText from '../../molecules/icon-text';
import ProjectCrowdfundingGallery from '../project-crowdfunding-gallery';
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
import advertisementApi from '../../../../../Api/admin/advertisement';
import locationApi from '../../../../../Api/frontEnd/location';
import { setAllAds } from '../../../../../user/user.action';
import receipt from '../../../../../assets/images/receipt.svg';

function ProjectDetailMain(props) {
  let productDetails = props.productDetails;

  let videoid = productDetails.galleryUrl
    ? productDetails.galleryUrl.split('?v=')[1].split('&')[0]
    : '';
  let videoid2 = productDetails?.fulfiledproductsDetails?.video
    ? productDetails?.fulfiledproductsDetails?.video.split('?v=')[1].split('&')[0]
    : '';
  let embedlink = videoid ? 'https://www.youtube.com/embed/' + videoid : '';
  let embedlink2 = videoid2 ? 'https://www.youtube.com/embed/' + videoid2 : '';
  const getCalc = getCalculatedPrice();
  // let price = getCalc.getData(productDetails?.price)
  let price = productDetails?.displayPrice ? productDetails?.displayPrice : productDetails?.price;

  let currencySymbol = getCalc.currencySymbol();

  let per = (productDetails.soldout / productDetails.quantity) * 100;

  let address = productDetails?.address ? convertAddress(productDetails?.address) : '';

  const [quantity, setQuantity] = useState(1);
  //const [loading, setLoading] = useState(false);
  const [allStateAds, setAllStateAds] = useState();
  //const [adData, setAdData] = useState();
  const [addedToCard, setAddedToCard] = useState(false);
  const [userAddress, setUserAddress] = useState(false);
  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let maxQuantity = productDetails.unlimited
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
      // fetch all the ads and fetch the user's location
      const allStateAdsResponse = await advertisementApi.allStateAds();

      dispatch(setAllAds(allStateAdsResponse.data.data));
    })();
  }, []);

  useEffect(() => {
    setAllStateAds(user.allAds);
  }, [user.allAds]);

  useEffect(() => {
    (async () => {
      try {
        const getLocationByLatLong = await locationApi.getLocationByLatLong(user.lat, user.lng);

        if (getLocationByLatLong.data.results && getLocationByLatLong.data.results.length > 0) {
          const longformAddress = getLocationByLatLong.data.results[0].formatted_address || '';
          const addrComponents = getLocationByLatLong.data.results[0].address_components || [];

          const stateCode = longformAddress.split(', ').reverse()[1].split(' ')[0];

          const stateName = addrComponents.find((c) => c.short_name === stateCode)?.long_name || '';

          setUserAddress(stateName);
        } else {
          console.error('No results found for location.');
        }
      } catch (error) {
        console.error('Error fetching location data: ', error);
      }
    })();
  }, [productDetails]);

  const onClickFilter = (e) => {
    props.addProductToWishlist(productDetails._id);
  };
  const cart_btn = addedToCard ? (
    <Button variant="success" size="lg" className="icon icon__pro" style={{ minWidth: '250px' }}>
      Added In cart &nbsp;
      <FontAwesomeIcon icon={solid('circle-check')} />
    </Button>
  ) : (
    <Button
      variant="primary"
      size="lg"
      className="btn--addtocart"
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
    <div className="project__detail-main d-flex flex-column gap-5">
      <ItemDetailsMain
        productDetails={productDetails}
        currencySymbol={currencySymbol}
        price={price}
        address={address}
        embedlink={embedlink}
        wishListproductIds={props.wishListproductIds}
        followToProduct={props.followToProduct}
        isFollow={props.isFollow}
        onClickFilter={onClickFilter}
        per={per}
      />
      {productDetails.organizationId !== '63fe5d48448eff9f0a6412d8' &&
      productDetails.organizationId !== '63fe60f1448eff9f0a6412e6' ? (
        <div className="d-flex flex-column gap-4 project__calculate">
          {!(isFinish || (productDetails.isFulfilled && !productDetails.unlimited)) && (
            <SubtotalSlider
              currencySymbol={currencySymbol}
              price={price}
              quantity={quantity}
              maxQuantity={maxQuantity}
              setQuantity={setQuantity}
            />
          )}

          {/* <Button size="lg" className="w-100">
       <span className="fw-bold">Add to cart ( {quantity} )</span>
     </Button> */}

          {/* {productDetails.quantity !== productDetails.soldout && cart_btn} */}
          {!CampaignAdminAuthToken && btn}
        </div>
      ) : (
        <div className="d-flex note">
          <FontAwesomeIcon
            icon={solid('circle-info')}
            className="fs-4 text-primary pt-12p pb-12p me-2"
          />
          <span>This is a sample item created by Donorport and is not available for donation.</span>
        </div>
      )}

      {!isFinish && (
        <UnfinishedSection
          productDetails={productDetails}
          allStateAds={allStateAds}
          user={user}
          userAddress={userAddress}
        />
      )}

      {isFinish ||
        (productDetails.isFulfiled && !productDetails.unlimited && <FullyFundedSection />)}

      {productDetails.isFulfiled &&
        (productDetails.fulfiledproductsDetails?.video ||
          productDetails?.productImages.some((image) => image.type === 'fulfillImage')) && (
          <FollowupMediaSection productDetails={productDetails} embedlink2={embedlink2} />
        )}
    </div>
  );
}

const ItemDetailsMain = ({
  productDetails,
  currencySymbol,
  price,
  address,
  embedlink,
  wishListproductIds,
  followToProduct,
  isFollow,
  onClickFilter,
  per
}) => (
  <div className="d-flex flex-column gap-2">
    <div className="d-flex gap-4">
      {' '}
      <div className="flex-grow-1 mb-1">
        {' '}
        <h4 className="project__detail-label mb-2">Item</h4>
        <h1 className="project__detail-title " style={{ textTransform: 'capitalize' }}>
          {productDetails?.headline}
        </h1>
        <h5 className="project__detail-sublabel mt-2 fw-bolder">Product</h5>
        <div className="project__detail-subtitle fw-bold">{productDetails?.brand} ™</div>
        <h2 className="project__detail-price price m-0">
          {currencySymbol}
          {priceFormat(price)}
        </h2>
      </div>{' '}
      <Link
        to={'/organization/' + productDetails?.campaignDetails?.slug}
        className="justify-content-end page__logo page__logo--org"
      >
        <img
          alt=""
          style={{ width: 'auto', maxHeight: '90%', maxWidth: '90%' }}
          src={helper.CampaignAdminLogoPath + productDetails?.campaignDetails?.logo}
        />
      </Link>
    </div>

    <div className="project__detail-meta d-flex align-items-center gap-2 text-light flex-wrap">
      <div className="d-flex align-items-center text-nowrap">
        <FontAwesomeIcon icon={regular('clock')} className="me-1" />
        {moment(productDetails?.created_at).format('MMMM DD, YYYY')}
      </div>
      {productDetails?.address && (
        <div className="d-flex align-items-center me-2 text-nowrap">
          <FontAwesomeIcon icon={regular('circle-location-arrow')} className="me-1" />
          {address}
        </div>
      )}
    </div>

    {/* show for mobile view */}
    {/* 
        <div className="note d-none project__detail-img mb-3">
          <img
            className="img-fluid"
            alt=""
            src={helper.CampaignProductFullImagePath + productDetails?.image}
          />
        </div> */}

    <div className="product__top px-0 d-flex align-items-center">
      <div className="page__bar d-flex align-items-center flex-grow-1">
        <ProgressBar
          variant={productDetails.unlimited ? 'infinity' : 'success'}
          now={productDetails.unlimited ? 100 : per}
          className="page__progress flex-grow-1 me-1"
        />
        {productDetails.unlimited ? (
          <span className="tag tag--ongoing tag__rounded text-secondary">
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
          ischecked={wishListproductIds.includes(productDetails._id)}
          checkedIcon={<FontAwesomeIcon icon={solid('heart')} />}
          onClickFilter={onClickFilter}
        />

        <IconToggle
          icon={<FontAwesomeIcon icon={regular('bell')} />}
          checkedIcon={<FontAwesomeIcon icon={solid('bell')} />}
          onClickFilter={(e) => followToProduct(e)}
          name="Product"
          ischecked={isFollow}
        />

        {/* <ShareWidget
          page="item"
          text={`Help ${productDetails?.campaignDetails?.name} give away ${productDetails?.headline} on Donorport 🎉🎁`}
          pageTitle={productDetails?.headline}
          currUrl={`https://api.donorport.com/item/${productDetails?.slug}`}
        /> */}

        <div className="ms-auto d-flex d-sm-none align-items-center">
          <ShareWidget
            page="item"
            text={`Help ${productDetails?.campaignDetails?.name} give away ${productDetails?.headline} on Donorport 🎉🎁`}
            pageTitle={productDetails?.headline}
            currUrl={`https://api.donorport.com/item/${productDetails?.slug}`}
          />
        </div>
      </div>
    </div>

    {/* <div className="category__icons d-flex align-items-center order--1 order-sm-0 mb-0 mb-sm-2">
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
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 640 512">
            <path
              d={productDetails?.subCategoryDetails?.icon}
              fill={productDetails?.categoryDetails?.color}
            ></path>{' '}
          </svg>
        </span>{' '}
        <span className="fs-6  fw-bold ms-1" style={{ textTransform: 'capitalize' }}>
          {productDetails?.subCategoryDetails?.name}
        </span>
      </Link>
      <Link
        size="lg"
        variant="link"
        className="btn__category text-decoration-none"
        to={'/organization/' + productDetails?.campaignDetails?.slug}
      >
        <span className="d-flex align-items-center icon__category">
          <img
            alt=""
            style={{ width: 'auto', maxHeight: '90%', maxWidth: '90%' }}
            src={helper.CampaignAdminLogoPath + productDetails?.campaignDetails?.logo}
          />
        </span>
        <span className="fs-6  fw-bold ms-1" style={{ textTransform: 'capitalize' }}>
          {productDetails?.campaignDetails?.name}
        </span>
      </Link>
    </div> */}
    {embedlink && (
      <div className="project-video-wrap mb-2">
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
    {productDetails?.productImages &&
      productDetails?.productImages.length > 0 &&
      productDetails?.productImages.filter((e) => e.type === 'galleryImage').length > 0 && (
        <div>
          <ProjectCrowdfundingGallery
            title={true}
            tagTitle="Products"
            images={productDetails?.productImages}
          />
        </div>
      )}
    <div>
      <div className="note d-sm-none project__detail-img mb-3">
        <img
          className="img-fluid"
          alt=""
          src={helper.CampaignProductFullImagePath + productDetails?.image}
        />
        <div className="item__bg" style={{ backgroundColor: productDetails?.dominantColor }}></div>
      </div>
      <h4 className="page__blurb fw-bolder">{productDetails.needheadline}</h4>
      <p className="page__paragraph">
        {productDetails?.description?.replace(/<\/?[^>]+(>|$)/g, '')}
      </p>
      <div className="mt-3 d-flex flex-column align-items-start gap-1 justify-content-start">
        <p>Admininstrator:</p>
        <div className="associated-user fw-semibold align-items-center d-flex gap-1 py-2 px-2 pe-3 rounded-5">
          <FontAwesomeIcon icon={solid('user')} className="me-1" />
          <span>{productDetails?.campaignDetails?.organizationUserName}</span>
        </div>
      </div>
    </div>
  </div>
);

const SubtotalSlider = ({ currencySymbol, price, quantity, maxQuantity, setQuantity }) => (
  <>
    <div className="note d-flex">
      <div className=" fw-bold me-2">Subtotal:</div>
      <h5 className="price">
        {currencySymbol}
        {priceFormat(Number(price * quantity))}
      </h5>
    </div>
    <div className="d-flex align-items-center fs-5 py-1">
      <div className="project__count d-flex align-items-center justify-content-center mt-3p">1</div>
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
          max={maxQuantity}
          railStyle={{ height: '9px' }}
          onChange={(e) => setQuantity(e)}
        />
      </div>
      <div className="project__count d-flex align-items-center justify-content-center mt-3p">
        {maxQuantity}
      </div>
    </div>
  </>
);
const UnfinishedSection = ({ productDetails, allStateAds, user, userAddress }) => (
  <div className="product__badge fs-5">
    {productDetails.postTag && (
      <IconText
        className="pt-12p pb-12p"
        icon={
          <FontAwesomeIcon
            icon={solid('clock-rotate-left')}
            className="fs-3 text-primary pt-12p pb-12p"
          />
        }
      >
        <p>
          {' '}
          Item was already purchased by the organization. Your purchase will cover those costs.
        </p>
      </IconText>
    )}
    {productDetails.unlimited && (
      <IconText
        className="pt-12p pb-12p"
        icon={
          <FontAwesomeIcon icon={solid('infinity')} className="fs-3 text-primary pt-12p pb-12p" />
        }
      >
        <p>Item is ongoing - there is no fixed quantity.</p>
      </IconText>
    )}

    {productDetails.tax && (
      <div className="d-flex align-items-center pt-12p pb-12p">
        <div className="list__item-img list__item-img__tax me-2 p-1 border-0">
          <FontAwesomeIcon icon={solid('receipt')} className="fs-3 text-primary" />
          {/* <img alt="" src={receipt}></img>{' '} */}
        </div>
        <p>These items are tax deductible.</p>
      </div>
    )}
    {productDetails.media && (
      <IconText
        className="pt-12p pb-12p"
        icon={<FontAwesomeIcon icon={solid('image')} className="fs-3 text-primary" />}
      >
        <p> The organization has indicated that they will upload Media from their purchase.</p>
      </IconText>
    )}
    {allStateAds?.length > 0 &&
      user.stateName &&
      allStateAds
        .filter(
          (ad) =>
            ad.categoryId === productDetails?.categoryId && userAddress === ad?.stateDetails?.state
        )
        .map((ad, i) => {
          //console.log('~~ filtered ads:', {ad, i});
          return (
            <IconText
              className="pt-12p pb-12p"
              icon={
                // <FontAwesomeIcon icon="fa-solid fa-rectangle-ad" />
                <FontAwesomeIcon icon={solid('rectangle-ad')} className="fs-3 text-primary" />
              }
              key={ad._id}
            >
              <a href={ad?.advertisementsDetails?.website} target="_blank" rel="noreferrer" key={i}>
                <img
                  src={helper.sponsorLogoResizePath + ad?.advertisementsDetails?.logo}
                  alt="sponsor"
                  className="p-1"
                  style={{ maxHeight: '75px' }}
                ></img>
              </a>
            </IconText>
          );
        })}
  </div>
);

const FullyFundedSection = () => (
  <div className="note note-info d-flex align-items-center mt-3">
    <span className="post__badge post__badge--sold me-2 text-primary fs-3">
      <FontAwesomeIcon icon={solid('circle-check')} />
    </span>
    <span className="fs-6 text-subtext">This item has been fully funded.</span>
  </div>
);

const FollowupMediaSection = ({ productDetails, embedlink2 }) => (
  <>
    <div className="note note-info align-items-center mt-5">
      <h2 className="fs-3 fw-bolder m-0">Followup</h2>
      <div className="project__detail-subtitle fw-bold">Media</div>

      <div className="d-flex flex-column gap-2">
        {productDetails.fulfiledproductsDetails?.video && (
          <FollowupVideoSection embedlink2={embedlink2} />
        )}

        <div className="gallery__container">
          {productDetails?.productImages?.length > 0 && (
            <FollowupImagesSection images={productDetails.productImages} />
          )}
        </div>
      </div>
    </div>
  </>
);

const FollowupVideoSection = ({ embedlink2 }) => (
  <div className="project-video-wrap">
    <iframe
      title="product-details-video"
      key="product-details-video"
      width="498"
      height="280"
      src={embedlink2}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>
  </div>
);

const FollowupImagesSection = ({ images }) =>
  images.map((img, i) => {
    if (img.type === 'fulfillImage') {
      return (
        <GalleryImg
          key={i}
          thumbImgSrc={helper.CampaignProductFullImagePath + img.image}
          bigImgSrc={helper.CampaignProductFullImagePath + img.image}
        />
      );
    }
  });

export default ProjectDetailMain;
