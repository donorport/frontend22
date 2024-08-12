import React, { useState } from 'react';
import { validateAll } from 'indicative/validator';
//import FrontLoader from '../../Common/FrontLoader';
import ToastAlert from '../../Common/ToastAlert';
// import Signin from "../../View/frontEnd/Layout/Signin"
import userAuthApi from '../../Api/frontEnd/auth';
import { useNavigate } from 'react-router-dom';
import Login from '../../View/frontEnd/login';
import { useDispatch } from 'react-redux';
import {
  setCurrency,
  //setUserLanguage,
  //setCurrencyPrice,
  setProfileImage,
  //setUserCountry,
  setUserXp,
  //setUserRank,
  setUserRole,
  setIsAccountAdd
} from '../../user/user.action';
//import locationApi from '../../Api/frontEnd/location';
import helper from '../../Common/Helper';
//import userApi from '../../Api/frontEnd/user';
import defaultAvatar from '../../assets/images/avatar.png';
import adminCampaignApi from '../../Api/admin/adminCampaign';
import Page from '../../components/Page';
import axios from 'axios';

const SIGNIN_RULES = {
  email: 'required|email',
  password: 'required'
};

const SIGNIN_MESSAGE = {
  'email.required': 'Email is required.',
  'email.email': 'please enter valid email.',
  'password.required': 'Password is required.'
};

