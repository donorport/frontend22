import Marquee from 'react-fast-marquee';
import helper from '../../../../../Common/Helper';
import './style.scss';
import avatar from '../../../../../assets/images/avatar.png';

const MarqueeList = (props) => {
  let campaignAdminList = props.campaignAdminList;

  // Get countryId from local storage
  const localStorageData = JSON.parse(localStorage.getItem("persist:root"));
  const persistedData = localStorageData ? JSON.parse(localStorageData.user) : {};
  const countryId = persistedData ? persistedData.countryId : null;

  return (
    <Marquee gradient={false} speed={50}>
      <div className="collection__list">
        {campaignAdminList.length > 0 &&
          campaignAdminList.map((list, i) => {
            // Check if country_id matches the countryId from local storage
            const showIcon = list.country_id === countryId;

            return (
              <>
                {list.logo && showIcon && ( // Show icon if list.logo exists and showIcon is true
                  <div className="icon__item" key={i}>
                    <div className="icon__img-wrap">
                      <img
                        src={list.logo ? helper.CampaignAdminLogoPath + list.logo : avatar}
                        alt=""
                      />
                    </div>
                  </div>
                )}
              </>
            );
          })}
      </div>
    </Marquee>
  );
};

export default MarqueeList;
