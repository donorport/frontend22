import Profile from '../../View/frontEnd/Layout/Profile';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
//import FrontLoader from "../../Common/FrontLoader";
import userApi from '../../Api/frontEnd/user';
import ToastAlert from '../../Common/ToastAlert';
import { validateAll } from 'indicative/validator';

export default function ProfileController() {
  const [state, setState] = useState({
    id: '',
    name: '',
    username: '',
    rolename: '',
    email: '',
    new_password: '',
    cpassword: '',
    current_password: '',
    error: []
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams();
  const userAuthToken = localStorage.getItem('userAuthToken');

  useEffect(() => {
    setLoading(true);
    let urlPerm = params.username;
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (!userData || urlPerm !== userData.username) {
      navigate('/');
    } else {
      setState({
        ...state,
        id: userData.id,
        name: userData.name,
        username: userData.username,
        rolename: userData.roleName,
        email: userData.email
      });
    }
    setLoading(false);
  }, []);

  const changevalue = (e) => {
    let value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    });
  };

  const updateUserProfile = async () => {
    const rules = {
      name: 'required'
    };

    const message = {
      'name.required': 'Name is required.'
    };
    validateAll(state, rules, message)
      .then(async () => {
        const formaerrror = {};
        setState({
          ...state,
          error: formaerrror
        });

        let data = {};
        data.name = state.name;
        setLoading(true);
        const updateProfile = await userApi.updateProfile(userAuthToken, data, state.id);
        if (updateProfile) {
          if (updateProfile.data.success) {
            setLoading(false);
            /*ToastAlert({ msg: updateProfile.data.message, msgType: 'success' });*/
            localStorage.setItem('userData', JSON.stringify(updateProfile.data));
          } else {
            setLoading(false);
            ToastAlert({ msg: updateProfile.data.message, msgType: 'error' });
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
  const updatePassword = () => {
    const rules = {
      email: 'required|email',
      new_password: 'required|min:6',
      cpassword: 'required|same:new_password',
      current_password: 'required'
    };

    const message = {
      'email.required': 'Email is required.',
      'email.email': 'please enter valid email.',
      'new_password.min': 'New Password must be at least 6 characters',
      'new_password.required': 'New Password is required.',
      'cpassword.required': 'Confirm Password is required.',
      'cpassword.same': 'New Password and Confirm Password Must be Same',
      'current_password.required': 'Current Password is required.'
    };
    validateAll(state, rules, message)
      .then(async () => {
        const formaerrror = {};
        setState({
          ...state,
          error: formaerrror
        });
        let data = {};
        data.email = state.email;
        data.current_password = state.current_password;
        data.new_password = state.new_password;

        setLoading(true);
        const updatePassword = await userApi.updatePassword(userAuthToken, data);
        if (updatePassword) {
          if (!updatePassword.data.success) {
            setLoading(false);
            ToastAlert({ msg: updatePassword.data.message, msgType: 'error' });
          } else {
            setState({
              ...state,
              new_password: '',
              cpassword: '',
              current_password: '',
              error: []
            });
            setLoading(false);
            /*ToastAlert({ msg: updatePassword.data.message, msgType: 'success' });*/
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

  return (
    <>
      {/* {console.log(state.error)} */}

      <Profile
        stateData={state}
        changevalue={changevalue}
        updateUserProfile={updateUserProfile}
        updatePassword={updatePassword}
      />
    </>
  );
}
