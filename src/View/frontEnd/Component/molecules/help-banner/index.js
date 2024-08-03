import { Button, InputGroup, FormControl } from "react-bootstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular } from "@fortawesome/fontawesome-svg-core/import.macro";

import "./style.scss";

const HelpBanner = ({shortBanner=false}) => {
  return (
    <div style={{padding: shortBanner ? '115px 0 45px': '75px 0'}} className="help__banner d-flex flex-column align-items-center justify-content-center px-3 px-sm-0">
      <InputGroup className="d-flex align-items-stretch help__search-wrap">
        <InputGroup.Text>
          <FontAwesomeIcon
            icon={regular("magnifying-glass")}
            className="fs-4"
          />
        </InputGroup.Text>
        <FormControl placeholder="Search for answers" size="xl" />
        <Button
          variant="link"
          className="text-white border-0 text-decoration-none pr-20p fw-normal fs-5"
          size="xl"
        >
          Search
        </Button>
      </InputGroup>
    </div>
  );
};

export default HelpBanner;
