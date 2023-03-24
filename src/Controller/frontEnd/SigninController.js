import React, { useEffect, useState } from 'react';
import { validateAll } from 'indicative/validator';
import FrontLoader from '../../Common/FrontLoader';
import ToastAlert from '../../Common/ToastAlert';
// import Signin from "../../View/frontEnd/Layout/Signin"
import userAuthApi from '../../Api/frontEnd/auth';
import { useNavigate } from 'react-router-dom';
import Login from '../../View/frontEnd/login';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCurrency,
  setUserLanguage,
  setCurrencyPrice,
  setProfileImage,
  setUserCountry,
  setUserXp,
  setUserRank,
  setUserRole,
  setIsAccountAdd
} from '../../user/user.action';
import locationApi from '../../Api/frontEnd/location';
import helper from '../../Common/Helper';
import userApi from '../../Api/frontEnd/user';
import defaultAvatar from '../../assets/images/avatar.png';
import adminCampaignApi from '../../Api/admin/adminCampaign';
import Page from '../../components/Page';

function SigninController() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const user = useSelector((state) => state.user);

  const [state, setstate] = useState({
    email: '',
    password: '',
    error: []
  });
  const { error, email, password } = state;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const convertCurrency = async (currency) => {
    const getCurrencyPrice = await locationApi.convertCurrency(currency);
    if (getCurrencyPrice) {
      // console.log(getCurrencyPrice)
      // console.log(getCurrencyPrice.data.result)

      if (getCurrencyPrice.data.success) {
        dispatch(setCurrencyPrice(getCurrencyPrice.data.result));
      }
    }
  };

  const checkOrgBankAc = async (token) => {
    const check = await adminCampaignApi.chekOrganizationAccount(token);
    if (check) {
      dispatch(setIsAccountAdd(check.data.success));
    }
  };

  const getUserRank = async (token) => {
    const getRank = await userApi.getUserRank(token);
    if (getRank) {
      if (getRank.data.success) {
        dispatch(setUserRank(getRank.data.rank));
      }
    }
  };

  const signIn = () => {
    const rules = {
      email: 'required|email',
      password: 'required'
    };

    const message = {
      'email.required': 'Email is Required.',
      'email.email': 'please enter valid email.',
      'password.required': 'Password is Required.'
    };

    validateAll(state, rules, message)
      .then(async () => {
        setLoading(true);
        const formaerrror = {};
        setstate({
          ...state,
          error: formaerrror
        });
        //setLoading(false);
        const uselogin = await userAuthApi.login(email, password);
        // console.log(uselogin)
        if (uselogin) {
          if (!uselogin.data.success) {
            setLoading(false);
            ToastAlert({ msg: uselogin.data.message, msgType: 'error' });
          } else {
            if (
              uselogin.data.roleName === 'USER' ||
              uselogin.data.roleName === 'CAMPAIGN_ADMIN' ||
              uselogin.data.roleName === 'TEAM_MEMBER'
            ) {
              if (uselogin.data.roleName === 'CAMPAIGN_ADMIN' && uselogin.data.otp_status !== 1) {
                setLoading(false);
                ToastAlert({ msg: 'Campaign Admin not Active.', msgType: 'error' });
              } else {
                localStorage.clear();

                dispatch(setUserRole(uselogin.data.roleName));

                if (uselogin.data.roleName === 'CAMPAIGN_ADMIN') {
                  // if(uselogin.data.country_id && uselogin.data.country_id !== "" && uselogin.data.country_id !==0  ){
                  //     dispatch(setUserCountry(uselogin.data.country_id))
                  // }else{
                  //         const userCurrentLocation = await locationApi.getUserCurrentLoaction()
                  //     if (userCurrentLocation) {

                  //         let countryName = userCurrentLocation.data.country_name
                  //         if (countryName) {

                  //             // get currency by country name
                  //             const getCountryData = await locationApi.currencyByCountry(uselogin.data.accessToken, countryName)
                  //             if (getCountryData) {
                  //                 if (getCountryData.data.success) {
                  //                     // let currencyData = {}
                  //                     // currencyData.currency = getCountryData.data.data.currency
                  //                     // currencyData.currencySymbol = getCountryData.data.data.symbol
                  //                     // dispatch(setCurrency(currencyData))
                  //                     // await convertCurrency(getCountryData.data.data.currency)

                  //                     dispatch(setUserCountry(getCountryData.data.data.id))

                  //                 }
                  //             }
                  //         }
                  //     }
                  // }
                  await checkOrgBankAc(uselogin.data.accessToken);
                  let currencyData = {};
                  currencyData.currency = uselogin.data.currency;
                  currencyData.currencySymbol = uselogin.data.symbol;
                  dispatch(setCurrency(currencyData));
                  if (uselogin.data.logo) {
                    dispatch(setProfileImage(helper.CampaignAdminLogoPath + uselogin.data.logo));
                  } else {
                    dispatch(setProfileImage(defaultAvatar));
                  }
                  localStorage.setItem('CampaignAdminAuthToken', uselogin.data.accessToken);
                  localStorage.setItem('CampaignAdmin', JSON.stringify(uselogin.data));
                  navigate('/campaign/' + uselogin.data.slug + '/posts', { replace: true });
                } else {
                  if (uselogin.data.image) {
                    dispatch(setProfileImage(helper.DonorImageResizePath + uselogin.data.image));
                  } else {
                    dispatch(setProfileImage(defaultAvatar));
                  }
                  // console.log('xp',uselogin.data.xp)
                  dispatch(setUserXp(uselogin.data.xp));
                  // await getUserRank(uselogin.data.accessToken)

                  // if(uselogin.data.country_id && uselogin.data.country_id !== "" && uselogin.data.country_id !==0  ){
                  //     dispatch(setUserCountry(uselogin.data.country_id))
                  // }else{
                  //         const userCurrentLocation = await locationApi.getUserCurrentLoaction()
                  //     if (userCurrentLocation) {

                  //         let countryName = userCurrentLocation.data.country_name
                  //         if (countryName) {

                  //             // get currency by country name
                  //             const getCountryData = await locationApi.currencyByCountry(uselogin.data.accessToken, countryName)
                  //             if (getCountryData) {
                  //                 if (getCountryData.data.success) {
                  //                     // let currencyData = {}
                  //                     // currencyData.currency = getCountryData.data.data.currency
                  //                     // currencyData.currencySymbol = getCountryData.data.data.symbol
                  //                     // dispatch(setCurrency(currencyData))
                  //                     // await convertCurrency(getCountryData.data.data.currency)

                  //                     dispatch(setUserCountry(getCountryData.data.data.id))

                  //                 }
                  //             }
                  //         }
                  //     }
                  // }

                  // if user currency is already set
                  if (
                    uselogin.data?.currency &&
                    uselogin.data?.currency !== null &&
                    uselogin.data?.currency !== ''
                  ) {
                    // let currencyData = {}
                    // currencyData.currency = uselogin.data.currency.split('=')[0]
                    // currencyData.currencySymbol = uselogin.data.currency.split('=')[1]
                    // dispatch(setCurrency(currencyData))

                    let currencyData = {};
                    currencyData.currency = uselogin.data.currency;
                    currencyData.currencySymbol = uselogin.data.symbol;
                    // dispatch(setCurrency(currencyData))
                    // await convertCurrency(uselogin.data.currency.split('=')[0])
                  } else {
                    //getting user current location(country)
                    // const userCurrentLocation = await locationApi.getUserCurrentLoaction()
                    // if (userCurrentLocation) {
                    //     let countryName = userCurrentLocation.data.country_name
                    //     if (countryName) {
                    //         // get currency by country name
                    //         const getCountryData = await locationApi.currencyByCountry(uselogin.data.accessToken, countryName)
                    //         if (getCountryData) {
                    //             if (getCountryData.data.success) {
                    //                 let currencyData = {}
                    //                 currencyData.currency = getCountryData.data.data.currency
                    //                 currencyData.currencySymbol = getCountryData.data.data.symbol
                    //                 dispatch(setCurrency(currencyData))
                    //                 await convertCurrency(getCountryData.data.data.currency)
                    //             }
                    //         }
                    //     }
                    // }
                  }
                  // if (uselogin.data?.language && uselogin.data?.language !== null) {
                  //     dispatch(setUserLanguage(uselogin.data.language))
                  // }

                  // if (uselogin.data.roleName === 'TEAM_MEMBER') {
                  //     localStorage.setItem('teamMemberAuthToken', uselogin.data.accessToken)
                  //     localStorage.setItem('teamMemberData', JSON.stringify(uselogin.data))
                  // } else {
                  //     localStorage.setItem('userAuthToken', uselogin.data.accessToken)
                  //     localStorage.setItem('userData', JSON.stringify(uselogin.data))
                  // }

                  localStorage.setItem('userAuthToken', uselogin.data.accessToken);
                  document.cookie = `userAuthToken=${uselogin.data.accessToken}`;
                  localStorage.setItem('userData', JSON.stringify(uselogin.data));
                  navigate('/', { replace: true });
                }
                ToastAlert({
                  msg: uselogin.data.message + ' ' + uselogin.data.name,
                  msgType: 'success'
                });
                setLoading(false);
              }

              // localStorage.clear()
              // localStorage.setItem('userAuthToken', uselogin.data.accessToken)
              // localStorage.setItem('userData', JSON.stringify(uselogin.data))
              // navigate('/', { replace: true })
              // ToastAlert({ msg: uselogin.data.message + " " + uselogin.data.name, msgType: 'success' });
              // setLoading(false)
            } else {
              setLoading(false);
              ToastAlert({ msg: 'User Not Found', msgType: 'error' });
            }
          }
        } else {
          setLoading(false);
          ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
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
      <Page title="Donorport | Sign in">
        <Login
          signIn={signIn}
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
