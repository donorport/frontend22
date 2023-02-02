// core
import React, { useState, useEffect } from 'react';

// third party
// import { Col, Container, Row } from "react-bootstrap";
import { Col, Container, Row, Button } from 'react-bootstrap';

// app specific

import Header from '../Component/organisms/header';
import Footer from '../Component/organisms/footer';
import OrganisationDetailMain from '../Component/organisms/organisation-detail-main';
import History from '../Component/organisms/history';
import SuggestionWrapper from '../Component/molecules/suggestion-wrapper';
import SuggestedList from '../Component/organisms/suggested-list';
import OrganisationTeamWidget from '../Component/organisms/org-team-widget';
import OrganisationProjectsWidget from '../Component/organisms/org-projects-widget';
import GrabDropdown from '../Component/organisms/grab-dropdown';
//import HeaderController from '../../../Controller/frontEnd/HeaderController';
import DonateModal from '../Component/molecules/donate-modal';
import HeaderController from '../../../Controller/frontEnd/HeaderController';
import { useSelector } from 'react-redux';

// style
import './style.scss';

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
  const user = useSelector((state) => state.user);
  let organizationDetails = props.organizationDetails;
  let projectList = props.projectList;
  const [modalShow, setModalShow] = useState(false);
  const [organizationListByCountry, setOrganizationListByCountry] = useState([]);

  useEffect(() => {
    setOrganizationListByCountry(
      props.organizationList.filter((v) => {
        return v.country_id === user.countryId;
      })
    );
  }, [props.organizationList]);

  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  const userAuthToken = localStorage.getItem('userAuthToken');
  const token = userAuthToken ? userAuthToken : CampaignAdminAuthToken;

  return (
    <>
      <HeaderController />
      <SuggestionWrapper>
        <div className="suggested__list d-flex align-items-center container-fluid p-0 mb-0">
          <SuggestedList
            organizationList={organizationListByCountry}
            organizationId={organizationDetails?._id}
            itemTag="organization"
          />
          <div className="d-flex align-items-center me-2">
            {!CampaignAdminAuthToken && (
              <Button
                size="lg"
                className="fw-bold"
                onClick={() => {
                  setModalShow(true);
                }}
              >
                Donate
              </Button>
            )}
            <DonateModal
              show={modalShow}
              type="organization"
              onHide={() => setModalShow(false)}
              organizationDetails={organizationDetails}
              stateData={props.stateData}
              changevalue={props.changevalue}
              cardNumberWithSpace={props.cardNumberWithSpace}
              donate={props.donate}
              selectedValue={props.selectedValue}
              setSelectedValue={props.setSelectedValue}
              dCardIcon={props.dCardIcon}
            />

            {/* <GrabDropdown /> */}
          </div>
        </div>
      </SuggestionWrapper>
      <Container fluid className="py-3 py-sm-5">
        <Row>
          <Col md="7" className="mb-4">
            <OrganisationDetailMain
              followToOrganization={props.followToOrganization}
              organizationDetails={organizationDetails}
              addToCart={props.addToCart}
              checkItemInCart={props.checkItemInCart}
              isFollow={props.isFollow}
            />
          </Col>
          <Col md="5">
            {/*}  <div className="mb-4">
              <OrganisationTeamWidget />
          </div>*/}
            <History list={props.purchasedItemList} donationList={props.donationList} />
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row className="py-5">
          <Col md="6" className="mb-4 mb-0" style={{ maxWidth: '545px' }}>
            <OrganisationProjectsWidget projectList={projectList} />
          </Col>
          <Col md="6"></Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
};

export default OrganisationDetail;
