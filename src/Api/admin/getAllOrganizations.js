import axios from 'axios';
import getAdminAuthToken from './getAdminAuthToken';
import helper from '../../Common/Helper';

async function getAllOrganizations() {
  const [authToken, suToken] = getAdminAuthToken();
  let res = null;

  try {
    const response = await axios({
      method: 'get',
      url: `${helper.ApiUrl}campaign_admin/all-organization`,
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
      res = response.data.data;
      console.log('Organizations data:', response);
    }
  } catch (error) {
    console.error('Error fetching organizations:', error);
  }

  return res;
}

export default getAllOrganizations;
