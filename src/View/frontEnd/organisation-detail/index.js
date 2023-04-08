import React, { useState, useEffect } from 'react';

import { Col, Container, Row, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import Footer from '../Component/organisms/footer';
import OrganisationDetailMain from '../Component/organisms/organisation-detail-main';
import History from '../Component/organisms/history';
import SuggestionWrapper from '../Component/molecules/suggestion-wrapper';
import SuggestedList from '../Component/organisms/suggested-list';
import OrganisationProjectsWidget from '../Component/organisms/org-projects-widget';
import DonateModal from '../Component/molecules/donate-modal';
import HeaderController from '../../../Controller/frontEnd/HeaderController';

import './style.scss';

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
  }, [props.organizationList, user.countryId]);

  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');

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
          <div className="d-flex align-items-center me-2 text-nowrap">
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
              loading={props.loading}
            />
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

OrganisationDetail.propTypes = {
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

OrganisationDetail.defaultProps = {
  cardNumberWithSpace: '',
  dCardIcon: '',
  selectedValue: 25,
  isFollow: false,
  projectList: [],
  organizationList: []
};

export default OrganisationDetail;
