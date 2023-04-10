import React from "react";
import PropTypes from "prop-types";
import { IconWrapper } from "./style";

const propTypes = {
  bgColor: PropTypes.string,
  color: PropTypes.string,
  icon: PropTypes.element,
  size: PropTypes.number,
};

const defaultProps = {
  bgColor: "#56577b",
  color: "#fff",
};

const RoundedIcon = (props) => {
  return <IconWrapper {...props}>{props.icon}</IconWrapper>;
};

RoundedIcon.defaultProps = defaultProps;
RoundedIcon.propTypes = propTypes;

export default RoundedIcon;
