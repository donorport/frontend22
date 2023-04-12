import React, { useState, useEffect, useCallback } from 'react';
import { useOutletContext, Link, useNavigate } from 'react-router-dom';
import PostsTable from '../posts-table';
import AddPost from '../add-post';
import './style.scss';
import categoryApi from '../../../../../Api/admin/category';
import projectApi from '../../../../../Api/admin/project';
import productApi from '../../../../../Api/admin/product';
import noimg from '../../../../../assets/images/noimg1.png';
import helper, {
  priceWithOrganizationTax,
  priceFormat,
  hasAlpha
} from '../../../../../Common/Helper';
import { validateAll } from 'indicative/validator';
import ToastAlert from '../../../../../Common/ToastAlert';
import { confirmAlert } from 'react-confirm-alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useSelector } from 'react-redux';
import { Button, Card, Col, Row, Dropdown, Modal } from 'react-bootstrap';
import moment from 'moment';
import _ from 'lodash';
import { GalleryImg } from '../../atoms';
import pencil from '../../../../../assets/images/pencil.svg';

const VALID_IMAGE_FILE_EXTENSIONS = ['jpg', 'png', 'jpeg', 'svg'];
const DEFAULT_STATE = {
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
  displayPrice: '',
  image: '',
  quantity: '',
  organization: '',
  slug: '',
  error: [],
  moreImg: [],
  galleryUrl: '',
  needheadline: '',
  address: '',
  lat: '',
  lng: '',
  unlimited: false,
  tax: false,
  postTag: false,
  media: false,
  policy: false,
  galleryImg: []
}

const DEFAULT_FULFIL_STATE = {
  fulfilId: '',
  fulfilMoreImg: [],
  videoUrl: '',
  receiptFile: '',
  fulfilPolicy: false,
  fulfilError: []
}

const Style_FileUploadInput = {
  position: 'absolute',
  margin: 0,
  padding: 0,
  width: '100%',
  height: '100%',
  outline: 'none',
  opacity: 0,
  cursor: 'pointer'
};
const Style_ImageUploadWrap = {
  marginTop: '20px',
  // border: " 4px dashed #3773c6",
  position: 'relative',
  width: '100%'
};

