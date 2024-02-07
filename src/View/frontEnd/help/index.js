import { Button, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { light } from '@fortawesome/fontawesome-svg-core/import.macro';

// import { HeaderHelp, Footer } from "@components/organisms";
// import HelpBanner from "@components/molecules/help-banner";
// import HelpContentFooter from "@components/molecules/help-content-footer";
// import FAQ from "@components/molecules/faq";

import HelpBanner from '../Component/molecules/help-banner';
import HelpContentFooter from '../Component/molecules/help-content-footer';
import FAQ from '../Component/molecules/faq';
import Footer from '../Component/organisms/footer';
import HeaderHelp from '../Component/organisms/header-help';
import Page from '../../../components/Page';
import './style.scss';

const Help = () => {
  return (
    <Page title="Donorport | Help" description="Find answers to your questions about Donorport">
      <HeaderHelp />
      <div className="position-relative">
        <HelpBanner />
        <FAQ />
        {/* <Container fluid className="py-4">
          <div className="mw-960 mx-auto pt-3">
            <Row>
              <Col md="6" className="mb-2 mb-sm-3">
                <Button
                  variant="outline-white"
                  className="help__button d-flex border text-start py-2 w-100 fw-normal"
                >
                  <div className="d-flex flex-grow-1 align-items-center py-3p">
                    <FontAwesomeIcon icon={light('buildings')} className="text-info fs-2 pr-20p" />
                    <span className="flex__1 fs-4">Donorport</span>
                    <span className="text-info fs-5">See Articles&nbsp; →</span>
                  </div>
                </Button>
              </Col>
              <Col md="6" className="mb-2 mb-sm-3">
                <Button
                  variant="outline-white"
                  className="help__button d-flex border text-start py-2 w-100 fw-normal"
                >
                  <div className="d-flex flex-grow-1 align-items-center py-3p">
                    <FontAwesomeIcon
                      icon={light('circle-user')}
                      className="text-info fs-2 pr-20p"
                    />
                    <span className="flex__1 fs-4">Accounts & Billing</span>
                    <span className="text-info fs-5">See Articles&nbsp; →</span>
                  </div>
                </Button>
              </Col>
              <Col md="6" className="mb-2 mb-sm-3">
                <Button
                  variant="outline-white"
                  className="help__button d-flex border text-start py-2 w-100 fw-normal"
                >
                  <div className="d-flex flex-grow-1 align-items-center py-3p">
                    <FontAwesomeIcon
                      icon={light('heart-half-stroke')}
                      className="text-info fs-2 pr-20p"
                    />
                    <span className="flex__1 fs-4">Non-profits & Charities</span>
                    <span className="text-info fs-5">See Articles&nbsp; →</span>
                  </div>
                </Button>
              </Col>
              <Col md="6" className="mb-2 mb-sm-3">
                <Button
                  variant="outline-white"
                  className="help__button d-flex border text-start py-2 w-100 fw-normal"
                >
                  <div className="d-flex flex-grow-1 align-items-center py-3p">
                    <FontAwesomeIcon icon={light('bolt')} className="text-info fs-2 pr-20p" />
                    <span className="flex__1 fs-4">Projects</span>
                    <span className="text-info fs-5">See Articles&nbsp; →</span>
                  </div>
                </Button>
              </Col>
            </Row>
          </div>
        </Container> */}

        <HelpContentFooter />
      </div>
      <Footer />
    </Page>
  );
};

export default Help;
