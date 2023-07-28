// import React from "react";
import React from 'react';
import _uniqueId from 'lodash/uniqueId';
import PropTypes from 'prop-types';

import './style.scss';

const propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  checked: PropTypes.bool.isRequired,
  changevalue: PropTypes.func.isRequired
};

const ToggleSwitch = ({ id, checked, name, changevalue }) => {
  const styles = { backgroundColor: checked ? '#4bd863' : '#efefef' };
  return (
    <label className="--switch">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        name={name}
        onChange={(e) => changevalue(e)}
      />
      <span className="--slider" style={styles}>
        {/* <i className="fa fa-check"></i>
          <i className="fa fa-times"></i> */}
      </span>
    </label>
  );
};

ToggleSwitch.propTypes = propTypes;

export default React.memo(ToggleSwitch);
