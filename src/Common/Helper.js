import Permissions from './Permissions';
import CryptoJS from 'crypto-js';
import { useSelector, useDispatch } from 'react-redux';
import IconButton from '../View/frontEnd/Component/molecules/icon-button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { State, Country } from 'country-state-city';

let Mode = 'production';
let BASE_URL = 'https://www.donorport.com/app/';
// let BASE_URL = 'http://localhost:8080/';

if (window.location.hostname === 'localhost') {
  Mode = 'development';
  BASE_URL = 'http://localhost:8080/';
}

const AWS_S3_BUCKET_BASE_URL = 'https://donorport.s3.us-west-2.amazonaws.com/';

let helper = {
  ApiUrl: BASE_URL + 'api/',
  CampaignAdminLogoPath: AWS_S3_BUCKET_BASE_URL + 'images/campaign/logo/resize/',
  CampaignAdminLogoFullPath: AWS_S3_BUCKET_BASE_URL + 'images/campaign/logo/',
  CampaignAdminGalleryPath: AWS_S3_BUCKET_BASE_URL + 'images/campaign/gallery/resize/',
  CampaignAdminGalleryFullPath: AWS_S3_BUCKET_BASE_URL + 'images/campaign/gallery/',
  CampaignProductImagePath: AWS_S3_BUCKET_BASE_URL + 'images/campaign/product/resize/',
  ProjectImagePath: AWS_S3_BUCKET_BASE_URL + 'images/campaign/project/resize/',
  ProjectFullImagePath: AWS_S3_BUCKET_BASE_URL + 'images/campaign/project/',

  CrowdfundingImagePath: AWS_S3_BUCKET_BASE_URL + 'images/campaign/crowdfunding/resize/',
  CrowdfundingFullImagePath: AWS_S3_BUCKET_BASE_URL + 'images/campaign/crowdfunding/',

  CampaignProductFullImagePath: AWS_S3_BUCKET_BASE_URL + 'images/campaign/product/',
  DonorImagePath: AWS_S3_BUCKET_BASE_URL + 'images/donor/',
  DonorImageResizePath: AWS_S3_BUCKET_BASE_URL + 'images/donor/resize/',
  GoogleKey: 'AIzaSyD4CXzRpf7L9sFFJDIFzgSeoFOESqXaAuE',
  sponsorLogoPath: AWS_S3_BUCKET_BASE_URL + 'images/sponsor/logo/',
  sponsorLogoResizePath: AWS_S3_BUCKET_BASE_URL + 'images/sponsor/logo/resize/',
  fullRecieptPath: AWS_S3_BUCKET_BASE_URL + 'images/campaign/product/fulfil/receipt/',

  recieptPath: AWS_S3_BUCKET_BASE_URL + 'images/donor/receipt/',
  websitePath:
    window.location.hostname === 'localhost'
      ? 'http://localhost:3000'
      : 'https://www.donorport.com',
  apiPath: 'https://api.donorport.com',
  FulfilRecieptPath: AWS_S3_BUCKET_BASE_URL + 'images/campaign/product/fulfil/receipt/',

  MapBoxPrimaryKey:
    'pk.eyJ1IjoibW9vZmF3c2F3IiwiYSI6ImNpem4yZGtpcDAyZTYycW83azdlZnJkbmcifQ.PbOw8hTUeOgWWGw8WEuUYg',

  MAX_IMAGE_LENGTH: 5

  //Kyle's Mapbox key: pk.eyJ1IjoibW9vZmF3c2F3IiwiYSI6ImNpem4yZGtpcDAyZTYycW83azdlZnJkbmcifQ.PbOw8hTUeOgWWGw8WEuUYg
  // Developers key: pk.eyJ1IjoibmlrdWx0YWthIiwiYSI6ImNrOWZvZnY0cDBkZWMzZHFtbjFjNG5kbnUifQ.W2ASgey35JrovH2ODIDvXQ
};

