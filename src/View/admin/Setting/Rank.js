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
import IconButton from '../../frontEnd/Component/molecules/icon-button';
import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Rank(props) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const adminAuthToken = localStorage.getItem('adminAuthToken');
    const adminData = JSON.parse(localStorage.getItem('adminData'));
    const [state, setState] = useState({
        captian: "",
        admiral: "",
        pirate: "",
        narwhal: "",
        beluga: "",
        fish: "",
    })
    const [error, setError] = useState([])

    const { captian, admiral, pirate, narwhal, beluga, fish } = state

    const badgeStyle = {
        padding: "9px 39px 12px 37px",
        fontSize: "13px",
    }

    const saveRankSettings = async () => {

        const rules = {
            captian: "required",
            admiral: "required",
            pirate: "required",
            narwhal: "required",
            beluga: "required",
            fish: "required",

        }

        const message = {
            'captian.required': 'Captian is Required.',
            'admiral.required': 'Admiral is Required.',
            'pirate.required': 'Pirate is Required.',
            'narwhal.required': 'Narwhal is Required.',
            'beluga.required': 'Beluga is Required.',
            'fish.required': 'Fish is Required.',
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
           {/*<FrontLoader loading={loading} />*/}
            <Page title="Profile | Minimal-UI">
                <Container>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h4" gutterBottom>
                            Rank Settings
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
                                <div className="col-sm-2">
                                    {/* <span className="badge rounded-pill bg-dark" style={badgeStyle}> <i className="fa fa-anchor" aria-hidden="true"></i> Captain</span> */}
                                    <div className="xp__btn-wrap mb-2 mb-sm-0">
                                        <IconButton
                                            bgColor="#000"
                                            className="rounded-pill rounded-pill--xp "
                                            icon={<FontAwesomeIcon icon={solid("anchor")} />}
                                        >
                                            Captain
                                        </IconButton>
                                    </div>
                                </div>

                                <div className="col-sm-10">

                                    <div className="input-group">

                                        <input type="text" className="form-control " placeholder='e.g 500' name='captian' id="captian" value={captian} onChange={(e) => { changevalue(e) }} />
                                        <span className="input-group-addon11">
                                            XP
                                        </span>
                                    </div>
                                    {error && error.captian && <p className="error">{error ? error.captian ? error.captian : "" : ""}</p>}

                                </div>

                            </div>
                            <div className="form-group row">
                                <div className="col-sm-2">
                                    {/* <span className="badge rounded-pill" style={{ ...badgeStyle, backgroundColor: "#95dbb0" }}> <i className="fa fa-ship" aria-hidden="true"></i> Admiral</span> */}
                                    <div className="xp__btn-wrap mb-2 mb-sm-0">
                                        <IconButton
                                            bgColor="#95dbb0"
                                            className="rounded-pill rounded-pill--xp"
                                            icon={<FontAwesomeIcon icon={solid("ship")} />}
                                        >
                                            Admiral
                                        </IconButton>
                                    </div>
                                </div>

                                <div className="col-sm-10">
                                    <div className="input-group">
                                        <input type="text" className="form-control " placeholder='e.g 500' name='admiral' id="admiral" value={admiral} onChange={(e) => { changevalue(e) }} />
                                        <span className="input-group-addon11">
                                            XP
                                        </span>
                                    </div>
                                    {error && error.admiral && <p className="error">{error ? error.admiral ? error.admiral : "" : ""}</p>}
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-2">
                                    {/* <span className="badge rounded-pill" style={{ ...badgeStyle, backgroundColor: "#fc8c63" }}> <i className="fa fa-anchor" aria-hidden="true"></i> Pirate</span> */}
                                    <div className="xp__btn-wrap mb-2 mb-sm-0">
                                        <IconButton
                                            bgColor="#fc8c63"
                                            className="rounded-pill rounded-pill--xp"
                                            icon={<FontAwesomeIcon icon={solid("swords")} />}
                                        >
                                            Pirate
                                        </IconButton>
                                    </div>
                                </div>

                                <div className="col-sm-10">
                                    <div className="input-group">
                                        <input type="text" className="form-control " placeholder='e.g 500' name='pirate' id="pirate" value={pirate} onChange={(e) => { changevalue(e) }} />
                                        <span className="input-group-addon11">
                                            XP
                                        </span>
                                    </div>
                                    {error && error.pirate && <p className="error">{error ? error.pirate ? error.pirate : "" : ""}</p>}
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-2">
                                    {/* <span className="badge rounded-pill" style={{ ...badgeStyle, backgroundColor: "#a278fc" }}> <i className="fa fa-anchor" aria-hidden="true"></i> Narwhal</span> */}
                                    <div className="xp__btn-wrap mb-2 mb-sm-0">
                                        <IconButton
                                            bgColor="#a278fc"
                                            className="rounded-pill rounded-pill--xp"
                                            icon={<FontAwesomeIcon icon={solid("narwhal")} />}
                                        >
                                            Narwhal
                                        </IconButton>
                                    </div>
                                </div>

                                <div className="col-sm-10">
                                    <div className="input-group">
                                        <input type="text" className="form-control " placeholder='e.g 500' name='narwhal' id="narwhal" value={narwhal} onChange={(e) => { changevalue(e) }} />
                                        <span className="input-group-addon11">
                                            XP
                                        </span>
                                    </div>
                                    {error && error.narwhal && <p className="error">{error ? error.narwhal ? error.narwhal : "" : ""}</p>}

                                </div>

                            </div>
                            <div className="form-group row">
                                <div className="col-sm-2">
                                    {/* <span className="badge rounded-pill " style={{ ...badgeStyle, backgroundColor: "#78bafc" }}> <i className="fa fa-anchor" aria-hidden="true"></i> Beluga</span> */}
                                    <div className="xp__btn-wrap mb-2 mb-sm-0">
                                        <IconButton
                                            bgColor="#78bafc"
                                            className="rounded-pill rounded-pill--xp"
                                            icon={<FontAwesomeIcon icon={solid("whale")} />}
                                        >
                                            Beluga
                                        </IconButton>
                                    </div>
                                </div>

                                <div className="col-sm-10">
                                    <div className="input-group">
                                        <input type="text" className="form-control " placeholder='e.g 500' name='beluga' id="beluga" value={beluga} onChange={(e) => { changevalue(e) }} />
                                        <span className="input-group-addon11">
                                            XP
                                        </span>
                                    </div>
                                    {error && error.beluga && <p className="error">{error ? error.beluga ? error.beluga : "" : ""}</p>}
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-2">
                                    {/* <span className="badge rounded-pill " style={{ ...badgeStyle, backgroundColor: "hsla(0, 96.46%, 76.14%, 1.00)" }}> <i className="fa fa-fish" aria-hidden="true"></i>   Fish</span> */}
                                    <div className="xp__btn-wrap mb-2 mb-sm-0">
                                        <IconButton
                                            bgColor="hsla(0, 96.46%, 76.14%, 1.00)"
                                            className="rounded-pill rounded-pill--xp"
                                            icon={<FontAwesomeIcon icon={solid("fish")} />}
                                        >
                                            Fish
                                        </IconButton>
                                    </div>
                                    {/* <svg xmlns="http://www.w3.org/2000/svg" style={{ width: "17px" }} viewBox="0 0 576 512"><path fill='white' d="M180.5 141.5C219.7 108.5 272.6 80 336 80C399.4 80 452.3 108.5 491.5 141.5C530.5 174.5 558.3 213.1 572.4 241.3C577.2 250.5 577.2 261.5 572.4 270.7C558.3 298 530.5 337.5 491.5 370.5C452.3 403.5 399.4 432 336 432C272.6 432 219.7 403.5 180.5 370.5C164.3 356.7 150 341.9 137.8 327.3L48.12 379.6C35.61 386.9 19.76 384.9 9.474 374.7C-.8133 364.5-2.97 348.7 4.216 336.1L50 256L4.216 175.9C-2.97 163.3-.8133 147.5 9.474 137.3C19.76 127.1 35.61 125.1 48.12 132.4L137.8 184.7C150 170.1 164.3 155.3 180.5 141.5L180.5 141.5zM416 224C398.3 224 384 238.3 384 256C384 273.7 398.3 288 416 288C433.7 288 448 273.7 448 256C448 238.3 433.7 224 416 224z" /></svg> */}

                                </div>

                                <div className="col-sm-10">
                                    <div className="input-group">
                                        <input type="text" className="form-control " placeholder='e.g 500' name='fish' id="fish" value={fish} onChange={(e) => { changevalue(e) }} />
                                        <span className="input-group-addon11">
                                            XP
                                        </span>
                                    </div>
                                    {error && error.fish && <p className="error">{error ? error.fish ? error.fish : "" : ""}</p>}
                                </div>
                            </div>

                            <Button
                                variant="contained"
                                className="settingButton"
                                onClick={(e) => saveRankSettings()}
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