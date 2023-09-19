import React from 'react';
import ProjectCrowdfundingSuggestionItem from '../../molecules/project-crowdfunding-suggestion-item';
import './style.scss';

function ProjectCrowdfundingSuggestionList({ list, id, type }) {
  // Check if 'list' is defined before accessing its length
  if (!list || list.length === 0) {
    return null; // or you can return some default content
  }

  return (
    <ul
      className="suggested__list d-flex align-items-center p-0 mb-0"
      style={{ listStyle: 'none' }}
    >
      {list.map((each, key) => {
        // Check if 'each' is defined and has an '_id' property
        if (each && each._id !== id) {
          return (
            <ProjectCrowdfundingSuggestionItem
              key={key}
              className="me-4"
              item={each}
              type={type}
            />
          );
        }
        return null; // Return null for items that don't meet the condition
      })}
    </ul>
  );
}

export default ProjectCrowdfundingSuggestionList;
