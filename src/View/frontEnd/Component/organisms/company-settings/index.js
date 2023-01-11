import './style.scss';
import { Outlet, Link, useLocation, useOutletContext, useNavigate } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';
import FrontLoader from '../../../../../Common/FrontLoader';
import helper, { isIframe, hasAlpha } from '../../../../../Common/Helper';
import { validateAll } from 'indicative/validator';
import ToastAlert from '../../../../../Common/ToastAlert';
import adminCampaignApi from '../../../../../Api/admin/adminCampaign';
import { Button } from 'react-bootstrap';
import CircularProgress from '@mui/material/CircularProgress';
// import { UserContext } from '../../../../../App';
import { useSelector, useDispatch } from 'react-redux';
import {
  setIsUpdateCart,
  setIsUpdateOrganization,
  setProfileImage,
  setLogout
} from '../../../../../user/user.action';
import locationApi from '../../../../../Api/frontEnd/location';
import Select from 'react-select';
import { confirmAlert } from 'react-confirm-alert';
import categoryApi from '../../../../../Api/admin/category';

const CompanySettings = () => {
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  // const user = useContext(UserContext)
  const dispatch = useDispatch();
  const [data, setData] = useOutletContext();
  const [loading, setLoading] = useState(false);
  const [embedlink, setEmbedlink] = useState('');
  const [tempImg, setTempImg] = useState('');
  // const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  const type = localStorage.getItem('type');
  const tempCampaignAdminAuthToken = localStorage.getItem('tempCampaignAdminAuthToken');
  const token = type
    ? type === 'temp'
      ? tempCampaignAdminAuthToken
      : CampaignAdminAuthToken
    : CampaignAdminAuthToken;
  const [update, setUpdate] = useState(false);

  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  const [defaultCountry, setDefaultCountry] = useState([]);
  const [defaultState, setDefaultState] = useState([]);
  const [defaultCity, setDefaultCity] = useState([]);

  const [defaultCategory, setDefaultCategory] = useState([]);
  const [categoryList, setCategoryList] = useState([]);

  const [state, setState] = useState({
    logo: '',
    name: '',
    ein: '',
    headline: '',
    mission: '',
    promoVideo: '',
    city: '',
    stateId: '',
    country: '',
    category: '',
    url: '',
    error: []
  });
  const {
    name,
    headline,
    mission,
    promoVideo,
    logo,
    city,
    stateId,
    country,
    ein,
    category,
    url,
    error
  } = state;

  const getCountryStateList = async (countryId) => {
    let tempArray = [];
    const getCountryStateList = await locationApi.stateListByCountry(token, Number(countryId));
    if (getCountryStateList) {
      if (getCountryStateList.data.success) {
        if (getCountryStateList.data.data.length > 0) {
          getCountryStateList.data.data.map((state, i) => {
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
  };

  const getStateCityList = async (stateId) => {
    let tempArray = [];
    const getStateCityList = await locationApi.cityListByState(token, stateId);
    if (getStateCityList) {
      if (getStateCityList.data.success) {
        if (getStateCityList.data.data.length > 0) {
          getStateCityList.data.data.map((city, i) => {
            let Obj = {};
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
  };

  const getCountryList = async () => {
    let tempArray = [];

    const getCountryList = await locationApi.countryList(token);
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
        } else {
          setCountryList([]);
        }
      }
    }
  };

  const onChangeCountry = async (e) => {
    setDefaultCountry(e);
    setState({
      ...state,
      country: e.value,
      stateId: '',
      city: ''
    });
    setDefaultCity([]);

    await getCountryStateList(e.value);
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

  const onClickCity = async (e) => {
    setDefaultCity(e);
    setState({
      ...state,
      city: e.value
    });
  };

  const changefile = async (e) => {
    let file = e.target.files[0] ? e.target.files[0] : '';
    if (await hasAlpha(file)) {
      setTempImg(URL.createObjectURL(file));
      setState({
        ...state,
        logo: file
      });
    } else {
      ToastAlert({
        msg: 'Please upload an image with transparent background',
        msgType: 'error'
      });
      setstate({
        ...state,
        image: ''
      });
      setTempImg('');
    }
  };
  const [textAreaCount, ChangeTextAreaCount] = useState(0);
  const changevalue = (e) => {
    let value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    });
    ChangeTextAreaCount(e.target.value.length);

    if (e.target.name === 'promoVideo') {
      let url = value;
      // let id = url && url.split("?v=")[1];
      // let embedUrl = url ? "http://www.youtube.com/embed/" + id : "";
      setEmbedlink(url);
    }
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

  useEffect(() => {
    (async () => {
      // console.log(data)
      setLoading(false);
      setState({
        ...state,
        name: data.name,
        mission: data.description,
        headline: data.headline,
        promoVideo: data.promoVideo,
        logo: data.logo,
        city: data.city_id,
        country: data.country_id,
        stateId: data.state_id,
        category: data.category_id,
        ein: data.ein,
        url: data.url
      });
      let urlV = data.promoVideo;
      // let id = url && url.split("?v=")[1];
      // let embedUrl = url ? "http://www.youtube.com/embed/" + id : "";
      setEmbedlink(urlV);

      if (data.country_id && data.country_id !== null) {
        await getCountryStateList(data.country_id);
      }
      if (data.state_id && data.state_id !== null) {
        await getStateCityList(data.state_id);
      }
      await getCountryList();
      await getCategoryList();

      setLoading(false);
    })();
  }, [data._id, user.isUpdateOrg]);

  useEffect(() => {
    if (countryList.length > 0) {
      setDefaultCountry(countryList.find((x) => x.value === data.country_id));
    }
    if (stateList.length > 0) {
      setDefaultState(stateList.find((x) => x.value === data.state_id));
    }
    /*if (cityList.length > 0) {
      setDefaultCity(cityList.find((x) => x.value === data.city_id));
    }*/

    if (categoryList.length > 0 && data.category_id) {
      setDefaultCategory(categoryList.find((x) => x.value === data.category_id));
    }
  }, [countryList, data.country_id, data.category_id, categoryList]);

  const updateProfile = () => {
    // alert('k')
    const rules = {
      name: 'required',
      mission: 'required',
      //promoVideo: "required",
      //city: 'required',
      stateId: 'required',
      country: 'required',
      category: 'required',
      ein: 'required'
    };

    const message = {
      'name.required': 'Name is Required.',
      'mission.required': 'mission is Required.',
      //'promoVideo.required': 'Promo Video is Required.',
      'ein.required': 'Ein Number is Required.',
      'stateId.required': 'State is Required.',
      //'city.required': 'City is Required.',
      'country.required': 'Country is Required.',
      'category.required': 'Category is Required.'
    };

    validateAll(state, rules, message)
      .then(async () => {
        const formaerrror = {};
        setState({
          ...state,
          error: formaerrror
        });
        let fdata = {};
        fdata.name = name;
        fdata.description = mission;
        fdata.headline = headline;
        fdata.promoVideo = promoVideo;

        fdata.city_id = city;
        fdata.state_id = stateId;
        fdata.country_id = country;
        fdata.organizationId = data._id;
        fdata.category_id = category;
        fdata.ein = ein;
        fdata.url = url ? url : '';

        // data.password = password
        if (logo) {
          fdata.logo = logo;
          // console.log(logo)
        }

        setLoading(true);
        const addUser = await adminCampaignApi.saveCampaignDetails(token, fdata);
        if (addUser) {
          if (!addUser.data.success) {
            setLoading(false);
            ToastAlert({ msg: addUser.data.message, msgType: 'error' });
          } else {
            setUpdate(!update);
            // user.setUpdateOrg(!user.isUpdateOrg)
            dispatch(setIsUpdateOrganization(!user.isUpdateOrg));
            if (tempImg && tempImg !== '') {
              dispatch(setProfileImage(tempImg));
            }
            setData(state);
            setLoading(false);
            ToastAlert({ msg: addUser.data.message, msgType: 'success' });
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

  const deleteAccount = (id) => {
    confirmAlert({
      title: 'Deactivate Account',
      message:
        "Are you sure to want to deactivate this account? If you will do this then you won't be able to do login again...",
      buttons: [
        {
          label: 'Yes',

          onClick: async () => {
            setLoading(true);
            const deleteUser = await adminCampaignApi.deleteCampaignAdmin(token, id);
            if (deleteUser) {
              if (!deleteUser.data.success) {
                setLoading(false);
                ToastAlert({ msg: deleteUser.data.message, msgType: 'error' });
              } else {
                dispatch(setLogout());
                navigate('/signin');
                //
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

  const onChangeCategory = (e) => {
    setState({
      ...state,
      category: e.value
    });
    setDefaultCategory(e);
  };
  return (
    <>
      {/* <FrontLoader loading={loading} />*/}
      <div className="mb-5 mw-400">
        <h4 className="fw-bolder">About</h4>
        <div className="text-subtext mb-3">This info appears on your organization's page:</div>

        <div className="ml-3 mb-5">
          <div className="row">
            <label className="filelabel col-sm-3">
              <i className="fa fa-paperclip "></i>
              <span className="title">Logo</span>
              <input
                className="FileUpload1"
                id="FileInput"
                name="booking_attachment"
                type="file"
                onChange={(e) => changefile(e)}
              />
            </label>
            {tempImg !== '' || logo !== '' ? (
              <div className="col-sm-6 ml-3">
                <img
                  src={tempImg ? tempImg : logo ? helper.CampaignAdminLogoPath + logo : ''}
                  alt="Donorport Logo Icon"
                  className=""
                  style={{ width: '100px' }}
                />
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>

        <div className="input__wrap mb-3">
          <label className="input__label flex__1">
            <input type="text" name="name" value={name} onChange={(e) => changevalue(e)} />
            <span className="input__span">Organization Name</span>
          </label>
          {error && error.name && <p className="error">{error.name}</p>}
        </div>

        <div className="input__wrap d-flex">
          <label className="input__label flex__1">
            <input type="text" name="ein" value={ein} onChange={(e) => changevalue(e)} />
            {/* <span className="input__span">Employer Identification Number (EIN)</span> */}
            <span className="input__span">Charity Registration Number</span>
          </label>
        </div>
        {error && error.ein && <p className="error">{error ? (error.ein ? error.ein : '') : ''}</p>}

        <div className="input__wrap d-flex">
          <label className="input__label flex__1">
            <input type="text" name="url" value={url} onChange={(e) => changevalue(e)} />
            {/* <span className="input__span">Employer Identification Number (EIN)</span> */}
            <span className="input__span">Website</span>
          </label>
        </div>

        <div className="input__wrap mb-3">
          <label className="input__label mb-2">
            <input type="text" name="headline" value={headline} onChange={(e) => changevalue(e)} />
            <span className="input__span">Headline</span>
          </label>
          <div className="helper__text fs-7 text-end text-subtext">120 chars remaining</div>
        </div>
        <div className="note note--inputs mb-3">
          A headline is the subtitle that appears on your organization's page that describes your
          cause in 120 characters or less.
        </div>

        <div className="input__wrap d-flex">
          <label className="input__label flex__1">
            {/* <input type="text" value='' /> */}
            {/* {countrySelect.current} */}
            <Select
              className="basic-single"
              classNamePrefix="select"
              value={defaultCategory}
              name="country"
              options={categoryList}
              onChange={onChangeCategory}
              components={{
                IndicatorSeparator: () => null
              }}
            />
            <span className="input__span">Category</span>
          </label>
        </div>
        {error && error.category && <p className="error">{error.category}</p>}

        <div className="input__wrap mb-3">
          <label className="input__label mb-2">
            <textarea
              rows="6"
              name="mission"
              value={mission}
              maxLength={250}
              onChange={(e) => changevalue(e)}
            ></textarea>
            <span className="input__span">Mission</span>
          </label>
          <div className="helper__text fs-7 text-end text-subtext">
            {textAreaCount}/250 characters
          </div>
          {error && error.mission && <p className="error">{error.mission}</p>}
        </div>

        <div className="input__wrap d-flex">
          <label className="input__label flex__1">
            {/* <input type="text" value='' /> */}
            {/* {countrySelect.current} */}
            <Select
              className="basic-single"
              classNamePrefix="select"
              value={defaultCountry}
              // defaultValue={countrySelect.current}
              name="country"
              options={countryList}
              onChange={onChangeCountry}
              isDisabled
              components={{
                IndicatorSeparator: () => null
              }}
            />
            <span className="input__span">Country</span>
          </label>
        </div>
        {error && error.country && <p className="error">{error.country}</p>}

        <div className="input__wrap d-flex">
          <label className="input__label flex__1">
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

        {/*   <div className="input__wrap d-flex">
          <label className="input__label flex__1">
            <Select
              className="basic-single"
              classNamePrefix="select"
              value={defaultCity}
              name="city"
              options={cityList}
              onChange={onClickCity}
              components={{
                IndicatorSeparator: () => null
              }}
            />
            <span className="input__span">City</span>
          </label>
        </div>
        {error && error.city && <p className="error">{error.city}</p>}*/}
        {/*USE THESE FOR TEXT ONLY. Getting "Something Went Wrong error" when saving*/}
        <div className="input__wrap d-flex">
          <label className="input__label flex__1">
            <input type="text" name="city" value={city} onChange={(e) => changevalue(e)} />
            <span className="input__span">City</span>
          </label>
        </div>
        {error && error.city && <p className="error">{error.city}</p>}
      </div>

      <div className="mb-5 mw-400">
        <h4 className="fw-bolder">Promo Video (Iframe)</h4>
        <div className="text-subtext mb-3">This video appears on your organization's page:</div>
        <div className="input__wrap mb-3">
          <label className="input__label">
            <input
              className="input__text"
              type="text"
              name="promoVideo"
              onChange={(e) => changevalue(e)}
              placeholder="Video URL"
              value={promoVideo}
            />
          </label>
          {error && error.promoVideo && <p className="error">{error.promoVideo}</p>}
        </div>
        {embedlink && isIframe(embedlink) && (
          <div
            className="project-video-wrap mb-4"
            dangerouslySetInnerHTML={{ __html: embedlink }}
          ></div>
        )}
        {/* <div className="post__video minh-120 border bg-lighter mb-3">
          <iframe
            title="post-video"
            width="200"
            height="200"
            src={embedlink}
          ></iframe>
        </div> */}
        <Button
          variant="info"
          className="mt-3 mb-3"
          onClick={() => !loading && updateProfile()}
          style={{
            opacity: loading ? '0.7' : '1'
          }}
        >
          Save Details {loading && <CircularProgress className="ms-2" color="inherit" size={14} />}
        </Button>
        <div className="fw-bolder mb-3">Account Deactivation</div>
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
          {/* <a href="#" className="btn btn--deactivate">
            Deactivate
          </a> */}

          <button
            className="btn btn--deactivate"
            onClick={() => !loading && deleteAccount(data._id)}
            style={{
              opacity: loading ? '0.7' : '1'
            }}
          >
            Deactivate {loading && <CircularProgress className="ms-2" color="inherit" size={14} />}
          </button>
        </div>
      </div>
    </>
  );
};

export default CompanySettings;
