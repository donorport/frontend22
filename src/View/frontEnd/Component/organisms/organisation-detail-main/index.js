import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

// import { IconToggle, RoundedIcon, TagTitle } from "../../Component";
import IconToggle from '../../atoms/icon-toggle';
import RoundedIcon from '../../atoms/rounded-icon';
// import WidgetTitle from "../widget-title"
// import TagTitle from '../../atoms/tag-title';
import IconButton from '../../molecules/icon-button';
import ShareWidget from '../share-widget';
import OrganisationWidget from '../organisation-widget';
import helper, { convertAddress } from '../../../../../Common/Helper';
import './style.scss';
import { GalleryImg } from '../../atoms';
// import { State, Country } from 'country-state-city';

function OrganisationDetailMain(props) {
  console.log('iFrame, OrganisationDetailMain');
  let organizationDetails = props.organizationDetails;
  const navigate = useNavigate();
  // let iconClass = organizationDetails?.categoryDetails?.iconDetails?.class.replace('fa-', '');

  const setAddress =
    organizationDetails?.city_id +
    ',' +
    //cityDetails was used when we had <select> to choose the City (replaced to text bc GB didn't work using <select>)
    // organizationDetails?.cityDetails?.city_id +
    //',' +
    organizationDetails?.stateDetails?.state +
    ',' +
    organizationDetails?.countryDetails?.country;

  let address = setAddress ? convertAddress(setAddress) : '';

  return (
    <div className="project__detail-main">
      <div className="d-flex flex-column mb-4">
        <div className="d-flex align-items-center mb-1">
          <div>
            <h4 className="project__detail-label mb-3p">Organization</h4>
            <h1 className="project__detail-title text-dark" style={{ textTransform: 'capitalize' }}>
              {organizationDetails?.name}
            </h1>
          </div>
          <div className="page__logo page__logo--org ms-auto">
            <img
              alt=""
              src={helper.CampaignAdminLogoPath + organizationDetails?.logo}
              className="charity_avatar_bg"
            />
          </div>
        </div>

        <div className="project__detail-meta d-flex align-items-center mb-2">
          {/* <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={regular("clock")} className="me-1" />
       
            {moment(organizationDetails?.created_at).format('MMMM DD , Y')}
          </div> */}

          <div className="d-flex align-items-center me-2">
            <FontAwesomeIcon icon={regular('circle-location-arrow')} className="me-1" />
            {address}
          </div>

          <div className="d-flex align-items-center me-2">
            <FontAwesomeIcon icon={regular('link')} className="me-1" />

            <a
              href={organizationDetails?.url}
              className="org__url text-light overflow-hidden text-truncate"
              rel="noreferrer"
              target="_blank"
            >
              {organizationDetails?.url}
            </a>
          </div>
          <div className="text-light d-flex align-items-center me-2">
            <IconToggle
              icon={<FontAwesomeIcon icon={regular('bell')} />}
              checkedIcon={<FontAwesomeIcon icon={solid('bell')} />}
              ischecked={props.isFollow}
              name="organization"
              onClickFilter={(e) => props.followToOrganization(e)}
            />
            <ShareWidget />
          </div>
        </div>

        <div className="category__icons d-flex align-items-center mb-4 order--1 order-sm-0">
          <Button
            size="lg"
            variant="link"
            className="btn__category text-decoration-none btn btn-link btn-lg"
            onClick={() => navigate('/categories/' + organizationDetails?.categoryDetails?.slug)}
          >
            <RoundedIcon
              bgColor={organizationDetails?.categoryDetails?.color}
              size={16}
              className="mr-6p"
              style={{ fontFamily: 'fontAwesome', color: 'white', fontStyle: 'normal' }}
              // icon={<i style={{ fontStyle: "normal" }} className={organizationDetails?.categoryDetails?.iconDetails?.class}></i>}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 100 563 512"
                >
                  <path fill="white" d={organizationDetails?.categoryDetails?.icon}></path>{' '}
                </svg>
              }
            />
            <span className="fs-6 text-dark fw-bold" style={{ textTransform: 'capitalize' }}>
              {organizationDetails?.categoryDetails?.name}
            </span>
          </Button>

          {/* <Button
            size="lg"
            variant="link"
            className="btn__category text-decoration-none btn btn-link btn-lg"
          >
            <span className="d-flex align-items-center icon__category">
              <img
                alt=""
                className="img-fluid"
                src="https://uploads-ssl.webflow.com/59df9e77ad9420000140eafe/5c2c38e4fd28a71363f4ac5d_Tree-Frog-Logo-Mock.png"
              />
            </span>
          </Button> 
          <Button
            size="lg"
            variant="secondary"
            className=" text-decoration-none"
          >
            <span className="fs-6" style={{ textTransform: "capitalize" }}>{organizationDetails?.countryDetails?.country}</span>
          </Button>*/}
        </div>
        {organizationDetails.promoVideo && (
          <div className="project-video-wrap mb-4">
            <iframe
              title="organization-promo-video"
              key="organization-promo-video"
              width="498"
              height="280"
              src={organizationDetails.promoVideo}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        )}

        <div className="gallery__container my-2">
          {organizationDetails.images &&
          Array.isArray(organizationDetails.images) &&
          organizationDetails.images.length > 0 ? (
            organizationDetails.images.map((image) => (
              <div key={image._id}>
                <GalleryImg
                  thumbImgSrc={helper.CampaignAdminGalleryPath + image.image}
                  bigImgSrc={helper.CampaignAdminGalleryPath + image.image}
                />
              </div>
            ))
          ) : (
            <></>
          )}
        </div>

        <h4 className="page__blurb">{organizationDetails?.headline}</h4>
        <div className="page__paragraph">{organizationDetails?.description}</div>
        <div className="mt-2">
          <IconButton
            variant="link"
            className="text-light text-decoration-none fw-normal px-0 fs-6"
            icon={<FontAwesomeIcon icon={solid('building')} />}
          >
            {organizationDetails?.type} EIN {organizationDetails?.ein}
          </IconButton>
        </div>
      </div>

      <OrganisationWidget
        tagTitle="Organization"
        productDetails={organizationDetails?.productsDetails}
        addToCart={props.addToCart}
        checkItemInCart={props.checkItemInCart}
      />
    </div>
  );
}

OrganisationDetailMain.propTypes = {
  organizationDetails: PropTypes.object.isRequired,
  followToOrganization: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  checkItemInCart: PropTypes.func.isRequired,
  isFollow: PropTypes.bool
};

OrganisationDetailMain.defaultProps = {
  isFollow: false
};

export default OrganisationDetailMain;
