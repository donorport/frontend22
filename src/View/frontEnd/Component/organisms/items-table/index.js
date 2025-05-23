import { Button, ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import CircularProgress from '@mui/material/CircularProgress';
// import ListItemImg from "@components/atoms/list-item-img";
import ListItemImg from '../../atoms/list-item-img';
import './style.scss';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import moment from 'moment';
import helper, { priceFormat } from '../../../../../Common/Helper';
import receipt from '../../../../../assets/images/receipt.svg';

import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const ItemsTable = ({
  totalPages,
  pageNo,
  handleClick,
  orderItemList,
  handleSortingChange,
  order,
  sortField,
  onItemClick,
  isFetching
}) => {
  // console.log(orderItemList)
  const useStyles = makeStyles(() => ({
    ul: {
      // '& .MuiPaginationItem-root': {
      //   color: '#6f6f91 !important'
      // },
      // '& .MuiPaginationItem-root:hover': {
      //   background: '#f2f6fc !important'
      // },
      // '& .Mui-selected': {
      //   background: '#f2f6fc !important'
      // }
    }
  }));
  const classes = useStyles();

  return (
    <>
      <div className="list__table mb-2 mb-sm-0">
        <div className="list__table-sort d-flex justify-content-sort border-bottom">
          <div className="flex-grow-1">
            <Button
              variant="link"
              className="btn__sort px-0 text-decoration-none"
              onClick={() => handleSortingChange('created_at')}
            >
              Date
              {sortField === 'created_at' && order === 'asc' ? (
                <FontAwesomeIcon icon={solid('angle-up')} className="small ml-6p" />
              ) : (
                <FontAwesomeIcon icon={solid('angle-down')} className="small ml-6p" />
              )}
            </Button>
          </div>
          <Button variant="link" className="btn__sort px-0 text-decoration-none">
            Status
            <FontAwesomeIcon icon={solid('angle-down')} className="small ml-6p" />
          </Button>
        </div>
        <ul className="list-unstyled mb-0 list__table-list">
          {isFetching ? (
            <li className="history__list-item d-flex align-items-center justify-content-center p-5">
              <CircularProgress className="ms-1" color="inherit" size={32} />
            </li>
          ) : orderItemList.length > 0 ? (
            orderItemList.map((item, key) => {
              // console.log(item)
              // let price = Math.round(Number(item.productPrice) + (Number(item.appliedTaxPer) / 100) * Number(item.productPrice))
              // let price = priceFormat(Math.round(calculatedPrice.priceWithTax(Number(item.itemDetails.price))))
              let price =
                item.itemDetails.displayPrice * item.quantity
                  ? item.itemDetails.displayPrice * item.quantity
                  : item.itemDetails.price * item.quantity;

              return (
                <li className="table__list-item px-2 py-3" key={key}>
                  <div className="d-flex gap-3 align-items-start align-items-sm-center flex-grow-1">
                    <Button
                      variant="link"
                      onClick={() => onItemClick(key)}
                      className="gap-0 gap-sm-3 user__left flex-grow-1 flex-wrap-reverse flex-lg-nowrap d-flex justify-content-start align-items-start align-items-lg-center p-0 text-decoration-none text-start fw-normal"
                    >
                      <div className="d-flex flex-grow-1 align-items-center gap-3">
                        {' '}
                        <div className="flex-grow-1">
                          <h6 className="price">
                            {item.currencySymbol}
                            {priceFormat(price)}
                          </h6>
                          <div className="date text-light fs-7">
                            {moment(item.created_at).fromNow()}
                          </div>
                        </div>
                        <div className="position-relative">
                          <ListItemImg
                            size={68}
                            imgSrc={helper.CampaignProductImagePath + item.itemDetails?.image}
                          />
                        </div>
                      </div>

                      <div
                        className="flex-grow-1 flex-sm-0 whitespace-normal w-300"
                        style={{ whiteSpace: 'normal' }}
                      >
                        <h6 className="d-flex gap-1 mb-3p">
                          {/* <span>{item.quantity}</span> */}
                          {item.itemDetails?.headline}
                        </h6>
                        <Link className="fs-6 text-light" to={'/organization/' + item?.itemDetails?.organizationDetails?.slug}>
                          {item.itemDetails?.organizationDetails?.name}
                        </Link>
                        {/* <div className="fs-6 text-light">{item.itemDetails?.organizationDetails?.name}</div> */}
                      </div>
                    </Button>
                    <div className="d-flex align-items-center flex-grow-1">
                      <div className="d-flex align-items-center justify-content-around flex-grow-1 ms-lg-3">
                        <div
                          className="d-sm-flex d-none align-items-center progress__wrap me-2 flex-grow-1 gap-2"
                          style={{ maxWidth: '250px' }}
                        >
                          {!item.itemDetails?.unlimited && (
                            <span className="qty__tag pl-9p pb-3p pr-9p pt-3p me-1 fw-semibold">
                              {item.itemDetails?.soldout}/{item.itemDetails?.quantity}
                            </span>
                          )}
                          {!item.itemDetails?.unlimited ? (
                            <ProgressBar
                              variant="success"
                              now={Math.round(
                                (item.itemDetails?.soldout / item.itemDetails?.quantity) * 100
                              )}
                              className="flex-grow-1"
                            />
                          ) : (
                            <div
                              className="unlimited unlimited--home"
                              style={{ marginLeft: '10px' }}
                            >
                              <div className="tag tag--ongoing _2">
                                <div className="d-flex icon icon--unlimited">
                                  <FontAwesomeIcon
                                    className="text-secondary"
                                    icon={solid('infinity')}
                                  />
                                </div>
                              </div>
                            </div>
                          )}
                          {!item.itemDetails?.unlimited && (
                            <span className="ms-1 fw-semibold">
                              {Math.round(
                                (item.itemDetails?.soldout / item.itemDetails?.quantity) * 100
                              )}
                              %
                            </span>
                          )}
                        </div>

                        {/* <Button variant="link" className="ms-auto ms-sm-0 p-0 text-decoration-none">
                          <div className="d-flex align-items-center justify-content-center">
                            <img
                              className="img-fluid"
                              src={
                                helper.CampaignAdminLogoPath +
                                item.itemDetails?.organizationDetails?.logo
                              }
                              alt=""
                              style={{ maxHeight: '32px', maxWidth: '56px' }}
                            />
                          </div>
                        </Button> */}
                        {/* <Link to={'/organization/' + item?.itemDetails?.organizationDetails?.slug}>
                          <ListItemImg
                            size={[68]}
                            style={{ maxWidth: 'auto !important' }}
                            className="rounded-circle img--nobg mb-0 mb-sm-auto"
                            imgSrc={
                              helper.CampaignAdminLogoPath +
                              item.itemDetails?.organizationDetails?.logo
                            }
                          />
                        </Link> */}
                      </div>
                      {/* <div className="d-none d-sm-flex billing__buttons d-flex align-items-center gap-1">
                        {item.itemDetails?.tax && (
                          <span className="category__link p-1 text-decoration-none">
                            <img src={receipt}></img>
                          </span>
                        )}
                        {item.fulfilDetails.length > 0 && item.fulfilDetails[0]?.receipt && (
                          <span className="category__link p-1 text-decoration-none">
                            <FontAwesomeIcon
                              icon={solid('receipt')}
                              className="fs-3 text-success"
                            />
                          </span>
                        )}
                        {item.itemDetails.postTag && (
                          <span className="category__link p-1 text-decoration-none">
                            <FontAwesomeIcon
                              icon={solid('clock-rotate-left')}
                              className="fs-3"
                              color="rgb(148, 122, 218)"
                            />
                          </span>
                        )}
                        {item.fulfilDetails.length > 0 && item.fulfilDetails[0]?.video && (
                          <span className="category__link p-1 text-decoration-none">
                            <FontAwesomeIcon
                              icon={solid('clapperboard-play')}
                              className="fs-3 text-primary"
                            />
                          </span>
                        )}
                      </div> */}
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <li className="list__table-list p-2 mb-0">No entries to show</li>
          )}
        </ul>

        <div
          className="list__table__footer py-2 d-flex justify-content-center border-top"
          style={{ background: '#f8fafd78' }}
        >
          {totalPages > 1 ? (
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                page={pageNo}
                onChange={handleClick}
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
      </div>
    </>
  );
};

export default ItemsTable;
