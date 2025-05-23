//import { Button } from 'react-bootstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';
import helper from '../../../../../Common/Helper';
import { Button, ProgressBar } from 'react-bootstrap';
import profile from '../../../../../assets/images/avatar.png';
import './style.scss';


function OrganizationCrowdfundingWidgetItem({ item }) {
  const img =
    item.imageDetails.length > 0
      ? helper.ProjectFullImagePath + item.imageDetails[0].image
      : profile;

  // console.log(project)
  return (
    <li className="org__fundraiser__item pt-12p pb-12p d-flex justify-content-bewteen align-items-center">
      <div className="d-flex align-items-center flex-grow-1">
        <div
          className="circle__progress"
          // style={{
          //   background:
          //     'linear-gradient(0deg, #fff 50%, transparent 50%), linear-gradient(180deg, #45a3e4 50%, #fff 50%)'
          // }}
        >
          <div
            className="circle__progress-img"
            style={{
              backgroundImage: 'url(' + img + ')'
            }}
          ></div>
        </div>
        <div className="org__project_item__main pl-12p flex-grow-1">
          <h6 className="org__fundraiser__item__name mb-3p  ">{item.name}</h6>
          <div className="org__fundraiser__item__timefs-6 fw-semibold fs-7 text-light">
            {moment(item.created_at).fromNow()}
          </div>
        </div>
      </div>

      <div className="ms-auto">
        <Link to={'/crowdfunding/' + item.slug}>
          <Button size="sm" variant="primary" className="btn btn-primary">
          Go to fundraiser
          </Button>
        </Link>
      </div>
    </li>
  );
}

export default OrganizationCrowdfundingWidgetItem;
