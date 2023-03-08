import { Container } from 'react-bootstrap';
import DefaultLayout from '../Component/templates/default-layout';
import Page from '../../../components/Page';
import shake from '../../../assets/images/shake-hands.svg';
import star from '../../../assets/images/star.svg';
import file from '../../../assets/images/contract.svg';
import phone from '../../../assets/images/support.svg';

import './style.scss';

const Trust = () => {
  return (
    <Page title="Donorport | Trust">
      <DefaultLayout>
        <div className="password-reset position-relative">
          <Container fluid className="position-relative pb-5 pt-5">
            <div className="mw-800">
              <h1 className="text-dark fw-bolder mb-6p pt-2">Trust & Safety</h1>
              <div className="fs-5 text-light pb-5 mb-3">
                Feel confident choosing Donorport as your donation platform.
              </div>

              {/*  <div className="about__list d-flex align-items-center">
              <div className="about__item d-flex flex-column align-items-center justify-content-center fs-5 text-center pb-20p">
                <img
                  src=""
                  alt=""
                  className="about__img"
                />
                <div className="about__tag text-subtext mt-1 bg-lighter py-3p px-6p fs-7 rounded-sm">
                  Trusted
                </div>
              </div>
              <div className="about__item d-flex flex-column align-items-center justify-content-center fs-5 text-center pb-20p">
                <img
                  src=""
                  alt=""
                  className="about__img"
                />
                <div className="about__tag text-subtext mt-1 bg-lighter py-3p px-6p fs-7 rounded-sm">
                  Secure
                </div>
              </div>
              <div className="about__item d-flex flex-column align-items-center justify-content-center fs-5 text-center pb-20p">
                <img
                  src=""
                  alt=""
                  className="about__img"
                />
                <div className="about__tag text-subtext mt-1 bg-lighter py-3p px-6p fs-7 rounded-sm">
                  Transparent
                </div>
              </div>
              <div className="about__item d-flex flex-column align-items-center justify-content-center fs-5 text-center pb-20p">
                <img
                  src=""
                  alt=""
                  className="about__img"
                />
                <div className="about__tag text-subtext mt-1 bg-lighter py-3p px-6p fs-7 rounded-sm">
                  Professional
                </div>
              </div>
            </div>
  */}
              <ul className="list-unstyled mb-0 mb-sm-5">
                <li className="d-sm-flex align-items-center py-3">
                  <div className="trust__thumb-wrap text-center mr-0 mr-sm-20p">
                    <div className="trust__thumb d-flex align-items-center justify-content-center mb-20p">
                      <img src={shake} alt="" className="img-fluid" />
                    </div>
                    <div className="fs-4 fw-bolder text-dark">Established</div>
                  </div>
                  <div className="ms-3">
                    <div className="text-light fs-5 lh-1.5">
                      The Organizations that partner with Donorport are deeply rooted in their
                      communities and have established trust in their field of service. A proven
                      track record of success is one of the many indicators Donorport uses when
                      creating new partnerships on the platform.
                    </div>
                  </div>
                </li>
                <li className="d-sm-flex align-items-center py-3">
                  <div className="trust__thumb-wrap text-center mr-0 mr-sm-20p">
                    <div className="trust__thumb d-flex align-items-center justify-content-center mb-20p">
                      <img src={star} alt="" className="img-fluid" />
                    </div>
                    <div className="fs-4 fw-bolder text-dark">Top Rated</div>
                  </div>
                  <div className="ms-3">
                    <div className="text-light fs-5 lh-1.5">
                      Our users as passionate about their giving which is why we provide the most
                      organic and exciting way to donate without sacrificing trust and security.
                      Every organization Donorport partners with is legally recognized and operates
                      under strict ethical and inclusive standards.
                    </div>
                  </div>
                </li>
                <li>
                  <div className="trust__note py-2 px-20p note my-20p text-dark fs-6 w-100">
                    Donorport selects only the most trusted organizations to ensure the security of
                    your giving
                  </div>
                </li>
                <li className="d-sm-flex align-items-center py-3">
                  <div className="trust__thumb-wrap text-center mr-0 mr-sm-20p">
                    <div className="trust__thumb d-flex align-items-center justify-content-center mb-20p">
                      <img src={file} alt="" className="img-fluid" />
                    </div>
                    <div className="fs-4 fw-bolder text-dark">Hand-Selected</div>
                  </div>
                  <div className="ms-3 mb-4 mb-sm-0">
                    <div className="text-light fs-5 lh-1.5">
                      Donorport vets through every organization that wants to post on the platform
                      to ensure that every purchase is completed as intended. Our rigorous
                      application process ensures that only the most trusted organizations can post
                      on the platform.
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </Container>
          <div className="about__banner position-relative d-flex justify-content-center align-items-center border-top bg-lighter fs-5 text-center">
            <div className="about__text">
              We're here to help with any issues you may have, with a friendly&nbsp;
              <a href="#" className="link">
                customer support team&nbsp;
              </a>
              at your service 24/7.
            </div>
            <div className="about__bubble">
              <img src={phone} alt="" />
            </div>
          </div>
        </div>
      </DefaultLayout>
    </Page>
  );
};

export default Trust;
