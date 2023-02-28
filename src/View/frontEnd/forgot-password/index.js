import { useState } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
// import { Logo } from "@components/atoms";
// import { Footer } from "@components/organisms";

import Logo from '../Component/atoms/logo';
import NoFooterHeader from '../Component/templates/no-footer-header';

import './style.scss';

const ForgotPassword = (props) => {
  let stateData = props.stateData;

  const [showPassword, togglePassword] = useState(false);
  return (
    <NoFooterHeader>
      <div className="bg-lighter authPage">
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
                <div className="login-header text-dark">Forgot Password</div>
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

                <Button
                  style={{ width: '100%', opacity: props.isLoading ? '0.7' : '1' }}
                  size="lg"
                  className="fw-bold w-100 mb-4"
                  onClick={() => !props.isLoading && props.sendOtp()}
                >
                  Submit
                  {props.isLoading && (
                    <CircularProgress className="ms-2" color="inherit" size={12} />
                  )}
                </Button>

                <Link className="text-light w-100 p-0 fw-normal" to="/signin">
                  Back To Sign in
                </Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </NoFooterHeader>
  );
};

export default ForgotPassword;
