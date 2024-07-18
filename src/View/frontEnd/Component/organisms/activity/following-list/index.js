import React from 'react';
import FollowingItem from '../../../molecules/following-item';
import list from '../../../../../../assets/images/interface.svg';

function ActivityList(props) {
  const followedOrganizationList = props.followedOrganizationList;
  const followToOrganization = props.followToOrganization;
  const removeFollowedOrganization = props.removeFollowedOrganization;

  return followedOrganizationList.length > 0 ? (
    <ul className="cd__cart__list list-unstyled mb-0 p-0">
      {followedOrganizationList.length > 0 &&
        followedOrganizationList.map((val, k) => {
          return (
            <FollowingItem
              data={val}
              followToOrganization={followToOrganization}
              removeFollowedOrganization={removeFollowedOrganization}
            />
          );
        })}
    </ul>
  ) : (
    <div className="empty__block pt-5">
      <div className="empty__cart mb-2">
        <img src={list} alt="" width="90%" />
      </div>
      <div className="no__items-found fw-bold">You're not following anything.</div>
    </div>
  );
}

export default ActivityList;
