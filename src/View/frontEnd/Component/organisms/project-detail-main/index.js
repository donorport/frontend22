import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Button, ProgressBar } from "react-bootstrap";

// import { IconToggle, RoundedIcon, TagTitle } from "@components/atoms";
// import {
//   ShareWidget,
//   OrganisationWidget,
//   ProjectGallery,
//   OrganisationTeamWidget,
// } from "../Components/organisms";

import ShareWidget from "../share-widget";
import OrganisationWidget from "../organisation-widget";
import ProjectGallery from "../project-gallery";
import OrganisationTeamWidget from "../org-team-widget";
// import IconButton from "../../molecules/icon-button";
import RoundedIcon from "../../atoms/rounded-icon";
import TagTitle from "../../atoms/tag-title";
import IconToggle from "../../atoms/icon-toggle";
import helper from "../../../../../Common/Helper";
import noImg from "../../../../../assets/images/noimg.jpg"
import moment from "moment";

import "./style.scss";

function ProjectDetailMain(props) {
  let projectDetails = props.projectDetails
  let url = projectDetails?.video;
  let videoid = url ? url.split("?v=")[1] : "";
  let embedlink = url ? "http://www.youtube.com/embed/" + videoid : "";

  const countProjectProcess = (data) => {
    // console.log(data)
    let totalQArray = []
    let soldOutQArray = []
    let per = 0

    if (data?.length > 0) {
      data.map((p, i) => {
        // console.log(p.itemDetails)
        totalQArray.push(Number(p.itemDetails.quantity))
        soldOutQArray.push(Number(p.itemDetails.soldout))
      })

      const total = totalQArray.reduce((partialSum, a) => partialSum + a, 0);
      const soldout = soldOutQArray.reduce((partialSum, a) => partialSum + a, 0);


      per = soldout / total * 100
    } else {
      per = 0;

    }
    return Math.round(per);

  }
  return (
    <div className="project__detail-main">
      <div className="mb-4">
        <div className="d-flex align-items-center mb-1">
          <div>
            <TagTitle>Project</TagTitle>
            <h1 className="project__detail-title mb-0 fw-bolder">
              {projectDetails.name}
            </h1>
          </div>
          <div className="page__logo page__logo--org ms-auto">
            <img
              alt=""
              src={projectDetails?.campaignDetails?.logo ? helper.CampaignAdminLogoPath + projectDetails?.campaignDetails?.logo : noImg}
            />
          </div>
        </div>

        <div className="project__detail-meta d-flex align-items-center mb-2">
          <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={regular("clock")} className="me-1" />
            {/* December 27, 2018 */} {moment(projectDetails.created_at).format('MMMM DD , YYYY')}
          </div>
          <div className="d-flex align-items-center ms-2">
            <FontAwesomeIcon
              icon={regular("circle-location-arrow")}
              className="me-1"
            />
            Toronto, ON
          </div>
        </div>

        <div className="product__top px-0 mb-1 d-flex align-items-center">
          <div className="d-flex align-items-center w-310">
            <ProgressBar
              variant="success"
              now={countProjectProcess(projectDetails.productDetails)}
              className="flex-grow-1 me-1"
            />
            {props.onGoing ? (
              <span className="tag tag__ongoing tag__rounded fs-5">
                <FontAwesomeIcon icon={regular("infinity")} />
              </span>
            ) : (
              <span className="fw-bold">{countProjectProcess(projectDetails.productDetails)}%</span>
            )}
          </div>
          <div className="text-light d-flex align-items-center ms-3">
            <IconToggle
              icon={<FontAwesomeIcon icon={regular("bell")} />}
              checkedIcon={<FontAwesomeIcon icon={solid("bell")} />}
            />

            <ShareWidget />
          </div>
        </div>

        <div className="category__icons d-flex align-items-center mb-2">
          <Button
            size="lg"
            variant="link"
            className="btn__category text-decoration-none"
          >
            <RoundedIcon
              bgColor="#c13e40"
              size={16}
              className="mr-6p"
              icon={<FontAwesomeIcon icon={solid("briefcase-medical")} />}
            />
            <span className="fs-6 text-dark fw-bold">Shelter</span>
          </Button>

          <Button
            size="lg"
            variant="link"
            className="btn__category text-decoration-none"
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
            <span className="fs-6">Shelter</span>
          </Button>
        </div>
        <div className="iframe__wrapper">
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
          <iframe src={embedlink} title="YouTube video player"
            width="854"
            height="480"
            scrolling="no"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
          ></iframe>

        </div>
        {
          projectDetails.images && projectDetails.images.length > 0 &&
          <ProjectGallery className="mb-3" title={false} images={projectDetails.images} tagTitle="Project" />

        }

        <h5>{projectDetails.headline}</h5>
        <div className="page__paragraph lh-lg">
          {projectDetails.description}
        </div>
      </div>
      <div className="mb-4">
        <OrganisationTeamWidget tagTitle="Project" showEmail={false} showContact />
      </div>
      <OrganisationWidget tagTitle="Project" productDetails={projectDetails.productDetails} />
    </div>
  );
}

export default ProjectDetailMain;
