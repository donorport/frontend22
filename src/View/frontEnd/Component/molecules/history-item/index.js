import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
//import IconButton from '../icon-button';
import Avatar from '../../atoms/avatar';
import AvatarImg from '../../../../../assets/images/avatar.png';
import helper, { priceFormat, getCalculatedPrice } from '../../../../../Common/Helper';
import moment from 'moment';
import { useLocation } from 'react-router-dom';

import './style.scss';

const propTypes = {
  active: PropTypes.bool,
  categoryColor: PropTypes.string,
  categoryName: PropTypes.string
};

const defaultProps = {
  active: false,
  categoryName: 'Narwhal',
  categoryColor: '#a278fc' // I think we need to populate category color random
};

const getAvatarImage = (img) => {
  let image;
  if (img && img !== '') {
    // Check if `img` is a full URL
    image = (img.startsWith('http://') || img.startsWith('https://'))
      ? img
      : helper.DonorImagePath + img;
  } else {
    image = AvatarImg;
  }
  return image;
};

function HistoryItem({ active, ...otherProps }) {
  const getC = getCalculatedPrice();
  const location = useLocation();

  const sharedProps = {
    active,
    ...otherProps
  };

  let item = sharedProps.item;
  let type = sharedProps.type;
  let donationAmount = Number((item?.amount - 0.3) / 1.0499).toFixed(2);

  let avatar =
    type === 'donation' ? item?.userDetails?.image : item?.orderDetails?.userDetails?.image;

  let name = type === 'donation' ? item?.userDetails?.name : item?.orderDetails?.userDetails?.name;
  //let amount = type === 'donation' ? item?.amount : item?.totalPrice;
  let amount = type === 'donation' ? donationAmount : item?.totalPrice;
  let date = type === 'donation' ? item?.created_at : item?.orderDetails?.created_at;
  let currencySymbol =
    type === 'donation' ? item?.currencySymbol : item?.orderDetails?.currencySymbol;
  let xp = type === 'donation' ? item?.userDetails?.xp : item?.orderDetails?.userDetails?.xp;
  //let isDeleted =
  //type === 'donation' ? item?.userDetails?.isDeleted : item?.orderDetails?.userDetails?.isDeleted;
  const page = location.pathname.split('/').length > 0 && location.pathname.split('/')[1];

  // console.log(location.pathname.split('/')[1])

  return (
    <li
      className={`similar__item__wrap p-2 d-flex align-items-center${
        sharedProps.active ? 'active' : ''
      }`}
    >
      <div className="d-flex gap-2 align-items-sm-center align-items-start w-100">
        <div className="d-flex">
          <Avatar
            size={46}
            avatarUrl={getAvatarImage(avatar)}
            border={0}
            shadow={false}
            className="donor_avatar_bg"
          />
          <div className="d-flex flex-column ms-2 flex-grow-1">
            <div className="d-flex align-items-center justify-content-between">
              <div className=" fw-bold">{name}</div>

              {/*<span className="text-info fs-5">
              <FontAwesomeIcon icon={solid("badge-check")} />
      </span> */}
              {/* <IconButton
              bgColor={sharedProps.categoryColor}
              className="btn__xs rounded-pill"
              icon={
                <FontAwesomeIcon icon={solid("narwhal")} />
              }
            >
              {sharedProps.categoryName}
            </IconButton> */}
            </div>
            <div className="text-light fs-7 fw-semibold">
              {/*  {
              isDeleted &&

              <div className="text-lighter fs-8">Deleted User</div>
            }*/}
              {type === 'donation' ? (
                <>
                  <div className="d-flex align-items-center" style={{ width: 'auto' }}>
                    <FontAwesomeIcon icon={solid('heart')} className="mr-6p text-lighter" />
                    Donated
                  </div>
                </>
              ) : (
                <>
                  <div className="d-flex align-items-center text-wrap me-1">
                    <FontAwesomeIcon
                      icon={solid('bag-shopping')}
                      className="mr-6p text-lighter"
                      style={{ whiteSpace: 'nowrap' }}
                    />
                    Bought {item?.quantity} {page !== 'item' && item?.productName}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <span className="btn-sm ms-auto p-0 me-sm-0 me-2">{getC.getUserRank(xp)}</span>

        <div className="billing__value text-end">
          <div className="fs-5 fw-bold text-success mb-3p">
            {currencySymbol ? currencySymbol : '$'}
            {priceFormat(amount)}
          </div>
          <div className="fs-8 fw-semibold text-light">{moment(date).fromNow()}</div>
        </div>
      </div>
    </li>
  );
}

HistoryItem.propTypes = propTypes;
HistoryItem.defaultProps = defaultProps;

export default HistoryItem;
