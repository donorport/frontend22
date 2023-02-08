import { Container, Row, Col } from 'react-bootstrap';

import './style.scss';

const HelpContentFooter = () => {
  return (
    <section className="py-5 bg-lighter boder-bottom border-top">
      <Container fluid>
        <Row className="mw-960 mx-auto">
          <Col md="6" className="border-sm-end py-4">
            <div className="d-flex align-items-center pe-sm-4 me-sm-2">
              <img
                src="https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/5f47d538de3696912011cd07_heart.svg"
                width="40"
                alt=""
                className="footer-icon me-5"
              />
              <div className="fs-5">
                <h4 className="fw-semibold mb-0">Can't find your answer?</h4>
                <p className="text-light mb-0 lh-1.5">
                  Get in touch and we’ll get back to you as soon as we can.&nbsp;
                  <a href="/help-contact" className="link">
                    Contact us.
                  </a>
                </p>
              </div>
            </div>
          </Col>
          <Col md="6" className="py-4">
            <div className="d-flex align-items-center ps-sm-4 ms-sm-2">
              <img
                src="https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/5f41dd615a9aef504bca8ef1_interface.svg"
                width="40"
                alt=""
                className="footer-icon me-5"
              />
              <div className="fs-5">
                <h4 className="fw-semibold mb-0">Policy questions?</h4>
                <p className="text-light mb-0 lh-1.5">
                  Take a look at our{' '}
                  <a href="/terms" className="link">
                    Terms of Service
                  </a>
                  and review our
                  <a href="/privacy" className="link">
                    Privacy Policy.
                  </a>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HelpContentFooter;