const AdminPosts = () => {
  const navigate = useNavigate();
  console.log('iFrame, AdminPosts');

  const [viewPost, createPost] = useState(false);
  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  const type = localStorage.getItem('type');
  const tempCampaignAdminAuthToken = localStorage.getItem('tempCampaignAdminAuthToken');
  const token = type
    ? type === 'temp'
      ? tempCampaignAdminAuthToken
      : CampaignAdminAuthToken
    : CampaignAdminAuthToken;
  const [data] = useOutletContext();

  const [categoryList, setCategoryList] = useState([]);
  const [subcategoryList, setSubCategoryList] = useState([]);
  const [tempImg, setTempImg] = useState('');
  const [Img, setImg] = useState('');
  const [productList, setProductList] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [ogProjectList, setOGProjectList] = useState([]);
  const [removedProjects, setRemovedProjects] = useState([]);
  const [update, setUpdate] = useState(false);
  const [deletedFile, setDeletedFile] = useState(false);
  const [modelShow, setModelShow] = useState(false);
  const [seletedProjectList, setSeletedProjectList] = useState([]);

  const [moreTempImages, setMoreTempImages] = useState([]);
  const [moreImages, setMoreImages] = useState([]);

  const [gallaryTempImages, setGallaryTempImages] = useState([]);
  const [gallaryImages, setGallaryImages] = useState([]);

  const [pageNo, setPageNo] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecord, setTotalRecord] = useState(1);

  const [sortField, setSortField] = useState('created_at');
  const [order, setOrder] = useState('asc');
  const [fulfilProductDetails, setFulfilProductDetails] = useState({});
  const [showReceipt, setShowReceipt] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [primaryBankDetails, setPrimaryBankDetails] = useState({});

  // item data state
  const [state, setstate] = useState(DEFAULT_STATE);

  const {
    id,
    // status,
    // title,
    // subtitle,
    category,
    subcategory,
    description,
    price,
    image,
    quantity,
    // organization,
    slug,
    // error,
    moreImg,
    galleryUrl,
    headline,
    brand,
    needheadline,
    galleryImg,
    unlimited,
    tax,
    postTag,
    address,
    lat,
    lng,
    policy,
    media,
    displayPrice
  } = state;

  const [fulfilState, setFulfilState] = useState(DEFAULT_FULFIL_STATE);
  const [receiptImgName, setReceiptImgName] = useState('');

  const { fulfilId, fulfilMoreImg, videoUrl, receiptFile, fulfilPolicy, fulfilError } = fulfilState;

  const [fulfil, setFulfil] = useState(false);

  const [fulfilMoreTempImages, setFulfilMoreTempImages] = useState([]);
  const [fulfilmoreImages, setFulfilMoreImages] = useState([]);

  const user = useSelector((state) => state.user);

  let videoid = fulfilState.videoUrl ? fulfilState.videoUrl.split('?v=')[1] : '';

  let embedlink = videoid ? 'https://www.youtube.com/embed/' + videoid : '';

  const [tags, setTags] = useState([]);
  // let url = galleryUrl;
  // let videoid = url?.split('?v=')[1];
  // let embedlink = videoid ? 'https://www.youtube.com/embed/' + videoid : '';
  //
  const orgProjectList = useCallback(async () => {
    let formData = {};
    formData.filter = false;
    formData.sortField = 'created_at';
    formData.sortType = 'asc';
    formData.organizationId = data._id;
    formData.type = 'product';

    const getProjectList = await projectApi.projectListByOrganization(token, formData);
    if (getProjectList.data.success) {
      setProjectList(getProjectList.data.data);
      setOGProjectList(getProjectList.data.data);
    }
  }, [data._id, token]);

  useEffect(() => {
    (async () => {
      // console.log(data)
      // console.log(data.country_id)
      setLoading(true);
      const getcategoryList = await categoryApi.listCategory(token);
      if (getcategoryList.data.success === true) {
        setCategoryList(getcategoryList.data.data);
      }

      if (data._id) await orgProjectList();
      // await getPrimaryBankAccount();
      setLoading(false);
    })();
  }, [data._id]);


  // const getPrimaryBankAccount = useCallback(async () => {
  //   const acc = await adminCampaignApi.getPrimaryBankAccount(token);
  //   if (acc.data.success) {
  //     setPrimaryBankDetails(acc.data.data);
  //   }
  // }, [token]);

  useEffect(() => {
    (async () => {
      setLoading(false);
      const getcategoryList = await categoryApi.listCategory(token);
      if (getcategoryList.data.success === true) {
        setCategoryList(getcategoryList.data.data);
      }

      if (data._id) await orgProjectList();
      // await getPrimaryBankAccount();
      setLoading(false);
    })();
  }, [data._id, orgProjectList, token]);

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
    console.log('The tag at index ' + index + ' was clicked');
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
      let tempArry = [...removedProjects];
      setSeletedProjectList([...seletedProjectList, e.target.id]);
      const index = tempArry.indexOf(e.target.id);
      if (index > -1) {
        tempArry.splice(index, 1);
        setRemovedProjects([...tempArry]);
      }
    } else {
      let tempArry = [...seletedProjectList];
      let tempRemoveArry = [...removedProjects];
      const index = tempArry.indexOf(e.target.id);
      if (index > -1) {
        setRemovedProjects([...tempRemoveArry, e.target.id]);
        tempArry.splice(index, 1);
      }
      setSeletedProjectList([...tempArry]);
    }
  };

  const changevalue = async (e) => {
    let value = e.target.value;
    if (
      e.target.name === 'unlimited' ||
      e.target.name === 'tax' ||
      e.target.name === 'postTag' ||
      e.target.name === 'policy' ||
      e.target.name === 'media' ||
      e.target.name === 'fulfilPolicy'
    ) {
      value = e.target.checked;

      if (e.target.name === 'fulfilPolicy') {
        setFulfilState({
          ...fulfilState,
          fulfilPolicy: value
        });
      }
    }

    if (e.target.name === 'price' || e.target.name === 'quantity') {
      value = e.target.value.replace(/[^\d.]|\.(?=.*\.)/g, '');
    }

    if (e.target.name === 'category') {
      // get subCategory List on Category Change
      const getsubCategoryList = await categoryApi.listSubCategory(token, value);
      if (getsubCategoryList.data.success === true) {
        setSubCategoryList(getsubCategoryList.data.data);
        if (getsubCategoryList.data.data.length > 0) {
          setstate({
            ...state,
            subcategory: getsubCategoryList.data.data[0]._id,
            [e.target.name]: value
          });
        } else {
          setstate({
            ...state,
            subcategory: '',
            [e.target.name]: value
          });
        }
      } else {
        setstate({
          ...state,
          subcategory: '',
          [e.target.name]: value
        });
      }
    } else if (e.target.name === 'headline') {
      let productNameVar = value.toLowerCase();
      productNameVar = productNameVar.replace(/\s+/g, '-');
      setstate({
        ...state,
        slug: productNameVar,
        [e.target.name]: value
      });
      // if (id === "") {
      //   let productNameVar = value.toLowerCase();
      //   productNameVar = productNameVar.replace(/\s+/g, '-');
      //   setstate({
      //     ...state,
      //     slug: productNameVar,
      //     [e.target.name]: value
      //   })
      // } else {
      //   setstate({
      //     ...state,
      //     [e.target.name]: value
      //   })
      // }
    } else if (e.target.name === 'slug') {
      // if (id === "") {
      let productNameVar = value.toLowerCase();
      productNameVar = productNameVar.replace(/\s+/g, '-');
      setstate({
        ...state,
        slug: productNameVar
      });
      // }
    } else {
      if (e.target.name === 'unlimited' && value === true) {
        // console.log('first')
        setstate({
          ...state,
          quantity: '',
          [e.target.name]: value
        });
      } else if (e.target.name === 'price') {
        // console.log(priceWithOrganizationTax(Number(value), Number(data.taxRate)))

        let display = priceWithOrganizationTax(Number(value), Number(data.taxRate));
        // console.log(display)
        setstate({
          ...state,
          displayPrice: display,
          [e.target.name]: value
        });
      } else if (e.target.name === 'videoUrl') {
        console.log('iFrame, videoUrl: ', value);
        setFulfilState({
          ...fulfilState,
          videoUrl: value
        });
      } else {
        setstate({
          ...state,
          [e.target.name]: value
        });
      }
    }
  };

  // used when uploading a file, saves the file to state
  const changeMainImg = async (e) => {
    const file = e.target.files[0] ? e.target.files[0] : '';

    const isFileHaveAlpha = await hasAlpha(file);
    if (!isFileHaveAlpha) {
      ToastAlert({
        msg: 'Please upload an image with transparent background',
        msgType: 'error'
      });
      setstate({
        ...state,
        image: ''
      });
      setTempImg('');
      return;
    }

    let extension = file.name.substr(file.name.lastIndexOf('.') + 1);

    if (VALID_IMAGE_FILE_EXTENSIONS.includes(extension)) {
      setTempImg(URL.createObjectURL(file));
      setstate({...state, image: file});
    } else {
      setstate({...state, image: ''});
    }
  }

  const clearReceiptFileState = () => {
    setReceiptImgName('');

    setFulfilState(prev => ({
      ...prev,
      receiptFile: ''
    }));
  }
  const changeReceiptFile = async (e) => {
    const file = e.target.files[0] ? e.target.files[0] : '';
    if (file) {
      setReceiptImgName(file.name);
      console.log(file)
      setFulfilState({
        ...fulfilState,
        receiptFile: file
      });

    } else {
      clearReceiptFileState();
    }
  }


  const changeGalleryImg = async (e) => {
    if (!(e.target.files && e.target.files.length > 0)) {
      return;
    }

    let gImgtempArry = [];
    let gImgtempObj = [];
    let tempGallaryFileArry = [];

    gImgtempObj.push(e.target.files);
    for (let i = 0; i < gImgtempObj[0].length; i++) {
      let extension = gImgtempObj[0][i].name.substr(
        gImgtempObj[0][i].name.lastIndexOf('.') + 1
      );
      if (VALID_IMAGE_FILE_EXTENSIONS.includes(extension)) {
        tempGallaryFileArry.push(gImgtempObj[0][i]);
        gImgtempArry.push(URL.createObjectURL(gImgtempObj[0][i]));
      }
    }
    let oldG = [...gallaryTempImages];
    let combine = oldG.concat(gImgtempArry);
    setGallaryTempImages(combine);

    if (galleryImg && galleryImg.length) {
      let oldMG = [...galleryImg];
      // console.log(galleryImg)
      let combineMainG = oldMG?.concat(tempGallaryFileArry);

      setstate({
        ...state,
        galleryImg: combineMainG
      });
    } else {
      setstate({
        ...state,
        galleryImg: tempGallaryFileArry
      });
    }
  }

  const changeMoreImg = async (e) => {
    if (!(e.target.files && e.target.files.length > 0)) {
      return;
    }

    let mImgtempArry = [];
    let mImgtempObj = [];
    let tempMainFileArry = [];

    mImgtempObj.push(e.target.files);
    for (let i = 0; i < mImgtempObj[0].length; i++) {
      let extension = mImgtempObj[0][i].name.substr(
        mImgtempObj[0][i].name.lastIndexOf('.') + 1
      );
      if (VALID_IMAGE_FILE_EXTENSIONS.includes(extension)) {
        tempMainFileArry.push(mImgtempObj[0][i]);
        mImgtempArry.push(URL.createObjectURL(mImgtempObj[0][i]));
      }
    }
    let oldG = [...moreTempImages];
    let combined = oldG.concat(mImgtempArry);
    setMoreTempImages(combined);

    if (moreImg && moreImg.length) {
      let oldMG = [...moreImg];

      let combineMainG = oldMG?.concat(tempMainFileArry);

      setstate({
        ...state,
        moreImg: combineMainG
      });
    } else {
      setstate({
        ...state,
        moreImg: tempMainFileArry
      });
    }
  }

  const changeFulfilMoreImages = async (e) => {
    if (!(e.target.files && e.target.files.length > 0)) {
      return;
    }

    let fmImgtempArry = [];
    let fmImgtempObj = [];
    let ftempMainFileArry = [];

    fmImgtempObj.push(e.target.files);
    for (let i = 0; i < fmImgtempObj[0].length; i++) {
      let extension = fmImgtempObj[0][i].name.substr(
        fmImgtempObj[0][i].name.lastIndexOf('.') + 1
      );
      if (VALID_IMAGE_FILE_EXTENSIONS.includes(extension)) {
        ftempMainFileArry.push(fmImgtempObj[0][i]);
        fmImgtempArry.push(URL.createObjectURL(fmImgtempObj[0][i]));
      }
    }
    let old = [...fulfilMoreTempImages];
    let combine = old.concat(fmImgtempArry);
    setFulfilMoreTempImages(combine);

    let oldf = [...fulfilMoreImg];
    let combineMain = oldf.concat(ftempMainFileArry);

    setFulfilState({
      ...fulfilState,
      fulfilMoreImg: combineMain
    });
  }

  const changefile = async (e) => {
    // console.log('gg')
    // console.log(e.target.id)
    if (e.target.id === 'mainImg') {
      await changeMainImg(e);
      // console.log(URL.createObjectURL(file))

    } else if (e.target.id === 'receiptFile') {
      await changeReceiptFile(e);

    } else if (e.target.id === 'galleryImg') {
      await changeGalleryImg(e);

    } else if (e.target.id === 'moreImg') {
      await changeMoreImg(e);

    } else if (e.target.id === 'fulfilmoreImages') {
      await changeFulfilMoreImages(e);
    }
  };

  const resetForm = async () => {
    // setModal(false);
    setTags([]);
    setTempImg('');
    setImg('');
    setMoreTempImages([]);
    setMoreImages([]);
    setGallaryTempImages([]);
    setGallaryImages([]);
    setSeletedProjectList([]);
    setstate({
      id: '',
      status: -1,
      title: '',
      subtitle: '',
      headline: '',
      brand: '',
      category: '',
      subcategory: '',
      description: '',
      price: '',
      displayPrice: '',
      image: '',
      quantity: '',
      organization: '',
      slug: '',
      error: [],
      moreImg: [],
      galleryUrl: '',
      needheadline: '',
      address: '',
      lat: '',
      lng: '',
      unlimited: false,
      tax: false,
      postTag: false,
      media: false,
      policy: false,
      galleryImg: []
    });
  };

  // when creating a product??
  const submitProductForm = (s, seletedProjectListofIds) => {
    console.log('s');

    //window.scrollTo(0, 0);
    // console.log(tags)
    const formaerrror = {};

    if (s === 1) {
      if (tags.length === 0) {
        formaerrror['tags'] = 'Please Enter Tags';
      }

      if (!unlimited && !quantity) {
        formaerrror['quantity'] = 'Quantity is required';
      }

      if (!policy) {
        formaerrror['policy'] =
          'Please indicate that you have read and agree to the Terms and Conditions and Privacy Policy.';
      }
    }
    const MAX_IMAGE_LENGTH = helper.MAX_IMAGE_LENGTH;

    let checkImg = id ? gallaryImages?.length + galleryImg?.length : galleryImg?.length;
    if (checkImg > MAX_IMAGE_LENGTH) {
      formaerrror['galleryImg'] = 'Maximum images allowed: ' + MAX_IMAGE_LENGTH;
    }

    let checkMore = id ? moreImages?.length + moreImg?.length : moreImg?.length;
    if (checkMore > MAX_IMAGE_LENGTH) {
      formaerrror['moreImg'] = 'Maximum images allowed: ' + MAX_IMAGE_LENGTH;
    }

    // console.log(formaerrror)

    if (!id) {
      // if (moreImg?.length > 0 && moreImg.length <= 1) {
      //   formaerrror['moreImg'] = "Please select more then one image"
      // }
      // if (!galleryImg?.length) {
      //   formaerrror['galleryImg'] = "Please select more then one image"
      // }
      // if (galleryImg?.length <= 1) {
      //   formaerrror['galleryImg'] = "Please select more then one image"
      // }
    }

    let rules;
    if (s === 1) {
      if (id) {
        rules = {
          brand: 'required',
          needheadline: 'required',
          // galleryUrl: 'required',
          status: 'required',
          headline: 'required',
          category: 'required',
          subcategory: 'required',
          description: 'required',
          price: 'required',
          // quantity: 'required',
          organization: 'required',
          // policy: 'boolean',

          slug: 'required'
        };
      } else {
        rules = {
          brand: 'required',
          needheadline: 'required',
          // galleryUrl: 'required',
          status: 'required',
          headline: 'required',
          category: 'required',
          subcategory: 'required',
          description: 'required',
          price: 'required',
          image: 'required',
          // quantity: 'required',
          slug: 'required'
          // policy: 'boolean',
        };
      }
    } else {
      rules = {};
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
      'slug.required': 'Slug is Required'
    };

    validateAll(state, rules, message)
      .then(async () => {
        // const formaerrror = {};
        setstate({
          ...state,
          error: formaerrror
        });

        let formData = {};

        // data.title = title
        // data.subtitle = subtitle
        formData.status = s;
        // formData.products = seletedProjectList;

        formData.brand = brand;
        formData.needheadline = needheadline.trim();
        if (galleryUrl && galleryUrl !== '') {
          formData.galleryUrl = galleryUrl;
        }
        formData.headline = headline;
        formData.unlimited = unlimited;
        formData.media = media;

        formData.tax = tax;
        formData.postTag = postTag;

        if (image) {
          formData.image = image;
        }

        formData.organizationId = data._id;

        // if (!id && id === '') {
        formData.productSlug = slug;

        // }
        let tagsArray = [];
        if (tags.length > 0) {
          tags.map((ptage) => {
            tagsArray.push(ptage.id);
          });
        }

        if (moreImg?.length > 0) {
          formData.moreImg = moreImg;
        }
        if (galleryImg?.length > 0) {
          formData.galleryImg = galleryImg;
        }
        if (seletedProjectList?.length > 0) {
          formData.prjects = seletedProjectList;
        }

        if (address) {
          formData.address = address;
        }

        if (lat) {
          formData.lat = lat;
        }

        if (lng) {
          formData.lng = lng;
        }

        formData.organizationCountryId = data.country_id;
        formData.price = price ? Number(price) : 0;
        formData.description = description;
        formData.category_id = category;
        formData.subcategory_id = subcategory;
        formData.displayPrice = displayPrice ? priceFormat(displayPrice) : 0;

        if (quantity) {
          formData.quantity = quantity;
        }

        formData.tags = tagsArray;

        if (Object.keys(formaerrror).length !== 0) {
          setModelShow(false);
          return;
        }

        // Api Call for update Profile
        setLoading(true);
        let addProduct = (id !== '') 
          ? await productApi.updateProduct(token, formData, id) 
          : await productApi.add(token, formData);

        if (!addProduct) {
          setLoading(false);
          ToastAlert({ msg: 'Product not save', msgType: 'error' });
          return;
        }

        if (addProduct.data.success === false) {
          setLoading(false);
          ToastAlert({ msg: addProduct.data.message, msgType: 'error' });
          return;
        } 

        if (addProduct.data.success === true) {
          setLoading(false);
          resetForm();
          setUpdate(!update);
          createPost(false);
          setModelShow(false);

          const res = await projectApi.list(token);
          const dta = res.data.data;
          dta.forEach((project) => {
            let newData = { ...project };

            console.log({ project });
            console.log({ seletedProjectListofIds });
            let idx = !seletedProjectListofIds?.length
              ? -1
              : seletedProjectListofIds.indexOf(project._id);
            let removedIdx = !removedProjects.length
              ? -1
              : removedProjects.indexOf(project._id);

            if (idx !== -1 || removedIdx !== -1) {
              let deleteIds = [];
              let newProducts = removedIdx > -1 ? [] : [id];

              project.productDetails.forEach((product) => {
                console.log({ product });
                if (removedIdx > -1) {
                  if (id !== product.productId) {
                    newProducts.push(product.productId);
                  } else {
                    deleteIds.push(product.productId);
                  }
                } else {
                  newProducts.push(product.productId);
                }
              });

              newData.products = newProducts;
              projectApi.updateProject(token, newData, project._id, true);
            }
          });
          ToastAlert({ msg: addProduct.data.message, msgType: 'success' });
        }
      })
      .catch((errors) => {
        setLoading(false);
        // console.log(errors)
        // const formaerrror = {};
        if (errors.length) {
          console.log({ errors });
          errors.forEach((element) => {
            formaerrror[element.field] = element.message;
          });
        } else {
          console.log({ errors });
          ToastAlert({ msg: 'Something Went Wrong', msgType: 'error' });
        }

        setstate({
          ...state,
          error: formaerrror
        });
      });
  };

  console.log({ state });
  const deleteProduct = (id) => {
    confirmAlert({
      title: 'Delete Post?',
      message: 'Are you sure to delete this post?',
      buttons: [
        {
          label: 'Cancel'
        },
        {
          label: 'Delete',
          onClick: async () => {
            setLoading(true);
            if (id !== '') {
              const deleteProductApi = await productApi.deleteProduct(token, id);
              if (deleteProductApi) {
                if (deleteProductApi.data.success === false) {
                  setLoading(false);
                  ToastAlert({ msg: deleteProductApi.data.message, msgType: 'error' });
                } else {
                  if (deleteProductApi.data.success === true) {
                    setLoading(false);
                    setUpdate(!update);
                    createPost(false);
                    ToastAlert({ msg: deleteProductApi.data.message, msgType: 'success' });
                  }
                }
              } else {
                setLoading(false);
                ToastAlert({ msg: 'Product not delete', msgType: 'error' });
              }
            } else {
              setLoading(false);
              ToastAlert({ msg: 'Product not delete id Not found', msgType: 'error' });
            }
          }
        }
      ]
    });
  };

  // Delete Product FulFil from a product
  //  called when deleting an uploaded sales receipt
  //  This is doing something that wipes the URL
  //  it also is hiding the images..
  const deleteFulfilorder = (id, prodcutId, organizationId) => {
    console.log('Posts, deleteFulfilorder, values: ', { id, prodcutId, organizationId });
    confirmAlert({
      title: 'Delete Receipt?',
      message:
        'Are you sure you want to delete the Sales Receipt? This will remove the Fulfilled Status',
      buttons: [
        {
          label: 'Cancel'
        },
        {
          label: 'Delete',
          onClick: async () => {
            if (id === '') {
              setLoading(false);
              ToastAlert({ msg: 'Product not deleted: id Not found', msgType: 'error' });
              return;
            }

            try {
              // attempt delete
              const deleteFulfilOrderApi = await productApi.deleteFulfilOrder(
                token,
                id,
                prodcutId,
                organizationId
              );

              if (!deleteFulfilOrderApi) {
                throw new Error({msg: 'Product not deleted', msgType: 'error'});
                //setLoading(false);
                //ToastAlert({ msg: 'Product not deleted', msgType: 'error' });
                //return;
              }

              if (deleteFulfilOrderApi.data.success === false) {
                throw new Error({ msg: deleteFulfilOrderApi.data.message, msgType: 'error' });
                //setLoading(false);
                //ToastAlert({ msg: deleteFulfilOrderApi.data.message, msgType: 'error' });
                //return;
              }

              if (deleteFulfilOrderApi.data.success === true) {
                //setLoading(false);
                setUpdate(!update);
                setDeletedFile(true);
    
                closeFulfilForm();
                ToastAlert({ msg: deleteFulfilOrderApi.data.message, msgType: 'success' });
              }
            } catch(e) {
              console.log({e});
              ToastAlert(e);

            } finally {
              // remove loading state
              setLoading(false);

            }
          }
        }
      ]
    });
  };

  const editProduct = async (productData) => {
    setGallaryTempImages([]);
    setMoreTempImages([]);
    setTempImg('');
    setLoading(true);
    let formData = {};
    formData.productId = productData._id;

    const getProductDetails = await productApi.productDetailsById(token, formData);
    if (getProductDetails.data.success === true) {
      setLoading(false);

      productData = getProductDetails.data.data[0];

      // console.log(productData)

      if (productData && productData !== null && productData !== '') {
        // console.log(productData)
        //
        setstate({
          id: productData._id,
          status: productData.status,
          headline: productData.headline,
          brand: productData.brand,
          category: productData.categoryId,
          subcategory: productData.subcategoryId,
          description: productData.description,
          price: productData.price,
          quantity: productData.quantity,
          organization: productData.organizationId,
          slug: productData.slug,
          needheadline: productData.needheadline,
          galleryUrl: productData.galleryUrl,
          unlimited: productData.unlimited,
          tax: productData.tax,
          postTag: productData.postTag,
          address: productData.address ? productData.address : '',
          lat: productData.lat ? productData.lat : '',
          lng: productData.lng ? productData.lng : '',
          media: productData.media ? productData.media : false,
          displayPrice: productData.displayPrice ? productData.displayPrice : productData.price,
          policy: true
        });

        let tempProjectArray = [];
        if (productData.projectDetails.length > 0) {
          productData.projectDetails.map((project) => {
            tempProjectArray.push(project.projectId);
          });
          setSeletedProjectList(tempProjectArray);
        } else {
          setSeletedProjectList([]);
        }
        // console.log(productData.projectDetails)

        let tempMImgArray = [];

        if (productData.imageDetails.length > 0) {
          productData.imageDetails.map((img) => {
            if (img.type === 'moreImage') {
              let tempObj = {};
              tempObj.img = img.image;
              tempObj.id = img._id;
              tempMImgArray.push(tempObj);
            }
          });
          setMoreImages(tempMImgArray);
        } else {
          setMoreImages([]);
        }

        let tempGImgArray = [];

        if (productData.imageDetails.length > 0) {
          productData.imageDetails.map((img) => {
            if (img.type === 'galleryImage') {
              let tempObj = {};
              tempObj.img = img.image;
              tempObj.id = img._id;
              tempGImgArray.push(tempObj);
            }
          });
          setGallaryImages(tempGImgArray);
        } else {
          setGallaryImages([]);
        }

        let mytags = [];
        let addedTags = [];
        if (productData.tags.length > 0) {
          addedTags = productData.tags;

          addedTags.map((aadedTag) => {
            let tagsObj = {};
            tagsObj.id = aadedTag;
            tagsObj.text = aadedTag;
            mytags.push(tagsObj);
          });
          setTags(mytags);
        }
        setImg(productData.image);

        const getsubCategoryList = await categoryApi.listSubCategory(token, productData.categoryId);
        if (getsubCategoryList.data.success === true) {
          setSubCategoryList(getsubCategoryList.data.data);
        }
        createPost(true);
        setLoading(false);
      } else {
        setLoading(false);
        ToastAlert({
          msg: 'Something went wrong category data not found please try again',
          msgType: 'error'
        });
      }
    }
  };

  const createNewPost = () => {
    if (user.isAccountAdded) {
      resetForm();
      createPost(true);
    } else {
      let path = '/campaign/' + data.slug + '/settings/payments';
      navigate(path);
      ToastAlert({ msg: 'You need to add a Bank Account before posting.', msgType: 'error' });
    }
  };

  const publishProduct = async (id, data) => {
    if (
      !data ||
      !data.headline ||
      !data.categoryId ||
      !data.subcategoryId ||
      !data.slug ||
      !data.brand ||
      data.tags.length === 0 ||
      !data.needheadline ||
      (!data.unlimited && !data.quantity) ||
      !data.image ||
      !data.price === 0 ||
      !data.description
    ) {
      ToastAlert({
        msg: 'Product not Published please fill Required information',
        msgType: 'error'
      });
    } else {
      setLoading(false);

      const publish = await productApi.publishProduct(token, id, 'PUBLISH');
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
        ToastAlert({ msg: 'Product not published', msgType: 'error' });
      }
    }
  };

  const unPublishProduct = async (id) => {
    const publish = await productApi.publishProduct(token, id, 'UNPUBLISH');
    if (publish) {
      if (publish.data.success === false) {
        setLoading(false);
        ToastAlert({ msg: publish.data.message, msgType: 'error' });
      } else {
        if (publish.data.success === true) {
          setLoading(false);
          setUpdate(!update);
          setFulfil(false);
          createPost(false);
          ToastAlert({ msg: publish.data.message, msgType: 'success' });
        }
      }
    } else {
      setLoading(false);
      ToastAlert({ msg: 'Product not Published', msgType: 'error' });
    }
  };

  // console.log(data)
  const getProductList = useCallback(
    async (page, field, type) => {
      setLoading(true);
      let formData = {};
      formData.organizationId = data._id;
      formData.pageNo = page;
      formData.sortField = field;
      formData.sortType = type;
      formData.filter = true;
      formData.type = 'product';

      // console.log(data._id)
      const getOrganizationProducts = await productApi.listByOrganization(token, formData);
      if (getOrganizationProducts.data.success === false) {
        return;
      }

      if (getOrganizationProducts.data.data.length <= 0) {
        setProductList([]);
        return;
      }

      console.log('Posts, getOrganizationProducts: ', getOrganizationProducts.data.data);
      const productDetails = _.uniqBy(getOrganizationProducts.data.data, '_id');
      console.log('Posts, productDetails: ', productDetails);
      setProductList(productDetails);

      setTotalPages(getOrganizationProducts.data.totalPages);
      setTotalRecord(getOrganizationProducts.data.totalRecord);
    },
    [data._id, token]
  );

  useEffect(() => {
    console.log('Posts, productList: ', productList);
  }, [productList]);

  useEffect(() => {
    (async () => {
      // console.log(data.country_id)
      await getProductList(pageNo, sortField, order);
      // console.log(data)
    })();
  }, [data._id, getProductList, order, pageNo, sortField, update]);

  const handleClick = async (e, v) => {
    setPageNo(Number(v));
    await getProductList(Number(v), sortField, order);
  };

  const closeFulfilForm = () => {
    createPost(false);
    setFulfil(false);
    setFulfilMoreTempImages([]);

    // Commenting out this below: fixes the "delete receipt => images hiding" bug!
    //setFulfilMoreImages([]);

    setFulfilState({
      ...fulfilState,
      fulfilId: '',
      fulfilMoreImg: [],
      //videoUrl: '', // commenting this out fixes the "delete receipt => video URL gets wiped" bug!
      receiptFile: '',
      fulfilPolicy: false,
      fulfilError: []
    });
  };

  const handleSortingChange = async (accessor) => {
    const sortOrder = accessor === sortField && order === 'asc' ? 'desc' : 'asc';
    setSortField(accessor);
    setOrder(sortOrder);
    await getProductList(pageNo, accessor, sortOrder);
  };

  const deleteProductImage = async (id, type) => {
    setLoading(true);
    const deleteImg = await productApi.deleteProductImages(token, id);

    if (deleteImg.data.success) {
      if (type === 'Fulfil') {
        let imgs = [...fulfilmoreImages];
        imgs = imgs.filter((item) => item.id !== id);
        setFulfilMoreImages(imgs);
      } else {
        if (type === 'More') {
          let imgs = [...moreImages];
          imgs = imgs.filter((item) => item.id !== id);
          setMoreImages(imgs);
        } else {
          let gImg = [...gallaryImages];
          gImg = gImg.filter((item) => item.id !== id);
          setGallaryImages(gImg);
        }
      }
    }
    setLoading(false);
  };

  // ran when updating or fulfilling the order (basically the "submit" button)
  const fulfilOrder = async () => {
    let formaerrror = {};
    let rules = {};

    const MAX_IMAGE_LENGTH = helper.MAX_IMAGE_LENGTH;

    let checkMore = fulfilId
      ? fulfilmoreImages?.length + fulfilMoreImg?.length
      : fulfilMoreImg?.length;

    if (checkMore > MAX_IMAGE_LENGTH) {
      formaerrror['fulfilMoreImg'] = 'Maximum images allowed: ' + MAX_IMAGE_LENGTH;
    }

    // console.log(fulfilMoreImg)
    if (!fulfilPolicy) {
      formaerrror['fulfilPolicy'] =
        'Please indicate that you have read and agree to the Terms and Conditions and Privacy Policy.';
    }
    if (!fulfilId) {
      rules.receiptFile = 'required';
    }

    const message = {
      'receiptFile.required': 'Receipt is Required'
    };

    validateAll(fulfilState, rules, message)
      .then(async () => {
        setFulfilState({
          ...fulfilState,
          fulfilError: formaerrror
        });

        if (Object.keys(formaerrror).length > 0) {
          return;
        }

        let formData = {};

        if (fulfilMoreImg?.length > 0) {
          formData.moreImg = fulfilMoreImg;
        }
        if (receiptFile) {
          formData.image = receiptFile;
        }
        formData.organizationId = data._id;
        formData.productId = fulfilProductDetails._id;
        formData.organizationCountryId = data.country_id;

        if (videoUrl) {
          formData.video = videoUrl;
        }

        // do the update/creation
        let fulfil;
        const isThisAnUpdate = !!fulfilId;
        if (isThisAnUpdate) {
          fulfil = await productApi.updateFulfilOrder(token, formData, fulfilId);
        } else {
          fulfil = await productApi.fulfilOrder(token, formData);
        }

        if (!fulfil || !fulfil?.data?.success) {
          ToastAlert({ msg: fulfil.data.message, msgType: 'error' });
          return;
        }

        setDeletedFile(false); // used to reset the ui?
        clearReceiptFileState(); // clears fulfilState receipt and receiptImgName

        closeFulfilForm();
        setUpdate(!update);
        ToastAlert({ msg: fulfil.data.message, msgType: 'success' });
      })
      .catch((errors) => {
        if (errors.length) {
          errors.forEach((element) => {
            formaerrror[element.field] = element.message;
          });
        } else {
          ToastAlert({ msg: 'Something Went Wrong', msgType: 'error' });
        }

        setFulfilState({
          ...fulfilState,
          fulfilError: formaerrror
        });
      }).finally(() => {
        setLoading(false);
      });
  };

  const showFulfillOrder = async (data) => {
    // console.log(data)
    setFulfilProductDetails(data);
    createPost(true);
    setFulfil(true);

    setFulfilState({
      ...fulfilState,
      fulfilId: data.fulfilDetails?._id,
      // fulfilMoreImg: [],
      videoUrl: data.fulfilDetails.video,
      receiptFile: '',
      fulfilPolicy: data?.isFulfiled,
      fulfilError: []
    });
    let tempMImgArray = [];
    if (data.imageDetails.length > 0) {
      data.imageDetails.map((img) => {
        if (img.type === 'fulfillImage') {
          let tempObj = {};
          tempObj.img = img.image;
          tempObj.id = img._id;
          tempMImgArray.push(tempObj);
        }
      });
      setFulfilMoreImages(tempMImgArray);
    } else {
      setFulfilMoreImages([]);
    }
  };

  const removeFulfilTempImages = async (id) => {
    let imgs = [...fulfilMoreTempImages];
    imgs.splice(id, 1);
    setFulfilMoreTempImages(imgs);

    let fImg = [...fulfilMoreImg];
    fImg.splice(id, 1);
    setFulfilState({
      ...fulfilState,
      fulfilMoreImg: fImg
    });
  };

  const removeGallaryempImages = async (id, type) => {
    if (type === 'galleryImg') {
      let imgs = [...gallaryTempImages];
      imgs.splice(id, 1);
      setGallaryTempImages(imgs);

      let fImg = [...galleryImg];
      fImg.splice(id, 1);

      setstate({
        ...state,
        galleryImg: fImg
      });
    } else {
      let imgs = [...moreTempImages];
      imgs.splice(id, 1);
      setMoreTempImages(imgs);

      let fImg = [...moreImg];
      fImg.splice(id, 1);

      setstate({
        ...state,
        moreImg: fImg
      });
    }
  };

  const download = (dataurl, filename) => {
    const link = document.createElement('a');
    link.href = dataurl;
    link.download = filename;
    link.click();
  }

  console.log({ fulfilProductDetails });
  return (
    <>
      {/* {console.log('state', displayPrice)} */}
      {/*<FrontLoader loading={loading} />*/}

      <ModalSaveAsDraft 
        modelShow={modelShow}
        setModelShow={setModelShow}
        submitProductForm={submitProductForm}
      />

      {!viewPost ? (
        <div>
          <PostsTableHeader 
            totalRecord={totalRecord}
            user={user}
            productList={productList}
            createNewPost={createNewPost}
          />
          {/* <div className="note mw-100 mb-3 fs-6">
            Once your post is fully funded, click the Fulfill Order button and upload a copy of the
            sales receipt to complete the order.
          </div> */}
          <PostsTable
            productList={productList}
            editProduct={editProduct}
            deleteProduct={deleteProduct}
            publishProduct={publishProduct}
            handleClick={handleClick}
            totalPages={totalPages}
            pageNo={pageNo}
            handleSortingChange={handleSortingChange}
            order={order}
            sortField={sortField}
            organizationDetails={data}
            setFulfil={setFulfil}
            createPost={createPost}
            setFulfilProductDetails={setFulfilProductDetails}
            showFulfillOrder={showFulfillOrder}
          />
        </div>
      ) : !fulfil ? (
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
          loading={loading}
          tempImg={tempImg}
          moreTempImages={moreTempImages}
          moreImages={moreImages}
          projectList={projectList}
          removedProjects={removedProjects}
          seletedProjectList={seletedProjectList}
          gallaryTempImages={gallaryTempImages}
          gallaryImages={gallaryImages}
          setstate={setstate}
          data={data}
          deleteProductImage={deleteProductImage}
          setModelShow={setModelShow}
          removeGallaryempImages={removeGallaryempImages}
        />
      ) : (
        <>
          {
            /*
             * details view
             * 
             */
          }
          <PostDetailsNavigation 
            closeFulfilForm={closeFulfilForm}
            fulfilProductDetails={fulfilProductDetails}
          />

          <PostDetailsNotificationBanner 
            fulfilProductDetails={fulfilProductDetails}
          />

          <Card className="mt-0 mt-sm-5">
            <Row className="mw-850 ml-5">
              <Col lg="6">
                <PostDetailsTransactionSummary 
                  fulfilProductDetails={fulfilProductDetails}
                  data={data}
                />

                <PostDetailsReceiptArea
                  receiptImgName={receiptImgName}
                  fulfilError={fulfilError} 
                  changefile={changefile}
                  fulfilProductDetails={fulfilProductDetails}
                  deletedFile={deletedFile}
                  setShowReceipt={setShowReceipt}
                  download={download}
                  deleteFulfilorder={deleteFulfilorder}
                  showReceipt={showReceipt}
                />

              </Col>

              <Col lg="6">
                <PostDetailsMediaColumn 
                  videoUrl={videoUrl}
                  changevalue={changevalue}
                  embedlink={embedlink}
                  changefile={changefile}
                  fulfilMoreTempImages={fulfilMoreTempImages}
                  removeFulfilTempImages={removeFulfilTempImages}
                  fulfilmoreImages={fulfilmoreImages}
                  deleteProductImage={deleteProductImage}
                  fulfilError={fulfilError}
                />
              </Col>
            </Row>
          </Card>

          <PostDetailsTosAndButtons 
            fulfilPolicy={fulfilPolicy}
            changevalue={changevalue} 
            fulfilError={fulfilError}
            fulfilProductDetails={fulfilProductDetails}
            closeFulfilForm={closeFulfilForm}
            unPublishProduct={unPublishProduct}
            fulfilOrder={fulfilOrder}
          />
        </>
      )}
    </>
  );
};

