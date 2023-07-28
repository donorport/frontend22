import ProjectCrowdfundingSuggestionItem from '../../molecules/project-crowdfunding-suggestion-item';

import './style.scss';

function ProjectCrowdfundingSuggestionList({ list, id, type }) {
  // console.log("projectId",projectId)

  // this one need to be rendered based on device width
  // can try this solution https://stackoverflow.com/questions/39235506/render-component-in-different-order-depending-on-screen-size-react
  return (
    <ul
      className="suggested__list d-flex align-items-center p-0 mb-0"
      style={{ listStyle: 'none' }}
    >
      {list.length > 0 &&
        list.map((each, key) => {
          return (
            each._id !== id && (
              <ProjectCrowdfundingSuggestionItem
                key={key}
                className="me-4"
                item={each}
                type={type}
              />
            )
          );
        })}
    </ul>
  );
}

export default ProjectCrowdfundingSuggestionList;
