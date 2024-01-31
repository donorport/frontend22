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


export default function Payment(props) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const adminAuthToken = localStorage.getItem('adminAuthToken');
    const adminData = JSON.parse(localStorage.getItem('adminData'));
    const [error, setError] = useState([])
    const [state, setState] = useState({
        publishableKey: "",
        secretKey: "",
        currency: ""

    })
    const { publishableKey, secretKey, currency } = state


    const savePaymentSettings = async () => {

        const rules = {
            publishableKey: "required",
            secretKey: "required",
            currency: "required",


        }

        const message = {
            'publishableKey.required': 'Publishable key is required.',
            'secretKey.required': 'Secret key is required.',
            'currency.required': 'Currency is required.',


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
                ToastAlert({ msg: saveSettingsValue.data.message, msgType: 'success' });
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

            setError(
                // ...error,
                formaerrror
            )

        });

    }




    const changevalue = async (e) => {
        let value = e.target.value;
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
                    data[d.name] = d.value
                })

                setState({
                    ...data
                })
            }
            setLoading(false)



        })()
    }, [])



    return (
        <>
           {/*<FrontLoader loading={loading} />*/}
            <Page title="Payment | CMS">

                <Container>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h4" gutterBottom>
                            Payment Settings
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
                        <form className="mb-4 p-4 d-flex flex-column gap-2 justify-content-start">
                            <label htmlFor="headerLogo"> Stripe Secret key</label>
                            <div className="form-group row">
                                <div className="col-sm-12 mt-1">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="secretKey"
                                        name="secretKey"
                                        value={secretKey}
                                        onChange={(e) => changevalue(e)}
                                    />

                                    {error && error.secretKey && <p className="error">{error ? error.secretKey ? error.secretKey : "" : ""}</p>}

                                </div>

                            </div>

                            <label htmlFor="headerLogo"> Stripe Publishable key</label>
                            <div className="form-group row">
                                <div className="col-sm-12 mt-1">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="publishableKey"
                                        name="publishableKey"
                                        value={publishableKey}
                                        onChange={(e) => changevalue(e)}
                                    />

                                    {error && error.publishableKey && <p className="error">{error ? error.publishableKey ? error.publishableKey : "" : ""}</p>}


                                </div>

                            </div>

                            <label htmlFor="headerLogo">Default Currency</label>
                            <div className="form-group row">
                                <div className="col-sm-12">

                                    <select className="form-control mt-1" onChange={(e) => { changevalue(e) }} id="currency" name="currency">
                                        <option selected disabled value="">Select Default Currency</option>
                                        <option selected={currency === 'USD' ? "selected" : ""} value="USD">USD</option>
                                        <option selected={currency === 'INR' ? "selected" : ""} value="INR">INR</option>
                                        <option selected={currency === 'CAD' ? "selected" : ""} value="CAD">CAD</option>
                                        <option selected={currency === 'EUR' ? "selected" : ""} value="EUR">EUR</option>
                                        <option selected={currency === 'GBP' ? "selected" : ""} value="GBP">GBP</option>
                                    </select>

                                    {error && error.currency && <p className="error">{error ? error.currency ? error.currency : "" : ""}</p>}

                                </div>

                            </div>
                            <Button
                                variant="contained"
                                className="settingButton"
                                onClick={(e) => savePaymentSettings()}
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