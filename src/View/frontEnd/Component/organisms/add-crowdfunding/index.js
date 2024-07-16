import { Button, Row, Col } from 'react-bootstrap';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

// import { ToggleSwitch, FeedTag, FileUpload } from "@components/atoms";

import ToggleSwitch from '../../atoms/toggle-switch';
import FeedTag from '../../atoms/feed-tag';
import helper from '../../../../../Common/Helper';
import noimg from '../../../../../assets/images/noimg1.png';
import Textarea from '../text-area';
import Input from '../input';
import './style.scss';
//import { Link } from 'react-router-dom';

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

const AddCrowdfunding = (props) => {
  const { status, name, headline, video, description, error, infinite } = props.stateData;

  let url = video;
  let videoid = url ? url?.split('?v=')[1].split('&')[0] : '';
  let embedlink = url ? 'https://www.youtube.com/embed/' + videoid : '';

  let tempImages = props.tempImages;
  let crowdfundingImages = props.crowdfundingImages;
  let submitCrowdfundingForm = props.submitCrowdfundingForm;
  let discardCrowdfunding = props.discardCrowdfunding;

  const change = async (e) => {
    props.changevalue(e);
  };

  return (
    <div className="add__project">
      <div className="d-sm-flex align-items-center flex-grow-1 pb-20p mb-3 border-bottom">
        <div className="d-flex align-items-start mb-2 mb-sm-0 flex__1">
          <Button
            variant="link"
            className="me-sm-2 me-1"
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
              size="lg"
              className="text-white fw-bold fs-6 ms-sm-auto btn__draft"
              onClick={() => submitCrowdfundingForm(-1)}
            >
              Save as Draft
            </Button>
          ) : (
            <Button
              variant="info"
              size="lg"
              className="text-white fw-bold fs-6 ms-sm-auto btn__draft"
              onClick={() => submitCrowdfundingForm(-1)}
            >
              Unpublish
            </Button>
          )}
          {status !== 1 ? (
            <Button
              variant="info"
              size="lg"
              className="text-white fw-bold fs-6 ms-sm-auto btn__draft"
              onClick={() => submitCrowdfundingForm(1)}
            >
              Publish
            </Button>
          ) : (
            <Button
              variant="success"
              size="lg"
              className="text-white fw-bold fs-6 ms-sm-auto btn__draft"
              onClick={() => submitCrowdfundingForm(1)}
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
        <div className="flex__1 text-light mb-2 mb-sm-0 text-center text-sm-start">
          <div className="fs-5">Your account allows up to 3 crowdfunding campaignss</div>
          <a
            href="/"
            className="studio__url mt-6p d-flex text-light justify-content-center justify-content-sm-start"
          >
            <FontAwesomeIcon icon={regular('circle-location-arrow')} className="me-1" />
            <div className="fw-semibold fs-7">You have 0 crowdfunding campaigns remaining</div>
          </a>
        </div>
        <div className="d-grid">
          <Button variant="info" className="btn__upgrade fs-7">
            Upgrade
          </Button>
        </div>
      </div>*/}

      <div className="d-flex py-2 border-bottom">
        <h3 className="mb-0 fw-bolder me-2">Fundraiser Details</h3>
        {/* <div className="d-flex align-items-center">
          <div className="bg-purple text-nowrap fs-8 fw-semibold rounded-3 p-6p text-white">
            Ongoing Need?
            <FontAwesomeIcon icon={solid('infinity')} className="ml-3p" />
          </div>
        </div> 
        <div className="ms-2">
          <ToggleSwitch
            id="infinite"
            checked={infinite}
            name="infinite"
            changevalue={props.changevalue}
          />
        </div>*/}
      </div>
      <Row className="mw-850 py-0 py-sm-5">
        <Col lg="6">
          <form className="d-flex flex-column profile-detail-form gap-2">
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
                {crowdfundingImages?.length
                  ? crowdfundingImages.map((img, key) => {
                      return (
                        // <img src={img ? img !== "" ? helper.CrowdfundingImagePath + img : noimg : noimg} alt="lk" style={{ width: "100px", height: "100px" }} />

                        <div className="img-wrap" key={key}>
                          <span className="close" onClick={() => props.deleteCrowdfundingImage(img.id)}>
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
          </form>
        </Col>
      </Row>

      <div>
        <div className="products-detial-footer d-flex py-3 py-sm-5 gap-2">
          <Button
            variant="white"
            size="lg"
            className="fw-bold fs-6 mb-2 mb-sm-0"
            onClick={() => discardCrowdfunding()}
          >
            Discard
          </Button>
          {status !== 1 ? (
            <Button
              variant="info"
              size="lg"
              className="fw-bold fs-6"
              onClick={() => submitCrowdfundingForm(1)}
            >
              {/* {!id ? "Create Crowdfunding" : "Update Crowdfunding"} */} Publish
            </Button>
          ) : (
            <Button
              variant="success"
              size="lg"
              className="fw-bold fs-6"
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
