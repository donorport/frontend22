import axios from 'axios';
import helper from '../../Common/Helper';

function product() {
  const add = async (authToken, cdata) => {
    const data = new FormData();
    if (cdata.moreImg && cdata.moreImg.length > 0) {
      for (let i = 0; i < cdata.moreImg.length; i++) {
        data.append('moreImg', cdata.moreImg[i]);
      }
    }
    if (cdata.galleryImg && cdata.galleryImg.length > 0) {
      for (let i = 0; i < cdata.galleryImg.length; i++) {
        data.append('galleryImg', cdata.galleryImg[i]);
      }
    }
    console.log({cdata})
    if (cdata.prjects && cdata.prjects.length > 0) {
      data.append('projects', JSON.stringify(cdata.prjects));
    }
    data.append('unlimited', cdata.unlimited);
    data.append('organizationCountryId', cdata.organizationCountryId);
    data.append('media', cdata.media);

    data.append('tax', cdata.tax);
    data.append('postTag', cdata.postTag);

    data.append('brand', cdata.brand);
    data.append('headline', cdata.headline);

    data.append('needheadline', cdata.needheadline);
    if (cdata.galleryUrl) {
      data.append('galleryUrl', cdata.galleryUrl);
    }

    if (cdata.address) {
      data.append('address', cdata.address);
    }

    if (cdata.lat) {
      data.append('lat', cdata.lat);
    }

    if (cdata.lng) {
      data.append('lng', cdata.lng);
    }

    data.append('status', cdata.status);
    data.append('image', cdata.image);
    data.append('organizationId', cdata.organizationId);
    data.append('price', cdata.price);
    data.append('displayPrice', cdata.displayPrice);

    data.append('description', cdata.description);
    data.append('category_id', cdata.category_id);
    data.append('subcategory_id', cdata.subcategory_id);
    if (cdata.quantity) {
      data.append('quantity', cdata.quantity);
    }
    data.append('productSlug', cdata.productSlug);
    data.append('tags', JSON.stringify(cdata.tags));

    // console.log(data)

    let res = {};
    await axios({
      method: 'Post',
      url: `${helper.ApiUrl}product`,
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

  const list = async (authToken) => {
    let res = {};
    await axios({
      method: 'post',
      url: `${helper.ApiUrl}product/list`,
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

  const deleteProduct = async (authToken, id) => {
    let res = {};
    await axios({
      method: 'delete',
      url: `${helper.ApiUrl}product/${id}`,
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

  const updateProduct = async (authToken, cdata, id) => {
    const data = new FormData();

    if (cdata.moreImg && cdata.moreImg.length > 0) {
      for (let i = 0; i < cdata.moreImg.length; i++) {
        data.append('moreImg', cdata.moreImg[i]);
      }
    }

    if (cdata.galleryImg && cdata.galleryImg.length > 0) {
      for (let i = 0; i < cdata.galleryImg.length; i++) {
        data.append('galleryImg', cdata.galleryImg[i]);
      }
    }
    if (cdata.prjects && cdata.prjects.length > 0) {
      data.append('projects', JSON.stringify(cdata.prjects));
    }

    data.append('brand', cdata.brand);
    data.append('headline', cdata.headline);

    data.append('unlimited', cdata.unlimited);
    data.append('media', cdata.media);

    data.append('tax', cdata.tax);
    data.append('postTag', cdata.postTag);

    data.append('needheadline', cdata.needheadline);
    if (cdata.galleryUrl) {
      data.append('galleryUrl', cdata.galleryUrl);
    }

    if (cdata.address) {
      data.append('address', cdata.address);
    }

    if (cdata.lat) {
      data.append('lat', cdata.lat);
    }

    if (cdata.lng) {
      data.append('lng', cdata.lng);
    }

    data.append('organizationCountryId', cdata.organizationCountryId);

    data.append('status', cdata.status);
    if (cdata.image) {
      data.append('image', cdata.image);
    }
    data.append('slug', cdata.productSlug);
    data.append('organizationId', cdata.organizationId);
    data.append('price', cdata.price);
    data.append('displayPrice', cdata.displayPrice);
    data.append('description', cdata.description);
    data.append('categoryId', cdata.category_id);
    data.append('subcategoryId', cdata.subcategory_id);
    if (cdata.quantity) {
      data.append('quantity', cdata.quantity);
    }
    data.append('tags', JSON.stringify(cdata.tags));

    let res = {};
    await axios({
      method: 'put',
      url: `${helper.ApiUrl}product/${id}`,
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

  const listByOrganization = async (authToken, data) => {
    let res = {};
    await axios({
      method: 'post',
      url: `${helper.ApiUrl}product/organization`,
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

  const publishProduct = async (authToken, id, type) => {
    let res = {};
    await axios({
      method: 'Post',
      url: `${helper.ApiUrl}product/publish`,
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
        id: id,
        type: type
      }
    }).then((response) => {
      res = response;
    });
    return res;
  };

  const productDetailsById = async (authToken, data) => {
    let res = {};
    await axios({
      method: 'post',
      url: `${helper.ApiUrl}product/details/id`,
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

  const deleteProductImages = async (authToken, id) => {
    let res = {};
    await axios({
      method: 'delete',
      url: `${helper.ApiUrl}product/image/${id}`,
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

  const fulfilOrder = async (authToken, cdata) => {
    const data = new FormData();
    if (cdata.moreImg && cdata.moreImg.length > 0) {
      for (let i = 0; i < cdata.moreImg.length; i++) {
        data.append('moreImg', cdata.moreImg[i]);
      }
    }
    data.append('image', cdata.image);
    data.append('organizationId', cdata.organizationId);
    data.append('productId', cdata.productId);
    if (cdata.video) {
      data.append('video', cdata.video);
    }
    data.append('organizationCountryId', cdata.organizationCountryId);

    let res = {};
    await axios({
      method: 'Post',
      url: `${helper.ApiUrl}product/fulfil`,
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
  const updateFulfilOrder = async (authToken, cdata, id) => {
    const data = new FormData();
    if (cdata.moreImg && cdata.moreImg.length > 0) {
      for (let i = 0; i < cdata.moreImg.length; i++) {
        data.append('moreImg', cdata.moreImg[i]);
      }
    }
    if (cdata.image) {
      data.append('image', cdata.image);
    }
    data.append('organizationId', cdata.organizationId);
    data.append('productId', cdata.productId);
    if (cdata.video) {
      data.append('video', cdata.video);
    }
    data.append('organizationCountryId', cdata.organizationCountryId);

    let res = {};
    await axios({
      method: 'put',
      url: `${helper.ApiUrl}product/fulfil/` + id,
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

  const deleteFulfilOrder = async (authToken, id, prodcutId, organizationId) => {
    let res = {};
    await axios({
      method: 'delete',
      url: `${helper.ApiUrl}product/fulfil/${id}/${prodcutId}/${organizationId}`,
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
    add,
    list,
    deleteProduct,
    updateProduct,
    listByOrganization,
    publishProduct,
    productDetailsById,
    deleteProductImages,
    fulfilOrder,
    updateFulfilOrder,
    deleteFulfilOrder
  };
}

const productApi = product();
export default productApi;
