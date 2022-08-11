import { useState, useEffect } from "react";
// import { ProgressBar, Button, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";
// import ListItemImg from "@components/atoms/list-item-img";

import ListItemImg from "../../atoms/list-item-img";
// import {
//   LadderMenuItems,
//   ItemsTable,
//   ShareWidget,
// } from "@components/organisms";
import LadderMenuItems from "../ladder-menu-items";
import ShareWidget from "../share-widget";
import ItemsTable from "../items-table";
import { Outlet, Link, useLocation, useOutletContext } from "react-router-dom";
import userApi from "../../../../../Api/frontEnd/user";
import FrontLoader from "../../../../../Common/FrontLoader";
import moment from "moment";
import helper, { getCalculatedPrice, priceFormat, purchasedPriceWithTax, download,isIframe } from "../../../../../Common/Helper";


import {
  Button,
  Accordion,
  AccordionContext,
  useAccordionButton,
  Card,
  Col,
  Row,
  Dropdown,
  ProgressBar
} from "react-bootstrap";



import "./style.scss";

const UserItems = () => {
  const [detail, setDetail] = useState({
    key: null,
    show: false
  });
  const { key, show } = detail
  const userAuthToken = localStorage.getItem('userAuthToken');
  const [loading, setLoading] = useState(false)
  const [data, setData] = useOutletContext();
  const [pageNo, setPageNo] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalRecord, setTotalRecord] = useState(1)
  const [sortField, setSortField] = useState("created_at");
  const [order, setOrder] = useState("asc");
  const [orderItemList, setOrderItemList] = useState([])
  const calculatedPrice = getCalculatedPrice()
  const [totalPurchase, setTotalPurchase] = useState(0)
  const [totalPriceArray, setTotalPriceArray] = useState([])



  const getOrderItemList = async (page, field, type) => {
    setLoading(false)
    let formData = {}
    formData.organizationId = data._id
    formData.pageNo = page
    formData.sortField = field
    formData.sortType = type
    formData.filter = true



    const getOrderItem = await userApi.userOrderItemslist(userAuthToken, formData);
    if (getOrderItem.data.success === true) {
      setOrderItemList(getOrderItem.data.data)
      setTotalPages(getOrderItem.data.totalPages)
      setTotalRecord(getOrderItem.data.totalRecord)
      // setTotalPriceArray(getOrderItem.data.totalPriceArray)
      // console.log(getOrderItem.data.totalPriceArray)
      // if (getOrderItem.data.data.length > 0) {
      //   let tempPriceArray = []
      //   getOrderItem.data.data.map((item, i) => {
      //     let purchasedPrice = (Math.round(calculatedPrice.priceWithTax(Number(item.productPrice))))
      //     tempPriceArray.push(purchasedPrice)
      //   })
      //   let sum = tempPriceArray.reduce(function (a, b) { return a + b; }, 0);
      setTotalPriceArray(Object.entries(getOrderItem.data.totalPurchase))
      // console.log(getOrderItem.data.totalPurchase)
      // setTotalPurchase(priceFormat(Math.round(calculatedPrice.priceWithTax(Number(getOrderItem.data.totalPurchase)))))
      // }


    }
    setLoading(false)


  }

  useEffect(() => {
    (async () => {
      // console.log(totalPriceArray)
      await getOrderItemList(pageNo, sortField, order)

    })()
  }, [data._id])

  const handleClick = async (e, v) => {

    setPageNo(Number(v))
    await getOrderItemList(Number(v), sortField, order)
  }


  const handleSortingChange = async (accessor) => {

    const sortOrder =
      accessor === sortField && order === "asc" ? "desc" : "asc";
    setSortField(accessor);
    setOrder(sortOrder);
    await getOrderItemList(pageNo, accessor, sortOrder)


  };
  const onItemClick = (key) => {
    setDetail({ ...detail, key: key, show: true })

  }


  return (
    <>
      <FrontLoader loading={loading} />
      {!detail.show ? (
        <div>
          <header className="py-sm-2 pb-2 mb-3 w-100 d-sm-flex align-items-center">
            <h1 className="d-none d-sm-flex page__title mb-0 fs-3 fw-bolder me-2">
              My Items
            </h1>
            <span className="d-none d-sm-flex text-light fs-5 ml-2">({totalRecord})</span>
            {
              totalPriceArray.length > 0 &&
              totalPriceArray.map((val, key) => {
                return (
                  <span className="d-none d-sm-flex item__total-wrap d-flex ms-3">
                    <FontAwesomeIcon
                      icon={solid("money-bills-simple")}
                      className="text-dark mr-12p fs-4"
                    />
                    {val[0]} {val[1]}
                  </span>
                )
              })
            }


            {/* <div className="ms-sm-auto">
              <LadderMenuItems />
            </div> */}
          </header>

          <ItemsTable
            onItemClick={onItemClick}
            handleClick={handleClick}
            totalPages={totalPages}
            totalRecord={totalRecord}
            pageNo={pageNo}
            handleSortingChange={handleSortingChange}
            order={order}
            sortField={sortField}
            orderItemList={orderItemList}
            totalPriceArray={totalPriceArray}
          />
        </div>
      ) : (
        orderItemList.length > 0 &&
        orderItemList.map((item, i) => {
          // console.log(item)
          // console.log(item.appliedTaxPer)
          // let price = Math.round(Number(item.productPrice) + (Number(item.appliedTaxPer) / 100) * Number(item.productPrice))
          // let price = priceFormat(Math.round(calculatedPrice.priceWithTax(Number(item.itemDetails.price))))

          let price = item.itemDetails.displayPrice ? item.itemDetails.displayPrice : item.itemDetails.price

          // let purchasedPrice = (Math.round(purchasedPriceWithTax(Number(item.productPrice), item.appliedTaxPer)))
          let purchasedPrice = item.productPrice


          // console.log(purchasedPrice)


          return (

            <div className={detail.show && Number(detail.key) === i ? "" : "d-none"}>
              <div className="d-flex align-items-center flex-grow-1 pb-20p border-bottom">
                <Button variant="link" className="me-sm-2 me-1" onClick={() => setDetail(false)}>
                  <FontAwesomeIcon
                    icon={solid("angle-left")}
                    className="text-subtext fs-3"
                  />
                </Button>
                <div className="d-flex align-items-center text-dark me-sm-3 flex__1">
                  <div className="item__image-wrap">
                    <img
                      alt=""
                      height="56"
                      className="img-fluid"
                      src={helper.CampaignProductImagePath + item.itemDetails?.image}
                    />
                  </div>
                  <div className="ms-3">
                    <div className="fw-bolder fs-4 mb-3p">{item.itemDetails?.headline}</div>
                    <div className="fs-7 text-light">{item.itemDetails?.brand}</div>
                  </div>
                </div>

                <div className="d-none d-sm-flex align-items-center flex__1">
                  <div className="d-flex align-items-center flex__1">
                    <div className="d-flex align-items-center progress__wrap me-2 flex__1">

                      {
                        !item.itemDetails?.unlimited ?

                          < span className="qty__tag pl-9p pb-3p pr-9p pt-3p me-1 fw-bold text-light">
                            {item.itemDetails?.soldout}/{item.itemDetails?.quantity}
                          </span>
                          :
                          <></>
                      }
                      <ProgressBar
                        variant={!item.itemDetails?.unlimited ? "success" : "infinity"}
                        now={!item.itemDetails?.unlimited ? Math.round(item.itemDetails?.soldout / item.itemDetails?.quantity * 100) : 100}
                        className="flex-grow-1"
                      />
                      {
                        !item.itemDetails?.unlimited ?
                          <span className="text-light ms-1 fw-bold">{Math.round(item.itemDetails?.soldout / item.itemDetails?.quantity * 100)}%</span>
                          :
                          <div className="unlimited unlimited--home" style={{ marginLeft: "10px" }}>
                            <div className="tag tag--ongoing _2">
                              <div className="icon icon--unlimited">
                                <FontAwesomeIcon icon={solid("infinity")} className="" />
                              </div>
                            </div>
                          </div>
                      }
                      {/* <span className="qty__tag pl-9p pb-3p pr-9p pt-3p me-1 fw-bold text-light">
                        {item.itemDetails?.soldout}/{item.itemDetails?.quantity}
                      </span>
                      <ProgressBar
                        variant="success"
                        now={Math.round(item.itemDetails?.soldout / item.itemDetails?.quantity * 100)}
                        className="flex-grow-1"
                      />
                      <span className="text-light ms-1 fw-bold">{Math.round(item.itemDetails?.soldout / item.itemDetails?.quantity * 100)}%</span> */}
                    </div>
                  </div>
                </div>

                <ListItemImg
                  size={42}
                  imgSrc={helper.CampaignAdminLogoPath + item.itemDetails?.organizationDetails?.logo}
                />
              </div>

              <div className="d-sm-none pt-20p pb-20p">
                <div className="d-flex align-items-center">
                  <span className="qty__tag pl-9p pb-3p pr-9p pt-3p me-1 fw-bold text-light">
                    7/10
                  </span>
                  <ProgressBar variant="success" now={30} className="flex__1" />
                  <span className="text-light ms-1 fw-bold">30%</span>
                </div>
              </div>

              <Row className="pt-5">
                <Col md="6">
                  <div className="project__detail-main me-sm-3">
                    <h4 className="project__detail-label mb-3p">Item</h4>
                    <h1 className="project__detail-title">
                      {item.itemDetails?.headline}
                    </h1>
                    <h5 className="project__detail-sublabel mb-0">Product</h5>
                    <div className="project__detail-subtitle mb-12p">{item.itemDetails?.brand} ™</div>
                    <div className="project__detail-price fs-2 text-price">
                      {item.currencySymbol}{price}
                    </div>
                    <div className="project__detail-meta d-flex align-items-center mb-4">
                      <div className="d-flex align-items-center">
                        <FontAwesomeIcon icon={regular("clock")} className="me-1" />
                        {moment(item.itemDetails?.created_at).format('MMMM DD, YYYY')}
                      </div>
                      <div className="d-flex align-items-center ms-2">
                        <FontAwesomeIcon
                          icon={regular("circle-location-arrow")}
                          className="me-1"
                        />
                        Toronto, ON
                      </div>
                    </div>

                    <h5 className="page__blurb">{item.itemDetails?.needheadline}</h5>
                    <div className="page__paragraph mb-3">
                      {item.itemDetails?.descriptions}
                    </div>
                    <a href={helper.websitePath + '/' + item.itemDetails?.slug} className="text-subtext">
                      <span className="url__icon me-1">
                        <FontAwesomeIcon icon={regular("square-up-right")} />
                      </span>
                      <span className="date__name date__name--url">
                        {helper.websitePath + '/' + item.itemDetails?.slug}
                      </span>
                    </a>
                    {
                      item.fulfilDetails.length === 0 ?

                        <div className="empty_state mt-5">
                          <div className="note note-info d-flex align-items-center">
                            <span className="post__badge post__badge--sold me-2 text-primary fs-3">
                              <FontAwesomeIcon icon={solid("photo-film")} />
                            </span>
                            <span className="fs-6 text-subtext">
                              Giveaway media appears here when the post has been fully
                              funded.
                            </span>
                          </div>
                        </div>
                        :
                        <>
                          {
                            item.fulfilDetails[0].video && isIframe(item.fulfilDetails[0].video) &&

                            <div className="project-video-wrap mt-4" dangerouslySetInnerHTML={{ __html: item.fulfilDetails[0].video }} >
                              {/* <iframe src={embedlink} title="YouTube video player"></iframe> */}

                            </div>

                          }
                        </>
                    }

                  </div>
                </Col>
                <Col md="6">
                  <div className="d-flex align-items-center mb-3">
                    <div className="flex__1 fs-5">
                      <div className="fw-bolder mb-6p">Order Number</div>
                      <div className="text-subtext">#{item.orderId}</div>
                    </div>
                    <ShareWidget />
                  </div>
                  <div className="order__widget mb-3">
                    <div className="d-flex align-items-start bg-lighter p-12p text-dark flex__1 mb-3">
                      <div className="">
                        <img
                          alt=""
                          width="32"
                          className="img-fluid"
                          src="https://uploads-ssl.webflow.com/59df9e77ad9420000140eafe/5c2c245cfd28a711fcf49f67_HYDRATION-TABS-three-tabs-s.png"
                        />
                      </div>
                      <div className="ms-2 flex__1 fw-bolder">
                        <div className="mb-3p">{item.itemDetails?.headline}</div>
                        <div className="text-success ">{item.currencySymbol ? item.currencySymbol : "$"}{priceFormat(purchasedPrice)}</div>
                      </div>
                      <div>
                        qty <span className="fw-bolder ml-3p">{item.quantity}</span>
                      </div>
                    </div>

                    <div className="py-3 border-top border-bottom">
                      <div className="d-flex align-items-center fw-bolder mb-20p">
                        <span className="flex__1">Subtotal:</span>
                        <span className="text-success">{item.currencySymbol ? item.currencySymbol : "$"}{priceFormat(Number(purchasedPrice) * Number(item.quantity))}</span>
                      </div>
                      <div className="d-flex align-items-center ">
                        <span className="fw-bolder flex__1">XP</span>
                        <span className="text-info fw-semibold">{item.xp} xp</span>
                      </div>
                    </div>
                    <div className="d-flex align-items-center pt-3 mb-2">
                      <span className="fw-bolder flex__1">Total:</span>
                      <span className="text-success fw-bold fs-4">{item.currencySymbol ? item.currencySymbol : "$"}{priceFormat(Number(purchasedPrice) * Number(item.quantity))}</span>
                    </div>
                    <div className="bg-lighter d-flex align-items-center p-20p rounded">
                      <div className="order__logo me-2">
                        <img
                          src="https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/5b5e656493af1e0441cd892a_mc_vrt_pos.svg"
                          alt=""
                          className="img-fluid"
                        />
                      </div>
                      <div className="order__card fs-7">
                        <div className="text-dark fw-semibold mb-6p">
                          5432 XXXX XXXX 4809
                        </div>
                        <div className="text-light fw-semibold">
                          <div>Transaction: {moment(item.created_at).format('MMMM DD,YYYY')}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="fw-bold mb-2">Order Files</div>
                  {
                    item.fulfilDetails.length === 0 ?

                      <div className="empty_state mb-4">
                        <div className="note note-info d-flex align-items-center">
                          <span className="post__badge post__badge--sold me-2 text-primary fs-3">
                            <FontAwesomeIcon icon={solid("file-lines")} />
                          </span>
                          <span className="fs-6 text-subtext">
                            Tax & Order Receipts appear here when they are available.
                          </span>
                        </div>
                      </div> :
                      <>
                        <div className="mt-3 d-flex align-item-center" style={{ alignItems: "center" }}>
                          <div className="nn" style={{
                            display: 'flex',
                            position: 'relative',
                            color: '#64a9ee',
                            height: '49px',
                            width: '49px',
                            justifyContent: 'center',
                            alignItems: 'center',
                            background: '#edf6fd',
                            borderRadius: '6px',
                            marginRight: '6px'
                          }}>
                            <span className="post__badge post__badge--sold fs-3">
                              <FontAwesomeIcon icon={solid("receipt")} />
                            </span>
                          </div>
                          <div style={{ paddingLeft: '9px' }}>
                            <text className="post__title"
                              style={{
                                fontSize: '21px',
                                lineHeight: '1rem',
                                fontWeight: 700
                              }}
                            >
                              {item.fulfilDetails[0].receipt}
                            </text>
                            <div className="date__name"
                              style={{
                                fontWeight: 600,
                                fontSize: 'smaller',
                                color: '#9796b1',
                              }}
                            >Added &nbsp;
                              {moment(item.fulfilDetails[0].created_at).fromNow()}</div>


                          </div>
                          <div style={{ marginLeft: "auto" }}>
                            <Dropdown className="d-flex ms-auto" autoClose="outside">
                              <Dropdown.Toggle
                                variant="link"
                                className="no-caret text-decoration-none"
                              >
                                <FontAwesomeIcon
                                  icon={regular("ellipsis-vertical")}
                                  className="text-light fs-3"
                                />
                              </Dropdown.Toggle>

                              <Dropdown.Menu className="">
                                <Dropdown.Item className="d-flex align-items-center p-2" onClick={() => download(helper.FulfilRecieptPath + item.fulfilDetails[0].receipt, item.fulfilDetails[0].receipt)}>
                                  <span className="fw-bold fs-7 flex__1">View</span>
                                  <FontAwesomeIcon
                                    icon={solid("magnifying-glass")}
                                    className="ms-1"
                                  />
                                </Dropdown.Item>
                                <Dropdown.Divider />
                                <Dropdown.Item className="d-flex align-items-center p-2" onClick={() => download(helper.FulfilRecieptPath + item.fulfilDetails[0].receipt, item.fulfilDetails[0].receipt)}>
                                  <span className="fw-bold fs-7 flex__1">Download</span>
                                  {/* <a href={helper.FulfilRecieptPath + fulfilProductDetails?.fulfilDetails?.receipt} download
                                    // variant="info"
                                    // target="_blank"
                                    className="fw-bold fs-7 flex__1"
                                  >
                                    Download
                                  </a> */}
                                  <FontAwesomeIcon icon={regular("download")} className="ms-1" />
                                </Dropdown.Item>
                                {/* <Dropdown.Divider /> */}
                                {/* <Dropdown.Item className="d-flex align-items-center p-2">
                              <span className="fw-bold fs-7 flex__1">Delete</span>
                              <FontAwesomeIcon
                                icon={regular("trash")}
                                className="ms-1"
                              />
                            </Dropdown.Item> */}
                              </Dropdown.Menu>
                            </Dropdown>
                          </div>
                        </div>
                      </>
                  }
                </Col>
              </Row>
            </div>

          )


        })

      )}
    </>
  );
};

export default UserItems;
