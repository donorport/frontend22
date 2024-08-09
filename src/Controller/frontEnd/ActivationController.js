import ToastAlert from '../../Common/ToastAlert';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import adminCampaignApi from '../../Api/admin/adminCampaign';
import Apply from '../../View/frontEnd/activation';
import { getCookie, setCookie, deleteCookie } from '../../Common/Helper';

export default function ActivationController() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const elemRefs = [];

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
    if (elem && elem.current) {
      elem.current.focus();
    }
  };
  

  const Input = (props) => {
    const ref = React.createRef();
    elemRefs.push(ref);
    return (
      <input
        className="activate__input activate__input--apply block"
        data-index={props.index}
        ref={ref}
        maxLength={1}
        name={'code' + (props.index + 1)}
        onKeyUp={(e) => props.autoTab(e, props.index)}
      />
    );
  };

  const blocks = Array.from({ length: 4 }, (element, index) => (
    <Input key={index} index={index} autoTab={autoTab} />
  ));

  const activateCode = async () => {
    let code1 = getCookie('code1');
    let code2 = getCookie('code2');
    let code3 = getCookie('code3');
    let code4 = getCookie('code4');

    if (code1 && code2 && code3 && code4) {
      let finalCode = code1 + code2 + code3 + code4;

      let data = {};
      data.otp = Number(finalCode);

      setLoading(true);
      const verifyOtp = await adminCampaignApi.VerifyOtpCampaignAdmin(data);
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
          navigate('/login', { replace: true });
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

  return (
    <>
      <Apply blocks={blocks} activateCode={activateCode} loading={loading} />
    </>
  );
}
