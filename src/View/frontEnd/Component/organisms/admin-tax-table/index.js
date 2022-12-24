import { Button, Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular, light } from '@fortawesome/fontawesome-svg-core/import.macro';

// import Avatar from "@components/atoms/avatar";
// import AvatarImg from "@assets/images/avatar.jpeg";
import helper from '../../../../../Common/Helper';

import Avatar from '../../atoms/avatar';
import AvatarImg from '../../../../../assets/images/avatar.png';
import moment from 'moment';
import './style.scss';
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Accordion, AccordionItem as Item } from '@szhsin/react-accordion';
import chevronDown from '../../../../../assets/images/chevron-down.svg';
// import AvatarImg from "../../../assets/images/avatar.png";
let PageSize = 10;

const AdminTaxTable = (props) => {
  const taxList = props.taxList;

  const totalVal = (data) => {
    let tempSub = [];
    let sum;
    if (data.length > 0) {
      data.map((i, k) => {
        tempSub.push(i.amount);
      });
      sum = tempSub.reduce(function (a, b) {
        return a + b;
      }, 0);
    } else {
      sum = 0;
    }
    return sum.toFixed(2);
  };

  const AccordionItem = ({ header, buttonProps, hideChevron, ...rest }) => (
    <Item
      {...rest}
      header={({ state: { isEnter: expanded } }) => (
        <>
          {header}
          <div className="chev-wrapper">
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

  const useStyles = makeStyles(() => ({
    ul: {
      '& .MuiPaginationItem-root': {
        color: '#6f6f91 !important'
      },
      '& .MuiPaginationItem-root:hover': {
        background: '#f2f6fc !important'
      },
      '& .Mui-selected': {
        background: '#f2f6fc !important'
      }
    }
  }));
  const classes = useStyles();

  return (
    <>
      <div className="admin__tax-table list__table mb-4">
        <div className="list__table-sort d-flex justify-content-sort">
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
              const disableHeader = item.length === 1;
              return (
                <>
                  <Accordion allowMultiple>
                    <AccordionItem
                      className="py-2"
                      hideChevron={disableHeader}
                      buttonProps={{ disabled: disableHeader }}
                      header={
                        <li className="flex-grow-1 table__list-item px-2 py-2">
                          <div className="d-sm-flex align-items-center flex-grow-1">
                            <div className="d-flex align-items-center me-sm-2 mb-1 mb-sm-0">
                              <div className="admin__billing-value ms-2 ms-sm-0 me-sm-4">
                                <div className="text-light fw-bold fs-5">
                                  {item[0].currencySymbol}
                                  {totalVal(item)}
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
                                className="text__wrap ms-2 user-select-auto fs-7"
                                style={{ cursor: 'default' }}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <div className="fw-bold fs-5">{item[0].userDetails?.name}</div>
                                <div className="text-light mb-1">{item[0].userDetails?.email}</div>
                                <div className="text-light">
                                  {item[0].userDetails.street +
                                    ', ' +
                                    item[0].userDetails.cityDetails[0]?.city}
                                  {item[0].userDetails.stateDetails[0]?.state +
                                    ', ' +
                                    item[0].userDetails.zip}
                                  {/* 255 West Baker St. */}
                                  {/* <br /> Dallas TX, USA 118098 */}
                                </div>
                              </div>
                            </div>
                            <div
                              className="d-flex align-items-center flex__1 mb-1 mb-sm-0"
                              style={{ justifyContent: 'end' }}
                            >
                              {/* {
                            item[0].type === 'Donated' &&

                            <>
                              <div className="pe-1 p-sm-2 mr-12p">
                                <img
                                  loading="lazy"
                                  width={36}
                                  src="https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/60088347cb80b5186f9e1ead_donate.svg"
                                  alt=""
                                />
                              </div>
                              <div>
                                <div>
                                  <Button variant="link" className="text-dark px-0 py-3p">
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
                                //       src={helper.CampaignProductImagePath + item[0].orderItemDetails?.productImage}
                                //       alt=""
                                //     />
                                //   </div>
                                //   <div>
                                //     <div>
                                //       <Button variant="link" className="text-dark px-0 py-3p">
                                //         {item[0].orderItemDetails?.productName}
                                //       </Button>
                                //     </div>
                                //     <div className="text-light fs-7">
                                //       <FontAwesomeIcon
                                //         icon={regular("wallet")}
                                //         className="mr-3p"
                                //       />
                                //       Bought {item[0].orderItemDetails?.quantity}
                                //     </div>
                                //   </div>
                                // </div>

                                <div className="d-flex align-items-center flex__1 mb-1 mb-sm-0">
                                  <div className="pe-1 p-sm-2 mr-12p">
                                    <img
                                      loading="lazy"
                                      width={36}
                                      // src={helper.CampaignProductImagePath + item[0].orderItemDetails?.productImage}
                                      src={
                                        item[0].type === 'Purchased'
                                          ? helper.CampaignProductImagePath +
                                            item[0]?.orderItemDetails?.productImage
                                          : 'https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/60088347cb80b5186f9e1ead_donate.svg'
                                      }
                                      alt=""
                                    />
                                  </div>
                                  <div>
                                    <div>
                                      <Button
                                        onClick={(e) => e.stopPropagation()}
                                        variant="link"
                                        className="text-dark px-0 py-3p"
                                      >
                                        {/* {item[0].orderItemDetails?.productName} */}
                                        {item[0].type === 'Purchased'
                                          ? item[0].orderItemDetails?.productName
                                          : 'Donation'}
                                      </Button>
                                    </div>
                                    <div className="text-light fs-7">
                                      {/* <FontAwesomeIcon
                                    icon={regular("wallet")}
                                    className="mr-3p"
                                  />
                                  Bought {item[0].orderItemDetails?.quantity} */}
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

                              {item.length > 0 && item[0].receipt ? (
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
                                      <div className="file__name text-dark mb-3p fw-normal">
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
                                      <FontAwesomeIcon
                                        icon={regular('ellipsis-vertical')}
                                        className="text-light fs-3"
                                      />
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className="">
                                      <Dropdown.Item className="d-flex align-items-center p-2">
                                        <span className="fw-bold fs-7 flex__1">View</span>
                                        <FontAwesomeIcon
                                          icon={solid('magnifying-glass')}
                                          className="ms-1"
                                        />
                                      </Dropdown.Item>
                                      <Dropdown.Divider />
                                      <Dropdown.Item className="d-flex align-items-center p-2">
                                        <span className="fw-bold fs-7 flex__1">Delete</span>
                                        <FontAwesomeIcon icon={regular('trash')} className="ms-1" />
                                      </Dropdown.Item>
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </div>
                              ) : (
                                <Button
                                  onClick={(e) => e.stopPropagation()}
                                  variant="warning"
                                  className="d-flex align-items-center ms-auto text-white"
                                >
                                  <FontAwesomeIcon icon={regular('clock')} className="me-1" />
                                  <input
                                    type="file"
                                    size="60"
                                    style={{ position: 'absolute', opacity: '0' }}
                                    onChange={(e) =>
                                      props.uploadImage(
                                        e,
                                        item[0].uniqueTransactionId,
                                        item[0].userDetails?.email,
                                        item[0].userDetails?.name,
                                        item[0].userDetails?._id
                                      )
                                    }
                                  />
                                  Upload
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
                            let Aimg =
                              i1.type === 'Purchased'
                                ? helper.CampaignProductImagePath +
                                  i1.orderItemDetails?.productImage
                                : 'https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/60088347cb80b5186f9e1ead_donate.svg';

                            // console.log('li', i1)

                            let Name =
                              i1.type === 'Purchased'
                                ? i1.orderItemDetails?.productName
                                : 'Donation';
                            // console.log(item[0].type)
                            // if (item[0].type === 'Purchased') {

                            return (
                              <>
                                <li className="table__list-item table__list-item--tax py-1">
                                  <div className="d-sm-flex align-items-center flex-grow-1">
                                    <div className="d-flex align-items-center mb-1 mb-sm-0 order-1 order-sm-0">
                                      <div className="admin__billing-value ms-2 ms-sm-0 me-sm-4">
                                        <div className="text-light fw-bold fs-5">
                                          {i1.currencySymbol}
                                          {i1.amount.toFixed(2)}
                                        </div>
                                        <div className="text-light fs-8">
                                          {moment(i1.created_at).fromNow()}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="d-flex align-items-center flex__1 mb-1 mb-sm-0">
                                      <div className="pe-1 p-sm-2 mr-12p">
                                        <img loading="lazy" width={36} src={Aimg} alt="" />
                                      </div>
                                      <div>
                                        <div>
                                          <Button variant="link" className="text-dark px-0 py-3p">
                                            {/* {i1.orderItemDetails?.productName} */}
                                            {Name}
                                          </Button>
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
                              </>
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
              <li className="table__list-item p-2 fw-bold d-flex justify-content-center">
                No entries to show
              </li>
            </>
          )}
          <>
            {props.totalPages > 1 ? (
              <div
                className="py-2 mt-2 d-flex justify-content-center border-top"
                style={{ background: '#f8fafd78' }}
              >
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
              </div>
            ) : (
              <></>
            )}
          </>
          {/* <li className="table__list-item p-2">
            <div className="d-sm-flex align-items-center flex-grow-1">
              <div className="d-flex align-items-center me-sm-2 mb-1 mb-sm-0">
                <div className="admin__billing-value ms-2 ms-sm-0 me-sm-2">
                  <div className="text-success fw-bold fs-5">$5</div>
                  <div className="text-light fs-8">about a year ago</div>
                </div>
                <div className="position-relative d-flex">
                  <Avatar
                    size={62}
                    avatarUrl={AvatarImg}
                    border={0}
                    shadow={false}
                    className="mr-12p"
                  />
                </div>
                <div className="text__wrap mw-200">
                  <div className="fw-bolder fs-5">Jessica Hopper</div>
                  <div className="fs-7 text-light mb-6p">name@email.com</div>
                  <div className="fs-7 text-light">
                    255 West Baker St.
                    <br /> Dallas TX, USA 118098
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center flex__1 mb-1 mb-sm-0">
                <div className="pe-1 p-sm-2 mr-12p">
                  <img
                    loading="lazy"
                    width={36}
                    src="https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/6005ba4366767589aa5a9f09_5ecc698a8164c2821bc91f84_Classic_topview-500x392.png"
                    alt=""
                  />
                </div>
                <div>
                  <div>
                    <Button variant="link" className="text-dark px-0 py-3p">
                      Dinner Drive
                    </Button>
                  </div>
                  <div className="text-light fs-7">
                    <FontAwesomeIcon
                      icon={regular("wallet")}
                      className="mr-3p"
                    />
                    Bought 4
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center ms-sm-2 btn__wrap">
                <Button
                  variant="link"
                  className="d-flex align-items-center p-0 text-decoration-none me-2"
                >
                  <FontAwesomeIcon
                    icon={solid("file-arrow-up")}
                    className="text-success fs-3"
                  />
                  <div className="ps-2">
                    <div className="file__name text-dark mb-3p fw-normal">
                      receipt_92304.jpg
                    </div>
                    <div className="text-light fs-7 fw-normal">
                      3 days ago - 1.3 Mb
                    </div>
                  </div>
                </Button>
                <Dropdown className="d-flex ms-auto" autoClose="outside">
                  <Dropdown.Toggle
                    variant="link"
                    className="no-caret text-decoration-none"
                  >
                    <FontAwesomeIcon
                      icon={regular("ellipsis-vertical")}
                      className="text-light fs-3"
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="">
                    <Dropdown.Item className="d-flex align-items-center p-2">
                      <span className="fw-bold fs-7 flex__1">View</span>
                      <FontAwesomeIcon
                        icon={solid("magnifying-glass")}
                        className="ms-1"
                      />
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item className="d-flex align-items-center p-2">
                      <span className="fw-bold fs-7 flex__1">Edit</span>
                      <FontAwesomeIcon icon={light("pen")} className="ms-1" />
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item className="d-flex align-items-center p-2">
                      <span className="fw-bold fs-7 flex__1">Delete</span>
                      <FontAwesomeIcon
                        icon={regular("trash")}
                        className="ms-1"
                      />
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </li>
          <li className="table__list-item p-2">
            <div className="d-sm-flex align-items-center flex-grow-1">
              <div className="d-flex align-items-center me-sm-2 mb-1 mb-sm-0">
                <div className="admin__billing-value ms-2 ms-sm-0 me-sm-2">
                  <div className="text-success fw-bold fs-5">$5</div>
                  <div className="text-light fs-8">about a year ago</div>
                </div>
                <div className="position-relative d-flex">
                  <Avatar
                    size={62}
                    avatarUrl={AvatarImg}
                    border={0}
                    shadow={false}
                    className="mr-12p"
                  />
                </div>
                <div className="text__wrap mw-200">
                  <div className="fw-bolder fs-5">Jessica Hopper</div>
                  <div className="fs-7 text-light mb-6p">name@email.com</div>
                  <div className="fs-7 text-light">
                    255 West Baker St.
                    <br /> Dallas TX, USA 118098
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center flex__1 mb-1 mb-sm-0">
                <div className="pe-1 p-sm-2 mr-12p">
                  <img
                    loading="lazy"
                    width={36}
                    src="https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/6005ba4366767589aa5a9f09_5ecc698a8164c2821bc91f84_Classic_topview-500x392.png"
                    alt=""
                  />
                </div>
                <div>
                  <div>
                    <Button variant="link" className="text-dark px-0 py-3p">
                      Dinner Drive
                    </Button>
                  </div>
                  <div className="text-light fs-7">
                    <FontAwesomeIcon
                      icon={regular("wallet")}
                      className="mr-3p"
                    />
                    Bought 4
                  </div>
                </div>

                <Button variant="warning" className="d-flex align-items-center ms-auto text-white">
                  <FontAwesomeIcon icon={regular("clock")} className="me-1" />
                  Upload
                </Button>
              </div>
            </div>
          </li> */}
        </ul>
      </div>
    </>
  );
};

export default AdminTaxTable;
