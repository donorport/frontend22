import Index from "../../View/frontEnd/Layout/Home/Index";
import productApi from "../../Api/frontEnd/product";
import React, { useState, useEffect, useContext } from "react"
import FrontLoader from "../../Common/FrontLoader";
import ToastAlert from "../../Common/ToastAlert";
import cartApi from "../../Api/frontEnd/cart";
import settingApi from "../../Api/admin/setting";
// import { UserContext } from '../../App';
import adminCampaignApi from "../../Api/admin/adminCampaign";
import categoryApi from "../../Api/admin/category";
import locationApi from "../../Api/frontEnd/location";
import { useSelector, useDispatch } from "react-redux";
import { setCurrency, setUserLanguage, setCurrencyPrice, setIsUpdateCart, setProfileImage, setUserCountry, setUserAddress, setUserState, setSalesTax } from "../../user/user.action"
import advertisementApi from "../../Api/admin/advertisement";
import { arrayUnique, getCalculatedPrice } from "../../Common/Helper";
import wishlistApi from "../../Api/frontEnd/wishlist";
import { useNavigate } from "react-router-dom";



export default function HomeController() {
    const [productList, setProductList] = useState([])
    const [advertisementList, setAdvertisementList] = useState([])
    const [countryAdvertisementList, setCountryAdvertisementList] = useState([])
    const [homeadvertisementList, setHomeAdvertisementList] = useState([])
    const [wishListproductList, setWishListProductList] = useState([])
    const [wishListproductIds, setWishListProductIds] = useState([])
    const [productTags, setProductTags] = useState([])
    const [searchTag, setSearchTag] = useState([])
    const [suggestionTag, setSuggestionTag] = useState('')
    const [resultTags, setresultTags] = useState([])




    const getCalc = getCalculatedPrice();

    const navigate = useNavigate()
    // const adminAuthToken = localStorage.getItem('adminAuthToken');
    const [loading, setLoading] = useState(false)
    const userAuthToken = localStorage.getItem('userAuthToken');
    const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
    // const user = useContext(UserContext)
    const user = useSelector((state) => state.user);
    const token = userAuthToken ? userAuthToken : CampaignAdminAuthToken
    const [categoryList, setCategoryList] = useState([])
    const [update, setIsUpdate] = useState(false)
    const [inCart, setInCart] = useState(false)
    const [organizationList, setOrganizationList] = useState([])
    const [seletedCategoryList, setSeletedCategoryList] = useState([])
    const [selectedKey, setSelectedKey] = useState(3)
    const dispatch = useDispatch()
    const userData = JSON.parse(localStorage.getItem('userData'));
    const CampaignAdmin = JSON.parse(localStorage.getItem('CampaignAdmin'));
    const [price, setPrice] = useState()
    const [cartProductList, setCartProductList] = useState([])
    const [cartProductIds, setCartProductIds] = useState([])



    const [address, setAddress] = useState({
        stateName: "",
        zip: "",
        cityName: "",
        area: "",
        countryName: "",
    })

    const [filters, setfilters] = useState({
        taxEligible: false,
        postTag: false,
        infinite: false,

        lowToHigh: false,
        highToLow: false,
        oldEst: false,
        newEst: false,
        leastFunded: false,
        mostFunded: false,


        HighPrice: 3000,
        lowPrice: 0,

        search: "",



    })
    const { taxEligible, postTag, infinite, lowToHigh, highToLow, oldEst, newEst, leastFunded, mostFunded, HighPrice, lowPrice, search } = filters



    const [pricingFees, setPricingFees] = useState({
        platformFee: 0,
        transectionFee: 0,

    })

    const { platformFee, transectionFee } = pricingFees


    const getOrganizationList = async () => {
        const getOrganizationList = await adminCampaignApi.list(token)
        if (getOrganizationList.data.success === true) {
            setOrganizationList(getOrganizationList.data.data)
        }
    }

    const onClickFilter = (e) => {

        setfilters({
            ...filters,
            [e.target.name]: e.target.checked
        })
    }

    function showError(error) {
        if (error) {
            console.log(error)
            if (userAuthToken) {
                if (userData.country_id && userData.country_id !== null && userData.country_id > 0) {
                    dispatch(setUserCountry(userData.country_id))
                    let currencyData = {}
                    currencyData.currency = userData.currency
                    currencyData.currencySymbol = userData.symbol
                    dispatch(setCurrency(currencyData))
                } else {
                    dispatch(setUserCountry(233))


                }
                if (userData.state_id && userData.state_id !== null && userData.state_id > 0) {
                    dispatch(setUserState(userData.state_id))

                } else {
                    dispatch(setUserState(3830))
                }

            } else {
                if (CampaignAdmin.country_id && CampaignAdmin.country_id !== null && CampaignAdmin.country_id > 0) {
                    dispatch(setUserCountry(CampaignAdmin.country_id))
                } else {
                    dispatch(setUserCountry(233))

                }

                if (CampaignAdmin.state_id && CampaignAdmin.state_id !== null && CampaignAdmin.state_id > 0) {
                    dispatch(setUserState(CampaignAdmin.state_id))
                } else {
                    dispatch(setUserState(3830))

                }

                // dispatch(setUserCountry(CampaignAdmin.country_id))

            }
        }

    }

    const getStateDetailsByName = async (Name) => {
        let data = {}
        data.name = Name
        const getStateDetails = await locationApi.stateDetailsByName(token, data)
        if (getStateDetails) {
            if (getStateDetails.data.success) {
                dispatch(setUserState(getStateDetails.data.data.id))
            }
        }

    }


    const getSalestax = async (country, state) => {
        let data = {}
        data.countryId = Number(country)
        data.stateId = Number(state)
        const getSalestax = await locationApi.getSalesTaxRate(userAuthToken, data)
        if (getSalestax) {
            if (getSalestax.data.success) {
                // console.log(getSalestax.data.salesTax)
                dispatch(setSalesTax(getSalestax.data.salesTax))

            }
        }
    }



    async function showPosition(position) {
        // console.log('show')
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        console.log(latitude, longitude)
        if (latitude && longitude) {

            const getLocationByLatLong = await locationApi.getLocationByLatLong(latitude, longitude)
            if (getLocationByLatLong && getLocationByLatLong.data.status === "OK") {
                if (getLocationByLatLong.data.results.length > 0) {

                    let jsObjects = getLocationByLatLong.data.results[0].address_components
                    let tempObj = {}
                    tempObj.stateName = jsObjects.find(settings => settings.types[0] === 'administrative_area_level_1').long_name
                    tempObj.zip = jsObjects.find(settings => settings.types[0] === 'postal_code').long_name
                    tempObj.cityName = jsObjects.find(settings => settings.types[0] === 'administrative_area_level_2').long_name
                    tempObj.area = jsObjects.find(settings => settings.types[0] === 'route').long_name
                    tempObj.countryName = jsObjects.find(settings => settings.types[0] === 'country').long_name
                    tempObj.lat = latitude
                    tempObj.lng = longitude
                    console.log(tempObj)

                    dispatch(setUserAddress(tempObj))
                    // console.log(jsObjects.find(settings => settings.types[0] === 'administrative_area_level_1').long_name)

                    jsObjects.filter(async obj => {
                        let tempObj = {}

                        if (obj.types[0] === 'country') {
                            let countryName = obj.long_name
                            tempObj.countryName = countryName


                            // setAddress({
                            //     ...address,
                            //     countryName: countryName
                            // })




                            const getCountryData = await locationApi.currencyByCountry(token, countryName)
                            if (getCountryData) {
                                if (getCountryData.data.success) {

                                    dispatch(setUserCountry(getCountryData.data.data.id))

                                    let currencyData = {}
                                    currencyData.currency = getCountryData.data.data.currency
                                    currencyData.currencySymbol = getCountryData.data.data.symbol
                                    dispatch(setCurrency(currencyData))

                                }
                            }

                        }


                    })
                    await getStateDetailsByName(jsObjects.find(settings => settings.types[0] === 'administrative_area_level_1').long_name)


                }

            }
        }





    }

    const getHomePageAdList = async () => {
        const adList = await advertisementApi.listHomeAd(token)
        if (adList) {
            if (adList.data.success === true) {
                setHomeAdvertisementList(adList.data.data)
            }

        }
    }

    const getWishListProductList = async () => {
        const list = await wishlistApi.list(token)
        if (list) {
            if (list.data.success) {
                setWishListProductList(list.data.data)
                if (list.data.data.length > 0) {
                    let temp = []
                    list.data.data.map((item, i) => {
                        temp.push(item.productDetails._id)
                    })
                    setWishListProductIds(temp)

                } else {
                    setWishListProductIds([])

                }
            }
        }

    }

    const addProductToWishlist = async (productId) => {
        let data = {}
        data.productId = productId
        setLoading(true)
        const add = await wishlistApi.add(token, data)
        if (add) {
            if (add.data.success) {
                setLoading(false)
                // await getWishListProductList()
                dispatch(setIsUpdateCart(!user.isUpdateCart))
            } else {
                setLoading(false)

                ToastAlert({ msg: add.data.message, msgType: 'error' });

            }

        } else {
            setLoading(false)
            ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
        }
    }

    useEffect(() => {
        (async () => {
            if (userAuthToken) {
                await getCartList()

                setLoading(true)
                await getWishListProductList()
                setLoading(false)
            }

            // console.log(Math.floor(10000000 + Math.random() * 90000000))

        })()
    }, [user.isUpdateCart, userAuthToken])





    useEffect(() => {
        (async () => {

            // function getLocation() {
            // console.log(user.xp)
            //   }
            setLoading(true)
            let obj = {}
            obj.userCountry = user.countryId
            const getproductList = await productApi.list(token, obj);
            if (getproductList.data.success === true) {

                if (getproductList.data.data.length > 0) {
                    let productTagsArray = []
                    await Promise.all(getproductList.data.data.map(async (p, i) => {




                        await Promise.all(p.tags.map((value, i) => {
                            let tempObj = {}
                            tempObj.color = p.categoryDetails.color ? p.categoryDetails.color : 'red'

                            tempObj.tag = value
                            productTagsArray.push(tempObj);



                        }))
                    }))
                    productTagsArray = productTagsArray.filter((value, index, self) =>
                        index === self.findIndex((t) => (
                            t.tag === value.tag
                        ))
                    )

                    setProductTags(productTagsArray)

                } else {
                    setProductTags([])
                }
            }
            setPricingFees({
                ...pricingFees,
                platformFee: user.platformFee,
                transectionFee: user.transectionFee
            })
            // const getSettingsValue = await settingApi.list(userAuthToken ? userAuthToken : CampaignAdminAuthToken, Object.keys(pricingFees));

            // if (getSettingsValue.data.success) {
            //     let data = {}

            //     getSettingsValue.data.data.map((d, i) => {
            //         data[d.name] = d.value
            //     })
            //     setPricingFees({
            //         ...data
            //     })
            // }

            await getHomePageAdList()
            await getCountryAdvertisement(user.countryId, user.stateId)
            // if (user.countryId && user.stateId) {
            // }
            await getSalestax(user.countryId, user.stateId)


            const getCategoryList = await categoryApi.listCategory(token);
            if (getCategoryList.data.success === true) {
                // console.log(getCategoryList.data.data)
                setCategoryList(getCategoryList.data.data)
            }
            // await getOrganizationList()
            // await getWishListProductList()
            setLoading(false)


        })()
    }, [user.countryId, user.stateId])

    const checkItemInCart = async (id) => {
        let res;
        const checkItemInCart = await cartApi.checkItemInCart(userAuthToken, id);
        if (checkItemInCart) {
            if (checkItemInCart.data.success) {
                setInCart(true)
                res = true
            } else {
                setInCart(false)
                res = false

            }

        } else {
            setLoading(false)
            setInCart(false)
            ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
            res = false
        }
        return res;
    }

    const getCartList = async () => {
        const getCartList = await cartApi.list(userAuthToken);
        if (getCartList.data.success === true) {
            if (getCartList.data.data.length > 0) {
                let productIds = []
                getCartList.data.data.map((p, i) => {
                    productIds.push(p.productId)
                })
                setCartProductIds(productIds)
            } else {
                setCartProductIds([])

            }

        }
    }

    const addToCart = async (id) => {
        if (token) {
            if (userAuthToken) {

                setLoading(true)
                let data = {}
                data.productId = id
                const addItemToCart = await cartApi.add(userAuthToken, data);
                if (addItemToCart) {
                    if (!addItemToCart.data.success) {
                        setLoading(false)
                        ToastAlert({ msg: addItemToCart.data.message, msgType: 'error' });
                    } else {
                        setIsUpdate(!update)
                        ToastAlert({ msg: addItemToCart.data.message, msgType: 'success' });
                        setLoading(false)
                    }

                } else {
                    setLoading(false)
                    ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
                }
            } else {
                setLoading(false)
                ToastAlert({ msg: 'Please Login as a User', msgType: 'error' });
            }
        } else {
            navigate('/signin')
        }
    }

    const removeCartItem = async (id) => {
        setLoading(true)
        const removeCartItem = await cartApi.removeCartProduct(userAuthToken, id);
        if (removeCartItem) {
            if (!removeCartItem.data.success) {
                setLoading(false)
                ToastAlert({ msg: removeCartItem.data.message, msgType: 'error' });
            } else {
                setIsUpdate(!update)
                ToastAlert({ msg: removeCartItem.data.message, msgType: 'success' });
                setLoading(false)
            }

        } else {
            setLoading(false)
            ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
        }
    }


    const onSelectCategory = async (e) => {

        if (e.target.checked) {
            setSeletedCategoryList([...seletedCategoryList, e.target.value])
            let data = {}
            // data.categoryId = [...seletedCategoryList, e.target.value]
            // await filterProduct(data)
        } else {

            let tempArry = [...seletedCategoryList]
            const index = tempArry.indexOf(e.target.value);
            if (index > -1) {
                tempArry.splice(index, 1);
                // let data = {}
                // data.categoryId = tempArry
                // await filterProduct(data)
            }

            setSeletedCategoryList(tempArry)

        }


    }

    const removeCatFromFilter = (id) => {
        let tempArry = [...seletedCategoryList]
        const index = tempArry.indexOf(id);
        if (index > -1) {
            tempArry.splice(index, 1);
        }
        setSeletedCategoryList(tempArry)
    }

    const onChangeFilterOption = (index) => {

        setSelectedKey(index)
        switch (index) {
            case 0:
                setfilters({
                    ...filters,
                    lowToHigh: true,
                    highToLow: false,
                    oldEst: false,
                    newEst: false,
                    leastFunded: false,
                    mostFunded: false,
                })

                break;
            case 1:

                setfilters({
                    ...filters,
                    lowToHigh: false,
                    highToLow: true,
                    oldEst: false,
                    newEst: false,
                    leastFunded: false,
                    mostFunded: false,
                })
                break;
            case 2:

                setfilters({
                    ...filters,
                    lowToHigh: false,
                    highToLow: false,
                    oldEst: true,
                    newEst: false,
                    leastFunded: false,
                    mostFunded: false,
                })
                break;
            case 3:

                setfilters({
                    ...filters,
                    lowToHigh: false,
                    highToLow: false,
                    oldEst: false,
                    newEst: true,
                    leastFunded: false,
                    mostFunded: false,
                })
                break;
            case 4:
                productList.sort(function (a, b) {
                    let firstPer = a.soldout / a.quantity * 100;
                    let secPer = b.soldout / b.quantity * 100;;
                    return firstPer - secPer;
                })

                setfilters({
                    ...filters,
                    lowToHigh: false,
                    highToLow: false,
                    oldEst: false,
                    newEst: false,
                    leastFunded: true,
                    mostFunded: false,
                })
                break;
            case 5:


                productList.sort(function (a, b) {
                    let firstPer = a.soldout / a.quantity * 100;
                    let secPer = b.soldout / b.quantity * 100;;
                    return secPer - firstPer;
                })

                setfilters({
                    ...filters,
                    lowToHigh: false,
                    highToLow: false,
                    oldEst: false,
                    newEst: false,
                    leastFunded: false,
                    mostFunded: true,
                })
                break;
            default:
                setfilters({
                    ...filters,
                    lowToHigh: false,
                    highToLow: false,
                    oldEst: false,
                    newEst: true,
                })
                break;

        }

    }

    const onChangePriceSlider = async (e) => {
        setfilters({
            ...filters,
            HighPrice: e[1],
            lowPrice: e[0]
        })
        // await filterProduct(e[0], e[1], search)
    }

    useEffect(() => {
        (async () => {
            if (user.countryId === null || user.countryId === undefined || user.countryId === "") {

                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(showPosition, showError);
                } else {
                    if (userAuthToken) {

                        dispatch(setUserCountry(userData.country_id))
                    } else {


                        dispatch(setUserCountry(CampaignAdmin.country_id))

                    }
                }
            } else {
                // console.log(user.countryId)
                // await getCountryAdvertisement(user.countryId,user.stateId)

                setLoading(true)
                await filterProduct(lowPrice, HighPrice, resultTags, user.countryId)
                setLoading(false)
            }

            let arr = arrayUnique(countryAdvertisementList.concat(homeadvertisementList))
            setAdvertisementList(arr);


        })()
    }, [taxEligible, postTag, infinite, seletedCategoryList, lowToHigh, highToLow, oldEst, newEst, user.countryId, HighPrice, lowPrice, countryAdvertisementList])


    const filterProduct = async (low_price = lowPrice, high_price = HighPrice, search_product = resultTags, userCountry = user.countryId) => {
        // console.log('first')
        let data = {}

        data.search = search_product

        data.categoryId = seletedCategoryList

        data.tax = taxEligible
        data.postTag = postTag
        data.infinite = infinite

        data.lowToHigh = lowToHigh
        data.highToLow = highToLow
        data.oldEst = oldEst
        data.newEst = newEst

        data.userCountry = userCountry
        // console.log(userCountry)

        // data.leastFunded = leastFunded
        // data.mostFunded = mostFunded

        // console.log(search_product)

        data.HighPrice = high_price
        data.lowPrice = low_price





        const getFilteredProductList = await productApi.productFilter(token, data);
        if (getFilteredProductList.data.success === true) {
            // console.log(getFilteredProductList.data.data)
            setProductList(getFilteredProductList.data.data)
            // if (getFilteredProductList.data.data.length > 0) {
            //     let productTagsArray = []
            //     getFilteredProductList.data.data.map((p, i) => {
            //         // console.log(p)

            //         let tempObj = {}
            //         tempObj.color = p.categoryDetails.color
            //         // console.log(p.tags.split(','))
            //         p.tags.split(',').map((value, i) => {
            //             if (productTagsArray.indexOf(value) === -1) {

            //                 tempObj.tag = value
            //                 productTagsArray.push(tempObj);
            //             }


            //         })
            //     })
            //     productTagsArray = productTagsArray.filter((value, index, self) =>
            //         index === self.findIndex((t) => (
            //             t.tag === value.tag
            //         ))
            //     )
            //     setProductTags(productTagsArray)

            // } else {
            //     setProductTags([])
            // }

            // if (getFilteredProductList.data.data.length > 0) {
            //     let tempArray = []
            //     getFilteredProductList.data.data.map((p, i) => {
            //         // if (p.campaignDetails.country_id === user.countryId) {

            //         tempArray.push(p)
            //         // }

            //     })
            //     setProductList(tempArray)

            // }
        } else {
            // setLoading(false)

        }
    }


    const onSearchProduct = async (e, type) => {

        setSuggestionTag('')

        let value = e.target.value

        setfilters({
            ...filters,
            search: value
        })
        // console.log(value)

        // console.log(productTags)

        if (value) {

            let tempPtag = [...productTags]
            let tags = tempPtag.sort(function (a, b) {
                if (a.tag < b.tag) { return -1; }
                if (a.tag > b.tag) { return 1; }
                return 0;
            }).filter(option => option.tag.startsWith(value))

            // console.log(tags)



            if (tags.length > 0) {

                let tag = tags[0];
                // console.log(tag)

                setSuggestionTag(tag.tag)



                let t = tag ? [...searchTag, tag] : [...searchTag]

                t = t.filter((value, index, self) =>
                    index === self.findIndex((t) => (
                        t.tag === value.tag
                    ))
                )

                if (type === 'keydown') {

                    if (e.key === 'Enter') {
                        setSearchTag(t)
                        setfilters({
                            ...filters,
                            search: ''
                        })
                        setSuggestionTag('')

                        let finalArray = []
                        if (t.length > 0) {
                            t.map((t1, key) => {
                                finalArray.push(t1.tag)
                            })
                        }
                        setresultTags(finalArray)
                        // console.log(finalArray)

                        setLoading(true)
                        await filterProduct(lowPrice, HighPrice, finalArray, user.countryId)
                        setLoading(false)
                    }
                }
            } else {
                setSuggestionTag('')

            }
        } else {
            setSuggestionTag('')

        }






        // setSearchTag(productTags.sort(function (a, b) {
        //     if (a.tag < b.tag) { return -1; }
        //     if (a.tag > b.tag) { return 1; }
        //     return 0;
        // }).filter(option => option.tag.startsWith(value))[0])

        // console.log(productTags.startsWith(value))
        // console.log(productList.filter(e => e.tags.includes('car')))

        // await filterProduct(lowPrice, HighPrice, value, user.countryId)

    }

    const deSelectTag = async (id) => {

        const findIndex = searchTag.findIndex(a => a.tag === id)
        let tags = [...searchTag]
        if (findIndex !== -1) tags.splice(findIndex, 1)

        setfilters({
            ...filters,
            search: ''
        })
        setSuggestionTag('')
        setSearchTag(tags)

        let finalArray = []
        if (tags.length > 0) {
            tags.map((t1, key) => {
                finalArray.push(t1.tag)
            })
        }
        setresultTags(finalArray)

        setLoading(true)
        await filterProduct(lowPrice, HighPrice, finalArray, user.countryId)
        setLoading(false)
    }

    const getCountryAdvertisement = async (countryId, stateId) => {
        let data = {}
        data.countryId = countryId
        data.stateId = stateId
        const getCountryAdvertisementList = await advertisementApi.listCountryAdvertisement(token, data)

        if (getCountryAdvertisementList) {
            if (getCountryAdvertisementList.data.success) {
                if (getCountryAdvertisementList.data.data.length > 0) {
                    let tempArray = []
                    getCountryAdvertisementList.data.data.map((ad, i) => {
                        if (ad.advertisementsDetails.length > 0) {
                            ad.advertisementsDetails.map((a, i) => {
                                tempArray.push(a)

                            })
                        }

                    })
                    setCountryAdvertisementList(tempArray)
                }
            }
        }
    }

    const onChangeDonatePrice = async (e) => {
        let value = e.target.value.replace(/[^\d.]|\.(?=.*\.)/g, "");
        setPrice(value)
        if (Number(value) > 0) {


            let cart = [];
            let cartTotal = 0;
            let p = productList.filter(e => getCalc.getData(e.price) < value)



            if (p.length > 0) {
                p.map((itm, key) => {

                    if (value > cartTotal + getCalc.getData(itm.price)) {
                        cart.push(itm._id)
                        setCartProductList(cart)
                        cartTotal += getCalc.getData(itm.price)
                    }

                })

                if (value - cartTotal > 0) {

                    while (p.length > 0) {
                        p = productList.filter(e => getCalc.getData(e.price) < value - cartTotal)


                        if (p.length > 0) {
                            p.map((itm, key) => {

                                if (value > cartTotal + getCalc.getData(itm.price)) {
                                    cart.push(itm._id)
                                    setCartProductList(cart)
                                    cartTotal += getCalc.getData(itm.price)

                                }

                            })
                        }
                    }

                }


            }
        } else {
            setCartProductList([])
        }

    }

    const onClickAddToCart = async () => {
        if (token) {


            if (cartProductList.length > 0) {
                let data = {}
                let tempArray = []
                cartProductList.map((itm, i) => {
                    let tempobj = {}
                    if (tempArray.some(e => e.productId === itm)) {
                        let objIndex = tempArray.findIndex((obj => obj.productId === itm));
                        tempArray[objIndex].qty += 1
                    } else {
                        tempobj.productId = itm
                        tempobj.qty = 1
                        tempArray.push(tempobj)
                    }


                })


                data.productIds = tempArray
                setLoading(false)
                const addMultiple = await cartApi.addMultiple(token, data)

                if (addMultiple) {
                    if (!addMultiple.data.success) {
                        setLoading(false)
                        ToastAlert({ msg: addMultiple.data.message, msgType: 'error' });
                    } else {
                        setIsUpdate(!update)
                        dispatch(setIsUpdateCart(!user.isUpdateCart))
                        setCartProductList([])
                        setPrice('')
                        ToastAlert({ msg: addMultiple.data.message, msgType: 'success' });
                        setLoading(false)
                    }

                } else {
                    setLoading(false)
                    ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
                }
            }
        } else {
            navigate('/signin')
        }


    }



    return (
        <>
            {/* {console.log(user)} */}

            <FrontLoader loading={loading} />
            <Index
                productList={productList}
                addToCart={addToCart}
                removeCartItem={removeCartItem}
                checkItemInCart={checkItemInCart}
                pricingFees={pricingFees}
                organizationList={organizationList}
                categoryList={categoryList}
                onSelectCategory={onSelectCategory}
                seletedCategoryList={seletedCategoryList}
                removeCatFromFilter={removeCatFromFilter}
                filterProduct={filterProduct}
                setfilters={setfilters}
                filters={filters}
                onClickFilter={onClickFilter}
                selectedKey={selectedKey}
                setSelectedKey={setSelectedKey}
                onChangeFilterOption={onChangeFilterOption}
                onChangePriceSlider={onChangePriceSlider}
                onSearchProduct={onSearchProduct}
                advertisementList={advertisementList}
                module='HOME'
                addProductToWishlist={addProductToWishlist}
                wishListproductIds={wishListproductIds}
                price={price}
                onChangeDonatePrice={onChangeDonatePrice}
                cartProductList={cartProductList}
                onClickAddToCart={onClickAddToCart}
                cartProductIds={cartProductIds}
                searchTag={searchTag}
                deSelectTag={deSelectTag}
                suggestionTag={suggestionTag}



            />
        </>
    )

}