import Permissions from './Permissions'

let Mode = "production"
if (window.location.hostname === 'localhost') {
    Mode = "development"
}


let helper = {
    ApiUrl: 'http://localhost:8080/api/',
    CampaignAdminLogoPath: 'http://localhost:8080/iamges/campaign/logo/resize/',
    CampaignProductImagePath: 'http://localhost:8080/iamges/campaign/product/resize/'
}

if (Mode === "production") {

    helper = {
        ApiUrl: 'https://donorport.herokuapp.com/api/',
        CampaignAdminLogoPath: 'https://donorport.herokuapp.com/iamges/campaign/logo/resize/',
        CampaignProductImagePath: 'https://donorport.herokuapp.com/iamges/campaign/product/resize/'
    }
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
    let img = new Image();
    img.src = url;
    return img.height !== 0 ? true : false;
}