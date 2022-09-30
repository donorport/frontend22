import { useState } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link } from 'react-router-dom';
// import { Logo } from "@components/atoms";
// import { Footer } from "@components/organisms";

import Logo from '../Component/atoms/logo';
import Footer from '../Component/organisms/footer';

import './style.scss';

const Login = (props) => {
  let stateData = props.stateData;

  const [showPassword, togglePassword] = useState(false);
  return (
    <>
      <div className="bg-lighter authPage">
        <div className="login">
          <div className="login__left d-none d-sm-flex align-items-center justify-content-center flex__1">
            <div className="login__hero">
              <h2 className="login-title fw-bolder">Welcome to Donorport</h2>
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
                  For information on how Donorport works <a href="/"> click here.</a>
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
                <div className="login-header">Sign in</div>
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
                    src="https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/5e42d16e0a69c19be816de35_Google__G__Logo.svg"
                    alt=""
                  />
                  <span className="fw-bold">Sign in with Google</span>
  </Button>*/}
                <Button size="lg" className="w-100 mb-4" onClick={() => props.signIn()}>
                  Login
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

      <Footer />
    </>
  );
};

export default Login;
