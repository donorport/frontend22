import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Button } from 'react-bootstrap';
import { makeStyles } from '@material-ui/core/styles';
import ListItemImg from '../../atoms/list-item-img';
import moment from 'moment';
import CircularProgress from '@mui/material/CircularProgress';
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
import { Select, InputLabel, MenuItem, FormControl } from '@mui/material';
//import { head } from 'lodash';
//
const MOMENT_DATE_FORMAT = 'MMMM DD, YYYY';

const getCardInfo = (paymentResponse) => {
  const card = paymentResponse?.payment_method_details?.card;
  return {
    last4: card?.last4 ?? 'XXXX',
    CardBrand: card?.brand
  };
};
const getCardInfoOrder = (paymentResponse) => {
  const card = paymentResponse?.data?.payment_method_details?.card;
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
    select: {
      width: 'auto',
      fontWeight: 700,
      fontSize: '14px',
      fontFamily: 'linotte',
      '&:focus': {
        backgroundColor: 'transparent'
      },
      '&::after': {
        borderBottom: 'none'
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'green !important'
      }
    },
    selectIcon: {
      transition: 'transform 200ms',
      '&.MuiSelect-iconOpen': {
        transform: 'rotate(180deg)'
      }
    },
    paper: {
      marginTop: 8,
      boxShadow: 'none',
      border: '1px solid #efefef'
    },
    list: {
      paddingTop: 0,
      paddingBottom: 0,
      '& li': {
        fontWeight: 700,
        fontSize: '14px',
        paddingTop: 12,
        paddingBottom: 12,
        color: '#3c96d5',
        fontFamily: 'inherit',
        borderBottom: '1px solid #efefef'
      },
      '& li:last-child': {
        borderBottom: 'unset'
      },
      '& li:hover': {
        background: '#f8fafd'
      },
      '& li.Mui-selected': {
        background: '#f8fafd'
      },
      '& li.Mui-selected:hover': {
        background: '#f8fafd'
      },
      ul: {
        '& .MuiPaginationItem-root': {
          color: '#6f6f91 !important'
        },
        '& .MuiPaginationItem-root:hover': {
          background: '#f8fafd !important'
        },
        '& .Mui-selected': {
          background: '#f8fafd !important'
        }
      }
    }
  }));
  const classes = useStyles();
  const menuProps = {
    classes: {
      select: classes.select,
      icon: classes.selectIcon,
      list: classes.list,
      paper: classes.paper
    },
    anchorOrigin: {
      vertical: 'bottom',
      horizontal: 'center'
    },
    transformOrigin: {
      vertical: 'top',
      horizontal: 'center'
    },
    getContentAnchorEl: null
  };

  return (
    <>
      <div className="list__table mb-2 mb-sm-0">
        <div className="list__table-sort d-flex justify-content-sort border-bottom">
          <div className="flex__1" style={{ display: 'flex', justifyContent: 'space-between' }}>
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
            <FormControl
              size="small"
              style={{ margin: '1rem' }}
              id="history-filter-select-form-control"
            >
              {/* <InputLabel id="demo-simple-select-label">Type</InputLabel> */}
              <Select
                sx={{
                  boxShadow: 'none',
                  '.MuiOutlinedInput-notchedOutline': {
                    border: 0
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    border: 'none' // Remove border on focus
                  }
                }}
                // IconComponent={CustomIcon}
                // labelId="demo-simple-select-label"
                // id="demo-simple-select"

                value={props.historyFilter}
                // label="Age"
                onChange={props.handleHistoryFilterChange}
                MenuProps={menuProps}
                classes={{
                  select: classes.select,
                  icon: classes.selectIcon
                }}
              >
                {Object.values(props.historyFilterOptions).map(({ value, label }) => (
                  <MenuItem
                    key={value}
                    name={value}
                    value={value}
                    className="order-history-type-filter-option"
                  >
                    {label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <ul className="list__table-list pt-2 ps-sm-3 ps-0">
          {props.isFetching ? (
            <li className="history__list-item">
              <CircularProgress className="ms-1" color="inherit" size={12} />
            </li>
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
      <div className="">
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
            Checkout # {order.uniqueTransactionId ? order.uniqueTransactionId : order._id}
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

  const { last4, CardBrand } = getCardInfo(JSON.parse(donation?.paymentResponse));
  // let CardBrand = JSON.parse(donation?.paymentResponse || '{}')?.payment_method_details?.card
  //   ?.brand;
  // let last4 = JSON.parse(donation?.paymentResponse || '{}')?.payment_method_details
  //   ?.card?.last4;

  return (
    <>
      {donation.type === 'ORGANIZATION' ? (
        <li className="history__list-item px-2 py-2 me-3 border-bottom">
          <div className="">
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
                  <div className="d-flex align-items-center text-dark fw-semibold pe-1">
                    {last4}
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <Button
                variant="link"
                className="text-light fw-semibold fs-5 p-0"
                onClick={() => showDetails(donation._id)}
              >
                Org Cash Donation #{' '}
                {donation.uniqueTransactionId ? donation.uniqueTransactionId : donation._id}
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
      ) : (
        <li className="history__list-item px-2 py-2 me-3 border-bottom">
          <div className="">
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
                  <div className="d-flex align-items-center text-dark fw-semibold pe-1">
                    {last4}
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <Button
                variant="link"
                className="text-light fw-semibold fs-5 p-0"
                onClick={() => showDetails(donation._id)}
              >
                Project Cash Donation #{' '}
                {donation.uniqueTransactionId ? donation.uniqueTransactionId : donation._id}
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
      )}
    </>
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

const OrderListTransaction = ({ order, CardType, last4 }) => {
  return (
    <li className="order__transaction pb-2">
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
