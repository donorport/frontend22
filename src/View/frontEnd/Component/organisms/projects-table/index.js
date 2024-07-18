import { Button, ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import CircularProgress from '@mui/material/CircularProgress';
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

const ProjectsTable = (props) => {
  let projectList = props.projectList;

  const countProjectProcess = (data) => {
    let allProductPer = [];

    let per = 0;

    if (data?.length > 0) {
      data.map((p, i) => {
        if (!p.itemDetails.unlimited) {
          let itm = (Number(p.itemDetails.soldout) / Number(p.itemDetails.quantity)) * 100;
          allProductPer.push(itm);
        } else {
          allProductPer.push(0);
        }
      });

      const total = allProductPer.reduce((partialSum, a) => partialSum + a, 0);
      per = total / allProductPer.length;
      per = Math.round(per);
    } else {
      per = 0;
    }
    return Math.round(per);
  };

  const countProjectAmount = (data) => {
    // console.log(data)
    let totalQArray = [];
    let soldOutQArray = [];
    let per = 0;

    if (data.length > 0) {
      data.map((p, i) => {
        // console.log(p.itemDetails)
        totalQArray.push(Number(p.itemDetails?.price));
        // soldOutQArray.push(Number(p.itemDetails.soldout))
      });

      const total = totalQArray.reduce((partialSum, a) => partialSum + a, 0);
      // const soldout = soldOutQArray.reduce((partialSum, a) => partialSum + a, 0);

      per = total;
    } else {
      per = 0;
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
    <>
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
            //maxHeight: projectList.length > 1 ? '550px' : '',
            minHeight: projectList.length > 1 ? '550px' : ''
          }}
        >
          {props.loading ? (
            <li className="py-2 mt-2 d-flex justify-content-center">
              <CircularProgress className="ms-1" color="inherit" size={32} />
            </li>
          ) : projectList.length > 0 ? (
            projectList.map((project, i) => {
              // console.log(project)
              return (
                <li className="table__list-item px-2 py-3" key={i}>
                  <div className="d-xl-flex align-items-center flex-grow-1">
                    <div className="billing__main d-flex align-items-center  me-sm-3 mb-2">
                      <div className="ms-auto ms-sm-0 me-sm-2 post__value">
                        {project.status === 1 && (
                          <h6 className="price ">
                            {props.data?.symbol}
                            {countProjectAmount(project.productDetails)}
                          </h6>
                        )}
                        <div className="date text-light fs-7">
                          {moment(project.created_at).fromNow()}
                        </div>
                      </div>
                      <Avatar
                        size={62}
                        border={0}
                        shadow={false}
                        avatarUrl={
                          project.imageDetails.length > 0
                            ? helper.ProjectImagePath + project.imageDetails[0].image
                            : profile
                        }
                      />
                      <div className="ms-2">
                        <div className="fw-bolder fs-5 mb-3p">{project.name}</div>

                        {project.status === 1 && (
                          <Link
                            variant="link"
                            className="text-light p-0 fw-normal"
                            to={'/project/' + project.slug}
                          >
                            <FontAwesomeIcon icon={regular('square-up-right')} className="me-1" />{' '}
                            Go to Project
                          </Link>
                        )}
                      </div>
                    </div>

                    {project.status === 1 ? (
                      project.infinity ? (
                        <div className="d-flex align-items-center flex__1 mb-2 mb-sm-0">
                          <div className="d-flex align-items-center flex__1 mw-200">
                            <ProgressBar variant="infinity" now={100} className="flex__1" />
                            {/* <span className="ms-1 fw-semibold">Infinite</span> */}
                            <div
                              className="unlimited unlimited--home"
                              style={{ marginLeft: '10px' }}
                            >
                              <div className="tag tag--ongoing _2">
                                <div className="d-flex icon icon--unlimited">
                                  <FontAwesomeIcon icon={solid('infinity')} />
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
                              now={countProjectProcess(project.productDetails)}
                              className="flex__1"
                            />
                            <span className="ms-1 fw-semibold">
                              {countProjectProcess(project.productDetails)}%
                            </span>
                          </div>
                        </div>
                      )
                    ) : (
                      <div className="d-flex align-items-center flex__1 mb-2 mb-sm-0"></div>
                    )}

                    <div className="billing__buttons d-flex align-items-center">
                      <div className="ms-auto">
                        <Button
                          variant="link"
                          className="p-0"
                          onClick={() => props.editProject(project)}
                        >
                          <FontAwesomeIcon
                            icon={solid('edit')}
                            className="text-warning fs-2 me-2"
                          />
                        </Button>
                        <Button
                          variant="link"
                          className="p-0"
                          onClick={() => props.deleteProject(project._id)}
                        >
                          <FontAwesomeIcon
                            icon={solid('trash')}
                            className="text-danger fs-2 me-2"
                          />
                        </Button>
                        {project.status === -1 && (
                          <Button
                            variant="info"
                            className="fw-bold"
                            onClick={() => props.publishProject(project._id, project)}
                          >
                            Publish
                          </Button>
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

export default ProjectsTable;
