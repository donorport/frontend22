import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Button } from "react-bootstrap";

// import { ToggleSwitch, Avatar } from "@components/atoms"
import Avatar from "../../atoms/avatar";
import ToggleSwitch from "../../atoms/toggle-switch";
import organizationApi from "../../../../../Api/frontEnd/organization";
import React, { useState, useEffect } from "react";
import "./style.scss";
// import { Link } from "react-router-dom";
import { Outlet, useOutletContext, Link } from 'react-router-dom';
import FrontLoader from "../../../../../Common/FrontLoader";
import moment from "moment";
import helper, { getCardIcon, priceFormat } from "../../../../../Common/Helper";
import CSVExportBtn from '../../../CSVExportBtn';


const AdminBilling = () => {
  const [historyList, setHistoryList] = useState([])

  const [loading, setLoading] = useState(false)
  const [loadMore, setLoadMore] = useState(false)

  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  const type = localStorage.getItem('type');
  const tempCampaignAdminAuthToken = localStorage.getItem('tempCampaignAdminAuthToken');
  const token = type ? type === 'temp' ? tempCampaignAdminAuthToken : CampaignAdminAuthToken : CampaignAdminAuthToken
  const [data, setData] = useOutletContext();
  const [csvData, setCsvData] = useState([])

  const headers = [
    { label: "Date", key: "date" },
    { label: "Amount", key: "amount" },
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Description", key: "description" },
    { label: "Card", key: "card" },
    { label: "Last Four", key: "lastfour" }


  ];
  const getPaymentHistory = async () => {
    let fdata = {}
    fdata.organizationId = data._id
    const peymentHistory = await organizationApi.getPaymentHistory(token, fdata)
    if (peymentHistory.data.success === true) {
      setHistoryList(peymentHistory.data.data)
      if (peymentHistory.data.data.length > 0) {
        let tempAr = []
        peymentHistory.data.data.map((list, i) => {
          let tempObj = {}
          tempObj.date = moment(list.created_at).format('DD/MM/YYYY')
          tempObj.amount = list.type === 'ORDER' ? (Number(list.totalPrice) * Number(list.quantity)) : list.amount
          tempObj.name = list.type === 'ORDER' ? list.orderDetails.userDetails.name : list.userDetails.name
          tempObj.email = list.type === 'ORDER' ? list.orderDetails.userDetails.email : list.userDetails.email
          tempObj.description = list.type === 'ORDER' ? list.quantity + ' ' + list.productName : 'Donated'
          tempObj.card = list.type === 'ORDER' ? JSON.parse(list.orderDetails.paymentResponse).data?.payment_method_details?.card?.brand : JSON.parse(list.paymentResponse).payment_method_details?.card?.brand
          tempObj.lastfour = list.type === 'ORDER' ? JSON.parse(list.orderDetails.paymentResponse).data?.payment_method_details?.card?.last4 : JSON.parse(list.paymentResponse).payment_method_details?.card?.last4
          tempObj.id = list.type === 'ORDER' ? JSON.parse(list.orderDetails.paymentResponse).data?.payment_method_details?.card?.id : JSON.parse(list.paymentResponse).payment_method_details?.card?.id
          tempAr.push(tempObj)
        })
        setCsvData(tempAr)

      }

    }
  }


  useEffect(() => {
        (async () => {
            setLoading(true)
      if (data && data._id) {
        await getPaymentHistory()

      }
      setLoading(false)


      // console.log(historyList)

    })()
  }, [data])





  return (
    <>
     {/*<FrontLoader loading={loading} />*/}
      <div className="mw-600">
        <div className="mb-5">
          <div className="flex__1 mb-3">
            <h4 className="fw-bolder">Premium Plan</h4>
            <div className="text-subtext">Your current account plan:</div>
          </div>

          <Link variant="info" className=" btn btn-info rounded-pill ms-auto" to='/plans'>
            Free Plan <FontAwesomeIcon icon={solid("cloud")} className="ms-1" />
          </Link>
        </div>

       {/* <div className="mb-5">
          <div className="flex__1 mb-3">
            <h4 className="fw-bolder">Payment Schedule</h4>
            <div className="text-subtext">
              Choose how often your unlimited donations are disbursed to your EFT
              account
            </div>
          </div>

          <ul className="mb-0 list-unstyled schedule__list">
            <li className="list__item d-flex align-items-center py-2">
              <ToggleSwitch />
              <span className="text-light ms-2">Weekly</span>
            </li>
            <li className="list__item d-flex align-items-center py-2">
              <ToggleSwitch />
              <span className="text-light ms-2">Monthly</span>
            </li>
          </ul>
        </div>*/}

        <div className="mb-5">
          <div className="d-sm-flex align-items-center mb-5 mb-sm-3">
            <div className="flex__1 mb-2">
              <h4 className="fw-bolder">Payment History</h4>
              <div className="text-subtext">
                All transactions related to your Admin account
              </div>
            </div>
            {
              historyList.length > 0 &&
              <CSVExportBtn
                headers={headers}
                csvData={csvData}
                label='Export'
                prifix='_billing'
              />

            }
            {/* <Button variant="info" size="lg" className="btn__export">
              <span className="fw-bold fs-6">Export</span>
            </Button> */}
          </div>
          <div className="billing__list mb-3">
            {
              historyList.length > 0 &&
              historyList.slice(0, loadMore ? historyList.length : 6).map((list, i) => {

                // console.log(list)
                let amount = list.type === 'ORDER' ? (Number(list.totalPrice) * Number(list.quantity)) : list.amount
                let currencySymbole = list.type === 'ORDER' ? list.orderDetails.currencySymbol : list.currencySymbol
                let date = moment(list.created_at).format('DD/MM/YYYY')
                let donate = list.type === 'ORDER' ? list.quantity + ' ' + list.productName : 'Donated'
                let PurchaseIcon = list.type === 'ORDER' ? <FontAwesomeIcon icon={solid("bag-shopping")} className="mr-3p" /> : <FontAwesomeIcon icon={solid("heart")} className="mr-3p" />
                let userName = list.type === 'ORDER' ? list.orderDetails.userDetails.name : list.userDetails.name
                let CardType = list.type === 'ORDER' ? JSON.parse(list.orderDetails.paymentResponse).data?.payment_method_details?.card?.brand : JSON.parse(list.paymentResponse).payment_method_details?.card?.brand
                let lastFourDigits = list.type === 'ORDER' ? JSON.parse(list.orderDetails.paymentResponse).data?.payment_method_details?.card?.last4 : JSON.parse(list.paymentResponse).payment_method_details?.card?.last4
                let cardID = list.type === 'ORDER' ? JSON.parse(list.orderDetails.paymentResponse).data?.id : JSON.parse(list.paymentResponse).id
                let image = list.type === 'ORDER' ? list.orderDetails.userDetails.image : list.userDetails.image
                let avatar = image ? helper.DonorImagePath + image : 'https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/5f4ab31be9fe7d7453a60b1f_user.svg'

                return (
                  <div className="billing__item p-2 border-bottom border-bottom-sm-none">
                    <div className="billing__content d-sm-flex align-items-center">
                      <div className="flex__1 d-flex d-sm-flex-block align-items-center mb-2 mb-sm-0">
                        <Avatar
                          size={52}
                          avatarUrl={avatar}
                          border={0}
                          shadow={false}
                          className="admin__avatar mr-12p donor_avatar_bg"
                        />
                        <div className="admin__billing__value flex__1">
                          <div className="text-success fw-bold fs-5 mb-3p">+ {currencySymbole}{priceFormat(Number(amount))}</div>
                          <div className="fw-bold text-light fs-7">{date}</div>
                        </div>
                        <div className="admin__billing__details pr-3 ms-2 flex__1 d-flex flex-column align-items-start ps-3">
                          <div className="fw-bold mb-6p">{userName}</div>
                          <div className="text-subtext fs-7">
                            {PurchaseIcon}&nbsp;
                            {donate}
                          </div>
                        </div>
                      </div>

                      <div className="admin__billing__tag">
                        <div className="billing__payment">
                          <div className="billing__icon ml-12p mr-12p">
                            <img
                              width="26"
                              height="26"
                              src={getCardIcon(CardType)}
                              alt=""
                            />
                          </div>
                          <div className="billing__card fs-7">
                            <div style={{ textTransform: "capitalize" }}>{CardType}</div>
                            <div className="linked__date">{lastFourDigits}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            }



            {/* <div className="billing__item p-2 border-bottom border-bottom-sm-none">
              <div className="billing__content d-sm-flex align-items-center">
                <div className="flex__1 d-flex d-sm-flex-block align-items-center mb-2 mb-sm-0">
                  <Avatar
                    size={62}
                    avatarUrl="https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/5f4ab31be9fe7d7453a60b1f_user.svg"
                    border={0}
                    shadow={false}
                    className="admin__avatar mr-12p"
                  />
                  <div className="admin__billing__value flex__1">
                    <div className="text-danger fw-bold fs-5 mb-3p">- $ 65</div>
                    <div className="fw-bold text-subtext fs-8">9/17/2018</div>
                  </div>
                  <div className="admin__billing__details pr-3 ms-2 flex__1">
                    <div className="fw-bold mb-3p">Fresh Waters</div>
                    <div className="text-subtext">
                      <FontAwesomeIcon icon={solid("heart")} className="mr-3p" />
                      Donate
                    </div>
                  </div>
                </div>

                <div className="admin__billing__tag">
                  <div className="billing__payment">
                    <div className="billing__icon ml-12p mr-12p">
                      <img
                        width="26"
                        height="26"
                        src="https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/5b5e656493af1e0441cd892a_mc_vrt_pos.svg"
                        alt=""
                      />
                    </div>
                    <div className="billing__card fs-7">
                      <div>Mastercard</div>
                      <div className="linked__date">7709</div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            {
              !loadMore &&
              historyList.length > 2 &&
              <div className="more__log">
                <Button variant="info" className="fs-6 pt-12p pb-12p w-100" onClick={() => setLoadMore(true)}>Load More . . .</Button>
              </div>
            }

            {/* <div className="more__bills mt-3">
              <Button variant="info" className="fs-6 pt-12p pb-12p w-100">
                Load More . . .
              </Button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminBilling;
