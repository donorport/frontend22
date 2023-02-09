import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import helper, { priceFormat, getCardIcon } from '../../../Common/Helper';
import DefaultLayout from '../Component/templates/default-layout';
import ListItemImg from '../Component/atoms/list-item-img';
import organizationApi from '../../../Api/frontEnd/organization';
import Page from '../../../components/Page';
import ShareWidget from '../Component/organisms/share-widget';
import './style.scss';
import moment from 'moment';

const DonationConfirmPage = () => {
  const params = useParams();
  const navigate = useNavigate();

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

  let cardType = JSON.parse(doantionDetails?.paymentResponse || '{}')?.data?.payment_method_details
    ?.card?.brand;
  let lastFourDigits = JSON.parse(doantionDetails?.paymentResponse || '{}')?.data
    ?.payment_method_details?.card?.last4;

  console.log(cardType);
  console.log(lastFourDigits);

  return (
    <>
      <Page showTags={false} title={'Donation | ' + doantionDetails.uniqueTransactionId}>
        <DefaultLayout>
          <div className="container-fluid d-flex flex-wrap">
            <div className="col-sm-6 d-flex flex-column align-items-sm-center align-items-stretch py-5 text-center pb-0 pb-sm-5 border-end">
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
                Thank you for donating through Donorport ♥<br></br>
                <br></br>
                The organization has received your donation for{' '}
                {doantionDetails.type === 'PROJECT'
                  ? 'the project:' + doantionDetails?.projectDetails?.name
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
                {doantionDetails.type === 'PROJECT' && (
                  <Link
                    to={'/project/' + doantionDetails?.projectDetails?.slug}
                    className="btn btn-lg fw-bold btn-info my-2 flex-grow-sm-0 flex-grow-1"
                  >
                    Go to Project
                  </Link>
                )}
                {!doantionDetails.type === 'PROJECT' && (
                  <Link
                    to={'/user/' + newSlug + '/items'}
                    className="btn btn-lg fw-bold btn-info my-2 flex-grow-sm-0 flex-grow-1"
                  >
                    Go to Profile
                  </Link>
                )}
              </div>
            </div>
            <div className="email__container border my-5 p-3">
              <div className="order__container d-flex align-items-center justify-content-between m-3 mx-0 border-bottom">
                <div className="order__wrap">
                  <p className="total__title fs-2 fw-bolder">Donation Details</p>
                </div>
                <div className="order__value text-light">
                  <ShareWidget />
                </div>
              </div>
              <div className="total__container mt-3">
                <div role="list" className="d-flex flex-column gap-5 my-5">
                  <div data-id="product" role="listitem" className="pb-3 border-bottom">
                    <div className="checkout__top d-flex align-items-center flex-row flex-nowrap">
                      <div className="checkout__left d-flex flex-row align-items-center flex-wrap">
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
                          <Link
                            to={'/project/' + doantionDetails?.projectDetails?.slug}
                            className="checkout__title d-flex flex-row align-items-start fw-bolder"
                          >
                            <div>
                              {doantionDetails.type === 'PROJECT'
                                ? doantionDetails?.projectDetails?.name
                                : doantionDetails?.CampaignAdminDetails?.name}
                            </div>
                          </Link>
                          <Link
                            to={'/organization/' + doantionDetails?.CampaignAdminDetails?.slug}
                            className="checkout__brand text-decoration-none text-light"
                          >
                            <div>{doantionDetails?.CampaignAdminDetails?.name}</div>
                          </Link>
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
                          {doantionDetails.amount}
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="total__sub d-flex justify-content-between">
                    <p className="total__title fw-bold">XP:</p>
                    <div className="order__xp text-info">
                      <p>
                        <b>{doantionDetails.xp} XP</b>
                      </p>
                    </div>
                  </div>
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
                        Transaction: {moment(doantionDetails.created_at).format('MMMM DD,YYYY')}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="total__box">
                  <div className="order__container d-flex align-items-center justify-content-between mt-3 border-top pt-3">
                    <div className="order__wrap">
                      <p className="total__title fs-4 fw-bolder">Total Paid:</p>
                    </div>
                    <div className="order__value text-light">
                      <p>
                        {doantionDetails.currency}
                        <b className="fs-4 text-light">
                          {' '}
                          {doantionDetails?.currencySymbol}
                          {doantionDetails.amount}
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
export default DonationConfirmPage;
