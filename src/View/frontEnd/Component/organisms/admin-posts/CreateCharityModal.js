import { useState, useEffect } from 'react';
import { Button, Modal, Form, Row, Col } from 'react-bootstrap';
import { validateAll } from 'indicative/validator';
import ToastAlert from '../../../../../Common/ToastAlert';
import adminCampaignApi from '../../../../../Api/admin/adminCampaign';
import './style.scss';
import {
  APPLY_rules,
  APPLY_message
} from '../../../../../Controller/frontEnd/ApplyOrganizationController';
import locationApi from '../../../../../Api/frontEnd/location';
import categoryApi from '../../../../../Api/admin/category';
import Select, { components } from 'react-select';
import CircularProgress from '@mui/material/CircularProgress';

const CreateCharityModal = ({ show, onHide, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [countryList, setCountryList] = useState([]);
  const [defaultCountry, setDefaultCountry] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [defaultCategory, setDefaultCategory] = useState([]);
  const [selected, setSelected] = useState('charity');

  const [state, setstate] = useState({
    name: '',
    organization: '',
    ein: '',
    email: '',
    confirmEmail: '',
    password: '',
    cpassword: '',
    country: '',
    category: '',
    error: {}
  });

  const { name, organization, ein, email, confirmEmail, password, cpassword, error } = state;

  useEffect(() => {
    (async () => {
      await getCountryList();
      await getCategoryList();
    })();
  }, [show]); // Re-fetch when modal opens

  const getCategoryList = async () => {
    const getCategoryList = await categoryApi.listCategory();
    if (getCategoryList.data.success === true) {
      if (getCategoryList.data.data.length > 0) {
        let tempArray = [];
        getCategoryList.data.data.map((category) => {
          let Obj = {};
          Obj.value = category._id;
          Obj.label = category.name;
          tempArray.push(Obj);
        });
        setCategoryList(tempArray);
      } else {
        setCategoryList([]);
      }
    }
  };

  const getCountryList = async () => {
    let tempArray = [];
    const getCountryList = await locationApi.countryList();
    if (getCountryList) {
      if (getCountryList.data.success) {
        if (getCountryList.data.data.length > 0) {
          getCountryList.data.data.map((country) => {
            let Obj = {};
            Obj.value = country.id;
            Obj.label = country.country;
            tempArray.push(Obj);
          });
          setCountryList(tempArray);
        }
      }
    }
  };

  const onChangeCountry = (e) => {
    setstate({
      ...state,
      country: e.value
    });
    setDefaultCountry(e);
  };

  const onChangeCategory = (e) => {
    setstate({
      ...state,
      category: e.value
    });
    setDefaultCategory(e);
  };

  const resetForm = () => {
    setstate({
      ...state,
      name: '',
      organization: '',
      ein: '',
      email: '',
      confirmEmail: '',
      password: '',
      cpassword: '',
      country: '',
      category: '',
      error: {}
    });
    setDefaultCountry([]);
    setDefaultCategory([]);
  };

  const handleClose = () => {
    resetForm();
    onHide();
  };

  const changevalue = (e) => {
    let value = e.target.value;

    setstate({
      ...state,
      [e.target.name]: value
    });
  };

  const onValueChange = (e) => {
    setSelected(e.target.name);
  };

  const apply = () => {
    validateAll(state, APPLY_rules, APPLY_message)
      .then(async () => {
        setLoading(true);
        const formaerrror = {};
        setstate({
          ...state,
          error: formaerrror
        });

        let data = {};
        data.name = name;
        data.email = email;
        data.type = selected;
        data.ein = ein;
        data.organization = organization;
        data.password = password;
        data.country = state.country;
        data.category = state.category;

        const applyCampaignAdmin = await adminCampaignApi.applyCampaignAdmin(data);
        if (applyCampaignAdmin) {
          if (!applyCampaignAdmin.data.success) {
            setLoading(false);
            ToastAlert({ msg: applyCampaignAdmin.data.message, msgType: 'error' });
          } else {
            setLoading(false);
            ToastAlert({ msg: applyCampaignAdmin.data.message, msgType: 'success' });
            resetForm();
            handleClose();
            if (onSuccess) onSuccess();
          }
        } else {
          setLoading(false);
          ToastAlert({ msg: 'Something went wrong (applyCampaignAdmin)', msgType: 'error' });
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
          ToastAlert({ msg: 'Something went wrong (applyCampaignAdmin 2)', msgType: 'error' });
        }

        setstate({
          ...state,
          error: formaerrror
        });
      });
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      backdrop="static"
      centered
      size="lg"
      className="create-charity-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>Create New Charity</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form className="d-flex flex-column gap-4">
          <InputContainer
            autoComplete="new-password"
            name="name"
            value={name}
            onChange={changevalue}
            label="Contact Name"
            error={error}
          />

          <SelectContainer
            name="country"
            value={defaultCountry}
            onChange={onChangeCountry}
            label="Country"
            options={countryList}
            error={error}
          />

          <SelectContainer
            name="category"
            value={defaultCategory}
            onChange={onChangeCategory}
            label="Category"
            options={categoryList}
            error={error}
          />

          <InputContainer
            autoComplete="new-password"
            name="organization"
            value={organization}
            onChange={changevalue}
            label="Organization Name"
            error={error}
          />

          <InputContainer
            autoComplete="new-password"
            name="ein"
            value={ein}
            onChange={changevalue}
            label="Charity Registration Number"
            error={error}
          />

          <InputContainer
            autoComplete="new-password"
            type="email"
            name="email"
            value={email}
            onChange={changevalue}
            label="Email"
            error={error}
          />

          <InputContainer
            autoComplete="new-password"
            type="email"
            name="confirmEmail"
            value={confirmEmail}
            onChange={changevalue}
            label="Confirm Email"
            error={error}
          />

          <Row className="gx-3">
            <Col md={6}>
              <InputContainer
                autoComplete="new-password"
                type="password"
                name="password"
                value={password}
                onChange={changevalue}
                label="Password"
                error={error}
              />
            </Col>
            <Col md={6}>
              <InputContainer
                autoComplete="new-password"
                type="password"
                name="cpassword"
                value={cpassword}
                onChange={changevalue}
                label="Confirm Password"
                error={error}
              />
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" size="lg" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="info" size="lg" onClick={() => !loading && apply()} disabled={loading}>
          Submit
          {loading && <CircularProgress className="ms-1" color="inherit" size={10} />}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const CustomInput = (props) => (
  <components.Input
    {...props}
    autoComplete="new-password"
    id="disableAutocomplete"
    aria-autocomplete="none"
  />
);

const InputContainer = ({
  type,
  name,
  value,
  autoComplete = 'off',
  onChange,
  label,
  error,
  placeholder
}) => (
  <div className="d-flex flex-column gap-1">
    <div className="input__wrap d-flex">
      <label className="input__label flex-grow-1">
        <input
          autoComplete={autoComplete}
          type={type ?? 'text'}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={(error && error?.[name] ? 'inputerror ' : '') + 'input__wrap form-control'}
        />
        <span className="input__span">{label}</span>
      </label>
    </div>
    {error && error?.[name] && <p className="error text-danger">{error[name]}</p>}
  </div>
);

const SelectContainer = ({ name, value, options, onChange, label, error, placeholder }) => (
  <div className="d-flex flex-column gap-1">
    <div className="input__wrap d-flex">
      <label className="input__label flex-grow-1">
        <Select
          className={`basic-single ${error && error?.[name] ? 'is-invalid' : ''}`}
          classNamePrefix="select"
          placeholder={placeholder}
          value={value}
          name={`${name}_select`}
          options={options}
          onChange={onChange}
          components={{ Input: CustomInput, IndicatorSeparator: () => null }}
        />
        <span className="input__span">{label}</span>
      </label>
    </div>
    {error && error?.[name] && <p className="error text-danger">{error[name]}</p>}
  </div>
);

export default CreateCharityModal;
