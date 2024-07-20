import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import PropTypes from 'prop-types';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import { CircularProgress } from '@mui/material';

import './style.scss';

const propTypes = {
  items: PropTypes.array
};
const currentYear = new Date().getFullYear();
const defaultProps = {
  items: [currentYear, currentYear - 1, currentYear - 2, 'Show All']
};

const LadderMenu = ({ items, activeKey, onChangeFilterOption, loading }) => {
  const [active, setActive] = useState(false);
  const [loadingId, setLoadingId] = useState([]);

  const handleClose = () => {
    setActive(false);
  };

  const handleMenuClick = (index, item) => {
    setActive(false);
    if (!loading) {
      onChangeFilterOption(index, item);
    }
    let tempArray = [...loadingId];
    tempArray.push(`loading-${index}`);
    setLoadingId(tempArray);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div className="ladder__menu position-relative" style={{ minWidth: '200px' }}>
        <div className="ladder__dropdown--selected" onClick={() => setActive(true)}>
          <p className="ladder__selected fw-semibold">
            {items[activeKey]}
            {loading && loadingId.indexOf(`loading-${activeKey}`) !== -1 && (
              <CircularProgress className="ms-2" color="inherit" size={12} />
            )}
          </p>
          <FontAwesomeIcon icon={solid('chevron-down')} className="icon chevron__icon" />
        </div>

        <ul className={`ladder__ul ladder__ul--listing fw-semibold ${active ? 'active' : ''}`}>
          {items.map((item, index) => (
            <li
              className="ladder__menu-item"
              onClick={() => handleMenuClick(index, item)}
              key={index}
            >
              <p> {item}</p>
            </li>
          ))}
        </ul>
      </div>
    </ClickAwayListener>
  );
};

LadderMenu.defaultProps = defaultProps;
LadderMenu.propTypes = propTypes;

export default LadderMenu;
