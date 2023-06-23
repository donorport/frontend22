import React, { useState, useEffect } from 'react';
//import FrontLoader from '../../Common/FrontLoader';
import { validateAll } from 'indicative/validator';
import ToastAlert from '../../Common/ToastAlert';
import { confirmAlert } from 'react-confirm-alert';
import { useNavigate } from 'react-router-dom';
import categoryApi from '../../Api/admin/category';
import Index from '../../View/admin/Products/Index';
import AddProductForm from '../../View/admin/Products/AddProductForm';
import adminCampaignApi from '../../Api/admin/adminCampaign';
import productApi from '../../Api/admin/product';
import authApi from '../../Api/admin/auth';
import { hasPermission } from '../../Common/Helper';
import projectApi from '../../Api/admin/project';


const SUBMIT_PRODUCT_FORM_VALIDATION_MESSAGES = {
  'status.required': 'Status is required',
  'needheadline.required': 'Need Headline is required',
  'address.required': 'Location is required',
  // 'galleryUrl.required': 'gallery Url is Required',

  'brand.required': 'Brand is required',
  'headline.required': 'Headline is required',
  'category.required': 'Category is Required',
  'subcategory.required': 'Subcategory is required',
  'description.required': 'Description is required',
  'price.required': 'Price is required',
  'image.required': 'Image is required',
  // 'quantity.required': 'Quantity is Required',
  'organization.required': 'Organization is required',
  'slug.required': 'Slug is required'
};

const VALID_IMAGE_EXTENSIONS = ['jpg', 'png', 'jpeg'];

