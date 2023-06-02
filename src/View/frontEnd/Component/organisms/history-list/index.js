import { useState, useEffect } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Button } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import ListItemImg from '../../atoms/list-item-img';
import moment from 'moment';
import helper, { priceFormat, getCalculatedPrice, getCardIcon } from '../../../../../Common/Helper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';

import './style.scss';
import { head } from 'lodash';

const HistoryList = (props) => {
  let orderList = props.orderList;
  let totalRecord = props.totalRecord;

  const [active, setActive] = useState(0);
  // const [activeList, setActiveList] = useState([]);

  const [openData, setOpenData] = useState({
    key: '',
    activeDetail: false
  });
  const { key, activeDetail } = openData;
  const calculatedPrice = getCalculatedPrice();

  // const showDetails = (key,isOpen) ={

  // }

  const activeList = props.activeList;
  const setActiveList = props.setActiveList;
  const setIschecked = props.setIschecked;

  const showDetails = (e) => {
    let tempArry = [...activeList];
    const index = tempArry.indexOf(e);
    if (index > -1) {
      tempArry.splice(index, 1);
      setActiveList(tempArry);
    } else {
      tempArry = [...activeList, e];
      setActiveList([...activeList, e]);
    }

    if (tempArry.length !== orderList.length) {
      setIschecked(false);
    } else {
      setIschecked(true);
    }
  };

  const useStyles = makeStyles(() => ({
    ul: {
      '& .MuiPaginationItem-root': {
        color: '#6f6f91 !important'
      },
      '& .MuiPaginationItem-root:hover': {
        background: '#f2f6fc !important'
      },
      '& .Mui-selected': {
        background: '#f2f6fc !important'
      }
    }
  }));
  const classes = useStyles();

  return (
    <>
      <div className="list__table mb-2 mb-sm-0">
        <div className="list__table-sort d-flex justify-content-sort border-bottom">
          <div className="flex__1">
            <Button
              variant="link"
              className="btn__sort px-0 text-decoration-none"
              onClick={() => props.handleSortingChange('created_at')}
            >
              Date
              {props.sortField === 'created_at' && props.order === 'asc' ? (
                <FontAwesomeIcon icon={solid('angle-up')} className="small ml-6p" />
              ) : (
                <FontAwesomeIcon icon={solid('angle-down')} className="small ml-6p" />
              )}
            </Button>
          </div>
        </div>
        <ul className="list__table-list pt-2 ps-sm-3 ps-0">
          {orderList.length > 0 ? (
            orderList.map((order, i) => {
              // console.log(order.uniqueTransactionId)
              //let platformCost = ((order.platformFees / 100) * Number(order.subtotal)).toFixed(2);
              let transactionFee = order.transactionFees;
              let platformFee = order.platformFees;

              let platformCost = (
                (platformFee / 100 + transactionFee / 100) * Number(order.subtotal) +
                0.3
              ).toFixed(2);
              let grandTotal = (Number(order.subtotal) + Number(platformCost)).toFixed(2);

              let last4 = JSON.parse(order.paymentResponse).data?.payment_method_details?.card
                ?.last4;
              let CardType = JSON.parse(order.paymentResponse).data?.payment_method_details?.card
                ?.brand;
              //

              return (
                <>
                  <li className="history__list-item px-2 py-2 me-3 border-bottom">
                    <div className="pb-2">
                      <div className="d-flex align-items-center">
                        <span className="d-flex align-items-center rounded-3">
                          {/* <FontAwesomeIcon
                          icon={solid('receipt')}
                          className="mr-12p text-dark fs-4"
                        />*/}
                          <span className="fw-bold fs-4">
                            {order.currencySymbol ? order.currencySymbol : '$'}
                            {priceFormat(Number(grandTotal))}
                          </span>
                          <span className="ml-6p text-light fs-8">
                            {order.currency ? order.currency : 'CAD'}
                          </span>
                        </span>
                        <div className="ms-auto bg-lighter d-flex align-items-center rounded-3">
                          <div className="order__logo me-1">
                            <img src={getCardIcon(CardType)} alt="" className="img-fluid" />
                          </div>
                          <div className="order__card fs-7">
                            <div className="d-flex align-items-center text-dark fw-semibold pe-1">
                              {last4}
                            </div>
                          </div>
                        </div>
                        {/* <span className="ms-2 text-info fs-5 fw-bold">
                          {order.xp ? order.xp : 200} xp
                        </span> */}
                      </div>
                      <div>
                        <Button
                          variant="link"
                          className="text-light fw-semibold fs-5 p-0"
                          // onClick={() => setOpenData({ ...openData, key: order._id, activeDetail: !activeDetail })}
                          onClick={() => showDetails(order._id)}
                        >
                          Order #{' '}
                          {order.uniqueTransactionId ? order.uniqueTransactionId : order._id}
                        </Button>
                      </div>
                      {/* <div className="fw-bold fs-7 text-light">July 21, 2020</div> */}
                      <div className="fw-semibold fs-7 text-lighter mt-3p">
                        {moment(order.created_at).format('MMMM DD , YYYY')}
                      </div>
                    </div>
                    {
                      // activeDetail && key === order._id ?
                      activeList.includes(order._id) ? (
                        <ul className="history__list list-unstyled ms-1 mt-2">
                          {order.orderItems.length > 0 &&
                            order.orderItems.map((item, key) => {
                              // console.log(item)
                              // console.log(item)
                              // let price = Math.round(Number(item.productPrice) + (totalCharge / 100) * Number(item.productPrice))
                              let price = item.productPrice;

                              // let price = calculatedPrice.priceWithTax(item.productPrice)

                              return (
                                <li className="d-sm-flex align-items-center px-sm-0 py-2 border-bottom">
                                  <div className="d-flex align-items-center mb-2 mb-sm-0 flex__1">
                                    <ListItemImg
                                      size={68}
                                      imgSrc={helper.CampaignProductImagePath + item.productImage}
                                      style={{ border: 'unset', background: 'unset' }}
                                    />
                                    <div className="ms-2 order__id">
                                      <Button
                                        variant="link"
                                        className="text-dark fw-bold p-0 mb-3p"
                                      >
                                        {item.quantity} {item.itemDetails?.headline}
                                      </Button>
                                      <div className="text-light mb-3p">
                                        {item.itemDetails?.brand}
                                      </div>
                                      <div className="fs-5 text-light fw-bold">
                                        {order.currencySymbol ? order.currencySymbol : '$'}{' '}
                                        {priceFormat(Number(price))}
                                      </div>
                                    </div>
                                    <ListItemImg
                                      size={42}
                                      style={{ maxWidth: 'auto !important' }}
                                      className="rounded-circle img--nobg mb-0 mb-sm-auto"
                                      imgSrc={
                                        helper.CampaignAdminLogoPath +
                                        item?.itemDetails?.campaignadminsDetails.logo
                                      }
                                    />
                                  </div>
                                  <div className="order__values d-flex align-items-center">
                                    <span className="fs- text-info fw-bold flex__1">
                                      {item.xp ? item.xp : 0} xp
                                    </span>
                                    <span
                                      className="fs-5 fw-bold text-light ms-2"
                                      style={{ width: '80px', textAlign: 'end' }}
                                    >
                                      {order.currencySymbol ? order.currencySymbol : '$'}
                                      {priceFormat(Number(price * item.quantity))}
                                    </span>
                                  </div>
                                </li>
                              );
                            })}
                          <div className="d-flex align-items-center py-3">
                            <Link to="/pricing" className="fw-semibold fs-7 text-light flex__1">
                              Service Charge:
                            </Link>
                            <span className="fw-bold text-light fs-6">
                              {order.currencySymbol + platformCost}
                            </span>
                          </div>
                          <li className="order__transaction pb-5">
                            <div className="bg-lighter d-flex align-items-center pt-20p pb-20p px-2 rounded-3">
                              <div className="order__logo me-2">
                                <img src={getCardIcon(CardType)} alt="" className="img-fluid" />
                              </div>
                              <div className="order__card fs-7">
                                <div className="text-dark fw-semibold mb-6p">
                                  XXXX XXXX XXXX {last4}
                                </div>
                                <div className="text-light fw-semibold">
                                  <div>
                                    Transaction: {moment(order.created_at).format('MMMM DD , YYYY')}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>
                      ) : (
                        ''
                      )
                    }
                  </li>
                </>
              );
            })
          ) : (
            <li className="history__list-item">No Records to Display</li>
          )}
        </ul>
        <div
          className="py-2 mt-2 d-flex justify-content-center border-top"
          style={{ background: '#f8fafd78' }}
        >
          {props.totalPages > 1 ? (
            <Stack spacing={2}>
              <Pagination
                count={props.totalPages}
                page={props.pageNo}
                onChange={props.handleClick}
                shape="rounded"
                classes={{ ul: classes.ul }}
                showFirstButton
                showLastButton
              />
            </Stack>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

export default HistoryList;
