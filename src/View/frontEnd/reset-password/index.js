import { useState } from 'react';
import { Button, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Link } from 'react-router-dom';
import Logo from '../Component/atoms/logo';


import './style.scss';

const ResetPassword = (props) => {
  let stateData = props.stateData;

  const [showPassword, togglePassword] = useState(false);
  const [showCPassword, toggleCPassword] = useState(false);

  return (
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
                <div className="login-header text-dark">Reset Password</div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="otp"
                    placeholder="OTP"
                    name="otp"
                    value={stateData.otp}
                    onChange={(e) => props.changevalue(e)}
                  />
                  {stateData.error && stateData.error.otp && (
                    <p className="error">
                      {stateData.error ? (stateData.error.otp ? stateData.error.otp : '') : ''}
                    </p>
                  )}
                </div>

                {/* <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    placeholder="Password"
                    name="password" value={stateData.password}
                    onChange={(e) => props.changevalue(e)}
                  />
                  {stateData.error && stateData.error.password && <p className="error">{stateData.error ? stateData.error.password ? stateData.error.password : "" : ""}</p>}
                </div> */}
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

                <InputGroup className="input-group__alpha mt-3 ">
                  <FormControl
                    type={!showCPassword ? 'password' : 'text'}
                    placeholder="Confirm Password"
                    className="bg-white pl-12p"
                    name="cpassword"
                    onChange={(e) => props.changevalue(e)}
                    id="cpassword"
                  />

                  <Button variant="link" onClick={() => toggleCPassword(!showCPassword)}>
                    <FontAwesomeIcon
                      icon={solid('eye')}
                      className={`${showCPassword ? 'text-primary' : 'text-light'}`}
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

                {/* <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="cpassword"
                    placeholder="Confirm Password"
                    name="cpassword" value={stateData.cpassword}
                    onChange={(e) => props.changevalue(e)}
                  />
                  {stateData.error && stateData.error.cpassword && <p className="error">{stateData.error ? stateData.error.cpassword ? stateData.error.cpassword : "" : ""}</p>}
                </div> */}

                <Button size="lg" className="fw-bold w-100 mb-4 mt-3" onClick={() => props.reset()}>
                  Submit
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

export default ResetPassword;
