// core
import React, { useState } from 'react';

// third party
import { Col, Container, Row, Button } from 'react-bootstrap';
import ShareWidget from '../Component/organisms/share-widget';
// app specific
import Footer from '../Component/organisms/footer';
import CrowdfundingDetailMain from '../Component/organisms/crowdfunding-detail-main';
import History from '../Component/organisms/history';
import SuggestionWrapper from '../Component/molecules/suggestion-wrapper';
import DonateModal from '../Component/molecules/donate-modal';
import ProjectCrowdfundingSuggestionList from '../Component/organisms/project-crowdfunding-suggestion-list';
import HeaderController from '../../../Controller/frontEnd/HeaderController';

// style
import './style.scss';

const CrowdfundingDetail = (props) => {
  const [modalShow, setModalShow] = useState(false);
  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');

  console.log('CrowdfundingDetail:', { props });

  return (
    <>
      <HeaderController />
      {/* <SuggestionWrapper>
        <div className="d-flex container-fluid">
          <ProjectCrowdfundingSuggestionList
            list={props.crowdfundingList}
            id={props.crowdfundingDetails?._id}
            type="crowdfunding"
          />

         <div className="ms-auto d-flex align-items-center">
            {!CampaignAdminAuthToken && (
              <Button size="lg" onClick={() => setModalShow(true)}>
                Donate
              </Button>
            )}

            <DonateModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              type="crowdfunding"
              name={props.crowdfundingDetails.name}
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
      <Container fluid className="pt-0 pt-sm-5">
        <Row className="ps-0 ps-sm-3 position-relative pt-5 gap-md-0 gap-3">
          <div className="d-none d-sm-flex detailshero"></div>
          <Col md="7" className="mb-4">
            <CrowdfundingDetailMain
              progress={70}
              crowdfundingDetails={props.crowdfundingDetails}
              addToCart={props.addToCart}
              checkItemInCart={props.checkItemInCart}
              followToCrowdfunding={props.followToCrowdfunding}
              isFollow={props.isFollow}
              stateData={props.stateData}
              selectedValue={props.selectedValue}
              setSelectedValue={props.setSelectedValue}
              changevalue={props.changevalue}
              cardNumberWithSpace={props.cardNumberWithSpace}
              donate={props.donate}
              dCardIcon={props.dCardIcon}
              loading={props.loading}
              donationList={props.donationList}
            />
          </Col>
          <Col md="5">
            <div className="ms-auto d-none d-sm-flex align-items-center gap-2 mb-5">
              <div className="ms-auto">
                {' '}
                <ShareWidget
                  page="project"
                  text={`Help ${props.crowdfundingDetails?.campaignDetails?.name} fund their project: ${props.crowdfundingDetails?.name} on Donorport! 📈👀`}
                  pageTitle={props.crowdfundingDetails?.name}
                  currUrl={`https://api.donorport.com/fundraiser/${props.crowdfundingDetails?.slug}`}
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

export default CrowdfundingDetail;
