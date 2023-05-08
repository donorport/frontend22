import React, { useState } from 'react';
import { Button, InputGroup, Container, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import './style.scss';
import DefaultLayout from '../Component/templates/default-layout';
import RadioToggle from '../Component/atoms/radio-toggle';
import Select from 'react-select';
import CircularProgress from '@mui/material/CircularProgress';
import Page from '../../../components/Page';

const Apply = (props) => {
  const { error, name, organization, ein, email, confirmEmail, password, cpassword } =
    props.stateData;

  const blocks = props.blocks;
  const activateCode = props.activateCode;
  const selected = props.selected;
  const onValueChange = props.onValueChange;
  const changevalue = props.changevalue;
  const applyOrganization = props.apply;
  const countryList = props.countryList;
  const categoryList = props.categoryList;

  return (
    <Page
      title="Donorport | Apply"
      description="Create you charity account. For more information about the application process please naviagte to the About Us page"
    >
      <div className="frontend_pages">
        <DefaultLayout>
          <div className="password-reset position-relative ">
            <Container fluid className="position-relative pb-5 pt-5 container-fluid">
              <div className="mw-600">
                <h1 className="text-dark fw-bolder pt-2 mb-4">Getting Started</h1>
                {/* <div className="fs-5 text-light mb-4">
                Activate your account to create your organization's administration page or apply to
                receive your activation code.
              </div> */}
                <h4 className="fw-bolder text-dark">Step 1 - Create your account</h4>
                <div className="text-light mb-4 fs-5">
                  Before you can post on Donorport, you must first be approved by the Donorport
                  team. Fill out the form below and click Submit to apply.
                </div>
                <h4 className="fw-bolder text-dark">Step 2 - Activate</h4>
                <div className="text-light mb-2 fs-5">
                  Once Donorport has approved your application, a 4 digit authentication code will
                  be sent to the email you provided. Enter the code in the box below to activate
                  your account.
                </div>
                <div className="activate mw-400 mb-5">
                  <div className="activate__icon">
                    <FontAwesomeIcon icon={regular('fingerprint')} />
                  </div>
                  <div className="activate__code d-flex flex__1 justify-content-around">
                    {blocks}
                  </div>
                  <Button
                    variant="info"
                    size="lg"
                    className="ms-2 fw-bold fs-6"
                    onClick={() => activateCode()}
                  >
                    Activate
                  </Button>
                </div>

                <div className="mw-400">
                  <Form className="mb-5" autocomplete="off">
                    {/*    <div className="py-1 d-flex justify-content-between fs-4 mb-3">
                    <RadioToggle
                      outline={true}
                      checked={selected === 'charity'}
                      value="charity"
                      className="rounded-pill"
                      name="app"
                      onChange={onValueChange}
                    >
                      Charity
                    </RadioToggle>
                    <RadioToggle
                      outline={true}
                      checked={selected === 'nonprofit'}
                      value="nonprofit"
                      className="rounded-pill"
                      name="app"
                      onChange={onValueChange}
                    >
                      Nonprofit
                    </RadioToggle>
                    <RadioToggle
                      outline={true}
                      checked={selected === 'bcorp'}
                      value="bcorp"
                      className="rounded-pill"
                      name="app"
                      onChange={onValueChange}
                    >
                      B Corp
                    </RadioToggle>
                  </div>*/}
                    <InputContainer 
                      autoComplete="new-password"
                      name="name"
                      value={name}
                      onChange={changevalue}
                      label="Contact Name"
                      error={error}
                    />
                    {/*
                    <div className="input__wrap d-flex">
                      <label className="input__label flex__1">
                        <input
                          autoComplete="new-password"
                          type="text"
                          name="name"
                          value={name}
                          onChange={(e) => changevalue(e)}
                        />
                        <span className="input__span">Contact Name</span>
                      </label>
                    </div>
                    {error && error.name && (
                      <p className="error">{error ? (error.name ? error.name : '') : ''}</p>
                    )}
                    */}

                    <SelectContainer 
                      name="country"
                      value={props.defaultCountry}
                      onChange={props.onChangeCountry}
                      label="Country"
                      options={countryList}
                      error={error}
                    />
                    {/*
                    <div className="input__wrap d-flex">
                      <label className="input__label flex__1">
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      autoComplete="nope"
                      aria-autocomplete="none"
                      value={props.defaultCountry}
                      name="country"
                      options={countryList}
                      onChange={props.onChangeCountry}
                      components={{
                        IndicatorSeparator: () => null
                      }}
                    />
                    <span className="input__span">Country</span>
                  </label>
                </div>
                {error && error.country && <p className="error">{error.country}</p>}
                */}

                    <SelectContainer 
                      name="category"
                      value={props.defaultCategory}
                      onChange={props.onChangeCategory}
                      label="Category"
                      options={categoryList}
                      error={error}
                    />
                    {/*
                    <div className="input__wrap d-flex">
                      <label className="input__label flex__1">
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      autoComplete="new-password"
                      value={props.defaultCategory}
                      name="country"
                      options={categoryList}
                      onChange={props.onChangeCategory}
                      components={{
                        IndicatorSeparator: () => null
                      }}
                    />
                    <span className="input__span">Category</span>
                  </label>
                </div>
                {error && error.category && <p className="error">{error.category}</p>}
                */}

                    <InputContainer 
                      autoComplete="new-password"
                      name="organization"
                      value={organization}
                      onChange={changevalue}
                      label="Organization Name"
                      error={error}
                    />
                    {/*
                    <div className="input__wrap d-flex">
                      <label className="input__label flex__1">
                        <input
                          type="text"
                          autoComplete="new-password"
                          name="organization"
                          value={organization}
                          onChange={(e) => changevalue(e)}
                        />
                        <span className="input__span">Organization Name</span>
                      </label>
                    </div>
                    {error && error.organization && (
                      <p className="error">
                        {error ? (error.organization ? error.organization : '') : ''}
                      </p>
                    )}
                    */}

                    <InputContainer 
                      autoComplete="new-password"
                      name="ein"
                      value={ein}
                      onChange={changevalue}
                      label="Charity Registration Number"
                      error={error}
                    />
                    {/*
                    <div className="input__wrap d-flex">
                      <label className="input__label flex__1">
                        <input
                          type="text"
                          autoComplete="new-password"
                          name="ein"
                          value={ein}
                          onChange={(e) => changevalue(e)}
                        />
                    <span className="input__span">Charity Registration Number</span>
                  </label>
                </div>
                {error && error.ein && (
                  <p className="error">{error ? (error.ein ? error.ein : '') : ''}</p>
                )}
                */}

                    <InputContainer 
                      autoComplete="new-password"
                      type="email"
                      name="email"
                      value={email}
                      onChange={changevalue}
                      label="Email"
                      error={error}
                    />
                    {/*
                    <div className="input__wrap d-flex">
                      <label className="input__label flex__1">
                        <input
                          type="email"
                          autoComplete="email"
                          name="email"
                          value={email}
                          onChange={(e) => changevalue(e)}
                        />
                        <span className="input__span">Email</span>
                      </label>
                    </div>
                    {error && error.email && (
                      <p className="error">{error ? (error.email ? error.email : '') : ''}</p>
                    )}
                    */}

                    <InputContainer 
                      autoComplete="new-password"
                      type="email"
                      name="confirmEmail"
                      value={confirmEmail}
                      onChange={changevalue}
                      label="Confirm Email"
                      error={error}
                    />
                    {/*
                    <div className="input__wrap d-flex">
                      <label className="input__label flex__1">
                        <input
                          type="email"
                          name="confirmEmail"
                          autoComplete="email"
                          value={confirmEmail}
                          onChange={(e) => changevalue(e)}
                        />
                        <span className="input__span" name="confirmEmail">
                          Confirm Email
                        </span>
                      </label>
                    </div>
                    {error && error.confirmEmail && (
                      <p className="error">
                        {error ? (error.confirmEmail ? error.confirmEmail : '') : ''}
                      </p>
                    )}
                    */}

                    <InputContainer 
                      autoComplete="new-password"
                      type="password"
                      name="password"
                      value={password}
                      onChange={changevalue}
                      label="Password"
                      error={error}
                    />
                    {/*
                    <div className="input__wrap d-flex">
                      <label className="input__label flex__1">
                        <input
                          type="password"
                          name="password"
                          autoComplete="new-password"
                          value={password}
                          onChange={(e) => changevalue(e)}
                        />
                        <span className="input__span" name="password">
                          Password
                        </span>
                      </label>
                    </div>
                    {error && error.password && (
                      <p className="error">{error ? (error.password ? error.password : '') : ''}</p>
                    )}
                    */}

                    <InputContainer 
                      autoComplete="new-password"
                      type="password"
                      name="cpassword"
                      value={cpassword}
                      onChange={changevalue}
                      label="Confirm Password"
                      error={error}
                    />
                    {/*
                    <div className="input__wrap d-flex">
                      <label className="input__label flex__1">
                        <input
                          type="password"
                          name="cpassword"
                          autoComplete="new-password"
                          value={cpassword}
                          onChange={(e) => changevalue(e)}
                        />
                        <span className="input__span" name="cpassword">
                          Confirm Password
                        </span>
                      </label>
                    </div>
                    {error && error.cpassword && (
                      <p className="error">
                        {error ? (error.cpassword ? error.cpassword : '') : ''}
                      </p>
                    )}
                    */}

                    <Button
                      variant="info"
                      size="lg"
                      className="fw-bold px-4 mt-2"
                      style={{ width: '100%', opacity: props.loading ? '0.7' : '1' }}
                      onClick={() => !props.loading && applyOrganization()}
                    >
                      Submit
                      {props.loading && (
                        <CircularProgress className="ms-1" color="inherit" size={12} />
                      )}
                    </Button>
                  </Form>
                </div>

                <h3 className="fw-bolder text-dark">Why Donorport?</h3>

                <div className="fee__list d-sm-flex fs-5 text-light">
                  <div className="">
                    <div className="d-flex align-items-center my-3">
                      <FontAwesomeIcon icon={solid('check')} className="fs-4 me-3" />
                      <span>Organization keeps 100% of the proceeds</span>
                    </div>
                    <div className="d-flex align-items-center my-3">
                      <FontAwesomeIcon icon={solid('check')} className="fs-4 me-3" />
                      <span>Manage all of your tax receipts on one place</span>
                    </div>
                    <div className="d-flex align-items-center my-3">
                      <FontAwesomeIcon icon={solid('check')} className="fs-4 me-3" />
                      <span>Scale your donations using the donation amount tool</span>
                    </div>
                  </div>

                  <div>
                    <div className="d-flex align-items-center my-3">
                      <FontAwesomeIcon icon={solid('check')} className="fs-4 me-3" />
                      <span>Completely transparent; Sales receipts, need media</span>
                    </div>
                    <div className="d-flex align-items-center my-3">
                      <FontAwesomeIcon icon={solid('check')} className="fs-4 me-3" />
                      <span>Money back guaranteed for unfunded items</span>
                    </div>
                    <div className="d-flex align-items-center my-3">
                      <FontAwesomeIcon icon={solid('check')} className="fs-4 me-3" />
                      <span>24/7 Support for Organizations and Donors</span>
                    </div>
                  </div>
                </div>
              </div>
            </Container>
          </div>
        </DefaultLayout>
      </div>
    </Page>
  );
};

const InputContainer = ({ type, name, value, autoComplete, onChange, label, error }) => (
  <>
    <div className="input__wrap d-flex">
      <label className="input__label flex__1">
        <input
          autoComplete={autoComplete}
          type={type ?? "text"}
          name={name}
          value={value}
          onChange={onChange}
        />
        <span className="input__span">{label}</span>
      </label>
    </div>
    {error && error?.[name] && <p className="error">{error[name]}</p>}
  </>
);

const SelectContainer = ({name, value, options, onChange, label, error }) => (
  <>
    <div className="input__wrap d-flex">
      <label className="input__label flex__1">
        {/* <input type="text" value='' /> */}
        {/* {countrySelect.current} */}
        <Select
          className="basic-single"
          classNamePrefix="select"
          autoComplete="nope"
          aria-autocomplete="none"
          value={value}
          name={name}
          options={options}
          onChange={onChange}
          components={{
            IndicatorSeparator: () => null
          }}
        />
        <span className="input__span">{label}</span>
      </label>
    </div>
    {error && error?.[name] && <p className="error">{error[name]}</p>}
  </>
);

export default Apply;
