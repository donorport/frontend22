import React, { useState, useEffect } from 'react';
import { validateAll } from 'indicative/validator';
import FrontLoader from '../../Common/FrontLoader';
import ToastAlert from '../../Common/ToastAlert';
// import SignUp from "../../View/frontEnd/Layout/SignUp"
import userAuthApi from '../../Api/frontEnd/auth';
import { useNavigate } from 'react-router-dom';
import Register from '../../View/frontEnd/register';
import locationApi from '../../Api/frontEnd/location';
import Page from '../../components/Page';

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

  const { username, name, error, email, password, cpassword, country } = state;

  const getCountryList = async () => {
    let tempArray = [];
    const getCountryList = await locationApi.countryList();
    if (getCountryList) {
      if (getCountryList.data.success) {
        if (getCountryList.data.data.length > 0) {
          getCountryList.data.data.map((country, i) => {
            let Obj = {};
            Obj.value = country.id;
            Obj.label = country.country;
            tempArray.push(Obj);
          });
          setCountryList(tempArray);
        }
      }
    }
  };

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
    const rules = {
      name: 'required',
      email: 'required|email',
      password: 'required|min:6',
      cpassword: 'required|same:password'
      // country: 'required',
    };

    const message = {
      'email.required': 'Email is Required.',
      'name.required': 'Name is Required.',
      'email.email': 'please enter valid email.',
      'password.min': 'Password must be at least 6 characters',
      'password.required': 'Password is Required.',
      'cpassword.required': 'Confirm Password is Required.',
      'cpassword.same': 'Password and Confirm Password Must be Same',
      'country.required': 'Please Select Country.'
    };

    validateAll(state, rules, message)
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
        if (userSignup) {
          if (!userSignup.data.success) {
            setLoading(false);
            ToastAlert({ msg: userSignup.data.message, msgType: 'error' });
          } else {
            setLoading(false);
            ToastAlert({ msg: userSignup.data.message, msgType: 'success' });
            navigate('/signin');
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
  return (
    <>
      <Page title="Donorport | Sign Up">
        <Register
          stateData={state}
          changevalue={changevalue}
          signUp={signUp}
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          showCPassword={showCPassword}
          setShowCPassword={setShowCPassword}
          countryList={countryList}
          defaultCountry={defaultCountry}
          onChangeCountry={onChangeCountry}
          loading={loading}
        />
        {/*<FrontLoader loading={loading} />*/}
      </Page>
    </>
  );
}
export default SignupController;
