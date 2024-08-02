//import { Container } from "react-bootstrap";

import './style.scss';

const SuggestionWrapper = ({children}) => (
  <div
    className="suggested__list-wrap d-flex align-items-center mb-0 border-bottom justify-content-center"
  >
    {children}
  </div>
);

export default SuggestionWrapper;
