import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation} from 'react-router-dom';
import helper, { priceFormat, getCardIcon } from '../../../Common/Helper';
import DefaultLayout from '../Component/templates/default-layout';
import ListItemImg from '../Component/atoms/list-item-img';
import organizationApi from '../../../Api/frontEnd/organization';
import Page from '../../../components/Page';
import ShareWidget from '../Component/organisms/share-widget';
import './style.scss';
import moment from 'moment';
import Seo from '../../../components/SEO';

const DonationConfirmPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const userAuthToken = localStorage.getItem('userAuthToken');
  const [doantionDetails, setDonationDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const userData = JSON.parse(localStorage.getItem('userData'));
  let newSlug = userData?.name.split(/\s/).join('');

  const getDonationDetails = async () => {
    let data = {};
    data.donationId = params.id;
    const details = await organizationApi.getDonationDetails(userAuthToken, data);
    if (details && details.data.success) {
      if (details.data.data.length > 0) {
        setDonationDetails(details.data.data[0]);
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
        await getDonationDetails();
        setLoading(false);
      } else {
        navigate('/');
      }
    })();
  }, [params.id]);

  let cardType = JSON.parse(doantionDetails?.paymentResponse || '{}')?.payment_method_details?.card
    ?.brand;
  let lastFourDigits = JSON.parse(doantionDetails?.paymentResponse || '{}')?.payment_method_details
    ?.card?.last4;

  let subtotal = Number((doantionDetails.amount - 0.3) / 1.0499).toFixed(2);
  let platformCost = subtotal * 0.0499 + 0.3;

  return (
    <>
      <Seo title="Donation" description={`I just Donated $${doantionDetails?.amount} to the ${doantionDetails?.CampaignAdminDetails?.name} Charity`} url={`https://www.donorport.com/donate/${doantionDetails?._id}`} />
      <Page showTags={false} title={'Donation | ' + doantionDetails.uniqueTransactionId}>
        <DefaultLayout>
          <div className="container-fluid d-flex flex-wrap gap-2">
            <div className="flex__1 d-flex flex-column align-items-sm-center align-items-stretch py-5 text-center pb-0 pb-sm-5">
              <div className="boat-container relative mb-3">
                <div className="absolute boat">
                  <ul className="no-bullet">
                    <ul className="no-bullet fume">
                      <li className="fume4"></li>
                      <li className="fume3"></li>
                      <li className="fume2"></li>
                      <li className="fume1"></li>
                    </ul>
                    <li className="smokestack"></li>
                    <li className="white-body">
                      <ul className="windows inline-list">
                        <li className="circle"></li>
                        <li className="circle"></li>
                        <li className="circle"></li>
                      </ul>
                    </li>
                    <li className="boat-body"></li>
                  </ul>
                </div>
                <div className="w-1"></div>
                <div className="r w-1"></div>
              </div>
              <h1 className="fs-1 fw-bolder">Donation Completed</h1>
              <span className="fs-3">Order #{doantionDetails?.uniqueTransactionId}</span>

              <p className="col-sm-6 email__note fs-5 mt-1 text-justify text-sm-center">
                Thank you for choosing Donorport ♥<br></br>
                <br></br>
                The organization has received your donation for{' '}
                {doantionDetails.type === 'PROJECT'
                  ? 'the project: ' + doantionDetails?.projectDetails?.name
                  : doantionDetails?.CampaignAdminDetails?.name}
                . {doantionDetails?.CampaignAdminDetails?.name} is hard at work making sure your
                donation helps others.
              </p>

              <div className="d-flex align-items-center justify-content-center gap-3">
                <Link
                  to="/"
                  className="btn btn-lg fw-bold btn-primary my-2 flex-grow-sm-0 flex-grow-1"
                >
                  Back To Home
                </Link>
                {doantionDetails.type === 'PROJECT' ? (
                  <Link
                    to={'/project/' + doantionDetails?.projectDetails?.slug}
                    className="btn btn-lg fw-bold btn-info my-2 flex-grow-sm-0 flex-grow-1"
                  >
                    Go to Project
                  </Link>
                ) : (
                  <Link
                    to={'/user/' + newSlug + '/items'}
                    className="btn btn-lg fw-bold btn-info my-2 flex-grow-sm-0 flex-grow-1"
                  >
                    Go to Profile
                  </Link>
                )}
              </div>
            </div>
            <div className="mx-3 border-end"></div>
            <div className="d-flex col-md-6 col-8 email__container my-5 p-3">
              <div className="col-8 d-flex flex-column">
                <div className="order__container d-flex align-items-center justify-content-between m-3 mx-0 border-bottom">
                  <div className="order__wrap">
                    <p className="total__title fs-2 fw-bolder">Donation Details</p>
                  </div>
                  <div className="order__value text-light">
                    {/* <ShareWidget page="donation" text={`I just Donated $${subtotal} to the ${doantionDetails?.CampaignAdminDetails?.name} Charity`} pageTitle="Donation" currUrl={`https://www.donorport.com/donate/${doantionDetails?._id}`}/> */}
                    {doantionDetails.type === 'PROJECT' ? (
                      <ShareWidget
                        page="donation"
                        text={`I just Donated $${subtotal} to ${doantionDetails?.CampaignAdminDetails?.name} for their project ${doantionDetails?.projectDetails?.name} 🎉🚀👏`}
                        pageTitle="Donation"
                        currUrl={`https://www.donorport.com/project/${doantionDetails?.projectDetails?.slug}`}
                      />
                    ) : (
                      <ShareWidget
                        page="donation"
                        text={`I just Donated $${subtotal} to ${doantionDetails?.CampaignAdminDetails?.name} 🎉👏`}
                        pageTitle="Donation"
                        currUrl={`https://www.donorport.com/organization/${doantionDetails?.CampaignAdminDetails?.slug}`}
                      />
                    )}
                  </div>
                </div>
                <div className="total__container">
                  <div role="list" className="d-flex flex-column gap-5 my-5">
                    <div data-id="product" role="listitem" className="pb-3 border-bottom">
                      <div className="checkout__top d-flex align-items-center flex-row flex-nowrap">
                        <div className="checkout__left d-flex flex-row align-items-center">
                          <div className="checkout__thumb position-relative d-flex align-items-center justify-content-center">
                            <div className="checkout__img d-flex justify-content-center align-items-center">
                              <div className="checkout__img d-flex align-items-center justify-content-center">
                                <ListItemImg
                                  size={76}
                                  className="avatar__checkout border"
                                  imgSrc={
                                    helper.CampaignAdminLogoPath +
                                    doantionDetails?.CampaignAdminDetails?.logo
                                  }
                                />
                              </div>
                            </div>
                          </div>
                          <div className="checkout__info d-flex flex-column flex-wrap align-items-start px-3">
                            {doantionDetails.type === 'PROJECT' ? (
                              <Link
                                to={'/project/' + doantionDetails?.projectDetails?.slug}
                                className="checkout__title d-flex flex-row align-items-start fw-bolder"
                              >
                                {doantionDetails?.projectDetails?.name}
                              </Link>
                            ) : (
                              <Link
                                to={'/organization/' + doantionDetails?.CampaignAdminDetails?.slug}
                                className="checkout__title d-flex flex-row align-items-start fw-bolder"
                              >
                                {doantionDetails?.CampaignAdminDetails?.name}
                              </Link>
                            )}

                            {/* <div>
                            {doantionDetails.type === 'PROJECT'
                              ? doantionDetails?.projectDetails?.name
                              : doantionDetails?.CampaignAdminDetails?.name}
                          </div>*/}
                            {doantionDetails.type === 'PROJECT' ? (
                              <Link
                                to={'/organization/' + doantionDetails?.CampaignAdminDetails?.slug}
                                className="checkout__brand link text-light"
                              >
                                <div>{doantionDetails?.CampaignAdminDetails?.name}</div>
                              </Link>
                            ) : (
                              <div className="checkout__brand text-decoration-none text-light">
                                Cash Donation
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="checkout__right d-flex flex-row align-items-center justify-content-end flex-wrap">
                          <div className="checkout__subtotal d-flex flex-row align-items-center fw-bold">
                            <div className="checkout__itemvalue d-flec align-items-center">
                              <div className="checkout__tag d-flex justify-content-center"></div>
                            </div>
                          </div>
                          <h4 className="order__itemtotal text-light fs-5 fw-bold">
                            {doantionDetails?.currencySymbol}
                            {subtotal}
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="total__sub d-flex justify-content-between">
                      <div className="total__title fw-bolder">Subtotal:</div>
                      <div className="total__value text-light">
                        <p className="fw-bold text-light fs-5">
                          {' '}
                          {doantionDetails.currencySymbol}
                          {/* {purchasedPriceWithTax(Number(orderDetails.subtotal), Number(orderDetails.appliedTaxPercentage))} */}
                          {/* {orderDetails.subtotal} */}
                          {priceFormat(Number(subtotal))}
                        </p>
                      </div>
                    </div>
                    <div className="total__sub d-flex justify-content-between">
                      <Link to="/pricing" className="fw-semibold fs-7 text-light flex__1">
                        Service Charge:
                      </Link>
                      <div className="total__value">
                        <p className="fw-semibold text-light fs-7">
                          {' '}
                          {doantionDetails.currencySymbol}
                          {/* {purchasedPriceWithTax(Number(orderDetails.subtotal), Number(orderDetails.appliedTaxPercentage))} */}
                          {/* {orderDetails.subtotal} */}
                          {priceFormat(Number(platformCost))}
                        </p>
                      </div>
                    </div>
                    <div className="total__sub d-flex justify-content-between mt-3">
                      <p className="total__title fw-bolder">XP:</p>
                      <div className="order__xp text-info fw-bold">{location?.state?.xpToAdd} xp</div>
                    </div>

                    {/* <div className="total__sub d-flex justify-content-between">
                    <p className="total__title fw-bold">XP:</p>
                    <div className="order__xp text-info">
                      <p>
                        <b>{doantionDetails.xp} XP</b>
                      </p>
                    </div>
                          </div>*/}
                  </div>
                  <div className="bg-lighter d-flex align-items-center p-20p rounded-3">
                    <div className="order__logo me-2">
                      <img src={getCardIcon(cardType)} alt="" className="img-fluid" />
                    </div>
                    <div className="order__card fs-7">
                      <div className="text-dark fw-semibold mb-6p">
                        XXXX XXXX XXXX {lastFourDigits}
                      </div>
                      <div className="text-light fw-semibold">
                        <div>
                          Transaction: {moment(doantionDetails.created_at).format('MMMM DD, YYYY')}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="total__box">
                    <div className="order__container d-flex align-items-center justify-content-between mt-3 border-top pt-3">
                      <div className="order__wrap">
                        <span className="total__title fs-4 fw-bolder">Total Paid:</span>
                      </div>
                      <div className="order__value text-light d-flex align-items-center">
                        {doantionDetails.currency}
                        <span className="fs-4 fw-bold text-light ms-1">
                          {' '}
                          {doantionDetails?.currencySymbol}
                          {(Number(doantionDetails.amount))}
                        </span>
                      </div>
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
export default DonationConfirmPage;
