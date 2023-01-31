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
import CryptoJS from 'crypto-js';


export default function Email(props) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [update, setUpdate] = useState(false)
    const [hasPassword, setHasPassword] = useState(false)


    const adminAuthToken = localStorage.getItem('adminAuthToken');
    const adminData = JSON.parse(localStorage.getItem('adminData'));
    const [error, setError] = useState([])
    const [state, setState] = useState({
        host: "",
        port: "",
        secure: true,
        email: "",
        password: "",


    })
    const { host, port, secure, email, password } = state




    const saveEmailSettings = async () => {
        let rules;
        if (hasPassword) {
            rules = {
                host: "required",
                port: "required",
                email: "required",
                // password: "required", 

            }
        } else {
            rules = {
                host: "required",
                port: "required",
                email: "required",
                password: "required",

            }
        }


        const message = {
            'host.required': 'Host is Required.',
            'port.required': 'Port is Required.',
            'email.required': 'Email is Required.',
            'password.required': 'Password is Required.',

        }

        validateAll(state, rules, message).then(async () => {
            const formaerrror = {};
            setError(
                // ...error,
                formaerrror
            )

            setLoading(false)
            const saveSettingsValue = await settingApi.save(adminAuthToken, state);
            if (saveSettingsValue.data.success === true) {
                setLoading(false)
                setState({
                    ...state,
                    password:""
                })
                setUpdate(!update)
                ToastAlert({ msg: saveSettingsValue.data.message, msgType: 'success' });
            } else {
                setLoading(false)
            }

        }).catch(errors => {
            // console.log(errors)
            setLoading(false)
            const formaerrror = {};
            if (errors.length) {
                errors.forEach(element => {
                    formaerrror[element.field] = element.message
                });
            } else {
                ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
            }

            setError(
                // ...error,
                formaerrror
            )

        });

    }




    const changevalue = async (e) => {
        let value = e.target.value;

        if (e.target.name === 'port') {
            value = e.target.value.replace(/[^\d.]|\.(?=.*\.)/g, "");
        }
        setState({
            ...state,
            [e.target.name]: value
        })
    }


    useEffect(() => {
        (async () => {
            if (!hasPermission(adminData.roleName, 'SETTING')) {
                navigate('/admin/dashboard')
            }
            setLoading(false)
            const getSettingsValue = await settingApi.list(adminAuthToken, Object.keys(state));
            if (getSettingsValue.data.data.length > 0) {
                let data = {}

                getSettingsValue.data.data.map((d, i) => {

                    if (d.name !== 'password') {
                        data[d.name] = d.value
                    } else {
                        data[d.name] = null
                        if (d.value && d.value !== "" && d.value !== null) {
                            setHasPassword(true)
                        }
                        // let bytes = CryptoJS.AES.decrypt(d.value, 'my-secret-key@123');
                        // let decryptedData = bytes.toString(CryptoJS.enc.Utf8);
                        // console.log(decryptedData)
                    }


                })


                setState({
                    ...data
                })
            }
            setLoading(false)



        })()
    }, [update])



    return (
        <>
           {/*<FrontLoader loading={loading} />*/}
            <Page title="Email | Setting">

                <Container>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h4" gutterBottom>
                            Email Settings
                        </Typography>
                        <Button
                            variant="contained"
                            startIcon={<Icon icon={backfill} />}
                            onClick={() => navigate('/admin/setting')}
                        >
                            Back
                        </Button>
                    </Stack>
                    <Card>
                        <form className="mb-4 p-4">
                            <label htmlFor="headerLogo">Host</label>
                            <div className="form-group row">
                                <div className="col-sm-12">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="host"
                                        name="host"
                                        value={host}
                                        onChange={(e) => changevalue(e)}
                                    />

                                    {error && error.host && <p className="error">{error ? error.host ? error.host : "" : ""}</p>}

                                </div>

                            </div>

                            <label htmlFor="headerLogo">Port</label>
                            <div className="form-group row">
                                <div className="col-sm-12">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="port"
                                        name="port"
                                        value={port}
                                        onChange={(e) => changevalue(e)}
                                    />

                                    {error && error.port && <p className="error">{error ? error.port ? error.port : "" : ""}</p>}


                                </div>

                            </div>

                            <label htmlFor="headerLogo">Secure</label>
                            <div className="form-group row">
                                <div className="col-sm-12">
                                    <select className="form-control" onChange={(e) => changevalue(e)} id="secure" name="secure">
                                        <option selected={secure === "true"} value={true}>TRUE</option>
                                        <option selected={secure === "false"} value={false}>FALSE</option>
                                    </select>
                                </div>
                            </div>


                            <label htmlFor="headerLogo">Email</label>
                            <div className="form-group row">
                                <div className="col-sm-12">
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        name="email"
                                        value={email}
                                        onChange={(e) => changevalue(e)}
                                    />

                                    {error && error.email && <p className="error">{error ? error.email ? error.email : "" : ""}</p>}


                                </div>

                            </div>

                            <label htmlFor="headerLogo">Password</label>
                            <div className="form-group row">
                                <div className="col-sm-12">
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => changevalue(e)}
                                    />

                                    {error && error.password && <p className="error">{error ? error.password ? error.password : "" : ""}</p>}


                                </div>

                            </div>
                            <Button
                                variant="contained"
                                className="settingButton"
                                onClick={(e) => saveEmailSettings()}
                            >
                                Save
                            </Button>

                        </form>



                    </Card>
                </Container>
            </Page>

        </>
    )

}