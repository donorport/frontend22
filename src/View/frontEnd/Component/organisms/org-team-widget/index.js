import React from "react";

// import { WidgetTitle, TagTitle } from "../../Component";
import WidgetTitle from "../../atoms/widget-title"

import TagTitle from "../../atoms/tag-title"

import "./style.scss";

function OrganizationTeamWidget(props) {
  return (
    <>
      {/* <TagTitle>Organization</TagTitle>
      <WidgetTitle>Team</WidgetTitle>
      
      <ul className="list-unstyled mb-0 mt-12p">
        <OrganizationTeamItem />
        <OrganizationTeamItem />
      </ul> */}

      <TagTitle>{props.tagTitle ? props.tagTitle : "Organization"}</TagTitle>
      <WidgetTitle href="/log">
        {props.title ? props.title : "Team"}
      </WidgetTitle>

      <ul className="list-unstyled mb-0 mt-12p">
        {/* <OrganizationTeamItem showEmail={props.showEmail} showContact={props.showContact}/>
        <OrganizationTeamItem showEmail={props.showEmail} showContact={props.showContact} /> */}
      </ul>
    </>
  );
}

export default OrganizationTeamWidget;
