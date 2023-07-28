//import { Container } from "react-bootstrap";

import './style.scss';

const SuggestionWrapper = ({children}) => (
  <div
    className="suggested__list-wrap d-flex align-items-center p-0 mb-0"
    style={{ height: '75px' }}
  >
    {children}
  </div>
);

export default SuggestionWrapper;
