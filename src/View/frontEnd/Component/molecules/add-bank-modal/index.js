import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import CircularProgress from '@mui/material/CircularProgress';
import { Button, Modal } from 'react-bootstrap';
import Select from 'react-select';

import ListItemImg from '../../atoms/list-item-img';

import './style.scss';

const AddBankModal = (props) => {
  // console.log(props.bankAccount.accError)

  const accountHolderTypes = [
    { value: 'individual', label: 'Individual' },
    { value: 'company', label: 'Company' }
  ];

  return (
    <>
      <div className="px-2">
        <div>
          <div className="note text-dark mb-2">
            <p>
              Donorport will store this information for deposits and withdrawals and share it with
              payment processors.
            </p>
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

          <div className="d-flex align-items-center">
            <Button
              style={{
                opacity: props.isLoading ? '0.7' : '1'
              }}
              variant="info"
              // onClick={props.onHide}
              onClick={() => !props.isLoading && props.addExpressAccount()}
              className="d-flex m-0"
            >
              Add Bank
              {props.isLoading && <CircularProgress className="ms-2" color="inherit" size={12} />}
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
              <h4 className="fw-bolder text-dark mb-0">Add Bank Account</h4>
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

            <div className="note text-dark my-2">
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
