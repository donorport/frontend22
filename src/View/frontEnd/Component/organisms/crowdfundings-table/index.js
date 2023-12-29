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
  const countCrowdfundingProgress = (productDetails) => {
    let allProductPer = [];

    let per = 0;

    if (productDetails?.length > 0) {
      allProductPer = productDetails.map((p) => {
        if (p.itemDetails.unlimited) {
          return 0;
        }

        return (Number(p.itemDetails.soldout) / Number(p.itemDetails.quantity)) * 100;
      });

      const total = allProductPer.reduce((partialSum, a) => partialSum + a, 0);
      per = total / allProductPer.length;
    }

    return Math.round(per);
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
        <Button variant="link" className="btn__sort px-0 text-decoration-none">
          Status
          <FontAwesomeIcon icon={solid('angle-down')} className="small ml-6p" />
        </Button>
      </div>
      <ul
        className="list-unstyled mb-0 list__table-list"
        style={{
          //maxHeight: crowdfundingList.length > 1 ? '550px' : '',
          minHeight: crowdfundingList.length > 1 ? '550px' : ''
        }}
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
  console.log('CrowdfundingListItem:', { crowdfunding, imageDetails: crowdfunding.imageDetails });
  return (
    <li className="table__list-item px-2 py-2">
      <div className="d-xl-flex align-items-center flex-grow-1">
        <div className="billing__main d-flex align-items-center  me-sm-3 mb-2">
          <div className="ms-auto ms-sm-0 me-sm-2 post__value">
            {crowdfunding.status === 1 && (
              <div className="price fw-bold fs-5">
                {data?.symbol}
                {countCrowdfundingAmount(crowdfunding?.productDetails || [])}
              </div>
            )}
            <div className="text-light fs-8">{moment(crowdfunding.created_at).fromNow()}</div>
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
          <div className="ms-2">
            <div className="fw-bolder fs-5 mb-3p">{crowdfunding.name}</div>

            {crowdfunding.status === 1 && (
              <Link
                variant="link"
                className="text-light p-0 fw-normal"
                to={'/crowdfunding/' + crowdfunding.slug}
              >
                <FontAwesomeIcon icon={regular('square-up-right')} className="me-1" /> Go to
                Crowdfunding Campaign
              </Link>
            )}
          </div>
        </div>

        {crowdfunding.status === 1 ? (
          crowdfunding.infinity ? (
            <div className="d-flex align-items-center flex__1 mb-2 mb-sm-0">
              <div className="d-flex align-items-center flex__1 mw-200">
                <ProgressBar variant="infinity" now={100} className="flex__1" />
                {/* <span className="text-light ms-1 fw-bold">Infinite</span> */}
                <div className="unlimited unlimited--home" style={{ marginLeft: '10px' }}>
                  <div className="tag tag--ongoing _2">
                    <div className="d-flex icon icon--unlimited">
                      <FontAwesomeIcon icon={solid('infinity')} className="" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="d-flex align-items-center flex__1 mb-2 mb-sm-0">
              <div className="d-flex align-items-center flex__1 mw-200">
                <ProgressBar
                  variant="success"
                  now={countCrowdfundingProgress(crowdfunding?.productDetails || [])}
                  className="flex__1"
                />
                <span className="text-light ms-1 fw-bold">
                  {countCrowdfundingProgress(crowdfunding?.productDetails || [])}%
                </span>
              </div>
            </div>
          )
        ) : (
          <div className="d-flex align-items-center flex__1 mb-2 mb-sm-0"></div>
        )}

        <div className="billing__buttons d-flex align-items-center">
          <div className="ms-auto">
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
                className="fw-bold"
                onClick={() => publishCrowdfunding(crowdfunding._id, crowdfunding)}
              >
                Publish
              </Button>
            )}
          </div>
        </div>
      </div>
    </li>
  );
};

export default CrowdfundingsTable;
