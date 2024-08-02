import PropTypes from 'prop-types';
import './style.scss';

const propTypes = {
  imgSrc: PropTypes.string,
  size: PropTypes.oneOfType([
    PropTypes.number, // For single size value
    PropTypes.arrayOf(PropTypes.number) // For [width, height]
  ]),
  className: PropTypes.string,
  icon: PropTypes.element,
};

const defaultProps = {
  size: 48, // Default size for both width and height
};

function ListItemImg({
  icon,
  imgSrc,
  size,
  className
}) {
  // Determine width and height
  let width, height;
  if (Array.isArray(size)) {
    [width, height] = size;
  } else {
    width = height = size;
  }

  return (
    <div className={`list__item-img ${className}`}>
      {icon ? (
        icon
      ) : (
        <img
          src={imgSrc}
          alt=""
          style={{
            objectFit: 'contain',
            height: height + 'px',
            width: width + 'px',
            maxWidth: width + 'px',
            maxHeight: height + 'px'
          }}
        />
      )}
    </div>
  );
}

ListItemImg.defaultProps = defaultProps;
ListItemImg.propTypes = propTypes;

export default ListItemImg;
