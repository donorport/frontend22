import React, { useState, useEffect } from 'react'; // Only import React once

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
//import IconButton from '../../molecules/icon-button';
import ShareWidget from '../share-widget';
import OrganizationWidget from '../organization-widget';
import helper, { convertAddress } from '../../../../../Common/Helper';
import './style.scss';
//import { GalleryImg } from '../../atoms';
import verified from '../../../../../assets/images/verified.png';
import ProjectCrowdfundingGallery from '../project-crowdfunding-gallery';
import DonateModal from '../../molecules/donate-modal';

function OrganizationDetailMain({
  checkItemInCart,
  addToCart,
  organizationDetails,
  isFollow,
  followToOrganization,
  stateData, // Access stateData from parent component
  changevalue, // Access changevalue from parent component
  cardNumberWithSpace, // Access cardNumberWithSpace from parent component
  donate, // Access donate function from parent component
  selectedValue, // Access selectedValue from parent component
  setSelectedValue, // Access setSelectedValue from parent component
  dCardIcon, // Access dCardIcon from parent component
  loading // Access loading state from parent component
}) {
  console.log('iFrame, OrganizationDetailMain');
  const [modalShow, setModalShow] = useState(false);
  /*let videoid = organizationDetails.promoVideo
    ? organizationDetails.promoVideo.split('?v=')[1]
    : '';
  let embedlink = videoid ? 'https://www.youtube.com/embed/' + videoid : '';*/

  const navigate = useNavigate();
  // let iconClass = organizationDetails?.categoryDetails?.iconDetails?.class.replace('fa-', '');
  let videoid = organizationDetails.promoVideo
    ? organizationDetails.promoVideo.split('?v=')[1].split('&')[0]
    : '';
  let embedlink = videoid ? 'https://www.youtube.com/embed/' + videoid : '';

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
  console.log({ organizationDetails });

  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');

  return (
    <div className="d-flex gap-5 project__detail-main">
      <div className="d-flex flex-column gap-3">
        <div className="d-flex flex-column">
          <h4 className="project__detail-sublabel mb-2">Organization</h4>
          <div className="d-flex flex-wrap gap-3">
            <h1
              className="flex-grow-1 project__detail-title  text-capitalize mb-0"
              style={{ flex: 0 }}
            >
              <span>{organizationDetails?.name}</span>
              <img
                className="ms-1 mt-auto"
                style={{ width: '24px', height: '24px' }}
                src={verified}
                alt=""
              />
            </h1>

            <div className="justify-content-end page__logo page__logo--org">
              <img
                alt=""
                src={helper.CampaignAdminLogoPath + organizationDetails?.logo}
                className="charity_avatar_bg"
                // style={{width: '90px'}}
              />
            </div>
          </div>
        </div>

        <div className="project__detail-meta d-flex align-items-center flex-wrap gap-2 text-light">
          {/* <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={regular("clock")} className="me-1" />
       
            {moment(organizationDetails?.created_at).format('MMMM DD , Y')}
          </div> */}
          {address && (
            <div className="d-flex align-items-center text-nowrap">
              <FontAwesomeIcon icon={regular('circle-location-arrow')} className="me-1" />
              {address}
            </div>
          )}
          {organizationDetails?.url && (
            <div className="d-flex align-items-center text-nowrap" style={{ maxWidth: '333px' }}>
              <FontAwesomeIcon icon={regular('link')} className="me-1" />

              <a
                href={organizationDetails?.url}
                className="org__url text-light overflow-hidden text-truncate"
                // style={{ width: '205px' }}
                rel="noreferrer"
                target="_blank"
              >
                {organizationDetails?.url}
              </a>
            </div>
          )}
        </div>

        {organizationDetails.promoVideo && (
          <div className="d-flex flex-column gap-2">
            <div className="project-video-wrap">
              <iframe
                title="organization-promo-video"
                key="organization-promo-video"
                width="498"
                height="280"
                src={embedlink}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

        {organizationDetails.images?.some((e) => e.type === 'galleryImage') && (
          <ProjectCrowdfundingGallery
            className=""
            title={false}
            images={organizationDetails.images}
          />
        )}
        <div className="d-flex align-items-center gap-2">
          <div className="category__icons d-flex align-items-center order--1 order-sm-0">
            <Button
              size="lg"
              variant="link"
              className="btn__category text-decoration-none"
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
              <span className="fs-6  fw-bold" style={{ textTransform: 'capitalize' }}>
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
                src="
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
          <div className="text-light d-flex align-items-center me-2 text-nowrap gap-1">
            <IconToggle
              icon={<FontAwesomeIcon icon={regular('bell')} />}
              checkedIcon={<FontAwesomeIcon icon={solid('bell')} />}
              ischecked={isFollow}
              name="organization"
              onClickFilter={(e) => followToOrganization(e)}
            />
            {/* <ShareWidget
              page="org"
              text={`Let's help ${organizationDetails?.name} fund their needs on Donorport 🏆 🚀`}
              pageTitle={organizationDetails?.name}
              currUrl={`https://api.donorport.com/organization/${organizationDetails?.slug}`}
            /> */}
            <div className="ms-auto d-flex d-sm-none align-items-center">
              {!CampaignAdminAuthToken && (
                <Button
                  size="sm"
                  className="fw-bold"
                  onClick={() => {
                    setModalShow(true);
                  }}
                >
                  Donate
                </Button>
              )}
              <ShareWidget
                page="org"
                text={`Let's help ${organizationDetails?.name} fund their needs on Donorport 🏆 🚀`}
                pageTitle={organizationDetails?.name}
                currUrl={`https://api.donorport.com/organization/${organizationDetails?.slug}`}
              />
              <DonateModal
                show={modalShow}
                type="organization"
                onHide={() => setModalShow(false)}
                organizationDetails={organizationDetails} // Pass organization details
                stateData={stateData} // Pass stateData prop
                changevalue={changevalue} // Pass changevalue function
                cardNumberWithSpace={cardNumberWithSpace} // Pass formatted card number
                donate={donate} // Pass donate function
                selectedValue={selectedValue} // Pass selected value
                setSelectedValue={setSelectedValue} // Pass setter for selected value
                dCardIcon={dCardIcon} // Pass credit card icon
                loading={loading} // Pass loading state
              />
            </div>
          </div>
        </div>
        <div className="">
          <h4 className="page__blurb fw-bolder">{organizationDetails?.headline}</h4>
          <p className="page__paragraph">{organizationDetails?.description}</p>
        </div>
        <div>
          <span
            variant="link"
            className="text-light text-uppercase text-decoration-none fw-normal px-0 fs-6"
          >
            {/* {organizationDetails?.type} RN {organizationDetails?.ein} */}
            <FontAwesomeIcon className="me-1" icon={solid('building')} />
            RN {organizationDetails?.ein}
          </span>
        </div>
      </div>
      <div className="d-flex flex-column align-items-start gap-1 justify-content-start mb-5">
        <p>organization admininstrator:</p>
        <div className="associated-user fw-semibold align-items-center d-flex gap-1 py-2 px-2 pe-3 rounded-5">
          <FontAwesomeIcon icon={solid('user')} className="me-1" />
          <span>{organizationDetails?.organizationUserName}</span>
        </div>
      </div>
      <div>
        <OrganizationWidget
          tagTitle="Organization"
          productDetails={organizationDetails?.productsDetails}
          addToCart={addToCart}
          checkItemInCart={checkItemInCart}
          organizationName={organizationDetails?.name}
        />
      </div>
    </div>
  );
}

OrganizationDetailMain.propTypes = {
  organizationDetails: PropTypes.object.isRequired,
  followToOrganization: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  checkItemInCart: PropTypes.func.isRequired,
  isFollow: PropTypes.bool
};

OrganizationDetailMain.defaultProps = {
  isFollow: false
};

export default OrganizationDetailMain;
