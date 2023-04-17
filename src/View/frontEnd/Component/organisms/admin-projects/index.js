import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import LadderMenuItems from '../ladder-menu-items';
import ProjectsTable from '../projects-table';
import AddProject from '../add-project';
import { validateAll } from 'indicative/validator';
import ToastAlert from '../../../../../Common/ToastAlert';
import { confirmAlert } from 'react-confirm-alert';
import projectApi from '../../../../../Api/admin/project';
import productApi from '../../../../../Api/admin/product';
// import { Outlet, useOutletContext } from 'react-router-dom';
import { Outlet, useOutletContext, Link, useLocation } from 'react-router-dom';
import helper from '../../../../../Common/Helper';
import './style.scss';

const AdminProjects = () => {
  const [data, setData] = useOutletContext();
  const userAuthToken = localStorage.getItem('userAuthToken');
  const CampaignAdminAuthToken = localStorage.getItem('');
  const type = localStorage.getItem('type');
  const tempCampaignAdminAuthToken = localStorage.getItem('tempCampaignAdminAuthToken');
  const token = type
    ? type === 'temp'
      ? tempCampaignAdminAuthToken
      : CampaignAdminAuthToken
    : CampaignAdminAuthToken;
  const location = useLocation();

  const [viewProject, createProject] = useState(false);
  const [loading, setLoading] = useState(false);
  const [productList, setProductList] = useState([]);
  const [seletedProductList, setSeletedProductList] = useState([]);
  const [hasProduct, setHasProduct] = useState([]);
  const [tempImages, setTempImages] = useState([]);
  const [projectImages, setProjectImages] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [update, setUpdate] = useState(false);
  const [state, setstate] = useState({
    id: '',
    status: '',
    name: '',
    headline: '',
    video: '',
    description: '',
    infinite: false,
    error: [],
    images: []
  });

  const { id, status, name, headline, video, description, error, images, infinite } = state;
  const validExtensions = ['jpg', 'png', 'jpeg'];
  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecord, setTotalRecord] = useState(0);
  const [listBy, setListBy] = useState('Show All');

  const [sortField, setSortField] = useState('created_at');
  const [order, setOrder] = useState('asc');

  const getProjectList = async (page, field, type, filterBy) => {
    let formData = {};
    formData.organizationId = data._id;
    formData.pageNo = page;
    formData.sortField = field;
    formData.sortType = type;
    formData.filter = true;
    formData.type = 'project';
    formData.filterBy = filterBy;

    const getProjectList = await projectApi.projectListByOrganization(token, formData);
    if (getProjectList.data.success) {
      // console.log(getProjectList.data.data)
      setProjectList(getProjectList.data.data);
      setTotalPages(getProjectList.data.totalPages);
      setTotalRecord(getProjectList.data.totalRecord);
    }
  };

  const getProductList = async () => {
    let formData = {};
    formData.organizationId = data._id;
    formData.filter = false;
    formData.sortField = 'created_at';
    formData.sortType = 'asc';
    formData.type = 'project';

    const getOrganizationProducts = await productApi.listByOrganization(token, formData);

    if (getOrganizationProducts.data.success === true) {
      let tempArray = [];
      if (getOrganizationProducts.data.data.length > 0) {
        getOrganizationProducts.data.data.map((product, i) => {
          if (product.status === 1) {
            tempArray.push(product);
          }
        });
        setProductList(tempArray);
        setHasProduct(tempArray);
        console.log(hasProduct);
      }
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getProductList();
      await getProjectList(pageNo, sortField, order, listBy);
      setLoading(false);
      // console.log(location?.state?.type)
    })();
  }, [data._id, update]);

  const resetForm = () => {
    setSeletedProductList([]);
    setProjectImages([]);
    setTempImages([]);
    setstate({
      id: '',
      status: '-1',
      name: '',
      headline: '',
      video: '',
      description: '',
      infinite: false,
      error: [],
      images: []
    });
  };

  const openModel = () => {
    createProject(true);
    resetForm();
  };

  const changefile = (e) => {
    let tempArry = [];
    let tempObj = [];
    let tempFileArry = [];

    //
    // if (e.target.files.filter(e => e.name.substr(req.files.images.name.lastIndexOf('.') + 1).length > 0)) {
    //   console.log('wrong')
    // }

    if (e.target.files && e.target.files.length > 0) {
      tempObj.push(e.target.files);
      for (let i = 0; i < tempObj[0].length; i++) {
        // console.log(tempObj[0][i])
        let extension = tempObj[0][i].name.substr(tempObj[0][i].name.lastIndexOf('.') + 1);
        if (validExtensions.includes(extension)) {
          // console.log(extension)
          tempFileArry.push(tempObj[0][i]);
          tempArry.push(URL.createObjectURL(tempObj[0][i]));
        }
      }

      let oldG = [...tempImages];
      let combine = oldG.concat(tempArry);
      setTempImages(combine);

      if (images && images.length) {
        let oldMG = [...images];
        let combineMainG = oldMG?.concat(tempFileArry);

        setstate({
          ...state,
          images: combineMainG
        });
      } else {
        setstate({
          ...state,
          images: tempFileArry
        });
      }

      // setstate({
      //   ...state,
      //   images: tempFileArry
      // })
      // setTempImages(tempArry)
    }
  };

  const handleOnDiscriptionChangeValue = (e) => {
    setstate({
      ...state,
      description: e
    });
  };

  const onSelectProduct = (e) => {
    if (e.target.checked) {
      setSeletedProductList([...seletedProductList, e.target.id]);
    } else {
      let tempArry = [...seletedProductList];
      const index = tempArry.indexOf(e.target.id);

      if (index > -1) {
        tempArry.splice(index, 1);
      }
      setSeletedProductList(tempArry);
    }
  };

  const submitProjectForm = (s) => {
    //window.scrollTo(0, 0);
    const formaerrror = {};
    let rules = {};
    if (s === 1) {
      if (!id) {
        // if (images.length <= 1) {
        //   formaerrror['images'] = "Please select more then one Image"
        // }
      }

      if (seletedProductList.length === 0) {
        formaerrror['products'] = 'Please select product';
      }

      rules = {
        name: 'required',
        headline: 'required',
        // video: 'required',
        description: 'required'
      };
    }

    let checkImg = id ? projectImages?.length + images?.length : images?.length;
    if (checkImg > helper.MAX_IMAGE_LENGTH) {
      formaerrror['images'] = 'Maximum images allowed: ' + helper.MAX_IMAGE_LENGTH;
    }

    const message = {
      'name.required': 'Name is Required',
      'headline.required': 'Headline is Required',
      'description.required': 'Description is Required'
      //'video.required': 'video is Required',
    };

    validateAll(state, rules, message)
      .then(async () => {
        setstate({
          ...state,
          error: formaerrror
        });

        let formData = {};

        formData.name = name.trim();
        formData.headline = headline;
        formData.video = video;
        formData.description = description;
        formData.products = seletedProductList;
        formData.infinity = infinite;
        formData.organizationId = data._id;
        formData.organizationCountryId = data.country_id;
        formData.status = s;

        if (images?.length) {
          formData.images = images;
        }

        // console.log(formData)

        if (Object.keys(formaerrror).length === 0) {
          // }

          let addProject;

          setLoading(true);
          if (id !== '') {
            addProject = await projectApi.updateProject(token, formData, id);
          } else {
            addProject = await projectApi.add(token, formData);
          }

          if (addProject) {
            if (addProject.data.success === false) {
              setLoading(false);
              ToastAlert({ msg: addProject.data.message, msgType: 'error' });
            } else {
              if (addProject.data.success === true) {
                resetForm();
                createProject(false);
                setLoading(false);
                setUpdate(!update);
                ToastAlert({ msg: addProject.data.message, msgType: 'success' });
                //
              }
            }
          } else {
            setLoading(false);
            ToastAlert({ msg: 'Project not saved', msgType: 'error' });
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

  const deleteProject = (id) => {
    confirmAlert({
      title: 'Delete Project?',
      message: 'Are you sure you want to delete this Project?',
      buttons: [
        {
          label: 'Cancel'
        },
        {
          label: 'Delete',
          onClick: async () => {
            setLoading(true);
            if (id !== '') {
              const deleteProjectApi = await projectApi.deleteProject(
                CampaignAdminAuthToken ? CampaignAdminAuthToken : userAuthToken,
                id
              );
              if (deleteProjectApi) {
                if (deleteProjectApi.data.success === false) {
                  setLoading(false);
                  ToastAlert({ msg: deleteProjectApi.data.message, msgType: 'error' });
                } else {
                  if (deleteProjectApi.data.success === true) {
                    setLoading(false);
                    setUpdate(!update);
                    ToastAlert({ msg: deleteProjectApi.data.message, msgType: 'success' });
                  }
                }
              } else {
                setLoading(false);
                ToastAlert({ msg: 'Project not delete', msgType: 'error' });
              }
            } else {
              setLoading(false);
              ToastAlert({ msg: 'Project not delete id Not found', msgType: 'error' });
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

  const editProject = async (projectData) => {
    // setLoading(false)
    console.log('projectData: ', projectData);
    if (projectData && projectData !== null && projectData !== '') {
      setstate({
        id: projectData._id,
        status: projectData.status,
        headline: projectData.headline,
        name: projectData.name,
        description: projectData.description,
        video: projectData.video,
        infinite: projectData.infinity
      });

      let tempProductArray = [];
      // console.log(projectData.productDetails)
      if (projectData.productDetails.length > 0) {
        projectData.productDetails.map((product, i) => {
          tempProductArray.push(product.productId);
        });
        setSeletedProductList(tempProductArray);
      }

      let tempImgArray = [];
      if (projectData.imageDetails.length > 0) {
        projectData.imageDetails.map((img, i) => {
          let tempObj = {};
          tempObj.img = img.image;
          tempObj.id = img._id;
          tempImgArray.push(tempObj);
        });
        setProjectImages(tempImgArray);
      } else {
        setProjectImages([]);
      }
      createProject(true);
    }
    // setModal(false);
  };

  const discardProject = () => {
    createProject(false);
    resetForm();
  };

  const publishProject = async (id, projectData) => {
    if (
      !projectData.name ||
      !projectData.description ||
      //!projectData.video ||
      !projectData.headline ||
      projectData.productDetails.length === 0
    ) {
      ToastAlert({
        msg: 'Project not published. Please fill Required information',
        msgType: 'error'
      });
    } else {
      setLoading(true);
      const publish = await projectApi.publishProject(
        CampaignAdminAuthToken ? CampaignAdminAuthToken : userAuthToken,
        id
      );
      if (publish) {
        if (publish.data.success === false) {
          setLoading(false);
          ToastAlert({ msg: publish.data.message, msgType: 'error' });
        } else {
          if (publish.data.success === true) {
            setLoading(false);
            setUpdate(!update);
            ToastAlert({ msg: publish.data.message, msgType: 'success' });
          }
        }
      } else {
        setLoading(false);
        ToastAlert({ msg: 'Product not Published', msgType: 'error' });
      }
    }
  };

  const handleClick = async (e, v) => {
    setPageNo(Number(v));
    await getProjectList(Number(v), sortField, order, listBy);
  };

  const handleSortingChange = async (accessor) => {
    const sortOrder = accessor === sortField && order === 'asc' ? 'desc' : 'asc';
    setSortField(accessor);
    setOrder(sortOrder);
    await getProjectList(pageNo, accessor, sortOrder, listBy);
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

  const deleteProjectImage = async (id) => {
    setLoading(true);
    const deleteImg = await projectApi.deleteProjectImages(token, id);

    if (deleteImg.data.success) {
      let imgs = [...projectImages];
      imgs = imgs.filter((item) => item.id !== id);
      setProjectImages(imgs);
    }
    setLoading(false);
  };

  const onChangeDropDown = async (e) => {
    setListBy(e);
    await getProjectList(pageNo, sortField, order, e);
  };

  return (
    <>
      {/*<FrontLoader loading={loading} />*/}

      {!viewProject ? (
        <div>
          <header className="py-sm-2 mb-2 w-100 d-sm-flex align-items-center">
            <h1 className="d-none d-sm-flex page__title mb-0 fs-3 fw-bolder me-2">Projects</h1>
            <span className="d-none d-sm-flex text-light fs-5 ml-2">({totalRecord})</span>

            <div className="d-flex align-items-center ms-sm-auto justify-content-end text-nowrap">
              {hasProduct.length > 0 ? (
                <Button
                  variant="info"
                  size="lg"
                  className="me-2 fw-bold fs-6"
                  onClick={() => openModel()}
                >
                  Create New
                </Button>
              ) : null}
              <LadderMenuItems listBy={listBy} onChangeDropDown={onChangeDropDown} />
            </div>
          </header>
          {!hasProduct.length > 0 ? (
            <div className="mb-3 note fs-5 mw-100">
              In order to create a project, you'll first need to post some items.{' '}
              <Link to={'/campaign/' + data.slug + '/posts'} className="link">
                Click here
              </Link>{' '}
              to create your first item.
            </div>
          ) : null}
          <ProjectsTable
            projectList={projectList}
            editProject={editProject}
            deleteProject={deleteProject}
            publishProject={publishProject}
            handleClick={handleClick}
            totalPages={totalPages}
            totalRecord={totalRecord}
            pageNo={pageNo}
            handleSortingChange={handleSortingChange}
            order={order}
            sortField={sortField}
            data={data}
          />
        </div>
      ) : (
        <AddProject
          createProject={createProject}
          stateData={state}
          changevalue={changevalue}
          tempImages={tempImages}
          projectImages={projectImages}
          changefile={changefile}
          productList={productList}
          seletedProductList={seletedProductList}
          onSelectProduct={onSelectProduct}
          submitProjectForm={submitProjectForm}
          discardProject={discardProject}
          slug={data.slug}
          deleteProjectImage={deleteProjectImage}
          removeTempImages={removeTempImages}
        />
      )}
    </>
  );
};

export default AdminProjects;
