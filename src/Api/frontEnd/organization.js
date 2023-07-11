import axios from 'axios';
import helper from '../../Common/Helper';

function organization() {
  const details = async (slug) => {
    return axios({
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
    });
  };

  const organizationPurchasedItemHistory = async (authToken, organizationId) => {
    return axios({
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
    });
  };

  const donate = async (authToken, data) => {
    return axios({
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
    });
  };

  const organizationDonatedItemHistory = async (authToken, organizationId) => {
    return axios({
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
    });
  };

  const organizatationTaxlist = async (authToken, data) => {
    return axios({
      method: 'post', // why is this a POST?
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
    });
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

    return axios({
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
    });
  };

  const organizatationDeleteTaxReceipt = async (authToken, userId, uploadYear) => {
    return axios({
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
    });
  };

  const inviteTeamMember = async (authToken, data) => {
    return axios({
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
    });
  };

  const listTeamMember = async (authToken) => {
    return axios({
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
    });
  };

  const removeTeamMember = async (authToken, id) => {
    return axios({
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
    });
  };

  const teamMemberOrganizationList = async (authToken) => {
    return axios({
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
    });
  };

  const teamMemberActivation = async (authToken, data) => {
    return axios({
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
    });
  };

  const listUserTeamMember = async (authToken) => {
    return axios({
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
    });
  };

  const getPaymentHistory = async (authToken, data) => {
    return axios({
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
    });
  };

  const getDonationDetails = async (authToken, data) => {
    return axios({
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
    });
  };

  const updateSalesTax = async (authToken, data) => {
    return axios({
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
    });
  };

  const getDonationsByUserId = (authToken, data) => {
    return axios({
      method: 'get',
      url: `${helper.ApiUrl}donations/${data.userId}`,
      responseType: 'json',
      headers: {
        'x-access-token': authToken,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        withCredentials: true,
        mode: 'no-cors'
      }
    });
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
    organizatationDeleteTaxReceipt,
    getDonationsByUserId,
  };

}

const organizationApi = organization();
export default organizationApi;
