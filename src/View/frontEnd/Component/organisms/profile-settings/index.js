import React, { useState, useEffect, useCallback } from 'react';

import { useOutletContext, useNavigate, Link } from 'react-router-dom';
import { validateAll } from 'indicative/validator';
import { Button } from 'react-bootstrap';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector, useDispatch } from 'react-redux';
import Select from 'react-select';
import { confirmAlert } from 'react-confirm-alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';

import helper, { hasAlpha } from '../../../../../Common/Helper';
import ToastAlert from '../../../../../Common/ToastAlert';
import adminCampaignApi from '../../../../../Api/admin/adminCampaign';
import noImg from '../../../../../assets/images/noimg1.png';
import {
  setIsUpdateOrganization,
  setProfileImage,
  setLogout
} from '../../../../../user/user.action';
import locationApi from '../../../../../Api/frontEnd/location';
import categoryApi from '../../../../../Api/admin/category';

import './style.scss';
import formatUrlWithHttp from '../../../../../utils/formatUrl';
import Box from '@mui/material/Box';
import Input from '../input';
import Textarea from '../text-area';

const IMAGE_UPLOAD_WRAP_STYLES = {
  marginTop: '20px',
  position: 'relative',
  width: '100%'
};
const FILE_UPLOAD_INPUT_STYLES = {
  position: 'absolute',
  margin: 0,
  padding: 0,
  width: '100%',
  height: '100%',
  outline: 'none',
  opacity: 0,
  cursor: 'pointer'
};

const VALID_GALLARY_IMAGE_EXTENSIONS = ['jpg', 'png', 'jpeg', 'gif'];
const VALID_MAIN_IMAGE_FILE_EXTENSIONS = ['jpg', 'png', 'jpeg', 'svg'];

const UPDATE_PROFILE_VALIDATION_RULES = {
  name: 'required',
  headline: 'required',
  // mission: 'required',
  //promoVideo: "required",
  //city: 'required',
  stateId: 'required',
  country: 'required',
  category: 'required',
  ein: 'required'
};

const UPDATE_PROFILE_VALIDATION_MESSAGES = {
  'name.required': 'Organization Name is Required.',
  'headline.required': 'Headline is Required.',
  'mission.required': 'Mission is Required.',
  'promoVideo.required': 'Promo Video is Required.',
  'ein.required': 'Charity Registration Number is Required.',
  'stateId.required': 'State is Required.',
  'city.required': 'City is Required.',
  'country.required': 'Country is Required.',
  'category.required': 'Category is Required.'
};

