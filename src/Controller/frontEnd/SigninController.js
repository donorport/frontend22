import React, { useState } from 'react';
import { validateAll } from 'indicative/validator';
import ToastAlert from '../../Common/ToastAlert';
import userAuthApi from '../../Api/frontEnd/auth';
import { useNavigate } from 'react-router-dom';
import Login from '../../View/frontEnd/login';
import { useDispatch } from 'react-redux';
import {
  setCurrency,
  setProfileImage,
  setUserXp,
  setUserRole,
  setIsAccountAdd
} from '../../user/user.action';
import helper from '../../Common/Helper';
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
  'email.email': 'Please enter a valid email.',
  'password.required': 'Password is required.'
};

function SigninController() {
  const [loginLoading, setLoginLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [state, setState] = useState({
    email: '',
    password: '',
    error: []
  });
  const { email, password } = state;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const checkOrgBankAc = async (token) => {
    const check = await adminCampaignApi.chekOrganizationAccount(token);
    if (check) {
      dispatch(setIsAccountAdd(check.data.success));
    }
  };

  const signIn = () => {
    validateAll(state, SIGNIN_RULES, SIGNIN_MESSAGE)
      .then(async () => {
        setLoginLoading(true);
        const formaerrror = {};
        setState({
          ...state,
          error: formaerrror
        });

        const uselogin = await userAuthApi.login(email, password);

        if (!uselogin) {
          setLoginLoading(false);
          ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
          return;
        }

        if (!uselogin.data.success) {
          setLoginLoading(false);
          ToastAlert({ msg: uselogin.data.message, msgType: 'error' });
          return;
        }

        if (
          !(
            uselogin.data.roleName === 'USER' ||
            uselogin.data.roleName === 'CAMPAIGN_ADMIN' ||
            uselogin.data.roleName === 'TEAM_MEMBER'
          )
        ) {
          setLoginLoading(false);
          ToastAlert({ msg: 'User Not Found', msgType: 'error' });
          return;
        }

        if (uselogin.data.roleName === 'CAMPAIGN_ADMIN' && uselogin.data.otp_status !== 1) {
          setLoginLoading(false);
          ToastAlert({ msg: 'Campaign Admin not Active.', msgType: 'error' });
          return;
        }

        const theme = localStorage.getItem('theme');
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
          localStorage.setItem('theme', theme);
          navigate('/campaign/' + uselogin.data.slug + '/posts', { replace: true });
        } else {
          if (uselogin.data.image) {
            dispatch(
              setProfileImage(
                uselogin.data.image &&
                  (uselogin.data.image.startsWith('http://') ||
                    uselogin.data.image.startsWith('https://'))
                  ? uselogin.data.image
                  : helper.DonorImageResizePath + uselogin.data.image
              )
            );
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
          localStorage.setItem('theme', theme);
          // Navigate based on role
          if (uselogin.data.roleName === 'USER') {
            const userName = uselogin.data.name.replace(/\s+/g, ''); // Replace spaces with %20
            navigate('/user/' + userName + '/items', { replace: true });
          } else if (uselogin.data.roleName === 'TEAM_MEMBER') {
            navigate('/user/' + uselogin.data.slug + '/items', { replace: true });
          } else {
            navigate('/', { replace: true }); // Default fallback for other roles
          }

          // navigate('/', { replace: true });
        }

        ToastAlert({
          msg: uselogin.data.message + ' ' + uselogin.data.name,
          msgType: 'success'
        });
        setLoginLoading(false);
      })
      .catch((errors) => {
        setLoginLoading(false);
        const formaerrror = {};
        if (errors.length) {
          errors.forEach((element) => {
            formaerrror[element.field] = element.message;
          });
        } else {
          ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
        }

        setState({
          ...state,
          error: formaerrror
        });
      });
  };

  const responseGoogle = async (response) => {
    setGoogleLoading(true);

    try {
      const result = await axios.post(`${helper.ApiUrl}auth/google_login`, {
        tokenId: response.tokenId
      });

      if (!result || !result.data.success) {
        setGoogleLoading(false);
        return;
      }

      const userData = result.data.user;
      const userRole = userData.role === 3 ? 'USER' : 'UNKNOWN_ROLE';

      if (userRole === 'UNKNOWN_ROLE') {
        setGoogleLoading(false);
        return;
      }

      localStorage.clear();
      dispatch(setUserRole(userRole));

      if (userRole === 'CAMPAIGN_ADMIN') {
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
        if (userData.image) {
          const profileImageUrl =
            userData.image.startsWith('http://') || userData.image.startsWith('https://')
              ? userData.image
              : helper.DonorImageResizePath + userData.image;

          dispatch(setProfileImage(profileImageUrl));
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

        // Remove spaces from userData.name for USER navigation
        const userName = userData.name.replace(/\s+/g, ''); // Remove all spaces
        navigate('/user/' + userName + '/items', { replace: true });
      }

      ToastAlert({
        msg: 'Logged in with  ' + userData.name,
        msgType: 'success'
      });
    } catch (error) {
      console.error('Error during Google Sign-In:', error);
    } finally {
      setGoogleLoading(false);
    }
  };

  const changevalue = (e) => {
    let value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    });
  };

  return (
    <Page title="Log in | Donorport" description="Login to your Donorport account or signup today">
      <Login
        signIn={signIn}
        responseGoogle={responseGoogle}
        changevalue={changevalue}
        stateData={state}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        loginLoading={loginLoading}
        googleLoading={googleLoading}
      />
    </Page>
  );
}

export default SigninController;
