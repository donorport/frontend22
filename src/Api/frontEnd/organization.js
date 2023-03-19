import axios from 'axios';
import helper from '../../Common/Helper';

function organization() {
  const details = async (slug) => {
    let res = {};
    await axios({
      method: 'post',
      url: `${helper.ApiUrl}organization/details`,
      responseType: 'json',
      headers: {
        // "x-access-token": authToken,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        withCredentials: true,
        mode: 'no-cors'
      },
      data: {
        slug: slug
      }
    }).then((response) => {
      res = response;
    });
    return res;
  };

  const organizationPurchasedItemHistory = async (authToken, organizationId) => {
    let res = {};
    await axios({
      method: 'post',
      url: `${helper.ApiUrl}campaign_admin/purchase_history`,
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
        organizationId: organizationId
      }
    }).then((response) => {
      res = response;
    });
    return res;
  };

  const donate = async (authToken, data) => {
    let res = {};
    await axios({
      method: 'post',
      url: `${helper.ApiUrl}campaign_admin/donate`,
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

  const organizationDonatedItemHistory = async (authToken, organizationId) => {
    let res = {};
    await axios({
      method: 'post',
      url: `${helper.ApiUrl}campaign_admin/donate_history`,
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
        organizationId: organizationId
      }
    }).then((response) => {
      res = response;
    });
    return res;
  };

  const organizatationTaxlist = async (authToken, data) => {
    let res = {};
    await axios({
      method: 'post',
      url: `${helper.ApiUrl}organization/tax`,
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

  const organizatationTaxUpload = async (authToken, cdata) => {
    const data = new FormData();
    data.append('image', cdata.image);
    data.append('orderId', cdata.orderId);
    data.append('email', cdata.email);
    data.append('name', cdata.name);
    data.append('organizationName', cdata.organizationName);
    data.append('organizationCountryId', cdata.organizationCountryId);
    data.append('userId', cdata.userId);
    data.append('uploadYear', cdata.uploadYear);

    let res = {};
    await axios({
      method: 'post',
      url: `${helper.ApiUrl}organization/receipt/upload`,
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

  const organizatationDeleteTaxReceipt = async (authToken, userId, uploadYear) => {
    let res = {};
    await axios({
      method: 'delete',
      url: `${helper.ApiUrl}organization/receipt/delete/${userId}/${uploadYear}`,
      responseType: 'json',
      headers: {
        'x-access-token': authToken,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        withCredentials: true,
        mode: 'no-cors',
      }
    }).then((response) => {
      res = response;
    });
    return res;
  };

  const inviteTeamMember = async (authToken, data) => {
    let res = {};
    await axios({
      method: 'post',
      url: `${helper.ApiUrl}team_member/invite`,
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

  const listTeamMember = async (authToken) => {
    let res = {};
    await axios({
      method: 'get',
      url: `${helper.ApiUrl}team_member/list`,
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

  const removeTeamMember = async (authToken, id) => {
    let res = {};
    await axios({
      method: 'delete',
      url: `${helper.ApiUrl}team_member/remove/` + id,
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

  const teamMemberOrganizationList = async (authToken) => {
    let res = {};
    await axios({
      method: 'get',
      url: `${helper.ApiUrl}team_member/organization/list`,
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

  const teamMemberActivation = async (authToken, data) => {
    let res = {};
    await axios({
      method: 'post',
      url: `${helper.ApiUrl}team_member/activate`,
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

  const listUserTeamMember = async (authToken) => {
    let res = {};
    await axios({
      method: 'get',
      url: `${helper.ApiUrl}user/team_member/list`,
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

  const getPaymentHistory = async (authToken, data) => {
    let res = {};
    await axios({
      method: 'post',
      url: `${helper.ApiUrl}campaign_admin/payment_history`,
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

  const getDonationDetails = async (authToken, data) => {
    let res = {};
    await axios({
      method: 'post',
      url: `${helper.ApiUrl}donationDetails`,
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

  const updateSalesTax = async (authToken, data) => {
    let res = {};
    await axios({
      method: 'post',
      url: `${helper.ApiUrl}campaign_admin/salesTax`,
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
    details,
    organizationPurchasedItemHistory,
    donate,
    organizationDonatedItemHistory,
    organizatationTaxlist,
    organizatationTaxUpload,
    inviteTeamMember,
    listTeamMember,
    removeTeamMember,
    teamMemberOrganizationList,
    teamMemberActivation,
    listUserTeamMember,
    getPaymentHistory,
    getDonationDetails,
    updateSalesTax,
    organizatationDeleteTaxReceipt
  };
}
const organizationApi = organization();
export default organizationApi;
