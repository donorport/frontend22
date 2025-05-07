import axios from "axios";
import helper from "../../Common/Helper";

function cart() {


    const add = async (authToken, data) => {

        let res = {};
        await axios({
            method: 'Post',
            url: `${helper.ApiUrl}cart`,
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

    const addAnonymous = async (authToken, data) => {

        let res = {};
        await axios({
            method: 'Post',
            url: `${helper.ApiUrl}cart/anonymous/add`,
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

    const list = async (authToken) => {
        let res = {};
        await axios({
            method: 'get',
            url: `${helper.ApiUrl}cart`,
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

    
    const listAnonymous = async (userId) => {
        let res = {};
        await axios({
            method: 'get',
            url: `${helper.ApiUrl}cart/anonymous/${userId}`,
            responseType: 'json',
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Credentials': 'true',
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                withCredentials: false,
                mode: 'no-cors',
            },

        }).then((response) => {
            res = response
        });
        return res;
    }

    const deleteCartItem = async (authToken, id) => {
        let res = {};
        await axios({
            method: 'delete',
            url: `${helper.ApiUrl}cart/${id}`,
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

    const updateCart = async (authToken, quantity, id, productId,type) => {
        return axios({
            method: 'put',
            url: `${helper.ApiUrl}cart/${id}`,
            responseType: 'json',
            headers: {
                "x-access-token": authToken,
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Credentials': 'true',
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                withCredentials: true,
                mode: 'no-cors',
            },
            data: {
                quantity: quantity,
                productId: productId,
                type: type,


            }

        });
    }

    const removeCartProduct = async (authToken, productId) => {


        let res = {};
        await axios({
            method: 'post',
            url: `${helper.ApiUrl}cart/remove_item`,
            responseType: 'json',
            headers: {
                "x-access-token": authToken,
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Credentials': 'true',
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                withCredentials: true,
                mode: 'no-cors',
            },
            data: {
                productId: productId
            }

        }).then((response) => {
            res = response
        });
        return res;
    }

    const checkItemInCart = async (authToken, productId) => {


        let res = {};
        await axios({
            method: 'post',
            url: `${helper.ApiUrl}cart/check_item`,
            responseType: 'json',
            headers: {
                "x-access-token": authToken,
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Credentials': 'true',
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                withCredentials: true,
                mode: 'no-cors',
            },
            data: {
                productId: productId
            }

        }).then((response) => {
            res = response
        });
        return res;
    }

    const clearCart = async (authToken) => {


        let res = {};
        await axios({
            method: 'post',
            url: `${helper.ApiUrl}cart/clear_cart`,
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

    const addMultiple = async (authToken, data) => {

        let res = {};
        await axios({
            method: 'Post',
            url: `${helper.ApiUrl}cart/multiple`,
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
        add,
        list,
        deleteCartItem,
        updateCart,
        removeCartProduct,
        checkItemInCart,
        clearCart,
        addMultiple,
        addAnonymous,
        listAnonymous,
    }
}
const cartApi = cart();
export default cartApi;
