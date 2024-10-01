import { useState } from "react";
import "./style.scss";

function IconToggle(props) {
  const {
    ischecked,
    icon,
    checkedIcon,
    iconSrc,
    checkedIconSrc,
    activeColor,
    name,
    onClickFilter,
  } = props;

  const [_checked, setChecked] = useState(ischecked);

  return (
    <label className="icon__toggle-label">
      <input
        type="checkbox"
        className="icon__toggle-input"
        checked={ischecked}
        name={name}
        onChange={(e) => onClickFilter(e)}
      />
      <span
        className="icon__toggle-icon d-flex align-items-center"
        style={{ color: ischecked ? activeColor : "" }}
      >
        {ischecked ? (
          checkedIcon ? (
            checkedIcon
          ) : (
            <img
              src={checkedIconSrc}
              alt={name}
              // width={24}
              height={24}
            />
          )
        ) : (
          icon ? (
            icon
          ) : (
            <img
              src={iconSrc}
              alt={name}
              // width={21}
              height={24}
            />
          )
        )}
      </span>
    </label>
  );
}

export default IconToggle;
