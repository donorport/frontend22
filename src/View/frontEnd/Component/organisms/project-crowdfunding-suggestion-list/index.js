import React from 'react';
import ProjectCrowdfundingSuggestionItem from '../../molecules/project-crowdfunding-suggestion-item';
import './style.scss';

function ProjectCrowdfundingSuggestionList({ projectList, projectId, type }) {
  // Log the received props for debugging
  console.log('Received projectList:', projectList);
  console.log('Current projectId:', projectId);
  console.log('Type:', type);

  // Check if 'projectList' is defined and has items
  if (!projectList || projectList.length === 0) {
    return <p>No suggestions available.</p>; // Provide fallback content
  }

  return (
    <ul
      className="suggested__list d-flex align-items-center gap-3 p-0 mb-0"
      style={{ listStyle: 'none' }}
    >
      {projectList.map((each, key) => {
        // Log each item for debugging
        console.log('Processing item:', each);

        // Check if 'each' is defined and has an '_id' property
        if (each && each._id !== projectId) {
          return (
            <ProjectCrowdfundingSuggestionItem
              key={key}
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
