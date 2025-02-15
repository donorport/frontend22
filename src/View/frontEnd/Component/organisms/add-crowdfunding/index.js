import React, { useState, useEffect, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import FundraisingSlider from '../../atoms/crowdfunding-slider';
import helper from '../../../../../Common/Helper';
import noimg from '../../../../../assets/images/noimg1.png';
import Textarea from '../text-area';
import Input from '../input';
import { useSelector } from 'react-redux';
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

const AddCrowdfunding = (props) => {
  const {
    id,
    updateGoal,
    goal,
    status,
    address,
    lat,
    lng,
    name,
    headline,
    video,
    description,
    error,
    infinite
  } = props.stateData;

  const [sliderValue, setSliderValue] = useState(500);

  // Function to handle changes from the slider
  const handleSliderChange = (newValue) => {
    props.updateGoal(newValue);
    setSliderValue(newValue);
  };

  let url = video;
  let videoid = url ? (url?.split('?v=')[1] ? url?.split('?v=')[1].split('&')[0] : '') : '';
  let embedlink = url ? 'https://www.youtube.com/embed/' + videoid : '';

  let tempImages = props.tempImages;
  let crowdfundingImages = props.crowdfundingImages;
  let submitCrowdfundingForm = props.submitCrowdfundingForm;
  let discardCrowdfunding = props.discardCrowdfunding;

  const change = async (e) => {
    props.changevalue(e);
  };
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
      locationName: address ? address : 'Canada',
      lat: lat ? Number(lat) : 0,
      lng: lng ? Number(lng) : 0
    });
  }, [props.stateData]);

  return (
    <div className="add__project">
      <div className="d-sm-flex align-items-start align-items-lg-center flex-grow-1 flex-column flex-lg-row gap-2 flex-wrap pb-20p mb-3 border-bottom">
        <div className="d-flex align-items-start mb-2 mb-sm-0 flex-grow-1">
          <Button
            variant="link"
            className="me-sm-2 me-1 p-0"
            onClick={() => props.createCrowdfunding(false)}
          >
            <FontAwesomeIcon icon={solid('angle-left')} className="text-subtext fs-3" />
          </Button>

          {status !== 1 ? (
            <span className="fs-3 fw-bolder me-sm-3">Create Fundraiser</span>
          ) : (
            <span className="fs-3 fw-bolder me-sm-3">Edit Fundraiser</span>
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
              onClick={() => submitCrowdfundingForm(-1)}
            >
              Save Draft
            </Button>
          ) : (
            <Button
              variant="info"
              size="md"
              className="text-white fw-bold fs-6 ms-sm-auto btn__draft"
              onClick={() => submitCrowdfundingForm(-1)}
            >
              Unpublish
            </Button>
          )}
          {status !== 1 ? (
            <Button
              variant="info"
              size="md"
              className="text-white fw-bold fs-6 ms-sm-auto btn__draft"
              onClick={() => submitCrowdfundingForm(1)}
            >
              Publish
            </Button>
          ) : (
            <Button
              variant="success"
              size="md"
              className="text-white fw-bold fs-6 ms-sm-auto btn__draft"
              onClick={() => submitCrowdfundingForm(1)}
            >
              Save Changes
            </Button>
          )}
        </div>
      </div>

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
                    <FontAwesomeIcon icon={solid('location-dot')} className="fs-3 text-primary" />
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
      <div className="d-flex py-2 border-bottom mb-3">
        <h4 className="mb-0 fw-bolder me-2">Goal</h4>
      </div>
      <FundraisingSlider
        userId={id}
        value={goal}
        min={0}
        name={goal}
        max={50000}
        step={100}
        onChange={handleSliderChange}
      />
      <div className="d-flex py-2 border-bottom mb-3">
        <h4 className="mb-0 fw-bolder me-2">Details</h4>
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
            {/* <div className="project-video-wrap"> */}

            <div className="d-flex align-items-center flex-wrap gap-2 mb-3">
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
                  <h3 style={{ fontSize: 'inherit' }}>Select Images</h3>
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
                {crowdfundingImages?.length
                  ? crowdfundingImages.map((img, key) => {
                      return (
                        // <img src={img ? img !== "" ? helper.CrowdfundingImagePath + img : noimg : noimg} alt="lk" style={{ width: "100px", height: "100px" }} />

                        <div className="img-wrap" key={key}>
                          <span
                            className="close"
                            onClick={() => props.deleteCrowdfundingImage(img.id)}
                          >
                            &times;
                          </span>
                          {/* <img
                            src={
                              img.img
                                ? img.img !== ''
                                  ? helper.CrowdfundingImagePath + img.img
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
                                    ? helper.CrowdfundingImagePath + img.img
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
            <div className="d-flex flex-column gap-2 form-group mb-2">
              <label htmlFor="videoInput" className="form__label">
                Video (YouTube)
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
              {error && error.video && (
                <p className="error">{error ? (error.video ? error.video : '') : ''}</p>
              )}
            </div>
          </form>
        </Col>
      </Row>

      <div>
        <div className="products-detial-footer d-flex py-3 py-sm-5 gap-2">
          <Button
            variant="danger"
            size="lg"
            className="fw-bold mb-2 mb-sm-0"
            onClick={() => discardCrowdfunding()}
          >
            Discard
          </Button>
          {status !== 1 ? (
            <Button
              variant="info"
              size="lg"
              className="fw-bold"
              onClick={() => submitCrowdfundingForm(1)}
            >
              {/* {!id ? "Create Crowdfunding" : "Update Crowdfunding"} */} Publish
            </Button>
          ) : (
            <Button
              variant="success"
              size="lg"
              className="fw-bold"
              onClick={() => submitCrowdfundingForm(1)}
            >
              Save Changes
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddCrowdfunding;
