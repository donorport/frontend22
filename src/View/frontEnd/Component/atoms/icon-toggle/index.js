import { useState } from "react";
//import PropTypes from "prop-types";
import "./style.scss";

//const propTypes = {
  //checked: PropTypes.bool,
  //activeColor: PropTypes.string,
  //icon: PropTypes.element,
  //checkedIcon: PropTypes.element,
//};

//const defaultProps = {
  //checked: false,
  //activeColor: "",
//};

function IconToggle(props) {
  const {
    ischecked,
    icon,
    checkedIcon,
    activeColor,
    name,
    onClickFilter
  } =props

  const [_checked, setChecked] = useState(ischecked);

  // const sharedProps = {
  //   checked,
  //   icon,
  //   checkedIcon,
  //   activeColor,
  //   ischecked,
  //   ...otherProps,
  // };
  return (
    <label className="icon__toggle-label" >
      <input type="checkbox"  className="icon__toggle-input" checked={ischecked}  name={name}  onChange={(e) => onClickFilter(e)} />
      <span
        className="icon__toggle-icon d-flex align-items-center"
        style={{ color:ischecked ? activeColor :"" }}
      >
        {ischecked ? checkedIcon : icon}
      </span>
    </label>
  );
}

// IconToggle.defaultProps = defaultProps;
// IconToggle.propTypes = propTypes;

export default IconToggle;
