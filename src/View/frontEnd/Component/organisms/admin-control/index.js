import { useState, useEffect } from "react";
import ToggleSwitch from "../../atoms/toggle-switch";
import controlsApi from "../../../../../Api/frontEnd/controls";
import FrontLoader from "../../../../../Common/FrontLoader";
import { Button } from "react-bootstrap";
import ToastAlert from "../../../../../Common/ToastAlert";

import "./style.scss";

const AdminControl = () => {
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  // const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');

  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  const type = localStorage.getItem('type');
  const tempCampaignAdminAuthToken = localStorage.getItem('tempCampaignAdminAuthToken');
  const token = type ? type === 'temp' ? tempCampaignAdminAuthToken : CampaignAdminAuthToken : CampaignAdminAuthToken

  const [controls, setControls] = useState({
    _id: "",
    notifications: true,
    email: true,
    items_are_funded: true,
    you_receive_donation: true,
    someone_follows_profile: true,
    sales_on_your_post: true,
    your_item_funded: true,
    your_order_ready_to_purchase: true,
    problem_with_your_deposit: true,
    keep_profile_private: true,

  })

  const { _id, notifications, email, items_are_funded, you_receive_donation, someone_follows_profile, sales_on_your_post, your_item_funded, your_order_ready_to_purchase, problem_with_your_deposit, keep_profile_private } = controls


  const changevalue = (e) => {
    let value = e.target.checked;

    setControls({
      ...controls,
      [e.target.name]: value

    })
  }

  useEffect(() => {
        (async () => {
            setLoading(true)
      const getControlSetting = await controlsApi.organizationControlsList(token)
      if (getControlSetting.data.success) {
        setControls({
          ...getControlSetting.data.data
        })
      }
      setLoading(false)

    })()

  }, [update])


  const saveControls = async () => {
    setLoading(true)

    let data = {}
    data.notifications = notifications
    data.email = email
    data.items_are_funded = items_are_funded
    data.you_receive_donation = you_receive_donation
    data.someone_follows_profile = someone_follows_profile
    data.sales_on_your_post = sales_on_your_post
    data.your_item_funded = your_item_funded
    data.your_order_ready_to_purchase = your_order_ready_to_purchase
    data.problem_with_your_deposit = problem_with_your_deposit
    data.keep_profile_private = keep_profile_private


    const saveControls = await controlsApi.saveOrganizationControls(token, data, _id)
    if (saveControls.data.success === true) {
      setLoading(false)
      setUpdate(!update)
      ToastAlert({ msg: saveControls.data.message, msgType: 'success' });
    } else {
      ToastAlert({ msg: saveControls.data.message, msgType: 'error' });
      setLoading(false)
    }
    setLoading(false)

  }


  return (
    <>
     {/*<FrontLoader loading={loading} />*/}
      <div className="mb-5">
        <h4 className="fw-bolder">Notifications </h4>
        <div className="text-subtext mb-3">Turn off / on notifications</div>
        <div>
          <div className="d-flex align-items-center mb-2">
            <span className="d-flex pe-2 py-1">
              <ToggleSwitch id="notifications" checked={notifications} name="notifications" changevalue={changevalue} />
            </span>
            <span className="text-subtext fs-7">Notifications</span>
          </div>
          <div className="d-flex align-items-center mb-2">
            <span className="d-flex pe-2 py-1">
              <ToggleSwitch id="email" checked={email} name="email" changevalue={changevalue} />
            </span>
            <span className="text-subtext fs-7">Email</span>
          </div>
        </div>
      </div>

      <div className="mb-5">
        <h4 className="fw-bolder">Alerts</h4>
        <div className="text-subtext mb-3">
          Notify you when there is activity on your organization account
        </div>
        <div>
          <div className="d-flex align-items-center mb-2">
            <span className="d-flex pe-2 py-1">
              <ToggleSwitch id="items_are_funded" checked={items_are_funded} name="items_are_funded" changevalue={changevalue} />
            </span>
            <span className="text-subtext fs-7">Your items are funded</span>
          </div>
          <div className="d-flex align-items-center mb-2">
            <span className="d-flex pe-2 py-1">
              <ToggleSwitch id="you_receive_donation" checked={you_receive_donation} name="you_receive_donation" changevalue={changevalue} />
            </span>
            <span className="text-subtext fs-7">You receive a donation</span>
          </div>
          <div className="d-flex align-items-center mb-2">
            <span className="d-flex pe-2 py-1">
              <ToggleSwitch id="someone_follows_profile" checked={someone_follows_profile} name="someone_follows_profile" changevalue={changevalue} />
            </span>
            <span className="text-subtext fs-7">
              Someone follows your profile
            </span>
          </div>
        </div>
      </div>

      <div className="mb-5">
        <h4 className="fw-bolder">Orders</h4>
        <div className="text-subtext mb-3">
          Notify you when there is activity on items you post
        </div>
        <div>
          <div className="d-flex align-items-center mb-2">
            <span className="d-flex pe-2 py-1">
              <ToggleSwitch id="sales_on_your_post" checked={sales_on_your_post} name="sales_on_your_post" changevalue={changevalue} />
            </span>
            <span className="text-subtext fs-7">Sales on your posts</span>
          </div>
          <div className="d-flex align-items-center mb-2">
            <span className="d-flex pe-2 py-1">
              <ToggleSwitch id="your_item_funded" checked={your_item_funded} name="your_item_funded" changevalue={changevalue} />
            </span>
            <span className="text-subtext fs-7">Your item is 100% funded</span>
          </div>
          <div className="d-flex align-items-center mb-2">
            <span className="d-flex pe-2 py-1">
              <ToggleSwitch id="your_order_ready_to_purchase" checked={your_order_ready_to_purchase} name="your_order_ready_to_purchase" changevalue={changevalue} />
            </span>
            <span className="text-subtext fs-7">
              Your order is ready for purchase
            </span>
          </div>
        </div>
      </div>

      <div className="mb-5">
        <h4 className="fw-bolder">Billing</h4>
        <div className="text-subtext mb-3">Notify you when there are issues with your payments / saved cards</div>
        <div>
          <div className="d-flex align-items-center mb-2">
            <span className="d-flex pe-2 py-1">
              <ToggleSwitch id="problem_with_your_deposit" checked={problem_with_your_deposit} name="problem_with_your_deposit" changevalue={changevalue} />
            </span>
            <span className="text-subtext fs-7">There was a problem with your deposit</span>
          </div>
        </div>
      </div>

      <div className="mb-5">
        <h4 className="fw-bolder">Other</h4>
        <div className="text-subtext mb-3">Site functionality and more</div>
        <div>
          <div className="d-flex align-items-center mb-2">
            <span className="d-flex pe-2 py-1">
              <ToggleSwitch id="keep_profile_private" checked={keep_profile_private} name="keep_profile_private" changevalue={changevalue} />
            </span>
            <span className="text-subtext fs-7">Keep profile privte</span>
          </div>
        </div>
      </div>

      <Button
        variant="info"
        className="btn btn-info"
        onClick={() => saveControls()}
      >
        Save
      </Button>
    </>
  );
};

export default AdminControl;
