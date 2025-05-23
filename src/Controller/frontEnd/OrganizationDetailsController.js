import React, { useState, useEffect, useCallback } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { validateAll } from 'indicative/validator';

import OrganizationDetail from '../../View/frontEnd/organization-detail';
import organizationApi from '../../Api/frontEnd/organization';
import projectApi from '../../Api/admin/project';
import adminCampaignApi from '../../Api/admin/adminCampaign';
import cartApi from '../../Api/frontEnd/cart';
import ToastAlert from '../../Common/ToastAlert';
import { setUserXp } from '../../user/user.action';
import helper, { GetCardTypeByNumber, getCardIcon } from '../../Common/Helper';
import followApi from '../../Api/frontEnd/follow';
import Page from '../../components/Page';
import {
  calculatePlatformCost,
  calculateGrandTotal,
  DONATION_XP_PER_DOLLAR
} from '../../constants/constants';
import crowdfundingApi from '../../Api/admin/crowdfunding';


const DONATE_VALIDATION_RULES = {
  //name: 'required',
  cardNumber: 'required|number',
  ccexpdate: 'required',
  cvv: 'required|number'
};
const DONATE_VALIDATION_MESSAGES = {
  // 'name.required': 'Card holder name is required.',
  'cardNumber.required': 'Card number is required.',
  'cardNumber.number': 'Card number must not contain letters.',
  'ccexpdate.required': 'Expire Date is required.',
  'cvv.required': 'CVV is required.',
  'cvv.number': 'CVV must not contain letters.'
};

