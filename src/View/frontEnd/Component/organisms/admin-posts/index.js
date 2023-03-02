import { useState, useEffect, useCallback } from 'react';
import { useOutletContext, Link, useNavigate } from 'react-router-dom';
import PostsTable from '../posts-table';
import AddPost from '../add-post';
import './style.scss';
import categoryApi from '../../../../../Api/admin/category';
import projectApi from '../../../../../Api/admin/project';
import productApi from '../../../../../Api/admin/product';
import noimg from '../../../../../assets/images/noimg.jpg';
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
import { Button, Card, Col, Row, Dropdown } from 'react-bootstrap';
import moment from 'moment';
import _ from 'lodash';
import { GalleryImg } from '../../atoms';

const AdminPosts = () => {
  console.log('iFrame, AdminPosts');
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

  const imageuploadwrap = {
    marginTop: '20px',
    // border: " 4px dashed #3773c6",
    position: 'relative',
    width: '100%'
  };
  const validExtensions = ['jpg', 'png', 'jpeg'];
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
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();
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

  const [fulfilState, setFulfilState] = useState({
    fulfilId: '',
    fulfilMoreImg: [],
    videoUrl: '',
    receiptFile: '',
    fulfilPolicy: false,
    fulfilError: []
  });
  const [tempImgName, setTempImgName] = useState('');

  const { fulfilId, fulfilMoreImg, videoUrl, receiptFile, fulfilPolicy, fulfilError } = fulfilState;

  const [fulfil, setFulfil] = useState(false);

  const [fulfilMoreTempImages, setFulfilMoreTempImages] = useState([]);
  const [fulfilmoreImages, setFulfilMoreImages] = useState([]);

  const user = useSelector((state) => state.user);

  let videoid = fulfilState.videoUrl ? fulfilState.videoUrl.split("?v=")[1] : "";

  let embedlink = videoid ? "http://www.youtube.com/embed/" + videoid : "";

  const [tags, setTags] = useState([]);
  // let url = galleryUrl;
  // let videoid = url?.split('?v=')[1];
  // let embedlink = videoid ? 'http://www.youtube.com/embed/' + videoid : '';

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
      // setLoading(false);
    })();
  }, [data._id]);

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
    }
  }, [data._id, token]);

  // const getPrimaryBankAccount = useCallback(async () => {
  //   const acc = await adminCampaignApi.getPrimaryBankAccount(token);
  //   if (acc.data.success) {
  //     setPrimaryBankDetails(acc.data.data);
  //   }
  // }, [token]);

  useEffect(() => {
    (async () => {
      // setLoading(false);
      const getcategoryList = await categoryApi.listCategory(token);
      if (getcategoryList.data.success === true) {
        setCategoryList(getcategoryList.data.data);
      }

      if (data._id) await orgProjectList();
      // await getPrimaryBankAccount();
      // setLoading(false);
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
      setSeletedProjectList([...seletedProjectList, e.target.id]);
    } else {
      let tempArry = [...seletedProjectList];
      const index = tempArry.indexOf(e.target.id);
      if (index > -1) {
        tempArry.splice(index, 1);
      }
      setSeletedProjectList(tempArry);
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

  const changefile = async (e) => {
    // console.log('gg')
    // console.log(e.target.id)
    if (e.target.id === 'mainImg') {
      let file = e.target.files[0] ? e.target.files[0] : '';

      if (await hasAlpha(file)) {
        let extension = file.name.substr(file.name.lastIndexOf('.') + 1);

        if (validExtensions.includes(extension)) {
          setTempImg(URL.createObjectURL(file));
          setstate({
            ...state,
            image: file
          });
        } else {
          setstate({
            ...state,
            image: ''
          });
        }
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

      // console.log(URL.createObjectURL(file))
    } else if (e.target.id === 'galleryImg') {
      let gImgtempArry = [];
      let gImgtempObj = [];
      let tempGallaryFileArry = [];

      if (e.target.files && e.target.files.length > 0) {
        gImgtempObj.push(e.target.files);
        for (let i = 0; i < gImgtempObj[0].length; i++) {
          let extension = gImgtempObj[0][i].name.substr(
            gImgtempObj[0][i].name.lastIndexOf('.') + 1
          );
          if (validExtensions.includes(extension)) {
            tempGallaryFileArry.push(gImgtempObj[0][i]);
            gImgtempArry.push(URL.createObjectURL(gImgtempObj[0][i]));
          }
        }
        let oldG = [...gallaryTempImages];
        let combine = oldG.concat(gImgtempArry);
        setGallaryTempImages(combine);

        // let oldMG = [...galleryImg]
        // console.log(galleryImg)
        // let combineMainG = oldMG?.concat(tempGallaryFileArry)

        // setstate({
        //   ...state,
        //   galleryImg: combineMainG
        // })

        // setGallaryTempImages(gImgtempArry)
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
    } else if (e.target.id === 'moreImg') {
      let mImgtempArry = [];
      let mImgtempObj = [];
      let tempMainFileArry = [];

      if (e.target.files && e.target.files.length > 0) {
        mImgtempObj.push(e.target.files);
        for (let i = 0; i < mImgtempObj[0].length; i++) {
          let extension = mImgtempObj[0][i].name.substr(
            mImgtempObj[0][i].name.lastIndexOf('.') + 1
          );
          if (validExtensions.includes(extension)) {
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

        // setstate({
        //   ...state,
        //   moreImg: tempMainFileArry
        // })
      }
    } else if (e.target.id === 'fulfilmoreImages') {
      let fmImgtempArry = [];
      let fmImgtempObj = [];
      let ftempMainFileArry = [];

      if (e.target.files && e.target.files.length > 0) {
        fmImgtempObj.push(e.target.files);
        for (let i = 0; i < fmImgtempObj[0].length; i++) {
          let extension = fmImgtempObj[0][i].name.substr(
            fmImgtempObj[0][i].name.lastIndexOf('.') + 1
          );
          if (validExtensions.includes(extension)) {
            ftempMainFileArry.push(fmImgtempObj[0][i]);
            fmImgtempArry.push(URL.createObjectURL(fmImgtempObj[0][i]));
          }
        }
        let old = [...fulfilMoreTempImages];
        let combine = old.concat(fmImgtempArry);
        setFulfilMoreTempImages(combine);

        let oldf = [...fulfilMoreImg];
        let combineMain = oldf.concat(ftempMainFileArry);

        // setFulfilMoreTempImages(fmImgtempArry)
        // setFulfilState({
        //   ...fulfilState,
        //   fulfilMoreImg: ftempMainFileArry
        // })
        setFulfilState({
          ...fulfilState,
          fulfilMoreImg: combineMain
        });
      }
    } else if (e.target.id === 'receiptFile') {
      let file = e.target.files[0] ? e.target.files[0] : '';
      if (file) {
        setTempImgName(file.name);
        // console.log(file)
        setFulfilState({
          ...fulfilState,
          receiptFile: file
        });
      } else {
        setTempImgName('');

        setFulfilState({
          ...fulfilState,
          receiptFile: ''
        });
      }
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
    });
  };

  const submitProductForm = (s, seletedProjectListofIds) => {
    console.log("s")

    window.scrollTo(0, 0);
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

        // console.log(formData)

        if (Object.keys(formaerrror).length === 0) {
          // }

          let addProduct;
          // Api Call for update Profile
          setLoading(true);
          if (id !== '') {
            addProduct = await productApi.updateProduct(token, formData, id);
          } else {
            addProduct = await productApi.add(token, formData);
          }

          if (addProduct) {
            if (addProduct.data.success === false) {
              // setLoading(false);
              ToastAlert({ msg: addProduct.data.message, msgType: 'error' });
            } else {
              if (addProduct.data.success === true) {
                const res = await projectApi.list(token);
                console.log({res})
                const dta = res.data.data;
                console.log({dta})
                dta.forEach(project => {
                  let newData = {...project};
                  const idx = seletedProjectListofIds.indexOf(project._id)
                  console.log({idx})
                  if(idx !== -1){
                    const newProducts = [id];
                    project.productDetails.forEach(product => {
                      newProducts.push(product.productId)
                    });
                    console.log({oldProducts: newProducts})
                    newData.products = newProducts
                    projectApi.updateProject(token, newData, project._id, true)
                  }
                });
                resetForm();
                // setLoading(false);
                setUpdate(!update);
                createPost(false);
                setModelShow(false);
                ToastAlert({ msg: addProduct.data.message, msgType: 'success' });
              }
            }
          } else {
            // setLoading(false);
            ToastAlert({ msg: 'Product not save', msgType: 'error' });
          }
        } else {
          setModelShow(false);
        }
      })
      .catch((errors) => {
        // setLoading(false);
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
                  // setLoading(false);
                  ToastAlert({ msg: deleteProductApi.data.message, msgType: 'error' });
                } else {
                  if (deleteProductApi.data.success === true) {
                    // setLoading(false);
                    setUpdate(!update);
                    createPost(false);
                    ToastAlert({ msg: deleteProductApi.data.message, msgType: 'success' });
                  }
                }
              } else {
                // setLoading(false);
                ToastAlert({ msg: 'Product not delete', msgType: 'error' });
              }
            } else {
              // setLoading(false);
              ToastAlert({ msg: 'Product not delete id Not found', msgType: 'error' });
            }
          }
        }
      ]
    });
  };

  // Delete Product FulFil from a product
  const deleteFulfilorder = (id, prodcutId, organizationId) => {
    console.log('Posts, deleteFulfilorder, values: ', { id, prodcutId, organizationId });
    confirmAlert({
      title: 'Delete Receipt?',
      message: 'Are you sure you want to delete the Sales Receipt?',
      buttons: [
        {
          label: 'Cancel'
        },
        {
          label: 'Delete',
          onClick: async () => {
            if (id !== '') {
              const deleteFulfilOrderApi = await productApi.deleteFulfilOrder(
                token,
                id,
                prodcutId,
                organizationId
              );
              if (deleteFulfilOrderApi) {
                if (deleteFulfilOrderApi.data.success === false) {
                  // setLoading(false);
                  ToastAlert({ msg: deleteFulfilOrderApi.data.message, msgType: 'error' });
                } else {
                  if (deleteFulfilOrderApi.data.success === true) {
                    // setLoading(false);
                    setUpdate(!update);
                    ToastAlert({ msg: deleteFulfilOrderApi.data.message, msgType: 'success' });
                  }
                }
              } else {
                // setLoading(false);
                ToastAlert({ msg: 'Product not delete', msgType: 'error' });
              }
            } else {
              // setLoading(false);
              ToastAlert({ msg: 'Product not delete id Not found', msgType: 'error' });
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
      // setLoading(false);

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
        // setLoading(false);
      } else {
        // setLoading(false);
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
      // setLoading(false);

      const publish = await productApi.publishProduct(token, id, 'PUBLISH');
      if (publish) {
        if (publish.data.success === false) {
          // setLoading(false);
          ToastAlert({ msg: publish.data.message, msgType: 'error' });
        } else {
          if (publish.data.success === true) {
            // setLoading(false);
            setUpdate(!update);
            ToastAlert({ msg: publish.data.message, msgType: 'success' });
          }
        }
      } else {
        // setLoading(false);
        ToastAlert({ msg: 'Product not published', msgType: 'error' });
      }
    }
  };

  const unPublishProduct = async (id) => {
    const publish = await productApi.publishProduct(token, id, 'UNPUBLISH');
    if (publish) {
      if (publish.data.success === false) {
        // setLoading(false);
        // ToastAlert({ msg: publish.data.message, msgType: 'error' });
      } else {
        if (publish.data.success === true) {
          // setLoading(false);
          setUpdate(!update);
          setFulfil(false);
          createPost(false);
          // ToastAlert({ msg: publish.data.message, msgType: 'success' });
        }
      }
    } else {
      // setLoading(false);
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
      if (getOrganizationProducts.data.success === true) {
        if (getOrganizationProducts.data.data.length > 0) {
          console.log('Posts, getOrganizationProducts: ', getOrganizationProducts.data.data);
          // const productDetails = [
          //   ...new Set(getOrganizationProducts.data.data.map((item) => item._id))
          // ];
          // const productDetails = getOrganizationProducts.data.data;
          const productDetails = _.uniqBy(getOrganizationProducts.data.data, '_id');
          // let productDetails = getOrganizationProducts.data.data.filter((value, index, self) => {
          //   // console.log('Posts, Details: ', { value, index, self });
          //   return (
          //     index ===
          //     self.findIndex((t) => {
          //       // console.log('t', { t });
          //       return t._id === value._id;
          //     })
          //   );
          // });
          console.log('Posts, productDetails: ', productDetails);
          setProductList(productDetails);
        } else {
          setProductList([]);
        }
        // console.log('Posts, getOrganizationProducts: ', getOrganizationProducts.data.data);
        // setProductList(getOrganizationProducts.data.data);
        setTotalPages(getOrganizationProducts.data.totalPages);
        setTotalRecord(getOrganizationProducts.data.totalRecord);
      }
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
    setFulfilMoreImages([]);

    setFulfilState({
      ...fulfilState,
      fulfilId: '',
      fulfilMoreImg: [],
      videoUrl: '',
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
    // setLoading(true);
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
    // setLoading(false);
  };

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

    // if (fulfilMoreImg.length > helper.MAX_IMAGE_LENGTH) {
    //   formaerrror['fulfilMoreImg'] = "Maximum images allowed: " + helper.MAX_IMAGE_LENGTH

    // }
    // console.log(fulfilMoreImg)
    if (!fulfilPolicy) {
      formaerrror['fulfilPolicy'] =
        'Please indicate that you have read and agree to the Terms and Conditions and Privacy Policy.';
    }
    if (!fulfilId) {
      rules.receiptFile = 'required';
    }
    //  rules = {
    //   receiptFile: 'required',
    // }

    const message = {
      'receiptFile.required': 'Receipt is Required'
    };

    validateAll(fulfilState, rules, message)
      .then(async () => {
        setFulfilState({
          ...fulfilState,
          fulfilError: formaerrror
        });

        if (Object.keys(formaerrror).length === 0) {
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

          let fulfil;
          if (fulfilId) {
            fulfil = await productApi.updateFulfilOrder(token, formData, fulfilId);
          } else {
            fulfil = await productApi.fulfilOrder(token, formData);
          }

          if (fulfil && fulfil.data.success) {
            closeFulfilForm();
            setUpdate(!update);
            ToastAlert({ msg: fulfil.data.message, msgType: 'success' });
          } else {
            ToastAlert({ msg: fulfil.data.message, msgType: 'error' });
          }
        }
      })
      .catch((errors) => {
        // setLoading(false);
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

  function download(dataurl, filename) {
    const link = document.createElement('a');
    link.href = dataurl;
    link.download = filename;
    link.click();
  }

  return (
    <>
      {/* {console.log('state', displayPrice)} */}
      {/*<FrontLoader loading={loading} />*/}

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
                  src="https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/6047be327f2bfa3c53385cd6_pencil.svg"
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

      {!viewPost ? (
        <div>
          <header className="py-sm-2 mb-3 w-100 d-sm-flex align-items-center">
            <h1 className="d-none d-sm-flex page__title mb-0 fs-3 fw-bolder me-2">Posts</h1>
            <span className="d-none d-sm-flex text-light fs-5 ml-2">({totalRecord})</span>

            <span className="d-none d-sm-flex item__total-wrap d-flex ms-3">
              <FontAwesomeIcon
                icon={solid('money-bills-simple')}
                className="text-dark mr-12p fs-4"
              />
              {productList && productList.length > 0
                ? productList
                    .reduce(
                      (previousTotal, current) =>
                        previousTotal + Number(current.displayPrice * current.soldout),
                      0
                    )
                    .toFixed(2)
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
          tempImg={tempImg}
          moreTempImages={moreTempImages}
          moreImages={moreImages}
          projectList={projectList}
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
        // fulfil ?
        <>
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

          <div className="empty_state mt-3">
            <div className="note note-info d-flex align-items-center" style={{ maxWidth: '100%' }}>
              {/*<span className="post__badge post__badge--sold me-2 text-primary fs-3">
                  <FontAwesomeIcon icon={solid('party-horn')} />
                </span>
                <span className="post__badge post__badge--sold me-2 text-primary fs-3">
                  <FontAwesomeIcon icon={solid('face-party')} />
                </span>*/}
              {!fulfilProductDetails?.unlimited && (
                <span className="fs-6 text-subtext">
                  Congratulations! Your post has been fully funded. Upload the sales receipt to
                  complete your order. A copy of the sales receipt will be shared with your donors.
                </span>
              )}
              {fulfilProductDetails?.unlimited && (
                <span className="fs-6 text-subtext">
                  Your item was marked as ongoing. You may upload a sales receipt & followup media
                  at any time. A copy of the sales receipt will be shared with your donors.
                </span>
              )}
            </div>
          </div>

          <Card className="mt-0 mt-sm-5">
            <Row className="mw-850 ml-5">
              <Col lg="6">
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

                {/* {fulfilProductDetails?.isFulfiled && (
                    <>
                      <div className="linked__item d-flex align-items-center p-1 border mt-3">
                        <div className="accounts__icon">
                          <ListItemImg
                            size={45}
                            className="bg-white"
                            // imgSrc="https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/62277f679099844cc42cc1d1_5b5e656493af1e0441cd892a_mc_vrt_pos.svg"
                            icon={
                              <FontAwesomeIcon
                                icon={regular('building-columns')}
                                className="fs-3 text-subtext"
                              />
                            }
                          />
                        </div>
                        <div className=" flex__1 mx-2 text-break">
                          <div className="accounts__email fw-bold">
                            {primaryBankDetails?.businessName
                              ? primaryBankDetails?.businessName
                              : primaryBankDetails?.firstName + ' ' + primaryBankDetails?.lastName}
                          </div>
                          <div className="fs-7 mb-3p">{primaryBankDetails?.bankName}</div>

                          <div className="fs-7 text-subtext">
                            {primaryBankDetails?.accountNumber}
                          </div>
                        </div>
                      </div>

                      <div className="note note--info mt-3" style={{ padding: '16px' }}>
                        <FontAwesomeIcon
                          icon={regular('circle-info')}
                          className="text-info icon-method mr-3p"
                        />
                        <span className="text-dark">
                          Funds were dispersed to your bank account on 03/04/2022
                        </span>
                      </div>
                    </>
                  )}*/}
                {!fulfilProductDetails?.isFulfiled ? (
                  <>
                    <label htmlFor="videoInput" className="form__label mt-3">
                      Sales Receipt &nbsp;
                      <span className="post-type-text" style={{ color: '#dd4646' }}>
                        (required)
                      </span>
                    </label>

                    {/* <div className="upload-picture-video-block mb-2" style={{ display: "contents" }}>
                          <div className="upload-wrap" style={{ width: "100%", height: "200px" }}>
                            <FontAwesomeIcon
                              icon={solid("cloud-arrow-up")}
                              className="icon-cloud"
                            />
                            <label>
                              <input name='receiptFile' id='receiptFile' type="file"
                                onChange={(e) => { changefile(e) }}
                              />
                            </label>
                          </div>

                        </div> */}

                    <div
                      className="image-upload-wrap mb-3 fs-2"
                      style={{
                        ...imageuploadwrap,
                        backgroundColor: '#e5f4ff',
                        borderRadius: '9px',
                        fontSize: '60px',
                        border:
                          tempImgName === '' && fulfilError.receiptFile
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
                        style={fileuploadinput}
                        title=" "
                      />
                      <div className="drag-text" style={{ textAlign: 'center', padding: '70px' }}>
                        <h3 style={{ fontSize: 'inherit' }}>
                          {tempImgName && tempImgName !== ''
                            ? tempImgName
                            : fulfilError.receiptFile
                            ? 'Please Select File'
                            : 'Drag and drop or select File'}
                        </h3>
                      </div>
                    </div>
                    {fulfilError && fulfilError.receiptFile && (
                      <p className="error">
                        {fulfilError
                          ? fulfilError.receiptFile
                            ? fulfilError.receiptFile
                            : ''
                          : ''}
                      </p>
                    )}
                  </>
                ) : (
                  <>
                    <label htmlFor="videoInput" className="form__label mt-3">
                      Sales Receipt &nbsp;
                      <span className="post-type-text" style={{ color: '#dd4646' }}>
                        (required)
                      </span>
                    </label>

                    <div
                      className="image-upload-wrap mb-3 fs-2"
                      style={{
                        ...imageuploadwrap,
                        backgroundColor: '#e5f4ff',
                        borderRadius: '9px',
                        fontSize: '60px',
                        border:
                          tempImgName === '' && fulfilError.receiptFile
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
                        style={fileuploadinput}
                        title=" "
                      />
                      <div className="drag-text" style={{ textAlign: 'center', padding: '70px' }}>
                        <h3 style={{ fontSize: 'inherit' }}>
                          {tempImgName && tempImgName !== ''
                            ? tempImgName
                            : fulfilError.receiptFile
                            ? 'Please Select File'
                            : 'Drag and drop or select File'}
                        </h3>
                      </div>
                    </div>
                    {fulfilError && fulfilError.receiptFile && (
                      <p className="error">
                        {fulfilError
                          ? fulfilError.receiptFile
                            ? fulfilError.receiptFile
                            : ''
                          : ''}
                      </p>
                    )}

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
                        <text className="post__title fw-semibold">
                          {fulfilProductDetails?.fulfilDetails?.receipt}
                        </text>
                        <div className="date__name fw-semibold">
                          Added &nbsp;
                          {moment(fulfilProductDetails?.fulfilDetails.created_at).fromNow()}
                        </div>
                      </div>
                      {/* <Modal
                        size="lg"
                        show={showReceipt}
                        onHide={() => setShowReceipt(false)}
                        aria-labelledby="show-sales-receipt"
                      >
                        <Modal.Header>
                          <Modal.Title id="show-sales-receipt"></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <GalleryImg
                            thumbImgSrc={
                              helper.recieptPath + fulfilProductDetails?.fulfilDetails?.receipt
                            }
                            bigImgSrc={
                              helper.recieptPath + fulfilProductDetails?.fulfilDetails?.receipt
                            }
                          />
                        </Modal.Body>
                      </Modal> */}

                      <div className="ms-auto">
                        <Dropdown className="d-flex ms-auto" autoClose="outside">
                          <Dropdown.Toggle variant="link" className="no-caret text-decoration-none">
                            <FontAwesomeIcon
                              icon={regular('ellipsis-vertical')}
                              className="text-light fs-3"
                            />
                          </Dropdown.Toggle>
                          <Dropdown.Menu className="">
                            <Dropdown.Item
                              className="d-flex align-items-center p-2"
                              onClick={() => setShowReceipt(true)}
                            >
                              <span className="fw-bold fs-7 flex__1">View</span>
                              <FontAwesomeIcon icon={solid('magnifying-glass')} className="ms-1" />
                            </Dropdown.Item>
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
                              {/* <a href={helper.FulfilRecieptPath + fulfilProductDetails?.fulfilDetails?.receipt} download
                                    // variant="info"
                                    // target="_blank"
                                    className="fw-bold fs-7 flex__1"
                                  >
                                    Download
                                  </a> */}
                              <FontAwesomeIcon icon={regular('download')} className="ms-1" />
                            </Dropdown.Item>
                            <Dropdown.Divider />
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
                    {showReceipt && (
                      <div className="saleReceipt">
                        <span className="close" onClick={() => setShowReceipt(false)}>
                          &times;
                        </span>
                        <GalleryImg
                          thumbImgSrc={
                            helper.recieptPath + fulfilProductDetails?.fulfilDetails?.receipt
                          }
                          bigImgSrc={
                            helper.recieptPath + fulfilProductDetails?.fulfilDetails?.receipt
                          }
                        />
                      </div>
                    )}
                  </>
                )}
              </Col>
              <Col lg="6">
                <Card.Header className="post__accordion-header pb-3">
                  <span className="fs-3 fw-bolder text-dark">Media</span>
                </Card.Header>
                <form className="video-detail-form mt-3">
                  <div className="form-group mb-1">
                    <label htmlFor="videoUrl" className="form__label mb-4">
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

                  {videoUrl && (
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
                  )}
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
                        className="image-upload-wrap mb-3 fs-2"
                        style={{
                          ...imageuploadwrap,
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
                          style={fileuploadinput}
                          title=" "
                        />
                        <div className="drag-text" style={{ textAlign: 'center', padding: '70px' }}>
                          <FontAwesomeIcon icon={solid('cloud-arrow-up')} className="icon-cloud" />
                        </div>
                      </div>

                      <div className="grid mt-3 mb-3" style={{ display: 'grid' }}>
                        {fulfilMoreTempImages?.length ? (
                          fulfilMoreTempImages.map((img, key) => {
                            return (
                              <div className="img-wrap" key={key}>
                                <span className="close" onClick={() => removeFulfilTempImages(key)}>
                                  &times;
                                </span>
                                {/*
                                <img
                                  src={img ? img : noimg}
                                  alt="lk"
                                  style={{ width: '100px', height: '100px' }}
                                />
                                */}
                                <div
                                  className="gallery__img"
                                  style={{
                                    backgroundImage: `url(${img ? img : noimg})`,
                                    width: '100px',
                                    height: '100px'
                                  }}
                                  alt="lk"
                                  data-id="103"
                                ></div>
                              </div>
                            );
                          })
                        ) : (
                          <></>
                        )}
                        {fulfilmoreImages?.length
                          ? fulfilmoreImages.map((img, key) => (
                              <>
                                <div className="img-wrap" key={key}>
                                  <span
                                    className="close"
                                    onClick={() => deleteProductImage(img.id, 'Fulfil')}
                                    style={{ right: '7px' }}
                                  >
                                    &times;
                                  </span>
                                  {/*<img
                                    src={
                                      img.img
                                        ? img.img !== ''
                                          ? helper.CampaignProductFullImagePath + img.img
                                          : noimg
                                        : noimg
                                    }
                                    alt="lk"
                                    style={{ width: '100px', height: '100px' }}
                                  />*/}
                                  <div
                                    className="gallery__img"
                                    style={{
                                      backgroundImage: `url(${
                                        img.img
                                          ? img.img !== ''
                                            ? helper.CampaignProductFullImagePath + img.img
                                            : noimg
                                          : noimg
                                      })`,
                                      width: '100px',
                                      height: '100px'
                                    }}
                                    alt="lk"
                                    data-id="103"
                                  ></div>
                                </div>
                              </>
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
              </Col>
            </Row>
          </Card>

          <>
            <div className="fulfilling-check-wrap pb-4">
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
                <label className="form-check-label" htmlFor="policy">
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
                {fulfilError ? (fulfilError.fulfilPolicy ? fulfilError.fulfilPolicy : '') : ''}
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
                {fulfilProductDetails?.isFulfiled ? 'Update' : 'Fulfil Order'}
              </Button>
            </div>
          </>
        </>
      )}
    </>
  );
};

export default AdminPosts;
