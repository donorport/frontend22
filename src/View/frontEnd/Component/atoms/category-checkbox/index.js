import { useState } from "react";
import PropTypes from "prop-types";

import "./style.scss";

const propTypes = {
  checked: PropTypes.bool,
  categoryColor: PropTypes.string,
  imgUrl: PropTypes.string,
};

const defaultProps = {
  checked: false,
};

function CategoryCheckbox(props) {
  const { checked, imgUrl, name, id, categoryColor, onSelectCategory,ind } = props
  // console.log(categoryColor)
  const [_checked, setChecked] = useState(checked);
  return (
    <div className="category__item d-flex">
      <label
        className={`category__label fw-semibold m-1 d-flex rounded align-items-center justify-content-start gap-1 ${_checked ? 'active' : ''}`}
        htmlFor={name.toLowerCase()}
        style={{
          backgroundColor: checked && categoryColor ? categoryColor : "",
        }}
      >
        <input
          className="filter__btn filter__btn--category"
          type="checkbox"
          name={ind}
          checked={checked}
          // id={id}
          id={name.toLowerCase()}
          value={id}
          onClick={(e) =>onSelectCategory(e)}

        />
        {checked ? (
          ""
        ) : (
          // <img className="category__icon" alt={name} src={imgUrl} />
          // <i className={imgUrl} style={{ fontFamily: "fontAwesome", color: categoryColor, fontStyle: "normal", marginLeft: "1.5px" }}></i>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 640 512">
          <path
            d={imgUrl}
            fill={categoryColor}
          ></path> </svg>

        )}
        <div className="category__text lh-1" style={{color:checked && "white"}}>{name}</div>
      </label>
    </div>
  );
}

CategoryCheckbox.defaultProps = defaultProps;
CategoryCheckbox.propTypes = propTypes;

export default CategoryCheckbox;
