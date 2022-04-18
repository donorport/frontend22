import "./style.scss";
import { Outlet, Link, useLocation, useOutletContext } from "react-router-dom";
import React, { useState, useEffect } from "react";
import FrontLoader from "../../../../../Common/FrontLoader";


const CompanySettings = () => {
  const [data, setData] = useOutletContext();
  const [loading, setLoading] = useState(false)
  const [embedlink, setEmbedlink] = useState('')


  const [state, setState] = useState({
    name: "",
    headline: "",
    mission: "",
    promoVideo: "",
    error: []
  })
  const {name,headline,mission,promoVideo} = state

  useEffect(() => {
    // console.log(data)
    setLoading(true)
    setState({
      ...state,
      name:data.name,
      mission:data.description,
      headline:data.headline,
      promoVideo:data.promoVideo,
    })
    let url = data.promoVideo;
    let id =url && url.split("?v=")[1];
    let embedUrl =url? "http://www.youtube.com/embed/" + id:"";
    setEmbedlink(embedUrl)
    setLoading(false)

}, [data._id])
  return (
    <>
      <FrontLoader loading={loading} />
      <div className="mb-5 mw-400">
        <h4 className="fw-bolder">About</h4>
        <div className="text-subtext mb-3">
          This info appears on your organization's page:
        </div>

        <div className="input__wrap mb-3">
          <label className="input__label flex__1">
            <input type="text" value={name} />
            <span className="input__span">Organisation Name</span>
          </label>
        </div>

        <div className="input__wrap mb-3">
          <label className="input__label mb-2">
            <input type="text" value={headline}  />
            <span className="input__span" >Headline</span>
          </label>
          <div className="helper__text fs-7 text-end text-subtext">
            120 chars remaining
          </div>
        </div>
        <div className="note note--inputs mb-3">
          A headline is the subtitle that appears on your organization's page
          that describes your cause in 120 characters or less.
        </div>
        <div className="input__wrap mb-3">
          <label className="input__label mb-2">
            <textarea rows="6">{mission}</textarea>
            <span className="input__span" >Mission</span>
          </label>
          <div className="helper__text fs-7 text-end text-subtext">
            240 chars remaining
          </div>
        </div>
      </div>

      <div className="mb-5 mw-400">
        <h4 className="fw-bolder">Promo Video</h4>
        <div className="text-subtext mb-3">
          This video appears on your organization's page:
        </div>
        <div className="input__wrap mb-3">
          <label className="input__label">
            <input
              className="input__text"
              type="text"
              placeholder="Video URL"
              value={promoVideo}
            />
          </label>
        </div>
        <div className="post__video minh-120 border bg-lighter mb-3">
          <iframe
            title="post-video"
            width="200"
            height="200"
            src={embedlink}
          ></iframe>
        </div>
        <div className="fw-bolder mb-3">Account Deactivation</div>
        <div className="deactivate">
          <h5>Do you really want to leave us?</h5>
          <ul className="list list--deactivate">
            <li className="list__item">
              <div>
                All account information will be lost including order history and
                payment information.
              </div>
            </li>
            <li className="list__item">
              <div>Active orders will be cancelled.</div>
            </li>
            <li className="list__item">
              <div>This cannot be undone.</div>
            </li>
          </ul>
          <a href="#" className="btn btn--deactivate">
            Deactivate
          </a>
        </div>
      </div>
    </>
  );
};

export default CompanySettings;
