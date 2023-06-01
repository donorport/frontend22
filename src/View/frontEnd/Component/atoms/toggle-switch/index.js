// import React from "react";
import React from "react";
import _uniqueId from 'lodash/uniqueId';
//import PropTypes from "prop-types";

import "./style.scss";

// const defaultProps = {
//   defaultColor: "#efefef",
//   checkedColor: "#06d6a0",
//   checked: false,
// };

// const propTypes = {
//   defaultColor: PropTypes.string,
//   checkedColor: PropTypes.string,
// };

// const ToggleSwitch = ({
//   checked,
//   defaultColor,
//   checkedColor,
// }) => {
//   const [id] = useState(_uniqueId("switch-"));
//   const [_checked, setChecked] = useState(checked);
//   return (
//     <>
//       <input
//         checked={_checked}
//         onChange={() => setChecked(!_checked)}
//         className="switch-checkbox"
//         id={id}
//         type="checkbox"
//       />
//       <label
//         style={{ background: _checked ? checkedColor : defaultColor }}
//         className="switch-label"
//         htmlFor={id}
//       >
//         <span className={`switch-button`} />
//       </label>
//     </>
//   );
// };

// ToggleSwitch.defaultProps = defaultProps;
// ToggleSwitch.propTypes = propTypes;
const ToggleSwitch = (props) => {
  //const [id] = useState(_uniqueId('switch-'));
  let check = props.checked
  return (
    <>
      {/* <input
        checked={check}
        onChange={(e) => props.changevalue(e)}
        className="switch-checkbox"
        id="unlimited"
        name={props.name}
        type="checkbox"
      />
      <label
        style={{ background: check ? 'rgb(6, 214, 160)' : 'rgb(239, 239, 239)' }}
        className="switch-label"
        id={props.id}
      >
        <span className='switch-button' />
      </label> */}

      <label className="--switch">
        <input type="checkbox"  id={props.id} checked={check} name={props.name} onChange={(e) => props.changevalue(e)} />
        <span className="--slider" style={{ backgroundColor: check ? '#4bd863' : '#efefef' }}>
          {/* <i className="fa fa-check"></i>
          <i className="fa fa-times"></i> */}
        </span>
      </label>
    </>
  );
};

export default ToggleSwitch;
