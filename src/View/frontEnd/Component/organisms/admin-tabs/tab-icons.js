import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular, solid, light } from "@fortawesome/fontawesome-svg-core/import.macro";

const DashboardIcon = ({ active }) => {
  const icon = active ? (
    <FontAwesomeIcon icon={solid("desktop")} />
  ) : (
    <FontAwesomeIcon icon={regular("desktop")} />
  );
  return icon;
};

const PostsIcon = ({ active }) => {
  const icon = active ? (
    <FontAwesomeIcon icon={solid("pencil")} />
  ) : (
    <FontAwesomeIcon icon={regular("pencil")} />
  );
  return icon;
};

const ActivityIcon = ({ active }) => {
  const icon = active ? (
    <FontAwesomeIcon icon={solid("wave-pulse")} />
  ) : (
    <FontAwesomeIcon icon={regular("wave-pulse")} />
  );
  return icon;
};

const TaxIcon = ({ active }) => {
  const icon = active ? (
    <FontAwesomeIcon icon={solid("calculator")} />
  ) : (
    <FontAwesomeIcon icon={regular("calculator")} />
  );
  return icon;
};

const ProjectIcon = ({ active }) => {
  const icon = active ? (
    <FontAwesomeIcon icon={solid("bolt")} />
  ) : (
    <FontAwesomeIcon icon={regular("bolt")} />
  );
  return icon;
};

const SettingsIcon = ({ active }) => {
  const icon = active ? (
    <FontAwesomeIcon icon={solid("gear")} />
  ) : (
    <FontAwesomeIcon icon={regular("gear")} />
  );
  return icon;
};

//possible icons: people-roof, people-line, people-group, users
const CrowdfundingIcon = ({ active }) => {
  const icon = active ? (
    <FontAwesomeIcon icon={solid("circle-dollar")} />
  ) : (
    <FontAwesomeIcon icon={light("circle-dollar")} />
  );
  return icon;
};

export {DashboardIcon, PostsIcon, ActivityIcon, ProjectIcon, TaxIcon, SettingsIcon, CrowdfundingIcon};