function SigninController() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  //const user = useSelector((state) => state.user);

  const [state, setstate] = useState({
    email: '',
    password: '',
    error: []
  });
  const { email, password } = state;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //const convertCurrency = async (currency) => {
  //const getCurrencyPrice = await locationApi.convertCurrency(currency);
  //if (getCurrencyPrice) {
  //// console.log(getCurrencyPrice)
  //// console.log(getCurrencyPrice.data.result)

  //if (getCurrencyPrice.data.success) {
  //dispatch(setCurrencyPrice(getCurrencyPrice.data.result));
  //}
  //}
  //};

  const checkOrgBankAc = async (token) => {
    const check = await adminCampaignApi.chekOrganizationAccount(token);
    if (check) {
      dispatch(setIsAccountAdd(check.data.success));
    }
  };

  //const getUserRank = async (token) => {
  //const getRank = await userApi.getUserRank(token);
  //if (getRank) {
  //if (getRank.data.success) {
  //dispatch(setUserRank(getRank.data.rank));
  //}
  //}
  //};

  const signIn = () => {
    validateAll(state, SIGNIN_RULES, SIGNIN_MESSAGE)
      .then(async () => {
        setLoading(true);
        const formaerrror = {};
        setstate({
          ...state,
          error: formaerrror
        });
  
        const uselogin = await userAuthApi.login(email, password);
  
        if (!uselogin) {
          setLoading(false);
          ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
          return;
        }
  
        if (!uselogin.data.success) {
          setLoading(false);
          ToastAlert({ msg: uselogin.data.message, msgType: 'error' });
          return;
        }
  
        if (!(
          uselogin.data.roleName === 'USER' ||
          uselogin.data.roleName === 'CAMPAIGN_ADMIN' ||
          uselogin.data.roleName === 'TEAM_MEMBER'
        )) {
          setLoading(false);
          ToastAlert({ msg: 'User Not Found', msgType: 'error' });
          return;
        }
  
        if (uselogin.data.roleName === 'CAMPAIGN_ADMIN' && uselogin.data.otp_status !== 1) {
          setLoading(false);
          ToastAlert({ msg: 'Campaign Admin not Active.', msgType: 'error' });
          return;
        }
  
        // Preserve the theme-related data
        const theme = localStorage.getItem('theme');
  
        // Clear only user-specific data
        localStorage.removeItem('userData');
        localStorage.removeItem('userAuthToken');
  
        dispatch(setUserRole(uselogin.data.roleName));
  
        if (uselogin.data.roleName === 'CAMPAIGN_ADMIN') {
          await checkOrgBankAc(uselogin.data.accessToken);
          let currencyData = {
            currency: uselogin.data.currency,
            currencySymbol: uselogin.data.symbol
          };
          dispatch(setCurrency(currencyData));
  
          if (uselogin.data.logo) {
            dispatch(setProfileImage(helper.CampaignAdminLogoPath + uselogin.data.logo));
          } else {
            dispatch(setProfileImage(defaultAvatar));
          }
  
          localStorage.setItem('CampaignAdminAuthToken', uselogin.data.accessToken);
          localStorage.setItem('CampaignAdmin', JSON.stringify(uselogin.data));
          localStorage.setItem('theme', theme); // Restore theme preference
          navigate('/campaign/' + uselogin.data.slug + '/posts', { replace: true });
        } else {
          if (uselogin.data.image) {
            dispatch(setProfileImage(helper.DonorImageResizePath + uselogin.data.image));
          } else {
            dispatch(setProfileImage(defaultAvatar));
          }
          dispatch(setUserXp(uselogin.data.xp));
  
          let currencyData = {
            currency: uselogin.data.currency,
            currencySymbol: uselogin.data.symbol
          };
          localStorage.setItem('userAuthToken', uselogin.data.accessToken);
          localStorage.setItem('userData', JSON.stringify(uselogin.data));
          localStorage.setItem('theme', theme); // Restore theme preference
          navigate('/', { replace: true });
        }
        
        ToastAlert({
          msg: uselogin.data.message + ' ' + uselogin.data.name,
          msgType: 'success'
        });
        setLoading(false);
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
  

  const responseGoogle = async (response) => {
    setLoading(true);
  
    try {
      // Make the API call to your backend
      const result = await axios.post(`${helper.ApiUrl}auth/google_login`, {
        tokenId: response.tokenId,
      });
  
      if (!result || !result.data.success) {
        setLoading(false);
        ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
        return;
      }
  
      const userData = result.data.user;
      const userRole = userData.role === 3 ? 'USER' : 'UNKNOWN_ROLE';
  
      if (userRole === 'UNKNOWN_ROLE') {
        setLoading(false);
        ToastAlert({ msg: 'User Not Found', msgType: 'error' });
        return;
      }
  
      localStorage.clear();
  
      dispatch(setUserRole(userRole));
  
      if (userRole === 'CAMPAIGN_ADMIN') {
        // Handle the Campaign Admin login flow
        await checkOrgBankAc(result.data.token);
        let currencyData = {};
        currencyData.currency = userData.currency;
        currencyData.currencySymbol = userData.symbol;
        dispatch(setCurrency(currencyData));
  
        if (userData.logo) {
          dispatch(setProfileImage(helper.CampaignAdminLogoPath + userData.logo));
        } else {
          dispatch(setProfileImage(defaultAvatar));
        }
  
        localStorage.setItem('CampaignAdminAuthToken', result.data.token);
        localStorage.setItem('CampaignAdmin', JSON.stringify(userData));
        navigate('/campaign/' + userData.slug + '/posts', { replace: true });
      } else {
        // Handle the general user login flow
        if (userData.image) {
          dispatch(setProfileImage(helper.DonorImageResizePath + userData.image));
        } else {
          dispatch(setProfileImage(defaultAvatar));
        }
  
        dispatch(setUserXp(userData.xp));
  
        let currencyData = {};
        currencyData.currency = userData.currency;
        currencyData.currencySymbol = userData.symbol;
  
        localStorage.setItem('userAuthToken', result.data.token);
        document.cookie = `userAuthToken=${result.data.token}`;
        localStorage.setItem('userData', JSON.stringify(userData));
        navigate('/', { replace: true });
      }
  
      ToastAlert({
        msg: 'Logged in with  ' + userData.name,
        msgType: 'success'
      });
    } catch (error) {
      ToastAlert({ msg: 'Sign in cancelled. Try again', msgType: 'error' });
      console.error('Error during Google Sign-In:', error);
    } finally {
      setLoading(false);
    }
  };  

  const changevalue = (e) => {
    let value = e.target.value;
    setstate({
      ...state,
      [e.target.name]: value
    });
  };

  return (
    <>
      {/* {console.log(user.countryId)} */}
      {/* <Signin
                signIn={signIn}
                changevalue={changevalue}
                stateData={state}
                showPassword={showPassword}
                setShowPassword={setShowPassword}

            /> */}
      <Page
        title="Log in | Donorport"
        description="Login to your Donorport account or singup today"
      >
        <Login
          signIn={signIn}
          responseGoogle={responseGoogle}
          changevalue={changevalue}
          stateData={state}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          loading={loading}
        />
      </Page>
    </>
  );
}
export default SigninController;
