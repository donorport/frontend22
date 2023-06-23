import React, { useState, useEffect } from 'react';
//import FrontLoader from "../../Common/FrontLoader"
import { validateAll } from 'indicative/validator';
import ToastAlert from '../../Common/ToastAlert';
import { confirmAlert } from 'react-confirm-alert';
import Index from '../../View/admin/CampaignAdmin/Index';
import adminCampaignApi from '../../Api/admin/adminCampaign';
import CampaignAdminForm from '../../View/admin/CampaignAdmin/CampaignAdminForm';
import {
  //Link as RouterLink,
  useNavigate
  //useParams
} from 'react-router-dom';
//import { fa } from "faker/lib/locales";
import categoryApi from '../../Api/admin/category';
import authApi from '../../Api/admin/auth';
import { hasPermission } from '../../Common/Helper';
import Payout from '../../View/admin/CampaignAdmin/Payout';

const ADD_CAMPAIGN_ADMIN_RULES = {
  name: 'required',
  email: 'required|email',
  password: 'required|min:6',
  logo: 'required',
  description: 'required',
  twitter: 'required',
  facebook: 'required',
  linkedin: 'required',
  url: 'required',
  address: 'required',
  country: 'required',
  city: 'required',
  stateid: 'required',
  category: 'required',
  slug: 'required',
  headline: 'required',
  promoVideo: 'required'
};

const ADD_CAMPAIGN_ADMIN_VALIDATION_MESSAGES = {
  'email.required': 'Email is required.',
  'name.required': 'Name is required.',
  'email.email': 'please enter valid email.',
  'password.min': 'Password must be at least 6 characters',
  'password.required': 'Password is required.',

  'logo.required': 'logo is required.',
  'description.required': 'description is required.',
  'twitter.required': 'Twitter is required.',
  'facebook.required': 'Facebook is required.',
  'linkedin.required': 'Linkedin is required.',
  'url.required': 'Website is required.',
  'address.required': 'Address is required.',

  'category.required': 'Category is required.',
  'country.required': 'Country is required.',
  'city.required': 'City is required.',
  'stateid.required': 'State is required.',
  'slug.required': 'Slug is required',
  'headline.required': 'Headline is required',
  'promoVideo.required': 'Promo Video is required'
};

const UPDATE_CAMPAIGN_ADMIN_RULES = {
  name: 'required',
  // description: "required",
  // twitter: "required",
  // facebook: "required",
  // linkedin: "required",
  // url: "required",
  // address: "required",
  // country: "required",
  // city: "required",
  // stateid: "required",
  // category: "required",
  // headline: 'required',
  // promoVideo: 'required'
};

const UPDATE_CAMPAIGN_ADMIN_VALIDATION_MESSAGES = {
  'email.required': 'Email is required.',
  'name.required': 'Name is required.',
  'email.email': 'Please enter a valid email.',
  'description.required': 'Description is required.',
  'twitter.required': 'Twitter is required.',
  'facebook.required': 'Facebook is required.',
  'linkedin.required': 'Linkedin is required.',
  'url.required': 'Website is required.',
  'address.required': 'Address is required.',
  'category.required': 'Category is required.',
  'country.required': 'Country is required.',
  'city.required': 'City is required.',
  'stateid.required': 'State is required.',
  'headline.required': 'Headline is required',
  'promoVideo.required': 'Promo Video is required'
};

const PAY_TO_ORGANIZATION_RULES = {
  account: 'required',
  amount: 'required'
};

const PAY_TO_ORGANIZATION_VALIDATION_MESSAGES = {
  'account.required': 'Please select account.',
  'amount.required': 'Please Enter amount to pay.'
};

