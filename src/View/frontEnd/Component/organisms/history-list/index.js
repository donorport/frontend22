import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Button } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import ListItemImg from '../../atoms/list-item-img';
import moment from 'moment';
import helper, {
  priceFormat,
  //getCalculatedPrice,
  getCardIcon
} from '../../../../../Common/Helper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Link } from 'react-router-dom';
import donate from '../../../../../assets/images/donate.svg';

import './style.scss';
//import { head } from 'lodash';
//
const MOMENT_DATE_FORMAT = 'MMMM DD, YYYY';

const getCardInfo = (paymentResponse) => {
  const card = paymentResponse.data?.payment_method_details?.card;
  return {
    last4: card?.last4 ?? 'XXXX',
    CardBrand: card?.brand
  };
};

const HistoryList = (props) => {
  const thisPageList = props.thisPageList;

  const activeList = props.activeList;
  const setActiveList = props.setActiveList;
  const setIsChecked = props.setIsChecked;

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

    if (tempArry.length !== thisPageList.length) {
      setIsChecked(false);
    } else {
      setIsChecked(true);
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
              {props.sortField === 'created_at' && props.sortingOrder === 'asc' ? (
                <FontAwesomeIcon icon={solid('angle-up')} className="small ml-6p" />
              ) : (
                <FontAwesomeIcon icon={solid('angle-down')} className="small ml-6p" />
              )}
            </Button>
          </div>
        </div>
        <ul className="list__table-list pt-2 ps-sm-3 ps-0">
          {props.isFetching ? (
            <li className="history__list-item">Getting history...</li>
          ) : thisPageList.length > 0 ? (
            thisPageList.map((orderOrDonation, i) => {
              const isOrder = !!orderOrDonation?.total;
              if (isOrder)
                return (
                  <OrderListItem
                    key={i}
                    order={orderOrDonation}
                    showDetails={showDetails}
                    activeList={activeList}
                  />
                );
              return (
                <DonationListItem
                  key={i}
                  donation={orderOrDonation}
                  showDetails={showDetails}
                  activeList={activeList}
                />
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
          {props.totalPages > 1 && (
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
          )}
        </div>
      </div>
    </>
  );
};

const OrderListItem = ({ order, showDetails, activeList }) => {
  let platformCost = (
    (order.platformFees / 100 + order.transactionFees / 100) * Number(order.subtotal) +
    0.3
  ).toFixed(2);
  let grandTotal = (Number(order.subtotal) + Number(platformCost)).toFixed(2);

  const { last4, CardBrand } = getCardInfo(JSON.parse(order.paymentResponse));

  //currency symbol
  //total
  //order number
  //order date
  //last4
  return (
    <li className="history__list-item px-2 py-2 me-3 border-bottom">
      <div className="pb-2">
        <div className="d-flex align-items-center">
          <span className="d-flex align-items-center rounded-3">
            <span className="fw-bold fs-4">
              {order.currencySymbol ? order.currencySymbol : '$'}
              {priceFormat(Number(grandTotal))}
            </span>
            <span className="ml-6p text-light fs-8">{order.currency ? order.currency : 'CAD'}</span>
          </span>
          <div className="ms-auto bg-lighter d-flex align-items-center rounded-3">
            <div className="order__logo mx-1">
              <img src={getCardIcon(CardBrand)} alt="" className="img-fluid" />
            </div>
            <div className="order__card fs-7">
              <div className="d-flex align-items-center text-dark fw-semibold pe-1">{last4}</div>
            </div>
          </div>
        </div>
        <div>
          <Button
            variant="link"
            className="text-light fw-semibold fs-5 p-0"
            onClick={() => showDetails(order._id)}
          >
            Order # {order.uniqueTransactionId ? order.uniqueTransactionId : order._id}
          </Button>
        </div>
        <div className="fw-semibold fs-7 text-lighter mt-3p">
          {moment(order.created_at).format(MOMENT_DATE_FORMAT)}
        </div>
      </div>

      {activeList.includes(order._id) && (
        <OrderListActiveList
          order={order}
          platformCost={platformCost}
          CardBrand={CardBrand}
          last4={last4}
        />
      )}
    </li>
  );
};

const DonationListItem = ({ donation, showDetails, activeList }) => {
  //console.log('rendering donation list item:', {donation});
  const grandTotal = donation.amount;

  const { last4, CardBrand } = getCardInfo(JSON.parse(donation.paymentResponse));

  return (
    <li className="history__list-item px-2 py-2 me-3 border-bottom">
      <div className="pb-2">
        <div className="d-flex align-items-center">
          <span className="d-flex align-items-center rounded-3">
            <span className="fw-bold fs-4">
              {donation.currencySymbol ? donation.currencySymbol : '$'}
              {priceFormat(Number(grandTotal))}
            </span>
            <span className="ml-6p text-light fs-8">
              {donation.currency ? donation.currency : 'CAD'}
            </span>
          </span>
          <div className="ms-auto bg-lighter d-flex align-items-center rounded-3">
            <div className="order__logo mx-1">
              <img src={getCardIcon(CardBrand)} alt="" className="img-fluid" />
            </div>
            <div className="order__card fs-7">
              <div className="d-flex align-items-center text-dark fw-semibold pe-1">{last4}</div>
            </div>
          </div>
        </div>
        <div className="d-flex">
          <Button
            variant="link"
            className="text-light fw-semibold fs-5 p-0"
            onClick={() => showDetails(donation._id)}
          >
            Donation # {donation.uniqueTransactionId ? donation.uniqueTransactionId : donation._id}
          </Button>{' '}
          <img className="ms-3" style={{ height: '24px' }} src={donate}></img>
        </div>
        <div className="fw-semibold fs-7 text-lighter mt-3p">
          {moment(donation.created_at).format(MOMENT_DATE_FORMAT)}
        </div>
      </div>

      {
        // this isn't really necessary, doesn't show any extra info, but it looks nice
        activeList.includes(donation._id) && (
          <DonationListActiveList donation={donation} CardBrand={CardBrand} last4={last4} />
        )
      }
    </li>
  );
};

const DonationListActiveList = ({ donation, CardBrand, last4 }) => {
  return (
    <ul className="history__list list-unstyled ms-1 mt-2">
      <OrderListTransaction order={donation} CardType={CardBrand} last4={last4} />
    </ul>
  );
};

const OrderListActiveList = ({ order, platformCost, CardBrand, last4 }) => {
  return (
    <ul className="history__list list-unstyled ms-1 mt-2">
      {order.orderItems.length > 0 &&
        order.orderItems.map((item, key) => (
          <PurchaseListItem key={key} order={order} item={item} />
        ))}
      <div className="d-flex align-items-center py-3">
        <Link to="/pricing" className="fw-semibold fs-7 text-light flex__1">
          Service Charge:
        </Link>
        <span className="fw-bold text-light fs-6">{order.currencySymbol + platformCost}</span>
      </div>

      <OrderListTransaction order={order} CardType={CardBrand} last4={last4} />
    </ul>
  );
};

const PurchaseListItem = ({ order, item }) => {
  return (
    <li className="d-sm-flex align-items-center px-sm-0 py-2 border-bottom">
      <div className="d-flex align-items-center mb-2 mb-sm-0 flex__1">
        <ListItemImg
          size={68}
          imgSrc={helper.CampaignProductImagePath + item.productImage}
          style={{ border: 'unset', background: 'unset' }}
        />
        <div className="ms-2 order__id">
          <Button variant="link" className="text-dark fw-bold p-0 mb-3p">
            {item.quantity} {item.itemDetails?.headline}
          </Button>
          <div className="text-light mb-3p">{item.itemDetails?.brand}</div>
          <div className="fs-5 text-light fw-bold">
            {order.currencySymbol ? order.currencySymbol : '$'}{' '}
            {priceFormat(Number(item.productPrice))}
          </div>
        </div>
        <ListItemImg
          size={42}
          style={{ maxWidth: 'auto !important' }}
          className="rounded-circle img--nobg mb-0 mb-sm-auto"
          imgSrc={helper.CampaignAdminLogoPath + item?.itemDetails?.campaignadminsDetails.logo}
        />
      </div>

      <div className="order__values d-flex align-items-center">
        <span className="fs- text-info fw-bold flex__1">{item.xp ? item.xp : 0} xp</span>
        <span className="fs-5 fw-bold text-light ms-2" style={{ width: '80px', textAlign: 'end' }}>
          {order.currencySymbol ? order.currencySymbol : '$'}
          {priceFormat(Number(item.productPrice * item.quantity))}
        </span>
      </div>
    </li>
  );
};

const OrderListTransaction = ({ order, CardType, last4 }) => {
  return (
    <li className="order__transaction pb-5">
      <div className="bg-lighter d-flex align-items-center pt-20p pb-20p px-2 rounded-3">
        <div className="order__logo me-2">
          <img src={getCardIcon(CardType)} alt="" className="img-fluid" />
        </div>
        <div className="order__card fs-7">
          <div className="text-dark fw-semibold mb-6p">XXXX XXXX XXXX {last4}</div>
          <div className="text-light fw-semibold">
            <div>Transaction: {moment(order.created_at).format(MOMENT_DATE_FORMAT)}</div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default HistoryList;
