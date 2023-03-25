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
import { Link as RouterLink } from 'react-router-dom';
import Page from '../../../components/Page';
import ReactQuill from "react-quill"
import 'react-quill/dist/quill.snow.css'
import helper,{ ImageExist }  from '../../../Common/Helper';
// import from '../../../Common/Helper';
import noimg from "../../../assets/images/noimg1.png"

export default function Index(props) {
    let stateData = props.stateData
    // console.log(stateData)
    return (
        <>
            <Page title="Profile | CMS">

                <Container>
                    <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
                        <Typography variant="h4" gutterBottom>
                            Profile
                        </Typography>

                    </Stack>
                    <section className="content">
                        <div className="">
                            <div className="row">
                                <div className="col-md-3">

                                    <div className="card  card-outline">
                                        <div className="card-body box-profile">
                                            <div className="text-center p-3">
                                                <img className="profile-user-img img-fluid img-circle" style={{ width: "100px" }} src={ props.tempImg ?props.tempImg : ImageExist(helper.CampaignAdminLogoPath + stateData.Img) ? helper.CampaignAdminLogoPath + stateData.Img:noimg} alt="l" />
                                            </div>
                                            <h3 className="profile-username text-center">{stateData ? stateData.name.toUpperCase() : ""}</h3>
                                            <p className="text-muted text-center">{stateData.role === 2 ? 'CAMPAIGN ADMIN' : "ADMIN"}</p>
                                            {/* <ul className="list-group list-group-unbordered mb-3">
                                                <li className="list-group-item">
                                                    <b>Followers</b> <a className="float-right">1,322</a>
                                                </li>
                                                <li className="list-group-item">
                                                    <b>Following</b> <a className="float-right">543</a>
                                                </li>
                                                <li className="list-group-item">
                                                    <b>Friends</b> <a className="float-right">13,287</a>
                                                </li>
                                            </ul> */}
                                            {/* <Button
                                                variant="contained"
                                                // startIcon={<Icon icon={backfill} />}
                                                // onClick={() => navigate('/admin/setting')}
                                            >
                                                Back
                                            </Button> */}
                                            {/* <a href="#" className="btn btn-primary btn-block"><b>Follow</b></a> */}
                                        </div>

                                    </div>

                                    {/* 
                                    <div className="card">
                                        <div className="card-header">
                                            <h3 className="card-title">About Me</h3>
                                        </div>

                                        <div className="card-body">
                                            <strong><i className="fas fa-book mr-1"></i> Education</strong>
                                            <p className="text-muted">
                                                B.S. in Computer Science from the University of Tennessee at Knoxville
                                            </p>
                                            <hr />
                                            <strong><i className="fas fa-map-marker-alt mr-1"></i> Location</strong>
                                            <p className="text-muted">Malibu, California</p>
                                            <hr />
                                            <strong><i className="fas fa-pencil-alt mr-1"></i> Skills</strong>
                                            <p className="text-muted">
                                                <span className="tag tag-danger">UI Design</span>
                                                <span className="tag tag-success">Coding</span>
                                                <span className="tag tag-info">Javascript</span>
                                                <span className="tag tag-warning">PHP</span>
                                                <span className="tag tag-primary">Node.js</span>
                                            </p>
                                            <hr />
                                            <strong><i className="far fa-file-alt mr-1"></i> Notes</strong>
                                            <p className="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam fermentum enim neque.</p>
                                        </div>

                                    </div> */}

                                </div>

                                <div className="col-md-9">
                                    <div className="card">
                                        <div className="card-header p-2" style={{ border: 'unset' }}>
                                            <ul className="nav nav-pills">
                                                <li className="nav-item"><a className="nav-link active" href="#activity" data-toggle="tab">Profile</a></li>
                                                <li className="nav-item"><a className="nav-link" href="#timeline" data-toggle="tab">Change Password</a></li>
                                                {/* <li className="nav-item"><a className="nav-link" href="#settings" data-toggle="tab">Settings</a></li> */}
                                            </ul>
                                        </div>
                                        <div className="card-body">
                                            <div className="tab-content">
                                                <div className="tab-pane active" id="activity">
                                                    <form className="form-horizontal">
                                                        <div className="form-group row">
                                                            <label htmlFor="inputName" className="col-sm-2 col-form-label">Name</label>
                                                            <div className="col-sm-10">
                                                                <input type="text" value={stateData.name} className="form-control" id="name" placeholder="Name" name='name' onChange={(e) => { props.changevalue(e) }} />
                                                                <p className='error'>{stateData.error ? stateData.error.name ? stateData.error.name : "" : ""}</p>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-form-label col-sm-2" htmlFor="inputstock">Logo</label>
                                                            <div className="col-sm-10">
                                                                <input type="file" className={stateData.error.logo ? "inputerror custom-file-input form-control" : " custom-file-input form-control"} id="logo" accept="image/*" onChange={(e) => { props.changefile(e) }} />
                                                                <label className="custom-file-label" htmlFor="customFile" style={{ margin: "0px 10px 0px 10px" }}> Choose file </label>
                                                                <p className='error'>{stateData.error ? stateData.error.logo ? stateData.error.logo : "" : ""}</p>
                                                       
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="inputEmail" className="col-sm-2 col-form-label">Email</label>
                                                            <div className="col-sm-10">
                                                                <input type="email" name='email' readOnly value={stateData.email} className="form-control" id="inputEmail" placeholder="Email" onChange={(e) => { props.changevalue(e) }} />
                                                            </div>

                                                        </div>

                                                        <div className="form-group row">
                                                            <label htmlFor="inputExperience" className="col-sm-2 col-form-label">Description</label>
                                                            <div className="col-sm-10">
                                                                <ReactQuill
                                                                    theme='snow'
                                                                    value={stateData.description}
                                                                    onChange={(e) => props.handleOnDiscriptionChangeValue(e)}
                                                                    style={{ height: '240px', marginBottom: "50px" }}
                                                                    name="description"
                                                                />
                                                                <p className='error'>{stateData.error ? stateData.error.description ? stateData.error.description : "" : ""}</p>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="inputName2" className="col-sm-2 col-form-label">Facebook</label>
                                                            <div className="col-sm-10">
                                                                <input type="text" className="form-control" id="facebook" value={stateData.facebook} name="facebook" onChange={(e) => { props.changevalue(e) }} />
                                                                <p className='error'>{stateData.error ? stateData.error.facebook ? stateData.error.facebook : "" : ""}</p>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="inputName2" className="col-sm-2 col-form-label">Twitter</label>
                                                            <div className="col-sm-10">
                                                                <input type="text" className="form-control" onChange={(e) => { props.changevalue(e) }} id="twitter" value={stateData.twitter} name="twitter" />
                                                                <p className='error'>{stateData.error ? stateData.error.twitter ? stateData.error.twitter : "" : ""}</p>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="inputName2" className="col-sm-2 col-form-label">Linkedin</label>
                                                            <div className="col-sm-10">
                                                                <input type="text" onChange={(e) => { props.changevalue(e) }} className="form-control" id="linkedin" value={stateData.linkedin} name="linkedin" />
                                                                <p className='error'>{stateData.error ? stateData.error.linkedin ? stateData.error.linkedin : "" : ""}</p>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="inputName2" className="col-sm-2 col-form-label">Website Url</label>
                                                            <div className="col-sm-10">
                                                                <input type="text"
                                                                    className="form-control" id="url" value={stateData.url} name="url" onChange={(e) => { props.changevalue(e) }} />
                                                                <p className='error'>{stateData.error ? stateData.error.url ? stateData.error.url : "" : ""}</p>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-form-label col-sm-2 ">Category</label>
                                                            <div className="col-sm-10">
                                                                <select className="form-control" onChange={(e) => { props.changevalue(e) }} id="category" name="category">
                                                                    <option selected disabled value=" ">Select Category</option>
                                                                    {props.categoryList.length > 0 &&
                                                                        props.categoryList.map((cat, i) => {

                                                                            return (
                                                                                cat.status === 1 &&
                                                                                <option value={cat._id} selected={stateData.category === cat._id}>{cat.name}</option>
                                                                            )

                                                                        })

                                                                    }

                                                                </select>
                                                                <p className='error'>{stateData.error ? stateData.error.category ? stateData.error.category : "" : ""}</p>

                                                            </div>
                                                        </div>

                                                        <div className="form-group row">
                                                            <label className="col-form-label col-sm-2 ">Country</label>
                                                            <div className="col-sm-10">
                                                                <select className="form-control" onChange={(e) => { props.changevalue(e) }} id="country" name="country">
                                                                    <option selected disabled value=" ">Select Country</option>
                                                                    {props.countryList.length > 0 &&
                                                                        props.countryList.map((country, i) => {

                                                                            return (
                                                                                country.status === 1 &&
                                                                                <option value={country.id} selected={Number(stateData.country) === Number(country.id)}>{country.country}</option>
                                                                            )

                                                                        })

                                                                    }

                                                                </select>
                                                                <p className='error'>{stateData.error ? stateData.error.country ? stateData.error.country : "" : ""}</p>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-form-label col-sm-2 ">State</label>
                                                            <div className="col-sm-10">
                                                                <select className="form-control" onChange={(e) => { props.changevalue(e) }} id="stateid" name="stateid">
                                                                    <option selected disabled value=" ">Select State</option>
                                                                    {props.stateList.length > 0 &&
                                                                        props.stateList.map((state, i) => {

                                                                            return (
                                                                                state.status === 1 &&
                                                                                <option value={state.id} selected={stateData.stateid === state.id}>{state.state}</option>
                                                                            )

                                                                        })

                                                                    }

                                                                </select>
                                                                <p className='error'>{stateData.error ? stateData.error.stateid ? stateData.error.stateid : "" : ""}</p>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label className="col-form-label col-sm-2 ">City</label>
                                                            <div className="col-sm-10">
                                                                <select className="form-control" onChange={(e) => { props.changevalue(e) }} id="city" name="city">
                                                                    <option selected disabled value=" ">Select State</option>
                                                                    {props.cityList.length > 0 &&
                                                                        props.cityList.map((city, i) => {

                                                                            return (
                                                                                city.status === 1 &&
                                                                                <option value={city.id} selected={stateData.city === city.id}>{city.city}</option>
                                                                            )

                                                                        })

                                                                    }

                                                                </select>
                                                                <p className='error'>{stateData.error ? stateData.error.city ? stateData.error.city : "" : ""}</p>
                                                            </div>
                                                        </div>
                                                        <div className="form-group row">
                                                            <label htmlFor="name" className="col-sm-2 col-form-label">Building Address</label>
                                                            <div className="col-sm-10">
                                                                <input type="text" className="form-control " name='address' id="address" value={stateData.address} onChange={(e) => { props.changevalue(e) }} />

                                                                {stateData.error && stateData.error.address && <p className="error">{stateData.error ? stateData.error.address ? stateData.error.address : "" : ""}</p>}
                                                            </div>
                                                        </div>


                                                        {/* <div className="form-group row">
                                                            <div className="offset-sm-2 col-sm-10">

                                                            </div>
                                                        </div> */}
                                                        <Button
                                                            variant="contained"
                                                            // startIcon={<Icon icon={backfill} />}
                                                            onClick={() => props.updateProfile()}
                                                        >
                                                            Save
                                                        </Button>
                                                    </form>

                                                </div>

                                                <div className="tab-pane" id="timeline">
                                                    <div className="form-group row">
                                                        <label htmlFor="inputName" className="col-sm-2 col-form-label">Current Password</label>
                                                        <div className="col-sm-10">
                                                            <input type="password" className="form-control" id="currentPassword" name='currentPassword' onChange={(e) => { props.changevalue(e) }} />
                                                            {stateData.error && stateData.error.currentPassword && <p className="error">{stateData.error ? stateData.error.currentPassword ? stateData.error.currentPassword : "" : ""}</p>}
                                                        </div>
                                                    </div>      <div className="form-group row">
                                                        <label htmlFor="inputName" className="col-sm-2 col-form-label">New Password</label>
                                                        <div className="col-sm-10">
                                                            <input type="password" className="form-control" id="newPassword" name='newPassword' onChange={(e) => { props.changevalue(e) }} />
                                                            {stateData.error && stateData.error.newPassword && <p className="error">{stateData.error ? stateData.error.newPassword ? stateData.error.newPassword : "" : ""}</p>}
                                                        </div>
                                                    </div>      <div className="form-group row">
                                                        <label htmlFor="inputName" className="col-sm-2 col-form-label">Confirm New Password</label>
                                                        <div className="col-sm-10">
                                                            <input type="password" className="form-control" id="confirmPassword" name='confirmPassword' onChange={(e) => { props.changevalue(e) }} />
                                                            {stateData.error && stateData.error.confirmPassword && <p className="error">{stateData.error ? stateData.error.confirmPassword ? stateData.error.confirmPassword : "" : ""}</p>}
                                                        </div>
                                                    </div>

                                                    <Button
                                                        variant="contained"

                                                        onClick={() => props.updatePassword()}
                                                    >
                                                        Update
                                                    </Button>

                                                </div>

                                                <div className="tab-pane" id="settings">

                                                </div>

                                            </div>

                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>
                    </section>
                </Container>
            </Page>

        </>
    )

}