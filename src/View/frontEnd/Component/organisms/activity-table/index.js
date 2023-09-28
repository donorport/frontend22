import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import './style.scss';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '../../atoms/avatar';
import AvatarImg from '../../../../../assets/images/avatar.png';
import helper, { priceFormat, getCalculatedPrice } from '../../../../../Common/Helper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import moment from 'moment';
import wallet from '../../../../../assets/images/wallet.svg';
import speech from '../../../../../assets/images/speech-bubble.svg';
import donation from '../../../../../assets/images/donate.svg';
import CircularProgress from '@mui/material/CircularProgress';

const ActivityTable = (props) => {
  let activityList = props.activityList;
  const getC = getCalculatedPrice();
  const data = props.data;

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
        </div>
        <ul
          className="list-unstyled mb-0 list__table-list" /*style={{ maxHeight: activityList.length > 0 ? "600px" : "", minHeight: activityList.length > 0 ? "600px" : "" }}*/
        >
          {props.loading ? (
            <li className="py-2 mt-2 d-flex justify-content-center">
              <CircularProgress className="ms-1" color="inherit" size={32} />
            </li>
          ) : activityList.length > 0 ? (
            activityList.map((list, i) => {
              // console.log(list)
              return (
                <li className="table__list-item px-2 border-bottom">
                  <div className="d-sm-flex align-items-center flex-grow-1">
                    <div className="d-flex align-items-center me-sm-2 flex__1">
                      <div className="admin__billing-value ms-2 ms-sm-0 me-sm-4">
                        <div className="text-light fw-bold fs-5">
                          {list.type === 'BOUGHT' || list.type === 'DONATED'
                            ? data.symbol + priceFormat(list.amount)
                            : ''}
                        </div>
                        <div className="text-light fs-8">{moment(list.created_at).fromNow()}</div>
                      </div>
                      <div className="position-relative d-flex">
                        <Avatar
                          size={52}
                          avatarUrl={
                            list.userDetails?.image
                              ? helper.DonorImagePath + list.userDetails?.image
                              : AvatarImg
                          }
                          border={0}
                          shadow={false}
                          className="mr-12p donor_avatar_bg"
                        />
                      </div>
                      <div className="fw-bold flex__1">{list.userDetails?.name}</div>
                    </div>
                    <div className="w-200 d-flex align-items-center ms-sm-2">
                      {list.type === 'BOUGHT' ? (
                        <>
                          <span className="p-2 mr-12p">
                            <img width={36} alt="" className="img-fluid" src={wallet} />
                          </span>
                          <div className="">
                            <span className=" fw-bold">Bought</span>
                            <div className="d-flex text-light fs-7">
                              {/* <FontAwesomeIcon
                                    icon={regular("calendar-clock")}
                                    className="small me-1 fs-6"
                                  />
                                  / Month */}
                              {list?.info ? list?.info : ''}
                            </div>
                          </div>
                        </>
                      ) : list.type === 'Share' ? (
                        <>
                          <span className="p-2 mr-12p">
                            <img width={36} alt="" className="img-fluid" src={speech} />
                          </span>
                          <div className="">
                            <span className=" fw-bold">Followed</span>
                          </div>
                        </>
                      ) : list.type === 'FOLLOWED' ? (
                        <>
                          <span className="p-2 mr-12p">
                            <img width={36} alt="" className="img-fluid" src={speech} />
                          </span>
                          <div className="">
                            <span className=" fw-bold">Followed</span>
                          </div>
                        </>
                      ) : list.type === 'DONATED' ? (
                        <>
                          <span className="p-2 mr-12p">
                            <img width={36} alt="" className="img-fluid" src={donation} />
                          </span>
                          <div className="">
                            <span className=" fw-bold">Donation</span>
                            {/* <div className="d-flex text-light fs-7">
                                    <FontAwesomeIcon
                                      icon={regular("calendar-clock")}
                                      className="small me-1 fs-6"
                                    />
                                    / Month
                                  </div> */}
                          </div>
                        </>
                      ) : (
                        <></>
                      )}
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <li className="table__list-item p-2 fw-bold d-flex justify-content-center">
              No entries to show
            </li>
          )}

          {/* <li className="table__list-item p-2">
            <div className="d-sm-flex align-items-center flex-grow-1">
              <div className="d-flex align-items-center me-sm-2 flex__1">
                <div className="admin__billing-value ms-2 ms-sm-0 me-sm-2">
                  <div className="text-light fs-8">about a year ago</div>
                </div>
                <div className="position-relative d-flex">
                  <Avatar
                    size={62}
                    avatarUrl=''
                    border={0}
                    shadow={false}
                    className="mr-12p"
                  />
                </div>
                <div className="fw-bold flex__1">Trevor Gomer</div>
              </div>
              <div className="w-200 d-flex align-items-center ms-sm-2">
                <span className="p-2 mr-12p">
                  <img
                    width={36}
                    alt=""
                    className="img-fluid"
                    src=""
                  />
                </span>
                <div className="">
                  <span className=" fw-bold">Shared</span>
                </div>
              </div>
            </div>
          </li>
          <li className="table__list-item p-2">
            <div className="d-sm-flex align-items-center flex-grow-1">
              <div className="d-flex align-items-center me-sm-2 flex__1">
                <div className="admin__billing-value ms-2 ms-sm-0 me-sm-2">
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
                <div className="fw-bold flex__1">Jessica Hopper</div>
              </div>
              <div className="w-200 d-flex align-items-center ms-sm-2">
                <span className="p-2 mr-12p">
                  <img
                    width={36}
                    alt=""
                    className="img-fluid"
                    src=""
                  />
                </span>
                <div className="">
                  <span className=" fw-bold">Followed</span>
                </div>
              </div>
            </div>
          </li> */}
        </ul>
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
      </div>
    </>
  );
};

export default ActivityTable;
