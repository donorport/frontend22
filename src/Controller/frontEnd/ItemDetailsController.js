import Index from '../../View/frontEnd/Layout/Home/Index';
// import productApi from "../../Api/admin/product";
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FrontLoader from '../../Common/FrontLoader';
import OrganisationDetail from '../../View/frontEnd/organisation-detail';
import organizationApi from '../../Api/frontEnd/organization';
import ItemDetail from '../../View/frontEnd/item-detail';
import productApi from '../../Api/frontEnd/product';
import { useSelector, useDispatch } from 'react-redux';
import ToastAlert from '../../Common/ToastAlert';
import cartApi from '../../Api/frontEnd/cart';
import wishlistApi from '../../Api/frontEnd/wishlist';
import helper from '../../Common/Helper';
import {
  setCurrency,
  setUserLanguage,
  setCurrencyPrice,
  setIsUpdateCart,
  setProfileImage,
  setUserCountry,
  setUserAddress,
  setUserState,
  setSalesTax
} from '../../user/user.action';
import followApi from '../../Api/frontEnd/follow';
import Page from '../../components/Page';

export default function ItemDetailsController() {
  const [productList, setProductList] = useState([]);
  const adminAuthToken = localStorage.getItem('adminAuthToken');
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState({});
  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  const userAuthToken = localStorage.getItem('userAuthToken');
  const token = CampaignAdminAuthToken ? CampaignAdminAuthToken : userAuthToken;
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [purchasedItemList, setPurchasedItemList] = useState([]);
  const user = useSelector((state) => state.user);
  const [wishListproductIds, setWishListProductIds] = useState([]);
  const dispatch = useDispatch();
  const [isFollow, setIsFollow] = useState(false);

  const allProductList = async () => {
    let data = {};
    data.userCountry = user.countryId;
    const getproductList = await productApi.list(
      userAuthToken ? userAuthToken : CampaignAdminAuthToken,
      data
    );
    if (getproductList.data.success === true) {
      // console.log(getproductList.data.data)
      setProductList(getproductList.data.data);
    }
  };

  const productListByCategory = async (id) => {
    let userCountry = user.countryId;
    const getCategoryProducts = await productApi.listByCategory(token, id, userCountry);
    if (getCategoryProducts.data.success === true) {
      if (getCategoryProducts.data.data.length > 0) {
        let tempArray = [];
        getCategoryProducts.data.data.slice(0, 3).map((product, i) => {
          if (product._id !== productDetails._id) {
            tempArray.push(product);
          }
        });
        setCategoryProducts(tempArray);
      } else {
        setCategoryProducts([]);
      }
    }
  };

  const getPurchasedItems = async (id) => {
    const getPurchasedItems = await productApi.itemPurchasedHistory(
      userAuthToken ? userAuthToken : CampaignAdminAuthToken,
      id
    );
    if (getPurchasedItems.data.success === true) {
      setPurchasedItemList(getPurchasedItems.data.data);
    }
  };

  const getWishListProductList = async () => {
    const list = await wishlistApi.list(token);
    if (list) {
      if (list.data.success) {
        // setWishListProductList(list.data.data)
        if (list.data.data.length > 0) {
          let temp = [];
          list.data.data.map((item, i) => {
            temp.push(item.productDetails._id);
          });
          // console.log(temp)
          setWishListProductIds(temp);
        } else {
          setWishListProductIds([]);
        }
      }
    }
  };

  const addProductToWishlist = async (productId) => {
    let data = {};
    data.productId = productId;
    setLoading(true);
    const add = await wishlistApi.add(token, data);
    if (add) {
      if (add.data.success) {
        setLoading(false);
        // await getWishListProductList()
        dispatch(setIsUpdateCart(!user.isUpdateCart));
      } else {
        setLoading(false);

        ToastAlert({ msg: add.data.message, msgType: 'error' });
      }
    } else {
      setLoading(false);
      ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
    }
  };
  const checkUserFollow = async (productId) => {
    let data = {};
    data.typeId = productId;
    data.type = 'PRODUCT';
    const check = await followApi.checkUserFollow(userAuthToken, data);
    if (check) {
      setIsFollow(check.data.success);
    }
  };

  useEffect(() => {
    (async () => {
      if (token) {
        setLoading(true);
        await getWishListProductList();
        setLoading(false);
      }
    })();
  }, [user.isUpdateCart]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      // console.log(params.name)
      // window.scrollTo(0, 0);
      let mydata = {};
      const getproductDetails = await productApi.details(params.name);
      // console.log(getproductDetails)
      if (getproductDetails.data.success === true) {
        if (getproductDetails.data.data.length) {
          mydata = getproductDetails.data.data[0];
          if (user.countryId && user.countryId > 0) {
            if (mydata.campaignDetails.country_id !== user.countryId || mydata.status === -1) {
              navigate('/');
            }
            // if(mydata.status === -1){
            //     navigate('/')

            // }
          }

          setProductDetails(mydata);
          await productListByCategory(mydata.categoryDetails._id);
          await allProductList();
          await getPurchasedItems(mydata._id);
          if (userAuthToken) {
            await checkUserFollow(mydata._id);
          }
        } else {
          // console.log('first1')
          navigate('/');
        }
      } else {
        // console.log('first2')

        navigate('/');
      }
      setLoading(false);
    })();
  }, [params.name, user]);

  const checkItemInCart = async (id) => {
    setLoading(true);
    let res;
    const checkItemInCart = await cartApi.checkItemInCart(userAuthToken, id);
    if (checkItemInCart) {
      if (checkItemInCart.data.success) {
        res = true;
        setLoading(false);
      } else {
        res = false;
        setLoading(false);
      }
    } else {
      setLoading(false);
      ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
      res = false;
    }
    return res;
  };

  const addToCart = async (id, quantity) => {
    if (token) {
      setLoading(true);
      let data = {};
      data.productId = id;
      data.quantity = quantity === undefined ? 1 : quantity;

      const addItemToCart = await cartApi.add(userAuthToken, data);
      if (addItemToCart) {
        if (!addItemToCart.data.success) {
          setLoading(false);
          ToastAlert({ msg: addItemToCart.data.message, msgType: 'error' });
        } else {
          dispatch(setIsUpdateCart(!user.isUpdateCart));
          /*ToastAlert({ msg: addItemToCart.data.message, msgType: 'success' });*/
          setLoading(false);
        }
      } else {
        setLoading(false);
        ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
      }
    } else {
      navigate('/signin');
    }
  };

  const removeCartItem = async (id) => {
    setLoading(true);
    const removeCartItem = await cartApi.removeCartProduct(userAuthToken, id);
    if (removeCartItem) {
      if (!removeCartItem.data.success) {
        setLoading(false);
        ToastAlert({ msg: removeCartItem.data.message, msgType: 'error' });
      } else {
        /*ToastAlert({ msg: removeCartItem.data.message, msgType: 'success' });*/
        setLoading(false);
      }
    } else {
      setLoading(false);
      ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
    }
  };

  const followToProduct = async (e) => {
    if (userAuthToken) {
      let data = {};
      data.organizationId = productDetails.campaignDetails._id;
      data.typeId = productDetails._id;
      data.type = 'PRODUCT';
      data.isFollow = e.target.checked;

      const follow = await followApi.follow(userAuthToken, data);
      if (follow && follow.data.success) {
        await checkUserFollow(productDetails._id);
      }
    } else {
      ToastAlert({ msg: 'Please Login', msgType: 'error' });
    }
  };

  return (
    <>
      {/* {console.log(wishListproductIds)} */}
      {/*<FrontLoader loading={loading} />*/}
      <Page
        title={'Donorport | ' + productDetails?.headline}
        description={productDetails?.description}
        img={helper.CampaignProductFullImagePath + productDetails?.image}
      >
        <ItemDetail
          productDetails={productDetails}
          categoryProducts={categoryProducts}
          checkItemInCart={checkItemInCart}
          addToCart={addToCart}
          removeCartItem={removeCartItem}
          productList={productList}
          purchasedItemList={purchasedItemList}
          addProductToWishlist={addProductToWishlist}
          wishListproductIds={wishListproductIds}
          followToProduct={followToProduct}
          isFollow={isFollow}
        />
      </Page>
    </>
  );
}
