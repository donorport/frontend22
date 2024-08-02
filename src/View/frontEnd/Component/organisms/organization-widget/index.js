import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Button, FormControl, InputGroup } from 'react-bootstrap';

// import { WidgetTitle, TagTitle, ToggleSwitch } from "../../Component";
import WidgetTitle from '../../atoms/widget-title';

import TagTitle from '../../atoms/tag-title';

import ToggleSwitch from '../../atoms/toggle-switch';

import OrganizationItem from '../../molecules/org-item';
import './style.scss';
import {
  //helper,
  getCalculatedPrice
  //countInArray
} from '../../../../../Common/Helper';
import cartApi from '../../../../../Api/frontEnd/cart';
import { useSelector, useDispatch } from 'react-redux';
import { setIsUpdateCart } from '../../../../../user/user.action';
import { useNavigate } from 'react-router-dom';

function OrganizationWidget(props) {
  const [check, setCheck] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [price, setPrice] = useState();
  const [cartProductList, setCartProductList] = useState([]);
  //const [cartProductIds, setCartProductIds] = useState([]);
  const [availabileProducts, setAvailabileProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  const [productPrice, setproductPrice] = useState({});
  const getCalc = getCalculatedPrice();
  const userAuthToken = localStorage.getItem('userAuthToken');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  let productDetails = props.productDetails;
  let currencySymbol = getCalc.currencySymbol();
  const { organizationName } = props;

  //function getOccurrence(array, value) {
  //let count = 0;
  //// array.forEach((v) => (v === value && count++));
  //// return count;
  //count = array.filter((x) => x === value).length;
  //return count;
  //}

  useEffect(() => {
    (async () => {
      if (productDetails?.length > 0) {
        let obj = {};
        let tempP = [];
        let tempnotw = [];

        if (props.tagTitle === 'Project') {
          productDetails.map((product) => {
            // obj[product?.itemDetails?._id] = getCalc.getData(product?.itemDetails?.price)
            obj[product?.itemDetails?._id] = product?.itemDetails?.displayPrice
              ? product?.itemDetails?.displayPrice
              : product?.itemDetails?.price;
          });
        } else {
          productDetails.map((product) => {
            // console.log(product)
            // obj[product._id] = getCalc.getData(product?.price)
            obj[product._id] = product?.displayPrice ? product?.displayPrice : product?.price;
          });
        }

        // setAvailabileProducts(tempP)
        // console.log(currencySymbol)

        setproductPrice(obj);
        setLoadMore(false);

        productDetails.map((pr, i) => {
          let product = pr;

          let infinite =
            props.tagTitle === 'Project' ? product?.itemDetails?.unlimited : product?.unlimited;
          let tax = props.tagTitle === 'Project' ? product?.itemDetails?.tax : product?.tax;

          let soldout =
            props.tagTitle === 'Project' ? product?.itemDetails?.soldout : product?.soldout;
          let quantity =
            props.tagTitle === 'Project' ? product?.itemDetails?.quantity : product?.quantity;
          let isFulfiled =
            props.tagTitle === 'Project' ? product?.itemDetails?.isFulfiled : product?.isFulfiled;
          let isFinish = !infinite && soldout >= quantity ? true : false;

          if (isFinish || (isFulfiled && !infinite)) {
            tempnotw.push(pr);
          } else {
            tempP.push(pr);
          }
        });
        tempP = tempP?.filter(function (item, pos, self) {
          return self.indexOf(item) === pos;
        });

        setAvailabileProducts(tempP);
      }
      productDetails = productDetails?.filter(function (item, pos, self) {
        return self.indexOf(item) === pos;
      });

      if (props.tagTitle === 'Project') {
        productDetails = productDetails?.filter(
          (value, index, self) =>
            index === self.findIndex((t) => t.itemDetails?._id === value.itemDetails?._id)
        );
        setAllProducts(productDetails);
      } else {
        productDetails = productDetails?.filter(
          (value, index, self) => index === self.findIndex((t) => t._id === value._id)
        );
        setAllProducts(productDetails);
      }
    })();
  }, [productDetails]);

  const onChangeTax = (e) => {
    setCheck(e);
    if (e) {
      setAvailabileProducts(
        productDetails.filter((e) =>
          props.tagTitle === 'Project' ? e.itemDetails.tax === true : e.tax === true
        )
      );
      setAllProducts(
        productDetails.filter((e) =>
          props.tagTitle === 'Project' ? e.itemDetails.tax === true : e.tax === true
        )
      );
    } else {
      let tempP = [];
      let tempnotw = [];
      if (productDetails.length > 0) {
        productDetails.map((pr) => {
          let product = pr;

          let infinite =
            props.tagTitle === 'Project' ? product?.itemDetails?.unlimited : product?.unlimited;
          //let tax = props.tagTitle === 'Project' ? product?.itemDetails?.tax : product?.tax;

          let soldout =
            props.tagTitle === 'Project' ? product?.itemDetails?.soldout : product?.soldout;
          let quantity =
            props.tagTitle === 'Project' ? product?.itemDetails?.quantity : product?.quantity;
          let isFulfiled =
            props.tagTitle === 'Project' ? product?.itemDetails?.isFulfiled : product?.isFulfiled;
          let isFinish = !infinite && soldout >= quantity ? true : false;

          if (isFinish || (isFulfiled && !infinite)) {
            tempnotw.push(pr);
          } else {
            tempP.push(pr);
          }
        });
      }
      tempP = tempP?.filter(function (item, pos, self) {
        return self.indexOf(item) === pos;
      });

      setAvailabileProducts(tempP);
      productDetails = productDetails?.filter(function (item, pos, self) {
        return self.indexOf(item) === pos;
      });
      setAllProducts(productDetails);
    }
  };

  // console.log(productPrice)

  const onChangeDonatePrice = async (e) => {
    let value = e.target.value.replace(/[^\d.]|\.(?=.*\.)/g, '');
    setPrice(value);
    if (Number(value) > 0) {
      let p_ids = {};
      let cart = [];
      let tempcart = [];

      let cartTotal = 0;

      let p = [];
      if (props.tagTitle === 'Project') {
        p = availabileProducts.filter(
          (e) =>
            (e.itemDetails?.displayPrice ? e.itemDetails?.displayPrice : e.itemDetails?.price) <
            value
        );
      } else {
        p = availabileProducts.filter((e) => (e.displayPrice ? e.displayPrice : e.price) < value);
      }
      // console.log(p)

      if (p.length > 0) {
        p.map((itm) => {
          let price1;

          if (props.tagTitle === 'Project') {
            price1 = itm.itemDetails?.displayPrice
              ? itm.itemDetails?.displayPrice
              : itm.itemDetails?.price;
          } else {
            price1 = itm.displayPrice ? itm.displayPrice : itm.price;
          }

          if (value > cartTotal + price1) {
            let pID = props.tagTitle === 'Project' ? itm.itemDetails?._id : itm._id;
            let unlimited =
              props.tagTitle === 'Project' ? itm.itemDetails?.unlimited : itm.unlimited;

            if (unlimited) {
              cart.push(pID);

              setCartProductList(cart);

              cartTotal += price1;
            } else {
              // let counts = {}
              // cart?.forEach(function (x) { counts[x] = (counts[x] || 0) + 1 })
              let checkQ =
                props.tagTitle === 'Project'
                  ? Number(itm.itemDetails?.quantity) - Number(itm.itemDetails?.soldout)
                  : Number(itm.quantity) - Number(itm.soldout);
              if (!p_ids[pID]) {
                p_ids[pID] = 1;
              }
              // if (Number(counts[pID] ? counts[pID] : 0) < checkQ) {
              // if (getOccurrence(tempcart, pID) < checkQ) {
              if (p_ids[pID] < checkQ) {
                if (p_ids[pID]) {
                  p_ids[pID] += 1;
                } else {
                  p_ids[pID] = 1;
                }
                cart.push(pID);
                tempcart.push(pID);

                setCartProductList(cart);

                cartTotal += price1;
              }
            }
          }
        });

        if (value - cartTotal > 0) {
          if (props.tagTitle === 'Project') {
            p = availabileProducts?.filter(
              (e) =>
                !e.itemDetails?.unlimited &&
                (e?.itemDetails?.displayPrice
                  ? e?.itemDetails?.displayPrice
                  : e?.itemDetails?.price) <
                  value - cartTotal &&
                p_ids[e?.itemDetails?._id] <
                  Number(e?.itemDetails?.quantity) - Number(e?.itemDetails?.soldout)
            );

            let p2 = availabileProducts?.filter(
              (e) =>
                Number(
                  e?.itemDetails.displayPrice ? e?.itemDetails.displayPrice : e?.itemDetails.price
                ) <
                  value - cartTotal && e.itemDetails.unlimited
            );

            if (!p.length) {
              p = p2;
            } else {
              p = p?.concat(p2);
            }
          } else {
            p = availabileProducts?.filter(
              (e) =>
                !e.unlimited &&
                Number(e?.displayPrice ? e?.displayPrice : e?.price) < value - cartTotal &&
                p_ids[e._id] < Number(e?.quantity) - Number(e?.soldout)
            );

            let p2 = availabileProducts?.filter(
              (e) =>
                Number(e?.displayPrice ? e?.displayPrice : e?.price) < value - cartTotal &&
                e.unlimited
            );

            if (!p.length) {
              p = p2;
            } else {
              p = p?.concat(p2);
            }

            // console.log(p2)
          }
          // console.log('before', p)
          // console.log(value - cartTotal)

          while (p.length > 0) {
            // console.log(p)

            if (props.tagTitle === 'Project') {
              p = availabileProducts?.filter(
                (e) =>
                  (e?.itemDetails?.displayPrice
                    ? e?.itemDetails?.displayPrice
                    : e?.itemDetails?.price) <
                    value - cartTotal &&
                  p_ids[e?.itemDetails?._id] <
                    Number(e?.itemDetails?.quantity) - Number(e?.itemDetails?.soldout)
              );

              let p2 = availabileProducts?.filter(
                (e) =>
                  Number(
                    e?.itemDetails.displayPrice ? e?.itemDetails.displayPrice : e?.itemDetails.price
                  ) <
                    value - cartTotal && e?.itemDetails.unlimited
              );

              if (!p.length) {
                p = p2;
              } else {
                p = p?.concat(p2);
              }
            } else {
              p = availabileProducts?.filter(
                (e) =>
                  !e.unlimited &&
                  Number(e?.displayPrice ? e?.displayPrice : e?.price) < value - cartTotal &&
                  p_ids[e._id] < Number(e?.quantity) - Number(e?.soldout)
              );

              let p2 = availabileProducts?.filter(
                (e) =>
                  Number(e?.displayPrice ? e?.displayPrice : e?.price) < value - cartTotal &&
                  e.unlimited
              );

              if (!p.length) {
                p = p2;
              } else {
                p = p?.concat(p2);
              }

              // console.log(p?.concat(p2))

              // p = p?.concat(p2)
            }

            // console.log('after', p)

            if (p.length > 0) {
              p.map((itm) => {
                let price3;

                if (props.tagTitle === 'Project') {
                  price3 = itm?.itemDetails?.displayPrice
                    ? itm?.itemDetails?.displayPrice
                    : itm?.itemDetails?.price;
                } else {
                  price3 = itm?.displayPrice ? itm?.displayPrice : itm?.price;
                }

                if (value > cartTotal + price3) {
                  let pID = props.tagTitle === 'Project' ? itm?.itemDetails?._id : itm?._id;
                  let unlimited =
                    props.tagTitle === 'Project' ? itm?.itemDetails?.unlimited : itm?.unlimited;

                  if (unlimited) {
                    cart.push(pID);

                    setCartProductList(cart);

                    cartTotal += price3;
                  } else {
                    //let counts = {};
                    // cart?.forEach(function (x) { counts[x] = (counts[x] || 0) + 1 })
                    let checkQ =
                      props.tagTitle === 'Project'
                        ? Number(itm?.itemDetails?.quantity) - Number(itm?.itemDetails?.soldout)
                        : Number(itm?.quantity) - Number(itm?.soldout);

                    if (!p_ids[pID]) {
                      p_ids[pID] = 1;
                    }

                    // if (Number(counts[pID] ? counts[pID] : 0) < checkQ) {
                    // if (getOccurrence(tempcart, pID) < checkQ) {
                    if (p_ids[pID] < checkQ) {
                      if (p_ids[pID]) {
                        p_ids[pID] += 1;
                      } else {
                        p_ids[pID] = 1;
                      }
                      cart.push(pID);
                      tempcart.push(pID);
                      setCartProductList(cart);

                      cartTotal += price3;
                    }
                  }
                }
              });
            } else {
              // console.log('else')
              break;
            }
          }
        }
      } else {
        setCartProductList([]);
      }
    } else {
      setCartProductList([]);
    }
  };

  const onClickAddToCart = async () => {
    if (userAuthToken) {
      if (cartProductList.length > 0) {
        let data = {};
        let tempArray = [];
        cartProductList.map((itm) => {
          let tempobj = {};
          if (tempArray.some((e) => e.productId === itm)) {
            let objIndex = tempArray.findIndex((obj) => obj.productId === itm);
            tempArray[objIndex].qty += 1;
          } else {
            tempobj.productId = itm;
            tempobj.qty = 1;
            tempArray.push(tempobj);
          }
        });

        data.productIds = tempArray;
        // setLoading(false)
        const addMultiple = await cartApi.addMultiple(userAuthToken, data);

        if (addMultiple) {
          if (!addMultiple.data.success) {
            // setLoading(false)
            // ToastAlert({ msg: addMultiple.data.message, msgType: 'error' });
          } else {
            // setIsUpdate(!update)
            dispatch(setIsUpdateCart(!user.isUpdateCart));
            setCartProductList([]);
            setPrice('');
            /*ToastAlert({ msg: addMultiple.data.message, msgType: 'success' });*/
            // setLoading(false)
          }
        } else {
          // setLoading(false)
          // ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
        }
      }
    } else {
      navigate('/signin');
    }
    setCheck(false);
  };

  return (
    <>
      {/* {console.log('in rander')} */}
      <TagTitle>Organization</TagTitle>
      <div className="mb-2">
        <WidgetTitle>Items</WidgetTitle>
      </div>
      {productDetails?.length > 0 ? (
        <div>
          {' '}
          <div className="d-sm-flex align-items-center mb-1 pb-2 border-bottom">
            <div
              className="donate-section d-flex align-items-center flex-grow-1 mb-2 mb-sm-0"
              style={{ border: 'unset', background: 'unset' }}
            >
              <span className="fw-6 me-2">Donate:</span>

              {/*<InputGroup className="donate__control">
            <InputGroup.Text>{currencySymbol}</InputGroup.Text>
            <FormControl
              type="text"
              maxLength={6}
              placeholder="0"
              className="donate-value-input"
              value={price}
              onChange={(e) => onChangeDonatePrice(e)}
            />
          </InputGroup>*/}

              <InputGroup className="donate-value-control">
                <InputGroup.Text id="btnGroupAddon" className="donate-value-symbol">
                  {currencySymbol}
                </InputGroup.Text>
                <FormControl
                  type="text"
                  placeholder="0"
                  maxLength={6}
                  className="donate-value-input ps-1"
                  value={price}
                  style={{ height: '36px' }}
                  onChange={(e) => onChangeDonatePrice(e)}
                />
              </InputGroup>

              <div className="d-flex align-items-center ms-auto">
                <p className="ps-3 fs-7 me-1">Tax?</p>
                <ToggleSwitch checked={check} changevalue={() => onChangeTax(!check)} />
              </div>
            </div>
            <Button
              variant="outline-primary"
              size="sm"
              className="organization__cart-btn"
              style={{ border: '2px solid' }}
              onClick={() => onClickAddToCart()}
            >
              Add to cart ({cartProductList.length})
            </Button>
          </div>
          <div className="note note__info mb-12p mt-1 lh-1 lh-sm-auto align-items-start">
            <FontAwesomeIcon icon={regular('circle-info')} className="text-info mr-6p" />
            Item availability will be confirmed at checkout.
          </div>
          <ul className="list-unstyled mb-0">
            {allProducts?.length > 0 ? (
              allProducts.slice(0, loadMore ? allProducts.length : 3).map((product, i) => {
                return (
                  <OrganizationItem
                    product={product}
                    productPrice={productPrice}
                    setproductPrice={setproductPrice}
                    tagTitle={props.tagTitle}
                    key={i}
                    addToCart={props.addToCart}
                    checkItemInCart={props.checkItemInCart}
                    currencySymbol={currencySymbol}
                  />
                );
              })
            ) : (
              <p className="fs-6 mt-2">
                There are no tax eligible products posted for {organizationName}
              </p>
            )}
          </ul>
          {!loadMore && allProducts?.length > 3 && (
            <div className="more__log">
              <Button
              size="md"
                variant="info"
                className="fs-6 w-100"
                onClick={() => setLoadMore(true)}
              >
                Load More . . .
              </Button>
            </div>
          )}
        </div>
      ) : (
        <p className="fs-6">{organizationName} hasn't posted any items.</p>
      )}
    </>
  );
}

export default OrganizationWidget;
