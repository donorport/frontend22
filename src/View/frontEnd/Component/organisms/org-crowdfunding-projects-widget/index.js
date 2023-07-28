import React, { useState } from 'react';

import { Button } from 'react-bootstrap';
// import { WidgetTitle, TagTitle } from "../../Component";
import WidgetTitle from '../../atoms/widget-title';

import TagTitle from '../../atoms/tag-title';

import OrganisationCrowdfundingProjectItem from '../../molecules/org-crowdfunding-project-item';

import './style.scss';
// import { useState } from 'react';

function OrganisationCrowdfundingProjectsWidget({ list, organizationDetails }) {
  //console.log(projectList);
  const [loadMore, setLoadMore] = useState(false);
  return (
    <>
      <TagTitle>Organization</TagTitle>
      <WidgetTitle>Projects</WidgetTitle>

      <ul className="list-unstyled mb-0 mt-12p">
        {list.length > 0 ? (
          list
            .slice(0, loadMore ? list.length : 3)
            .map((project, i) => <OrganisationCrowdfundingProjectItem item={project} key={i} />)
        ) : (
          <p>{organizationDetails?.name} hasn't created any Projects.</p>
        )}
      </ul>
      {!loadMore && list.length > 3 && (
        <div className="more__log">
          <Button
            variant="info"
            className="fs-6 pt-12p pb-12p w-100"
            onClick={() => setLoadMore(true)}
          >
            Load More . . .
          </Button>
        </div>
      )}
    </>
  );
}

export default OrganisationCrowdfundingProjectsWidget;
