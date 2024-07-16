import React from "react";
import { Button } from "react-bootstrap";

import "./style.scss";

function ActivityItem(props) {
  return (
    <li
      className={`user__settings__item d-flex align-items-center ${props.itemClass}`}
    >
      <Button
        href={props.href}
        variant="link"
        onClick={props.onClick}
        className="fs-6 fw-semibold btn__link-light d-flex align-items-center px-0 py-3 w-100 text-decoration-none"
      >
        <div className="user__settings__icon">{props.icon}</div>
        <span>{props.label}</span>
        {props.nextIcon ? (
          <span className="ms-auto me-3">{props.nextIcon}</span>
        ) : (
          ""
        )}
      </Button>
    </li>
  );
}

export default ActivityItem;
