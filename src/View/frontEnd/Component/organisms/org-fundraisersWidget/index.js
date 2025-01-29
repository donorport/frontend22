import React, { useState } from 'react';

import { Button } from 'react-bootstrap';
import WidgetTitle from '../../atoms/widget-title';

import TagTitle from '../../atoms/tag-title';

import './style.scss';
import OrganizationCrowdfundingWidgetItem from '../../molecules/org-crowdfunding-fundraisers-item';

function OrganizationCrowdfundingFundraisersWidget({ crowedFundingList, organizationDetails }) {
  const [loadMore, setLoadMore] = useState(false);
  return (
    <>
      <TagTitle>Organization</TagTitle>
      <WidgetTitle>Fundraisers</WidgetTitle>

      <div className="mb-2 mb-sm-0">
        <ul className="fundraiser__grid">
          {crowedFundingList.length > 0 ? (
            crowedFundingList
              .slice(0, loadMore ? crowedFundingList.length : 3)
              .map((project, i) => <OrganizationCrowdfundingWidgetItem item={project} key={i} />)
          ) : (
            <p className="fs-6">{organizationDetails?.name} hasn't any Fundraisers yet.</p>
          )}
        </ul>
      </div>

      {/* <ul className="list-unstyled mb-0 mt-12p">
        {projectList.length > 0 ? (
          projectList
            .slice(0, loadMore ? projectList.length : 3)
            .map((project, i) => <OrganizationCrowdfundingProjectItem item={project} key={i} />)
        ) : (
          <p className="fs-6">.</p>
        )}
      </ul> */}
      {!loadMore && crowedFundingList.length > 3 && (
        <div className="more__log">
          <Button size="md" variant="info" className="fs-6 w-100" onClick={() => setLoadMore(true)}>
            Load More . . .
          </Button>
        </div>
      )}
    </>
  );
}

export default OrganizationCrowdfundingFundraisersWidget;
