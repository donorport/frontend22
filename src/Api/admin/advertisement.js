import axios from "axios";
import helper from "../../Common/Helper";

function advertisement() {

    const add = (authToken, cdata) => {
        const data = new FormData();

        data.append('name', cdata.name);
        data.append('website', cdata.website);
        data.append('logo', cdata.logo);
        data.append('status', cdata.status);

        return axios({
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
        });
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


        return axios({
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
        });
    }

    const deleteAdvertisement = (authToken, id) => axios({
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
        });


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

    const listHomeAd = (authToken) => axios({
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
    });


    const publishAddToCategory = (authToken, data) => axios({
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
    });

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
    const addAdvertiseToCategoryCountryState = (authToken, data) => axios({
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
    });

    const listByCategoryStateAndAdvertisement = (data) => axios({
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
    });

    const categoryPageAdList = (data) => axios({
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
    });


    const allStateAds = () => axios({
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
    });
    


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
