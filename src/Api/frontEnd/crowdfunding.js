import axios from 'axios';
import helper from '../../Common/Helper';

function crowdfunding() {
const subpath = `crowdfunding`;
  const details = (authToken, slug) =>
    axios({
      method: 'post',
      url: `${helper.ApiUrl}${subpath}/details`,
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
        crowdfundingSlug: slug
      }
    });

  const list = (authToken, data) =>
    axios({
      method: 'post',
      url: `${helper.ApiUrl}${subpath}/list`,
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

  const donate = (authToken, data) =>
    axios({
      method: 'post',
      url: `${helper.ApiUrl}${subpath}/donate`,
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

  const donatedItemHistory = (authToken, projectId) =>
    axios({
      method: 'post',
      url: `${helper.ApiUrl}${subpath}/donate_history`,
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
    donate,
    donatedItemHistory
  };
}

const crowdfundingApi = crowdfunding();
export default crowdfundingApi;
