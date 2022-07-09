import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import FrontLoader from "../../../../../Common/FrontLoader";
import LadderMenuItems from "../ladder-menu-items";
import ProjectsTable from "../projects-table";
import AddProject from "../add-project";
import { validateAll } from "indicative/validator";
import ToastAlert from "../../../../../Common/ToastAlert"
import { confirmAlert } from "react-confirm-alert"
import projectApi from '../../../../../Api/admin/project'
import productApi from '../../../../../Api/admin/product'
// import { Outlet, useOutletContext } from 'react-router-dom';
import { Outlet, useOutletContext, Link, useLocation } from "react-router-dom";


import "./style.scss";

const AdminProjects = () => {
  const [data, setData] = useOutletContext();
  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  const type = localStorage.getItem('type');
  const tempCampaignAdminAuthToken = localStorage.getItem('tempCampaignAdminAuthToken');
  const token = type ? type === 'temp' ? tempCampaignAdminAuthToken : CampaignAdminAuthToken : CampaignAdminAuthToken
  const location = useLocation()

  const [viewProject, createProject] = useState(false);
  const [loading, setLoading] = useState(false)
  const [productList, setProductList] = useState([])
  const [seletedProductList, setSeletedProductList] = useState([])
  const [tempImages, setTempImages] = useState([])
  const [projectImages, setProjectImages] = useState([])
  const [projectList, setProjectList] = useState([])
  const [update, setUpdate] = useState(false)
  const [state, setstate] = useState({
    id: '',
    status: 1,
    name: '',
    headline: '',
    video: '',
    description: '',
    infinite: false,
    error: [],
    images: [],
  })

  const { id, status, name, headline, video, description, error, images, infinite } = state
  const validExtensions = ['jpg', 'png', 'jpeg'];
  const [pageNo, setPageNo] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalRecord, setTotalRecord] = useState(1)


  const [sortField, setSortField] = useState("created_at");
  const [order, setOrder] = useState("asc");


  const getProjectList = async (page, field, type) => {

    let formData = {}
    formData.organizationId = data._id
    formData.pageNo = page
    formData.sortField = field
    formData.sortType = type
    formData.filter = true
    const getProjectList = await projectApi.projectListByOrganization(token, formData)
    if (getProjectList.data.success) {
      // console.log(getProjectList.data.data)
      setProjectList(getProjectList.data.data)
      setTotalPages(getProjectList.data.totalPages)
      setTotalRecord(getProjectList.data.totalRecord)
    }
  }


  const getProductList = async () => {
    let formData = {}
    formData.organizationId = data._id
    formData.filter = false
    formData.sortField = 'created_at'
    formData.sortType = 'asc'
    const getOrganizationProducts = await productApi.listByOrganization(token, formData);

    if (getOrganizationProducts.data.success === true) {
      let tempArray = []
      if (getOrganizationProducts.data.data.length > 0) {
        getOrganizationProducts.data.data.map((product, i) => {
          if (product.status === 1) {
            tempArray.push(product)
          }
        })
        setProductList(tempArray)

      }

    }
  }


  useEffect(() => {
    (async () => {
      setLoading(true)
      await getProductList()
      await getProjectList(pageNo, sortField, order)
      setLoading(false)
      // console.log(location?.state?.type)

    })()
  }, [data._id, update])


  const resetForm = () => {
    setSeletedProductList([])
    setProjectImages([])
    setTempImages([])
    setstate({
      id: '',
      status: 1,
      name: '',
      headline: '',
      video: '',
      description: '',
      infinite: false,
      error: [],
      images: [],
    });

  }


  const openModel = () => {
    createProject(true);
    resetForm()
  }

  const changefile = (e) => {

    let tempArry = []
    let tempObj = []
    let tempFileArry = []

    // 
    // if (e.target.files.filter(e => e.name.substr(req.files.images.name.lastIndexOf('.') + 1).length > 0)) {
    //   console.log('wrong')
    // }


    if (e.target.files && e.target.files.length > 0) {
      tempObj.push(e.target.files)
      for (let i = 0; i < tempObj[0].length; i++) {
        // console.log(tempObj[0][i])
        let extension = tempObj[0][i].name.substr(tempObj[0][i].name.lastIndexOf('.') + 1)
        if (validExtensions.includes(extension)) {
          // console.log(extension)
          tempFileArry.push(tempObj[0][i])
          tempArry.push(URL.createObjectURL(tempObj[0][i]))
        }
      }
      setstate({
        ...state,
        images: tempFileArry
      })
      setTempImages(tempArry)

    }


  }

  const handleOnDiscriptionChangeValue = (e) => {
    setstate({
      ...state,
      'description': e
    })
  }

  const onSelectProduct = (e) => {

    if (e.target.checked) {
      setSeletedProductList([...seletedProductList, e.target.id])
    } else {

      let tempArry = [...seletedProductList]
      const index = tempArry.indexOf(e.target.id);

      if (index > -1) {
        tempArry.splice(index, 1);
      }
      setSeletedProductList(tempArry)

    }


  }


  const submitProjectForm = (s) => {
    window.scrollTo(0, 0);
    const formaerrror = {}

    if (!id) {
      // if (images.length <= 1) {
      //   formaerrror['images'] = "Please select more then one Image"
      // }
    }

    if (seletedProductList.length === 0) {
      formaerrror['products'] = "Please select product"
    }


    const rules = {
      name: 'required',
      headline: 'required',
      video: 'required',
      description: 'required',
    }

    const message = {

      'name.required': 'Name is Required',
      'headline.required': 'Headline is Required',
      'description.required': 'Description is Required',
      'video.required': 'video is Required',
    }

    validateAll(state, rules, message).then(async () => {

      setstate({
        ...state,
        error: formaerrror
      })

      let formData = {}

      formData.name = name
      formData.headline = headline
      formData.video = video
      formData.description = description
      formData.products = seletedProductList
      formData.infinity = infinite
      formData.organizationId = data._id
      formData.organizationCountryId = data.country_id

      formData.status = s
      if (images?.length) {
        formData.images = images
      }

      // console.log(formData)



      if (Object.keys(formaerrror).length === 0) {

        // }

        let addProject;

        setLoading(true)
        if (id !== '') {
          addProject = await projectApi.updateProject(token, formData, id)
        } else {
          addProject = await projectApi.add(token, formData)
        }


        if (addProject) {
          if (addProject.data.success === false) {
            setLoading(false)
            ToastAlert({ msg: addProject.data.message, msgType: 'error' });

          } else {
            if (addProject.data.success === true) {
              resetForm()
              createProject(false)
              setLoading(false)
              setUpdate(!update)
              ToastAlert({ msg: addProject.data.message, msgType: 'success' });
              window.scrollTo(0, 0);
            }
          }
        } else {
          setLoading(false)
          ToastAlert({ msg: 'Project not save', msgType: 'error' });
        }
      }

    }).catch(errors => {
      setLoading(false)
      // console.log(errors)
      // const formaerrror = {};
      if (errors.length) {
        errors.forEach(element => {
          formaerrror[element.field] = element.message
        });
      } else {
        ToastAlert({ msg: 'Something Went Wrong', msgType: 'error' });
      }

      setstate({
        ...state,
        error: formaerrror
      })

    });



  }

  const deleteProject = (id) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to delete Project.',
      buttons: [
        {
          label: 'Yes',
          onClick: (async () => {
            setLoading(true)
            if (id !== '') {
              const deleteProjectApi = await projectApi.deleteProject(CampaignAdminAuthToken, id)
              if (deleteProjectApi) {
                if (deleteProjectApi.data.success === false) {
                  setLoading(false)
                  ToastAlert({ msg: deleteProjectApi.data.message, msgType: 'error' });
                } else {
                  if (deleteProjectApi.data.success === true) {
                    setLoading(false)
                    setUpdate(!update)
                    ToastAlert({ msg: deleteProjectApi.data.message, msgType: 'success' });
                  }
                }
              } else {
                setLoading(false)
                ToastAlert({ msg: 'Project not delete', msgType: 'error' });
              }
            } else {
              setLoading(false)
              ToastAlert({ msg: 'Project not delete id Not found', msgType: 'error' });
            }
          })
        },
        {
          label: 'No',
        }
      ]
    });
  }

  const changevalue = async (e) => {
    let value = e.target.value;
    if (e.target.name === 'infinite') {
      value = e.target.checked
    }
    setstate({
      ...state,
      [e.target.name]: value
    })

  }

  const editProject = async (projectData) => {

    // setLoading(true)
    if ((projectData) && projectData !== null && projectData !== '') {

      setstate({
        id: projectData._id,
        headline: projectData.headline,
        name: projectData.name,
        description: projectData.description,
        video: projectData.video,
        infinite: projectData.infinity,


      });

      let tempProductArray = [];
      if (projectData.productDetails.length > 0) {
        projectData.productDetails.map((product, i) => {
          tempProductArray.push(product.productId)
        })
        setSeletedProductList(tempProductArray)
      }

      let tempImgArray = []
      if (projectData.imageDetails.length > 0) {
        projectData.imageDetails.map((img, i) => {
          tempImgArray.push(img.image)
        })
        setProjectImages(tempImgArray)
      }
      createProject(true);
    }
    // setModal(false);
  }

  const discardProject = () => {
    createProject(false);
    resetForm()
  }



  const publishProject = async (id) => {
    setLoading(true)
    const publish = await projectApi.publishProject(CampaignAdminAuthToken, id)
    if (publish) {
      if (publish.data.success === false) {
        setLoading(false)
        ToastAlert({ msg: publish.data.message, msgType: 'error' });
      } else {
        if (publish.data.success === true) {
          setLoading(false)
          setUpdate(!update)
          ToastAlert({ msg: publish.data.message, msgType: 'success' });
        }
      }
    } else {
      setLoading(false)
      ToastAlert({ msg: 'Product not Published', msgType: 'error' });
    }

  }

  const handleClick = async (e, v) => {

    setPageNo(Number(v))
    await getProjectList(Number(v), sortField, order)
  }


  const handleSortingChange = async (accessor) => {

    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    await getProjectList(pageNo, accessor, sortOrder)


  };

  return (
    <>
      <FrontLoader loading={loading} />

      {!viewProject ? (
        <div>
          <header className="py-sm-2 mb-3 w-100 d-sm-flex align-items-center">
            <h1 className="d-none d-sm-flex page__title mb-0 fs-3 fw-bolder me-2">
              Projects
            </h1>
            <span className="d-none d-sm-flex text-light fs-5 ml-2">({totalRecord})</span>

            <div className="d-flex align-items-center ms-sm-auto text-nowrap">
              <Button variant="info" size="lg" className="me-2 fw-bold fs-6" onClick={() => openModel()}>Create New</Button>
              <LadderMenuItems />
            </div>
          </header>

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
          />
        </div>
      ) :
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

        />}
    </>
  );
};

export default AdminProjects;
