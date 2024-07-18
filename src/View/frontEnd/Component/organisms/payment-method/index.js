import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { useState, useEffect } from 'react';
//import Chip from '@mui/material/Chip';
//import Stack from '@mui/material/Stack';

// import { ListItemImg, ToggleSwitch } from "@components/atoms";

//import ListItemImg from '../../atoms/list-item-img';
//import ToggleSwitch from '../../atoms/toggle-switch';
// import { Link } from "react-router-dom";
import AddBankModal from '../../molecules/add-bank-modal';
import './style.scss';
import adminCampaignApi from '../../../../../Api/admin/adminCampaign';
//import FrontLoader from '../../../../../Common/FrontLoader';
import { validateAll } from 'indicative/validator';
import ToastAlert from '../../../../../Common/ToastAlert';
import { confirmAlert } from 'react-confirm-alert';
//import { encryptData, decryptData } from '../../../../../Common/Helper';
import locationApi from '../../../../../Api/frontEnd/location';
import { useOutletContext, useParams } from 'react-router-dom';
//import { DataArraySharp } from '@mui/icons-material';
//import Label from '../../../../../components/Label';
//import CheckIcon from '@mui/icons-material/Check';
import { setIsAccountAdd } from '../../../../../user/user.action';
import { useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';

const Payments = () => {
  //const [modalShow, setModalShow] = useState(false);
  const [bankAccountList, setBankAccountList] = useState([]);
  // const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  const type = localStorage.getItem('type');
  const tempCampaignAdminAuthToken = localStorage.getItem('tempCampaignAdminAuthToken');
  const token = type
    ? type === 'temp'
      ? tempCampaignAdminAuthToken
      : CampaignAdminAuthToken
    : CampaignAdminAuthToken;
  const CampaignAdmin = JSON.parse(localStorage.getItem('CampaignAdmin'));
  const [loading, setLoading] = useState(false);
  const [saveloading, setSaveloading] = useState(false);
  const [update, setUpdate] = useState(false);
  const [defaultCountry, setDefaultCountry] = useState([]);
  const [defaultHomeCountry, setDefaultHomeCountry] = useState([]);
  const [data, setData] = useOutletContext();
  const dispatch = useDispatch();
  const params = useParams();
  //const navigate = useNavigate();
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [defaultState, setDefaultState] = useState([]);
  //const [tempImg, setTempImg] = useState('');
  //const [tempImgName, setTempImgName] = useState('');
  //const [selectedDoc, setSelectedDoc] = useState('');
  //const [value, setValue] = useState(0);
  const [bankloading, setBankloading] = useState(false);
  //const [defaultTypeOfBusiness, setDefaultTypeOfBusiness] = useState([
  //{ value: 'individual ', label: 'Individual ' }
  //]);

  const [state, setstate] = useState({
    registerdBusinessAddress: 'CA',
    typeOfBusiness: 'individual',
    firstName: '',
    lastName: '',
    personalEmail: '',
    dob: '',
    phoneNo: '',
    ssn: '',
    homeCountry: 'CA',
    addLine1: '',
    addLine2: '',
    city: '',
    stateName: '',
    zip: '',
    personalIdNumber: '',
    businessName: '',
    businessWebsite: '',
    mcc: '',
    accountHolderName: '',
    accountHolderType: 'individual',
    routingNumber: '',
    accountNumber: '',
    confirmAccountNumber: '',
    bankEmail: '',
    identity: '',
    identityDocumentImage: '',
    status: 1,
    error: [],
    taxRate: '',
    paymentLoginId: '',
    TransactionKey: '',
    currency: 'CAD'
  });
  const {
    //status,
    //accountHolderName,
    //accountHolderType,
    //routingNumber,
    //error,
    //accountNumber,
    registerdBusinessAddress,
    //typeOfBusiness,
    //firstName,
    //lastName,
    //personalEmail,
    //dob,
    //phoneNo,
    //ssn,
    //homeCountry,
    //addLine1,
    //addLine2,
    //city,
    //stateName,
    //zip,
    //personalIdNumber,
    //businessName,
    //businessWebsite,
    //mcc,
    //bankEmail,
    //identity,
    //identityDocumentImage,
    //confirmAccountNumber,
    taxRate,
    paymentLoginId,
    TransactionKey
    //currency
  } = state;

  const [bankAccount, setBankAccount] = useState({
    BusinessType: 'individual',
    country: 'ca',
    companyName: '',
    fname: '',
    lname: '',
    accEmail: '',
    accError: []
  });
  const {
    BusinessType,
    country,
    companyName,
    fname,
    lname,
    //accError,
    accEmail
  } = bankAccount;

  const getBankAccountList = async () => {
    const getAccountList = await adminCampaignApi.listBankAccount(token);
    if (getAccountList.data.success === true) {
      setBankAccountList(getAccountList.data.data);
      if (getAccountList.data.data.length === 0) {
        dispatch(setIsAccountAdd(false));
      } else {
        dispatch(setIsAccountAdd(true));
      }
    }
  };
  const addAccountDetails = async (accountId) => {
    let data = {};
    data.accountId = accountId;
    const makeAcPrimary = await adminCampaignApi.addAccountDetails(token, data);
    if (makeAcPrimary && makeAcPrimary.data.success) {
      await getBankAccountList();
    }
  };
  useEffect(() => {
    (async () => {
      // console.log(params.accountId)

      setLoading(false);
      // const getAccountList = await adminCampaignApi.listBankAccount(token);
      // if (getAccountList.data.success === true) {
      //   // console.log(getAccountList)
      //   setBankAccountList(getAccountList.data.data)
      // }
      await getBankAccountList();
      await getCountryList();
      await getCountryStateList(233);
      setLoading(false);
    })();
  }, [update]);

  useEffect(() => {
    (async () => {
      if (params?.accountId) {
        await addAccountDetails(params?.accountId);
      }
    })();
  }, [params?.accountId]);

  useEffect(() => {
    if (countryList.length > 0) {
      setDefaultCountry(countryList.find((x) => x.value === registerdBusinessAddress));
      setDefaultHomeCountry(countryList.find((x) => x.value === 'CA'));
    }
  }, [countryList]);

  useEffect(() => {
    (async () => {
      // console.log(data)
      setstate({
        ...state,
        taxRate: data.taxRate,
        paymentLoginId: data.paymentLoginId,
        TransactionKey: data.TransactionKey
      });
      setBankAccount({
        ...bankAccount,
        country: data.iso2
      });
    })();
  }, [data]);

  // useEffect(() => {
  //   console.log("document.cookie: ", document.cookie)
  //   document.cookie.split(";").forEach((c) => {
  //     console.log("split cookie: ", c)
  //     document.cookie = c
  //       .replace(/^ +/, "")
  //       .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
  //   });
  // }, []);

  const changevaluebankAc = (e) => {
    let value = e.target.value;
    setBankAccount({
      ...bankAccount,
      [e.target.name]: value
    });
  };

  //const hideAccForm = () => {
  //setBankAccount({
  //...bankAccount,
  //BusinessType: 'individual',
  //country: data.iso2,
  //companyName: '',
  //fname: '',
  //lname: '',
  //accError: []
  //});
  //setModalShow(false);
  //};

  const getCountryList = async () => {
    let tempArray = [];
    const getCountryList = await locationApi.countryList(token);
    if (getCountryList) {
      if (getCountryList.data.success) {
        if (getCountryList.data.data.length > 0) {
          getCountryList.data.data.map((country) => {
            let Obj = {};
            Obj.value = country.iso2;
            Obj.label = country.country;
            Obj.id = country.id;
            Obj.currency = country.currency;
            tempArray.push(Obj);
          });
          setCountryList(tempArray);
        }
      }
    }
  };

  const getCountryStateList = async (countryId) => {
    let tempArray = [];
    const getCountryStateList = await locationApi.stateListByCountry(token, Number(countryId));
    if (getCountryStateList) {
      if (getCountryStateList.data.success) {
        if (getCountryStateList.data.data.length > 0) {
          getCountryStateList.data.data.map((state) => {
            let Obj = {};
            Obj.value = state.state;
            Obj.label = state.state;
            tempArray.push(Obj);
          });
          setDefaultState([]);
          setStateList(tempArray);
        }
      }
    }
  };

  //const changevalue = (e) => {
  //let value = e.target.value;

  //if (
  //e.target.name === 'accountNumber' ||
  //e.target.name === 'phoneNo' ||
  //e.target.name === 'ssn' ||
  //e.target.name === 'personalIdNumber' ||
  //e.target.name === 'mcc'
  //) {
  //value = e.target.value.replace(/[^\d.]|\.(?=.*\.)/g, '');
  //}
  //if (e.target.name === 'identity') {
  //setSelectedDoc(e.target.getAttribute('data-label'));

  //setstate({
  //...state,
  //[e.target.name]: value
  //});
  //}
  //if (e.target.name === 'identityDocumentImage') {
  //// console.log(e)
  //let file = e.target.files[0] ? e.target.files[0] : '';
  //if (file) {
  //setTempImg(URL.createObjectURL(file));
  //setTempImgName(file.name);
  //setstate({
  //...state,
  //identityDocumentImage: file
  //});
  //} else {
  //setTempImg('');
  //setTempImgName('');
  //setstate({
  //...state,
  //identityDocumentImage: ''
  //});
  //}
  //} else {
  //setstate({
  //...state,
  //[e.target.name]: value
  //});
  //}
  //};

  //const resetForm = () => {
  //setModalShow(false);
  //setDefaultCountry(countryList.find((x) => x.value === registerdBusinessAddress));
  //setDefaultTypeOfBusiness({ value: 'individual ', label: 'Individual ' });
  //setTempImg('');
  //setTempImgName('');
  //setSelectedDoc('');
  //setValue(0);
  //setstate({
  //...state,
  //registerdBusinessAddress: 'US',
  //typeOfBusiness: 'individual',
  //firstName: '',
  //lastName: '',
  //personalEmail: '',
  //dob: '',
  //phoneNo: '',
  //ssn: '',
  //homeCountry: 'US',
  //addLine1: '',
  //addLine2: '',
  //city: '',
  //stateName: '',
  //zip: '',
  //personalIdNumber: '',
  //businessName: '',
  //businessWebsite: '',
  //mcc: '',
  //accountHolderName: '',
  //accountHolderType: 'individual',
  //routingNumber: '',
  //accountNumber: '',
  //confirmAccountNumber: '',
  //bankEmail: '',
  //identity: '',
  //identityDocumentImage: '',
  //status: 1,
  //error: []
  //});
  //};
  //const openModel = () => {
  //setDefaultCountry(countryList.find((x) => x.value === registerdBusinessAddress));
  //setDefaultTypeOfBusiness({ value: 'individual ', label: 'Individual ' });
  //setModalShow(true);
  //setTempImg('');
  //setTempImgName('');
  //setSelectedDoc('');
  //setValue(0);
  //setstate({
  //...state,
  //registerdBusinessAddress: 'US',
  //typeOfBusiness: 'individual',
  //firstName: '',
  //lastName: '',
  //personalEmail: '',
  //dob: '',
  //phoneNo: '',
  //ssn: '',
  //homeCountry: 'US',
  //addLine1: '',
  //addLine2: '',
  //city: '',
  //stateName: '',
  //zip: '',
  //personalIdNumber: '',
  //businessName: '',
  //businessWebsite: '',
  //mcc: '',
  //accountHolderName: '',
  //accountHolderType: 'individual',
  //routingNumber: '',
  //accountNumber: '',
  //confirmAccountNumber: '',
  //bankEmail: '',
  //identity: '',
  //identityDocumentImage: '',
  //status: 1,
  //error: []
  //});
  //};

  //const addBankAccount = (e) => {
  //// console.log(status)
  //const rules = {
  //accountHolderName: 'required',
  //accountHolderType: 'required',
  //routingNumber: 'required',
  //accountNumber: 'required'
  //};
  //const message = {
  //'accountHolderType.required': 'AccountHolder Type is required.',
  //'accountHolderName.required': 'Category accountHolderName is required.',
  //'routingNumber.required': 'Routing Number is required.',
  //'accountNumber.required': 'Account Number is required.'
  //};
  //validateAll(state, rules, message)
  //.then(async () => {
  //const formaerrror = {};
  //setstate({
  //...state,
  //error: formaerrror
  //});

  //let data = {};
  //// data.accountHolderName = encryptData(accountHolderName)
  //// data.accountHolderType = encryptData(accountHolderType)
  //// data.status = status
  //// data.routingNumber = encryptData(routingNumber.toString())
  //// data.accountNumber = encryptData(accountNumber.toString())

  //// Api Call for update Profile
  //setLoading(true);
  //const addBank = await adminCampaignApi.addBankAccount(token, data);

  //if (addBank) {
  //if (addBank.data.success === false) {
  //setLoading(false);
  //ToastAlert({ msg: addBank.data.message, msgType: 'error' });
  //} else {
  //if (addBank.data.success === true) {
  //resetForm();
  //setLoading(false);
  //setUpdate(!update);
  //ToastAlert({ msg: addBank.data.message, msgType: 'success' });
  //}
  //}
  //} else {
  //setLoading(false);
  //ToastAlert({ msg: 'Bank Account Not Added', msgType: 'error' });
  //}
  //})
  //.catch((errors) => {
  //// console.log(errors)
  //setLoading(false);
  //const formaerrror = {};
  //if (errors && errors.length) {
  //errors.forEach((element) => {
  //formaerrror[element.field] = element.message;
  //});
  //} else {
  //ToastAlert({ msg: 'Something Went Wrong', msgType: 'error' });
  //}

  //setstate({
  //...state,
  //error: formaerrror
  //});
  //});
  //};

  const removeBank = (id) => {
    confirmAlert({
      title: 'Remove Bank',
      message:
        'Are you sure you want to remove your linked Bank Account? You will no longer be able to receive donations.',
      buttons: [
        {
          label: 'Cancel'
        },
        {
          label: 'Remove Bank',
          onClick: async () => {
            setLoading(false);
            if (id !== '') {
              const removeBank = await adminCampaignApi.deleteBankAccount(token, id);
              if (removeBank) {
                if (removeBank.data.success === false) {
                  setLoading(false);
                  ToastAlert({ msg: removeBank.data.message, msgType: 'error' });
                } else {
                  if (removeBank.data.success === true) {
                    setLoading(false);
                    setUpdate(!update);
                    ToastAlert({ msg: removeBank.data.message, msgType: 'success' });
                  }
                }
              } else {
                setLoading(false);
                ToastAlert({ msg: 'Account not Removed', msgType: 'error' });
              }
            } else {
              setLoading(false);
              ToastAlert({ msg: 'Account not Removed id Not found', msgType: 'error' });
            }
          }
        }
      ]
    });
  };

  /* confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure to Remove Account.',
      buttons: [
        {
          label: 'Yes',
          onClick: async () => {
            setLoading(false);
            if (id !== '') {
              const removeBank = await adminCampaignApi.deleteBankAccount(token, id);
              if (removeBank) {
                if (removeBank.data.success === false) {
                  setLoading(false);
                  ToastAlert({ msg: removeBank.data.message, msgType: 'error' });
                } else {
                  if (removeBank.data.success === true) {
                    setLoading(false);
                    setUpdate(!update);
                    ToastAlert({ msg: removeBank.data.message, msgType: 'success' });
                  }
                }
              } else {
                setLoading(false);
                ToastAlert({ msg: 'Account not Removed', msgType: 'error' });
              }
            } else {
              setLoading(false);
              ToastAlert({ msg: 'Account not Removed id Not found', msgType: 'error' });
            }
          }
        },
        {
          label: 'No'
          // onClick: () => alert('Click No')
        }
      ]
    });*/

  //const handleChange = (event, newValue) => {
  //setValue(newValue);
  //// setTempImg('')
  //// setTempImgName('')
  //// setstate({
  ////   ...state,
  ////   identityDocumentImage: ''
  //// })
  //};

  //const goToBack = (key) => {
  //setValue(key);
  //};

  //const goToNextStep = (key) => {
  //let rules = {};
  //let message = {};

  //switch (key) {
  //case 1:
  //rules = {
  //firstName: 'required',
  //lastName: 'required',
  //personalEmail: 'required|email',
  //dob: 'required',
  //phoneNo: 'required',
  //addLine1: 'required',
  //addLine2: 'required',
  //stateName: 'required',
  //zip: 'required',
  //city: 'required',
  //ssn: 'required',
  //personalIdNumber: 'required'
  //};

  //message = {
  //'firstName.required': 'First Name is required.',
  //'lastName.required': 'Last Name is required.',
  //'personalEmail.required': 'Email is required.',
  //'personalEmail.email': 'Please Enter valid Email.',
  //'dob.required': 'Date of birth is required.',
  //'phoneNo.required': 'Phone Number is required.',
  //'addLine1.required': 'Address Line 1 is required.',
  //'addLine2.required': 'Address Line 2 is required.',
  //'stateName.required': 'State is required.',
  //'zip.required': 'Zip code is required.',
  //'personalIdNumber.required': 'personal Id Number is required.',
  //'ssn.required': 'SSN is required.',
  //'city.required': 'city is required.'
  //};
  //break;

  //case 2:
  //rules = {
  //businessName: 'required',
  //businessWebsite: 'required',
  //mcc: 'required'
  //};

  //message = {
  //'businessName.required': 'Business Name is required.',
  //'businessWebsite.required': 'Business Website is required.',
  //'mcc.required': 'MCC is required.'
  //};

  //break;

  //case 3:
  //rules = {
  //accountHolderName: 'required',
  //bankEmail: 'required|email',
  //routingNumber: 'required',
  //accountNumber: 'required',
  //confirmAccountNumber: 'required|same:accountNumber'
  //};

  //message = {
  //'accountHolderName.required': 'Accountholder Name is required.',
  //'bankEmail.required': 'Email is required.',
  //'bankEmail.email': 'Please Enter valid Email.',
  //'routingNumber.required': 'Routing number is required.',
  //'accountNumber.required': 'Account number is required.',
  //'confirmAccountNumber.required': 'Confirm Account number is required.',
  //'confirmAccountNumber.same': 'Account number and Confirm Account Number is required.'
  //};

  //break;

  //case 4:
  //rules = {
  //identity: 'required'
  //};

  //message = {
  //'identity.required': 'Please select type of Identity document to Upload'
  //};

  //break;

  //case 5:
  //rules = {
  //identityDocumentImage: 'required'
  //};

  //message = {
  //'identityDocumentImage.required': 'Please upload Identity Document'
  //};

  //break;

  //default:
  //break;
  //}

  //validateAll(state, rules, message)
  //.then(async () => {
  //const formaerrror = {};
  //setstate({
  //...state,
  //error: formaerrror
  //});

  //setLoading(true);
  //if (key !== 5) {
  //setValue(key + 1);
  //} else {
  //let fdata = {};
  //fdata.registerdBusinessAddress = registerdBusinessAddress;
  //fdata.typeOfBusiness = typeOfBusiness;
  //fdata.firstName = firstName;
  //fdata.lastName = lastName;
  //fdata.personalEmail = personalEmail;
  //fdata.dob = dob;
  //fdata.phoneNo = phoneNo;
  //fdata.ssn = ssn;
  //fdata.homeCountry = homeCountry;
  //fdata.addLine1 = addLine1;
  //fdata.addLine2 = addLine2;
  //fdata.city = city;
  //fdata.stateName = stateName;
  //fdata.zip = zip;
  //fdata.personalIdNumber = personalIdNumber;
  //fdata.businessName = businessName;
  //fdata.businessWebsite = businessWebsite;
  //fdata.mcc = mcc;
  //fdata.accountHolderName = accountHolderName;
  //fdata.accountHolderType = accountHolderType;
  //fdata.routingNumber = routingNumber;
  //fdata.accountNumber = accountNumber;
  //fdata.bankEmail = bankEmail;
  //fdata.identityDocumentType = identity;
  //fdata.identityDocumentImage = identityDocumentImage;
  //fdata.status = status;
  //fdata.countryId = data.country_id;
  //fdata.currency = currency;

  //const addBank = await adminCampaignApi.addBankAccount(token, fdata);
  //// console.log(addBank)

  //if (addBank) {
  //if (addBank.data.success === false) {
  //setLoading(false);
  //ToastAlert({ msg: addBank.data.message, msgType: 'error' });
  //} else {
  //if (addBank.data.success === true) {
  //resetForm();
  //setLoading(false);
  //setUpdate(!update);
  //ToastAlert({ msg: addBank.data.message, msgType: 'success' });
  //}
  //}
  //} else {
  //setLoading(false);
  //ToastAlert({ msg: 'Bank Account Not Added', msgType: 'error' });
  //}
  //}
  //setLoading(false);
  //})
  //.catch((errors) => {
  //console.log(errors);
  //setLoading(false);
  //const formaerrror = {};
  //if (errors && errors.length) {
  //errors.forEach((element) => {
  //formaerrror[element.field] = element.message;
  //});
  //} else {
  //ToastAlert({ msg: 'Something Went Wrong', msgType: 'error' });
  //}

  //setstate({
  //...state,
  //error: formaerrror
  //});
  //});
  //};

  const onChangeTaxRate = (e) => {
    let value = e.target.value;

    if (e.target.name === 'taxRate') {
      value = e.target.value.replace(/[^\d.]|\.(?=.*\.)/g, '');
    }

    setstate({
      ...state,
      [e.target.name]: value
    });
  };

  function myFunction(field) {
    setSaveloading(true);
    let rule = {};
    rule[field] = 'required';

    // const rules = {
    //   taxRate: 'required',

    // }
    const rules = rule;
    const message = {
      'taxRate.required': 'Tax Rate is required.',
      'paymentLoginId.required': 'Api Login Id is required.',
      'TransactionKey.required': 'Transaction Key is required.'
    };
    validateAll(state, rules, message)
      .then(async () => {
        const formaerrror = {};
        setstate({
          ...state,
          error: formaerrror
        });
        let fdata = {};
        fdata.field = field;
        if (field === 'taxRate') {
          fdata.value = Number(taxRate);
        }

        if (field === 'paymentLoginId') {
          fdata.value = paymentLoginId;
        }

        if (field === 'TransactionKey') {
          fdata.value = TransactionKey;
        }
        // console.log('first')
        const updateSalesTax = await adminCampaignApi.updateSalesTax(token, fdata);
        if (updateSalesTax && updateSalesTax.data.success) {
          setSaveloading(false);
          ToastAlert({ msg: updateSalesTax.data.message, msgType: 'success' });
        } else {
          setSaveloading(false);
          ToastAlert({ msg: 'Something Went Wrong', msgType: 'error' });
        }
      })
      .catch((errors) => {
        // console.log(errors)
        setSaveloading(false);
        const formaerrror = {};
        if (errors && errors.length) {
          errors.forEach((element) => {
            formaerrror[element.field] = element.message;
          });
        } else {
          ToastAlert({ msg: 'Something Went Wrong', msgType: 'error' });
        }

        setstate({
          ...state,
          error: formaerrror
        });
      });
  }

  //const checkAcc = async (accountId) => {
  //let data = {};
  //data.accountId = accountId;
  //const check = await adminCampaignApi.chekConnectAccount(token, data);
  //if (check && check.data.success) {
  //await getBankAccountList();
  //}
  //};

  const addExpressAccount = async () => {
    setBankloading(true);
    let rules = {};
    rules.accEmail = 'required|email';

    if (BusinessType === 'individual') {
      rules.lname = 'required';
      rules.fname = 'required';
    } else {
      rules.companyName = 'required';
    }

    let message = {
      'accEmail.required': 'Email is required.',
      'accEmail.email': 'Please enter valid email.',
      'lname.required': 'Last Name is required.',
      'fname.required': 'First Name is required.',
      'companyName.required': 'Charity Name is required.'
    };
    validateAll(bankAccount, rules, message)
      .then(async () => {
        const formaerrror = {};
        setBankAccount({
          ...bankAccount,
          accError: formaerrror
        });

        let formData = {};
        formData.country = country;
        formData.email = accEmail;
        formData.business_type = BusinessType;
        formData.slug = data.slug;
        let fullUrl = window.location.href;

        let redirectUrlMinusPayments = fullUrl.split('payments')[0];
        formData.redirectUrl = redirectUrlMinusPayments + 'payments';

        if (BusinessType === 'individual') {
          formData.first_name = fname;
          formData.last_name = lname;
        } else {
          formData.companyName = companyName;
        }
        const create = await adminCampaignApi.createExpressAccount(token, formData);
        if (create && create.data.success) {
          window.location.replace(create.data.data.url);
        }
        setBankloading(false);
      })
      .catch((errors) => {
        // console.log(errors)
        setBankloading(false);
        const formaerrror = {};
        if (errors && errors.length) {
          errors.forEach((element) => {
            formaerrror[element.field] = element.message;
          });
        } else {
          ToastAlert({ msg: 'Something Went Wrong', msgType: 'error' });
        }

        setBankAccount({
          ...bankAccount,
          accError: formaerrror
        });
      });
  };
  const makeAccountPrimary = async (id) => {
    let data = {};
    data.id = id;
    const makeAcPrimary = await adminCampaignApi.makeAccountPrimary(token, data);
    if (makeAcPrimary && makeAcPrimary.data.success) {
      await getBankAccountList();
    }
  };

  return (
    <>
      <div className="d-flex flex-column gap-5 mw-600">
        {/* <div className="mb-5">
          <h4 className="fw-bolder">Saved Payment Methods</h4>
          <div className="text-subtext mb-3 pt-1">
            Credit Cards you saved when donating
          </div>

          <div className="linked__list d-flex flex-column">
            <div className="linked__item d-flex align-items-center p-1 border">
              <div className="accounts__icon">
                <ListItemImg
                  size={45}
                  className=" border-0"
                  imgSrc=""
                />
              </div>
              <div className=" flex__1 mx-2 text-break">
                <div className="accounts__email fw-bold">Ending in 7709</div>
                <div className="fs-7 mb-3p">Mastercard</div>
                <div className="fs-7 text-subtext">8 / 2019</div>
              </div>
              <Button variant="link" className="text-danger fs-7">
                remove
              </Button>
            </div>

            <div className="linked__item d-flex align-items-center p-1 border">
              <div className="accounts__icon">
                <ListItemImg
                  size={45}
                  className="rounded-circle border-0"
                  imgSrc=""
                />
              </div>
              <div className="accounts__email fw-bolder flex__1 mx-2 text-break">
                k************l@gmail.com
              </div>
              <Button variant="link" className="text-danger fs-7">
                remove
              </Button>
            </div>

            <div className="fs-7">
              <FontAwesomeIcon
                icon={regular("info-circle")}
                className="mr-3p text-info"
              />
              <span className="text-light">
                To change your password <Link to='/change-password'>click here</Link>
              </span>
            </div>
          </div>
        </div>*/}
        <div>
          <h4 className="fw-bolder">Tax Rate</h4>
          <div className="text-subtext mb-3 pt-1">What is your regional sales tax?</div>
          <div className="input__wrap mb-3">
            <label className="input__label flex__1">
              <input
                type="text"
                name="taxRate"
                value={taxRate}
                className={state.error && state.error.taxRate ? 'inputerror' : ''}
                onChange={(e) => onChangeTaxRate(e)}
                // onFocu={()=>alert('okk')}
                // onBlur={() => myFunction('taxRate')}
              />
              <span className="input__span">Ex: HST/ON 13%</span>
            </label>
          </div>
          {state.error && state.error.taxRate && <p className="error">{state.error.taxRate}</p>}
          <div className="note  mb-2 fs-6">
            The tax rate will be automatically added to the unit price of items you post to make
            sure you enough funds to cover the sales tax when you purchase the items.
          </div>
          <Button
            size="md"
            variant="info"
            onClick={() => {
              if (!saveloading) myFunction('taxRate');
            }}
            style={{
              opacity: saveloading ? '0.7' : '1'
            }}
          >
            Save {saveloading && <CircularProgress className="ms-2" color="inherit" size={12} />}
          </Button>
        </div>

        <div>
          <h4 className="fw-bolder">Connect your Bank</h4>
          <div className="text-subtext mb-3 pt-1">
            Link the bank account that {CampaignAdmin?.name || 'your Charity'} will use to receive
            direct deposits from our donors.
          </div>
          <div className="d-flex align-items-center">
            {/*     <span className="text-subtext flex__1">
              Direct Deposit information for contributions from your donors
            </span>
            <Button variant="info" onClick={() => openModel()}>Add Bank</Button>*/}
            <AddBankModal
              //show={modalShow}
              // onHide={() => setModalShow(false)}
              //onHide={() => hideAccForm()}
              bankAccount={bankAccount}
              setBankAccount={setBankAccount}
              changevaluebankAc={changevaluebankAc}
              addExpressAccount={addExpressAccount}
              isLoading={loading}
              bankloading={bankloading}
            />

            {/* <AddBankModal
              show={modalShow}
              setModalShow={setModalShow}
              changevalue={changevalue}
              stateData={state}
              setstate={setstate}
              addBankAccount={addBankAccount}
              countryList={countryList}
              defaultCountry={defaultCountry}
              setDefaultCountry={setDefaultCountry}
              stateList={stateList}
              defaultState={defaultState}
              setDefaultState={setDefaultState}
              tempImg={tempImg}
              tempImgName={tempImgName}
              selectedDoc={selectedDoc}
              value={value}
              handleChange={handleChange}
              goToNextStep={goToNextStep}
              goToBack={goToBack}
              defaultTypeOfBusiness={defaultTypeOfBusiness}
              setDefaultTypeOfBusiness={setDefaultTypeOfBusiness}
              defaultHomeCountry={defaultHomeCountry}
              setDefaultHomeCountry={setDefaultHomeCountry}
              getCountryStateList={getCountryStateList}

            /> */}
          </div>
        </div>

        <div>
          {bankAccountList.length > 0 && (
            <>
              <h4 className="fw-bolder">Connected Accounts</h4>
              <div className="text-subtext mb-3 pt-1">
                Below are the bank accounts you have connect through the Stripe API.
              </div>
            </>
          )}
          {bankAccountList.length > 0 &&
            bankAccountList.map((list, i) => {
              // Convert the created_at date string to a Date object
              const createdDate = new Date(list.created_at);
              // Format the date to a readable format
              const formattedDate = createdDate.toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                timeZoneName: 'short'
              });
              return (
                <div className="linked__list--bank d-flex gap-2 flex-column mb-2" key={i}>
                  <div className="linked__item--bank d-flex align-items-center p-2 border">
                    <div className="accounts__icon p-1 border">
                      <FontAwesomeIcon
                        icon={regular('building-columns')}
                        className="fs-3 text-subtext"
                      />
                    </div>
                    <div className="flex__1 mx-2 text-break">
                      {/*  {list.businessName ? (
                        <div
                          className="accounts__email fw-bold"
                          style={{ textTransform: 'capitalize', width: '171px' }}
                        >
                          {list.businessName}
                        </div>
                      ) : (
                        <div
                          className="accounts__email fw-bold"
                          style={{ textTransform: 'capitalize', width: '171px' }}
                        >
                          {list.personalEmail}
                        </div>
                      )}*/}

                      {list.bankName && (
                        <>
                          <span className="linked__bank fw-bold">{list.bankName}</span>
                        </>
                      )}
                      <span className="linked__country fw-bold p-3p ms-1">{list.homeCountry}</span>
                      <FontAwesomeIcon
                        icon={solid('circle-check')}
                        className="fs-5 text-success ms-1"
                      />
                      <div className="d-flex linked__account mt-3p">
                        <span className="linked__transit me-1">⑆</span>
                        <span>{list.routingNumber}</span>
                        <span className="linked__transit mx-1">⑆</span>
                        <span className="linked__space me-1">••••</span>
                        {list.accountNumber && <span>{list.accountNumber}</span>}
                      </div>
                    </div>

                    {list.isPrimary ? (
                      <>
                        <div>
                          <FontAwesomeIcon
                            icon={solid('shield-halved')}
                            className="fs-3 text-primary"
                          />
                        </div>
                      </>
                    ) : (
                      // <Chip label="Primary" color="success" variant="outlined" />
                      <Button
                        variant="link"
                        className="ms-auto text-info p-0"
                        onClick={() => makeAccountPrimary(list._id)}
                      >
                        Make Primary
                      </Button>
                    )}

                    {/* {
                      list.status === 1 ?

                        <div className="flex__1">
                          <FontAwesomeIcon
                            icon={solid("badge-check")}
                            className="fs-3 text-success"
                          />
                        </div>
                        :
                        list.status === 0 ?
                          <>
                            <Button variant="link" className="text-danger" onClick={() => checkAcc(list.stripeAccountId)}>
                              <FontAwesomeIcon
                                icon={solid("rotate")}
                                className="fs-3 text-primary"
                              />
                            </Button>
                          </>
                          :
                          <>
                            <div className="flex__1">
                              <FontAwesomeIcon
                                icon={solid("ban")}
                                className="fs-3 text-danger"
                              />
                            </div>
                          </>
                    } */}

                    {/* <Button variant="link" className="text-danger" onClick={() => removeBank(list._id)}>
                      Verify
                    </Button> */}

                    {/*  {!list.isPrimary && (
                      <Button variant="link" className="pe-0" onClick={() => removeBank(list._id)}>
                        <FontAwesomeIcon icon={solid('trash')} className="fs-4 text-danger" />
                      </Button>
                    )}*/}
                    <Button variant="link" className="pe-0" onClick={() => removeBank(list._id)}>
                      <FontAwesomeIcon icon={solid('trash')} className="fs-4 text-danger" />
                    </Button>
                  </div>
                  <div className="d-flex gap-1">
                    <FontAwesomeIcon icon={regular('clock')} className="fs-5 text-primary" />
                    <span>{formattedDate}</span>
                  </div>
                </div>
              );
            })}
          {bankAccountList.length > 0 && (
            <div className="note mt-5 text-subtext">
              <FontAwesomeIcon icon={solid('shield-halved')} className="fs-5 text-primary me-2" />
              This method will be used for deposits from donations / items you post.
            </div>
          )}
          <div className="note mt-3 fs-6">
            Funds will be deposited into this account when items you post are fully funded or marked
            as infinity items, or if you receive cash donations.
          </div>
        </div>

        {/* <div className="mb-5">
          <h4 className="fw-bolder">Direct Deposit Accounts</h4>(Authorize.Net)


          <div className="input__wrap mb-3 mt-3">
            <label className="input__label flex__1">
              <input type="text" placeholder="EX : 66GdU46mhuFQ" name="paymentLoginId" value={paymentLoginId} className={state.error && state.error.paymentLoginId ? 'inputerror' : ""} onChange={(e) => onChangeTaxRate(e)}
              // onFocu={()=>alert('okk')} 
              onBlur={() => myFunction('paymentLoginId')}
              />
              <span className="input__span">API LOGIN ID</span>
            </label>
            {state.error && state.error.paymentLoginId && <p className="error">{state.error.paymentLoginId}</p>}
          </div>



          <div className="input__wrap mb-3">
            <label className="input__label flex__1">
              <input type="text" placeholder="EX : 74AZP5Hxr972nPEn" name="TransactionKey" value={TransactionKey} className={state.error && state.error.TransactionKey ? 'inputerror' : ""} onChange={(e) => onChangeTaxRate(e)}
              // onFocu={()=>alert('okk')} 
              onBlur={() => myFunction('TransactionKey')}
              />
              <span className="input__span">TRANSACTION KEY</span>
            </label>
            {state.error && state.error.TransactionKey && <p className="error">{state.error.TransactionKey}</p>}
          </div>





          <div className="px-1 py-20p mt-1 mb-20p fs-7 text-subtext">
            <FontAwesomeIcon
              icon={solid("shield-halved")}
              className="fs-5 text-primary me-2"
            />
            This method will be used for deposits from donations / items you post.
          </div>

          <div className="note ">
            Funds will be deposited into this account when items you post are
            fully funded or you receive donations from users (both one-time &
            recurring).
          </div>
        </div> */}
        {/*<div className="mb-5">
          <h4 className="fw-bolder">Cryptocurrencyies</h4>
          <div className="text-subtext mb-4">
            Allow your donors to send funds via cryptocurrency. Choose the coins
            you wish to accept. These payment options will be presented to the
            donor at checkout.
          </div>

          <ul className="list-unstyled crypto__list">
            <li className="list__item d-flex align-items-center py-1">
              <span className="crypto__icon">
                <img
                  className="img-fluid"
                  src=""
                  alt=""
                />
              </span>
              <span className="fs-5 fw-semibold text-subtext flex__1">
                USD Coin
              </span>
              <ToggleSwitch checked={true} changevalue={() => { }} />
            </li>
            <li className="list__item d-flex align-items-center py-1">
              <span className="crypto__icon">
                <img
                  className="img-fluid"
                  src=""
                  alt=""
                />
              </span>
              <span className="fs-5 fw-semibold text-subtext flex__1">
                Bitcoin
              </span>
              <ToggleSwitch checked={false} changevalue={() => { }} />
            </li>
            <li className="list__item d-flex align-items-center py-1">
              <span className="crypto__icon">
                <img
                  className="img-fluid"
                  src="
                  alt=""
                />
              </span>
              <span className="fs-5 fw-semibold text-subtext flex__1">
                Ethereum
              </span>
              <ToggleSwitch checked={false} changevalue={() => { }} />
            </li>
          </ul>
            </div>*/}
      </div>
    </>
  );
};

export default Payments;
