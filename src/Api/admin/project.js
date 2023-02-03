import axios from 'axios';
import helper from '../../Common/Helper';

function project() {
  const list = async (authToken) => {
    let res = {};
    await axios({
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
      }
    }).then((response) => {
      res = response;
    });
    return res;
  };

  const add = async (authToken, cdata) => {
    const data = new FormData();

    if (cdata.images && cdata.images.length > 0) {
      for (let i = 0; i < cdata.images.length; i++) {
        data.append('images', cdata.images[i]);
      }
    }
    data.append('name', cdata.name);
    data.append('headline', cdata.headline);
    data.append('description', cdata.description);
    data.append('video', cdata.video);
    data.append('status', cdata.status);
    data.append('infinity', cdata.infinity);
    data.append('organizationId', cdata.organizationId);
    data.append('organizationCountryId', cdata.organizationCountryId);

    if (cdata.products && cdata.products.length > 0) {
      data.append('products', JSON.stringify(cdata.products));
    }

    let res = {};
    await axios({
      method: 'post',
      url: `${helper.ApiUrl}project`,
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

  const deleteProject = async (authToken, id) => {
    let res = {};
    await axios({
      method: 'delete',
      url: `${helper.ApiUrl}project/${id}`,
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

  const updateProject = async (authToken, cdata, id) => {
    const data = new FormData();

    if (cdata.images && cdata.images.length > 0) {
      for (let i = 0; i < cdata.images.length; i++) {
        data.append('images', cdata.images[i]);
      }
    }
    data.append('name', cdata.name);
    data.append('headline', cdata.headline);
    data.append('description', cdata.description);
    data.append('video', cdata.video);
    data.append('status', cdata.status);
    data.append('infinity', cdata.infinity);
    data.append('organizationId', cdata.organizationId);

    if (cdata.products && cdata.products.length > 0) {
      data.append('products', JSON.stringify(cdata.products));
    }

    let res = {};
    await axios({
      method: 'put',
      url: `${helper.ApiUrl}project/${id}`,
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

  const projectListByOrganization = async (authToken, data) => {
    let res = {};
    await axios({
      method: 'post',
      url: `${helper.ApiUrl}project/organization`,
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

  const publishProject = async (authToken, id) => {
    let res = {};
    await axios({
      method: 'Post',
      url: `${helper.ApiUrl}project/publish`,
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
    }).then((response) => {
      res = response;
    });
    return res;
  };

  const deleteProjectImages = async (authToken, id) => {
    let res = {};
    await axios({
      method: 'delete',
      url: `${helper.ApiUrl}project/image/${id}`,
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

  return {
    list,
    add,
    deleteProject,
    updateProject,
    projectListByOrganization,
    publishProject,
    deleteProjectImages
  };
}
const projectApi = project();
export default projectApi;
