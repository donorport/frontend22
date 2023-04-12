// import Fancybox from "@components/molecules/fancybox";
// import GalleryImg from "@components/atoms/gallery-img";
import Fancybox from '../../molecules/fancybox';
import GalleryImg from '../../atoms/gallery-img';
// import { WidgetTitle, TagTitle } from "@components/atoms";

import WidgetTitle from '../../atoms/widget-title';

import TagTitle from '../../atoms/tag-title';
import helper from '../../../../../Common/Helper';

import './style.scss';

function ProjectGallery(props) {
  let images = props.images;

  // console.log(images)
  return (
    <div className={`${props.className}`}>
      {props.title ? (
        <>
          <TagTitle>Need</TagTitle>
          <WidgetTitle>Gallery</WidgetTitle>
        </>
      ) : (
        ''
      )}
      <Fancybox>
        <div className="gallery__container">
          {images?.length > 0 &&
            images.map((img, i) => {
              // console.log(img)
              if (props.tagTitle === 'Project' || img.type === 'galleryImage') {
                return (
                  <GalleryImg
                    key={i}
                    thumbImgSrc={
                      props.tagTitle === 'Project'
                        ? helper.ProjectImagePath + img.image
                        : img.type === 'galleryImage' && helper.CampaignProductImagePath + img.image
                    }
                    bigImgSrc={
                      props.tagTitle === 'Project'
                        ? helper.ProjectFullImagePath + img.image
                        : img.type === 'galleryImage' &&
                          helper.CampaignProductFullImagePath + img.image
                    }
                  />
                );
              }
            })}
          {/* <GalleryImg
            thumbImgSrc="https://lipsum.app/id/33/200x150"
            bigImgSrc="https://lipsum.app/id/33/1024x768"
          />
          <GalleryImg
            thumbImgSrc="https://lipsum.app/id/34/200x150"
            bigImgSrc="https://lipsum.app/id/34/1024x768"
          />
          <GalleryImg
            thumbImgSrc="https://lipsum.app/id/35/200x150"
            bigImgSrc="https://lipsum.app/id/35/1024x768"
          />
          <GalleryImg
            thumbImgSrc="https://lipsum.app/id/36/200x150"
            bigImgSrc="https://lipsum.app/id/36/1024x768"
          /> */}
        </div>
      </Fancybox>
    </div>
  );
}

export default ProjectGallery;
