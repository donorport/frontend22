import Index from "../../View/frontEnd/Layout/Home/Index";
import productApi from "../../Api/admin/product";
import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom";
import FrontLoader from "../../Common/FrontLoader";
import OrganisationDetail from "../../View/frontEnd/organisation-detail";
import organizationApi from "../../Api/frontEnd/organization";
import ProjectDetail from "../../View/frontEnd/project-detail";
import projectApi from "../../Api/frontEnd/project";
import cartApi from "../../Api/frontEnd/cart";
import ToastAlert from "../../Common/ToastAlert";
import { useSelector, useDispatch } from "react-redux";
import { validateAll } from "indicative/validator";
import { setUserXp, setUserRank } from "../../user/user.action"

import userApi from "../../Api/frontEnd/user";



export default function ProjectDetailsController() {
    const [productList, setProductList] = useState([])
    const adminAuthToken = localStorage.getItem('adminAuthToken');
    const [loading, setLoading] = useState(false)
    const params = useParams();
    const navigate = useNavigate();
    const [projectDetails, setProjectDetails] = useState({})
    const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
    const userAuthToken = localStorage.getItem('userAuthToken');
    const token = userAuthToken ? userAuthToken : CampaignAdminAuthToken
    const [projectList, setProjectList] = useState([])
    const [purchasedItemList, setPurchasedItemList] = useState([])
    const user = useSelector((state) => state.user);
    const [selectedValue, setSelectedValue] = useState(25);
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [donationList, setDonationList] = useState([])
    const dispatch = useDispatch()



    const [state, setstate] = useState({
        name: "",
        email: "",
        phone: "",
        stateName: "",
        city: "",
        country: "",
        zip: "",
        line1: "",
        cardNumber: "",
        month: "",
        year: "",
        cvv: "",
        error: []
    })
    const {
        name, cardNumber, month, year, cvv, error,
    } = state;

    const [cardNumberWithSpace, setCardNumberWithSpace] = useState("")


    const getUserRank = async () => {
        const getRank = await userApi.getUserRank(userAuthToken)
        if (getRank) {
            if (getRank.data.success) {
                dispatch(setUserRank(getRank.data.rank))
            }
        }
    }


    const changevalue = (e) => {
        let value = e.target.value;
        if (e.target.name === "cardNumber") {
            let cardVal = e.target.value;
            setCardNumberWithSpace(cardVal.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim())
            setstate({
                ...state,
                [e.target.name]: value
            })
        } else {
            setstate({
                ...state,
                [e.target.name]: value
            })
        }

    }


    const getAllProjectList = async () => {
        let data = {}
        data.userCountry = user.countryId
        const getProjectList = await projectApi.list(token, data);
        if (getProjectList.data.success === true) {
            setProjectList(getProjectList.data.data)
        }

    }

    const getPurchasedItems = async (id) => {
        const getPurchasedItems = await projectApi.projectItemPurchasedHistory(userAuthToken ? userAuthToken : CampaignAdminAuthToken, id);
        if (getPurchasedItems.data.success === true) {
            setPurchasedItemList(getPurchasedItems.data.data)
        }
    }

    const getDonationList = async (id) => {
        const getDonationList = await projectApi.projectDonatedItemHistory(userAuthToken ? userAuthToken : CampaignAdminAuthToken, id);
        if (getDonationList.data.success === true) {
            setDonationList(getDonationList.data.data)
        }
    }



    const addToCart = async (id, quantity) => {

        setLoading(true)
        let data = {}
        data.productId = id
        data.quantity = quantity

        const addItemToCart = await cartApi.add(userAuthToken, data);
        if (addItemToCart) {
            if (!addItemToCart.data.success) {
                setLoading(false)
                ToastAlert({ msg: addItemToCart.data.message, msgType: 'error' });
            } else {
                ToastAlert({ msg: addItemToCart.data.message, msgType: 'success' });
                setLoading(false)
            }

        } else {
            setLoading(false)
            ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
        }
    }


    const checkItemInCart = async (id) => {
        setLoading(true)
        let res;
        const checkItemInCart = await cartApi.checkItemInCart(userAuthToken, id);
        if (checkItemInCart) {
            setLoading(false)
            if (checkItemInCart.data.success) {
                res = true
            } else {
                res = false
            }

        } else {
            setLoading(false)
            res = false
        }
        return res;
    }


    const donate = async () => {
        const rules = {
            name: 'required',
            cardNumber: 'required|number',
            month: 'required',
            year: 'required',
            cvv: 'required|number',


        }
        const message = {
            'name.required': 'Card holder name is Required.',
            'cardNumber.required': 'Card number is Required.',
            'cardNumber.number': 'Card number can not be string.',
            'month.required': 'Month is Required.',
            'year.required': 'Year number is Required.',
            'cvv.required': 'cvv is Required.',
            'cvv.number': 'cvv can not be string.',

        }
        validateAll(state, rules, message).then(async () => {
            const formaerrror = {};
            setstate({
                ...state,
                error: formaerrror
            })
            setLoading(true)
            let data = {}
            data.name = userData.name
            data.email = userData.email
            data.city = user.cityName
            data.state = user.stateName
            data.line1 = user.area
            data.country = user.countryName
            data.amount = selectedValue
            data.cardNumber = cardNumber
            data.cardExpMonth = month
            data.cardExpYear = year
            data.cardCVC = cvv
            data.postalCode = user.zip
            data.currency = user.currency
            data.currencySymbol = user.currencySymbol
            data.projectId = projectDetails._id
            data.organizationId = projectDetails?.campaignDetails?._id



            const donateToProject = await projectApi.donate(userAuthToken, data);
            if (donateToProject) {
                if (!donateToProject.data.success) {
                    setLoading(false)
                    ToastAlert({ msg: donateToProject.data.message, msgType: 'error' });
                } else {
                    let addXp = Number(selectedValue * 10)
                    dispatch(setUserXp(user.xp + addXp))
                    // await getUserRank()
                    ToastAlert({ msg: donateToProject.data.message, msgType: 'success' });
                    setLoading(false)
                    navigate('/')
                }

            } else {
                setLoading(false)
                ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
            }






        }).catch(errors => {
            setLoading(false)
            const formaerrror = {};
            if (errors.length) {
                errors.forEach(element => {
                    formaerrror[element.field] = element.message
                });
            } else {
                ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
            }

            setstate({
                ...state,
                error: formaerrror
            })

        });

    }


    useEffect(() => {
        (async () => {
            setLoading(true)
            // console.log(params.name)
            let projdata = {}
            const getProjectDetails = await projectApi.details(token, params.name);
            if (getProjectDetails.data.success === true) {
                // console.log(getProjectDetails.data.data[0]) 
                if (getProjectDetails.data.data.length) {
                    projdata = getProjectDetails.data.data[0]
                    if (user.countryId && user.countryId > 0) {

                        if (projdata.campaignDetails.country_id !== user.countryId) {
                            navigate('/')
                        }
                    }
                    setProjectDetails(projdata)
                    await getAllProjectList()
                    await getPurchasedItems(projdata._id)
                    await getDonationList(projdata._id)

                } else {
                    navigate('/')
                }
            } else {
                // navigate('/')
                // console.log('first')
            }
            setLoading(false)

        })()
    }, [params.name])
    return (
        <>
            <FrontLoader loading={loading} />
            <ProjectDetail
                projectDetails={projectDetails}
                projectList={projectList}
                addToCart={addToCart}
                checkItemInCart={checkItemInCart}
                purchasedItemList={purchasedItemList}
                selectedValue={selectedValue}
                setSelectedValue={setSelectedValue}
                stateData={state}
                cardNumberWithSpace={cardNumberWithSpace}
                changevalue={changevalue}
                donate={donate}
                donationList={donationList}

            />

        </>
    )

}