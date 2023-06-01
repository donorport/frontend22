//import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import _uniqueId from "lodash/uniqueId";
import PropTypes from "prop-types";
import "./style.scss";

const propTypes = {
  checked: PropTypes.bool,
};

const FeedTag = (props) => {
  let data = props.data
  //const [id] = useState(_uniqueId("tag-"));

  let checked = props.checked;
  let cantChange = props.cantChange;
  // let checked = props.seletedProjectList.includes(project._id);

  return (
    <div className={`feed__tag rounded-pill ${checked ? "bg-info text-white" : "text-subtext"}  ${cantChange ? "bg-warning" : ""}`}>
      <input
        id={data._id}
        type="checkbox"
        name="checkbox"
        className=""
        checked={checked}
        // onChange={() => setActive(!active)}
        onClick={(e) => props.onSelect(e)} 
      />
      <label htmlFor={data._id}>
        <div className={`icon icon--feedtag ${!checked ? "on" : "off"}`}>
          <FontAwesomeIcon icon={regular("circle-plus")} className="" />
        </div>
        {props.icon ? <div className="icon__wrap">{props.icon}</div> : ''}
        <div className="feed__tagtext fs-7 fw-bold">{props.name}</div>
        <div className={`icon icon--feedremove ${checked ? "on" : "off"}`}>
          <FontAwesomeIcon icon={regular("close")} className="" />
        </div>
      </label>
    </div>
  );
};

FeedTag.propTypes = propTypes;

export default FeedTag;
