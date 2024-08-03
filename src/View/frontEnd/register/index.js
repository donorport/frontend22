import { useState } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import Logo from '../Component/atoms/logo';
import Toggle from '../Component/organisms/toggle';

import './style.scss';

const Register = (props) => {
  let stateData = props.stateData;
  const countryList = props.countryList;

  const [showPassword, togglePassword] = useState(false);
  return (
    <div className="d-flex flex-column bg-lighter authPage">
      <div className="login">
        <div className="login__left d-none d-md-flex align-items-center justify-content-center flex-grow-1">
          <div className="login__hero">
            <div className="chart-comment-block">
              <div className="from-me">
                <p>Have you made a Donorport account yet?</p>
              </div>
              <div className="clear"></div>
              <div className="from-them">
                <p>What's Donorport?</p>
              </div>
              <div className="clear"></div>
              <div className="from-me">
                <p>😤 It's like GoFundMe but for non-profits</p>
              </div>
              <div className="clear"></div>
              <div className="from-them">
                <p>How does it work? 😇</p>
              </div>
              <div className="clear"></div>
              <div className="from-me">
                <p>You pay for things non-profits need instead of just giving them money</p>
              </div>
              <div className="clear"></div>
              <div className="from-them">
                <p>Now that's cool 😎</p>
              </div>
            </div>
            <div className="chat-info-wrap">
              <a href="/" className="d-flex">
                <FontAwesomeIcon icon={regular('circle-info')} className="text-info" />
              </a>
              <p>
                For information on how Donorport works <a href="/about"> click here.</a>
              </p>
            </div>
          </div>
        </div>
        <div className="login__modal">
          <div className="login-form-wrapper mw-400">
            <div className="login__logo">
              <Logo />
              <Toggle />
            </div>

            <form className="login__form">
              <h5 className="login-header ">Sign Up</h5>
              <div className="fs-6 d-sm-flex align-items-start align-items-lg-center flex-grow-1 flex-column flex-lg-row gap-1 lh-md-md text-nowrap">
                <FontAwesomeIcon icon={regular('circle-question')} style={{ color: '#5f5df8' }} />
                <div>
                  {' '}
                  &nbsp; Charities&nbsp;
                  <Link to="/apply" className="link d-inline-block">
                    click here
                  </Link>
                  &nbsp;to create your account.
                </div>
              </div>

              {stateData.error && stateData.error.country && (
                <p className="error">{stateData.error.country}</p>
              )}
              <div className="d-flex flex-column gap-3 mt-3">
                {' '}
                <input
                  type="text"
                  className="input__wrap form-control"
                  name="name"
                  id="name"
                  value={stateData.name}
                  onChange={(e) => props.changevalue(e)}
                  placeholder="Name"
                />
                {stateData.error && stateData.error.name && (
                  <p className="error">
                    {stateData.error ? (stateData.error.name ? stateData.error.name : '') : ''}
                  </p>
                )}
                <input
                  type="email"
                  className="input__wrap form-control"
                  id="email"
                  placeholder="Email"
                  name="email"
                  value={stateData.email}
                  onChange={(e) => props.changevalue(e)}
                />
                {stateData.error && stateData.error.email && (
                  <p className="error">
                    {stateData.error ? (stateData.error.email ? stateData.error.email : '') : ''}
                  </p>
                )}
                <InputGroup className="input-group__alpha btn-password">
                  <FormControl
                    type={!showPassword ? 'password' : 'text'}
                    placeholder="Password"
                    className=" pl-12p"
                    name="password"
                    onChange={(e) => props.changevalue(e)}
                    id="inputPassword"
                  />

                  <Button
                    className="p-2"
                    variant="link"
                    onClick={() => togglePassword(!showPassword)}
                  >
                    <FontAwesomeIcon
                      icon={solid('eye')}
                      className={`${showPassword ? 'text-primary' : 'text-light'}`}
                    />
                  </Button>
                </InputGroup>
                {stateData.error && stateData.error.password && (
                  <p className="error">
                    {stateData.error
                      ? stateData.error.password
                        ? stateData.error.password
                        : ''
                      : ''}
                  </p>
                )}
                <InputGroup className="input-group__alpha btn-password">
                  <FormControl
                    // type={!showPassword ? "password" : "text"}
                    type={!props.showCPassword ? 'password' : 'text'}
                    placeholder="Confirm Password"
                    className=" pl-12p"
                    name="cpassword"
                    onChange={(e) => props.changevalue(e)}
                    id="inputPassword"
                  />

                  <Button
                    className="p-2"
                    variant="link"
                    onClick={() => props.setShowCPassword(!props.showCPassword)}
                  >
                    <FontAwesomeIcon
                      icon={solid('eye')}
                      className={`${props.showCPassword ? 'text-primary' : 'text-light'}`}
                    />
                  </Button>
                </InputGroup>
                {stateData.error && stateData.error.cpassword && (
                  <p className="error">
                    {stateData.error
                      ? stateData.error.cpassword
                        ? stateData.error.cpassword
                        : ''
                      : ''}
                  </p>
                )}
              </div>

              {/* <div className="form-check-wrap mt-3 mb-5">
                  <div className="form-check d-flex align-items-center">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="rememberCheck"
                    />
                    <label className="form-check-label" htmlFor="rememberCheck">
                      Remember me
                    </label>
                  </div>
                  <a className="forget-text" href="/">
                    Forgot Password?
                  </a>
                </div> */}
              {/* <Button
                  variant="outline-light"
                  className="btn__google mb-4 w-100  mt-3"
                >
                  <img
                    className="img-fluid"
                    src=""
                    alt=""
                  />
                  <span className="fw-bold">Sign Up with Google</span>
              </Button>*/}
              <Button
                variant="info"
                style={{ width: '100%', opacity: props.loading ? '0.7' : '1' }}
                className="w-100 mb-4 mt-4"
                onClick={() => !props.loading && props.signUp()}
              >
                Register
                {props.loading && <CircularProgress className="ms-2" color="inherit" size={12} />}
              </Button>
              {/* <Button
                  variant="link"
                  className="text-light w-100 p-0 fw-normal"
                  
                >
                  Don’t have an account? Sign up
                </Button> */}
              <Link className="text-light w-100 p-0 fw-normal" to="/signin">
                Already have an account? Sign in
              </Link>
              {/* <Link to='/signin' className="btn btn-link">Already have an account? Sign in</Link> */}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
