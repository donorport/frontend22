import Index from '../../View/frontEnd/Layout/Home/Index';
import productApi from '../../Api/admin/product';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FrontLoader from '../../Common/FrontLoader';
import OrganisationDetail from '../../View/frontEnd/organisation-detail';
import organizationApi from '../../Api/frontEnd/organization';
import ProjectDetail from '../../View/frontEnd/project-detail';
import projectApi from '../../Api/frontEnd/project';
import cartApi from '../../Api/frontEnd/cart';
import ToastAlert from '../../Common/ToastAlert';
import { useSelector, useDispatch } from 'react-redux';
import { validateAll } from 'indicative/validator';
import { setUserXp, setUserRank } from '../../user/user.action';
import helper, { GetCardTypeByNumber, getCardIcon } from '../../Common/Helper';
import userApi from '../../Api/frontEnd/user';
import followApi from '../../Api/frontEnd/follow';
import Page from '../../components/Page';

export default function ProjectDetailsController() {
  const [productList, setProductList] = useState([]);
  const adminAuthToken = localStorage.getItem('adminAuthToken');
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [projectDetails, setProjectDetails] = useState({});
  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  const userAuthToken = localStorage.getItem('userAuthToken');
  const token = userAuthToken ? userAuthToken : CampaignAdminAuthToken;
  const [projectList, setProjectList] = useState([]);
  const [purchasedItemList, setPurchasedItemList] = useState([]);
  const user = useSelector((state) => state.user);
  const [selectedValue, setSelectedValue] = useState(25);
  const userData = JSON.parse(localStorage.getItem('userData'));
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
    cardNumber: '',
    month: '',
    year: '',
    cvv: '',
    error: []
  });
  const { name, cardNumber, month, year, cvv, error } = state;

  const [cardNumberWithSpace, setCardNumberWithSpace] = useState('');

  const getUserRank = async () => {
    const getRank = await userApi.getUserRank(userAuthToken);
    if (getRank) {
      if (getRank.data.success) {
        dispatch(setUserRank(getRank.data.rank));
      }
    }
  };

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

  const getAllProjectList = async () => {
    let data = {};
    data.userCountry = user.countryId;
    const getProjectList = await projectApi.list(token, data);
    if (getProjectList.data.success === true) {
      setProjectList(getProjectList.data.data);
    }
  };

  const getPurchasedItems = async (id) => {
    const getPurchasedItems = await projectApi.projectItemPurchasedHistory(
      userAuthToken ? userAuthToken : CampaignAdminAuthToken,
      id
    );
    if (getPurchasedItems.data.success === true) {
      setPurchasedItemList(getPurchasedItems.data.data);
    }
  };

  const getDonationList = async (id) => {
    const getDonationList = await projectApi.projectDonatedItemHistory(
      userAuthToken ? userAuthToken : CampaignAdminAuthToken,
      id
    );
    if (getDonationList.data.success === true) {
      setDonationList(getDonationList.data.data);
    }
  };

  const addToCart = async (id, quantity) => {
    if (token) {
      setLoading(false);
      let data = {};
      data.productId = id;
      data.quantity = quantity;

      const addItemToCart = await cartApi.add(userAuthToken, data);
      if (addItemToCart) {
        if (!addItemToCart.data.success) {
          setLoading(false);
          ToastAlert({ msg: addItemToCart.data.message, msgType: 'error' });
        } else {
          /*ToastAlert({ msg: addItemToCart.data.message, msgType: 'success' });*/
          setLoading(false);
        }
      } else {
        setLoading(false);
        ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
      }
    } else {
      // navigate('/signin')
    }
  };

  const checkItemInCart = async (id) => {
    setLoading(false);
    let res;
    const checkItemInCart = await cartApi.checkItemInCart(userAuthToken, id);
    if (checkItemInCart) {
      setLoading(false);
      if (checkItemInCart.data.success) {
        res = true;
      } else {
        res = false;
      }
    } else {
      setLoading(false);
      res = false;
    }
    return res;
  };

  const donate = async () => {
    if (token) {
      const rules = {
       //name: 'required',
        cardNumber: 'required|number',
        month: 'required',
        year: 'required',
        cvv: 'required|number'
      };
      const message = {
       // 'name.required': 'Card holder name is Required.',
        'cardNumber.required': 'Card number is Required.',
        'cardNumber.number': 'Card number can not be string.',
        'month.required': 'Month is Required.',
        'year.required': 'Year number is Required.',
        'cvv.required': 'cvv is Required.',
        'cvv.number': 'cvv can not be string.'
      };
      validateAll(state, rules, message)
        .then(async () => {
          setLoading(true);
          const formaerrror = {};
          setstate({
            ...state,
            error: formaerrror
          });
          let platformCost = (0.0499 * Number(selectedValue) + 0.3).toFixed(2);
          let grandTotal = (Number(selectedValue) + Number(platformCost)).toFixed(2);
          let data = {};
          data.name = userData.name;
          data.email = userData.email;
          data.city = user.cityName;
          data.state = user.stateName;
          data.line1 = user.area;
          data.country = user.countryName;
          data.amount = grandTotal;
          data.cardNumber = cardNumber;
          data.cardExpMonth = month;
          data.cardExpYear = year;
          data.cardCVC = cvv;
          data.postalCode = user.zip;
          data.currency = user.currency;
          data.currencySymbol = user.currencySymbol;
          data.projectId = projectDetails._id;
          data.organizationId = projectDetails?.campaignDetails?._id;
          data.organizationLogo =
            helper.CampaignAdminLogoPath + projectDetails?.campaignDetails?.logo;
          data.projectName = projectDetails?.name;
          data.serviceCharge = platformCost;
          data.organizationCountryId = projectDetails?.campaignDetails?.country_id;
          data.xpToAdd = selectedValue * 10

          const donateToProject = await projectApi.donate(userAuthToken, data);
          if (donateToProject) {
            if (!donateToProject.data.success) {
              //setLoading(false);
              ToastAlert({ msg: donateToProject.data.message, msgType: 'error' });
            } else {
              // let addXp = Number(selectedValue * 10)
              let addXp = Number(donateToProject.data.xpToAdd);
              dispatch(setUserXp(user.xp + addXp));
              navigate('/donate/' + donateToProject.data.donationId);
              // await getUserRank()
              /*ToastAlert({ msg: donateToProject.data.message, msgType: 'success' });*/
              //setLoading(false);
              // navigate('/')
              // navigate('/donate/' + donateToProject.data.donationId)
            }
          } else {
            //setLoading(false);
            ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
          }
        })
        .catch((errors) => {
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
    } else {
      navigate('/signin')
    }
  };

  const checkUserFollow = async (projectId) => {
    let data = {};
    data.typeId = projectId;
    data.type = 'PROJECT';
    const check = await followApi.checkUserFollow(userAuthToken, data);
    if (check) {
      setIsFollow(check.data.success);
    }
  };

  const followToProject = async (e) => {
    if (userAuthToken) {
      let data = {};
      data.organizationId = projectDetails.campaignDetails._id;
      data.typeId = projectDetails._id;
      data.type = 'PROJECT';
      data.isFollow = e.target.checked;

      const follow = await followApi.follow(userAuthToken, data);
      if (follow && follow.data.success) {
        await checkUserFollow(projectDetails._id);

        if (e.target.checked) {
          let addXp = Number(follow.data.xpToAdd);
          dispatch(setUserXp(user.xp + addXp));
        } else {
          let addXp = Number(follow.data.xpToAdd);
          dispatch(setUserXp(user.xp - addXp));
        }
      }
    } else {
      ToastAlert({ msg: 'Please Login', msgType: 'error' });
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(false);
      // console.log(params.name)
      let projdata = {};
      const getProjectDetails = await projectApi.details(token, params.name);
      if (getProjectDetails.data.success === true) {
        // console.log(getProjectDetails.data.data[0])
        if (getProjectDetails.data.data.length) {
          projdata = getProjectDetails.data.data[0];
          if (user.countryId && user.countryId > 0) {
            if (projdata.campaignDetails.country_id !== user.countryId) {
              // navigate('/')
            }
          }
          // console.log(projdata)
          setProjectDetails(projdata);
          // await getAllProjectList()
          await getPurchasedItems(projdata._id);
          await getDonationList(projdata._id);

          if (userAuthToken) {
            await checkUserFollow(projdata._id);
          }
        } else {
          // navigate('/')
        }
      } else {
        // navigate('/')
        // console.log('first')
      }
      setLoading(false);
    })();
  }, [params.name]);

  useEffect(() => {
    (async () => {
      if (user.countryId) {
        await getAllProjectList();
      }
    })();
  }, [user.countryId]);
  return (
    <>
      <Page
        showTags={false}
        title={'Donorport | ' + projectDetails?.name}
        description={projectDetails?.description}
      >
        <ProjectDetail
          projectDetails={projectDetails}
          projectList={projectList}
          addToCart={addToCart}
          checkItemInCart={checkItemInCart}
          purchasedItemList={purchasedItemList}
          selectedValue={selectedValue}
          setSelectedValue={setSelectedValue}
          stateData={state}
          cardNumberWithSpace={cardNumberWithSpace}
          changevalue={changevalue}
          donate={donate}
          donationList={donationList}
          followToProject={followToProject}
          isFollow={isFollow}
          dCardIcon={dCardIcon}
          loading={loading}
        />
      </Page>
    </>
  );
}
