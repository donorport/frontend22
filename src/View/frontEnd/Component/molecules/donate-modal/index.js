import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Button, Modal } from 'react-bootstrap';
import Avatar from '../../atoms/avatar';
import helper, { getCalculatedPrice } from '../../../../../Common/Helper';
import { useSelector, useDispatch } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import { priceFormat } from '../../../../../Common/Helper';

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
  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  const userData = JSON.parse(localStorage.getItem('userData'));
  const CampaignAdmin = JSON.parse(localStorage.getItem('CampaignAdmin'));

  const selectedValue = props.selectedValue;
  const setSelectedValue = props.setSelectedValue;

  let type = props.type;

  const getCalc = getCalculatedPrice();
  let currencySymbol = getCalc.currencySymbol();

  let platformCost = (0.049 * selectedValue + 0.3).toFixed(2);
  console.log(platformCost);
  let grandTotal = (Number(selectedValue) + Number(platformCost)).toFixed(2);
  console.log(grandTotal);

  const onValueChange = (clr, event) => {
    setSelectedValue(Number(event.target.value));
    setColor(clr);
  };

  return (
    <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header className="bg-primary text-white justify-content-center pt-5 pb-2">
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

                <span className="ms-auto fs-7">
                  <FontAwesomeIcon icon={solid('up')} className="me-1" />
                  <span className="mr-3p">{selectedValue * 10}</span> XP
                </span>
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
              {type === 'project' ? (
                <div>
                  Donate to the project:
                  <span className="ms-1 fw-bold">{props.projectDetails.name}</span>
                </div>
              ) : (
                <img
                  alt=""
                  style={{ objectFit: 'contain', maxHeight: '40px' }}
                  src={helper.CampaignAdminLogoPath + organizationDetails.logo}
                />
              )}
            </div>
            <div className="donation__review text-dark d-flex flex-column align-items-center justify-content-center">
              <span className="fw-bold">
                {currencySymbol}
                {selectedValue}
              </span>
              <div className="mt-2 d-flex align-items-center">
                <Link to="/pricing" className="fw-semibold fs-7 text-light flex__1">
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
              {/*   <Button
                size="lg"
                variant="warning"
                className="btn__checkout paypal mb-2"
              >
                <img
                  alt=""
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAxcHgiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAxMDEgMzIiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHhtbG5zPSJodHRwOiYjeDJGOyYjeDJGO3d3dy53My5vcmcmI3gyRjsyMDAwJiN4MkY7c3ZnIj48cGF0aCBmaWxsPSIjMDAzMDg3IiBkPSJNIDEyLjIzNyAyLjggTCA0LjQzNyAyLjggQyAzLjkzNyAyLjggMy40MzcgMy4yIDMuMzM3IDMuNyBMIDAuMjM3IDIzLjcgQyAwLjEzNyAyNC4xIDAuNDM3IDI0LjQgMC44MzcgMjQuNCBMIDQuNTM3IDI0LjQgQyA1LjAzNyAyNC40IDUuNTM3IDI0IDUuNjM3IDIzLjUgTCA2LjQzNyAxOC4xIEMgNi41MzcgMTcuNiA2LjkzNyAxNy4yIDcuNTM3IDE3LjIgTCAxMC4wMzcgMTcuMiBDIDE1LjEzNyAxNy4yIDE4LjEzNyAxNC43IDE4LjkzNyA5LjggQyAxOS4yMzcgNy43IDE4LjkzNyA2IDE3LjkzNyA0LjggQyAxNi44MzcgMy41IDE0LjgzNyAyLjggMTIuMjM3IDIuOCBaIE0gMTMuMTM3IDEwLjEgQyAxMi43MzcgMTIuOSAxMC41MzcgMTIuOSA4LjUzNyAxMi45IEwgNy4zMzcgMTIuOSBMIDguMTM3IDcuNyBDIDguMTM3IDcuNCA4LjQzNyA3LjIgOC43MzcgNy4yIEwgOS4yMzcgNy4yIEMgMTAuNjM3IDcuMiAxMS45MzcgNy4yIDEyLjYzNyA4IEMgMTMuMTM3IDguNCAxMy4zMzcgOS4xIDEzLjEzNyAxMC4xIFoiPjwvcGF0aD48cGF0aCBmaWxsPSIjMDAzMDg3IiBkPSJNIDM1LjQzNyAxMCBMIDMxLjczNyAxMCBDIDMxLjQzNyAxMCAzMS4xMzcgMTAuMiAzMS4xMzcgMTAuNSBMIDMwLjkzNyAxMS41IEwgMzAuNjM3IDExLjEgQyAyOS44MzcgOS45IDI4LjAzNyA5LjUgMjYuMjM3IDkuNSBDIDIyLjEzNyA5LjUgMTguNjM3IDEyLjYgMTcuOTM3IDE3IEMgMTcuNTM3IDE5LjIgMTguMDM3IDIxLjMgMTkuMzM3IDIyLjcgQyAyMC40MzcgMjQgMjIuMTM3IDI0LjYgMjQuMDM3IDI0LjYgQyAyNy4zMzcgMjQuNiAyOS4yMzcgMjIuNSAyOS4yMzcgMjIuNSBMIDI5LjAzNyAyMy41IEMgMjguOTM3IDIzLjkgMjkuMjM3IDI0LjMgMjkuNjM3IDI0LjMgTCAzMy4wMzcgMjQuMyBDIDMzLjUzNyAyNC4zIDM0LjAzNyAyMy45IDM0LjEzNyAyMy40IEwgMzYuMTM3IDEwLjYgQyAzNi4yMzcgMTAuNCAzNS44MzcgMTAgMzUuNDM3IDEwIFogTSAzMC4zMzcgMTcuMiBDIDI5LjkzNyAxOS4zIDI4LjMzNyAyMC44IDI2LjEzNyAyMC44IEMgMjUuMDM3IDIwLjggMjQuMjM3IDIwLjUgMjMuNjM3IDE5LjggQyAyMy4wMzcgMTkuMSAyMi44MzcgMTguMiAyMy4wMzcgMTcuMiBDIDIzLjMzNyAxNS4xIDI1LjEzNyAxMy42IDI3LjIzNyAxMy42IEMgMjguMzM3IDEzLjYgMjkuMTM3IDE0IDI5LjczNyAxNC42IEMgMzAuMjM3IDE1LjMgMzAuNDM3IDE2LjIgMzAuMzM3IDE3LjIgWiI+PC9wYXRoPjxwYXRoIGZpbGw9IiMwMDMwODciIGQ9Ik0gNTUuMzM3IDEwIEwgNTEuNjM3IDEwIEMgNTEuMjM3IDEwIDUwLjkzNyAxMC4yIDUwLjczNyAxMC41IEwgNDUuNTM3IDE4LjEgTCA0My4zMzcgMTAuOCBDIDQzLjIzNyAxMC4zIDQyLjczNyAxMCA0Mi4zMzcgMTAgTCAzOC42MzcgMTAgQyAzOC4yMzcgMTAgMzcuODM3IDEwLjQgMzguMDM3IDEwLjkgTCA0Mi4xMzcgMjMgTCAzOC4yMzcgMjguNCBDIDM3LjkzNyAyOC44IDM4LjIzNyAyOS40IDM4LjczNyAyOS40IEwgNDIuNDM3IDI5LjQgQyA0Mi44MzcgMjkuNCA0My4xMzcgMjkuMiA0My4zMzcgMjguOSBMIDU1LjgzNyAxMC45IEMgNTYuMTM3IDEwLjYgNTUuODM3IDEwIDU1LjMzNyAxMCBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwOWNkZSIgZD0iTSA2Ny43MzcgMi44IEwgNTkuOTM3IDIuOCBDIDU5LjQzNyAyLjggNTguOTM3IDMuMiA1OC44MzcgMy43IEwgNTUuNzM3IDIzLjYgQyA1NS42MzcgMjQgNTUuOTM3IDI0LjMgNTYuMzM3IDI0LjMgTCA2MC4zMzcgMjQuMyBDIDYwLjczNyAyNC4zIDYxLjAzNyAyNCA2MS4wMzcgMjMuNyBMIDYxLjkzNyAxOCBDIDYyLjAzNyAxNy41IDYyLjQzNyAxNy4xIDYzLjAzNyAxNy4xIEwgNjUuNTM3IDE3LjEgQyA3MC42MzcgMTcuMSA3My42MzcgMTQuNiA3NC40MzcgOS43IEMgNzQuNzM3IDcuNiA3NC40MzcgNS45IDczLjQzNyA0LjcgQyA3Mi4yMzcgMy41IDcwLjMzNyAyLjggNjcuNzM3IDIuOCBaIE0gNjguNjM3IDEwLjEgQyA2OC4yMzcgMTIuOSA2Ni4wMzcgMTIuOSA2NC4wMzcgMTIuOSBMIDYyLjgzNyAxMi45IEwgNjMuNjM3IDcuNyBDIDYzLjYzNyA3LjQgNjMuOTM3IDcuMiA2NC4yMzcgNy4yIEwgNjQuNzM3IDcuMiBDIDY2LjEzNyA3LjIgNjcuNDM3IDcuMiA2OC4xMzcgOCBDIDY4LjYzNyA4LjQgNjguNzM3IDkuMSA2OC42MzcgMTAuMSBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwOWNkZSIgZD0iTSA5MC45MzcgMTAgTCA4Ny4yMzcgMTAgQyA4Ni45MzcgMTAgODYuNjM3IDEwLjIgODYuNjM3IDEwLjUgTCA4Ni40MzcgMTEuNSBMIDg2LjEzNyAxMS4xIEMgODUuMzM3IDkuOSA4My41MzcgOS41IDgxLjczNyA5LjUgQyA3Ny42MzcgOS41IDc0LjEzNyAxMi42IDczLjQzNyAxNyBDIDczLjAzNyAxOS4yIDczLjUzNyAyMS4zIDc0LjgzNyAyMi43IEMgNzUuOTM3IDI0IDc3LjYzNyAyNC42IDc5LjUzNyAyNC42IEMgODIuODM3IDI0LjYgODQuNzM3IDIyLjUgODQuNzM3IDIyLjUgTCA4NC41MzcgMjMuNSBDIDg0LjQzNyAyMy45IDg0LjczNyAyNC4zIDg1LjEzNyAyNC4zIEwgODguNTM3IDI0LjMgQyA4OS4wMzcgMjQuMyA4OS41MzcgMjMuOSA4OS42MzcgMjMuNCBMIDkxLjYzNyAxMC42IEMgOTEuNjM3IDEwLjQgOTEuMzM3IDEwIDkwLjkzNyAxMCBaIE0gODUuNzM3IDE3LjIgQyA4NS4zMzcgMTkuMyA4My43MzcgMjAuOCA4MS41MzcgMjAuOCBDIDgwLjQzNyAyMC44IDc5LjYzNyAyMC41IDc5LjAzNyAxOS44IEMgNzguNDM3IDE5LjEgNzguMjM3IDE4LjIgNzguNDM3IDE3LjIgQyA3OC43MzcgMTUuMSA4MC41MzcgMTMuNiA4Mi42MzcgMTMuNiBDIDgzLjczNyAxMy42IDg0LjUzNyAxNCA4NS4xMzcgMTQuNiBDIDg1LjczNyAxNS4zIDg1LjkzNyAxNi4yIDg1LjczNyAxNy4yIFoiPjwvcGF0aD48cGF0aCBmaWxsPSIjMDA5Y2RlIiBkPSJNIDk1LjMzNyAzLjMgTCA5Mi4xMzcgMjMuNiBDIDkyLjAzNyAyNCA5Mi4zMzcgMjQuMyA5Mi43MzcgMjQuMyBMIDk1LjkzNyAyNC4zIEMgOTYuNDM3IDI0LjMgOTYuOTM3IDIzLjkgOTcuMDM3IDIzLjQgTCAxMDAuMjM3IDMuNSBDIDEwMC4zMzcgMy4xIDEwMC4wMzcgMi44IDk5LjYzNyAyLjggTCA5Ni4wMzcgMi44IEMgOTUuNjM3IDIuOCA5NS40MzcgMyA5NS4zMzcgMy4zIFoiPjwvcGF0aD48L3N2Zz4"
                  className="paypal-logo"
                />
              </Button>
              <Button
                size="lg"
                variant="link"
                className="btn__checkout debit-credit fw-bold text-white fs-5 mb-12p text-decoration-none"
              >
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjRweCIgaGVpZ2h0PSIxOHB4IiB2aWV3Qm94PSIwIDAgMjQgMTgiIHhtbG5zPSJodHRwOiYjeDJGOyYjeDJGO3d3dy53My5vcmcmI3gyRjsyMDAwJiN4MkY7c3ZnIj48ZyBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMy4wMDAwMDAsIC02LjAwMDAwMCkiIGZpbGw9IiNmZmZmZmYiIGZpbGwtcnVsZT0ibm9uemVybyI+PHBhdGggZD0iTTguMjc1MjEzMzgsMTIuNTEyMjY1MyBDNy45MzAwMzU0MiwxMi41MTIyNjUzIDcuNjUwMjEzMzgsMTIuMjMyNDQzMiA3LjY1MDIxMzM4LDExLjg4NzI2NTMgQzcuNjUwMjEzMzgsMTEuNTQyMDg3MyA3LjkzMDAzNTQyLDExLjI2MjI2NTMgOC4yNzUyMTMzOCwxMS4yNjIyNjUzIEwyNC43ODc5MDQyLDExLjI2MjI2NTMgQzI1LjU5NTU5MzksMTEuMjYyMjY1MyAyNi4yNSwxMS45MTc1OTA1IDI2LjI1LDEyLjcyNTUzNjggTDI2LjI1LDIyLjI4NjcyODQgQzI2LjI1LDIzLjA5NDY3NDggMjUuNTk1NTkzOSwyMy43NSAyNC43ODc5MDQyLDIzLjc1IEw1LjIxMjMxMzAyLDIzLjc1IEM0LjQwNDYyMzI1LDIzLjc1IDMuNzUsMjMuMDk0Njc0OCAzLjc1LDIyLjI4NjczOTcgTDMuNzUsNy43MTMyNzE1MiBDMy43NSw2LjkwNTMyNTE4IDQuNDA0NDA2MDgsNi4yNSA1LjIxMjI3MjEyLDYuMjUgTDI0Ljc4ODA2NjQsNi4yNTU1MjE2MyBDMjUuNTk1NjA3OSw2LjI1NTczMTQ3IDI2LjI1LDYuOTEwOTk1MDcgMjYuMjUsNy43MTg3MDM2MiBMMjYuMjUsOS4yMzU3NzE2MSBDMjYuMjUsOS41ODA5NDk1OCAyNS45NzAyNjc1LDkuODYwODExNjggMjUuNjI1MDg5NSw5Ljg2MDg2MTEyIEMyNS4yNzk5MTE1LDkuODYwOTEwNTUgMjUuMDAwMDQ5NCw5LjU4MTEyODYgMjUsOS4yMzU5NTA2MyBMMjQuOTk5NzgyNyw3LjcxODc5MzEzIEMyNC45OTk3ODI3LDcuNjAwODMxODkgMjQuOTA0NjYxMSw3LjUwNTU1MTk3IDI0Ljc4NzcyNzgsNy41MDU1MjE1OCBMNS4yMTIwOTU4Myw3LjQ5OTk5OTk4IEM1LjA5NTE1NTA2LDcuNDk5OTk5OTggNSw3LjU5NTI4ODY4IDUsNy43MTMyNjAyOCBMNS4wMDAyMTcxOCwyMi4yODY3Mjg0IEM1LjAwMDIxNzE4LDIyLjQwNDcxMTMgNS4wOTUzNzIyMywyMi41IDUuMjEyMzEzMDIsMjIuNSBMMjQuNzg3OTA0MiwyMi41IEMyNC45MDQ4NDUsMjIuNSAyNSwyMi40MDQ3MTEzIDI1LDIyLjI4NjcyODQgTDI1LDEyLjcyNTUzNjggQzI1LDEyLjYwNzU1NCAyNC45MDQ4NDQ5LDEyLjUxMjI2NTMgMjQuNzg3OTA0MiwxMi41MTIyNjUzIEw4LjI3NTIxMzM4LDEyLjUxMjI2NTMgWiIgaWQ9IlN0cm9rZS0xIj48L3BhdGg+PC9nPjwvZz48L3N2Zz4"
                  alt=""
                  className="mr-6p"
                />
                Debit or Credit Card
              </Button>
              <div className="paypal-powered-by">
                <span className="paypal-button-text immediate">Powered by</span>
                <img
                  src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAxcHgiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAxMDEgMzIiIHByZXNlcnZlQXNwZWN0UmF0aW89InhNaW5ZTWluIG1lZXQiIHhtbG5zPSJodHRwOiYjeDJGOyYjeDJGO3d3dy53My5vcmcmI3gyRjsyMDAwJiN4MkY7c3ZnIj48cGF0aCBmaWxsPSIjMDAzMDg3IiBkPSJNIDEyLjIzNyAyLjggTCA0LjQzNyAyLjggQyAzLjkzNyAyLjggMy40MzcgMy4yIDMuMzM3IDMuNyBMIDAuMjM3IDIzLjcgQyAwLjEzNyAyNC4xIDAuNDM3IDI0LjQgMC44MzcgMjQuNCBMIDQuNTM3IDI0LjQgQyA1LjAzNyAyNC40IDUuNTM3IDI0IDUuNjM3IDIzLjUgTCA2LjQzNyAxOC4xIEMgNi41MzcgMTcuNiA2LjkzNyAxNy4yIDcuNTM3IDE3LjIgTCAxMC4wMzcgMTcuMiBDIDE1LjEzNyAxNy4yIDE4LjEzNyAxNC43IDE4LjkzNyA5LjggQyAxOS4yMzcgNy43IDE4LjkzNyA2IDE3LjkzNyA0LjggQyAxNi44MzcgMy41IDE0LjgzNyAyLjggMTIuMjM3IDIuOCBaIE0gMTMuMTM3IDEwLjEgQyAxMi43MzcgMTIuOSAxMC41MzcgMTIuOSA4LjUzNyAxMi45IEwgNy4zMzcgMTIuOSBMIDguMTM3IDcuNyBDIDguMTM3IDcuNCA4LjQzNyA3LjIgOC43MzcgNy4yIEwgOS4yMzcgNy4yIEMgMTAuNjM3IDcuMiAxMS45MzcgNy4yIDEyLjYzNyA4IEMgMTMuMTM3IDguNCAxMy4zMzcgOS4xIDEzLjEzNyAxMC4xIFoiPjwvcGF0aD48cGF0aCBmaWxsPSIjMDAzMDg3IiBkPSJNIDM1LjQzNyAxMCBMIDMxLjczNyAxMCBDIDMxLjQzNyAxMCAzMS4xMzcgMTAuMiAzMS4xMzcgMTAuNSBMIDMwLjkzNyAxMS41IEwgMzAuNjM3IDExLjEgQyAyOS44MzcgOS45IDI4LjAzNyA5LjUgMjYuMjM3IDkuNSBDIDIyLjEzNyA5LjUgMTguNjM3IDEyLjYgMTcuOTM3IDE3IEMgMTcuNTM3IDE5LjIgMTguMDM3IDIxLjMgMTkuMzM3IDIyLjcgQyAyMC40MzcgMjQgMjIuMTM3IDI0LjYgMjQuMDM3IDI0LjYgQyAyNy4zMzcgMjQuNiAyOS4yMzcgMjIuNSAyOS4yMzcgMjIuNSBMIDI5LjAzNyAyMy41IEMgMjguOTM3IDIzLjkgMjkuMjM3IDI0LjMgMjkuNjM3IDI0LjMgTCAzMy4wMzcgMjQuMyBDIDMzLjUzNyAyNC4zIDM0LjAzNyAyMy45IDM0LjEzNyAyMy40IEwgMzYuMTM3IDEwLjYgQyAzNi4yMzcgMTAuNCAzNS44MzcgMTAgMzUuNDM3IDEwIFogTSAzMC4zMzcgMTcuMiBDIDI5LjkzNyAxOS4zIDI4LjMzNyAyMC44IDI2LjEzNyAyMC44IEMgMjUuMDM3IDIwLjggMjQuMjM3IDIwLjUgMjMuNjM3IDE5LjggQyAyMy4wMzcgMTkuMSAyMi44MzcgMTguMiAyMy4wMzcgMTcuMiBDIDIzLjMzNyAxNS4xIDI1LjEzNyAxMy42IDI3LjIzNyAxMy42IEMgMjguMzM3IDEzLjYgMjkuMTM3IDE0IDI5LjczNyAxNC42IEMgMzAuMjM3IDE1LjMgMzAuNDM3IDE2LjIgMzAuMzM3IDE3LjIgWiI+PC9wYXRoPjxwYXRoIGZpbGw9IiMwMDMwODciIGQ9Ik0gNTUuMzM3IDEwIEwgNTEuNjM3IDEwIEMgNTEuMjM3IDEwIDUwLjkzNyAxMC4yIDUwLjczNyAxMC41IEwgNDUuNTM3IDE4LjEgTCA0My4zMzcgMTAuOCBDIDQzLjIzNyAxMC4zIDQyLjczNyAxMCA0Mi4zMzcgMTAgTCAzOC42MzcgMTAgQyAzOC4yMzcgMTAgMzcuODM3IDEwLjQgMzguMDM3IDEwLjkgTCA0Mi4xMzcgMjMgTCAzOC4yMzcgMjguNCBDIDM3LjkzNyAyOC44IDM4LjIzNyAyOS40IDM4LjczNyAyOS40IEwgNDIuNDM3IDI5LjQgQyA0Mi44MzcgMjkuNCA0My4xMzcgMjkuMiA0My4zMzcgMjguOSBMIDU1LjgzNyAxMC45IEMgNTYuMTM3IDEwLjYgNTUuODM3IDEwIDU1LjMzNyAxMCBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwOWNkZSIgZD0iTSA2Ny43MzcgMi44IEwgNTkuOTM3IDIuOCBDIDU5LjQzNyAyLjggNTguOTM3IDMuMiA1OC44MzcgMy43IEwgNTUuNzM3IDIzLjYgQyA1NS42MzcgMjQgNTUuOTM3IDI0LjMgNTYuMzM3IDI0LjMgTCA2MC4zMzcgMjQuMyBDIDYwLjczNyAyNC4zIDYxLjAzNyAyNCA2MS4wMzcgMjMuNyBMIDYxLjkzNyAxOCBDIDYyLjAzNyAxNy41IDYyLjQzNyAxNy4xIDYzLjAzNyAxNy4xIEwgNjUuNTM3IDE3LjEgQyA3MC42MzcgMTcuMSA3My42MzcgMTQuNiA3NC40MzcgOS43IEMgNzQuNzM3IDcuNiA3NC40MzcgNS45IDczLjQzNyA0LjcgQyA3Mi4yMzcgMy41IDcwLjMzNyAyLjggNjcuNzM3IDIuOCBaIE0gNjguNjM3IDEwLjEgQyA2OC4yMzcgMTIuOSA2Ni4wMzcgMTIuOSA2NC4wMzcgMTIuOSBMIDYyLjgzNyAxMi45IEwgNjMuNjM3IDcuNyBDIDYzLjYzNyA3LjQgNjMuOTM3IDcuMiA2NC4yMzcgNy4yIEwgNjQuNzM3IDcuMiBDIDY2LjEzNyA3LjIgNjcuNDM3IDcuMiA2OC4xMzcgOCBDIDY4LjYzNyA4LjQgNjguNzM3IDkuMSA2OC42MzcgMTAuMSBaIj48L3BhdGg+PHBhdGggZmlsbD0iIzAwOWNkZSIgZD0iTSA5MC45MzcgMTAgTCA4Ny4yMzcgMTAgQyA4Ni45MzcgMTAgODYuNjM3IDEwLjIgODYuNjM3IDEwLjUgTCA4Ni40MzcgMTEuNSBMIDg2LjEzNyAxMS4xIEMgODUuMzM3IDkuOSA4My41MzcgOS41IDgxLjczNyA5LjUgQyA3Ny42MzcgOS41IDc0LjEzNyAxMi42IDczLjQzNyAxNyBDIDczLjAzNyAxOS4yIDczLjUzNyAyMS4zIDc0LjgzNyAyMi43IEMgNzUuOTM3IDI0IDc3LjYzNyAyNC42IDc5LjUzNyAyNC42IEMgODIuODM3IDI0LjYgODQuNzM3IDIyLjUgODQuNzM3IDIyLjUgTCA4NC41MzcgMjMuNSBDIDg0LjQzNyAyMy45IDg0LjczNyAyNC4zIDg1LjEzNyAyNC4zIEwgODguNTM3IDI0LjMgQyA4OS4wMzcgMjQuMyA4OS41MzcgMjMuOSA4OS42MzcgMjMuNCBMIDkxLjYzNyAxMC42IEMgOTEuNjM3IDEwLjQgOTEuMzM3IDEwIDkwLjkzNyAxMCBaIE0gODUuNzM3IDE3LjIgQyA4NS4zMzcgMTkuMyA4My43MzcgMjAuOCA4MS41MzcgMjAuOCBDIDgwLjQzNyAyMC44IDc5LjYzNyAyMC41IDc5LjAzNyAxOS44IEMgNzguNDM3IDE5LjEgNzguMjM3IDE4LjIgNzguNDM3IDE3LjIgQyA3OC43MzcgMTUuMSA4MC41MzcgMTMuNiA4Mi42MzcgMTMuNiBDIDgzLjczNyAxMy42IDg0LjUzNyAxNCA4NS4xMzcgMTQuNiBDIDg1LjczNyAxNS4zIDg1LjkzNyAxNi4yIDg1LjczNyAxNy4yIFoiPjwvcGF0aD48cGF0aCBmaWxsPSIjMDA5Y2RlIiBkPSJNIDk1LjMzNyAzLjMgTCA5Mi4xMzcgMjMuNiBDIDkyLjAzNyAyNCA5Mi4zMzcgMjQuMyA5Mi43MzcgMjQuMyBMIDk1LjkzNyAyNC4zIEMgOTYuNDM3IDI0LjMgOTYuOTM3IDIzLjkgOTcuMDM3IDIzLjQgTCAxMDAuMjM3IDMuNSBDIDEwMC4zMzcgMy4xIDEwMC4wMzcgMi44IDk5LjYzNyAyLjggTCA5Ni4wMzcgMi44IEMgOTUuNjM3IDIuOCA5NS40MzcgMyA5NS4zMzcgMy4zIFoiPjwvcGF0aD48L3N2Zz4"
                  alt=""
                  className="powered-logo"
                />
              </div>
              */}
            </div>
          </>
        ) : (
          showPaymentForm && (
            <>
              <div className="sleeve">
                <div className="credit-card selected" style={{ background: '#555' }}>
                  <div className="">
                    <div className="card-company"></div>

                    {props.dCardIcon && (
                      <img
                        src={props.dCardIcon}
                        alt=""
                        style={{
                          position: 'absolute',
                          width: '62px',
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
                  <div className="card-holder">
                    {stateData.name ? stateData.name : 'e.g. John Doe'}
                  </div>
                  {/* <div className="card-type">Debit card</div> */}
                </div>
              </div>

              <div className="container">
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
                  <p>
                    Card number<span>*</span>
                  </p>
                  <input
                    type="text"
                    name="cardNumber"
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
                  <p className="error">
                    {stateData.error
                      ? stateData.error.cardNumber
                        ? stateData.error.cardNumber
                        : ''
                      : ''}
                  </p>
                </div>
                <div className="row">
                  <div className="col-lg-3">
                    <div className="checkout__input">
                      <p>
                        Month<span>*</span>
                      </p>
                      <input
                        type="text"
                        name="month"
                        value={stateData.month ? stateData.month : ''}
                        className={
                          stateData.error.month ? 'inputerror form-control ' : 'form-control '
                        }
                        placeholder="MM"
                        onChange={(e) => props.changevalue(e)}
                      />
                      <p className="error">
                        {stateData.error
                          ? stateData.error.month
                            ? stateData.error.month
                            : ''
                          : ''}
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="checkout__input">
                      <p>
                        Year<span>*</span>
                      </p>
                      <input
                        type="text"
                        name="year"
                        value={stateData.year ? stateData.year : ''}
                        className={
                          stateData.error.year ? 'inputerror form-control ' : 'form-control '
                        }
                        placeholder="YY"
                        onChange={(e) => props.changevalue(e)}
                      />
                      <p className="error">
                        {stateData.error ? (stateData.error.year ? stateData.error.year : '') : ''}
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="checkout__input">
                      <p>
                        CVV<span>*</span>
                      </p>
                      <input
                        type="password"
                        name="cvv"
                        value={stateData.cvv ? stateData.cvv : ''}
                        className={
                          stateData.error.cvv ? 'inputerror form-control ' : 'form-control '
                        }
                        placeholder="CVV"
                        onChange={(e) => props.changevalue(e)}
                        maxLength={3}
                      />
                      <p className="error">
                        {stateData.error ? (stateData.error.cvv ? stateData.error.cvv : '') : ''}
                      </p>
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
          <div className="text-dark fs-7">Your donation goes directly to the Organization ♥</div>
        ) : !next && !showPaymentForm ? (
          <Button
            variant="primary"
            onClick={() => setNext(true)}
            className="d-flex flex__1 fw-bold justify-content-center fs-6"
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
              className="d-flex flex__1 fw-bold justify-content-center fs-6"
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
