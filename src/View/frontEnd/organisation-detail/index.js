// core
import React from "react";

// third party
// import { Col, Container, Row } from "react-bootstrap";
import { Col, Container, Row, Button } from "react-bootstrap";

// app specific

import Header from "../Component/organisms/header";
import Footer from "../Component/organisms/footer";
import OrganisationDetailMain from "../Component/organisms/organisation-detail-main";
import History from "../Component/organisms/history";
import SuggestionWrapper from "../Component/molecules/suggestion-wrapper";
import SuggestedList from "../Component/organisms/suggested-list";
import OrganisationTeamWidget from "../Component/organisms/org-team-widget";
import OrganisationProjectsWidget from "../Component/organisms/org-projects-widget";
import GrabDropdown from "../Component/organisms/grab-dropdown";
import HeaderController from "../../../Controller/frontEnd/HeaderController";
// style
import "./style.scss";

// class OrganisationDetail extends React.Component {
//   render() {
//     return (
//       <>
//         <Header />
//         <SuggestionWrapper>
//           <SuggestedList />
//         </SuggestionWrapper>
//         <Container fluid className="py-5">
//           <Row>
//             <Col md="7" className="mb-4">
//               <OrganisationDetailMain progress={70} />
//             </Col>
//             <Col md="5">
//               <div className="mb-4">
//               <OrganisationTeamWidget />
//               </div>
//               <History />
//             </Col>
//           </Row>
//         </Container>
//         <Container fluid>
//           <Row className="py-5">
//             <Col md="6" className="mb-4 mb-0">
//               <OrganisationProjectsWidget />
//             </Col>
//             <Col md="6"></Col>
//           </Row>
//         </Container>

//         <Footer />
//       </>
//     );
//   }
// }

const OrganisationDetail = (props) => {
  let organizationDetails = props.organizationDetails
  let projectList = props.projectList

  // console.log(organizationDetails) 
  // console.log(Object.keys(organizationDetails).length)
  return (
    <>
      <HeaderController />
      <SuggestionWrapper>
        <div className="d-flex align-items-center">
          <SuggestedList />
          <div className="ms-auto d-flex align-items-center">
            <Button size="lg" className="fw-bold">
              Donate
            </Button>
            <GrabDropdown />
          </div>
        </div>
      </SuggestionWrapper>
      <Container fluid className="py-5">
        <Row>
          <Col md="7" className="mb-4">
            <OrganisationDetailMain progress={70} organizationDetails={organizationDetails} />
          </Col>
          <Col md="5">
            <div className="mb-4">
              <OrganisationTeamWidget />
            </div>
            <History />
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row className="py-5">
          <Col md="6" className="mb-4 mb-0">
            <OrganisationProjectsWidget projectList={projectList} />
          </Col>
          <Col md="6"></Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
}

export default OrganisationDetail;
