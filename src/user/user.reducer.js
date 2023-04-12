import {
  UPDATE_CURRENCY,
  UPDATE_CART,
  UPDATE_ORGANIZATION,
  UPDATE_USER_DETAILS,
  UPDATE_FEES,
  UPDATE_USER_LANGUAGE,
  UPDATE_CURRENCY_PRICE,
  LOGOUT,
  SET_PROFILE_IMAGE,
  SET_USER_COUNTRY,
  SET_USER_ADDRESS,
  UPDATE_XP,
  UPDATE_RANK,
  UPDATE_STATEID,
  UPDATE_SALES_TAX,
  ACTIVE_ORGANIZATION,
  SET_USER_ROLE,
  SET_CURRENT_COUNTRY_SORT,
  SET_DISTANCE,
  UPDATE_LAT_LONG,
  UPDATE_PRODUCT_COUNT,
  SET_LOCATION_FILTER,
  SET_SET_MAP_LOCK,
  SET_CHANGE_SLIDER,
  SET_ACCOUNT_ADD,
  SET_ZOOM_LEVEL,
  SET_All_ADS,
} from './user.types';

import userInitialState from './user.initialstate';

const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case UPDATE_CURRENCY:
      return {
        ...state,
        currencySymbol: action.payload.currencySymbol,
        currency: action.payload.currency
      };

    case UPDATE_CART:
      return {
        ...state,
        isUpdateCart: action.payload
      };

    case UPDATE_ORGANIZATION:
      return {
        ...state,
        isUpdateOrg: action.payload
      };

    case UPDATE_USER_DETAILS:
      return {
        ...state,
        isUpdateUserDetails: action.payload
      };

    case UPDATE_FEES:
      return {
        ...state,
        transactionFee: action.payload.transactionFee,
        platformFee: action.payload.platformFee
      };

    case UPDATE_USER_LANGUAGE:
      return {
        ...state,
        userLanguage: action.payload
      };

    case UPDATE_CURRENCY_PRICE:
      return {
        ...state,
        pricePerCurrency: action.payload
      };

    case SET_PROFILE_IMAGE:
      return {
        ...state,
        profileImage: action.payload
      };

    case SET_USER_COUNTRY:
      return {
        ...state,
        countryId: action.payload
      };

    case UPDATE_STATEID:
      return {
        ...state,
        stateId: action.payload
      };

    case SET_All_ADS:
      return {
        ...state,
        allAds: action.payload
      };
    case SET_USER_ADDRESS:
      return {
        ...state,
        countryName: action.payload.countryName,
        stateName: action.payload.stateName,
        cityName: action.payload.cityName,
        zip: action.payload.zip,
        lat: action.payload.lat,
        lng: action.payload.lng,
        area: action.payload.area,
        countrySortName: action.payload.countrySortName
      };

    case UPDATE_XP:
      return {
        ...state,
        xp: action.payload
      };
    case SET_CURRENT_COUNTRY_SORT:
      return {
        ...state,
        countrySortName: action.payload
      };
    case UPDATE_RANK:
      return {
        ...state,
        rank: action.payload
      };

    case UPDATE_SALES_TAX:
      return {
        ...state,
        salesTax: action.payload
      };

    case ACTIVE_ORGANIZATION:
      return {
        ...state,
        isActiveOrg: action.payload
      };

    case SET_USER_ROLE:
      return {
        ...state,
        role: action.payload
      };
    case SET_DISTANCE:
      return {
        ...state,
        distance: action.payload
      };

    case UPDATE_LAT_LONG:
      return {
        ...state,
        lat: action.payload.lat,
        lng: action.payload.lng
      };

    case SET_ZOOM_LEVEL:
      return {
        ...state,
        zoom: action.payload
      };

    case SET_LOCATION_FILTER:
      return {
        ...state,
        isUpdateLocationFilter: action.payload
      };

    case UPDATE_PRODUCT_COUNT:
      return {
        ...state,
        locationProductCount: action.payload
      };
    case SET_SET_MAP_LOCK:
      return {
        ...state,
        isMapLocked: action.payload
      };

    case SET_CHANGE_SLIDER:
      return {
        ...state,
        ischangeSlider: action.payload
      };
    case SET_ACCOUNT_ADD:
      return {
        ...state,
        isAccountAdded: action.payload
      };

    case LOGOUT:
      localStorage.clear();
      return {
        ...state,
        isLoggedIn: false,
        isUpdateCart: false,
        isUpdateOrg: false,
        isUpdateUserDetails: false,
        isActiveOrg: false,
        // transactionFee: 0,
        // platformFee: 0,
        // currency: '',
        // currencySymbol: '',
        userLanguage: 'english',
        pricePerCurrency: 0,
        profileImage: '',
        // countryId: "",
        // stateId: "",
        countryName: '',
        stateName: '',
        cityName: '',
        zip: '',
        area: '',
        zoom: 0,
        xp: 0,
        rank: '',
        salesTax: '',
        role: '',
        distance: '',
        isUpdateLocationFilter: 'false',
        locationProductCount: 0,
        isMapLocked: false,
        ischangeSlider: false,
        isAccountAdded: false
      };

    default:
      return state;
  }
};

export default userReducer;
