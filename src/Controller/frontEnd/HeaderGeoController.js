import Index from '../../View/frontEnd/Layout/Home/Index';
import productApi from '../../Api/admin/product';
import React, { useState, useEffect, useContext } from 'react';
import FrontLoader from '../../Common/FrontLoader';
import Header from '../../View/frontEnd/Component/organisms/header';
import cartApi from '../../Api/frontEnd/cart';
import authApi from '../../Api/admin/auth';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import ToastAlert from '../../Common/ToastAlert';
// import { UserContext } from '../../App';`
import settingApi from '../../Api/admin/setting';
import { useSelector, useDispatch } from 'react-redux';
import { setFees, setIsUpdateCart, setIsAccountAdd, setUserXp } from '../../user/user.action';
import { setSettings, setXpSettings } from '../../user/setting.action';
import wishlistApi from '../../Api/frontEnd/wishlist';
// import {userAuth as frontEndAuthApi} from "../../Api/frontEnd/auth"
import userAuthApi from '../../Api/frontEnd/auth';
import notificationApi from '../../Api/frontEnd/notification';
import followApi from '../../Api/frontEnd/follow';
import adminCampaignApi from '../../Api/admin/adminCampaign';
// eslint-disable-next-line import/no-unresolved
import HeaderGeo from 'src/View/frontEnd/Component/organisms/header-geo/index';
import moment from "moment"

