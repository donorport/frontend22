import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import orderApi from '../../../Api/frontEnd/order';
import FrontLoader from '../../../Common/FrontLoader';
import DefaultLayout from '../Component/templates/default-layout';
import { Button } from 'react-bootstrap';
import ListItemImg from '../Component/atoms/list-item-img';
import helper, { priceFormat, getCalculatedPrice, getCardIcon } from '../../../Common/Helper';
import Page from '../../../components/Page';
import './style.scss';

const OrderConfirmPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const userAuthToken = localStorage.getItem('userAuthToken');
  const [orderDetails, setOrderDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const userData = JSON.parse(localStorage.getItem('userData'));
  let newSlug = userData?.name.split(/\s/).join('');

  const getOrderDetails = async () => {
    let data = {};
    data.orderId = params.id;
    const details = await orderApi.getOrderDetails(userAuthToken, data);
    if (details && details.data.success) {
      if (details.data.data.length > 0) {
        setOrderDetails(details.data.data[0]);
      } else {
        navigate('/');
      }
    } else {
      navigate('/');
    }
  };

  useEffect(() => {
    (async () => {
      if (params.id) {
        setLoading(true);
        await getOrderDetails();
        setLoading(false);
      } else {
        navigate('/');
      }
    })();
  }, [params.id]);
  //

  return (
    <>
      <Page title={'Order | ' + orderDetails.uniqueTransactionId}>
        <DefaultLayout>
          {/* <FrontLoader loading={loading} />*/}
          <div className="container-fluid d-flex flex-wrap">
            <div className="col-sm-6 d-flex flex-column align-items-sm-center align-items-stretch py-5 text-center">
              {/* <img
                style={{ width: '320px' }}
                src="https://i.pinimg.com/originals/7f/91/19/7f9119b483a3b4c966bdbad251f0b483.gif"
                alt=""
              />*/}
              <div class="boat-container relative mb-3">
                <div class="absolute boat">
                  <ul class="no-bullet">
                    <ul class="no-bullet fume">
                      <li class="fume4"></li>
                      <li class="fume3"></li>
                      <li class="fume2"></li>
                      <li class="fume1"></li>
                    </ul>
                    <li class="smokestack"></li>
                    <li class="white-body">
                      <ul class="windows inline-list">
                        <li class="circle"></li>
                        <li class="circle"></li>
                        <li class="circle"></li>
                      </ul>
                    </li>
                    <li class="boat-body"></li>
                  </ul>
                </div>
                <div class="w-1"></div>
                <div class="r w-1"></div>
              </div>
              <h1 className="fs-1 fw-bolder">Order Completed</h1>
              <span className="fs-3" style={{ color: '#6f6f90' }}>
                Order #{orderDetails.uniqueTransactionId}
              </span>

              <p class="col-sm-6 email__note fs-5 mt-1 text-justify text-sm-center">
                Thank you for donating through Donorport ♥<br></br>
                The organization(s) have received your donation and will purchase the items on your
                behalf. Navigate to your profile to track updates to your orders including
                tax-receipts & follow-up media.
              </p>

              <div className="d-flex align-items-center justify-content-center gap-3">
                <Link
                  to="/"
                  className="btn btn-lg fw-bold btn-primary my-2 flex-grow-sm-0 flex-grow-1"
                >
                  Back To Home
                </Link>

                <Link
                  to={'/user/' + newSlug + '/history'}
                  className="btn btn-lg fw-bold btn-info my-2 flex-grow-sm-0 flex-grow-1"
                >
                  Go to Order
                </Link>
              </div>
            </div>
            <div className="email__container">
              <div className="email__wrap">
                <div role="list" className="note email__list d-flex flex-column">
                  {orderDetails?.orderItems?.length > 0 &&
                    orderDetails?.orderItems.map((itm, i) => {
                      // console.log(itm)
                      return (
                        <div data-id="product" role="listitem" className="email__item">
                          <div className="checkout__top d-flex flex-row align-items-start flex-nowrap">
                            <div className="checkout__left d-flex flex-row align-items-start flex-nowrap">
                              <div className="checkout__thumb position-relative d-flex align-items-center justify-content-center">
                                <div className="checkout__img d-flex align-items-center justify-content-center">
                                  <ListItemImg
                                    size={76}
                                    className="avatar__checkout border"
                                    imgSrc={helper.CampaignProductImagePath + itm.itemDetails.image}
                                  />
                                </div>
                                <div className="checkout__qtytag d-flex align-items-center justify-content-center fw-bold">
                                  <div className="badge item__img-badge fw-bold fs-8">
                                    {itm.quantity}
                                  </div>
                                </div>
                              </div>
                              <div className="checkout__info d-flex flex-column flex-wrap align-items-start px-3 pt-2">
                                <Link
                                  to={'/item/' + itm.itemDetails.slug}
                                  className="checkout__title d-flex flex-row align-items-start fw-bolder"
                                >
                                  <div>{itm.itemDetails.headline}</div>
                                </Link>
                                <div className="checkout__brand">
                                  <div>{itm.itemDetails.brand}</div>
                                </div>
                                <div className="checkout__price flex-row">
                                  <h5>{itm.itemDetails.price}</h5>
                                </div>
                              </div>
                            </div>
                            <div className="flex-grow-1 checkout__right d-flex flex-row align-items-center justify-content-between flex-wrap">
                              <Link to={'/organization/' + itm?.campaignadminsDetails.slug}>
                                <ListItemImg
                                  size={46}
                                  className="ms-2 d-none d-sm-flex"
                                  imgSrc={
                                    helper.CampaignAdminLogoPath + itm.campaignadminsDetails?.logo
                                  }
                                />
                              </Link>
                              <div className="checkout__subtotal d-flex flex-row align-items-center fw-bold">
                                {/* <div className="checkout__itemvalue d-flex align-items-center">
                                  <div className="checkout__tag">
                                    <div className="tag tag--xp">
                                      <span className="checkout__xp">{itm.xp}</span>&nbsp;xp
                                    </div>
                                  </div>
                                </div>*/}
                              </div>
                              <h4 className="fw-bolder text-dark">
                                {orderDetails.currencySymbol}
                                {priceFormat(Number(itm.totalPrice))}
                              </h4>
                            </div>
                          </div>
                          {itm.tax === true && (
                            <div className="pt-2">
                              <img
                                alt=""
                                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAPCAYAAAA71pVKAAAAAXNSR0IArs4c6QAAASpJREFUOE+lUztOw0AUnDEchBrbUIAEdlLAIaj5ROIjnDQcAKeHJlnxkxBwElIQByQaYjt1DgJ+KIuMzNougC1W+3bezuzOe0sYo9lLlmWennyIK8QiBRPOMea7jJ46zlsxncWg0Y8Phbw0CfOYIkfDtnv1HecLXyVSd8jcjwJHi+rJV8k1gH0jaQqRB5DbABYM7CYKnAM2L8YrWWa9llSzbDfqLN37vfEOLOvOxC0rW6Wn0j1Cbk2Q4MswsNcbKn0WyJqJC9iir9IzQE5KymSo9wRbgNhlP3hOTyWPBDaKoACDUeBsaj/6cQjytKyMQb2ySDdqu2HdYUArV78ZZBgd2916ZbYq3S5ee3bdqqdpt+vqPCModNIPTwB81fnfHZYT/Lm3c4Lf/KpP90mRhNu+qFMAAAAASUVORK5CYII="
                              />
                              &nbsp; This item is marked as tax eligible
                              <a href="/new-organizations" className="link link--new">
                                <span className="link link--terms" />
                              </a>
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="total__container mt-3">
                <div className="total__wrapper note">
                  <div className="total__sub d-flex justify-content-between">
                    <div className="total__title fw-bold">Subtotal:</div>
                    <div className="total__value">
                      <p className="fs-4 fw-bold">
                        {' '}
                        {orderDetails.currencySymbol}
                        {/* {purchasedPriceWithTax(Number(orderDetails.subtotal), Number(orderDetails.appliedTaxPercentage))} */}
                        {/* {orderDetails.subtotal} */}
                        {priceFormat(Number(orderDetails.subtotal))}
                      </p>
                    </div>
                  </div>

                  {/*    <div
                style={{
                  textAlign: 'left',
                  display: 'inline-block',
                  width: '70%',
                  float: 'left'
                }}
              >
                <p style={{ fontSize: '14px', color: '#6f6f90' }}>
                  Stripe : ({orderDetails.salesTaxPer}%)
                </p>
              </div>*/}
                  <div className="total__sub d-flex justify-content-between">
                    <p className="total__title fw-bold">Fee:</p>
                    <p className="fs-6 fw-bold">
                      {' '}
                      {orderDetails.currencySymbol}
                      {/* {orderDetails.salesTax} */}
                      {priceFormat(Number(orderDetails.salesTax))}
                    </p>
                  </div>
                  <div className="total__sub d-flex justify-content-between">
                    <p className="total__title fw-bold">XP:</p>
                    <div className="order__xp">
                      <p>
                        <b>{orderDetails.xp} xp </b>
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="order__container d-flex align-items-center justify-content-between mt-3">
                    <div className="order__wrap">
                      <p className="total__title fs-4 fw-bolder">Total Paid:</p>
                    </div>
                    <div className="order__value text-light">
                      <p>
                        {orderDetails.currency}
                        <b className="fs-2 text-dark">
                          {' '}
                          {orderDetails.currencySymbol}
                          {orderDetails.total}
                        </b>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DefaultLayout>
      </Page>
    </>
  );
};
export default OrderConfirmPage;
