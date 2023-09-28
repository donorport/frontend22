import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import Sticky from 'wil-react-sticky';

import HeaderHelp from '../Component/organisms/header-help';
import HelpBanner from '../Component/molecules/help-banner';
import HelpContentFooter from '../Component/molecules/help-content-footer';
import Footer from '../Component/organisms/footer';
import FAQ from '../Component/molecules/faq';
import Page from '../../../components/Page';
import './style.scss';

const HelpContact = () => {
  return (
    <>
      <Page title="Donorport | Help" description="Connect with a member of the Donorport team to get the support you need">
        <HeaderHelp />
        <div className="position-relative">
          <HelpBanner shortBanner={true} />
          <div className="py-1 bg-lighter">
            <div className="mw-960 mx-auto d-flex align-items-center">
              <a href="/help" className="breadcrumb-link ">
                Home
              </a>
              <div className="breadcrumb-slash ">/</div>
              <a
                href="/help-categories/non-profits-charities"
                className="breadcrumb-link "
              >
                Non-profits &amp; Charities
              </a>
              <div className="breadcrumb-slash ">/</div>
              <a href="/article-link" className="breadcrumb-link ">
                How often are payments disbursed to my Bank Account?
              </a>
            </div>
          </div>

          <Container fluid className="py-4" id="containerWrap">
            <div className="mw-960 mx-auto pt-3">
              <Row>
                <Col md="9">
                  <h1 className=" fw-bolder d-flex align-items-center mb-3">
                    Submit a request
                  </h1>
                  <Form className="pe-sm-5">
                    <Form.Group className="mb-3 flex__1">
                      <Form.Label className="fw-semibold  fs-6">Email Address</Form.Label>
                      <Form.Control type="email" size="lg" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group className="mb-3 flex__1">
                      <Form.Label className="fw-semibold  fs-6">
                        Category (optional)
                      </Form.Label>
                      <Form.Select aria-label="Default select example" size="lg">
                        <option>Select one...</option>
                        <option value="1">Account</option>
                        <option value="2">Mobile App</option>
                        <option value="3">Security</option>
                        <option value="4">Membership</option>
                      </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3 flex__1">
                      <Form.Label className="fw-semibold  fs-6">Subject</Form.Label>
                      <Form.Control type="text" size="lg" placeholder="Enter subject" />
                    </Form.Group>
                    <Form.Group className="mb-3 flex__1">
                      <Form.Label className="fw-semibold  fs-6">Message</Form.Label>
                      <Form.Control as="textarea" rows={10} placeholder="Enter message" />
                    </Form.Group>
                    <Button variant="info" size="lg" className="fw-bold fs-6">
                      Submit
                    </Button>
                  </Form>
                </Col>
                <Col md="3">
                  <Sticky offsetTop={120} containerSelectorFocus="#containerWrap">
                    <div className="bg-highlighted p-20p text-white rounded mt-20p text-center mb-3">
                      <div className=" fw-semibold mb-20p">
                        Still can't find what you need? Contact our team
                      </div>
                      <Button
                        variant="info"
                        href="mailto:support@donorport.com"
                        size="lg"
                        className="btn-block fw-bold"
                      >
                        Email Us
                      </Button>
                    </div>
                    <div className="bg-highlighted p-20p text-white rounded mt-20p text-center mb-3">
                      <div className=" fw-semibold mb-20p">or Call us:</div>
                      <div className="fw-semibold mb-20p">
                        <div>Toll Free Number</div>
                        <a href="tel:1-800-123-4567" className="text-white">
                          1-800-123-4567
                        </a>
                      </div>
                    </div>
                  </Sticky>
                </Col>
              </Row>
            </div>
          </Container>
          <FAQ />
          <HelpContentFooter />
        </div>
        <Footer />
      </Page>
    </>
  );
};

export default HelpContact;
