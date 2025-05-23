import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Container, Button, Form } from 'react-bootstrap';

// import { Logo, Avatar } from "@components/atoms";
import Logo from '../Component/atoms/logo';
import Avatar from '../Component/atoms/avatar';
import SummaryContent from '../Component/organisms/summary-content';
import useWindowSize from '../../../hooks/device-check';
import { useSelector } from 'react-redux';
//import styled from 'styled-components';
import './style.scss';
import { Link } from 'react-router-dom';
//import { sortedLastIndex } from 'lodash';
import { CircularProgress } from '@mui/material';
//import Slider from '@material-ui/core/Slider';
//import TextField from '@material-ui/core/TextField';
//import InputAdornment from '@material-ui/core/InputAdornment';
import { priceFormat } from '../../../Common/Helper';
import mastercard from '../../../assets/images/mastercard.svg';
import visa from '../../../assets/images/visa.svg';
import amex from '../../../assets/images/amex.svg';
import discover from '../../../assets/images/discover.svg';
import stripe from '../../../assets/images/stripe-badge.svg';
import Toggle from '../Component/organisms/toggle';

const CheckoutNoSession = (props) => {
  // const user = useSelector((state) => state.user);
  let subtotal = props.subtotal;
  let total = props.total;
  let cartItem = props.cartItem;

  console.log('PROPS', props);
  let transactionFee = props.transactionFee;
  let platformFee = props.platformFee;
  let platformCost = ((platformFee / 100 + transactionFee / 100) * Number(subtotal) + 0.3).toFixed(
    2
  );
  let grandTotal = (Number(subtotal) + Number(platformCost)).toFixed(2);

  const [summary, showSummary] = useState(false);
  const isTab = useWindowSize() <= 991;
  const summaryElementRef = useRef(null);
  let stateData = props.stateData;
  const userAuthToken = localStorage.getItem('userAuthToken');
  const userData = JSON.parse(localStorage.getItem('userData'));

  //const [show, setShow] = useState(false);

  //const showInput = () => {
  //setShow(true);
  //};
  //const hideInput = () => {
  //setShow(fa,lse);
  //};

  //const [value, setValue] = useState('');
  //const addCommas = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  //const removeNonNumeric = (num) => num.toString().replace(/[^0-9]/g, '');

  //const handleChange = (event) => setValue(addCommas(removeNonNumeric(event.target.value)));
  // console.log(summaryElementRef.current?.clientHeight);
  //const marks = [
  //{ value: 0, label: '0%' },
  //{ value: 5, label: '' },
  //{ value: 10, label: '' },
  //{ value: 15, label: '' },
  //{ value: 20, label: '' },
  //{ value: 25, label: '' },
  //{ value: 30, label: '30%' }
  //];

  return (
    <div className="checkout__page">
      {isTab ? (
        <>
          <div className="logo__wrap d-flex gap-2 pb-lg-3 p-20p border-bottom">
            <Logo />
            <Toggle />
          </div>
          <div
            className="order-summary d-flex d-lg-none p-20p border-bottom"
            onClick={() => showSummary(!summary)}
          >
            <div className="d-flex align-items-center flex-grow-1">
              <FontAwesomeIcon icon={regular('cart-shopping')} className="me-2" />
              <span>{summary ? 'Hide' : 'Show'} order summary</span>
              <span className={`d-block rotate__icon ms-2 ${summary ? 'rotate-180' : ''}`}>
                <FontAwesomeIcon icon={regular('chevron-down')} />
              </span>
            </div>

            <h6>{props.currencySymbol + priceFormat(total)}</h6>
          </div>

          <div
            className="mobile__summary"
            style={{
              height: summary ? summaryElementRef.current?.clientHeight + 'px' : '0'
            }}
          >
            <div ref={summaryElementRef} className="summary__section px-2 pe-s-4 pt-0">
              <SummaryContent
                currencySymbol={props.currencySymbol}
                cartItem={cartItem}
                total={props.total}
                removeCartItem={props.removeCartItem}
                CalculatedPrice={props.CalculatedPrice}
                xp={props.xp}
                salesTax={props.salesTax}
                subtotal={props.subtotal}
                salesTaxPer={props.salesTaxPer}
                transactionFee={props.transactionFee}
                stripeTax={props.stripeTax}
                platformFee={props.platformFee}
              />
            </div>
          </div>
        </>
      ) : (
        ''
      )}

      <Container fluid className="d-flex flex-column flex-lg-row mw-1280">
        <div className="checkout__section py-lg-5">
          <header className="pt-sm-5">
            <div className="logo__wrap pb-sm-3 d-none d-lg-flex gap-2">
              <Logo />
              <Toggle />
            </div>
            <div className="cart__steps d-flex fs-7 pt-3 pt-sm-0">
              <Link
                to="/cart"
                variant="link"
                className="p-0 me-1 fw-normal text-light fs-7 text-decoration-none"
              >
                Cart
                <FontAwesomeIcon icon={regular('chevron-right')} className="ms-1" />
              </Link>
              <span className="me-1 text-dark">
                Checkout
                <FontAwesomeIcon icon={regular('chevron-right')} className="ms-1" />
              </span>
              <span className="p-0 me-1 fw-normal text-light fs-7">
                Order
                <FontAwesomeIcon icon={regular('chevron-right')} className="ms-1" />
              </span>
            </div>
          </header>
          <div className="note note--user d-flex align-items-center justify-content-between mt-5 mb-3">
               <Form.Group className="mb-3">
                  <Form.Label for="ccnumber" className="fw-bold  fs-7">
                    Email
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="email"
                    size="lg"
                    className='w-full block'
                    placeholder="your@email.com"
                    value={stateData.email}
                    name="email"
                    onChange={(e) => props.changevalue(e)}
                  />
                  {stateData.error && stateData.error.email && (
                    <p className="error">
                      {stateData.error
                        ? stateData.error.email
                          ? stateData.error.email
                          : ''
                        : ''}
                    </p>
                  )}
                </Form.Group>
          </div>

          <div className="py-20p" style={{ maxWidth: '480px' }}>
            {/* <div className="mb-20p pt-1">
              <div className="ex__checkout d-flex align-items-center flex-column flex-md-row gap-2 p-2 position-relative border rounded-3">
                <div className="group__label fw-bold">Express Checkout</div>
                <Button className="btn__checkout rounded-2 flex-grow-1">
                  <img
                    className="img-fluid"
                    src=""
                    alt=""
                  />
                </Button>
                <Button className="btn__checkout rounded-2 google flex-grow-1">
                  <img
                    className="img-fluid"
                    src=""
                    alt=""
                  />
                </Button>
                <Button className="btn__checkout rounded-2 paypal flex-grow-1">
                  <img
                    className="img-fluid"
                    src=""
                    alt=""
                  />
                </Button>
              </div>
      </div>

            <div className="or__divider text-light fs-7 py-1 mb-2">
              <span className="or__divider-text">OR</span>
            </div>

            <div className="pt-1 mb-20p">
              <div className="crypto__section d-flex  align-items-center flex-column flex-md-row justify-content-between position-relative gap-2 p-2 border rounded-3">
                <div className="group__label fw-bold">Cryptocurrency</div>
                <label className="btn__crypto d-flex align-items-center">
                  <Form.Check type="checkbox" className="fs-7" />
                  <img
                    className="crypto__icon ms-1"
                    src=""
                    alt=""
                  />
                  <span>USD Coin</span>
                </label>
                <label className="btn__crypto d-flex align-items-center">
                  <Form.Check type="checkbox" className="fs-7" />
                  <img
                    className="crypto__icon ms-1"
                    src=""
                    alt=""
                  />
                  <span>Bitcoin</span>
                </label>
                <label className="btn__crypto d-flex align-items-center">
                  <Form.Check type="checkbox" className="fs-7" />
                  <img
                    className="crypto__icon ms-1"
                    src=""
                    alt=""
                  />
                  <span>Ethereum</span>
                </label>
              </div>
            </div>

            <div className="or__divider text-light fs-7 py-1 mb-20p">
              <span className="or__divider-text">OR</span>
            </div>
          */}
            <div className="checkout__block border rounded-3 mb-20p">
              <div className="checkout__block-hd d-sm-flex align-items-center border-bottom">
                {/* <div className="flex-grow-1 fw-boler fs-5 fw-bold mb-2 mb-sm-0">Credit card</div>*/}
                <div className="checkout__cards d-flex align-items-center rounded-bottom-start-3 rounded-bottom-end-3">
                  <img src={mastercard} alt="" className="checkout__svg" />
                  <img src={visa} alt="" className="checkout__svg" />
                  <img src={amex} alt="" className="checkout__svg" />
                  <img src={discover} alt="" className="checkout__svg" />
                  <span className="fs-7 text-light">and more...</span>
                </div>
              </div>
              <div className="checkout__block-bd">
                <Form.Group className="mb-3">
                  <Form.Label for="ccnumber" className="fw-bold  fs-7">
                    Card Number
                  </Form.Label>
                  <Form.Control
                    type="text"
                    id="ccnumber"
                    size="lg"
                    placeholder="XXXX XXXX XXXX 1234"
                    value={stateData.cardNumber}
                    name="cardNumber"
                    onChange={(e) => props.changevalue(e)}
                    maxLength={16}
                  />
                  {stateData.error && stateData.error.cardNumber && (
                    <p className="error">
                      {stateData.error
                        ? stateData.error.cardNumber
                          ? stateData.error.cardNumber
                          : ''
                        : ''}
                    </p>
                  )}
                </Form.Group>

                <div className="d-sm-flex gap-3 align-items-center">
                  <Form.Group className="mb-3 flex-grow-1">
                    <Form.Label for="ccmonth" className="fw-bold  fs-7">
                      Exp Month
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id="ccmonth"
                      size="lg"
                      placeholder="••"
                      autocomplete="cc-exp-month"
                      value={stateData.cardExpMonth}
                      name="cardExpMonth"
                      onChange={(e) => props.changevalue(e)}
                    />
                    {stateData.error && stateData.error.cardExpMonth && (
                      <p className="error">
                        {stateData.error
                          ? stateData.error.cardExpMonth
                            ? stateData.error.cardExpMonth
                            : ''
                          : ''}
                      </p>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3 flex-grow-1">
                    <Form.Label className="fw-bold  fs-7">Exp Year</Form.Label>
                    <Form.Control
                      type="text"
                      size="lg"
                      placeholder="••"
                      autocomplete="cc-exp-year"
                      value={stateData.cardExpYear}
                      name="cardExpYear"
                      onChange={(e) => props.changevalue(e)}
                    />
                    {stateData.error && stateData.error.cardExpYear && (
                      <p className="error">
                        {stateData.error
                          ? stateData.error.cardExpYear
                            ? stateData.error.cardExpYear
                            : ''
                          : ''}
                      </p>
                    )}
                  </Form.Group>
                  <Form.Group className="mb-3 flex-grow-1">
                    <Form.Label for="cccvv" className="fw-bold  fs-7">
                      CVC/CCV
                    </Form.Label>
                    <Form.Control
                      type="text"
                      id="cccvv"
                      size="lg"
                      placeholder="•••"
                      autocomplete="cc-csc"
                      value={stateData.cardCVC}
                      name="cardCVC"
                      onChange={(e) => props.changevalue(e)}
                    />
                    {stateData.error && stateData.error.cardCVC && (
                      <p className="error">
                        {stateData.error
                          ? stateData.error.cardCVC
                            ? stateData.error.cardCVC
                            : ''
                          : ''}
                      </p>
                    )}
                  </Form.Group>
                </div>

                <div className="d-flex aling-items-center py-8">
                  {/*}  <Form.Check type="checkbox" className="fs-4 lh-1" />
                  <span className="fs-7 text-subtext d-flex align-items-center lh-1 h-auto ms-1">
                    Pay with this card
      </span>*/}
                </div>
              </div>
            </div>

            {/* <div className="pb-4 pt-2">
              <div className="d-flex">
                <h5 className="project__detail-sublabel mb-2 fw-bolder">Help Donorport</h5>
                <FontAwesomeIcon icon={regular('heart')} className="fs-6 ms-1" />
              </div>

              <div>
                Donorport is run by a small group of volunteers and relies on the genorosity of
                donors like you to stay up and running. Tips are not tax deductible but are used to
                cover site maitenance costs.
              </div>
            </div> */}

            {/* <div className="d-flex flex-column" style={{ height: '125px' }}>
              {!show && (
                <div className="d-flex flex-column mt-5 flex-grow-1">
                  <StyledSlider className="px-4">
                    <Slider
                      className="tip__slider"
                      defaultValue={0}
                      step={5}
                      marks={marks}
                      min={0}
                      max={30}
                      valueLabelDisplay="on"
                      valueLabelFormat={(value) => (
                        <div className="tip__label d-flex fs-5 fw-bold text-light">
                          <div>
                            $
                            {((value / 100) * subtotal).toLocaleString('en-US', {
                              maximumFractionDigits: 2
                            })}
                          </div>
                          <span className="ms-1 fs-7 fw-semibold">({value}%)</span>
                        </div>
                      )}
                    />
                  </StyledSlider>

                  <a
                    style={{ marginTop: 'auto' }}
                    href="javascript:;"
                    onClick={() => {
                      showInput();
                    }}
                  >
                    Custom Tip
                  </a>
                </div>
              )}
              {show && (
                <div className="d-flex flex-column flex-grow-1">
                  <StyledInput>
                    <TextField
                      value={value}
                      onChange={handleChange}
                      helperText="Enter a tip amount"
                      id="outlined-tel"
                      variant="outlined"
                      type="tel"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">{props.currencySymbol}</InputAdornment>
                        )
                      }}
                    />
                  </StyledInput>
                  <a
                    href="javascript:;"
                    className="link"
                    style={{ marginTop: 'auto' }}
                    onClick={() => {
                      hideInput();
                    }}
                  >
                    Back to slider
                  </a>
                </div>
              )}
            </div> */}
            <div className="note note--info mb-3 mt-5">
              Your payment will be processed when you click Pay. By doing so you agree to the
              Donorport{' '}
              <a href="/terms">
                <span className="text-subtext">Terms and Conditions.</span>
              </a>
            </div>
            <div className="d-flex align-items-center pb-20p">
              <Button
                style={{ width: '100%', opacity: props.isLoading ? '0.7' : '1' }}
                variant="primary"
                size="lg"
                className="d-flex align-items-center justify-content-center"
                onClick={() => !props.isLoading && props.pay()}
              >
                Pay {props.currencySymbol + priceFormat(grandTotal)}
                {props.isLoading && <CircularProgress className="ms-2" color="inherit" size={12} />}
              </Button>
            </div>
            <div className="fs-6 d-flex justify-content-center mt-3 pb-20p">
              <FontAwesomeIcon icon={solid('lock-keyhole')} className="me-1" /> Payments are secure
              and encrypted
            </div>
          </div>

          <footer
            style={{ maxWidth: '480px' }}
            className="d-flex flex-sm-row flex-column py-3 py-sm-2 border-top align-items-center"
          >
            <img
              className="me-3 img-stripe mb-sm-0 mb-1"
              src={stripe}
              alt=""
              style={{ width: '146px' }}
            />
            <ul className="d-flex align-items-center justify-content-center justify-content-sm-center list-unstyled fs-7">
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
        </div>
        {isTab ? (
          ''
        ) : (
          <div className="summary__section">
            <SummaryContent
              currencySymbol={props.currencySymbol}
              cartItem={cartItem}
              total={props.total}
              removeCartItem={props.removeCartItem}
              CalculatedPrice={props.CalculatedPrice}
              xp={props.xp}
              salesTax={props.salesTax}
              subtotal={props.subtotal}
              salesTaxPer={props.salesTaxPer}
              transactionFee={props.transactionFee}
              platformFee={props.platformFee}
              stripeTax={props.stripeTax}
            />
          </div>
        )}
      </Container>
    </div>
  );
};
//const StyledInput = styled.div`
//& .MuiOutlinedInput-input,
//& .MuiInputBase-input,
//& .MuiInputAdornment-root > p {
//font-weight: 700;
//font-size: 21px;
//font-family: 'Jcfonts linotte', sans-serif;
//color: #9896b1;
//}
//`;
//const StyledSlider = styled.div`
//& .tip__label {
//font-family: 'Jcfonts linotte', sans-serif;
//}
//& .tip__slider {
//& .MuiSlider-rail {
//height: 9px;
//background-color: #3898ec;
//border-radius: 19px;
//}
//& .MuiSlider-mark {
//width: 4px;
//height: 9px;
//background-color: $neutral-100;
//}
//& .MuiSlider-markLabel {
//font-family: 'Jcfonts linotte';
//font-weight: 600;
//top: 9px;
//transform: translateX(50%);
//}
//& .MuiSlider-markLabel[data-index='0'] {
//transform: translateX(-150%);
//color: rgba(0, 0, 0, 0.54) !important;
//}
//& .MuiSlider-mark[data-index='6'] {
//display: none;
//}
//& .MuiSlider-markActive {
//display: none;
//color: rgba(0, 0, 0, 0.54) !important;
//}
//& .MuiSlider-track {
//height: 9px;
//display: block;
//position: absolute;
//background-color: #3898ec;
//border-radius: 19px;
//}
//& .MuiSlider-valueLabel {
//color: #ffffff00 !important;
//}
//& .MuiSlider-thumb {
//height: 29px;
//width: 29px;
//background-color: #3898ec;
//border: 4px solid #bedaf8;
//margin-top: -10px;
//}
//&.PrivateValueLabel-circle {
//background-color: unset !important;
//}
//}
//`;
export default CheckoutNoSession;
