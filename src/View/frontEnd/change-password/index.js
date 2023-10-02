import { useState } from 'react';
import { Button, InputGroup, Container, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

// import DefaultLayout from "@templates/default-layout";

import DefaultLayout from '../Component/templates/default-layout';
import { useNavigate } from 'react-router-dom';
import ToastAlert from '../../../Common/ToastAlert';
import { validateAll } from 'indicative/validator';
import './style.scss';

import userApi from '../../../Api/frontEnd/user';
import adminCampaignApi from '../../../Api/admin/adminCampaign';

const CHANGE_RULES = {
  currentPassword: 'required',
  newPassword: 'required|min:6',
  confirmPassword: 'required|same:newPassword'
};

const CHANGE_MESSAGE = {
  'currentPassword.required': 'Current Password is required.',
  'newPassword.min': 'New Password must be at least 6 characters',
  'newPassword.required': 'New Password is required.',
  'confirmPassword.required': 'Confirm Password is required.',
  'confirmPassword.same': 'Password and ConfirmPassword Must be same.'
};

const ChangePassword = () => {
  const [showCPassword, toggleCPassword] = useState(false);
  const [showNPassword, toggleNPassword] = useState(false);
  const [showRNPassword, toggleRNPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const userAuthToken = localStorage.getItem('userAuthToken');
  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  //const params = useParams();
  const navigate = useNavigate();
  const [state, setstate] = useState({
    newPassword: '',
    confirmPassword: '',
    currentPassword: '',
    error: []
  });

  const {
    error,
    newPassword,
    //confirmPassword,
    currentPassword
  } = state;

  const changevalue = (e) => {
    let value = e.target.value;
    setstate({
      ...state,
      [e.target.name]: value
    });
  };

  const change = () => {
    validateAll(state, CHANGE_RULES, CHANGE_MESSAGE)
      .then(async () => {
        const formaerrror = {};
        setstate({
          ...state,
          error: formaerrror
        });
        setLoading(true);
        let data = {};
        data.current_password = currentPassword;
        data.new_password = newPassword;
        let changePassword;
        if (CampaignAdminAuthToken) {
          changePassword = await adminCampaignApi.updatePassword(CampaignAdminAuthToken, data);
        } else {
          changePassword = await userApi.updatePassword(userAuthToken, data);
        }
        if (changePassword) {
          if (!changePassword.data.success) {
            setLoading(false);
            ToastAlert({ msg: changePassword.data.message, msgType: 'error' });
          } else {
            localStorage.clear();
            navigate('/signin');
            ToastAlert({ msg: changePassword.data.message, msgType: 'success' });
            setLoading(false);
          }
        } else {
          setLoading(false);
          ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
        }
      })
      .catch((errors) => {
        setLoading(false);
        const formaerrror = {};
        if (errors.length) {
          errors.forEach((element) => {
            formaerrror[element.field] = element.message;
          });
        } else {
          ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
        }

        setstate({
          ...state,
          error: formaerrror
        });
      });
  };

  return (
    <>
      {/*<FrontLoader loading={loading} />*/}
      <DefaultLayout>
        <div className="password-reset position-relative">
          <Container fluid className="position-relative pb-5 pt-3">
            <h1 className="fs-2  fw-bolder mb-6p">Change Password</h1>
            <div className="fs-5 text-light mb-4">
              Complate below process to Change your password
            </div>

            <Form className="mw-400">
              <InputGroup className="">
                <Form.Control
                  type={!showCPassword ? 'password' : 'text'}
                  size="xl"
                  name="currentPassword"
                  placeholder="Current Password"
                  className="border-end-0"
                  onChange={(e) => changevalue(e)}
                />
                <Button
                  variant="link"
                  onClick={() => toggleCPassword(!showCPassword)}
                  className=" border-top border-end border-bottom"
                >
                  <FontAwesomeIcon
                    icon={solid('eye')}
                    className={`${showCPassword ? 'text-primary' : 'text-light'}`}
                  />
                </Button>
              </InputGroup>
              {error && error.currentPassword && (
                <p className="error">
                  {error ? (error.currentPassword ? error.currentPassword : '') : ''}
                </p>
              )}

              <InputGroup className="mt-3">
                <Form.Control
                  type={!showNPassword ? 'password' : 'text'}
                  size="xl"
                  name="newPassword"
                  placeholder="New Password"
                  className="border-end-0"
                  onChange={(e) => changevalue(e)}
                />
                <Button
                  variant="link"
                  onClick={() => toggleNPassword(!showNPassword)}
                  className=" border-top border-end border-bottom"
                >
                  <FontAwesomeIcon
                    icon={solid('eye')}
                    className={`${showNPassword ? 'text-primary' : 'text-light'}`}
                  />
                </Button>
              </InputGroup>
              {error && error.newPassword && (
                <p className="error">{error ? (error.newPassword ? error.newPassword : '') : ''}</p>
              )}
              <InputGroup className="mt-3 ">
                <Form.Control
                  type={!showRNPassword ? 'password' : 'text'}
                  size="xl"
                  name="confirmPassword"
                  placeholder="Re-type New Password"
                  className="border-end-0"
                  onChange={(e) => changevalue(e)}
                />
                <Button
                  variant="link"
                  onClick={() => toggleRNPassword(!showRNPassword)}
                  className=" border-top border-end border-bottom"
                >
                  <FontAwesomeIcon
                    icon={solid('eye')}
                    className={`${showRNPassword ? 'text-primary' : 'text-light'}`}
                  />
                </Button>
              </InputGroup>
              {error && error.confirmPassword && (
                <p className="error">
                  {error ? (error.confirmPassword ? error.confirmPassword : '') : ''}
                </p>
              )}

              {/* <div className="note note--more  mb-3">
              <FontAwesomeIcon
                icon={regular("info-circle")}
                className="text-info mr-3p"
              />{" "}
              A confirmation link will be sent to your email.
            </div> */}

              <Button variant="info" size="lg" className="fw-bold mt-3" onClick={() => change()}>
                Change Password
              </Button>
            </Form>
          </Container>
        </div>
      </DefaultLayout>
    </>
  );
};

export default ChangePassword;
