import React, { useState, useEffect } from 'react';
import Header from '../../View/frontEnd/Component/organisms/header';
import { useNavigate } from 'react-router-dom';
import ToastAlert from '../../Common/ToastAlert';
// import { UserContext } from '../../App';`
import { useSelector, useDispatch } from 'react-redux';
import { setFees, setIsUpdateCart, setIsAccountAdd, setUserXp } from '../../user/user.action';
import { setSettings, setXpSettings } from '../../user/setting.action';
import cartApi from '../../Api/frontEnd/cart';
import authApi from '../../Api/admin/auth';
import settingApi from '../../Api/admin/setting';
import wishlistApi from '../../Api/frontEnd/wishlist';
import userAuthApi from '../../Api/frontEnd/auth';
import notificationApi from '../../Api/frontEnd/notification';
import followApi from '../../Api/frontEnd/follow';
import adminCampaignApi from '../../Api/admin/adminCampaign';
import axios from 'axios';

// eslint-disable-next-line import/no-unresolved
import moment from 'moment';

export default function HeaderController({ productList, isHeaderGeo = false }) {
  const userAuthToken = localStorage.getItem('userAuthToken');
  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  const token = userAuthToken
    ? userAuthToken
    : CampaignAdminAuthToken
    ? CampaignAdminAuthToken
    : '';
  const [wishListproductList, setWishListProductList] = useState([]);
  const [notificationList, setNotificationList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [update, setIsUpdate] = useState(false);
  const [cartItem, setCartItem] = useState([]);
  const [followedOrganizationList, setFollowedOrganizationList] = useState([]);

  const navigate = useNavigate();
  // const user = useContext(UserContext)
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const [pricingFees, setPricingFees] = useState({
    platformFee: 0,
    transactionFee: 0,
    captian: '',
    admiral: '',
    pirate: '',
    narwhal: '',
    beluga: '',
    fish: '',
    topDonator: '',
    topDonation: '',
    forEachItem: '',
    forEachDonation: '',
    forEachShare: '',
    forEachOrganization: ''
  });
  //const { platformFee, transactionFee } = pricingFees;

  /*
   * This is a wrapper function for those functions which need to
   * setLoading at start and at the end. Pass in a function and
   * this returns a function so it can be called normally.
   */
  const useLoading = (bodyFn) => async (...args) => {
    setLoading(true);
    await bodyFn(...args);
    setLoading(false);
  };

  const getUserFollowedOrgList = async () => {
    if (!userAuthToken) return;

    const list = await followApi.userFollowedOrganizationList(userAuthToken);

    if (list && list.data.success) {
      setFollowedOrganizationList(list.data.data);
    }
  };

  useEffect(() => {
    (async () => {
      await getUserFollowedOrgList();
    })();
  }, []);

  const getWishListProductList = async () => {
    const list = await wishlistApi.list(token);

    if (list && list.data.success) {
      setWishListProductList(list.data.data);
    }

    console.log('getWishListProductList result:', {success: list?.data?.success ?? false, list})
  };

  const addProductToWishlist = useLoading(async (productId) => {
    let data = {
      productId,
    };
    console.log('addProductToWishlist: toggling the item:', {productId});
    const add = await wishlistApi.toggle(token, data);

    if (!add) {
      ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
      return;
    }

    if (!add.data.success) {
      ToastAlert({ msg: add.data.message, msgType: 'error' });
      return;
    }

    await getWishListProductList();
    dispatch(setIsUpdateCart(!user.isUpdateCart));
  });

  const getNotificationList = async () => {
    let data = {};
    data.countryId = user.countryId;
    data.getAll = true;
    const getList = await notificationApi.list(userAuthToken, data);

    if (!getList) {
      return;
    }
    if (!getList.data.success) {
      return;
    }

    const unfilteredList = getList.data.data;

    const filteredList = isHeaderGeo
      ? filterNotificationList_Geo(unfilteredList)
      : filterNotificationList(unfilteredList);
    setNotificationList(filteredList);
  };

  const filterNotificationList_Geo = (unfilteredList) => {
    let filteredList = [];
    unfilteredList.forEach((notification) => {
      if (
        (notification?.userNotificationDetails?.watched &&
          notification?.userNotificationDetails?.updated_at > notification?.created_at) ||
        !notification?.userNotificationDetails?.updated_at
      ) {
        switch (notification.type) {
          case 'PROJECT':
            break;
          case 'PRODUCT':
            followedOrganizationList.forEach((org) => {
              let notificationTime = moment(notification.created_at);
              let orgtime = moment(org.created_at);
              if (
                org.CampaignAdminDetails?._id === notification?.campaignadminDetails?._id &&
                notificationTime.isAfter(orgtime)
              ) {
                if (notification.infoType === 'MEDIA') {
                  // if(notification.info === "Fulfilled" || notification.info === "Fulfilled " || notification.infoType === "FUNDED" || notification.infoType === "MEDIA" || notification.infoType === "NEW PRODUCT"){
                  filteredList.push(notification);
                }
              }
            });
            break;
          default:
            filteredList.push(notification);
            break;
        }
      }
    });

    return filteredList;
  };

  const filterNotificationList = (unfilteredList) => {
    let filteredList = [];
    unfilteredList.forEach((notification) => {
      let notificationTime = moment(notification.created_at);
      if (
        (notification?.userNotificationDetails?.watched &&
          notification?.userNotificationDetails?.updated_at &&
          moment(notification?.userNotificationDetails?.updated_at).isAfter(notificationTime)) ||
        !notification?.userNotificationDetails?.updated_at
      ) {
        switch (notification.type) {
          case 'PROJECT':
            break;
          case 'PRODUCT':
            followedOrganizationList.forEach((org) => {
              let orgtime = moment(org.created_at);
              if (
                org.CampaignAdminDetails?._id === notification?.campaignadminDetails?._id &&
                notificationTime.isAfter(orgtime)
              ) {
                if (notification.infoType === 'MEDIA') {
                  filteredList.push(notification);
                }
              }
            });
            break;
          default:
            filteredList.push(notification);
            break;
        }
      }
    });

    return filteredList;
  };

  useEffect(() => {
    (async () => {
      if (userAuthToken && user.countryId) {
        // console.log('token')
        await getNotificationList();
      }

      if (token && token !== '') {
        const verifyUser = await authApi.verifyToken(token);

        if (!verifyUser.data.success) {
          localStorage.clear();
          navigate('/login');
        }

        const getCartList = await cartApi.list(token);
        if (getCartList.data.success === true) {
          console.log('list: ', getCartList.data.data);
          setCartItem(getCartList.data.data);
          // console.log(getCartList.data.data)
        }

        // console.log('first')
        await getWishListProductList();
      }

      setLoading(false);

      // console.log(user.isUpdateCart)
    })();
  }, [token, userAuthToken, update, user.isUpdateCart, user.countryId, loading]);

  const updateCartItem = useLoading(async (quantity, id, productId, type) => {
    console.log(`header${isHeaderGeo ? '-GEO-' : ''}Controller_____________ `, {
      id,
      productId,
      type,
      quantity,
    });


    //setLoading(true);
    const updateCartItem = await cartApi.updateCart(userAuthToken, quantity, id, productId, type);
    if (!updateCartItem) {
      ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
      return;
    }

    if (!updateCartItem.data.success) {
      ToastAlert({ msg: updateCartItem.data.message, msgType: 'error' });
      return;
    }

    if (isHeaderGeo) {
      setIsUpdate(!update); // didn't happen on regular header
    }

    // user.setCart(!user.isUpdateCart)
    dispatch(setIsUpdateCart(!user.isUpdateCart));
    /*ToastAlert({ msg: updateCartItem.data.message, msgType: 'success' });*/
    //setLoading(false);
  });

  useEffect(() => {
    useLoading(async () => {
      if (!token) return;

      const getSettingsValue = await settingApi.list(
        userAuthToken ? userAuthToken : CampaignAdminAuthToken,
        Object.keys(pricingFees)
      );

      if (!getSettingsValue.data.success) return;

      let data = {};

      getSettingsValue.data.data.map((d) => {
        data[d.name] = d.value;
      });

      setPricingFees({
        ...data
      });
      let feesData = {};
      feesData.platformFee = data.platformFee;
      feesData.transactionFee = data.transactionFee;
      dispatch(setFees(feesData));

      let rankData = {};

      rankData.captian = data.captian;
      rankData.admiral = data.admiral;
      rankData.pirate = data.pirate;
      rankData.narwhal = data.narwhal;
      rankData.beluga = data.beluga;
      rankData.fish = data.fish;
      dispatch(setSettings(rankData));

      let xpData = {};
      xpData.topDonator = data.topDonator;
      xpData.topDonation = data.topDonation;
      xpData.forEachItem = data.forEachItem;
      xpData.forEachDonation = data.forEachDonation;
      xpData.forEachShare = data.forEachShare;
      xpData.forEachOrganization = data.forEachOrganization;
      dispatch(setXpSettings(xpData));

      // user.settransactionFee(data.transactionFee)
      // user.setPlatformFee(data.platformFee)
    })();
  }, [token]);

  const followToOrganization = async (organizationId, checked) => {
    if (!userAuthToken) return;

    let data = {};
    data.organizationId = organizationId;
    data.typeId = organizationId;
    data.type = 'ORGANIZATION';
    data.isFollow = checked;

    const follow = await followApi.follow(userAuthToken, data);
    if (!follow || !follow.data.success) {
      ToastAlert({ msg: 'Please Login', msgType: 'error' });
      return;
    }

    await getUserFollowedOrgList();

    let addXp = Number(follow.data.xpToAdd);
    if (checked) {
      dispatch(setUserXp(user.xp + addXp));
    } else {
      dispatch(setUserXp(user.xp - addXp));
    }
    // await checkUserFollow(organizationDetails._id)
  };

  const removeCartItem = useLoading(async (id) => {
    const removeCartItem = await cartApi.deleteCartItem(userAuthToken, id);
    if (!removeCartItem) {
      ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
      return;
    }

    if (!removeCartItem.data.success) {
      ToastAlert({ msg: removeCartItem.data.message, msgType: 'error' });
      return;
    }

    setIsUpdate(!update);
    // user.setCart(!user.isUpdateCart)
    dispatch(setIsUpdateCart(!user.isUpdateCart));
    /*ToastAlert({ msg: removeCartItem.data.message, msgType: 'success' });*/
  });

  const checkOrgBankAc = async (token) => {
    const check = await adminCampaignApi.chekOrganizationAccount(token);
    if (!check) return;

    dispatch(setIsAccountAdd(check.data.success));
  };

  // same as HeaderController
  const getAuthToken = async (id, slug) => {
    const getToken = await userAuthApi.getAuthTokenById(id);
    await checkOrgBankAc(getToken.data.token);
    localStorage.setItem('tempCampaignAdminAuthToken', getToken.data.token);
    localStorage.setItem('type', 'temp');
    navigate('/campaign/' + slug + '/posts', { state: { type: 'temp' } }, { replace: true });
  };

  const setWatchNotification = async (watched, id, type) => {
    try {
      await axios.post('/api/notifications/setWatchNotification', {
        watched,
        id,
        type, // should be 'watched' or 'unwatched'
      });
      // Update the local state or refetch notifications if needed
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };
  

  const removeNotification = async (id) => {
    let data = {};
    data.removed = true;
    data.type = 'removed';
    data.id = id;
    const setWatch = await notificationApi.setWatch(userAuthToken, data);

    if (!setWatch || !setWatch.data.success) return;

    await getNotificationList();
  };

  const markAsRead = async (isRead, allNotificationList) => {
    let data = {};
    data.isRead = isRead;
    data.allNotificationList = allNotificationList;

    const markAsRead = await notificationApi.markAsRead(userAuthToken, data);

    if (!markAsRead || !markAsRead.data.success) return;

    await getNotificationList();
  };

  const removeFollowedOrganization = async (id) => {
    const removeFollow = await followApi.removeFollowedOrganization(userAuthToken, id);
    if (!removeFollow || !removeFollow.data.success) return;

    await getUserFollowedOrgList();
  };

  return (
    <>

      <Header
        cartItem={cartItem}
        removeCartItem={removeCartItem}
        updateCartItem={updateCartItem}
        wishListproductList={wishListproductList}
        productList={productList}
        addProductToWishlist={addProductToWishlist}
        getAuthToken={getAuthToken}
        notificationList={notificationList}
        setWatchNotification={setWatchNotification}
        removeNotification={removeNotification}
        followedOrganizationList={followedOrganizationList}
        followToOrganization={followToOrganization}
        markAsRead={markAsRead}
        removeFollowedOrganization={removeFollowedOrganization}
        isHeaderGeo={isHeaderGeo}
      />
    </>
  );
}
