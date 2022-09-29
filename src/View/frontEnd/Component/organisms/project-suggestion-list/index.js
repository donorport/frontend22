import ProjectSuggestionItem from "../../molecules/project-suggestion-item";

import "./style.scss";

function ProjectSuggestionList(props) {
  let projectList = props.projectList
  let projectId = props.projectId

  // console.log("projectId",projectId)

  // this one need to be rendered based on device width
  // can try this solution https://stackoverflow.com/questions/39235506/render-component-in-different-order-depending-on-screen-size-react
  return (
    <ul className="suggested__list d-flex align-items-center container-fluid p-0 mb-0" style={{listStyle: "none"}}>
      {
        projectList.length > 0 &&
        projectList.map((project, i) => {
          return (
            project._id !== projectId &&
            <ProjectSuggestionItem className="me-4" project={project} />
          )
        })
      }
      {/* <ProjectSuggestionItem className="me-4" />
      <ProjectSuggestionItem className="me-4" />
      <ProjectSuggestionItem className="me-4" />
      <ProjectSuggestionItem className="me-4" /> */}
    </ul>

  );
}

export default ProjectSuggestionList;
