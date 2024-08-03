import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Container, Button } from 'react-bootstrap';
import Logo from '../Component/atoms/logo';
import ListItemImg from '../Component/atoms/list-item-img';
import receipt from '../../../assets/images/receipt.svg';
import helper, { getCalculatedPrice, priceFormat } from '../../../Common/Helper';
import { Link } from 'react-router-dom';
import Toggle from '../Component/organisms/toggle';

import './style.scss';

const Cart = (props) => {
  let cartItem = props.cartItem;
  //const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  //const [salesTax, setSalesTax] = useState(0);
  let transactionFee = props.pricingFees?.transactionFee;
  let platformFee = props.pricingFees?.platformFee;
  let platformCost = ((platformFee / 100 + transactionFee / 100) * Number(subTotal) + 0.3).toFixed(
    2
  );
  let grandTotal = (parseFloat(subTotal) + parseFloat(platformCost)).toFixed(2);
  //let totalCharge = Number(transactionFee) + Number(platformFee);
  const getCalc = getCalculatedPrice();
  let currencySymbol = getCalc.currencySymbol();

  const onQtyChange = async (value, id, productId) => {
    console.log({ value, id });
    // if (value.length < 1 || value === '0') {
    //   value = 1;
    // }
    await props.updateCartItem(value, id, productId, 'plus');
  };

  const minusValue = async (value, id, productId) => {
    if (value > 1) {
      value--;
      await props.updateCartItem(value, id, productId, 'minus');
    }
    // setQuantity(value)
  };

  const plusValue = async (value, id, productId) => {
    value++;
    // setQuantity(value)
    await props.updateCartItem(value, id, productId, 'plus');
  };

  useEffect(() => {
    if (props.cartItem.length > 0) {
      let tempPriceArray = [];
      props.cartItem.map((item) => {
        // let price = Math.round(item.productDetails?.price + (totalCharge / 100) * item.productDetails?.price)
        // let price = getCalc.getData(item.productDetails?.price);
        let price = item.productDetails?.displayPrice
          ? item.productDetails?.displayPrice
          : item.productDetails?.price;

        tempPriceArray.push(price * item.quantity);
      });
      // console.log(tempPriceArray)
      let sum = tempPriceArray.reduce(function (a, b) {
        return a + b;
      }, 0);
      setSubTotal(sum);

      // console.log(getCalc.getTaxValueOfPrice(sum))
      // let salesTax = getCalc.calculateSalesTax(sum)
      //(getCalc.getTaxValueOfPrice(sum));
      // setTotal(sum + salesTax);
      //setTotal(getCalc.priceWithTax(sum));
    }
  }, [props.cartItem]);

  return (
    <Container fluid className="cart__page py-sm-5 mw-1280">
      <header className="pt-sm-5">
        <div className="logo__wrap pb-sm-3 d-flex gap-2">
          <Logo />
          <Toggle />
        </div>
        <div className="cart__steps d-flex fs-7 pt-3 pt-sm-0">
          <Link
            to="/cart"
            variant="link"
            className="p-0 me-1 fw-normal text-dark fs-7 text-decoration-none"
          >
            Cart
            <FontAwesomeIcon icon={regular('chevron-right')} className="ms-1" />
          </Link>
          <Link to="/checkout" variant="link" className="me-1 text-light">
            Checkout
            <FontAwesomeIcon icon={regular('chevron-right')} className="ms-1" />
          </Link>
          <span className="p-0 me-1 fw-normal text-light fs-7">
            Order
            <FontAwesomeIcon icon={regular('chevron-right')} className="ms-1" />
          </span>
        </div>
      </header>
      {cartItem && cartItem.length > 0 ? (
        <div className="pt-20p">
          <div className="pt-20p pb-12p">
            <ul className="list-unstyled d-flex flex-column gap-4 border-bottom mb-0">
              {cartItem.map((item, i) => {
                // let price = Math.round(item.productDetails?.price + (totalCharge / 100) * item.productDetails?.price)
                // let price = getCalc.getData(item.productDetails?.price)

                return (
                  <li className="d-flex flex-wrap flex--sm-nowrap align-items-start py-2 border-bottom pb-5" key={i}>
                    <div className="d-flex align-items-start mb-2 mb-sm-0 flex-grow-1">
                      <ListItemImg
                        size={75}
                        imgSrc={helper.CampaignProductImagePath + item?.productDetails?.image}
                        className="list__item-img avatar__checkout"
                      />
                      <div className="ms-2">
                        <Link
                          variant="link"
                          to={'/item/' + item?.productDetails?.slug}
                          className=" fw-bolder p-0 mb-3p fs-4"
                        >
                          {item?.productDetails?.headline}
                        </Link>
                        <div className="text-light mb-1 fs-6">
                          {item?.productDetails?.organizationDetails.name}
                        </div>
                        <Button
                          variant="link"
                          className="btn__remove p-0 fs-7 text-decoration-none"
                          onClick={() => props.removeCartItem(item._id)}
                        >
                          remove
                        </Button>
                      </div>
                    </div>

                    <div className="d-flex align-items-center flex-grow-sm-0 flex-grow-1 justify-content-start justify-content-sm-end ">
                      {item.productDetails?.tax && (
                        <div className="checkout__tax p-1 d-flex align-items-center justify-content-center order-sm-0 order-1">
                          <FontAwesomeIcon icon={solid('receipt')} className="text-primary fs-4" />
                          {/* <img alt="receipt" height="24" src={receipt}></img> */}
                        </div>
                      )}
                      <Link
                        className="d-flex align-items-center justify-content-center"
                        to={'/organization/' + item?.productDetails?.organizationDetails.slug}
                      ></Link>

                      <span className="cart_controller d-none align-items-center fw-bold text-subtext flex-grow-1 flex-sm-grow-0">
                        {/*<span className="mr-6p d-none d-sm-block">Qty:</span>{' '}*/}
                        <Button
                          variant="link"
                          className="text-decoration-none btn__link-light p-0 m-2 fs-4"
                          onClick={() =>
                            minusValue(item?.quantity, item._id, item?.productDetails?._id)
                          }
                        >
                          <FontAwesomeIcon icon={regular('angle-down')} />
                        </Button>
                        <input
                          type="text"
                          className="qty__input"
                          id={item._id}
                          value={item?.quantity}
                          onChange={(e) =>
                            onQtyChange(e.target.value, item._id, item?.productDetails?._id)
                          }
                          onBlur={() => {
                            console.log('OnBlur');
                            props.refreshCart();
                          }}
                        />
                        <Button
                          variant="link"
                          className="text-decoration-none btn__link-light p-0 m-2 fs-4"
                          onClick={() =>
                            plusValue(item?.quantity, item._id, item?.productDetails?._id)
                          }
                        >
                          <FontAwesomeIcon icon={regular('angle-up')} />
                        </Button>
                      </span>
                      <h6
                        className="text-start text-sm-end"
                        style={{ minWidth: '90px' }}
                      >
                        {currencySymbol +
                          // priceFormat(getCalc.getData(item.productDetails?.price) * item.quantity)
                          priceFormat(
                            (item.productDetails?.displayPrice
                              ? item.productDetails?.displayPrice
                              : item.productDetails?.price) * item.quantity
                          )}
                      </h6>
                    </div>
                  </li>
                );
              })}
            </ul>

            <div className="d-flex align-items-center pt-3">
              <span className="fw-bolder flex-grow-1">Subtotal:</span>
              <h6 className="">{currencySymbol + priceFormat(subTotal)}</h6>
            </div>
            <div className="d-flex align-items-center py-3 border-bottom">
              <Link to="/pricing" className="fw-semibold fs-7 text-light flex-grow-1">
                Service Charge:
              </Link>
              <span className="text-light fw-semibold">{currencySymbol + platformCost}</span>
            </div>

            {/*<div className="d-flex align-items-center py-3 border-bottom">
              <span className="fw-bolder flex-grow-1">
                <img
                  className="img-stripe "
                  src=""
                  alt=""
                  style={{ width: '44px' }}
                />
              </span>
              <span className="price ">{currencySymbol + salesTax}</span>
            </div>*/}
            {/* <div className="d-flex align-items-center py-3 border-bottom">
              <span className="fw-bolder flex-grow-1">Sales Tax:</span>
              <span className="fw-bold text-success fs-5">
                {currencySymbol + priceFormat(salesTax)}
              </span>
            </div> */}
          </div>
          <div className="d-flex align-items-center py-1">
            <span className="fw-bolder flex-grow-1">Total:</span>
            <span className="fw-bold fs-4">
              {' '}
              {currencySymbol +
                (grandTotal
                  ? Number(grandTotal).toFixed(2).toLocaleString('en-US', {
                      maximumFractionDigits: 2
                    })
                  : 0)}
            </span>
          </div>
          <div className="d-flex py-4 border-bottom d-grid flex-column flex-sm-row">
            <Button
              variant="danger"
              size="lg"
              className="fw-bold fs-6 my-2 my-sm-0"
              onClick={() => props.clearCart()}
            >
              Clear Cart
            </Button>
            <Button
              size="lg"
              className="fw-bold fs-6 ms-0 ms-sm-2"
              onClick={() => props.checkout()}
            >
              Proceed to Checkout
            </Button>
          </div>
        </div>
      ) : (
        <div className="pt-20p">
          <hr />
          <Link size="lg" to="/" className="fw-bold fs-6 ms-0 ms-sm-2">
            Add Product
          </Link>
          <hr />
        </div>
      )}

      <footer className="py-3 py-sm-2">
        <ul className="d-flex align-items-center justify-content-center justify-content-sm-start list-unstyled fs-7">
          <li className="me-3">
            <a href="/donorport-refund-policy" className="text-subtext">
              Refund policy
            </a>
          </li>
          <li className="me-3">
            <a href="/privacy" className="text-subtext">
              Privacy policy
            </a>
          </li>
          <li>
            <a href="/terms" className="text-subtext">
              Terms of service
            </a>
          </li>
        </ul>
      </footer>
    </Container>
  );
};

export default Cart;
