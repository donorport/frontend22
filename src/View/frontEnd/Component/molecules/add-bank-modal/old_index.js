import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
// import { Button, Modal } from "react-bootstrap";
import { Button } from '@mui/material';

// import ListItemImg from "@components/atoms/list-item-img";
import ListItemImg from '../../atoms/list-item-img';
import Select from 'react-select';
import './style.scss';
import React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
//import locationApi from '../../../../../Api/frontEnd/location';
import { TabContainer } from 'react-bootstrap';

const Transition = React.forwardRef(function Transition(propss) {
  return <Slide direction="up" {...propss} />;
});

const businessTypes = [
  { value: 'individual ', label: 'Individual ' },
  { value: 'company', label: 'Company' },
  { value: 'nonprofit', label: 'Nonprofit' },
  { value: 'government_entity', label: 'Government entity' }
];

const accountHolderTypes = [
  { value: 'individual ', label: 'Individual ' },
  { value: 'company', label: 'Company' }
];

const btnstyle = {
  backgroundColor: '#3773c6',
  color: 'white'
};

const fileuploadinput = {
  position: 'absolute',
  margin: 0,
  padding: 0,
  width: '100%',
  height: '100%',
  outline: 'none',
  opacity: 0,
  cursor: 'pointer'
};

const imageuploadwrap = {
  marginTop: '20px',
  // border: " 4px dashed #3773c6",
  position: 'relative',
  width: '100%'
};

