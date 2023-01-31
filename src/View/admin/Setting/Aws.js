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


export default function Aws(props) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const adminAuthToken = localStorage.getItem('adminAuthToken');
    const adminData = JSON.parse(localStorage.getItem('adminData'));
    const [error, setError] = useState([])
    const [state, setState] = useState({
        awsAccessKeyId: "",
        awsSecretAccessKey: "",
        bucketName: ""


    })
    const { awsAccessKeyId, awsSecretAccessKey, bucketName } = state


    const savePaymentSettings = async () => {

        const rules = {
            awsAccessKeyId: "required",
            awsSecretAccessKey: "required",
            bucketName: "required",


        }

        const message = {
            'awsAccessKeyId.required': 'Access key is Required.',
            'awsSecretAccessKey.required': 'Secret key is Required.',
            'bucketName.required': 'Bucket name is Required.',


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
           {/*<FrontLoader loading={loading} />*/}
            <Page title="Payment | Minimal-UI">

                <Container>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h4" gutterBottom>
                            Aws S3 Bucket Settings
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
                            <label htmlFor="headerLogo">Secret AccessKey key</label>
                            <div className="form-group row">
                                <div className="col-sm-12">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="awsSecretAccessKey"
                                        name="awsSecretAccessKey"
                                        value={awsSecretAccessKey}
                                        onChange={(e) => changevalue(e)}
                                    />

                                    {error && error.awsSecretAccessKey && <p className="error">{error ? error.awsSecretAccessKey ? error.awsSecretAccessKey : "" : ""}</p>}

                                </div>

                            </div>

                            <label htmlFor="headerLogo">Access Key Id</label>
                            <div className="form-group row">
                                <div className="col-sm-12">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="awsAccessKeyId"
                                        name="awsAccessKeyId"
                                        value={awsAccessKeyId}
                                        onChange={(e) => changevalue(e)}
                                    />

                                    {error && error.awsAccessKeyId && <p className="error">{error ? error.awsAccessKeyId ? error.awsAccessKeyId : "" : ""}</p>}


                                </div>

                            </div>


                            <label htmlFor="headerLogo">Bucket Name</label>
                            <div className="form-group row">
                                <div className="col-sm-12">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="bucketName"
                                        name="bucketName"
                                        value={bucketName}
                                        onChange={(e) => changevalue(e)}
                                    />

                                    {error && error.bucketName && <p className="error">{error ? error.bucketName ? error.bucketName : "" : ""}</p>}


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