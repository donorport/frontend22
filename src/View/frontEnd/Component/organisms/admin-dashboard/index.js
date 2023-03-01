import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';

//import AreaChart from "../../../../../assets/images/area-chart.jpg";
//import BarChart from "../../../../../assets/images/bar-chart.jpg";
//import PieChart from "../../../../../assets/images/piechart.jpg";

import { Col, Row, Button } from 'react-bootstrap';

import './style.scss';
import { Outlet, useOutletContext } from 'react-router-dom';
// import { useOutlet } from "react-router-dom";

const AdminDashboard = () => {
  // const context = useOutletContext();
  // console.log(context);

  // console.log(selectedTabKey)

  return (
    <>
      <header className="d-none d-sm-flex py-2 mb-3 w-100 d-flex align-items-center border-bottom">
        <h1 className="page__title mb-0 fs-3 fw-bolder me-2">Dashboard</h1>
        <div className="d-flex align-items-center me-2">
          <span className="tag__circle rounded-circle bg-warning me-1"></span>
          <span className="fw-bold fs-5">1</span>
        </div>

        <div className="d-flex align-items-center me-2">
          <FontAwesomeIcon icon={solid('folders')} className="fs-4 me-2" />
          <span className="fw-bold fs-5">2</span>
        </div>
        <span className="d-flex item__total-wrap d-flex">
          <FontAwesomeIcon icon={solid('money-bills-simple')} className="text-dark mr-12p fs-4" />
          USD $1,309.00
        </span>
        <Button variant="info" className="rounded-pill ms-auto">
          Free Plan <FontAwesomeIcon icon={solid('cloud')} className="ms-1" />
        </Button>
      </header>

      <Row>
        <Col md="6" className="mb-4">
          <div className="dash__section pe-md-2">
            <div className="d-flex align-items-center mb-2">
              <div className="d-flex align-items-center">
                <h2 className="dash__section__title mb-0">Stats</h2>
                <FontAwesomeIcon
                  icon={regular('chart-line')}
                  className="dash__icon text-light ms-1 fs-5"
                />
              </div>
              <div className="dash__controls justify-content-beween ms-auto">
                <Button variant="info" className="btn__xs rounded-pill">
                  <span className="fw-bold fs-7">Daily</span>
                </Button>
                <Button variant="info" className="btn__xs rounded-pill ms-1">
                  <span className="fw-bold fs-7">Monthly</span>
                </Button>
                <Button variant="info" className="btn__xs rounded-pill ms-1">
                  <span className="fw-bold fs-7">All</span>
                </Button>
              </div>
            </div>

            <div className="matrix">
              <div className="matrix__item">
                <div className="matrix__tag matrix__tag--sales">
                  <h6 className="mb-0 fw-bolder">Social</h6>
                  <h6 className="mb-0 fw-bolder">+ 12%</h6>
                </div>
              </div>
              <div className="matrix__item">
                <div className="matrix__tag matrix__tag--views">
                  <h6 className="mb-0 fw-bolder">Donations</h6>
                  <h6 className="mb-0 fw-bolder">+ 2</h6>
                </div>
              </div>
              <div className="matrix__item">
                <div className="matrix__tag matrix__tag--rank">
                  <h6 className="mb-0 fw-bolder">Items</h6>
                  <h6 className="mb-0 fw-bolder">+ 23</h6>
                </div>
              </div>
              <div className="matrix__item">
                <div className="matrix__tag matrix__tag--bounce">
                  <h6 className="mb-0 fw-bolder">Reach</h6>
                  <h6 className="mb-0 fw-bolder">+ 12%</h6>
                </div>
              </div>
            </div>
          </div>
        </Col>
        <Col md="6" className="mb-4">
          <div className="ps-md-2">
            <div className="d-flex align-items-center mb-2">
              <h2 className="dash__section__title mb-0">Interactions</h2>
              <FontAwesomeIcon
                icon={regular('computer-mouse')}
                className="dash__icon text-light ms-1 fs-5"
              />
            </div>
            {/* <div className="dash__chart">
              <img src={AreaChart} alt="" className="img-fluid" />
            </div> */}
          </div>
        </Col>
      </Row>
      <Row>
        <Col md="6" className="mb-4">
          <div className="pe-md-2">
            <div className="d-flex align-items-center mb-2">
              <h2 className="dash__section__title mb-0">Traffic</h2>
              <FontAwesomeIcon
                icon={regular('traffic-cone')}
                className="dash__icon text-light ms-1 fs-5"
              />
            </div>
            {/* <div className="dash__chart">
              <img src={BarChart} alt="" className="img-fluid" />
            </div> */}
          </div>
        </Col>
        <Col md="6" className="mb-4">
          <div className="ps-md-2">
            <div className="d-flex align-items-center mb-2">
              <h2 className="dash__section__title mb-0">Coverage</h2>
              <FontAwesomeIcon
                icon={regular('planet-moon')}
                className="dash__icon text-light ms-1 fs-5"
              />
            </div>
            <div className="dash__chart">
              <div className="text-light fs-7">
                Your contribution coverage over each category & location
              </div>
              {/* <div className="pie__chart text-center d-flex align-items-center">
                <img src={PieChart} alt="" className="img-fluid" />
              </div> */}
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default AdminDashboard;
