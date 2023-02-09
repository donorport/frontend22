import axios from 'axios';
import helper from '../../Common/Helper';

function user() {
  const updateProfile = async (authToken, cdata) => {
    const data = new FormData();
    data.append('name', cdata.name);
    data.append('street', cdata.street);
    data.append('zip', cdata.zip);
    data.append('city_id', cdata.city_id);
    data.append('state_id', cdata.state_id);
    data.append('country_id', cdata.country_id);

    // data.append('currency', cdata.currency);
    // data.append('language', cdata.language);

    if (cdata.image) {
      data.append('image', cdata.image);
    }
    // data.append('description', cdata.description);
    // data.append('twitter', cdata.twitter);
    // data.append('facebook', cdata.facebook);
    // data.append('linkedin', cdata.linkedin);
    // data.append('url', cdata.url);
    // data.append('country_id', cdata.country_id);
    // data.append('city_id', cdata.city_id);
    // data.append('state_id', cdata.state_id);
    // data.append('address', cdata.address);
    // data.append('category_id', cdata.category_id);
    // data.append('headline', cdata.headline);
    // data.append('promoVideo', cdata.promoVideo);
    let res = {};
    await axios({
      method: 'post',
      url: `${helper.ApiUrl}user/update_profile`,
      responseType: 'json',
      headers: {
        'x-access-token': authToken,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        withCredentials: true,
        mode: 'no-cors'
      },
      data: data
    }).then((response) => {
      res = response;
    });
    return res;
  };
  
  const updatePassword = async (authToken, data) => {
    let res = {};
    await axios({
      method: 'post',
      url: `${helper.ApiUrl}user/update_password`,
      responseType: 'json',
      headers: {
        'x-access-token': authToken,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        withCredentials: true,
        mode: 'no-cors'
      },
      data: data
    }).then((response) => {
      res = response;
    });
    return res;
  };

  const getUserDetails = async (authToken) => {
    let res = {};
    await axios({
      method: 'get',
      url: `${helper.ApiUrl}user/details`,
      responseType: 'json',
      headers: {
        'x-access-token': authToken,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        withCredentials: true,
        mode: 'no-cors'
      }
    }).then((response) => {
      res = response;
    });
    return res;
  };

  const getUserOrderDetails = async (authToken, pageNo) => {
    let res = {};
    await axios({
      method: 'post',
      url: `${helper.ApiUrl}user/orders`,
      responseType: 'json',
      headers: {
        'x-access-token': authToken,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        withCredentials: true,
        mode: 'no-cors'
      },
      data: {
        pageNo: pageNo
      }
    }).then((response) => {
      res = response;
    });
    return res;
  };

  const userOrderItemslist = async (authToken, data) => {
    let res = {};
    await axios({
      method: 'post',
      url: `${helper.ApiUrl}user/order_items`,
      responseType: 'json',
      headers: {
        'x-access-token': authToken,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        withCredentials: true,
        mode: 'no-cors'
      },
      data: data
    }).then((response) => {
      res = response;
    });
    return res;
  };

  const userTaxlist = async (authToken, data) => {
    let res = {};
    await axios({
      method: 'post',
      url: `${helper.ApiUrl}user/tax`,
      responseType: 'json',
      headers: {
        'x-access-token': authToken,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        withCredentials: true,
        mode: 'no-cors'
      },
      data: data
    }).then((response) => {
      res = response;
    });
    return res;
  };

  const applyPartership = async (data) => {
    let res = {};
    await axios({
      method: 'post',
      url: `${helper.ApiUrl}partnership`,
      responseType: 'json',
      headers: {
        // "x-access-token": authToken,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        withCredentials: true,
        mode: 'no-cors'
      },
      data: data
    }).then((response) => {
      res = response;
    });
    return res;
  };

  const userXpEarnlist = async (authToken, data) => {
    let res = {};
    await axios({
      method: 'post',
      url: `${helper.ApiUrl}user/xp`,
      responseType: 'json',
      headers: {
        'x-access-token': authToken,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        withCredentials: true,
        mode: 'no-cors'
      },
      data: data
    }).then((response) => {
      res = response;
    });
    return res;
  };

  const getUserRank = async (authToken) => {
    let res = {};
    await axios({
      method: 'get',
      url: `${helper.ApiUrl}user/rank`,
      responseType: 'json',
      headers: {
        'x-access-token': authToken,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        withCredentials: true,
        mode: 'no-cors'
      }
    }).then((response) => {
      res = response;
    });
    return res;
  };

  const getUserPaymentHistory = async (authToken) => {
    let res = {};
    await axios({
      method: 'get',
      url: `${helper.ApiUrl}user/payment_history`,
      responseType: 'json',
      headers: {
        'x-access-token': authToken,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        withCredentials: true,
        mode: 'no-cors'
      }
    }).then((response) => {
      res = response;
    });
    return res;
  };

  const deleteUser = async (authToken, id) => {
    let res = {};
    await axios({
      method: 'delete',
      url: `${helper.ApiUrl}user/${id}`,
      responseType: 'json',
      headers: {
        'x-access-token': authToken,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        withCredentials: true,
        mode: 'no-cors'
      }
    }).then((response) => {
      res = response;
    });
    return res;
  };

  const getUserHighXpList = async (authToken, data) => {
    let res = {};
    await axios({
      method: 'post',
      url: `${helper.ApiUrl}user/highXp`,
      responseType: 'json',
      headers: {
        'x-access-token': authToken,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        withCredentials: true,
        mode: 'no-cors'
      },
      data: data
    }).then((response) => {
      res = response;
    });
    return res;
  };

  return {
    updateProfile,
    updatePassword,
    getUserDetails,
    getUserOrderDetails,
    userOrderItemslist,
    userTaxlist,
    applyPartership,
    userXpEarnlist,
    getUserRank,
    getUserPaymentHistory,
    deleteUser,
    getUserHighXpList
  };
}
const userApi = user();
export default userApi;
