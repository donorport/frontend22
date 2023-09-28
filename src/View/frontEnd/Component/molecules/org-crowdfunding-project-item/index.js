//import { Button } from 'react-bootstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';
import helper from '../../../../../Common/Helper';
import profile from '../../../../../assets/images/avatar.png';
import './style.scss';

function OrganizationCrowdfundingProjectItem({item}) {
  const img =
    item.imageDetails.length > 0
      ? helper.ProjectFullImagePath + item.imageDetails[0].image
      : profile;

  // console.log(project)
  return (
    <li className="org__project__item pt-12p pb-12p d-flex align-items-center">
      <div className="d-flex align-items-center flex-grow-1">
        <div
          className="circle__progress"
          style={{
            background:
              'linear-gradient(0deg, #fff 50%, transparent 50%), linear-gradient(180deg, #45a3e4 50%, #fff 50%)'
          }}
        >
          <div
            className="circle__progress-img"
            style={{
              backgroundImage: 'url(' + img + ')'
            }}
          ></div>
        </div>
        <div className="org__project_item__main pl-12p flex-grow-1">
          <div className="org__project__item__name mb-3p  fw-bold fs-5">
            {item.name}
          </div>
          <div className="org__project__item__time fw-semibold mb-6p fs-7 text-light">
            {moment(item.created_at).fromNow()}
          </div>
        </div>
      </div>

      <div className="ms-auto">
        {/* <Button variant="danger">
          Go to Project
        </Button> */}
        <Link variant="danger" className="btn btn-danger" to={'/project/' + item.slug}>
          Go to Project
        </Link>
      </div>
    </li>
  );
}

export default OrganizationCrowdfundingProjectItem;
