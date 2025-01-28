import { Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import './style.scss';
import Select, { components } from 'react-select';
import CircularProgress from '@mui/material/CircularProgress';
import Page from '../../../components/Page';
import Logo from '../Component/atoms/logo';
import Toggle from '../Component/organisms/toggle';
import { Link } from 'react-router-dom';

const Apply = (props) => {
  const { error, name, organization, ein, email, confirmEmail, password, cpassword } =
    props.stateData;
  const changevalue = props.changevalue;
  const applyOrganization = props.apply;
  const countryList = props.countryList;
  const categoryList = props.categoryList;

    // Define the meta tags you want to pass to the Page component
    const pageTitle = 'Donorport | Apply';
    const pageDescription =
      'Apply to post on Donorport!';
    const pageUrl = window.location.href;

  return (
    <Page
      title={pageTitle}
      description={pageDescription}
      url={pageUrl}
      showTags={true} // This ensures that meta tags are included
    >
      <div className="frontend_pages">
        <div className="container d-flex flex-column flex-sm-row password-reset position-relative p-0">
          <div className="apply__left p-5 col-sm-6 col-md-5 mw-600">
            <div className="d-flex flex-column flex-sm-row gap-5 mt-5">
              <div className="d-flex gap-1 align-items-center">
                <Logo />
                <Toggle />
              </div>
            </div>

            <div className="apply__content">
              {!props.isApplied ? (
                <>
                  <h1 className="pt-5 mt-5 fw-bolder pt-2 mb-4">Getting Started</h1>
                  {/* <div className="fs-5 text-light mb-4">
                Activate your account to create your organization's administration page or apply to
                receive your activation code.
              </div> */}
                  <div className="note mb-5 me-0 me-sm-5">
                    <a href="/help" className="link" target="_blank">
                      Click here
                    </a>{' '}
                    to find answers on questions we typically receive from our partner charities.
                  </div>
                  <div className="mb-5">
                    <h4 className="fw-bolder ">Step 1 - Create your account</h4>
                    <p className="text-light mb-4 pe-5">
                      Fill out the form below and click Submit to apply to post for your charity on
                      Donorport. A four (4) digit activation code will be sent to the email you
                      provided once your account has been approved.{' '}
                    </p>
                  </div>
                  <Form className="d-flex flex-column mb-5 pb-5 gap-5" autocomplete="off">
                    {/*    <div className="py-1 d-flex justify-content-between fs-4 mb-3">
                    <RadioToggle
                      outline={true}
                      checked={selected === 'charity'}
                      value="charity"
                      className="rounded-pill"
                      name="app"
                      onChange={onValueChange}
                    >
                      Charity
                    </RadioToggle>
                    <RadioToggle
                      outline={true}
                      checked={selected === 'nonprofit'}
                      value="nonprofit"
                      className="rounded-pill"
                      name="app"
                      onChange={onValueChange}
                    >
                      Nonprofit
                    </RadioToggle>
                    <RadioToggle
                      outline={true}
                      checked={selected === 'bcorp'}
                      value="bcorp"
                      className="rounded-pill"
                      name="app"
                      onChange={onValueChange}
                    >
                      B Corp
                    </RadioToggle>
                  </div>*/}
                    <InputContainer
                      autoComplete="new-password"
                      name="name"
                      value={name}
                      onChange={changevalue}
                      // placeholder="Contact Name"
                      label="Contact Name"
                      error={error}
                    />
                    {/*
                    <div className="input__wrap d-flex">
                      <label className="input__label flex-grow-1">
                        <input
                          autoComplete="new-password"
                          type="text"
                          name="name"
                          value={name}
                          onChange={(e) => changevalue(e)}
                        />
                        <span className="input__span">Contact Name</span>
                      </label>
                    </div>
                    {error && error.name && (
                      <p className="error">{error ? (error.name ? error.name : '') : ''}</p>
                    )}
                    */}

                    <SelectContainer
                      name="country"
                      value={props.defaultCountry}
                      onChange={props.onChangeCountry}
                      placeholder="Country"
                      label="Country"
                      options={countryList}
                      error={error}
                    />
                    {/*
                    <div className="input__wrap d-flex">
                      <label className="input__label flex-grow-1">
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      autoComplete="nope"
                      aria-autocomplete="none"
                      value={props.defaultCountry}
                      name="country"
                      options={countryList}
                      onChange={props.onChangeCountry}
                      components={{
                        IndicatorSeparator: () => null
                      }}
                    />
                    <span className="input__span">Country</span>
                  </label>
                </div>
                {error && error.country && <p className="error">{error.country}</p>}
                */}

                    <SelectContainer
                      name="category"
                      value={props.defaultCategory}
                      onChange={props.onChangeCategory}
                      placeholder="Category"
                      label="Category"
                      options={categoryList}
                      error={error}
                    />
                    {/*
                    <div className="input__wrap d-flex">
                      <label className="input__label flex-grow-1">
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      autoComplete="new-password"
                      value={props.defaultCategory}
                      name="country"
                      options={categoryList}
                      onChange={props.onChangeCategory}
                      components={{
                        IndicatorSeparator: () => null
                      }}
                    />
                    <span className="input__span">Category</span>
                  </label>
                </div>
                {error && error.category && <p className="error">{error.category}</p>}
                */}

                    <InputContainer
                      autoComplete="new-password"
                      name="organization"
                      value={organization}
                      onChange={changevalue}
                      label="Organization Name"
                      // placeholder="Organization Name"
                      error={error}
                    />
                    {/*
                    <div className="input__wrap d-flex">
                      <label className="input__label flex-grow-1">
                        <input
                          type="text"
                          autoComplete="new-password"
                          name="organization"
                          value={organization}
                          onChange={(e) => changevalue(e)}
                        />
                        <span className="input__span">Organization Name</span>
                      </label>
                    </div>
                    {error && error.organization && (
                      <p className="error">
                        {error ? (error.organization ? error.organization : '') : ''}
                      </p>
                    )}
                    */}

                    <InputContainer
                      autoComplete="new-password"
                      name="ein"
                      value={ein}
                      onChange={changevalue}
                      label="Charity Registration Number"
                      // placeholder="Charity Registration Number"
                      error={error}
                    />
                    {/*
                    <div className="input__wrap d-flex">
                      <label className="input__label flex-grow-1">
                        <input
                          type="text"
                          autoComplete="new-password"
                          name="ein"
                          value={ein}
                          onChange={(e) => changevalue(e)}
                        />
                    <span className="input__span">Charity Registration Number</span>
                  </label>
                </div>
                {error && error.ein && (
                  <p className="error">{error ? (error.ein ? error.ein : '') : ''}</p>
                )}
                */}

                    <InputContainer
                      autoComplete="new-password"
                      type="email"
                      name="email"
                      value={email}
                      onChange={changevalue}
                      label="Email"
                      // placeholder="Email"
                      error={error}
                    />
                    {/*
                    <div className="input__wrap d-flex">
                      <label className="input__label flex-grow-1">
                        <input
                          type="email"
                          autoComplete="email"
                          name="email"
                          value={email}
                          onChange={(e) => changevalue(e)}
                        />
                        <span className="input__span">Email</span>
                      </label>
                    </div>
                    {error && error.email && (
                      <p className="error">{error ? (error.email ? error.email : '') : ''}</p>
                    )}
                    */}

                    <InputContainer
                      autoComplete="new-password"
                      type="email"
                      name="confirmEmail"
                      value={confirmEmail}
                      onChange={changevalue}
                      label="Confirm Email"
                      // placeholder="Confirm Email"
                      error={error}
                    />
                    {/*
                    <div className="input__wrap d-flex">
                      <label className="input__label flex-grow-1">
                        <input
                          type="email"
                          name="confirmEmail"
                          autoComplete="email"
                          value={confirmEmail}
                          onChange={(e) => changevalue(e)}
                        />
                        <span className="input__span" name="confirmEmail">
                          Confirm Email
                        </span>
                      </label>
                    </div>
                    {error && error.confirmEmail && (
                      <p className="error">
                        {error ? (error.confirmEmail ? error.confirmEmail : '') : ''}
                      </p>
                    )}
                    */}

                    <InputContainer
                      autoComplete="new-password"
                      type="password"
                      name="password"
                      value={password}
                      onChange={changevalue}
                      label="Password"
                      // placeholder="Password"
                      error={error}
                    />
                    {/*
                    <div className="input__wrap d-flex">
                      <label className="input__label flex-grow-1">
                        <input
                          type="password"
                          name="password"
                          autoComplete="new-password"
                          value={password}
                          onChange={(e) => changevalue(e)}
                        />
                        <span className="input__span" name="password">
                          Password
                        </span>
                      </label>
                    </div>
                    {error && error.password && (
                      <p className="error">{error ? (error.password ? error.password : '') : ''}</p>
                    )}
                    */}

                    <InputContainer
                      autoComplete="new-password"
                      type="password"
                      name="cpassword"
                      value={cpassword}
                      onChange={changevalue}
                      label="Confirm Password"
                      // placeholder="Confirm Password"
                      error={error}
                    />
                    {/*
                    <div className="input__wrap d-flex">
                      <label className="input__label flex-grow-1">
                        <input
                          type="password"
                          name="cpassword"
                          autoComplete="new-password"
                          value={cpassword}
                          onChange={(e) => changevalue(e)}
                        />
                        <span className="input__span" name="cpassword">
                          Confirm Password
                        </span>
                      </label>
                    </div>
                    {error && error.cpassword && (
                      <p className="error">
                        {error ? (error.cpassword ? error.cpassword : '') : ''}
                      </p>
                    )}
                    */}

                    <Button
                      variant="info"
                      size="lg"
                      style={{
                        height: 'auto',
                        width: '100%',
                        opacity: props.loading ? '0.7' : '1'
                      }}
                      onClick={() => !props.loading && applyOrganization()}
                    >
                      Submit
                      {props.loading && (
                        <CircularProgress className="ms-1" color="inherit" size={12} />
                      )}
                    </Button>
                    <footer className="mt-auto main-footer w-100">
                      <div className="container-fluid">
                        <div className="d-flex gap-3 footer-bottom py-5 fs-6">
                          <div>&copy; 2024 Donorport, Inc.</div>
                          <a href="/privacy">Privacy Policy</a>
                          <a href="/terms">Terms of Service</a>
                        </div>
                      </div>
                    </footer>
                  </Form>{' '}
                </>
              ) : (
                <div className="fs-5 mt-5 mb-5 me-5 mw-600">
                  <div className="mt-5 pt-5 mw-600 d-flex flex-column gap-5">
                    <div className="d-flex flex-column gap-2">
                      {' '}
                      <h2>Thank you</h2>
                      <p>
                        You have successfully applied to post as a charity on Donorport. We will
                        review your submission and send you an activation code within 72 hours.
                      </p>
                    </div>
                    <Link to="/">
                      <Button size="lg">Go to Home</Button>
                    </Link>
                  </div>{' '}
                </div>
              )}
            </div>
          </div>

          {/* Conditional sibling elements */}
          {!props.isApplied && (
            <div
              className="d-none d-lg-flex flex-column bg-lighter gap-5 border-left"
              style={{ padding: '9% 9% 0% 9%' }}
            >
              <div className="d-flex flex-column gap-1 mt-5">
                <h3 className="fw-bolder ">Why Donorport?</h3>
                <div className="d-flex flex-column fee__list d-sm-flex fs-6 text-light">
                  <div>
                    <div className="d-flex align-items-center my-3">
                      <FontAwesomeIcon icon={solid('check')} className="fs-4 me-3" />
                      <span>Charities keep 100% of the proceeds</span>
                    </div>
                    <div className="d-flex align-items-center my-3">
                      <FontAwesomeIcon icon={solid('check')} className="fs-4 me-3" />
                      <span>Manage all of your tax receipts in one place</span>
                    </div>
                    <div className="d-flex align-items-center my-3">
                      <FontAwesomeIcon icon={solid('check')} className="fs-4 me-3" />
                      <span>Reach new donors from different markets</span>
                    </div>
                  </div>

                  <div>
                    <div className="d-flex align-items-center my-3">
                      <FontAwesomeIcon icon={solid('check')} className="fs-4 me-3" />
                      <span>Completely transparent; sales receipts, media, etc.</span>
                    </div>
                    <div className="d-flex align-items-center my-3">
                      <FontAwesomeIcon icon={solid('check')} className="fs-4 me-3" />
                      <span>No fees or costs, completely free to receive donations</span>
                    </div>
                    <div className="d-flex align-items-center my-3">
                      <FontAwesomeIcon icon={solid('check')} className="fs-4 me-3" />
                      <span>24/7 Support for charities and donors</span>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="bg-lighter position-absolute"
                style={{ top: '0', left: '100%', width: 'calc(100% - 600px)', height: '100%' }}
              ></div>
            </div>
          )}
        </div>
      </div>
    </Page>
  );
};

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
  <>
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
      {error && error?.[name] && <p className="error">{error[name]}</p>}
    </div>
  </>
);

const CustomInput = (props) => (
  <components.Input
    {...props}
    autoComplete="new-password"
    id="disableAutocomplete"
    aria-autocomplete="none"
  />
);

const SelectContainer = ({ name, value, options, onChange, label, error, placeholder }) => (
  <>
    <div className="d-flex flex-column gap-1">
      <div className="input__wrap d-flex">
        <label className="input__label flex-grow-1">
          <Select
            className="basic-single"
            classNamePrefix="select"
            placeholder={placeholder}
            value={value}
            name={`${name}_select`} // Append "_select" to make it unique
            options={options}
            onChange={onChange}
            components={{ Input: CustomInput, IndicatorSeparator: () => null }}
          />
        </label>
      </div>
      {error && error?.[name] && <p className="error">{error[name]}</p>}
    </div>
  </>
);

export default Apply;
