import { useState, useEffect } from "react";
import ToggleSwitch from "../../atoms/toggle-switch";
import controlsApi from "../../../../../Api/frontEnd/controls";
import FrontLoader from "../../../../../Common/FrontLoader";
import { Button } from "react-bootstrap";
import ToastAlert from "../../../../../Common/ToastAlert";

import "./style.scss";

const UserControl = () => {
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(false);
  const userAuthToken = localStorage.getItem('userAuthToken');
  const [controls, setControls] = useState({
    _id: "",
    push: true,
    email: true,
    project: true,
    order_updates: true,
    media_updates: true,
    hide_sold_items: true,
    collapse_order_history: true,
    notify_payment_issues: true,
    show_only_tax_deductible_items: true,
  })

  const { _id, push, email, project, order_updates, media_updates, hide_sold_items, collapse_order_history, notify_payment_issues, show_only_tax_deductible_items } = controls


  useEffect(() => {
        (async () => {
            setLoading(true)
      const getControlSetting = await controlsApi.list(userAuthToken)
      if (getControlSetting.data.success) {
        // console.log(getControlSetting.data.data)
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
    data.push = push
    data.email = email
    data.project = project
    data.order_updates = order_updates
    data.media_updates = media_updates
    data.hide_sold_items = hide_sold_items
    data.collapse_order_history = collapse_order_history
    data.notify_payment_issues = notify_payment_issues
    data.show_only_tax_deductible_items = show_only_tax_deductible_items

    const saveControls = await controlsApi.saveControls(userAuthToken, data, _id)
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


  const changevalue = (e) => {
    let value = e.target.checked;

    setControls({
      ...controls,
      [e.target.name]: value

    })
  }
  return (
    <>
     {/*<FrontLoader loading={loading} />*/}
      <div className="mb-5">
        <h4 className="fw-bolder">Notifciations</h4>
        <div className="text-subtext mb-3">Turn off / on notifications</div>
        <div>
          <div className="d-flex align-items-center mb-2">
            <span className="d-flex p-2">
              <ToggleSwitch id="push" checked={push} name="push" changevalue={changevalue} />
            </span>
            <span className="text-subtext fs-7">Push Notifications</span>
          </div>
          <div className="d-flex align-items-center mb-2">
            <span className="d-flex p-2">
              <ToggleSwitch id="email" checked={email} name="email" changevalue={changevalue} />
            </span>
            <span className="text-subtext fs-7">Email Notifications</span>
          </div>
          <div className="d-flex align-items-center mb-2">
            <span className="d-flex p-2">
              <ToggleSwitch id="project" checked={project} name="project" changevalue={changevalue} />
            </span>
            <span className="text-subtext fs-7">
              Projects / Organizations you Follow
            </span>
          </div>

          <div className="d-flex align-items-center mb-2">
            <span className="d-flex p-2">
              <ToggleSwitch id="order_updates" checked={order_updates} name="order_updates" changevalue={changevalue} />
            </span>
            <span className="text-subtext fs-7">Order Updates</span>
          </div>

          <div className="d-flex align-items-center mb-2">
            <span className="d-flex p-2">
              <ToggleSwitch id="media_updates" checked={media_updates} name="media_updates" changevalue={changevalue} />
            </span>
            <span className="text-subtext fs-7">Media Updates</span>
          </div>
        </div>
      </div>

      <div className="mb-5">
        <h4 className="fw-bolder">Account</h4>
        <div className="text-subtext mb-3">
          Customize your account to suite your needs
        </div>
        <div>
          <div className="d-flex align-items-center mb-2">
            <span className="d-flex p-2">
              <ToggleSwitch id="hide_sold_items" checked={hide_sold_items} name="hide_sold_items" changevalue={changevalue} />

            </span>
            <span className="text-subtext fs-7">Hide sold items</span>
          </div>
        </div>
      </div>

      <div className="">
        <h4 className="fw-bolder">Orders</h4>
        <div className="text-subtext mb-3">Settings related to your orders</div>
        <div>
          <div className="d-flex align-items-center mb-2">
            <span className="d-flex p-2">
              <ToggleSwitch id="collapse_order_history" checked={collapse_order_history} name="collapse_order_history" changevalue={changevalue} />

            </span>
            <span className="text-subtext fs-7">
              Always collapse Order History
            </span>
          </div>
          <div className="d-flex align-items-center mb-2">
            <span className="d-flex p-2">
              <ToggleSwitch id="notify_payment_issues" checked={notify_payment_issues} name="notify_payment_issues" changevalue={changevalue} />

            </span>
            <span className="text-subtext fs-7">
              Notify me if there are issues processing a payment
            </span>
          </div>
          <div className="d-flex align-items-center mb-2">
            <span className="d-flex p-2">
              <ToggleSwitch id="show_only_tax_deductible_items" checked={show_only_tax_deductible_items} name="show_only_tax_deductible_items" changevalue={changevalue} />

            </span>
            <span className="text-subtext fs-7">
              Only show me items that are tax deductible
            </span>
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

export default UserControl;
