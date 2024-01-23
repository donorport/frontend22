import { Button, Dropdown, Modal } from 'react-bootstrap';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import helper, { priceFormat } from '../../../../../Common/Helper';
import { confirmAlert } from 'react-confirm-alert';
import Avatar from '../../atoms/avatar';
import AvatarImg from '../../../../../assets/images/avatar.png';
import moment from 'moment';
import './style.scss';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { CircularProgress } from '@mui/material';
import { Accordion, AccordionItem as Item } from '@szhsin/react-accordion';
import chevronDown from '../../../../../assets/images/chevron-down.svg';
import donation from '../../../../../assets/images/donate.svg';

let PageSize = 10;

const AccordionItem = ({ header, hideChevron, disableButton, ...rest }) => (
  <Item
    {...rest}
    disabled={disableButton}
    header={({ state: { isEnter: expanded } }) => (
      <>
        {header}
        <div className="chev-wrapper d-none d-sm-flex">
          {!hideChevron && (
            <img
              className={`ml-auto transition-transform duration-200 ease-in-out ${
                expanded && 'rotate-180'
              }`}
              src={chevronDown}
              alt="Chevron Down"
            />
          )}
        </div>
      </>
    )}
  />
);

const AdminTaxTable = (props) => {
  const taxList = props.taxList;

  const [showModal, setShowModal] = useState(false);
  const [loadingId, setLoadingId] = useState([]);
  const [currentItem, setCurrentItem] = useState(null);

  const totalVal = (data) => {
    let tempSub = [];
    let sum;
    if (data.length > 0) {
      data.map((i) => {
        //tempSub.push(i.amount);
        let productTotal = i.orderItemDetails?.totalPrice;
        let donationTotal = (i.amount - 0.3) / 1.0499;
        let taxableProduct = priceFormat(Number(productTotal));
        let taxableDonation = priceFormat(Number(donationTotal));
        tempSub.push(i.type === 'Purchased' ? taxableProduct : taxableDonation);
      });
      sum = tempSub.reduce(function (a, b) {
        return parseFloat(a) + parseFloat(b);
        // return a + b;
      }, 0);
    } else {
      sum = 0;
    }
    return sum.toFixed(2);
  };

  const useStyles = makeStyles(() => ({
    ul: {
      '& .MuiPaginationItem-root': {
        color: '#6f6f91 !important',
        fontFamily: 'initial'
      },
      '& .MuiPaginationItem-root:hover': {
        background: '#f2f6fc !important'
      },
      // '& .Mui-selected': {
      //   background: '#f2f6fc !important'
      // }
    }
  }));
  const classes = useStyles();

  const viewItem = (item) => {
    console.log('View Item: ', item);
    setCurrentItem(item);
    setShowModal(true);
  };

  const deleteItem = (item, index) => {
    console.log('Delete Item: ', item);
    confirmAlert({
      title: 'Delete Receipt?',
      message: 'Are you sure to delete this tax receipt?',
      buttons: [
        {
          label: 'Cancel'
        },
        {
          label: 'Delete',
          onClick: () => {
            let tempArray = [...loadingId];
            tempArray.push(`loadingDelete-${index}`);
            setLoadingId([...tempArray]);
            if (props.deleteReceipt) {
              props.deleteReceipt(item.userDetails?._id);
            }
          }
        }
      ]
    });
  };

  const onModalClose = () => {
    setShowModal(false);
    setCurrentItem(null);
  };

  useEffect(() => {
    console.log('props.taxList:', props.taxList);
  }, [props.taxList]);

  return (
    <>
      <div className="admin__tax-table list__table mb-4">
        <div className="list__table-sort d-flex justify-content-sort border-bottom">
          <div className="flex__1">
            <Button
              variant="link"
              className="btn__sort px-0 text-decoration-none"
              onClick={() => props.handleSortingChange('created_at')}
            >
              Date
              {props.sortField === 'created_at' && props.order === 'asc' ? (
                <FontAwesomeIcon icon={solid('angle-up')} className="small ml-6p" />
              ) : (
                <FontAwesomeIcon icon={solid('angle-down')} className="small ml-6p" />
              )}
              {/* <FontAwesomeIcon
                icon={solid("angle-up")}
                className="small ml-6p"
              /> */}
            </Button>
          </div>
          <Button variant="link" className="btn__sort px-0 text-decoration-none">
            Status
            <FontAwesomeIcon icon={solid('angle-down')} className="small ml-6p" />
          </Button>
        </div>
        <ul className="list-unstyled mb-0 list__table-list">
          {taxList.length > 0 ? (
            taxList.map((item, i) => {
              console.log({ item });
              // const yearList = item.created_at.split("-")
              const disableHeader = item.length === 1 || props.loading;
              return (
                <>
                  <Accordion allowMultiple>
                    <AccordionItem
                      className="d-flex flex-column"
                      hideChevron={disableHeader}
                      buttonProps={{ disabled: disableHeader }}
                      header={
                        <li className="flex-grow-1 table__list-item px-2 py-2">
                          <div className="d-sm-flex align-items-center flex-grow-1">
                            <div className="d-flex align-items-center me-sm-2 mb-3 mb-sm-0 pe-2">
                              <div className="admin__billing-value ms-2 ms-sm-0 me-sm-4 text-end text-sm-start">
                                <div className="price fw-bold fs-5">
                                  {item[0].currencySymbol}
                                  {/* {totalVal([...item]).toLocaleString('en-US', {
                                    maximumFractionDigits: 2
                                  })} */}
                                  {priceFormat(totalVal([...item]))}
                                </div>
                                <div className="text-light fs-8">
                                  {moment(item[0].created_at).fromNow()}
                                </div>
                              </div>
                              <div className="position-relative d-flex">
                                <Avatar
                                  size={52}
                                  avatarUrl={
                                    item[0].userDetails.image
                                      ? helper.DonorImageResizePath + item[0].userDetails.image
                                      : AvatarImg
                                  }
                                  border={0}
                                  shadow={false}
                                  className="mr-12p donor_avatar_bg"
                                />
                              </div>
                              <div
                                className="text__wrap ms-0 ms-sm-2 user-select-auto fs-7"
                                style={{ cursor: 'default' }}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <div className="fw-bold fs-5">{item[0].userDetails?.name}</div>
                                <div className="text-light mb-1">{item[0].userDetails?.email}</div>
                                <div className="text-light">
                                  {item[0].userDetails?.street +
                                    ', ' +
                                    item[0].userDetails?.city_id}
                                  &nbsp;
                                  {item[0].userDetails?.stateDetails?.[0]?.state +
                                    ', ' +
                                    item[0].userDetails?.zip}
                                  {/* 255 West Baker St. */}
                                  {/* <br /> Dallas TX, USA 118098 */}
                                </div>
                              </div>
                            </div>
                            <div className="d-flex align-items-center flex__1 mb-1 mb-sm-0 justify-content-end">
                              {/* {
                            item.type === 'Donated' &&

                            <>
                              <div className="pe-1 p-sm-2 mr-12p">
                                <img
                                  loading="lazy"
                                  width={36}
                                  src=""
                                  alt=""
                                />
                              </div>
                              <div>
                                <div>
                                  <Button variant="link" className=" px-0 py-3p">
                                    Donated
                                  </Button>
                                </div>
                 
                              </div>
                            </>
                          } */}
                              {item.length === 1 && (
                                // <div className="d-flex align-items-center flex__1 mb-1 mb-sm-0">
                                //   <div className="pe-1 p-sm-2 mr-12p">
                                //     <img
                                //       loading="lazy"
                                //       width={36}
                                //       src={helper.CampaignProductImagePath + item.orderItemDetails?.productImage}
                                //       alt=""
                                //     />
                                //   </div>
                                //   <div>
                                //     <div>
                                //       <Button variant="link" className=" px-0 py-3p">
                                //         {item.orderItemDetails?.productName}
                                //       </Button>
                                //     </div>
                                //     <div className="text-light fs-7">
                                //       <FontAwesomeIcon
                                //         icon={regular("wallet")}
                                //         className="mr-3p"
                                //       />
                                //       Bought {item.orderItemDetails?.quantity}
                                //     </div>
                                //   </div>
                                // </div>

                                <div className="d-flex align-items-center flex__1 mb-1 mb-sm-0">
                                  <div className="pe-1 p-sm-2 mr-12p">
                                    <img
                                      width={36}
                                      // src={helper.CampaignProductImagePath + item.orderItemDetails?.productImage}
                                      src={
                                        item[0].type === 'Purchased'
                                          ? helper.CampaignProductImagePath +
                                            item[0]?.orderItemDetails?.productImage
                                          : donation
                                      }
                                      alt=""
                                    />
                                  </div>
                                  <div>
                                    <div>
                                      <div
                                        className="fw-bold fs-6 px-0 py-3p"
                                      >
                                        {/* {item.orderItemDetails?.productName} */}
                                        {item[0].type === 'Purchased'
                                          ? item[0].orderItemDetails?.productName
                                          : 'Donation'}
                                      </div>
                                    </div>
                                    <div className="text-light fs-7">
                                      {/* <FontAwesomeIcon
                                    icon={regular("wallet")}
                                    className="mr-3p"
                                  />
                                  Bought {item.orderItemDetails?.quantity} */}
                                      {item[0].type === 'Purchased' ? (
                                        <>
                                          <FontAwesomeIcon
                                            icon={regular('wallet')}
                                            className="mr-3p"
                                          />
                                          Bought {item[0].orderItemDetails?.quantity}
                                        </>
                                      ) : (
                                        <>
                                          <FontAwesomeIcon
                                            icon={regular('heart')}
                                            className="mr-3p"
                                          />
                                          Donated
                                        </>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )}

                              {item[0].receipt ? (
                                <div
                                  className="d-flex align-items-center ms-sm-2 btn__wrap"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <Button
                                    size="large"
                                    variant="link"
                                    className="d-flex align-items-center p-0 text-decoration-none me-2"
                                  >
                                    <FontAwesomeIcon
                                      icon={solid('file-arrow-up')}
                                      className="text-success fs-3"
                                    />
                                    <div className="ps-2">
                                      <div className="file__name  mb-3p fw-normal">
                                        {item[0].receipt}
                                      </div>
                                      <div className="text-light fs-7 fw-normal">
                                        {/* 3 days ago - 1.3 Mb */}
                                        {moment(item[0].updated_at).fromNow()}
                                      </div>
                                    </div>
                                  </Button>
                                  <Dropdown className="d-flex ms-auto" autoClose="outside">
                                    <Dropdown.Toggle
                                      variant="link"
                                      className="no-caret text-decoration-none"
                                    >
                                      {loadingId.indexOf(`loadingDelete-${i}`) > -1 ? (
                                        <>
                                          <CircularProgress
                                            className="ms-2"
                                            id={`loadingDelete-${i}`}
                                            color="inherit"
                                            size={32}
                                          />
                                        </>
                                      ) : (
                                        <FontAwesomeIcon
                                          icon={regular('ellipsis-vertical')}
                                          className="text-light fs-3"
                                        />
                                      )}
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className="">
                                      <Dropdown.Item
                                        className="d-flex align-items-center p-2"
                                        onClick={() => viewItem(item[0])}
                                      >
                                        <span className="fw-bold fs-7 flex__1">View</span>
                                        <FontAwesomeIcon
                                          icon={solid('magnifying-glass')}
                                          className="ms-1"
                                        />
                                      </Dropdown.Item>
                                      <Dropdown.Divider />
                                      <Dropdown.Item
                                        className="d-flex align-items-center p-2"
                                        onClick={() => {
                                          deleteItem(item[0], i);
                                        }}
                                      >
                                        <span className="fw-bold fs-7 flex__1">Delete</span>
                                        <FontAwesomeIcon icon={regular('trash')} className="ms-1" />
                                      </Dropdown.Item>
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </div>
                              ) : (
                                <Button
                                  onClick={(e) => !props.loading && e.stopPropagation()}
                                  style={{ opacity: props.loading ? '0.7' : '1' }}
                                  variant="warning"
                                  className="d-flex align-items-center ms-auto text-white"
                                  disabled={props.loading}
                                >
                                  <FontAwesomeIcon icon={regular('clock')} className="me-1" />
                                  <input
                                    type="file"
                                    size="60"
                                    style={{ position: 'absolute', opacity: '0', width: '80px' }}
                                    onChange={(e) => {
                                      props.uploadImage(
                                        e,
                                        item[0].uniqueTransactionId,
                                        item[0].userDetails?.email,
                                        item[0].userDetails?.name,
                                        item[0].userDetails?._id
                                      );
                                      let tempArray = [...loadingId];
                                      tempArray.push(`loading-${i}`);
                                      setLoadingId([...tempArray]);
                                    }}
                                  />
                                  Upload
                                  {props.loading && loadingId.indexOf(`loading-${i}`) > -1 && (
                                    <CircularProgress
                                      id={`loading-${i}`}
                                      className="ms-2"
                                      color="inherit"
                                      size={12}
                                    />
                                  )}
                                </Button>
                              )}
                            </div>
                          </div>
                        </li>
                      }
                    >
                      <div className="container-fluid px-2">
                        {item.length > 1 &&
                          item.map((i1, k) => {
                            //Subtract the 2.9% from the subtotal to get actual amount sent to Charity:
                            let productTotal = i1.orderItemDetails?.totalPrice;
                            //let donationTotal = (i1.amount - 0.3) / 1.049;
                            let donationTotal = (i1.amount - 0.3) / 1.0499;
                            let taxableProduct = priceFormat(Number(productTotal));
                            let taxableDonation = priceFormat(Number(donationTotal));

                            let Aimg =
                              i1.type === 'Purchased'
                                ? helper.CampaignProductImagePath +
                                  i1.orderItemDetails?.productImage
                                : donation;

                            // console.log('li', i1)

                            let Name =
                              i1.type === 'Purchased'
                                ? i1.orderItemDetails?.productName
                                : 'Donation';
                            // console.log(item.type)
                            // if (item.type === 'Purchased') {

                            return (
                              <React.Fragment key={k}>
                                <li className="table__list-item table__list-item--tax py-1">
                                  <div className="d-flex d-sm-flex align-items-center flex-grow-1 ps-0 ps-sm-1">
                                    <div className="d-flex align-items-center mb-1 mb-sm-0 order-1 order-sm-0">
                                      <div className="admin__billing-value ms-2 ms-sm-0 me-sm-4">
                                        <div className="price fw-bold fs-5">
                                          {i1.currencySymbol}
                                          {i1.type === 'Purchased'
                                            ? taxableProduct
                                            : taxableDonation}
                                        </div>
                                        <div className="text-light fs-8">
                                          {moment(i1.created_at).fromNow()}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="d-flex align-items-center flex__1 mb-1 mb-sm-0">
                                      <div className="pe-1 p-sm-2 mr-12p">
                                        <img width={36} src={Aimg} alt="" />
                                      </div>
                                      <div>
                                        <div>
                                          <div className="fw-bold px-0 py-3p">
                                            {/* {i1.orderItemDetails?.productName} */}
                                            {Name}
                                          </div>
                                        </div>
                                        <div className="text-light fs-7">
                                          {i1.type === 'Purchased' ? (
                                            <>
                                              <FontAwesomeIcon
                                                icon={regular('wallet')}
                                                className="mr-3p"
                                              />
                                              Bought {i1.orderItemDetails?.quantity}
                                            </>
                                          ) : (
                                            <>
                                              <FontAwesomeIcon
                                                icon={regular('heart')}
                                                className="mr-3p"
                                              />
                                              Donated
                                            </>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                                {/* <hr /> */}
                              </React.Fragment>
                            );
                            // }
                          })}
                      </div>
                    </AccordionItem>
                  </Accordion>
                </>
              );
            })
          ) : (
            <>
              <li className="list__table-list p-2 mb-0">
                {props.loading ? (
                  <CircularProgress className="ms-2" color="inherit" size={32} />
                ) : (
                  <> No entries to show</>
                )}
              </li>
            </>
          )}
          <>
            <div
              className="list__table__footer py-2 d-flex justify-content-center border-top"
              style={{ background: '#f8fafd78' }}
            >
              {props.totalPages > 1 ? (
                <Stack spacing={2}>
                  <Pagination
                    pageSize={PageSize}
                    count={props.totalPages}
                    page={props.pageNo}
                    onChange={props.handleClick}
                    shape="rounded"
                    classes={{ ul: classes.ul }}
                    showFirstButton
                    showLastButton
                  />
                </Stack>
              ) : (
                <></>
              )}
            </div>
          </>
        </ul>
        <Modal size="lg" show={showModal && currentItem != null} onHide={onModalClose}>
          <Modal.Header>
            <Modal.Title>Tax Receipt</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container">
              {currentItem && currentItem.receipt && (
                <img
                  src={`${helper.recieptPath}${currentItem.receipt}`}
                  alt="tax-receipt"
                  className="img-fluid"
                />
              )}
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
};

export default AdminTaxTable;
