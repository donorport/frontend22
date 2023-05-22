import Index from '../../View/admin/Profile/Index';
import { hasPermission } from '../../Common/Helper';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import authApi from '../../Api/admin/auth';
//import FrontLoader from "../../Common/FrontLoader"
import adminCampaignApi from '../../Api/admin/adminCampaign';
import categoryApi from '../../Api/admin/category';
import { validateAll } from 'indicative/validator';
import ToastAlert from '../../Common/ToastAlert';
//import { confirmAlert } from "react-confirm-alert"

function ProfileController() {
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const adminData = JSON.parse(localStorage.getItem('adminData'));
  const adminAuthToken = localStorage.getItem('adminAuthToken');
  //const [userDetails, setUserDetails] = useState([])
  const [tempImg, setTempImg] = useState('');

  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    logo: '',
    description: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    url: '',
    country: '',
    city: '',
    stateid: '',
    address: '',
    category: '',
    error: [],
    status: 1,
    role: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
    Img: ''
  });

  const {
    name,
    //error,
    email,
    //password,
    //id,
    status,
    category,
    address,
    stateid,
    city,
    country,
    url,
    linkedin,
    facebook,
    twitter,
    description,
    logo,
    currentPassword,
    newPassword,
    //confirmPassword
  } = state;

  useEffect(() => {
    (async () => {
      setLoading(false);
      if (!hasPermission(adminData.roleName, 'PROFILE')) {
        navigate('/admin/dashboard');
      }

      const verifyUser = await authApi.verifyToken(adminAuthToken);
      if (!verifyUser.data.success) {
        localStorage.clear();
        navigate('/admin/login');
      }

      const getCategoryList = await categoryApi.listCategory(adminAuthToken);
      if (getCategoryList.data.success === true) {
        setCategoryList(getCategoryList.data.data);
      }

      const getCountryList = await adminCampaignApi.countryList(adminAuthToken);
      if (getCountryList.data.success === true) {
        setCountryList(getCountryList.data.data);
      }

      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const getCampaignDetails = await adminCampaignApi.getCampaignDetails(adminAuthToken);
      // console.log(getCampaignDetails.data.data)
      if (getCampaignDetails.data.success) {
        let data = getCampaignDetails.data.data;
        setState({
          ...state,
          id: data._id,
          name: data.name,
          email: data.email,
          description: data.description,
          facebook: data.facebook,
          linkedin: data.linkedin,
          twitter: data.twitter,
          url: data.url,
          role: data.role,
          country: data.country_id,
          city: data.city_id,
          category: data.category_id,
          stateid: data.state_id,
          address: data.address,
          Img: data.logo
        });
        setUpdate(true);
        const getCountryStateList = await adminCampaignApi.stateListByCountry(
          adminAuthToken,
          data.country_id
        );

        if (getCountryStateList.data.success === true) {
          setStateList(getCountryStateList.data.data);
        }
        const getStateCityList = await adminCampaignApi.cityListByState(
          adminAuthToken,
          data.state_id
        );
        if (getStateCityList.data.success === true) {
          setCityList(getStateCityList.data.data);
        }
      }
    })();
  }, [update]);

  const changefile = (e) => {
    let file = e.target.files[0] ? e.target.files[0] : '';
    setTempImg(URL.createObjectURL(file));

    setState({
      ...state,
      logo: file
    });
  };
  const changevalue = async (e) => {
    let value = e.target.value;

    if (e.target.name === 'country') {
      setLoading(false);
      const getCountryStateList = await adminCampaignApi.stateListByCountry(adminAuthToken, value);
      if (getCountryStateList.data.success === true) {
        setStateList(getCountryStateList.data.data);
      }

      setState({
        ...state,
        [e.target.name]: value
      });
      setLoading(false);
    } else if (e.target.name === 'stateid') {
      setLoading(false);
      const getStateCityList = await adminCampaignApi.cityListByState(adminAuthToken, value);
      if (getStateCityList.data.success === true) {
        setCityList(getStateCityList.data.data);
      }

      setState({
        ...state,
        [e.target.name]: value
      });
      setLoading(false);
    } else {
      setState({
        ...state,
        [e.target.name]: value
      });
    }
  };
  const handleOnDiscriptionChangeValue = (e) => {
    setState({
      ...state,
      description: e
    });
  };

  const updateProfile = () => {
    const rules = {
      name: 'required',
      // email: 'required|email',
      // password: 'required|min:6',
      // logo: "required",
      description: 'required',
      twitter: 'required',
      facebook: 'required',
      linkedin: 'required',
      url: 'required',
      address: 'required',
      country: 'required',
      city: 'required',
      stateid: 'required',
      category: 'required'
    };

    const message = {
      'email.required': 'Email is Required.',
      'name.required': 'Name is Required.',
      'email.email': 'please enter valid email.',
      'password.min': 'Password must be at least 6 characters',
      'password.required': 'Password is Required.',

      // 'logo.required': 'logo is Required.',
      'description.required': 'description is Required.',
      'twitter.required': 'Twitter is Required.',
      'facebook.required': 'Facebook is Required.',
      'linkedin.required': 'Linkedin is Required.',
      'url.required': 'Website is Required.',
      'address.required': 'Address is Required.',

      'category.required': 'Category is Required.',
      'country.required': 'Country is Required.',
      'city.required': 'City is Required.',
      'stateid.required': 'State is Required.'
    };

    validateAll(state, rules, message)
      .then(async () => {
        const formaerrror = {};
        setState({
          ...state,
          error: formaerrror
        });
        let data = {};
        data.name = name;
        // data.email = email
        data.status = status;
        // data.password = password
        if (logo) {
          data.logo = logo;
        }
        data.description = description;
        data.twitter = twitter;
        data.facebook = facebook;
        data.linkedin = linkedin;
        data.url = url;
        data.country_id = country;
        data.city_id = city;
        data.state_id = stateid;
        data.address = address;
        data.category_id = category;

        setLoading(false);
        const addUser = await adminCampaignApi.saveCampaignDetails(adminAuthToken, data);
        if (addUser) {
          if (!addUser.data.success) {
            setLoading(false);
            ToastAlert({ msg: addUser.data.message, msgType: 'error' });
          } else {
            // setUpdate(!update)
            setLoading(false);
            ToastAlert({ msg: addUser.data.message, msgType: 'success' });
            // setModal(false)
            // resetForm()
          }
        } else {
          setLoading(false);
          ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
        }
      })
      .catch((errors) => {
        // console.log(errors)
        setLoading(false);
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

  const updatePassword = () => {
    const rules = {
      email: 'required|email',
      newPassword: 'required|min:6',
      confirmPassword: 'required|same:newPassword',
      currentPassword: 'required'
    };

    const message = {
      'email.required': 'Email is Required.',
      'email.email': 'please enter valid email.',
      'newPassword.min': 'New Password must be at least 6 characters',
      'newPassword.required': 'New Password is Required.',
      'confirmPassword.required': 'Confirm Password is Required.',
      'confirmPassword.same': 'New Password and Confirm Password Must be Same',
      'currentPassword.required': 'Current Password is Required.'
    };

    validateAll(state, rules, message)
      .then(async () => {
        const formaerrror = {};
        setState({
          ...state,
          error: formaerrror
        });
        let data = {};
        data.email = email;
        data.current_password = currentPassword;
        data.new_password = newPassword;

        setLoading(false);
        const addUser = await adminCampaignApi.updatePassword(adminAuthToken, data);
        if (addUser) {
          if (!addUser.data.success) {
            setLoading(false);
            ToastAlert({ msg: addUser.data.message, msgType: 'error' });
          } else {
            // setUpdate(!update)
            setState({
              ...state,
              id: data._id,
              name: data.name,
              email: data.email,
              description: data.description,
              facebook: data.facebook,
              linkedin: data.linkedin,
              twitter: data.twitter,
              url: data.url,
              role: data.role,
              country: data.country_id,
              city: data.city_id,
              category: data.category_id,
              stateid: data.state_id,
              address: data.address
            });
            setLoading(false);
            ToastAlert({ msg: addUser.data.message, msgType: 'success' });
            // setModal(false)
            // resetForm()
          }
        } else {
          setLoading(false);
          ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
        }
      })
      .catch((errors) => {
        // console.log(errors)
        setLoading(false);
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

  return (
    <>
      {/*<FrontLoader loading={loading} />*/}
      <Index
        stateData={state}
        categoryList={categoryList}
        countryList={countryList}
        stateList={stateList}
        cityList={cityList}
        changevalue={changevalue}
        handleOnDiscriptionChangeValue={handleOnDiscriptionChangeValue}
        updateProfile={updateProfile}
        updatePassword={updatePassword}
        changefile={changefile}
        tempImg={tempImg}
      />
    </>
  );
}
export default ProfileController;
