import React from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button } from '@mui/material';
import helper from '../../../Common/Helper';
import noimg from '../../../assets/images/noimg1.png';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { WithContext as ReactTags } from 'react-tag-input';
import Chip from '@mui/material/Chip';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import MapboxAutocomplete from 'react-mapbox-autocomplete';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import mapboxgl from 'mapbox-gl';

mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default; // eslint-disable-line

const Map = ReactMapboxGl({
  accessToken: helper.MapBoxPrimaryKey
});

const Transition = React.forwardRef(function Transition(propss, ref) {
  return <Slide direction="up" {...propss} />;
});
const productv = {
  cursor: 'pointer',
  display: 'block',
  position: 'absolute',
  top: '0px',
  left: '0px',
  opacity: '0',
  height: '100%',
  width: '100%'
  // top: 0,
  // bottom: 0,
  // left: 0,
  // height: '100%',
  // appearance: 'none',
  // width: '100%',
  // 'WebkitAppearance': 'none',
  // '-moz-appearance': 'none',
};
let variantStyle = {
  fontSize: '14px',
  color: '#00ab55',
  // textTransform: "uppercase",
  // cursor: "pointer",
  marginRight: '10px',
  display: 'inline-block',
  // marginBottom: 0,
  border: '1px solid #9fbcc1',
  padding: '1px 28px 0px',
  borderRadius: '7px',
  marginBottom: '5px'
};

