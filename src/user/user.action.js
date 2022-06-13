import { UPDATE_CURRENCY, UPDATE_CART, UPDATE_ORGANIZATION, UPDATE_USER_DETAILS, UPDATE_FEES, UPDATE_USER_LANGUAGE, UPDATE_CURRENCY_PRICE, LOGOUT, SET_PROFILE_IMAGE, SET_USER_COUNTRY, SET_USER_ADDRESS, UPDATE_XP,UPDATE_RANK,UPDATE_STATEID } from "./user.types"

export const setCurrency = (data) => ({
    type: UPDATE_CURRENCY,
    payload: data,
});

export const setIsUpdateCart = (val) => ({
    type: UPDATE_CART,
    payload: val,
});

export const setIsUpdateOrganization = (val) => ({
    type: UPDATE_ORGANIZATION,
    payload: val,
});

export const setIsUpdateUserDetails = (val) => ({
    type: UPDATE_USER_DETAILS,
    payload: val,
});

export const setFees = (data) => ({
    type: UPDATE_FEES,
    payload: data,
});

export const setUserLanguage = (val) => ({
    type: UPDATE_USER_LANGUAGE,
    payload: val,
});

export const setCurrencyPrice = (val) => ({
    type: UPDATE_CURRENCY_PRICE,
    payload: val,
});

export const setProfileImage = (val) => ({
    type: SET_PROFILE_IMAGE,
    payload: val,
});

export const setUserCountry = (val) => ({
    type: SET_USER_COUNTRY,
    payload: val,
});

export const setUserState = (val) => ({
    type: UPDATE_STATEID,
    payload: val,
});

export const setUserAddress = (data) => ({
    type: SET_USER_ADDRESS,
    payload: data,
});
export const setUserXp = (val) => ({
    type: UPDATE_XP,
    payload: val,
});


export const setUserRank = (val) => ({
    type: UPDATE_RANK,
    payload: val,
});

export const setLogout = () => ({
    type: LOGOUT,
});
