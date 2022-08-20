import FrontLoader from "../../Common/FrontLoader";
import React, { useState, useEffect } from "react";
import adminCampaignApi from "../../Api/admin/adminCampaign";
import Plans from "../../View/frontEnd/plans";
import planApi from "../../Api/admin/plan";

export default function PlansController() {
    const [loading, setLoading] = useState(false)
    const [campaignAdminList, setCampaignAdminList] = useState([])
    const userAuthToken = localStorage.getItem('userAuthToken');
    const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');

    const [basicData, setBasicData] = useState({
        name: "BASIC",
        price: "FREE",
        post: "",
        project: "",
        keywords: "",
        dashboardStats: false,
        prioritySupport: false,
    })

    const [proData, setProData] = useState({
        name: "PRO",
        price: "",
        post: "",
        project: "",
        keywords: "",
        dashboardStats: true,
        prioritySupport: false,
    })

    const [enterpriseData, setEnterpriseData] = useState({
        name: "ENTERPRISE",
        price: "",
        post: "",
        project: "",
        keywords: "",
        dashboardStats: false,
        prioritySupport: false,
    })

    const getPlansDetails = async () => {
        const getPlans = await planApi.list(CampaignAdminAuthToken);

        if (getPlans.data.success) {

            if (getPlans.data.data.length > 0) {
                getPlans.data.data.map((plan, i) => {

                    if (plan.name === 'BASIC') {

                        setBasicData(
                            plan
                        )
                    } else if (plan.name === 'PRO') {

                        setProData(
                            plan
                        )
                    } else {

                        setEnterpriseData(
                            plan
                        )
                    }
                })
            }

        }
    }


    useEffect(() => {
        (async () => {

            setLoading(false)
            await getPlansDetails()
            setLoading(false)
        })()
    }, [])



    return (
        <>
            <FrontLoader loading={loading} />
            <Plans
                basicData={basicData}
                proData={proData}
                enterpriseData={enterpriseData}
            />

        </>
    )

}