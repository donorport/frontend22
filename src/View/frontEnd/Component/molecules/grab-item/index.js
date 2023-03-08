import { ProgressBar } from "react-bootstrap";

import ListItemImg from "../../atoms/list-item-img";
import profile from '../../../../../assets/images/avatar.png';

import "./style.scss";

function GrabItem() {
  return (
    <li className="org__item__item pt-12p pb-12p d-sm-flex align-items-center mb-1">
      <div className="d-flex align-items-center flex-grow-1">
        <a href="/" className="d-block position-relative">
          <ListItemImg imgSrc={profile} />
          <span className="badge grab__badge">1</span>
        </a>

        <div className="d-flex align-items-center flex-grow-1 fs-5 me-2 ml-12p">
          <div className="org__item__price">$14</div>
          <div className="org__item-slider flex-grow-1 mx-2">
            <ProgressBar variant="success" now={30} />
          </div>
          <div className="org__item__count mt-3p">30%</div>
        </div>
        <span className="org__item-subtotal text-success fw-bolder me-2">
          $50
        </span>
      </div>
    </li>
  );
}

export default GrabItem;
