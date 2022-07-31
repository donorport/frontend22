import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom";
import FrontLoader from "../../Common/FrontLoader";
import orderApi from "../../Api/admin/order";
import { hasPermission } from "../../Common/Helper";
import authApi from "../../Api/admin/auth";
import inquiryApi from "../../Api/admin/inquiry";
import Index from "../../View/admin/verified/Index";
import Details from "../../View/admin/verified/Details";



export default function VerificationInquiryController() {

    const [inquiryList, setInquiryList] = useState([])
    const adminAuthToken = localStorage.getItem('adminAuthToken');
    const adminData = JSON.parse(localStorage.getItem('adminData'));
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const [state, setstate] = useState({
        name: '',
        email: '',
        reson: '',
    })
    const { name, email,reson } = state


    const params = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        (async () => {
            setLoading(true)
            if (!hasPermission(adminData.roleName, 'ORDERS')) {
                navigate('/admin/dashboard')
            }
            const verifyUser = await authApi.verifyToken(adminAuthToken)
            if (!verifyUser.data.success) {
                localStorage.clear()
                navigate('/admin/login')
            }

            const getInquiryList = await inquiryApi.listVerificationInquries(adminAuthToken);
            if (getInquiryList.data.success === true) {
                setInquiryList(getInquiryList.data.data)
            }
            setLoading(false)

        })()
    }, [])

    const viewDetails =(data) => {
        setstate({
            ...state,
            name:data.name,
            email:data.email,
            reson:data.reson,

        })
        setModal(true)
  
    }


    return (
        <>

                 {/*<FrontLoader loading={loading} />*/}
            <Index inquiryList={inquiryList} viewDetails={viewDetails}/>
            <Details stateData={state}  modal={modal} setModal={setModal}/>
         


        </>
    )

}