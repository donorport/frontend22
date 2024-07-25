import React, { useState, useEffect, useCallback } from 'react';
import { validateAll } from 'indicative/validator';
import ToastAlert from '../../../../../Common/ToastAlert';
import { useOutletContext, useNavigate } from 'react-router-dom';
import Select from 'react-select';
import locationApi from '../../../../../Api/frontEnd/location';
import userApi from '../../../../../Api/frontEnd/user';
import { Button } from 'react-bootstrap';
import helper from '../../../../../Common/Helper';
import { useSelector, useDispatch } from 'react-redux';
import {
  setIsUpdateUserDetails,
  setCurrency,
  setProfileImage,
  setUserCountry,
  setUserState,
  setLogout
} from '../../../../../user/user.action';
import noImg from '../../../../../assets/images/avatar.png';
import receipt from '../../../../../assets/images/receipt.svg';
import cartApi from '../../../../../Api/frontEnd/cart';
import { confirmAlert } from 'react-confirm-alert';
import './style.scss';
//import ToggleSwitch from '../../atoms/toggle-switch/index';
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

const LANGUAGE_OPTIONS = [
  { value: 'english', label: 'English' },
  { value: 'manderin', label: 'Manderin' },
  { value: 'french', label: 'French' }
];

const UPDATE_PROFILE_VALIDATION_RULES = {
  name: 'required',
  street: 'required',
  zip: 'required',
  city: 'required',
  stateId: 'required',
  country: 'required'
  // language: "required",
  // currency: "required",
};

const UPDATE_PROFILE_VALIDATION_MESSAGES = {
  'name.required': 'Name is required.',
  'street.required': 'Street is required.',
  'zip.required': 'Zip Code is required.',
  'stateId.required': 'State is required.',
  'city.required': 'City is required.',
  'country.required': 'Country is required.',
  'language.required': 'Language is required.',
  'currency.required': 'Currency is required.'
};

