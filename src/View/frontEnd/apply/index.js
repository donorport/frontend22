import React, { useState } from 'react';
import { Button, InputGroup, Container, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import './style.scss';
import DefaultLayout from '../Component/templates/default-layout';
import RadioToggle from '../Component/atoms/radio-toggle';
import Select from 'react-select';
import CircularProgress from '@mui/material/CircularProgress';

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
    <div className="frontend_pages">
      <DefaultLayout>
        <div className="password-reset position-relative ">
          <Container fluid className="position-relative pb-5 pt-5 container-fluid">
            <div className="mw-600">
              <h1 className="text-dark fw-bolder mb-6p pt-2">New Charities</h1>
              <div className="fs-5 text-light mb-4">
                Activate your account to create your organization's administration page or apply to
                receive your activation code.
              </div>

              <div className="activate mw-400 mb-5">
                <div className="activate__icon">
                  <FontAwesomeIcon icon={regular('fingerprint')} />
                </div>
                <div className="activate__code d-flex flex__1 justify-content-around">{blocks}</div>
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
                <h4 className="fw-bolder text-dark">Apply for an account</h4>
                <div className="text-light mb-2">
                  Let us know if you want to post on Donorport. For more information about the
                  application process <a className="link" href="/about">click here</a>
                </div>
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

                  <div className="input__wrap d-flex">
                    <label className="input__label flex__1">
                      <input
                        autoComplete="new-password"
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => changevalue(e)}
                      />
                      <span className="input__span">Name</span>
                    </label>
                  </div>
                  {error && error.name && (
                    <p className="error">{error ? (error.name ? error.name : '') : ''}</p>
                  )}

                  <div className="input__wrap d-flex">
                    <label className="input__label flex__1">
                      {/* <input type="text" value='' /> */}
                      {/* {countrySelect.current} */}
                      <Select
                        className="basic-single"
                        classNamePrefix="select"
                        autoComplete="new-password"
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

                  <div className="input__wrap d-flex">
                    <label className="input__label flex__1">
                      {/* <input type="text" value='' /> */}
                      {/* {countrySelect.current} */}
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

                  <div className="input__wrap d-flex">
                    <label className="input__label flex__1">
                      <input
                        type="text"
                        autoComplete="new-password"
                        name="organization"
                        value={organization}
                        onChange={(e) => changevalue(e)}
                      />
                      <span className="input__span">Organization</span>
                    </label>
                  </div>
                  {error && error.organization && (
                    <p className="error">
                      {error ? (error.organization ? error.organization : '') : ''}
                    </p>
                  )}

                  <div className="input__wrap d-flex">
                    <label className="input__label flex__1">
                      <input
                        type="text"
                        autoComplete="new-password"
                        name="ein"
                        value={ein}
                        onChange={(e) => changevalue(e)}
                      />
                      {/* <span className="input__span">Employer Identification Number (EIN)</span> */}
                      <span className="input__span">Charity Registration Number</span>
                    </label>
                  </div>
                  {error && error.ein && (
                    <p className="error">{error ? (error.ein ? error.ein : '') : ''}</p>
                  )}

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

                  <div className="input__wrap d-flex mb-3">
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

                  <div className="input__wrap d-flex mb-3">
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

                  <div className="input__wrap d-flex mb-3">
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
                    <p className="error">{error ? (error.cpassword ? error.cpassword : '') : ''}</p>
                  )}

                  <Button
                    variant="info"
                    size="lg"
                    className="fw-bold px-4"
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
  );
};

export default Apply;
