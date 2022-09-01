import Permissions from './Permissions'
import CryptoJS from 'crypto-js';
import { useSelector, useDispatch } from "react-redux";
import IconButton from "../View/frontEnd/Component/molecules/icon-button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular, solid } from "@fortawesome/fontawesome-svg-core/import.macro";

let Mode = "production"
// let BASE_URL = 'https://donorport.herokuapp.com/'
let BASE_URL = 'https://www.donorport.org/app/'



if (window.location.hostname === 'localhost') {
    Mode = "development"
    BASE_URL = 'http://localhost:8080/'

}
const AWS_S3_BUCKET_BASE_URL = "https://donorport.s3.us-west-2.amazonaws.com/"

let helper = {
    ApiUrl: BASE_URL + 'api/',
    CampaignAdminLogoPath: AWS_S3_BUCKET_BASE_URL + 'images/campaign/logo/resize/',
    CampaignAdminLogoFullPath: AWS_S3_BUCKET_BASE_URL + 'images/campaign/logo/',
    CampaignProductImagePath: AWS_S3_BUCKET_BASE_URL + 'images/campaign/product/resize/',
    ProjectImagePath: AWS_S3_BUCKET_BASE_URL + 'images/campaign/project/resize/',
    ProjectFullImagePath: AWS_S3_BUCKET_BASE_URL + 'images/campaign/project/',

    CampaignProductFullImagePath: AWS_S3_BUCKET_BASE_URL + 'images/campaign/product/',
    DonorImagePath: AWS_S3_BUCKET_BASE_URL + 'images/donor/',
    DonorImageResizePath: AWS_S3_BUCKET_BASE_URL + 'images/donor/resize/',
    GoogleKey: 'AIzaSyD4CXzRpf7L9sFFJDIFzgSeoFOESqXaAuE',
    sponsorLogoPath: AWS_S3_BUCKET_BASE_URL + 'images/sponsor/logo/',
    sponsorLogoResizePath: AWS_S3_BUCKET_BASE_URL + 'images/sponsor/logo/resize/',

    recieptPath: AWS_S3_BUCKET_BASE_URL + 'images/donor/receipt/',
    websitePath: "https://www.donorport.org",
    FulfilRecieptPath: AWS_S3_BUCKET_BASE_URL + 'images/campaign/product/fulfil/receipt/',

    MapBoxPrimaryKey: 'pk.eyJ1IjoibW9vZmF3c2F3IiwiYSI6ImNpem4yZGtpcDAyZTYycW83azdlZnJkbmcifQ.PbOw8hTUeOgWWGw8WEuUYg'

    //Kyle's Mapbox key: pk.eyJ1IjoibW9vZmF3c2F3IiwiYSI6ImNpem4yZGtpcDAyZTYycW83azdlZnJkbmcifQ.PbOw8hTUeOgWWGw8WEuUYg
    // Developers key: pk.eyJ1IjoibmlrdWx0YWthIiwiYSI6ImNrOWZvZnY0cDBkZWMzZHFtbjFjNG5kbnUifQ.W2ASgey35JrovH2ODIDvXQ

}


export default helper


export function hasPermission(ROLE, MODULE) {
    let RESPONCE;
    if (Permissions[ROLE]) {
        RESPONCE = Permissions[ROLE].includes(MODULE);

    } else {
        RESPONCE = false;
    }
    return RESPONCE;

}

export function ImageExist(url) {
    // let img = new Image();
    // img.src = url;
    // return img.height !== 0 ? true : false;

    let http = new XMLHttpRequest();

    http.open('HEAD', url, false);
    http.send();

    return http.status !== 404;
    // return true

}

export function priceFormat(m=0) {
    // let price = parseInt(m, 10)
    // let nf = new Intl.NumberFormat('en-US');
    // return nf.format(price)
    m = Number(m)
    return m?.toFixed(2)
}

export function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function deleteCookie(name) {
    document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
};

export function encryptData(val) {
    let newVal = val;
    let ciphertext = CryptoJS.AES.encrypt(newVal, 'my-secret-key@123').toString();
    return ciphertext;
}
export function decryptData(val) {
    let bytes = CryptoJS.AES.decrypt(val, 'my-secret-key@123');
    let decryptedData = bytes?.toString(CryptoJS.enc.Utf8);
    // console.log(decryptedData)
    return decryptedData

}



// export function getCalculatedPrice(price) {

//     const user = useSelector((state) => state.user);
//     // Get Fees(%) from Reducer

//     let transectionFee = user.transectionFee
//     let platformFee = user.platformFee

