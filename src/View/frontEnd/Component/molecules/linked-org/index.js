// import React from "react";
import { Button } from "react-bootstrap";
import Avatar from "../../atoms/avatar";
import "./style.scss";
import organizationApi from "../../../../../Api/frontEnd/organization";
import React, { useState, useEffect } from "react";
import helper,{ getCookie, setCookie, deleteCookie } from "../../../../../Common/Helper";
import FrontLoader from "../../../../../Common/FrontLoader";
import ToastAlert from "../../../../../Common/ToastAlert";
import { useSelector, useDispatch } from "react-redux";

function LinkedOrg() {
  const userAuthToken = localStorage.getItem('userAuthToken');
  const user = useSelector((state) => state.user);

  const [orgList, setorgList] = useState([])
  const [loading, setLoading] = useState(false)
  const list = async () => {
    const list = await organizationApi.teamMemberOrganizationList(userAuthToken)
    if (list) {
      if (list.data.success) {
        // console.log(list.data.data)
        setorgList(list.data.data)
      }
    }

  }

  useEffect(() => {
    (async () => {
      if (userAuthToken) {
        await list()
      }
    })()

  }, [!user.isActiveOrg])

  const removeTeamMember = async (id) => {
    setLoading(true)
    const deleteAd = await organizationApi.removeTeamMember(userAuthToken, id)
    if (deleteAd) {
      if (deleteAd.data.success === false) {
        setLoading(false)
        ToastAlert({ msg: deleteAd.data.message, msgType: 'error' });
      } else {
        if (deleteAd.data.success === true) {
          ToastAlert({ msg: deleteAd.data.message, msgType: 'success' });
          await list()
          setLoading(false)

        }
      }
    } else {
      setLoading(false)
      ToastAlert({ msg: 'Member not Removed', msgType: 'error' });
    }

  }


  const elemRefs = [];
  const inputStyle = {
    backgroundColor: "#f8fafd"
  }

  const autoTab = (e, i) => {
    setCookie(e.target.name, e.target.value.replace(/[^\d.]|\.(?=.*\.)/g, ""), 1)
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
        name={"code" + (props.index + 1)}
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
    setLoading(true)
    let code1 = getCookie("code1")
    let code2 = getCookie("code2")
    let code3 = getCookie("code3")
    let code4 = getCookie("code4")

    if (code1 && code2 && code3 && code4) {
      let finalCode = code1 + code2 + code3 + code4


      let data = {}
      data.otp = Number(finalCode)

      const verifyOtp = await organizationApi.teamMemberActivation(userAuthToken, data)
      deleteCookie("code1")
      deleteCookie("code2")
      deleteCookie("code3")
      deleteCookie("code4")
      if (verifyOtp) {

        if (!verifyOtp.data.success) {

          setLoading(false)
          ToastAlert({ msg: verifyOtp.data.message, msgType: 'error' });
        } else {

          setLoading(false)
          ToastAlert({ msg: verifyOtp.data.message, msgType: 'success' });
          // dispatch(setIsActiveOrg(!user.isActiveOrg))
          await list()
     
        }
      } else {
        setLoading(false)
        ToastAlert({ msg: 'Something went wrong', msgType: 'error' });
      }
    } else {

      deleteCookie("code1")
      deleteCookie("code2")
      deleteCookie("code3")
      deleteCookie("code4")

      ToastAlert({ msg: 'Please Enter Valid an Activation Code', msgType: 'error' });
    }

  }



  return (
    <>
      <FrontLoader loading={loading} />

      <div className="linked-org">
        <div className="menu__title">
          {
            orgList.length > 0 &&
            <h6 className="mb-0">Linked</h6>
          }

        </div>
        <ul className="linked-list list-unstyled mb-0">
          {
            orgList.length > 0 &&
            orgList.map((org, i) => {
              return (
                <li className="linked__item py-2 d-flex align-items-center" key={i}>
                  <Button
                    variant="link"
                    href={'/campaign/' + org?.organizationDetails?.slug + '/dashboard'}
                    className="linked__item-link py-0 d-flex align-items-center flex-grow-1 text-decoration-none"
                  >
                    <div className="linked__item-img-wrap">
                      <img
                        className="linked__item-img img-fluid" alt="a"
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
                    onClick={() => removeTeamMember(org._id)}
                  >
                    unlink
                  </Button>
                </li>
              )
            })
          }

          {/* <li className="linked__item py-2 d-flex align-items-center">
          <Button
            variant="link"
            href="/administrator/tree-frog"
            className="linked__item-link py-0 d-flex align-items-center flex-grow-1 text-decoration-none"
          >
            <div className="linked__item-img-wrap">
              <img
                className="linked__item-img img-fluid" alt="a"
                src="https://uploads-ssl.webflow.com/59df9e77ad9420000140eafe/5c2c38e4fd28a71363f4ac5d_Tree-Frog-Logo-Mock.png"
              />
            </div>
            <div className="linked__item-label fs-7 fw-bold pl-12p">
              Tree Frog
            </div>
          </Button>
          <Button
            variant="link"
            className="btn__link-light linked__item-unlink ms-auto fs-7 me-1 fw-normal"
          >
            unlink
          </Button>
        </li> */}
        </ul>
        <div className="menu__title">
          <h6 className="mb-0">Team</h6>
        </div>
        <ul className="linked-list list-unstyled mb-0">
          <li className="linked__item py-2">
            <div className="linked__item-link px-12p d-flex align-items-center flex-grow-1">
              <Avatar
                size={50}
                border={0}
                shadow={false}
                avatarUrl="https://uploads-ssl.webflow.com/59df9e77ad9420000140eafe/5d3f994a03c3fe76a42633a6_1.jpg"
              />
              <div className="linked__item-label fs-7 fw-bold pl-12p">
                <div className="mb-3p">Lindsey Rouche</div>
                <div className="team__role fs-7 fw-normal">active</div>
              </div>
            </div>
          </li>
        </ul>
        <div className="menu__title">
          <h6 className="mb-0 fs-7">Add an Organization</h6>

          <Button
            variant="link"
            className="p-0 btn__link-light linked__item-unlink ms-auto fs-7 me-1 fw-normal"
          >
            request access
          </Button>
        </div>
        <div className="activate">
          <div className="activate__icon">
            <i className="fa-regular fa-fingerprint "></i>
          </div>
          <div className="activate__code">
            {/* <input
              type="text"
              className="activate__input"
              name="verifyCode1"
            />
            <input
              type="text"
              className="activate__input"
              name="verifyCode2"
            />
            <input
              type="text"
              className="activate__input"
              name="verifyCode3"
            />
            <input
              type="text"
              className="activate__input"
              name="verifyCode4"
            />
            <input
              type="text"
              className="activate__input"
              name="verifyCode5"
            /> */}
             {
                blocks
              }
          </div>
          <Button variant="info" className="ms-auto" onClick={()=>activateCode()}>
            Activate
          </Button>
        </div>
      </div>
    </>

  );
}

export default LinkedOrg;
