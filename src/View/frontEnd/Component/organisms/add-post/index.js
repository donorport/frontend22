import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import React, { useEffect, useState, useContext } from 'react';
import './style.scss';
import {
  Button,
  Accordion,
  AccordionContext,
  //useAccordionButton,
  Card,
  Col,
  Row
} from 'react-bootstrap';

import ToggleSwitch from '../../atoms/toggle-switch';
import { WithContext as ReactTags } from 'react-tag-input';
import noimg from '../../../../../assets/images/noimg1.png';
import helper, { priceFormat } from '../../../../../Common/Helper';
import MapboxAutocomplete from 'react-mapbox-autocomplete';
import { useSelector } from 'react-redux';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import Textarea from '../text-area';
import Input from '../input';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default; // eslint-disable-line

const Map = ReactMapboxGl({
  accessToken: helper.MapBoxPrimaryKey
});

const STYLE_CURSOR_POINTER = {
  cursor: 'pointer'
};

function CategorySelect({ nameTitle, nameKey, thisCat, thisCatList, onChange, error }) {
  return (
    <div className="form-group ">
      <div className="">
        <select
          className="form-control"
          onChange={(e) => {
            onChange(e);
          }}
          id={nameKey}
          name={nameKey}
          style={STYLE_CURSOR_POINTER}
        >
          <optgroup label={nameTitle}>
            {thisCatList.length > 0 &&
              thisCatList
                .sort((a, b) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }))
                .map(
                  (cat, index) =>
                    cat.status === 1 && (
                      <option
                        key={cat._id}
                        value={cat._id}
                        selected={thisCat ? thisCat === cat._id : index === 0}
                      >
                        {cat.name}
                      </option>
                    )
                )}
          </optgroup>
        </select>
        {error && error[nameKey] && <p className="error">{error[nameKey]}</p>}
      </div>
    </div>
  );
}

function AccordionToggle({ children, eventKey, callback }) {
  const { activeEventKey } = useContext(AccordionContext);
  // window.scrollTo(0, 0);

  const isCurrentEventKey = activeEventKey === eventKey;

  return (
    <div className="accordion__btn">
      <div className="d-flex aling-items-center">
        {children}
        <FontAwesomeIcon
          icon={solid('angle-right')}
          className={`accordion__icon ms-2 fs-4 ${isCurrentEventKey ? 'rotate-90' : ''}`}
        />
      </div>
    </div>
  );
}

const STYLES_imageUploadWrap = {
  marginTop: '20px',
  // border: " 4px dashed #3773c6",
  position: 'relative',
  width: '100%'
};

const STYLES_fileUploadInput = {
  position: 'absolute',
  margin: 0,
  padding: 0,
  width: '100%',
  height: '100%',
  outline: 'none',
  opacity: 0,
  cursor: 'pointer'
};

const STYLES_mapStyles = {
  londonCycle: 'mapbox://styles/mapbox/light-v9',
  light: 'mapbox://styles/mapbox/light-v9',
  dark: 'mapbox://styles/mapbox/dark-v9',
  basic: 'mapbox://styles/mapbox/basic-v9',
  outdoor: 'mapbox://styles/mapbox/outdoors-v10'
};

