import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
//import FrontLoader from "../../Common/FrontLoader";
//import orderApi from "../../Api/admin/order";
//import { hasPermission } from "../../Common/Helper";
import authApi from "../../Api/admin/auth";
// import Index from "../../View/admin/Order/Index";
//import OrderDetails from "../../View/admin/Order/OrderDetails";
import donationApi from "../../Api/admin/donation";
import Index from "../../View/admin/Donation";


export default function DonationController() {

    const [orderList, setOrderList] = useState([])
    const adminAuthToken = localStorage.getItem('adminAuthToken');
    const adminData = JSON.parse(localStorage.getItem('adminData'));
    const [loading, setLoading] = useState(false)
    //const [modal, setModal] = useState(false)
    //const [orderDetails, setOrderDetails] = useState({})
    //const [orderItemList, setOrderItemList] = useState([])
    const [value, setValue] = useState('1');
    const [projectDonationList, setProjectDonationList] = useState([])
    const [organizationDonationList, setOrganizationDonationList] = useState([])



    const handleChange = (event, newValue) => {
        setValue(newValue);
    };


    //const params = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        (async () => {
            setLoading(false)

            const verifyUser = await authApi.verifyToken(adminAuthToken)
            if (!verifyUser.data.success) {
                localStorage.clear()
                navigate('/admin/login')
            }

            const donationList = await donationApi.list(adminAuthToken);
            if (donationList.data.success === true) {
                setProjectDonationList(donationList.data.projectdata)
                setOrganizationDonationList(donationList.data.organizationData)
            }
            setLoading(false)

        })()
    }, [])

    return (
        <>

                 {/*<FrontLoader loading={loading} />*/}
            <Index
                orderList={orderList}
                handleChange={handleChange}
                value={value}
                projectDonationList={projectDonationList}
                organizationDonationList={organizationDonationList}
            />
         


        </>
    )

}
