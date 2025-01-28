import React from 'react';
import { Modal } from 'react-bootstrap';
import { Button } from '@mui/material';
import helper from '../../../Common/Helper';
import noimg from '../../../assets/images/noimg1.png';
import axios from 'axios';

export default function CampaignAdminForm(props) {
  let stateData = props.stateData;

  let videoid = stateData.promoVideo ? stateData.promoVideo?.split('?v=')[1].split('&')[0] : '';
  let embedlink = videoid ? 'https://www.youtube.com/embed/' + videoid : '';

  const transferAccount = async (authToken, formData) => {
    let res = {};
    try {
      await axios({
        method: 'post',
        url: `${helper.ApiUrl}auth/transfer-account`, // Adjust the API URL as needed
        responseType: 'json',
        headers: {
          'x-access-token': authToken,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': 'true',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          withCredentials: true,
          mode: 'no-cors'
        },
        data: formData
      }).then((response) => {
        res = response.data;
      });
    } catch (error) {
      console.error('Error transferring account:', error);
      res = { success: false, message: 'An error occurred during the transfer.' };
    }
    return res;
  };
  

  const handleTransferAccount = async () => {
    const authToken = localStorage.getItem('adminAuthToken'); // Replace with the correct source of the token
    const formData = {
      adminId: stateData.id,
      newEmail: stateData.email,
      tempPassword: '123456'
    };
  
    const result = await transferAccount(authToken, formData);
  
    if (result.success) {
      alert('Account transferred successfully!');
    } else {
      alert(result.message || 'Failed to transfer account.');
    }
  };
  
  
  // console.log(stateData)
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
            {stateData?.id ? 'Update Campaign Admin' : 'Add Campaign Admin'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="btnWarning" className="btnDanger" onClick={() => props.setModal(false)}>
            Close
          </Button>
          &nbsp;
          {stateData?.id ? (
            <Button variant="contained" onClick={() => props.updateCampaignAdmin()}>
              Update
            </Button>
          ) : (
            <Button variant="contained" onClick={() => props.addCampaignAdmin()}>
              Save
            </Button>
          )}
        </Modal.Footer>
        <Modal.Body>
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
          {/* Add Transfer Account Fields */}
          {stateData?.id && (
            <>
              <div className="form-group row">
                <label htmlFor="newEmail" className="col-sm-2 col-form-label">
                  New Email
                </label>
                <div className="col-sm-10">
                  <input
                    type="email"
                    className="form-control"
                    id="newEmail"
                    name="newEmail"
                    value={stateData.newEmail || ''}
                    onChange={(e) => props.changevalue(e)}
                  />
                  {stateData.error && stateData.error.newEmail && (
                    <p className="error">{stateData.error.newEmail}</p>
                  )}
                </div>
              </div>
              <div className="form-group row">
                <label htmlFor="tempPassword" className="col-sm-2 col-form-label">
                  Temporary Password
                </label>
                <div className="col-sm-10">
                  <input
                    type="password"
                    className="form-control"
                    id="tempPassword"
                    name="tempPassword"
                    value={stateData.tempPassword || ''}
                    onChange={(e) => props.changevalue(e)}
                  />
                  {stateData.error && stateData.error.tempPassword && (
                    <p className="error">{stateData.error.tempPassword}</p>
                  )}
                </div>
              </div>
              <div className="form-group row">
                <div className="col-sm-10 offset-sm-2">
                  <Button variant="contained" onClick={handleTransferAccount}>
                    Transfer Account
                  </Button>
                </div>
              </div>
            </>
          )}
          <div className="form-group row">
            <label className="col-form-label col-sm-2" htmlFor="inputstock">
              Logo
            </label>
            <div className="col-sm-10">
              <input
                type="file"
                className={
                  stateData.error.logo
                    ? 'inputerror custom-file-input form-control'
                    : ' custom-file-input form-control'
                }
                id="logo"
                accept="image/*"
                onChange={(e) => {
                  props.changefile(e);
                }}
              />
              <label
                className="custom-file-label"
                htmlFor="customFile"
                style={{ margin: '0px 10px 0px 10px' }}
              >
                {' '}
                Choose file{' '}
              </label>
              <p className="error">
                {stateData.error ? (stateData.error.logo ? stateData.error.logo : '') : ''}
              </p>
              {/* <img src={props.Img ? props.Img : props.tempImg ? props.tempImg !== "" ? helper.CampaignAdminLogoPath + props.tempImg :  noimg  : noimg } alt="logo"  style={{width:"100px"}}/> */}
              {props.Img || props.tempImg ? (
                <img
                  src={
                    props.Img
                      ? props.Img
                      : props.tempImg
                      ? props.tempImg !== ''
                        ? helper.CampaignAdminLogoPath + props.tempImg
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
              ein
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control "
                name="ein"
                id="ein"
                value={stateData.ein}
                onChange={(e) => {
                  props.changevalue(e);
                }}
              />

              {stateData.error && stateData.error.ein && (
                <p className="error">
                  {stateData.error ? (stateData.error.ein ? stateData.error.ein : '') : ''}
                </p>
              )}
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              Slug
            </label>
            <div className="col-sm-10">
              {/* <input type="text" className="form-control " disabled={stateData?.id ? true : false} name='slug' id="slug" value={stateData.slug} onChange={(e) => { props.changevalue(e) }} /> */}
              <input
                type="text"
                className="form-control "
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
            <label htmlFor="email" className="col-sm-2 col-form-label">
              Email
            </label>
            <div className="col-sm-10">
              <input
                type="email"
                disabled={stateData ? (stateData.id ? true : false) : false}
                className="form-control "
                id="email"
                name="email"
                value={stateData.email}
                onChange={(e) => {
                  props.changevalue(e);
                }}
              />

              {stateData.error && stateData.error.email && (
                <p className="error">
                  {stateData.error ? (stateData.error.email ? stateData.error.email : '') : ''}
                </p>
              )}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="password" className="col-sm-2 col-form-label">
              Password
            </label>
            <div className="col-sm-10">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={stateData.password}
                onChange={(e) => {
                  props.changevalue(e);
                }}
              />

              {stateData.error && stateData.error.password && (
                <p className="error">
                  {stateData.error
                    ? stateData.error.password
                      ? stateData.error.password
                      : ''
                    : ''}
                </p>
              )}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              Description
            </label>
            <div className="col-sm-10">
              <textarea
                className="form-control"
                id="description"
                name="description"
                rows="4"
                onChange={(e) => {
                  props.changevalue(e);
                }}
              >
                {stateData.description}
              </textarea>

              {stateData.error && stateData.error.description && (
                <p className="error">
                  {stateData.error
                    ? stateData.error.description
                      ? stateData.error.description
                      : ''
                    : ''}
                </p>
              )}
            </div>
          </div>
          {/* promoVideo: req.body.promoVideo,
                headline: req.body.headline, */}
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              Headline
            </label>
            <div className="col-sm-10">
              <textarea
                className="form-control"
                id="headline"
                name="headline"
                rows="4"
                onChange={(e) => {
                  props.changevalue(e);
                }}
              >
                {stateData.headline}
              </textarea>

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
              Promo Video
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control "
                name="promoVideo"
                id="promoVideo"
                value={stateData.promoVideo}
                onChange={(e) => {
                  props.changevalue(e);
                }}
              />
              {stateData.promoVideo && (
                <iframe
                  className="mt-4"
                  width="400"
                  height="200"
                  title="myFrame"
                  src={embedlink}
                  frameBorder="0"
                  allowFullScreen=""
                ></iframe>
              )}

              {stateData.error && stateData.error.promoVideo && (
                <p className="error">
                  {stateData.error
                    ? stateData.error.promoVideo
                      ? stateData.error.promoVideo
                      : ''
                    : ''}
                </p>
              )}
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              Twitter
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control "
                name="twitter"
                id="twitter"
                value={stateData.twitter}
                onChange={(e) => {
                  props.changevalue(e);
                }}
              />

              {stateData.error && stateData.error.twitter && (
                <p className="error">
                  {stateData.error ? (stateData.error.twitter ? stateData.error.twitter : '') : ''}
                </p>
              )}
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              Facebook
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control "
                name="facebook"
                id="facebook"
                value={stateData.facebook}
                onChange={(e) => {
                  props.changevalue(e);
                }}
              />

              {stateData.error && stateData.error.facebook && (
                <p className="error">
                  {stateData.error
                    ? stateData.error.facebook
                      ? stateData.error.facebook
                      : ''
                    : ''}
                </p>
              )}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              Linkedin
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control "
                name="linkedin"
                id="linkedin"
                value={stateData.linkedin}
                onChange={(e) => {
                  props.changevalue(e);
                }}
              />

              {stateData.error && stateData.error.linkedin && (
                <p className="error">
                  {stateData.error
                    ? stateData.error.linkedin
                      ? stateData.error.linkedin
                      : ''
                    : ''}
                </p>
              )}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              Website
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control "
                name="url"
                id="url"
                value={stateData.url}
                onChange={(e) => {
                  props.changevalue(e);
                }}
              />

              {stateData.error && stateData.error.url && (
                <p className="error">
                  {stateData.error ? (stateData.error.url ? stateData.error.url : '') : ''}
                </p>
              )}
            </div>
          </div>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              Building Address
            </label>
            <div className="col-sm-10">
              <input
                type="text"
                className="form-control "
                name="address"
                id="address"
                value={stateData.address}
                onChange={(e) => {
                  props.changevalue(e);
                }}
              />

              {stateData.error && stateData.error.address && (
                <p className="error">
                  {stateData.error ? (stateData.error.address ? stateData.error.address : '') : ''}
                </p>
              )}
            </div>
          </div>
          <div className="form-group row">
            <label className="col-form-label col-sm-2 ">Category</label>
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
                  props.categoryList
                    .sort((a, b) => a.name.localeCompare(b.name, 'es', { sensitivity: 'base' }))
                    .map(
                      (cat) =>
                        cat.status === 1 && (
                          <option
                            key={cat._id}
                            value={cat._id}
                            selected={stateData.category === cat._id}
                          >
                            {cat.name}
                          </option>
                        )
                    )}
              </select>
              <p className="error">
                {stateData.error ? (stateData.error.category ? stateData.error.category : '') : ''}
              </p>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-form-label col-sm-2 ">Country</label>
            <div className="col-sm-10">
              <select
                className="form-control"
                onChange={(e) => {
                  props.changevalue(e);
                }}
                id="country"
                name="country"
              >
                <option selected disabled value=" ">
                  Select Country
                </option>
                {props.countryList.length > 0 &&
                  props.countryList.map((country) => (
                    // country.status === 1 &&
                    <option
                      key={country.id}
                      value={country.id}
                      selected={Number(stateData.country) === Number(country.id)}
                    >
                      {country.country}
                    </option>
                  ))}
              </select>
              <p className="error">
                {stateData.error ? (stateData.error.country ? stateData.error.country : '') : ''}
              </p>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-form-label col-sm-2 ">State</label>
            <div className="col-sm-10">
              <select
                className="form-control"
                onChange={(e) => {
                  props.changevalue(e);
                }}
                id="stateid"
                name="stateid"
              >
                <option selected disabled value=" ">
                  Select State
                </option>
                {props.stateList.length > 0 &&
                  props.stateList.map(
                    (state) =>
                      state.status === 1 && (
                        <option
                          key={state.id}
                          value={state.id}
                          selected={stateData.stateid === state.id}
                        >
                          {state.state}
                        </option>
                      )
                  )}
              </select>
              <p className="error">
                {stateData.error ? (stateData.error.stateid ? stateData.error.stateid : '') : ''}
              </p>
            </div>
          </div>
          <div className="form-group row">
            <label className="col-form-label col-sm-2 ">City</label>
            <div className="col-sm-10">
              <select
                className="form-control"
                onChange={(e) => {
                  props.changevalue(e);
                }}
                id="city"
                name="city"
              >
                <option selected disabled value=" ">
                  Select City
                </option>
                {props.cityList.length > 0 &&
                  props.cityList.map((city) => (
                    // city.status === 1 &&
                    // <option value={city.id} selected={stateData.city === city.id}>{city.city}</option>
                    <option value={city._id.id} selected={stateData.city === city._id.id}>
                      {city._id.city}
                    </option>
                  ))}
              </select>
              <p className="error">
                {stateData.error ? (stateData.error.city ? stateData.error.city : '') : ''}
              </p>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
