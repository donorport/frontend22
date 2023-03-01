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
import noImg from '../../../../../assets/images/noimg.jpg';
import {
  setIsUpdateOrganization,
  setProfileImage,
  setLogout
} from '../../../../../user/user.action';
import locationApi from '../../../../../Api/frontEnd/location';
import categoryApi from '../../../../../Api/admin/category';

import './style.scss';

const imageuploadwrap = {
  marginTop: '20px',
  position: 'relative',
  width: '100%'
};
const fileuploadinput = {
  position: 'absolute',
  margin: 0,
  padding: 0,
  width: '100%',
  height: '100%',
  outline: 'none',
  opacity: 0,
  cursor: 'pointer'
};

const validExtensions = ['jpg', 'png', 'jpeg', 'gif'];

const ProfileSettings = () => {
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

  const [defaultCountry, setDefaultCountry] = useState([]);
  const [defaultState, setDefaultState] = useState([]);
  const [defaultCity, setDefaultCity] = useState([]);

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
      setState({
        ...state,
        image: ''
      });
      setTempImg('');
    }
  };

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
        url: data.url,
        images: data.images
      }));
      setViewGalleryImages(data.images);
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
    data.images,
    getCountryList,
    getCountryStateList,
    getStateCityList,
    user.isUpdateOrg
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
        if (validExtensions.includes(extension)) {
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

  const removeGallaryempImages = (id) => {
    let imgs = [...galleryImages];
    imgs.splice(id, 1);
    setGalleryImages(imgs);
    let viewImgs = [...viewGalleryImages];
    const image = viewImgs[id];
    if (image.image && image._id) {
      setDeletedImages((d) => [...d, image._id]);
    }
    viewImgs.splice(id, 1);
    setViewGalleryImages(viewImgs);
  };

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
          <Link variant="link" className="text-light p-0 fw-normal" to={'/organization/' + slug}>
            <FontAwesomeIcon icon={regular('square-up-right')} className="me-1" /> Go to Profile
          </Link>
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
        <h4 className="fw-bolder">Promo Video</h4>
        <div className="text-subtext mb-3">This video appears on your organization's page:</div>
        <div className="input__wrap mb-3">
          <label className="input__label">
            <input
              className="input__text"
              type="text"
              name="promoVideo"
              onChange={(e) => changevalue(e)}
              placeholder="YouTube URL"
              value={promoVideo}
            />
          </label>
          {error && error.promoVideo && <p className="error">{error.promoVideo}</p>}
        </div>
        {embedlink && (
          <div className="project-video-wrap">
            <iframe
              title="post-video"
              width="498"
              height="280"
              src={embedlink.replace(/\/wa.*=/g, '/embed/')}
            ></iframe>
          </div>
        )}

        <div>
          <div className="project-tilte-optional">
            <div className="form__label">Gallery</div>
          </div>
          <div className="d-flex align-items-center flex-wrap gap-2 mb-3">
            <div
              className="image-upload-wrap mb-3 fs-2"
              style={{
                ...imageuploadwrap,
                backgroundColor: '#e5f4ff',
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
                style={fileuploadinput}
              />
              <div className="drag-text" style={{ textAlign: 'center', padding: '70px' }}>
                <FontAwesomeIcon icon={solid('cloud-arrow-up')} className="icon-cloud" />
              </div>
            </div>
            <div className="grid mt-3 mb-3" style={{ display: 'contents' }}>
              {viewGalleryImages?.length ? (
                viewGalleryImages.map((img, key) => (
                  <div key={key} className="img-wrap">
                    <span className="close" onClick={() => removeGallaryempImages(key)}>
                      &times;
                    </span>
                    {img._id && img.image ? (
                      <div
                        className="gallery__img"
                        style={{
                          backgroundImage: `url(${
                            img.image ? helper.CampaignAdminGalleryFullPath + img.image : noImg
                          })`,
                          width: '100px',
                          height: '100px'
                        }}
                        alt="lk"
                      ></div>
                    ) : (
                      <div
                        className="gallery__img"
                        style={{
                          backgroundImage: `url(${img ? img : noImg})`,
                          width: '100px',
                          height: '100px'
                        }}
                        alt="lk"
                      ></div>
                    )}
                  </div>
                ))
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
        >
          Save Details {loading && <CircularProgress className="ms-2" color="inherit" size={12} />}
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
          <button
            type="button"
            className="btn btn--deactivate"
            onClick={() => !loading && deleteAccount(data._id)}
            style={{
              opacity: loading ? '0.7' : '1'
            }}
          >
            Deactivate {loading && <CircularProgress className="ms-2" color="inherit" size={12} />}
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfileSettings;
