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

export default function Currency(props) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const adminAuthToken = localStorage.getItem('adminAuthToken');
    const adminData = JSON.parse(localStorage.getItem('adminData'));
    const [state, setState] = useState({
        currency: "",
    })
    const { currency } = state


    const saveGenralSettings = async () => {
        setLoading(false)
        const saveSettingsValue = await settingApi.save(adminAuthToken, state);
        if (saveSettingsValue.data.success === true) {
            setLoading(false)
            ToastAlert({ msg: saveSettingsValue.data.message, msgType: 'success' });
        } else {
            setLoading(false)
        }

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
            <Page title="Setting |Currency">

                <Container>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h4" gutterBottom>
                            Currency Settings
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
                            <label htmlFor="headerLogo">Default Currency</label>
                            <div className="form-group row">
                                <div className="col-sm-12">
                                    {/* <input
                                        type="text"
                                        className="form-control"
                                        id="currency"
                                        name="currency"
                                        value={currency}
                                        onChange={(e) => changevalue(e)}
                                    /> */}
                                    <select className="form-control mt-1" onChange={(e) => { changevalue(e) }} id="currency" name="currency">
                                        <option selected={currency === 'USD' ? "selected" : ""} value="USD">USD</option>
                                        <option selected={currency === 'INR' ? "selected" : ""} value="INR">INR</option>
                                        <option selected={currency === 'CAD' ? "selected" : ""} value="CAD">CAD</option>
                                        <option selected={currency === 'EUR' ? "selected" : ""} value="EUR">EUR</option>
                                        <option selected={currency === 'GBP' ? "selected" : ""} value="GBP">GBP</option>
                                    </select>

                                    <p className="error">

                                    </p>

                                </div>

                            </div>
                            <Button
                                variant="contained"
                                className="settingButton"
                                onClick={(e) => saveGenralSettings()}
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