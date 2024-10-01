import axios from 'axios';
import helper from '../../Common/Helper';

function crowdfunding() {
  const subpath = `crowdfunding`;
  const list = async (authToken) => {
    return axios({
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
      }
    });
  };

  const add = async (authToken, cdata) => {
    const data = new FormData();

    if (cdata?.images?.length > 0) {
      for (let i = 0; i < cdata?.images?.length || 0; i++) {
        data.append('images', cdata.images[i]);
      }
    }

    data.append('name', cdata.name);
    data.append('headline', cdata.headline);
    data.append('description', cdata.description);
    data.append('address', cdata.address);
    data.append('lat', cdata.lat);
    data.append('lng', cdata.lng);
    data.append('goal', cdata.goal);
    data.append('video', cdata.video);
    data.append('status', cdata.status);
    data.append('infinity', cdata.infinity);
    data.append('organizationId', cdata.organizationId);
    data.append('organizationCountryId', cdata.organizationCountryId);

    if (cdata?.products?.length > 0) {
      data.append('products', JSON.stringify(cdata.products));
    }

    return axios({
      method: 'post',
      url: `${helper.ApiUrl}${subpath}`,
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

  const remove = async (authToken, id) => {
    console.log({ authToken });
    console.log({ id });

    return axios({
      method: 'delete',
      url: `${helper.ApiUrl}${subpath}/${id}`,
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

  const update = async (authToken, cdata, id, isAd) => {
    console.log({ cdata });
    console.log('cdata.products: ', cdata.products);
    const data = new FormData();

    if (cdata?.images?.length > 0) {
      for (let i = 0; i < cdata?.images?.length || 0; i++) {
        data.append('images', cdata.images[i]);
      }
    }

    data.append('name', cdata.name);
    data.append('headline', cdata.headline);
    data.append('description', cdata.description);
    data.append('video', cdata.video);
    data.append('status', cdata.status);
    data.append('address', cdata.address);
    data.append('lat', cdata.lat);
    data.append('lng', cdata.lng);
    data.append('goal', cdata.goal);
    data.append('infinity', cdata.infinity);
    data.append('organizationId', cdata.organizationId);

    if (cdata?.products?.length > 0) {
      data.append('products', JSON.stringify(cdata.products));
    }

    return axios({
      method: 'put',
      url: `${helper.ApiUrl}${subpath}/${id}`,
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

  const listByOrganization = async (authToken, data) => {
    return axios({
      method: 'post',
      url: `${helper.ApiUrl}${subpath}/organization`,
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

  const publish = async (authToken, id) => {
    return axios({
      method: 'Post',
      url: `${helper.ApiUrl}${subpath}/publish`,
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
        id: id
      }
    });
  };

  const deleteImages = async (authToken, id) => {
    return axios({
      method: 'delete',
      url: `${helper.ApiUrl}${subpath}/image/${id}`,
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
    list,
    add,
    remove,
    update,
    listByOrganization,
    publish,
    deleteImages
  };
}

const crowdfundingApi = crowdfunding();
export default crowdfundingApi;
