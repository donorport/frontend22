// import Fancybox from "@components/molecules/fancybox";
// import GalleryImg from "@components/atoms/gallery-img";
import Fancybox from '../../molecules/fancybox';
import GalleryImg from '../../atoms/gallery-img';
// import { WidgetTitle, TagTitle } from "@components/atoms";

import WidgetTitle from '../../atoms/widget-title';

import TagTitle from '../../atoms/tag-title';
import helper from '../../../../../Common/Helper';

import './style.scss';

function ProjectCrowdfundingGallery({title = false, className, tagTitle, images}) {

  // console.log(images)
  return (
    <div className={`${className}`}>
      {title ? (
        <>
          {/* <TagTitle>Need</TagTitle>
          <WidgetTitle>Gallery</WidgetTitle> */}
        </>
      ) : (
        ''
      )}
      <Fancybox>
        <div className="gallery__container">
          {images?.length > 0 &&
            images.map((img, key) => {
              // console.log(img)
              if (tagTitle === 'Project' || tagTitle === 'Crowdfunding' || img.type === 'galleryImage') {
                const thumbImgSrc =
                  tagTitle === 'Project'
                    ? helper.ProjectImagePath + img.image
                    : tagTitle === 'Crowdfunding'
                    ? helper.CrowdfundingImagePath + img.image
                    : img.type === 'galleryImage' && img.productId
                    ? helper.CampaignProductImagePath + img.image
                    : helper.CampaignAdminGalleryPath + img.image; // fallback to original condition
                const bigImgSrc =
                  tagTitle === 'Project'
                    ? helper.ProjectFullImagePath + img.image
                    : tagTitle === 'Crowdfunding'
                    ? helper.CrowdfundingFullImagePath + img.image
                    : img.type === 'galleryImage' && img.productId
                    ? helper.CampaignProductFullImagePath + img.image
                    : helper.CampaignAdminGalleryFullPath + img.image; // fallback to original condition

                return <GalleryImg key={key} thumbImgSrc={thumbImgSrc} bigImgSrc={bigImgSrc} />;
              }
            })}
        </div>
      </Fancybox>
    </div>
  );
}

export default ProjectCrowdfundingGallery;
