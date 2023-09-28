import { Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

// import DefaultLayout from "@templates/default-layout";

import DefaultLayout from '../Component/templates/default-layout';

import './style.scss';

const Plans = (props) => {
  let basicData = props.basicData;
  let proData = props.proData;
  let enterpriseData = props.enterpriseData;

  return (
    <DefaultLayout>
      <div className="password-reset position-relative">
        <Container fluid className="position-relative pb-5 pt-5">
          <div className="mw-600 pb-2 mb-4">
            <h1 className=" fw-bolder mb-6p pt-2">Premium Plans</h1>
            <div className="fs-5 text-light mb-4 lh-1.5">
              Upgrade your organization's account to unlock more features including posting more
              items and creating more projects. You can cancel your plan at any time if you no
              longer require premium access to Donorport.
            </div>

            <div className="p-20p bg-lighter rounded d-inline-block">
              <span className=" fw-bolder me-3">Current Plan:</span>
              <Button variant="info" className="rounded-pill ms-2">
                Basic
                <FontAwesomeIcon icon={solid('cloud')} className="ms-1" />
              </Button>
            </div>
          </div>
          <Row className="mw-960">
            <Col md="4" className="plan__item text-center fs-5">
              <div className="d-flex flex-column">
                <div className="plan__left">
                  <div className="mx-auto mw-240">
                    <div
                      className="mb-2 fs-2 text-success fw-bolder"
                      style={{ textTransform: 'capitalize' }}
                    >
                      {basicData.price}
                    </div>
                    <div className="btn btn-info  px-4 rounded-pill mb-3">
                      Basic
                      <FontAwesomeIcon icon={solid('cloud')} className="ms-1" />
                    </div>
                    <div className="plan__info">
                      <div className="text-uppercase text-subtext mb-1">
                        New Accounts Start Here
                      </div>
                      <div className="text-info">
                        Free forever. Approved organizations can post and collect through Donorport
                      </div>
                    </div>
                  </div>
                </div>

                <div className="plan__right d-flex flex-column align-items-center">
                  <ul className="option__list list-unstyled text-start fs-6 px-20p py-2">
                    <li className="option__item py-12p">Post up to {basicData.post} items</li>
                    <li className="option__item py-12p">Create {basicData.project} project</li>
                    <li className="option__item py-12p">
                      Up to {basicData.keywords} item keywords
                    </li>
                    <li
                      className={
                        !basicData.dashboardStats
                          ? 'option__item py-12p disabled'
                          : 'option__item py-12p'
                      }
                    >
                      {!basicData.dashboardStats && 'No'} Dashboard Stats
                    </li>
                    <li
                      className={
                        !basicData.prioritySupport
                          ? 'option__item py-12p disabled'
                          : 'option__item py-12p'
                      }
                    >
                      {!basicData.prioritySupport && 'No'} Priority Support
                    </li>
                  </ul>
                  <Button variant="success" className="fs-6 fw-bold flex__1 w-200" size="lg">
                    Current
                  </Button>
                </div>
              </div>
            </Col>
            <Col md="4" className="plan__item text-center fs-5">
              <div className="d-flex flex-column">
                <div className="plan__left">
                  <div className="mx-auto mw-240">
                    <div className="mb-2 fs-2 text-success fw-bolder">
                      ${proData.price}
                      <span className="plans__term">/mo</span>
                    </div>
                    <div className="btn btn-warning  px-4 rounded-pill mb-3">
                      Pro
                      <FontAwesomeIcon icon={solid('medal')} className="ms-1" />
                    </div>
                    <div className="plan__info">
                      <div className="text-uppercase text-subtext mb-1">
                        PER MONTH BILLED ANNUALLY
                      </div>
                      <div className="text-info">Pro plans are for organizations looking to</div>
                    </div>
                  </div>
                </div>

                <div className="plan__right d-flex flex-column align-items-center">
                  <ul className="option__list list-unstyled text-start fs-6 px-20p py-2">
                    <li className="option__item py-12p">Post up to {proData.post} items</li>
                    <li className="option__item py-12p">Create up to {proData.project} projects</li>
                    <li className="option__item py-12p">Up to {proData.keywords} item keywords</li>
                    <li
                      className={
                        !proData.dashboardStats
                          ? 'option__item py-12p disabled'
                          : 'option__item py-12p'
                      }
                    >
                      {!proData.dashboardStats && 'No'} Dashboard Stats
                    </li>
                    <li
                      className={
                        !proData.prioritySupport
                          ? 'option__item py-12p disabled'
                          : 'option__item py-12p'
                      }
                    >
                      {!proData.prioritySupport && 'No'} Priority Support
                    </li>
                  </ul>
                  <Button variant="info" className="fs-6 fw-bold flex__1 w-200" size="lg">
                    Upgrade to Pro
                  </Button>
                </div>
              </div>
            </Col>
            <Col md="4" className="plan__item text-center fs-5">
              <div className="d-flex flex-column">
                <div className="plan__left">
                  <div className="mx-auto mw-240">
                    <div className="mb-2 fs-2 text-success fw-bolder">
                      ${enterpriseData.price}
                      <span className="plans__term">/mo</span>
                    </div>
                    <div className="btn bg-enterprise  px-4 rounded-pill mb-3">
                      Enterprises
                      <FontAwesomeIcon icon={solid('buildings')} className="ms-1" />
                    </div>
                    <div className="plan__info">
                      <div className="text-uppercase text-subtext mb-1">
                        PER MONTH BILLED ANNUALLY
                      </div>
                      <div className="text-info">
                        VIP lets you have more control over your posts and offers your greatest
                        bargain
                      </div>
                    </div>
                  </div>
                </div>

                <div className="plan__right d-flex flex-column align-items-center">
                  <ul className="option__list list-unstyled text-start fs-6 px-20p py-2">
                    <li className="option__item py-12p">Post up to {enterpriseData.post} items</li>
                    <li className="option__item py-12p">
                      Create up to {enterpriseData.project} projects
                    </li>
                    <li className="option__item py-12p">
                      Up to {enterpriseData.keywords} item keywords
                    </li>
                    <li
                      className={
                        !enterpriseData.dashboardStats
                          ? 'option__item py-12p disabled'
                          : 'option__item py-12p'
                      }
                    >
                      {!enterpriseData.dashboardStats && 'No'} Dashboard Stats
                    </li>
                    <li
                      className={
                        !enterpriseData.prioritySupport
                          ? 'option__item py-12p disabled'
                          : 'option__item py-12p'
                      }
                    >
                      {!enterpriseData.prioritySupport && 'No'} Priority Support
                    </li>
                  </ul>
                  <Button variant="info" className="fs-6 fw-bold flex__1 w-200" size="lg">
                    Update to Enterprise
                  </Button>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </DefaultLayout>
  );
};

export default Plans;
