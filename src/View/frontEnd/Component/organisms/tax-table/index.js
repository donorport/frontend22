import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import ListItemImg from '../../atoms/list-item-img';
import './style.scss';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import helper, { priceFormat } from '../../../../../Common/Helper';
import CSVExportBtn from '../../../CSVExportBtn';
import { Accordion, AccordionItem as Item } from '@szhsin/react-accordion';
import chevronDown from '../../../../../assets/images/chevron-down.svg';

const TaxTable = (props) => {
  const totalVal = (data) => {
    let tempSub = [];
    let sum;
    if (data.length > 0) {
      data.map((i, k) => {
        //tempSub.push(i.amount);
        let productTotal = i.orderItemDetails?.totalPrice;
        let donationTotal = (i.amount - 0.3) / 1.049;
        //let donationTotal = i.amount;
        let taxableProduct = priceFormat(Number(productTotal));
        let taxableDonation = priceFormat(Number(donationTotal));

        tempSub.push(i.type === 'Purchased' ? taxableProduct : taxableDonation);
      });
      sum = tempSub.reduce(function (a, b) {
        return parseFloat(a) + parseFloat(b);
        //return a + b;
      }, 0);
    } else {
      sum = 0;
    }
    //return priceFormat(sum);
    return sum.toFixed(2);
  };

  const AccordionItem = ({ header, buttonProps, hideChevron, ...rest }) => (
    <Item
      {...rest}
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
      <div className="list__table mb-2 mb-sm-0">
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
            </Button>
          </div>
          <Button
            variant="link"
            className="btn__sort px-0 text-decoration-none"
            onClick={() => props.handleSortingChange('receipt')}
          >
            Status
            {props.sortField === 'receipt' && props.order === 'asc' ? (
              <FontAwesomeIcon icon={solid('angle-up')} className="small ml-6p" />
            ) : (
              <FontAwesomeIcon icon={solid('angle-down')} className="small ml-6p" />
            )}
          </Button>
        </div>

        <ul className="list-unstyled mb-0 list__table-list">
          {props.taxList.length > 0 ? (
            props.taxList.map((item, i) => {
              const disableHeader = item.length === 1;
              return (
                <>
                  <Accordion allowMultiple>
                    <AccordionItem
                      hideChevron={disableHeader}
                      buttonProps={{ disabled: disableHeader }}
                      header={
                        <li className="flex-grow-1 table__list-item px-2 py-2">
                          <div className="d-sm-flex align-items-center flex-grow-1">
                            <div className="tax__left d-flex align-items-center me-sm-2 mb-1 mb-sm-0 ps-2 ps-sm-0">
                              <div className="admin__billing-value ms-2 ms-sm-0 me-sm-4 text-sm-start text-end">
                                <div className="text-light fw-bold fs-5">
                                  {item[0].currencySymbol}
                                  {priceFormat(totalVal(item))}
                                </div>
                                <div className="text-light fs-8">
                                  {moment(item[0].created_at).fromNow()}
                                </div>
                              </div>
                              <div className="position-relative d-flex mr-12p">
                                <ListItemImg
                                  size={68}
                                  imgSrc={
                                    helper.CampaignAdminLogoPath + item[0].organizationDetails?.logo
                                  }
                                  className="charity_avatar_bg"
                                />
                              </div>
                              <div className="ps-2 text__wrap text-start mw-200 w-100 w-sm-auto">
                                <div className="fw-bold fs-5">
                                  {item[0].organizationDetails?.name}
                                </div>
                                {item.length === 1 && (
                                  <div className="fs-7 text-light mb-6p">
                                    #{item[0].uniqueTransactionId}
                                  </div>
                                )}
                                {/* <div className="fs-7 text-light">
                              {item[0].userDetails.street + ' , ' + item[0].userDetails.cityDetails[0]?.city}
                              <br />
                              {item[0].userDetails.stateDetails[0]?.state + ' , ' + item[0].userDetails.countryDetails[0]?.country + ' , ' + item[0].userDetails.zip}
             
                            </div> */}
                              </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-end flex__1 mb-1 mt-2 mt-sm-0 mb-sm-0 ms-3 ms-sm-0">
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

                                <div className="d-flex align-items-center justify-content-end fs-6 fw-semibold me-auto">
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
                                      <Button variant="link" className="text-dark px-0 py-3p">
                                        {/* {item[0].orderItemDetails?.productName} */}
                                        {item[0].type === 'Purchased'
                                          ? item[0].orderItemDetails?.productName
                                          : 'Donation'}
                                      </Button>
                                    </div>
                                    <div className="text-light text-start fs-7">
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
                                <div className="d-flex align-items-center ms-sm-2 btn__wrap">
                                  {/* <Button
                                  variant="link"
                                  className="d-flex align-items-center p-0 text-decoration-none me-2"
                                >
                                  <FontAwesomeIcon
                                    icon={solid("file-arrow-up")}
                                    className="text-success fs-3"
                                  />
                                  <div className="ps-2">
                                    <div className="file__name text-dark mb-3p fw-normal">
                                      {item[0].receipt}
                                    </div>
                            
                                  </div>
                                </Button> */}
                                  <a
                                    onClick={(e) => e.stopPropagation()}
                                    href={helper.recieptPath + item[0].receipt}
                                    download
                                    variant="info"
                                    className="text-white fs-7 rounded-pill flex-grow-1 btn btn-info"
                                  >
                                    Download
                                  </a>
                                </div>
                              ) : (
                                // <Button variant="warning" className="d-flex align-items-center ms-auto text-white" >
                                //   <FontAwesomeIcon icon={regular("clock")} className="me-1" />
                                //   <input type="file" size="60" style={{ position: "absolute", opacity: "0" }} onChange={(e) => props.uploadImage(e, item[0].orderId, item[0].userDetails?.email, item[0].userDetails?.name, item[0].userDetails?._id)} />
                                //   Upload
                                // </Button>
                                <Button
                                  variant="link"
                                  className="d-flex align-items-center justify-content-end px-0 fw-semibold text-reset text-decoration-none"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  Waiting
                                  <FontAwesomeIcon
                                    icon={solid('clock')}
                                    className="fs-3 ms-1 text-warning"
                                  />
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
                            let donationTotal = i1.amount;
                            let taxableProduct = priceFormat(Number(productTotal));
                            let taxableDonation = priceFormat(Number(donationTotal));

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
                                  <div className="d-flex d-sm-flex align-items-center flex-grow-1">
                                    <div className="d-flex align-items-center mb-1 mb-sm-0 order-1 order-sm-0">
                                      <div className="admin__billing-value ms-2 ms-sm-0 me-sm-3 text-sm-start text-end">
                                        <div className="text-light fw-bold fs-5">
                                          {i1.currencySymbol}
                                          {/*{i1.amount}*/}
                                          {i1.type === 'Purchased'
                                            ? taxableProduct
                                            : taxableDonation}
                                        </div>
                                        <div className="text-light fs-8">
                                          {moment(i1.created_at).fromNow()}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-start flex__1 mb-1 mb-sm-0">
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
                                      {/* <div className="pe-1 p-sm-2 mr-12p">
                                    <div className="fs-7 text-light mb-6p">#{i1.uniqueTransactionId}</div>
                                    </div> */}
                                    </div>
                                    <div className="pe-1 p-sm-2 mr-12p">
                                      <div className="fs-7 text-light mb-6p">
                                        #{i1.uniqueTransactionId}
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
            <div className="d-sm-flex align-items-center justify-content-center flex-grow-1">
              <li className="table__list-item p-2">No Records to Display</li>
            </div>
          )}

          {/* <li className="table__list-item p-2">
            <div className="d-sm-flex align-items-center flex-grow-1">
              <div className="d-flex align-items-center flex__1 mb-2">
                <div className="order-2 order-sm-1 ms-2 ms-sm-0 me-sm-2">
                  <div className="text-success fw-bold fs-5">$10</div>
                  <div className="text-light fs-8">11 months ago</div>
                </div>
                <div className="order-1 order-sm-2 d-flex align-items-center text-dark flex__1">
                  <div className="position-relative">
                    <ListItemImg imgSrc="https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/5ef61d975395ccef43cbb71f_top.svg" />
                  </div>
                  <div className="d-sm-flex align-items-center flex__1 ms-2">
                    <div>
                      <div className="fw-bold fs-5 billing__name mb-6p">
                        Top Donor
                      </div>
                      <div className="text-light">#158329</div>
                    </div>
                    <span className="text-light fw-semibold flex__1">
                      <FontAwesomeIcon
                        icon={regular("heart")}
                        className="small me-1"
                      />
                      Donated
                    </span>
                  </div>
                </div>
              </div>
              <div className="d-flex align-items-center">
                <Button
                  variant="info"
                  className="text-white fs-7 rounded-pill flex-grow-1"
                >
                  Download
                </Button>
              </div>
            </div>
          </li> */}
        </ul>
        {props.totalPages > 1 && (
          <div
            className="py-2 mt-2 d-flex justify-content-center border-top"
            style={{ background: '#f8fafd78' }}
          >
            {props.totalPages > 1 ? (
              <Stack spacing={2}>
                <Pagination
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
        )}
      </div>

      {props.taxList.length > 0 && (
        <div className="mt-5 mb-5">
          <CSVExportBtn
            headers={props.headers}
            csvData={props.csvData}
            label="Export"
            prifix="_user_tax"
          />
        </div>
      )}
    </>
  );
};

export default TaxTable;
