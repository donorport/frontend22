import { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular } from "@fortawesome/fontawesome-svg-core/import.macro";
// import { RadioToggle } from "@components/atoms";
import RadioToggle from "../Component/atoms/radio-toggle";
import ToastAlert from "../../../Common/ToastAlert";
import { validateAll } from "indicative/validator";
// import DefaultLayout from "@templates/default-layout";
import DefaultLayout from "../Component/templates/default-layout";
import FrontLoader from "../../../Common/FrontLoader";
import userApi from "../../../Api/frontEnd/user";

import "./style.scss";

const Partnership = () => {
  const userAuthToken = localStorage.getItem('userAuthToken');

  const [loading, setLoading] = useState(false)
  const [selected, setSelected] = useState("sponsor");

  const [state, setstate] = useState({
    name: "",
    organization: "",
    reson: "",
    email: "",
    error: [],
  })
  const { name, organization, reson, email, error } = state


  const changevalue = (e) => {
    let value = e.target.value;

    setstate({
      ...state,
      [e.target.name]: value
    })
  }

  const onValueChange = (e) => {
    setSelected(e.target.name);
  };

  const resetForm = () => {
    setstate({
      ...state,
      name: "",
      organization: "",
      reson: "",
      email: "",
      error: [],
    })
    setSelected('sponsor')
  }

  const apply = () => {

    const rules = {
      name: 'required',
      email: 'required|email',
      reson: 'required'


    }

    const message = {
      'name.required': 'name is Required.',
      'reson.required': 'This Field is Required.',
      'email.required': 'email is Required.',


    }
    validateAll(state, rules, message).then(async () => {
      const formaerrror = {};
      setstate({
        ...state,
        error: formaerrror
      })
      setLoading(true)
      let data = {}
      data.name = name
      data.email = email
      data.type = selected
      data.reson = reson
      data.organization = organization




      const applyPartership = await userApi.applyPartership(userAuthToken, data)
      if (applyPartership) {
        if (!applyPartership.data.success) {
          setLoading(false)
          ToastAlert({ msg: applyPartership.data.message, msgType: 'error' });
        } else {
          setLoading(false)
          ToastAlert({ msg: applyPartership.data.message, msgType: 'success' });
          resetForm()
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
      <FrontLoader loading={loading} />
      <DefaultLayout>
        <div className="password-reset position-relative">
          <div className="page__banner"></div>
          <Container fluid className="position-relative pb-5 pt-5">
            <h1 className="text-dark fw-bolder mb-6p pt-2">Join Forces</h1>
            <div className="fs-5 fw-semibold text-light mb-5">
              Tell us how you can help Donorport grow.
            </div>

            <Form className="mw-400">
              <div className="py-1 d-flex fs-4 mb-3">
                <RadioToggle
                  outline={true}
                  checked={selected === "sponsor"}
                  value="sponsor"
                  className="rounded-pill"
                  name="app"
                  onChange={onValueChange}
                >
                  Sponsor
                </RadioToggle>
                <RadioToggle
                  outline={true}
                  checked={selected === "other"}
                  value="other"
                  className="rounded-pill ms-2"
                  name="app"
                  onChange={onValueChange}
                >
                  Other
                </RadioToggle>
              </div>
              <div className="input__wrap d-flex">
                <label className="input__label flex__1">
                  <input type="text" name="name" value={name} onChange={(e) => changevalue(e)} />
                  <span className="input__span">Name</span>
                </label>
              </div>
              {error && error.name && <p className="error">{error ? error.name ? error.name : "" : ""}</p>}

              <div className="input__wrap d-flex">
                <label className="input__label flex__1">
                  <input type="email" name="email" value={email} onChange={(e) => changevalue(e)} />
                  <span className="input__span">Email</span>
                </label>
              </div>
              {error && error.email && <p className="error">{error ? error.email ? error.email : "" : ""}</p>}

              <div className="input__wrap d-flex">
                <label className="input__label flex__1">
                  <input type="text" name="organization" value={organization} onChange={(e) => changevalue(e)} />
                  <span className="input__span">Organization (optional)</span>
                </label>
              </div>
              {error && error.organization && <p className="error">{error ? error.organization ? error.organization : "" : ""}</p>}


              <div className="input__wrap d-flex">
                <label className="input__label flex__1">
                  <textarea rows={5} name="reson" value={reson} onChange={(e) => changevalue(e)}>{reson}</textarea>
                  <span className="input__span">How can we partner?</span>
                </label>
              </div>
              {error && error.reson && <p className="error">{error ? error.reson ? error.reson : "" : ""}</p>}

              <div className="text-end text-dark mb-2">
                <span className="fw-bold mr-6p">240</span> chars remaining
              </div>
              <Button variant="info" size="lg" className="fw-bold" onClick={() => apply()}>
                Submit
              </Button>
            </Form>
          </Container>
        </div>
      </DefaultLayout>
    </>
  );
};

export default Partnership;
