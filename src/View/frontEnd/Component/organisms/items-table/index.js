import { Button, ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import CircularProgress from '@mui/material/CircularProgress';
// import ListItemImg from "@components/atoms/list-item-img";
import ListItemImg from '../../atoms/list-item-img';
import './style.scss';
import { makeStyles } from '@material-ui/core/styles';

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
          <div className="flex__1">
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
                <li className="table__list-item px-2 py-2" key={key}>
                  <div className="d-xl-flex align-items-center flex-grow-1">
                    <Button
                      variant="link"
                      onClick={() => onItemClick(key)}
                      className="user__left d-flex align-items-center  me-sm-3 p-0 text-decoration-none text-start fw-normal"
                    >
                      <div
                        className="me-0 me-sm-2 order-sm-0 order-1 text-sm-start text-end"
                        style={{ width: '65px', minWidth: '65px' }}
                      >
                        <div className="price fw-bold fs-5">
                          {item.currencySymbol}
                          {priceFormat(price)}
                        </div>
                        <div className="text-light fs-8">{moment(item.created_at).fromNow()}</div>
                      </div>
                      <div className="position-relative">
                        <ListItemImg
                          size={68}
                          imgSrc={helper.CampaignProductImagePath + item.itemDetails?.image}
                        />
                        <span className="badge list__img-badge" style={{ position: 'absolute' }}>
                          {item.quantity}
                        </span>
                      </div>
                      <div className="flex-grow-1 flex-sm-0 ms-2">
                        <h5 className="mb-3p">{item.itemDetails?.headline}</h5>
                        <div className="fs-6 text-light">{item.itemDetails?.brand}</div>
                      </div>
                    </Button>
                    <div className="d-flex align-items-center flex__1">
                      <div className="d-flex align-items-center flex__1 ms-sm-3 ms-0 mt-2 mt-sm-0">
                        <div
                          className="d-flex align-items-center progress__wrap me-2 flex__1 gap-2"
                          style={{ maxWidth: '250px' }}
                        >
                          {!item.itemDetails?.unlimited ? (
                            <span className="qty__tag pl-9p pb-3p pr-9p pt-3p me-1 fw-bold text-light">
                              {item.itemDetails?.soldout}/{item.itemDetails?.quantity}
                            </span>
                          ) : (
                            <></>
                          )}
                          <ProgressBar
                            variant={!item.itemDetails?.unlimited ? 'success' : 'infinity'}
                            now={
                              !item.itemDetails?.unlimited
                                ? Math.round(
                                    (item.itemDetails?.soldout / item.itemDetails?.quantity) * 100
                                  )
                                : 100
                            }
                            className="flex-grow-1"
                          />
                          {!item.itemDetails?.unlimited ? (
                            <span className="text-light ms-1 fw-bold">
                              {Math.round(
                                (item.itemDetails?.soldout / item.itemDetails?.quantity) * 100
                              )}
                              %
                            </span>
                          ) : (
                            <div
                              className="unlimited unlimited--home"
                              style={{ marginLeft: '10px' }}
                            >
                              <div className="tag tag--ongoing _2">
                                <div className="d-flex icon icon--unlimited">
                                  <FontAwesomeIcon icon={solid('infinity')} className="" />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        <Button
                          variant="link"
                          className="ms-auto ms-sm-0 p-0 text-decoration-none"
                        >
                          <div className="d-flex align-items-center justify-content-center">
                            <img
                              className="img-fluid"
                              src={
                                helper.CampaignAdminLogoPath +
                                item.itemDetails?.organizationDetails?.logo
                              }
                              alt=""
                              style={{maxHeight: '32px', maxWidth: '56px'}}
                            />
                          </div>
                        </Button>
                      </div>
                      <div className="d-none d-sm-flex billing__buttons d-flex align-items-center gap-1">
                        {item.itemDetails?.tax && (
                          <span className="category__link p-1 text-decoration-none">
                            {/* <FontAwesomeIcon icon={solid('paperclip')} className="fs-3 text-info" /> */}
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
                      </div>
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <li className="list__table-list p-2 mb-0">
              No entries to show
            </li>
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
