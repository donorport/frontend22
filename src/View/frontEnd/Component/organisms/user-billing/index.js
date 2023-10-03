import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Button } from 'react-bootstrap';
import userApi from '../../../../../Api/frontEnd/user';
import { useState, useEffect } from 'react';
import FrontLoader from '../../../../../Common/FrontLoader';
import moment from 'moment';
import helper, { getCardIcon } from '../../../../../Common/Helper';
import CSVExportBtn from '../../../CSVExportBtn';
import mastercard from '../../../../../assets/images/mastercard-logo.svg';

import './style.scss';

const UserBilling = () => {
  const [historyList, setHistoryList] = useState([]);
  const userAuthToken = localStorage.getItem('userAuthToken');
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [csvData, setCsvData] = useState([]);

  const headers = [
    { label: 'Date', key: 'date' },
    { label: 'Amount', key: 'amount' },
    { label: 'Transaction Id', key: 'TransactionId' },
    { label: 'Type', key: 'type' },
    { label: 'Description', key: 'description' },
    { label: 'Card', key: 'card' },
    { label: 'Last Four', key: 'lastfour' }
  ];

  const getUserPaymentHistory = async () => {
    const peymentHistory = await userApi.getUserPaymentHistory(userAuthToken);
    if (peymentHistory.data.success === true) {
      setHistoryList(peymentHistory.data.data);

      if (peymentHistory.data.data.length > 0) {
        let tempAr = [];
        peymentHistory.data.data.map((list, i) => {
          // let tempObj = {}
          // tempObj.date = moment(list.created_at).format('DD/MM/YYYY')
          // tempObj.amount = list.type === 'ORDER' ? list.total : list.amount
          // tempObj.TransactionId = list.uniqueTransactionId ? list.uniqueTransactionId : list.transactionId
          // tempObj.type = list.type === 'ORDER' ? 'Bought' : 'Donate'
          // tempObj.description = list.type === 'ORDER' ? 'Debited' : list.type === 'PROJECT' ? list.projectDetails.name : list.organizationDetails.name
          // tempObj.card = list.type === 'ORDER' ? JSON.parse(list.paymentResponse).data?.payment_method_details?.card?.brand : JSON.parse(list.paymentResponse).payment_method_details?.card?.brand
          // tempObj.lastfour = list.type === 'ORDER' ? JSON.parse(list.paymentResponse).data?.payment_method_details?.card?.last4 : JSON.parse(list.paymentResponse).payment_method_details?.card?.last4
          // tempAr.push(tempObj)

          if (list.type !== 'ORDER') {
            let tempObj = {};
            tempObj.date = moment(list.created_at).format('MM/DD/YYYY');
            tempObj.amount = list.type === 'ORDER' ? list.total : list.amount;
            tempObj.TransactionId = list.uniqueTransactionId
              ? list.uniqueTransactionId
              : list.transactionId;
            tempObj.type = list.type === 'ORDER' ? 'Bought' : 'Donate';
            tempObj.description =
              list.type === 'ORDER'
                ? 'Debited'
                : list.type === 'PROJECT'
                ? list.projectDetails.name
                : list.organizationDetails.name;
            tempObj.card =
              list.type === 'ORDER'
                ? JSON.parse(list.paymentResponse).data?.payment_method_details?.card?.brand
                : JSON.parse(list.paymentResponse).payment_method_details?.card?.brand;
            tempObj.lastfour =
              list.type === 'ORDER'
                ? JSON.parse(list.paymentResponse).data?.payment_method_details?.card?.last4
                : JSON.parse(list.paymentResponse).payment_method_details?.card?.last4;
            tempAr.push(tempObj);
          } else {
            list.orderItems.map((o_itm, okey) => {
              let tempObj = {};
              tempObj.date = moment(list.created_at).format('MM/DD/YYYY');
              tempObj.amount = Number(o_itm.productPrice) * o_itm.quantity;
              tempObj.TransactionId = list.uniqueTransactionId
                ? list.uniqueTransactionId
                : list.transactionId;
              tempObj.type = list.type === 'ORDER' ? 'Bought' : 'Donate';
              tempObj.description = o_itm.quantity + '' + o_itm.productName;
              tempObj.card =
                list.type === 'ORDER'
                  ? JSON.parse(list.paymentResponse).data?.payment_method_details?.card?.brand
                  : JSON.parse(list.paymentResponse).payment_method_details?.card?.brand;
              tempObj.lastfour =
                list.type === 'ORDER'
                  ? JSON.parse(list.paymentResponse).data?.payment_method_details?.card?.last4
                  : JSON.parse(list.paymentResponse).payment_method_details?.card?.last4;
              tempAr.push(tempObj);
            });
          }
        });
        setCsvData(tempAr);
      }
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getUserPaymentHistory();
      setLoading(false);

      // console.log(historyList)
    })();
  }, []);

  return (
    <>
      <div className="mb-5">
        <div className="d-sm-flex align-items-center mb-5 mb-sm-3">
          <div className="flex__1 mb-2">
            <h4 className="fw-bolder">Payment History</h4>
            <div className="text-subtext">All transactions related to your Admin account</div>
          </div>
          {historyList.length > 0 && (
            <CSVExportBtn
              headers={headers}
              csvData={csvData}
              label="Export"
              prifix="_user_billing"
            />
          )}
        </div>
        {historyList.length > 0 ? (
          <div
            className="billing__list mw-600"
            // style={{ overflowY: loadMore ? 'scroll' : '', height: loadMore ? '500px' : '' }}
          >
            {historyList.length > 0 &&
              historyList.slice(0, loadMore ? historyList.length : 6).map((list, i) => {
                let amount = list.type === 'ORDER' ? list.total : list.amount;
                let currencySymbole = list.currencySymbol;
                let date = moment(list.created_at).format('MM/DD/YYYY');
                let PurchaseType = list.type === 'ORDER' ? 'Bought' : 'Donated';
                let PurchaseIcon =
                  list.type === 'ORDER' ? (
                    <FontAwesomeIcon icon={solid('bag-shopping')} className="mr-3p" />
                  ) : (
                    <FontAwesomeIcon icon={solid('heart')} className="mr-3p" />
                  );
                let PurchaseName =
                  list.type === 'ORDER'
                    ? 'Debited'
                    : list.type === 'PROJECT'
                    ? list.projectDetails.name
                    : list.organizationDetails.name;
                let TransactionId = list.uniqueTransactionId
                  ? list.uniqueTransactionId
                  : list.transactionId;
                let CardType =
                  list.type === 'ORDER'
                    ? JSON.parse(list.paymentResponse).data?.payment_method_details?.card?.brand
                    : JSON.parse(list.paymentResponse).payment_method_details?.card?.brand;

                // let cardIcon =
                //   CardType === 'visa' ? (
                //     <img
                //       alt="Visa"
                //       height="30"
                //       src={helper.CampaignAdminLogoFullPath + 'visa.png'}
                //       style={{
                //         border: 0,
                //         margin: 0,
                //         padding: 0,
                //         verticalAlign: 'text-bottom',
                //         color: 'blue'
                //       }}
                //       width="30"
                //     ></img>
                //   ) : (
                //     <img width="30" height="30" src={mastercard} loading="lazy" alt="" />
                //   );

                let lastFourDigits =
                  list.type === 'ORDER'
                    ? JSON.parse(list.paymentResponse).data?.payment_method_details?.card?.last4
                    : JSON.parse(list.paymentResponse).payment_method_details?.card?.last4;

                // console.log(JSON.parse(list.paymentResponse).data?.payment_method_details?.card?.brand)

                return list.type !== 'ORDER' ? (
                  <div className="billing__item p-2 mb-3 border-bottom">
                    <div className="billing__content d-flex align-items-center">
                      <div className="billing__bottom">
                        <div className="billing__value text-start">
                          <div className="text-danger fw-bold fs-5 mb-3p">
                            - {currencySymbole}
                            {amount}
                          </div>
                          <div className="fw-semibold text-light fs-7">
                            {moment(date).format('MMM DD, YYYY')}
                          </div>
                        </div>
                        <div className="d-sm-none order__link text-subtext mt-6p">
                          #{TransactionId}
                        </div>
                      </div>

                      <div className="billing__details pr-3 ms-sm-2 flex__1">
                        <div className="fw-bold mb-3p">{PurchaseName}</div>
                        <div className="text-subtext fs-7">
                          {PurchaseIcon}
                          {PurchaseType}
                          <div className="d-none d-sm-block order__link text-subtext mt-6p me-3">
                            #{TransactionId}
                          </div>
                        </div>
                      </div>

                      <div className="billing__tag">
                        <div className="billing__payment">
                          <div className="billing__icon ml-12p mr-12p">
                            <img
                              width="26"
                              height="26"
                              src={getCardIcon(CardType)}
                              loading="lazy"
                              alt=""
                            />
                            {/* {cardIcon} */}
                          </div>
                          <div className="billing__card fs-7">
                            <div>{CardType}</div>
                            <div className="linked__date">{lastFourDigits}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  list.orderItems.length > 0 &&
                    list.orderItems.map((o_itm, okey) => {
                      // console.log(o_itm)
                      return (
                        <div className="billing__item p-2 mb-3 border-bottom">
                          <div className="billing__content d-flex align-items-center">
                            <div className="billing__bottom">
                              <div className="billing__value text-start">
                                <div className="text-danger fw-bold fs-5 mb-3p">
                                  - {currencySymbole}
                                  {Number(o_itm.productPrice) * o_itm.quantity}
                                </div>
                                <div className="fw-semibold text-light fs-7">
                                  {moment(date).format('MMM DD, YYYY')}
                                </div>
                              </div>
                              <div className="d-sm-none order__link text-subtext mt-6p">
                                #{TransactionId}
                              </div>
                            </div>

                            <div className="billing__details pr-3 ms-sm-2 flex__1">
                              <div className="fw-bold mb-3p">{o_itm.organizationDetails.name}</div>
                              <div className="text-subtext fs-7">
                                {PurchaseIcon}
                                {/* {PurchaseType} */}
                                {o_itm.quantity} {o_itm.productName}
                                <div className="d-none d-sm-block order__link text-subtext mt-6p me-3">
                                  #{TransactionId}
                                </div>
                              </div>
                            </div>

                            <div className="billing__tag">
                              <div className="billing__payment">
                                <div className="billing__icon ml-12p mr-12p">
                                  <img
                                    width="26"
                                    height="26"
                                    src={getCardIcon(CardType)}
                                    loading="lazy"
                                    alt=""
                                  />
                                  {/* {cardIcon} */}
                                </div>
                                <div className="billing__card fs-7">
                                  <div>{CardType}</div>
                                  <div className="linked__date">{lastFourDigits}</div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                );
              })}

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
        ) : (
          <span className="history__list-item">No Records to Display</span>
        )}
      </div>
    </>
  );
};

export default UserBilling;
