import { Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

// import DefaultLayout from "@templates/default-layout";
import DefaultLayout from '../Component/templates/default-layout';
import './style.scss';
import { Link } from 'react-router-dom';
import Page from '../../../components/Page';
import full from '../../../assets/images/mocklogo.png';

const Sponsors = () => {
  return (
    <Page title="Donorport | Sponsors" description="Partner with Donorport and show your customers you're a part of their community">
      <DefaultLayout>
        <div className="password-reset position-relative">
          <Container fluid className="position-relative pb-5 pt-5">
            <h1 className=" fw-bolder mb-6p pt-2">Sponsorships</h1>
            <div className="fs-5 text-light pb-5 mb-3 mw-600">
              Donorport teams up with top brands to promote the platform. Show your customers that
              you care about local communities by sponsoring a category.
            </div>

            <div className="d-flex flex-column align-items-start">
              <div className="d-flex align-items-center mb-5">
                <div className="p-12p rounded bg-lighter me-2">
                  <FontAwesomeIcon icon={solid('rectangle-ad')} className="text-info fs-3" />
                </div>
                <div className="sponsor__list d-flex flex-wrap align-items-center flex__1">
                  <div className="sponsor__item mb-2 mb-sm-0">
                    <a href="#" className="sponsor__link">
                      <img src={full} alt="" className="sponsor__logo" />
                    </a>
                  </div>
                </div>
              </div>

              <p className="fs-5 text-light pt-3 mb-5">
                By partnering with different suppliers, Donorport is able to expand its reach to
                serve more communities across the world! Interested in becoming a sponsor on
                Donorport?
              </p>

              {/*  <ul className="list-unstyled mb-0 ms-sm-3">
              <li className="d-flex align-items-center py-1">
                <div className="p-12p mr-12p">
                  <FontAwesomeIcon icon={solid('sailboat')} className="fs-3 text-primary" />
                </div>
                <div className="fs-5 text-light">
                  Donorport is selling ad space on every item page based on category & location. If
                  you want your brand to appear on an item page please click the Apply button below
                  and our team will work to find a solution that works for you.
                </div>
              </li>
              <li className="d-flex align-items-center py-1">
                <div className="p-12p mr-12p">
                  <FontAwesomeIcon icon={solid('anchor')} className="fs-3 text-primary" />
                </div>
                <div className="fs-5 text-light">
                  There is no limit to the number of categories and locations a brand may advertise
                  in.
                </div>
              </li>
              <li className="d-flex align-items-center py-1">
                <div className="p-12p mr-12p">
                  <FontAwesomeIcon icon={solid('circle-bolt')} className="fs-3 text-primary" />
                </div>
                <div className="fs-5 text-light">
                  Phase 2 of our sponsorship program will involve exclusive rights deals for
                  organizations & brands. If you would like to be an early adopter to our exclusive
                  rights program or would like to learn more, let us know by clicking the Apply
                  button below.
                </div>
              </li>
  </ul> */}
              <Link
                variant="info"
                size="lg"
                className="btn btn-lg btn-info fw-bold"
                to="/partnership"
              >
                Apply
              </Link>
            </div>
          </Container>
        </div>
      </DefaultLayout>
    </Page>
  );
};

export default Sponsors;
