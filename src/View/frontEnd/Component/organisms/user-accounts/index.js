import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular } from "@fortawesome/fontawesome-svg-core/import.macro";

import ListItemImg from "../../atoms/list-item-img";
import { Outlet, Link, useLocation, useOutletContext } from "react-router-dom";
import share from '../../../../../assets/images/share.svg';

import "./style.scss";

const UserAccounts = () => {
  const [data, setData] = useOutletContext();

  return (
    <>
      <div className="mb-5">
        <h4 className="fw-bolder">Login Information</h4>
        <div className="text-subtext mb-3">
          Your account is logged in using:
        </div>

        <div className="linked__list d-flex flex-column">
       {/*   <div className="linked__item d-flex align-items-center p-1 border">
            <div className="accounts__icon">
              <ListItemImg
                size={75}
                className="rounded-circle"
                imgSrc=""
              />
            </div>
            <div className="accounts__email fw-bolder flex__1 mx-2 text-break">
              {data.email}
            </div>
            <Button variant="link" className="text-danger">
              unlink
            </Button>
  </div> */}

          <div className="linked__item d-flex align-items-center p-1">
            <div className="accounts__icon">
              <ListItemImg
                size={75}
                className="rounded-circle"
                imgSrc={share}
              />
            </div>
            <div className="accounts__email fw-bold flex__1 mx-2 text-break">
              {data.email}
            </div>
            {/*<Button variant="link" className="text-danger">
              unlink
            </Button>*/}
          </div>

          <div className="fs-7">
            <FontAwesomeIcon
              icon={regular("info-circle")}
              className="mr-3p text-info"
            />
            <span className="text-light">
              To change your password <Link to='/change-password'>click here</Link> 
            </span>
          </div>
        </div>
      </div>

     {/* <div className="mb-5">
        <h4 className="fw-bolder">Crypto Wallets</h4>
        <div className="text-subtext mb-3">
          You have linked the following wallets:
        </div>

        <div className="linked__list d-flex flex-column">
          <div className="linked__item d-flex align-items-center p-1 border">
            <div className="accounts__icon">
              <ListItemImg
                size={75}
                className="rounded-circle"
                imgSrc=""
              />
            </div>
            <div className="accounts__email fw-bolder flex__1 mx-2 text-break">
              COMING SOON
            </div>
            <Button variant="link" className="text-danger">
              unlink
            </Button>
          </div>
        </div>
      </div> */}
    </>
  );
};

export default UserAccounts;
