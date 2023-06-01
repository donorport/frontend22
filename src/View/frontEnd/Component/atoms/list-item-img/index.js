import PropTypes from 'prop-types';
import './style.scss';

const propTypes = {
  imgSrc: PropTypes.string,
  size: PropTypes.number,
  className: PropTypes.string,
  iconSize: PropTypes.number
};
const defaultProps = {
  size: 48
};

function ListItemImg({
  icon,
  imgSrc,
  size,
  //iconSize,
  className
}) {
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
            padding: '12%',
            height: size + 'px',
            width: size + 'px',
            maxWidth: size + 'px',
            maxHeight: size + 'px'
          }}
        />
      )}
    </div>
  );
}

ListItemImg.defaultProps = defaultProps;
ListItemImg.propTypes = propTypes;

export default ListItemImg;
