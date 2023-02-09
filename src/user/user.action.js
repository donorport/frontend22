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
  SET_ZOOM_LEVEL
} from './user.types';

export const setCurrency = (data) => ({
  type: UPDATE_CURRENCY,
  payload: data
});

export const setIsUpdateCart = (val) => ({
  type: UPDATE_CART,
  payload: val
});

export const setIsUpdateOrganization = (val) => ({
  type: UPDATE_ORGANIZATION,
  payload: val
});

export const setIsUpdateUserDetails = (val) => ({
  type: UPDATE_USER_DETAILS,
  payload: val
});

export const setFees = (data) => ({
  type: UPDATE_FEES,
  payload: data
});

export const setUserLanguage = (val) => ({
  type: UPDATE_USER_LANGUAGE,
  payload: val
});

export const setUserRole = (val) => ({
  type: SET_USER_ROLE,
  payload: val
});

export const setCurrencyPrice = (val) => ({
  type: UPDATE_CURRENCY_PRICE,
  payload: val
});

export const setProfileImage = (val) => ({
  type: SET_PROFILE_IMAGE,
  payload: val
});

export const setUserCountry = (val) => ({
  type: SET_USER_COUNTRY,
  payload: val
});

export const setUserState = (val) => ({
  type: UPDATE_STATEID,
  payload: val
});

export const setUserAddress = (data) => ({
  type: SET_USER_ADDRESS,
  payload: data
});

export const setUserXp = (val) => ({
  type: UPDATE_XP,
  payload: val
});

export const setUserCountrySort = (val) => ({
  type: SET_CURRENT_COUNTRY_SORT,
  payload: val
});

export const setSalesTax = (val) => ({
  type: UPDATE_SALES_TAX,
  payload: val
});

export const setIsActiveOrg = (val) => ({
  type: ACTIVE_ORGANIZATION,
  payload: val
});

export const setUserRank = (val) => ({
  type: UPDATE_RANK,
  payload: val
});

export const setDistance = (val) => ({
  type: SET_DISTANCE,
  payload: val
});

export const setProductCount = (val) => ({
  type: UPDATE_PRODUCT_COUNT,
  payload: val
});

export const setSlider = (val) => ({
  type: SET_CHANGE_SLIDER,
  payload: val
});

export const setMapLock = (val) => ({
  type: SET_SET_MAP_LOCK,
  payload: val
});

export const setLocationFilter = (val) => ({
  type: SET_LOCATION_FILTER,
  payload: val
});

export const setLatLong = (data) => ({
  type: UPDATE_LAT_LONG,
  payload: data
});

export const setZoomLevel = (data) => ({
  type: SET_ZOOM_LEVEL,
  payload: data
});

export const setIsAccountAdd = (val) => ({
  type: SET_ACCOUNT_ADD,
  payload: val
});

export const setLogout = () => ({
  type: LOGOUT
});
