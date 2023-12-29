import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Button } from 'react-bootstrap';

// import { ToggleSwitch, Avatar } from "@components/atoms"
import Avatar from '../../atoms/avatar';
import ToggleSwitch from '../../atoms/toggle-switch';
import organizationApi from '../../../../../Api/frontEnd/organization';
import React, { useState, useEffect } from 'react';
import './style.scss';
// import { Link } from "react-router-dom";
import { Outlet, useOutletContext, Link } from 'react-router-dom';
import FrontLoader from '../../../../../Common/FrontLoader';
import moment from 'moment';
import helper, { getCardIcon, priceFormat } from '../../../../../Common/Helper';
import CSVExportBtn from '../../../CSVExportBtn';
import profile from '../../../../../assets/images/avatar.png';
import avatar from '../../../../../assets/images/donate.svg';

const AdminBilling = () => {
  const [historyList, setHistoryList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);

  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  const type = localStorage.getItem('type');
  const tempCampaignAdminAuthToken = localStorage.getItem('tempCampaignAdminAuthToken');
  const token = type
    ? type === 'temp'
      ? tempCampaignAdminAuthToken
      : CampaignAdminAuthToken
    : CampaignAdminAuthToken;
  const [data, setData] = useOutletContext();
  const [csvData, setCsvData] = useState([]);

  const headers = [
    { label: 'Date', key: 'date' },
    { label: 'Amount', key: 'amount' },
    { label: 'Name', key: 'name' },
    { label: 'Email', key: 'email' },
    { label: 'Description', key: 'description' },
    { label: 'Card', key: 'card' },
    { label: 'Last Four', key: 'lastfour' }
  ];
  const getPaymentHistory = async () => {
    let fdata = {};
    fdata.organizationId = data._id;
    const peymentHistory = await organizationApi.getPaymentHistory(token, fdata);
    if (peymentHistory.data.success === true) {
      setHistoryList(peymentHistory.data.data);
      if (peymentHistory.data.data.length > 0) {
        let tempAr = [];
        peymentHistory.data.data.map((list, i) => {
          let tempObj = {};
          tempObj.date = moment(list.created_at).format('MM/DD/YYYY');
          tempObj.amount =
            list.type === 'ORDER'
              ? Number(list.totalPrice) * Number(list.quantity)
              : list.amount;
  
          let userName = list.userDetails ? list.userDetails.name : 'DELETED USER';
          let orderUserName = list.orderDetails ? list.orderDetails.userDetails.name : 'DELETED USER';
          tempObj.name = list.type === 'ORDER' ? orderUserName : userName;
  
          let userEmail = list.userDetails ? list.userDetails.email : 'DELETED USER';
          let orderUserEmail = list.orderDetails ? list.orderDetails.userDetails.email : 'DELETED USER';
          tempObj.email = list.type === 'ORDER' ? orderUserEmail : userEmail;
  
          tempObj.description =
            list.type === 'ORDER' ? list.quantity + ' ' + list.productName : 'Donated';
  
          let cardBrand = '';
          let cardLastFour = '';
          let cardId = '';
          if (list.type === 'ORDER') {
            if (list.orderDetails) {
              let orderPaymentResponse = JSON.parse(list.orderDetails.paymentResponse);
              cardBrand =
                orderPaymentResponse.data?.payment_method_details?.card?.brand || '';
              cardLastFour =
                orderPaymentResponse.data?.payment_method_details?.card?.last4 || '';
              cardId =
                orderPaymentResponse.data?.payment_method_details?.card?.id || '';
            }
          } else {
            let paymentResponse = JSON.parse(list.paymentResponse);
            cardBrand =
              paymentResponse.payment_method_details?.card?.brand || '';
            cardLastFour =
              paymentResponse.payment_method_details?.card?.last4 || '';
            cardId =
              paymentResponse.payment_method_details?.card?.id || '';
          }
  
          tempObj.card = cardBrand;
          tempObj.lastfour = cardLastFour;
          tempObj.id = cardId;
  
          tempAr.push(tempObj);
        });
        setCsvData(tempAr);
      }
    }
  };
  

  useEffect(() => {
    (async () => {
      setLoading(true);
      if (data && data._id) {
        await getPaymentHistory();
      }
      setLoading(false);

      // console.log(historyList)
    })();
  }, [data]);

  return (
    <>
      {/*<FrontLoader loading={loading} />*/}
      <div className="mw-600">
        {/* <div className="mb-5">
          <div className="flex__1 mb-3">
            <h4 className="fw-bolder">Premium Plan</h4>
            <div className="text-subtext">Your current account plan:</div>
          </div>

          <Link variant="info" className=" btn btn-info rounded-pill ms-auto" to="/plans">
            Free Plan <FontAwesomeIcon icon={solid('cloud')} className="ms-1" />
          </Link>
        </div> */}

        {/* <div className="mb-5">
          <div className="flex__1 mb-3">
            <h4 className="fw-bolder">Payment Schedule</h4>
            <div className="text-subtext">
              Choose how often your unlimited donations are disbursed to your EFT
              account
            </div>
          </div>

          <ul className="mb-0 list-unstyled schedule__list">
            <li className="list__item d-flex align-items-center py-2">
              <ToggleSwitch />
              <span className="text-light ms-2">Weekly</span>
            </li>
            <li className="list__item d-flex align-items-center py-2">
              <ToggleSwitch />
              <span className="text-light ms-2">Monthly</span>
            </li>
          </ul>
        </div>*/}

        <div className="mb-5">
          <div className="d-sm-flex align-items-center mb-5 mb-sm-3">
            <div className="flex__1 mb-2">
              <h4 className="fw-bolder">Payment History</h4>
              <div className="text-subtext">All transactions related to your Admin account</div>
            </div>
            {historyList.length > 0 && (
              <CSVExportBtn headers={headers} csvData={csvData} label="Export" prifix="_billing" />
            )}
            {/* <Button variant="info" size="lg" className="btn__export">
              <span className="fw-bold fs-6">Export</span>
            </Button> */}
          </div>
          <div className="billing__list mb-3">
          {historyList.length > 0 ? (
    historyList.slice(0, loadMore ? historyList.length : 6).map((list, i) => {
      let amount =
        list.type === 'ORDER'
          ? Number(list.totalPrice) * Number(list.quantity)
          : list.amount;
      let currencySymbole =
        list.type === 'ORDER' ? list.orderDetails?.currencySymbol : list.currencySymbol;
      let date = moment(list.created_at).format('MM/DD/YYYY');
      let donate =
        list.type === 'ORDER' ? list.quantity + ' ' + list.productName : 'Donated';
      let PurchaseIcon =
        list.type === 'ORDER' ? (
          <FontAwesomeIcon icon={solid('bag-shopping')} className="mr-3p" />
        ) : (
          <FontAwesomeIcon icon={solid('heart')} className="mr-3p" />
        );

      let userName = list.userDetails ? list.userDetails.name : 'DELETED USER';
      let orderUserName = list.orderDetails ? list.orderDetails.userDetails.name : 'DELETED USER';

      let cardID = '';
      let image = '';
      
      if (list.type === 'ORDER') {
        if (list.orderDetails && list.orderDetails.userDetails) {
          let orderPaymentResponse = JSON.parse(list.orderDetails.paymentResponse);
          cardID = orderPaymentResponse.data?.id || '';
          image = list.orderDetails.userDetails.image || '';
        }
      } else {
        let paymentResponse = JSON.parse(list.paymentResponse);
        cardID = paymentResponse.id || '';
        image = (list.userDetails && list.userDetails.image) || '';
      }
      

      let avatar = image ? helper.DonorImagePath + image : profile;
      let userNameToDisplay = list.type === 'ORDER' ? orderUserName : userName;

      let CardType = '';
      let lastFourDigits = '';
      if (list.type === 'ORDER') {
        if (list.orderDetails) {
          let orderPaymentResponse = JSON.parse(list.orderDetails.paymentResponse);
          CardType = orderPaymentResponse.data?.payment_method_details?.card?.brand || '';
          lastFourDigits = orderPaymentResponse.data?.payment_method_details?.card?.last4 || '';
        }
      } else {
        let paymentResponse = JSON.parse(list.paymentResponse);
        CardType = paymentResponse.payment_method_details?.card?.brand || '';
        lastFourDigits = paymentResponse.payment_method_details?.card?.last4 || '';
      }

                return (
                  <div className="billing__item p-2 py-3 border-bottom">
                    <div className="billing__content d-flex flex-column flex-sm-row justify-content-start align-items-start">
                      <div className="flex__1 w-100 d-flex d-sm-flex-block align-items-center mb-2 mb-sm-0">
                        <Avatar
                          size={52}
                          avatarUrl={avatar}
                          border={0}
                          shadow={false}
                          className="admin__avatar mr-12p donor_avatar_bg"
                        />
                        <div className="admin__billing__value order-1 me-0 me-sm-4 text-end">
                          <div className="text-success fw-bold fs-5 mb-3p">
                            + {currencySymbole}
                            {priceFormat(Number(amount))}
                          </div>
                          <div className="fw-semibold text-light fs-7">
                            {moment(date).format('MMM DD, YYYY')}
                          </div>
                        </div>
                        <div className="admin__billing__details flex__1 d-flex flex-column align-items-start">
                          <div className="fw-bold mb-6p">{userName}</div>
                          <div className="text-subtext fs-7">
                            {PurchaseIcon}&nbsp;
                            {donate}
                          </div>
                        </div>
                      </div>

                      <div className="admin__billing__tag">
                        <div className="billing__payment">
                          <div className="billing__icon ml-12p mr-12p">
                            <img width="26" height="26" src={getCardIcon(CardType)} alt="" />
                          </div>
                          <div className="billing__card fs-7">
                            <div style={{ textTransform: 'capitalize' }}>{CardType}</div>
                            <div className="linked__date">{lastFourDigits}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <span>There have been no transactions.</span>
            )}
            {!loadMore && historyList.length > 2 && (
              <div className="more__log">
                <Button
                  variant="info"
                  className="fs-6 pt-12p pb-12p w-100"
                  onClick={() => setLoadMore(true)}
                >
                  Load More . . .
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminBilling;
