import React from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from '@mui/material';
import helper from '../../../Common/Helper';
import noimg from '../../../assets/images/noimg1.png';
import { unescape } from 'lodash';
import ReactDOM from 'react-dom';

export default function CreateAdForm(props) {
  let stateData = props.stateData;

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
            {stateData?.id ? 'Update Advertise' : 'Create Advertise'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group row">
            <label className="col-form-label col-sm-2" htmlFor="inputstock">
              Logo
            </label>
            <div className="col-sm-10">
              <input
                type="file"
                className={
                  stateData.error?.logo
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
                {stateData.error ? (stateData.error.logo ? stateData.error.logo : '') : ''}
              </p>

              {props.Img || props.tempImg ? (
                <img
                  src={
                    props.tempImg
                      ? props.tempImg
                      : props.Img
                      ? props.Img !== ''
                        ? helper.sponsorLogoResizePath + props.Img
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
              Website Url
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control "
                name="website"
                id="website"
                value={stateData.website}
                onChange={(e) => {
                  props.changevalue(e);
                }}
              />

              {stateData.error && stateData.error.website && (
                <p className="error">
                  {stateData.error ? (stateData.error.website ? stateData.error.website : '') : ''}
                </p>
              )}
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="btnWarning" className="btnDanger" onClick={() => props.setModal(false)}>
            Close
          </Button>
          &nbsp;
          <Button variant="contained" onClick={() => props.submitAdForm()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
