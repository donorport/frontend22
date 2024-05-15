import { Button } from 'react-bootstrap';
import Avatar from '../../atoms/avatar';
import './style.scss';
import organizationApi from '../../../../../Api/frontEnd/organization';
import React, { useState, useEffect } from 'react';
import helper, { getCookie, setCookie, deleteCookie } from '../../../../../Common/Helper';
import ToastAlert from '../../../../../Common/ToastAlert';
import { useSelector } from 'react-redux';
import removeImg from '../../../../../assets/images/remove-link.svg';
import { CircularProgress } from '@mui/material';

function LinkedOrg(props) {
  const [isDataLoading, setIsDataLoading] = useState(true);

  // const userAuthToken = localStorage.getItem('userAuthToken');
  const user = useSelector((state) => state.user);
  const userAuthToken = localStorage.getItem('userAuthToken');
  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  const token = userAuthToken
    ? userAuthToken
    : CampaignAdminAuthToken
    ? CampaignAdminAuthToken
    : '';
  const [teamMemberList, setTeamMemberList] = useState([]);

  const CampaignAdmin = JSON.parse(localStorage.getItem('CampaignAdmin'));
  const userData = JSON.parse(localStorage.getItem('userData'));
  const currentId = CampaignAdminAuthToken ? CampaignAdmin.id : userData.id;

  const [orgList, setorgList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modelShow, setModelShow] = useState(false);
  const [orgId, setorgId] = useState('');

  const list = async () => {
    const list = await organizationApi.teamMemberOrganizationList(token);
    if (list) {
      if (list.data.success) {
        setorgList(list.data.data);
      }
    }
  };

  const listTeamMembers = async () => {
    const list = await organizationApi.listUserTeamMember(token);
    if (list) {
      if (list.data.success) {
        setTeamMemberList(list.data.data);
      } else {
        setTeamMemberList([]);
      }
    }
  };

  useEffect(() => {
    (async () => {
      if (token) {
        setIsDataLoading(true); // Set data loading to true initially
        await list();
        await listTeamMembers();
        setIsDataLoading(false); // Turn off data loading after fetching data
      }
    })();
  }, [!user.isActiveOrg]);

  const removeTeamMember = async (id) => {
    setLoading(true);
    const deleteAd = await organizationApi.removeTeamMember(token, orgId);
    if (deleteAd) {
      if (deleteAd.data.success === false) {
        setLoading(false);
        ToastAlert({ msg: deleteAd.data.message, msgType: 'error' });
      } else {
        if (deleteAd.data.success === true) {
          ToastAlert({ msg: deleteAd.data.message, msgType: 'success' });
          await list();
          await listTeamMembers();
          setLoading(false);
          setModelShow(false);
        }
      }
    } else {
      setLoading(false);
      ToastAlert({ msg: 'Member not Removed', msgType: 'error' });
    }
  };

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
        // style={inputStyle}
      />
    );
  };

  const blocks = Array.from({ length: 4 }, (element, index) => (
    <Input key={index} index={index} autoTab={autoTab} />
  ));

  const activateCode = async () => {
    setLoading(true);
    let code1 = getCookie('code1');
    let code2 = getCookie('code2');
    let code3 = getCookie('code3');
    let code4 = getCookie('code4');

    if (code1 && code2 && code3 && code4) {
      let finalCode = code1 + code2 + code3 + code4;

      let data = {};
      data.otp = Number(finalCode);

      const verifyOtp = await organizationApi.teamMemberActivation(token, data);
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
          // dispatch(setIsActiveOrg(!user.isActiveOrg))
          await list();
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

      ToastAlert({ msg: 'Please enter a valid activation code', msgType: 'error' });
    }
  };

  if (isDataLoading)
    return (
      <div className="my-5 d-flex justify-content-center">
        <CircularProgress size={21} />
      </div>
    );

  return (
    <>
      <div style={{ display: modelShow ? 'block' : 'none' }}>
        <div className=" py-5 text-center border-bottom">
          <div className="remove-img-wrap">
            <img src={removeImg} alt="remove link" style={{ width: '70px', marginBottom: '0px' }} />
          </div>
          <h5 className="modal-title mb-3" id="removeModalTwoLabel">
            Unlink Organization ?
          </h5>
          <p>Are you sure you want to remove the item?</p>
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-flat btn-link"
            data-bs-dismiss="modal"
            onClick={() => setModelShow(false)}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-flat btn-danger"
            data-bs-dismiss="modal"
            onClick={() => removeTeamMember()}
          >
            Remove
          </button>
        </div>
      </div>

      <div style={{ display: modelShow ? 'none' : 'block' }} className=" linked-org">
        {orgList.length > 0 ? (
          <div className="menu__title">
            <h6 className="mb-0">Linked</h6>
          </div>
        ) : (
          ''
        )}
        <ul className="linked-list list-unstyled mb-0">
          {orgList.length > 0 ? (
            orgList.map((org, i) => {
              return (
                <li className="linked__item py-2 d-flex align-items-center" key={i}>
                  <Button
                    variant="link"
                    // href={'/campaign/' + org?.organizationDetails?.slug + '/dashboard'}
                    onClick={() =>
                      props.getAuthToken(
                        org?.organizationDetails?._id,
                        org?.organizationDetails?.slug
                      )
                    }
                    className="linked__item-link py-0 d-flex align-items-center flex-grow-1 text-decoration-none"
                  >
                    <div className="linked__item-img-wrap">
                      <img
                        className="linked__item-img img-fluid"
                        alt="a"
                        src={helper.CampaignAdminLogoPath + org?.organizationDetails?.logo}
                      />
                    </div>
                    <div className="linked__item-label fs-7 fw-bold pl-12p">
                      {org?.organizationDetails?.name}
                    </div>
                  </Button>
                  <Button
                    variant="link"
                    className="btn__link-light linked__item-unlink ms-auto fs-7 me-1 fw-normal"
                    // onClick={() => removeTeamMember(org._id)}
                    onClick={() => {
                      setModelShow(true);
                      setorgId(org._id);
                    }}
                  >
                    unlink
                  </Button>
                </li>
              );
            })
          ) : (
            <div className="empty__block pt-5">
              <div className="empty__cart mb-2">
                <img src={removeImg} alt="" width="90%" />
              </div>
              <div className="no__items-found fw-bold">You have no linked organizations.</div>
              <span className="mt-1 fs-7" style={{ maxWidth: '225px' }}>
                To link to an organization, you'll need to be invited by a
                charity.
              </span>
            </div>
          )}
        </ul>

        {teamMemberList.length > 0 && (
          <div className="menu__title">
            <h6 className="mb-0">Team</h6>
          </div>
        )}

        <ul className="linked-list list-unstyled mb-0">
          {teamMemberList.length > 0 &&
            teamMemberList.map((member, i) => {
              let image =
                member.type === 'USER'
                  ? helper.DonorImageResizePath + member?.userDetails?.image
                  : helper.CampaignAdminLogoPath + member?.orgDetails?.logo;
              let name =
                member.type === 'USER' ? member.userDetails?.name : member?.orgDetails?.name;
              // console.log(member)
              return (
                member.typeId !== currentId && (
                  <li className="linked__item py-2" key={i}>
                    <div className="linked__item-link px-12p d-flex align-items-center flex-grow-1">
                      <Avatar size={42} border={0} shadow={false} avatarUrl={image} />
                      <div className="linked__item-label fs-7 fw-bold pl-12p">
                        <div className="mb-3p">{name}</div>
                        <div className="org__team__item__price fs-7 fw-semibold text-light">
                          {member?.campaignadminDetails?.name}
                        </div>
                        <div className="team__role fs-8 fw-normal">
                          {member.status ? 'Active' : 'Inactive'}
                        </div>
                      </div>
                    </div>
                  </li>
                )
              );
            })}
        </ul>
        {/* <div className="menu__title">
          <h6 className="mb-0 fs-7">Add an Organization</h6>

          <a
            href="/apply"
            className="p-0 btn__link-light linked__item-unlink ms-auto fs-7 me-1 fw-normal"
          >
            request access
          </a>
        </div> */}
        {/* <div className="activate">
          <div className="activate__icon">
            <i className="fa-regular fa-fingerprint "></i>
          </div>
          <div className="activate__code">
            {blocks}
          </div>
          <Button variant="info" className="ms-auto" onClick={() => activateCode()}>
            Activate
          </Button>
        </div> */}
      </div>
    </>
  );
}

export default LinkedOrg;
