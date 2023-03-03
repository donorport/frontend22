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

import ToastAlert from '../../../Common/ToastAlert';
import { hasPermission } from '../../../Common/Helper';
import { validateAll } from "indicative/validator";
import CryptoJS from 'crypto-js';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";


export default function FooterLinks(props) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [update, setUpdate] = useState(false)
    const [hasPassword, setHasPassword] = useState(false)

    const setting_social_icon = {
        display: "-webkit-flex",
        width: "42px",
        height: "42px",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "9px",
        // color: "#fff",
        fontSize: "24px",
    }

    const instagramCss = {

        background: "radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)",
        "-webkit-background-clip": "text",
        /* Also define standard property for compatibility */
        backgroundClip: "text",
        " -webkit-text-fill-color": "transparent",

        fontSize: "50px", /* change this to change the size*/


    }



    const adminAuthToken = localStorage.getItem('adminAuthToken');
    const adminData = JSON.parse(localStorage.getItem('adminData'));
    const [error, setError] = useState([])
    const [state, setState] = useState({
        twitter: "",
        facebook: "",
        instagram: "",
        discord: "",
        footerEmail: "",


    })
    const { twitter, facebook, instagram, discord, footerEmail } = state




    const saveSettings = async () => {
        const rules = {
            twitter: "required",
            facebook: "required",
            instagram: "required",
            discord: "required",
            footerEmail: "required",


        }



        const message = {
            'twitter.required': 'Twitter is Required.',
            'facebook.required': 'Facebook is Required.',
            'instagram.required': 'Instagram is Required.',
            'discord.required': 'Discord is Required.',
            'footerEmail.required': 'Email is Required.',


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
                    password: ""
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
            <Page title="Social | Setting">

                <Container>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h4" gutterBottom>
                            Social Links Settings
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
                            <div className="form-group row">
                                <div className="col-sm-1">
                                    {/* <Icon icon='akar-icons:twitter-fill' style={{ ...setting_social_icon, color: "#1d9bf0" }} /> */}
                                    <Icon icon='logos:twitter' style={{ ...setting_social_icon }} />

                                    {/* <i className="fa-brands fa-twitter" style={{ ...setting_social_icon, backgroundColor: "#1d9bf0" }}></i> */}

                                </div>

                                <div className="col-sm-11">

                                    <div className="input-group">

                                        <input type="text" className="form-control" name='twitter' id="twitter" placeholder='Twitter' value={twitter} onChange={(e) => { changevalue(e) }} />

                                    </div>
                                    {error && error.twitter && <p className="error">{error ? error.twitter ? error.twitter : "" : ""}</p>}

                                </div>

                            </div>

                            <div className="form-group row">
                                <div className="col-sm-1">
                                    {/* <Icon icon='ant-design:facebook-filled' style={{ ...setting_social_icon, color: "#3b5998" }} /> */}
                                    <Icon icon='logos:facebook' style={{ ...setting_social_icon }} />


                                    {/* <i className="fa-brands fa-facebook-f" style={{ ...setting_social_icon, backgroundColor: "#3b5998" }}></i> */}
                                </div>

                                <div className="col-sm-11">

                                    <div className="input-group">

                                        <input type="text" className="form-control" name='facebook' id="facebook" placeholder='Facebook' value={facebook} onChange={(e) => { changevalue(e) }} />

                                    </div>
                                    {error && error.facebook && <p className="error">{error ? error.facebook ? error.facebook : "" : ""}</p>}

                                </div>

                            </div>


                            <div className="form-group row">
                                <div className="col-sm-1">
                                    {/* <i className="fa-brands fa-instagram-square" id='insta'></i> */}
                                    {/* <Icon icon="akar-icons:instagram-fill" style={{ ...setting_social_icon, color: "#d6249f" }} /> */}
                                    <Icon icon="ant-design:instagram-outlined"  style={{ ...setting_social_icon, color: "#fff", background: 'radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)'}} />

                                </div>

                                <div className="col-sm-11">

                                    <div className="input-group">

                                        <input type="text" className="form-control" name='instagram' id="instagram" placeholder='Instagram' value={instagram} onChange={(e) => { changevalue(e) }} />

                                    </div>
                                    {error && error.instagram && <p className="error">{error ? error.instagram ? error.instagram : "" : ""}</p>}

                                </div>

                            </div>

                            <div className="form-group row">
                                <div className="col-sm-1">
                                    {/* <i className="fa-brands fa-discord" style={{ ...setting_social_icon, backgroundColor: "#7289DA" }}></i> */}
                                    {/* <Icon icon="akar-icons:discord-fill"style={{ ...setting_social_icon, color: "#7289DA" }} /> */}
                                    <Icon icon="logos:discord-icon"style={{ ...setting_social_icon }} />

                                </div>

                                <div className="col-sm-11">

                                    <div className="input-group">

                                        <input type="text" className="form-control" name='discord' id="discord" placeholder='Discord' value={discord} onChange={(e) => { changevalue(e) }} />

                                    </div>
                                    {error && error.discord && <p className="error">{error ? error.discord ? error.discord : "" : ""}</p>}

                                </div>

                            </div>

                            <div className="form-group row">
                                <div className="col-sm-1">
                                    {/* <i className="fa-brands fa-discord" style={{ ...setting_social_icon, backgroundColor: "#7289DA" }}></i> */}
                                    {/* <i className="fa-solid fa-envelope" style={{ ...setting_social_icon, backgroundColor: "rgb(201, 44, 25)" }}></i> */}
                                    <Icon icon="logos:google-gmail"style={setting_social_icon} />
                                </div>

                                <div className="col-sm-11">

                                    <div className="input-group">

                                        <input type="text" className="form-control" name='footerEmail' id="footerEmail" placeholder='Email' value={footerEmail} onChange={(e) => { changevalue(e) }} />

                                    </div>
                                    {error && error.footerEmail && <p className="error">{error ? error.footerEmail ? error.footerEmail : "" : ""}</p>}

                                </div>

                            </div>


                            <Button
                                variant="contained"
                                className="settingButton"
                                onClick={(e) => saveSettings()}
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