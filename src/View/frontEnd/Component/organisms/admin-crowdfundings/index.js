import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import LadderMenuItems from '../ladder-menu-items';
import CrowdfundingsTable from '../crowdfundings-table';
import AddCrowdfunding from '../add-crowdfunding';
import { validateAll } from 'indicative/validator';
import ToastAlert from '../../../../../Common/ToastAlert';
import { confirmAlert } from 'react-confirm-alert';
import crowdfundingApi from '../../../../../Api/admin/crowdfunding';
// import { Outlet, useOutletContext } from 'react-router-dom';
import { Link, useOutletContext } from 'react-router-dom';
import helper from '../../../../../Common/Helper';
import './style.scss';

const VALID_IMAGE_EXTENSIONS = ['jpg', 'png', 'jpeg'];

const AdminCrowdfundings = () => {
  const [data, setData] = useOutletContext();
  const userAuthToken = localStorage.getItem('userAuthToken');
  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  const tempCampaignAdminAuthToken = localStorage.getItem('tempCampaignAdminAuthToken');
  const type = localStorage.getItem('type');
  const token = type
    ? type === 'temp'
      ? tempCampaignAdminAuthToken
      : CampaignAdminAuthToken
    : CampaignAdminAuthToken;

  const [isCreateCrowdfunding, setIsCreateCrowdfunding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tempImages, setTempImages] = useState([]);
  const [crowdfundingImages, setCrowdfundingImages] = useState([]);
  const [crowdfundingList, setCrowdfundingList] = useState([]);
  const [update, setUpdate] = useState(false);
  const [state, setstate] = useState({
    id: '',
    status: '',
    name: '',
    headline: '',
    video: '',
    description: '',
    infinite: false,
    goal: '',
    error: [],
    images: []
  });

  const { id, name, headline, goal, video, description, images, infinite } = state;
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecord, setTotalRecord] = useState(0);
  const [listBy, setListBy] = useState('Show All');

  const [sortField, setSortField] = useState('created_at');
  const [order, setOrder] = useState('asc');

  const getCrowdfundingList = async (page, field, type, filterBy) => {
    let formData = {};
    formData.organizationId = data._id;
    formData.pageNo = page;
    formData.sortField = field;
    formData.sortType = type;
    formData.filter = true;
    formData.type = 'crowdfunding';
    formData.filterBy = filterBy;

    // TODO: This will eventually return the list of DONATIONS related to this crowdfunding
    const getCrowdfundingList = await crowdfundingApi.listByOrganization(token, formData);
    if (getCrowdfundingList.data.success) {
      // console.log(getCrowdfundingList.data.data)
      setCrowdfundingList(getCrowdfundingList.data.data);
      setTotalPages(getCrowdfundingList.data.totalPages);
      setTotalRecord(getCrowdfundingList.data.totalRecord);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getCrowdfundingList(pageNo, sortField, order, listBy);
      setLoading(false);
    })();
  }, [data._id, update]);

  const resetForm = () => {
    setCrowdfundingImages([]);
    setTempImages([]);
    setstate({
      id: '',
      status: '-1',
      name: '',
      headline: '',
      video: '',
      description: '',
      infinite: false,
      goal: '',
      error: [],
      images: []
    });
  };
  // redux get the user
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const openModel = () => {
    // Check if the user has added their bank account
    if (!user.isAccountAdded) {
      let path = '/campaign/' + data.slug + '/settings/payments';
      navigate(path);
      ToastAlert({
        msg: 'You need to add a Bank Account before creating a new crowdfunding campaign.',
        msgType: 'error'
      });
      return;
    }

    // Check if the tax rate is set
    if (!data.taxRate) {
      ToastAlert({
        msg: 'Please set the tax rate before creating a new crowdfunding campaign.',
        msgType: 'error'
      });
      return;
    }

    // If both checks pass, proceed to open the model for creating a new crowdfunding campaign
    setIsCreateCrowdfunding(true);
    resetForm();
  };

  const changefile = (e) => {
    let tempArray = [];
    let eTargetFilesArray = [];
    let tempFileArray = [];

    //
    // if (e.target.files.filter(e => e.name.substr(req.files.images.name.lastIndexOf('.') + 1).length > 0)) {
    //   console.log('wrong')
    // }

    if (!e.target.files || e?.target?.files?.length <= 0) {
      return;
    }

    eTargetFilesArray.push(e.target.files);
    for (let i = 0; i < eTargetFilesArray[0].length; i++) {
      // console.log(tempObj[0][i])
      const extension = eTargetFilesArray[0][i].name.substr(
        eTargetFilesArray[0][i].name.lastIndexOf('.') + 1
      );
      if (VALID_IMAGE_EXTENSIONS.includes(extension)) {
        // console.log(extension)
        tempFileArray.push(eTargetFilesArray[0][i]);
        tempArray.push(URL.createObjectURL(eTargetFilesArray[0][i]));
      }
    }

    let oldG = [...tempImages];
    let combine = oldG.concat(tempArray);
    setTempImages(combine);

    let finalImages = tempFileArray;

    if (images?.length) {
      finalImages = finalImages.concat([...images]);
    }

    setstate({
      ...state,
      images: tempFileArray
    });
  };

  const submitCrowdfundingForm = (s) => {
    //console.log('submitCrowdfundingForm fn');
    //window.scrollTo(0, 0);
    const formaerrror = {};
    let SUBMIT_CROWDFUNDING_FORM_RULES = {};
    if (s === 1) {
      if (!id) {
        // if (images.length <= 1) {
        //   formaerrror['images'] = "Please select more then one Image"
        // }
      }

      SUBMIT_CROWDFUNDING_FORM_RULES = {
        name: 'required',
        headline: 'required',
        // video: 'required',
        description: 'required'
      };
    }

    let checkImg = id ? crowdfundingImages?.length + images?.length : images?.length;
    if (checkImg > helper.MAX_IMAGE_LENGTH) {
      formaerrror['images'] = 'Maximum images allowed: ' + helper.MAX_IMAGE_LENGTH;
    }

    const SUBMIT_CROWDFUNDING_FORM_VALIDATION_MESSAGES = {
      'name.required': 'Name is required',
      'headline.required': 'Headline is required',
      'description.required': 'Description is required'
      //'video.required': 'video is required',
    };

    //console.log('~~ validate:', state);
    validateAll(state, SUBMIT_CROWDFUNDING_FORM_RULES, SUBMIT_CROWDFUNDING_FORM_VALIDATION_MESSAGES)
      .then(async () => {
        //console.log('~~ validated!');
        setstate({
          ...state,
          error: formaerrror
        });

        let formData = {};

        formData.name = name.trim();
        formData.headline = headline;
        formData.video = video;
        formData.description = description;
        formData.infinity = infinite;
        formData.goal = goal;
        formData.organizationId = data._id;
        formData.organizationCountryId = data.country_id;
        formData.status = s;

        if (images?.length) {
          formData.images = images;
        }

        // console.log(formData)

        if (Object.keys(formaerrror).length === 0) {
          //console.log('~~ formaerrror.length === 0')

          setLoading(true);

          let addCrowdfunding;
          if (id !== '') {
            addCrowdfunding = await crowdfundingApi.update(token, formData, id);
          } else {
            addCrowdfunding = await crowdfundingApi.add(token, formData);
          }
          //console.log('done adding/updating:', {addCrowdfunding});

          if (!addCrowdfunding) {
            //setLoading(false);
            ToastAlert({ msg: 'Crowdfunding not saved', msgType: 'error' });
            return;
          }

          if (addCrowdfunding.data.success === false) {
            //setLoading(false);
            ToastAlert({ msg: addCrowdfunding.data.message, msgType: 'error' });
            return;
          }

          if (addCrowdfunding.data.success === true) {
            resetForm();
            setIsCreateCrowdfunding(false);
            //setLoading(false);
            setUpdate(!update);
            ToastAlert({ msg: addCrowdfunding.data.message, msgType: 'success' });
            //
          }
        }
      })
      .catch((errors) => {
        console.log('~~ VALIDATION ERRORS!', { errors });
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
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const deleteCrowdfunding = (id) => {
    confirmAlert({
      title: 'Delete Crowdfunding?',
      message: 'Are you sure you want to delete this Crowdfunding?',
      buttons: [
        {
          label: 'Cancel'
        },
        {
          label: 'Delete',
          onClick: async () => {
            setLoading(true);

            if (id === '') {
              setLoading(false);
              ToastAlert({ msg: 'Crowdfunding not delete id Not found', msgType: 'error' });
              return;
            }

            const deleteCrowdfundingApiResults = await crowdfundingApi.remove(
              CampaignAdminAuthToken ? CampaignAdminAuthToken : userAuthToken,
              id
            );

            if (!deleteCrowdfundingApiResults) {
              setLoading(false);
              ToastAlert({ msg: 'Crowdfunding not delete', msgType: 'error' });
              return;
            }

            if (deleteCrowdfundingApiResults.data.success === false) {
              setLoading(false);
              ToastAlert({ msg: deleteCrowdfundingApiResults.data.message, msgType: 'error' });
              return;
            }

            if (deleteCrowdfundingApiResults.data.success === true) {
              setLoading(false);
              setUpdate(!update);
              ToastAlert({ msg: deleteCrowdfundingApiResults.data.message, msgType: 'success' });
              window.location.reload();
            }
          }
        }
      ]
    });
  };

  const changevalue = async (e) => {
    let value = e.target.value;
    if (e.target.name === 'infinite') {
      value = e.target.checked;
    }
    setstate({
      ...state,
      [e.target.name]: value
    });
  };

  const editCrowdfunding = async (crowdfundingData) => {
    // setLoading(false)
    console.log('crowdfundingData: ', crowdfundingData);
    if (crowdfundingData && crowdfundingData !== null && crowdfundingData !== '') {
      setstate({
        id: crowdfundingData._id,
        status: crowdfundingData.status,
        headline: crowdfundingData.headline,
        name: crowdfundingData.name,
        goal: crowdfundingData.goal,
        description: crowdfundingData.description,
        video: crowdfundingData.video,
        infinite: crowdfundingData.infinity
      });

      let tempImgArray = [];
      if (crowdfundingData.imageDetails.length > 0) {
        crowdfundingData.imageDetails.map((img) => {
          let tempObj = {};
          tempObj.img = img.image;
          tempObj.id = img._id;
          tempImgArray.push(tempObj);
        });
        setCrowdfundingImages(tempImgArray);
      } else {
        setCrowdfundingImages([]);
      }
      setIsCreateCrowdfunding(true);
    }
    // setModal(false);
  };

  const discardCrowdfunding = () => {
    setIsCreateCrowdfunding(false);
    resetForm();
  };

  const updateGoal = (value) => {
    setstate({
      ...state,
      goal: value
    });
  };

  const publishCrowdfunding = async (id, crowdfundingData) => {
    if (!crowdfundingData.name || !crowdfundingData.description || !crowdfundingData.headline) {
      return ToastAlert({
        msg: 'Crowdfunding published. Please fill Required information',
        msgType: 'error'
      });
    }

    setLoading(true);
    const publish = await crowdfundingApi.publish(
      CampaignAdminAuthToken ? CampaignAdminAuthToken : userAuthToken,
      id
    );

    if (!publish) {
      setLoading(false);
      return ToastAlert({ msg: 'Crowdfunding not Published', msgType: 'error' });
    }
    if (publish.data.success === false) {
      setLoading(false);
      return ToastAlert({ msg: publish.data.message, msgType: 'error' });
    }

    if (publish.data.success === true) {
      setLoading(false);
      setUpdate(!update);
      ToastAlert({ msg: publish.data.message, msgType: 'success' });
    }
  };

  const handleClick = async (e, v) => {
    setPageNo(Number(v));
    await getCrowdfundingList(Number(v), sortField, order, listBy);
  };

  const handleSortingChange = async (accessor) => {
    const sortOrder = accessor === sortField && order === 'asc' ? 'desc' : 'asc';
    setSortField(accessor);
    setOrder(sortOrder);
    await getCrowdfundingList(pageNo, accessor, sortOrder, listBy);
  };
  const removeTempImages = async (id) => {
    let imgs = [...tempImages];
    imgs.splice(id, 1);
    setTempImages(imgs);

    let fImg = [...images];
    fImg.splice(id, 1);

    setstate({
      ...state,
      images: fImg
    });
  };

  const deleteCrowdfundingImage = async (id) => {
    setLoading(true);
    const deleteImg = await crowdfundingApi.deleteImages(token, id);

    if (deleteImg.data.success) {
      let imgs = [...crowdfundingImages];
      imgs = imgs.filter((item) => item.id !== id);
      setCrowdfundingImages(imgs);
    }
    setLoading(false);
  };

  const onChangeDropDown = async (e) => {
    setListBy(e);
    await getCrowdfundingList(pageNo, sortField, order, e);
  };

  console.log({ isCreateCrowdfunding });
  return (
    <>
      {!isCreateCrowdfunding ? (
        <>
          <header className="w-100 d-sm-flex align-items-center">
            <div className="me-sm-2 flex-grow-1">
              <div className="d-flex align-items-center mb-1">
                <h1 className="d-none d-sm-flex page__title fs-3 fw-bolder mb-0">Fundraisers</h1>
                <span className="d-none d-sm-flex ml-2 ms-2">({totalRecord})</span>
              </div>
              <p className="d-none d-sm-block">
                Create a traditional crowdfunding campaign for larger items or more complex
                donations. Donors will donate toward the goal you set.
              </p>
            </div>

            <div className="d-flex align-items-center ms-sm-auto justify-content-end text-nowrap">
              <Button
                variant="info"
                size="md"
                className="me-2 fw-bold fs-6"
                onClick={() => openModel()}
              >
                Create New
              </Button>
              <LadderMenuItems listBy={listBy} onChangeDropDown={onChangeDropDown} />
            </div>
          </header>

          <CrowdfundingsTable
            crowdfundingList={crowdfundingList}
            editCrowdfunding={editCrowdfunding}
            deleteCrowdfunding={deleteCrowdfunding}
            publishCrowdfunding={publishCrowdfunding}
            handleClick={handleClick}
            loading={loading}
            totalPages={totalPages}
            totalRecord={totalRecord}
            pageNo={pageNo}
            handleSortingChange={handleSortingChange}
            order={order}
            sortField={sortField}
            data={data}
          />
        </>
      ) : (
        <AddCrowdfunding
          createCrowdfunding={setIsCreateCrowdfunding}
          stateData={state}
          changevalue={changevalue}
          tempImages={tempImages}
          crowdfundingImages={crowdfundingImages}
          changefile={changefile}
          submitCrowdfundingForm={submitCrowdfundingForm}
          discardCrowdfunding={discardCrowdfunding}
          updateGoal={updateGoal}
          slug={data.slug}
          deleteCrowdfundingImage={deleteCrowdfundingImage}
          removeTempImages={removeTempImages}
        />
      )}
    </>
  );
};

export default AdminCrowdfundings;
