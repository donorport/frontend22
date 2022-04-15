import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { Outlet, useOutletContext } from 'react-router-dom';
// import {
//   LadderMenuItems,
//   PostsTable,
//   AddPost,
// } from "@components/organisms";
import LadderMenuItems from "../ladder-menu-items";
import PostsTable from "../posts-table";
import AddPost from "../add-post";
// import productApi from "../../../../../Api/frontEnd/product";
import "./style.scss";
import FrontLoader from "../../../../../Common/FrontLoader";

import ToggleSwitch from "../../atoms/toggle-switch";
import FeedTag from "../../atoms/feed-tag";
import * as Icon from '../../atoms/category-icons';
// import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import categoryApi from '../../../../../Api/admin/category'
import projectApi from '../../../../../Api/admin/project'
import productApi from '../../../../../Api/admin/product'
import { WithContext as ReactTags } from "react-tag-input";
import noimg from "../../../../../assets/images/noimg.jpg"
import helper from "../../../../../Common/Helper";
import { validateAll } from "indicative/validator";
import ToastAlert from "../../../../../Common/ToastAlert"
import { confirmAlert } from "react-confirm-alert"

const AdminPosts = (props) => {
  const [viewPost, createPost] = useState(false);
  // const [productList, setProductList] = useState([])
  // const [projectList, setProjectList] = useState([])
  // const [loading, setLoading] = useState(false)
  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  const [data, setData] = useOutletContext();
  // const [update, setUpdate] = useState(false)


  // const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  const [loading, setLoading] = useState(false)
  const [categoryList, setCategoryList] = useState([])
  const [subcategoryList, setSubCategoryList] = useState([])
  const [campaignAdminList, setCampaignAdminList] = useState([])
  const [tempImg, setTempImg] = useState('')
  const [Img, setImg] = useState('')
  const [productList, setProductList] = useState([])
  const [iconList, setIconList] = useState([])
  const [projectList, setProjectList] = useState([])
  const [update, setUpdate] = useState(false)
  // const navigate = useNavigate();

  const [seletedProjectList, setSeletedProjectList] = useState([])


  const [moreTempImages, setMoreTempImages] = useState([])
  const [moreImages, setMoreImages] = useState([])

  const [gallaryTempImages, setGallaryTempImages] = useState([])
  const [gallaryImages, setGallaryImages] = useState([])


  const [state, setstate] = useState({
    id: '',
    status: 1,
    title: '',
    subtitle: '',
    headline: '',
    brand: '',
    category: '',
    subcategory: '',
    description: '',
    price: '',
    image: '',
    quantity: '',
    organization: '',
    slug: '',
    error: [],
    moreImg: [],
    galleryUrl: '',
    needheadline: '',
    unlimited: false,
    tax: false,
    postTag: false,
    galleryImg: [],

  })
  const {
    id, status, title, subtitle, category, subcategory, description, price, image, quantity, organization, slug, error, moreImg, galleryUrl, headline, brand, needheadline, galleryImg, unlimited, tax, postTag
  } = state;

  const [tags, setTags] = useState([]);
  let url = galleryUrl;
  let videoid = url?.split("?v=")[1];
  let embedlink = videoid ? "http://www.youtube.com/embed/" + videoid : "";

  useEffect(() => {
    (async () => {
      setLoading(true)
      const getcategoryList = await categoryApi.listCategory(CampaignAdminAuthToken);
      if (getcategoryList.data.success === true) {
        setCategoryList(getcategoryList.data.data)
      }

      const getProjectList = await projectApi.list(CampaignAdminAuthToken)
      if (getProjectList.data.success) {
        setProjectList(getProjectList.data.data)
      }
      setLoading(false)

    })()
  }, [])

  const handleDelete = (i) => {
    setTags(tags.filter((tag, index) => index !== i));
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag, currPos, newPos) => {
    const newTags = [...tags].slice();

    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);

    setTags(newTags);
  };

  const handleTagClick = (index) => {
    console.log("The tag at index " + index + " was clicked");
  };

  const onClearAll = () => {
    setTags([]);
  };

  const onTagUpdate = (i, newTag) => {
    const updatedTags = tags.slice();
    updatedTags.splice(i, 1, newTag);
    setTags(updatedTags);
  };

  const onSelectProject = (e) => {

    if (e.target.checked) {
      setSeletedProjectList([...seletedProjectList, e.target.id])
    } else {

      let tempArry = [...seletedProjectList]
      const index = tempArry.indexOf(e.target.id);
      if (index > -1) {
        tempArry.splice(index, 1);
      }
      setSeletedProjectList(tempArry)

    }


  }

  const changevalue = async (e) => {
    let value = e.target.value;
    // console.log(value)
    if (e.target.name === 'unlimited' || e.target.name === 'tax' || e.target.name === 'postTag') {
      value = e.target.checked
      // console.log(value)
    }
    if (e.target.name === 'price' || e.target.name === 'quantity') {
      value = e.target.value.replace(/[^\d.]|\.(?=.*\.)/g, "");
    }

    if (e.target.name === "category") {

      //get subCategory List on Category Change

      const getsubCategoryList = await categoryApi.listSubCategory(CampaignAdminAuthToken, value);
      if (getsubCategoryList.data.success === true) {
        setSubCategoryList(getsubCategoryList.data.data)
      }

      setstate({
        ...state,
        [e.target.name]: value
      })

    } else if (e.target.name === "headline") {
      if (id === "") {
        let productNameVar = value.toLowerCase();
        productNameVar = productNameVar.replace(/\s+/g, '-');
        setstate({
          ...state,
          slug: productNameVar,
          [e.target.name]: value
        })
      } else {
        setstate({
          ...state,
          [e.target.name]: value
        })
      }
    } else if (e.target.name === "slug") {
      if (id === "") {
        let productNameVar = value.toLowerCase();
        productNameVar = productNameVar.replace(/\s+/g, '-');
        setstate({
          ...state,
          slug: productNameVar,
        })
      }

    } else {
      setstate({
        ...state,
        [e.target.name]: value
      })
    }

  }

  const changefile = (e) => {
    // console.log('kkk')
    if (e.target.id === 'mainImg') {
      let file = e.target.files[0] ? e.target.files[0] : '';
      setTempImg(URL.createObjectURL(file))
      // console.log(URL.createObjectURL(file))
      setstate({
        ...state,
        image: file
      })
    } else if (e.target.id === 'galleryImg') {

      let gImgtempArry = []
      let gImgtempObj = []

      if (e.target.files && e.target.files.length > 0) {
        gImgtempObj.push(e.target.files)
        for (let i = 0; i < gImgtempObj[0].length; i++) {
          gImgtempArry.push(URL.createObjectURL(gImgtempObj[0][i]))
        }
        setGallaryTempImages(gImgtempArry)

      }

      setstate({
        ...state,
        galleryImg: e.target.files
      })

    } else {

      let mImgtempArry = []
      let mImgtempObj = []

      if (e.target.files && e.target.files.length > 0) {
        mImgtempObj.push(e.target.files)
        for (let i = 0; i < mImgtempObj[0].length; i++) {
          mImgtempArry.push(URL.createObjectURL(mImgtempObj[0][i]))
        }
        setMoreTempImages(mImgtempArry)

      }
      setstate({
        ...state,
        moreImg: e.target.files
      })
    }

  }
  const resetForm = (e) => {
    // setModal(false);
    setTags([])
    setTempImg('')

    setMoreTempImages([])
    setMoreImages([])
    setGallaryTempImages([])
    setGallaryImages([])

    setstate({
      id: '',
      status: 1,
      title: '',
      sub_title: '',
      category_id: '',
      subcategory_id: '',
      description: '',
      price: '',
      image: '',
      quantity: '',
      slug: '',
      unlimited: false,
      tax: false,
      postTag: false,
      error: [],
    });

  }

  const submitProductForm = (s) => {
    // console.log(tags)
    const formaerrror = {}
    if (tags.length === 0) {
      formaerrror['tags'] = "Please Enter Tags"
    }
    if (!id) {

      if (moreImg?.length > 0 && moreImg.length <= 1) {
        formaerrror['moreImg'] = "Please select more then one image"
      }
      if (!galleryImg?.length) {
        formaerrror['galleryImg'] = "Please select more then one image"
      }
      if (galleryImg?.length <= 1) {
        formaerrror['galleryImg'] = "Please select more then one image"
      }

    }

    let rules;
    if (id) {
      rules = {
        brand: 'required',
        needheadline: 'required',
        galleryUrl: 'required',
        status: 'required',
        headline: 'required',
        category: 'required',
        subcategory: 'required',
        description: 'required',
        price: 'required',
        quantity: 'required',
        organization: 'required',
        // slug: 'required'
      }
    } else {
      rules = {
        brand: 'required',
        needheadline: 'required',
        galleryUrl: 'required',
        status: 'required',
        headline: 'required',
        category: 'required',
        subcategory: 'required',
        description: 'required',
        price: 'required',
        image: 'required',
        quantity: 'required',
        slug: 'required'
      }

    }

    const message = {
      'status.required': 'Status is Required',
      'needheadline.required': 'Need Headline is Required',
      'galleryUrl.required': 'gallery Url is Required',

      'brand.required': 'Brand is Required',
      'headline.required': 'Headline is Required',
      'category.required': 'Category is Required',
      'subcategory.required': 'Subcategory is Required',
      'description.required': 'Description is Required',
      'price.required': 'Price is Required',
      'image.required': 'image is Required',
      'quantity.required': 'Quantity is Required',
      'organization.required': 'Organization is Required',
      'slug.required': 'Slug is Required',


    }

    validateAll(state, rules, message).then(async () => {
      // const formaerrror = {};
      setstate({
        ...state,
        error: formaerrror
      })

      let formData = {}

      // data.title = title
      // data.subtitle = subtitle
      formData.status = s

      formData.brand = brand
      formData.needheadline = needheadline
      formData.galleryUrl = galleryUrl
      formData.headline = headline
      formData.unlimited = unlimited
      formData.tax = tax
      formData.postTag = postTag


      if (image) {
        formData.image = image
      }

      formData.organizationId = data._id

      if (!id && id === '') {
        formData.productSlug = slug

      }
      let tagsArray = []
      if (tags.length > 0) {
        tags.map((ptage, i) => {
          tagsArray.push(ptage.id)
        })
      }

      if (moreImg?.length > 0) {
        formData.moreImg = moreImg
      }
      if (galleryImg?.length > 0) {
        formData.galleryImg = galleryImg
      }
      if (seletedProjectList?.length > 0) {
        formData.prjects = seletedProjectList

      }




      formData.price = price
      formData.description = description
      formData.category_id = category
      formData.subcategory_id = subcategory
      formData.quantity = quantity
      formData.tags = tagsArray

      if (Object.keys(formaerrror).length === 0) {

        // }

        let addProduct;
        // Api Call for update Profile
        setLoading(true)
        if (id !== '') {
          addProduct = await productApi.updateProduct(CampaignAdminAuthToken, formData, id)
        } else {
          addProduct = await productApi.add(CampaignAdminAuthToken, formData)
        }


        if (addProduct) {
          if (addProduct.data.success === false) {
            setLoading(false)
            ToastAlert({ msg: addProduct.data.message, msgType: 'error' });

          } else {
            if (addProduct.data.success === true) {
              resetForm()
              setLoading(false)
              setUpdate(!update)
              createPost(false)
              ToastAlert({ msg: addProduct.data.message, msgType: 'success' });
            }
          }
        } else {
          setLoading(false)
          ToastAlert({ msg: 'Product not save', msgType: 'error' });
        }
      }

    }).catch(errors => {
      setLoading(false)
      console.log(errors)
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


  // console.log(data)
  const getProductList = async () => {
    const getOrganizationProducts = await productApi.listByOrganization(CampaignAdminAuthToken, data._id);
    if (getOrganizationProducts.data.success === true) {
      setProductList(getOrganizationProducts.data.data)
    }

  }

  useEffect(() => {
    (async () => {
      setLoading(true)
      await getProductList()
      setLoading(false)

    })()
  }, [data._id, update])
  return (
    <>
      <FrontLoader loading={loading} />
      {!viewPost ? (
        <div>
          <header className="py-sm-2 mb-3 w-100 d-sm-flex align-items-center">
            <h1 className="d-none d-sm-flex page__title mb-0 fs-3 fw-bolder me-2">
              Posts
            </h1>
            <span className="d-none d-sm-flex text-light fs-5 ml-2">({productList.length})</span>

            <div className="d-flex align-items-center ms-sm-auto">
              <Button variant="info" size="lg" className="me-2 fw-bold fs-6" onClick={() => createPost(true)}>Create New</Button>
              <LadderMenuItems />
            </div>
          </header>

          <PostsTable productList={productList} />
        </div>
      ) : 
      <AddPost
        createPost={createPost}
        organizationDetails={data}
        stateData={state} 
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        handleTagClick={handleTagClick}
        onClearAll={onClearAll}
        onTagUpdate={onTagUpdate}
        onSelectProject={onSelectProject}
        changevalue={changevalue}
        changefile={changefile}
        resetForm={resetForm}
        submitProductForm={submitProductForm}
        tags={tags}
        categoryList={categoryList}
        subcategoryList={subcategoryList}
        Img={Img}
        tempImg={tempImg}
        moreTempImages={moreTempImages}
        moreImages={moreImages}
        projectList={projectList}
        seletedProjectList={seletedProjectList}
        gallaryTempImages={gallaryTempImages}
        gallaryImages={gallaryImages}

      />}
    </>
  );
};

export default AdminPosts;
