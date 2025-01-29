import { useState, useEffect, useCallback } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import ListItemImg from '../../atoms/list-item-img';
import receipt from '../../../../../assets/images/receipt.svg';
import ShareWidget from '../share-widget';
import ItemsTable from '../items-table';
import { useOutletContext, Link } from 'react-router-dom';
import userApi from '../../../../../Api/frontEnd/user';
//import FrontLoader from '../../../../../Common/FrontLoader';
import moment from 'moment';
import helper, {
  priceFormat,
  download,
  getCardIcon,
  convertAddress
} from '../../../../../Common/Helper';
import { GalleryImg } from '../../atoms';
import { Button, Card, Col, Row, Dropdown, ProgressBar, Modal } from 'react-bootstrap';
import './style.scss';
import { PLATFORM_COST } from '../../../../../constants/constants';

const VALID_IMAGE_EXTENSIONS = ['jpeg', 'jpg', 'png', 'svg'];
const isReceiptValidImageExtension = (filename) =>
  VALID_IMAGE_EXTENSIONS.includes(filename.split('.')[1]);

const UserItems = () => {
  console.log('UserItems rerender');
  const [detail, setDetail] = useState({
    key: null,
    show: false
  });
  const userAuthToken = localStorage.getItem('userAuthToken');
  const [loading, setLoading] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [data] = useOutletContext();
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecord, setTotalRecord] = useState(0);
  const [sortField, setSortField] = useState('created_at');
  const [order, setOrder] = useState('asc');
  const [orderItemList, setOrderItemList] = useState([]);
  const [totalPriceArray, setTotalPriceArray] = useState([]);
  const [isFetching, setIsFetching] = useState(true);

  const getOrderItemList = useCallback(
    async (page, field, type) => {
      setIsFetching(true);
      setLoading(false);
      let formData = {};
      formData.organizationId = data._id;
      formData.pageNo = page;
      formData.sortField = field;
      formData.sortType = type;
      formData.filter = true;

      const getOrderItem = await userApi.userOrderItemslist(userAuthToken, formData);
      console.log({ getOrderItem }); // Add this line to log the entire object
      if (getOrderItem.data.success === true) {
        setOrderItemList(getOrderItem.data.data);
        setTotalPages(getOrderItem.data.totalPages);
        setTotalRecord(getOrderItem.data.totalRecord);
        // setTotalPriceArray(getOrderItem.data.totalPriceArray)
        // console.log(getOrderItem.data.totalPriceArray)
        // if (getOrderItem.data.data.length > 0) {
        //   let tempPriceArray = []
        //   getOrderItem.data.data.map((item, i) => {
        //     let purchasedPrice = (Math.round(calculatedPrice.priceWithTax(Number(item.productPrice))))
        //     tempPriceArray.push(purchasedPrice)
        //   })
        //   let sum = tempPriceArray.reduce(function (a, b) { return a + b; }, 0);
        setTotalPriceArray(Object.entries(getOrderItem.data.totalPurchase));
        console.log({ totalPurchase: getOrderItem.data.totalPurchase });
        // setTotalPurchase(priceFormat(Math.round(calculatedPrice.priceWithTax(Number(getOrderItem.data.totalPurchase)))))
        // }
      }
      setLoading(false);
      setIsFetching(false);
      setInitialLoading(false);
    },
    [data._id, userAuthToken]
  );

  useEffect(() => {
    getOrderItemList(pageNo, sortField, order);
  }, [data._id, getOrderItemList, order, pageNo, sortField]);

  const handleClick = async (e, v) => {
    setPageNo(Number(v));
    await getOrderItemList(Number(v), sortField, order);
  };

  const handleSortingChange = async (accessor) => {
    const sortOrder = accessor === sortField && order === 'asc' ? 'desc' : 'asc';
    setSortField(accessor);
    setOrder(sortOrder);
    await getOrderItemList(pageNo, accessor, sortOrder);
  };

  const onItemClick = (key) => {
    console.log('showing item:', { key, orderItem: orderItemList[key] });
    setDetail({ ...detail, key: key, show: true });
  };

  const [initialLoading, setInitialLoading] = useState(true);

  return (
    <>
      {!initialLoading && data.city_id == null && data.country_id == null && data.street == null && (
        <div className="onboarding d-flex flex-column mw-100 p-2 p-sm-5 border rounded-3 gap-2">
          <h3>Getting Started</h3>
          <span className="fs-5">Follow these steps to complete your account setup.</span>
          <div className="flex-wrap flex-lg-nowrap d-flex gap-2 mw-100">
            <div className=" rounded-3 d-flex flex-grow-1 border p-5">
              <div className="d-flex flex-column justify-content-start align-items-start gap-2">
                <div className="d-flex align-items-center">
                  <FontAwesomeIcon
                    icon={solid('user')}
                    className="text-primary onboarding__icon me-2"
                  />

                  <div>
                    <h4 className="m-0">BUILD PROFILE</h4>
                  </div>
                </div>
                <p className="mt-3 fs-5">
                  Add your profile picture and set your address. Charities use your address when
                  issuing tax receipts and it will not be shared with anyone other than Charities
                  you donate to.
                </p>
                <Link
                  variant="link"
                  to={'/user/' + data.name + '/settings/profile'}
                  className="text-light p-0 fw-normal fs-5"
                >
                  <FontAwesomeIcon icon={regular('square-up-right')} className="me-1" />
                  Go to Settings
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      {!detail.show ? (
        <UserItemsTableView
          totalRecord={totalRecord}
          totalPriceArray={totalPriceArray}
          onItemClick={onItemClick}
          handleClick={handleClick}
          isFetching={isFetching}
          totalPages={totalPages}
          pageNo={pageNo}
          handleSortingChange={handleSortingChange}
          order={order}
          sortField={sortField}
          orderItemList={orderItemList}
        />
      ) : (
        <UserItemsDetailView
          item={orderItemList[detail.key]}
          detail={detail}
          setDetail={setDetail}
          showReceipt={showReceipt}
          setShowReceipt={setShowReceipt}
        />
      )}
    </>
  );
};

export default UserItems;

const UserItemsTableView = ({
  totalRecord,
  totalPriceArray, // arr
  onItemClick, // fn
  handleClick, // fn
  totalPages, // num/state
  pageNo, // num/state
  handleSortingChange, // fn
  order,
  sortField,
  orderItemList,
  isFetching
}) => {
  console.log('UserItemsTableView rerender');
  return (
    <>
      <header className=" w-100 d-none d-sm-flex align-items-start">
        <div className="me-sm-2 flex-grow-1">
          <div className="d-flex align-items-center">
            {' '}
            <h4 className="d-none d-sm-flex page__title mb-0 fw-bolder me-2">Items</h4>{' '}
            <span className="d-none d-sm-flex ml-2">({totalRecord})</span>
          </div>
          <p className="d-sm-block">
            Check in on the items you donated to. Click on the title of the item to view the post
            details and see follow-up media and view sales and tax receipt file uploads.
          </p>
          <div className="d-flex flex-wrap gap-2 fw-semibold mt-5 pt-sm-0">
            <span>
              {/* <img alt="" className="me-1" style={{ height: '21px' }} src={clock}></img> */}
              <FontAwesomeIcon icon={solid('infinity')} className="fs-5 me-1 text-secondary" />
              These items have no fixed quantity
            </span>
          </div>
        </div>
        {totalPriceArray.length > 0 &&
          totalPriceArray.map((val, index) => {
            return (
              <span className="d-none d-sm-flex item__total-wrap d-flex ms-3" key={index}>
                <FontAwesomeIcon icon={solid('square-dollar')} className=" mr-12p fs-4" />
                <span>$</span>
                {val[1].toLocaleString('en-US', {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2
                })}
              </span>
            );
          })}

        {/* <div className="ms-sm-auto">
              <LadderMenuItems />
            </div> */}
      </header>

      <ItemsTable
        onItemClick={onItemClick}
        handleClick={handleClick}
        totalPages={totalPages}
        totalRecord={totalRecord}
        isFetching={isFetching}
        pageNo={pageNo}
        handleSortingChange={handleSortingChange}
        order={order}
        sortField={sortField}
        orderItemList={orderItemList}
      />
    </>
  );
};

const UserItemsDetailView = ({ item, detail, setDetail, setShowReceipt, showReceipt }) => {
  console.log({ item, itemDetails: item.itemDetails, fulfilDetails: item.fulfilDetails });
  // item = detail
  let videoid = item.itemDetails.galleryUrl
    ? item.itemDetails.galleryUrl.split('?v=')[1].split('&')[0]
    : '';

  let embedlink = videoid ? 'https://www.youtube.com/embed/' + videoid : '';

  let address = item.itemDetails?.address ? convertAddress(item.itemDetails?.address) : '';
  // console.log(item.appliedTaxPer)
  // let price = Math.round(Number(item.productPrice) + (Number(item.appliedTaxPer) / 100) * Number(item.productPrice))
  // let price = priceFormat(Math.round(calculatedPrice.priceWithTax(Number(item.itemDetails.price))))

  let price = item?.itemDetails?.displayPrice
    ? Number(item.itemDetails.displayPrice).toFixed(2)
    : Number(item.itemDetails.price).toFixed(2);

  // let purchasedPrice = (Math.round(purchasedPriceWithTax(Number(item.productPrice), item.appliedTaxPer)))
  let listPrice = item.productPrice;
  let purchasedPrice = item.productPrice * (1 + PLATFORM_COST.PERCENT);
  let transactionFee = item.productPrice * PLATFORM_COST.PERCENT;

  let cardType = JSON.parse(item?.paymentResponse)?.data?.payment_method_details?.card?.brand;
  let lastFourDigits = JSON.parse(item.paymentResponse).data?.payment_method_details?.card?.last4;
  // console.log(purchasedPrice)

  let donorportSearchParams = btoa(JSON.stringify({amount: priceFormat(Number(purchasedPrice) * Number(item.quantity)).toString()}));

  return (
    <div className={detail.show ? '' : 'd-none'}>
      <div className="d-flex align-items-center flex-grow-1 border-bottom pb-20p">
        <Button
          variant="link"
          className="p-0 me-sm-2 me-1"
          onClick={() => setDetail({ ...detail, show: false })}
        >
          <FontAwesomeIcon icon={solid('angle-left')} className="text-subtext fs-3" />
        </Button>
        <div className="d-flex align-items-center  me-sm-3 flex-grow-1">
          <div className="item__image-wrap">
            <img
              alt=""
              height="56"
              className="img-fluid"
              src={helper.CampaignProductImagePath + item.itemDetails?.image}
            />
          </div>
          <div className="ms-3">
            <h2 className="fw-bolder mb-3p">{item.itemDetails?.headline}</h2>
            <div className="fs-6 text-light">{item.itemDetails?.brand}</div>
          </div>
          {item.itemDetails?.tax && (
            <span className="d-none d-sm-flex align-items-center gap-1 ms-auto note note--tax">
              {/* <img alt="" src={receipt}></img> */}
              <FontAwesomeIcon icon={solid('clock')} className="text-warning" />
              tax receipt
            </span>
          )}
        </div>

        <div className="d-none d-sm-flex align-items-center">
          <div className="d-flex align-items-center me-2">
            <div className="d-flex align-items-center progress__wrap me-2">
              {!item.itemDetails?.unlimited && (
                <span className="qty__tag pl-9p pb-3p pr-9p pt-3p me-1 fw-semibold">
                  {item.itemDetails?.soldout}/{item.itemDetails?.quantity}
                </span>
              )}
              {!item.itemDetails?.unlimited ? (
                <ProgressBar
                  variant="success"
                  style={{ width: '100px' }}
                  now={Math.round((item.itemDetails?.soldout / item.itemDetails?.quantity) * 100)}
                  className="flex-grow-1"
                />
              ) : (
                <div className="unlimited unlimited--home" style={{ marginLeft: '10px' }}>
                  <div className="tag tag--ongoing _2">
                    <div className="d-flex icon icon--unlimited">
                      <FontAwesomeIcon className="text-secondary" icon={solid('infinity')} />
                    </div>
                  </div>
                </div>
              )}
              {!item.itemDetails?.unlimited && (
                <span className="ms-1 fw-semibold">
                  {Math.round((item.itemDetails?.soldout / item.itemDetails?.quantity) * 100)}%
                </span>
              )}
            </div>

            <div className="d-flex gap-2">
              {' '}
              {item.itemDetails?.postTag && (
                <span
                  className="d-flex text-infinity product__type product__type-tax icon icon__solid-900"
                  style={{ fontSize: 'x-large' }}
                >
                  <FontAwesomeIcon icon={solid('clock-rotate-left')} />
                </span>
              )}
            </div>
          </div>
        </div>

        <ListItemImg
          size={56}
          imgSrc={helper.CampaignAdminLogoPath + item.itemDetails?.organizationDetails?.logo}
          className="charity_avatar_bg"
        />
      </div>

      <div className="d-sm-none pt-20p pb-20p">
        <div className="d-flex align-items-center">
          <span className="qty__tag pl-9p pb-3p pr-9p pt-3p me-1 fw-semibold ms-3 ms-sm-0">
            {item.itemDetails?.soldout}/
            {item.itemDetails?.unlimited ? '∞' : item.itemDetails?.quantity}
          </span>
          <ProgressBar
            variant={!item.itemDetails?.unlimited ? 'success' : 'infinity'}
            now={
              !item.itemDetails?.unlimited
                ? Math.round((item.itemDetails?.soldout / item.itemDetails?.quantity) * 100)
                : 100
            }
            className="flex-grow-1"
          />
          {!item.itemDetails?.unlimited ? (
            <span className="ms-1 fw-semibold">
              {Math.round((item.itemDetails?.soldout / item.itemDetails?.quantity) * 100)}%
            </span>
          ) : (
            <div className="unlimited unlimited--home" style={{ marginLeft: '10px' }}>
              <div className="tag tag--ongoing _2">
                <div className="d-flex icon icon--unlimited">
                  <FontAwesomeIcon className="text-secondary" icon={solid('infinity')} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <Row className="pt-sm-5 pt-0 row">
        <Col md="6">
          <div className="d-flex flex-column project__detail-main me-sm-3 gap-1">
            <div className="mb-3">
              <h4 className="project__detail-label mb-3p">Item</h4>
              <h1 className="project__detail-title">{item.itemDetails?.headline}</h1>
              <h5 className="project__detail-sublabel mb-2">Product</h5>
              <div className="project__detail-subtitle fw-bold">{item.itemDetails?.brand} ™</div>
              <div className="project__detail-price fs-2 price">
                {item.currencySymbol}
                {price}
              </div>
            </div>

            <div className="project__detail-meta d-flex align-items-center gap-2 flex-wrap text-light">
              <div className="d-flex align-items-center text-nowrap">
                <FontAwesomeIcon icon={regular('clock')} className="me-1" />
                {moment(item.itemDetails?.created_at).format('MMMM DD, YYYY')}
              </div>
              <div className="d-flex align-items-center text-nowrap">
                <FontAwesomeIcon icon={regular('circle-location-arrow')} className="me-1" />
                {address}
              </div>
            </div>
            <div className="d-flex flex-column gap-2">
              <p className="page__paragraph">{item.itemDetails?.descriptions}</p>
              <a
                href={helper.websitePath + '/item/' + item.itemDetails?.slug}
                className="d-flex align-items-center text-subtext"
              >
                <span className="url__icon me-1">
                  <FontAwesomeIcon icon={regular('square-up-right')} />
                </span>
                <p className="text-break lh-1.5">
                  {helper.websitePath + '/item/' + item.itemDetails?.slug}
                </p>
              </a>
              {item.itemDetails.galleryUrl && (
                <>
                  <div className="project-video-wrap">
                    <iframe
                      title="organization-promo-video"
                      key="organization-promo-video"
                      width="498"
                      height="280"
                      src={embedlink}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </>
              )}

              <div>
                <h5 className="page__blurb fw-bolder">{item.itemDetails?.needheadline}</h5>
                <p className="page__paragraph">{item.itemDetails?.description}</p>
              </div>

              <div className="gallery__container">
                {item.itemDetails?.galleryImage.length > 0 &&
                  item.itemDetails?.galleryImage.map((im, ky) => {
                    if (im.type === 'galleryImage') {
                      return (
                        <GalleryImg
                          key={ky}
                          thumbImgSrc={helper.CampaignProductFullImagePath + im.image}
                          bigImgSrc={helper.CampaignProductFullImagePath + im.image}
                        />
                      );
                    }
                  })}
              </div>
              {item.itemDetails?.isFulfiled &&
                (item.fulfilDetails[0].video || item.itemDetails?.fulfil.length > 0) && (
                  <div className="note note-info align-items-center mt-5">
                    <h2 className="fs-3 fw-bolder m-0">Followup</h2>
                    <div className="project__detail-subtitle fw-bold">Media</div>

                    <div className="d-flex flex-column gap-2">
                      {' '}
                      {item.itemDetails?.isFulfiled && item.fulfilDetails[0].video && (
                        <div className="project-video-wrap">
                          <iframe
                            title="user-item-video"
                            key="user-item-video"
                            width="498"
                            height="280"
                            src={
                              'https://www.youtube.com/embed/' +
                              item.fulfilDetails[0].video.split('?v=')[1].split('&')[0]
                            }
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          ></iframe>
                        </div>
                      )}
                      <div className="gallery__container">
                        {item.itemDetails?.fulfil.length > 0 &&
                          item.itemDetails?.fulfil.map((im, index) => {
                            return (
                              <GalleryImg
                                key={index}
                                thumbImgSrc={helper.CampaignProductFullImagePath + im.image}
                                bigImgSrc={helper.CampaignProductFullImagePath + im.image}
                              />
                            );
                          })}
                      </div>
                    </div>
                  </div>
                )}

              {!item.itemDetails?.isFulfiled && (
                <div className="note note-info d-flex align-items-center">
                  <span className="post__badge post__badge--sold me-2 text-primary fs-3">
                    <FontAwesomeIcon icon={solid('photo-film')} />
                  </span>
                  <span className="fs-6 text-subtext">
                    Giveaway media appears here when the post has been fully funded.
                  </span>
                </div>
              )}
            </div>
          </div>
        </Col>
        <Col md="6" className="my-5 mt-sm-0">
          <div className="d-flex align-items-center mb-3">
            <div className="flex-grow-1 fs-5">
              <div className="fw-bolder mb-6p">Order Number</div>
              {/* <div className="text-subtext">#{item.orderId}</div> */}
              <div className="text-subtext">
                #{item.uniqueTransactionId ? item.uniqueTransactionId : item.orderId}
              </div>
            </div>
            <ShareWidget
              page="useritem"
              text={`I just donated ${item.itemDetails?.headline} on Donorport! 🎉🚀👏`}
              pageTitle={item.itemDetails?.headline}
              currUrl={`https://api.donorport.com/item/${item.itemDetails?.slug}?donorportdata=${donorportSearchParams}`}
            />
          </div>
          <div className="order__widget mb-3">
            <div className="d-flex align-items-start bg-lighter p-12p  flex-grow-1 mb-3 rounded-3">
              <div>
                <img
                  alt=""
                  width="32"
                  className="img-fluid"
                  src={helper.CampaignProductImagePath + item.itemDetails?.image}
                />
              </div>
              <div className="ms-2 flex-grow-1 fw-bolder">
                <div className="mb-3p">{item.itemDetails?.headline}</div>
                <div className="price">
                  {item.currencySymbol ? item.currencySymbol : '$'}
                  {priceFormat(listPrice)}
                </div>
              </div>
              <div className="fw-semibold">
                qty <span className="ml-3p">{item.quantity}</span>
              </div>
            </div>

            <div className="py-3 border-top border-bottom">
              <div className="d-flex align-items-center fw-bolder mb-20p">
                <span className="flex-grow-1">Subtotal:</span>
                <span className="price">
                  {item.currencySymbol ? item.currencySymbol : '$'}
                  {priceFormat(Number(listPrice) * Number(item.quantity))}
                </span>
              </div>
              <div className="d-flex align-items-center fw-semibold fs-7 text-light flex-grow-1 fw-bold mb-20p">
                <span className="flex-grow-1">Service Charge:</span>
                <span className="text-light">
                  {item.currencySymbol ? item.currencySymbol : '$'}
                  {priceFormat(Number(transactionFee) * Number(item.quantity))}
                </span>
              </div>
              <div className="d-flex align-items-center ">
                <span className="fw-bolder flex-grow-1">XP</span>
                <h6 className="text-info">{item.xp} xp</h6>
              </div>
            </div>
            <div className="d-flex align-items-center pt-3 mb-2">
              <span className="fw-bolder flex-grow-1">Total:</span>
              <h6 className="price">
                {item.currencySymbol ? item.currencySymbol : '$'}
                {priceFormat(Number(purchasedPrice) * Number(item.quantity))}
              </h6>
            </div>
            <div className="bg-lighter d-flex align-items-center p-20p rounded-3">
              <div className="order__logo mx-1 me-2">
                <img src={getCardIcon(cardType)} alt="" className="img-fluid" />
              </div>
              <div className="order__card fs-7">
                <div className="fs-6 fw-semibold">XXXX XXXX XXXX {lastFourDigits}</div>
                <div className="text-light fw-semibold">
                  <div>Transaction: {moment(item.created_at).format('MMMM DD, YYYY')}</div>
                </div>
              </div>
            </div>
            <div className="mt-3 text-light">ID: {item.orderId}</div>
          </div>

          <div className="fw-bold mb-2">Order Files</div>
          {item.fulfilDetails.length === 0 ? (
            <div className="empty_state mb-4">
              <div className="note note-info d-flex align-items-center">
                <span className="post__badge post__badge--sold me-2 text-primary fs-3">
                  <FontAwesomeIcon icon={solid('file-lines')} />
                </span>
                <span className="fs-6 text-subtext">
                  Tax & Order Receipts appear here when they are available.
                </span>
              </div>
            </div>
          ) : (
            <>
              <div className="mt-3 d-flex align-items-start">
                <div className="type__icon d-flex justify-content-center align-items-center me-1">
                  <span className="p-3 post__badge post__badge--sold fs-3">
                    <FontAwesomeIcon icon={solid('receipt')} />
                  </span>
                </div>
                <div className="ms-1">
                  <span className="fw-bold lh-1">{item.fulfilDetails[0].receipt}</span>
                  <div className="date text-light fs-7">
                    Updated &nbsp;
                    {moment(item.fulfilDetails[0].updated_at).fromNow()}
                  </div>
                </div>
                <div style={{ marginLeft: 'auto' }}>
                  <Dropdown className="d-flex ms-auto" autoClose="outside">
                    <Dropdown.Toggle variant="link" className="no-caret text-decoration-none">
                      <FontAwesomeIcon
                        icon={regular('ellipsis-vertical')}
                        className="text-light fs-3"
                      />
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {isReceiptValidImageExtension(item.fulfilDetails[0].receipt) && (
                        <Dropdown.Item
                          className="d-flex align-items-center p-2"
                          onClick={() => setShowReceipt(true)}
                        >
                          <span className="fw-bold fs-7 flex-grow-1">View</span>
                          <FontAwesomeIcon icon={solid('magnifying-glass')} className="ms-1" />
                        </Dropdown.Item>
                      )}
                      <Dropdown.Divider />
                      <Dropdown.Item
                        className="d-flex align-items-center p-2"
                        onClick={() =>
                          download(
                            helper.FulfilRecieptPath + item.fulfilDetails[0].receipt,
                            item.fulfilDetails[0].receipt
                          )
                        }
                      >
                        <span className="fw-bold fs-7 flex-grow-1">Download</span>
                        {/* <a href={helper.FulfilRecieptPath + fulfilProductDetails?.fulfilDetails?.receipt} download
                                    // variant="info"
                                    // target="_blank"
                                    className="fw-bold fs-7 flex-grow-1"
                                  >
                                    Download
                                  </a> */}
                        <FontAwesomeIcon icon={regular('download')} className="ms-1" />
                      </Dropdown.Item>
                      {/* <Dropdown.Divider /> */}
                      {/* <Dropdown.Item className="d-flex align-items-center p-2">
                              <span className="fw-bold fs-7 flex-grow-1">Delete</span>
                              <FontAwesomeIcon
                                icon={regular("trash")}
                                className="ms-1"
                              />
                            </Dropdown.Item> */}
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
              {/* {showReceipt && (
                        <div className="saleReceipt">
                          <span className="close" onClick={() => setShowReceipt(false)}>
                            &times;
                          </span>
                          <GalleryImg
                            thumbImgSrc={helper.FulfilRecieptPath + item.fulfilDetails[0].receipt}
                            bigImgSrc={helper.FulfilRecieptPath + item.fulfilDetails[0].receipt}
                          />
                        </div>
                      )} */}
              <Modal
                size="lg"
                show={showReceipt}
                onHide={() => setShowReceipt(false)}
                aria-labelledby="show-sales-receipt"
              >
                <Modal.Header>
                  <Modal.Title id="show-sales-receipt">
                    {/*
                    {item.itemDetails.headline} - #{item.orderId}
                    */}
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-center">
                  {/* <GalleryImg
                            thumbImgSrc={helper.FulfilRecieptPath + item.fulfilDetails[0].receipt}
                            bigImgSrc={helper.FulfilRecieptPath + item.fulfilDetails[0].receipt}
                          /> */}
                  <img
                    className="mw-100"
                    src={helper.FulfilRecieptPath + item.fulfilDetails[0].receipt}
                    alt="receipt"
                  />
                </Modal.Body>
              </Modal>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};
