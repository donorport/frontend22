import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import PlaceholderImg from "../../../../../assets/images/placeholder.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import "./style.scss";

const propTypes = {
  sold: PropTypes.bool,
  imgUrl: PropTypes.string,
  productLink: PropTypes.string,
};

const defaultProps = {
  imgUrl: PlaceholderImg,
  sold: false,
  productLink: "#",
};
function SuggestedItem({ sold, media, ...otherProps }) {
  const sharedProps = {
    sold,
    media,
    ...otherProps,
  };
  // console.log(sharedProps?.product?.imageDetails.filter(e => e.type === "galleryImage").length)
  let slug = sharedProps.itemTag === 'organization' ? "/organization/" + sharedProps.organization.slug : '/item/' + sharedProps.product.slug
  let flag = sharedProps.itemTag !== 'organization' ? sharedProps?.product?.imageDetails.filter(e => e.type === "galleryImage").length > 0 ? true : false : false
  let f2 = sharedProps.itemTag !== 'organization' ? sharedProps?.product.galleryUrl ? true : false : false
  return (
    <li className="suggest__item">
      <Link to={slug} className="d-block">
        {sharedProps.sold ? (
          <div className="post__sold">

            <img
              className="img-fluid"
              src="https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/5d41c138db84bd176388cc01_sold-out.svg"
              alt=""
            />
          </div>
        ) : (
          ""
        )}

        <div className="product__thumb d-flex align-items-center">
          {
            sharedProps.itemTag === 'product' && f2 || flag ?

              <a style={{
                backgroundColor: "#84c8e8",
                position: 'absolute',
                left: 'auto',
                top: '12%',
                right: '12%',
                bottom: 'auto',
                width: '21px',
                height: '21px',
                borderRadius: '50%',
                fontSize: '11px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }} href="#" className="project__indicator project__indicator--small w-inline-block">
                <div>
                  <FontAwesomeIcon
                    // className="fs-3"
                    icon={solid("image")}
                    color='white'
                  />
                </div>
              </a>
              : <></>
          }
          <img className="img-fluid mx-auto" alt="" src={sharedProps.imgUrl} />
        </div>
      </Link>
    </li>
  );
}

SuggestedItem.propTypes = propTypes;
SuggestedItem.defaultProps = defaultProps;

export default SuggestedItem;
