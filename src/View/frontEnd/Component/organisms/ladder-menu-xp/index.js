import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import './style.scss';
import donation from '../../../../../assets/images/donate.svg';
import speech from '../../../../../assets/images/speech-bubble.svg';
import share from '../../../../../assets/images/share.svg';
import wallet from '../../../../../assets/images/wallet.svg';

const LadderMenuXp = (props) => {
  const [active, setActive] = useState(0);

  const handleClose = () => {
    setActive(false);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div className="ladder__menu position-relative">
        <div className="ladder__dropdown--selected" onClick={() => setActive(true)}>
          <div className="ladder__selected">
            <div className="ladder__icon">
              {props.listBy !== 'ALL' ? (
                <img alt="" src={props.urlIcon} />
              ) : (
                <FontAwesomeIcon icon={solid('arrow-down-long')} className="icon icon--showall" />
              )}
            </div>
            <span>
              {props.listBy === 'ALL'
                ? 'Show All'
                : props.listBy === 'DONATED'
                ? 'Donated'
                : props.listBy === 'FOLLOWED'
                ? 'Followed'
                : props.listBy === 'SHARED'
                ? 'Shared'
                : props.listBy === 'BOUGHT'
                ? 'Bought'
                : ''}
            </span>
          </div>
          <FontAwesomeIcon icon={solid('chevron-down')} className="icon chevron__icon" />
        </div>

        <ul className={`ladder__ul ladder__ul--listing ${active ? 'active' : ''}`}>
          <li
            className="ladder__menu-item"
            onClick={() => {
              setActive(false);
              props.onChangeDropdown('ALL', '');
            }}
          >
            <div className="ladder__icon">
              <FontAwesomeIcon icon={solid('arrow-down-long')} className="icon icon--showall" />
            </div>
            Show All
          </li>

          <li
            className="ladder__menu-item"
            onClick={() => {
              setActive(false);
              props.onChangeDropdown('DONATED', donation);
            }}
          >
            <div className="ladder__icon">
              <img alt="" src={donation} />
            </div>
            Donated
          </li>
          <li
            className="ladder__menu-item "
            onClick={() => {
              setActive(false);
              props.onChangeDropdown('FOLLOWED', speech);
            }}
          >
            <div className="ladder__icon">
              <img alt="" src={speech} />
            </div>
            Followed
          </li>
          <li
            className="ladder__menu-item"
            onClick={() => {
              setActive(false);
              props.onChangeDropdown('SHARED', share);
            }}
          >
            <div className="ladder__icon">
              <img alt="" src={share} />
            </div>
            Shared
          </li>
          <li
            className="ladder__menu-item"
            onClick={() => {
              setActive(false);
              props.onChangeDropdown('BOUGHT', wallet);
            }}
          >
            <div className="ladder__icon">
              <img alt="" src={wallet} />
            </div>
            Bought
          </li>
        </ul>
      </div>
    </ClickAwayListener>
  );
};

export default LadderMenuXp;
