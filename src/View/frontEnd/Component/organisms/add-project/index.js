import { Button, Row, Col } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';

// import { ToggleSwitch, FeedTag, FileUpload } from "@components/atoms";

import ToggleSwitch from '../../atoms/toggle-switch';
import FeedTag from '../../atoms/feed-tag';
import FileUpload from '../../atoms/file-upload';
import helper from '../../../../../Common/Helper';
import noimg from '../../../../../assets/images/noimg.jpg';
import Textarea from '../text-area';
import Input from '../input';
import './style.scss';
import { Link } from 'react-router-dom';

const AddProject = (props) => {
  const { id, status, name, headline, video, description, error, images, infinite } =
    props.stateData;

  let url = video;
  let videoid = url.split('?v=')[1];
  let embedlink = url ? 'https://www.youtube.com/embed/' + videoid : '';

  let tempImages = props.tempImages;
  let projectImages = props.projectImages;
  let changefile = props.changefile;
  let productList = props.productList;
  let seletedProductList = props.seletedProductList;
  let onSelectProduct = props.onSelectProduct;
  let submitProjectForm = props.submitProjectForm;
  let discardProject = props.discardProject;

  console.log({productList})
  const [id1] = useState('name');
  const [id2] = useState('headline');
  const [id3] = useState('description');
  const [title1] = useState('Name');
  const [title2] = useState('Headline');
  const [title3] = useState('Description');
  const [placeholder1] = useState('Ex: Christmas Drive');
  const [placeholder2] = useState('Ex: Feeding the homeless every Friday night');
  const [placeholder3] = useState('Enter some details about your need');
  const [rows3] = useState(5);
  const [max25] = useState(25);
  const [max45] = useState(45);
  const [max250] = useState(250);

  const change = async (e) => {
    props.changevalue(e);
  };

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

  return (
    <div className="add__project">
      <div className="d-sm-flex align-items-center flex-grow-1 pb-20p mb-3 border-bottom">
        <div className="d-flex align-items-center mb-2 mb-sm-0 flex__1">
          <Button
            variant="link"
            className="me-sm-2 me-1"
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
            <FontAwesomeIcon icon={solid('circle-question')} className="text-dark fs-4" />
          </Button>*/}
        </div>
        <div className="d-flex gap-2">
          {status !== 1 ? (
            <Button
              variant="warning"
              size="lg"
              className="text-white fw-bold fs-6 ms-sm-auto btn__draft"
              onClick={() => submitProjectForm(-1)}
            >
              Save as Draft
            </Button>
          ) : (
            <Button
              variant="info"
              size="lg"
              className="text-white fw-bold fs-6 ms-sm-auto btn__draft"
              onClick={() => submitProjectForm(-1)}
            >
              Unpublish
            </Button>
          )}
          {status !== 1 ? (
            <Button
              variant="info"
              size="lg"
              className="text-white fw-bold fs-6 ms-sm-auto btn__draft"
              onClick={() => submitProjectForm(1)}
            >
              Publish
            </Button>
          ) : (
            <Button
              variant="success"
              size="lg"
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
        <div className="flex__1 text-light mb-2 mb-sm-0 text-center text-sm-start">
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

      <div className="d-flex py-2 border-bottom">
        <h3 className="mb-0 fw-bolder me-2">Project Details</h3>
        <div className="d-flex align-items-center">
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
        </div>
      </div>
      <Row className="mw-850 py-5">
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
            {/* <div className="project-video-wrap mb-1"> */}
            <div className="project-video-wrap mb-1">
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
            {/* <div className="">
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
                  onChange={(e) => props.changefile(e)}
                  title=" "
                  style={fileuploadinput}
                />
                <div className="drag-text" style={{ textAlign: 'center', padding: '70px' }}>
                  <FontAwesomeIcon icon={solid('cloud-arrow-up')} className="icon-cloud" />
                  <h3 style={{ fontSize: 'inherit' }}>Drag and drop or select File</h3>
                </div>
              </div>
              {error && error.moreImg && (
                <p className="error">{error ? (error.moreImg ? error.moreImg : '') : ''}</p>
              )}
              <div className="grid mt-3 mb-3">
                {tempImages?.length ? (
                  tempImages.map((img, key) => {
                    return (
                      <div className="img-wrap">
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
                            backgroundImage: `url(${img ? img : noimg})`,
                            width: '100px',
                            height: '100px'
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
                              })`,
                              width: '100px',
                              height: '100px'
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

      <div className="d-flex py-2 border-bottom mb-4">
        <h3 className="d-flex align-items-center mb-0 fw-bolder me-1">Select Products</h3>
        <span className="d-flex align-items-center text-light me-2">(0)</span>
        {/* <Button variant="info">Create New</Button> */}
        <Link to={'/campaign/' + props.slug + '/posts'} className="btn btn-info">
          Create New
        </Link>
      </div>
      <div className="d-flex flex-wrap mb-3 p-20p border rounded-3">
        {productList.length > 0 &&
          productList.map((product, i) => {
            const available = product.quantity !== product.soldout;
            return (
              available && (
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
          })}
      </div>
      {error && error.products && (
        <p className="error">{error ? (error.products ? error.products : '') : ''}</p>
      )}
      <div>
        <div className="products-detial-footer d-flex py-3 py-sm-5 gap-2">
          <Button
            variant="white"
            size="lg"
            className="fw-bold fs-6 mb-2 mb-sm-0"
            onClick={() => discardProject()}
          >
            Discard
          </Button>
          {status !== 1 ? (
            <Button
              variant="success"
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
              Save
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddProject;
