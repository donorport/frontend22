// core
import React, { useState } from 'react';

// third party
import { Col, Container, Row, Button } from 'react-bootstrap';


// app specific
// import Header from '../Component/organisms/header';
import Footer from '../Component/organisms/footer';
import ProjectDetailMain from '../Component/organisms/project-detail-main';
// import SimilarItems from '../Component/organisms/similar-items';
import History from '../Component/organisms/history';
import SuggestionWrapper from '../Component/molecules/suggestion-wrapper';
import DonateModal from '../Component/molecules/donate-modal';
// import SuggestedList from '../Component/organisms/suggested-list';
import ProjectCrowdfundingSuggestionList from '../Component/organisms/project-crowdfunding-suggestion-list';
// import GrabDropdown from '../Component/organisms/grab-dropdown';
import HeaderController from '../../../Controller/frontEnd/HeaderController';

// style
import './style.scss';

const ProjectDetail = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');

  return (
    <>
      <HeaderController/>
      <SuggestionWrapper>
        <div className="d-flex container-fluid">
          <ProjectCrowdfundingSuggestionList
            projectList={props.projectList}
            projectId={props.projectDetails?._id}
          />
          <div className="ms-auto d-flex align-items-center">
            {!CampaignAdminAuthToken && (
              <Button size="md" className="fw-bold" onClick={() => setModalShow(true)}>
                Donate
              </Button>
            )}
            <DonateModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              type="project"
              projectDetails={props.projectDetails}
              selectedValue={props.selectedValue}
              setSelectedValue={props.setSelectedValue}
              stateData={props.stateData}
              changevalue={props.changevalue}
              cardNumberWithSpace={props.cardNumberWithSpace}
              donate={props.donate}
              dCardIcon={props.dCardIcon}
              loading={props.loading}
            />
            {/* <GrabDropdown /> */}
          </div>
        </div>
      </SuggestionWrapper>

      {/*     <div className="ms-auto d-sm-flex d-none mt-2 flex-column align-items-center px-3">
        <Button size="lg" className="fw-bold mb-1 w-100" onClick={() => setModalShow(true)}>
          Donatehhhh
        </Button>
        <DonateModal show={modalShow} onHide={() => setModalShow(false)} /> 

      </div>*/}
      <Container fluid className="py-3 py-sm-5">
        <Row>
          <Col md="7" className="d-flex gap-2 mb-4">
            <ProjectDetailMain
              progress={70}
              projectDetails={props.projectDetails}
              addToCart={props.addToCart}
              checkItemInCart={props.checkItemInCart}
              followToProject={props.followToProject}
              isFollow={props.isFollow}
            />
          </Col>
          <Col md="5">
            <History
              tagTitle="Activity"
              title="User Log"
              list={props.purchasedItemList}
              donationList={props.donationList}
            />
          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );
};

export default ProjectDetail;
