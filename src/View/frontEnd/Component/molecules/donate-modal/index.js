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
  const [next, setNext] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const stateData = props.stateData;
  const organizationDetails = props.organizationDetails;
  const user = useSelector((state) => state.user);
  const userAuthToken = localStorage.getItem('userAuthToken');
  const userData = JSON.parse(localStorage.getItem('userData'));

  const selectedValue = props.selectedValue;
  const setSelectedValue = props.setSelectedValue;
  console.log('selectedV', selectedValue);

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

  const handleExpiryDateChange = (e) => {
    let input = e.target.value.replace(/\D/g, ''); // Remove any non-digit characters
    if (input.length > 2) {
      input = input.substring(0, 2) + '/' + input.substring(2, 4); // Add slash after MM
    }

    // Update the state with the formatted value
    props.changevalue({
      target: {
        name: e.target.name,
        value: input
      }
    });
  };

  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-center" centered>
      <Modal.Header className="bg-primary text-white justify-content-center pt-1 pb-2 mb-3">
        {(next || type === 'crowdfunding') && (
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
        )}
        <Modal.Title className="mb-0 mt-1 pt-6p">
          {type === 'crowdfunding' || next ? 'Payment Method' : 'Choose Amount'}
        </Modal.Title>
        <Button variant="link" onClick={props.onHide} className="donate__close-btn p-0 ms-auto">
          <FontAwesomeIcon icon={solid('close')} className="fs-5 text-white p-1" />
        </Button>
      </Modal.Header>
      <Modal.Body>
        {(type !== 'crowdfunding' && !next) || (type === 'crowdfunding' && !next) ? (
          <>
            {type !== 'crowdfunding' && (
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
            )}
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

                <h6 className="ms-auto text-white">
                  <FontAwesomeIcon icon={solid('up')} className="me-1" />
                  <span className="mr-3p">{selectedValue * 10}</span> XP
                </h6>
              </div>
            </div>
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
            <div className="donation__review d-flex flex-column align-items-center justify-content-center">
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
                          left: '80%'
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
                </div>
              </div>

              <div className="d-flex flex-column gap-3">
                <div className="checkout__input">
                  <label htmlFor="ccnumber" className="pb-2">
                    Card number<span>*</span>
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    id="ccnumber"
                    className="form-control"
                    maxLength={16}
                    required
                    onChange={(e) => {
                      props.changevalue(e);
                    }}
                    value={stateData.cardNumber ? stateData.cardNumber : ''}
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

                <div className="checkout__input">
                  <label htmlFor="ccexpdate" className="pb-2">
                    Expiry date<span>*</span>
                  </label>
                  <input
                    type="text"
                    name="ccexpdate"
                    id="ccexpdate"
                    className="form-control"
                    placeholder="MM/YY"
                    maxLength={5}
                    onChange={(e) => handleExpiryDateChange(e)}
                    value={stateData.ccexpdate ? stateData.ccexpdate : ''}
                    required
                  />
                  {stateData.error.ccexpdate && (
                    <p className="error">
                      {stateData.error
                        ? stateData.error.ccexpdate
                          ? stateData.error.ccexpdate
                          : ''
                        : ''}
                    </p>
                  )}
                </div>

                <div className="checkout__input">
                  <label htmlFor="cvc" className="pb-2">
                    CVC<span>*</span>
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    autoComplete="cc-csc"
                    id="cvc"
                    maxLength={3}
                    value={stateData.cvv ? stateData.cvv : ''}
                    className={stateData.error.cvv ? 'inputerror form-control ' : 'form-control '}
                    onChange={(e) => props.changevalue(e)}
                    required
                  />
                  {stateData.error.cvv && (
                    <p className="error">
                      {stateData.error ? (stateData.error.cvv ? stateData.error.cvv : '') : ''}
                    </p>
                  )}
                </div>

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
              </div>
            </>
          )
        )}
      </Modal.Body>

      <Modal.Footer className="border-0 overflow-hidden justify-content-center mb-3">
        {type === 'crowdfunding' && next ? (
          <div className="fs-7">Your donation goes directly to the Organization ♥</div>
        ) : next && !showPaymentForm ? (
          <div className=" fs-7">Your donation goes directly to the Organization ♥</div>
        ) : (
          !next &&
          !showPaymentForm && (
            <Button
              variant="primary"
              onClick={() => setNext(true)}
              className="d-flex flex-grow-1 fw-bold justify-content-center fs-6"
              size="lg"
            >
              Next
              <FontAwesomeIcon icon={solid('arrow-right')} className="ms-1" />
            </Button>
          )
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default DonateModal;
