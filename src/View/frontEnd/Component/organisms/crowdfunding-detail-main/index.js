import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
// import { ProgressBar } from 'react-bootstrap';

import ShareWidget from '../share-widget';
// import OrganizationWidget from '../organization-widget';
import ProjectCrowdfundingGallery from '../project-crowdfunding-gallery';
import TagTitle from '../../atoms/tag-title';
import IconToggle from '../../atoms/icon-toggle';
import moment from 'moment';
import helper, { convertAddress } from '../../../../../Common/Helper';

import './style.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function CrowdfundingDetailMain({
  crowdfundingDetails,
  // addToCart,
  // checkItemInCart,
  followToCrowdfunding,
  isFollow
}) {
  const video = crowdfundingDetails?.video;

  const videoid = video ? video.split('?v=')[1].split('&')[0] : '';
  const embedlink = video ? 'https://www.youtube.com/embed/' + videoid : '';

  const [address, setAddress] = useState('');

  const countCrowdfundingProcess = (data) => {
    let allProductPer = [];

    let per = 0;

    if (data?.length > 0) {
      data.forEach((project) => {
        let progressPercent = 0;
        if (!project.itemDetails.unlimited) {
          progressPercent = (Number(project.itemDetails.soldout) / Number(project.itemDetails.quantity)) * 100;
        }
        allProductPer.push(progressPercent);
      });

      const total = allProductPer.reduce((partialSum, a) => partialSum + a, 0);
      per = total / allProductPer.length;
      per = Math.round(per);
    }

    return Math.round(per);
  };

  const setState = crowdfundingDetails.campaignDetails?.state_id;

  useEffect(() => {
    if (!crowdfundingDetails?.name) {
      return;
    }

    let newAddress = crowdfundingDetails?.campaignDetails?.address
      ? convertAddress(crowdfundingDetails.campaignDetails.address)
      : 'Canada';

    setAddress(newAddress);
  }, [crowdfundingDetails]);

  return (
    <div className="project__detail-main">
      <div className="d-flex flex-column mb-4 gap-2">
        <div className="d-flex align-items-center mb-1">
          <div>
            <TagTitle>Crowdfunding Campaign</TagTitle>
            <h1 className="project__detail-title ">{crowdfundingDetails.name}</h1>
          </div>
          {/* <div className="page__logo page__logo--org ms-auto">
            <img
              alt=""
              src={
                projectDetails?.campaignDetails?.logo
                  ? helper.CampaignAdminLogoPath + projectDetails?.campaignDetails?.logo
                  : noImg
              }
            />
          </div> */}
        </div>

        <div className="project__detail-meta d-flex align-items-center flex-wrap text-light">
          <div className="d-flex align-items-center me-2 text-nowrap">
            <FontAwesomeIcon icon={regular('clock')} className="me-1" />
            {/* December 27, 2018 */}{' '}
            {moment(crowdfundingDetails.created_at).format('MMMM DD , YYYY')}
          </div>
          <div className="d-flex align-items-center me-2 text-nowrap">
            <FontAwesomeIcon icon={regular('circle-location-arrow')} className="me-1" />
            {/* {`${addyList[0]} ${addyList[1]} ${countryToAlpha2(addyList[2])}`} */}
            {address}
          </div>
        </div>

        <div className="product__top px-0 mb-1 d-flex align-items-center">
{/*
** WHAT IS NEEDED HERE?? **
<div className="d-flex align-items-center w-100">
<ProgressBar
variant={crowdfundingDetails.infinity ? 'infinity' : 'success'}
now={countCrowdfundingProcess(crowdfundingDetails.productDetails)}
className="flex-grow-1 me-1"
/>
{crowdfundingDetails.infinity ? (
<span className="tag tag__ongoing tag__rounded fs-9">
<FontAwesomeIcon icon={regular('infinity')} />
</span>
) : (
<span className="text-light">
{countCrowdfundingProcess(crowdfundingDetails.productDetails)}%
</span>
)}
</div>
*/}
          <div className="text-light d-flex align-items-center ms-3">
            <IconToggle
              icon={<FontAwesomeIcon icon={regular('bell')} />}
              checkedIcon={<FontAwesomeIcon icon={solid('bell')} />}
              onClickFilter={followToCrowdfunding}
              name="Crowdfunding"
              ischecked={isFollow}
            />

            <ShareWidget
              page="project"
              text={`Help ${crowdfundingDetails?.campaignDetails?.name} fund their project: ${crowdfundingDetails?.name} on Donorport! 📈👀`}
              pageTitle={crowdfundingDetails?.name}
              currUrl={`https://api.donorport.com/crowdfunding/${crowdfundingDetails?.slug}`}
            />
          </div>
        </div>

        <div className="category__icons d-flex align-items-center order--1 order-sm-0 mb-2">

          <Link
            size="lg"
            variant="link"
            className="btn__category text-decoration-none btn btn-link btn-lg"
            to={'/categories/' + crowdfundingDetails?.campaignDetails?.categoryDetails?.slug}
          >
            <span className="d-flex align-items-center icon__category">
              {/* <img
                alt=""
                className="img-fluid"
                src=""
              /> */}
              {/* <img
                alt=""
                className="img-fluid"
                src={
                  projectDetails?.campaignDetails?.logo
                    ? helper.CampaignAdminLogoPath + projectDetails?.campaignDetails?.logo
                    : noImg
                }
              /> */}

              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 640 512">
                <path
                  d={crowdfundingDetails?.campaignDetails?.categoryDetails?.icon}
                  fill={crowdfundingDetails?.campaignDetails?.categoryDetails?.color}
                ></path>{' '}
              </svg>
            </span>
            <span className="fs-6  fw-bold ms-1">
              {crowdfundingDetails?.campaignDetails?.categoryDetails?.name}
            </span>
          </Link>
          <Link
            size="lg"
            variant="link"
            className="btn__category text-decoration-none btn btn-link btn-lg"
            to={'/organization/' + crowdfundingDetails?.campaignDetails?.slug}
          >
            <span className="d-flex align-items-center icon__category">
              {/* <CategoryIcon /> */}
              {/* <div className="page__logo page__logo--org ms-auto" > */}
              <img
                alt=""
                style={{ width: 'auto', maxHeight: '90%', maxWidth: '90%' }}
                src={helper.CampaignAdminLogoPath + crowdfundingDetails?.campaignDetails?.logo}
              />
              {/* </div> */}
            </span>
            <span className="fs-6  fw-bold ms-1">
              {crowdfundingDetails?.campaignDetails?.name}
            </span>
          </Link>
        </div>
        {/*   <div className="iframe__wrapper">
          {/* <iframe
            className="embedly-embed"
            src="//cdn.embedly.com/widgets/media.html?src=https%3A%2F%2Fwww.youtube.com%2Fembed%2FdR0C1C0WaCA%3Ffeature%3Doembed&display_name=YouTube&url=https%3A%2F%2Fwww.youtube.com%2Fwatch%3Fv%3DdR0C1C0WaCA&image=https%3A%2F%2Fi.ytimg.com%2Fvi%2FdR0C1C0WaCA%2Fhqdefault.jpg&key=96f1f04c5f4143bcb0f2e68c87d65feb&type=text%2Fhtml&schema=youtube"
            width="854"
            height="480"
            scrolling="no"
            title="YouTube embed"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          ></iframe> */}
        {/* <iframe src={embedlink} title="YouTube video player"
            width="854"
            height="480"
            scrolling="no"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          ></iframe> */}

        {/*

        </div>*/}
        <div className="d-flex flex-column gap-2">
          {video && (
            <div className="project-video-wrap">
              <iframe
                title="project-details-video"
                key="project-details-video"
                width="498"
                height="280"
                src={embedlink}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}

          {crowdfundingDetails?.images && crowdfundingDetails?.images.length > 0 && (
            <ProjectCrowdfundingGallery images={crowdfundingDetails?.images} tagTitle="Crowdfunding" />
          )}
        </div>
        <div>
          <h4 className="page__blurb fw-bolder">{crowdfundingDetails.headline}</h4>
          <p className="page__paragraph">{crowdfundingDetails.description}</p>
        </div>
      </div>
      {/* <div className="mb-4">
        <OrganizationTeamWidget tagTitle="Crowdfunding" showEmail={false} showContact />
      </div> */}
{/*
** NOT NEEDED FOR CROWDFUNDING ?? **
<OrganizationWidget
tagTitle="Crowdfunding"
productDetails={crowdfundingDetails.productDetails}
addToCart={addToCart}
checkItemInCart={checkItemInCart}
/>
*/}
    </div>
  );
}

export default CrowdfundingDetailMain;
