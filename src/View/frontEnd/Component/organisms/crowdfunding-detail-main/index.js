import React, { useEffect, useState } from 'react';
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

function CrowdfundingDetailMain({
  crowdfundingDetails,
  stateData,
  changevalue,
  cardNumberWithSpace,
  donate,
  dCardIcon,
  loading,
  donationList,
  selectedValue,
  setSelectedValue,
  followToCrowdfunding,
  isFollow,
}) {
  const [sliderValue, setSliderValue] = useState(selectedValue || 0); // Sync state with selectedValue
  const [donateAmount, setDonateAmount] = useState(selectedValue || 0);
  const [modalShow, setModalShow] = useState(false);

  const video = crowdfundingDetails?.video;
  const videoid = video ? (video.split('?v=')[1] ? video.split('?v=')[1].split('&')[0] : '') : '';
  const embedlink = video ? `https://www.youtube.com/embed/${videoid}` : '';

  const [address, setAddress] = useState('');
  const goal = parseFloat(crowdfundingDetails?.goal || 0);

  const countCrowdfundingProcess = (data) => {
    const totalAmount = data.reduce((acc, obj) => acc + obj.amount, 0);
    return goal > 0 ? Math.round((totalAmount / goal) * 100) : 0;
  };
// Utility function to format numbers with commas
const formatNumberWithCommas = (value) => {
  if (isNaN(value)) return value; // Handle non-number values
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};
  useEffect(() => {
    if (crowdfundingDetails?.address) {
      setAddress(convertAddress(crowdfundingDetails?.address));
    } else {
      setAddress('Canada');
    }
  }, [crowdfundingDetails]);

  const handleSliderChange = (newValue) => {
    setSliderValue(newValue);
    setDonateAmount(newValue);
    setSelectedValue(newValue);
  };

  return (
    <div className="project__detail-main">
      <div className="d-flex flex-column mb-4 gap-2">
        <div className="d-flex gap-5">
          <div className="d-flex align-items-center flex-grow-1 mb-1">
            <div>
              <TagTitle>Fundraiser</TagTitle>
              <h1 className="project__detail-title">
                {crowdfundingDetails?.name ? crowdfundingDetails.name : 'Name'}
              </h1>
            </div>
          </div>
          <Link to={`/organization/${crowdfundingDetails?.campaignDetails?.slug}`}>
            <img
              alt=""
              style={{ width: 'auto', maxHeight: '90%', maxWidth: '90%' }}
              src={`${helper.CampaignAdminLogoPath}${crowdfundingDetails?.campaignDetails?.logo}`}
            />
          </Link>
        </div>
        <div className="project__detail-meta d-flex align-items-center flex-wrap text-light">
          <div className="d-flex align-items-center me-2 text-nowrap">
            <FontAwesomeIcon icon={regular('clock')} className="me-1" />
            {moment(crowdfundingDetails.created_at).format('MMMM DD , YYYY')}
          </div>
          <div className="d-flex align-items-center me-2 text-nowrap">
            <FontAwesomeIcon icon={regular('circle-location-arrow')} className="me-1" />
            {address}
          </div>
        </div>
        <div className="d-flex flex-column">
          <h5 className="project__detail-sublabel fw-bolder mt-3">Fundraiser Goal</h5>
          <h1>${formatNumberWithCommas(crowdfundingDetails.goal)}</h1>

          <div className="product__top px-0 d-flex align-items-center">
            <div className="d-flex align-items-center w-100">
              <ProgressBar
                variant={crowdfundingDetails.infinity ? 'infinity' : 'success'}
                now={Math.max(5, countCrowdfundingProcess(donationList))}
                className="flex-grow-1 me-1"
              />
              {crowdfundingDetails.infinity ? (
                <span className="tag tag__ongoing tag__rounded fs-9">
                  <FontAwesomeIcon icon={regular('infinity')} />
                </span>
              ) : (
                <span className="text-light">{countCrowdfundingProcess(donationList)}%</span>
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
            </div>
          </div>
        </div>
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
          <ProjectCrowdfundingGallery images={crowdfundingDetails?.images} tagTitle="Project" />
        )}
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
          userId={crowdfundingDetails?._id}
          value={sliderValue}
          min={0}
          max={5000}
          step={100}
          onChange={handleSliderChange}
        />
        <Button size="lg" onClick={() => setModalShow(true)}>
          Donate ${donateAmount}
        </Button>
        <DonateModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          type="crowdfunding"
          name={crowdfundingDetails.name}
          selectedValue={donateAmount}
          setSelectedValue={setSelectedValue}
          stateData={stateData}
          changevalue={changevalue}
          cardNumberWithSpace={cardNumberWithSpace}
          donate={donate}
          dCardIcon={dCardIcon}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default CrowdfundingDetailMain;
