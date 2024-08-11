import React, { useState, useEffect } from 'react';
import { validateAll } from 'indicative/validator';
//import FrontLoader from '../../Common/FrontLoader';
import ToastAlert from '../../Common/ToastAlert';
// import SignUp from "../../View/frontEnd/Layout/SignUp"
import userAuthApi from '../../Api/frontEnd/auth';
import { useNavigate } from 'react-router-dom';
import Register from '../../View/frontEnd/register';
//import locationApi from '../../Api/frontEnd/location';
import Page from '../../components/Page';
import axios from 'axios';
import helper from '../../Common/Helper';
import { useDispatch } from 'react-redux';

const SIGNUP_RULES = {
  name: 'required',
  email: 'required|email',
  password: 'required|min:6',
  cpassword: 'required|same:password'
  // country: 'required',
};

const SIGNUP_MESSAGE = {
  'email.required': 'Email is required.',
  'name.required': 'Name is required.',
  'email.email': 'please enter valid email.',
  'password.min': 'Password must be at least 6 characters',
  'password.required': 'Password is required.',
  'cpassword.required': 'Confirm Password is required.',
  'cpassword.same': 'Password and Confirm Password Must be Same',
  'country.required': 'Please Select Country.'
};

function SignupController() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [defaultCountry, setDefaultCountry] = useState([]);

  const [state, setstate] = useState({
    // username: "",
    name: '',
    email: '',
    password: '',
    cpassword: '',
    country: '',
    error: []
  });
  const navigate = useNavigate();

  const { name, email, password } = state;
  const dispatch = useDispatch();

  //const getCountryList = async () => {
  //let tempArray = [];
  //const getCountryList = await locationApi.countryList();
  //if (getCountryList) {
  //if (getCountryList.data.success) {
  //if (getCountryList.data.data.length > 0) {
  //getCountryList.data.data.map((country, i) => {
  //let Obj = {};
  //Obj.value = country.id;
  //Obj.label = country.country;
  //tempArray.push(Obj);
  //});
  //setCountryList(tempArray);
  //}
  //}
  //}
  //};

  useEffect(() => {
    (async () => {
      // await getCountryList()
    })();
  }, []);

  const onChangeCountry = (e) => {
    setstate({
      ...state,
      country: e.value
    });
    setDefaultCountry(e);
  };

  const signUp = () => {
    validateAll(state, SIGNUP_RULES, SIGNUP_MESSAGE)
      .then(async () => {
        setLoading(true);
        const formaerrror = {};
        setstate({
          ...state,
          error: formaerrror
        });
        let data = {};
        data.name = name;
        data.email = email;
        data.password = password;
        // data.country_id = Number(country)

        setLoading(true);
        const userSignup = await userAuthApi.register(data);
        setLoading(false);

        if (!userSignup) {
          ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
          return;
        }

        if (!userSignup.data.success) {
          ToastAlert({ msg: userSignup.data.message, msgType: 'error' });
        } else {
          ToastAlert({ msg: userSignup.data.message, msgType: 'success' });
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
  const changevalue = (e) => {
    let value = e.target.value;
    if (e.target.name === 'username') {
      if (!/[^a-zA-Z0-9]/.test(e.target.value)) {
        setstate({
          ...state,
          [e.target.name]: e.target.value
        });
      }
    } else {
      setstate({
        ...state,
        [e.target.name]: value
      });
    }
  };
  const responseGoogle = async (response) => {
    setLoading(true);
  
    try {
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
      localStorage.setItem('userAuthToken', result.data.token);
      localStorage.setItem('userData', JSON.stringify(userData));
      document.cookie = `userAuthToken=${result.data.token}`;
  
      ToastAlert({
        msg: `Logged in with ${userData.name}`,
        msgType: 'success'
      });
  
      navigate('/', { replace: true });
    } catch (error) {
      ToastAlert({ msg: 'Error during Google Sign-In', msgType: 'error' });
      console.error('Error during Google Sign-In:', error);
    } finally {
      setLoading(false);
    }
  };
     
  return (
    <>
      <Page
        title="Donorport | Sign Up"
        description="Create your Donorport account and start helping your community today!"
      >
        <Register
          stateData={state}
          changevalue={changevalue}
          signUp={signUp}
          responseGoogle={responseGoogle}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          showCPassword={showCPassword}
          setShowCPassword={setShowCPassword}
          countryList={countryList}
          defaultCountry={defaultCountry}
          onChangeCountry={onChangeCountry}
          loading={loading}
        />
  
      </Page>
    </>
  );
}
export default SignupController;
