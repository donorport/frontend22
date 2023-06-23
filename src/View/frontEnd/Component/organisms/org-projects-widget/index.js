import React, { useState } from 'react';

import { Button } from 'react-bootstrap';
// import { WidgetTitle, TagTitle } from "../../Component";
import WidgetTitle from '../../atoms/widget-title';

import TagTitle from '../../atoms/tag-title';

import OrganisationProjectItem from '../../molecules/org-project-item';

import './style.scss';
// import { useState } from 'react';

function OrganisationProjectsWidget(props) {
  let projectList = props.projectList;
  const organizationDetails = props.organizationDetails;
  //console.log(projectList);
  const [loadMore, setLoadMore] = useState(false);
  return (
    <>
      <TagTitle>Organization</TagTitle>
      <WidgetTitle>Projects</WidgetTitle>

      <ul className="list-unstyled mb-0 mt-12p">
        {projectList.length > 0 ? (
          projectList.slice(0, loadMore ? projectList.length : 3).map((project, i) => {
            return <OrganisationProjectItem project={project} key={i} />;
          })
        ) : (
          <p>{organizationDetails?.name} hasn't created any Projects.</p>
        )}
        {/* <OrganisationProjectItem /> */}
      </ul>
      {!loadMore && projectList.length > 3 && (
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

export default OrganisationProjectsWidget;
