import { Button, ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';

// import Avatar from "@components/atoms/avatar";
// import ListItemImg from "@components/atoms/list-item-img";

import Avatar from '../../atoms/avatar';
import ListItemImg from '../../atoms/list-item-img';
import moment from 'moment';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import './style.scss';
import { makeStyles } from '@material-ui/core/styles';
import helper from '../../../../../Common/Helper';
import { Link } from 'react-router-dom';
import profile from '../../../../../assets/images/avatar.png';

const CrowdfundingsTable = (props) => {
  let crowdfundingList = props.crowdfundingList;

  // probably needs to take the list of donations, instead of products
  const countCrowdfundingProgress = (data, _goal) => {
    let totalAmount = data.reduce((acc, obj) => acc + obj.amount, 0);
    let goal = parseFloat(_goal);
    return Math.round((totalAmount / goal) * 100);
  };

  // probably needs to take the list of donations, instead of products
  const countCrowdfundingAmount = (productDetails) => {
    let totalQArray = [];
    let per = 0;

    if (productDetails.length > 0) {
      totalQArray = productDetails.map((p) => Number(p.itemDetails?.price));

      const total = totalQArray.reduce((partialSum, a) => partialSum + a, 0);
      per = total;
    }

    return Math.round(per);
  };

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
    <div className="projects__table list__table mb-2 mb-sm-0">
      <div className="list__table-sort d-flex justify-content-sort border-bottom">
        <div className="flex-grow-1">
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
        <Button variant="link" className="btn__sort px-0 text-decoration-none">
          Status
          <FontAwesomeIcon icon={solid('angle-down')} className="small ml-6p" />
        </Button>
      </div>
      <ul
        className="list-unstyled mb-0 list__table-list"
        style={
          {
            //maxHeight: crowdfundingList.length > 1 ? '550px' : '',
            // minHeight: crowdfundingList.length > 1 ? '550px' : ''
          }
        }
      >
        {crowdfundingList.length > 0 ? (
          crowdfundingList.map((crowdfunding, key) => {
            // console.log(crowdfunding)
            return (
              <CrowdfundingListItem
                key={key}
                crowdfunding={crowdfunding}
                data={props.data}
                countCrowdfundingAmount={countCrowdfundingAmount}
                countCrowdfundingProgress={countCrowdfundingProgress}
                editCrowdfunding={props.editCrowdfunding}
                deleteCrowdfunding={props.deleteCrowdfunding}
                publishCrowdfunding={props.publishCrowdfunding}
              />
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
  );
};

const CrowdfundingListItem = ({
  crowdfunding,
  data,
  countCrowdfundingAmount,
  countCrowdfundingProgress,
  editCrowdfunding,
  deleteCrowdfunding,
  publishCrowdfunding
}) => {
  const formattedGoal = crowdfunding?.goal
    ? Number(crowdfunding.goal).toLocaleString() // Convert to number and apply formatting
    : '0'; // Default to '0' if goal is not available
  console.log('CrowdfundingListItem:', { crowdfunding, imageDetails: crowdfunding.imageDetails });
  return (
    <li className="table__list-item px-2 py-3">
      <div className="d-xl-flex align-items-center flex-grow-1">
        <div className="billing__main d-flex align-items-center  me-sm-3 mb-2">
          <div className="ms-auto ms-sm-0 me-sm-2 post__value">
            {crowdfunding.status === -1 ? (
              <h6 className="post__status post__status--draft">DRAFT</h6>
            ) : null}
            {crowdfunding.status === 1 && (
              <h6 className="price ">
                {data?.symbol}
                {formattedGoal}
              </h6>
            )}
            <div className="date text-light fs-7">{moment(crowdfunding.created_at).fromNow()}</div>
          </div>
          <Avatar
            size={62}
            border={0}
            shadow={false}
            avatarUrl={
              crowdfunding.imageDetails.length > 0
                ? helper.CrowdfundingImagePath + crowdfunding.imageDetails[0].image
                : profile
            }
          />
          <div className="d-flex flex-column ms-2">
            <div className="fw-bolder fs-5 mb-3p">{crowdfunding.name}</div>
            <span className="d-flex gap-1 align-items-center">
              {/* <FontAwesomeIcon icon={regular('bullseye')} className="" /> */}
              <span>
                {data?.symbol}
                {formattedGoal}
              </span>
            </span>
            {crowdfunding.status === 1 && (
              <Link
                variant="link"
                className="mt-1 text-light p-0 fw-normal"
                to={'/crowdfunding/' + crowdfunding.slug}
              >
                <FontAwesomeIcon icon={regular('square-up-right')} className="me-1" /> Go to
                Fundraiser
              </Link>
            )}
          </div>
        </div>

        {crowdfunding.status === 1 ? (
          <div className="d-flex align-items-center flex-grow-1 mb-2 mb-sm-0">
            <div className="d-flex align-items-center flex-grow-1 mw-200">
              <ProgressBar
                variant="success"
                now={countCrowdfundingProgress(
                  crowdfunding?.donationsHistory || [],
                  crowdfunding?.goal || 0
                )}
                className="flex-grow-1"
              />
              <span className="ms-1 fw-semibold">
                {countCrowdfundingProgress(
                  crowdfunding?.donationsHistory || [],
                  crowdfunding?.goal || 0
                )}
                %
              </span>
            </div>
          </div>
        ) : (
          <div className="d-flex align-items-center flex-grow-1 mb-2 mb-sm-0"></div>
        )}

        <div className="billing__buttons d-flex align-items-center">
          <Button variant="link" className="p-0" onClick={() => editCrowdfunding(crowdfunding)}>
            <FontAwesomeIcon icon={solid('edit')} className="text-warning fs-2 me-2" />
          </Button>
          <Button
            variant="link"
            className="p-0"
            onClick={() => deleteCrowdfunding(crowdfunding._id)}
          >
            <FontAwesomeIcon icon={solid('trash')} className="text-danger fs-2 me-2" />
          </Button>
          {crowdfunding.status === -1 && (
            <Button
              variant="info"
              size="md"
              className="fw-bold"
              onClick={() => publishCrowdfunding(crowdfunding._id, crowdfunding)}
            >
              Publish
            </Button>
          )}
        </div>
      </div>
    </li>
  );
};

export default CrowdfundingsTable;
