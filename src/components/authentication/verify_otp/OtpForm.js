import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { Link as useNavigate, useParams } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
//import { Icon } from '@iconify/react';
//import eyeFill from '@iconify/icons-eva/eye-fill';
//import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  //Link,
  Stack,
  //Checkbox,
  TextField
  //IconButton,
  //InputAdornment,
  //FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import ToastAlert from '../../../Common/ToastAlert';

import CryptoJS from 'crypto-js';
import adminCampaignApi from '../../../Api/admin/adminCampaign';

// ----------------------------------------------------------------------

export default function OtpForm() {
  const navigate = useNavigate();
  //const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  // let em = params.email;
  function replaceAll(string, search, replace) {
    // console.log(string.split(search).join(replace))
    return string.split(search).join(replace);
  }
  let decEmail = replaceAll(params.email, 'DONORPORT', '/');
  let bytes = CryptoJS.AES.decrypt(decEmail, 'my-secret-key@123');
  let decryptedData = bytes.toString(CryptoJS.enc.Utf8);

  // let encEmail = ciphertext.replace("/", "{{&}}")

  const LoginSchema = Yup.object().shape({
    otp: Yup.string().required('Otp is required')
  });

  useEffect(() => {
    localStorage.clear();
    if (!params.email) {
      navigate('/home', { replace: true });
    }
    // console.log(bytes)
    // console.log('params.email',decEmail)
    // console.log(decryptedData)
  }, []);

  const formik = useFormik({
    initialValues: {
      otp: ''
    },
    validationSchema: LoginSchema,
    onSubmit: async () => {
      setLoading(true);
      let data = {};
      data.email = decryptedData;
      data.otp = Number(formik.values.otp);

      const verifyOtp = await adminCampaignApi.VerifyOtpCampaignAdmin(data);
      if (verifyOtp) {
        if (!verifyOtp.data.success) {
          setLoading(false);
          ToastAlert({ msg: verifyOtp.data.message, msgType: 'error' });
        } else {
          setLoading(false);
          ToastAlert({ msg: verifyOtp.data.message, msgType: 'success' });
          navigate('/admin/login', { replace: true });
        }
      } else {
        setLoading(false);
        ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
      }
      // navigate('/dashboard', { replace: true });
    }
  });

  const {
    errors,
    touched,
    //values,
    isSubmitting,
    handleSubmit,
    getFieldProps
  } = formik;

  //const handleShowPassword = () => {
    //setShowPassword((show) => !show);
  //};

  return (
    <>
      {/*<FrontLoader loading={loading} />*/}
      <FormikProvider value={formik}>
        {/* {console.log(formik.values)} */}
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              autoComplete="Otp"
              type="text"
              name="otp"
              label="Otp"
              {...getFieldProps('otp')}
              // value={email}
              // onChange={(e)=>onChangeValue(e)}
              error={Boolean(touched.otp && errors.otp)}
              helperText={touched.otp && errors.otp}
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
            size="lg"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Verify
          </LoadingButton>
        </Form>
      </FormikProvider>
    </>
  );
}
