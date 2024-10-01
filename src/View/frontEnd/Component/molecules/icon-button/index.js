import { Button } from "react-bootstrap";
import PropTypes from "prop-types";

import { ButtonContent } from "./style";
import "./style.scss";

const propTypes = {
  label: PropTypes.string,
  size: PropTypes.string,
  bgColor: PropTypes.string,
};

const defaultProps = {
  label: "",
  // border: 1,
  bgColor: "",
};

const IconButton = ({
  className,
  icon,
  label,
  size,
  bgColor,
  children,
  ...otherProps
}) => {
  const sharedProps = {
    className,
    ...otherProps,
  };
  return (
    <Button
      {...sharedProps}
      className={`${
        !children ? (size ? "btn__icon-" + size : "btn__icon") : ""
      } ${className}`}
      style={{ backgroundColor: bgColor, borderColor: bgColor }}
    >
      <ButtonContent
        size={size}
        className="d-flex align-items-center justify-content-center gap-1 btn__content"
      >
        <span
          className={`icon__wrap d-flex align-items-center ${
            children ? "" : ""
          }`}
        >
          {icon}
        </span>
        {children}
      </ButtonContent>
    </Button>
  );
};

IconButton.propTypes = propTypes;
IconButton.defaultProps = defaultProps;

export default IconButton;