export default helper;

export function hasPermission(ROLE, MODULE) {
  if (Permissions[ROLE]) {
    return Permissions[ROLE].includes(MODULE);
  }

  return false;
}

export function ImageExist(url) {
  let http = new XMLHttpRequest();

  http.open('HEAD', url, false);
  http.send();

  return http.status !== 404;
}

export function priceFormat(m = 0) {
  // let price = parseInt(m, 10)
  // let nf = new Intl.NumberFormat('en-US');
  // return nf.format(price)
  m = Number(m);
  return m?.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export function getCookie(cname) {
  const name = cname + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

export function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  const expires = 'expires=' + d.toUTCString();
  document.cookie = cname + '=' + cvalue + ';' + expires + ';path=/';
}

export function deleteCookie(name) {
  document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

export const encryptData = (val) => CryptoJS.AES.encrypt(val, 'my-secret-key@123').toString();

export function decryptData(val) {
  const bytes = CryptoJS.AES.decrypt(val, 'my-secret-key@123');
  const decryptedData = bytes?.toString(CryptoJS.enc.Utf8);
  // console.log(decryptedData)
  return decryptedData;
}

// export function getCalculatedPrice(price) {

//     const user = useSelector((state) => state.user);
//     // Get Fees(%) from Reducer

//     let transactionFee = user.transactionFee
//     let platformFee = user.platformFee

//     //Calculate total charges (transactionFee + platformFee )

//     let totalCharge = Number(transactionFee) + Number(platformFee)

//     // Applying to Price
//     let taxPrice = Math.round(price + (totalCharge / 100) * price)

//     return taxPrice;
// }

const getData_inner = (user, price) => {
  // Get Fees(%) from Reducer
  const { transactionFee, platformFee } = user;

  //Calculate total charges (transactionFee + platformFee )
  const totalCharge = Number(transactionFee) + Number(platformFee);

  // Applying to Price
  const taxPrice = Math.round(price + (totalCharge / 100) * price);
  const convertdPrice = Math.round(taxPrice);
  // if (!CampaignAdminAuthToken) {
  //     convertdPrice = Math.round(user.pricePerCurrency * taxPrice)
  // }
  // console.log(user.pricePerCurrency)

  return convertdPrice;
};

const priceWithoutTax = (price) => {
  const taxPrice = Math.round(Number(price));
  // const convertdPrice = Math.round(taxPrice);
  // convertdPrice = Math.round(user.pricePerCurrency * taxPrice)
  return taxPrice;
};

const priceWithTax_inner = (user, price) => {
  const { transactionFee, platformFee } = user;

  // Calculate total charges (transactionFee + platformFee )

  let totalCharge = Number(transactionFee) + Number(platformFee);

  // Applying to Price
  let taxPrice = price + (totalCharge / 100) * price;
  return taxPrice.toFixed(2);
};

const currencySymbol_inner = (user) => {
  return user.currencySymbol || '$';
};

const calculateSalesTax_inner = (user, amount) => {
  const salesTax = Number(user.salesTax);
  // let taxAmount = Math.round((salesTax / 100) * amount)
  let taxAmount = (salesTax / 100) * amount;

  return taxAmount?.toFixed(2);
};

const getTaxValueOfPrice_inner = (user, amount) => {
  const { transactionFee, platformFee } = user;

  let totalCharge = Number(transactionFee) + Number(platformFee);

  const salesTax = Number(totalCharge);
  // let taxAmount = Math.round((salesTax / 100) * amount)
  let taxAmount = (salesTax / 100) * amount;

  return taxAmount.toFixed(2);
};

const getUserRank_inner = (setting, UserXp) => {
  const CAPTAIN = setting?.captian !== '' ? Number(setting.captian) : 100000;
  const ADMIRAL = setting?.admiral !== '' ? Number(setting.admiral) : 10000;
  const PIRATE = setting?.pirate !== '' ? Number(setting.pirate) : 5000;
  const NARWHAL = setting?.narwhal !== '' ? Number(setting.narwhal) : 2500;
  const BELUGA = setting?.beluga !== '' ? Number(setting.beluga) : 1000;
  const FISH = setting?.fish !== '' ? Number(setting.fish) : 500;

  let props = null;

  switch (true) {
    // case UserXp < fish:
    //   props = null;
    //   break;

    case UserXp >= FISH && UserXp < BELUGA:
      props = {
        bgColor: 'hsla(0, 96.46%, 76.14%, 1.00)',
        icon: solid('fish'),
        name: 'Fish'
      };
      break;

    case UserXp >= BELUGA && UserXp < NARWHAL:
      props = {
        bgColor: '#78bafc',
        icon: solid('whale'),
        name: 'Beluga'
      };
      break;

    case UserXp >= NARWHAL && UserXp < PIRATE:
      props = {
        bgColor: '#a278fc',
        icon: solid('narwhal'),
        name: 'Narwhal'
      };
      break;

    case UserXp >= PIRATE && UserXp <= ADMIRAL:
      props = {
        bgColor: '#fc8c63',
        icon: solid('swords'),
        name: 'Pirate'
      };
      break;

    case UserXp > ADMIRAL && UserXp < CAPTAIN:
      props = {
        bgColor: '#95dbb0',
        icon: solid('ship'),
        name: 'Admiral'
      };
      break;

    case UserXp >= CAPTAIN:
      props = {
        bgColor: '#000',
        icon: solid('anchor'),
        name: 'Captain'
      };
      break;

    default:
      props = null;
      break;
  }

  return props === null ? (
    ''
  ) : (
    <IconButton
      bgColor={props.bgColor}
      className="rounded-pill rounded-pill--xp fs-6 fs-sm-7"
      icon={<FontAwesomeIcon size={24} icon={props.icon} />}
    >
      {props.name}
    </IconButton>
  );
};

export function getCalculatedPrice() {
  const user = useSelector((state) => state.user);
  const setting = useSelector((state) => state.setting);

  // const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  // console.log('first', user.pricePerCurrency)

  const getData = (price) => getData_inner(user, price);

  const priceWithTax = (price) => priceWithTax_inner(user, price);

  const currencySymbol = () => currencySymbol_inner(user);

  const calculateSalesTax = (amount) => calculateSalesTax_inner(user, amount);

  const getTaxValueOfPrice = (amount) => getTaxValueOfPrice_inner(user, amount);

  const getUserRank = (UserXp) => getUserRank_inner(setting, UserXp);

  return {
    getData,
    currencySymbol,
    priceWithoutTax,
    priceWithTax,
    getUserRank,
    calculateSalesTax,
    getTaxValueOfPrice
  };
}

export function purchasedPriceWithTax(price, totalCharge) {
  let taxPrice = Math.round(price + (Number(totalCharge) / 100) * price);
  return taxPrice;
}

export function arrayUnique(array) {
  let a = [...array]; // make copy
  for (let i = 0; i < a.length; ++i) {
    // for each item in array
    for (let j = i + 1; j < a.length; ++j) {
      // grab the second item and compare to the first
      if (a[i].name === a[j].name) a.splice(j--, 1);
    }
  }

  return a;
}

export function isIframe(url) {
  return url.indexOf('<iframe') === 0;
}

const EMAIL_REGEX_FORMAT = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export function isValidEmail(email) {
  return email.match(EMAIL_REGEX_FORMAT);
}

const CARD_TYPE_FROM_CARD = {
  amex: 'american',
  diners: 'dinersclub',
  union: 'unionpay',

  discover: 'discover',
  jcb: 'jcb',
  mastercard: 'mastercard',
  visa: 'visa'
};

export function getCardIcon(card) {
  let img = AWS_S3_BUCKET_BASE_URL + `images/campaign/logo/`;

  img += CARD_TYPE_FROM_CARD[card] ?? 'visa';

  return img + '.png';
}

export function priceWithOrganizationTax(price, salesTax) {
  //let taxPrice = price + (Number(salesTax + 2.9) / 100) * price;
  let taxPrice = price + (Number(salesTax) / 100) * price;
  return taxPrice;
}

export function download(dataurl, filename) {
  const link = document.createElement('a');
  link.href = dataurl;
  link.download = filename;
  link.click();
}

export function GetCardTypeByNumber(number) {
  // visa
  let re = new RegExp('^4');
  if (number.match(re) != null) return 'visa';

  if (
    /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(
      number
    )
  )
    return 'mastercard';

  // AMEX
  re = new RegExp('^3[47]');
  if (number.match(re) != null) return 'amex';

  // Discover
  re = new RegExp('^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)');
  if (number.match(re) != null) return 'discover';

  // Diners
  re = new RegExp('^36');
  if (number.match(re) != null) return 'diners';

  // Diners - Carte Blanche
  re = new RegExp('^30[0-5]');
  if (number.match(re) != null) return 'diners';

  // JCB
  re = new RegExp('^35(2[89]|[3-8][0-9])');
  if (number.match(re) != null) return 'jcb';

  // Visa Electron
  re = new RegExp('^(4026|417500|4508|4844|491(3|7))');
  if (number.match(re) != null) return 'visa';

  return '';
}

export const hasAlpha = (file) =>
  new Promise((resolve, reject) => {
    const img = new Image();

    // create image from file
    img.src = URL.createObjectURL(file);

    img.onerror = reject;

    img.onload = () => {
      // create canvas
      const { width, height } = img;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0);

      // get image data
      const imageData = ctx.getImageData(0, 0, width, height);
      const { data } = imageData;

      // check if image has any transparent background
      const hasTransparent = Array.from(data).some((value, index) => {
        return index % 4 === 3 && value < 255;
      });

      resolve(hasTransparent);
    };
  });

export function countInArray(array, what) {
  return array.filter((item) => item === what).length;
}

// Assuming Country and State classes have appropriate methods to retrieve data

// Function to convert an address into a standardized format of "city, stateCode"
export function convertAddress(address) {
  if (!address) {
    throw new Error('Address is undefined');
  }

  try {
    const commaCount = address.split(',').length - 1;

    if (commaCount === 1) {
      const [stateOrProvince, country] = address.split(',').map((part) => part.trim());
      const countryISO = Country.getAllCountries().find(
        (c) => c.name.replace(/\s/g, '') === country
      )?.isoCode;

      if (!countryISO) {
        throw new Error(`Country not found for address "${address}"`);
      }

      return `${stateOrProvince}, ${countryISO}`;
    }

    const countryName = address.split(',').pop().trim();
    const country = Country.getAllCountries().find(
      (c) => c.name.replace(/\s/g, '') === countryName
    );

    if (!country) {
      throw new Error(`Country not found for address "${address}"`);
    }

    let city;
    let stateOrProvince;
    if (commaCount === 3) {
      city = address.split(',')[1].trim();
      const stateWithSpace = address.split(',')[2].trim();
      stateOrProvince = stateWithSpace.split(' ')[0];
    } else if (commaCount === 2) {
      city = address.split(',')[0].trim();
      stateOrProvince = address.split(',')[1].trim();
    } else {
      throw new Error('Invalid address format');
    }

    const states = State.getStatesOfCountry(country.isoCode).filter((s) =>
      s.name.includes(stateOrProvince)
    );

    if (states.length === 0) {
      throw new Error(`State not found for address "${address}"`);
    }

    const stateCode = `${states[0].isoCode}`;

    return `${city}, ${stateCode}`;
  } catch (error) {
    console.error(`convertAddress failed with address "${address}": ${error}`);
    return null; // or return an error message instead of null
  }
}
