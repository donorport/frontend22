import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Button, Modal } from 'react-bootstrap';
import Avatar from '../../atoms/avatar';
import helper, { getCalculatedPrice, priceFormat } from '../../../../../Common/Helper';
import { useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { calculatePlatformCost, calculateGrandTotal } from '../../../../../constants/constants';

import './style.scss';

const DonateModal = (props) => {
  const [color, setColor] = useState('#5ac7b5');
  // const [selectedValue, setSelectedValue] = useState(25);
  const [next, setNext] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const stateData = props.stateData;
  const organizationDetails = props.organizationDetails;
  const user = useSelector((state) => state.user);
  const userAuthToken = localStorage.getItem('userAuthToken');
  //const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  const userData = JSON.parse(localStorage.getItem('userData'));
  //const CampaignAdmin = JSON.parse(localStorage.getItem('CampaignAdmin'));

  const selectedValue = props.selectedValue;
  const setSelectedValue = props.setSelectedValue;

  let type = props.type;

  const getCalc = getCalculatedPrice();
  let currencySymbol = getCalc.currencySymbol();

  let platformCost = calculatePlatformCost(selectedValue);
  let grandTotal = calculateGrandTotal(selectedValue, platformCost);
  console.log({ platformCost, grandTotal });

  const onValueChange = (clr, event) => {
    setSelectedValue(Number(event.target.value));
    setColor(clr);
  };

  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header className="bg-primary text-white justify-content-center pt-1 pb-2 mb-3">
        {next ? (
          <Button
            variant="link"
            onClick={() => {
              setNext(false);
              setShowPaymentForm(false);
            }}
            className="donate__prev-btn p-0 ms-auto"
          >
            <FontAwesomeIcon icon={solid('angle-left')} className="fs-5 text-white p-1" />
          </Button>
        ) : (
          ''
        )}

        <Modal.Title className="mb-0 mt-1 pt-6p">
          {!next ? 'Choose Amount' : 'Payment Method'}
        </Modal.Title>
        <Button variant="link" onClick={props.onHide} className="donate__close-btn p-0 ms-auto">
          <FontAwesomeIcon icon={solid('close')} className="fs-5 text-white p-1" />
        </Button>
      </Modal.Header>
      <Modal.Body>
        {!next && !showPaymentForm ? (
          <>
            <div className="donation__options mb-2">
              <div className="donation__radio d-flex flex-wrap p-6 fs-4">
                <div className="option__item">
                  <input
                    type="radio"
                    value="5"
                    name="donation"
                    checked={selectedValue === 5}
                    onChange={(e) => onValueChange('#63b2ea', e)}
                  />
                  <label>{currencySymbol}5</label>
                </div>
                <div className="option__item">
                  <input
                    type="radio"
                    value="25"
                    name="donation"
                    checked={selectedValue === 25}
                    onChange={(e) => onValueChange('#5ac7b5', e)}
                  />
                  <label>{currencySymbol}25</label>
                </div>
                <div className="option__item">
                  <input
                    type="radio"
                    value="50"
                    name="donation"
                    checked={selectedValue === 50}
                    onChange={(e) => onValueChange('#7abed8', e)}
                  />
                  <label>{currencySymbol}50</label>
                </div>
                <div className="option__item">
                  <input
                    type="radio"
                    value="100"
                    name="donation"
                    checked={selectedValue === 100}
                    onChange={(e) => onValueChange('#f3a648', e)}
                  />
                  <label>{currencySymbol}100</label>
                </div>
                <div className="option__item">
                  <input
                    type="radio"
                    value="250"
                    name="donation"
                    checked={selectedValue === 250}
                    onChange={(e) => onValueChange('#dc6d6d', e)}
                  />
                  <label>{currencySymbol}250</label>
                </div>
                <div className="option__item">
                  <input type="radio" disabled name="donation" />
                  <label className="autowidth">
                    {currencySymbol}
                    {selectedValue}
                  </label>
                </div>
              </div>
            </div>
            <div className="avatar__wrap p-12p" style={{ backgroundColor: color }}>
              <div className="d-flex align-items-center w-100 fs-6 fw-bold text-white">
                <Avatar avatarUrl={user.profileImage} border={0} shadow={false} size={45} />
                <div className="ms-2">
                  <div style={{ textTransform: 'capitalize' }}>
                    {userAuthToken && userData.name}
                  </div>
                  <div>
                    {currencySymbol}
                    {selectedValue}
                  </div>
                </div>

                <h6 className="ms-auto">
                  <FontAwesomeIcon icon={solid('up')} className="me-1" />
                  <span className="mr-3p">{selectedValue * 10}</span> XP
                </h6>
              </div>
            </div>
            {/* <div className="donation__type p-20p">
              <div className="donation__radio donation__type-radio d-flex justify-content-center">
                <div className="option__item fs-7">
                  <input
                    type="radio"
                    value="one-time"
                    name="type"
                    defaultChecked
                  />
                  <label className="pt-3p">One-time</label>
                </div>
                <div className="option__item fs-7">
                  <input type="radio" value="monthly" name="type" />
                  <label className="pt-3p">Monthly</label>
                </div>
              </div>
            </div> */}
          </>
        ) : next && !showPaymentForm ? (
          <>
            <div className="donation__logo pt-3 pb-1 text-center">
              {type === 'project' || type === 'crowdfunding' ? (
                <div>
                  Donate to the {type === 'project' ? 'project' : 'crowdfunding campaign'}:
                  <span className="ms-1 fw-bold">{props.name}</span>
                </div>
              ) : (
                <img
                  alt=""
                  style={{ objectFit: 'contain', maxHeight: '40px' }}
                  src={helper.CampaignAdminLogoPath + organizationDetails.logo}
                />
              )}
            </div>
            <div className="donation__review  d-flex flex-column align-items-center justify-content-center">
              <span className="fw-bold">
                {currencySymbol}
                {selectedValue}
              </span>
              <div className="mt-2 d-flex align-items-center">
                <Link to="/pricing" className="fw-semibold fs-7 text-light flex-grow-1">
                  Service Charge:
                </Link>
                <span className="ms-1 fw-semibold text-light fs-7">
                  {currencySymbol + platformCost}
                </span>
              </div>
              {/* <span className="m-1">/</span>
              <span>One-time</span> */}
            </div>
            <div className="note note--donation d-flex flex-column fw-semibold">
              <Button
                size="lg"
                variant="info"
                className="fw-semibold"
                style={{ width: '100%', opacity: props.isLoading ? '0.7' : '1' }}
                onClick={() => !props.isLoading && setShowPaymentForm(true)}
              >
                Credit Card
                {props.isLoading && <CircularProgress className="ms-2" color="inherit" size={12} />}
              </Button>
            </div>
          </>
        ) : (
          showPaymentForm && (
            <>
              <div className="sleeve">
                <div className="credit-card selected" style={{ background: '#555' }}>
                  <div>
                    <div className="card-company"></div>

                    {props.dCardIcon && (
                      <img
                        src={props.dCardIcon}
                        alt=""
                        style={{
                          position: 'absolute',
                          height: '45px',
                          top: '14px',
                          left: ' 80%'
                        }}
                      />
                    )}
                  </div>
                  <div className="card-number" style={{ marginTop: '74px' }}>
                    <div className="digit-group">
                      {props.cardNumberWithSpace
                        ? props.cardNumberWithSpace
                        : 'XXXX XXXX XXXX XXXX'}
                    </div>
                  </div>
                  <div className="card-expire">
                    <span className="card-text" style={{ color: 'darkgrey' }}>
                      CVV &nbsp;
                    </span>{' '}
                    <p className="card-p-text"></p>{' '}
                    <span className="card-text" style={{ color: 'darkgrey' }}>
                      Expires &nbsp;
                    </span>{' '}
                    {stateData.month ? stateData.month : 'MM'}/
                    {stateData.year ? stateData.year : 'YY'}
                  </div>
                  {/* <div className="card-holder">
                    {stateData.name ? stateData.name : 'e.g. John Doe'}
                  </div> */}
                  {/* <div className="card-type">Debit card</div> */}
                </div>
              </div>

              <div className="d-flex flex-column gap-2 container">
                {/* <div className="checkout__input">
                  <p>
                    Name on card<span>*</span>
                  </p>
                  <input
                    type="text"
                    name="name"
                    value={stateData.name ? stateData.name : ''}
                    className={stateData.error.name ? 'inputerror form-control ' : 'form-control '}
                    placeholder="Card holder name"
                    onChange={(e) => props.changevalue(e)}
                  />
                  <p className="error">
                    {stateData.error ? (stateData.error.name ? stateData.error.name : '') : ''}
                  </p>
                </div>*/}
                <div className="checkout__input">
                  <label htmlFor="ccnumber" className="pb-2">
                    Card number<span>*</span>
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    autoComplete="cc-number"
                    id="ccnumber"
                    value={stateData.cardNumber ? stateData.cardNumber : ''}
                    className={
                      stateData.error.cardNumber ? 'inputerror form-control ' : 'form-control '
                    }
                    placeholder="Card Number"
                    onChange={(e) => {
                      props.changevalue(e);
                    }}
                    maxLength={16}
                  />
                  {stateData.error.cardNumber && (
                    <p className="error">
                      {stateData.error
                        ? stateData.error.cardNumber
                          ? stateData.error.cardNumber
                          : ''
                        : ''}
                    </p>
                  )}
                </div>
                <div className="d-flex flex-direction-column gap-2">
                  <div className="col-lg-3">
                    <div className="checkout__input">
                      <label htmlFor="ccmonth" className="pb-2">
                        Month<span>*</span>
                      </label>
                      <input
                        type="text"
                        name="month"
                        id="ccmonth"
                        autoComplete="cc-exp-month"
                        value={stateData.month ? stateData.month : ''}
                        className={
                          stateData.error.month ? 'inputerror form-control ' : 'form-control '
                        }
                        placeholder="MM"
                        onChange={(e) => props.changevalue(e)}
                        maxLength={2}
                      />
                      {stateData.error.month && (
                        <p className="error">
                          {stateData.error
                            ? stateData.error.month
                              ? stateData.error.month
                              : ''
                            : ''}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div className="checkout__input">
                      <label htmlFor="ccyear" className="pb-2">
                        Year<span>*</span>
                      </label>
                      <input
                        type="text"
                        name="year"
                        id="ccyear"
                        autoComplete="cc-exp-year"
                        value={stateData.year ? stateData.year : ''}
                        className={
                          stateData.error.year ? 'inputerror form-control ' : 'form-control '
                        }
                        placeholder="YYYY"
                        onChange={(e) => props.changevalue(e)}
                        maxLength={4}
                      />

                      {stateData.error.year && (
                        <p className="error">
                          {stateData.error
                            ? stateData.error.year
                              ? stateData.error.year
                              : ''
                            : ''}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="checkout__input">
                      <label className="pb-2">
                        CVV<span>*</span>
                      </label>

                      <input
                        type="text"
                        name="cvv"
                        autoComplete="cc-csc"
                        value={stateData.cvv ? stateData.cvv : ''}
                        className={
                          stateData.error.cvv ? 'inputerror form-control ' : 'form-control '
                        }
                        placeholder="CVV"
                        onChange={(e) => props.changevalue(e)}
                        maxLength={3}
                      />
                      {stateData.error.cvv && (
                        <p className="error">
                          {stateData.error ? (stateData.error.cvv ? stateData.error.cvv : '') : ''}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        )}
      </Modal.Body>

      <Modal.Footer className="border-0 overflow-hidden justify-content-center mb-3">
        {next && !showPaymentForm ? (
          <div className=" fs-7">Your donation goes directly to the Organization ♥</div>
        ) : !next && !showPaymentForm ? (
          <Button
            variant="primary"
            onClick={() => setNext(true)}
            className="d-flex flex-grow-1 fw-bold justify-content-center fs-6"
            size="lg"
          >
            Next
            <FontAwesomeIcon icon={solid('arrow-right')} className="ms-1" />
          </Button>
        ) : (
          showPaymentForm && (
            <Button
              variant="primary"
              style={{ width: '100%', opacity: props.loading ? '0.7' : '1' }}
              onClick={() => !props.loading && props.donate()}
              className="d-flex flex-grow-1 fw-bold justify-content-center fs-6"
              size="lg"
            >
              Donate {currencySymbol}
              {priceFormat(grandTotal)}
              {props.loading && <CircularProgress className="ms-2" color="inherit" size={12} />}
            </Button>
          )
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default DonateModal;
