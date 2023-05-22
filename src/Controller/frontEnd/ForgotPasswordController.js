//import FrontLoader from "../../Common/FrontLoader";
// import ForgotPassword from "../../View/frontEnd/Layout/ForgotPassword";
import React, { useState } from 'react';
// import ResetPassword from "../../View/frontEnd/Layout/ResetPassword";
import { useNavigate } from 'react-router-dom';
import ToastAlert from '../../Common/ToastAlert';
import { validateAll } from 'indicative/validator';
import userAuthApi from '../../Api/frontEnd/auth';
import ForgotPassword from '../../View/frontEnd/forgot-password';
import Page from '../../components/Page';

const SEND_OTP_RULES = {
  email: 'required|email'
};

const SEND_OTP_MESSAGE = {
  'email.required': 'Email is Required.',
  'email.email': 'please enter valid email.'
};
export default function ForgotPasswordController() {
  const [loading, setLoading] = useState(false);
  //const [isSendOtp, setIsSendOtp] = useState(false)
  const [state, setstate] = useState({
    email: '',
    // password: "",
    // cpassword: "",
    // otp: "",
    error: []
  });
  const {
    email
    // password,cpassword,otp,
  } = state;
  const navigate = useNavigate();

  const changevalue = (e) => {
    let value = e.target.value;
    setstate({
      ...state,
      [e.target.name]: value
    });
  };
  const sendOtp = () => {
    validateAll(state, SEND_OTP_RULES, SEND_OTP_MESSAGE)
      .then(async () => {
        const formaerrror = {};
        setstate({
          ...state,
          error: formaerrror
        });
        setLoading(true);

        const sendOtp = await userAuthApi.sendOtp(email);

        if (!sendOtp) {
          setLoading(false);
          ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
          return;
        }

        if (!sendOtp.data.success) {
          setLoading(false);
          ToastAlert({ msg: sendOtp.data.message, msgType: 'error' });
        } else {
          // setIsSendOtp(true)
          setstate({
            ...state,
            email: '',
            error: []
          });
          ToastAlert({ msg: sendOtp.data.message, msgType: 'success' });
          setLoading(false);
          navigate('/signin');
        }
      })
      .catch((errors) => {
        setLoading(false);
        const formaerrror = {};
        if (errors.length) {
          errors.forEach((element) => {
            formaerrror[element.field] = element.message;
          });
        } else {
          ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
        }

        setstate({
          ...state,
          error: formaerrror
        });
      });
  };

  return (
    <>
      {/*<FrontLoader loading={loading} />*/}
      <Page
        title="Donorport | Forgot Password "
        description="Change your password for your Donorport account"
      >
        <ForgotPassword
          changevalue={changevalue}
          stateData={state}
          sendOtp={sendOtp}
          loading={loading}
        />
      </Page>
    </>
  );
}
