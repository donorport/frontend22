import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ItemDetail from '../../View/frontEnd/item-detail';
import productApi from '../../Api/frontEnd/product';
import { useSelector, useDispatch } from 'react-redux';
import ToastAlert from '../../Common/ToastAlert';
import cartApi from '../../Api/frontEnd/cart';
import wishlistApi from '../../Api/frontEnd/wishlist';
import { setIsUpdateCart } from '../../user/user.action';
import followApi from '../../Api/frontEnd/follow';
import Page from '../../components/Page';

export default function ItemDetailsController() {
  const [productList, setProductList] = useState([]);
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
  const [loading, setLoading] = useState(false);

  const allProductList = useCallback(async () => {
    let data = {};
    data.userCountry = user.countryId;
    const getproductList = await productApi.list(
      userAuthToken ? userAuthToken : CampaignAdminAuthToken,
      data
    );
    if (getproductList.data.success === true) {
      setProductList(getproductList.data.data);
    }
  }, [CampaignAdminAuthToken, user, userAuthToken]);

  const productListByCategory = useCallback(
    async (id) => {
      const getCategoryProducts = await productApi.listByCategory(token, id, user.countryId);

      if (!getCategoryProducts.data.success === true) {
        return;
      }

      let tempArray = [];
      if (getCategoryProducts.data.data.length > 0) {
        getCategoryProducts.data.data.slice(0, 3).map((product) => {
          if (product._id !== productDetails._id) {
            tempArray.push(product);
          }
        });
      }
      setCategoryProducts(tempArray);
    },
    [productDetails._id, token, user.countryId]
  );

  const getPurchasedItems = useCallback(
    async (id) => {
      const getPurchasedItems = await productApi.itemPurchasedHistory(
        userAuthToken ? userAuthToken : CampaignAdminAuthToken,
        id
      );
      if (getPurchasedItems.data.success === true) {
        setPurchasedItemList(getPurchasedItems.data.data);
      }
    },
    [CampaignAdminAuthToken, userAuthToken]
  );

  const getWishListProductList = useCallback(async () => {
    const list = await wishlistApi.list(token);
    if (!list) {
      return;
    }
    if (!list.data.success) {
      return;
    }
    let temp = [];
    if (list.data.data.length > 0) {
      list.data.data.map((item) => {
        temp.push(item.productDetails._id);
      });
    }
    setWishListProductIds(temp);
  }, [token]);

  const addProductToWishlist = async (productId) => {
    let data = { productId };
    setLoading(true);
    const add = await wishlistApi.toggle(token, data);

    if (add) {
      if (add.data.success) {
        dispatch(setIsUpdateCart(!user.isUpdateCart)); 
      } else {
        ToastAlert({ msg: add.data.message, msgType: 'error' });
      }
    } else {
      ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
    }

    setLoading(false);
  };
  const checkUserFollow = useCallback(
    async (productId) => {
      let data = {};
      data.typeId = productId;
      data.type = 'PRODUCT';
      const check = await followApi.checkUserFollow(userAuthToken, data);
      if (check) {
        setIsFollow(check.data.success);
      }
    },
    [userAuthToken]
  );

  useEffect(() => {
    (async () => {
      if (token) {
        setLoading(true);
        await getWishListProductList();
      }
    })();
  }, [getWishListProductList, token, user.isUpdateCart]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      // console.log(params.name)
      // window.scrollTo(0, 0);
      let mydata = {};
      const getproductDetails = await productApi.details(params.name);
      if (getproductDetails.data.success === true) {
        if (getproductDetails.data.data.length) {
          mydata = getproductDetails.data.data[0];
          if (user.countryId && user.countryId > 0) {
            if (mydata.campaignDetails.country_id !== user.countryId || mydata.status === -1) {
              // navigate('/');
            }
          }

          setProductDetails(mydata);
          await productListByCategory(mydata.categoryDetails._id);
          await allProductList();
          await getPurchasedItems(mydata._id);
          if (userAuthToken) {
            await checkUserFollow(mydata._id);
          }
        } else {
          // navigate('/');
        }
      } else {
        // navigate('/');
      }
    })();
  }, [
    allProductList,
    checkUserFollow,
    getPurchasedItems,
    navigate,
    params.name,
    productListByCategory,
    user,
    userAuthToken
  ]);

  const checkItemInCart = async (id) => {
    setLoading(true);
    let res;
    const checkItemInCart = await cartApi.checkItemInCart(userAuthToken, id);
    if (checkItemInCart) {
      if (checkItemInCart.data.success) {
        res = true;
      } else {
        res = false;
      }
    } else {
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
          ToastAlert({ msg: addItemToCart.data.message, msgType: 'error' });
        } else {
          dispatch(setIsUpdateCart(!user.isUpdateCart));
        }
      } else {
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
        ToastAlert({ msg: removeCartItem.data.message, msgType: 'error' });
      }
    } else {
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
      <Page showTags={false}>
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
