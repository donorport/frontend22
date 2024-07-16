import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';

import ListItemImg from '../../atoms/list-item-img';
import './style.scss';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import helper from '../../../../../Common/Helper';

const XpTable = (props) => {
  let ItemList = props.ItemList;

  function getData(type, xp, data) {
    // console.log(data)
    let Res;
    let price = 0;
    switch (type) {
      case 'DONATED':
        // let Image = data.organizationDetails.logo;
        Res = (
          <div className="order-1 order-sm-2 d-flex align-items-center  me-sm-3 flex__1">
            <div className="position-relative">
              <ListItemImg
                size={68}
                imgSrc={helper.CampaignAdminLogoPath + data.organizationDetails.logo}
              />
            </div>

            <div className="d-sm-flex align-items-center flex__1 ms-2 gap-2">
              <h6 className="billing__name me-2">{data?.organizationDetails?.name}</h6>
              <span className="text-light fw-semibold flex__1">
                <FontAwesomeIcon icon={regular('heart')} className="small me-1" />
                Donated
              </span>
            </div>
            <div className="d-flex align-items-center">
              <h6 className="price  d-none d-sm-flex">
                {data.currencySymbol}
                {data.amount.toFixed(2)}
              </h6>
            </div>
          </div>
        );
        break;

      case 'BOUGHT':
        price = data.quantity * data.amount;
        Res = (
          <div className="order-1 order-sm-2 d-flex align-items-center  me-sm-3 flex__1">
            <div className="position-relative">
              <ListItemImg
                size={68}
                imgSrc={helper.CampaignProductImagePath + data?.productDetails?.image}
              />
            </div>

            <div className="d-sm-flex align-items-center flex__1 ms-2 gap-2">
              <h6 className="billing__name me-2">{data?.productDetails?.headline}</h6>
              <span className="text-light fw-semibold flex__1">
                <FontAwesomeIcon icon={regular('bag-shopping')} className="small me-1" />
                Bought {data.quantity}
              </span>
            </div>
            <div className="d-flex align-items-center">
              <h6 className="price  d-none d-sm-flex">
                {data.currencySymbol}
                {price.toFixed(2)}
              </h6>
            </div>
          </div>
        );
        break;

      case 'FOLLOWED':
        Res = (
          <div className="order-1 order-sm-2 d-flex align-items-center  me-sm-3 flex__1">
            <div className="position-relative">
              <ListItemImg
                size={68}
                imgSrc={helper.CampaignAdminLogoPath + data.organizationDetails.logo}
              />
            </div>

            <div className="d-sm-flex align-items-center flex__1 ms-2 gap-2">
              <h6 className="billing__name me-2">{data?.organizationDetails?.name}</h6>
              <span className="text-light fw-semibold flex__1">
                <FontAwesomeIcon icon={regular('heart')} className="small me-1" />
                Followed
                {/* Bought {data.quantity} */}
              </span>
            </div>
            <div className="d-flex align-items-center">
              {/* <span className="text-success ">{data.currencySymbol}{data.amount}</span> */}
            </div>
          </div>
        );
        break;

      default:
    }
    return Res;
  }

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
            onClick={() => props.handleSortingChange('amount')}
          >
            XP Earned
            {props.sortField === 'amount' && props.order === 'asc' ? (
              <FontAwesomeIcon icon={solid('angle-up')} className="small ml-6p" />
            ) : (
              <FontAwesomeIcon icon={solid('angle-down')} className="small ml-6p" />
            )}
          </Button>
        </div>
        <ul className="list-unstyled mb-0 list__table-list">
          {ItemList.length > 0 ? (
            ItemList.map((item, i) => {
              return (
                <li className="table__list-item px-2 py-3">
                  <div className="d-flex align-items-center flex-grow-1">
                    <div
                      className="order-2 order-sm-1 me-2 text-sm-start text-end"
                      style={{ width: '65px' }}
                    >
                      <h6 className="text-info">{item.xp}XP</h6>
                      <div className="text-light fs-7">{moment(item.created_at).fromNow()}</div>
                    </div>
                    {getData(item.type, item.xp, item)}

                    {/* <div className="order-1 order-sm-2 d-flex align-items-center  me-sm-3 flex__1">
                        <div className="position-relative">
                          <ListItemImg imgSrc=" />
                        </div>

                        <div className="d-sm-flex align-items-center flex__1 ms-2 gap-2">
                          <div className="billing__name me-2">Top Donor</div>
                          <span className="text-light fw-semibold flex__1">
                            <FontAwesomeIcon
                              icon={regular("heart")}
                              className="small me-1"
                            />Donated
                          </span>
                        </div>
                        <div className="d-flex align-items-center">
                          <span className="text-success ">$400</span>
                        </div>
                      </div> */}
                  </div>
                </li>
              );
            })
          ) : (
            // <li className="table__list-item p-2">
            //   <div className="d-flex align-items-center flex-grow-1">
            //     <div className="order-2 order-sm-1 ms-2 ms-sm-0 me-sm-2">
            //       <div>90 XP</div>
            //       <div className="text-light fs-7">11 months ago</div>
            //     </div>
            //     <div className="order-1 order-sm-2 d-flex align-items-center  me-sm-3 flex__1">
            //       <div className="position-relative">
            //         <ListItemImg imgSrc="" />
            //       </div>
            //       <div className="d-sm-flex align-items-center flex__1 ms-2 gap-2">
            //         <div className="billing__name me-2">Social Chain</div>
            //         <span className="text-light fw-semibold flex__1">
            //           <FontAwesomeIcon
            //             icon={regular("shopping-bag")}
            //             className="small me-1"
            //           />Bought 7
            //         </span>
            //       </div>
            //       <div className="d-flex align-items-center">
            //         <span className="text-success ">$400</span>
            //       </div>
            //     </div>
            //   </div>
            // </li>
            // <li className="table__list-item p-2">
            //   <div className="d-flex align-items-center flex-grow-1">
            //     <div className="order-2 order-sm-1 ms-2 ms-sm-0 me-sm-2">
            //       <div>90 XP</div>
            //       <div className="text-light fs-7">11 months ago</div>
            //     </div>
            //     <div className="order-1 order-sm-2 d-flex align-items-center  me-sm-3 flex__1">
            //       <div className="position-relative">
            //         <ListItemImg imgSrc="" />
            //       </div>
            //       <div className="d-sm-flex align-items-center flex__1 ms-2 gap-2">
            //         <div className="billing__name me-2">Top Donor</div>
            //         <span className="text-light fw-semibold flex__1">
            //           <FontAwesomeIcon
            //             icon={regular("heart")}
            //             className="small me-1"
            //           />Donated
            //         </span>
            //       </div>
            //       <div className="d-flex align-items-center">
            //         <span className="text-success ">$400</span>
            //       </div>
            //     </div>
            //   </div>
            // </li>
            <li className="list__table-list p-2 mb-0">
              No entries to show
            </li>
          )}
        </ul>
        <div
          className="list__table__footer py-2 d-flex justify-content-center border-top"
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
      </div>
    </>
  );
};

export default XpTable;
