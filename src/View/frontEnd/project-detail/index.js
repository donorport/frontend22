// core
import React, { useState } from 'react';

// third party
import { Col, Container, Row, Button } from 'react-bootstrap';
import ShareWidget from '../Component/organisms/share-widget';

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
      <HeaderController />
      {/* <SuggestionWrapper>
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
          </div>
        </div>
      </SuggestionWrapper> */}

      {/*     <div className="ms-auto d-sm-flex d-none mt-2 flex-column align-items-center px-3">
        <Button size="lg" className="fw-bold mb-1 w-100" onClick={() => setModalShow(true)}>
          Donatehhhh
        </Button>
        <DonateModal show={modalShow} onHide={() => setModalShow(false)} /> 

      </div>*/}
      <Container fluid className="pt-0 pt-sm-5">
        <Row className="ps-0 ps-sm-3 position-relative pt-5 gap-md-0 gap-3">
          <div className="detailshero"></div>
          <Col md="7" className="mb-4">
            <ProjectDetailMain
              projectDetails={props.projectDetails}
              addToCart={props.addToCart}
              checkItemInCart={props.checkItemInCart}
              followToProject={props.followToProject}
              isFollow={props.isFollow}
              selectedValue={props.selectedValue} // Ensure this is passed
              setSelectedValue={props.setSelectedValue} // Ensure this is passed
              stateData={props.stateData}
              cardNumberWithSpace={props.cardNumberWithSpace}
              donate={props.donate}
              dCardIcon={props.dCardIcon}
              loading={props.loading}
              changevalue={props.changevalue} // Pass changevalue to ProjectDetailMain
            />
          </Col>
          <Col md="5">
          <div className="d-flex container-fluid">
          {/* <ProjectCrowdfundingSuggestionList
            projectList={props.projectList}
            projectId={props.projectDetails?._id}
          />  */}
        <div className="ms-auto d-flex align-items-center gap-2 mb-5">
          <ShareWidget
            page="project"
            text={`Help ${props.projectDetails?.campaignDetails?.name} fund their project: ${props.projectDetails?.name} on Donorport! 📈👀`}
            pageTitle={props.projectDetails?.name}
            currUrl={`https://api.donorport.com/project/${props.projectDetails?.slug}`}
          />
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
          </div>
        </div>
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
