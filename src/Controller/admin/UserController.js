import React, { useState, useEffect } from 'react';
//import FrontLoader from "../../Common/FrontLoader"
import AddUserForm from '../../View/admin/User/AddUserForm';
import UserList from '../../View/admin/User/UserList';
import userApi from '../../Api/admin/user';
import { validateAll } from 'indicative/validator';
import ToastAlert from '../../Common/ToastAlert';
import { confirmAlert } from 'react-confirm-alert';
import { useNavigate } from 'react-router-dom';
import adminCampaignApi from '../../Api/admin/adminCampaign';
import authApi from '../../Api/admin/auth';
import { hasPermission } from '../../Common/Helper';

function UserController() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [update, setUpdate] = useState(false);
  const [userList, setUserList] = useState([]);
  const [state, setState] = useState({
    id: '',
    name: '',
    email: '',
    password: '',
    country: '',
    city: '',
    stateid: '',
    street: '',
    zip: '',
    error: [],
    status: 1
  });
  const { name, email, password, country, city, stateid, street, zip, status, id } = state;

  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const adminAuthToken = localStorage.getItem('adminAuthToken');
  const adminData = JSON.parse(localStorage.getItem('adminData'));

  const resetForm = () => {
    setState({
      ...state,
      id: '',
      name: '',
      email: '',
      password: '',
      country: '',
      city: '',
      stateid: '',
      street: '',
      zip: '',
      error: [],
      status: 1
    });
  };
  const setOpenModal = () => {
    resetForm();
    setModal(true);
  };

  useEffect(() => {
    (async () => {
      setLoading(false);
      if (!hasPermission(adminData.roleName, 'DONORS')) {
        navigate('/admin/dashboard');
      }
      const verifyUser = await authApi.verifyToken(adminAuthToken);
      if (!verifyUser.data.success) {
        localStorage.clear();
        navigate('/admin/login');
      }
      const getUserList = await userApi.list(adminAuthToken);
      if (getUserList.data.success) {
        setUserList(getUserList.data.data);
      }

      const getCountryList = await adminCampaignApi.countryList(adminAuthToken);
      if (getCountryList.data.success === true) {
        setCountryList(getCountryList.data.data);
      }
      setLoading(false);
    })();
  }, [update]);

  const addUser = () => {
    const rules = {
      name: 'required',
      email: 'required|email',
      password: 'required|min:6',

      country: 'required',
      zip: 'required',
      city: 'required',
      stateid: 'required',
      street: 'required'
    };

    const message = {
      'email.required': 'Email is Required.',
      'name.required': 'Name is Required.',
      'email.email': 'please enter valid email.',
      'password.min': 'Password must be at least 6 characters',
      'password.required': 'Password is Required.',

      'zip.required': 'Zip Code is Required.',
      'country.required': 'Country is Required.',
      'city.required': 'City is Required.',
      'stateid.required': 'State is Required.',
      'street.required': 'Street Address is Required.'
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
        data.email = email;
        data.password = password;
        data.country_id = country;
        data.city_id = city;
        data.state_id = stateid;
        data.street = street;
        data.zip = zip;
        data.status = status;

        setLoading(false);
        const addUser = await userApi.add(adminAuthToken, data);
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

  const deleteUser = (id) => {
    confirmAlert({
      title: 'Delete Record',
      message: 'Are you sure ?',
      buttons: [
        {
          label: 'Yes',

          onClick: async () => {
            setLoading(false);
            const deleteUser = await userApi.deleteUser(adminAuthToken, id);
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
        },
        {
          label: 'No'
        }
      ]
    });
  };

  const getUserRecord = async (data) => {
    setLoading(false);

    if (data.country_id) {
      const getCountryStateList = await adminCampaignApi.stateListByCountry(
        adminAuthToken,
        data.country_id
      );
      if (getCountryStateList.data.success === true) {
        setStateList(getCountryStateList.data.data);
      }
    }

    if (data.state_id) {
      const getStateCityList = await adminCampaignApi.cityListByState(
        adminAuthToken,
        data.state_id
      );
      if (getStateCityList.data.success === true) {
        setCityList(getStateCityList.data.data);
      }
    }

    setLoading(false);
    setState({
      ...state,
      id: data._id,
      username: data.username,
      name: data.name,
      email: data.email,
      role: data.role,
      status: data.status,
      country: data.country_id,
      city: data.city_id,
      stateid: data.state_id,
      zip: data.zip,
      street: data.street
    });
    setModal(true);
  };
  const updateUser = () => {
    const rules = {
      // username: "required",
      name: 'required',
      email: 'required|email',
      country: 'required',
      zip: 'required',
      city: 'required',
      stateid: 'required',
      street: 'required'
    };

    const message = {
      'email.required': 'Email is Required.',
      'name.required': 'Name is Required.',
      'email.email': 'please enter valid email.',
      'username.required': 'Username is Required.',
      'role.required': 'Role is Required.',

      'zip.required': 'Zip Code is Required.',
      'country.required': 'Country is Required.',
      'city.required': 'City is Required.',
      'stateid.required': 'State is Required.',
      'street.required': 'Street Address is Required.'
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
        // data.role = role
        if (password && password !== '') {
          data.password = password;
        }
        data.status = status;
        data.country_id = country;
        data.city_id = city;
        data.state_id = stateid;
        data.street = street;
        data.zip = zip;

        setLoading(false);
        const addUser = await userApi.updateUser(adminAuthToken, data, id);
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
        console.log(errors);
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
      // console.log('e.target.name')
    } else if (e.target.name === 'stateid') {
      setLoading(false);
      const getStateCityList = await adminCampaignApi.cityListByState(adminAuthToken, value);
      if (getStateCityList.data.success === true) {
        console.log(getStateCityList.data.data);
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

  return (
    <>
      {/*<FrontLoader loading={loading} />*/}
      <AddUserForm
        modal={modal}
        setModal={setModal}
        changevalue={changevalue}
        stateData={state}
        addUser={addUser}
        updateUser={updateUser}
        countryList={countryList}
        stateList={stateList}
        cityList={cityList}
      />
      <UserList
        userList={userList}
        setOpenModal={setOpenModal}
        deleteUser={deleteUser}
        getUserRecord={getUserRecord}
      />
    </>
  );
}
export default UserController;
