import React, { useState, useEffect } from 'react';

import { Col, Container, Row, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import ShareWidget from '../Component/organisms/share-widget';
import Footer from '../Component/organisms/footer';
import OrganizationDetailMain from '../Component/organisms/organization-detail-main';
import History from '../Component/organisms/history';
import SuggestionWrapper from '../Component/molecules/suggestion-wrapper';
import SuggestedList from '../Component/organisms/suggested-list';
import OrganizationCrowdfundingProjectsWidget from '../Component/organisms/org-crowdfunding-projects-widget';
import DonateModal from '../Component/molecules/donate-modal';
import HeaderController from '../../../Controller/frontEnd/HeaderController';

import './style.scss';
import OrganizationCrowdfundingFundraisersWidget from '../Component/organisms/org-fundraisersWidget';

const OrganizationDetail = (props) => {
  const user = useSelector((state) => state.user);
  let organizationDetails = props.organizationDetails;
  let projectList = props.projectList;
  let fundraisersList = props.fundraisersList;
  const [modalShow, setModalShow] = useState(false);
  const [organizationListByCountry, setOrganizationListByCountry] = useState([]);

  useEffect(() => {
    setOrganizationListByCountry(
      props.organizationList.filter((v) => {
        return v.country_id === user.countryId;
      })
    );
  }, [props.organizationList, user.countryId]);

  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');

  return (
    <>
      <HeaderController />
      {/* <SuggestionWrapper>
        <div className="suggested__list d-flex align-items-center container-fluid p-0 mb-0">
          <SuggestedList
            organizationList={organizationListByCountry}
            organizationId={organizationDetails?._id}
            itemTag="organization"
          />
          <div className="d-flex align-items-center me-2 text-nowrap">
            {!CampaignAdminAuthToken && (
              <Button
                size="md"
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
              loading={props.loading}
            />
          </div>
        </div>
      </SuggestionWrapper> */}
      <Container fluid className="pt-0 pt-sm-5">
        <Row className="ps-0 ps-sm-3 position-relative pt-5 gap-md-0 gap-3">
          <div className="d-none d-sm-flex detailshero"></div>
          <Col md="7">
            <OrganizationDetailMain
              followToOrganization={props.followToOrganization}
              organizationDetails={organizationDetails}
              addToCart={props.addToCart}
              checkItemInCart={props.checkItemInCart}
              isFollow={props.isFollow}
            />
          </Col>
          <Col md="5">
            <div className="d-flex container-fluid">
              <div className="ms-auto d-none d-sm-flex align-items-center gap-2 mb-5">
                <ShareWidget
                  page="org"
                  text={`Let's help ${organizationDetails?.name} fund their needs on Donorport 🏆 🚀`}
                  pageTitle={organizationDetails?.name}
                  currUrl={`https://api.donorport.com/organization/${organizationDetails?.slug}`}
                />
                {!CampaignAdminAuthToken && (
                  <Button
                    size="md"
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
                  loading={props.loading}
                />
              </div>
            </div>
            <History list={props.purchasedItemList} donationList={props.donationList} />
          </Col>
        </Row>
        {projectList ? (
          <Row className="ps-0 ps-sm-3 py-5">
            <Col md="6" className="mb-4 mb-0" style={{ maxWidth: '545px' }}>
              <OrganizationCrowdfundingProjectsWidget
                projectList={projectList}
                organizationDetails={organizationDetails}
              />
            </Col>
            <Col md="6"></Col>
          </Row>
        ) : null}

        {fundraisersList ? (
          <Row className="ps-0 ps-sm-3 pt-0 pb-5">
            <Col md="6" className="mb-4 mb-0" style={{ maxWidth: '545px' }}>
              <OrganizationCrowdfundingFundraisersWidget
                crowedFundingList={fundraisersList}
                organizationDetails={organizationDetails}
              />
            </Col>
            <Col md="6"></Col>
          </Row>
        ) : null}
      </Container>

      <Footer />
    </>
  );
};

OrganizationDetail.propTypes = {
  organizationDetails: PropTypes.object.isRequired,
  stateData: PropTypes.object.isRequired,
  changevalue: PropTypes.func.isRequired,
  donate: PropTypes.func.isRequired,
  setSelectedValue: PropTypes.func.isRequired,
  followToOrganization: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  checkItemInCart: PropTypes.func.isRequired,
  cardNumberWithSpace: PropTypes.string,
  dCardIcon: PropTypes.string,
  selectedValue: PropTypes.number,
  isFollow: PropTypes.bool,
  projectList: PropTypes.arrayOf(PropTypes.object),
  organizationList: PropTypes.arrayOf(PropTypes.object),
  purchasedItemList: PropTypes.arrayOf(PropTypes.object),
  donationList: PropTypes.arrayOf(PropTypes.object)
};

OrganizationDetail.defaultProps = {
  cardNumberWithSpace: '',
  dCardIcon: '',
  selectedValue: 25,
  isFollow: false,
  projectList: [],
  organizationList: []
};

export default OrganizationDetail;