//     //Calculate total charges (transectionFee + platformFee )

//     let totalCharge = Number(transectionFee) + Number(platformFee)


//     // Applying to Price
//     let taxPrice = Math.round(price + (totalCharge / 100) * price)


//     return taxPrice;
// }

export function getCalculatedPrice() {

    const user = useSelector((state) => state.user);
    const setting = useSelector((state) => state.setting);

    const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
    // console.log('first', user.pricePerCurrency)

    //calculating price

    const getData = (price) => {

        // Get Fees(%) from Reducer

        let transectionFee = user.transectionFee
        let platformFee = user.platformFee

        //Calculate total charges (transectionFee + platformFee )

        let totalCharge = Number(transectionFee) + Number(platformFee)


        // Applying to Price
        let taxPrice = Math.round(price + (totalCharge / 100) * price)
        let convertdPrice = Math.round(taxPrice)
        // if (!CampaignAdminAuthToken) {
        //     convertdPrice = Math.round(user.pricePerCurrency * taxPrice)
        // }
        // console.log(user.pricePerCurrency)


        return convertdPrice;
    }

    const priceWithoutTax = (price) => {

        let taxPrice = Math.round(price)
        let convertdPrice = Math.round(taxPrice)
        // convertdPrice = Math.round(user.pricePerCurrency * taxPrice)
        return convertdPrice;

    }

    const priceWithTax = (price) => {


        let transectionFee = user.transectionFee
        let platformFee = user.platformFee

        //Calculate total charges (transectionFee + platformFee )

        let totalCharge = Number(transectionFee) + Number(platformFee)


        // Applying to Price
        let taxPrice = (price + (totalCharge / 100) * price)
        return taxPrice.toFixed(2);

    }

    //get Currency Symbol

    const currencySymbol = () => {

        let currencySymbol = '$'
        // if (!CampaignAdminAuthToken) {
        currencySymbol = user.currencySymbol
        // }
        return currencySymbol
    }

    const calculateSalesTax = (amount) => {

        const salesTax = Number(user.salesTax)
        // let taxAmount = Math.round((salesTax / 100) * amount)
        let taxAmount = ((salesTax / 100) * amount)

        return taxAmount?.toFixed(2)


    }


    const getUserRank = (UserXp) => {


        const captian = setting.captian && setting.captian !== "" ? Number(setting.captian) : 100000
        const admiral = setting.admiral && setting.admiral !== "" ? Number(setting.admiral) : 10000
        const pirate = setting.pirate && setting.pirate !== "" ? Number(setting.pirate) : 5000
        const narwhal = setting.narwhal && setting.narwhal !== "" ? Number(setting.narwhal) : 2500
        const beluga = setting.beluga && setting.beluga !== "" ? Number(setting.beluga) : 1000
        const fish = setting.fish && setting.fish !== "" ? Number(setting.fish) : 500
        let rank;
        // console.log('pirate', pirate)
        // console.log('admiral', admiral)

        // console.log(typeof(captian) )


        switch (true) {

            case (UserXp < fish):
                rank = <div style={{ width: "100px" }}>

                </div>
                break;

            case (UserXp >= fish && UserXp < beluga):
                rank = (
                    <IconButton
                        bgColor="hsla(0, 96.46%, 76.14%, 1.00)"
                        className="rounded-pill rounded-pill--xp"
                        icon={<FontAwesomeIcon icon={solid("fish")} />}
                    >
                        Fish
                    </IconButton>)

                break;

            case (UserXp >= beluga && UserXp < narwhal):
                rank = (
                    <IconButton
                        bgColor="#78bafc"
                        className="rounded-pill rounded-pill--xp"
                        icon={<FontAwesomeIcon icon={solid("whale")} />}
                    >
                        Beluga
                    </IconButton>
                )

                break;

            case (UserXp >= narwhal && UserXp < pirate):
                rank = (
                    <IconButton
                        bgColor="#a278fc"
                        className="rounded-pill rounded-pill--xp"
                        icon={<FontAwesomeIcon icon={solid("narwhal")} />}
                    >
                        Narwhal
                    </IconButton>
                )

                break;

            case (UserXp >= pirate && UserXp <= admiral):
                rank = (
                    <IconButton
                        bgColor="#fc8c63"
                        className="rounded-pill rounded-pill--xp"
                        icon={<FontAwesomeIcon icon={solid("swords")} />}
                    >
                        Pirate
                    </IconButton>
                )

                break;

            case (UserXp > admiral && UserXp < captian):
                rank = (
                    <IconButton
                        bgColor="#95dbb0"
                        className="rounded-pill rounded-pill--xp"
                        icon={<FontAwesomeIcon icon={solid("ship")} />}
                    >
                        Admiral
                    </IconButton>
                )


                break;

            case (UserXp >= captian):
                rank = (
                    <IconButton
                        bgColor="#000"
                        className="rounded-pill rounded-pill--xp"
                        icon={<FontAwesomeIcon icon={solid("anchor")} />}
                    >
                        Captain
                    </IconButton>
                )

                break;
            default:
                rank = <></>
                break;


        }
        return rank
    }

    const getTaxValueOfPrice = (amount) => {

        let transectionFee = user.transectionFee
        let platformFee = user.platformFee

        //Calculate total charges (transectionFee + platformFee )

        let totalCharge = Number(transectionFee) + Number(platformFee)

        const salesTax = Number(totalCharge)
        // let taxAmount = Math.round((salesTax / 100) * amount)
        let taxAmount = ((salesTax / 100) * amount)

        return taxAmount.toFixed(2)


    }


    return {
        getData,
        currencySymbol,
        priceWithoutTax,
        priceWithTax,
        getUserRank,
        calculateSalesTax,
        getTaxValueOfPrice
    }
}

