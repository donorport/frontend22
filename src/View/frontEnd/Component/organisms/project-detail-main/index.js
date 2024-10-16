import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { ProgressBar } from 'react-bootstrap';
import OrganizationWidget from '../organization-widget';
import ProjectCrowdfundingGallery from '../project-crowdfunding-gallery';
import TagTitle from '../../atoms/tag-title';
import IconToggle from '../../atoms/icon-toggle';
import moment from 'moment';
import helper, { convertAddress } from '../../../../../Common/Helper';
import DonateModal from '../../molecules/donate-modal';

import './style.scss';
import { Link } from 'react-router-dom';
// import { countryToAlpha2, countryToAlpha3 } from 'country-to-iso';
import { useEffect, useState } from 'react';

function ProjectDetailMain(props) {
  const [modalShow, setModalShow] = useState(false);
  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  let projectDetails = props.projectDetails;
  // let productDetails = props.productDetails;
  let video = projectDetails?.video;

  let videoid = video ? video.split('?v=')[1].split('&')[0] : '';
  let embedlink = video ? 'https://www.youtube.com/embed/' + videoid : '';

  const [address, setAddress] = useState('');

  // const countProjectProcess = (data) => {
  //   // console.log(data)
  //   let totalQArray = []
  //   let soldOutQArray = []
  //   let per = 0

  //   if (data?.length > 0) {
  //     data.map((p, i) => {
  //       // console.log(p.itemDetails)
  //       totalQArray.push(Number(p.itemDetails.quantity))
  //       soldOutQArray.push(Number(p.itemDetails.soldout))
  //     })

  //     const total = totalQArray.reduce((partialSum, a) => partialSum + a, 0);
  //     const soldout = soldOutQArray.reduce((partialSum, a) => partialSum + a, 0);

  //     per = soldout / total * 100
  //   } else {
  //     per = 0;

  //   }
  //   return Math.round(per);

  // }

  // const countProjectProcess = (data) => {
  //   // console.log(data)
  //   let totalQArray = [];
  //   let soldOutQArray = [];
  //   let per = 0;

  //   if (data?.length > 0) {
  //     data.map((p, i) => {
  //       // console.log(p.itemDetails)
  //       if (!p.itemDetails.unlimited) {
  //         totalQArray.push(Number(p.itemDetails.quantity));
  //         soldOutQArray.push(Number(p.itemDetails.soldout));
  //       }
  //     });

  //     const total = totalQArray.reduce((partialSum, a) => partialSum + a, 0);
  //     const soldout = soldOutQArray.reduce((partialSum, a) => partialSum + a, 0);
  //     if (soldout === 0 || total === 0) {
  //       per = 0;
  //     } else {
  //       per = (Number(soldout) / Number(total)) * 100;
  //     }
  //   } else {
  //     per = 0;
  //   }
  //   return Math.round(per);
  // };

  const countProjectProcess = (data) => {
    let allProductPer = [];
    let per = 0;

    if (data?.length > 0) {
      data.map((p, i) => {
        if (!p.itemDetails.unlimited) {
          let itm = (Number(p.itemDetails.soldout) / Number(p.itemDetails.quantity)) * 100;
          allProductPer.push(itm);
        } else {
          allProductPer.push(0);
        }
      });

      const total = allProductPer.reduce((partialSum, a) => partialSum + a, 0);
      per = total / allProductPer.length;
      per = Math.round(per);
    } else {
      per = 0;
    }

    // Ensure that the progress is at least 15% if it's 0
    return per === 0 ? 15 : per;
  };

  // const setState = projectDetails.campaignDetails?.state_id;

  useEffect(() => {
    if (projectDetails?.name) {
      let newaddress = projectDetails?.address
        ? convertAddress(projectDetails?.address)
        : '';
      if (!newaddress) {
        newaddress = projectDetails?.productDetails[0]?.itemDetails?.address
          ? convertAddress(projectDetails?.productDetails[0].itemDetails.address)
          : 'Canada';
      }
      setAddress(newaddress);
    }
  }, [props.projectDetails]);

  return (
    <div className="project__detail-main">
      <div className="d-flex flex-column mb-3 gap-2">
        <div className="d-flex align-items-center mb-1 gap-3">
          <div className="d-flex align-items-center flex-grow-1 mb-1">
            <div>
              {' '}
              <TagTitle>Project</TagTitle>
              <h1 className="project__detail-title ">{projectDetails.name}</h1>
            </div>
          </div>
          <Link to={'/organization/' + projectDetails?.campaignDetails?.slug}>
            <img
              alt=""
              style={{ width: 'auto', maxHeight: '90%', maxWidth: '90%' }}
              src={helper.CampaignAdminLogoPath + projectDetails?.campaignDetails?.logo}
            ></img>
          </Link>
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
            <div className="d-flex align-items-center me-2 text-nowrap">
              <FontAwesomeIcon icon={regular('clock')} className="me-1" />
              {/* December 27, 2018 */} {moment(projectDetails.created_at).format('MMMM DD , YYYY')}
            </div>
            <FontAwesomeIcon icon={regular('circle-location-arrow')} className="me-1" />
            {/* {`${addyList[0]} ${addyList[1]} ${countryToAlpha2(addyList[2])}`} */}
            {address}
          </div>
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
          <div className="product__top px-0 d-flex align-items-center">
            <div className="d-flex align-items-center w-100">
              <ProgressBar
                variant={projectDetails.infinity ? 'infinity' : 'success'}
                now={countProjectProcess(projectDetails.productDetails)}
                className="flex-grow-1 me-1"
              />
              {projectDetails.infinity ? (
                <span className="tag tag__ongoing tag__rounded fs-9">
                  <FontAwesomeIcon className="fs-6 text-secondary" icon={regular('infinity')} />
                </span>
              ) : (
                <span className="text-light">
                  {countProjectProcess(projectDetails.productDetails)}%
                </span>
              )}
            </div>
            <div className="text-light d-flex align-items-center ms-3">
              <IconToggle
                icon={<FontAwesomeIcon icon={regular('bell')} />}
                checkedIcon={<FontAwesomeIcon icon={solid('bell')} />}
                onClickFilter={(e) => props.followToProject(e)}
                name="Project"
                ischecked={props.isFollow}
              />

              {/* <ShareWidget
                page="project"
                text={`Help ${projectDetails?.campaignDetails?.name} fund their project: ${projectDetails?.name} on Donorport! 📈👀`}
                pageTitle={projectDetails?.name}
                currUrl={`https://api.donorport.com/project/${projectDetails?.slug}`}
              /> */}
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

          {projectDetails?.images && projectDetails?.images.length > 0 && (
            <ProjectCrowdfundingGallery
              title={false}
              images={projectDetails?.images}
              tagTitle="Project"
            />
          )}
        </div>
        {/* <div className="category__icons d-flex align-items-center order--1 order-sm-0 mb-0 mb-sm-2">
          <Link
            size="lg"
            variant="link"
            className="btn__category text-decoration-none btn btn-link btn-lg"
            to={'/categories/' + projectDetails?.campaignDetails?.categoryDetails?.slug}
          >
            <span className="d-flex align-items-center icon__category">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 640 512">
                <path
                  d={projectDetails?.campaignDetails?.categoryDetails?.icon}
                  fill={projectDetails?.campaignDetails?.categoryDetails?.color}
                ></path>{' '}
              </svg>
            </span>
            <span className="fs-6  fw-bold ms-1">
              {projectDetails?.campaignDetails?.categoryDetails?.name}
            </span>
          </Link>
          <Link
            size="lg"
            variant="link"
            className="btn__category text-decoration-none btn btn-link btn-lg"
            to={'/organization/' + projectDetails?.campaignDetails?.slug}
          >
            <span className="d-flex align-items-center icon__category">
              <img
                alt=""
                style={{ width: 'auto', maxHeight: '90%', maxWidth: '90%' }}
                src={helper.CampaignAdminLogoPath + projectDetails?.campaignDetails?.logo}
              />
            </span>
            <span className="fs-6  fw-bold ms-1">{projectDetails?.campaignDetails?.name}</span>
          </Link>
        </div> */}
        <div>
          <h4 className="page__blurb fw-bolder">{projectDetails.headline}</h4>
          <p className="page__paragraph">{projectDetails.description}</p>
        </div>
      </div>
      {/* <div className="mb-4">
        <OrganizationTeamWidget tagTitle="Project" showEmail={false} showContact />
      </div> */}
      {/* <div className="d-flex align-items-center">
        {!CampaignAdminAuthToken && (
          <Button size="lg˝" className="fw-bold" onClick={() => setModalShow(true)}>
            Donate to {projectDetails?.name}
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
      </div> */}
      <div className="d-flex flex-column align-items-start gap-1 justify-content-start mb-5">
        <p>project admininstrator:</p>
        <div className="associated-user fw-semibold align-items-center d-flex gap-1 py-2 px-2 pe-3 rounded-5">
          <FontAwesomeIcon icon={solid('user')} className="me-1" />
          <span>{projectDetails?.campaignDetails?.organizationUserName}</span>
        </div>
      </div>

      <OrganizationWidget
        tagTitle="Project"
        productDetails={projectDetails.productDetails}
        addToCart={props.addToCart}
        checkItemInCart={props.checkItemInCart}
      />
    </div>
  );
}

export default ProjectDetailMain;
