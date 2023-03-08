import axios from "axios";
import helper from "../../Common/Helper";

function advertisement() {

    const add = async (authToken, cdata) => {


        const data = new FormData();

        data.append('name', cdata.name);
        data.append('website', cdata.website);
        data.append('logo', cdata.logo);
        data.append('status', cdata.status);
        let res = {};
        await axios({
            method: 'post',
            url: `${helper.ApiUrl}advertisement`,
            responseType: 'json',
            headers: {
                "x-access-token": authToken,
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Credentials': 'true',
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                withCredentials: true,
                mode: 'no-cors',
            },
            data: data

        }).then((response) => {
            res = response
        });
        return res;
    }

    const list = async (authToken) => {

        let res = {};
        await axios({
            method: 'get',
            url: `${helper.ApiUrl}advertisement`,
            responseType: 'json',
            headers: {
                "x-access-token": authToken,
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Credentials': 'true',
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                withCredentials: true,
                mode: 'no-cors',
            },


        }).then((response) => {
            res = response
        });
        return res;
    }

    const updateAdvertisement = async (authToken, cdata, id) => {

        const data = new FormData();
        if (cdata.logo && cdata.logo !== "") {
            data.append('logo', cdata.logo);

        }
        if (cdata.name) {
            data.append('name', cdata.name);
        }

        if (cdata.website) {
            data.append('website', cdata.website);
        }

        if (cdata.status) {
            data.append('status', cdata.status);

        }






        let res = {};
        await axios({
            method: 'put',
            url: `${helper.ApiUrl}advertisement/${id}`,
            responseType: 'json',
            headers: {
                "x-access-token": authToken,
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Credentials': 'true',
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                withCredentials: true,
                mode: 'no-cors',
            },
            data: data

        }).then((response) => {
            res = response
        });
        return res;
    }

    const deleteAdvertisement = async (authToken, id) => {
        let res = {};
        await axios({
            method: 'delete',
            url: `${helper.ApiUrl}advertisement/${id}`,
            responseType: 'json',
            headers: {
                "x-access-token": authToken,
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Credentials': 'true',
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                withCredentials: true,
                mode: 'no-cors',
            },

        }).then((response) => {
            res = response
        });
        return res;
    }


    const publishAdd = async (authToken, data) => {
        let res = {};
        await axios({
            method: 'post',
            url: `${helper.ApiUrl}advertisement/publish`,
            responseType: 'json',
            headers: {
                "x-access-token": authToken,
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Credentials': 'true',
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                withCredentials: true,
                mode: 'no-cors',
            },
            data: data

        }).then((response) => {
            res = response
        });
        return res;
    }

    const listPublishedAdd = async (authToken, data) => {
        let res = {};
        await axios({
            method: 'post',
            url: `${helper.ApiUrl}advertisement/product/list`,
            responseType: 'json',
            headers: {
                "x-access-token": authToken,
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Credentials': 'true',
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                withCredentials: true,
                mode: 'no-cors',
            },
            data: data

        }).then((response) => {
            res = response
        });
        return res;
    }



    const updatehome = async (authToken, data, id) => {
        let res = {};
        await axios({
            method: 'put',
            url: `${helper.ApiUrl}advertisement/home/${id}`,
            responseType: 'json',
            headers: {
                "x-access-token": authToken,
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Credentials': 'true',
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                withCredentials: true,
                mode: 'no-cors',
            },
            data: data

        }).then((response) => {
            res = response
        });
        return res;
    }

    const listHomeAd = async (authToken) => {
        let res = {};
        await axios({
            method: 'get',
            url: `${helper.ApiUrl}advertisement/home`,
            responseType: 'json',
            headers: {
                "x-access-token": authToken,
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Credentials': 'true',
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                withCredentials: true,
                mode: 'no-cors',
            },
        }).then((response) => {
            res = response
        });
        return res;
    }


    const publishAddToCategory = async (authToken, data) => {
        let res = {};
        await axios({
            method: 'post',
            url: `${helper.ApiUrl}advertisement/category`,
            responseType: 'json',
            headers: {
                "x-access-token": authToken,
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Credentials': 'true',
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                withCredentials: true,
                mode: 'no-cors',
            },
            data: data

        }).then((response) => {
            res = response
        });
        return res;
    }

    const listCategoryAdvertisement = async (authToken, data) => {
        let res = {};
        await axios({
            method: 'post',
            url: `${helper.ApiUrl}advertisement/category/list`,
            responseType: 'json',
            headers: {
                "x-access-token": authToken,
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Credentials': 'true',
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                withCredentials: true,
                mode: 'no-cors',
            },
            data: data

        }).then((response) => {
            res = response
        });
        return res;
    }

    const publishAddToCountry = async (authToken, data) => {
        let res = {};
        await axios({
            method: 'post',
            url: `${helper.ApiUrl}advertisement/country`,
            responseType: 'json',
            headers: {
                "x-access-token": authToken,
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Credentials': 'true',
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                withCredentials: true,
                mode: 'no-cors',
            },
            data: data

        }).then((response) => {
            res = response
        });
        return res;
    }

    const listCountryAdvertisement = async (data) => {
        let res = {};
        await axios({
            method: 'post',
            url: `${helper.ApiUrl}advertisement/country/list`,
            responseType: 'json',
            headers: {
                // "x-access-token": authToken,
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Credentials': 'true',
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                withCredentials: true,
                mode: 'no-cors',
            },
            data: data

        }).then((response) => {
            res = response
        });
        return res;
    }
    const addAdvertiseToCategoryCountryState = async (authToken,data) => {
        let res = {};
        await axios({
            method: 'post',
            url: `${helper.ApiUrl}advertisement/country/state/category`,
            responseType: 'json',
            headers: {
                "x-access-token": authToken,
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Credentials': 'true',
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                withCredentials: true,
                mode: 'no-cors',
            },
            data: data

        }).then((response) => {
            res = response
        });
        return res;
    }

    const listByCategoryStateAndAdvertisement = async (data) => {
        let res = {};
        await axios({
            method: 'post',
            url: `${helper.ApiUrl}advertisement/country/state/category/list`,
            responseType: 'json',
            headers: {
                // "x-access-token": authToken,
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Credentials': 'true',
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                withCredentials: true,
                mode: 'no-cors',
            },
            data: data

        }).then((response) => {
            res = response
        });
        return res;
    }

    const categoryPageAdList = async (data) => {
        let res = {};
        await axios({
            method: 'post',
            url: `${helper.ApiUrl}advertisement/list`,
            responseType: 'json',
            headers: {
                // "x-access-token": authToken,
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Credentials': 'true',
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                withCredentials: true,
                mode: 'no-cors',
            },
            data: data

        }).then((response) => {
            res = response
        });
        return res;
    }
    const allStateAds = async () => {
        let res = {};
        await axios({
            method: 'get',
            url: `${helper.ApiUrl}advertisement/allstates`,
            responseType: 'json',
            headers: {
                // "x-access-token": authToken,
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Credentials': 'true',
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                withCredentials: true,
                mode: 'no-cors',
            },

        }).then((response) => {
            res = response
        });
        return res;
    }


    return {
        add,
        list,
        updateAdvertisement,
        deleteAdvertisement,
        publishAdd,
        listPublishedAdd,
        updatehome,
        listHomeAd,
        publishAddToCategory,
        listCategoryAdvertisement,
        publishAddToCountry,
        listCountryAdvertisement,
        addAdvertiseToCategoryCountryState,
        listByCategoryStateAndAdvertisement,
        categoryPageAdList,
        allStateAds



    }
}
const advertisementApi = advertisement();
export default advertisementApi;