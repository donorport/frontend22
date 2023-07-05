import axios from 'axios';
import helper from '../../Common/Helper';

function project() {
  const details = (authToken, slug) =>
    axios({
      method: 'post',
      url: `${helper.ApiUrl}project/details`,
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
        projectSlug: slug
      }
    });

  const list = (authToken, data) =>
    axios({
      method: 'post',
      url: `${helper.ApiUrl}project/list`,
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

  const projectItemPurchasedHistory = (authToken, projectId) =>
    axios({
      method: 'post',
      url: `${helper.ApiUrl}project/purchase_history`,
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
        projectId: projectId
      }
    });

  const donate = (authToken, data) =>
    axios({
      method: 'post',
      url: `${helper.ApiUrl}project/donate`,
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

  const projectDonatedItemHistory = (authToken, projectId) =>
    axios({
      method: 'post',
      url: `${helper.ApiUrl}project/donate_history`,
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
        projectId: projectId
      }
    });

  return {
    details,
    list,
    projectItemPurchasedHistory,
    donate,
    projectDonatedItemHistory
  };
}
const projectApi = project();
export default projectApi;
