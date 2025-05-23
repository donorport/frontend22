import React, { useState, useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';

// import { ToggleSwitch, FeedTag, FileUpload } from "@components/atoms";

import ToggleSwitch from '../../atoms/toggle-switch';
import FeedTag from '../../atoms/feed-tag';
import helper from '../../../../../Common/Helper';
import noimg from '../../../../../assets/images/noimg1.png';
import Textarea from '../text-area';
import Input from '../input';
import './style.scss';
import { useSelector } from 'react-redux';
import {
  Button,
  Accordion,
  AccordionContext,
  //useAccordionButton,
  Card,
  Col,
  Row
} from 'react-bootstrap';
import MapboxAutocomplete from 'react-mapbox-autocomplete';
import ReactMapboxGl, { Layer, Feature } from 'react-mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

//import { Link } from 'react-router-dom';

const Map = ReactMapboxGl({
  accessToken: helper.MapBoxPrimaryKey
});
const STYLES_mapStyles = {
  londonCycle: 'mapbox://styles/mapbox/light-v9',
  light: 'mapbox://styles/mapbox/light-v9',
  dark: 'mapbox://styles/mapbox/dark-v9',
  basic: 'mapbox://styles/mapbox/basic-v9',
  outdoor: 'mapbox://styles/mapbox/outdoors-v10'
};


const STYLES_FileUploadInput = {
  position: 'absolute',
  margin: 0,
  padding: 0,
  width: '100%',
  height: '100%',
  outline: 'none',
  opacity: 0,
  cursor: 'pointer'
};

const STYLES_ImageUploadWrap = {
  marginTop: '20px',
  // border: " 4px dashed #3773c6",
  position: 'relative',
  width: '100%'
};

const id1 = 'name';
const max25 = 25;
const title1 = 'Name';
const placeholder1 = 'Ex: Christmas Drive';

const id2 = 'headline';
const max45 = 45;
const title2 = 'Headline';
const placeholder2 = 'Ex: Feeding the homeless every Friday night';

const id3 = 'description';
const rows3 = 5;
const max250 = 250;
const title3 = 'Description';
const placeholder3 = 'Enter some details about your need';

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

const AddProject = (props) => {
  const { id, updateGoal, goal, status, address, lat, lng, name, headline, video, description, error, infinite } = props.stateData;

  let url = video;
  let videoid = url ? url?.split('?v=')[1].split('&')[0] : '';
  let embedlink = url ? 'https://www.youtube.com/embed/' + videoid : '';

  let tempImages = props.tempImages;
  let projectImages = props.projectImages;
  let productList = props.productList;
  let seletedProductList = props.seletedProductList;
  let onSelectProduct = props.onSelectProduct;
  let submitProjectForm = props.submitProjectForm;
  let discardProject = props.discardProject;

  const user = useSelector((state) => state.user);
  const [location, setLocation] = useState({
    organizationLocation: '',
    locationName: '',
    lat: user.lat,
    lng: user.lng
  });
  const sugg = (result, lat, lng) => {
    console.log('add-post fn sugg:', { result, lat, lng });
    props.setstate({
      ...props.stateData,
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
  useEffect(() => {
    // console.log(user)
    // console.log(props.data)
    // console.log(lat, lng)
    
    setLocation({
      ...location,
      organizationLocation: props.data.iso2,
      locationName: address ? address : "Canada",
      lat: lat ? Number(lat) : 0,
      lng: lng ? Number(lng) : 0
    });
  }, [props.stateData]);


  console.log({ productList });
  //const [id1] = useState('name');
  //const [max25] = useState(25);
  //const [title1] = useState('Name');
  //const [placeholder1] = useState('Ex: Christmas Drive');

  //const [id2] = useState('headline');
  //const [max45] = useState(45);
  //const [title2] = useState('Headline');
  //const [placeholder2] = useState('Ex: Feeding the homeless every Friday night');

  //const [id3] = useState('description');
  //const [rows3] = useState(5);
  //const [max250] = useState(250);
  //const [title3] = useState('Description');
  //const [placeholder3] = useState('Enter some details about your need');

  const change = async (e) => {
    props.changevalue(e);
  };

  return (
    <div className="add__project">
      <div className="d-sm-flex align-items-start align-items-lg-center flex-grow-1 flex-column flex-lg-row gap-2 flex-wrap pb-20p mb-3 border-bottom">
        <div className="d-flex align-items-center mb-2 mb-sm-0 flex-grow-1">
          <Button
            variant="link"
            className="p-0 me-sm-2 me-1 btn btn-link"
            onClick={() => props.createProject(false)}
          >
            <FontAwesomeIcon icon={solid('angle-left')} className="text-subtext fs-3" />
          </Button>

          {status !== 1 ? (
            <span className="fs-3 fw-bolder me-sm-3">Create Project</span>
          ) : (
            <span className="fs-3 fw-bolder me-sm-3">Edit Project</span>
          )}
          {/* <Button variant="link" className="text-decoration-none ms-auto ms-sm-0">
            <FontAwesomeIcon icon={solid('circle-question')} className=" fs-4" />
          </Button>*/}
        </div>
        <div className="d-flex gap-2">
          {status !== 1 ? (
            <Button
              variant="warning"
              size="md"
              className="text-white fw-bold fs-6 ms-sm-auto btn__draft"
              onClick={() => submitProjectForm(-1)}
            >
              Save Draft
            </Button>
          ) : (
            <Button
              variant="info"
              size="md"
              className="text-white fw-bold fs-6 ms-sm-auto btn__draft"
              onClick={() => submitProjectForm(-1)}
            >
              Unpublish
            </Button>
          )}
          {status !== 1 ? (
            <Button
              variant="info"
              size="md"
              className="text-white fw-bold fs-6 ms-sm-auto btn__draft"
              onClick={() => submitProjectForm(1)}
            >
              Publish
            </Button>
          ) : (
            <Button
              variant="success"
              size="md"
              className="text-white fw-bold fs-6 ms-sm-auto btn__draft"
              onClick={() => submitProjectForm(1)}
            >
              Save Changes
            </Button>
          )}
        </div>
      </div>
      {/*  <div className="studio__note d-sm-flex align-items-center py-2 px-3 border rounded mb-5">
        <div className="studio__thumb p-1 mr-20p d-none d-sm-block">
          <img
            className="img-fluid"
            alt=""
            src=""
          />
        </div>
        <div className="flex-grow-1 text-light mb-2 mb-sm-0 text-center text-sm-start">
          <div className="fs-5">Your account allows up to 3 projects</div>
          <a
            href="/"
            className="studio__url mt-6p d-flex text-light justify-content-center justify-content-sm-start"
          >
            <FontAwesomeIcon icon={regular('circle-location-arrow')} className="me-1" />
            <div className="fw-semibold fs-7">You have 0 projects remaining</div>
          </a>
        </div>
        <div className="d-grid">
          <Button variant="info" className="btn__upgrade fs-7">
            Upgrade
          </Button>
        </div>
      </div>*/}


<AccordionToggle>
        <h2 className="fs-4 fw-bolder ">Post Location</h2>
      </AccordionToggle>
      <Accordion.Collapse className="py-0 py-sm-5">
        <Row className="">
          <Col lg="6">
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

      <div className="d-flex justify-content-between py-2 mb-5 border-bottom">
        <h4 className="mb-0 fw-bolder me-2">Details</h4>
        <div className="d-flex gap-2 align-items-center">
          Ongoing Need?
          <FontAwesomeIcon icon={solid('infinity')} className="text-secondary" />
          <ToggleSwitch
            id="infinite"
            checked={infinite}
            name="infinite"
            changevalue={props.changevalue}
          />
        </div>
      </div>
      <Row className="py-0 py-sm-5 row">
        <Col lg="6">
          <form className="d-flex flex-column profile-detail-form gap-5">
            <div>
              <Input
                id={id1}
                name={id1}
                value={name}
                maxInput={max25}
                maxLength={max25}
                title={title1}
                placeholder={placeholder1}
                onChange={change}
                error={error}
              />
              {error && error.name && (
                <p className="error">{error ? (error.name ? error.name : '') : ''}</p>
              )}
            </div>
            <div>
              <Input
                id={id2}
                name={id2}
                value={headline}
                maxInput={max45}
                maxLength={max45}
                title={title2}
                placeholder={placeholder2}
                onChange={change}
                error={error}
              />
              {error && error.headline && (
                <p className="error">{error ? (error.headline ? error.headline : '') : ''}</p>
              )}
            </div>
            <div>
              <Textarea
                id={id3}
                name={id3}
                value={description}
                maxInput={max250}
                maxLength={max250}
                rows={rows3}
                title={title3}
                placeholder={placeholder3}
                onChange={change}
                error={error}
              />
              {error && error.description && (
                <p className="error">{error ? (error.description ? error.description : '') : ''}</p>
              )}
            </div>
          </form>
        </Col>
        <Col lg="6">
          <form className="video-detail-form">
            <div className="form-group mb-2">
              <label htmlFor="videoInput" className="form__label">
                Pictures & Video (YouTube)
              </label>
              <input
                type="text"
                className="form-control form-control-lg"
                // id="videoInput"
                placeholder="YouTube URL"
                name="video"
                id="video"
                value={video}
                onChange={(e) => {
                  props.changevalue(e);
                }}
              />
              {error && error.video && (
                <p className="error">{error ? (error.video ? error.video : '') : ''}</p>
              )}
            </div>
            {/* <div className="project-video-wrap"> */}
            <div className="project-video-wrap">
              <iframe
                title="project-video"
                key="project-video"
                width="498"
                height="280"
                src={embedlink}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            {/* <div>
              <div className="upload-picture-video-block mb-2">
                <FileUpload />
                <FileUpload />
                <FileUpload />
                <FileUpload />
                <FileUpload />
              </div>
            </div> */}
            <div className="d-flex align-items-center flex-wrap gap-2 mb-3">
              {/* <div className="upload-wrap" style={{ width: "100%" }}>
                <FontAwesomeIcon
                  icon={solid("cloud-arrow-up")}
                  className="icon-cloud"
                />
                <label >
                  <input name='moreImg[]' id='moreImg' type="file" multiple onChange={(e) => { props.changefile(e) }} />
                </label>
              </div> */}
              <div
                className="image-upload-wrap fs-2"
                style={{
                  ...STYLES_ImageUploadWrap,
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
                  accept=".jpg,.gif,.png"
                  multiple
                  onChange={(e) => props.changefile(e)}
                  title=" "
                  style={STYLES_FileUploadInput}
                />
                <div className="drag-text" style={{ textAlign: 'center', padding: '70px' }}>
                  <FontAwesomeIcon icon={solid('cloud-arrow-up')} className="icon-cloud" />
                  <h3 style={{ fontSize: 'inherit' }}>Drag and drop or Select File</h3>
                </div>
              </div>
              {error && error.moreImg && (
                <p className="error">{error ? (error.moreImg ? error.moreImg : '') : ''}</p>
              )}
              <div className="grid w-100">
                {tempImages?.length ? (
                  tempImages.map((img, key) => {
                    return (
                      <div key={key} className="img-wrap">
                        <span className="close" onClick={() => props.removeTempImages(key)}>
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
                {projectImages?.length
                  ? projectImages.map((img, key) => {
                      return (
                        // <img src={img ? img !== "" ? helper.ProjectImagePath + img : noimg : noimg} alt="lk" style={{ width: "100px", height: "100px" }} />

                        <div className="img-wrap" key={key}>
                          <span className="close" onClick={() => props.deleteProjectImage(img.id)}>
                            &times;
                          </span>
                          {/* <img
                            src={
                              img.img
                                ? img.img !== ''
                                  ? helper.ProjectImagePath + img.img
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
                                    ? helper.ProjectImagePath + img.img
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
                      );
                    })
                  : ''}
              </div>

              {error && error.images && (
                <p className="error">{error ? (error.images ? error.images : '') : ''}</p>
              )}
            </div>
          </form>
        </Col>
      </Row>

      <div className="d-flex py-2 border-bottom mb-3 mb-4">
        <h3 className="d-flex align-items-center mb-0 fw-bolder me-1">Select Products</h3>
        <span className="d-flex align-items-center text-light me-2">(0)</span>
        {/* <Button variant="info">Create New</Button> */}
        {/* <Link to={'/campaign/' + props.slug + '/posts'} className="btn btn-info">
          Create New
        </Link> */}
      </div>
      <div className="d-flex flex-wrap mb-3 p-20p border rounded-3">
        {productList.length > 0 ? (
          productList.map((product) => {
            const isAvailable = product.quantity !== product.soldout;
            return (
              isAvailable && (
                <FeedTag
                  key={product.headline}
                  data={product}
                  name={product.headline}
                  onSelect={(e) => onSelectProduct(e)}
                  checked={seletedProductList.includes(product._id)}
                  icon={<img src={helper.CampaignProductImagePath + product.image} alt="" />}
                />
              )
            );
          })
        ) : (
          <p>
            You must first publish some items for them to be added to a project. Try creating some
            posts!
          </p>
        )}
      </div>

      {error && error.products && (
        <p className="error">{error ? (error.products ? error.products : '') : ''}</p>
      )}
      <div>
        <div className="products-detial-footer d-flex py-3 py-sm-5 gap-2">
          <Button
            variant="danger"
            size="lg"
            className="fw-bold fs-6 mb-2 mb-sm-0"
            onClick={() => discardProject()}
          >
            Discard
          </Button>
          {status !== 1 ? (
            <Button
              variant="info"
              size="lg"
              className="fw-bold fs-6"
              onClick={() => submitProjectForm(1)}
            >
              {/* {!id ? "Create Project" : "Update Project"} */} Publish
            </Button>
          ) : (
            <Button
              variant="success"
              size="lg"
              className="fw-bold fs-6"
              onClick={() => submitProjectForm(1)}
            >
              Save Changes
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddProject;
