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


export default function PricingFees(props) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const adminAuthToken = localStorage.getItem('adminAuthToken');
    const adminData = JSON.parse(localStorage.getItem('adminData'));
    const [error, setError] = useState([])
    const [state, setState] = useState({
        platformFee: 0,
        transectionFee: 0,

    })
    const { platformFee, transectionFee } = state

    const [changePlatform, setChangePlatform] = useState(false)
    const [changeTransaction, setChangeTransaction] = useState(false)
    const [totalFees, setTotalFees] = useState(Number(platformFee) + Number(transectionFee))
    const [update, setUpdate] = useState(false)

    const [pf, setPf] = useState(0)
    const [tf, setTf] = useState(0)




    const editPrice = (type) => {
        setError([])
        setState({
            ...state,
            platformFee: pf,
            transectionFee: tf
        })
        setChangePlatform(type === 'PLATFORM')
        setChangeTransaction(type === 'TRANSECTION')

    }

    const savePricingFeeSettings = async (type) => {
        let rules;
        if (type === 'PLATFORM') {
            rules = {

                platformFee: "required",
            }
        } else {
            rules = {
                transectionFee: "required",
            }
        }
        // const rules = {
        //     platformFee: "required",
        //     transectionFee: "required",

        // }

        const message = {
            'platformFee.required': 'Platform Fee is Required.',
            'transectionFee.required': 'STransection Fee is Required.',

        }

        validateAll(state, rules, message).then(async () => {
            const formaerrror = {};
            setError(
                ...error,
                formaerrror
            )

            setLoading(true)
            const saveSettingsValue = await settingApi.save(adminAuthToken, state);
            if (saveSettingsValue.data.success === true) {
                setLoading(false)
                ToastAlert({ msg: saveSettingsValue.data.message, msgType: 'success' });
                setChangePlatform(false)
                setChangeTransaction(false)
                setUpdate(!update)
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
        let value = e.target.value.replace(/[^\d.]|\.(?=.*\.)/g, "");
        setState({
            ...state,
            [e.target.name]: value
        })
        // setTotalFees(Number(platformFee) + Number(transectionFee))
    }


    useEffect(() => {
        (async () => {
            if (!hasPermission(adminData.roleName, 'SETTING')) {
                navigate('/admin/dashboard')
            }
            setLoading(true)

            const getSettingsValue = await settingApi.list(adminAuthToken, Object.keys(state));
            if (getSettingsValue.data.data.length > 0) {
                let data = {}

                getSettingsValue.data.data.map((d, i) => {
                    data[d.name] = d.value
                })

                setState({
                    ...data
                })
                if (data.platformFee || data.transectionFee) {
                    setPf(data.platformFee)
                    setTf(data.transectionFee)
                    setTotalFees(Number(data.platformFee) + Number(data.transectionFee))

                } else {
                    setTotalFees(0)
                }
            }
            setLoading(false)



        })()
    }, [update])

    useEffect(() => {
        (async () => {
            // if (platformFee && transectionFee) {

            setTotalFees(Number(platformFee) + Number(transectionFee))

            // } else {
            //     setTotalFees(0)
            // }


        })()
    }, [update, platformFee, transectionFee])

    const lineStyle = {

        // display:" -webkit-box",
        // display: "-webkit-flex",
        // display: "-ms-flexbox",
        display: "flex",
        width: "0px",
        marginRight: "16px",
        marginLeft: "16px",
        "-webkit-box-pack": "center",
        "-webkit-justify-content": "center",
        "-ms-flex-pack": "center",
        justifyContent: "center",
        "-webkit-box-align": "center",
        "-webkit-align-items": "center",
        "-ms-flex-align": "center",
        /* align-items: center, */
        border: "1px solid #e6e6e6",
        // fontFamily: 'Font awesome 5 pro solid 900',
        padding: 'unset',
        fontSize: 'xx-large',
        fontWeight: 700,
    }




    const syStyle = {


        // display: -webkit-box,
        // display: -webkit-flex,
        // display: -ms-flexbox,
        display: "flex",
        width: " 32px",
        height: "42px",
        minHeight: "42px",
        minWidth: " 32px",
        "-webkit-box-pack": "center",
        "-webkit-justify-content": "center",
        "-ms-flex-pack": "center",
        justifyContent: "center",
        "-webkit-box-align": "center",
        "-webkit-align-items": "center",
        "-ms-flex-align": "center",
        alignItems: "center",
        borderRadius: "50%",
        backgroundColor: "#fff",
        fontSize: 'xx-large',
        fontWeight: 700,
        color:"#e6e6e6"


    }



    return (
        <>
            <FrontLoader loading={loading} />
            <Page title="Pricing | Minimal-UI">

                <Container>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h4" gutterBottom>
                            Pricing Settings
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
                        <div className='row container'>
                            <div className="row py-4">
                                <div className="col-sm-4 mb-3 mb-md-0">
                                    <div className=" text-center h-100">
                                        <div className="card-body d-flex flex-column">
                                            <div className="mb-4">
                                                <h5>Platform Fee</h5>
                                                {
                                                    changePlatform ?
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="platformFee"
                                                            name="platformFee"
                                                            value={platformFee}
                                                            onChange={(e) => changevalue(e)}
                                                        />
                                                        :
                                                        <span className="display-4">{platformFee}%</span>
                                                }
                                                {error && error.platformFee && <p className="error">{error ? error.platformFee ? error.platformFee : "" : ""}</p>}



                                            </div>

                                            <p>
                                                Charged to the Donor at checkout to keep Donorport 100% for Organizations
                                            </p>

                                        </div>
                                        <div className="mt-auto">
                                            {
                                                changePlatform ?
                                                    <button className="btn btn-lg btn-outline-primary" onClick={() => savePricingFeeSettings('PLATFORM')}>Save</button> :
                                                    <button className="btn btn-lg btn-outline-primary" onClick={() => editPrice('PLATFORM')}>Change</button>

                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-1 " style={lineStyle}><div className="s" style={syStyle}>+</div></div>

                                <div className="col-sm-4 mb-3 mb-md-0">
                                    <div className=" text-center h-100">
                                        <div className="card-body d-flex flex-column">
                                            <div className="mb-4">
                                                <h5>Transaction Fees</h5>
                                                {
                                                    changeTransaction ?
                                                        <input
                                                            type="text"
                                                            className="form-control"
                                                            id="transectionFee"
                                                            name="transectionFee"
                                                            value={transectionFee}
                                                            onChange={(e) => changevalue(e)}
                                                        />
                                                        :
                                                        <span className="display-4">{transectionFee}%</span>
                                                }
                                                {error && error.transectionFee && <p className="error">{error ? error.transectionFee ? error.transectionFee : "" : ""}</p>}
                                            </div>

                                            <p>
                                                + $0.30 per item donated
                                                *including debit and credit card charges
                                            </p>

                                        </div>
                                        <div className="mt-auto">
                                            {
                                                changeTransaction ?
                                                    <button className="btn btn-lg btn-outline-primary" onClick={() => savePricingFeeSettings('TRANSECTION')}>Save</button> :
                                                    <button className="btn btn-lg btn-outline-primary" onClick={() => editPrice('TRANSECTION')}>Change</button>

                                            }
                                        </div>
                                    </div>

                                </div>
                                <div className="col-sm-1 " style={lineStyle}><div className="s" style={syStyle}>=</div></div>



                                <div className="col-sm-3 mb-3 mb-md-0">
                                    <div className=" text-center h-100">
                                        <div className="card-body d-flex flex-column">
                                            <div className="mb-4">
                                                <h5>Total</h5>
                                                <span className="display-4">{isNaN(totalFees) ? 0 : totalFees.toFixed(1)}%</span>
                                            </div>

                                            <p>
                                                Paid by the Donor at checkout
                                            </p>

                                        </div>
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