const AddBankModal = (props) => {
  let stateData = props.stateData;

  // const [value, setValue] = useState(0);
  // const [defaultTypeOfBusiness, setDefaultTypeOfBusiness] = useState([
  //   { value: 'individual ', label: 'Individual ' },
  // ])

  // const [defaultCountry, setDefaultCountry] = useState([])
  // const [countryList, setCountryList] = useState([])
  // const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');

  let defaultTypeOfBusiness = props.defaultTypeOfBusiness;
  let setDefaultTypeOfBusiness = props.setDefaultTypeOfBusiness;

  let countryList = props.countryList;
  let defaultCountry = props.defaultCountry;
  let setDefaultCountry = props.setDefaultCountry;

  let stateList = props.stateList;
  let defaultState = props.defaultState;
  let setDefaultState = props.setDefaultState;
  //const handleChange = props.handleChange;
  const value = props.value;

  // console.log(stateData.dob)

  // useEffect(() => {
  //   (async () => {
  //     await getCountryList()
  //   })()

  // }, [])

  // useEffect(() => {
  //   if (countryList.length > 0) {
  //     setDefaultCountry(countryList.find(x => x.value === "US"));
  //   }

  // }, [countryList])

  // const getCountryList = async () => {
  //   let tempArray = []
  //   const getCountryList = await locationApi.countryList(CampaignAdminAuthToken);
  //   if (getCountryList) {
  //     if (getCountryList.data.success) {
  //       if (getCountryList.data.data.length > 0) {
  //         getCountryList.data.data.map((country, i) => {
  //           let Obj = {}
  //           Obj.value = country.iso2
  //           Obj.label = country.country
  //           tempArray.push(Obj)

  //         })
  //         setCountryList(tempArray)
  //       }
  //     }
  //   }
  // }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
  };

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`
    };
  }

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };


  return (
    <>
      <Dialog
        fullScreen
        open={props.show}
        onClose={() => props.setModalShow(false)}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative', bgcolor: '#3773c6' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => props.setModalShow(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              <div className="d-flex align-items-center">
                <ListItemImg
                  size="52"
                  className="rounded-pill mr-12p"
                  icon={
                    <FontAwesomeIcon
                      icon={solid('building-columns')}
                      className="fs-4 text-subtext"
                    />
                  }
                />
                <div className="bank__title">
                  <h4 className="fw-bolder mb-0">Add Bank Account</h4>
                  <div className="settings__description fs-7">
                    Receive direct deposits for donations you receive.
                  </div>
                </div>
              </div>
            </Typography>
            <Button autoFocus color="inherit" onClick={() => props.setModalShow(false)}>
              Close
            </Button>
          </Toolbar>
        </AppBar>

        <Box
          sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 1500 }}
          className=" mt-4"
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            // onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider' }}
          >
            <Tab label="Business type" {...a11yProps(0)} />
            <Tab label="Personal details" {...a11yProps(1)} />
            <Tab label="Business details" {...a11yProps(2)} />
            <Tab label="Bank details" {...a11yProps(3)} />
            <Tab label="Identity document" {...a11yProps(4)} />
            <Tab label="Upload document" {...a11yProps(5)} />
          </Tabs>

          {value === 0 && (
            <TabContainer>
              <div className="container">
                <h1>Let’s start with some basics</h1>
                <span>Choose your location and business type to get started.</span>

                <div className="mt-5">
                  <div className=" mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">
                      Registered business address
                    </label>
                    <div className="row">
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        name="country"
                        value={defaultCountry}
                        options={countryList}
                        onChange={(e) => {
                          props.setstate({ ...stateData, registerdBusinessAddress: e.value });
                          setDefaultCountry(e);
                        }}
                        components={{
                          IndicatorSeparator: () => null
                        }}
                      />
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1 " className="form-label ">
                      Type of business
                    </label>
                    <div className="row ssnlable ">
                      <div className="col-sm-6  ">
                        <Select
                          className="basic-single"
                          classNamePrefix="select"
                          name="typeOfBusiness"
                          value={defaultTypeOfBusiness}
                          options={businessTypes}
                          onChange={(e) => {
                            props.setstate({ ...stateData, typeOfBusiness: e.value });
                            setDefaultTypeOfBusiness(e);
                          }}
                          components={{
                            IndicatorSeparator: () => null
                          }}
                        />
                      </div>
                      <div className="col-sm-6  ">
                        <p className="text-light">
                          If you have not filed paperwork to register as a business entity, <br />
                          then your business type is likely to be Individual.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-xg"
                  style={{ ...btnstyle, float: 'right' }}
                  onClick={() => props.goToNextStep(0)}
                >
                  Continue &nbsp;
                  <FontAwesomeIcon icon={solid('arrow-right-long')} className=" text-white ml-5" />
                </button>
              </div>
            </TabContainer>
          )}

          {value === 1 && (
            <TabContainer style={{ width: '100%' }}>
              <div className="container">
                <h1>Verify your personal details</h1>
                <span>
                  Stripe collects this information to verify your identity and keep your account
                  safe.
                </span>

                <div className="row mt-5">
                  <div className="col-sm-6">
                    <div className="mb-3 ">
                      <label htmlFor="exampleFormControlInput1" className="form-label">
                        Legal name of person
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        className="form-control"
                        value={stateData.firstName}
                        onChange={(e) => props.changevalue(e)}
                        placeholder="First name"
                      />
                      {stateData.error && stateData.error.firstName && (
                        <p className="error">{stateData.error.firstName}</p>
                      )}

                      <input
                        type="text"
                        name="lastName"
                        className="form-control mt-2"
                        value={stateData.lastName}
                        onChange={props.changevalue}
                        placeholder="Last name"
                      />
                      {stateData.error && stateData.error.lastName && (
                        <p className="error">{stateData.error.lastName}</p>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="exampleFormControlInput1" className="form-label">
                        Email address
                      </label>
                      <input
                        type="email"
                        name="personalEmail"
                        className="form-control"
                        value={stateData.personalEmail}
                        onChange={props.changevalue}
                        placeholder="you@example.com"
                      />
                      {stateData.error && stateData.error.personalEmail && (
                        <p className="error">{stateData.error.personalEmail}</p>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="exampleFormControlInput1" className="form-label">
                        Date of birth
                      </label>
                      <input
                        type="date"
                        name="dob"
                        className="form-control"
                        value={stateData.dob}
                        onChange={props.changevalue}
                      />
                      {stateData.error && stateData.error.dob && (
                        <p className="error">{stateData.error.dob}</p>
                      )}
                    </div>

                    <label htmlFor="exampleFormControlInput1" className="form-label">
                      Phone number
                    </label>
                    <div className="mb-3">
                      <div className="input-group">
                        <span className="input-group-text" id="basic-addon1">
                          +1
                        </span>
                        <input
                          type="text"
                          className="form-control"
                          name="phoneNo"
                          placeholder="(201) 555-0123"
                          onChange={(e) => props.changevalue(e)}
                          value={stateData.phoneNo}
                        />
                      </div>
                      {stateData.error && stateData.error.phoneNo && (
                        <p className="error">{stateData.error.phoneNo}</p>
                      )}
                    </div>

                    <label htmlFor="exampleFormControlInput1" className="form-label ">
                      Last 4 digits of Social Security number
                    </label>
                    <div className="row ssnlable">
                      <div className="col-sm-6 ">
                        <div className="mb-3">
                          <div className="input-group">
                            <span className="input-group-text" id="basic-addon1">
                              ••• – •• –
                            </span>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="6789"
                              name="ssn"
                              value={stateData.ssn}
                              aria-label="ssn"
                              aria-describedby="basic-addon1"
                              onChange={props.changevalue}
                              maxLength="4"
                            />
                          </div>
                          {stateData.error && stateData.error.ssn && (
                            <p className="error">{stateData.error.ssn}</p>
                          )}
                        </div>
                      </div>
                      <div className="col-sm-6 ">
                        <p className="ssninstruction text-light">
                          The last 4 digits of your SSN are only used to verify your identity—no
                          credit checks.
                          <br />
                          SSN number is must same as Last 4 digits of Personal Id Number.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-sm-6">
                    <div className="mb-3">
                      <label htmlFor="exampleFormControlInput1" className="form-label">
                        Home address
                      </label>
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        name="accountHolderType"
                        value={props.defaultHomeCountry}
                        options={countryList}
                        // isDisabled={true}
                        components={{
                          IndicatorSeparator: () => null
                        }}
                        onChange={async (e) => {
                          props.setstate({
                            ...stateData,
                            homeCountry: e.value,
                            currency: e.currency
                          });
                          props.setDefaultHomeCountry(e);
                          await props.getCountryStateList(e.id);
                        }}
                      />

                      <input
                        type="text"
                        name="addLine1"
                        className="form-control mt-3"
                        value={stateData.addLine1}
                        onChange={(e) => props.changevalue(e)}
                        placeholder="Address line 1"
                      />

                      {stateData.error && stateData.error.addLine1 && (
                        <p className="error">{stateData.error.addLine1}</p>
                      )}

                      <input
                        type="text"
                        name="addLine2"
                        className="form-control mt-2"
                        value={stateData.addLine2}
                        onChange={(e) => props.changevalue(e)}
                        placeholder="Address line 2"
                      />
                      {stateData.error && stateData.error.addLine2 && (
                        <p className="error">{stateData.error.addLine2}</p>
                      )}

                      <input
                        type="text"
                        name="city"
                        className="form-control mt-2"
                        value={stateData.city}
                        onChange={(e) => props.changevalue(e)}
                        placeholder="City"
                      />
                      {stateData.error && stateData.error.city && (
                        <p className="error">{stateData.error.city}</p>
                      )}

                      <Select
                        className="basic-single mt-2"
                        classNamePrefix="select "
                        name="accountHolderType"
                        defaultValue={defaultState}
                        options={stateList}
                        placeholder="select State"
                        onChange={(e) => {
                          props.setstate({ ...stateData, stateName: e.value });
                          setDefaultState(e);
                        }}
                      />
                      {stateData.error && stateData.error.stateName && (
                        <p className="error">{stateData.error.stateName}</p>
                      )}

                      <input
                        type="text"
                        name="zip"
                        className="form-control mt-2"
                        value={stateData.zip}
                        onChange={props.changevalue}
                        placeholder="Zip"
                      />
                      {stateData.error && stateData.error.zip && (
                        <p className="error">{stateData.error.zip}</p>
                      )}
                    </div>

                    <div className="mb-3">
                      <label htmlFor="exampleFormControlInput1" className="form-label">
                        Personal Id Number
                      </label>
                      <input
                        type="text"
                        name="personalIdNumber"
                        className="form-control"
                        value={stateData.personalIdNumber}
                        onChange={props.changevalue}
                        placeholder="123456789"
                      />
                      {stateData.error && stateData.error.personalIdNumber && (
                        <p className="error">{stateData.error.personalIdNumber}</p>
                      )}
                    </div>
                  </div>
                </div>
                <br />

                <button
                  type="button"
                  className="btn btn-xg"
                  style={btnstyle}
                  onClick={() => props.goToBack(0)}
                >
                  <FontAwesomeIcon icon={solid('arrow-left-long')} className=" text-white ml-5" />
                  &nbsp; Back
                </button>
                <button
                  type="button"
                  className="btn btn-xg"
                  style={{ ...btnstyle, float: 'right' }}
                  onClick={() => props.goToNextStep(1)}
                >
                  Continue &nbsp;
                  <FontAwesomeIcon icon={solid('arrow-right-long')} className=" text-white ml-5" />
                </button>
              </div>
            </TabContainer>
          )}

          {value === 2 && (
            <TabContainer>
              <div className="container">
                <h1>Tell us more about your business</h1>
                {/* <span>Choose your location and business type to get started.</span> */}

                <div className="mt-5">
                  <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">
                      Business name
                    </label>
                    <input
                      type="text"
                      name="businessName"
                      className="form-control"
                      value={stateData.businessName}
                      onChange={props.changevalue}
                      placeholder="organization Name"
                    />
                    {stateData.error && stateData.error.businessName && (
                      <p className="error">{stateData.error.businessName}</p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">
                      Business website
                    </label>
                    <input
                      type="text"
                      name="businessWebsite"
                      className="form-control"
                      value={stateData.businessWebsite}
                      onChange={props.changevalue}
                      placeholder="https://example.com"
                    />
                    {stateData.error && stateData.error.businessWebsite && (
                      <p className="error">{stateData.error.businessWebsite}</p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">
                      Merchant category code (Mcc)
                    </label>
                    <input
                      type="text"
                      name="mcc"
                      className="form-control"
                      value={stateData.mcc}
                      onChange={props.changevalue}
                      placeholder="0000"
                    />
                    {stateData.error && stateData.error.mcc && (
                      <p className="error">{stateData.error.mcc}</p>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-xg"
                  style={btnstyle}
                  onClick={() => props.goToBack(1)}
                >
                  <FontAwesomeIcon icon={solid('arrow-left-long')} className=" text-white ml-5" />
                  &nbsp; Back
                </button>
                <button
                  type="button"
                  className="btn btn-xg"
                  style={{ ...btnstyle, float: 'right' }}
                  onClick={() => props.goToNextStep(2)}
                >
                  Continue &nbsp;
                  <FontAwesomeIcon icon={solid('arrow-right-long')} className=" text-white ml-5" />
                </button>
              </div>
            </TabContainer>
          )}

          {value === 3 && (
            <TabContainer>
              <div className="container">
                <h1>Add your bank to receive payouts</h1>
                {/* <span>Choose your location and business type to get started.</span> */}

                <div className="mt-5">
                  <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">
                      Account Holder Name
                    </label>
                    <input
                      type="text"
                      name="accountHolderName"
                      className="form-control"
                      value={stateData.accountHolderName}
                      onChange={props.changevalue}
                      placeholder="Name"
                    />
                    {stateData.error && stateData.error.accountHolderName && (
                      <p className="error">{stateData.error.accountHolderName}</p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="bankEmail"
                      className="form-control"
                      value={stateData.bankEmail}
                      onChange={props.changevalue}
                      placeholder="abc@example.com"
                    />
                    {stateData.error && stateData.error.bankEmail && (
                      <p className="error">{stateData.error.bankEmail}</p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">
                      Account Holder Type
                    </label>
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      name="accountHolderType"
                      defaultValue={accountHolderTypes[0]}
                      options={accountHolderTypes}
                      onChange={(e) => props.setstate({ ...stateData, accountHolderType: e.value })}
                      components={{
                        IndicatorSeparator: () => null
                      }}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">
                      Routing number
                    </label>
                    <input
                      type="text"
                      name="routingNumber"
                      className="form-control"
                      value={stateData.routingNumber}
                      onChange={props.changevalue}
                      placeholder="110000000"
                    />
                    {stateData.error && stateData.error.routingNumber && (
                      <p className="error">{stateData.error.routingNumber}</p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">
                      Account number
                    </label>
                    <input
                      type="text"
                      name="accountNumber"
                      className="form-control"
                      value={stateData.accountNumber}
                      onChange={props.changevalue}
                      placeholder="000123456789"
                    />
                    {stateData.error && stateData.error.accountNumber && (
                      <p className="error">{stateData.error.accountNumber}</p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="exampleFormControlInput1" className="form-label">
                      Confirm account number
                    </label>
                    <input
                      type="text"
                      name="confirmAccountNumber"
                      className="form-control"
                      value={stateData.confirmAccountNumber}
                      onChange={props.changevalue}
                      placeholder="000123456789"
                    />
                    {stateData.error && stateData.error.confirmAccountNumber && (
                      <p className="error">{stateData.error.confirmAccountNumber}</p>
                    )}
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-xg"
                  style={btnstyle}
                  onClick={() => props.goToBack(2)}
                >
                  <FontAwesomeIcon icon={solid('arrow-left-long')} className=" text-white ml-5" />
                  &nbsp; Back
                </button>
                <button
                  type="button"
                  className="btn btn-xg"
                  style={{ ...btnstyle, float: 'right' }}
                  onClick={() => props.goToNextStep(3)}
                >
                  Continue &nbsp;
                  <FontAwesomeIcon icon={solid('arrow-right-long')} className=" text-white ml-5" />
                </button>
              </div>
            </TabContainer>
          )}

          {value === 4 && (
            <TabContainer>
              <div className="container">
                <h1>Proof of identity document</h1>
                <span>
                  Please pick which document you'd like to upload in order to verify the identity of
                  first_name last_name.
                </span>

                <div className="mt-5">
                  {stateData.error && stateData.error.identity && (
                    <p className="error">{stateData.error.identity}</p>
                  )}

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input Passport"
                      data-label="Passport"
                      type="radio"
                      name="identity"
                      id="passport"
                      value="passport"
                      style={{ marginTop: 'revert' }}
                      onClick={props.changevalue}
                      checked={stateData.identity === 'passport'}
                    />
                    <label
                      className="form-check-label"
                      name="identity"
                      id="passport"
                      value="passport"
                      htmlFor="passport"
                      style={{ paddingLeft: 'initial' }}
                    >
                      Passport
                    </label>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      data-label="Passport Card"
                      name="identity"
                      id="passport_card"
                      value="passport_card"
                      style={{ marginTop: 'revert' }}
                      onClick={props.changevalue}
                      checked={stateData.identity === 'passport_card'}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="passport_card"
                      style={{ paddingLeft: 'initial' }}
                    >
                      Passport Card
                    </label>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      data-label="Driver license"
                      name="identity"
                      id="driver_license"
                      value="driver_license"
                      style={{ marginTop: 'revert' }}
                      onClick={props.changevalue}
                      checked={stateData.identity === 'driver_license'}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="driver_license"
                      style={{ paddingLeft: 'initial' }}
                    >
                      Driver license
                    </label>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      data-label="State issued ID card"
                      type="radio"
                      name="identity"
                      id="state_issued_id_card"
                      value="state_issued_id_card"
                      style={{ marginTop: 'revert' }}
                      onClick={props.changevalue}
                      checked={stateData.identity === 'state_issued_id_card'}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="state_issued_id_card"
                      style={{ paddingLeft: 'initial' }}
                    >
                      State issued ID card
                    </label>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      data-label="Resident permit ID / U.S. Green Card"
                      type="radio"
                      name="identity"
                      id="permit_id"
                      value="permit_id"
                      style={{ marginTop: 'revert' }}
                      onClick={props.changevalue}
                      checked={stateData.identity === 'permit_id'}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="permit_id"
                      style={{ paddingLeft: 'initial' }}
                    >
                      Resident permit ID / U.S. Green Card
                    </label>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      data-label="Border crossing card"
                      type="radio"
                      name="identity"
                      id="border_crossing_card"
                      value="border_crossing_card"
                      style={{ marginTop: 'revert' }}
                      onClick={props.changevalue}
                      checked={stateData.identity === 'border_crossing_card'}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="border_crossing_card"
                      style={{ paddingLeft: 'initial' }}
                    >
                      Border crossing card
                    </label>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      data-label="Child ID card"
                      type="radio"
                      name="identity"
                      id="child_id_card"
                      value="child_id_card"
                      style={{ marginTop: 'revert' }}
                      onClick={props.changevalue}
                      checked={stateData.identity === 'child_id_card'}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="child_id_card"
                      style={{ paddingLeft: 'initial' }}
                    >
                      Child ID card
                    </label>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      data-label="NYC card"
                      type="radio"
                      name="identity"
                      id="nyc_card"
                      value="nyc_card"
                      style={{ marginTop: 'revert' }}
                      onClick={props.changevalue}
                      checked={stateData.identity === 'nyc_card'}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="nyc_card"
                      style={{ paddingLeft: 'initial' }}
                    >
                      NYC card
                    </label>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      data-label="U.S. visa card"
                      type="radio"
                      name="identity"
                      id="us_visa_card"
                      value="us_visa_card"
                      style={{ marginTop: 'revert' }}
                      onClick={props.changevalue}
                      checked={stateData.identity === 'us_visa_card'}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="us_visa_card"
                      style={{ paddingLeft: 'initial' }}
                    >
                      U.S. visa card
                    </label>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      data-label="Birth Certificate"
                      name="identity"
                      id="birth_certificate"
                      value="birth_certificate"
                      style={{ marginTop: 'revert' }}
                      onClick={props.changevalue}
                      checked={stateData.identity === 'birth_certificate'}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="birth_certificate"
                      style={{ paddingLeft: 'initial' }}
                    >
                      Birth Certificate
                    </label>
                  </div>

                  <div className="form-check mb-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      data-label="Other"
                      name="identity"
                      id="other"
                      value="other"
                      style={{ marginTop: 'revert' }}
                      onClick={props.changevalue}
                      checked={stateData.identity === 'other'}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="other"
                      style={{ paddingLeft: 'initial' }}
                    >
                      Other
                    </label>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn btn-xg"
                  style={btnstyle}
                  onClick={() => props.goToBack(3)}
                >
                  <FontAwesomeIcon icon={solid('arrow-left-long')} className=" text-white ml-5" />
                  &nbsp; Back
                </button>
                <button
                  type="button"
                  className="btn btn-xg"
                  style={{ ...btnstyle, float: 'right' }}
                  onClick={() => props.goToNextStep(4)}
                >
                  Continue &nbsp;
                  <FontAwesomeIcon icon={solid('arrow-right-long')} className=" text-white ml-5" />
                </button>
              </div>
            </TabContainer>
          )}

          {value === 5 && (
            <TabContainer>
              <div className="container">
                <h1>{props.selectedDoc}</h1>
                <span>
                  <b>The document shows exactly this information : </b>
                  <br />
                  Legal name of person <span className="text-light">(First Name & Last Name)</span>
                </span>

                <div className="mt-5">
                  <div className="row">
                    <div className="col-sm-6">
                      <div
                        className="image-upload-wrap mb-3"
                        style={{
                          ...imageuploadwrap,
                          border:
                            !props.tempImgName &&
                            props.tempImgName === '' &&
                            stateData.error.identityDocumentImage
                              ? '4px dashed red'
                              : '4px dashed #3773c6'
                        }}
                      >
                        <input
                          className="file-upload-input"
                          type="file"
                          name="identityDocumentImage"
                          onChange={props.changevalue}
                          accept="image/*"
                          style={fileuploadinput}
                          title=" "
                        />
                        <div className="drag-text" style={{ textAlign: 'center', padding: '70px' }}>
                          <h3 style={{ fontSize: 'inherit' }}>
                            {props.tempImgName && props.tempImgName !== ''
                              ? props.tempImgName
                              : stateData.error.identityDocumentImage
                              ? 'Please Upload Selected Document'
                              : 'Drag and drop a file or select Image'}{' '}
                          </h3>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      {props.tempImg && (
                        <img
                          alt=""
                          src={props.tempImg}
                          width="250px"
                          style={{ width: '150px', height: '200px', objectFit: 'contain' }}
                        />
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-xg"
                  style={btnstyle}
                  onClick={() => props.goToBack(4)}
                >
                  <FontAwesomeIcon icon={solid('arrow-left-long')} className=" text-white ml-5" />
                  &nbsp; Back
                </button>
                <button
                  type="button"
                  className="btn btn-xg"
                  style={{ ...btnstyle, float: 'right' }}
                  onClick={() => props.goToNextStep(5)}
                >
                  <FontAwesomeIcon icon={solid('building-columns')} className=" text-white ml-5" />
                  &nbsp; Add Account
                </button>
              </div>
            </TabContainer>
          )}
        </Box>

        {/* </Modal.Body> */}
        {/* <Modal.Footer className="p-0 border-0 overflow-hidden">
        <Button variant="info" onClick={props.addBankAccount} className="border-top-left-radius-0 py-20p flex-grow-1 m-0 rounded-0">Save</Button>
      </Modal.Footer>
    </Modal> */}
      </Dialog>
    </>
  );
};

export default AddBankModal;
