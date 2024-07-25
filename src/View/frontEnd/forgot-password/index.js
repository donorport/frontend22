import { useState } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import Logo from '../Component/atoms/logo';

import './style.scss';

const ForgotPassword = (props) => {
  let stateData = props.stateData;

  const [showPassword, togglePassword] = useState(false);
  return (
    <div className="bg-lighter authPage">
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
              <span className="lh-1">
                For information on how Donorport works <a href="/about"> click here.</a>
              </span>
            </div>
          </div>
        </div>
        <div className="login__modal">
          <div className="login-form-wrapper mw-400">
            <div className="login__logo">
              <Logo />
            </div>

            <form className="login__form">
              <div className="login-header ">Forgot Password</div>
              <div className="fs-6 d-sm-flex align-items-start align-items-lg-center flex-grow-1 flex-column flex-lg-row gap-2 lh-md-md mb-5 text-nowrap">
                <FontAwesomeIcon
                  className="me-1"
                  icon={regular('circle-question')}
                  style={{ color: '#5f5df8' }}
                />
                Please enter your email to reset your password.
              </div>
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
                variant="info"
                className="fw-bold w-100 mb-4"
                onClick={() => !props.isLoading && props.sendOtp()}
              >
                Reset Password
                {props.isLoading && <CircularProgress className="ms-2" color="inherit" size={12} />}
              </Button>

              <Link className="text-light w-100 p-0 fw-normal" to="/signin">
                Back To Sign in
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
