/* eslint-disable no-debugger */
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CrowdfundingDetail from '../../View/frontEnd/crowdfunding-detail';
import crowdfundingApi from '../../Api/frontEnd/crowdfunding';
import cartApi from '../../Api/frontEnd/cart';
import ToastAlert from '../../Common/ToastAlert';
import { useSelector, useDispatch } from 'react-redux';
import { validateAll } from 'indicative/validator';
import { setUserXp } from '../../user/user.action';
import helper, { GetCardTypeByNumber, getCardIcon } from '../../Common/Helper';
import followApi from '../../Api/frontEnd/follow';
import Page from '../../components/Page';
import {
  calculatePlatformCost,
  calculateGrandTotal,
  DONATION_XP_PER_DOLLAR,
} from '../../constants/constants';

const DONATE_VALIDATION_RULES = {
  //name: 'required',
  cardNumber: 'required|number',
  ccexpdate: 'required',
  cvv: 'required|number'
};
const DONATE_VALIDATION_MESSAGES = {
  // 'name.required': 'Card holder name is required.',
  'cardNumber.required': 'Card number is required.',
  'cardNumber.number': 'Card number can not be string.',
  'ccexpdate.required': 'Expire Date is required.',
  'cvv.required': 'CVV is required.',
  'cvv.number': 'CVV can not be string.'
};

const getCardIconFromNumber = (num) => {
  if (!num) {
    return '';
  }

  let cardType = GetCardTypeByNumber(num);
  return getCardIcon(cardType);
};

