import Index from '../../View/frontEnd/Layout/Home/Index';
import productApi from '../../Api/frontEnd/product';
import React, { useState, useEffect, useMemo } from 'react';
import ToastAlert from '../../Common/ToastAlert';
import cartApi from '../../Api/frontEnd/cart';
// import adminCampaignApi from '../../Api/admin/adminCampaign';
import categoryApi from '../../Api/admin/category';
import locationApi from '../../Api/frontEnd/location';
import { useSelector, useDispatch } from 'react-redux';
import {
  setCurrency,
  setIsUpdateCart,
  setUserCountry,
  setUserAddress,
  setUserState,
  setSalesTax,
  setUserCountrySort,
  setProductCount,
  setLocationFilter
} from '../../user/user.action';
import advertisementApi from '../../Api/admin/advertisement';
import { arrayUnique } from '../../Common/Helper';
import wishlistApi from '../../Api/frontEnd/wishlist';
import { useNavigate } from 'react-router-dom';
import { getDistance } from 'geolib';
import Page from '../../components/Page';
import { debounce } from 'lodash';
import FrontLoader from '../../Common/FrontLoader';

export default function HomeController() {
  const [productList, setProductList] = useState([]);
  const [allProductList, setAllProductList] = useState([]);

  const [advertisementList, setAdvertisementList] = useState([]);
  const [countryAdvertisementList, setCountryAdvertisementList] = useState([]);
  const [homeadvertisementList, setHomeAdvertisementList] = useState([]);
  const [wishListproductList, setWishListProductList] = useState([]);
  const [wishListproductIds, setWishListProductIds] = useState([]);
  const [productTags, setProductTags] = useState([]);
  const [searchTag, setSearchTag] = useState([]);
  const [suggestionTag, setSuggestionTag] = useState('');
  const [resultTags, setresultTags] = useState([]);
  const [tempProductList, setTempProductList] = useState([]);
  const [searchValue, setSearchValue] = useState('')

  const navigate = useNavigate();
  // const adminAuthToken = localStorage.getItem('adminAuthToken');
  const [loading, setLoading] = useState(false);
  const userAuthToken = localStorage.getItem('userAuthToken');
  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  // const user = useContext(UserContext)
  const user = useSelector((state) => state.user);
  const token = userAuthToken ? userAuthToken : CampaignAdminAuthToken;
  const [categoryList, setCategoryList] = useState([]);
  const [update, setIsUpdate] = useState(false);
  const [inCart, setInCart] = useState(false);
  const [organizationList, setOrganizationList] = useState([]);
  const [seletedCategoryList, setSeletedCategoryList] = useState([]);
  const [selectedKey, setSelectedKey] = useState(3);
  const dispatch = useDispatch();
  const userData = JSON.parse(localStorage.getItem('userData'));
  const CampaignAdmin = JSON.parse(localStorage.getItem('CampaignAdmin'));
  const [price, setPrice] = useState();
  const [cartProductList, setCartProductList] = useState([]);
  const [cartProductIds, setCartProductIds] = useState([]);

  const [prodctFilterData, setprodctFilterData] = useState({
    highestPrice: 3000,
    lowestPrice: 0
  });

  const [filters, setfilters] = useState({
    taxEligible: false,
    postTag: false,
    infinite: false,

    lowToHigh: false,
    highToLow: false,
    oldEst: false,
    newEst: false,
    leastFunded: false,
    mostFunded: false,

    HighPrice: 3000,
    lowPrice: 0,

    search: ''
  });
  const {
    taxEligible,
    postTag,
    infinite,
    lowToHigh,
    highToLow,
    oldEst,
    newEst,
    // leastFunded,
    // mostFunded,
    HighPrice,
    lowPrice
    // search
  } = filters;

  const [pricingFees, setPricingFees] = useState({
    platformFee: 0,
    transactionFee: 0
  });

  // const { platformFee, transactionFee } = pricingFees;

  // const getOrganizationList = async () => {
  //   const getOrganizationList = await adminCampaignApi.list(token);
  //   if (getOrganizationList.data.success === true) {
  //     setOrganizationList(getOrganizationList.data.data);
  //   }
  // };

  const onClickFilter = (e) => {
    setfilters({
      ...filters,
      [e.target.name]: e.target.checked
    });
  };

  function showError(error) {
    // skip if no error passed in
    console.log('geo error callback');
    if (!error) return;

    console.log('~~ WITH ERROR:', error);
    console.log(
      '~~ Setting countrySort to "CA"; checking for userAuthToken || CampaignAdminAuthToken...'
    );
    dispatch(setUserCountrySort('CA'));

    // if no tokens, set a default UserCountry and UserState
    if (!userAuthToken && !CampaignAdminAuthToken) {
      console.log(
        '~~ ~~ NO TOKENS! Defaulting to setUserCountry(39) && setUserState(3830)! Returning'
      );
      dispatch(setUserCountry(39));
      dispatch(setUserState(3830));
      return;
    }

    if (userAuthToken) {
      console.log('~~ ~~ YES userAuthToken; setting currency & country & state');
      // set Country if it exists in userData, else default to Canadian
      const isUserWithCountryId = userData?.country_id > 0 ?? false;
      const country = isUserWithCountryId ? userData.country_id : 39;
      console.log('~~ ~~ default: {39}', { isUserWithCountryId, country });
      const currencyData = {
        currency: isUserWithCountryId ? userData.currency : 'CAD',
        currencySymbol: isUserWithCountryId ? userData.symbol : '$'
      };
      dispatch(setUserCountry(country));
      dispatch(setCurrency(currencyData));

      // if state_id exists and is > 0, use it; otherwise use Toronto (default)
      const state = userData?.state_id > 0 ? userData.state_id : 3830;
      console.log('~~ ~~ default: {3830}', { state });
      dispatch(setUserState(state));
    } else if (CampaignAdminAuthToken) {
      console.log('~~ ~~ YES CampaignAdminAuthToken; setting Country & State');
      const country = CampaignAdmin?.country_id > 0 ? CampaignAdmin.country_id : 39;
      const state = CampaignAdmin?.state_id > 0 ? CampaignAdmin.state_id : 3830;
      console.log('~~ ~~ ', {
        state_id_gt_0: CampaignAdmin?.state_id > 0,
        country_id_gt_0: CampaignAdmin?.country_id > 0
      });
      console.log('~~ ~~ defaults: {39, 3830}:', { country, state });
      dispatch(setUserCountry(country));
      dispatch(setUserState(state));
    }
  }

  const getStateDetailsByName = async (Name) => {
    let data = {};
    data.name = Name;
    const getStateDetails = await locationApi.stateDetailsByName(token, data);
    if (getStateDetails) {
      if (getStateDetails.data.success) {
        dispatch(setUserState(getStateDetails?.data.data?.id));
      }
    }
  };

  const getSalestax = async (country, state) => {
    let data = {};
    data.countryId = Number(country);
    data.stateId = Number(state);
    const getSalestax = await locationApi.getSalesTaxRate(userAuthToken, data);
    if (getSalestax) {
      if (getSalestax.data.success) {
        // console.log(getSalestax.data.salesTax)
        dispatch(setSalesTax(getSalestax.data.salesTax));
      }
    }
  };

  // success callback, takes coords and gets the location
  async function showPosition(position) {
    console.log('geolocation success callback:', { coords: position.coords });
    const { latitude, longitude } = position.coords;

    // console.log(latitude, longitude)
    if (!latitude || !longitude) return;

    const getLocationByLatLong = await locationApi.getLocationByLatLong(latitude, longitude);
    console.log(
      '~~ got location from lat,lng:',
      {
        latitude,
        longitude,
        results0: getLocationByLatLong.data.results[0]
      },
      '\n ~~ making sure status is OK:'
    );

    if (!getLocationByLatLong || getLocationByLatLong.data.status !== 'OK') return;
    console.log('~~ Status OK! Checking results.length:');

    if (getLocationByLatLong.data.results.length <= 0) return;
    console.log('~~ length > 0, breaking out address:');

    // console.log(getLocationByLatLong.data.results[0])
    let { address_components } = getLocationByLatLong.data.results[0];
    console.log('~~', { address_components });

    let userAddressObj = {};
    userAddressObj.stateName = address_components.find(
      (settings) => settings.types[0] === 'administrative_area_level_1'
    )?.long_name;
    userAddressObj.zip = address_components.find(
      (settings) => settings.types[0] === 'postal_code'
    )?.long_name;
    userAddressObj.cityName = address_components.find(
      (settings) => settings.types[0] === 'administrative_area_level_2'
    )?.long_name;
    userAddressObj.area = address_components.find(
      (settings) => settings.types[0] === 'route'
    )?.long_name;
    userAddressObj.countryName = address_components.find(
      (settings) => settings.types[0] === 'country'
    )?.long_name;
    userAddressObj.countrySortName = address_components.find(
      (settings) => settings.types[0] === 'country'
    )?.short_name;

    userAddressObj.lat = latitude;
    userAddressObj.lng = longitude;

    console.log('~~ built userAddressObj, saving to UserAddress:', { userAddressObj });

    dispatch(setUserAddress(userAddressObj));

    dispatch(
      setUserCountrySort(
        address_components.find((settings) => settings.types[0] === 'country').short_name
      )
    );

    // console.log(jsObjects.find(settings => settings.types[0] === 'administrative_area_level_1').long_name)

    address_components.filter(async (obj) => {
      let tempObj = {};

      if (obj.types[0] === 'country') {
        let countryName = obj.long_name;
        tempObj.countryName = countryName;

        // setAddress({
        //     ...address,
        //     countryName: countryName
        // })

        const getCountryData = await locationApi.currencyByCountry(token, countryName);
        if (getCountryData) {
          if (getCountryData.data.success) {
            dispatch(setUserCountrySort(getCountryData.data.data.iso2));
            dispatch(setUserCountry(getCountryData.data.data.id));
            let currencyData = {};
            currencyData.currency = getCountryData.data.data.currency;
            currencyData.currencySymbol = getCountryData.data.data.symbol;
            // console.log(getCountryData.data.data.symbol)
            dispatch(setCurrency(currencyData));
          }
        }
      }
    });
    await getStateDetailsByName(
      address_components.find((settings) => settings.types[0] === 'administrative_area_level_1')
        .long_name
    );
  }

  const getCountryAdvertisement = async (countryId, stateId) => {
    let data = { countryId, stateId };
    const getCountryAdvertisementList = await advertisementApi.listCountryAdvertisement(data);

    if (!getCountryAdvertisementList) return;

    if (!getCountryAdvertisementList.data.success) return;

    if (getCountryAdvertisementList.data.data.length <= 0) return;

    let tempArray = [];
    getCountryAdvertisementList.data.data.forEach((ad) => {
      if (ad.advertisementsDetails.length <= 0) return;

      ad.advertisementsDetails.forEach((a) => {
        tempArray.push(a);
      });
    });
    setCountryAdvertisementList(tempArray);
  };

  const getHomePageAdList = async () => {
    const adList = await advertisementApi.listHomeAd();

    if (!adList) return;

    if (!adList.data.success) return;

    setHomeAdvertisementList(adList.data.data);
  };

  const getWishListProductList = async () => {
    const list = await wishlistApi.list(token);
    if (list) {
      if (list.data.success) {
        setWishListProductList(list.data.data);
        if (list.data.data.length > 0) {
          let temp = [];
          list.data.data.map((item) => {
            temp.push(item.productDetails._id);
          });
          setWishListProductIds(temp);
        } else {
          setWishListProductIds([]);
        }
      }
    }
  };

  const addProductToWishlist = async (productId) => {
    let data = { productId };
    setLoading(true);
    const add = await wishlistApi.toggle(token, data);
    if (add) {
      if (add.data.success) {
        // await getWishListProductList()
        dispatch(setIsUpdateCart(!user.isUpdateCart));
      } else {
        ToastAlert({ msg: add.data.message, msgType: 'error' });
      }
    } else {
      ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
    }
    setLoading(false);
  };

  // fetch cart list & product list when user token changes
  useEffect(() => {
    (async () => {
      // console.log(343)
      // if (!user.isMapLocked) {

      //     if (user.distance?.includes("© Mapbox ")) {
      //       const after_ = user.d?.substring(user.d.indexOf('map') + 3);
      //       dispatch(setDistance(after_))

      //     } else {
      //       dispatch(setDistance(user.d))

      //     }

      //   }

      if (userAuthToken) {
        await getCartList();

        setLoading(true);
        await getWishListProductList();
        setLoading(false);
      }

      // console.log(Math.floor(10000000 + Math.random() * 90000000))
    })();
  }, [user.isUpdateCart, userAuthToken]);

  // filter products by distance??
  useEffect(() => {
    (async () => {
      // if (user.isMapLocked) {
      // console.log(user.distance, 'user.distance')

      // console.log(374)

      let str = user.distance;
      const after_ = str?.substring(str.indexOf('map') + 3);
      // console.log(user.lng)
      if (user.distance && user.distance.split(' ').length > 0) {
        let d = Number(user.distance.split(' ')[0]);
        // console.log(d)
        if (isNaN(d)) {
          d = after_.split(' ')[0];
          // console.log(d)
        }
        // console.log(d)

        let productArray = [];

        // if (Number(d) > 1) {
        allProductList.map((p) => {
          if (p.lat && p.lng) {
            let dis = getDistance(
              { latitude: user.lat, longitude: user.lng },
              { latitude: p.lat, longitude: p.lng }
            );
            // console.log('dis', dis / 1000)
            if (Number(d) > dis / 1000) {
              productArray.push(p);
            }
            //   console.log(dis/1000)
          }
        });
        setTempProductList(productArray);
        // console.log(productArray.length)
        dispatch(setProductCount(productArray.length));
        // if (user.isUpdateLocationFilter === true) {
        //     setProductList(productArray)
        //     dispatch(setLocationFilter(false))
        // }
        // } else {
        //     await filterProduct(lowPrice, HighPrice, resultTags, user.countryId)
        //     dispatch(setProductCount(0))
        //     // dispatch(setLocationFilter(false))
        // }
      }

      // }
      // console.log(user.isUpdateLocationFilter)

      // let p = productList.filter(e => getCalc.getData(e.price) < value)
      // console.log(Math.floor(10000000 + Math.random() * 90000000))
    })();
  }, [user.distance, allProductList, user.lat, user.lng, dispatch]);

  useEffect(() => {
    // console.log(user.isUpdateLocationFilter)
    // if (user.isMapLocked) {
    if (user.isUpdateLocationFilter === 'true') {
      // console.log('tr')

      // console.log(user.isUpdateLocationFilter)
      if (tempProductList.length > 0) {
        let productTagsArray = [];
        tempProductList.forEach((p) => {
          p.tags.forEach((value) => {
            let tempObj = {
              color: p.categoryDetails.color ? p.categoryDetails.color : 'red',
              tag: value
            };
            productTagsArray.push(tempObj);
          });
          productTagsArray.push(p.campaignDetails?.name);
          
        });
        productTagsArray = productTagsArray.filter(
          (value, index, self) => index === self.findIndex((t) => t.tag === value.tag)
        );

        setProductTags(productTagsArray);
        setProductList(tempProductList);
      }
      dispatch(setLocationFilter('false'));
    }
    // }
    // else {
    //     await filterProduct(lowPrice, HighPrice, resultTags, user.countryId)
    //     dispatch(setProductCount(0))
    // }
  }, [allProductList, dispatch, tempProductList, user.isUpdateLocationFilter]);

  // gets country advertisement list, other stuff?
  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        let obj = {};
        obj.userCountry = user.countryId;
        const getproductList = await productApi.list(token, obj);
        if (getproductList.data.success === true) {
          if (getproductList.data.data.length > 0) {
            // setAllProductList(getproductList.data.data)
            // let low = getproductList.data.data.reduce(
            //     (acc, loc) =>
            //         acc?.displayPrice ? acc?.displayPrice : acc.price < loc?.displayPrice ? loc?.displayPrice : loc.price
            //             ? acc
            //             : loc
            // )

            // let high = getproductList.data.data.reduce(
            //     (acc, loc) =>
            //         acc?.displayPrice ? acc?.displayPrice : acc.price > loc?.displayPrice ? loc?.displayPrice : loc.price
            //             ? acc
            //             : loc
            // )

            let min = Math.min(
              ...getproductList.data.data.map((item) =>
                item?.displayPrice ? item?.displayPrice : item.price
              )
            );
            let max = Math.max(
              ...getproductList.data.data.map((item) =>
                item?.displayPrice ? item?.displayPrice : item.price
              )
            );

            // console.log(min, max)

            setprodctFilterData({
              ...prodctFilterData,
              highestPrice: max,
              lowestPrice: min
            });

            let productTagsArray = [];
            await Promise.all(
              getproductList.data.data.map(async (p) => {
                await Promise.all(
                  p.tags.map((value) => {
                    let tempObj = {};
                    tempObj.color = p.categoryDetails.color ? p.categoryDetails.color : 'red';

                    tempObj.tag = value;
                    productTagsArray.push(tempObj);
                  })
                );
                productTagsArray.push({tag: p.campaignDetails?.name?.toLowerCase(), color: '', idOrganization: p.campaignDetails?._id});
              })
            );
            productTagsArray = productTagsArray.filter(
              (value, index, self) => index === self.findIndex((t) => t.tag === value.tag)
            );

            setProductTags(productTagsArray);
          } else {
            setProductTags([]);
          }
        }
        setPricingFees({
          ...pricingFees,
          platformFee: user.platformFee,
          transactionFee: user.transactionFee
        });
        // const getSettingsValue = await settingApi.list(userAuthToken ? userAuthToken : CampaignAdminAuthToken, Object.keys(pricingFees));

        // if (getSettingsValue.data.success) {
        //     let data = {}

        //     getSettingsValue.data.data.map((d, i) => {
        //         data[d.name] = d.value
        //     })
        //     setPricingFees({
        //         ...data
        //     })
        // }

        await getHomePageAdList();
        await getCountryAdvertisement(user.countryId, user.stateId);
        // if (user.countryId && user.stateId) {
        // }
        await getSalestax(user.countryId, user.stateId);

        const getCategoryList = await categoryApi.listCategory(token);
        if (getCategoryList.data.success === true) {
          // console.log(getCategoryList.data.data)
          setCategoryList(getCategoryList.data.data);
        }
        // await getOrganizationList()
        // await getWishListProductList()
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
      // console.log(487)

      // function getLocation() {
      // console.log(user.xp)
      //   }
    })();
  }, [user.countryId, user.stateId]);

  const checkItemInCart = async (id) => {
    let res;
    const checkItemInCart = await cartApi.checkItemInCart(userAuthToken, id);
    if (checkItemInCart) {
      if (checkItemInCart.data.success) {
        setInCart(true);
        res = true;
      } else {
        setInCart(false);
        res = false;
      }
    } else {
      setLoading(false);
      setInCart(false);
      ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
      res = false;
    }
    return res;
  };

  const getCartList = async () => {
    const getCartList = await cartApi.list(userAuthToken);
    if (getCartList.data.success === true) {
      if (getCartList.data.data.length > 0) {
        let productIds = [];
        getCartList.data.data.map((p) => {
          productIds.push(p.productId);
        });
        setCartProductIds(productIds);
      } else {
        setCartProductIds([]);
      }
    }
  };

  const addToCart = async (id) => {
    if (token) {
      if (userAuthToken) {
        setLoading(true);
        let data = {};
        data.productId = id;
        const addItemToCart = await cartApi.add(userAuthToken, data);
        if (addItemToCart) {
          if (!addItemToCart.data.success) {
            setLoading(false);
            ToastAlert({ msg: addItemToCart.data.message, msgType: 'error' });
          } else {
            setIsUpdate(!update);
            /*ToastAlert({ msg: addItemToCart.data.message, msgType: 'success' });*/
            setLoading(false);
          }
        } else {
          setLoading(false);
          ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
        }
      } else {
        setLoading(false);
        ToastAlert({ msg: 'Please Login as a User', msgType: 'error' });
      }
    } else {
      navigate('/signin');
    }
  };

  const removeCartItem = async (id) => {
    setLoading(true);
    const removeCartItem = await cartApi.removeCartProduct(userAuthToken, id);
    if (removeCartItem) {
      if (!removeCartItem.data.success) {
        setLoading(false);
        ToastAlert({ msg: removeCartItem.data.message, msgType: 'error' });
      } else {
        setIsUpdate(!update);
        /*ToastAlert({ msg: removeCartItem.data.message, msgType: 'success' });*/
        setLoading(false);
      }
    } else {
      setLoading(false);
      ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
    }
  };

  const onSelectCategory = async (e) => {
    if (e.target.checked) {
      setSeletedCategoryList([...seletedCategoryList, e.target.value]);
      // let data = {};
      // data.categoryId = [...seletedCategoryList, e.target.value]
      // await filterProduct(data)
    } else {
      let tempArry = [...seletedCategoryList];
      const index = tempArry.indexOf(e.target.value);
      if (index > -1) {
        tempArry.splice(index, 1);
        // let data = {}
        // data.categoryId = tempArry
        // await filterProduct(data)
      }

      setSeletedCategoryList(tempArry);
    }
  };

  const removeCatFromFilter = (id) => {
    let tempArry = [...seletedCategoryList];
    const index = tempArry.indexOf(id);
    if (index > -1) {
      tempArry.splice(index, 1);
    }
    setSeletedCategoryList(tempArry);
  };

  const onChangeFilterOption = (index) => {
    setSelectedKey(index);
    switch (index) {
      case 0:
        setfilters({
          ...filters,
          lowToHigh: true,
          highToLow: false,
          oldEst: false,
          newEst: false,
          leastFunded: false,
          mostFunded: false
        });

        break;
      case 1:
        setfilters({
          ...filters,
          lowToHigh: false,
          highToLow: true,
          oldEst: false,
          newEst: false,
          leastFunded: false,
          mostFunded: false
        });
        break;
      case 2:
        setfilters({
          ...filters,
          lowToHigh: false,
          highToLow: false,
          oldEst: true,
          newEst: false,
          leastFunded: false,
          mostFunded: false
        });
        break;
      case 3:
        setfilters({
          ...filters,
          lowToHigh: false,
          highToLow: false,
          oldEst: false,
          newEst: true,
          leastFunded: false,
          mostFunded: false
        });
        break;
      case 4:
        productList.sort((a, b) => {
          let firstPer = (a.soldout / a.quantity) * 100;
          let secPer = (b.soldout / b.quantity) * 100;
          return firstPer - secPer;
        });

        setfilters({
          ...filters,
          lowToHigh: false,
          highToLow: false,
          oldEst: false,
          newEst: false,
          leastFunded: true,
          mostFunded: false
        });
        break;
      case 5:
        productList.sort((a, b) => {
          let firstPer = (a.soldout / a.quantity) * 100;
          let secPer = (b.soldout / b.quantity) * 100;
          return secPer - firstPer;
        });

        setfilters({
          ...filters,
          lowToHigh: false,
          highToLow: false,
          oldEst: false,
          newEst: false,
          leastFunded: false,
          mostFunded: true
        });
        break;
      default:
        setfilters({
          ...filters,
          lowToHigh: false,
          highToLow: false,
          oldEst: false,
          newEst: true
        });
        break;
    }
  };

  const onChangePriceSlider = async (e) => {
    setfilters({
      ...filters,
      HighPrice: e[1],
      lowPrice: e[0]
    });
    // await filterProduct(e[0], e[1], search)
  };

  // request position
  useEffect(() => {
    const fetchData = async () => {
      console.log({
        taxEligible,
        postTag,
        infinite,
        seletedCategoryList,
        lowToHigh,
        highToLow,
        oldEst,
        newEst,
        userCountryId: user.countryId,
        HighPrice,
        lowPrice,
        countryAdvertisementList,
        homeadvertisementList
      });
      console.log('request position useEffect');
      setLoading(true);

      // Check if countryId exists
      if (!user.countryId) {
        console.log('~~ non-existent countryId, checking if location can be obtained:');

        if (navigator && navigator.geolocation) {
          console.log('~~ YES geolocation API exists, getting current position...');
          console.time('getCurrentPosition');

          navigator.geolocation.getCurrentPosition(
            async (position) => {
              console.log('** success callback wrapper');
              console.timeEnd('getCurrentPosition');
              showPosition(position);

              try {
                const res = await fetch('https://ipinfo.io/geo');
                if (res.status !== 200)
                  throw new Error('Error fetching geo location from ipinfo.io/geo');

                const json = await res.json();
                console.log('~~ ~~ ~~ ipinfo.io response:', { res, json });

                const [latitude, longitude] = json.loc.split(',');
                const backupPosition = {
                  coords: {
                    latitude,
                    longitude
                  }
                };
                showPosition(backupPosition);
              } catch (error) {
                // Changed from backupError to error
                console.log('~~ ~~ ~~ ipinfo.io ERROR:', { error });
                showError(error);
              }
            },
            async (error) => {
              // Changed from backupError to error
              console.log('** error callback wrapper, attempting ipinfo.io lookup');
              console.timeEnd('getCurrentPosition');

              try {
                const res = await fetch('https://ipinfo.io/geo');
                if (res.status !== 200)
                  throw new Error('Error fetching geo location from ipinfo.io/geo');

                const json = await res.json();
                console.log('~~ ~~ ~~ ipinfo.io response:', { res, json });

                const [latitude, longitude] = json.loc.split(',');
                const backupPosition = {
                  coords: {
                    latitude,
                    longitude
                  }
                };
                showPosition(backupPosition);
              } catch (error) {
                // Changed from backupError to error
                console.log('~~ ~~ ~~ ipinfo.io ERROR:', { error });
                showError(error);
              }
            },
            {
              maximumAge: 1000 * 60 * 60 * 24,
              timeout: 10000
            }
          );
        } else {
          console.log('~~ NO geolocation API is NOT available, setting a default position:');
          // fallback; if no geolocation available, set it to a default
          const countryId = userAuthToken ? userData.country_id : CampaignAdmin.country_id;
          console.log('~~ ~~ userAuthToken', userAuthToken);
          console.log('~~ ~~ countryId', countryId);
          dispatch(setUserCountry(countryId));
        }
      } else {
        console.log('~~ countryId EXISTS, filtering products');
        // We have the country, so filter the products
        await filterProduct(lowPrice, HighPrice, resultTags, user.countryId);
      }

      console.log('(advertisement starts, building ad lists)', {
        countryAdvertisementList,
        homeadvertisementList
      });
      setLoading(false);


      // Now filter the advertisement list
      let arr = [];
      if (countryAdvertisementList.length > 0) {
        arr = arr.concat(countryAdvertisementList);
      }
      if (homeadvertisementList.length > 0) {
        arr = arr.concat(homeadvertisementList);
      }
      if (arr.length > 0) {
        setAdvertisementList(arrayUnique(arr));
      }
    };

    fetchData();
  }, [
    taxEligible,
    postTag,
    infinite,
    seletedCategoryList,
    lowToHigh,
    highToLow,
    oldEst,
    newEst,
    user.countryId,
    HighPrice,
    lowPrice,
    countryAdvertisementList,
    homeadvertisementList
  ]);

  const filterProduct = async (
    low_price = lowPrice,
    high_price = HighPrice,
    search_product = resultTags,
    // userCountry = user.countryId
    // Set to null so that filters don't automatically apply for location on load:
    userCountry = null
  ) => {
    // console.log('first')
    try {
      let data = {};

      const realTag = search_product.filter((value) => productTags.find((t) => t.tag === value)?.idOrganization == null);
      const organizationTags = search_product.map(value => productTags.find((t) => t.tag === value)?.idOrganization).filter((value) => value);
      data.search = realTag;
      data.searchOrganization = organizationTags;

      data.categoryId = seletedCategoryList;

      data.tax = taxEligible;
      data.postTag = postTag;
      data.infinite = infinite;

      data.lowToHigh = lowToHigh;
      data.highToLow = highToLow;
      data.oldEst = oldEst;
      data.newEst = newEst;

      // Don't include userCountry if it's not explicitly passed or set to null
      if (userCountry) {
        data.userCountry = userCountry;
      }

      // console.log(userCountry)

      // data.leastFunded = leastFunded
      // data.mostFunded = mostFunded

      // console.log(search_product)

      data.HighPrice = high_price;
      data.lowPrice = low_price;
      setLoading(true);
      const getFilteredProductList = await productApi.productFilter(token, data);
      setLoading(false);

      if (getFilteredProductList.data.success === true) {
        // console.log(getFilteredProductList.data.data)
        setProductList(getFilteredProductList.data.data);
        setAllProductList(getFilteredProductList.data.data);
        if (user.locationProductCount > 0) {
          dispatch(setLocationFilter('true'));
        }

        // if (getFilteredProductList.data.data.length > 0) {
        //     let productTagsArray = []
        //     getFilteredProductList.data.data.map((p, i) => {
        //         // console.log(p)

        //         let tempObj = {}
        //         tempObj.color = p.categoryDetails.color
        //         // console.log(p.tags.split(','))
        //         p.tags.split(',').map((value, i) => {
        //             if (productTagsArray.indexOf(value) === -1) {

        //                 tempObj.tag = value
        //                 productTagsArray.push(tempObj);
        //             }

        //         })
        //     })
        //     productTagsArray = productTagsArray.filter((value, index, self) =>
        //         index === self.findIndex((t) => (
        //             t.tag === value.tag
        //         ))
        //     )
        //     setProductTags(productTagsArray)

        // } else {
        //     setProductTags([])
        // }

        // if (getFilteredProductList.data.data.length > 0) {
        //     let tempArray = []
        //     getFilteredProductList.data.data.map((p, i) => {
        //         // if (p.campaignDetails.country_id === user.countryId) {

        //         tempArray.push(p)
        //         // }

        //     })
        //     setProductList(tempArray)

        // }
      } else {
        // setLoading(false)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSearchProduct = async (e, type) => {
    setSuggestionTag('');

    let value = e.target.value;

    setfilters({
      ...filters,
      search: value
    });
    // console.log(value)

    // console.log(productTags)

    if (value) {
      let tempPtag = [...productTags];
      let tags = tempPtag
        .sort((a, b) => {
          if (a.tag < b.tag) {
            return -1;
          }
          if (a.tag > b.tag) {
            return 1;
          }
          return 0;
        })
        .filter((option) => option.tag.startsWith(value));

      // console.log(tags)

      if (tags.length > 0) {
        let tag = tags[0];
        // console.log(tag)

        setSuggestionTag(tag.tag);

        let t = tag ? [...searchTag, tag] : [...searchTag];

        t = t.filter((value, index, self) => index === self.findIndex((t) => t.tag === value.tag));

        if (type === 'keydown') {
          if (e.key === 'Enter') {
            setSearchTag(t);
            setfilters({
              ...filters,
              search: ''
            });
            setSuggestionTag('');

            let finalArray = [];
            if (t.length > 0) {
              t.map((t1) => {
                finalArray.push(t1.tag);
              });
            }
            setresultTags(finalArray);
            // console.log(finalArray)

            setLoading(true);
            await filterProduct(lowPrice, HighPrice, finalArray, user.countryId);
            setLoading(false);
          }
        }
      } else {
        setSuggestionTag('');
      }
    } else {
      setSuggestionTag('');
    }

    // setSearchTag(productTags.sort(function (a, b) {
    //     if (a.tag < b.tag) { return -1; }
    //     if (a.tag > b.tag) { return 1; }
    //     return 0;
    // }).filter(option => option.tag.startsWith(value))[0])

    // console.log(productTags.startsWith(value))
    // console.log(productList.filter(e => e.tags.includes('car')))

    // await filterProduct(lowPrice, HighPrice, value, user.countryId)
  };

  const deSelectTag = async (id) => {
    const findIndex = searchTag.findIndex((a) => a.tag === id);
    let tags = [...searchTag];
    if (findIndex !== -1) tags.splice(findIndex, 1);

    setfilters({
      ...filters,
      search: ''
    });
    setSuggestionTag('');
    setSearchTag(tags);

    let finalArray = [];
    if (tags.length > 0) {
      tags.map((t1) => {
        finalArray.push(t1.tag);
      });
    }
    setresultTags(finalArray);

    setLoading(true);
    await filterProduct(lowPrice, HighPrice, finalArray, user.countryId);
    setLoading(false);
  };

  const onChangeDonatePrice = async (e) => {
    let value = e.target.value.replace(/[^\d.]|\.(?=.*\.)/g, '');
    setPrice(value);
    if (Number(value) > 0) {
      let p_ids = {};

      let cart = [];
      let cartTotal = 0;
      // let p = productList.filter(e => getCalc.getData(e.price) < value)
      let p = productList.filter((e) => Number(e.displayPrice ? e.displayPrice : e.price) < value);

      if (p.length > 0) {
        p.map((itm) => {
          let price1 = Number(itm.displayPrice ? itm.displayPrice : itm.price);
          // if (value > cartTotal + getCalc.getData(itm.price)) {
          if (value > cartTotal + price1) {
            //     cart.push(itm._id)
            //     setCartProductList(cart)
            //     // cartTotal += getCalc.getData(itm.price)
            //     cartTotal += price1
            // }
            if (itm.unlimited) {
              if (value > cartTotal + price1 * 2) {
                cart.push(itm._id);
                cart.push(itm._id);
                setCartProductList(cart);
                // cartTotal += getCalc.getData(itm.price)
                cartTotal += price1 * 2;
              }
            } else {
              // let counts = {};
              // cart.forEach(function (x) { counts[x] = (counts[x] || 0) + 1 })
              let checkQ = Number(itm.quantity) - Number(itm.soldout);
              if (!p_ids[itm._id]) {
                p_ids[itm._id] = 1;
              }

              // if (Number(counts[itm._id] ? counts[itm._id] : 0) < checkQ) {
              if (p_ids[itm._id] < checkQ) {
                if (p_ids[itm._id]) {
                  p_ids[itm._id] += 1;
                } else {
                  p_ids[itm._id] = 1;
                }

                cart.push(itm._id);

                setCartProductList(cart);
                // cartTotal += getCalc.getData(itm.price)
                cartTotal += price1;
              }
            }
          }
        });

        if (value - cartTotal > 0) {
          p = productList?.filter(
            (e) =>
              !e.unlimited &&
              Number(e?.displayPrice ? e?.displayPrice : e?.price) < value - cartTotal &&
              p_ids[e._id] < Number(e?.quantity) - Number(e?.soldout)
          );

          let p2 = productList?.filter(
            (e) =>
              Number(e?.displayPrice ? e?.displayPrice : e?.price) < value - cartTotal &&
              e.unlimited
          );

          if (!p.length) {
            p = p2;
          } else {
            p = p?.concat(p2);
          }

          while (p.length > 0) {
            // let price2 = Number(e.displayPrice ? e.displayPrice : e.price)
            // p = productList.filter(e => getCalc.getData(e.price) < value - cartTotal)
            // p = productList.filter(e => Number(e.displayPrice ? e.displayPrice : e.price) < value - cartTotal)
            p = productList?.filter(
              (e) =>
                !e.unlimited &&
                Number(e?.displayPrice ? e?.displayPrice : e?.price) < value - cartTotal &&
                p_ids[e._id] < Number(e?.quantity) - Number(e?.soldout)
            );

            let p2 = productList?.filter(
              (e) =>
                Number(e?.displayPrice ? e?.displayPrice : e?.price) < value - cartTotal &&
                e.unlimited
            );

            if (!p.length) {
              p = p2;
            } else {
              p = p?.concat(p2);
            }

            if (p.length > 0) {
              p.map((itm) => {
                let price3 = itm.displayPrice ? itm.displayPrice : itm.price;
                // if (value > cartTotal + getCalc.getData(itm.price)) {
                if (value > cartTotal + price3) {
                  //     cart.push(itm._id)
                  //     setCartProductList(cart)
                  //     // cartTotal += getCalc.getData(itm.price)
                  //     cartTotal += price3

                  // }

                  if (itm.unlimited) {
                    if (value > cartTotal + price3) {
                      cart.push(itm._id);
                      // cart.push(itm._id)
                      setCartProductList(cart);
                      // cartTotal += getCalc.getData(itm.price)
                      cartTotal += price3;
                    }
                  } else {
                    // let counts = {}
                    // cart.forEach(function (x) { counts[x] = (counts[x] || 0) + 1 })
                    let checkQ = Number(itm.quantity) - Number(itm.soldout);
                    // if (!p_ids[itm._id]) {
                    //     p_ids[itm._id] = 1
                    // }
                    if (p_ids[itm._id] < checkQ) {
                      if (p_ids[itm._id]) {
                        p_ids[itm._id] += 1;
                      } else {
                        p_ids[itm._id] = 1;
                      }
                      // if (Number(counts[itm._id] ? counts[itm._id] : 0) < checkQ) {

                      cart.push(itm._id);

                      setCartProductList(cart);
                      // cartTotal += getCalc.getData(itm.price)
                      cartTotal += price3;
                    }
                  }
                }
              });
            }
          }
        }
      } else {
        setCartProductList([]);
      }
    } else {
      setCartProductList([]);
    }
  };

  const onClickAddToCart = async () => {
    if (token) {
      if (cartProductList.length > 0) {
        let data = {};
        let tempArray = [];
        cartProductList.map((itm) => {
          let tempobj = {};
          if (tempArray.some((e) => e.productId === itm)) {
            let objIndex = tempArray.findIndex((obj) => obj.productId === itm);
            tempArray[objIndex].qty += 1;
          } else {
            tempobj.productId = itm;
            tempobj.qty = 1;
            tempArray.push(tempobj);
          }
        });

        data.productIds = tempArray;
        setLoading(false);
        const addMultiple = await cartApi.addMultiple(token, data);

        if (addMultiple) {
          if (!addMultiple.data.success) {
            setLoading(false);
            ToastAlert({ msg: addMultiple.data.message, msgType: 'error' });
          } else {
            setIsUpdate(!update);
            dispatch(setIsUpdateCart(!user.isUpdateCart));
            setCartProductList([]);
            setPrice('');
            /*ToastAlert({ msg: addMultiple.data.message, msgType: 'success' });*/
            setLoading(false);
          }
        } else {
          setLoading(false);
          ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
        }
      }
    } else {
      navigate('/signin');
    }
  };

  const onSearchKeyUp = debounce(async (e) => {
    setSearchValue(e.target.value.trim()?.toLowerCase());
  }, 1000)

  return (
    <>
      {/* {console.log(user)} */}

      <Page
        title="Donorport | Home"
        description="The world's first and largest crowd-funding platform for non-profits & charities. Donate directly to the needs of the organization and help them fund all of their material needs"
      >
        <Index
          productList={productList}
          showTopPick={true}
          addToCart={addToCart}
          removeCartItem={removeCartItem}
          checkItemInCart={checkItemInCart}
          pricingFees={pricingFees}
          organizationList={organizationList}
          categoryList={categoryList}
          onSelectCategory={onSelectCategory}
          seletedCategoryList={seletedCategoryList}
          removeCatFromFilter={removeCatFromFilter}
          filterProduct={filterProduct}
          setfilters={setfilters}
          filters={filters}
          onClickFilter={onClickFilter}
          selectedKey={selectedKey}
          setSelectedKey={setSelectedKey}
          onChangeFilterOption={onChangeFilterOption}
          onChangePriceSlider={onChangePriceSlider}
          onSearchProduct={onSearchProduct}
          advertisementList={advertisementList}
          module="HOME"
          addProductToWishlist={addProductToWishlist}
          wishListproductIds={wishListproductIds}
          price={price}
          onChangeDonatePrice={onChangeDonatePrice}
          cartProductList={cartProductList}
          onClickAddToCart={onClickAddToCart}
          cartProductIds={cartProductIds}
          searchTag={searchTag}
          deSelectTag={deSelectTag}
          suggestionTag={suggestionTag}
          prodctFilterData={prodctFilterData}
          onSearchKeyUp={onSearchKeyUp}
          loading={loading}
        />
      </Page>
    </>
  );
}
