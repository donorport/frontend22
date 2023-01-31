import React, { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom";
import FrontLoader from "../../Common/FrontLoader";
import orderApi from "../../Api/admin/order";
import { hasPermission } from "../../Common/Helper";
import authApi from "../../Api/admin/auth";
import Index from "../../View/admin/Advertisement/index";
import CreateAdForm from "../../View/admin/Advertisement/CreateAdForm";
import { validateAll } from "indicative/validator";
import advertisementApi from "../../Api/admin/advertisement";
import ToastAlert from "../../Common/ToastAlert"
import { confirmAlert } from "react-confirm-alert"
import AdvertiseSetting from "../../View/admin/Advertisement/AdvertiseSetting";
import productApi from "../../Api/frontEnd/product";
import locationApi from "../../Api/frontEnd/location";
import categoryApi from "../../Api/admin/category";


export default function AdvertisementController() {

    const [advertiseList, setAdvertiseList] = useState([])
    const adminAuthToken = localStorage.getItem('adminAuthToken');
    const adminData = JSON.parse(localStorage.getItem('adminData'));
    const [loading, setLoading] = useState(false)
    const [modal, setModal] = useState(false)
    const [tempImg, setTempImg] = useState('')
    const [Img, setImg] = useState('')
    const [advertisementDetails, setAdvertisementDetails] = useState({})
    const [settingModal, setSettingModal] = useState(false)
    const [productList, setProductList] = useState([])
    const [publisedProductList, setPublisedProductList] = useState([])
    const [publisedProductIds, setPublisedProductIds] = useState([])
    const [countryList, setCountryList] = useState([])
    const [stateList, setStateList] = useState([])
    const [defaultCountry, setDefaultCountry] = useState([])
    const [category, setCategory] = useState([])
    const [publisedCatIds, setPublisedCatIds] = useState([])
    const [publisedStateIds, setPublisedStateIds] = useState([])
    const [defaultCountryCategory, setDefaultCountryCategory] = useState([])

    const [categoryStateList, setCategoryStateList] = useState([])
    const [defaultStateCountryCategory, setDefaultStateCountryCategory] = useState([])

    const [defaultStateCategory, setDefaultStateCategory] = useState([])

    const [publisedStateCatIds, setPublisedStateCatIds] = useState([])




    const params = useParams();
    const navigate = useNavigate();
    const [searchState, setSearchState] = useState({
        allSearch: '',
        MySearch: '',
        home: false,
        country: '',
        categoryCountry: '',
        categoryStateCountry: '',
        categoryState: ''



    })
    const {
        allSearch, MySearch, home, country, categoryCountry, categoryStateCountry, categoryState
    } = searchState;


    const [state, setstate] = useState({
        id: '',
        name: '',
        website: '',
        logo: '',
        status: 1,
        error: [],
    })
    const {
        id, status, name, website, logo, error
    } = state;

    const getAdVertiseList = async () => {
        const AdList = await advertisementApi.list(adminAuthToken)
        if (AdList) {
            if (AdList.data.success === true) {
                setAdvertiseList(AdList.data.data)

            }
        }
    }
    const onSearch = async (e) => {
        let value = e.target.value
        setSearchState({
            ...searchState,
            allSearch: value
        })
        await filterProduct(value)
    }

    const filterProduct = async (val) => {

        let data = {}
        data.searchProductName = val

        if (val !== "") {



            const getFilteredProductList = await productApi.productFilter(adminAuthToken, data);
            if (getFilteredProductList.data.success === true) {
                // console.log(getFilteredProductList.data.data)
                setProductList(getFilteredProductList.data.data)
            }
        } else {
            setProductList([])
        }
    }

    const publishOrRemoveAdFromProduct = async (productId, advertisementId) => {
        setLoading(false)
        let data = {}
        data.productId = productId
        data.advertisementId = advertisementId

        const advertisementPublish = await advertisementApi.publishAdd(adminAuthToken, data)
        if (advertisementPublish) {
            await listPublishedAdProduct(advertisementId)

        }

        setLoading(false)

    }

    const listPublishedAdProduct = async (advertisementId) => {
        let data = {}
        data.advertisementId = advertisementId

        const getListPublishedAdProduct = await advertisementApi.listPublishedAdd(adminAuthToken, data)
        if (getListPublishedAdProduct) {
            if (getListPublishedAdProduct.data.success === true) {

                if (getListPublishedAdProduct.data.data.length > 0) {
                    let tempArr = []
                    getListPublishedAdProduct.data.data.map((p, i) => {
                        tempArr.push(p.productId)
                    })
                    await getPublishedProducts(tempArr)
                    setPublisedProductIds(tempArr)
                } else {
                    setPublisedProductIds([])
                    setPublisedProductList([])

                }
            }
        }
    }

    const getPublishedProducts = async (arry) => {
        let data = {}
        const getFilteredProductList = await productApi.productFilter(adminAuthToken, data);
        if (getFilteredProductList.data.success === true) {
            if (getFilteredProductList.data.data.length > 0) {
                let temp = []
                getFilteredProductList.data.data.map((p, i) => {
                    if (arry.includes(p._id)) {
                        temp.push(p)
                    }
                })
                setPublisedProductList(temp)
            }


        }
    }

    const onChangeHome = async (e, id) => {
        setLoading(false)
        let data = {}
        data.home = e.target.checked
        setSearchState({
            ...searchState,
            home: e.target.checked
        })
        const up = await advertisementApi.updatehome(adminAuthToken, data, id)

        if (up) {

            if (up.data.success === true) {
                await getAdVertiseList()
                // setAdvertisementDetails(up.data.data)
                // console.log(up.data.data)

            }

        }
        setLoading(false)


    }


    const getCountryList = async () => {
        let tempArray = []

        const getCountryList = await locationApi.countryList();
        if (getCountryList) {
            if (getCountryList.data.success) {
                if (getCountryList.data.data.length > 0) {
                    getCountryList.data.data.map((country, i) => {
                        let Obj = {}

                        Obj.value = country.id
                        Obj.label = country.country
                        tempArray.push(Obj)

                    })
                    setCountryList(tempArray)



                }
            }
        }
    }


    const getCountryStateList = async (countryId, type) => {
        const getCountryStateList = await locationApi.stateListByCountry(adminAuthToken, Number(countryId));
        if (getCountryStateList) {
            if (getCountryStateList.data.success) {
                if (getCountryStateList.data.data.length > 0) {
                    if (type === 'home') {
                        setStateList(getCountryStateList.data.data)

                    } else {
                        setCategoryStateList(getCountryStateList.data.data)
                    }
                }
            }
        }
    }

    const getCategoryList = async () => {
        const categoryList = await categoryApi.listCategory(adminAuthToken);
        if (categoryList.data.success === true) {
            setCategory(categoryList.data.data)
        }
    }

    const onChangeCountry = async (e, advertisementId, type) => {

        if (type === 'home') {


            setDefaultCountry(e)
            setSearchState({
                ...searchState,
                country: e.value,
            })
            await getCountryStateList(e.value, type)
            await listPublishedAdToCountry(advertisementId, e.value)


        } else if (type === 'category') {
            setDefaultCountryCategory(e)
            setSearchState({
                ...searchState,
                categoryCountry: e.value,
            })
            await listPublishedAddToCategory(advertisementId, Number(e.value))

        } else {
            setDefaultStateCountryCategory(e)
            setSearchState({
                ...searchState,
                categoryStateCountry: e.value,
            })

            await getCountryStateList(e.value, type)


        }


    }


    const listByCategoryStateAndAdvertisement = async (stateId, advertisementId) => {
        let data = {}
        data.advertisementId = advertisementId
        data.countryId = Number(categoryStateCountry)
        data.stateId = Number(stateId)
        const getList = await advertisementApi.listByCategoryStateAndAdvertisement(data)

        if (getList && getList.data.success) {
            if (getList.data.data.length > 0) {
                let tempArray = []
                getList.data.data.map((listCat, key) => {
                    tempArray.push(listCat.categoryId)
                })
                setPublisedStateCatIds(tempArray)
            } else {
                setPublisedStateCatIds([])

            }
        }
    }


    const onChangeState = async (e, advertisementId) => {
        setDefaultStateCategory(e)
        setSearchState({
            ...searchState,
            categoryState: e.id,
        })
        await listByCategoryStateAndAdvertisement(e.id, advertisementId)
        // let data = {}
        // data.advertisementId = advertisementId
        // data.countryId = Number(categoryStateCountry)
        // data.stateId = Number(e.id)


        // const getList = await advertisementApi.listByCategoryStateAndAdvertisement(data)

        // if (getList && getList.data.success) {
        //     if (getList.data.data.length > 0) {
        //         let tempArray = []
        //         getList.data.data.map((listCat, key) => {
        //             tempArray.push(listCat.categoryId)
        //         })
        //         setPublisedStateCatIds(tempArray)
        //     } else {
        //         setPublisedStateCatIds([])

        //     }
        // }
    }

    const publishOrRemoveAdFromCategory = async (categoryId, advertisementId) => {
        setLoading(false)
        let data = {}
        data.categoryId = categoryId
        data.advertisementId = advertisementId
        data.countryId = Number(categoryCountry)


        const advertisementPublish = await advertisementApi.publishAddToCategory(adminAuthToken, data)
        if (advertisementPublish) {
            await listPublishedAddToCategory(advertisementId, Number(categoryCountry))
        }

        setLoading(false)

    }


    const listPublishedAddToCategory = async (advertisementId, countryId) => {


        let data = {}
        data.advertisementId = advertisementId
        data.countryId = countryId


        const getListPublishedAdCategory = await advertisementApi.listCategoryAdvertisement(adminAuthToken, data)
        if (getListPublishedAdCategory) {
            if (getListPublishedAdCategory.data.success === true) {

                if (getListPublishedAdCategory.data.data.length > 0) {
                    let tempArr = []
                    getListPublishedAdCategory.data.data.map((cat, i) => {
                        tempArr.push(cat.categoryId)
                    })

                    setPublisedCatIds(tempArr)
                } else {
                    setPublisedCatIds([])
                }
            }
        }
    }

    const listPublishedAdToCountry = async (advertisementId, countryId) => {


        let data = {}
        data.advertisementId = advertisementId
        data.countryId = countryId


        const getListPublishedAdCountry = await advertisementApi.listCountryAdvertisement(adminAuthToken, data)
        if (getListPublishedAdCountry) {
            if (getListPublishedAdCountry.data.success === true) {
                // console.log(getListPublishedAdCountry.data.data)
                if (getListPublishedAdCountry.data.data.length > 0) {
                    // console.log(getListPublishedAdCountry.data.data.length)

                    let tempArr = []
                    getListPublishedAdCountry.data.data.map((item, i) => {
                        tempArr.push(item.stateId)
                    })

                    setPublisedStateIds(tempArr)
                } else {
                    setPublisedStateIds([])
                }
            }
        }
    }


    const publishOrRemoveAdFromCountry = async (countryId, stateId, advertisementId) => {
        setLoading(false)
        let data = {}
        data.countryId = countryId
        data.stateId = stateId
        data.advertisementId = advertisementId

        const advertisementPublish = await advertisementApi.publishAddToCountry(adminAuthToken, data)
        if (advertisementPublish) {
            await listPublishedAdToCountry(advertisementId, countryId)
        }

        setLoading(false)

    }


    const publishOrRemoveAdFromCategoryState = async (categoryId, advertisementId) => {
        setLoading(true)
        let data = {}
        data.categoryId = categoryId
        data.advertisementId = advertisementId
        data.countryId = Number(categoryStateCountry)
        data.stateId = Number(categoryState)



        const advertisementPublish = await advertisementApi.addAdvertiseToCategoryCountryState(adminAuthToken, data)
        if (advertisementPublish) {
            await listByCategoryStateAndAdvertisement(Number(categoryState), advertisementId)
        }

        setLoading(false)

    }





    useEffect(() => {
        (async () => {
            setLoading(false)
            if (!hasPermission(adminData.roleName, 'ORDERS')) {
                navigate('/admin/dashboard')
            }
            const verifyUser = await authApi.verifyToken(adminAuthToken)
            if (!verifyUser.data.success) {
                localStorage.clear()
                navigate('/admin/login')
            }
            await getAdVertiseList()
            await getCountryList()


            setLoading(false)

        })()
    }, [])


    const changevalue = (e) => {
        let value = e.target.value;
        setstate({
            ...state,
            [e.target.name]: value
        })
    }


    const changefile = (e) => {
        let file = e.target.files[0] ? e.target.files[0] : '';
        setTempImg(URL.createObjectURL(file))

        setstate({
            ...state,
            logo: file
        })
    }

    const resetForm = () => {
        setImg('')
        setTempImg('')
        setstate({
            ...state,
            id: '',
            name: '',
            website: '',
            logo: '',
            status: 1,
            error: [],
        });

    }

    const openModel = () => {
        resetForm()
        setModal(true);

    }

    const submitAdForm = (e) => {
        // console.log(status)
        let rules;
        if (!id) {
            rules = {
                name: 'required',
                status: 'required',
                website: 'required',
                logo: 'required'
            }
        } else {
            rules = {
                name: 'required',
                status: 'required',
                website: 'required',
            }
        }

        const message = {
            'status.required': 'Status is Required.',
            'name.required': 'Name is Required.',
            'website.required': 'Website is Required.',
            'logo.required': 'Logo is Required.',



        }
        validateAll(state, rules, message).then(async () => {
            const formaerrror = {};
            setstate({
                ...state,
                error: formaerrror
            })

            let data = {}
            data.name = name
            data.website = website
            data.status = status
            if (logo && logo !== "") {
                data.logo = logo

            }


            let createAd;
            // Api Call for update Profile
            setLoading(true)
            if (id !== '') {
                createAd = await advertisementApi.updateAdvertisement(adminAuthToken, data, id)
            } else {
                createAd = await advertisementApi.add(adminAuthToken, data)
            }


            if (createAd) {
                if (createAd.data.success === false) {
                    setLoading(false)
                    ToastAlert({ msg: createAd.data.message, msgType: 'error' });

                } else {
                    if (createAd.data.success === true) {
                        setModal(false)
                        resetForm()
                        // await getDonationList()
                        await getAdVertiseList()
                        setLoading(false)
                        ToastAlert({ msg: createAd.data.message, msgType: 'success' });
                    }
                }
            } else {
                setLoading(false)
                ToastAlert({ msg: 'Category not save', msgType: 'error' });
            }

        }).catch(errors => {
            setLoading(false)
            const formaerrror = {};
            if (errors.length) {
                errors.forEach(element => {
                    formaerrror[element.field] = element.message
                });
            } else {
                ToastAlert({ msg: 'Something Went Wrong', msgType: 'error' });
            }

            setstate({
                ...state,
                error: formaerrror
            })

        });

    }

    const editAd = (data) => {
        setLoading(false)
        if ((data) && data !== null && data !== '') {
            setstate({
                ...state,
                id: data._id,
                name: data.name,
                website: data.website,
                status: data.status,
                error: [],
            });

            setImg(data.logo)
            setModal(true)

        }
        setLoading(false)


    }

    const deleteAd = (id) => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to delete Advertisement.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: (async () => {
                        setLoading(false)
                        if (id !== '') {
                            const deleteAd = await advertisementApi.deleteAdvertisement(adminAuthToken, id)
                            if (deleteAd) {
                                if (deleteAd.data.success === false) {
                                    setLoading(false)
                                    ToastAlert({ msg: deleteAd.data.message, msgType: 'error' });
                                } else {
                                    if (deleteAd.data.success === true) {
                                        setLoading(false)
                                        ToastAlert({ msg: deleteAd.data.message, msgType: 'success' });
                                        await getAdVertiseList()
                                    }
                                }
                            } else {
                                setLoading(false)
                                ToastAlert({ msg: 'Advertsiement not delete', msgType: 'error' });
                            }
                        } else {
                            setLoading(false)
                            ToastAlert({ msg: 'Advertsiement not delete id Not found', msgType: 'error' });
                        }
                    })
                },
                {
                    label: 'No',
                }
            ]
        });
    }


    const adSetting = async (data) => {
        setAdvertisementDetails(data)
        setLoading(false)
        await listPublishedAdProduct(data._id)
        await listPublishedAddToCategory(data._id)
        // await listPublishedAdToCountry(data._id)
        await getCategoryList()
        setSearchState({
            ...searchState,
            home: data.home,
            allSearch: '',
            MySearch: '',
            country: '',
            categoryCountry: '',
            categoryStateCountry: '',
            categoryState: ''
        })
        setLoading(false)
        setProductList([])
        setSettingModal(true)
        setDefaultCountry([])
        setStateList([])
        setDefaultCountryCategory([])
        setDefaultStateCountryCategory([])
        setCategoryStateList([])
        setDefaultStateCategory([])
    }

    return (
        <>
           {/*<FrontLoader loading={loading} />*/}
            <Index
                advertiseList={advertiseList}
                openModel={openModel}
                editAd={editAd}
                deleteAd={deleteAd}
                adSetting={adSetting}

            />
            <CreateAdForm
                stateData={state}
                setModal={setModal}
                modal={modal}
                changevalue={changevalue}
                changefile={changefile}
                tempImg={tempImg}
                Img={Img}
                submitAdForm={submitAdForm}


            />
            <AdvertiseSetting
                advertisementDetails={advertisementDetails}
                settingModal={settingModal}
                setSettingModal={setSettingModal}
                onSearch={onSearch}
                productList={productList}
                publishOrRemoveAdFromProduct={publishOrRemoveAdFromProduct}
                publisedProductIds={publisedProductIds}
                publisedProductList={publisedProductList}
                allSearch={allSearch}
                onChangeHome={onChangeHome}
                home={home}
                categoryCountry={categoryCountry}
                countryList={countryList}
                onChangeCountry={onChangeCountry}
                defaultCountry={defaultCountry}
                stateList={stateList}
                category={category}
                publishOrRemoveAdFromCategory={publishOrRemoveAdFromCategory}
                publisedCatIds={publisedCatIds}
                publisedStateIds={publisedStateIds}
                publishOrRemoveAdFromCountry={publishOrRemoveAdFromCountry}
                defaultCountryCategory={defaultCountryCategory}
                defaultStateCountryCategory={defaultStateCountryCategory}
                categoryStateList={categoryStateList}
                categoryStateCountry={categoryStateCountry}
                onChangeState={onChangeState}
                defaultStateCategory={defaultStateCategory}
                categoryState={categoryState}
                publishOrRemoveAdFromCategoryState={publishOrRemoveAdFromCategoryState}
                publisedStateCatIds={publisedStateCatIds}
            />


        </>
    )

}