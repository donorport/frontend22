import {
    Card,
    Table,
    Stack,
    Avatar,
    Button,
    Checkbox,
    TableRow,
    TableBody,
    TableCell,
    Container,
    Typography,
    TableContainer,
    TablePagination
} from '@mui/material';
import plusFill from '@iconify/icons-eva/plus-fill';
import trash from '@iconify/icons-eva/trash-2-fill';
import editfill from '@iconify/icons-eva/edit-fill';
import Label from '../../../components/Label';

import { Icon } from '@iconify/react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Page from '../../../components/Page';
import backfill from '@iconify/icons-eva/arrow-left-fill';
import settingApi from '../../../Api/admin/setting';
import React, { useEffect, useState } from 'react';
import FrontLoader from '../../../Common/FrontLoader';
import ToastAlert from '../../../Common/ToastAlert';
import { hasPermission } from '../../../Common/Helper';
import { validateAll } from "indicative/validator";
import planApi from '../../../Api/admin/plan';

export default function Plans(props) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const adminAuthToken = localStorage.getItem('adminAuthToken');
    const adminData = JSON.parse(localStorage.getItem('adminData'));
    const [changeBasic, setChangeBasic] = useState(false)
    const [changePro, setChangePro] = useState(false)
    const [changeEnterprise, setChangeEnterprise] = useState(false)
    const [basicError, setBasicError] = useState([])

    const [proError, setProError] = useState([])
    const [enterprisError, setEnterprisError] = useState([])


    const [basicData, setBasicData] = useState({
        name: "BASIC",
        price: "FREE",
        post: "",
        project: "",
        keywords: "",
        dashboardStats: false,
        prioritySupport: false,
    })

    const [proData, setProData] = useState({
        name: "PRO",
        price: "",
        post: "",
        project: "",
        keywords: "",
        dashboardStats: true,
        prioritySupport: false,
    })

    const [enterpriseData, setEnterpriseData] = useState({
        name: "ENTERPRISE",
        price: "",
        post: "",
        project: "",
        keywords: "",
        dashboardStats: false,
        prioritySupport: false,
    })

    const savePlans = async (PLAN) => {

        const rules = {
            price: "required",
            post: "required",
            project: "required",
            keywords: "required",


        }

        const message = {
            'price.required': 'price is Required.',
            'post.required': 'post is Required.',
            'project.required': 'project is Required.',
            'keywords.required': 'keywords is Required.',
        }

        validateAll(PLAN === 'basicData' ? basicData : PLAN === 'proData' ? proData : enterpriseData, rules, message).then(async () => {
            const formaerrror = {};
            let planName;
            if (PLAN === 'basicData') {
                planName = basicData
                setBasicError(
                    // ...basicError,
                    formaerrror
                )
            } else if (PLAN === 'proData') {
                planName = proData
                setProError(
                    // ...proError,
                    formaerrror
                )
            } else {
                planName = enterpriseData
                setEnterprisError(
                    // ...enterprisError,
                    formaerrror
                )
            }

            let data = {}
            data.name = planName.name
            data.price = planName.price
            data.post = planName.post
            data.project = planName.project
            data.keywords = planName.keywords
            data.dashboardStats = planName.dashboardStats
            data.prioritySupport = planName.prioritySupport

            setLoading(false)
            const saveBasicPlan = await planApi.save(adminAuthToken, data);
            if (saveBasicPlan.data.success === true) {
                setChangeBasic(false)
                setChangePro(false)
                setChangeEnterprise(false)
                setLoading(false)
                ToastAlert({ msg: saveBasicPlan.data.message, msgType: 'success' });
            } else {
                setLoading(false)
            }

        }).catch(errors => {
            console.log(errors)
            setLoading(false)
            const formaerrror = {};
            if (errors.length) {
                errors.forEach(element => {
                    formaerrror[element.field] = element.message
                });
            } else {
                ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
            }

            if (PLAN === 'basicData') {
                setBasicError(
                    // ...basicError,
                    formaerrror
                )
            } else if (PLAN === 'proData') {
                setProError(
                    // ...proError,
                    formaerrror
                )
            } else {
                setEnterprisError(
                    // ...enterprisError,
                    formaerrror
                )
            }

        });

    }


    const editPlan = (plan) => {

        setChangeBasic(plan === 'BASIC')
        setChangePro(plan === 'PRO')
        setChangeEnterprise(plan === 'ENTERPRISE')
        
    }



    const changevalue = async (e) => {
        let value = e.target.value;
        if (e.target.id === 'dashboardStats' || e.target.id === 'prioritySupport') {
            value = e.target.checked
        }
        if (e.target.name === 'BASIC') {

            setBasicData({
                ...basicData,
                [e.target.id]: value
            })
        } else if (e.target.name === 'PRO') {

            setProData({
                ...proData,
                [e.target.id]: value
            })
        } else {

            setEnterpriseData({
                ...enterpriseData,
                [e.target.id]: value
            })
        }

    }


    useEffect(() => {
        (async () => {
            if (!hasPermission(adminData.roleName, 'SETTING')) {
                navigate('/admin/dashboard')
            }
            setLoading(false)
            const getPlans = await planApi.list(adminAuthToken);

            if (getPlans.data.success) {
                // console.log(getPlans.data.data)
                if (getPlans.data.data.length > 0) {
                    getPlans.data.data.map((plan, i) => {
                        // console.log(plan)
                        if (plan.name === 'BASIC') {

                            setBasicData(
                                plan
                            )
                        } else if (plan.name === 'PRO') {

                            setProData(
                                plan
                            )
                        } else {

                            setEnterpriseData(
                                plan
                            )
                        }
                    })
                }

            }


            setLoading(false)



        })()
    }, [])

    function isNumber(n) { return !isNaN(parseFloat(n)) && !isNaN(n - 0) }



    return (
        <>
           {/*<FrontLoader loading={loading} />*/}
            <Page title="Plans | Minimal-UI">

                <Container>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h4" gutterBottom>
                            Plans Settings
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<Icon icon={backfill} />}
                            onClick={() => navigate('/admin/setting')}
                        >
                           Go To Back
                        </Button>
                    </Stack>
                    <Card>


                        <div className="p-5">
                            <div className="pricing-plan card-group d-flex">
                                <div className="card set-price p-1 ">
                                    <div className="card-header text-center pb-4 item" style={{ height: "210.2px", backgroundColor: "#f4f6f8" }}>
                                        <h5 className="pt-3 text-dark card-title">Plans</h5>
                                        <span className="h1 text-dark">Price</span>
                                        {/* <p className="small text-white">No VAT &amp; No Hidden Costs</p> */}

                                    </div>
                                    <div className="card-body d-flex flex-column">
                                        <ul className="list-unstyled text-right">
                                            <li>Post Times</li>
                                            <li>Create project</li>
                                            <li>Item keywords</li>
                                            <li>Dashboard Stats</li>
                                            <li>Priority Support</li>

                                        </ul>
                                    </div>
                                </div>

                                <div className="w-100 d-md-none mt-4"></div>

                                <div className="card p-1 starter">
                                    <div className="card-header text-center pb-4 item" style={{ height: "210.2px", backgroundColor: "#62c5ff" }}>
                                        <h5 className="pt-3 text-white card-title">Basic
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" viewBox="0 30 540 512"><path fill="white" d="M96.2 200.1C96.07 197.4 96 194.7 96 192C96 103.6 167.6 32 256 32C315.3 32 367 64.25 394.7 112.2C409.9 101.1 428.3 96 448 96C501 96 544 138.1 544 192C544 204.2 541.7 215.8 537.6 226.6C596 238.4 640 290.1 640 352C640 422.7 582.7 480 512 480H144C64.47 480 0 415.5 0 336C0 273.2 40.17 219.8 96.2 200.1z" /></svg>
                                        </h5>
                                        <span className="h1 text-white" style={{ fontSize: "xx-large" }}>
                                            {
                                                changeBasic ?
                                                    <input
                                                        type="text"
                                                        className="form-control mb-1"
                                                        id="price"
                                                        name="BASIC"
                                                        value={basicData.price}
                                                        onChange={(e) => changevalue(e)}
                                                    />
                                                    : !isNumber(basicData.price) ? basicData.price.toLocaleUpperCase() : '$' + basicData.price + '/mo'
                                                // : '$' + basicData.price + '/mo'
                                            }
                                            {/* Free */}
                                        </span>
                                        <p className="small text-white">NEW ACCOUNTS START HERE</p>
                                        <p className="small text-white">Free forever. Approved organizations can post and collect through Donorport</p>

                                    </div>
                                    <div className="card-body d-flex flex-column">

                                        <ul className="list-unstyled text-center">
                                            <li>
                                                {
                                                    changeBasic ?
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="post"
                                                            name="BASIC"
                                                            value={basicData.post}
                                                            onChange={(e) => changevalue(e)}
                                                        />
                                                        : basicData.post
                                                }

                                                {basicError && basicError.post && <p className="error">{basicError ? basicError.post ? basicError.post : "" : ""}</p>}
                                            </li>

                                            <li>
                                                {
                                                    changeBasic ?
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="project"
                                                            name="BASIC"
                                                            value={basicData.project}
                                                            onChange={(e) => changevalue(e)}
                                                        />
                                                        : basicData.project
                                                }

                                                {basicError && basicError.project && <p className="error">{basicError ? basicError.project ? basicError.project : "" : ""}</p>}
                                            </li>

                                            <li>
                                                {
                                                    changeBasic ?
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="keywords"
                                                            name="BASIC"
                                                            value={basicData.keywords}
                                                            onChange={(e) => changevalue(e)}
                                                        />
                                                        : basicData.keywords
                                                }
                                                {basicError && basicError.keywords && <p className="error">{basicError ? basicError.keywords ? basicError.keywords : "" : ""}</p>}
                                            </li>

                                            <li>
                                                {
                                                    changeBasic ?
                                                        <label className="--switch mt-1">
                                                            <input type="checkbox" id="dashboardStats" checked={basicData.dashboardStats} name="BASIC" onChange={(e) => changevalue(e)} />
                                                            <span className="--slider">
                                                                <i className="fa fa-check"></i>
                                                                <i className="fa fa-times"></i>
                                                            </span>
                                                        </label>

                                                        :
                                                        basicData.dashboardStats ? <i className="fa fa-check" data-unicode="f00c"></i> :
                                                            <i className="fa fa-times" data-unicode="f00c"></i>
                                                }


                                            </li>
                                            <li>
                                                {
                                                    changeBasic ?
                                                        <label className="--switch mt-1">
                                                            <input type="checkbox" id="prioritySupport" checked={basicData.prioritySupport} name="BASIC" onChange={(e) => changevalue(e)} />
                                                            <span className="--slider">
                                                                <i className="fa fa-check"></i>
                                                                <i className="fa fa-times"></i>
                                                            </span>
                                                        </label>

                                                        :
                                                        basicData.prioritySupport ? <i className="fa fa-check" data-unicode="f00c"></i> :
                                                            <i className="fa fa-times" data-unicode="f00c"></i>
                                                }

                                            </li>

                                        </ul>
                                        {
                                            changeBasic ?
                                                <button className="btn btn-lg btn-block  mt-auto" onClick={() => savePlans('basicData')}>Save</button>
                                                :
                                                <button className="btn btn-lg btn-block  mt-auto" onClick={() => editPlan('BASIC')}>Change</button>
                                        }
                                        {/* <button className="btn btn-lg btn-block  mt-auto" onClick={() => setChangeBasic(true)}>Change</button> */}

                                    </div>
                                </div>

                                <div className="w-100 d-md-none mt-4"></div>

                                <div className="card advanced p-1">
                                    <div className="card-header text-center pb-4 item" style={{ height: "210.2px", backgroundColor: "#ffb62f" }}>
                                        <h5 className="pt-3 text-white card-title">Pro
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" viewBox="0 30 540 512"><path fill="white" d="M223.7 130.8L149.1 7.77C147.1 2.949 141.9 0 136.3 0H16.03c-12.95 0-20.53 14.58-13.1 25.18l111.3 158.9C143.9 156.4 181.7 137.3 223.7 130.8zM256 160c-97.25 0-176 78.75-176 176S158.8 512 256 512s176-78.75 176-176S353.3 160 256 160zM348.5 317.3l-37.88 37l8.875 52.25c1.625 9.25-8.25 16.5-16.63 12l-46.88-24.62L209.1 418.5c-8.375 4.5-18.25-2.75-16.63-12l8.875-52.25l-37.88-37C156.6 310.6 160.5 299 169.9 297.6l52.38-7.625L245.7 242.5c2-4.25 6.125-6.375 10.25-6.375S264.2 238.3 266.2 242.5l23.5 47.5l52.38 7.625C351.6 299 355.4 310.6 348.5 317.3zM495.1 0H375.7c-5.621 0-10.83 2.949-13.72 7.77l-73.76 122.1c42 6.5 79.88 25.62 109.5 53.38l111.3-158.9C516.5 14.58 508.9 0 495.1 0z" /></svg>
                                        </h5>
                                        <span className="h1 text-white" style={{ fontSize: "xx-large" }}>
                                            {
                                                changePro ?
                                                    <input
                                                        type="text"
                                                        className="form-control mb-1"
                                                        id="price"
                                                        name="PRO"
                                                        value={proData.price}
                                                        onChange={(e) => changevalue(e)}
                                                    />
                                                    : '$' + proData.price + '/mo'
                                            }

                                        </span>
                                        {proError && proError.price && <p className="error">{proError ? proError.price ? proError.price : "" : ""}</p>}

                                        <p className="small text-white">PER MONTH BILLED ANNUALLY</p>
                                        <p className="small text-white">Pro plans are for organizations looking to</p>

                                    </div>
                                    <div className="card-body d-flex flex-column">
                                        <ul className="list-unstyled text-center">
                                            <li>
                                                {
                                                    changePro ?
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="post"
                                                            name="PRO"
                                                            value={proData.post}
                                                            onChange={(e) => changevalue(e)}
                                                        />
                                                        : proData.post
                                                }
                                                {proError && proError.post && <p className="error">{proError ? proError.post ? proError.post : "" : ""}</p>}


                                            </li>
                                            <li>
                                                {
                                                    changePro ?
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="project"
                                                            name="PRO"
                                                            value={proData.project}
                                                            onChange={(e) => changevalue(e)}
                                                        />
                                                        : proData.project
                                                }
                                                {proError && proError.project && <p className="error">{proError ? proError.project ? proError.project : "" : ""}</p>}

                                            </li>
                                            <li>
                                                {
                                                    changePro ?
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="keywords"
                                                            name="PRO"
                                                            value={proData.keywords}
                                                            onChange={(e) => changevalue(e)}
                                                        />
                                                        : proData.keywords
                                                }
                                                {proError && proError.keywords && <p className="error">{proError ? proError.keywords ? proError.keywords : "" : ""}</p>}

                                            </li>
                                            <li>
                                                {
                                                    changePro ?
                                                        <label className="--switch mt-1">
                                                            <input type="checkbox" id="dashboardStats" checked={proData.dashboardStats} name="PRO" onChange={(e) => changevalue(e)} />
                                                            <span className="--slider">
                                                                <i className="fa fa-check"></i>
                                                                <i className="fa fa-times"></i>
                                                            </span>
                                                        </label>

                                                        :
                                                        proData.dashboardStats ? <i className="fa fa-check" data-unicode="f00c"></i> :
                                                            <i className="fa fa-times" data-unicode="f00c"></i>
                                                }


                                            </li>
                                            <li>
                                                {
                                                    changePro ?
                                                        <label className="--switch mt-1">
                                                            <input type="checkbox" id="prioritySupport" checked={proData.prioritySupport} name="PRO" onChange={(e) => changevalue(e)} />
                                                            <span className="--slider">
                                                                <i className="fa fa-check"></i>
                                                                <i className="fa fa-times"></i>
                                                            </span>
                                                        </label>

                                                        :
                                                        proData.prioritySupport ? <i className="fa fa-check" data-unicode="f00c"></i> :
                                                            <i className="fa fa-times" data-unicode="f00c"></i>
                                                }

                                            </li>

                                        </ul>
                                        {
                                            changePro ?
                                                <button className="btn btn-lg btn-block  mt-auto" onClick={() => savePlans('proData')}>Save</button>
                                                :
                                                <button className="btn btn-lg btn-block  mt-auto" onClick={() => editPlan('PRO')}>Change</button>
                                        }

                                    </div>
                                </div>

                                <div className="w-100 d-md-none mt-4"></div>

                                <div className="card business p-1">
                                    <div className="card-header text-center pb-4 item" style={{ height: "210.2px", backgroundColor: "#10db65" }}>
                                        <h5 className="pt-3 text-white card-title">Enterprise
                                            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" viewBox="0 30 540 512"><path fill="white" d="M480 192H592C618.5 192 640 213.5 640 240V464C640 490.5 618.5 512 592 512H48C21.49 512 0 490.5 0 464V144C0 117.5 21.49 96 48 96H64V24C64 10.75 74.75 0 88 0C101.3 0 112 10.75 112 24V96H176V24C176 10.75 186.7 0 200 0C213.3 0 224 10.75 224 24V96H288V48C288 21.49 309.5 0 336 0H432C458.5 0 480 21.49 480 48V192zM576 368C576 359.2 568.8 352 560 352H528C519.2 352 512 359.2 512 368V400C512 408.8 519.2 416 528 416H560C568.8 416 576 408.8 576 400V368zM240 416C248.8 416 256 408.8 256 400V368C256 359.2 248.8 352 240 352H208C199.2 352 192 359.2 192 368V400C192 408.8 199.2 416 208 416H240zM128 368C128 359.2 120.8 352 112 352H80C71.16 352 64 359.2 64 368V400C64 408.8 71.16 416 80 416H112C120.8 416 128 408.8 128 400V368zM528 256C519.2 256 512 263.2 512 272V304C512 312.8 519.2 320 528 320H560C568.8 320 576 312.8 576 304V272C576 263.2 568.8 256 560 256H528zM256 176C256 167.2 248.8 160 240 160H208C199.2 160 192 167.2 192 176V208C192 216.8 199.2 224 208 224H240C248.8 224 256 216.8 256 208V176zM80 160C71.16 160 64 167.2 64 176V208C64 216.8 71.16 224 80 224H112C120.8 224 128 216.8 128 208V176C128 167.2 120.8 160 112 160H80zM256 272C256 263.2 248.8 256 240 256H208C199.2 256 192 263.2 192 272V304C192 312.8 199.2 320 208 320H240C248.8 320 256 312.8 256 304V272zM112 320C120.8 320 128 312.8 128 304V272C128 263.2 120.8 256 112 256H80C71.16 256 64 263.2 64 272V304C64 312.8 71.16 320 80 320H112zM416 272C416 263.2 408.8 256 400 256H368C359.2 256 352 263.2 352 272V304C352 312.8 359.2 320 368 320H400C408.8 320 416 312.8 416 304V272zM368 64C359.2 64 352 71.16 352 80V112C352 120.8 359.2 128 368 128H400C408.8 128 416 120.8 416 112V80C416 71.16 408.8 64 400 64H368zM416 176C416 167.2 408.8 160 400 160H368C359.2 160 352 167.2 352 176V208C352 216.8 359.2 224 368 224H400C408.8 224 416 216.8 416 208V176z" /></svg>
                                        </h5>
                                        <span className="h1 text-white" style={{ fontSize: "xx-large" }}>
                                            {
                                                changeEnterprise ?
                                                    <input
                                                        type="text"
                                                        className="form-control mb-1"
                                                        id="price"
                                                        name="ENTERPRISE"
                                                        value={enterpriseData.price}
                                                        onChange={(e) => changevalue(e)}
                                                    />
                                                    : '$' + enterpriseData.price + '/mo'
                                            }


                                        </span>
                                        {enterprisError && enterprisError.price && <p className="error">{enterprisError ? enterprisError.price ? enterprisError.price : "" : ""}</p>}
                                        <p className="small text-white">PER MONTH BILLED ANNUALLY</p>
                                        <p className="small text-white">VIP lets you have more control over your posts and offers your greatest bargain</p>

                                    </div>
                                    <div className="card-body d-flex flex-column">
                                        <ul className="list-unstyled text-center">

                                            <li>
                                                {
                                                    changeEnterprise ?
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="post"
                                                            name="ENTERPRISE"
                                                            value={enterpriseData.post}
                                                            onChange={(e) => changevalue(e)}
                                                        />
                                                        : enterpriseData.post
                                                }
                                                {enterprisError && enterprisError.post && <p className="error">{enterprisError ? enterprisError.post ? enterprisError.post : "" : ""}</p>}


                                            </li>
                                            <li>
                                                {
                                                    changeEnterprise ?
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="project"
                                                            name="ENTERPRISE"
                                                            value={enterpriseData.project}
                                                            onChange={(e) => changevalue(e)}
                                                        />
                                                        : enterpriseData.project
                                                }
                                                {enterprisError && enterprisError.project && <p className="error">{enterprisError ? enterprisError.project ? enterprisError.project : "" : ""}</p>}
                                            </li>
                                            <li>
                                                {
                                                    changeEnterprise ?
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="keywords"
                                                            name="ENTERPRISE"
                                                            value={enterpriseData.keywords}
                                                            onChange={(e) => changevalue(e)}
                                                        />
                                                        : enterpriseData.keywords
                                                }
                                                {enterprisError && enterprisError.keywords && <p className="error">{enterprisError ? enterprisError.keywords ? enterprisError.keywords : "" : ""}</p>}
                                            </li>
                                            <li>
                                                {
                                                    changeEnterprise ?
                                                        <label className="--switch mt-1">
                                                            <input type="checkbox" name="ENTERPRISE" checked={enterpriseData.dashboardStats} id="dashboardStats" onChange={(e) => changevalue(e)} />
                                                            <span className="--slider">
                                                                <i className="fa fa-check"></i>
                                                                <i className="fa fa-times"></i>
                                                            </span>
                                                        </label>

                                                        :

                                                        enterpriseData.dashboardStats ? <i className="fa fa-check" data-unicode="f00c"></i> :
                                                            <i className="fa fa-times" data-unicode="f00c"></i>


                                                }


                                            </li>
                                            <li>
                                                {
                                                    changeEnterprise ?
                                                        <label className="--switch mt-1">
                                                            <input type="checkbox" name="ENTERPRISE" id="prioritySupport" checked={enterpriseData.prioritySupport ? true : false} onChange={(e) => changevalue(e)} />
                                                            <span className="--slider">
                                                                <i className="fa fa-check"></i>
                                                                <i className="fa fa-times"></i>
                                                            </span>
                                                        </label>

                                                        :
                                                        enterpriseData.prioritySupport ? <i className="fa fa-check" data-unicode="f00c"></i> :
                                                            <i className="fa fa-times" data-unicode="f00c"></i>
                                                }

                                            </li>
                                        </ul>
                                        {
                                            changeEnterprise ?
                                                <button className="btn btn-lg btn-block  mt-auto" onClick={() => savePlans('enterpriseData')}>Save</button>
                                                :
                                                <button className="btn btn-lg btn-block  mt-auto" onClick={() => editPlan('ENTERPRISE')}>Change</button>
                                        }


                                    </div>
                                </div>
                            </div>
                        </div>




                    </Card>
                </Container>
            </Page>

        </>
    )

}