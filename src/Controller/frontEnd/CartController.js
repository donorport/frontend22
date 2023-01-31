import React, { useState, useEffect, useContext } from "react"
import { useParams, useNavigate } from "react-router-dom";
import FrontLoader from "../../Common/FrontLoader";
import Cart from "../../View/frontEnd/cart";
import cartApi from "../../Api/frontEnd/cart";
import authApi from "../../Api/admin/auth";
import ToastAlert from "../../Common/ToastAlert";
// import { UserContext } from '../../App';
import settingApi from "../../Api/admin/setting";
import Page from '../../components/Page';


export default function CartController() {
    const [cartItem, setCartItem] = useState([])
    const userAuthToken = localStorage.getItem('userAuthToken');
    const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
    const token = userAuthToken ? userAuthToken : CampaignAdminAuthToken

    // const user = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const [update, setIsUpdate] = useState(false)
    const params = useParams();
    const navigate = useNavigate();
    const [pricingFees, setPricingFees] = useState({
        platformFee: 0,
        transactionFee: 0,

    })
    const { platformFee, transactionFee } = pricingFees

    const getFeesValues = async () => {
        const getSettingsValue = await settingApi.list(userAuthToken ? userAuthToken : CampaignAdminAuthToken, Object.keys(pricingFees));

        if (getSettingsValue.data.success) {
            let data = {}

            getSettingsValue.data.data.map((d, i) => {
                data[d.name] = d.value
            })

            setPricingFees({
                ...data
            })
            // user.settransactionFee(data.transactionFee)
            // user.setPlatformFee(data.platformFee)


        }
    }


    useEffect(() => {
        (async () => {
            setLoading(true)
            if (userAuthToken) {
                const verifyUser = await authApi.verifyToken(userAuthToken ? userAuthToken : CampaignAdminAuthToken)
                if (!verifyUser.data.success) {
                    localStorage.clear()
                    navigate('/login')
                }
            }
            await getFeesValues()

            const getCartList = await cartApi.list(userAuthToken ? userAuthToken : CampaignAdminAuthToken);
            if (getCartList.data.success === true) {
                setCartItem(getCartList.data.data)
            }
            setLoading(false)



            // setPricingFees({
            //     ...pricingFees,
            //     platformFee:user.platformFee,
            //     transactionFee:user.transactionFee
            // })

        })()
    }, [update, token])

    const removeCartItem = async (id) => {
        setLoading(true)
        const removeCartItem = await cartApi.deleteCartItem(userAuthToken ? userAuthToken : CampaignAdminAuthToken, id);
        if (removeCartItem) {
            if (!removeCartItem.data.success) {
                setLoading(false)
                ToastAlert({ msg: removeCartItem.data.message, msgType: 'error' });

            } else {
                setIsUpdate(!update)
                /*ToastAlert({ msg: removeCartItem.data.message, msgType: 'success' });*/
                setLoading(false)
            }

        } else {
            setLoading(false)
            ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
        }
    }

    const clearCart = async () => {
        setLoading(true)
        const clearCart = await cartApi.clearCart(userAuthToken ? userAuthToken : CampaignAdminAuthToken);
        if (clearCart) {
            if (!clearCart.data.success) {
                setLoading(false)
                ToastAlert({ msg: clearCart.data.message, msgType: 'error' });

            } else {
                setIsUpdate(!update)
                /*ToastAlert({ msg: clearCart.data.message, msgType: 'success' });*/
                setLoading(false)
            }

        } else {
            setLoading(false)
            ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
        }
    }


    const updateCartItem = async (quentity, id, productId, type) => {
        setLoading(true)
        const updateCartItem = await cartApi.updateCart(userAuthToken ? userAuthToken : CampaignAdminAuthToken, quentity, id, productId, type);
        if (updateCartItem) {
            if (!updateCartItem.data.success) {
                setLoading(false)
                ToastAlert({ msg: updateCartItem.data.message, msgType: 'error' });

            } else {
                setIsUpdate(!update)
                /*ToastAlert({ msg: updateCartItem.data.message, msgType: 'success' });*/
                setLoading(false)
            }

        } else {
            setLoading(false)
            ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
        }
    }

    const checkout = () => {
        navigate('/checkout')
    }
    return (
        <>
            {/*<FrontLoader loading={loading} />*/}
            <Page title="Donorport | Cart">
                <Cart
                    cartItem={cartItem}
                    removeCartItem={removeCartItem}
                    clearCart={clearCart}
                    updateCartItem={updateCartItem}
                    checkout={checkout}
                    pricingFees={pricingFees}

                />
            </Page>
        </>
    )

}