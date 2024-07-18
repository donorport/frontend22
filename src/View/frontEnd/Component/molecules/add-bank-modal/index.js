//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import CircularProgress from '@mui/material/CircularProgress';
import { Button } from 'react-bootstrap';
import Select from 'react-select';

//import ListItemImg from '../../atoms/list-item-img';

import './style.scss';

const ACCOUNT_HOLDER_TYPES = [
  { value: 'individual', label: 'Individual' },
  { value: 'company', label: 'Charity' }
];

const AddBankModal = (props) => {
  // console.log(props.bankAccount.accError)

  const { bankloading } = props;

  return (
    <>
      <div>
        <div className="d-flex flex-column gap-5 ">
          <div className="note  mb-2 fs-6">
            Donorport will store this information for deposits and withdrawals and share it with
            payment processors.
            <a href="/terms">
              <span className="link text-light">Trust &amp; Security</span>
            </a>
          </div>
          <div className="input__wrap d-flex">
            <label className="input__label flex__1">
              <Select
                className="basic-single"
                classNamePrefix="select"
                name="accountHolderType"
                defaultValue={ACCOUNT_HOLDER_TYPES[0]}
                options={ACCOUNT_HOLDER_TYPES}
                onChange={(e) => {
                  props.setBankAccount({ ...props.bankAccount, BusinessType: e.value });
                  // console.log(e.value)
                }}
                components={{
                  IndicatorSeparator: () => null
                }}
              />
              <span className="input__span">Business Type</span>
            </label>
          </div>
          <div>
            {' '}
            <div className="input__wrap d-flex">
              <label className="input__label flex__1">
                <input
                  type="email"
                  id="accEmail"
                  name="accEmail"
                  className={
                    props.bankAccount.accError && props.bankAccount.accError.accEmail
                      ? 'inputerror'
                      : ''
                  }
                  onChange={(e) => props.changevaluebankAc(e)}
                />
                <span className="input__span inputerrorLable">Email</span>
                <span
                  className={
                    props.bankAccount.accError && props.bankAccount.accError.accEmail
                      ? 'input__span inputerrorLable'
                      : 'input__span'
                  }
                >
                  Email
                </span>
              </label>
            </div>
            {props.bankAccount.accError && props.bankAccount.accError.accEmail && (
              <p className="error">{props.bankAccount.accError.accEmail}</p>
            )}
          </div>
         
            {props.bankAccount.BusinessType === 'individual' ? (
              <>
              <div>               
                 <div className="input__wrap d-flex">
                  <label className="input__label flex__1">
                    <input
                      type="text"
                      id="fname"
                      name="fname"
                      className={
                        props.bankAccount.accError && props.bankAccount.accError.fname
                          ? 'inputerror'
                          : ''
                      }
                      onChange={(e) => props.changevaluebankAc(e)}
                    />
                    <span
                      className={
                        props.bankAccount.accError && props.bankAccount.accError.fname
                          ? 'input__span inputerrorLable'
                          : 'input__span'
                      }
                    >
                      First Name
                    </span>
                  </label>
                </div>
                {props.bankAccount.accError && props.bankAccount.accError.fname && (
                  <p className="error">{props.bankAccount.accError.fname}</p>
                )}</div>

                <div>
                  <div className="input__wrap d-flex">
                    <label className="input__label flex__1">
                      <input
                        type="text"
                        id="lname"
                        name="lname"
                        className={
                          props.bankAccount.accError && props.bankAccount.accError.lname
                            ? 'inputerror'
                            : ''
                        }
                        onChange={(e) => props.changevaluebankAc(e)}
                      />
                      <span
                        className={
                          props.bankAccount.accError && props.bankAccount.accError.lname
                            ? 'input__span inputerrorLable'
                            : 'input__span'
                        }
                      >
                        Last Name
                      </span>
                    </label>
                  </div>
                  {props.bankAccount.accError && props.bankAccount.accError.lname && (
                    <p className="error">{props.bankAccount.accError.lname}</p>
                  )}
                </div>
              </>
            ) : (
              <div className="input__wrap d-flex">
                <label className="input__label flex__1">
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    className={
                      props.bankAccount.accError && props.bankAccount.accError.companyName
                        ? 'inputerror'
                        : ''
                    }
                    onChange={(e) => props.changevaluebankAc(e)}
                  />
                  <span
                    className={
                      props.bankAccount.accError && props.bankAccount.accError.companyName
                        ? 'input__span inputerrorLable'
                        : 'input__span'
                    }
                  >
                    Charity Name
                  </span>
                </label>
              </div>
            )}
            {props.bankAccount.accError && props.bankAccount.accError.companyName && (
              <p className="error">{props.bankAccount.accError.companyName}</p>
            )}
         

          <div className="d-flex align-items-center">
            <Button
              size="lg"
              className="d-flex"
              style={{
                opacity: bankloading ? '0.7' : '1'
              }}
              variant="info"
              // onClick={props.onHide}
              onClick={() => {
                if (!bankloading) props.addExpressAccount();
              }}
            >
              Add Bank
              {bankloading && <CircularProgress className="ms-2" color="inherit" size={12} />}
            </Button>
          </div>
        </div>
      </div>

      {/* <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Body>
        <div className="pt-3p px-3p d-flex align-items-center">
          <Button variant="link" onClick={props.onHide} className="p-0 ms-auto">
            <ListItemImg
              size="30"
              className="rounded-pill"
              icon={<FontAwesomeIcon icon={solid('close')} className="fs-5 text-light p-1" />}
            />
            <FontAwesomeIcon icon={solid('close')} className="fs-5 text-light p-1" />
          </Button>
        </div>
        <div className="px-2">
          <div className="d-flex align-items-center mb-2">
            <ListItemImg
              size="52"
              className="rounded-pill mr-12p"
              icon={
                <FontAwesomeIcon icon={solid('building-columns')} className="fs-4 text-subtext" />
              }
            />
            <div className="bank__title">
              <h4 className="fw-bolder  mb-0">Add Bank Account</h4>
              <div className="settings__description fs-7">
                Receive direct deposits for donations you receive.
              </div>
            </div>
          </div>
          <div>
            <div className="input__wrap d-flex">
              <label className="input__label flex__1">
                <input type="text" />
                <span className="input__span">Account Number</span>
              </label>
              <label className="input__label flex__1">
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  name="accountHolderType"
                  defaultValue={accountHolderTypes[0]}
                  options={accountHolderTypes}
                  onChange={(e) => {
                    props.setBankAccount({ ...props.bankAccount, BusinessType: e.value });
                    // console.log(e.value)
                  }}
                  components={{
                    IndicatorSeparator: () => null
                  }}
                />
                <span className="input__span">Business Type</span>
              </label>
            </div>
            <div className="input__wrap d-flex">
              <label className="input__label flex__1">
                <input
                  type="email"
                  id="accEmail"
                  name="accEmail"
                  className={
                    props.bankAccount.accError && props.bankAccount.accError.accEmail
                      ? 'inputerror'
                      : ''
                  }
                  onChange={(e) => props.changevaluebankAc(e)}
                />
                <span className="input__span inputerrorLable">Email</span> 
                <span
                  className={
                    props.bankAccount.accError && props.bankAccount.accError.accEmail
                      ? 'input__span inputerrorLable'
                      : 'input__span'
                  }
                >
                  Email
                </span>
              </label>
            </div>
            {props.bankAccount.accError && props.bankAccount.accError.accEmail && (
              <p className="error">{props.bankAccount.accError.accEmail}</p>
            )}
            {props.bankAccount.BusinessType === 'individual' ? (
              <>
                <div className="input__wrap d-flex">
                  <label className="input__label flex__1">
                    <input
                      type="text"
                      id="fname"
                      name="fname"
                      className={
                        props.bankAccount.accError && props.bankAccount.accError.fname
                          ? 'inputerror'
                          : ''
                      }
                      onChange={(e) => props.changevaluebankAc(e)}
                    />
                    <span
                      className={
                        props.bankAccount.accError && props.bankAccount.accError.fname
                          ? 'input__span inputerrorLable'
                          : 'input__span'
                      }
                    >
                      First Name
                    </span>
                  </label>
                </div>

                <div className="input__wrap d-flex">
                  <label className="input__label flex__1">
                    <input
                      type="text"
                      id="lname"
                      name="lname"
                      className={
                        props.bankAccount.accError && props.bankAccount.accError.lname
                          ? 'inputerror'
                          : ''
                      }
                      onChange={(e) => props.changevaluebankAc(e)}
                    />
                    <span
                      className={
                        props.bankAccount.accError && props.bankAccount.accError.lname
                          ? 'input__span inputerrorLable'
                          : 'input__span'
                      }
                    >
                      Last Name
                    </span>
                  </label>
                </div>
              </>
            ) : (
              <div className="input__wrap d-flex">
                <label className="input__label flex__1">
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    className={
                      props.bankAccount.accError && props.bankAccount.accError.companyName
                        ? 'inputerror'
                        : ''
                    }
                    onChange={(e) => props.changevaluebankAc(e)}
                  />
                  <span
                    className={
                      props.bankAccount.accError && props.bankAccount.accError.companyName
                        ? 'input__span inputerrorLable'
                        : 'input__span'
                    }
                  >
                    Company Name
                  </span>
                </label>
              </div>
            )}

            <div className="note  my-2">
              <p>
                Donorport will store this information for deposits and withdrawals and share it with
                payment processors.
              </p>
              <a href="/terms">
                <span className="link text-light">Trust &amp; Security</span>
              </a>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className="p-0 border-0 overflow-hidden">
        <Button
          variant="info"
          // onClick={props.onHide}
          onClick={() => props.addExpressAccount()}
          className="border-top-left-radius-0 py-20p flex__1 m-0 rounded-0"
        >
          Save
        </Button>
      </Modal.Footer>
                  </Modal>*/}
    </>
  );
};
export default AddBankModal;