export default function AddProductForm(props) {
  console.log('iFrame, AddProductForm');
  const mapStyles = {
    londonCycle: 'mapbox://styles/mapbox/light-v9',
    light: 'mapbox://styles/mapbox/light-v9',
    dark: 'mapbox://styles/mapbox/dark-v9',
    basic: 'mapbox://styles/mapbox/basic-v9',
    outdoor: 'mapbox://styles/mapbox/outdoors-v10'
  };

  let stateData = props.stateData;

  // console.log(stateData)

  const sugg = (result, lat, lng, text) => {
    // console.log("result", result)
    // console.log("lat", lat)
    // console.log("lng", lng)
    // console.log("text", text)

    props.setstate({
      ...stateData,
      address: result,
      locationName: result,
      lat: lat,
      lng: lng
    });

    // setLocation({
    //   ...location,
    //   locationName: result,
    //   lat: lat,
    //   lng: lng
    // })
  };

  const adminData = JSON.parse(localStorage.getItem('adminData'));
  let url = stateData.galleryUrl;
  let id = url ? url?.split('?v=')[1].split('&')[0] : '';
  let embedlink = 'https://www.youtube.com/embed/' + id;
  return (
    <>
      <Dialog
        // fullScreen
        open={props.modal}
        onClose={() => props.setModal(false)}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => props.setModal(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {stateData?.id ? 'Update Product' : 'Add Product'}
            </Typography>
            <Button autoFocus color="inherit" onClick={() => props.submitProductForm()}>
              save
            </Button>
          </Toolbar>
        </AppBar>

        <div className="container mt-5" style={{ overflow: 'auto' }}>
          <div className="form-group row">
            <label className="col-form-label col-sm-2 ">Organization</label>
            <div className="col-sm-10">
              <select
                className="form-control"
                disabled={stateData.id ? true : false}
                onChange={(e) => {
                  props.changevalue(e);
                }}
                id="organization"
                name="organization"
              >
                <option selected disabled value="">
                  Select Organization
                </option>
                {props.campaignAdminList.length > 0 &&
                  props.campaignAdminList.map((admin, i) => {
                    // console.log(admin)

                    let obj = {};
                    obj.id = admin._id;
                    obj.country_id = admin.country_id;
                    obj.locationName = admin.countryDetails?.country;
                    obj.organizationLocation = admin.countryDetails.iso2;

                    return (
                      admin.status === 1 && (
                        <option
                          value={JSON.stringify(obj)}
                          selected={stateData.organization === admin._id}
                        >
                          {admin.name}
                        </option>
                      )
                    );
                  })}
              </select>

              {stateData.error && stateData.error.organization && (
                <p className="error">
                  {stateData.error
                    ? stateData.error.organization
                      ? stateData.error.organization
                      : ''
                    : ''}
                </p>
              )}
            </div>
          </div>
          {stateData.organization && (
            <div className="form-group row">
              <label className="col-form-label col-sm-2 ">Product Post In</label>
              <div className="col-sm-4">
                <MapboxAutocomplete
                  publicKey={helper.MapBoxPrimaryKey}
                  inputClass="form-control search"
                  query={stateData.address}
                  // defaultValue={stateData.locationName}
                  onSuggestionSelect={sugg}
                  country={stateData.organizationLocation}
                  resetSearch={false}
                />

                <div className="post-location-wrap">
                  <div className="px-3 py-20p bg-lighter rounded-3 my-20p">
                    <div className="d-flex align-items-center">
                      <div className="icon-wrap mr-20p">
                        <FontAwesomeIcon
                          icon={solid('location-dot')}
                          className="fs-3 text-primary"
                        />
                      </div>
                      <div className="info-wrap">
                        <div className="fs-6 mb-3p">Your post will be posted in</div>
                        <h3 className="mb-0 fs-4 fw-bolder">{stateData.address}</h3>
                      </div>
                    </div>
                  </div>
                  <div className="note note--clear">
                    <FontAwesomeIcon icon={regular('circle-info')} className="text-info mr-3p" />
                    <span>
                      Not the city you want to post in? Try using the search bar to choose another
                      location.
                    </span>
                  </div>
                  {stateData.error && stateData.error.address && (
                    <p className="error">
                      {stateData.error
                        ? stateData.error.address
                          ? stateData.error.address
                          : ''
                        : ''}
                    </p>
                  )}
                </div>
              </div>
              <div className="col-sm-1"></div>

              <div className="col-sm-4">
                <Map
                  style={mapStyles.outdoor}
                  // onMove={false}
                  zoom={[12]}
                  containerStyle={{
                    height: '300px',
                    width: '400px'
                  }}
                  center={[stateData.lng, stateData.lat]}
                >
                  <Layer type="symbol" id="marker" layout={{ 'icon-image': 'custom-marker' }}>
                    <Feature coordinates={[stateData.lng, stateData.lat]} />
                  </Layer>
                </Map>
              </div>
            </div>
          )}

          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              Headline
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control "
                name="headline"
                id="headline"
                value={stateData.headline}
                onChange={(e) => {
                  props.changevalue(e);
                }}
              />

              {stateData.error && stateData.error.headline && (
                <p className="error">
                  {stateData.error
                    ? stateData.error.headline
                      ? stateData.error.headline
                      : ''
                    : ''}
                </p>
              )}
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              Brand
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control "
                name="brand"
                id="brand"
                value={stateData.brand}
                onChange={(e) => {
                  props.changevalue(e);
                }}
              />

              {stateData.error && stateData.error.brand && (
                <p className="error">
                  {stateData.error ? (stateData.error.brand ? stateData.error.brand : '') : ''}
                </p>
              )}
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              Slug
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control "
                disabled={stateData?.id ? true : false}
                name="slug"
                id="slug"
                value={stateData.slug}
                onChange={(e) => {
                  props.changevalue(e);
                }}
              />

              {stateData.error && stateData.error.slug && (
                <p className="error">
                  {stateData.error ? (stateData.error.slug ? stateData.error.slug : '') : ''}
                </p>
              )}
            </div>
          </div>

          <div className="form-group row">
            <label className="col-form-label col-sm-2" htmlFor="inputstock">
              Main Image
            </label>
            <div className="col-sm-10">
              <input
                type="file"
                className={
                  stateData.error?.image
                    ? 'inputerror custom-file-input form-control'
                    : ' custom-file-input form-control'
                }
                id="mainImg"
                name="mainImg"
                accept="image/*"
                onChange={(e) => {
                  props.changefile(e);
                }}
              />
              {/* <label className="custom-file-label" htmlFor="customFile" style={{ margin: "0px 10px 0px 10px" }}> Choose file </label> */}
              <p className="error">
                {stateData.error ? (stateData.error.image ? stateData.error.image : '') : ''}
              </p>
              {props.Img || props.tempImg ? (
                <img
                  src={
                    props.tempImg
                      ? props.tempImg
                      : props.Img
                      ? props.Img !== ''
                        ? helper.CampaignProductImagePath + props.Img
                        : noimg
                      : noimg
                  }
                  alt="lk"
                  style={{ width: '100px', height: '100px' }}
                />
              ) : (
                ''
              )}
            </div>
          </div>

          <div className="form-group row">
            <label className="col-form-label col-sm-2" htmlFor="inputstock">
              More of Product (optional)
            </label>
            <div className="col-sm-10">
              <input
                className="custom-file-input form-control"
                name="moreImg[]"
                id="moreImg"
                type="file"
                accept=".jpg,.gif,.png"
                multiple
                onChange={(e) => {
                  props.changefile(e);
                }}
              />
              {/* <label className="custom-file-label" htmlFor="customFile" style={{ margin: "0px 10px 0px 10px" }}> Choose files </label> */}

              <div className="grid w-100">
                {props.moreTempImages?.length
                  ? props.moreTempImages.map((img, key) => {
                      return (
                        <div
                          className="gallery__img"
                          style={{
                            backgroundImage: `url(${img ? img : noimg})`
                            // width: '100px',
                            // height: '100px'
                          }}
                          alt="lk"
                        ></div>
                      );
                    })
                  : props.moreImages?.length
                  ? props.moreImages.map((img, key) => {
                      return (
                        <img
                          src={
                            img
                              ? img !== ''
                                ? helper.CampaignProductImagePath + img
                                : noimg
                              : noimg
                          }
                          alt="lk"
                          style={{ width: '100px', height: '100px' }}
                        />
                      );
                    })
                  : ''}
              </div>

              <p className="error">
                {stateData.error ? (stateData.error.moreImg ? stateData.error.moreImg : '') : ''}
              </p>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              Unlimited
            </label>
            <div className="col-sm-10">
              <label className="--switch mt-1">
                <input
                  type="checkbox"
                  id="unlimited"
                  checked={stateData.unlimited}
                  name="unlimited"
                  onChange={(e) => props.changevalue(e)}
                />
                <span className="--slider">
                  <i className="fa fa-check"></i>
                  <i className="fa fa-times"></i>
                </span>
              </label>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              <i className="fa fa-calculator" aria-hidden="true"></i>
            </label>
            <div className="col-sm-10">
              <label className="--switch mt-1">
                <input
                  type="checkbox"
                  id="tax"
                  checked={stateData.tax}
                  name="tax"
                  onChange={(e) => props.changevalue(e)}
                />
                <span className="--slider">
                  <i className="fa fa-check"></i>
                  <i className="fa fa-times"></i>
                </span>
              </label>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              <i className="fa fa-tag" aria-hidden="true"></i>
            </label>
            <div className="col-sm-10">
              <label className="--switch mt-1">
                <input
                  type="checkbox"
                  id="postTag"
                  checked={stateData.postTag}
                  name="postTag"
                  onChange={(e) => props.changevalue(e)}
                />
                <span className="--slider">
                  <i className="fa fa-check"></i>
                  <i className="fa fa-times"></i>
                </span>
              </label>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              Price
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control "
                name="price"
                id="price"
                value={stateData.price}
                onChange={(e) => {
                  props.changevalue(e);
                }}
              />

              {stateData.error && stateData.error.price && (
                <p className="error">
                  {stateData.error ? (stateData.error.price ? stateData.error.price : '') : ''}
                </p>
              )}
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              Quantity
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control "
                name="quantity"
                id="quantity"
                value={stateData.quantity}
                onChange={(e) => {
                  props.changevalue(e);
                }}
              />

              {stateData.error && stateData.error.quantity && (
                <p className="error">
                  {stateData.error
                    ? stateData.error.quantity
                      ? stateData.error.quantity
                      : ''
                    : ''}
                </p>
              )}
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-2">
              <label htmlFor="category">Category</label>
            </div>
            <div className="col-sm-10">
              <select
                className="form-control"
                onChange={(e) => {
                  props.changevalue(e);
                }}
                id="category"
                name="category"
              >
                <option selected disabled value=" ">
                  Select Category
                </option>
                {props.categoryList.length > 0 &&
                  props.categoryList.map((cat, i) => {
                    return (
                      cat.status === 1 && (
                        <option value={cat._id} selected={stateData.category === cat._id}>
                          {cat.name}
                        </option>
                      )
                    );
                  })}
              </select>
              <p className="error">
                {stateData.error ? (stateData.error.category ? stateData.error.category : '') : ''}
              </p>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-2">
              <label htmlFor="category">SubCategory</label>
            </div>
            <div className="col-sm-10">
              <select
                className="form-control"
                onChange={(e) => {
                  props.changevalue(e);
                }}
                id="subcategory"
                name="subcategory"
              >
                <option selected disabled value=" ">
                  Select SubCategory
                </option>
                {props.subcategoryList.length > 0 &&
                  props.subcategoryList.map((cat, i) => {
                    return (
                      cat.status === 1 && (
                        <option value={cat._id} selected={stateData.subcategory === cat._id}>
                          {cat.name}
                        </option>
                      )
                    );
                  })}
              </select>
              <p className="error">
                {stateData.error
                  ? stateData.error.subcategory
                    ? stateData.error.subcategory
                    : ''
                  : ''}
              </p>
            </div>
          </div>

          <div className="form-group row">
            <div className="col-sm-2">
              <label htmlFor="tags">Tags</label>
            </div>
            {/* <label className="col-form-label col-2 text-sm-right" htmlFor="inputstock">Tags</label> */}
            <div className="col-sm-10">
              {/* {console.log(variants)} */}
              <ReactTags
                handleDelete={props.handleDelete}
                handleAddition={props.handleAddition}
                handleDrag={props.handleDrag}
                delimiters={props.delimiters}
                handleTagClick={props.handleTagClick}
                onClearAll={props.onClearAll}
                onTagUpdate={props.onTagUpdate}
                placeholder="Enter Tags..."
                // minQueryLength={10}
                // maxLength={15}
                autofocus={false}
                allowDeleteFromEmptyInput
                autocomplete
                readOnly={false}
                allowUnique
                allowDragDrop
                inline
                allowAdditionFromPaste
                editable
                clearAll
                tags={props.tags}
              />
              <p className="error">
                {stateData.error ? (stateData.error.tags ? stateData.error.tags : '') : ''}
              </p>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-form-label col-sm-2 ">Projects</label>
            <div className="col-sm-10">
              {props.projectList &&
                props.projectList.length > 0 &&
                props.projectList.map((project, i) => {
                  return (
                    <>
                      <p
                        style={{
                          ...variantStyle,
                          position: 'relative',
                          backgroundColor: props.seletedProjectList.includes(project._id)
                            ? '#00ab55'
                            : 'white',
                          color: props.seletedProjectList.includes(project._id)
                            ? 'white'
                            : '#00ab55'
                        }}
                        key={i}
                      >
                        <input
                          type="checkbox"
                          id={project._id}
                          checked={props.seletedProjectList.includes(project._id)}
                          style={productv}
                          name={'project_' + i}
                          onClick={(e) => props.onSelectProject(e)}
                        />
                        {project.name}
                      </p>
                    </>
                  );
                })}
            </div>
          </div>

          <Divider className="p-4">
            <Chip label="Need Details" />
          </Divider>

          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              Need Headline
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control "
                name="needheadline"
                id="needheadline"
                value={stateData.needheadline}
                onChange={(e) => {
                  props.changevalue(e);
                }}
              />

              {stateData.error && stateData.error.needheadline && (
                <p className="error">
                  {stateData.error
                    ? stateData.error.needheadline
                      ? stateData.error.needheadline
                      : ''
                    : ''}
                </p>
              )}
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              Need Gallery <small>(optional)</small>
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control "
                name="galleryUrl"
                id="galleryUrl"
                value={stateData.galleryUrl}
                onChange={(e) => {
                  props.changevalue(e);
                }}
              />

              {
                stateData.galleryUrl && (
                  <div className="project-video-wrap mt-4">
                    <iframe
                      title="product-video"
                      key="product-video"
                      width="498"
                      height="280"
                      src={stateData.galleryUrl}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )
                // <iframe className='mt-4' width="400" height="200" title="myFrame" src={embedlink} frameBorder="0" allowFullScreen=""></iframe>
                // <iframe id="video1" width="520" title="myFrame" height="360" src={stateData.video} frameBorder="0" allowtransparency="true" ></iframe>
              }

              {stateData.error && stateData.error.galleryUrl && (
                <p className="error">
                  {stateData.error
                    ? stateData.error.galleryUrl
                      ? stateData.error.galleryUrl
                      : ''
                    : ''}
                </p>
              )}
            </div>
          </div>

          <div className="form-group row">
            <label className="col-form-label col-sm-2" htmlFor="inputstock">
              Need Description
            </label>
            <div className="col-sm-10">
              <ReactQuill
                theme="snow"
                value={stateData.description}
                onChange={(e) => props.handleOnDiscriptionChangeValue(e)}
                style={{ height: '240px', marginBottom: '50px' }}
                name="description"
              />
              <p className="error">
                {stateData.error
                  ? stateData.error.description
                    ? stateData.error.description
                    : ''
                  : ''}
              </p>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-form-label col-sm-2" htmlFor="inputstock">
              Gallery Iamges
            </label>
            <div className="col-sm-10">
              <input
                className="custom-file-input form-control"
                name="galleryImg[]"
                id="galleryImg"
                type="file"
                accept=".jpg,.gif,.png"
                multiple
                onChange={(e) => {
                  props.changefile(e);
                }}
              />
              {/* <label className="custom-file-label" htmlFor="customFile" style={{ margin: "0px 10px 0px 10px" }}> Choose files </label> */}

              <div className="grid w-100">
                {props.gallaryTempImages?.length
                  ? props.gallaryTempImages.map((img, key) => {
                      return (
                        <div
                          className="gallery__img"
                          style={{
                            backgroundImage: `url(${img ? img : noimg})`
                            // width: '100px',
                            // height: '100px'
                          }}
                          alt="lk"
                        ></div>
                      );
                    })
                  : props.gallaryImages?.length
                  ? props.gallaryImages.map((img, key) => {
                      return (
                        <img
                          src={
                            img
                              ? img !== ''
                                ? helper.CampaignProductImagePath + img
                                : noimg
                              : noimg
                          }
                          alt="lk"
                          style={{ width: '100px', height: '100px' }}
                        />
                      );
                    })
                  : ''}
              </div>

              <p className="error">
                {stateData.error
                  ? stateData.error.galleryImg
                    ? stateData.error.galleryImg
                    : ''
                  : ''}
              </p>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-form-label col-sm-2 ">Status</label>
            <div className="col-sm-10">
              <select
                className="form-control"
                onChange={(e) => {
                  props.changevalue(e);
                }}
                id="status"
                name="status"
              >
                <option
                  selected={stateData ? (stateData.status === 1 ? 'selected' : '') : ''}
                  value="1"
                >
                  Active
                </option>
                <option
                  selected={stateData ? (stateData.status === 0 ? 'selected' : '') : ''}
                  value="0"
                >
                  Inactive
                </option>
              </select>

              {stateData.error && stateData.error.status && (
                <p className="error">
                  {stateData.error ? (stateData.error.status ? stateData.error.status : '') : ''}
                </p>
              )}
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
