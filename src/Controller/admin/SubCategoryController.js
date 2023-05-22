import Index from '../../View/admin/Category/SubCategory/Index';
import categoryApi from '../../Api/admin/category';
//import FrontLoader from "../../Common/FrontLoader"
import { validateAll } from 'indicative/validator';
import ToastAlert from '../../Common/ToastAlert';
import { confirmAlert } from 'react-confirm-alert';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AddSubCategoryForm from '../../View/admin/Category/SubCategory/AddSubCategoryForm';
import { hasPermission } from '../../Common/Helper';

function SubCategoryController() {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subcategory, setSubCategory] = useState([]);
  const [iconList, setIconList] = useState([]);
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState('');

  const params = useParams();
  let categoryId = params.id;

  const adminAuthToken = localStorage.getItem('adminAuthToken');
  const adminData = JSON.parse(localStorage.getItem('adminData'));

  const [state, setstate] = useState({
    subcategoryHdnID: '',
    status: 1,
    name: '',
    icon: '',
    error: []
  });
  const { status, name, categoryHdnID, icon } = state;

  useEffect(() => {
    (async () => {
      setLoading(false);

      if (!hasPermission(adminData.roleName, 'CATEGORY')) {
        navigate('/admin/dashboard');
      }

      const subCategoryList = await categoryApi.listSubCategory(adminAuthToken, categoryId);
      if (subCategoryList.data.success === true) {
        setCategoryName(subCategoryList.data.categoryName);
        setSubCategory(subCategoryList.data.data);
      }
      // const getIconList = await categoryApi.listIcon(adminAuthToken);
      // if (getIconList.data.success === true) {
      //     setIconList(getIconList.data.data)
      // }
      setLoading(false);
    })();
  }, [update]);

  useEffect(() => {
    (async () => {
      // setLoading(false)
      // const getIconList = await categoryApi.listIcon(adminAuthToken);
      // if (getIconList.data.success === true) {
      //     setIconList(getIconList.data.data)
      // }
      // setLoading(false)
    })();
  }, []);

  const changevalue = (e) => {
    let value = e.target.value;
    setstate({
      ...state,
      [e.target.name]: value
    });
  };

  const resetForm = () => {
    setModal(false);
    setstate({
      categoryHdnID: '',
      status: 1,
      categoryName: '',
      icon: '',
      error: []
    });
  };
  const openModel = () => {
    setModal(true);
    setstate({
      categoryHdnID: '',
      status: 1,
      name: '',
      icon: '',
      error: []
    });
  };

  const submitSubCategoryForm = () => {
    // console.log(status)
    const rules = {
      name: 'required',
      status: 'required',
      icon: 'required'
    };
    const message = {
      'status.required': 'Status is Required.',
      'name.required': 'Category name is Required.',
      'icon.required': 'Category Icon is Required.'
    };
    validateAll(state, rules, message)
      .then(async () => {
        const formaerrror = {};
        setstate({
          ...state,
          error: formaerrror
        });

        let data = {};
        data.name = name;
        data.icon = icon;
        data.status = status;
        data.categoryId = categoryId;

        let addSubCategory;
        // Api Call for update Profile
        setLoading(false);
        if (categoryHdnID !== '') {
          addSubCategory = await categoryApi.updateSubCategory(adminAuthToken, data, categoryHdnID);
        } else {
          addSubCategory = await categoryApi.addSubCategory(adminAuthToken, data);
        }

        if (addSubCategory) {
          if (addSubCategory.data.success === false) {
            setLoading(false);
            ToastAlert({ msg: addSubCategory.data.message, msgType: 'error' });
          } else {
            if (addSubCategory.data.success === true) {
              resetForm();
              setLoading(false);
              setUpdate(!update);
              ToastAlert({ msg: addSubCategory.data.message, msgType: 'success' });
            }
          }
        } else {
          setLoading(false);
          ToastAlert({ msg: 'Category not save', msgType: 'error' });
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
          ToastAlert({ msg: 'Something Went Wrong', msgType: 'error' });
        }

        setstate({
          ...state,
          error: formaerrror
        });
      });
  };

  const deleteSubCategory = (id) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to delete subcategory.',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            setLoading(false);
            if (id !== '') {
              const deleteCategoryApi = await categoryApi.deleteSubCategory(adminAuthToken, id);
              if (deleteCategoryApi) {
                if (deleteCategoryApi.data.success === false) {
                  setLoading(false);
                  ToastAlert({ msg: deleteCategoryApi.data.message, msgType: 'error' });
                } else {
                  if (deleteCategoryApi.data.success === true) {
                    setLoading(false);
                    setUpdate(!update);
                    ToastAlert({ msg: deleteCategoryApi.data.message, msgType: 'success' });
                  }
                }
              } else {
                setLoading(false);
                ToastAlert({ msg: 'Category not delete', msgType: 'error' });
              }
            } else {
              setLoading(false);
              ToastAlert({ msg: 'Category not delete id Not found', msgType: 'error' });
            }
          }
        },
        {
          label: 'No'
          // onClick: () => alert('Click No')
        }
      ]
    });
  };

  const editSubCategory = async (categoryData) => {
    // console.log(categoryData)
    setLoading(false);
    if (categoryData && categoryData !== null && categoryData !== '') {
      // setUpdateModalTitle(true);
      setModal(true);
      setstate({
        ...state,
        categoryHdnID: categoryData._id,
        status: categoryData.status,
        name: categoryData.name,
        icon: categoryData.icon
      });
      setLoading(false);
    } else {
      setLoading(false);
      ToastAlert({
        msg: 'Something went wrong category data not found please try again',
        msgType: 'error'
      });
    }
  };

  // const viewSubCategory = (id) => {
  //     navigate('/admin/category/subcategory/' + id)
  // }
  return (
    <>
      {/*<FrontLoader loading={loading} />*/}
      <Index
        openModel={openModel}
        navigate={navigate}
        categoryName={categoryName}
        subcategory={subcategory}
        editSubCategory={editSubCategory}
        deleteSubCategory={deleteSubCategory}
      />
      <AddSubCategoryForm
        setModal={setModal}
        modal={modal}
        stateData={state}
        changevalue={changevalue}
        iconList={iconList}
        submitSubCategoryForm={submitSubCategoryForm}
      />
    </>
  );
}
export default SubCategoryController;
