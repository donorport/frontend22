import FrontLoader from "../../Common/FrontLoader";
// import ForgotPassword from "../../View/frontEnd/Layout/ForgotPassword";
import React, { useState, useEffect } from "react";
// import ResetPassword from "../../View/frontEnd/Layout/ResetPassword";
import { useParams, useNavigate } from "react-router-dom";
import ToastAlert from "../../Common/ToastAlert";
import { validateAll } from "indicative/validator";
import userAuthApi from "../../Api/frontEnd/auth";
import ForgotPassword from "../../View/frontEnd/forgot-password";
import ResetPassword from "../../View/frontEnd/reset-password";
import CryptoJS from 'crypto-js';
import Page from '../../components/Page';




export default function ResetPasswordController() {

    const params = useParams()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [isSendOtp, setIsSendOtp] = useState(false)
    const [state, setstate] = useState({
        email: "",
        password: "",
        cpassword: "",
        otp: "",
        error: [],
    })

    const {
        error, email,
        password, cpassword, otp,
    } = state;


    const changevalue = (e) => {
        let value = e.target.value;
        setstate({
            ...state,
            [e.target.name]: value
        })
    }


    function replaceAll(string, search, replace) {
        // console.log(string.split(search).join(replace))
        return string.split(search).join(replace)


    }
    let decEmail = replaceAll(params.email, "DONORPORT", "/")
    let bytes = CryptoJS.AES.decrypt(decEmail, 'my-secret-key@123');
    let decryptedData = bytes.toString(CryptoJS.enc.Utf8);

    useEffect(() => {
        localStorage.clear()
        if (!params.email) {
            navigate('/login', { replace: true })
        }
        // console.log(decryptedData)
        setstate({
            ...state,
            email: decryptedData
        })


    }, [])

    const reset = () => {
        const rules = {
            otp: 'required',
            password: 'required|min:6',
            cpassword: 'required|same:password',

        }

        const message = {
            'otp.required': 'OTP is Required.',
            'password.min': 'Password must be at least 6 characters',
            'password.required': 'Password is Required.',
            'cpassword.required': 'Confirm Password is Required.',
            'cpassword.same': 'Password and ConfirmPassword Must be same.',

        }
        validateAll(state, rules, message).then(async () => {
            const formaerrror = {};
            setstate({
                ...state,
                error: formaerrror
            })
            setLoading(true)
            const resetPassword = await userAuthApi.verifyOtp(email, otp, password)
            if (resetPassword) {
                if (!resetPassword.data.success) {
                    setLoading(false)
                    ToastAlert({ msg: resetPassword.data.message, msgType: 'error' });
                } else {
                    navigate('/signin')
                    ToastAlert({ msg: resetPassword.data.message, msgType: 'success' });
                    setLoading(false)
                }

            } else {
                setLoading(false)
                ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
            }




        }).catch(errors => {

            setLoading(false)
            const formaerrror = {};
            if (errors.length) {
                errors.forEach(element => {
                    formaerrror[element.field] = element.message
                });
            } else {
                ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
            }

            setstate({
                ...state,
                error: formaerrror
            })

        });

    }

    return (
        <>
           {/*<FrontLoader loading={loading} />*/}
            <Page title="Donorport | Reset Password" description="Secure access to your account by resetting your password... A confirmation link will be sent to your email. Reset Password ..." >
                <ResetPassword
                    stateData={state}
                    changevalue={changevalue}
                    reset={reset}
                />
            </Page>
        </>
    )
}