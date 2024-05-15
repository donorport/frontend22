import React, { useEffect, useState } from "react"
import { hasPermission } from "../../Common/Helper";
import { useNavigate } from 'react-router-dom';
import authApi from "../../Api/admin/auth";
import Index from "../../View/admin/Cms/Index";
import AddCmsForm from "../../View/admin/Cms/AddCmsForm";
//import FrontLoader from "../../Common/FrontLoader"
import { validateAll } from "indicative/validator";
import ToastAlert from "../../Common/ToastAlert"
import { confirmAlert } from "react-confirm-alert"
import cmsApi from "../../Api/admin/cms";


function CmsController() {
    const navigate = useNavigate();
    const adminData = JSON.parse(localStorage.getItem('adminData'));
    const adminAuthToken = localStorage.getItem('adminAuthToken');
    const [modal, setModal] = useState(false)
    const [cmsList, setCmsList] = useState([])
    const [loading, setLoading] = useState(false)
    const [update, setUpdate] = useState(false)
    const [state, setstate] = useState({
        id: '',
        status: 1,
        name: '',
        body: '',
        description: '',
        slug: '',
        error: [],
    })
    const { id, status, name, body, description, slug } = state

    useEffect(() => {
        (async () => {

            if (!hasPermission(adminData.roleName, 'SETTING')) {
                navigate('/admin/dashboard')
            }

            const verifyUser = await authApi.verifyToken(adminAuthToken)
            if (!verifyUser.data.success) {
                localStorage.clear()
                navigate('/admin/login')
            }
            setLoading(false)
            const getCmsPageList = await cmsApi.list(adminAuthToken);
            if (getCmsPageList.data.success === true) {
                setCmsList(getCmsPageList.data.data)
            }
            setLoading(false)
        })()
    }, [update])

    const changevalue = (e) => {
        let value = e.target.value;
        if (e.target.name === 'name') {
            if (id === "") {
                let name = value.toLowerCase();
                name = name.replace(/\s+/g, '-');
                setstate({
                    ...state,
                    slug: name,
                    [e.target.name]: value
                })
                return;
            }

            setstate({
                ...state,
                [e.target.name]: value
            });
            return;
            
        } 

        if (e.target.name === 'slug') {
            if (id !== "") {
                return;
            }

            let slug = value.toLowerCase();
            slug = slug.replace(/\s+/g, '-');
            setstate({
                ...state,
                slug: slug,
            });
            return;
        }

        setstate({
            ...state,
            [e.target.name]: value
        });
    }

    const resetForm = () => {
        setstate({
            ...state,
            id: '',
            status: 1,
            name: '',
            body: '',
            description: '',
            slug: '',
            error: [],
        });

    }

    const openModal = () => {
        resetForm()
        setModal(true);

    }

    const handleOnDiscriptionChangeValue = (e, field) => {
        setstate({
            ...state,
            [field]: e
        })
    }

    const submitCmsForm = () => {
        // console.log(status)
        let rules;
        if (id) {
            rules = {
                name: 'required',
                body: 'required',
                description: 'required',
            }
        } else {
            rules = {
                name: 'required',
                body: 'required',
                description: 'required',
                slug: 'required',

            }
        }

        const message = {
            'body.required': 'Body is required.',
            'name.required': 'page name is required.',
            'description.required': 'Description is required.',
            'slug.required': 'Slug is required.',

        }
        validateAll(state, rules, message).then(async () => {
            const formaerrror = {};
            setstate({
                ...state,
                error: formaerrror
            })

            let data = {}
            data.name = name
            data.description = description
            data.body = body
            data.status = status


            let addCms;

            setLoading(true)
            if (id !== '') {


                addCms = await cmsApi.updateCmsPage(adminAuthToken, data, id)
            } else {
                data.slug = slug
                addCms = await cmsApi.addCmsPage(adminAuthToken, data)
            }


            if (addCms) {
                if (addCms.data.success === false) {
                    setLoading(false)
                    ToastAlert({ msg: addCms.data.message, msgType: 'error' });

                } else {
                    if (addCms.data.success === true) {
                        resetForm()
                        setLoading(false)
                        setModal(false)
                        setUpdate(!update)
                        ToastAlert({ msg: addCms.data.message, msgType: 'success' });
                    }
                }
            } else {
                setLoading(false)
                ToastAlert({ msg: 'Cms not save', msgType: 'error' });
            }

        }).catch(errors => {
            setLoading(false)
            const formaerrror = {};
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

    const deleteCms = (id) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to delete Cms Page.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: (async () => {
                        setLoading(false)
                        if (id !== '') {
                            const deleteCms = await cmsApi.deleteCmsPage(adminAuthToken, id)
                            if (deleteCms) {
                                if (deleteCms.data.success === false) {
                                    setLoading(false)
                                    ToastAlert({ msg: deleteCms.data.message, msgType: 'error' });
                                } else {
                                    if (deleteCms.data.success === true) {
                                        setLoading(false)
                                        setUpdate(!update)
                                        ToastAlert({ msg: deleteCms.data.message, msgType: 'success' });
                                    }
                                }
                            } else {
                                setLoading(false)
                                ToastAlert({ msg: 'Cms Page not delete', msgType: 'error' });
                            }
                        } else {
                            setLoading(false)
                            ToastAlert({ msg: 'Cms Page not delete id Not found', msgType: 'error' });
                        }
                    })
                },
                {
                    label: 'No',
                    // onClick: () => alert('Click No')
                }
            ]
        });
    }

    const editCms = async (data) => {
        setLoading(false)
        if ((data) && data !== null && data !== '') {

            setModal(true);
            setstate({
                ...state,
                id: data._id,
                status: data.status,
                name: data.name,
                body: data.body,
                description: data.description,
                slug: data.slug,
                error: []


            });
            setLoading(false)
        } else {
            setLoading(false)
            ToastAlert({ msg: 'Something went wrong data not found please try again', msgType: 'error' });
        }
    }


    return (
        <>
           
            <Index
                openModal={openModal}
                cmsList={cmsList}
                deleteCms={deleteCms}
                editCms={editCms}
            />
            <AddCmsForm
                stateData={state}
                modal={modal}
                setModal={setModal}
                changevalue={changevalue}
                handleOnDiscriptionChangeValue={handleOnDiscriptionChangeValue}
                submitCmsForm={submitCmsForm}
            />
        </>
    )

}
export default CmsController
