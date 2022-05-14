import { Button, ProgressBar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid, regular } from "@fortawesome/fontawesome-svg-core/import.macro";

// import Avatar from "@components/atoms/avatar";
// import ListItemImg from "@components/atoms/list-item-img";


import Avatar from "../../atoms/avatar";
import ListItemImg from "../../atoms/list-item-img";
import moment from 'moment'
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import "./style.scss";



const ProjectsTable = (props) => {

  let projectList = props.projectList

  const countProjectProcess = (data) => {
    // console.log(data)
    let totalQArray = []
    let soldOutQArray = []
    let per = 0

    if (data.length > 0) {
      data.map((p, i) => {
        console.log(p.itemDetails)
        totalQArray.push(Number(p.itemDetails.quantity))
        soldOutQArray.push(Number(p.itemDetails.soldout))
      })

      const total = totalQArray.reduce((partialSum, a) => partialSum + a, 0);
      const soldout = soldOutQArray.reduce((partialSum, a) => partialSum + a, 0);


      per = soldout / total * 100
    } else {
      per = 0;

    }
    return Math.round(per);

  }

  return (
    <>
      <div className="projects__table list__table mb-5">
        <div className="list__table-sort d-flex justify-content-sort">
          <div className="flex__1">
            <Button
              variant="link"
              className="btn__sort px-0 text-decoration-none"
              onClick={() => props.handleSortingChange('created_at')}

            >
              Date
              {
                props.sortField === 'created_at' && props.order === 'asc' ?
                  <FontAwesomeIcon
                    icon={solid("angle-up")}
                    className="small ml-6p"
                  />
                  :
                  <FontAwesomeIcon
                    icon={solid("angle-down")}
                    className="small ml-6p"
                  />
              }
            </Button>
          </div>
          <Button
            variant="link"
            className="btn__sort px-0 text-decoration-none"
          >
            Status
            <FontAwesomeIcon
              icon={solid("angle-down")}
              className="small ml-6p"
            />
          </Button>
        </div>
        <ul className="list-unstyled mb-0 list__table-list" style={{ maxHeight: projectList.length > 1 ? "550px" :"", minHeight: projectList.length > 1 ? "550px" :"" }}>

          {
            projectList.length > 0 ?
              projectList.map((project, i) => {
                // console.log(project.productDetails)
                return (
                  <li className="table__list-item p-2" key={i}>
                    <div className="d-xl-flex align-items-center flex-grow-1">
                      <div className="billing__main d-flex align-items-center text-dark me-sm-3 mb-2">
                        <div className="ms-auto ms-sm-0 me-sm-2 post__value">
                          <div className="text-success fw-bold fs-5">$175</div>
                          <div className="text-light fs-8">{moment(project.created_at).fromNow()}</div>
                        </div>
                        <Avatar
                          size={62}
                          border={0}
                          shadow={false}
                          avatarUrl="https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/5f4ab31be9fe7d7453a60b1f_user.svg"
                        />
                        <div className="ms-2">
                          <div className="fw-bolder fs-5 mb-3p">{project.name}</div>
                        </div>
                      </div>

                      {
                        project.infinity ?
                          <div className="d-flex align-items-center flex__1 mb-2 mb-sm-0">
                            <div className="d-flex align-items-center flex__1 mw-200">
                              <ProgressBar variant="success" now={100} className="flex__1" />
                              <span className="text-light ms-1 fw-bold">Infinite</span>
                            </div>
                          </div>
                          :
                          <div className="d-flex align-items-center flex__1 mb-2 mb-sm-0">
                            <div className="d-flex align-items-center flex__1 mw-200">
                              <ProgressBar variant="success" now={countProjectProcess(project.productDetails)} className="flex__1" />
                              <span className="text-light ms-1 fw-bold">{countProjectProcess(project.productDetails)}%</span>
                            </div>
                          </div>

                      }

                      <div className="billing__buttons d-flex align-items-center">
                        <div className="ms-auto">
                          <Button variant="link" className="p-0" onClick={() => props.editProject(project)}>
                            <FontAwesomeIcon
                              icon={solid("edit")}
                              className="text-warning fs-2 me-2"
                            />
                          </Button>
                          <Button variant="link" className="p-0" onClick={() => props.deleteProject(project._id)}>
                            <FontAwesomeIcon
                              icon={solid("trash")}
                              className="text-danger fs-2 me-2"
                            />
                          </Button>
                          {
                            project.status === -1 &&
                            <Button variant="info" className="fw-bold" onClick={() => props.publishProject(project._id)}>
                              Publish
                            </Button>
                          }

                        </div>
                      </div>
                    </div>
                  </li>
                )
              })
              :
              <li className="table__list-item p-2 fw-bold d-flex justify-content-center">No entries to show</li>}


        </ul>
        {props.totalPages > 1 ?
          <div className="mt-5 d-flex justify-content-center mb-5">


            < Stack spacing={2} >
              <Pagination count={props.totalPages} variant="outlined" color="primary" page={props.pageNo} onChange={props.handleClick} />
            </Stack>

          </div> : <></>}
      </div>
    </>
  );
};

export default ProjectsTable;