const UserProfile = () => {
  //const [check, setCheck] = useState(false);
  // const user = useContext(UserContext)
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userAuthToken = localStorage.getItem('userAuthToken');
  const [update, setUpdate] = useState(false);
  const [data, setData] = useOutletContext();
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);

  const [defaultCountry, setDefaultCountry] = useState([]);
  const [defaultState, setDefaultState] = useState([]);
  const [defaultCity, setDefaultCity] = useState([]);

  const [defaultLanguage, setDefaultLanguage] = useState([]);
  // const [defaultCurrency, setDefaultCurrency] = useState([]);

  const [countryCurrency, setCountryCurrency] = useState([]);
  const [tempImg, setTempImg] = useState('');
  const [loading, setLoading] = useState('');

  // const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    image: '',
    name: '',
    email: '',
    street: '',
    city: '',
    stateId: '',
    country: '',
    currency: '',
    language: '',
    zip: '',
    error: [],
    galleryImages: []
  });

  const { name, email, street, city, stateId, country, zip, error, image } = state;

  const getCountryStateList = useCallback(
    async (countryId) => {
      let tempArray = [];
      const getCountryStateList = await locationApi.stateListByCountry(
        userAuthToken,
        Number(countryId)
      );
      if (getCountryStateList) {
        if (getCountryStateList.data.success) {
          if (getCountryStateList.data.data.length > 0) {
            getCountryStateList.data.data.map((state) => {
              let Obj = {};
              Obj.value = state.id;
              Obj.label = state.state;
              tempArray.push(Obj);
            });
            setDefaultState([]);
            setStateList(tempArray);
          } else {
            setDefaultState([]);
            setStateList([]);
          }
        }
      }
    },
    [userAuthToken]
  );

  const getStateCityList = useCallback(
    async (stateId) => {
      let tempArray = [];
      const getStateCityList = await locationApi.cityListByState(userAuthToken, stateId);
      if (getStateCityList) {
        if (getStateCityList.data.success) {
          if (getStateCityList.data.data.length > 0) {
            getStateCityList.data.data.map((city) => {
              let Obj = {};
              // Obj.value = city.id
              // Obj.label = city.city
              Obj.value = city._id.id;
              Obj.label = city._id.city;
              tempArray.push(Obj);
            });
            setDefaultCity([]);
            setCityList(tempArray);
          } else {
            setDefaultCity([]);
            setCityList([]);
          }
        }
      }
    },
    [userAuthToken]
  );

  const getCountryList = useCallback(async () => {
    let tempArray = [];
    let tempCurrencyArray = [];
    let tempCountryCurrencyArray = [];

    const getCountryList = await locationApi.countryList(userAuthToken);
    if (getCountryList) {
      if (getCountryList.data.success) {
        if (getCountryList.data.data.length > 0) {
          getCountryList.data.data.map((country) => {
            let Obj = {};
            let currencyObj = {};

            let countryCurrencyObj = {};

            currencyObj.value = country.currency + '=' + country.symbol;
            currencyObj.label = country.currency;
            currencyObj.icon = country.symbol;

            countryCurrencyObj.label = country.currency;
            countryCurrencyObj.icon = country.symbol;
            countryCurrencyObj.id = country.id;

            tempCountryCurrencyArray.push(countryCurrencyObj);

            Obj.value = country.id;
            Obj.label = country.country;
            tempArray.push(Obj);
            // tempCurrencyArray.push(tempCountryCurrencyArray)
          });
          setCountryList(tempArray);
          setCountryCurrency(tempCountryCurrencyArray);
          const currencyLable = tempCurrencyArray.map((o) => o.label);
          const filteredLabels = tempCurrencyArray.filter(
            ({ label }, index) => !currencyLable.includes(label, index + 1)
          );

          setCurrencyList(filteredLabels);
        }
      }
    }
  }, [userAuthToken]);

  const onChangeCountry = async (e) => {
    // let tempArray = [];
    setDefaultCountry(e);
    setState({
      ...state,
      country: e.value,
      stateId: '',
      city: ''
    });
    setDefaultCity([]);

    await getCountryStateList(e.value);
    // const getCountryStateList = await locationApi.stateListByCountry(userAuthToken, e.value);
    // if (getCountryStateList) {
    //   if (getCountryStateList.data.success) {
    //     if (getCountryStateList.data.data.length > 0) {
    //       getCountryStateList.data.data.map((state, i) => {
    //         let Obj = {}
    //         Obj.value = state.id
    //         Obj.label = state.state
    //         tempArray.push(Obj)
    //       })
    //       setStateList(tempArray)
    //     }
    //   }
    // }
  };

  const onChangeState = async (e) => {
    setDefaultState(e);
    setState({
      ...state,
      stateId: e.value,
      city: ''
    });
    await getStateCityList(e.value);
    // const getStateCityList = await locationApi.cityListByState(userAuthToken, e.value);
    // if (getStateCityList) {
    //   if (getStateCityList.data.success) {
    //     if (getStateCityList.data.data.length > 0) {
    //       getStateCityList.data.data.map((city, i) => {
    //         let Obj = {}
    //         Obj.value = city.id
    //         Obj.label = city.city
    //         tempArray.push(Obj)
    //       })
    //       setCityList(tempArray)
    //     }
    //   }
    // }
  };

  const changevalue = async (e) => {
    let value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    });
    // setTotalFees(Number(platformFees) + Number(transactionFees))
  };

  // const onClickCity = async (e) => {
  //   setDefaultCity(e);
  //   setState({
  //     ...state,
  //     city: e.value
  //   });
  // };

  const changefile = (e) => {
    let file = e.target.files[0] ? e.target.files[0] : '';
    if (file) {
      setTempImg(URL.createObjectURL(file));

      setState({
        ...state,
        image: file
      });
    } else {
      setTempImg('');

      setState({
        ...state,
        image: ''
      });
    }
  };

  // const onChangeCurrency = (e) => {

  //   setDefaultCurrency(e);
  //   setState({
  //     ...state,
  //     currency: e.value
  //   });
  // };

  // const onChangeLanguage = (e) => {
  //   setDefaultLanguage(e);
  //   setState({
  //     ...state,
  //     language: e.value
  //   });
  // };

  // const convertCurrency = async (currency) => {
  //   const getCurrencyPrice = await locationApi.convertCurrency(currency);
  //   if (getCurrencyPrice) {

  //     if (getCurrencyPrice.data.success) {
  //       dispatch(setCurrencyPrice(getCurrencyPrice.data.result));
  //     }
  //   }
  // };

  const clearCart = async () => {
    setLoading(true);
    const clearCart = await cartApi.clearCart(userAuthToken);
    if (clearCart) {
      if (!clearCart.data.success) {
        // setLoading(false);
        // ToastAlert({ msg: clearCart.data.message, msgType: 'error' });
      }
      // else {
      //   setLoading(false);
      // }
    }
    // else {
    //   setLoading(false);
    //   // ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
    // }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      // console.log(data)
      // if (data.country_id && data.country_id !== null ) {
      //   await getCountryStateList(data.country_id)
      // }
      // if (data.state_id  && data.state_id !== null) {
      //   await getStateCityList(data.state_id)

      // }
      // await getCountryList()

      setState((s) => ({
        ...s,
        name: data.name,
        image: data.image,
        email: data.email,
        city: data.city_id,
        country: data.country_id,
        stateId: data.state_id,
        street: data.street,
        language: data.language,
        currency: data.currency,
        zip: data.zip
      }));

      if (data.country_id && data.country_id !== null) {
        await getCountryStateList(data.country_id);
      }
      if (data.state_id && data.state_id !== null) {
        await getStateCityList(data.state_id);
      }
      await getCountryList();
      // setDefaultCountry(countryList.find(x => x.value === data.country_id));
      // setLoading(false);
    })();
  }, [data, getCountryList, getCountryStateList, getStateCityList]);

  // const countrySelect = useRef(null)

  useEffect(() => {
    // dispatch(setUserCountry(data.country_id))

    if (countryList.length > 0) {
      setDefaultCountry(countryList.find((x) => x.value === data.country_id));
    }
    if (stateList.length > 0) {
      setDefaultState(stateList.find((x) => x.value === data.state_id));
    }
    /*if (cityList.length > 0) {
      setDefaultCity(cityList.find((x) => x.value === data.city_id));
    }*/

    setDefaultLanguage(LANGUAGE_OPTIONS.find((x) => x.value === data.language));
    // let tempCurrencyObj = {};
    // let temp = countryCurrency.find(x => x.id === data.country_id)

    // let UsercountryObj = {}
    // UsercountryObj.currency = temp?.label
    // UsercountryObj.currencySymbol = temp?.icon
    // dispatch(setCurrency(UsercountryObj))
    // let userCurrency = data.currency ? data.currency : ''
    // if (userCurrency) {
    //   tempCurrencyObj.value = data.currency
    //   tempCurrencyObj.label = userCurrency.split('=')[0]
    //   tempCurrencyObj.icon = userCurrency.split('=')[1]
    //   setDefaultCurrency(tempCurrencyObj)
    //   // let currencyData ={}
    //   // currencyData.currency = userCurrency.split('=')[0]
    //   // currencyData.currencySymbol = userCurrency.split('=')[1]
    //   // dispatch(setCurrency(currencyData))
    // }
  }, [countryList, data.country_id, data.language, data.state_id, stateList]);

  const updateProfile = () => {
    validateAll(state, UPDATE_PROFILE_VALIDATION_RULES, UPDATE_PROFILE_VALIDATION_MESSAGES)
      .then(async () => {
        const formaerrror = {};
        setState({
          ...state,
          error: formaerrror
        });
        let fdata = {};
        fdata.name = name;
        fdata.street = street;
        fdata.zip = zip;
        fdata.city_id = city;
        fdata.state_id = stateId;
        fdata.country_id = country;
        // fdata.language = language
        // fdata.currency = currency

        if (image) {
          fdata.image = image;
        }

        setLoading(true);
        const addUser = await userApi.updateProfile(userAuthToken, fdata);
        if (addUser) {
          if (!addUser.data.success) {
            // setLoading(false);
            ToastAlert({ msg: addUser.data.message, msgType: 'error' });
          } else {
            await clearCart();
            dispatch(setUserCountry(country));

            let temp = countryCurrency.find((x) => x.id === country);

            let UsercountryObj = {};
            UsercountryObj.currency = temp?.label;
            UsercountryObj.currencySymbol = temp?.icon;
            dispatch(setCurrency(UsercountryObj));
            dispatch(setUserState(stateId));

            // let currencyData = {}
            // currencyData.currency = currency.split('=')[0]
            // currencyData.currencySymbol = currency.split('=')[1]
            // dispatch(setCurrency(currencyData))
            if (tempImg && tempImg !== '') {
              dispatch(setProfileImage(tempImg));
            }

            // await convertCurrency(currency.split('=')[0])
            setUpdate(!update);
            // user.setUpdateOrg(!user.isUpdateOrg)
            dispatch(setIsUpdateUserDetails(!user.isUpdateUserDetails));
            setData(fdata);
            // setLoading(false);
            ToastAlert({ msg: addUser.data.message, msgType: 'success' });
          }
        } else {
          // setLoading(false);
          ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
        }
      })
      .catch((errors) => {
        // setLoading(false);
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
      title: 'Deactivate Account',
      message:
        "Are you sure to want to deactivate this account? If you will do this then you won't be able to do login again.",
      buttons: [
        {
          label: 'Cancel'
        },
        {
          label: 'Delete Account',

          onClick: async () => {
            setLoading(true);
            const deleteUser = await userApi.deleteUser(userAuthToken, id);
            if (deleteUser) {
              if (!deleteUser.data.success) {
                // setLoading(false);
                ToastAlert({ msg: deleteUser.data.message, msgType: 'error' });
              } else {
                dispatch(setLogout());
                navigate('/signin');
                //
                // setLoading(false);
                ToastAlert({ msg: deleteUser.data.message, msgType: 'success' });
              }
            } else {
              // setLoading(false);
              ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
            }
          }
        }
      ]
    });
  };

  // const colourStyles = {
  //   control: (styles) => ({ ...styles, backgroundColor: 'white' }),
  //   option: (styles, { data, isDisabled, isFocused, isSelected }) => {
  //     // eslint-disable-next-line no-undef
  //     const color = chroma(data.color);
  //     return {
  //       backgroundColor: isDisabled ? 'red' : 'blue',
  //       color: '#FFF',
  //       cursor: isDisabled ? 'not-allowed' : 'default'
  //     };
  //   }
  // };

  return (
    <>
      <div className="mb-5">
        <h4 className="fw-bolder">Personal</h4>
        <div className="text-subtext mb-3 pt-1 pt-1">
          This info is only shared with the Organizations you donate to
        </div>

        <div className="ml-3 mb-5">
          <div className="d-flex gap-2">
            <label className="filelabel col-sm-3">
              <i className="fa fa-paperclip "></i>
              <span className="title">Avatar</span>
              <input
                className="FileUpload1"
                id="FileInput"
                name="booking_attachment"
                type="file"
                onChange={(e) => changefile(e)}
              />
            </label>
            {tempImg !== '' || image !== '' || image !== null ? (
              <div className="col-sm-6 ml-3">
                <img
                  src={tempImg ? tempImg : image ? helper.DonorImagePath + image : noImg}
                  alt="user profile"
                 
                  style={{
                    width: '120px',
                    borderRadius: '9px',
                    height: '120px',
                    objectFit: 'cover'
                  }}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="d-flex flex-column mb-5 pb-2 gap-3">
          {' '}
          <div className="input__wrap d-flex">
            <label className="input__label flex-grow-1">
              <input type="text" name="name" value={name} onChange={(e) => changevalue(e)} />
              <span className="input__span">Name</span>
            </label>
          </div>
          {error && error.name && <p className="error">{error.name}</p>}
          <div className="input__wrap d-flex">
            <label className="input__label flex-grow-1">
              <input type="text" value={email} disabled />
              <span className="input__span">Email</span>
            </label>
          </div>
        </div>

        {/*   <div className="d-flex align-items-center py-3">
          <ToggleSwitch
            isOn={check}
            handleToggle={() => setCheck(!check)}
            colorOne="#06D6A0"
            colorTwo="#efefef"
          />{' '}
          <span className="fs-7 text-subtext ms-2">
            Hide your order history on public posts for items & organizations you donate to.
          </span>
          <FontAwesomeIcon icon={solid('eye-slash')} className="icon__hide fs-4 ms-2" />
        </div>*/}
      </div>

      <div>
        <div className="d-flex flex-column mb-3">
          <h4 className="fw-bolder">Address</h4>
          <div className="text-subtext mb-3 pt-1">For invoices & tax receipts</div>
          <div className="note note--inputs">
            Your personal information is secured and not shared with anyone. We use this information
            to process tax receipts for your donations.
          </div>
        </div>

        <div className="d-flex flex-column gap-5 mb-3">
          <div className="input__wrap d-flex">
            <label className="input__label flex-grow-1">
              <input type="text" name="street" value={street} onChange={(e) => changevalue(e)} />
              <span className="input__span">Street Name</span>
            </label>
          </div>
          {error && error.street && <p className="error">{error.street}</p>}
          <div className="input__wrap d-flex">
            <label className="input__label flex-grow-1">
              {/* <input type="text" value='' /> */}
              {/* {countrySelect.current} */}
              <Select
                /*styles={colourStyles}*/
                className="basic-single"
                classNamePrefix="select"
                value={defaultCountry}
                // defaultValue={countrySelect.current}
                name="country"
                options={countryList}
                onChange={onChangeCountry}
                components={{
                  IndicatorSeparator: () => null
                }}
                // isDisabled
              />
              <span className="input__span">Country</span>
            </label>
          </div>
          {error && error.country && <p className="error">{error.country}</p>}
          <div className="input__wrap d-flex">
            <label className="input__label flex-grow-1">
              {/* <input type="text" value='' /> */}
              <Select
                className="basic-single"
                classNamePrefix="select"
                value={defaultState}
                name="state"
                options={stateList}
                onChange={onChangeState}
                components={{
                  IndicatorSeparator: () => null
                }}
              />
              <span className="input__span">State/Province</span>
            </label>
          </div>
          {error && error.stateId && <p className="error">{error.stateId}</p>}
          <div className="input__wrap d-flex">
            <label className="input__label flex-grow-1">
              {/*USE THESE FOR CITY SELECT */}
              {/* <Select
              className="basic-single"
              classNamePrefix="select"
              value={defaultCity}
              options={cityList}
              onChange={onClickCity}
              components={{ IndicatorSeparator: () => null }}
            />*/}

              {/*USE THESE FOR TEXT ONLY. Getting "Something Went Wrong error" when saving*/}
              <input type="text" name="city" value={city} onChange={(e) => changevalue(e)} />
              <span className="input__span">City</span>
            </label>
          </div>
          {error && error.city && <p className="error">{error.city}</p>}
          <div className="input__wrap d-flex">
            <label className="input__label flex-grow-1">
              <input type="text" name="zip" value={zip} onChange={(e) => changevalue(e)} />
              <span className="input__span">Zipcode</span>
            </label>
          </div>
          {error && error.zip && <p className="error">{error.zip}</p>}
        </div>
      </div>
      {/* <div className="mb-5">
        <h4 className="fw-bolder">Language & Currency</h4>
        <div className="text-subtext mb-3 pt-1">
          Set and change your default location, language and currency
        </div>
        <div className="w-350">
          <div className="mb-2">

            <Select
              className="basic-single"
              classNamePrefix="select"
              value={defaultLanguage}
              name="language"
              options={options}
              onChange={onChangeLanguage}
               components={{
                          IndicatorSeparator: () => null
                        }}

            />
          </div>
          {error && error.language && <p className="error">{error.language}</p>}

          <Select
            className="basic-single"
            classNamePrefix="select"
            value={defaultCurrency}
            name="currency"
            options={currencyList}
            getOptionLabel={e => (
              <div style={{ display: '', alignItems: 'center' }}>

                <span style={{ float: "right" }}>{e.icon}</span>
                <span >{e.label}</span>

              </div>
            )}
            onChange={onChangeCurrency}
             components={{
                          IndicatorSeparator: () => null
                        }}
          />
        </div>
        {error && error.currency && <p className="error">{error.currency}</p>}

      </div> */}

      <Button variant="info" size="md" className="mb-3" onClick={updateProfile}>
        Save Details
      </Button>

      <div className="mb-5 mt-5">
        <h4 className="fw-bolder">Account Deactivation</h4>
        <div className="text-subtext mb-3 pt-1">Permanently delete your Donorport account</div>
        <div className="mw-100">
          <div className="deactivate">
            <h5>Do you really want to leave us?</h5>
            <ul className="list list--deactivate">
              <li className="list__item">
                <div>
                  All account information will be lost including order history and payment
                  information.
                </div>
              </li>
              <li className="list__item">
                <div>Active orders will be cancelled.</div>
              </li>
              <li className="list__item">
                <div>This cannot be undone.</div>
              </li>
            </ul>
            To delete your account please email
            <a className="link" href="#">
              support@donorport.com
            </a>
            {/* <button
              type="button"
              className="btn btn--deactivate"
              onClick={() => deleteUser(data._id)}
            >
              Deactivate
            </button> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