export default function OrganizationDetailsController() {
  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  const userAuthToken = localStorage.getItem('userAuthToken');
  const [organizationList, setOrganizationList] = useState([]);
  const token = CampaignAdminAuthToken ? CampaignAdminAuthToken : userAuthToken;
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [organizationDetails, setOrganizationDetails] = useState({});
  const [projectList, setProjectList] = useState([]);
  const [fundraisersList, setFundraisersList] = useState([]);
  const [purchasedItemList, setPurchasedItemList] = useState([]);
  const user = useSelector((state) => state.user);
  //const [serviceCharge, setServiceCharge] = useState(0);
  const userData = JSON.parse(localStorage.getItem('userData'));
  const [selectedValue, setSelectedValue] = useState(25);
  const [donationList, setDonationList] = useState([]);
  const dispatch = useDispatch();

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

  const { cardNumber, month, ccexpdate, year, cvv } = state;

  const [cardNumberWithSpace, setCardNumberWithSpace] = useState('');

  const getCardNumber = async (num) => {
    if (num) {
      let cardType = GetCardTypeByNumber(num);
      let cardIcon = getCardIcon(cardType);
      setDCardIcon(cardIcon);
    } else {
      setDCardIcon('');
    }
  };

  const changevalue = async (e) => {
    let value = e.target.value;
    if (e.target.name === 'cardNumber') {
      let cardVal = e.target.value;
      setCardNumberWithSpace(
        cardVal
          .replace(/[^\dA-Z]/g, '')
          .replace(/(.{4})/g, '$1 ')
          .trim()
      );
      setstate({
        ...state,
        [e.target.name]: value
      });
      await getCardNumber(value);
    } else {
      setstate({
        ...state,
        [e.target.name]: value
      });
    }
  };

  const orgProjectList = useCallback(
    async (orgId) => {
      let formData = {};
      formData.filter = false;
      formData.sortField = 'created_at';
      formData.sortType = 'asc';
      formData.organizationId = orgId;
      formData.type = 'product';

      const getProjectList = await projectApi.projectListByOrganization(token, formData);
      if (getProjectList.data.success) {
        setProjectList(getProjectList.data.data);
      }
    },
    [token]
  );

  const orgFundRaiserList = useCallback(
    async (orgId) => {
      let formData = {};
      formData.filter = false;
      formData.sortField = 'created_at';
      formData.sortType = 'asc';
      formData.organizationId = orgId;
      formData.type = 'crowdfunding';

      const response = await crowdfundingApi.listByOrganization(token, formData);
      if (response.data.success) {
        setFundraisersList(response.data.data);
      }
    },
    [token]
  );

  const getOrganizationList = useCallback(async () => {
    let data = {};
    data.userCountry = user.countryId;
    const getOrganizationList = await adminCampaignApi.list(token, data);
    if (getOrganizationList.data.success === true) {
      setOrganizationList(getOrganizationList.data.data);
    } else {
      setOrganizationList([]);
    }
  }, [token, user.countryId]);

  const getPurchasedItems = useCallback(
    async (id) => {
      const getPurchasedItems = await organizationApi.organizationPurchasedItemHistory(
        userAuthToken ? userAuthToken : CampaignAdminAuthToken,
        id
      );
      if (getPurchasedItems.data.success === true) {
        setPurchasedItemList(getPurchasedItems.data.data);
      }
    },
    [CampaignAdminAuthToken, userAuthToken]
  );

  const getDonationList = useCallback(
    async (id) => {
      const getDonationList = await organizationApi.organizationDonatedItemHistory(
        userAuthToken ? userAuthToken : CampaignAdminAuthToken,
        id
      );
      if (getDonationList.data.success === true) {
        setDonationList(getDonationList.data.data);
      } else {
        setDonationList([]);
      }
    },
    [CampaignAdminAuthToken, userAuthToken]
  );

  const addToCart = async (id, quantity) => {
    if (token) {
      let data = {};
      data.productId = id;
      data.quantity = quantity;

      const addItemToCart = await cartApi.add(userAuthToken, data);
      if (addItemToCart) {
        if (!addItemToCart.data.success) {
          ToastAlert({ msg: addItemToCart.data.message, msgType: 'error' });
        }
      } else {
        ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
      }
    } else {
      navigate('/signin');
    }
  };

  const checkItemInCart = async (id) => {
    let res;
    const checkItemInCart = await cartApi.checkItemInCart(userAuthToken, id);
    if (checkItemInCart) {
      if (checkItemInCart.data.success) {
        res = true;
      } else {
        res = false;
      }
    } else {
      res = false;
    }
    return res;
  };

  const donate = async () => {
    if (token) {
      validateAll(state, DONATE_VALIDATION_RULES, DONATE_VALIDATION_MESSAGES)
        .then(async () => {
          setLoading(true);
          const formaerrror = {};
          setstate({
            ...state,
            error: formaerrror
          });
          let data = {};
          let platformCost = calculatePlatformCost(selectedValue);
          let grandTotal = calculateGrandTotal(selectedValue, platformCost);
          data.name = userData.name;
          data.email = userData.email;
          data.city = user.cityName;
          data.state = user.stateName;
          data.line1 = user.area;
          data.country = user.countryName;
          data.amount = grandTotal;
          data.cardNumber = cardNumber;
          data.cardExpMonth = ccexpdate.split('/')[0];
          data.cardExpYear = ccexpdate.split('/')[1];
          data.cardCVC = cvv;
          data.postalCode = user.zip;
          data.currency = user.currency;
          data.currencySymbol = user.currencySymbol;
          data.organizationId = organizationDetails._id;
          data.organizationLogo = helper.CampaignAdminLogoPath + organizationDetails.logo;
          data.organizationName = organizationDetails.name;
          data.organizationCountryId = organizationDetails.country_id;
          data.serviceCharge = platformCost;
          data.xpToAdd = selectedValue * DONATION_XP_PER_DOLLAR;

          const donateToOrganization = await organizationApi.donate(userAuthToken, data);

          if (!donateToOrganization) {
            ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
          }

          if (!donateToOrganization.data.success) {
            ToastAlert({ msg: donateToOrganization.data.message, msgType: 'error' });
            return;
          }

          const addXp = Number(donateToOrganization.data.xpToAdd);
          dispatch(setUserXp(user.xp + addXp));
          navigate('/donate/' + donateToOrganization.data.donationId, {
            state: { xpToAdd: addXp }
          });
        })
        .catch((errors) => {
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
    } else {
      navigate('/signin');
    }
  };

  const checkUserFollow = useCallback(
    async (orgId) => {
      let data = {};
      data.typeId = orgId;
      data.type = 'ORGANIZATION';
      const check = await followApi.checkUserFollow(userAuthToken, data);
      if (check) {
        setIsFollow(check.data.success);
      }
    },
    [userAuthToken]
  );

  useEffect(() => {
    (async () => {
      let orgdata = {};
      const getOrganizationDetails = await organizationApi.details(params.name);
      if (getOrganizationDetails.data.success === true) {
        if (getOrganizationDetails.data.data.length) {
          orgdata = getOrganizationDetails.data.data[0];
          if (user.countryId && user.countryId > 0) {
            if (orgdata.country_id !== user.countryId) {
              // navigate('/');
            }
          }

          setOrganizationDetails(orgdata);
          await orgProjectList(orgdata._id);
          await getPurchasedItems(orgdata._id);
          await getDonationList(orgdata._id);
          await orgFundRaiserList(orgdata._id);
          if (userAuthToken) {
            await checkUserFollow(orgdata._id);
          }
        } else {
          // navigate('/');
        }
      } else {
        // navigate('/');
      }
    })();
  }, [
    checkUserFollow,
    getDonationList,
    getPurchasedItems,
    navigate,
    orgProjectList,
    params.name,
    user,
    userAuthToken
  ]);

  useEffect(() => {
    (async () => {
      if (user.countryId) {
        await getOrganizationList();
      }
    })();
  }, [getOrganizationList, user.countryId]);

  const followToOrganization = async (e) => {
    if (userAuthToken) {
      let data = {};
      data.organizationId = organizationDetails._id;
      data.typeId = organizationDetails._id;
      data.type = 'ORGANIZATION';
      data.isFollow = e.target.checked;

      const follow = await followApi.follow(userAuthToken, data);
      if (follow && follow.data.success) {
        await checkUserFollow(organizationDetails._id);
        if (e.target.checked) {
          let addXp = Number(follow.data.xpToAdd);
          dispatch(setUserXp(Number(user.xp) + addXp));
        } else {
          let addXp = Number(follow.data.xpToAdd);
          dispatch(setUserXp(Number(user.xp) - addXp));
        }
      }
    } else {
      ToastAlert({ msg: 'Please Login', msgType: 'error' });
    }
  };

  return (
    <>
      {/* <Page
        title={'Donorport | ' + organizationDetails?.name}
        description={organizationDetails?.description}
      > */}
      <Page
        title={`Help ${organizationDetails?.name} on Donorport`}
        description={
          organizationDetails?.description || 'Support this amazing organization and their cause.'
        }
        // img={
        //   organizationDetails?.logo
        //     ? `${helper.CampaignAdminLogoPath + organizationDetails.logo}`
        //     : 'https://your-default-image.com/default-image.jpg'
        // }
        url={`https://api.donorport.com/organization/${organizationDetails?.slug}`}
        showTags
      >
        <OrganizationDetail
          organizationDetails={organizationDetails}
          projectList={projectList}
          fundraisersList={fundraisersList}
          organizationList={organizationList}
          addToCart={addToCart}
          checkItemInCart={checkItemInCart}
          purchasedItemList={purchasedItemList}
          stateData={state}
          cardNumberWithSpace={cardNumberWithSpace}
          changevalue={changevalue}
          donate={donate}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          donationList={donationList}
          followToOrganization={followToOrganization}
          isFollow={isFollow}
          dCardIcon={dCardIcon}
          loading={loading}
        />
      </Page>
    </>
  );
}
