import { Button, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import OrganizationTeamItem from '../../molecules/org-team-item';
import React, { useState, useEffect } from 'react';
import helper, { isValidEmail } from '../../../../../Common/Helper';
import organizationApi from '../../../../../Api/frontEnd/organization';
import './style.scss';
import ToastAlert from '../../../../../Common/ToastAlert';
import { confirmAlert } from 'react-confirm-alert';
import FrontLoader from '../../../../../Common/FrontLoader';
import { Outlet, useOutletContext } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';

const AdminAdmin = () => {
  const [email, setEmail] = useState();
  const [isValid, setisValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [teamMemberList, setTeamMemberList] = useState([]);
  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  const type = localStorage.getItem('type');
  const tempCampaignAdminAuthToken = localStorage.getItem('tempCampaignAdminAuthToken');
  const token = type
    ? type === 'temp'
      ? tempCampaignAdminAuthToken
      : CampaignAdminAuthToken
    : CampaignAdminAuthToken;
  const [data, setData] = useOutletContext();

  const CampaignAdmin = JSON.parse(localStorage.getItem('CampaignAdmin'));
  const userData = JSON.parse(localStorage.getItem('userData'));
  const currentId = CampaignAdminAuthToken ? CampaignAdmin.id : userData.id;
  // const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');

  // console.log(userData.id)

  useEffect(() => {
    (async () => {
      await listTeamMembers();
    })();
  }, []);

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
    setisValid(isValidEmail(e.target.value));
  };

  const inviteTeamMember = async () => {
    setLoading(true);
    let fdata = {};
    fdata.email = email;
    fdata.organizationName = data.name;

    const invite = await organizationApi.inviteTeamMember(token, fdata);
    if (invite) {
      if (invite.data.success === false) {
        setLoading(false);
        ToastAlert({ msg: invite.data.message, msgType: 'error' });
      } else {
        setEmail('');
        setisValid(false);
        await listTeamMembers();
        setLoading(false);
        ToastAlert({ msg: invite.data.message, msgType: 'success' });
      }
    } else {
      setLoading(false);
      ToastAlert({ msg: 'Something Went Wrong', msgType: 'error' });
    }
  };

  const listTeamMembers = async () => {
    const list = await organizationApi.listTeamMember(token);
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
      title: 'Remove User?',
      message: 'Are you sure you want to remove this user?',
      buttons: [
        {
          label: 'Cancel'
        },
        {
          label: 'Remove User',
          onClick: async () => {
            setLoading(true);
            if (id !== '') {
              const deleteAd = await organizationApi.removeTeamMember(token, id);
              if (deleteAd) {
                if (deleteAd.data.success === false) {
                  setLoading(false);
                  ToastAlert({ msg: deleteAd.data.message, msgType: 'error' });
                } else {
                  if (deleteAd.data.success === true) {
                    setEmail('');
                    setisValid(false);
                    ToastAlert({ msg: deleteAd.data.message, msgType: 'success' });
                    await listTeamMembers();
                    setLoading(false);
                  }
                }
              } else {
                setLoading(false);
                ToastAlert({ msg: 'User not Removed', msgType: 'error' });
              }
            } else {
              setLoading(false);
              ToastAlert({ msg: 'User not deleted, ID Not found', msgType: 'error' });
            }
          }
        }
      ]
    });
  };

  return (
    <>

      <div className="mw-600">
        <div className="mb-5">
          <h4 className="fw-bolder">Administrators</h4>
          <div className="text-subtext mb-3 pt-1">
            These users have full access to the account for
            <FontAwesomeIcon icon={regular('link')} className="text-subtext me-1 ms-2" />
            {data.name}
          </div>
          <div className="note  mb-2 fs-6">
            You can invite additional team members to have access to and control this account.
          </div>
          <div className="d-flex align-items-center gap-2 mb-3">
            <FormControl
              placeholder="Email"
              size="lg"
              value={email}
              onChange={(e) => onChangeEmail(e)}
            />

            <Button
              variant="info"
              disabled={!isValid}
              size="md"
              className="d-flex fw-bold text-white"
              onClick={() => !loading && inviteTeamMember()}
              style={{
                opacity: loading ? '0.7' : '1'
              }}
            >
              Invite {loading && <CircularProgress className="ms-2" color="inherit" size={12} />}
            </Button>

            <span className="rounded text-nowrap fw-bold">
              {3 - teamMemberList.length} remaining
            </span>
          </div>

          {/* <div data-empty="admin" className="note note--error"
            style={{
              backgroundColor: '#f8fafd',
              color: '#c97878',
              maxWidth: '600px',
              padding: ' 21px 28px',
              borderRadius: '6px',
              fontSize: '13px',
              lineHeight: '1.3rem',
              fontWeight: 400,
            }}
          >

            <div>
              You need to <span className="note__span note__span--text" style={{ color: "#3a94d4" }}>upgrade</span>
              your account to add more users.
            </div>

          </div> */}

          <ul className="d-flex flex-column list-unstyled flex__1 ps-0 gap-4 pt-2">
            {teamMemberList.length > 0 &&
              teamMemberList.map((member, i) => {
                // console.log(member)
                return (
                  <OrganizationTeamItem
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
          </ul>

          {/* <div className="px-1 py-20p mt-1 mb-20p fs-7 text-subtext">
            <FontAwesomeIcon icon={solid('shield-halved')} className="fs-5 text-info me-2" />
            The Organization Administrator controls access for Team Members
          </div> */}

          {/* <div className="note note--info  fs-6">
            <FontAwesomeIcon icon={regular('circle-info')} className="text-info me-1" />
            For support with user admin accounts click here.
          </div> */}
        </div>
      </div>
    </>
  );
};

export default AdminAdmin;
