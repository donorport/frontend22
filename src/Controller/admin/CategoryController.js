import React, { useState, useEffect } from 'react';
//import FrontLoader from "../../Common/FrontLoader"
import { validateAll } from 'indicative/validator';
import ToastAlert from '../../Common/ToastAlert';
import { confirmAlert } from 'react-confirm-alert';
import { 
  //Link as RouterLink, 
  useNavigate, 
  //useParams, 
  //useLocation 
} from 'react-router-dom';
import Index from '../../View/admin/Category/Index';
import categoryApi from '../../Api/admin/category';
import AddCategoryForm from '../../View/admin/Category/AddCategoryForm';
import { hasPermission } from '../../Common/Helper';
import authApi from '../../Api/admin/auth';

function CategoryController() {
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [iconList, setIconList] = useState([]);
  const [update, setUpdate] = useState(false);
  const navigate = useNavigate();

  const adminAuthToken = localStorage.getItem('adminAuthToken');
  const adminData = JSON.parse(localStorage.getItem('adminData'));

  const [state, setstate] = useState({
    categoryHdnID: '',
    status: 1,
    name: '',
    icon: '',
    color: '#ff0000',
    error: []
  });
  const { status, name, categoryHdnID, icon, color } = state;

  useEffect(() => {
    (async () => {
      if (!hasPermission(adminData.roleName, 'CATEGORY')) {
        navigate('/admin/dashboard');
      }
      const verifyUser = await authApi.verifyToken(adminAuthToken);
      if (!verifyUser.data.success) {
        localStorage.clear();
        navigate('/admin/login');
      }

      setLoading(false);
      const categoryList = await categoryApi.listCategory(adminAuthToken);
      if (categoryList.data.success === true) {
        setCategory(categoryList.data.data);
      }
      // const getIconList = await categoryApi.listIcon(adminAuthToken);
      // if (getIconList.data.success === true) {
      //     setIconList(getIconList.data.data)
      // }
      setLoading(false);
    })();
  }, [update]);

  const changevalue = (e) => {
    let value = e.target.value;
    setstate({
      ...state,
      [e.target.name]: value
    });
  };

  const resetForm = () => { // e
    setModal(false);
    setstate({
      categoryHdnID: '',
      status: 1,
      name: '',
      icon: '',
      error: []
    });
  };
  const openModel = () => {
    setModal(true);
    setstate({
      ...state,
      categoryHdnID: '',
      status: 1,
      name: '',
      icon: '',
      error: [],
      color: '#ff0000'
    });
  };

  const submitCategoryForm = () => { // e
    // console.log(status)
    const rules = {
      name: 'required',
      status: 'required',
      icon: 'required'
    };
    const message = {
      'status.required': 'Status is required.',
      'name.required': 'Category name is required.',
      'icon.required': 'Category Icon is required.'
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
        data.color = color;

        let addCategory;
        // Api Call for update Profile
        setLoading(false);
        if (categoryHdnID !== '') {
          addCategory = await categoryApi.updateCategory(adminAuthToken, data, categoryHdnID);
        } else {
          addCategory = await categoryApi.addCategory(adminAuthToken, data);
        }

        if (addCategory) {
          if (addCategory.data.success === false) {
            setLoading(false);
            ToastAlert({ msg: addCategory.data.message, msgType: 'error' });
          } else {
            if (addCategory.data.success === true) {
              resetForm();
              setLoading(false);
              setUpdate(!update);
              ToastAlert({ msg: addCategory.data.message, msgType: 'success' });
            }
          }
        } else {
          setLoading(false);
          ToastAlert({ msg: 'Category not save', msgType: 'error' });
        }
      })
      .catch((errors) => {
        console.log(errors);
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

  const deleteCategory = (id) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to delete category.',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            setLoading(false);
            if (id !== '') {
              const deleteCategoryApi = await categoryApi.deleteCategory(adminAuthToken, id);
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

  const editCategory = async (categoryData) => {
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
        icon: categoryData.icon,
        color: categoryData.color
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

  const viewSubCategory = (id) => {
    navigate('/admin/category/subcategory/' + id);
  };

  return (
    <>


      <Index
        category={category}
        openModel={openModel}
        editCategory={editCategory}
        deleteCategory={deleteCategory}
        viewSubCategory={viewSubCategory}
      />
      <AddCategoryForm
        setModal={setModal}
        modal={modal}
        stateData={state}
        changevalue={changevalue}
        submitCategoryForm={submitCategoryForm}
        iconList={iconList}
      />
    </>
  );
}
export default CategoryController;
