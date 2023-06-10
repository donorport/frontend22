import { useState } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import Logo from '../Component/atoms/logo';
import { GoogleLogin } from 'react-google-login';

import './style.scss';

const Login = (props) => {
  let stateData = props.stateData;
  const responseGoogle = (response) => {
    // Handle the response from Google Sign-In
    console.log(response);
  };
  const [showPassword, togglePassword] = useState(false);
  return (
    <div className="d-flex flex-column bg-lighter authPage">
      <div className="login">
        <div className="login__left d-none d-sm-flex align-items-center justify-content-center flex__1">
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
              <span className="lh-1">
                For information on how Donorport works <a href="/about"> click here.</a>
              </span>
            </div>
          </div>
        </div>
        <div className="login__modal">
          <div className="login-form-wrapper">
            <div className="login__logo">
              <Logo />
            </div>

            <form className="login__form">
              <div className="login-header text-dark">Sign in</div>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control"
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
              </div>

              <InputGroup className="input-group__alpha ">
                <FormControl
                  type={!showPassword ? 'password' : 'text'}
                  placeholder="Password"
                  className="bg-white pl-12p"
                  name="password"
                  onChange={(e) => props.changevalue(e)}
                  id="inputPassword"
                />

                <Button variant="link" onClick={() => togglePassword(!showPassword)}>
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

              <div className="form-check-wrap mt-3 mb-5">
                <div className="form-check d-flex align-items-center">
                  <input type="checkbox" className="form-check-input" id="rememberCheck" />
                  <label className="form-check-label" htmlFor="rememberCheck">
                    Remember me
                  </label>
                </div>
                <Link className="forget-text" to="/forgot-password">
                  Forgot Password?
                </Link>
              </div>
              {/* <Button
                  variant="outline-light"
                  className="btn__google mb-4 w-100"
                >
                  <img
                    className="img-fluid"
                    src=""
                    alt=""
                  />
                  <span className="fw-bold">Sign in with Google</span>
  </Button>*/}

              {/* <GoogleLogin
                clientId="842709512025-uab2cipbdmtq5fv2c0fd8asn1crtg1e0.apps.googleusercontent.com"
                buttonText="Sign in with Google"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
              /> */}

              <Button
                size="lg"
                className="fw-bold w-100 mb-4"
                style={{ width: '100%', opacity: props.loading ? '0.7' : '1' }}
                onClick={() => !props.loading && props.signIn()}
              >
                Login
                {props.loading && <CircularProgress className="ms-2" color="inherit" size={12} />}
              </Button>

              {/* <Button
                  variant="link"
                  className="text-light w-100 p-0 fw-normal"
                  
                >
                  Don’t have an account? Sign up
                </Button> */}
              <Link className="text-light w-100 p-0 fw-normal" to="/signup">
                Don’t have an account? Sign up
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