const AddPost = (props) => {
  let organizationDetails = props.organizationDetails;
  console.log(`AddPost component:\n~~`, { organizationDetails }); // {_id, _name: 'Alter Ego', ein, organizationUserName, .....}
  let stateData = props.stateData;
  const user = useSelector((state) => state.user);
  console.log('AddPost', { user });
  const {
    //id,
    //status,
    //title,
    //subtitle,
    category,
    subcategory,
    description,
    //loading,
    price,
    //image,
    quantity,
    //organization,
    slug,
    error,
    //moreImg,
    galleryUrl,
    headline,
    brand,
    needheadline,
    //galleryImg,
    unlimited,
    tax,
    postTag,
    address,
    lat,
    lng,
    media,
    displayPrice
  } = props.stateData;

  // console.log(displayPrice)

  let submitProductForm = props.submitProductForm;
  let changevalue = props.changevalue;
  let handleDelete = props.handleDelete;
  let handleAddition = props.handleAddition;
  let handleDrag = props.handleDrag;
  let handleTagClick = props.handleTagClick;
  let onClearAll = props.onClearAll;
  let onTagUpdate = props.onTagUpdate;
  let tags = props.tags;
  let categoryList = props.categoryList;
  let subcategoryList = props.subcategoryList;
  let Img = props.Img;
  let tempImg = props.tempImg;
  let changefile = props.changefile;
  let moreTempImages = props.moreTempImages;
  let moreImages = props.moreImages;
  let projectList = props.projectList;
  //let onSelectProject = props.onSelectProject;
  let seletedProjectList = props.seletedProjectList;
  let gallaryTempImages = props.gallaryTempImages;
  let gallaryImages = props.gallaryImages;
  let removedProjects = props.removedProjects;

  const change = (e) => {
    props.changevalue(e);
  };

  const setModelShow = props.setModelShow;
  console.log({ seletedProjectList, removedProjects, projectList });

  const [location, setLocation] = useState({
    organizationLocation: '',
    locationName: '',
    lat: user.lat,
    lng: user.lng
  });

  console.log(galleryUrl);
  let url = galleryUrl;
  let videoid = url ? url?.split('?v=')[1].split('&')[0] : '';
  let embedlink = videoid ? 'https://www.youtube.com/embed/' + videoid : '';

  // console.log(gallaryImages)

  useEffect(() => {
    // console.log(user)
    // console.log(props.data)
    // console.log(lat, lng)

    setLocation({
      ...location,
      organizationLocation: props.data.iso2,
      locationName: address ? address : props.data.country,
      lat: lat ? Number(lat) : 0,
      lng: lng ? Number(lng) : 0
    });
  }, [props.data, stateData]);

  const sugg = (result, lat, lng) => {
    console.log('add-post fn sugg:', { result, lat, lng });
    props.setstate({
      ...stateData,
      address: result,
      lat: lat,
      lng: lng
    });

    setLocation({
      ...location,
      locationName: result,
      lat: lat,
      lng: lng
    });
  };

  // WHY?????? Why not use regular constants?!?!?!?!?!
  const [id1] = useState('headline');
  const [id2] = useState('brand');
  const [id3] = useState('needheadline');
  const [id4] = useState('description');
  const [title1] = useState('Headline');
  const [title2] = useState('Brand');
  const [title3] = useState('Need Headline');
  const [title4] = useState('Need Description');
  const [placeholder1] = useState("Ex: Children's Bicycle");
  const [placeholder2] = useState('Ex: Hasbro ©');
  const [placeholder3] = useState('Ex: For inner-city kids in Colorado');
  const [placeholder4] = useState('Enter some details about your need');
  const [rows] = useState(6);
  const [max20] = useState(20);
  const [max45] = useState(45);
  const [max250] = useState(250);
  const [loadingId, setLoadingId] = useState([]);

  const id5 = 'galleryUrl';
  const title5 = 'YouTube URL';

  //const Banner = () => {
  //return <div className="banner">Loading...</div>;
  //};

  return (
    <div className="add-post">
      {/* {console.log(location)} */}
      <div className="d-flex align-items-center flex-grow-1 pb-20p mb-3 border-bottom flex-wrap">
        <Button variant="link" className="me-sm-2 me-1" onClick={() => props.createPost(false)}>
          <FontAwesomeIcon icon={solid('angle-left')} className="text-subtext fs-3" />
        </Button>
        {stateData.status !== 1 ? (
          <div className="lh-1 fs-3 fw-bolder me-sm-3 flex__1">Create Post</div>
        ) : (
          <div className="lh-1 fs-3 fw-bolder me-sm-3 flex__1">Edit Post</div>
        )}

        <div className="d-flex gap-2">
          {stateData.status !== 1 && (
            <SaveCreateButtons
              loading={props.loading}
              submitProductForm={submitProductForm}
              setModelShow={setModelShow}
              selectedProjectList={seletedProjectList}
            />
          )}
          {stateData.status === 1 && (
            <Button
              style={{ opacity: props.loading ? '0.7' : '1' }}
              variant="info"
              size="lg"
              className="fw-bold fs-6"
              onClick={() => !props.loading && submitProductForm(-1)}
            >
              Unpublish
            </Button>
          )}
          {stateData.status === 1 && (
            <Button
              style={{ opacity: props.loading ? '0.7' : '1' }}
              variant="success"
              size="lg"
              className="d-flex align-items-center justify-content-center fs-6 fw-bold"
              onClick={() => !props.loading && submitProductForm(1, seletedProjectList)}
            >
              Save Changes
              {props.loading && <CircularProgress className="ms-2" color="inherit" size={12} />}
            </Button>
          )}
        </div>
      </div>
      {/* <div className="studio__note d-sm-flex align-items-center py-2 px-3 border rounded mb-5">
        <div className="studio__thumb p-1 mr-20p d-none d-sm-block">
          <img
            className="img-fluid"
            alt=""
            src=""
          />
        </div>
        <div className="flex__1 text-light mb-2 text-center text-sm-start">
          <div className="fs-5">This category has a free posting limit of 3.</div>
          <a
            href="/"
            className="studio__url mt-6p d-flex text-light justify-content-center justify-content-sm-start"
          >
            <FontAwesomeIcon icon={regular('circle-location-arrow')} className="me-1" />
            <div className="fw-semibold fs-7">You have 3 posts remaining</div>
          </a>
        </div>
        <div className="d-grid">
          <Button variant="info" className="btn__upgrade fs-7">
            Upgrade
          </Button>
        </div>
      </div>*/}

      <div>
        <Accordion alwaysOpen>
          <AccordionToggle>
            <h2 className="fs-3 fw-bolder ">Post Location</h2>
          </AccordionToggle>

          <Accordion.Collapse className="py-5">
            <Row className="mw-850 ml-5">
              <Col lg="6">
                {/* <SearchBox accessToken={helper.MapBoxPrimaryKey} /> */}
                {/* <SearchBox
                    accessToken={helper.MapBoxPrimaryKey}
                    options={{
                      language: 'en',
                      country: 'US',
                    }}>
              

                  </SearchBox> */}

                <MapboxAutocomplete
                  publicKey={helper.MapBoxPrimaryKey}
                  inputClass="form-control search"
                  query={location.locationName}
                  defaultValue={location.locationName}
                  onSuggestionSelect={sugg}
                  country={location.organizationLocation}
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
                        <h3 className="mb-0 fs-4 fw-bolder">{location.locationName}</h3>
                      </div>
                    </div>
                  </div>
                  {error && error.address && (
                    <p className="error">{error ? (error.address ? error.address : '') : ''}</p>
                  )}
                  <div className="note note--clear">
                    <FontAwesomeIcon icon={regular('circle-info')} className="text-info mr-3p" />
                    <span>
                      Not the city you want to post in? Try using the search bar to choose another
                      location.
                    </span>
                  </div>
                </div>
              </Col>
              <Col lg="6">
                <Map
                  style={STYLES_mapStyles.outdoor}
                  // onMove={false}
                  zoom={[12]}
                  containerStyle={{
                    height: '300px',
                    width: '400px'
                  }}
                  center={[location.lng, location.lat]}
                >
                  <Layer type="symbol" id="marker" layout={{ 'icon-image': 'custom-marker' }}>
                    <Feature coordinates={[location.lng, location.lat]} />
                  </Layer>

                  {/* <Marker coordinates={[72.6563128, 23.0001899]} anchor="bottom">
                      <h1>marker</h1>
                    </Marker> */}
                </Map>
              </Col>
            </Row>
          </Accordion.Collapse>

          <AccordionToggle>
            <h2 className="fs-3 fw-bolder ">Product Details</h2>
          </AccordionToggle>

          <Accordion.Collapse className="py-0 pt-5 py-sm-5">
            <>
              <Row className="mw-850 ml-5 mb-0 mb-sm-5">
                <div className="col-lg-6 mb-5 mb-sm-0">
                  <form className="d-flex flex-column profile-detail-form gap-2">
                    <div>
                      <Input
                        id={id1}
                        name={id1}
                        value={headline}
                        maxInput={max20}
                        maxLength={max20}
                        title={title1}
                        placeholder={placeholder1}
                        onChange={change}
                        error={error}
                      />
                      {error && error.headline && (
                        <p className="error">
                          {error ? (error.headline ? error.headline : '') : ''}
                        </p>
                      )}
                    </div>
                    <div>
                      <Input
                        id={id2}
                        name={id2}
                        value={brand}
                        maxInput={max20}
                        maxLength={max20}
                        title={title2}
                        placeholder={placeholder2}
                        onChange={change}
                        error={error}
                      />
                      {/* <p className="error">Required</p> */}
                      {error && error.brand && (
                        <p className="error">{error ? (error.brand ? error.brand : '') : ''}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="brandInput" className="form__label">
                        Slug
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        // id="brandInput"
                        placeholder="Slug"
                        //disabled={id ? true : false}
                        disabled={true}
                        name="slug"
                        id="slug"
                        value={slug}
                        // onChange={(e) => {
                        //   changevalue(e);
                        // }}
                      />
                      {error && error.slug && (
                        <p className="error">{error ? (error.slug ? error.slug : '') : ''}</p>
                      )}
                    </div>
                    <div className="d-flex flex-wrap price-group-wrap gap-2 mb-3">
                      <div className="d-flex gap-3">
                        <div className="form-group">
                          <label htmlFor="priceInput" className="form__label">
                            Unit Price
                          </label>
                          <input
                            type="text"
                            placeholder="$0"
                            className="form-control form-control-lg"
                            // id="priceInput"
                            name="price"
                            id="price"
                            value={price}
                            onChange={(e) => {
                              changevalue(e);
                            }}
                          />

                          {error && error.price && (
                            <p className="error">{error ? (error.price ? error.price : '') : ''}</p>
                          )}
                        </div>

                        <div className="form-group">
                          <label htmlFor="priceInput" className="form__label">
                            Display Price
                          </label>
                          <input
                            type="text"
                            placeholder="$0"
                            className="form-control form-control-lg"
                            disabled
                            // id="priceInput"
                            name="displayprice"
                            id="displayprice"
                            value={priceFormat(Number(displayPrice))}
                          />
                        </div>
                        <div className="form-group quantity-from-group">
                          <label htmlFor="quantityInput" className="form__label">
                            Quantity
                          </label>
                          <input
                            type="text"
                            className="form-control form-control-lg studio__input--quantity"
                            // id="quantityInput"
                            placeholder="12"
                            name="quantity"
                            id="quantity"
                            disabled={unlimited}
                            value={quantity}
                            onChange={(e) => {
                              changevalue(e);
                            }}
                          />
                          {error && error.quantity && (
                            <p className="error">
                              {error ? (error.quantity ? error.quantity : '') : ''}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="form-group unlimited-switch-wrap">
                        <div className="bg-purple text-nowrap fs-8 fw-semibold rounded-3 p-6p mb-2 text-white">
                          Unlimited
                          <FontAwesomeIcon icon={solid('infinity')} className="ml-3p" />
                        </div>
                        <ToggleSwitch
                          id="unlimited"
                          checked={unlimited}
                          name="unlimited"
                          changevalue={changevalue}
                        />
                      </div>
                    </div>
                    <div className="note note--info mb-3 fs-6">
                      <span className="">
                        Enter the unit price before taxes. Your{' '}
                        <Link
                          to={'/campaign/' + organizationDetails?.slug + '/settings/payments'}
                          style={{ color: '#3a94d4' }}
                        >
                          regional sales tax
                        </Link>{' '}
                        will be automatically applied to the price of the item to ensure you receive
                        enough funds to purchase the item(s).
                      </span>
                    </div>
                    <div className="keyword-tags-wrap my-2">
                      <div className="form-group">
                        <label htmlFor="keywordsInput" className="form__label pb-3">
                          <FontAwesomeIcon
                            icon={solid('magnifying-glass')}
                            className="me-2 text-primary"
                          />
                          Keywords Tags
                          <span className="fs-8 ms-1 text-light fw-normal">(up to 3)</span>
                        </label>
                        {/* <input
                            type="text"
                            className="form-control form-control-lg"
                            id="keywordsInput"
                            placeholder="Keywords..."
                          /> */}
                        <ReactTags
                          handleDelete={handleDelete}
                          handleAddition={handleAddition}
                          handleDrag={handleDrag}
                          // delimiters={[188,3]}
                          handleTagClick={handleTagClick}
                          onClearAll={onClearAll}
                          onTagUpdate={onTagUpdate}
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
                          tags={tags}
                        />

                        {error && error.tags && (
                          <p className="error">{error ? (error.tags ? error.tags : '') : ''}</p>
                        )}
                      </div>
                    </div>
                    <div className="post-type-wrap">
                      <label className="form__label">
                        Post Type
                        <span className="fs-7 text-light ms-1 fw-normal">(optional)</span>
                      </label>
                      <div className="d-flex gap-2">
                        <div className="d-flex align-items-center">
                          <FontAwesomeIcon className="fs-3 text-info" icon={solid('paperclip')} />
                          <div className="d-flex py-12p px-18p">
                            <ToggleSwitch
                              id="tax"
                              checked={tax}
                              name="tax"
                              changevalue={changevalue}
                            />
                          </div>
                        </div>
                        <div className="d-flex align-items-center">
                          <FontAwesomeIcon className="fs-3" color="#947ada" icon={solid('tag')} />
                          <div className="d-flex py-12p px-18p">
                            <ToggleSwitch
                              id="postTag"
                              checked={postTag}
                              name="postTag"
                              changevalue={changevalue}
                            />
                          </div>
                        </div>
                        <div className="d-flex align-items-center image__switch-wrap">
                          <FontAwesomeIcon className="fs-3 text-primary" icon={solid('image')} />
                          <div className="d-flex py-12p px-18p">
                            <ToggleSwitch checked={media} name="media" changevalue={changevalue} />
                          </div>
                        </div>
                      </div>
                      <div className="note note--info mb-1 fs-6">
                        <span>
                          Will you be uploading media after you have purchased the items? Posts that
                          upload pictures / videos of the proceeds tend to get funded quicker.
                        </span>
                      </div>
                      <div className="d-flex note note--info mb-1 fs-6">
                        <FontAwesomeIcon
                          className="me-2 fs-3 text-info"
                          icon={solid('paperclip')}
                        />
                        Toggle this if you intend on providing a tax receipt for donations made
                        toward this post.
                      </div>
                      <div className="d-flex note note--info mb-5 fs-6">
                        <FontAwesomeIcon
                          className="me-2 fs-3"
                          color="#947ada"
                          icon={solid('tag')}
                        />
                        Toggle this if you have already purchased these items and are posting to
                        recouperate the cost.
                      </div>
                    </div>

                    <div className="item-category-select">
                      <span className="title">Item Category</span>
                      <div className="d-flex gap-2">
                        <CategorySelect
                          nameTitle="Category"
                          nameKey="category"
                          thisCat={category}
                          thisCatList={categoryList}
                          onChange={changevalue}
                          error={error}
                        />
                        <CategorySelect
                          nameTitle="SubCategory"
                          nameKey="subcategory"
                          thisCat={subcategory}
                          thisCatList={subcategoryList}
                          onChange={changevalue}
                          error={error}
                        />
                      </div>
                    </div>
                  </form>
                </div>
                <div className="col-lg-6">
                  <form className="video-detail-form">
                    <div className="main-upload-image-wrap">
                      <div className="form__label">
                        Product Image
                        {props.loading && loadingId && (
                          // <CircularProgress className="ms-1" color="inherit" size={21} />
                          <Box sx={{ width: '100%' }}>
                            <LinearProgress />
                          </Box>
                        )}
                      </div>
                      {/* <div className="upload-wrap mb-3">
                          {Img || tempImg ? (
                            <img
                              src={
                                tempImg
                                  ? tempImg
                                  : Img
                                  ? Img !== ''
                                    ? helper.CampaignProductFullImagePath + Img
                                    : noimg
                                  : noimg
                              }
                              alt="lk"
                              className=""
                              style={{ objectFit: 'contain' }}
                            />
                          ) : (
                            <FontAwesomeIcon
                              icon={solid('cloud-arrow-up')}
                              className="icon-cloud"
                            />
                          )}
                          <label>
                            <input
                              type="file"
                              id="mainImg"
                              name="mainImg"
                              onChange={(e) => {
                                setLoadingId(true);
                                changefile(e);
                              }}
                            />
                          </label>
                        </div> */}
                      <div
                        className="image-upload-wrap fs-2 mb-3"
                        // style={{
                        //   ...STYLES_imageUploadWrap,
                        //   border:
                        //     !props.tempImgName &&
                        //     props.tempImgName === '' &&
                        //     stateData.error.identityDocumentImage
                        //       ? '4px dashed red'
                        //       : '4px dashed #3773c6'
                        // }}
                        style={{
                          ...STYLES_imageUploadWrap,
                          // backgroundColor: '#e5f4ff',
                          borderRadius: '9px',
                          border: '2px dashed rgba(62, 170, 255, 0.58)',
                          fontSize: '60px'
                        }}
                      >
                        <input
                          className="file-upload-input"
                          type="file"
                          id="mainImg"
                          name="mainImg"
                          onChange={(e) => {
                            setLoadingId(true);
                            changefile(e);
                          }}
                          accept="image/*"
                          style={STYLES_fileUploadInput}
                          // title="upload an image"
                        />
                        {Img || tempImg ? (
                          <img
                            src={
                              tempImg
                                ? tempImg
                                : Img
                                ? Img !== ''
                                  ? helper.CampaignProductFullImagePath + Img
                                  : noimg
                                : noimg
                            }
                            alt="lk"
                            className="w-100"
                            style={{ objectFit: 'contain' }}
                          />
                        ) : (
                          <div
                            className="drag-text"
                            style={{ textAlign: 'center', padding: '70px' }}
                          >
                            <FontAwesomeIcon
                              icon={solid('cloud-arrow-up')}
                              className="icon-cloud"
                            />
                            <h3 style={{ fontSize: 'inherit' }}>
                              {props.tempImgName && props.tempImgName !== ''
                                ? props.tempImgName
                                : stateData?.error?.identityDocumentImage
                                ? 'Please Upload Selected Document'
                                : 'Drag and drop or Select File'}
                            </h3>
                          </div>
                        )}
                      </div>
                      {error && error.image && (
                        <p className="error">{error ? (error.image ? error.image : '') : ''}</p>
                      )}
                      <canvas id="canvas1" width={300} height={300}></canvas>
                    </div>
                    {props.loading && loadingId && (
                      <Box sx={{ width: '100%' }}>
                        <div className="d-flex note note--info mb-3 fs-5 gap-2">
                          <CircularProgress color="secondary" size={21}></CircularProgress>
                          <FontAwesomeIcon
                            icon={regular('bolt')}
                            className="text-info icon-method mr-3p fs-4"
                          />
                          Processing uploaded image...
                          {/* <span className="">
                          Please upload a transparent image of the product. Click{' '}
                          <a
                            href="https://www.youtube.com/watch?v=G3Y5PcuH23Y"
                            target="_blank"
                            rel="noreferrer"
                          >
                            here
                          </a>{' '}
                          to learn more about transparent images and how to find them, or use this{' '}
                          <a href="https://www.remove.bg/upload" target="_blank" rel="noreferrer">
                            free online tool
                          </a>{' '}
                          to remove a background.
                        </span> */}
                        </div>
                      </Box>
                    )}
                    {!props.loading && (
                      <Box sx={{ width: '100%' }}>
                        <div className="d-flex note note--info mb-3 fs-6">
                          <span className="">
                            Upload an image of the product with a transparent background. The image
                            should closesly resemble the product you will purchase but does not need
                            to be exact. Accepted file formats:{' '}
                            <a className="link">png, jpg, svg</a>
                          </span>
                        </div>
                      </Box>
                    )}
                    <div>
                      <div className="project-title-optional">
                        <div className="form__label">
                          More of Product
                          <span className="fs-7 text-light ms-1 fw-normal">(optional)</span>
                        </div>
                      </div>
                      <div className="d-flex align-items-center flex-wrap gap-2 mb-3">
                        {/* <div className="upload-wrap" style={{ width: "100%" }}>
                            <FontAwesomeIcon
                              icon={solid("cloud-arrow-up")}
                              className="icon-cloud"
                            />
                            <label >
                              <input name='moreImg[]' id='moreImg' type="file" accept=".jpg,.gif,.png" multiple onChange={(e) => { changefile(e) }} />
                            </label>
                          </div> */}

                        <div
                          className="image-upload-wrap fs-2"
                          style={{
                            ...STYLES_imageUploadWrap,
                            // backgroundColor: '#e5f4ff',
                            borderRadius: '9px',
                            border: '2px dashed rgba(62, 170, 255, 0.58)',
                            fontSize: '60px'
                          }}
                        >
                          <input
                            className="file-upload-input"
                            type="file"
                            // name="identityDocumentImage"
                            // onChange={props.changevalue}
                            name="moreImg[]"
                            id="moreImg"
                            accept=".jpg,.gif,.png, .svg"
                            multiple
                            onChange={(e) => changefile(e)}
                            style={STYLES_fileUploadInput}
                          />
                          <div
                            className="drag-text"
                            style={{ textAlign: 'center', padding: '70px' }}
                          >
                            <FontAwesomeIcon
                              icon={solid('cloud-arrow-up')}
                              className="icon-cloud"
                            />
                            <h3 style={{ fontSize: 'inherit' }}>Drag and drop or Select File</h3>
                          </div>
                        </div>

                        <div className="grid mt-3 mb-3 w-100">
                          {moreTempImages?.length ? (
                            moreTempImages.map((img, key) => {
                              return (
                                <div key={key} className="img-wrap">
                                  <span
                                    className="close"
                                    onClick={() => props.removeGallaryempImages(key, 'moreImg')}
                                  >
                                    &times;
                                  </span>
                                  {/* <img
                                      src={img ? img : noimg}
                                      alt="lk"
                                      style={{ width: '100px', height: '100px' }}
                                    />*/}
                                  <div
                                    className="gallery__img"
                                    style={{
                                      backgroundImage: `url(${img ? img : noimg})`
                                      // width: '100px',
                                      // height: '100px'
                                    }}
                                    alt="lk"
                                    data-id="103"
                                  ></div>
                                </div>
                              );
                            })
                          ) : (
                            <></>
                          )}
                          {moreImages?.length
                            ? moreImages.map((img, key) => {
                                return (
                                  <React.Fragment key={key}>
                                    {/* <img src={img ? img !== "" ? helper.CampaignProductImagePath + img : noimg : noimg} alt="lk" style={{ width: "100px", height: "100px" }} />
                                    <span> X</span> */}
                                    <div className="img-wrap">
                                      <span
                                        className="close"
                                        onClick={() => props.deleteProductImage(img.id, 'More')}
                                      >
                                        &times;
                                      </span>
                                      <div
                                        className="gallery__img"
                                        style={{
                                          backgroundImage: `url(${
                                            img.img
                                              ? img.img !== ''
                                                ? helper.CampaignProductImagePath + img.img
                                                : noimg
                                              : noimg
                                          })`
                                          // width: '100px',
                                          // height: '100px'
                                        }}
                                        alt="lk"
                                        data-id="103"
                                      ></div>
                                    </div>
                                    {/*  <div className="img-wrap">
                                        <span
                                          className="close"
                                          onClick={() => props.deleteProductImage(img.id, 'More')}
                                        >
                                          &times;
                                        </span>
                                        <img
                                          src={
                                            img.img
                                              ? img.img !== ''
                                                ? helper.CampaignProductImagePath + img.img
                                                : noimg
                                              : noimg
                                          }
                                          alt="lk"
                                          style={{ width: '100px', height: '100px' }}
                                          data-id="103"
                                        />
                                      </div>*/}
                                  </React.Fragment>
                                );
                              })
                            : ''}
                        </div>
                        {error && error.moreImg && (
                          <p className="error">
                            {error ? (error.moreImg ? error.moreImg : '') : ''}
                          </p>
                        )}

                        {/* <p className='error'>{stateData.error ? stateData.error.moreImg ? stateData.error.moreImg : "" : ""}</p> */}

                        {/* <div className="upload-wrap">
                            <img
                              className="img-fluid"
                              src="https://i1.wp.com/lanecdr.org/wp-content/uploads/2019/08/placeholder.png?w=1200&ssl=1"
                              alt="img"
                            />
                            <label htmlFor="videoPicture2">
                              <input id="videoPicture2" type="file" />
                            </label>
                          </div>
                          <div className="upload-wrap">
                            <FontAwesomeIcon
                              icon={solid("cloud-arrow-up")}
                              className="icon-cloud"
                            />
                            <label htmlFor="videoPicture3">
                              <input id="videoPicture3" type="file" />
                            </label>
                          </div>
                          <div className="upload-wrap">
                            <FontAwesomeIcon
                              icon={solid("cloud-arrow-up")}
                              className="icon-cloud"
                            />
                            <label htmlFor="videoPicture3">
                              <input id="videoPicture3" type="file" />
                            </label>
                          </div>
                          <div className="upload-wrap">
                            <FontAwesomeIcon
                              icon={solid("cloud-arrow-up")}
                              className="icon-cloud"
                            />
                            <label htmlFor="videoPicture3">
                              <input id="videoPicture3" type="file" />
                            </label>
                          </div> */}
                      </div>

                      {/* <div className="d-grid">
                          <Button
                            variant="info"
                            className="fs-7 fw-bold"
                            size="lg"
                          >
                            Upload from File
                          </Button>
                        </div> */}
                    </div>
                  </form>
                </div>
              </Row>
              {/* <div className="select-projects-option mb-5">
                  <div className="fw-bold mb-3">
                    Project
                    <FontAwesomeIcon icon={solid('bolt')} className="text-primary ms-1 me-2" />
                    <span className="fs-7 text-light  ms-1 fw-normal">(optional)</span>
                  </div>

                  <div className="d-flex flex-wrap mb-3">
                    {projectList.length > 0 &&
                      projectList.map((project, i) => {
                        return (
                          <FeedTag
                            key={i}
                            data={project}
                            name={project.name}
                            onSelect={onSelectProject}
                            checked={(seletedProjectList.includes(project._id) || (project.productDetails?.length < 2 && project.productDetails[0]?.productId === id))}
                            cantChange={project.productDetails.length < 2 && project.productDetails[0]?.productId === id}
                          />
                        );
                      })}
                  </div>

                  <div className="manage-post-type">
                    You can add this product to any of your existing projects. Yellow tags have only 1 product which is required. To manage your
                    projects &nbsp;{' '}
                    <a href="./project" className="link">
                      click here
                    </a>
                  </div>
                </div> */}
            </>
          </Accordion.Collapse>

          <AccordionToggle>
            <h2 className="fs-3 fw-bolder ">Need Headline</h2>
          </AccordionToggle>

          <Accordion.Collapse className="py-5">
            <Row className="mw-850 ml-5">
              <Col lg="6">
                <div className="note mb-5 fs-6">
                  Here is where you tell your donors more about your need for these items. Let them
                  know how you plan to use the proceeds of their donation.
                </div>
                <form className="d-flex flex-column profile-detail-form gap-2">
                  <div>
                    <Input
                      id={id3}
                      name={id3}
                      value={needheadline}
                      maxInput={max45}
                      maxLength={max45}
                      title={title3}
                      placeholder={placeholder3}
                      onChange={change}
                      error={error}
                    />
                    {error && error.needheadline && (
                      <p className="error">
                        {error ? (error.needheadline ? error.needheadline : '') : ''}
                      </p>
                    )}
                  </div>
                  <div>
                    <Textarea
                      id={id4}
                      name={id4}
                      value={description}
                      maxInput={max250}
                      maxLength={max250}
                      rows={rows}
                      title={title4}
                      placeholder={placeholder4}
                      onChange={change}
                      error={error}
                    />
                    {error && error.description && (
                      <p className="error">
                        {error ? (error.description ? error.description : '') : ''}
                      </p>
                    )}
                  </div>
                </form>
              </Col>
              <Col lg="6">
                <form className="video-detail-form">
                  <div className="form-group mb-2">
                    <label htmlFor="videoInput" className="form__label">
                      Need Media&nbsp;
                      <span className="fs-7 text-light ms-1 fw-normal">(optional)</span>
                    </label>
                    {/* <input
                        type="text"
                        className="form-control form-control-lg"
                        // id="videoInput"
                        placeholder="YouTube URL"
                        name="galleryUrl"
                        id="galleryUrl"
                        value={galleryUrl}
                        onChange={(e) => {
                          changevalue(e);
                        }}
                      /> */}
                    <Input
                      id={id5}
                      name={id5}
                      value={galleryUrl}
                      title={title5}
                      // placeholder={placeholder1}
                      onChange={change}
                      error={error}
                    />
                  </div>

                  <div className="project-video-wrap">
                    <iframe
                      title="product-video"
                      key="product-video"
                      width="498"
                      height="280"
                      src={embedlink}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="">
                    <div
                      className="upload-picture-video-block mb-2"
                      style={{ display: 'contents' }}
                    >
                      {/* <div className="upload-wrap" style={{ width: "100%" }}>
                          <FontAwesomeIcon
                            icon={solid("cloud-arrow-up")}
                            className="icon-cloud"
                          />
                          <label>
                            <input name='galleryImg[]' id='galleryImg' type="file" accept=".jpg,.jpeg,.png" multiple onChange={(e) => { changefile(e) }} />
                          </label>
                        </div> */}

                      <div
                        className="image-upload-wrap fs-2"
                        style={{
                          ...STYLES_imageUploadWrap,
                          // backgroundColor: '#e5f4ff',
                          borderRadius: '9px',
                          border: '2px dashed rgba(62, 170, 255, 0.58)',
                          fontSize: '60px'
                        }}
                      >
                        <input
                          className="file-upload-input"
                          type="file"
                          name="galleryImg[]"
                          id="galleryImg"
                          accept=".jpg,.gif,.png"
                          multiple
                          onChange={(e) => {
                            changefile(e);
                          }}
                          style={STYLES_fileUploadInput}
                          title=" "
                        />
                        <div className="drag-text" style={{ textAlign: 'center', padding: '70px' }}>
                          <FontAwesomeIcon icon={solid('cloud-arrow-up')} className="icon-cloud" />
                          <h3 style={{ fontSize: 'inherit' }}>Drag and drop or Select File</h3>
                        </div>
                      </div>

                      <div className="grid mt-3 mb-3 w-100">
                        {gallaryTempImages?.length ? (
                          gallaryTempImages.map((img, key) => {
                            return (
                              <div key={key} className="img-wrap">
                                <span
                                  className="close"
                                  onClick={() => props.removeGallaryempImages(key, 'galleryImg')}
                                  style={{ right: '7px' }}
                                >
                                  &times;
                                </span>
                                <div
                                  className="gallery__img"
                                  style={{
                                    backgroundImage: `url(${img ? img : noimg})`
                                    // width: '100px',
                                    // height: '100px'
                                  }}
                                  alt="lk"
                                ></div>
                              </div>
                            );
                          })
                        ) : (
                          <></>
                        )}
                        {gallaryImages?.length
                          ? gallaryImages.map((img, key) => {
                              return (
                                <React.Fragment key={key}>
                                  {/* <img src={img ? img !== "" ? helper.CampaignProductImagePath + img : noimg : noimg} alt="lk" style={{ width: "100px", height: "100px" }} /> */}

                                  <div className="img-wrap">
                                    <span
                                      className="close"
                                      onClick={() => props.deleteProductImage(img.id, 'Gallary')}
                                      style={{ right: '7px' }}
                                    >
                                      &times;
                                    </span>
                                    {/* <img
                                        src={
                                          img.img
                                            ? img.img !== ''
                                              ? helper.CampaignProductImagePath + img.img
                                              : noimg
                                            : noimg
                                        }
                                        alt="lk"
                                        style={{ width: '100px', height: '100px' }}
                                        data-id="103"
                                      />*/}
                                    <div
                                      className="gallery__img"
                                      style={{
                                        backgroundImage: `url(${
                                          img.img
                                            ? img.img !== ''
                                              ? helper.CampaignProductImagePath + img.img
                                              : noimg
                                            : noimg
                                        })`
                                        // width: '100px',
                                        // height: '100px'
                                      }}
                                      alt="lk"
                                      data-id="103"
                                    ></div>
                                  </div>
                                </React.Fragment>
                              );
                            })
                          : ''}
                      </div>

                      {error && error.galleryImg && (
                        <p className="error">
                          {error ? (error.galleryImg ? error.galleryImg : '') : ''}
                        </p>
                      )}
                      {/* <div className="upload-wrap">
                          <img src="../img/user2.jpeg" alt="img" />
                          <FontAwesomeIcon
                            icon={solid("cloud-arrow-up")}
                            className="icon-cloud"
                          />
                          <label htmlFor="videoPicture2">
                            <input id="videoPicture2" type="file" />
                          </label>
                        </div>
                        <div className="upload-wrap">
                          <FontAwesomeIcon
                            icon={solid("cloud-arrow-up")}
                            className="icon-cloud"
                          />
                          <label htmlFor="videoPicture3">
                            <input id="videoPicture3" type="file" />
                          </label>
                        </div>
                        <div className="upload-wrap">
                          <FontAwesomeIcon
                            icon={solid("cloud-arrow-up")}
                            className="icon-cloud"
                          />
                          <label htmlFor="videoPicture3">
                            <input id="videoPicture3" type="file" />
                          </label>
                        </div>
                        <div className="upload-wrap">
                          <FontAwesomeIcon
                            icon={solid("cloud-arrow-up")}
                            className="icon-cloud"
                          />
                          <label htmlFor="videoPicture3">
                            <input id="videoPicture3" type="file" />
                          </label>
                        </div> */}
                    </div>
                    {/* <div className="d-grid">
                        <Button
                          variant="info"
                          className="fs-7 fw-bold"
                          size="lg"
                        >
                          Upload from File
                        </Button>
                      </div> */}
                  </div>
                </form>
              </Col>
            </Row>
          </Accordion.Collapse>
        </Accordion>
        <div className="fulfilling-check-wrap pb-4">
          <div className="form-check" style={STYLE_CURSOR_POINTER}>
            <input
              type="checkbox"
              className="form-check-input"
              name="policy"
              id="policy"
              checked={stateData.policy}
              onChange={(e) => {
                changevalue(e);
              }}
            />
            <label className="form-check-label" htmlFor="policy" style={STYLE_CURSOR_POINTER}>
              By posting your ad, you are agreeing to our <Link to="/terms">terms of service</Link>
              &nbsp; & <Link to="/privacy">privacy policy</Link> . Please do not post duplicate ads.
              You may not edit your post after it has received funding. You cannot delete your post
              after it has received donations.
            </label>
          </div>
        </div>
        {error && error.policy && (
          <p className="error">{error ? (error.policy ? error.policy : '') : ''}</p>
        )}
        <div className="note fs-6 mb-5" style={{ maxWidth: '100%' }}>
          When your post has been fully funded, you will be asked to upload an image of the sales
          receipt to complete the order. A fuflfill button will appear on funded posts. Click this
          button to upload your sales receipt and complete the order.
        </div>
        <div className="products-detial-footer d-flex py-3 py-sm-5 gap-2">
          {stateData.status === 1 ? (
            <>
              <Button
                style={{ opacity: props.loading ? '0.7' : '1' }}
                variant="info"
                size="lg"
                className="fw-bold fs-6"
                onClick={() => !props.loading && submitProductForm(-1)}
              >
                Unpublish
              </Button>
              <Button
                style={{ opacity: props.loading ? '0.7' : '1' }}
                variant="success"
                size="lg"
                className="d-flex align-items-center justify-content-center fs-6 fw-bold"
                onClick={() => !props.loading && submitProductForm(1, seletedProjectList)}
              >
                Save Changes
                {props.loading && <CircularProgress className="ms-2" color="inherit" size={12} />}
              </Button>
            </>
          ) : (
            <div className="d-flex gap-2">
              <SaveCreateButtons
                loading={props.loading}
                submitProductForm={submitProductForm}
                setModelShow={setModelShow}
                selectedProjectList={seletedProjectList}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const SaveCreateButtons = (props) => {
  return (
    <>
      <Button
        variant="warning"
        size="lg"
        className="text-white fw-bold fs-6"
        // onClick={() => submitProductForm(-1)}
        onClick={() => props.setModelShow(true)}
      >
        Save as Draft
      </Button>
      <Button
        style={{ opacity: props.loading ? '0.7' : '1' }}
        variant="info"
        size="lg"
        className="d-flex align-items-center justify-content-center fs-6 fw-bold"
        onClick={() => !props.loading && props.submitProductForm(1, props.selectedProjectList)}
      >
        Create Post
        {props.loading && <CircularProgress className="ms-2" color="inherit" size={12} />}
      </Button>
    </>
  );
};

export default AddPost;
