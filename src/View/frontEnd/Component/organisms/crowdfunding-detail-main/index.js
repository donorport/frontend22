import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { ProgressBar, Button } from 'react-bootstrap';
import FundraisingSlider from '../../atoms/crowdfunding-slider';
import ShareWidget from '../share-widget';
import ProjectCrowdfundingGallery from '../project-crowdfunding-gallery';
import TagTitle from '../../atoms/tag-title';
import IconToggle from '../../atoms/icon-toggle';
import moment from 'moment';
import helper, { convertAddress } from '../../../../../Common/Helper';
import DonateModal from '../../molecules/donate-modal';
import './style.scss';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function CrowdfundingDetailMain({ crowdfundingDetails, followToCrowdfunding, isFollow }) {
  const [sliderValue, setSliderValue] = useState(500);
  const [donateAmount, setDonateAmount] = useState(500);
  const [modalShow, setModalShow] = useState(false);
  // Function to handle changes from the slider
  const handleSliderChange = (newValue) => {
    console.log('Slider value changed:', newValue);
    setSliderValue(newValue);
  };
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
          progressPercent =
            (Number(project.itemDetails.soldout) / Number(project.itemDetails.quantity)) * 100;
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

  // function formatNumber(value) {
  //   return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // }

  return (
    <div className="project__detail-main">
      <div className="d-flex flex-column mb-4 gap-2">
        <div className="d-flex align-items-center mb-1">
          <div>
            <TagTitle>Fundraiser</TagTitle>
            <h1 className="project__detail-title">
              {crowdfundingDetails?.name ? crowdfundingDetails.name : 'Utility Vehicle'}
            </h1>
            <div className="project__detail-meta d-flex align-items-center flex-wrap text-light">
              <div className="d-flex align-items-center me-2 text-nowrap">
                <FontAwesomeIcon icon={regular('clock')} className="me-1" />
                {/* December 27, 2018 */}{' '}
                {moment(crowdfundingDetails.created_at).format('MMMM DD , YYYY')}
              </div>
              <div className="d-flex align-items-center me-2 text-nowrap">
                <FontAwesomeIcon icon={regular('circle-location-arrow')} className="me-1" />
                {address}
              </div>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column">
          <h5 className="project__detail-sublabel mb-0 fw-bolder">Charity</h5>
          <div className="project__detail-subtitle fw-bold">Goal</div>
          <h1>$5,000</h1>
          <div className="product__top px-0 d-flex align-items-center">
            <div className="d-flex align-items-center w-100">
              <ProgressBar
                variant={crowdfundingDetails.infinity ? 'infinity' : 'success'}
                now={Math.max(25, countCrowdfundingProcess(crowdfundingDetails.productDetails))}
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
          <div className="category__icons d-flex align-items-center order--1 order-sm-0 mb-0 mb-sm-2">
            <Link
              size="lg"
              variant="link"
              className="btn__category text-decoration-none btn btn-link btn-lg"
              to={'/categories/' + crowdfundingDetails?.campaignDetails?.categoryDetails?.slug}
            >
              <span className="d-flex align-items-center icon__category">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 640 512"
                >
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
        </div>
        <div>
          <h4 className="page__blurb fw-bolder">
            {crowdfundingDetails.headline || 'Default Headline'}
          </h4>
          <p className="page__paragraph">
            {crowdfundingDetails.description ||
              'Default description goes here. Provide details about your crowdfunding campaign.'}
          </p>
        </div>
        <FundraisingSlider
          userId="12345" // Replace with actual userId or prop value
          value={sliderValue}
          min={0}
          max={5000}
          step={100}
          onChange={(newAmount) => setDonateAmount(newAmount)}
        />

        <Button size="lg" onClick={() => setModalShow(true)}>
          Donate ${donateAmount}
        </Button>

        <DonateModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          type="crowdfunding"
          // name={props.crowdfundingDetails.name}
          selectedValue={donateAmount}
          setSelectedValue={donateAmount}
          // stateData={props.stateData}
          // changevalue={props.changevalue}
          // cardNumberWithSpace={props.cardNumberWithSpace}
          // donate={props.donate}
          // dCardIcon={props.dCardIcon}
          // loading={props.loading}
        />
        <div className="iframe__wrapper">
          <iframe
            src={embedlink}
            title="YouTube video player"
            width="854"
            height="480"
            scrolling="no"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          ></iframe>
        </div>
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
            <ProjectCrowdfundingGallery
              images={crowdfundingDetails?.images}
              tagTitle="Crowdfunding"
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default CrowdfundingDetailMain;
