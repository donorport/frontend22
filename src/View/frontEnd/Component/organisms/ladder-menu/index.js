import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import PropTypes from 'prop-types';
import ClickAwayListener from '@mui/base/ClickAwayListener';

import './style.scss';

const propTypes = {
  items: PropTypes.array
};
const currentYear = new Date().getFullYear();
const defaultProps = {
  items: ['Show All', currentYear, currentYear - 1, currentYear - 2]
};

const LadderMenu = ({ items, activeKey, onChangeFilterOption }) => {
  const [active, setActive] = useState(0);

  const handleClose = () => {
    setActive(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div className="ladder__menu position-relative" style={{ minWidth: '200px' }}>
        <div className="ladder__dropdown--selected" onClick={() => setActive(true)}>
          <div className="ladder__selected fw-semibold">{items[activeKey]}</div>
          <FontAwesomeIcon icon={solid('chevron-down')} className="icon chevron__icon" />
        </div>

        <ul className={`ladder__ul ladder__ul--listing fw-semibold ${active ? 'active' : ''}`}>
          {items.map((item, index) => (
            <li
              className="ladder__menu-item"
              onClick={() => {
                setActive(false);
                // setSelectedKey(index)
                onChangeFilterOption(index, item);
              }}
              key={index}
            >
              {item}
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
