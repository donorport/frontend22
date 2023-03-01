import Avatar from '../../atoms/avatar';
import { Button } from 'react-bootstrap';
import './style.scss';
import helper from '../../../../../Common/Helper';
import moment from 'moment';
import AvatarImg from '../../../../../assets/images/avatar_default.png';

function OrganisationTeamItem(props) {
  const member = props.member;

  let image =
    member?.type === 'USER'
      ? helper.DonorImageResizePath + member?.userDetails?.image
      : helper.CampaignAdminLogoPath + member?.orgDetails?.logo;
  let name = member?.type === 'USER' ? member.userDetails?.name : member?.orgDetails?.name;
  let email = member?.type === 'USER' ? member.userDetails?.email : member?.orgDetails?.email;

  let avatar = helper.CampaignAdminLogoPath + member?.campaignadminDetails?.logo;

  return (
    // <li className="org__team__item pt-12p pb-12p d-sm-flex align-items-center">
    //   <Avatar size={46} avatarUrl={AvatarImg} border={0} shadow={false} />
    //   <div className="org__team__item__main pl-12p flex-grow-1">
    //     <div className="org__team__item__title pr-12p">
    //       <div className="org__team__item__name mb-3p text-dark fw-bold">David Abbott</div>
    //       <div className="org__team__item__location fw-light mb-6p">abc@company.ca</div>
    //     </div>
    //     <div className="org__team__item__price fs-8 text-light">CFO / CEO</div>
    //   </div>
    // </li>

    <li className="d-flex org__team__item pt-12p pb-12p d-sm-flex align-items-start">
      <Avatar
        size={46}
        avatarUrl={image ? image : AvatarImg}
        border={0}
        shadow={false}
        className={member?.type === 'USER' ? 'donor_avatar_bg' : 'charity_avatar_bg'}
      />
      <div className="org__team__item__main pl-20p flex-grow-1">
        <div className="org__team__item__title pr-12p">
          <div className="org__team__item__name mb-3p text-dark fw-bold">{name}</div>
          {props.showEmail ? (
            <div className="org__team__item__location fw-light mb-6p">{email}</div>
          ) : (
            ''
          )}
        </div>

        {member.campaignadminDetails ? (
          <div className="fw-semibold org__team__item__price fs-6 text-light mb-1">
            {member?.campaignadminDetails?.name}
          </div>
        ) : (
          ''
        )}

        <div className="org__team__item__price fs-7 text-lighter">
          {moment(member?.created_at).format('MMMM DD, YYYY')}
        </div>
      </div>
      {member.campaignadminDetails ? (
        <Avatar
          style={{ borderRadius: 'unset' }}
          className="charity_avatar_bg"
          size={46}
          avatarUrl={avatar}
          border={0}
          shadow={false}
        />
      ) : (
        ''
      )}
      {props.showContact ? (
        <Button variant="outline-info" size="sm" className="ms-auto fw-bold">
          Contact
        </Button>
      ) : (
        ''
      )}
      {!member.status && (
        <span className="d-flex align-items-center ms-auto fw-bold me-2" style={{ height: '46px' }}>
          PENDING
        </span>
      )}
      &nbsp;
      {!props.isCurrent && (
        <Button
          variant="danger"
          size="lg"
          className="ms-auto fw-bold"
          onClick={() => props.removeTeamMember(member._id)}
        >
          Remove
        </Button>
      )}
    </li>
  );
}

export default OrganisationTeamItem;
