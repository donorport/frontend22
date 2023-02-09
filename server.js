const fs = require('fs');
const axios = require('axios');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 5000;
const path = require('path');

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': 'true',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  withCredentials: true,
  mode: 'no-cors'
};

const AWS_S3_BUCKET_BASE_URL = 'https://donorport.s3.us-west-2.amazonaws.com/';

let BASE_URL = 'https://www.donorport.org/app/';

if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://localhost:8080/';
}
BASE_URL += 'api/';

app.use(cookieParser());

app.get('/item/:name', async (request, response) => {
  const name = request.params.name;
  const filePath = path.resolve(__dirname, './build', 'index.html');

  // Product Fetch
  const product = await axios({
    method: 'post',
    url: `${BASE_URL}product/details`,
    responseType: 'json',
    headers: headers,
    data: {
      productSlug: name
    }
  }).then((response) => {
    if (response?.data?.data) {
      return response?.data?.data[0];
    }
    return null;
  });
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return console.log(err);
    }

    const title = `Donorport | ${product?.headline || ''}`;
    const description = `${product?.description}`;
    const url = `${BASE_URL.replace('api/', '').replace('app/', '')}item/${name}`;
    const img = `${AWS_S3_BUCKET_BASE_URL}/images/campaign/product/${product?.image}`;
    data = data.replace(/\$OG_TITLE/g, title);
    data = data.replace(/\$OG_DESCRIPTION/g, description);
    data = data.replace(/\$OG_URL/g, url);
    data = data.replace(/\$OG_IMAGE/g, img);

    data = data.replace(/\$TWITTER_TITLE/g, title);
    data = data.replace(/\$TWITTER_DESCRIPTION/g, description);
    data = data.replace(/\$TWITTER_URL/g, url);
    data = data.replace(/\$TWITTER_IMAGE/g, img);
    return response.send(data);
  });
});

app.get('/organization/:name', async (request, response) => {
  const name = request.params.name;
  const filePath = path.resolve(__dirname, './build', 'index.html');
  const organization = await axios({
    method: 'post',
    url: `${BASE_URL}organization/details`,
    responseType: 'json',
    headers: headers,
    data: {
      slug: name
    }
  }).then((response) => {
    if (response.data?.data) {
      return response.data.data[0];
    }
    let res = response;
    return null;
  });
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return console.log(err);
    }

    const title = `Donorport | ${organization?.name || ''}`;
    const description = `${organization?.description}`;
    const url = `${BASE_URL.replace('api/', '').replace('app/', '')}organization/${name}`;
    data = data.replace(/\$OG_TITLE/g, title);
    data = data.replace(/\$OG_DESCRIPTION/g, description);
    data = data.replace(/\$OG_URL/g, url);

    data = data.replace(/\$TWITTER_TITLE/g, title);
    data = data.replace(/\$TWITTER_DESCRIPTION/g, description);
    data = data.replace(/\$TWITTER_URL/g, url);
    return response.send(data);
  });
});

app.get('/project/:name', async (request, response) => {
  const name = request.params.name;
  const filePath = path.resolve(__dirname, './build', 'index.html');
  const project = await axios({
    method: 'post',
    url: `${BASE_URL}project/details`,
    responseType: 'json',
    headers: headers,
    data: {
      projectSlug: name
    }
  }).then((response) => {
    if (response.data?.data) {
      return response.data.data[0];
    }

    return null;
  });
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return console.log(err);
    }

    const title = `Donorport | ${project?.name || ''}`;
    const description = `${project?.description || ''}`;
    const url = `${BASE_URL.replace('api/', '').replace('app/', '')}project/${name}`;
    data = data.replace(/\$OG_TITLE/g, title);
    data = data.replace(/\$OG_DESCRIPTION/g, description);
    data = data.replace(/\$OG_URL/g, url);

    data = data.replace(/\$TWITTER_TITLE/g, title);
    data = data.replace(/\$TWITTER_DESCRIPTION/g, description);
    data = data.replace(/\$TWITTER_URL/g, url);
    return response.send(data);
  });
});

app.get('/order/:id', async (request, response) => {
  let token = request.cookies['userAuthToken'];
  const id = request.params.id;
  const filePath = path.resolve(__dirname, './build', 'index.html');
  const order = await axios({
    method: 'post',
    url: `${BASE_URL}orderDetails`,
    responseType: 'json',
    headers: {
      ...headers,
      'x-access-token': `${token}`
    },

    data: {
      data: id
    }
  }).then((response) => {
    if (response.data?.data) {
      return response.data.data[0];
    }
    return null;
  });

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return console.log(err);
    }

    const title = `Donorport | ${order?.name || ''}`;
    const description = `${order?.description || ''}`;
    const url = `${BASE_URL.replace('api/', '').replace('app/', '')}order/${id}`;
    data = data.replace(/\$OG_TITLE/g, title);
    data = data.replace(/\$OG_DESCRIPTION/g, description);
    data = data.replace(/\$OG_URL/g, url);

    data = data.replace(/\$TWITTER_TITLE/g, title);
    data = data.replace(/\$TWITTER_DESCRIPTION/g, description);
    data = data.replace(/\$TWITTER_URL/g, url);
    return response.send(data);
  });
});

app.get('/donate/:id', async (request, response) => {
  let token = request.cookies['userAuthToken'];
  const id = request.params.id;
  const filePath = path.resolve(__dirname, './build', 'index.html');

  const donor = await axios({
    method: 'post',
    url: `${BASE_URL}donationDetails`,
    responseType: 'json',
    headers: { ...headers, 'x-access-token': `${token}` },
    data: {
      data: id
    }
  }).then((response) => {
    if (!response.data?.success) {
      console.log('response', response.data);
      return response;
    }
    return null;
  });

  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return console.log(err);
    }

    const title = `Donorport | ${donor?.name || ''}`;
    const description = `${donor?.description || ''}`;
    const url = `${BASE_URL.replace('api/', '').replace('app/', '')}order/${id}`;
    data = data.replace(/\$OG_TITLE/g, title);
    data = data.replace(/\$OG_DESCRIPTION/g, description);
    data = data.replace(/\$OG_URL/g, url);

    data = data.replace(/\$TWITTER_TITLE/g, title);
    data = data.replace(/\$TWITTER_DESCRIPTION/g, description);
    data = data.replace(/\$TWITTER_URL/g, url);
    return response.send(data);
  });
});

app.use(express.static(path.resolve(__dirname, './build')));

app.get('*', (request, response) => {
  const filePath = path.resolve(__dirname, './build', 'index.html');
  response.sendFile(filePath);
});

app.listen(port, '0.0.0.0', () => console.log(`Listening on port ${port}`));
