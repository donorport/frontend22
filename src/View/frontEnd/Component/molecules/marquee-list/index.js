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

  // Filter the campaignAdminList based on countryId and list.logo existence
  const filteredList = campaignAdminList.filter(list => list.country_id === countryId && list.logo);

  // Check if Marquee should be shown
  const shouldShowMarquee = filteredList.length > 8;

  return (
    <>
      {shouldShowMarquee ? ( // Render Marquee if shouldShowMarquee is true
        <Marquee gradient={false} speed={50}>
          <div className="collection__list">
            {filteredList.map((list, i) => (
              <div className="icon__item" key={i}>
                <div className="icon__img-wrap">
                  <img
                    src={list.logo ? helper.CampaignAdminLogoPath + list.logo : avatar}
                    alt=""
                  />
                </div>
              </div>
            ))}
          </div>
        </Marquee>
      ) : ( // Render static collection__list if shouldShowMarquee is false
        <div className="container-fluid collection__list">
          {filteredList.map((list, i) => (
            <div className="icon__item" key={i}>
              <div className="icon__img-wrap">
                <img
                  src={list.logo ? helper.CampaignAdminLogoPath + list.logo : avatar}
                  alt=""
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MarqueeList;
