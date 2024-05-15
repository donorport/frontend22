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


export default function Xp(props) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const adminAuthToken = localStorage.getItem('adminAuthToken');
    const adminData = JSON.parse(localStorage.getItem('adminData'));
    const [error, setError] = useState([])
    const [state, setState] = useState({
        topDonator: "",
        topDonation: "",
        forEachItem: "",
        forEachDonation: "",
        forEachShare: "",
        forEachOrganization: "",
    })
    const { topDonator, topDonation, forEachItem, forEachDonation, forEachShare, forEachOrganization } = state


    const saveXpSettings = async () => {

        const rules = {
            topDonator: "required",
            topDonation: "required",
            forEachItem: "required",
            forEachDonation: "required",
            forEachShare: "required",
            forEachOrganization: "required",

        }

        const message = {
            'topDonator.required': 'This Field is required.',
            'topDonation.required': 'This Field is required.',
            'forEachItem.required': 'This Field is required.',
            'forEachDonation.required': 'This Field is required.',
            'forEachShare.required': 'This Field is required.',
            'forEachOrganization.required': 'This Field is required.',
        }

        validateAll(state, rules, message).then(async () => {
            const formaerrror = {};
            setError(
                ...error,
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
     
            <Page title="XP | CMS">

                <Container>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h4" gutterBottom>
                            XP Settings
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
                            <label htmlFor="topDonator">A top donator + purchased items from every category, and all locations</label>
                            <div className="form-group row">
                                <div className="col-sm-12">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="topDonator"
                                            name="topDonator"
                                            value={topDonator}
                                            onChange={(e) => changevalue(e)}
                                        />
                                        <span className="input-group-addon11">
                                            XP
                                        </span>
                                    </div>
                                    {error && error.topDonator && <p className="error">{error ? error.topDonator ? error.topDonator : "" : ""}</p>}

                                </div>
                            </div>

                            <label htmlFor="topDonation">Have the top donation to an organization over $500</label>
                            <div className="form-group row">
                                <div className="col-sm-12">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="topDonation"
                                            name="topDonation"
                                            value={topDonation}
                                            onChange={(e) => changevalue(e)}
                                        />
                                        <span className="input-group-addon11">
                                            XP
                                        </span>
                                    </div>
                                    {error && error.topDonation && <p className="error">{error ? error.topDonation ? error.topDonation : "" : ""}</p>}

                                </div>
                            </div>


                            <label htmlFor="forEachItem">For each item you purchase</label>
                            <div className="form-group row">
                                <div className="col-sm-12">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="forEachItem"
                                            name="forEachItem"
                                            value={forEachItem}
                                            onChange={(e) => changevalue(e)}
                                        />
                                        <span className="input-group-addon11">
                                            XP
                                        </span>
                                    </div>
                                    {error && error.forEachItem && <p className="error">{error ? error.forEachItem ? error.forEachItem : "" : ""}</p>}

                                </div>
                            </div>


                            <label htmlFor="forEachDonation">For each donation to an Organization / Project</label>
                            <div className="form-group row">
                                <div className="col-sm-12">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="forEachDonation"
                                            name="forEachDonation"
                                            value={forEachDonation}
                                            onChange={(e) => changevalue(e)}
                                        />
                                        <span className="input-group-addon11">
                                            XP
                                        </span>
                                    </div>
                                    {error && error.forEachDonation && <p className="error">{error ? error.forEachDonation ? error.forEachDonation : "" : ""}</p>}

                                </div>
                            </div>



                            <label htmlFor="forEachShare">For each share of an item / Organization / Project via social media</label>
                            <div className="form-group row">
                                <div className="col-sm-12">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="forEachShare"
                                            name="forEachShare"
                                            value={forEachShare}
                                            onChange={(e) => changevalue(e)}
                                        />
                                        <span className="input-group-addon11">
                                            XP
                                        </span>
                                    </div>
                                    {error && error.forEachShare && <p className="error">{error ? error.forEachShare ? error.forEachShare : "" : ""}</p>}

                                </div>
                            </div>



                            <label htmlFor="forEachOrganization">For each Organization / Project you follow</label>
                            <div className="form-group row">
                                <div className="col-sm-12">
                                    <div className="input-group">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="forEachOrganization"
                                            name="forEachOrganization"
                                            value={forEachOrganization}
                                            onChange={(e) => changevalue(e)}
                                        />
                                        <span className="input-group-addon11">
                                            XP
                                        </span>
                                    </div>
                                    {error && error.forEachOrganization && <p className="error">{error ? error.forEachOrganization ? error.forEachOrganization : "" : ""}</p>}

                                </div>
                            </div>




                            <Button
                                variant="contained"
                                className="settingButton"
                                onClick={(e) => saveXpSettings()}
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