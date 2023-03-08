import SuggestedItem from '../../molecules/suggested-item';
// import SuggestionWrapper from "../suggestion-wrapper";
import helper from '../../../../../Common/Helper';

import './style.scss';

function SuggestedList(props) {
  let organizationList = props.organizationList;
  let productDetails = props.productDetails;
  // this one need to be rendered based on device width
  // can try this solution https://stackoverflow.com/questions/39235506/render-component-in-different-order-depending-on-screen-size-react
  return (
    // <SuggestionWrapper>
    <ul className="suggested__list d-flex align-items-center container-fluid p-0 mb-0">
      {props.itemTag === 'organization'
        ? organizationList?.length > 0 &&
          organizationList.slice(0, 12).map((org, i) => {
            return (
              org._id !== props.organizationId && (
                <SuggestedItem
                  key={org._id}
                  imgUrl={helper.CampaignAdminLogoPath + org.logo}
                  organization={org}
                  itemTag={props.itemTag}
                />
              )
            );
          })
        : props.productList?.length > 0 &&
          props.productList.slice(0).map((pro, i) => {
            let sold = pro.unlimited ? pro.isFulfiled : pro.quantity <= pro.soldout;
            // let isFulfiled = pro.isFulfiled
            let media = pro?.media ? pro.media : false;

            let isFinish = !pro.unlimited && pro.soldout >= pro.quantity ? true : false;
            let isFulfiled = pro.isFulfiled;

            const isSold = isFinish || (isFulfiled && !pro.unlimited) ? true : false;
            return (
              pro._id !== props.productId &&
              !isFinish && (
                <SuggestedItem
                  key={pro._id}
                  imgUrl={helper.CampaignProductImagePath + pro.image}
                  product={pro}
                  sold={isSold}
                  itemTag={props.itemTag}
                  media={media}
                />
              )
            );
          })}
      {/* <SuggestedItem
          imgUrl=""
          sold
        />
        <SuggestedItem imgUrl="" />
        <SuggestedItem imgUrl="" /> */}
    </ul>
    // </SuggestionWrapper>
  );
}

export default SuggestedList;
