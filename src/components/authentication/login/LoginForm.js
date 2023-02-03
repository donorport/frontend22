import * as Yup from 'yup';
import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Link,
  Stack,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import ToastAlert from '../../../Common/ToastAlert';

import authApi from '../../../Api/admin/auth';
import FrontLoader from '../../../Common/FrontLoader';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({
    email: '',
    password: ''
  });
  const { email, password } = state;

  const onChangeValue = (e) => {
    let value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    });
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().required('Password is required')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: async () => {
      setLoading(false);
      const login = await authApi.login(formik.values.email, formik.values.password);

      if (login) {
        if (!login.data.success || login.data.status !== 1) {
          setLoading(false);
          ToastAlert({ msg: login.data.message, msgType: 'error' });
        } else {
          if (login.data.roleName === 'ADMIN') {
            if (login.data.roleName === 'CAMPAIGN_ADMIN' && login.data.otp_status !== 1) {
              setLoading(false);
              ToastAlert({ msg: 'Campaign Admin not Approved.', msgType: 'error' });
            } else {
              localStorage.clear();
              if (login.data.roleName === 'CAMPAIGN_ADMIN') {
                localStorage.setItem('CampaignAdminAuthToken', login.data.accessToken);
                localStorage.setItem('CampaignAdmin', JSON.stringify(login.data));

                navigate('/campaign/' + login.data.slug + '/posts', { replace: true });
              } else {
                localStorage.setItem('adminAuthToken', login.data.accessToken);
                localStorage.setItem('adminData', JSON.stringify(login.data));
                navigate('/admin/dashboard', { replace: true });
              }
              ToastAlert({ msg: login.data.message + ' ' + login.data.name, msgType: 'success' });
              setLoading(false);
            }

            // } else if (login.data.roleName === "CAMPAIGN_ADMIN") {
            //   if(login.data.status === 1 && login.data.otp_status === 1 ){
            //     localStorage.clear()
            //     localStorage.setItem('CampaignAdminAuthToken', login.data.accessToken)
            //     localStorage.setItem('CampaignAdminData', JSON.stringify(login.data))
            //     navigate('/admin/Dashboard', { replace: true })
            //     ToastAlert({ msg: login.data.message + " " + login.data.name, msgType: 'success' });
            //     setLoading(false)
            //   }else{
            //     setLoading(false)
            //     ToastAlert({ msg: 'Campaign Admin not Approved.', msgType: 'error' });
            //   }
          } else {
            setLoading(false);
            ToastAlert({ msg: 'Admin Not Found', msgType: 'error' });
          }
        }
      } else {
        setLoading(false);
        ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
      }
      // navigate('/dashboard', { replace: true });
    }
  });

  const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <>
      <FrontLoader loading={loading} />
      <FormikProvider value={formik}>
        {/* {console.log(formik.values)} */}
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              autoComplete="email"
              type="email"
              name="email"
              label="Email address"
              {...getFieldProps('email')}
              // value={email}
              // onChange={(e)=>onChangeValue(e)}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              // value={password}
              label="Password"
              name="password"
              // onChange={(e)=>onChangeValue(e)}
              {...getFieldProps('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleShowPassword} edge="end">
                      <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />
          </Stack>

          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
            {/* <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label="Remember me"
          /> */}

            {/* <Link component={RouterLink} variant="subtitle2" to="#">
            Forgot password?
          </Link> */}
          </Stack>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Login
          </LoadingButton>
        </Form>
      </FormikProvider>
    </>
  );
}
