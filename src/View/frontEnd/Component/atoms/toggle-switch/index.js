import React, { useState, useEffect } from 'react';
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
  const [internalChecked, setInternalChecked] = useState(checked);

  useEffect(() => {
    setInternalChecked(checked);
  }, [checked]);

  const handleToggleChange = (e) => {
    setInternalChecked(e.target.checked);
    changevalue(e);
  };

  return (
    <label className="--switch">
      <input
        type="checkbox"
        id={id}
        checked={internalChecked}
        name={name}
        onChange={handleToggleChange}
      />
      <span className="--slider"></span>
    </label>
  );
};

ToggleSwitch.propTypes = propTypes;

export default React.memo(ToggleSwitch);
