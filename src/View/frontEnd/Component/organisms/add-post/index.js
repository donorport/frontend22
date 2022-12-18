import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import React, { useEffect, useState, useContext } from 'react';
import './style.scss';
import {
  Button,
  Accordion,
  AccordionContext,
  useAccordionButton,
  Card,
  Col,
  Row,
  Dropdown
} from 'react-bootstrap';
import { Link, Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
// import { ToggleSwitch, FeedTag } from "@components/atoms";
import ToggleSwitch from '../../atoms/toggle-switch';
import FeedTag from '../../atoms/feed-tag';
import * as Icon from '../../atoms/category-icons';
import categoryApi from '../../../../../Api/admin/category';
import projectApi from '../../../../../Api/admin/project';
import productApi from '../../../../../Api/admin/product';
import { WithContext as ReactTags } from 'react-tag-input';
import noimg from '../../../../../assets/images/noimg.jpg';
import helper, { convertAddress, priceFormat } from '../../../../../Common/Helper';
import { validateAll } from 'indicative/validator';
import ToastAlert from '../../../../../Common/ToastAlert';
import { confirmAlert } from 'react-confirm-alert';
import styled from 'styled-components';
// import styles from "../../../../../Common/MapBoxStyles"
import { SearchBox } from '@mapbox/search-js-react';
import MapboxAutocomplete from 'react-mapbox-autocomplete';
import { useSelector, useDispatch } from 'react-redux';
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { CircularProgress } from '@mui/material';

// require('mapbox-gl/dist/mapbox-gl.css');

mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default; // eslint-disable-line

const Map = ReactMapboxGl({
  accessToken: helper.MapBoxPrimaryKey
});

function AccordionToggle({ children, eventKey, callback }) {
  const { activeEventKey } = useContext(AccordionContext);
  // window.scrollTo(0, 0);

  const decoratedOnClick = useAccordionButton(eventKey, () => callback && callback(eventKey));

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

const AddPost = (props) => {
  const fileuploadinput = {
    position: 'absolute',
    margin: 0,
    padding: 0,
    width: '100%',
    height: '100%',
    outline: 'none',
    opacity: 0,
    cursor: 'pointer'
  };

  const imageuploadwrap = {
    marginTop: '20px',
    // border: " 4px dashed #3773c6",
    position: 'relative',
    width: '100%'
  };

  let organizationDetails = props.organizationDetails;
  let stateData = props.stateData;
  const user = useSelector((state) => state.user);
  const {
    id,
    status,
    title,
    subtitle,
    category,
    subcategory,
    description,
    price,
    image,
    quantity,
    organization,
    slug,
    error,
    moreImg,
    galleryUrl,
    headline,
    brand,
    needheadline,
    galleryImg,
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
  let onSelectProject = props.onSelectProject;
  let seletedProjectList = props.seletedProjectList;
  let gallaryTempImages = props.gallaryTempImages;
  let gallaryImages = props.gallaryImages;

  const setModelShow = props.setModelShow;

  const [location, setLocation] = useState({
    organizationLocation: '',
    locationName: '',
    lat: 0,
    lng: 0
  });

  // console.log(galleryUrl)
  // let url = galleryUrl;
  // let videoid = url ?url?.split("?v=")[1] :"";
  // let embedlink = videoid ? "http://www.youtube.com/embed/" + videoid : "";

  // console.log(gallaryImages)

  const mapStyles = {
    londonCycle: 'mapbox://styles/mapbox/light-v9',
    light: 'mapbox://styles/mapbox/light-v9',
    dark: 'mapbox://styles/mapbox/dark-v9',
    basic: 'mapbox://styles/mapbox/basic-v9',
    outdoor: 'mapbox://styles/mapbox/outdoors-v10'
  };

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

  const sugg = (result, lat, lng, text) => {
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

  return (
    <div className="add-post">
      {/* {console.log(location)} */}
      <div className="d-flex align-items-center flex-grow-1 pb-20p mb-3 border-bottom">
        <Button variant="link" className="me-sm-2 me-1" onClick={() => props.createPost(false)}>
          <FontAwesomeIcon icon={solid('angle-left')} className="text-subtext fs-3" />
        </Button>
        <div className="fs-3 fw-bolder me-sm-3 flex__1">Create Item</div>

        <div className="ms-auto">
          <Button
            variant="warning"
            size="lg"
            className="text-white fw-bold fs-6"
            // onClick={() => submitProductForm(-1)}
            onClick={() => setModelShow(true)}
          >
            Save as Draft
          </Button>
        </div>
      </div>
      {/* <div className="studio__note d-sm-flex align-items-center py-2 px-3 border rounded mb-5">
        <div className="studio__thumb p-1 mr-20p d-none d-sm-block">
          <img
            className="img-fluid"
            alt=""
            src="https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/5f47d53860aae8b7569f45a7_rocket.svg"
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
        <Accordion className="mb-5 pb-5" alwaysOpen>
          <Card>
            <Card.Header className="post__accordion-header">
              <AccordionToggle>
                <span className="fs-3 fw-bolder text-dark">Post Location</span>
              </AccordionToggle>
            </Card.Header>
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
                          <h3 className="mb-0 fs-4 fw-bolder">
                            {convertAddress(location.locationName)}
                          </h3>
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
                  </div>
                </Col>
                <Col lg="6">
                  <Map
                    style={mapStyles.outdoor}
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
          </Card>

          <Card>
            <Card.Header className="post__accordion-header">
              <AccordionToggle>
                <span className="fs-3 fw-bolder text-dark">Product Details</span>
              </AccordionToggle>
            </Card.Header>
            <Accordion.Collapse className="py-5">
              <>
                <Row className="mw-850 ml-5 mb-5">
                  <div className="col-lg-6 mb-5 mb-sm-0">
                    <form className="profile-detail-form">
                      <div className="form-group border-bottom mb-2">
                        <label htmlFor="headlineInput" className="form__label">
                          Headline
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-lg mb-2"
                          // id="headlineInput"
                          placeholder="Ex: Children's Bicycle"
                          name="headline"
                          id="headline"
                          value={headline}
                          onChange={(e) => {
                            changevalue(e);
                          }}
                        />

                        <div className="text-light fs-8 pb-2 mb-1">
                          <span>120</span> chars remaining
                        </div>
                        {error && error.headline && (
                          <p className="error">
                            {error ? (error.headline ? error.headline : '') : ''}
                          </p>
                        )}
                      </div>
                      <div className="form-group mb-4">
                        <label htmlFor="brandInput" className="form__label">
                          Brand
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          // id="brandInput"
                          placeholder="Hasbro ®"
                          name="brand"
                          id="brand"
                          value={brand}
                          onChange={(e) => {
                            changevalue(e);
                          }}
                        />
                        {/* <p className="error">Required</p> */}
                        {error && error.brand && (
                          <p className="error">{error ? (error.brand ? error.brand : '') : ''}</p>
                        )}
                      </div>

                      <div className="form-group mb-4">
                        <label htmlFor="brandInput" className="form__label">
                          Slug
                        </label>
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          // id="brandInput"
                          placeholder="Slug"
                          // disabled={id ? true : false}
                          name="slug"
                          id="slug"
                          value={slug}
                          onChange={(e) => {
                            changevalue(e);
                          }}
                        />
                        {/* <p className="error">Required</p> */}
                        {error && error.slug && (
                          <p className="error">{error ? (error.slug ? error.slug : '') : ''}</p>
                        )}
                      </div>
                      <div className="price-group-wrap d-flex align-items-center gap-2 mb-3">
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
                      <div className="note note--info mb-3">
                        <span className="text-dark">
                          Enter the unit price before taxes. Your{' '}
                          <Link
                            to={'/campaign/' + props?.slug + '/settings/paymentMethod'}
                            style={{ color: '#3a94d4' }}
                          >
                            regional sales tax
                          </Link>{' '}
                          & merchant fees will be automatically applied to the price of the item to
                          ensure you receive enough funds to purchase the item(s).
                        </span>
                      </div>
                      <div className="keyword-tags-wrap">
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
                            <FontAwesomeIcon
                              className="fs-3 text-info"
                              icon={solid('calculator')}
                            />
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
                            <FontAwesomeIcon className="fs-3 text-primary" icon={solid('tag')} />
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
                            <FontAwesomeIcon className="fs-3 text-info" icon={solid('image')} />
                            <div className="d-flex py-12p px-18p">
                              <ToggleSwitch
                                checked={media}
                                name="media"
                                changevalue={changevalue}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="note note--info mb-5">
                          Will you be uploading media after you have purchased the items? Posts that
                          upload pictures / videos of the proceeds tend to get funded quicker.
                        </div>
                      </div>

                      <div className="item-category-select">
                        <span className="title">Item Category</span>
                        <div className="d-flex gap-2">
                          {/* <Dropdown className="d-flex" autoClose="outside">
                            <Dropdown.Toggle variant="outline-light" size="lg">
                              Category
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="w-100">
                              {
                                categoryList.length > 0 &&
                                categoryList.map((item, idx) => (
                                  <Dropdown.Item
                                    key={`cat_${idx}`}
                                    className="py-18p px-12p border-bottom fw-semibold text-dark"
                                    value={category}
                                  >
                                    {item.name}
                                  </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                          </Dropdown> */}
                          <div className="form-group">
                            <div className="">
                              <select
                                className="form-control"
                                onChange={(e) => {
                                  changevalue(e);
                                }}
                                id="category"
                                name="category"
                              >
                                <option selected disabled value=" ">
                                  Select Category
                                </option>
                                {categoryList.length > 0 &&
                                  categoryList
                                    .sort((a, b) =>
                                      a.name.localeCompare(b.name, 'es', { sensitivity: 'base' })
                                    )
                                    .map((cat, i) => {
                                      return (
                                        cat.status === 1 && (
                                          <option value={cat._id} selected={category === cat._id}>
                                            {cat.name}
                                          </option>
                                        )
                                      );
                                    })}
                              </select>
                              <p className="error">
                                {error ? (error.category ? error.category : '') : ''}
                              </p>
                            </div>
                          </div>

                          <div className="form-group ">
                            <div className="">
                              <select
                                className="form-control"
                                onChange={(e) => {
                                  changevalue(e);
                                }}
                                id="subcategory"
                                name="subcategory"
                              >
                                <option selected disabled value=" ">
                                  Select SubCategory
                                </option>
                                {subcategoryList.length > 0 &&
                                  subcategoryList
                                    .sort((a, b) =>
                                      a.name.localeCompare(b.name, 'es', { sensitivity: 'base' })
                                    )
                                    .map((cat, i) => {
                                      return (
                                        cat.status === 1 && (
                                          <option
                                            value={cat._id}
                                            selected={subcategory === cat._id}
                                          >
                                            {cat.name}
                                          </option>
                                        )
                                      );
                                    })}
                              </select>
                              <p className="error">
                                {error ? (error.subcategory ? error.subcategory : '') : ''}
                              </p>
                            </div>
                          </div>
                          {/* <Dropdown className="d-flex" autoClose="outside">
                            <Dropdown.Toggle variant="outline-light" size="lg">
                              Subcategory
                            </Dropdown.Toggle>

                            <Dropdown.Menu className="w-100">
                              {
                                subcategoryList.length > 0 &&
                                subcategoryList.map((item, idx) => (
                                  <Dropdown.Item
                                    key={`sub_cat_${idx}`}
                                    className="d-flex align-items-center py-18p px-12p border-bottom fw-semibold text-dark"
                                  >
                                    {item.name}
                                    <div className="ms-auto">{item.icon}</div>
                                  </Dropdown.Item>
                                ))}
                            </Dropdown.Menu>
                          </Dropdown> */}
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="col-lg-6">
                    <form className="video-detail-form">
                      <div className="main-upload-image-wrap">
                        <div className="form__label">Main Image</div>
                        <div className="upload-wrap mb-3">
                          {/* <FontAwesomeIcon
                            icon={solid("cloud-arrow-up")}
                            className="icon-cloud"
                          /> */}
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
                                changefile(e);
                              }}
                            />
                          </label>
                        </div>
                        <p className="error">{error ? (error.image ? error.image : '') : ''}</p>
                        <canvas id="canvas1" width={300} height={300}></canvas>
                      </div>
                      <div className="note note--info mb-3">
                        <FontAwesomeIcon
                          icon={regular('circle-info')}
                          className="text-info icon-method mr-3p"
                        />
                        <span className="text-dark">
                          Please upload a transparent image of the product. Click{' '}
                          <a
                            href="https://www.youtube.com/watch?v=G3Y5PcuH23Y"
                            target="_blank"
                            rel="noreferrer"
                          >
                            here
                          </a>{' '}
                          to learn more about transparent images and how to find them.
                        </span>
                      </div>
                      <div>
                        <div className="project-tilte-optional">
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
                            className="image-upload-wrap mb-3 fs-2"
                            style={{
                              ...imageuploadwrap,
                              backgroundColor: '#e5f4ff',
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
                              accept=".jpg,.gif,.png"
                              multiple
                              onChange={(e) => changefile(e)}
                              style={fileuploadinput}
                            />
                            <div
                              className="drag-text"
                              style={{ textAlign: 'center', padding: '70px' }}
                            >
                              <FontAwesomeIcon
                                icon={solid('cloud-arrow-up')}
                                className="icon-cloud"
                              />
                            </div>
                          </div>

                          <div className="grid mt-3 mb-3" style={{ display: 'contents' }}>
                            {moreTempImages?.length ? (
                              moreTempImages.map((img, key) => {
                                return (
                                  <div className="img-wrap">
                                    <span
                                      className="close"
                                      onClick={() => props.removeGallaryempImages(key, 'moreImg')}
                                    >
                                      &times;
                                    </span>
                                    <img
                                      src={img ? img : noimg}
                                      alt="lk"
                                      style={{ width: '100px', height: '100px' }}
                                    />
                                  </div>
                                );
                              })
                            ) : (
                              <></>
                            )}
                            {moreImages?.length
                              ? moreImages.map((img, key) => {
                                  // console.log(img)
                                  return (
                                    <>
                                      {/* <img src={img ? img !== "" ? helper.CampaignProductImagePath + img : noimg : noimg} alt="lk" style={{ width: "100px", height: "100px" }} />
                                    <span> X</span> */}

                                      <div className="img-wrap">
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
                                      </div>
                                    </>
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
                <div className="select-projects-option mb-5">
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
                            data={project}
                            name={project.name}
                            onSelect={onSelectProject}
                            checked={seletedProjectList.includes(project._id)}
                          />
                        );
                      })}
                    {/* <FeedTag />
                    <FeedTag />
                    <FeedTag /> */}
                  </div>

                  <div className="manage-post-type">
                    You can add this product to any of your existing projects. To manage your
                    projects &nbsp;{' '}
                    <a href="./project" className="link">
                      click here
                    </a>
                  </div>
                </div>
              </>
            </Accordion.Collapse>
          </Card>

          <Card>
            <Card.Header className="post__accordion-header">
              <AccordionToggle>
                <span className="fs-3 fw-bolder text-dark">Need Headline</span>
              </AccordionToggle>
            </Card.Header>
            <Accordion.Collapse className="py-5">
              <Row className="mw-850 ml-5">
                <Col lg="6">
                  <form className="profile-detail-form">
                    <div className="form-group mb-5 border-bottom pb-5">
                      <label className="form__label">Need Headline</label>
                      <input
                        type="text"
                        className="form-control form-control-lg mb-2"
                        placeholder="Ex: For inner city kids in Colorado"
                        name="needheadline"
                        id="needheadline"
                        value={needheadline}
                        onChange={(e) => {
                          changevalue(e);
                        }}
                      />
                      {error && error.needheadline && (
                        <p className="error">
                          {error ? (error.needheadline ? error.needheadline : '') : ''}
                        </p>
                      )}
                      <div className="text-light fs-8">
                        <span>120</span> chars remaining
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="needDescriptionTextarea" className="form__label">
                        Need Description
                      </label>

                      <textarea
                        className="form-control form-control-lg mb-2"
                        // id="needDescriptionTextarea"
                        rows="6"
                        data-length="240"
                        placeholder="Enter some details about your need"
                        name="description"
                        id="description"
                        value={description}
                        onChange={(e) => {
                          changevalue(e);
                        }}
                      ></textarea>
                      {error && error.description && (
                        <p className="error">
                          {error ? (error.description ? error.description : '') : ''}
                        </p>
                      )}

                      <div className="text-light fs-8 pb-2 mb-1">
                        <span>120</span> chars remaining
                      </div>
                    </div>
                  </form>
                </Col>
                <Col lg="6">
                  <form className="video-detail-form">
                    <div className="form-group mb-2">
                      <label htmlFor="videoInput" className="form__label">
                        Need Gallery (iframe)&nbsp;
                        <span className="post-type-text">(optional)</span>
                      </label>
                      <input
                        type="text"
                        className="form-control form-control-lg"
                        // id="videoInput"
                        placeholder="Video URL"
                        name="galleryUrl"
                        id="galleryUrl"
                        value={galleryUrl}
                        onChange={(e) => {
                          changevalue(e);
                        }}
                      />
                    </div>

                    <div
                      className="project-video-wrap mb-4"
                      dangerouslySetInnerHTML={{ __html: galleryUrl }}
                    >
                      {/* <iframe src={embedlink} title="YouTube video player"></iframe> */}
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
                          className="image-upload-wrap mb-3 fs-2"
                          style={{
                            ...imageuploadwrap,
                            backgroundColor: '#e5f4ff',
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
                            style={fileuploadinput}
                            title=" "
                          />
                          <div
                            className="drag-text"
                            style={{ textAlign: 'center', padding: '70px' }}
                          >
                            <FontAwesomeIcon
                              icon={solid('cloud-arrow-up')}
                              className="icon-cloud"
                            />
                          </div>
                        </div>

                        <div className="grid mt-3 mb-3" style={{ display: 'grid' }}>
                          {gallaryTempImages?.length ? (
                            gallaryTempImages.map((img, key) => {
                              return (
                                <div className="img-wrap">
                                  <span
                                    className="close"
                                    onClick={() => props.removeGallaryempImages(key, 'galleryImg')}
                                    style={{ right: '7px' }}
                                  >
                                    &times;
                                  </span>
                                  <img
                                    src={img ? img : noimg}
                                    alt="lk"
                                    style={{ width: '100px', height: '100px' }}
                                  />
                                </div>
                              );
                            })
                          ) : (
                            <></>
                          )}
                          {gallaryImages?.length
                            ? gallaryImages.map((img, key) => {
                                return (
                                  <>
                                    {/* <img src={img ? img !== "" ? helper.CampaignProductImagePath + img : noimg : noimg} alt="lk" style={{ width: "100px", height: "100px" }} /> */}

                                    <div className="img-wrap">
                                      <span
                                        className="close"
                                        onClick={() => props.deleteProductImage(img.id, 'Gallary')}
                                        style={{ right: '7px' }}
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
                                    </div>
                                  </>
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
          </Card>
        </Accordion>

        <div className="fulfilling-check-wrap pb-4">
          <div className="form-check">
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
            <label className="form-check-label" htmlFor="policy">
              By posting your ad, you are agreeing to our{' '}
              <Link to="/terms">
                <strong>terms of use</strong>
              </Link>
              ,{' '}
              <Link to="/terms">
                <strong>privacy policy</strong>
              </Link>{' '}
              and{' '}
              <Link to="/terms">
                <strong>site policies</strong>
              </Link>
              . Please do not post duplicate ads. You may not edit your post after it has received
              funding. If you delete your post after it has received donations, the donors will
              receive a full refund and the post will be closed.
            </label>
          </div>
        </div>
        {error && error.policy && (
          <p className="error">{error ? (error.policy ? error.policy : '') : ''}</p>
        )}

        <div className="products-detial-footer py-5">
          {stateData.status === 1 && (
            <Button
              style={{ opacity: props.isLoading ? '0.7' : '1' }}
              variant="info"
              size="lg"
              className="fw-bold fs-6"
              onClick={() => !props.isLoading && submitProductForm(-1)}
            >
              Un-publish
            </Button>
          )}
          <Button
            style={{ opacity: props.isLoading ? '0.7' : '1' }}
            variant="success"
            size="lg"
            className="d-flex align-items-center justify-content-center fs-6 fw-bold"
            onClick={() => !props.isLoading && submitProductForm(1)}
          >
            Post Ad{' '}
            {props.isLoading && <CircularProgress className="ms-2" color="inherit" size={14} />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
