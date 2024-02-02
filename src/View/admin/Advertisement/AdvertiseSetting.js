import Dialog from '@mui/material/Dialog';
import React, { useEffect, useState } from 'react';

import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Button, Card } from '@mui/material';
import moment from 'moment';
import Label from '../../../components/Label';
// import helper from '../../../Common/Helper';
import helper, { priceFormat } from '../../../Common/Helper';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import plusFill from '@iconify/icons-eva/plus-fill';
import trash from '@iconify/icons-eva/trash-2-fill';
import editfill from '@iconify/icons-eva/edit-fill';
// import Label from '../../../components/Label';
import Select from "react-select"


const Transition = React.forwardRef(function Transition(propss, ref) {
    return <Slide direction="up" {...propss} />;
});
const DialogTransition = (props) => {
    return <Slide direction='up' {...props} />;
};
const AdvertiseSetting = (props) => {

    let advertisementDetails = {}
    advertisementDetails = props.advertisementDetails

    const productList = props.productList
    const countryList = props.countryList
    const stateList = props.stateList
    const categoryList = props.category





    const [value, setValue] = useState('1');

    const [Homevalue, setHomeValue] = useState('1');


    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleChangeHome = (event, newValue) => {
        setHomeValue(newValue);
    };

    const [productValue, setProductValue] = useState('1');

    const handleChangeProduct = (event, newValue) => {
        setProductValue(newValue);
    };


    const [categoryValue, setCategoryValue] = useState('1');

    const handleChangeCategory = (event, newValue) => {
        setCategoryValue(newValue);
    };


    return (
        <>
            <Dialog
                fullScreen
                open={props.settingModal}
                onClose={() => props.setSettingModal(false)}
                TransitionComponent={Transition}

            >



                <AppBar sx={{ position: 'relative', bgcolor: "#3773c6" }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={() => props.setSettingModal(false)}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                        <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                            ADVERTISE ID : {advertisementDetails._id}
                        </Typography>
                        <Button autoFocus color="inherit" onClick={() => props.setSettingModal(false)}>
                            Close
                        </Button>
                    </Toolbar>
                </AppBar>

                <div className="invoice invoice-content  px-5 pt-5" >
                    <div className="row">

                        <div className="col-sm-6">
                            <img src={helper.sponsorLogoResizePath + advertisementDetails.logo} alt='sponsor' style={{ width: "100px" }}></img>
                        </div>
                        <div className="col-sm-6">
                            <h1 style={{ float: "right", textTransform: "capitalize" }}>{advertisementDetails.name}</h1>
                        </div>
                    </div>

                </div>
                <hr />


                <Box sx={{ width: '100%', typography: 'body1' }} className="px-5">

                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="Products" value="1" />
                                <Tab label="HomePage" value="2" />
                                <Tab label="All Categories" value="3" />




                            </TabList>
                        </Box>
                        <TabPanel value="1">

                            <TabContext value={productValue}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChangeProduct} aria-label="lab API tabs example">
                                        <Tab label="Selected Products" value="1" />
                                        <Tab label="All Products" value="2" />

                                    </TabList>
                                </Box>
                                <TabPanel value="1">
                                    {/* <div>
                                <input type="text" className='form-control' placeholder='Search product' />
                            </div> */}

                                    <div style={{ overflow: "auto", height: "450px" }}>

                                        {props.publisedProductList.length > 0 &&
                                            props.publisedProductList.map((product, i) => {
                                                return (
                                                    <div className="px-5 pt-3 mt-0 mb-2" key={i}>
                                                        <div className="row" style={{ height: "5rem", border: "1px solid " + product.categoryDetails.color }}>
                                                            <div className="col-sm-3">

                                                                <img src={helper.CampaignProductImagePath + product.image} alt='sponsor' style={{ width: "35px", marginTop: "14px", }}></img>

                                                            </div>

                                                            <div className="col-sm-3">
                                                                <h6 style={{ lineHeight: '5rem', color: '#bdc1c8', letterSpacing: ' 3.32px', fontWeight: '700' }}>{product.headline}</h6>
                                                            </div>

                                                            <div className="col-sm-3">

                                                                <img src={helper.CampaignAdminLogoPath + product.campaignDetails?.logo} alt='sponsor' style={{ width: "45px", marginTop: "21px", }}></img>
                                                            </div>

                                                            <div className="col-sm-3">
                                                                <label className="--switch mt-1" style={{ top: "18%", float: "right" }}>
                                                                    <input type="checkbox" checked={props.publisedProductIds.includes(product._id)} id="prioritySupport" name="BASIC" onChange={() => props.publishOrRemoveAdFromProduct(product._id, advertisementDetails._id)} />
                                                                    <span className="--slider">
                                                                        <i className="fa fa-check"></i>
                                                                        <i className="fa fa-times"></i>
                                                                    </span>
                                                                </label>
                                                            </div>

                                                        </div>


                                                    </div>
                                                )
                                            })
                                        }





                                    </div>

                                </TabPanel>
                                <TabPanel value="2">

                                    <div>
                                        <input type="text" className='form-control mb-2' name='allSearch' value={props.allSearch} onChange={(e) => props.onSearch(e)} placeholder='Search product' />
                                    </div>

                                    <div style={{ overflow: "auto", height: "450px" }}>

                                        {productList.length > 0 &&
                                            productList.map((product, i) => {
                                                // console.log(product)
                                                return (
                                                    <div className="px-5 pt-3 mt-0 mb-2" key={i}>
                                                        <div className="row" style={{ height: "5rem", border: "1px solid " + product.categoryDetails.color }}>
                                                            <div className="col-sm-3">

                                                                <img src={helper.CampaignProductImagePath + product.image} alt='sponsor' style={{ width: "35px", marginTop: "14px", }}></img>

                                                            </div>

                                                            <div className="col-sm-3">
                                                                <h6 style={{ lineHeight: '5rem', color: '#bdc1c8', letterSpacing: ' 2.32px', fontWeight: '700' }}>{product.headline}</h6>
                                                            </div>

                                                            <div className="col-sm-3">

                                                                <img src={helper.CampaignAdminLogoPath + product.campaignDetails?.logo} alt='sponsor' style={{ width: "45px", marginTop: "21px", }}></img>
                                                            </div>

                                                            <div className="col-sm-3">
                                                                <label className="--switch mt-1" style={{ top: "18%", float: "right" }}>
                                                                    <input type="checkbox" checked={props.publisedProductIds.includes(product._id)} id="prioritySupport" name="BASIC" onChange={() => props.publishOrRemoveAdFromProduct(product._id, advertisementDetails._id)} />
                                                                    <span className="--slider">
                                                                        <i className="fa fa-check"></i>
                                                                        <i className="fa fa-times"></i>
                                                                    </span>
                                                                </label>
                                                            </div>

                                                        </div>


                                                    </div>
                                                )
                                            })
                                        }





                                    </div>

                                </TabPanel>

                            </TabContext>


                        </TabPanel>
                        <TabPanel value="2">

                            <TabContext value={Homevalue}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChangeHome} aria-label="lab API tabs example">
                                        <Tab label="All" value="1" />
                                        <Tab label="Country" value="2" />
                                        {/* <Tab label="Category" value="3" /> */}


                                    </TabList>
                                </Box>
                                <TabPanel value="1">

                                    <div className="px-5 pt-3 mt-0 mb-2">
                                        <div className="row" style={{ height: "5rem", border: "1px solid rgba(189, 193, 200, 0.5)" }}>
                                            <div className="col-sm-6">
                                                <h6 style={{ lineHeight: '5rem', color: '#bdc1c8', letterSpacing: ' 3.32px', fontWeight: '700' }}>HomePage</h6>
                                            </div>

                                            <div className="col-sm-6">
                                                <label className="--switch mt-1" style={{ top: "18%", float: "right" }}>
                                                    <input type="checkbox" id="prioritySupport" name="BASIC" checked={props.home} onChange={(e) => props.onChangeHome(e, advertisementDetails._id)} />
                                                    <span className="--slider">
                                                        <i className="fa fa-check"></i>
                                                        <i className="fa fa-times"></i>
                                                    </span>
                                                </label>
                                            </div>

                                        </div>


                                    </div>


                                </TabPanel>
                                <TabPanel value="2">
                                    {/* <div>
                                        <input type="text" className='form-control mb-2' name='countrySearch' value={props.countrySearch} onChange={(e) => props.onSearch(e,'COUNTRY')} placeholder='Search Country' />
                                    </div> */}

                                    <div className="input__wrap d-flex mb-2">

                                        <Select
                                            className="basic-single"
                                            classNamePrefix="select"
                                            value={props.defaultCountry}
                                            name="country"
                                            options={countryList}
                                            onChange={(e) => props.onChangeCountry(e, advertisementDetails._id, 'home')}
                                            placeholder="Select Country"
                                            components={{
                                                IndicatorSeparator: () => null
                                              }}
                                        />

                                    </div>
                                    {/* {stateList.length > 0 &&
                                        <div className="px-5 pt-3 mt-0 mb-2" >
                                            <div className="row" style={{ height: "5rem", border: "1px solid rgba(189, 193, 200, 0.5) " }}>


                                                <div className="col-sm-6">
                                                    <h6 style={{ lineHeight: '5rem', color: '#bdc1c8', letterSpacing: ' 3.32px', fontWeight: '700' }}>All</h6>
                                                </div>



                                                <div className="col-sm-6">
                                                    <label className="--switch mt-1" style={{ top: "18%", float: "right" }}>
                                                        <input type="checkbox" id="prioritySupport" name="BASIC" onChange={() => props.publishOrRemoveAdFromProduct()} />
                                                        <span className="--slider">
                                                            <i className="fa fa-check"></i>
                                                            <i className="fa fa-times"></i>
                                                        </span>
                                                    </label>
                                                </div>

                                            </div>


                                        </div>
                                    } */}

                                    <div style={{ overflow: "auto", height: "450px" }}>

                                        {stateList.length > 0 &&
                                            stateList.map((state, i) => {
                                                return (
                                                    <div className="px-5 pt-3 mt-0 mb-2" key={i}>
                                                        <div className="row" style={{ height: "5rem", border: "1px solid rgba(189, 193, 200, 0.5) " }}>


                                                            <div className="col-sm-6">
                                                                <h6 style={{ lineHeight: '5rem', color: '#bdc1c8', letterSpacing: ' 3.32px', fontWeight: '700' }}>{state.state}</h6>
                                                            </div>



                                                            <div className="col-sm-6">
                                                                <label className="--switch mt-1" style={{ top: "18%", float: "right" }}>
                                                                    <input type="checkbox" id="prioritySupport" checked={props.publisedStateIds.includes(state.id)} name="BASIC" onChange={() => props.publishOrRemoveAdFromCountry(state.
                                                                        country_id, state.id, advertisementDetails._id)} />
                                                                    <span className="--slider">
                                                                        <i className="fa fa-check"></i>
                                                                        <i className="fa fa-times"></i>
                                                                    </span>
                                                                </label>
                                                            </div>

                                                        </div>


                                                    </div>
                                                )
                                            })
                                        }





                                    </div>

                                </TabPanel>



                            </TabContext>

                        </TabPanel>

                        <TabPanel value="3">

                            <TabContext value={categoryValue}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <TabList onChange={handleChangeCategory} aria-label="lab API tabs example">
                                        <Tab label="Country" value="1" />
                                        <Tab label="Country & State" value="2" />



                                    </TabList>
                                </Box>

                                <TabPanel value="1">
                                    <div style={{ overflow: "auto", height: "450px" }}>

                                        <div className="input__wrap d-flex mb-2">

                                            <Select
                                                className="basic-single"
                                                classNamePrefix="select"
                                                value={props.defaultCountryCategory}
                                                name="country"
                                                options={countryList}
                                                onChange={(e) => props.onChangeCountry(e, advertisementDetails._id, 'category')}
                                                placeholder="Select Country"
                                                components={{
                                                    IndicatorSeparator: () => null
                                                  }}
                                            />

                                        </div>

                                        {

                                            props.categoryCountry &&
                                            categoryList.length > 0 &&
                                            categoryList.map((category, i) => {
                                                // console.log(category)
                                                return (
                                                    <div className="px-5 pt-3 mt-0 mb-2" key={i}>
                                                        <div className="row" style={{ height: "5rem", border: "1px solid " + category.color }}>


                                                            <div className="col-sm-4">
                                                                <h6 style={{ lineHeight: '5rem', color: category.color, letterSpacing: ' 3.32px', fontWeight: '700' }}>{category.name}</h6>
                                                            </div>

                                                            <div className="col-sm-4">
                                                                <i className={category.iconDetails[0]?.class} style={{ lineHeight: '5rem', fontFamily: "fontAwesome", color: category.color, fontStyle: "normal" }}></i>
                                                            </div>



                                                            <div className="col-sm-4">
                                                                <label className="--switch mt-1" style={{ top: "18%", float: "right" }}>
                                                                    <input type="checkbox" id="prioritySupport" checked={props.publisedCatIds.includes(category._id)} name="BASIC" onChange={() => props.publishOrRemoveAdFromCategory(category._id, advertisementDetails._id)} />
                                                                    <span className="--slider">
                                                                        <i className="fa fa-check"></i>
                                                                        <i className="fa fa-times"></i>
                                                                    </span>
                                                                </label>
                                                            </div>

                                                        </div>


                                                    </div>
                                                )
                                            })
                                        }





                                    </div>

                                </TabPanel>

                                <TabPanel value="2">
                                    <div style={{ overflow: "auto", height: "450px" }}>

                                        <div className="input__wrap d-flex mb-2">

                                            <Select
                                                className="basic-single"
                                                classNamePrefix="select"
                                                value={props.defaultStateCountryCategory}
                                                name="country"
                                                options={countryList}
                                                onChange={(e) => props.onChangeCountry(e, advertisementDetails._id, '')}
                                                placeholder="Select Country"
                                                components={{
                                                    IndicatorSeparator: () => null
                                                  }}
                                            />

                                        </div>

                                        {
                                            props.categoryStateCountry &&

                                            <div className="input__wrap d-flex mb-2">

                                                <Select
                                                    className="basic-single"
                                                    classNamePrefix="select"
                                                    value={props.defaultStateCategory}
                                                    name="country"
                                                    options={props.categoryStateList}
                                                    getOptionLabel={e => (
                                                        e.state
                                                    )}

                                                    getOptionValue={e => (
                                                        e.id
                                                    )}
                                                    onChange={(e) => props.onChangeState(e, advertisementDetails._id)}
                                                    placeholder="Select State"
                                                    components={{
                                                        IndicatorSeparator: () => null
                                                      }}
                                                />

                                            </div>
                                        }

                                        {

                                            props.categoryState &&
                                            categoryList.length > 0 &&
                                            categoryList.map((category, i) => {
                                                // console.log(category)
                                                return (
                                                    <div className="px-5 pt-3 mt-0 mb-2" key={i}>
                                                        <div className="row" style={{ height: "5rem", border: "1px solid " + category.color }}>


                                                            <div className="col-sm-4">
                                                                <h6 style={{ lineHeight: '5rem', color: category.color, letterSpacing: ' 3.32px', fontWeight: '700' }}>{category.name}</h6>
                                                            </div>

                                                            <div className="col-sm-4">
                                                                <i className={category.iconDetails[0]?.class} style={{ lineHeight: '5rem', fontFamily: "fontAwesome", color: category.color, fontStyle: "normal" }}></i>
                                                            </div>



                                                            <div className="col-sm-4">
                                                                <label className="--switch mt-1" style={{ top: "18%", float: "right" }}>
                                                                    <input type="checkbox" id="prioritySupport" checked={props.publisedStateCatIds.includes(category._id)} name="BASIC" onChange={() => props.publishOrRemoveAdFromCategoryState(category._id, advertisementDetails._id)} />
                                                                    <span className="--slider">
                                                                        <i className="fa fa-check"></i>
                                                                        <i className="fa fa-times"></i>
                                                                    </span>
                                                                </label>
                                                            </div>

                                                        </div>


                                                    </div>
                                                )
                                            })
                                        }





                                    </div>

                                </TabPanel>


                            </TabContext>


                        </TabPanel>

                    </TabContext>



                </Box>




            </Dialog >
        </>

    )
}
export default AdvertiseSetting