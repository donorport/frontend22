import axios from 'axios';
import getAdminAuthToken from './getAdminAuthToken';
import helper from '../../Common/Helper';

async function isSuperAdmin() {
  const [authToken, suToken] = getAdminAuthToken();
  let res = {};

  try {
    const response = await axios({
      method: 'get',
      url: `${helper.ApiUrl}check-su`,
      responseType: 'json',
      headers: {
        'x-access-token': authToken,
        'x-su-token': suToken ,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        withCredentials: true,
        mode: 'no-cors'
      }
    });

    if (response.status === 200) {
      res = response.data;
    } else {
      console.error('Error checking super admin status:', response.statusText);
    }
  } catch (error) {
    console.error('Error checking super admin status:', error);
    res = null;
  }

  return res;
}

export default isSuperAdmin;
