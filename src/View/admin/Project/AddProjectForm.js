import React from 'react';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Modal } from 'react-bootstrap';
import { Button } from '@mui/material';
import helper from '../../../Common/Helper';
import noimg from '../../../assets/images/noimg.jpg';

const productv = {
  cursor: 'pointer',
  display: 'block',
  position: 'absolute',
  top: '0px',
  left: '0px',
  opacity: '0',
  height: '100%',
  width: '100%'
};
let variantStyle = {
  fontSize: '14px',
  color: '#00ab55',
  textTransform: 'uppercase',
  // cursor: "pointer",
  marginRight: '10px',
  display: 'inline-block',
  // marginBottom: 0,
  border: '1px solid #9fbcc1',
  padding: '1px 28px 0px',
  borderRadius: '7px',
  marginBottom: '5px'
};

export default function AddProjectForm(props) {
  console.log('iFrame, AddProjectForm');
  let stateData = props.stateData;
  const adminData = JSON.parse(localStorage.getItem('adminData'));
  let url = stateData.video;
  let id = url.split('?v=')[1];
  let embedlink = 'http://www.youtube.com/embed/' + id;

  // console.log('stateData',stateData)

  return (
    <>
      <Modal
        size="lg"
        show={props.modal}
        onHide={() => props.setModal(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        animation={false}
        style={{ zIndex: '999999' }}
      >
        <Modal.Header>
          <Modal.Title id="example-modal-sizes-title-lg">
            {stateData?.id ? 'Update Project' : 'Add Project'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group row">
            <label className="col-form-label col-sm-2 ">Organization</label>
            <div className="col-sm-10">
              <select
                className="form-control"
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

          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              Name
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control "
                name="name"
                id="name"
                value={stateData.name}
                onChange={(e) => {
                  props.changevalue(e);
                }}
              />

              {stateData.error && stateData.error.name && (
                <p className="error">
                  {stateData.error ? (stateData.error.name ? stateData.error.name : '') : ''}
                </p>
              )}
            </div>
          </div>

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
            <label className="col-form-label col-sm-2" htmlFor="inputstock">
              Description
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
            <label htmlFor="isInfinity" className="col-sm-2 col-form-label">
              Ongoing Need
            </label>
            <div className="col-sm-10">
              <label className="--switch mt-1">
                <input
                  type="checkbox"
                  id="isInfinity"
                  checked={stateData.isInfinity}
                  name="isInfinity"
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
              Pictures & Video
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control "
                name="video"
                id="video"
                value={stateData.video}
                onChange={(e) => {
                  props.changevalue(e);
                }}
              />
              {
                stateData.video && (
                  <div className="project-video-wrap mb-4 mt-4">
                    <iframe
                      title="project-video"
                      key="project-video"
                      width="498"
                      height="280"
                      src={stateData.video}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                )

                // <iframe className='mt-4' width="400" height="200" title="myFrame" src={embedlink} frameBorder="0" allowFullScreen=""></iframe>
                // <iframe id="video1" width="520" title="myFrame" height="360" src={stateData.video} frameBorder="0" allowtransparency="true" ></iframe>
              }

              {stateData.error && stateData.error.video && (
                <p className="error">
                  {stateData.error ? (stateData.error.video ? stateData.error.video : '') : ''}
                </p>
              )}
            </div>
          </div>

          <div className="form-group row">
            <label className="col-form-label col-sm-2" htmlFor="inputstock">
              Images
            </label>
            <div className="col-sm-10">
              <input
                className="custom-file-input form-control "
                title=" "
                name="Iamges[]"
                id="Iamges"
                type="file"
                accept=".jpg,.gif,.png"
                multiple
                onChange={(e) => {
                  props.changefile(e);
                }}
              />
              {/* <label className="custom-file-label" htmlFor="customFile" style={{ margin: "0px 10px 0px 10px" }}> Choose files </label> */}
              <div className="grid mt-3 mb-3">
                {props.tempImages?.length
                  ? props.tempImages.map((img, key) => {
                      return (
                        <img
                          src={img ? img : noimg}
                          alt="lk"
                          style={{ width: '100px', height: '100px' }}
                        />
                      );
                    })
                  : props.projectImages?.length
                  ? props.projectImages.map((img, key) => {
                      return (
                        <img
                          src={img ? (img !== '' ? helper.ProjectImagePath + img : noimg) : noimg}
                          alt="lk"
                          style={{ width: '100px', height: '100px' }}
                        />
                      );
                    })
                  : ''}
              </div>
              {stateData.error && stateData.error.images && (
                <p className="error">
                  {stateData.error ? (stateData.error.images ? stateData.error.images : '') : ''}
                </p>
              )}
            </div>
          </div>

          <div className="form-group row">
            <label className="col-form-label col-sm-2 ">Products</label>
            <div className="col-sm-10">
              {props.productList && props.productList.length > 0 ? (
                props.productList.map((Product, i) => {
                  return (
                    <>
                      <p
                        style={{
                          ...variantStyle,
                          position: 'relative',
                          backgroundColor: props.seletedProductList.includes(Product._id)
                            ? '#00ab55'
                            : 'white',
                          color: props.seletedProductList.includes(Product._id)
                            ? 'white'
                            : '#00ab55'
                        }}
                        key={i}
                      >
                        <input
                          type="checkbox"
                          id={Product._id}
                          checked={props.seletedProductList.includes(Product._id)}
                          style={productv}
                          name={'Product_' + i}
                          onClick={(e) => props.onSelectProduct(e)}
                        />
                        {Product.headline}
                      </p>
                    </>
                  );
                })
              ) : (
                <h6>Product Not Found</h6>
              )}
              {stateData.error && stateData.error.products && (
                <p className="error">
                  {stateData.error
                    ? stateData.error.products
                      ? stateData.error.products
                      : ''
                    : ''}
                </p>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="btnWarning" className="btnDanger" onClick={() => props.setModal(false)}>
            Close
          </Button>
          &nbsp;
          <Button variant="contained" onClick={() => props.submitProjectForm()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
