import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import OrganisationTeamItem from '../../molecules/org-team-item';
import { getCookie, setCookie, deleteCookie } from '../../../../../Common/Helper';
import React, { useState, useEffect } from 'react';
import './style.scss';
import organizationApi from '../../../../../Api/frontEnd/organization';
import ToastAlert from '../../../../../Common/ToastAlert';
import FrontLoader from '../../../../../Common/FrontLoader';
import { useSelector, useDispatch } from 'react-redux';
import { setIsActiveOrg } from '../../../../../user/user.action';
import { confirmAlert } from 'react-confirm-alert';

const UserAdmin = () => {
  const userAuthToken = typeof window !== 'undefined' && localStorage.getItem('userAuthToken');
  const CampaignAdminAuthToken =
    typeof window !== 'undefined' && localStorage.getItem('CampaignAdminAuthToken');
  const CampaignAdmin =
    typeof window !== 'undefined' && JSON.parse(localStorage.getItem('CampaignAdmin'));
  const userData = typeof window !== 'undefined' && JSON.parse(localStorage.getItem('userData'));
  const currentId = CampaignAdminAuthToken ? CampaignAdmin.id : userData.id;
  // const type = localStorage.getItem('type');
  // const tempCampaignAdminAuthToken = localStorage.getItem('tempCampaignAdminAuthToken');
  // const token = type ? type === 'temp' ? tempCampaignAdminAuthToken : CampaignAdminAuthToken : CampaignAdminAuthToken

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [teamMemberList, setTeamMemberList] = useState([]);

  const elemRefs = [];
  const inputStyle = {
    backgroundColor: '#f8fafd'
  };

  const autoTab = (e, i) => {
    setCookie(e.target.name, e.target.value.replace(/[^\d.]|\.(?=.*\.)/g, ''), 1);
    const BACKSPACE_KEY = 8;
    const DELETE_KEY = 46;
    let tabindex = i || 0;
    tabindex = Number(tabindex);
    let elem = null;
    if (e.keyCode === BACKSPACE_KEY) {
      elem = tabindex > 0 && elemRefs[tabindex - 1];
    } else if (e.keyCode !== DELETE_KEY) {
      elem = tabindex < elemRefs.length - 1 && elemRefs[tabindex + 1];
    }
    if (elem) {
      elem.current.focus();
    }
  };

  const Input = (props) => {
    const ref = React.createRef();
    elemRefs.push(ref);
    return (
      <input
        className="activate__input block"
        data-index={props.index}
        ref={ref}
        maxLength={1}
        name={'code' + (props.index + 1)}
        // value={val}
        // onChange={(e) => setCode(e, props.index)}
        onKeyUp={(e) => props.autoTab(e, props.index)}
        style={inputStyle}
      />
    );
  };

  const blocks = Array.from({ length: 4 }, (element, index) => (
    <Input key={index} index={index} autoTab={autoTab} />
  ));

  const activateCode = async () => {
    setLoading(false);
    let code1 = getCookie('code1');
    let code2 = getCookie('code2');
    let code3 = getCookie('code3');
    let code4 = getCookie('code4');

    if (code1 && code2 && code3 && code4) {
      let finalCode = code1 + code2 + code3 + code4;

      let data = {};
      data.otp = Number(finalCode);

      const verifyOtp = await organizationApi.teamMemberActivation(userAuthToken, data);
      deleteCookie('code1');
      deleteCookie('code2');
      deleteCookie('code3');
      deleteCookie('code4');
      if (verifyOtp) {
        if (!verifyOtp.data.success) {
          setLoading(false);
          ToastAlert({ msg: verifyOtp.data.message, msgType: 'error' });
        } else {
          setLoading(false);
          ToastAlert({ msg: verifyOtp.data.message, msgType: 'success' });
          dispatch(setIsActiveOrg(!user.isActiveOrg));
        }
      } else {
        setLoading(false);
        ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
      }
    } else {
      deleteCookie('code1');
      deleteCookie('code2');
      deleteCookie('code3');
      deleteCookie('code4');

      ToastAlert({ msg: 'Please Enter Valid an Activation Code', msgType: 'error' });
    }
  };

  useEffect(() => {
    (async () => {
      await listTeamMembers();
    })();
  }, []);

  const listTeamMembers = async () => {
    const list = await organizationApi.listUserTeamMember(userAuthToken);
    if (list) {
      if (list.data.success) {
        setTeamMemberList(list.data.data);
      } else {
        setTeamMemberList([]);
      }
    }
  };

  const removeTeamMember = async (id) => {
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to Remove Member.',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            setLoading(false);
            if (id !== '') {
              const deleteAd = await organizationApi.removeTeamMember(userAuthToken, id);
              if (deleteAd) {
                if (deleteAd.data.success === false) {
                  setLoading(false);
                  ToastAlert({ msg: deleteAd.data.message, msgType: 'error' });
                } else {
                  if (deleteAd.data.success === true) {
                    // setEmail('')
                    // setisValid(false)
                    ToastAlert({ msg: deleteAd.data.message, msgType: 'success' });
                    await listTeamMembers();
                    setLoading(false);
                  }
                }
              } else {
                setLoading(false);
                ToastAlert({ msg: 'Member not Removed', msgType: 'error' });
              }
            } else {
              setLoading(false);
              ToastAlert({ msg: 'Member not delete id Not found', msgType: 'error' });
            }
          }
        },
        {
          label: 'No'
        }
      ]
    });
  };

  return (
    <>
      <FrontLoader loading={loading} />
      <div className="mw-600">
        <div className="mb-5">
          <div className="d-flex align-items-start">
            <div className="flex__1">
              <h4 className="fw-bolder">Administrator Status</h4>
              <div className="text-subtext mb-3">
                Enter the code you received to manage an Organization account
              </div>
            </div>
            {/* <Button variant="success" className="btn__xs px-2 rounded-pill ms-2 text-uppercase">Active</Button> */}
          </div>

          <div className="activate">
            <div className="activate__icon">
              <FontAwesomeIcon icon={regular('fingerprint')} />
            </div>
            <div className="activate__code">
              {blocks}
              {/* <input type="text" className="activate__input" name="verifyCode1" />
            <input type="text" className="activate__input" name="verifyCode2" />
            <input type="text" className="activate__input" name="verifyCode3" />
            <input type="text" className="activate__input" name="verifyCode4" />
            <input type="text" className="activate__input" name="verifyCode5" /> */}
            </div>
            <Button variant="info" className="ms-auto" onClick={() => activateCode()}>
              Activate
            </Button>
          </div>
        </div>

        <div className="mb-5">
          <h4 className="fw-bolder">Team Members</h4>
          <div className="text-subtext mb-3">
            Yourself and others have access to an Organization account
          </div>

          <div className="d-sm-flex align-items-start">
            {/* <div className="mr-20p">
            <a href="/" className="org__logo">
              <img
                className="img-fluid"
                src="https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/5eb214120d5bdf50b6916eee_5eb2130f68b14aa4239923ed_Tree-Frog-Logo-Mock.png"
                alt=""
              />
            </a>
          </div> */}
            <ul className="list-unstyeld flex__1 ps-0">
              {teamMemberList.length > 0 &&
                teamMemberList.map((member, i) => {
                  // console.log(member)
                  return (
                    <OrganisationTeamItem
                      showEmail={true}
                      member={member}
                      isCurrent={member.typeId === currentId}
                      removeTeamMember={removeTeamMember}
                      rightElement={
                        <FontAwesomeIcon
                          icon={solid('shield-halved')}
                          className="text-info fs-4 ms-auto"
                        />
                      }
                    />
                  );
                })}
              {/* <OrganisationTeamItem
              showEmail={true}
              rightElement={
                <FontAwesomeIcon
                  icon={regular("shield")}
                  className="text-info fs-4 ms-auto"
                />
              }
            />
            <OrganisationTeamItem
              showEmail={true}
              rightElement={
                <div className="d-flex aling-items-center">
                  <Button variant="link" className="">
                    <FontAwesomeIcon
                      icon={regular("shield")}
                      className="text-subtext fs-4 ms-auto"
                    />
                  </Button>
                  <Button variant="danger">Remove</Button>
                </div>
              }
            /> */}
            </ul>
          </div>

          <div className="note note--info">
            If this User Profile is the admin for the associated Admin Profile, the user may remove
            users or transfer administrator privileges here.
          </div>
        </div>
      </div>
    </>
  );
};

export default UserAdmin;
