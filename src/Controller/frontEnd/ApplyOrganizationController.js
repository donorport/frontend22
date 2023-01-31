import ToastAlert from '../../Common/ToastAlert';
import { validateAll } from 'indicative/validator';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import adminCampaignApi from '../../Api/admin/adminCampaign';
import Apply from '../../View/frontEnd/apply';
import FrontLoader from '../../Common/FrontLoader';
import helper, { getCookie, setCookie, deleteCookie } from '../../Common/Helper';
import locationApi from '../../Api/frontEnd/location';
import categoryApi from '../../Api/admin/category';
import Page from '../../components/Page';

export default function ApplyOrganizationController() {
  const [selected, setSelected] = useState('charity');
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [countryList, setCountryList] = useState([]);
  const [defaultCountry, setDefaultCountry] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [defaultCategory, setDefaultCategory] = useState([]);

  const [state, setstate] = useState({
    name: '',
    organization: '',
    ein: '',
    email: '',
    confirmEmail: '',
    password: '',
    cpassword: '',
    country: '',
    category: '',
    error: []
  });

  const {
    error,
    name,
    organization,
    ein,
    email,
    confirmEmail,
    password,
    cpassword,
    country,
    category
  } = state;

  const inputStyle = {
    backgroundColor: '#f8fafd'
  };
  useEffect(() => {
    (async () => {
      await getCountryList();
      await getCategoryList();
    })();
  }, []);

  const onChangeCountry = (e) => {
    setstate({
      ...state,
      country: e.value
    });
    setDefaultCountry(e);
  };

  const onChangeCategory = (e) => {
    setstate({
      ...state,
      category: e.value
    });
    setDefaultCategory(e);
  };

  const getCategoryList = async () => {
    const getCategoryList = await categoryApi.listCategory();
    if (getCategoryList.data.success === true) {
      if (getCategoryList.data.data.length > 0) {
        let tempArray = [];
        getCategoryList.data.data.map((category, i) => {
          let Obj = {};
          Obj.value = category._id;
          Obj.label = category.name;
          tempArray.push(Obj);
        });
        setCategoryList(tempArray);
      } else {
        setCategoryList([]);
      }
    }
  };

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

  const resetForm = () => {
    setstate({
      ...state,
      name: '',
      organization: '',
      ein: '',
      email: '',
      confirmEmail: '',
      password: '',
      cpassword: '',
      country: '',
      category: '',
      error: []
    });
    setDefaultCountry([]);
    setDefaultCategory([]);
  };

  const changevalue = (e) => {
    let value = e.target.value;

    // if (e.target.name === 'ein') {
    //     value = e.target.value.replace(/[^\d.]|\.(?=.*\.)/g, "");
    // }
    setstate({
      ...state,
      [e.target.name]: value
    });
  };

  const onValueChange = (e) => {
    setSelected(e.target.name);
  };

  const elemRefs = [];

  const autoTab = (e, i) => {
    setCookie(e.target.name, e.target.value.replace(/[^\d.]|\.(?=.*\.)/g, ''), 1);
    const BACKSPACE_KEY = 8;
    const DELETE_KEY = 46;
    let tabindex = i || 0;
    tabindex = Number(tabindex);
    let elem = null;
    if (e.keyCode === BACKSPACE_KEY) {
      elem = tabindex > 0 && elemRefs[tabindex - 1];
    } else if (e.keyCode !== DELETE_KEY) {
      elem = tabindex < elemRefs.length - 1 && elemRefs[tabindex + 1];
    }
    if (elem) {
      elem.current.focus();
    }
  };

  const Input = (props) => {
    const ref = React.createRef();
    elemRefs.push(ref);
    return (
      <input
        className="activate__input block"
        data-index={props.index}
        ref={ref}
        maxLength={1}
        name={'code' + (props.index + 1)}
        // value={val}
        // onChange={(e) => setCode(e, props.index)}
        onKeyUp={(e) => props.autoTab(e, props.index)}
        style={inputStyle}
      />
    );
  };

  const blocks = Array.from({ length: 4 }, (element, index) => (
    <Input key={index} index={index} autoTab={autoTab} />
  ));

  const apply = () => {
    const rules = {
      name: 'required',
      organization: 'required',
      ein: 'required',
      country: 'required',
      email: 'required|email',
      confirmEmail: 'required|same:email',
      password: 'required|min:6',
      cpassword: 'required|same:password',
      category: 'required'
    };

    const message = {
      'name.required': 'name is Required.',
      'organization.required': 'organization is Required.',
      'ein.required': 'Ein Number is Required.',
      'email.required': 'email is Required.',
      'email.email': 'please enter valid email.',
      'confirmEmail.required': 'Confirm Email is Required.',
      'confirmEmail.same': 'Email and Confirm Email Must be same.',
      'password.min': 'Password must be at least 6 characters',
      'password.required': 'Password is Required.',
      'cpassword.required': 'Confirm Password is Required.',
      'cpassword.same': 'Password and ConfirmPassword Must be same.',
      'country.required': 'Please Select Country.',
      'category.required': 'Category is Required.'
    };
    validateAll(state, rules, message)
      .then(async () => {
        const formaerrror = {};
        setstate({
          ...state,
          error: formaerrror
        });
        setLoading(true);

        let data = {};
        data.name = name;
        data.email = email;
        data.type = selected;
        data.ein = ein;
        data.organization = organization;
        data.password = password;
        data.country = country;
        data.category = category;

        const applyCampaignAdmin = await adminCampaignApi.applyCampaignAdmin(data);
        if (applyCampaignAdmin) {
          if (!applyCampaignAdmin.data.success) {
            setLoading(false);
            ToastAlert({ msg: applyCampaignAdmin.data.message, msgType: 'error' });
          } else {
            setLoading(false);
            ToastAlert({ msg: applyCampaignAdmin.data.message, msgType: 'success' });
            resetForm();
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

  const activateCode = async () => {
    let code1 = getCookie('code1');
    let code2 = getCookie('code2');
    let code3 = getCookie('code3');
    let code4 = getCookie('code4');

    if (code1 && code2 && code3 && code4) {
      let finalCode = code1 + code2 + code3 + code4;

      let data = {};
      data.otp = Number(finalCode);

      setLoading(true);
      const verifyOtp = await adminCampaignApi.VerifyOtpCampaignAdmin(data);
      deleteCookie('code1');
      deleteCookie('code2');
      deleteCookie('code3');
      deleteCookie('code4');
      if (verifyOtp) {
        if (!verifyOtp.data.success) {
          setLoading(false);
          ToastAlert({ msg: verifyOtp.data.message, msgType: 'error' });
        } else {
          setLoading(false);
          ToastAlert({ msg: verifyOtp.data.message, msgType: 'success' });
          navigate('/', { replace: true });
        }
      } else {
        setLoading(false);
        ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
      }
    } else {
      deleteCookie('code1');
      deleteCookie('code2');
      deleteCookie('code3');
      deleteCookie('code4');

      ToastAlert({ msg: 'Please Enter Valid an Activation Code', msgType: 'error' });
    }
  };

  return (
    <>
      {/*<FrontLoader loading={loading} />*/}
      <Page
        title="Donorport | Apply"
        url="https://donorport.org/apply"
        img="https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/62fd822512caf007efb3e4a1_emoji.png"
        description="Apply for an account. Let us know if you want to post on Donorport. For more information about the application process click here. Charity Nonprofit"
      >
        <Apply
          stateData={state}
          blocks={blocks}
          activateCode={activateCode}
          selected={selected}
          onValueChange={onValueChange}
          changevalue={changevalue}
          apply={apply}
          countryList={countryList}
          onChangeCountry={onChangeCountry}
          defaultCountry={defaultCountry}
          categoryList={categoryList}
          defaultCategory={defaultCategory}
          onChangeCategory={onChangeCategory}
        />
      </Page>
    </>
  );
}
