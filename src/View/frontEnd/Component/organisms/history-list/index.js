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
import coin from '../../../../../assets/images/coin.svg';
import coin2 from '../../../../../assets/images/coin(2).svg';
import bag from '../../../../../assets/images/bag.svg';
import './style.scss';
import { Select, InputLabel, MenuItem, FormControl } from '@mui/material';
import { Accordion, AccordionItem as Item } from '@szhsin/react-accordion';
import chevronDown from '../../../../../assets/images/chevron-down.svg';
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

const HistoryList = ({
  thisPageList,
  activeList,
  setActiveList,
  setIsChecked,
  handleSortingChange,
  sortField,
  sortingOrder,
  historyFilter,
  handleHistoryFilterChange,
  historyFilterOptions,
  isFetching,
  totalPages,
  pageNo,
  handleClick
}) => {
  console.log('HistoryList rerender');

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
      fontWeight: 600,
      fontSize: '14px',
      fontFamily: 'inherit',
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

    ul: {
      '& .MuiPaginationItem-root': {
        color: '#6f6f91 !important'
      },
      '& .MuiPaginationItem-root:hover': {
        background: '#f8fafd !important'
      }
    },
    list: {
      paddingTop: 0,
      paddingBottom: 0,
      '& li': {
        fontWeight: 600,
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
          <div className="flex-grow-1" style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="link"
              className="btn__sort px-0 text-decoration-none"
              onClick={() => handleSortingChange('created_at')}
            >
              Date
              {sortField === 'created_at' && sortingOrder === 'asc' ? (
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
                  '.MuiMenuItem-root': {
                    color: 'red'
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    border: 'none' // Remove border on focus
                  }
                }}
                // IconComponent={CustomIcon}
                // labelId="demo-simple-select-label"
                // id="demo-simple-select"

                value={historyFilter}
                // label="Age"
                onChange={handleHistoryFilterChange}
                MenuProps={menuProps}
                classes={{
                  select: classes.select,
                  icon: classes.selectIcon
                }}
              >
                {Object.values(historyFilterOptions).map(({ value, label }) => (
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
        <ul className="list-unstyled mb-0 list__table-list">
          {isFetching ? (
            <li className="history__list-item d-flex align-items-center justify-content-center p-5">
              <CircularProgress className="ms-1" color="inherit" size={32} />
            </li>
          ) : thisPageList.length > 0 ? (
            thisPageList.map((orderOrDonation, i) => {
              const isOrder = !!orderOrDonation?.total;
              if (isOrder)
                return (
                  <Accordion allowMultiple>
                    <OrderListItem
                      key={i}
                      order={orderOrDonation}
                      showDetails={showDetails}
                      activeList={activeList}
                    />
                  </Accordion>
                );
              return (
                <DonationListItem
                  key={i}
                  donation={orderOrDonation}
                  // showDetails={showDetails}
                  activeList={activeList}
                />
              );
            })
          ) : (
            <li className="list__table-list p-2 mb-0">No records to display</li>
          )}
        </ul>
        <div
          className="list__table__footer py-2 d-flex justify-content-center border-top"
          style={{ background: '#f8fafd78' }}
        >
          {totalPages > 1 && (
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                page={pageNo}
                onChange={handleClick}
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
  const disableHeader = order.length === 1;

  const AccordionItem = ({ header, hideChevron, disableButton, ...rest }) => {
    const isMobile = window.innerWidth <= 768; // Adjust the threshold for your mobile breakpoint

    return (
      <Item
        {...rest}
        disabled={disableButton}
        header={({ state: { isEnter: expanded } }) => (
          <>
            {header}{' '}
            {!hideChevron && !isMobile && (
              <img
                style={{ marginTop: '-50px' }}
                src={chevronDown}
                alt="Chevron Down"
                className={expanded ? 'chevron-rotate' : ''}
              />
            )}
          </>
        )}
      />
    );
  };

  let platformCost = (
    (order.platformFees / 100 + order.transactionFees / 100) * Number(order.subtotal) +
    0.3
  ).toFixed(2);
  let grandTotal = (Number(order.subtotal) + Number(platformCost)).toFixed(2);

  const { last4, CardBrand } = getCardInfoOrder(JSON.parse(order.paymentResponse));

  return (
    <AccordionItem
      className="d-flex flex-column px-sm-3 px-1"
      hideChevron={disableHeader}
      buttonProps={{ disabled: disableHeader }}
      header={
        <>
          <li className="w-100 history__list-item px-1 py-2">
            <div className="pb-2 d-flex flex-column">
              <div className="accordion__head d-flex align-items-center" style={{ height: '32px' }}>
                <span className="flex-grow-1 d-flex align-items-center rounded-3">
                  <img className="me-1" style={{ height: '21px' }} src={bag} alt="" />
                  <h6 className="price">
                    {order.currencySymbol ? order.currencySymbol : '$'}
                    {priceFormat(Number(grandTotal))}
                  </h6>
                  <span className="ml-6p text-light fs-7">
                    {order.currency ? order.currency : 'CAD'}
                  </span>
                </span>
                {/* <div className="chev-wrapper">
                  <img src={chevronDown} alt="Chevron Down" />
                </div> */}
                <div className="bg-lighter d-flex align-items-center rounded-3">
                  <div className="order__logo mx-1">
                    <img src={getCardIcon(CardBrand)} alt="" className="img-fluid" />
                  </div>
                  <div className="order__card fs-7">
                    <div className="d-flex align-items-center  fw-semibold pe-1">{last4}</div>
                  </div>
                </div>
              </div>
              <p
                className="fw-semibold"
                variant="link"
                // onClick={() => showDetails(order._id)}
              >
                Checkout #{order.uniqueTransactionId ? order.uniqueTransactionId : order._id}
              </p>
              <span className="fs-6 fw-regular text-light mt-3p">
                {moment(order.created_at).format(MOMENT_DATE_FORMAT)}
              </span>
            </div>
          </li>
        </>
      }
    >
      {/* {activeList.includes(order._id) && ( */}
      <OrderListActiveList
        order={order}
        platformCost={platformCost}
        CardBrand={CardBrand}
        last4={last4}
      />
      {/* )} */}
    </AccordionItem>
  );
};

const DonationListItem = ({ donation, activeList }) => {
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
        <li className="history__list-item px-sm-5 px-3 py-2 border-bottom">
          <div className="pb-2">
            <div className="d-flex align-items-center">
              <div className="d-flex flex-grow-1" style={{ height: '32px' }}>
                <span className="d-flex align-items-center rounded-3">
                  <img alt="" className="me-1" style={{ height: '21px' }} src={coin}></img>
                  <h6 className="price">
                    {donation.currencySymbol ? donation.currencySymbol : '$'}
                    {priceFormat(Number(grandTotal))}
                  </h6>
                  <span className="ml-6p text-light fs-7">
                    {donation.currency ? donation.currency : 'CAD'}
                  </span>
                  {/* <span className="ms-2 text-info fw-bold flex-grow-1">{donation?.xp} XP</span> */}
                </span>
                <Link
                  to={'/organization/' + donation.organizationId?.slug}
                  className="ms-auto d-flex justify-content-end"
                >
                  {' '}
                  {/* <ListItemImg
                    size={64}
                    imgSrc={helper.CampaignAdminLogoFullPath + donation?.organizationId?.logo}
                    className="history__avatar me-4 charity_avatar_bg"
                  /> */}
                </Link>
              </div>
              <div className="ms-auto bg-lighter d-flex align-items-center rounded-3">
                <div className="order__logo mx-1">
                  <img src={getCardIcon(CardBrand)} alt="" className="img-fluid" />
                </div>
                <div className="order__card fs-7">
                  <div className="d-flex align-items-center  fw-semibold pe-1">{last4}</div>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <p
                className="fw-semibold"

                // onClick={() => showDetails(donation._id)}
              >
                {donation?.organizationId?.name} #
                {donation.uniqueTransactionId ? donation.uniqueTransactionId : donation._id}
              </p>
            </div>
            <div className="fw-regular fs-6 text-light mt-3p">
              {moment(donation.created_at).format(MOMENT_DATE_FORMAT)}
            </div>
          </div>

          {
            // this isn't really necessary, doesn't show any extra info, but it looks nice
            activeList.includes(donation._id) && (
              <></>
              // <DonationListActiveList donation={donation} CardBrand={CardBrand} last4={last4} />
            )
          }
        </li>
      ) : (
        //PROJECT:
        <li className="history__list-item px-sm-5 px-3 py-2 border-bottom">
          <div className="pb-2 d-flex flex-column">
            <div className="d-flex align-items-center">
              <div className="d-flex flex-grow-1" style={{ height: '32px' }}>
                <span className="d-flex align-items-center rounded-3">
                  <img alt="" className="me-1" style={{ height: '21px' }} src={coin2}></img>
                  <h6 className="price ">
                    {donation.currencySymbol ? donation.currencySymbol : '$'}
                    {priceFormat(Number(grandTotal))}
                  </h6>
                  <span className="ml-6p text-light fs-7">
                    {donation.currency ? donation.currency : 'CAD'}
                  </span>
                  {/* <span className="ms-2 text-info fw-bold flex-grow-1">{donation?.xp} XP</span> */}
                </span>
                <Link
                  to={'/organization/' + donation.organizationId?.slug}
                  className="ms-auto d-flex justify-content-end"
                >
                  {' '}
                  <ListItemImg
                    size={64}
                    imgSrc={helper.CampaignAdminLogoFullPath + donation?.organizationId?.logo}
                    className="history__avatar me-4 charity_avatar_bg"
                  />
                </Link>
              </div>
              <div className="ms-auto bg-lighter d-flex align-items-center rounded-3">
                <div className="order__logo mx-1">
                  <img src={getCardIcon(CardBrand)} alt="" className="img-fluid" />
                </div>
                <div className="order__card fs-7">
                  <div className="d-flex align-items-center  fw-semibold pe-1">{last4}</div>
                </div>
              </div>
            </div>
            <div className="d-flex">
              <p
                className="fw-semibold"
                // onClick={() => showDetails(donation._id)}
              >
                {donation?.organizationId?.name} #{' '}
                {donation.uniqueTransactionId ? donation.uniqueTransactionId : donation._id}
              </p>
            </div>
            <div className="fw-regular fs-6 text-light mt-3p">
              {moment(donation.created_at).format(MOMENT_DATE_FORMAT)}
            </div>
            <div className="d-flex mt-2">
              <Link
                to={donation.type === 'CROWDFUNDING' ? '/crowdfunding/' + donation.crowdfundingDetails?.slug : '/project/' + donation.projectDetails?.slug}
                className="fw-semibold bg-lighter px-1 py-1 rounded-3"
              >
                {donation.type === 'CROWDFUNDING'
                  ? `Fundraiser: ${donation.crowdfundingDetails?.name}`
                  : `Project: ${donation.projectDetails?.name}`}
              </Link>
            </div>
          </div>
          {/* {
            // this isn't really necessary, doesn't show any extra info, but it looks nice
            activeList.includes(donation._id) && (
              <DonationListActiveList donation={donation} CardBrand={CardBrand} last4={last4} />
            )
          } */}
        </li>
      )}
    </>
  );
};

const DonationListActiveList = ({ donation, CardBrand, last4 }) => {
  return (
    <ul className="history__list list-unstyled ms-1 mt-2">
      <OrderListTransaction createdAt={donation.created_at} CardType={CardBrand} last4={last4} />
    </ul>
  );
};

const OrderListActiveList = ({ order, platformCost, CardBrand, last4 }) => {
  return (
    <ul className="history__list list-unstyled d-flex flex-column ms-1 pe-1 gap-4">
      {order.orderItems.length > 0 &&
        order.orderItems.map((item, key) => (
          <PurchaseListItem key={key} order={order} item={item} />
        ))}
      <div className="d-flex flex-column">
        <div className="d-flex justify-content-start align-items-center py-1">
          <Link to="/pricing" className="fw-semibold fs-7 text-light">
            Service Charge:
          </Link>
          <span className="ms-auto fw-semibold text-light fs-6">
            {order.currencySymbol + platformCost}
          </span>
        </div>
        <div className="d-flex align-items-center mb-1">
          <div className="fw-semibold fs-7 text-light flex-grow-1">Subtotal:</div>
          <span className="fw-bold fs-6">
            {order.currencySymbol + parseFloat(order.subtotal).toFixed(2)}
          </span>
        </div>
      </div>

      <div className="d-flex flex-column gap-2 mb-3 pt-3 border-top">
        <div className="d-flex justify-content-between">
          {' '}
          <div className="fw-bold fs-6 text-light flex-grow-1">Total Charge:</div>
          <h6>{order.currencySymbol + parseFloat(order.total).toFixed(2)}</h6>
        </div>

        <OrderListTransaction createdAt={order.created_at} CardType={CardBrand} last4={last4} />
      </div>
    </ul>
  );
};

const PurchaseListItem = ({ order, item }) => {
  return (
    <li className="d-sm-flex align-items-center px-sm-0 py-sm-2 pb-2 border-bottom">
      <div className="d-flex align-items-start mb-2 mb-sm-0 flex-grow-1">
        <ListItemImg
          size={68}
          imgSrc={helper.CampaignProductImagePath + item.productImage}
          style={{ border: 'unset', background: 'unset' }}
        />
        <div className="ms-2 order__id">
          <Link
            to={'/item/' + item.itemDetails?.slug}
            variant="link"
            className=" fw-bold p-0 mb-3p"
          >
            {item.quantity} {item.itemDetails?.headline}
          </Link>
          <div className="fs-6 text-light mb-3p">{item.itemDetails?.campaignadminsDetails?.name}</div>
          <h6 className="price">
            {order.currencySymbol ? order.currencySymbol : '$'}{' '}
            {priceFormat(Number(item.productPrice))}
          </h6>
        </div>
      </div>
      {/* <ListItemImg
        size={54}
        style={{ maxWidth: 'auto !important' }}
        className="me-0 me-sm-3 img--nobg"
        imgSrc={helper.CampaignAdminLogoPath + item?.itemDetails?.campaignadminsDetails.logo}
      /> */}
      <div className="order__values flex-column gap-2 d-flex align-items-end py-1">
        <span className="fs- text-info fw-bold flex-grow-1">{item.xp ? item.xp : 0} xp</span>
        <span className="fs-5 fw-bold ms-2" style={{ width: '80px', textAlign: 'end' }}>
          {order.currencySymbol ? order.currencySymbol : '$'}
          {priceFormat(Number(item.productPrice * item.quantity))}
        </span>
      </div>
    </li>
  );
};

const OrderListTransaction = ({ createdAt, CardType, last4 }) => {
  return (
    <li className="order__transaction pb-2">
      <div className="bg-lighter d-flex align-items-center pt-20p pb-20p px-2 rounded-3">
        <div className="order__logo mx-1 me-2">
          <img src={getCardIcon(CardType)} alt="" className="img-fluid" />
        </div>
        <div className="order__card fs-7">
          <div className="fs-6 fw-semibold">XXXX XXXX XXXX {last4}</div>
          <div className="text-light fw-semibold">
            <div>Transaction: {moment(createdAt).format(MOMENT_DATE_FORMAT)}</div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default HistoryList;
