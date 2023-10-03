import { Button } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';

// import { ListItemImg } from "@components/atoms";
import ListItemImg from '../../atoms/list-item-img';
import helper, { priceFormat } from '../../../../../Common/Helper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link } from 'react-router-dom';
import './style.scss';

const SummaryContent = (props) => {
  let cartItem = props.cartItem;
  // let total = props.CalculatedPrice.getData(props.total)
  let total = props.total;
  let salesTax = props.salesTax;
  let subtotal = props.subtotal;
  let salesTaxPer = props.salesTaxPer;
  let transactionFee = props.transactionFee;
  let platformFee = props.platformFee;
  //let platformCost = ((props.platformFee / 100) * Number(subtotal)).toFixed(2);
  //let grandTotal = (Number(subtotal) + Number(platformCost)).toFixed(2);

  let platformCost = ((platformFee / 100 + transactionFee / 100) * Number(subtotal) + 0.3).toFixed(
    2
  );
  let grandTotal = (Number(subtotal) + Number(platformCost)).toFixed(2);

  // let transactionFee = props.pricingFees?.transactionFee
  // let totalCharge = Number(transactionFee) + Number(platformFee)

  return (
    <div className="summary__content">
      <div className="pt-20p pb-12p">
        <ul className="list-unstyled pb-1 border-bottom mb-0">
          {cartItem &&
            cartItem.length > 0 &&
            cartItem.map((item, i) => {
              // let price = Math.round(item.productDetails?.price + (totalCharge / 100) * item.productDetails?.price)
              // let price = props.CalculatedPrice(item.productDetails?.price)

              return (
                <li className="d-flex align-items-start py-2" key={i}>
                  <div className="d-flex align-items-center mb-2 mb-sm-0 flex__1">
                    <div className="position-relative">
                      <ListItemImg
                        size={75}
                        imgSrc={helper.CampaignProductImagePath + item?.productDetails?.image}
                        className="avatar__checkout border"
                      />
                      <span className="badge item__img-badge fw-bold">{item.quantity}</span>
                    </div>

                    <div className="d-flex flex-column ms-2 justify-content-start">
                      <Link
                        variant="link"
                        to={'/item/' + item?.productDetails?.slug}
                        className=" text-start fw-bolder p-0 mb-3p fs-4"
                      >
                        {item?.productDetails?.headline}
                      </Link>
                      <a
                        href={'/organization/' + item?.productDetails?.organizationDetails?.slug}
                        className="text-light mb-1"
                      >
                        {item?.productDetails?.organizationDetails?.name}
                      </a>
                      <Button
                        variant="link"
                        className="btn__remove p-0 fs-7 text-decoration-none text-start"
                        onClick={() => props.removeCartItem(item._id)}
                      >
                        remove
                      </Button>
                    </div>
                  </div>
                  {item.productDetails?.tax && (
                    <div className="checkout__tax p-1 d-flex align-items-center justify-content-center">
                      <FontAwesomeIcon icon={solid('paperclip')} className="text-info fs-4" />
                    </div>
                  )}
                  <span className="checkout__subtotal--price text-end mt-6p fs-5 fw-bold text-light ms-3 fs-sm-4 fs-4">
                    {props.currencySymbol +
                      // priceFormat(
                      //   props.CalculatedPrice.getData(item.productDetails?.price) * item.quantity

                      // )

                      priceFormat(
                        (item.productDetails?.displayPrice
                          ? item.productDetails?.displayPrice
                          : item.productDetails?.price) * item.quantity
                      )}
                  </span>
                </li>
              );
            })}
        </ul>

        <div className=" py-3 border-bottom">
          <div className="d-flex align-items-center pb-20p">
            <span className="fw-bolder flex__1">Subtotal:</span>
            <span className="fw-bold text-light fs-5">
              {props.currencySymbol + priceFormat(subtotal)}
            </span>
          </div>
          <div className="d-flex align-items-center pb-20p">
            <Link to="/pricing" className="fw-semibold fs-7 text-light flex__1">
              Service Charge:
            </Link>
            <span className="fw-bold text-light fs-5">
              {props.currencySymbol + priceFormat(platformCost)}
            </span>
          </div>
          {/*    <div className="d-flex align-items-center pb-20p">
            <span className="fw-bolder flex__1">Merchant Fee</span>
            <span className="fw-bold fs-5 text-light">{props.currencySymbol + props.salesTax}</span>
          </div>*/}
          <div className="d-flex align-items-center">
            <span className="fw-bolder flex__1">XP</span>
            <span className="fw-bold text-info">
              {Number(props.xp).toLocaleString('en-US', {
                maximumFractionDigits: 2
              })}{' '}
              xp
            </span>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-center pt-1 pb-2">
        <span className="fw-bolder flex__1">Total:</span>
        {/* <span className="text-subtext me-2 fs-7">USD</span> */}
        <span className="fw-bold text-light fs-4">
          {/* {props.currencySymbol + priceFormat(total ? total : 0)} */}
          {props.currencySymbol + priceFormat(grandTotal)}
        </span>
      </div>
      {cartItem.findIndex((p) => p?.productDetails?.tax) !== -1 ? (
        <div className="checkout__legend d-flex my-3 fs-7 p-2">
          <FontAwesomeIcon icon={solid('paperclip')} className="fs-4 text-info me-1" />
          <span style={{ lineHeight: '2' }}>
            You'll receive a tax deductabile receipt for this donation.
          </span>
        </div>
      ) : (
        <></>
      )}
      <div className="note note--info px-0 text-start">
        The organization(s) will receive the exact amount required to purchase each unit including
        local sales tax. Your donation is not a gift-in-kind transaction. No physical goods are
        ordered or delivered to the organization upon the completion of the sale.{' '}
        <a href="/pricing">Click here</a> to learn more. Service charges are not tax deductible.
        <br />
        <br />
        {/*  <div className="d-flex">
          <FontAwesomeIcon icon={solid('shield-halved')} className="fs-6 text-info me-2" />
          <span>
            {' '}
            Your donation is gauranteed under our <a href="/">Giving Gaurantee.</a>
          </span>
        </div>*/}
        <br />
      </div>
    </div>
  );
};
export default SummaryContent;
