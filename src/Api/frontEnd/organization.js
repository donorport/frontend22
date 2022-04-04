import axios from "axios";
import helper from "../../Common/Helper";

function organization() {

    const details = async (slug) => {
        let res = {};
        await axios({
            method: 'post',
            url: `${helper.ApiUrl}organization/details`,
            responseType: 'json',
            headers: {
                // "x-access-token": authToken,
                "Access-Control-Allow-Origin": "*",
                'Access-Control-Allow-Credentials': 'true',
                "Access-Control-Allow-Headers": "Content-Type, Authorization",
                withCredentials: true,
                mode: 'no-cors',
            },
            data: {
                slug:slug
            }


        }).then((response) => {
            res = response
        });
        return res;
    }
   

    return {
        details,

    }
}
const organizationApi = organization();
export default organizationApi;