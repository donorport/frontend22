import axios from 'axios';
import helper from '../../Common/Helper';

function wishlist() {
  const list = async (authToken) => {
    return axios({
      method: 'get',
      url: `${helper.ApiUrl}wishlist`,
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

  const toggle = async (authToken, data) => {
    return axios({
      method: 'post',
      url: `${helper.ApiUrl}wishlist`,
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

  return {
    list,
    toggle,
  };
}
const wishlistApi = wishlist();
export default wishlistApi;