function ProductController() {

  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [subcategoryList, setSubCategoryList] = useState([]);
  const [campaignAdminList, setCampaignAdminList] = useState([]);
  const [tempImg, setTempImg] = useState('');
  const [Img, setImg] = useState('');
  const [productList, setProductList] = useState([]);
  //const [iconList, setIconList] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();

  const adminAuthToken = localStorage.getItem('adminAuthToken');
  const adminData = JSON.parse(localStorage.getItem('adminData'));
  const [seletedProjectList, setSeletedProjectList] = useState([]);
  // const [productImages, setproductImages] = useState([])

  const [moreTempImages, setMoreTempImages] = useState([]);
  const [moreImages, setMoreImages] = useState([]);

  const [gallaryTempImages, setGallaryTempImages] = useState([]);
  const [gallaryImages, setGallaryImages] = useState([]);

  const [state, setstate] = useState({
    id: '',
    status: 1,
    title: '',
    subtitle: '',
    headline: '',
    brand: '',
    address: '',
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
    organizationCountryId: '',
    galleryImg: [],
    media: false,

    organizationLocation: '',
    locationName: '',
    lat: 0,
    lng: 0
  });
  const {
    id,
    status,
    //title,
    //subtitle,
    category,
    subcategory,
    description,
    price,
    image,
    quantity,
    organization,
    slug,
    //error,
    moreImg,
    galleryUrl,
    headline,
    brand,
    address,
    needheadline,
    galleryImg,
    unlimited,
    tax,
    postTag,
    organizationCountryId,
    media,
    displayPrice,
    lat,
    lng
    //locationName
  } = state;
  console.log('ProductController render:', { state });

  const [tags, setTags] = useState([]);

  useEffect(() => {
    (async () => {
      setLoading(true);

      if (!hasPermission(adminData.roleName, 'PRODUCT')) {
        navigate('/admin/dashboard');
      }

      const verifyUser = await authApi.verifyToken(adminAuthToken);
      if (!verifyUser.data.success) {
        localStorage.clear();
        navigate('/admin/login');
      }

      //Product List
      //----------------------------------
      const getproductList = await productApi.list(adminAuthToken);
      if (getproductList.data.success === true) {
        let temp = getproductList.data.data;
        if (adminData.roleName === 'CAMPAIGN_ADMIN') {
          if (getproductList.data.data.length > 0) {
            temp = getproductList.data.data.map((p) => {
              if (p.organizationId === adminData.id) {
                return p;
              }
            });
          }
        }
        setProductList(temp);
        console.log({ temp });
      }
      // setUpdate(true)

      //Category List
      //----------------------------------
      const getcategoryList = await categoryApi.listCategory(adminAuthToken);
      if (getcategoryList.data.success === true) {
        setCategoryList(getcategoryList.data.data);
      }

      //Admin Campaign (Organization) List
      //----------------------------------
      const getcampaignAdminList = await adminCampaignApi.list(adminAuthToken);
      if (getcampaignAdminList.data.success) {
        setCampaignAdminList(getcampaignAdminList.data.data);
      }

      //Project List
      //--------------------------------------
      // const getProjectList = await projectApi.list(adminAuthToken)
      // if (getProjectList.data.success) {
      //     setProjectList(getProjectList.data.data)
      // }

      setLoading(false);
    })();
  }, [update]);

  const orgProjectList = async (organizationId) => {
    let formData = {};
    formData.filter = false;
    formData.sortField = 'created_at';
    formData.sortType = 'asc';
    formData.organizationId = organizationId;

    const getProjectList = await projectApi.projectListByOrganization(adminAuthToken, formData);
    if (getProjectList.data.success) {
      setProjectList(getProjectList.data.data);
    }
  };

  const changevalue = async (e) => {
    let value = e.target.value;

    if (e.target.name === 'unlimited' || e.target.name === 'tax' || e.target.name === 'postTag') {
      value = e.target.checked;
    }
    if (e.target.name === 'price' || e.target.name === 'quantity') {
      value = e.target.value.replace(/[^\d.]|\.(?=.*\.)/g, '');
    }

    if (e.target.name === 'organization') {
      // setstate({
      //     ...state,
      //     organization: obj.id,
      //     organizationCountryId: obj.country_id,
      //     organizationLocation: obj.organizationLocation,
      //     locationName: obj.locationName,
      // })

      let obj = JSON.parse(e.target.value);

      setstate({
        ...state,
        organization: obj.id,
        organizationCountryId: obj.country_id,
        organizationLocation: obj.organizationLocation,
        locationName: obj.locationName,
        address: obj.locationName,
        lat: 0,
        lng: 0
      });

      await orgProjectList(obj.id);
    } else if (e.target.name === 'category') {
      //get subCategory List on Category Change

      const getsubCategoryList = await categoryApi.listSubCategory(adminAuthToken, value);
      if (getsubCategoryList.data.success === true) {
        setSubCategoryList(getsubCategoryList.data.data);
      }

      setstate({
        ...state,
        [e.target.name]: value
      });
    } else if (e.target.name === 'headline') {
      if (id === '') {
        let productNameVar = value.toLowerCase();
        productNameVar = productNameVar.replace(/\s+/g, '-');
        setstate({
          ...state,
          slug: productNameVar,
          [e.target.name]: value
        });
      } else {
        setstate({
          ...state,
          [e.target.name]: value
        });
      }
    } else if (e.target.name === 'slug') {
      if (id === '') {
        let productNameVar = value.toLowerCase();
        productNameVar = productNameVar.replace(/\s+/g, '-');
        setstate({
          ...state,
          slug: productNameVar
        });
      }
    } else {
      setstate({
        ...state,
        [e.target.name]: value
      });
    }
  };

  // const changefile = (e) => {
  //     if (e.target.id === 'mainImg') {
  //         let file = e.target.files[0] ? e.target.files[0] : '';
  //         setTempImg(URL.createObjectURL(file))

  //         setstate({
  //             ...state,
  //             image: file
  //         })
  //     } else if (e.target.id === 'galleryImg') {

  //         let gImgtempArry = []
  //         let gImgtempObj = []

  //         if (e.target.files && e.target.files.length > 0) {
  //             gImgtempObj.push(e.target.files)
  //             for (let i = 0; i < gImgtempObj[0].length; i++) {
  //                 gImgtempArry.push(URL.createObjectURL(gImgtempObj[0][i]))
  //             }
  //             setGallaryTempImages(gImgtempArry)

  //         }

  //         setstate({
  //             ...state,
  //             galleryImg: e.target.files
  //         })

  //     } else {

  //         let mImgtempArry = []
  //         let mImgtempObj = []

  //         if (e.target.files && e.target.files.length > 0) {
  //             mImgtempObj.push(e.target.files)
  //             for (let i = 0; i < mImgtempObj[0].length; i++) {
  //                 mImgtempArry.push(URL.createObjectURL(mImgtempObj[0][i]))
  //             }
  //             setMoreTempImages(mImgtempArry)

  //         }
  //         setstate({
  //             ...state,
  //             moreImg: e.target.files
  //         })
  //     }

  // }

  const changefile = (e) => {
    // console.log('kkk')
    if (e.target.id === 'mainImg') {
      let file = e.target.files[0] ? e.target.files[0] : '';

      if (file) {
        let extension = file.name.substr(file.name.lastIndexOf('.') + 1);
        if (VALID_IMAGE_EXTENSIONS.includes(extension)) {
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
          if (VALID_IMAGE_EXTENSIONS.includes(extension)) {
            tempGallaryFileArry.push(gImgtempObj[0][i]);
            gImgtempArry.push(URL.createObjectURL(gImgtempObj[0][i]));
          }
        }
        setGallaryTempImages(gImgtempArry);
        setstate({
          ...state,
          galleryImg: tempGallaryFileArry
        });
      }
    } else {
      let mImgtempArry = [];
      let mImgtempObj = [];
      let tempMainFileArry = [];

      if (e.target.files && e.target.files.length > 0) {
        mImgtempObj.push(e.target.files);
        for (let i = 0; i < mImgtempObj[0].length; i++) {
          let extension = mImgtempObj[0][i].name.substr(
            mImgtempObj[0][i].name.lastIndexOf('.') + 1
          );
          if (VALID_IMAGE_EXTENSIONS.includes(extension)) {
            tempMainFileArry.push(mImgtempObj[0][i]);
            mImgtempArry.push(URL.createObjectURL(mImgtempObj[0][i]));
          }
        }
        setMoreTempImages(mImgtempArry);
        setstate({
          ...state,
          moreImg: tempMainFileArry
        });
      }
    }
  };

  const handleOnDiscriptionChangeValue = (e) => {
    setstate({
      ...state,
      description: e
    });
  };

  const resetForm = () => {
    setModal(false);
    setTags([]);
    setTempImg('');

    setMoreTempImages([]);
    setMoreImages([]);
    setGallaryTempImages([]);
    setGallaryImages([]);

    setstate({
      ...state,
      id: '',
      status: 1,
      title: '',
      subtitle: '',
      headline: '',
      brand: '',
      address: '',
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
      organizationCountryId: '',
      galleryImg: [],
      organizationLocation: '',
      locationName: '',
      lat: 0,
      lng: 0
    });
  };
  const openModel = () => {
    setTags([]);
    setTempImg('');
    setSeletedProjectList([]);
    setMoreTempImages([]);
    setMoreImages([]);
    setGallaryTempImages([]);
    setGallaryImages([]);
    setProjectList([]);
    setImg('');
    setModal(true);
    setstate({
      id: '',
      status: 1,
      title: '',
      subtitle: '',
      headline: '',
      brand: '',
      address: '',
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
      organizationCountryId: '',
      galleryImg: [],
      organizationLocation: '',
      locationName: '',
      lat: 0,
      lng: 0
    });
  };

  const submitProductForm = async () => {
    console.log('e');
    const formaerror = {};
    if (tags.length === 0) {
      formaerror['tags'] = 'Please Enter Tags';
    }
    if (!id) {
      if (moreImg?.length > 0 && moreImg.length <= 1) {
        formaerror['moreImg'] = "Please select more than one image";
      }
      if (!galleryImg?.length) {
        formaerror['galleryImg'] = "Please select more than one image";
      }
      if (galleryImg?.length <= 1) {
        formaerror['galleryImg'] = "Please select more than one image";
      }
    }

    const rules = {
      brand: 'required',
      needheadline: 'required',
      status: 'required',
      headline: 'required',
      category: 'required',
      subcategory: 'required',
      description: 'required',
      price: 'required',
      // galleryUrl: 'required',
      // quantity: 'required',
      // slug: 'required'
    };

    if (id) {
      rules.lat = 'required';
      rules.lng = 'required';
      rules.organization = 'required';
    } else {
      rules.address = 'required';
      rules.image = 'required';
      rules.slug = 'required';

      if (adminData.roleName !== 'CAMPAIGN_ADMIN') {
        rules.organization = 'required';
      }
    }

    console.log({ state, rules }); // lat, lng are empty in state

    try {
      const res = await validateAll(state, rules, SUBMIT_PRODUCT_FORM_VALIDATION_MESSAGES);

      setLoading(true);
      console.log("Validate?:", { res });
      // const formaerrror = {};
      setstate({
        ...state,
        error: formaerror
      });

      let data = {};

      // data.title = title
      // data.subtitle = subtitle
      data.status = status;
      data.brand = brand;
      data.needheadline = needheadline;
      data.galleryUrl = galleryUrl;
      data.headline = headline;
      data.unlimited = unlimited;
      data.tax = tax;
      data.postTag = postTag;
      data.media = media;
      data.displayPrice = displayPrice;

      if (image) {
        data.image = image;
      }
      if (adminData.roleName === 'CAMPAIGN_ADMIN') {
        data.organizationId = adminData.id;
      } else {
        data.organizationId = organization;
      }
      if (!id && id === '') {
        data.productSlug = slug;
      }
      let tagsArray = [];
      if (tags.length > 0) {
        tags.map((ptage) => {
          tagsArray.push(ptage.id);
        });
      }

      if (moreImg?.length > 0) {
        data.moreImg = moreImg;
      }
      if (galleryImg?.length > 0) {
        data.galleryImg = galleryImg;
      }
      if (seletedProjectList?.length > 0) {
        data.prjects = seletedProjectList;
      }

      if (address) {
        data.address = address;
      }

      if (lat) {
        data.lat = lat;
      }

      if (lng) {
        data.lng = lng;
      }

      data.organizationCountryId = organizationCountryId;
      data.price = price;
      data.description = description;
      data.category_id = category;
      data.subcategory_id = subcategory;
      data.quantity = quantity;
      data.tags = tagsArray;
      if (Object.keys(formaerror).length !== 0) {
        setLoading(false);
        return;
      }

      let addProduct;
      // Api Call for update Profile
      setLoading(false);
      if (id !== '') {
        addProduct = await productApi.updateProduct(adminAuthToken, data, id);
      } else {
        addProduct = await productApi.add(adminAuthToken, data);
      }

      if (addProduct) {
        if (addProduct.data.success === false) {
          ToastAlert({ msg: addProduct.data.message, msgType: 'error' });
        } else {
          if (addProduct.data.success === true) {
            resetForm();
            setUpdate(!update);
            ToastAlert({ msg: addProduct.data.message, msgType: 'success' });
          }
        }
      } else {
        ToastAlert({ msg: 'Product not save', msgType: 'error' });
      }
    } catch (errors) {
      // console.log(errors)
      // const formaerrror = {};
      if (errors.length) {
        errors.forEach((element) => {
          formaerror[element.field] = element.message;
        });
      } else {
        ToastAlert({ msg: 'Something Went Wrong', msgType: 'error' });
      }

      console.log({ errors, formaerror });
      setstate({
        ...state,
        error: formaerror
      });
    } finally {
      setLoading(false);
    }
  };


  const deleteProduct = (id) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to delete Product.',
      buttons: [
        {
          label: 'Cancel'
        },
        {
          label: 'Delete',
          onClick: async () => {
            setLoading(true);
            if (id !== '') {
              const deleteProductApi = await productApi.deleteProduct(adminAuthToken, id);
              if (deleteProductApi) {
                if (deleteProductApi.data.success === false) {
                  setLoading(false);
                  ToastAlert({ msg: deleteProductApi.data.message, msgType: 'error' });
                } else {
                  if (deleteProductApi.data.success === true) {
                    setLoading(false);
                    setUpdate(!update);
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

  const editProduct = async (productData) => {
    setLoading(true);
    if (productData && productData !== null && productData !== '') {
      console.log('editing product:', { productData });
      setModal(true);
      setstate({
        address: productData.address ?? '',
        brand: productData.brand,
        //campaignDetails: productData.campaignDetails,
        //categoryDetails: productData.categoryDetails,

        id: productData._id,
        status: productData.status,
        headline: productData.headline,
        category: productData.categoryId,
        subcategory: productData.subcategoryId,
        description: productData.description,
        price: productData.price,
        quantity: productData.quantity,
        organization: productData.organizationId,
        slug: productData.slug,
        needheadline: productData.needheadline,
        galleryUrl: productData.galleryUrl,

        media: productData.media,
        displayPrice: productData.displayPrice,

        unlimited: productData.unlimited,
        tax: productData.tax,
        postTag: productData.postTag,

        lat: productData.lat ? productData.lat : '',
        lng: productData.lng ? productData.lng : ''
      });

      if (productData.organizationId) {
        await orgProjectList(productData.organizationId);
      }

      if (productData.projectDetails.length > 0) {
        const tempProjectArray = productData.projectDetails.map((project) => {
          return project.projectId;
        });
        setSeletedProjectList(tempProjectArray);
      }

      if (productData.imageDetails.length > 0) {
        const tempMoreImgArray = productData.imageDetails.filter((img) => {
          return (img.type === 'moreImage');
        });
        setMoreImages(tempMoreImgArray);
      }

      if (productData.imageDetails.length > 0) {
        const tempGallaryImgArray = productData.imageDetails.filter((img) => {
          return (img.type === 'galleryImage');
        });
        setGallaryImages(tempGallaryImgArray);
      }

      if (productData.tags.length > 0) {
        const myTags = productData.tags.map((aadedTag) => {
          return {
            id: aadedTag,
            text: aadedTag,
          }
        });
        setTags(myTags);
      }

      setImg(productData.image);

      const getsubCategoryList = await categoryApi.listSubCategory(
        adminAuthToken,
        productData.categoryId
      );
      if (getsubCategoryList.data.success === true) {
        setSubCategoryList(getsubCategoryList.data.data);
      }
    } else {
      ToastAlert({
        msg: 'Something went wrong category data not found please try again',
        msgType: 'error'
      });
    }
    setLoading(false);
  };

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
    // console.log("The tag at index " + index + " was clicked");
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

  return (
    <>
      {/*<FrontLoader loading={loading} />*/}
      <Index
        openModel={openModel}
        productList={productList}
        deleteProduct={deleteProduct}
        editProduct={editProduct}
      />
      <AddProductForm
        stateData={state}
        setModal={setModal}
        modal={modal}
        changevalue={changevalue}
        handleOnDiscriptionChangeValue={handleOnDiscriptionChangeValue}
        changefile={changefile}
        categoryList={categoryList}
        subcategoryList={subcategoryList}
        tempImg={tempImg}
        submitProductForm={submitProductForm}
        campaignAdminList={campaignAdminList}
        Img={Img}
        projectList={projectList}
        onSelectProject={onSelectProject}
        seletedProjectList={seletedProjectList}
        isLoading={loading}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        handleDrag={handleDrag}
        handleTagClick={handleTagClick}
        onClearAll={onClearAll}
        onTagUpdate={onTagUpdate}
        tags={tags}
        moreTempImages={moreTempImages}
        gallaryTempImages={gallaryTempImages}
        gallaryImages={gallaryImages}
        moreImages={moreImages}
        setstate={setstate}
      />
    </>
  );
}
export default ProductController;