function CampaignAdminController() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [update, setUpdate] = useState(false);
  const [tempImg, setTempImg] = useState('');
  const [Img, setImg] = useState('');
  const [categoryList, setCategoryList] = useState([]);
  const [campaignAdminList, setCampaignAdminList] = useState([]);
  const [payoutModal, setPayoutModal] = useState(false);
  const [organizationDetails, setOrganizationDetails] = useState({});
  const [bankDetails, setBankDetailsDetails] = useState({});
  const [orgTransactionHistory, setOrgTransactionHistory] = useState([]);

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
    slug: '',
    headline: '',
    promoVideo: '',
    status: 1,
    account: '',
    amount: '',
    ein: ''
  });

  const {
    name,
    email,
    promoVideo,
    slug,
    password,
    id,
    status,
    headline,
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
    amount,
    ein
  } = state;

  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const adminAuthToken = localStorage.getItem('adminAuthToken');
  const adminData = JSON.parse(localStorage.getItem('adminData'));

  const resetForm = () => {
    setTempImg('');
    setImg('');
    setState({
      ...state,
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
      slug: '',
      headline: '',
      promoVideo: '',
      ein: '',
      status: 1
    });
  };
  const setOpenModal = () => {
    resetForm();
    setModal(true);
  };

  useEffect(() => {
    (async () => {
      if (!hasPermission(adminData.roleName, 'CAMPAIGN_ADMIN')) {
        navigate('/admin/dashboard');
      }

      const verifyUser = await authApi.verifyToken(adminAuthToken);
      if (!verifyUser.data.success) {
        localStorage.clear();
        navigate('/admin/login');
      }

      setLoading(false);
      const getCampaignAdminList = await adminCampaignApi.list(adminAuthToken);
      if (getCampaignAdminList.data.success) {
        setCampaignAdminList(getCampaignAdminList.data.data);
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
  }, [update]);

  // const changefile = (e) => {
  //   let file = e.target.files[0] ? e.target.files[0] : '';
  //   setImg(URL.createObjectURL(file));

  //   setState({
  //     ...state,
  //     logo: file
  //   });
  // };

  const changefile = (e) => {
    let file = e.target.files[0] ? e.target.files[0] : '';
    if (file) {
      setTempImg(URL.createObjectURL(file));

      setState({
        ...state,
        logo: file
      });
    } else {
      setTempImg('');

      setState({
        ...state,
        logo: ''
      });
    }
  };

  const addCampaignAdmin = () => {
    validateAll(state, ADD_CAMPAIGN_ADMIN_RULES, ADD_CAMPAIGN_ADMIN_VALIDATION_MESSAGES)
      .then(async () => {
        const formaerrror = {};
        setState({
          ...state,
          error: formaerrror
        });
        let data = {};
        data.name = name;
        data.email = email;
        data.status = status;
        data.password = password;
        data.logo = logo;
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
        data.slug = slug;
        data.headline = headline;
        data.promoVideo = promoVideo;
        data.ein = ein;

        setLoading(false);
        const addUser = await adminCampaignApi.add(adminAuthToken, data);
        if (addUser) {
          if (!addUser.data.success) {
            setLoading(false);
            ToastAlert({ msg: addUser.data.message, msgType: 'error' });
          } else {
            setUpdate(!update);
            setLoading(false);
            ToastAlert({ msg: addUser.data.message, msgType: 'success' });
            setModal(false);
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

        setState({
          ...state,
          error: formaerrror
        });
      });
  };

  const deleteCampaignAdmin = (id) => {
    confirmAlert({
      title: 'Delete Record',
      message: 'Are you sure ?',
      buttons: [
        {
          label: 'No'
        },
        {
          label: 'Yes',

          onClick: async () => {
            setLoading(false);
            const deleteUser = await adminCampaignApi.deleteCampaignAdmin(adminAuthToken, id);
            if (deleteUser) {
              if (!deleteUser.data.success) {
                setLoading(false);
                ToastAlert({ msg: deleteUser.data.message, msgType: 'error' });
              } else {
                setUpdate(!update);
                setLoading(false);
                ToastAlert({ msg: deleteUser.data.message, msgType: 'success' });
              }
            } else {
              setLoading(false);
              ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
            }
          }
        }
      ]
    });
  };

  const getUserRecord = async (data) => {
    if (!data || data === null || data === '') {
      return;
    }
    // }
    console.log('getUserRecord:', {data})
    setLoading(false);
    if (data.country_id && data.country_id !== null && data.country_id > 0) {
      const getCountryStateList = await adminCampaignApi.stateListByCountry(
        adminAuthToken,
        data.country_id
      );
      if (getCountryStateList.data.success === true) {
        setStateList(getCountryStateList.data.data);
      }
    }
    if (data.state_id && data.state_id !== null && data.state_id > 0) {
      const getStateCityList = await adminCampaignApi.cityListByState(
        adminAuthToken,
        data.state_id
      );
      if (getStateCityList.data.success === true) {
        setCityList(getStateCityList.data.data);
      }
    }

    // console.log(data)
    setTempImg(data.logo);
    setState({
      ...state,
      id: data._id,
      name: data.name,
      email: data.email,
      status: data.status,
      description: data.description,
      twitter: data.twitter,
      facebook: data.facebook,
      linkedin: data.linkedin,
      url: data.url,
      country: data.country_id,
      city: data.city_id,
      stateid: data.state_id,
      address: data.address,
      category: data.category_id,
      slug: data.slug,
      headline: data.headline,
      promoVideo: data.promoVideo,
      ein: data.ein,
      error: []
    });
    setLoading(false);
    setModal(true);
  };

  const updateCampaignAdmin = () => {
    validateAll(state, UPDATE_CAMPAIGN_ADMIN_RULES, UPDATE_CAMPAIGN_ADMIN_VALIDATION_MESSAGES)
      .then(async () => {
        const formaerrror = {};
        setState({
          ...state,
          error: formaerrror
        });

        let data = {};
        data.name = name;
        data.status = status; // default === 1
        data.email = email;
        if (password && password !== '') {
          data.password = password;
        }
        if (logo && logo !== '') {
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
        // data.status = status
        data.headline = headline;
        data.promoVideo = promoVideo;
        data.ein = ein;

        try {
          const updatedData = await adminCampaignApi.updateCampaignAdmin(adminAuthToken, data, id);
          if (updatedData.data.success) {
            setUpdate(!update);
            ToastAlert({ msg: updatedData.data.message, msgType: 'success' });
            setModal(false);
            resetForm();
          } else {
            ToastAlert({ msg: updatedData.data.message, msgType: 'error' });
          }
        } catch (err) {
          ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
        }
      })
      .catch((errors) => {
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
      }).finally(() => {
        setLoading(false);
      });
  };

  // Assuming you have defined the updateCampaignAdmin function that accepts id, data, and adminAuthToken as arguments and returns a promise.


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
    } else if (e.target.name === 'name') {
      if (id === '') {
        let organizationNameVar = value.toLowerCase();
        organizationNameVar = organizationNameVar.replace(/\s+/g, '-');
        setState({
          ...state,
          slug: organizationNameVar,
          [e.target.name]: value
        });
      } else {
        setState({
          ...state,
          [e.target.name]: value
        });
      }
    } else if (e.target.name === 'slug') {
      if (id === '') {
        let organizationNameVar = value.toLowerCase();
        organizationNameVar = organizationNameVar.replace(/\s+/g, '-');
        setState({
          ...state,
          slug: organizationNameVar
        });
      }
    } else {
      if (e.target.name === 'amount') {
        value = e.target.value.replace(/[^\d.]|\.(?=.*\.)/g, '');
      }
      setState({
        ...state,
        [e.target.name]: value
      });
    }
  };

  const payoutToAdmin = async (data) => {
    await TransactionHistory(data._id);
    setPayoutModal(true);
    setOrganizationDetails(data);
    setBankDetailsDetails({});
    setState({
      ...state,
      account: '',
      amount: '',
      error: []
    });
  };

  const onSelectBank = async (e, data) => {
    setBankDetailsDetails(data);
    setState({
      ...state,
      account: e.target.value
    });
  };

  const payToOrganization = () => {
    validateAll(state, PAY_TO_ORGANIZATION_RULES, PAY_TO_ORGANIZATION_VALIDATION_MESSAGES)
      .then(async () => {
        const formaerrror = {};
        setState({
          ...state,
          error: formaerrror
        });
        if (Number(amount) > organizationDetails?.organizationaccount?.pending_amount) {
          ToastAlert({ msg: 'Amount can not be bigger then Payable amount', msgType: 'info' });
        } else {
          let data = {};
          data.organizationId = organizationDetails._id;
          data.amount = Number(amount);
          data.accountId = bankDetails.stripeAccountId;

          setLoading(false);
          const pay = await adminCampaignApi.payToCampaignAdmin(adminAuthToken, data);
          if (pay) {
            if (!pay.data.success) {
              setLoading(false);
              ToastAlert({ msg: pay.data.message, msgType: 'error' });
            } else {
              setUpdate(!update);
              setLoading(false);
              ToastAlert({ msg: pay.data.message, msgType: 'success' });
              setPayoutModal(false);
              // resetForm()
            }
          } else {
            setLoading(false);
            ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
          }
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

        setState({
          ...state,
          error: formaerrror
        });
      });
  };

  const TransactionHistory = async (organizationId) => {
    let data = {};
    data.organizationId = organizationId;
    const history = await adminCampaignApi.CampaignAdminPayHistory(adminAuthToken, data);
    if (history) {
      if (!history.data.success) {
        setLoading(false);
        ToastAlert({ msg: history.data.message, msgType: 'error' });
      } else {
        setOrgTransactionHistory(history.data.data);
      }
    } else {
      setLoading(false);
      ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
    }
  };

  return (
    <>
      {/*<FrontLoader loading={loading} />*/}
      <CampaignAdminForm
        modal={modal}
        setModal={setModal}
        changevalue={changevalue}
        stateData={state}
        addCampaignAdmin={addCampaignAdmin}
        updateCampaignAdmin={updateCampaignAdmin}
        changefile={changefile}
        tempImg={tempImg}
        Img={Img}
        categoryList={categoryList}
        countryList={countryList}
        stateList={stateList}
        cityList={cityList}
      />
      <Index
        campaignAdminList={campaignAdminList}
        setOpenModal={setOpenModal}
        deleteCampaignAdmin={deleteCampaignAdmin}
        getUserRecord={getUserRecord}
        payoutToAdmin={payoutToAdmin}
      />

      <Payout
        payoutModal={payoutModal}
        setPayoutModal={setPayoutModal}
        organizationDetails={organizationDetails}
        stateData={state}
        onSelectBank={onSelectBank}
        payToOrganization={payToOrganization}
        changevalue={changevalue}
        orgTransactionHistory={orgTransactionHistory}
      />
    </>
  );
}
export default CampaignAdminController;