export default function CrowdfundingDetailsController() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  const userAuthToken = localStorage.getItem('userAuthToken');
  const userData = JSON.parse(localStorage.getItem('userData'));
  const token = userAuthToken || CampaignAdminAuthToken;

  //const [productList, setProductList] = useState([]);
  //const adminAuthToken = localStorage.getItem('adminAuthToken');
  const [loading, setLoading] = useState(false);
  const [crowdfundingDetails, setCrowdfundingDetails] = useState({});
  const [crowdfundingList, setCrowdfundingList] = useState([]);
  const [selectedValue, setSelectedValue] = useState(25);
  const [donationList, setDonationList] = useState([]);
  const [isFollow, setIsFollow] = useState(false);
  const [dCardIcon, setDCardIcon] = useState('');

  const [state, setstate] = useState({
    name: '',
    email: '',
    phone: '',
    stateName: '',
    city: '',
    country: '',
    zip: '',
    line1: '',
    ccexpdate: '',
    cardNumber: '',
    month: '',
    year: '',
    cvv: '',
    error: []
  });
  const { cardNumber, ccexpdate, month, year, cvv } = state;

  const [cardNumberWithSpace, setCardNumberWithSpace] = useState('');

  //const getUserRank = async () => {
  //const getRank = await userApi.getUserRank(userAuthToken);
  //if (getRank) {
  //if (getRank.data.success) {
  //dispatch(setUserRank(getRank.data.rank));
  //}
  //}
  //};

  const handleChangeValue = async (e) => {
    let value = e.target.value;

    if (e.target.name === 'cardNumber') {
      let cardVal = value
        .replace(/[^\dA-Z]/g, '')
        .replace(/(.{4})/g, '$1 ')
        .trim();
      setCardNumberWithSpace(cardVal);
      setDCardIcon(getCardIconFromNumber(value));
    }
    setstate({
      ...state,
      [e.target.name]: value
    });
  };

  const getAllCrowdfundingList = async () => {
    const data = {
      userCountry: user.countryId
    };
    const getCrowdfundingList = await crowdfundingApi.list(token, data);
    console.log({getCrowdfundingList});
    if (getCrowdfundingList.data.success === true) {
      setCrowdfundingList(getCrowdfundingList.data.data);
    }
  };

  const getDonationList = async (id) => {
    const getDonationList = await crowdfundingApi.donatedItemHistory(
      userAuthToken || CampaignAdminAuthToken,
      id
    );
    if (getDonationList.data.success === true) {
      setDonationList(getDonationList.data.data);
    }
  };

  const addToCart = async (id, quantity) => {
    if (!token) {
      return;
      // navigate('/signin')
    }

    setLoading(false);
    const data = {
      productId: id,
      quantity: quantity
    };

    const addItemToCart = await cartApi.add(userAuthToken, data);
    if (!addItemToCart) {
      setLoading(false);
      ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
      return;
    }
    if (!addItemToCart.data.success) {
      setLoading(false);
      ToastAlert({ msg: addItemToCart.data.message, msgType: 'error' });
      return;
    }
    setLoading(false);
  };

  const checkItemInCart = async (id) => {
    setLoading(false);
    const checkItemInCart = await cartApi.checkItemInCart(userAuthToken, id);
    if (!checkItemInCart) {
      setLoading(false);
      return false;
    }
    setLoading(false);
    return checkItemInCart?.data?.success || false;
  };

  const donate = async () => {
    if (!token) {
      navigate('/signin');
      return;
    }
    debugger
    validateAll(state, DONATE_VALIDATION_RULES, DONATE_VALIDATION_MESSAGES)
      .then(async () => {
        setLoading(true);
        const formaerrror = {};
        setstate({
          ...state,
          error: formaerrror
        });
        const platformCost = calculatePlatformCost(selectedValue);
        const grandTotal = calculateGrandTotal(selectedValue, platformCost);
        let data = {};
        data.name = userData.name;
        data.email = userData.email;
        data.city = user.cityName;
        data.state = user.stateName;
        data.line1 = user.area;
        data.country = user.countryName;
        data.amount = grandTotal;
        data.cardNumber = cardNumber;
        data.cardExpMonth = ccexpdate.split("/")[0];
        data.cardExpYear = ccexpdate.split("/")[1];
        data.cardCVC = cvv;
        data.postalCode = user.zip;
        data.currency = user.currency || "CAD";
        data.currencySymbol = user.currencySymbol;
        data.projectId = crowdfundingDetails._id;
        data.organizationId = crowdfundingDetails?.campaignDetails?._id;
        data.organizationLogo =
          helper.CampaignAdminLogoPath + crowdfundingDetails?.campaignDetails?.logo;
        data.projectName = crowdfundingDetails?.name;
        data.serviceCharge = platformCost;
        data.organizationCountryId = crowdfundingDetails?.campaignDetails?.country_id;
        data.xpToAdd = selectedValue * DONATION_XP_PER_DOLLAR; // selectedValue is $$

        const donateToProject = await crowdfundingApi.donate(userAuthToken, data);
        if (!donateToProject) {
          ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
          return;
        }
        if (!donateToProject.data.success) {
          ToastAlert({ msg: donateToProject.data.message, msgType: 'error' });
          return;
        }
        // let addXp = Number(selectedValue * 10)
        let addXp = Number(donateToProject.data.xpToAdd);
        dispatch(setUserXp(user.xp + addXp));
        navigate('/donate/' + donateToProject.data.donationId);
        // await getUserRank()
        /*ToastAlert({ msg: donateToProject.data.message, msgType: 'success' });*/
        //setLoading(false);
        // navigate('/')
        // navigate('/donate/' + donateToProject.data.donationId)
      })
      .catch((errors) => {
        debugger
        //setLoading(false);
        const formaerrror = {};
        if (errors.length) {
          errors.forEach((element) => {
            formaerrror[element.field] = element.message;
          });
        } else {
          ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
        }

        setstate({
          ...state,
          error: formaerrror
        });
      });
  };

  const checkUserFollow = async (crowdfundingId) => {
    const data = {
      typeId: crowdfundingId,
      type: 'CROWDFUNDING'
    };
    const check = await followApi.checkUserFollow(userAuthToken, data);
    if (check) {
      setIsFollow(check.data.success);
    }
  };

  const followToCrowdfunding = async (e) => {
    if (!userAuthToken) {
      ToastAlert({ msg: 'Please Login', msgType: 'error' });
      return;
    }
    const data = {
      organizationId: crowdfundingDetails.campaignDetails._id,
      typeId: crowdfundingDetails._id,
      type: 'CROWDFUNDING',
      isFollow: e.target.checked
    };

    const follow = await followApi.follow(userAuthToken, data);
    if (follow?.data?.success) {
      checkUserFollow(crowdfundingDetails._id);

      const addXp = Number(follow.data.xpToAdd);
      dispatch(setUserXp(user.xp + addXp));
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(false);
      const slug = params.name;
      // console.log(slug)
      const getCrowdfundingDetails = await crowdfundingApi.details(token, slug);
console.log({getCrowdfundingDetails}); // projectSlug is required
      if (getCrowdfundingDetails.data.success !== true) {
        setLoading(false);
        return;
        // navigate('/')
      }

      if (!getCrowdfundingDetails.data.data.length) {
        setLoading(false);
        return;
        // navigate('/')
      }

      const crowdfundingData = getCrowdfundingDetails.data.data[0];
      if (user.countryId && user.countryId > 0) {
        if (crowdfundingData.campaignDetails.country_id !== user.countryId) {
          // navigate('/')
        }
      }
      // console.log(projdata)
      setCrowdfundingDetails(crowdfundingData);
      // await getAllProjectList()
      //
      const promises = [getDonationList(crowdfundingData._id)];
      if (userAuthToken) {
        promises.push(checkUserFollow(crowdfundingData._id));
      }
      await Promise.all(promises);

      setLoading(false);
    })();
  }, [params.name]);

  useEffect(() => {
    if (user.countryId) {
      getAllCrowdfundingList();
    }
  }, [user.countryId]);

  console.log({ crowdfundingDetails, crowdfundingList });
  return (
    <>
      <Page // showTags={false}
        title={'Donorport | ' + crowdfundingDetails?.name}
        description={crowdfundingDetails?.description}
      >
        <CrowdfundingDetail
          crowdfundingDetails={crowdfundingDetails}
          crowdfundingList={crowdfundingList}
          addToCart={addToCart}
          checkItemInCart={checkItemInCart}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          stateData={state}
          cardNumberWithSpace={cardNumberWithSpace}
          changevalue={handleChangeValue}
          donate={donate}
          donationList={donationList}
          followToCrowdfunding={followToCrowdfunding}
          isFollow={isFollow}
          dCardIcon={dCardIcon}
          loading={loading}
        />
      </Page>
    </>
  );
}
