import { useState } from "react";
import PropTypes from "prop-types";
import "./style.scss";

const propTypes = {
  checked: PropTypes.bool,
  color: PropTypes.string,
};

const defaultProps = {
  checked: false,
  color: "",
};

function RadioToggle(props) {
  let checked = props.checked
  let color = '#5F5DF8'
  let children = props.children
  let disabled = false
// console.log(checked)


  const [_checked, setChecked] = useState(checked);

  //const sharedProps = {
    //checked,
    //color,
    //disabled,
    //// ...otherProps,
  //};
  return (
    <label className={`radio__toggle-label ${checked ? 'active' : ''}`} style={{ backgroundColor: checked ? color : 'transparent', opacity: disabled ? '0.4' : 1 }} onClick={() => !disabled ? setChecked(!checked) : ''}>
      <input type="radio" value={checked} className="radio__toggle-input" name={props.value} onClick={(e)=>props.onChange(e)} />
      <mark className="dot" style={{ backgroundColor: !checked ? color : 'transparent' }}></mark>
      <span
        className="icon__toggle-icon d-flex align-items-center"
        style={{ color: checked ? "white" : "" }}
      >
        {children}
      </span>
    </label>
  );
}

RadioToggle.defaultProps = defaultProps;
RadioToggle.propTypes = propTypes;

export default RadioToggle;