export default function HeaderGeoController() {
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
  const {isUpdateCart} = useSelector((state) => state.user); // DIFFERENT FROM HeaderController

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
  
  // same as HeaderController
  const getUserFollowedOrgList = async () => {
    if (userAuthToken) {
      const list = await followApi.userFollowedOrganizationList(userAuthToken);
      if (list && list.data.success) {
        setFollowedOrganizationList(list.data.data);
      }
    }
  };
  //
  // same as HeaderController
  useEffect(() => {
    (async () => {
      await getUserFollowedOrgList();
    })();
  }, []);
  
  const getWishListProductList = async () => {
    const list = await wishlistApi.list(token);
    if (list) {
      if (list.data.success) {
        // console.log(list.data.data)
        setWishListProductList(list.data.data);
      }
    }
  };

  // DIFFERENT FROM HeaderController
  const addProductToWishlist = async (productId) => {
    let data = {};
    data.productId = productId;
    setLoading(true);
    const add = await wishlistApi.add(token, data);

    if (!add) {
      setLoading(false);
      ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
      return;
    }

    setLoading(false);
    if (add.data.success) {
      await getWishListProductList();
      dispatch(setIsUpdateCart(!user.isUpdateCart));
    } else {
      ToastAlert({ msg: add.data.message, msgType: 'error' });
    }
  };

  // DIFFERENT FROM HeaderController
  const getNotificationList = async () => {
    let data = {};
    data.countryId = user.countryId;
    data.getAll = true
    const getList = await notificationApi.list(userAuthToken, data);

    if (getList) {
      if (getList.data.success) {
        let unfilteteredList = getList.data.data;
                let filteredList = []
                unfilteteredList.forEach(notification => {
                    if(notification?.userNotificationDetails?.watched && notification?.userNotificationDetails?.updated_at > notification?.created_at || !notification?.userNotificationDetails?.updated_at){
                      switch (notification.type) {
                        case "PROJECT":
                          break;
                        case "PRODUCT":
                          followedOrganizationList.forEach(org => {
                            let notificationTime = moment(notification.created_at)
                            let orgtime = moment(org.created_at)
                            if(org.CampaignAdminDetails?._id === notification?.campaignadminDetails?._id && notificationTime.isAfter(orgtime) ){
                              if(notification.infoType === "MEDIA"){
                              // if(notification.info === "Fulfilled" || notification.info === "Fulfilled " || notification.infoType === "FUNDED" || notification.infoType === "MEDIA" || notification.infoType === "NEW PRODUCT"){
                                filteredList.push(notification)
                              }
                            }
                          })
                          break;
                        default:
                          filteredList.push(notification)
                          break;
                      } 
                    } 
                })
                setNotificationList(filteredList)
      }
    }
  };
  
  // DIFFERENT FROM HeaderController
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
          console.log("list: ", getCartList.data.data)
          setCartItem(getCartList.data.data);
          // console.log(getCartList.data.data)
        }
        // console.log('first')
        await getWishListProductList();
      }
      
      if(loading) setLoading(false);
      
      // console.log(user.isUpdateCart)
    })();
  }, [token, userAuthToken, update, isUpdateCart, user.countryId, loading]);

  // same as HeaderController
  useEffect(() => {
    (async () => {
      setLoading(true);
      if (token) {
        const getSettingsValue = await settingApi.list(
          userAuthToken ? userAuthToken : CampaignAdminAuthToken,
          Object.keys(pricingFees)
        );

        if (getSettingsValue.data.success) {
          let data = {};

          getSettingsValue.data.data.map((d, i) => {
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
        }
      }
      setLoading(false);
    })();
  }, [token]);

  // same as HeaderController
  const followToOrganization = async (organizationId, checked) => {
    if (userAuthToken) {
      let data = {};
      data.organizationId = organizationId;
      data.typeId = organizationId;
      data.type = 'ORGANIZATION';
      data.isFollow = checked;

      const follow = await followApi.follow(userAuthToken, data);
      if (follow && follow.data.success) {
        await getUserFollowedOrgList();

        let addXp = Number(follow.data.xpToAdd);
        if (checked) {
          dispatch(setUserXp(user.xp + addXp));
        } else {
          dispatch(setUserXp(user.xp - addXp));
        }
        // await checkUserFollow(organizationDetails._id)
      }
    } else {
      ToastAlert({ msg: 'Please Login', msgType: 'error' });
    }
  };

  // same as HeaderController
  const removeCartItem = async (id) => {
    setLoading(true);
    const removeCartItem = await cartApi.deleteCartItem(userAuthToken, id);
    if (removeCartItem) {
      if (!removeCartItem.data.success) {
        setLoading(false);
        ToastAlert({ msg: removeCartItem.data.message, msgType: 'error' });
      } else {
        setIsUpdate(!update);
        // user.setCart(!user.isUpdateCart)
        dispatch(setIsUpdateCart(!user.isUpdateCart));
        /*ToastAlert({ msg: removeCartItem.data.message, msgType: 'success' });*/
        setLoading(false);
      }
    } else {
      setLoading(false);
      ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
    }
  };

  // DIFFERENT FROM HeaderController
  const updateCartItem = async (quantity, id, productId, type) => {

    setLoading(true);
    const updateCartItem = await cartApi.updateCart(userAuthToken, quantity, id, productId, type);
    if (updateCartItem) {
      if (!updateCartItem.data.success) {
        setLoading(false);
        ToastAlert({ msg: updateCartItem.data.message, msgType: 'error' });
      } else {
        setIsUpdate(!update)
        // user.setCart(!user.isUpdateCart)
        dispatch(setIsUpdateCart(!isUpdateCart));
        /*ToastAlert({ msg: updateCartItem.data.message, msgType: 'success' });*/
        setLoading(false);
      }
    } else {
      setLoading(false);
      ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
    }
  };

  // same as HeaderController
  const checkOrgBankAc = async (token) => {
    const check = await adminCampaignApi.chekOrganizationAccount(token);
    if (check) {
      dispatch(setIsAccountAdd(check.data.success));
    }
  };

  // same as HeaderController
  const getAuthToken = async (id, slug) => {
    const getToken = await userAuthApi.getAuthTokenById(id);
    await checkOrgBankAc(getToken.data.token);
    localStorage.setItem('tempCampaignAdminAuthToken', getToken.data.token);
    localStorage.setItem('type', 'temp');
    navigate('/campaign/' + slug + '/posts', { state: { type: 'temp' } }, { replace: true });
  };

  // same as HeaderController
  const setWatchNotification = async (watched, id) => {
    let data = {};
    data.watched = watched;
    data.type = 'watched';
    data.id = id;
    const setWatch = await notificationApi.setWatch(userAuthToken, data);
    if (setWatch) {
      if (setWatch.data.success) {
        await getNotificationList();
      }
    }
  };

// same as HeaderController
  const removeNotification = async (id) => {
    let data = {};
    data.removed = true;
    data.type = 'removed';
    data.id = id;
    const setWatch = await notificationApi.setWatch(userAuthToken, data);
    if (setWatch) {
      if (setWatch.data.success) {
        await getNotificationList();
      }
    }
    // const removeNotification = await notificationApi.removeNotification(userAuthToken, id)
    // if (removeNotification) {
    //     if (removeNotification.data.success) {
    //         await getNotificationList()
    //     }
    // }
  };

  // same as HeaderController
  const notificationMarkAsRead = async (isRead, allNotificationList) => {
    let data = {};
    data.isRead = isRead;
    data.allNotificationList = allNotificationList;

    const markAsRead = await notificationApi.markAsRead(userAuthToken, data);
    if (markAsRead && markAsRead.data.success) {
      await getNotificationList();
    }
  };

  // same as HeaderController
  const removeFollowedOrganization = async (id) => {
    const removeFollow = await followApi.removeFollowedOrganization(userAuthToken, id);
    if (removeFollow && removeFollow.data.success) {
      await getUserFollowedOrgList();
    }
  };

  return (
    <>
      {/* <FrontLoader loading={loading} /> */}
      <HeaderGeo
        cartItem={cartItem}
        removeCartItem={removeCartItem}
        updateCartItem={updateCartItem}
        wishListproductList={wishListproductList}
        addProductToWishlist={addProductToWishlist}
        getAuthToken={getAuthToken}
        notificationList={notificationList}
        setWatchNotification={setWatchNotification}
        removeNotification={removeNotification}
        followedOrganizationList={followedOrganizationList}
        followToOrganization={followToOrganization}
        notificationMarkAsRead={notificationMarkAsRead}
        removeFollowedOrganization={removeFollowedOrganization}
      />
    </>
  );
}