const ProfileSettings = () => {
  let timeoutId;
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [data, setData] = useOutletContext();
  const [loading, setLoading] = useState(false);
  const [embedlink, setEmbedlink] = useState('');
  const [tempImg, setTempImg] = useState('');
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
  const [loadingId, setLoadingId] = useState(false);

  const [defaultCountry, setDefaultCountry] = useState([]);
  const [defaultState, setDefaultState] = useState([]);
  const [defaultCity, setDefaultCity] = useState([]);
  const [errors, setErrors] = useState([]);
  const [defaultCategory, setDefaultCategory] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [viewGalleryImages, setViewGalleryImages] = useState([]);
  const [deletedImages, setDeletedImages] = useState([]);
  const [textAreaCount, ChangeTextAreaCount] = useState(0);
  const [state, setState] = useState({
    logo: '',
    slug: '',
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
    error: [],
    images: []
  });

  const {
    name,
    slug,
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

  const MAX_IMAGE_LENGTH = helper.MAX_IMAGE_LENGTH;

  const getCountryStateList = useCallback(
    async (countryId) => {
      let tempArray = [];
      const getCountryStateList = await locationApi.stateListByCountry(token, Number(countryId));
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
    [token]
  );

  const getStateCityList = useCallback(
    async (stateId) => {
      let tempArray = [];
      const getStateCityList = await locationApi.cityListByState(token, stateId);
      if (getStateCityList) {
        if (getStateCityList.data.success) {
          if (getStateCityList.data.data.length > 0) {
            getStateCityList.data.data.map((city) => {
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
    },
    [token]
  );

  const getCountryList = useCallback(async () => {
    let tempArray = [];

    const getCountryList = await locationApi.countryList(token);
    if (getCountryList) {
      if (getCountryList.data.success) {
        if (getCountryList.data.data.length > 0) {
          getCountryList.data.data.map((country) => {
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
  }, [token]);

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

  // const onClickCity = async (e) => {
  //   setDefaultCity(e);
  //   setState({
  //     ...state,
  //     city: e.value
  //   });
  // };

  const changefile = async (e) => {
    // let file = e.target.files[0] ? e.target.files[0] : '';
    // if (await hasAlpha(file)) {
    //   setTempImg(URL.createObjectURL(file));
    //   setState({
    //     ...state,
    //     logo: file
    //   });
    // } else {
    //   ToastAlert({
    //     msg: 'Please upload an image with transparent background',
    //     msgType: 'error'
    //   });
    //   setState({
    //     ...state,
    //     image: ''
    //   });
    //   setTempImg('');
    // }
    if (e.target.id === 'FileInput') {
      await changeMainImg(e);
      // console.log(URL.createObjectURL(file))
    }
  };

  // clear the timeout
  useEffect(() => {
    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, []);

  // used when uploading a file, saves the file to state
  const changeMainImg = async (e) => {
    const file = e.target.files[0] ? e.target.files[0] : '';
    setLoadingId(true);
    const isFileHaveAlpha = await hasAlpha(file);
    let extension = file.name.substr(file.name.lastIndexOf('.') + 1);
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      if (!VALID_MAIN_IMAGE_FILE_EXTENSIONS.includes(extension)) {
        setState({ ...state, logo: '' });
        setTempImg('');
        setLoadingId(false);
        return;
      }
      if (isFileHaveAlpha) {
        setTempImg(URL.createObjectURL(file));
        setState({ ...state, logo: file });
        setLoadingId(false);
        return;
      }
      setLoadingId(false);
      const formData = new FormData();
      formData.append('image_file', file);
      formData.append('size', 'auto');

      fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
          'X-API-Key': 'DAbtpKuv6tt8wzNJP7Qua5jy'
        },
        body: formData
      })
        .then((response) => response.blob())
        .then((result) => {
          const modifiedFile = new File([result], file.name, { type: 'image/png' });
          setTempImg(URL.createObjectURL(modifiedFile));
          setState({ ...state, logo: modifiedFile });
        })
        .catch((error) => {
          console.error('Failed to remove background:', error);
          setState({ ...state, logo: '' });
        })
        .finally(() => {
          setLoadingId(false);
        });
    }, 2500);
  };

  const changevalue = (e) => {
    let value = e.target.value;

    // for website url, make sure we have `https://` on the front
    if (e.target.name === 'url') {
      value = formatUrlWithHttp(value.toLowerCase());
    }

    setState({
      ...state,
      [e.target.name]: value
    });
    ChangeTextAreaCount(e.target.value.length);

    if (e.target.name === 'promoVideo') {
      let url = value;
      // let id = url && url.split("?v=")[1];
      // let embedUrl = url ? "https://www.youtube.com/embed/" + id : "";
      setEmbedlink(url);
    }
  };

  const getCategoryList = async () => {
    const getCategoryList = await categoryApi.listCategory();
    if (getCategoryList.data.success === true) {
      if (getCategoryList.data.data.length > 0) {
        let tempArray = [];
        getCategoryList.data.data.map((category) => {
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
    if (data.images?.length < viewGalleryImages?.length) {
      console.log('no set: ');
    } else {
      setViewGalleryImages(data.images);
    }
    setState((s) => ({
      ...s,
      images: data.images
    }));
  }, [data.images]);
  useEffect(() => {
    (async () => {
      setLoading(true);
      setState((s) => ({
        ...s,
        slug: data.slug,
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
      }));
      let urlV = data.promoVideo;
      // let id = url && url.split("?v=")[1];
      // let embedUrl = url ? "https://www.youtube.com/embed/" + id : "";
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
  }, [
    data._id,
    data.category_id,
    data.city_id,
    data.country_id,
    data.description,
    data.ein,
    data.headline,
    data.logo,
    data.name,
    data.slug,
    data.promoVideo,
    data.state_id,
    data.url,
    getCountryList,
    getCountryStateList,
    getStateCityList
  ]);

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
  }, [countryList, data.country_id, data.category_id, categoryList, stateList, data.state_id]);

  const updateProfile = () => {
    const rules = {
      name: 'required',
      // mission: 'required',
      //promoVideo: "required",
      //city: 'required',
      stateId: 'required',
      country: 'required',
      category: 'required',
      ein: 'required'
    };

    const message = {
      'name.required': 'Organization Name is required.',
      'mission.required': 'Mission is required.',
      'promoVideo.required': 'Promo Video is required.',
      'ein.required': 'Charity Registration Number is required.',
      'stateId.required': 'State is required.',
      'city.required': 'City is required.',
      'country.required': 'Country is required.',
      'category.required': 'Category is required.'
    };

    let tempGallery = [...viewGalleryImages];
    validateAll(state, UPDATE_PROFILE_VALIDATION_RULES, UPDATE_PROFILE_VALIDATION_MESSAGES)
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

        if (logo) {
          fdata.logo = logo;
        }
        if (galleryImages && galleryImages.length > 0) {
          fdata.galleryImages = galleryImages;
        }
        if (deletedImages && deletedImages.length > 0) {
          fdata.deletedImages = deletedImages;
        }

        setLoading(true);
        const addUser = await adminCampaignApi.saveCampaignDetails(token, fdata);
        if (addUser) {
          if (!addUser.data.success) {
            setLoading(false);
            ToastAlert({ msg: addUser.data.message, msgType: 'error' });
            setErrors([addUser.data.message]);
          } else {
            setUpdate(!update);
            // user.setUpdateOrg(!user.isUpdateOrg)
            dispatch(setIsUpdateOrganization(!user.isUpdateOrg));
            setErrors([]);
            if (tempImg && tempImg !== '') {
              dispatch(setProfileImage(tempImg));
            }
            setData(state);
            setLoading(false);
            setViewGalleryImages(tempGallery);
            ToastAlert({ msg: addUser.data.message, msgType: 'success' });
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
        setErrors(errors.map((error) => error.message));
      });
  };

  const deleteAccount = (id) => {
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
            const deleteUser = await adminCampaignApi.deleteCampaignAdmin(token, id);
            if (deleteUser) {
              if (!deleteUser.data.success) {
                ToastAlert({ msg: deleteUser.data.message, msgType: 'error' });
              } else {
                dispatch(setLogout());
                navigate('/signin');
                //
                ToastAlert({ msg: deleteUser.data.message, msgType: 'success' });
              }
            } else {
              ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
            }
            setLoading(false);
          }
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

  const onGalleryImagesChange = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      let mImgtempArry = [];
      let tempMainFileArry = [];
      for (let i = 0; i < files.length; i++) {
        let extension = files[i].name.substr(files[i].name.lastIndexOf('.') + 1);
        if (VALID_GALLARY_IMAGE_EXTENSIONS.includes(extension)) {
          tempMainFileArry.push(files[i]);
          mImgtempArry.push(URL.createObjectURL(files[i]));
        }
      }
      let oldG = [...galleryImages];
      let combined = oldG.concat(tempMainFileArry);
      setGalleryImages(combined);
      let showImages = [...viewGalleryImages];
      let showCombined = showImages.concat(mImgtempArry);
      setViewGalleryImages(showCombined);
    }
  };

  const removeGallaryempImages = (id, isGalleryImg) => {
    if (isGalleryImg) {
      let imgs = [...galleryImages];
      imgs.splice(id - viewGalleryImages.length, 1);
      setGalleryImages(imgs);
    }
    let viewImgs = [...viewGalleryImages];
    const image = viewImgs[id];
    if (image.image && image._id) {
      setDeletedImages((d) => [...d, image._id]);
    }
    viewImgs.splice(id, 1);
    setViewGalleryImages(viewImgs);
  };

  const change = async (e) => {
    changevalue(e);
  };

  const id1 = 'headline';
  const max90 = 90;
  const title1 = 'Headline';
  // const placeholder1 = 'Ex: Christmas Drive';

  const id2 = 'mission';
  const max120 = 120;
  const title2 = 'Mission';
  const rows = 5;
  // const placeholder2 = 'Ex: Christmas Drive';

  const id3 = 'promovideo';
  const title3 = 'YouTube URL';
  // const placeholder3 = 'YouTube URL';

  return (
    <>
      {/*<FrontLoader loading={loading} />*/}
      <div className="mb-5 mw-400">
        <h4 className="fw-bolder">About</h4>
        <div className="text-subtext mb-3">This info appears on your organization's page:</div>

        <div className="ml-3 mb-5">
          <div className="d-flex gap-2">
            <label className="filelabel col-sm-3">
              <i className="fa fa-paperclip "></i>
              <span className="title">Logo</span>
              <input
                className="FileUpload1 hidden"
                id="FileInput"
                name="booking_attachment"
                type="file"
                onChange={(e) => {
                  setLoadingId(true);
                  changefile(e);
                }}
              />
            </label>
            {tempImg !== '' || logo !== '' ? (
              <div className="d-flex justify-content-center col-sm-6 ml-3 note">
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
          {loadingId ? (
            <Box sx={{ width: '100%' }}>
              <div className="d-flex note note--info mt-3 mb-3 fs-5 gap-2">
                <CircularProgress color="secondary" size={21}></CircularProgress>
                <FontAwesomeIcon
                  icon={regular('bolt')}
                  className="text-info icon-method mr-3p fs-4"
                />
                Processing uploaded image...
              </div>
            </Box>
          ) : (
            <div className="d-flex note note--info my-3 fs-6">
              <span className="">
                Upload an image of the product with a transparent background. Accepted file formats:{' '}
                <a className="link">png, jpg, svg</a>
              </span>
            </div>
          )}
        </div>
        <div className="d-flex flex-column mb-5 pb-5 gap-3 ">
          {' '}
          <div className="input__wrap mb-3">
            <label className="input__label flex__1">
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => changevalue(e)}
                className={error && error?.name ? 'inputerror' : ''}
              />
              <span className="input__span">Organization Name</span>
            </label>
            <div className="my-2">
              <Link
                variant="link"
                className="text-light p-0 fw-normal"
                to={'/organization/' + slug}
              >
                <FontAwesomeIcon icon={regular('square-up-right')} className="me-1" /> Go to Profile
              </Link>
            </div>
          </div>
          {error && error.name && <p className="error">{error.name}</p>}
          <div className="input__wrap d-flex">
            <label className="input__label flex__1">
              <input
                type="text"
                name="ein"
                value={ein}
                onChange={(e) => changevalue(e)}
                className={error && error?.ein ? 'inputerror' : ''}
              />
              {/* <span className="input__span">Employer Identification Number (EIN)</span> */}
              <span className="input__span">Charity Registration Number</span>
            </label>
          </div>
          {error && error.ein && (
            <p className="error">{error ? (error.ein ? error.ein : '') : ''}</p>
          )}
          <div className="input__wrap d-flex">
            <label className="input__label flex__1">
              <input type="text" name="url" value={url} onChange={(e) => changevalue(e)} />
              {/* <span className="input__span">Employer Identification Number (EIN)</span> */}
              <span className="input__span">Website</span>
            </label>
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
            {/* <label className="input__label mb-2">
            <input type="text" name="headline" value={headline} onChange={(e) => changevalue(e)} />
            <span className="input__span">Headline</span>
          </label>
          <div className="helper__text fs-7 text-end text-subtext">120 characters</div> */}
            <Input
              id={id1}
              name={id1}
              value={headline}
              maxInput={max90}
              maxLength={max90}
              title={title1}
              // placeholder={placeholder1}
              onChange={change}
              error={error}
            />
            {error && error.headline && (
              <p className="error">{error ? (error.headline ? error.headline : '') : ''}</p>
            )}
            <div className="note note--inputs mb-3 fs-6">
              A headline is the subtitle that appears on your organization's page that describes
              your cause in 120 characters or less.
            </div>
          </div>
          <div className="input__wrap mb-3">
            {/* <label className="input__label mb-2">
            <textarea
              rows="6"
              name="mission"
              value={mission}
              maxLength={250}
              onChange={(e) => changevalue(e)}
            ></textarea>
            <span className="input__span">Mission</span>
          </label>
          <div className="helper__text fs-7 text-end text-subtext">250 characters</div> */}
            <Textarea
              id={id2}
              name={id2}
              value={mission}
              maxInput={max120}
              maxLength={max120}
              rows={rows}
              title={title2}
              // placeholder={placeholder2}
              onChange={change}
              error={error}
            />
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
      </div>

      <div className="mb-5 mw-400">
        <h4 className="fw-bolder">Promo Video</h4>
        <div className="text-subtext mb-3">This video appears on your organization's page:</div>
        <div className="input__wrap mb-3">
          <Input
            id={id3}
            name={id3}
            value={promoVideo}
            title={title3}
            // placeholder={placeholder3}
            onChange={change}
            error={error}
          />
          {error && error.promoVideo && (
            <p className="error">{error ? (error.promoVideo ? error.promoVideo : '') : ''}</p>
          )}
        </div>

        {embedlink && (
          <div className="project-video-wrap mb-1">
            <iframe
              title="post-video"
              width="498"
              height="280"
              src={embedlink.replace(/\/wa.*=/g, '/embed/')}
            ></iframe>
          </div>
        )}

        <div>
          <div className="project-title-optional">
            <h4 className="form__label mt-4">Gallery</h4>
          </div>
          <div className="d-flex align-items-center flex-wrap gap-2">
            {viewGalleryImages?.length >= MAX_IMAGE_LENGTH ? (
              <p className="image-upload-wrap mb-3 fs-5">Maximum Images Allowed (5) Reached</p>
            ) : (
              <div
                className="image-upload-wrap fs-2"
                style={{
                  ...IMAGE_UPLOAD_WRAP_STYLES,
                  // backgroundColor: '#e5f4ff',
                  borderRadius: '9px',
                  border: '2px dashed rgba(62, 170, 255, 0.58)',
                  fontSize: '60px'
                }}
              >
                <input
                  className="file-upload-input"
                  type="file"
                  name="moreImg[]"
                  id="moreImg"
                  accept=".jpg,.gif,.png"
                  multiple
                  onChange={onGalleryImagesChange}
                  style={FILE_UPLOAD_INPUT_STYLES}
                />
                <div className="drag-text" style={{ textAlign: 'center', padding: '70px' }}>
                  <FontAwesomeIcon icon={solid('cloud-arrow-up')} className="icon-cloud" />
                  <h3 style={{ fontSize: 'inherit' }}>Drag and drop or Select File</h3>
                </div>
              </div>
            )}
            <div className="grid w-100">
              {viewGalleryImages?.length ? (
                viewGalleryImages.map((img, key) => {
                  return (
                    <div key={key} className="d-flex img-wrap">
                      <span
                        className="close"
                        onClick={() => {
                          if (img._id) {
                            removeGallaryempImages(key);
                          } else {
                            removeGallaryempImages(key, true);
                          }
                        }}
                      >
                        &times;
                      </span>
                      {img._id && img.image ? (
                        // <div
                        //   className="gallery__img"
                        //   style={{
                        //     backgroundImage: `url(${
                        //       img.image ? helper.CampaignAdminGalleryFullPath + img.image : noImg
                        //     })`,
                        //     width: '100px',
                        //     height: '100px'
                        //   }}
                        //   alt="lks"
                        // ></div>
                        // <img src={helper.CampaignAdminGalleryFullPath + img.image} alt="gallery" />

                        <div
                          className="gallery__img"
                          style={{
                            backgroundImage: `url(${
                              helper.CampaignAdminGalleryFullPath + img.image
                            })`
                            // width: '100px',
                            // height: '100px'
                          }}
                          alt="gallery"
                        ></div>
                      ) : (
                        <div
                          className="gallery__img"
                          style={{
                            backgroundImage: `url(${img ? img : noImg})`
                            // width: '100px',
                            // height: '100px'
                          }}
                          alt="lk"
                        ></div>
                      )}
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>

        <Button
          variant="info"
          className="mt-3 mb-3"
          onClick={() => !loading && updateProfile()}
          style={{
            opacity: loading ? '0.7' : '1'
          }}
          disabled={MAX_IMAGE_LENGTH < viewGalleryImages?.length}
        >
          Save Details {loading && <CircularProgress className="ms-2" color="inherit" size={12} />}
        </Button>
        {errors.length > 0 && (
          <div className="p-5 text-danger" style={{ backgroundColor: '#ffe9e9' }}>
            <div className="mt-2 d-flex">
              <FontAwesomeIcon
                icon={regular('circle-exclamation')}
                className="text-danger icon-method me-1 fs-4"
              />
              <p className="fs-5 fw-semibold border-bottom pb-3">
                Please fill out the required fields to save:
              </p>
            </div>

            <ol className="fs-5 d-flex gap-1 flex-column list-group list-group-numbered">
              {errors.map((error, index) => (
                <li key={index}>
                  <span>{error}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        <div className="fw-bolder my-3">Account Deactivation</div>
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
            onClick={() => !loading && deleteAccount(data._id)}
            style={{
              opacity: loading ? '0.7' : '1'
            }}
          >
            Deactivate {loading && <CircularProgress className="ms-2" color="inherit" size={12} />}
          </button> */}
        </div>
      </div>
    </>
  );
};

export default ProfileSettings;
