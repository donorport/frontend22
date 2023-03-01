import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { useNavigate } from 'react-router-dom';
// material
import { Stack, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import FrontLoader from '../../../Common/FrontLoader';
import adminCampaignApi from '../../../Api/admin/adminCampaign';
import ToastAlert from '../../../Common/ToastAlert';


// ----------------------------------------------------------------------

export default function RegisterForm() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);
  const [loading, setLoading] = useState(false);



  const RegisterSchema = Yup.object().shape({
    // firstName: Yup.string()
    //   .min(2, 'Too Short!')
    //   .max(50, 'Too Long!')
    //   .required('First name required'),
    name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Name is required'),
    email: Yup.string().email('Email must be a valid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password Must be atleast 6 character long !').required('Password is required'),
    cpassword: Yup.string().oneOf([Yup.ref('password')], 'Confirm Password and Passwords does not match').required('Confirm Password is required')

  });

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      cpassword: '',
    },
    validationSchema: RegisterSchema,
    onSubmit: async () => {
      setLoading(true)
      let data = {}
      data.name = formik.values.name
      data.email = formik.values.email
      data.password = formik.values.password
      
      const applyCampaignAdmin = await adminCampaignApi.applyCampaignAdmin(data)
      if (applyCampaignAdmin) {
        if (!applyCampaignAdmin.data.success) {
          setLoading(false)
          ToastAlert({ msg: applyCampaignAdmin.data.message, msgType: 'error' });
        } else {
          setLoading(false)
          ToastAlert({ msg: applyCampaignAdmin.data.message, msgType: 'success' });
          navigate('/admin/login', { replace: true });
        }
      } else {
        setLoading(false)
        ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
      }
      // 
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <>
     {/*<FrontLoader loading={loading} />*/}
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {/* <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="First name"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="Last name"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack> */}

            <TextField
              fullWidth
              autoComplete="name"
              type="name"
              label="Name"
              {...getFieldProps('name')}
              error={Boolean(touched.name && errors.name)}
              helperText={touched.name && errors.name}
            />

            <TextField
              fullWidth
              autoComplete="username"
              type="email"
              label="Email address"
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              {...getFieldProps('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                      <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={Boolean(touched.password && errors.password)}
              helperText={touched.password && errors.password}
            />

            <TextField
              fullWidth
              autoComplete="current-password"
              type={showCPassword ? 'text' : 'password'}
              label="Confirm Password"
              {...getFieldProps('cpassword')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={() => setShowCPassword((prev) => !prev)}>
                      <Icon icon={showCPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={Boolean(touched.cpassword && errors.cpassword)}
              helperText={touched.cpassword && errors.cpassword}
            />

            <LoadingButton
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              loading={isSubmitting}
            >
              Register
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </>
  );
}