export function purchasedPriceWithTax(price, totalCharge) {

    let taxPrice = Math.round(price + (Number(totalCharge) / 100) * price)
    return taxPrice;

}



export function arrayUnique(array) {
    let a = array.concat();
    for (let i = 0; i < a.length; ++i) {
        for (let j = i + 1; j < a.length; ++j) {
            if (a[i].name === a[j].name)
                a.splice(j--, 1);
        }
    }

    return a;
}

export function isIframe(url) {
    let substring = "<iframe";
    return url.indexOf(substring) === 0
}

export function isValidEmail(email) {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let RESPONCE;

    if (email.match(mailformat)) {
        RESPONCE = true
    } else {
        RESPONCE = false
    }
    return RESPONCE

}


export function getCardIcon(card) {

    let img;


    switch (card) {

        case ('visa'):
            img = AWS_S3_BUCKET_BASE_URL + 'images/campaign/logo/visa.png'
            // img = AWS_S3_BUCKET_BASE_URL + 'images/campaign/logo/Visa2.jpg'

            break;


        case ('mastercard'):
            img = 'https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/5b5e656493af1e0441cd892a_mc_vrt_pos.svg';
            break;

        case ('amex'):
            img = AWS_S3_BUCKET_BASE_URL + 'images/campaign/logo/american.png'
            break;

        case ('discover'):
            img = AWS_S3_BUCKET_BASE_URL + 'images/campaign/logo/discover.png'
            break;

        case ('diners'):
            img = AWS_S3_BUCKET_BASE_URL + 'images/campaign/logo/dinersclub.png'
            break;

        case ('jcb'):
            img = AWS_S3_BUCKET_BASE_URL + 'images/campaign/logo/jcb.png'
            break;

        case ('union'):
            img = AWS_S3_BUCKET_BASE_URL + 'images/campaign/logo/unionpay.png'
            break;

        default:
            img = AWS_S3_BUCKET_BASE_URL + 'images/campaign/logo/visa.png'
            break;


    }
    return img;

}

export function priceWithOrganizationTax(price, salesTax) {

    let taxPrice = (price + (Number(salesTax) / 100) * price)
    // console.log(taxPrice)
    return taxPrice;

}


export function download(dataurl, filename) {
    const link = document.createElement("a");
    link.href = dataurl;
    link.download = filename;
    link.click();
}


export function GetCardTypeByNumber(number) {
    // visa
    let re = new RegExp("^4");
    if (number.match(re) != null)
        return "visa";


    if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number))
        return "mastercard";

    // AMEX
    re = new RegExp("^3[47]");
    if (number.match(re) != null)
        return "amex";

    // Discover
    re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
    if (number.match(re) != null)
        return "discover";

    // Diners
    re = new RegExp("^36");
    if (number.match(re) != null)
        return "diners";

    // Diners - Carte Blanche
    re = new RegExp("^30[0-5]");
    if (number.match(re) != null)
        // return "Diners - Carte Blanche";
        return "diners";


    // JCB
    re = new RegExp("^35(2[89]|[3-8][0-9])");
    if (number.match(re) != null)
        return "jcb";

    // Visa Electron
    re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
    if (number.match(re) != null)
        // return "Visa Electron";
        return "visa";



    return "";
}

