import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular } from "@fortawesome/fontawesome-svg-core/import.macro";
import _uniqueId from "lodash/uniqueId";
import PropTypes from "prop-types";
import "./style.scss";

const propTypes = {
  checked: PropTypes.bool,
};

const FeedTag = (props) => {
  let project = props.project
  const [id] = useState(_uniqueId("tag-"));
  // const [active, setActive] = useState(props.seletedProjectList.includes(project._id));
  let checked = props.seletedProjectList.includes(project._id);
  return (
    <div className={`feed__tag rounded-pill ${checked ? "bg-info text-white" : "text-subtext"}`}>
      <input
        id={project._id}
        type="checkbox"
        name="checkbox"
        className=""
        // onChange={() => setActive(!active)}
        onClick={(e) => props.onSelectProject(e)} 
      />
      <label htmlFor={project._id}>
        <div className={`icon icon--feedtag ${!checked ? "on" : "off"}`}>
          <FontAwesomeIcon icon={regular("circle-plus")} className="" />
        </div>
        <div className="feed__tagtext fs-7 fw-bold">{project.name}</div>
        <div className={`icon icon--feedremove ${checked ? "on" : "off"}`}>
          <FontAwesomeIcon icon={regular("close")} className="" />
        </div>
      </label>
    </div>
  );
};

FeedTag.propTypes = propTypes;

export default FeedTag;
