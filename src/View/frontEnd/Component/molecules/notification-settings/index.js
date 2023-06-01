// import React from "react";
import React, { useState, useEffect } from 'react';
import ToggleSwitch from '../../atoms/toggle-switch';
import controlsApi from '../../../../../Api/frontEnd/controls';

import './style.scss';

function NotificationSettings() {
  //const [check1, setCheck1] = useState(0);
  //const [check2, setCheck2] = useState(0);
  const userAuthToken = localStorage.getItem('userAuthToken');

  const [controls, setControls] = useState({
    _id: '',
    turn_of: true,
    status: true,
    new_item_posted: true,
    milestones: true,
    org_new_item_posted: true,
    org_change_profile: true,
    project_new_item_posted: true,
    poroject_fully_funded: true
  });
  const {
    _id,
    turn_of,
    status,
    new_item_posted,
    milestones,
    org_new_item_posted,
    //org_change_profile,
    project_new_item_posted,
    poroject_fully_funded
  } = controls;

  const changevalue = async (e) => {
    let value = e.target.checked;

    setControls({
      ...controls,
      [e.target.name]: value
    });
    let data = {};
    data[e.target.name] = value;

    await controlsApi.saveControls(userAuthToken, data, _id);
  };

  useEffect(() => {
    (async () => {
      const getControlSetting = await controlsApi.list(userAuthToken);
      if (getControlSetting.data.success) {
        setControls({
          ...getControlSetting.data.data
        });
      }
    })();
  }, []);
  return (
    <div className="notifications-wrap">
      <div>
        <div className="menu__title">
          <h6 className="mb-0">Push Notifications</h6>
        </div>
        <ul className="notify-settings-list list-unstyled">
          <li className="notify__settings-item d-flex align-items-center">
            <div>
              Turn <strong className="text-dark">OFF</strong>&nbsp;all notifications
            </div>
            <div className="menu__toggle ms-auto">
              <ToggleSwitch
                checked={turn_of}
                changevalue={changevalue}
                colorOne="#efefef"
                colorTwo="#06D6A0"
                name="turn_of"
              />
            </div>
          </li>
          <li className="notify__settings-item d-flex align-items-center">
            <div>Status updates on your purchases</div>
            <div className="menu__toggle ms-auto">
              <ToggleSwitch
                checked={status}
                changevalue={changevalue}
                colorOne="#efefef"
                colorTwo="#06D6A0"
                name="status"
              />
            </div>
          </li>
          <li className="notify__settings-item d-flex align-items-center">
            <div>When new items are posted</div>
            <div className="menu__toggle ms-auto">
              <ToggleSwitch
                checked={new_item_posted}
                changevalue={changevalue}
                colorOne="#efefef"
                colorTwo="#06D6A0"
                name="new_item_posted"
              />
            </div>
          </li>
          <li className="notify__settings-item d-flex align-items-center">
            <div>Milestones (funding, donations)</div>
            <div className="menu__toggle ms-auto">
              <ToggleSwitch
                checked={milestones}
                changevalue={changevalue}
                colorOne="#efefef"
                colorTwo="#06D6A0"
                name="milestones"
              />
            </div>
          </li>
        </ul>
      </div>

      <div>
        <div className="menu__title">
          <h6 className="mb-0">Organizations</h6>
        </div>
        <ul className="notify-settings-list list-unstyled">
          <li className="notify__settings-item d-flex align-items-center">
            <div>When new items are posted</div>
            <div className="menu__toggle ms-auto">
              <ToggleSwitch
                checked={org_new_item_posted}
                changevalue={changevalue}
                colorOne="#efefef"
                colorTwo="#06D6A0"
                name="org_new_item_posted"
              />
            </div>
          </li>
          <li className="notify__settings-item d-flex align-items-center">
            <div>Changes to Profile</div>
            <div className="menu__toggle ms-auto">
              <ToggleSwitch
                checked={poroject_fully_funded}
                changevalue={changevalue}
                colorOne="#efefef"
                colorTwo="#06D6A0"
                name="poroject_fully_funded"
              />
            </div>
          </li>
        </ul>
      </div>

      <div>
        <div className="menu__title">
          <h6 className="mb-0">Projects</h6>
        </div>
        <ul className="notify-settings-list list-unstyled">
          <li className="notify__settings-item d-flex align-items-center">
            <div>When new items are posted</div>
            <div className="menu__toggle ms-auto">
              <ToggleSwitch
                checked={project_new_item_posted}
                changevalue={changevalue}
                colorOne="#efefef"
                colorTwo="#06D6A0"
                name="project_new_item_posted"
              />
            </div>
          </li>
          <li className="notify__settings-item d-flex align-items-center">
            <div>When the project is fully funded</div>
            <div className="menu__toggle ms-auto">
              <ToggleSwitch
                checked={poroject_fully_funded}
                changevalue={changevalue}
                colorOne="#efefef"
                colorTwo="#06D6A0"
                name="poroject_fully_funded"
              />
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NotificationSettings;
