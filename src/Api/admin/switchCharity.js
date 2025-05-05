import axios from 'axios';
import getAdminAuthToken from './getAdminAuthToken';
import helper from '../../Common/Helper';

async function switchCharity(charityId) {
  const baseLocation = window.location.origin;
  let [authToken, suToken] = getAdminAuthToken(); // super user token
  let res = null;

  const response = await axios({
    method: 'get',
    url: `${helper.ApiUrl}campaign_admin/switch-charty/${charityId}`,
    responseType: 'json',
    headers: {
      'x-access-token': authToken,
      'x-su-token': suToken,
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      withCredentials: true,
      mode: 'no-cors'
    }
  });

  if (response.status === 200) {
    suToken = response.data.token.suToken;
    authToken = response.data.token.authToken;

    const campaignAdmin = response.data.data;
    localStorage.setItem('CampaignAdminAuthToken', authToken);
    localStorage.setItem('suToken', suToken);
    localStorage.setItem('CampaignAdmin', JSON.stringify(campaignAdmin));
    window.location.href = baseLocation + '/campaign/' + campaignAdmin.slug + '/posts';
  } else {
    console.error('Error switching charity:', response.statusText);
  }

  return res;
}

export default switchCharity;
