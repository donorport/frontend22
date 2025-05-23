import Avatar from '../../atoms/avatar';
import { Button } from 'react-bootstrap';
import './style.scss';
import helper from '../../../../../Common/Helper';
import moment from 'moment';
import AvatarImg from '../../../../../assets/images/avatar.png';
// import ListItemImg from '../../atoms/list-item-img';

function OrganizationTeamItem(props) {
  const member = props.member;

  let image = member?.type === 'USER'
  ? (member?.userDetails?.image?.startsWith('http://') || member?.userDetails?.image?.startsWith('https://')
      ? member?.userDetails?.image
      : helper.DonorImageResizePath + member?.userDetails?.image)
  : helper.CampaignAdminLogoPath + member?.orgDetails?.logo;
  let name = member?.type === 'USER' ? member.userDetails?.name : member?.orgDetails?.name;
  let email = member?.type === 'USER' ? member.userDetails?.email : member?.orgDetails?.email;

  let avatar = helper.CampaignAdminLogoPath + member?.campaignadminDetails?.logo;

  return (
    <li className="d-flex flex-column flex-sm-row gap-2 align-items-start">
      <div className="d-flex flex-grow-1">
        {' '}
        <Avatar
          size={46}
          avatarUrl={image ? image : AvatarImg}
          border={0}
          shadow={false}
          className={member?.type === 'USER' ? 'donor_avatar_bg' : 'charity_avatar_bg'}
        />
        <div className="org__team__item__main pl-20p flex-grow-1">
          <div className="org__team__item__title pr-12p">
            <h6 className="org__team__item__name mb-3p  ">{name}</h6>
            {props.showEmail ? (
              <div className="org__team__item__location text-light fw-light mb-6p fs-6">
                {email}
              </div>
            ) : (
              ''
            )}
          </div>

          {/* {member.campaignadminDetails ? (
          <div className="fw-semibold org__team__item__price fs-6 text-light mb-1 fs-6">
            {member?.campaignadminDetails?.name}
          </div>
        ) : (
          ''
        )} */}

          <div className="date fs-7 text-light">
            {moment(member?.created_at).format('MMMM DD, YYYY')}
          </div>
        </div>
      </div>

      <div className="d-flex ">
        {' '}
        {props?.isCurrent && (
          <div>
            <span className="badge fw-bold fs-6">You</span>
          </div>
        )}
        {props.showContact ? (
          <Button variant="outline-info" size="sm" className="ms-auto fw-bold">
            Contact
          </Button>
        ) : (
          ''
        )}
        {!member.status && (
          <span className="badge btn-success fs-6 d-flex align-items-center ms-auto fw-bold me-2">
            Sent
          </span>
        )}
        &nbsp;
        {!props.isCurrent && (
          <Button
            variant="danger"
            size="sm"
            className="ms-auto"
            onClick={() => props.removeTeamMember(member._id)}
          >
            Remove
          </Button>
        )}
        {member.campaignadminDetails ? (
          <img
            alt="campaignLogo"
            style={{
              objectFit: 'contain',
              background: '#f8fafd',
              borderRadius: '50% !important',
              border: 'unset',
              height: '36px',
              width: '36px',
              marginLeft: '40px'
            }}
            src={avatar}
          />
        ) : (
          ''
        )}
        {/* {member.campaignadminDetails ? (
        <div className="fw-semibold org__team__item__price fs-6 mb-1">
          {member?.campaignadminDetails?.name}
        </div>
      ) : (
        ''
      )} */}
      </div>
    </li>
  );
}

export default OrganizationTeamItem;
