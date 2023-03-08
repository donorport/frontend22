import Marquee from 'react-fast-marquee';
import helper from '../../../../../Common/Helper';
import './style.scss';

const MarqueeList = (props) => {
  let campaignAdminList = props.campaignAdminList;
  return (
    <Marquee gradient={false} speed={50}>
      <div className="collection__list">
        {campaignAdminList.length > 0 &&
          campaignAdminList.map((list, i) => {
            return (
              <div className="icon__item" key={i}>
                <div className="icon__img-wrap">
                  <img src={helper.CampaignAdminLogoPath + list.logo} alt="" />
                </div>
              </div>
            );
          })}
      </div>
    </Marquee>
  );
};

export default MarqueeList;