const ModalSaveAsDraft = ({
  modelShow,
  setModelShow,
  submitProductForm,
}) => {
  return (
    <div
      className="modal common-modal"
      id="removeModalTwo"
      tabIndex="-1"
      aria-labelledby="removeModalTwoLabel"
      aria-hidden="true"
      style={{
        display: modelShow ? 'block' : 'none',
        background: modelShow ? 'hsl(0deg 0% 100% / 75%)' : ''
      }}
    >
      <div className="modal-dialog  modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-body text-center">
            <div className="remove-img-wrap">
              <img
                src={pencil}
                alt="remove link"
                style={{ height: '120px', marginBottom: '10px', maxWidth: '100%' }}
              />
            </div>
            <h5
              className="modal-title mb-3"
              id="removeModalTwoLabel"
              style={{ fontWeight: '700', fontSize: '24px' }}
            >
              Save Draft?
            </h5>
            <p>You can view your drafts on the Admin page under Studio</p>
          </div>
          <div className="modal-footer" style={{ background: '#f8fafd' }}>
            <button
              type="button"
              className="btn btn-flat btn-link"
              style={{ color: '#3085d6' }}
              data-bs-dismiss="modal"
              onClick={() => setModelShow(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn-flat btn-info"
              data-bs-dismiss="modal"
              onClick={() => submitProductForm(-1)}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

const PostsTableHeader = ({
  totalRecord,
  user,
  productList,
  createNewPost,
}) => {
  return (
    <header className="py-sm-2 w-100 d-sm-flex align-items-center">
      <h1 className="d-none d-sm-flex page__title mb-0 fs-3 fw-bolder me-2">Posts</h1>
      <span className="d-none d-sm-flex text-light fs-5 ml-2">({totalRecord})</span>

      <span className="d-none d-sm-flex item__total-wrap d-flex ms-3">
        <FontAwesomeIcon
          icon={solid('money-bills-simple')}
          className="text-dark mr-12p fs-4"
        />
        <span>{user.currencySymbol}</span>
        {productList && productList.length > 0
          ? productList
              .reduce(
                (previousTotal, current) =>
                  previousTotal + Number(current.displayPrice * current.soldout),
                0
              ).toLocaleString('en-US', {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2
              })
          : 0}
      </span>

      <div className="d-flex align-items-center ms-sm-auto justify-content-end">
        <Button
          variant="info"
          size="lg"
          className="me-2 fw-bold fs-6"
          onClick={() => createNewPost()}
        >
          Create New
        </Button>
        {/* <LadderMenuItems /> */}
      </div>
    </header>
  )
}

const PostDetailsNavigation = ({
  closeFulfilForm,
  fulfilProductDetails,
}) => {
  return (

    <div className="d-flex align-items-center flex-grow-1 pb-20p border-bottom">
      <Button
        variant="link"
        className="me-sm-2 me-1"
        onClick={() => {
          closeFulfilForm();
        }}
      >
        <FontAwesomeIcon icon={solid('angle-left')} className="text-subtext fs-3" />
      </Button>
      <div className="d-flex align-items-center text-dark me-sm-3 flex__1">
        <div className="item__image-wrap">
          <img
            alt=""
            height="56"
            className="img-fluid"
            src={helper.CampaignProductFullImagePath + fulfilProductDetails?.image}
          />
        </div>
        <div className="ms-3">
          <div className="fw-bolder fs-4 mb-3p">{fulfilProductDetails?.headline}</div>
          <div className="fs-7">
            {moment(fulfilProductDetails.created_at).format('MMMM DD')}
            {/* April 20th */}
          </div>
        </div>
      </div>

      <div className="d-none d-sm-flex align-items-center flex__1">
        <div className="d-flex align-items-center flex__1"></div>
      </div>

      {/* <ListItemImg
          size={42}
          imgSrc={helper.CampaignAdminLogoPath + item.itemDetails?.organizationDetails?.logo}
        /> */}

      <Link
        variant="link"
        className="text-light p-0 fw-normal"
        to={'/item/' + fulfilProductDetails?.slug}
      >
        <FontAwesomeIcon icon={regular('square-up-right')} className="me-1" /> Go to Post
      </Link>
    </div>
  );
}

const PostDetailsNotificationBanner = ({
  fulfilProductDetails,
}) => {
  return (
    <div className="empty_state mt-3">
      <div className="note note-info d-flex align-items-center" style={{ maxWidth: '100%' }}>
        {/*<span className="post__badge post__badge--sold me-2 text-primary fs-3">
            <FontAwesomeIcon icon={solid('party-horn')} />
          </span>
          <span className="post__badge post__badge--sold me-2 text-primary fs-3">
            <FontAwesomeIcon icon={solid('face-party')} />
          </span>*/}
        {fulfilProductDetails?.unlimited ? (
          <span className="fs-6 text-subtext">
            Your item was marked as ongoing. You may upload a sales receipt & followup media
            at any time. A copy of the sales receipt will be shared with your donors.
          </span>
        ) : (
          <span className="fs-6 text-subtext">
            Congratulations! Your post has been fully funded. Upload the sales receipt to
            complete your order. A copy of the sales receipt will be shared with your donors.
          </span>
        )}
      </div>
    </div>
  );
}

const PostDetailsMediaColumn = ({
  videoUrl,
  changevalue,
  embedlink,
  changefile,
  fulfilMoreTempImages,
  removeFulfilTempImages,
  fulfilmoreImages,
  deleteProductImage,
  fulfilError,
}) => {
  return (
    <>
      <Card.Header className="post__accordion-header pb-3">
        <span className="fs-3 fw-bolder text-dark">Media</span>
      </Card.Header>
      <form className="video-detail-form mt-3">
        <div className="form-group mb-3">
          <label htmlFor="videoUrl" className="form__label mb-3">
            Video&nbsp;
            <span className="post-type-text">(optional)</span>
          </label>
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="YouTube URL"
            name="videoUrl"
            id="videoUrl"
            value={videoUrl}
            onChange={(e) => {
              changevalue(e);
            }}
          />
        </div>

        <div className="project-video-wrap mb-5">
          <iframe
            title="admin-post-video"
            key="admin-post-video"
            width="498"
            height="280"
            src={embedlink}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <label htmlFor="videoUrl" className="form__label">
          Images &nbsp;
          <span className="post-type-text">(optional)</span>
        </label>
        <div className="">
          <div
            className="upload-picture-video-block mb-2"
            style={{ display: 'contents' }}
          >
            <div
              className="image-upload-wrap fs-2"
              style={{
                ...Style_ImageUploadWrap,
                backgroundColor: '#e5f4ff',
                borderRadius: '9px',
                fontSize: '60px',
                border: '2px dashed rgba(62, 170, 255, 0.58)'
              }}
            >
              <input
                className="file-upload-input"
                type="file"
                name="fulfilmoreImages[]"
                id="fulfilmoreImages"
                accept=".jpg,.gif,.png"
                multiple
                onChange={(e) => {
                  changefile(e);
                }}
                style={Style_FileUploadInput}
                title=" "
              />
              <div className="drag-text" style={{ textAlign: 'center', padding: '70px' }}>
                <FontAwesomeIcon icon={solid('cloud-arrow-up')} className="icon-cloud" />
              </div>
            </div>

            <div className="grid mt-3 mb-3 w-100">
              {fulfilMoreTempImages?.length ? (
                fulfilMoreTempImages.map((img, key) => 
                  (<PostDetailsProductImage 
                    key={key}
                    handleDelete={() => removeFulfilTempImages(key)}
                    imgClass="gallery__img"
                    imgStyle={{
                      backgroundImage: `url(${img ? img : noimg})`
                    }}
                  />)
                )
              ) : (
                <></>
              )}
              {fulfilmoreImages?.length
                ? fulfilmoreImages.map((img, key) => (
                  <PostDetailsProductImage 
                    key={key}
                    handleDelete={() => deleteProductImage(img.id, 'Fulfil')}
                    imgClass="gallery__img"
                    imgStyle={{
                      backgroundImage: `url(${
                        img.img
                          ? img.img !== ''
                            ? helper.CampaignProductFullImagePath + img.img
                            : noimg
                          : noimg
                      })`
                    }}
                  />
                  ))
                : ''}
            </div>
            {fulfilError && fulfilError.fulfilMoreImg && (
              <p className="error">
                {fulfilError
                  ? fulfilError.fulfilMoreImg
                    ? fulfilError.fulfilMoreImg
                    : ''
                  : ''}
              </p>
            )}
          </div>
        </div>
      </form>
    </>
  );
}

const PostDetailsProductImage = ({
  handleDelete,
  imgClass,
  imgStyle
}) => {
  return (
    <div className="img-wrap">
      <span
        className="close"
        onClick={() => handleDelete()}
        style={{ right: '7px' }}
      >
        &times;
      </span>
      <div
        className={imgClass}
        style={imgStyle}
        alt="lk"
        data-id="103"
      ></div>
    </div>
  )
}

const PostDetailsTransactionSummary = ({
  fulfilProductDetails,
  data,
}) => {
  return (
    <>
      {!fulfilProductDetails?.isFulfiled && (
        <label htmlFor="videoInput" className="form__label mt-sm-0 mt-3">
          Transaction Details
        </label>
      )}

      <div className="order__widget">
        <Card.Header className="post__accordion-header pb-3 mb-3">
          <span className="fs-3 fw-bolder text-dark">Order Summary</span>
        </Card.Header>
        <div className="border-bottom">
          <div className="d-flex align-items-center fw-bolder mb-20p">
            <span className="flex__1">
              {fulfilProductDetails?.unlimited ? 'Sold' : 'Qty'} :
            </span>
            <span className="fs-4 fw-bold text-light">
              {Number(fulfilProductDetails?.unlimited).toLocaleString('en-US', {
                maximumFractionDigits: 2
              })
                ? fulfilProductDetails?.soldout
                : Number(fulfilProductDetails?.quantity).toLocaleString('en-US', {
                    maximumFractionDigits: 2
                  })}
            </span>
          </div>
          <div className="d-flex align-items-center pt-1 mb-2">
            <span className="fw-bolder flex__1">Each:</span>
            <span className="fs-4 fw-bold text-light">
              {data?.symbol}
              {priceFormat(
                fulfilProductDetails?.displayPrice
                  ? fulfilProductDetails?.displayPrice
                  : fulfilProductDetails?.price
              )}
            </span>
          </div>
        </div>
        <div className="d-flex align-items-center pt-3 mb-2">
          <span className="fw-bolder flex__1">Total:</span>
          <span className="text-dark fw-bold fs-4">
            {data?.symbol}
            {priceFormat(
              (fulfilProductDetails?.displayPrice
                ? fulfilProductDetails?.displayPrice
                : fulfilProductDetails?.price) *
                (fulfilProductDetails?.unlimited
                  ? fulfilProductDetails?.soldout
                  : fulfilProductDetails?.quantity)
            )}
          </span>
        </div>
      </div>
    </>
  );
}

const PostDetailsReceiptArea = ({
  receiptImgName, 
  fulfilError, 
  changefile,
  fulfilProductDetails,
  deletedFile,
  setShowReceipt,
  download,
  deleteFulfilorder,
  showReceipt,
}) => {
  return (
    <>
      <label htmlFor="videoInput" className="form__label mt-3">
        Sales Receipt &nbsp;
        <span className="post-type-text" style={{ color: '#dd4646' }}>
          (required)
        </span>
      </label>

      <div
        className="image-upload-wrap fs-2"
        style={{
          ...Style_ImageUploadWrap,
          backgroundColor: '#e5f4ff',
          borderRadius: '9px',
          fontSize: '60px',
          border:
            receiptImgName === '' && fulfilError.receiptFile
              ? '2px dashed red'
              : '2px dashed rgba(62, 170, 255, 0.58)'
        }}
      >
        <input
          className="file-upload-input"
          type="file"
          // name="identityDocumentImage"
          // onChange={props.changevalue}
          name="receiptFile"
          id="receiptFile"
          onChange={(e) => {
            changefile(e);
          }}
          style={Style_FileUploadInput}
          title=" "
        />
        <div className="drag-text" style={{ textAlign: 'center', padding: '70px' }}>
          <FontAwesomeIcon icon={solid('cloud-arrow-up')} className="icon-cloud" />
          <h3 style={{ fontSize: 'inherit' }}>
            {receiptImgName && receiptImgName !== ''
              ? receiptImgName
              : fulfilError.receiptFile
              ? 'Please Select File'
              : 'Drag and drop or Select File'}
          </h3>
        </div>
      </div>
      {fulfilError && fulfilError.receiptFile && (
        <p className="error">
          {fulfilError?.receiptFile ?? ''}
        </p>
      )}

      {/* sales receipt list, to show when receipt is uploaded */}
      {/* if file is deleted, or if product is not fulfilled, hide this. */}
      {!( !fulfilProductDetails?.isFulfiled || deletedFile  ) && (
        <>
          <Card.Header className="post__accordion-header pb-3 mt-5">
            <span className="fs-3 fw-bolder text-dark">Sales Receipt</span>
          </Card.Header>
          <div className="my-3 pb-5  d-flex align-item-center">
            <div className="nn d-flex position-relative justify-content-center align-items-center me-2">
              <span className="post__badge post__badge--sold fs-3">
                <FontAwesomeIcon icon={solid('receipt')} />
              </span>
            </div>
            <div className="ps-2">
              <span className="post__title fw-semibold">
                {fulfilProductDetails?.fulfilDetails?.receipt}
              </span>
              <div className="date__name fw-semibold">
                Added &nbsp;
                {moment(fulfilProductDetails?.fulfilDetails.created_at).fromNow()}
              </div>
            </div>

            <div className="ms-auto">
              <Dropdown className="d-flex ms-auto" autoClose="outside">
                <Dropdown.Toggle variant="link" className="no-caret text-decoration-none">
                  <FontAwesomeIcon
                    icon={regular('ellipsis-vertical')}
                    className="text-light fs-3"
                  />
                </Dropdown.Toggle>
                <Dropdown.Menu className="">
                  {(fulfilProductDetails?.fulfilDetails?.receipt.split('.')[1] ===
                    'png' ||
                    fulfilProductDetails?.fulfilDetails?.receipt.split('.')[1] ===
                      'svg' ||
                    fulfilProductDetails?.fulfilDetails?.receipt.split('.')[1] ===
                      'jpeg' ||
                    fulfilProductDetails?.fulfilDetails?.receipt.split('.')[1] ===
                      'jpg') && (
                    <Dropdown.Item
                      className="d-flex align-items-center p-2"
                      onClick={() => setShowReceipt(true)}
                    >
                      <span className="fw-bold fs-7 flex__1">View</span>
                      <FontAwesomeIcon
                        icon={solid('magnifying-glass')}
                        className="ms-1"
                      />
                    </Dropdown.Item>
                  )}
                  <Dropdown.Divider />
                  <Dropdown.Item
                    className="d-flex align-items-center p-2"
                    onClick={() =>
                      download(
                        helper.FulfilRecieptPath +
                          fulfilProductDetails?.fulfilDetails?.receipt,
                        fulfilProductDetails?.fulfilDetails?.receipt
                      )
                    }
                  >
                    <span className="fw-bold fs-7 flex__1">Download</span>
                    <FontAwesomeIcon icon={regular('download')} className="ms-1" />
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  {/*
                    Why does this call `deleteFulfilorder` and not something like `deleteFile`?
                  */}
                  <Dropdown.Item
                    className="d-flex align-items-center p-2"
                    onClick={() =>
                      deleteFulfilorder(
                        fulfilProductDetails?.fulfilDetails?._id,
                        fulfilProductDetails?.fulfilDetails?.productId,
                        fulfilProductDetails?.fulfilDetails?.organizationId
                      )
                    }
                  >
                    <span className="fw-bold fs-7 flex__1">Delete</span>
                    <FontAwesomeIcon icon={regular('trash')} className="ms-1" />
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>

          <Modal
            size="lg"
            show={showReceipt}
            onHide={() => setShowReceipt(false)}
            aria-labelledby="show-sales-receipt"
          >
            <Modal.Header>
              <Modal.Title id="show-sales-receipt">
                Sales Receipt: {fulfilProductDetails?.fulfilDetails?.receipt}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              <img
                src={
                  helper.fullRecieptPath + fulfilProductDetails?.fulfilDetails?.receipt
                }
                width="66%"
                alt="receipt"
              />
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
}

const PostDetailsTosAndButtons = ({
  fulfilPolicy, 
  changevalue, 
  fulfilError, 
  fulfilProductDetails, 
  closeFulfilForm, 
  unPublishProduct, 
  fulfilOrder
}) => {
  return (
    <>
      <div className="fulfilling-check-wrap py-4">
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            name="fulfilPolicy"
            id="fulfilPolicy"
            checked={fulfilPolicy}
            onChange={(e) => {
              changevalue(e);
            }}
          />
          <label className="form-check-label" htmlFor="fulfilPolicy">
            {/* By posting your ad, you are agreeing to our{" "}
            <a href="#" target="_blank">
              <strong>terms of use</strong>
            </a>
            ,{" "}
            <a href="#" target="_blank">
              <strong>privacy policy</strong>
            </a>{" "}
            and{" "}
            <a href="#" target="_blank">
              <strong>site policies</strong>
            </a>
            . Please do not post duplicate ads. You may not edit your post
            after it has received funding. If you delete your post after it
            has received donations, the donors will receive a full refund and
            the post will be closed. */}
            By fulfilling your order, you are agreeing that you have purchased the product as
            it was presented at the time the post was created for the amount of items you
            requested. The sales receipt for your order will be shared with your donors on
            their order page.
          </label>
        </div>
      </div>

      {fulfilError && fulfilError.fulfilPolicy && (
        <p className="error">
          {fulfilError?.fulfilPolicy ?? ''}
        </p>
      )}

      <div className="products-detial-footer py-5">
        {!fulfilProductDetails?.isFulfiled && (
          <Button
            variant="danger"
            size="lg"
            className="fw-bold fs-6"
            onClick={() => {
              closeFulfilForm();
            }}
          >
            Discard
          </Button>
        )}

        {fulfilProductDetails?.isFulfiled && fulfilProductDetails.status === 1 && (
          <Button
            variant="info"
            size="lg"
            className="fw-bold fs-6"
            onClick={() => {
              unPublishProduct(fulfilProductDetails._id);
            }}
          >
            Unpublish
          </Button>
        )}

        <Button
          variant="success"
          size="lg"
          className="fw-bold fs-6"
          onClick={() => fulfilOrder()}
        >
          {fulfilProductDetails?.isFulfiled ? 'Update' : 'Fulfill Order'}
        </Button>
      </div>
    </>
  );
}


export default AdminPosts;
