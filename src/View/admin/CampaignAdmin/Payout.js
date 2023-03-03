import Dialog from '@mui/material/Dialog';
import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { Button, Card } from '@mui/material';
import moment from 'moment';
import Label from '../../../components/Label';
import helper, { priceFormat } from '../../../Common/Helper';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabContainer } from 'react-bootstrap';
import PaymentsIcon from '@mui/icons-material/Payments';
import ReceiptIcon from '@mui/icons-material/Receipt';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import PaidIcon from '@mui/icons-material/Paid';
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import 'react-data-table-component-extensions/dist/index.css';

const Transition = React.forwardRef(function Transition(propss, ref) {
  return <Slide direction="up" {...propss} />;
});
const DialogTransition = (props) => {
  return <Slide direction="up" {...props} />;
};
const Payout = (props) => {
  let stateData = props.stateData;
  const [value, setValue] = useState(0);

  const goToBack = (key) => {
    setValue(key);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
    // setTempImg('')
    // setTempImgName('')
    // setstate({
    //   ...state,
    //   identityDocumentImage: ''
    // })
  };
  const cardBody = {
    flex: '1 1 auto',
    minHeight: '1px',
    padding: ' 1.25rem'
  };
  const avatar = {
    width: '40px',
    height: '40px'
  };

  const avatarTitle = {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    color: ' #fff',
    backgroundColor: '#2469ce'
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired
  };

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      'aria-controls': `vertical-tabpanel-${index}`
    };
  }

  const btnstyle = {
    backgroundColor: '#3773c6',
    color: 'white'
  };
  let organizationDetails = props.organizationDetails;

  const columns = [
    {
      id: 'name',
      name: 'Account Holder',
      selector: 'bankDetails.accountHolderName',
      sortable: true
    },

    // { id: 'orgName', name: "Organization", selector: "organizationDetails.name", sortable: true },

    {
      id: 'transactionStatus',
      name: 'Payment Status',
      cell: (row) => (
        <>
          <Label
            variant="ghost"
            color={(row.transactionStatus === 'succeeded' && 'success') || 'error'}
          >
            {row.transactionStatus}
          </Label>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true
    },

    {
      id: 'amount',
      name: 'Amount',
      cell: (row) => (
        <>
          <span>
            {(organizationDetails?.organizationaccount?.symbol
              ? organizationDetails?.organizationaccount?.symbol
              : '$') + priceFormat(row.amount)}
          </span>
        </>
      ),
      ignoreRowClick: true,
      allowOverflow: true
    },
    // {
    //     name: "Date",
    //     cell: (row) => <>
    //         <span>{row.created_at}</span>
    //     </>,
    //     // ignoreRowClick: true,
    //     sortable: true,
    //     // allowOverflow: true,
    // },
    // { name: "Date", selector: "created_at", sortable: true },
    {
      id: 'created_at',
      name: 'Date',
      selector: 'created_at',
      cell: (row) => <div>{moment(row.created_at).format('DD MMMM YYYY ')}</div>,
      sortable: true,
      accessor: ''
    },
    {
      id: 'transactionid',
      name: 'Transaction Id',
      cell: (row) => <>{row.transactionId}</>,
      ignoreRowClick: true
      // allowOverflow: true,
    }
  ];
  const data = [];

  if (props.orgTransactionHistory && props.orgTransactionHistory.length > 0) {
    props.orgTransactionHistory.map((item) => {
      data.push(item);
    });
  }

  const tableData = {
    columns,
    data,
    export: false,
    print: false
  };

  return (
    <>
      <Dialog
        fullScreen
        open={props.payoutModal}
        onClose={() => props.setPayoutModal(false)}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative', bgcolor: '#3773c6' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => props.setPayoutModal(false)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {organizationDetails.name}
            </Typography>
            <Button autoFocus color="inherit" onClick={() => props.setPayoutModal(false)}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <Box
          sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 1500 }}
          className="mt-0"
        >
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: 'divider', bgcolor: '#e7ebf0' }}
            textColor="secondary"
            indicatorColor="secondary"
          >
            <Tab icon={<PaymentsIcon />} iconPosition="start" label="Payout" {...a11yProps(0)} />
            <Tab
              icon={<ReceiptIcon />}
              iconPosition="start"
              label="Payment History"
              {...a11yProps(1)}
            />
            {/* <Tab label="Business details" {...a11yProps(2)} />
                    <Tab label="Bank details" {...a11yProps(3)} />
                    <Tab label="Identity document" {...a11yProps(4)} />
                    <Tab label="Upload document" {...a11yProps(5)} /> */}
          </Tabs>
          <div className="invoice invoice-content  px-5 pt-5" style={{ width: '100%' }}>
            {/* <div className="row">

                        <div className="col-sm-6">
                            <img src={helper.CampaignAdminLogoPath + organizationDetails.logo} alt='sponsor' style={{ width: "100px" }}></img>
                        </div>
                        <div className="col-sm-6">
                 
                        </div>
                    </div> */}

            {value === 0 && (
              <TabContainer style={{ width: '100%' }}>
                <div className="row">
                  <div className="col-md-6 col-lg-4 col-xl">
                    <div className="card shadow" style={{ minHeight: '100%' }}>
                      <div
                        className="card-body"
                        style={{
                          ...cardBody,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}
                      >
                        <img
                          src={helper.CampaignAdminLogoPath + organizationDetails.logo}
                          alt="sponsor"
                          style={{ width: '100px' }}
                        />

                        {/* <h1 className="display-5 mt-1 mb-3">3</h1> */}
                      </div>
                    </div>
                  </div>
                  {/* <div className="col-md-6 col-lg-3 col-xl">
                                        <div className="card">
                                            <div className="card-body" style={cardBody}>
                                                <div className="row">
                                                    <div className="col mt-0">
                                                        <h5 className="card-title">Orders</h5>
                                                    </div>
                                                    <div className="col-auto">
                                                        <div className="avatar" style={avatar}>
                                                            <div className="avatar-title rounded-circle bg-primary-dark" style={avatarTitle}>
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-shopping-cart align-middle">
                                                                    <circle cx="9" cy="21" r="1"></circle>
                                                                    <circle cx="20" cy="21" r="1"></circle>
                                                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <h1 className="display-5 mt-1 mb-3">12.514</h1>
                                            </div>
                                        </div>
                                    </div> */}
                  <div className="col-md-6 col-lg-4 col-xl">
                    <div className="card shadow">
                      <div className="card-body" style={cardBody}>
                        <div className="row">
                          <div className="col mt-0">
                            <h5 className="card-title">Pending Amount</h5>
                          </div>
                          <div className="col-auto">
                            <div className="avatar" style={avatar}>
                              <div
                                className="avatar-title rounded-circle bg-primary-dark"
                                style={avatarTitle}
                              >
                                <PaidIcon />
                              </div>
                            </div>
                          </div>
                        </div>
                        <h1 className="display-5 mt-1 mb-3">
                          {organizationDetails?.organizationaccount?.symbol
                            ? organizationDetails?.organizationaccount?.symbol
                            : '$'}
                          {organizationDetails?.organizationaccount?.pending_amount
                            ? organizationDetails?.organizationaccount?.pending_amount
                            : 0}
                        </h1>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 col-lg-4 col-xl">
                    <div className="card shadow">
                      <div className="card-body" style={cardBody}>
                        <div className="row">
                          <div className="col mt-0">
                            <h5 className="card-title">Paid Amount</h5>
                          </div>
                          <div className="col-auto">
                            <div className="avatar" style={avatar}>
                              <div
                                className="avatar-title rounded-circle bg-primary-dark"
                                style={avatarTitle}
                              >
                                {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-dollar-sign align-middle">
                                                                    <line x1="12" y1="1" x2="12" y2="23"></line>
                                                                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                                                                </svg> */}
                                {organizationDetails?.organizationaccount?.symbol
                                  ? organizationDetails?.organizationaccount?.symbol
                                  : '$'}
                              </div>
                            </div>
                          </div>
                        </div>
                        <h1 className="display-5 mt-1 mb-3">
                          {organizationDetails?.organizationaccount?.symbol
                            ? organizationDetails?.organizationaccount?.symbol
                            : '$'}
                          {organizationDetails?.organizationaccount?.credited_amount
                            ? organizationDetails?.organizationaccount?.credited_amount
                            : 0}
                        </h1>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-2">
                  <div className="plans">
                    {/* <label className="plan basic-plan" htmlFor="basic">
                                            <input checked type="radio" name="plan" id="basic" />
                                            <div className="plan-content">
                                                <img loading="lazy" src="https://raw.githubusercontent.com/ismailvtl/ismailvtl.github.io/master/images/life-saver-img.svg" alt="" />
                                                <div className="plan-details">
                                                    <span>Basic</span>
                                                    <p>For smaller business, with simple salaries and pay schedules.</p>
                                                </div>
                                            </div>
                                        </label> */}

                    {organizationDetails.bankaccounts &&
                    organizationDetails.bankaccounts.length > 0 ? (
                      <h1>Select Bank Account</h1>
                    ) : (
                      <h1>Bank Account Not found</h1>
                    )}
                    {stateData.error && stateData.error.account && (
                      <p className="error">{stateData.error.account}</p>
                    )}

                    {organizationDetails.bankaccounts &&
                      organizationDetails.bankaccounts.length > 0 &&
                      organizationDetails.bankaccounts.map((account, i) => {
                        return (
                          <label className="plan basic-plan p-2" htmlFor={account._id}>
                            <input
                              type="radio"
                              nname="account"
                              id={account._id}
                              value={account._id}
                              checked={stateData.account === account._id}
                              onClick={(e) => props.onSelectBank(e, account)}
                            />
                            <div className="plan-content">
                              {/*<img loading="lazy" src={BankIcon} alt="" />*/}
                              <div className="plan-details">
                                <span>{account.accountNumber.replace(/\d(?=\d{4})/g, '*')}</span>
                                <p>{account.accountHolderName}</p>
                              </div>
                            </div>
                          </label>

                          // <div className="form-check mb-3">
                          //     <input className="form-check-input" type="radio" data-label={account.accountHolderName} name="account" id={account._id} value={account._id} style={{ marginTop: "revert" }} onClick={(e) => props.onSelectBank(e, account)} checked={stateData.account === account._id} />
                          //     <label className="form-check-label" htmlFor={account._id} style={{ paddingLeft: "initial" }}>
                          //         {account.accountHolderName}
                          //     </label>
                          // </div>
                        );
                      })}
                  </div>

                  {organizationDetails.bankaccounts && organizationDetails.bankaccounts.length > 0 && (
                    <>
                      <div className="mb-3">
                        <label htmlFor="exampleFormControlInput1" className="form-label">
                          Amount
                        </label>
                        <input
                          type="text"
                          name="amount"
                          className="form-control"
                          value={stateData.amount}
                          onChange={props.changevalue}
                          placeholder="Enter Amount to Pay"
                        />
                        {stateData.error && stateData.error.amount && (
                          <p className="error">{stateData.error.amount}</p>
                        )}
                      </div>

                      <button
                        type="button"
                        className="btn btn-xg"
                        style={btnstyle}
                        onClick={() => props.payToOrganization()}
                      >
                        Pay &nbsp;
                        <PaidIcon />
                      </button>
                    </>
                  )}
                </div>
              </TabContainer>
            )}

            {value === 1 && (
              <TabContainer style={{ width: '100%' }}>
                <DataTableExtensions {...tableData}>
                  <DataTable
                    columns={columns}
                    data={data}
                    noHeader
                    defaultSortField="created_at"
                    pagination
                    striped
                    highlightOnHover
                    defaultSortAsc={false}
                  />
                </DataTableExtensions>
              </TabContainer>
            )}
          </div>
        </Box>
      </Dialog>
    </>
  );
};
export default Payout;
