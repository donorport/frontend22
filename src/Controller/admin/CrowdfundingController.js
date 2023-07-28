import React, { useState, useEffect } from 'react';
import Index from '../../View/admin/Crowdfunding/Index';
import authApi from '../../Api/admin/auth';
import { hasPermission } from '../../Common/Helper';
import crowdfundingApi from '../../Api/admin/crowdfunding';
import { useNavigate } from 'react-router-dom';
import AddCrowdfundingForm from '../../View/admin/Crowdfunding/AddCrowdfundingForm';
import { validateAll } from 'indicative/validator';
import ToastAlert from '../../Common/ToastAlert';
import adminCampaignApi from '../../Api/admin/adminCampaign';
import {VALID_IMAGE_EXTENSIONS} from "../../constants/constants";

const SUBMIT_PROJECT_FORM_VALIDATION_RULES = {
  name: 'required',
  headline: 'required',
  //video: 'required',
  description: 'required',
  organization: 'required'
};

const SUBMIT_PROJECT_FORM_VALIDATION_MESSAGES = {
  'name.required': 'Name is required',
  'headline.required': 'Headline is required',
  'description.required': 'Description is required',
  //'video.required': 'video is required',
  'organization.required': 'organization is required'
};

function CrowdfundingController() {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [crowdfundingList, setCrowdfundingList] = useState([]);
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();
  const adminAuthToken = localStorage.getItem('adminAuthToken');
  const adminData = JSON.parse(localStorage.getItem('adminData'));
  const [tempImages, setTempImages] = useState([]);
  const [crowdfundingImages, setCrowdfundingImages] = useState([]);
  const [campaignAdminList, setCampaignAdminList] = useState([]);

  const [state, setstate] = useState({
    isInfinity: false,
    id: '',
    status: 1,
    name: '',
    headline: '',
    video: '',
    description: '',
    organization: '',
    organizationCountryId: '',
    error: [],
    images: []
  });

  const {
    id,
    status,
    name,
    headline,
    video,
    description,
    //error,
    images,
    organization,
    organizationCountryId,
    isInfinity
  } = state;

  useEffect(() => {
    (async () => {
      setLoading(false);

      if (!hasPermission(adminData.roleName, 'PROJECT')) {
        navigate('/admin/dashboard');
      }

      const verifyUser = await authApi.verifyToken(adminAuthToken);
      if (!verifyUser.data.success) {
        localStorage.clear();
        navigate('/admin/login');
      }

      const getCrowdfundingList = await crowdfundingApi.list(adminAuthToken);
      if (getCrowdfundingList.data.success) {
        setCrowdfundingList(getCrowdfundingList.data.data);
      }

      setLoading(false);
    })();
  }, [update]);

  useEffect(() => {
    (async () => {
      setLoading(false);

      const getcampaignAdminList = await adminCampaignApi.list(adminAuthToken);
      if (getcampaignAdminList.data.success) {
        setCampaignAdminList(getcampaignAdminList.data.data);
      }

      setLoading(false);
    })();
  }, []);

  const openModel = () => {
    setModal(true);
    resetForm();
  };

  const resetForm = () => {
    setCrowdfundingImages([]);
    setTempImages([]);
    setstate({
      ...state,
      id: '',
      status: 1,
      name: '',
      headline: '',
      video: '',
      description: '',
      organization: '',
      isInfinity: false,
      error: [],
      images: []
    });
  };

  const changefile = (e) => {
    let tempArry = [];
    let tempObj = [];
    let tempFileArry = [];

    if (e.target.files && e.target.files.length > 0) {
      tempObj.push(e.target.files);
      for (let i = 0; i < tempObj[0].length; i++) {
        let extension = tempObj[0][i].name.substr(tempObj[0][i].name.lastIndexOf('.') + 1);
        if (VALID_IMAGE_EXTENSIONS.includes(extension)) {
          tempFileArry.push(tempObj[0][i]);
          tempArry.push(URL.createObjectURL(tempObj[0][i]));
        }
      }
      setstate({
        ...state,
        images: tempFileArry
      });
      setTempImages(tempArry);
    }
  };

  const handleOnDiscriptionChangeValue = (e) => {
    setstate({
      ...state,
      description: e
    });
  };


  const submitCrowdfundingForm = () => {
    const formaerrror = {};

    if (!id) {
      // if (images.length <= 1) {
      //     formaerrror['images'] = "Please select more then one Image"
      // }
    }


    validateAll(
      state,
      SUBMIT_PROJECT_FORM_VALIDATION_RULES,
      SUBMIT_PROJECT_FORM_VALIDATION_MESSAGES
    )
      .then(async () => {
        setstate({
          ...state,
          error: formaerrror
        });

        let data = {};

        data.name = name;
        data.headline = headline;
        data.video = video;
        data.description = description;
        data.organizationId = organization;
        data.organizationCountryId = organizationCountryId;
        data.status = status;
        data.infinity = isInfinity;

        console.log(status);

        if (images?.length) {
          data.images = images;
        }

        if (Object.keys(formaerrror).length === 0) {
          // }

          let addCrowdfunding;

          setLoading(true);
          if (id !== '') {
            addCrowdfunding = await crowdfundingApi.update(adminAuthToken, data, id);
          } else {
            addCrowdfunding = await crowdfundingApi.add(adminAuthToken, data);
          }

          if (addCrowdfunding) {
            if (addCrowdfunding.data.success === false) {
              setLoading(false);
              ToastAlert({ msg: addCrowdfunding.data.message, msgType: 'error' });
            } else {
              if (addCrowdfunding.data.success === true) {
                resetForm();
                setModal(false);
                setLoading(false);
                setUpdate(!update);
                ToastAlert({ msg: addCrowdfunding.data.message, msgType: 'success' });
              }
            }
          } else {
            setLoading(false);
            ToastAlert({ msg: 'Crowdfunding not save', msgType: 'error' });
          }
        }
      })
      .catch((errors) => {
        setLoading(false);
        // console.log(errors)
        // const formaerrror = {};
        if (errors.length) {
          errors.forEach((element) => {
            formaerrror[element.field] = element.message;
          });
        } else {
          ToastAlert({ msg: 'Something Went Wrong', msgType: 'error' });
        }

        setstate({
          ...state,
          error: formaerrror
        });
      });
  };

  const changevalue = async (e) => {
    let value = e.target.value;
    if (e.target.name === 'organization') {
      let obj = JSON.parse(e.target.value);

      setstate({
        ...state,
        organization: obj.id,
        organizationCountryId: obj.country_id
      });

    } else {
      if (e.target.name === 'isInfinity') {
        value = e.target.checked;
      }
      console.log(value);
      setstate({
        ...state,
        [e.target.name]: value
      });
    }
  };

  const editCrowdfunding = async (crowdfundingData) => {
    // setLoading(false)
    setModal(true);
    if (crowdfundingData && crowdfundingData !== null && crowdfundingData !== '') {
      setstate({
        id: crowdfundingData._id,
        headline: crowdfundingData.headline,
        name: crowdfundingData.name,
        description: crowdfundingData.description,
        organization: crowdfundingData.organizationId,
        video: crowdfundingData.video,
        isInfinity: crowdfundingData.infinity,
        status: crowdfundingData.status
      });

      if (crowdfundingData.imageDetails.length > 0) {
        setCrowdfundingImages(crowdfundingData.imageDetails.map((img) => img.image));
      }
    }
    // setModal(false);
  };

  return (
    <>
      <Index
        crowdfundingList={crowdfundingList}
        openModel={openModel}
        editCrowdfunding={editCrowdfunding}
      />
      <AddCrowdfundingForm
        setModal={setModal}
        modal={modal}
        stateData={state}
        changefile={changefile}
        handleOnDiscriptionChangeValue={handleOnDiscriptionChangeValue}
        submitCrowdfundingForm={submitCrowdfundingForm}
        changevalue={changevalue}
        tempImages={tempImages}
        crowdfundingImages={crowdfundingImages}
        campaignAdminList={campaignAdminList}
      />
    </>
  );
}
export default CrowdfundingController;
