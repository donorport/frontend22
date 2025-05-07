import axios from "axios";
import helper from "../../Common/Helper";

function order() {

    const payment = async (authToken, data) => {
        let res = {};
        await axios({
            method: 'post',
            url: `${helper.ApiUrl}pay`,
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
    const paymentAnonymous = async (userId, data) => {
        let res = {};
        await axios({
            method: 'post',
            url: `${helper.ApiUrl}pay/anonymous/${userId}`,
            responseType: 'json',
            headers: {
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

    const saveOrderDetails = async (authToken, data) => {
        let res = {};
        await axios({
            method: 'post',
            url: `${helper.ApiUrl}save_order`,
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

    const getOrderDetails = async (authToken, data) => {

        let res = {};
        await axios({
            method: 'post',
            url: `${helper.ApiUrl}orderDetails`,
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


    return {
        payment,
        paymentAnonymous,
        saveOrderDetails,
        getOrderDetails


    }
}
const orderApi = order();
export default orderApi;