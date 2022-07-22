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
import { setCurrency, setUserLanguage, setCurrencyPrice, setProfileImage, setIsUpdateCart, setUserCountry, setUserAddress } from "../../user/user.action"
import advertisementApi from "../../Api/admin/advertisement";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { arrayUnique, getCalculatedPrice } from "../../Common/Helper";
import wishlistApi from "../../Api/frontEnd/wishlist";


export default function CategoryProductsController() {
    const [productList, setProductList] = useState([])
    const [advertisementList, setAdvertisementList] = useState([])
    const [homeadvertisementList, setHomeAdvertisementList] = useState([])
    const [categoryadvertisementList, setCategoryAdvertisementList] = useState([])
    const [countryAdvertisementList, setCountryAdvertisementList] = useState([])
    const getCalc = getCalculatedPrice();
    const navigate = useNavigate()

    const [wishListproductList, setWishListProductList] = useState([])
    const [wishListproductIds, setWishListProductIds] = useState([])


    const [productTags, setProductTags] = useState([])
    const [searchTag, setSearchTag] = useState([])
    const [suggestionTag, setSuggestionTag] = useState('')

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
    const params = useParams();
    const location = useLocation();
    const [categoryDetails, setCategoryDetails] = useState({
        name: "",
        color: "",
        icon: ""
    })
    const [price, setPrice] = useState()
    const [cartProductList, setCartProductList] = useState([])
    const [cartProductIds, setCartProductIds] = useState([])
    const [resultTags, setresultTags] = useState([])


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




    const onClickFilter = (e) => {

        setfilters({
            ...filters,
            [e.target.name]: e.target.checked
        })
    }







    const getHomePageAdList = async () => {
        const adList = await advertisementApi.listHomeAd(token)
        if (adList) {
            if (adList.data.success === true) {
                setHomeAdvertisementList(adList.data.data)
            }

        }
    }

    const getCategoryAdList = async (catId) => {
        let data = {}
        data.categoryId = catId
        const adList = await advertisementApi.listCategoryAdvertisement(token, data)
        if (adList) {

            if (adList.data.success === true) {
                if (adList.data.data.length > 0) {
                    let tempArray = []
                    adList.data.data.map((ad, i) => {

                        if (ad.advertisementsDetails.length > 0) {
                            ad.advertisementsDetails.map((a, i) => {
                                tempArray.push(a)

                            })
                        }
                        // setAdvertisementList([...advertisementList, ad.advertisementsDetails])
                    })
                    setCategoryAdvertisementList(tempArray)

                }
                // setAdvertisementList(adList.data.data)
            }

        }
    }

    // function arrayUnique(array) {
    //     let a = array.concat();
    //     for (let i = 0; i < a.length; ++i) {
    //         for (let j = i + 1; j < a.length; ++j) {
    //             if (a[i].name === a[j].name)
    //                 a.splice(j--, 1);
    //         }
    //     }

    //     return a;
    // }

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

    const addProductToWishlist = async (productId) => {
        let data = {}
        data.productId = productId
        setLoading(true)
        const add = await wishlistApi.add(token, data)
        if (add) {
            if (add.data.success) {
                setLoading(false)
                await getWishListProductList()
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


                await getWishListProductList()
                setLoading(false)

            }
        })()
    }, [user.isUpdateCart])

    useEffect(() => {
        (async () => {


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

            setCategoryDetails({
                ...categoryDetails,
                name: location.state.catName,
                color: location.state.theme_color,
                icon: location.state.catIcon
            })

            setPricingFees({
                ...pricingFees,
                platformFee: user.platformFee,
                transectionFee: user.transectionFee
            })

            await getCategoryAdList(location.state.id)
            await getHomePageAdList()
            // await getWishListProductList()


            setLoading(false)


        })()
    }, [user, location])

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

    const addToCart = async (id) => {
        if (token) {


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

    }

    useEffect(() => {
        (async () => {
            // console.log(params)
            // console.log(location.state.id)

            setLoading(true)
            await filterProduct(lowPrice, HighPrice, resultTags, user.countryId)
            setLoading(false)

            let arr = arrayUnique(categoryadvertisementList.concat(homeadvertisementList))
            setAdvertisementList(arr);
        })()
    }, [taxEligible, postTag, infinite, seletedCategoryList, lowToHigh, highToLow, oldEst, newEst, user.countryId, HighPrice, lowPrice, homeadvertisementList])


    const filterProduct = async (low_price = lowPrice, high_price = HighPrice, search_product = resultTags, userCountry = user.countryId) => {

        let data = {}

        data.search = search_product
        let temp = []
        temp.push(location.state.id)
        // console.log(temp)
        data.categoryId = temp
        // console.log(temp)

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



        data.HighPrice = high_price
        data.lowPrice = low_price





        const getFilteredProductList = await productApi.productFilter(token, data);
        if (getFilteredProductList.data.success === true) {
            setProductList(getFilteredProductList.data.data)
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


            }else{
            setCartProductList([])
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
    const deSelectTag = async (id) => {
        // console.log(searchTag)
        const findIndex = searchTag.findIndex(a => a.tag === id)
        let tags = [...searchTag]
        if (findIndex !== -1) tags.splice(findIndex, 1)
        // console.log(tags)
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
    return (
        <>

            <FrontLoader loading={loading} />
            <Index
                productList={productList}
                addToCart={addToCart}
                removeCartItem={removeCartItem}
                checkItemInCart={checkItemInCart}
                pricingFees={pricingFees}
                organizationList={organizationList}
                categoryList={categoryList}
                seletedCategoryList={seletedCategoryList}
                setfilters={setfilters}
                filters={filters}
                onClickFilter={onClickFilter}
                selectedKey={selectedKey}
                setSelectedKey={setSelectedKey}
                onChangeFilterOption={onChangeFilterOption}
                onChangePriceSlider={onChangePriceSlider}
                onSearchProduct={onSearchProduct}
                advertisementList={advertisementList}
                module='CATEGORY'
                categoryDetails={categoryDetails}
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