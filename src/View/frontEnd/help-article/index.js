import { Button, Container, Form, Row, Col } from 'react-bootstrap';
import Sticky from 'wil-react-sticky';

import HeaderHelp from '../Component/organisms/header-help';
import HelpBanner from '../Component/molecules/help-banner';
import HelpContentFooter from '../Component/molecules/help-content-footer';
import Footer from '../Component/organisms/footer';
import Page from '../../../components/Page';
import './style.scss';

const HelpArticle = () => {
  return (
    <>
      <Page title="Donorport | Contact">
        <HeaderHelp />
        <div className="position-relative">
          <HelpBanner shortBanner={true} />

          <div className="py-1 bg-lighter">
            <div className="mw-960 mx-auto d-flex align-items-center">
              <a href="/help" className="breadcrumb-link text-dark">
                Home
              </a>
              <div className="breadcrumb-slash text-dark">/</div>
              <a
                href="/help-categories/non-profits-charities"
                className="breadcrumb-link text-dark"
              >
                Non-profits &amp; Charities
              </a>
              <div className="breadcrumb-slash text-dark">/</div>
              <a href="/article-link" className="breadcrumb-link text-dark">
                How often are payments disbursed to my Bank Account?
              </a>
            </div>
          </div>

          <Container fluid className="py-4" id="containerWrap">
            <div className="mw-960 mx-auto pt-3">
              <Row>
                <Col md="8">
                  <h1 className="text-dark fw-bolder d-flex align-items-center mb-3">
                    How often are payments disbursed to my Bank Account?
                  </h1>
                  <p className="text-dark lh-1.5">
                    <strong>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean sed diam
                      gravida, venenatis sapien eu, interdum nunc. Quisque et eleifend turpis. Duis
                      semper ipsum in velit mollis, at aliquam massa euismod. Pellentesque vel diam
                      ac urna egestas efficitur. Suspendisse fermentum nisi lacus, ut mattis dolor
                      ornare non. Duis ipsum enim, tempus venenatis nunc quis, convallis tempus
                      nulla. Curabitur facilisis velit vitae orci maximus rhoncus ut ut ante.
                      Aliquam erat volutpat. Proin laoreet bibendum sapien.
                    </strong>
                  </p>
                  <p className="text-light fs-5">
                    Integer vestibulum mi vel leo tristique, vitae interdum elit aliquam. Ut at
                    condimentum nisi, in efficitur nulla. Nunc finibus, justo id sodales rhoncus,
                    dolor sapien vestibulum orci, non bibendum nunc elit vitae tortor. Nulla mauris
                    tortor, mattis dignissim nisl ac, consectetur rhoncus lacus. Donec nec pharetra
                    lorem. Nam pellentesque porta nunc nec rhoncus. Maecenas porttitor, eros congue
                    venenatis convallis, justo odio ullamcorper mi, id accumsan mi quam in diam. Sed
                    vehicula, ex eget pellentesque fringilla, urna lorem lacinia massa, nec
                    fringilla leo erat vitae metus. Sed sit amet tristique libero. Fusce vel lorem
                    vitae mauris vestibulum porttitor. Praesent lacinia, nunc in mollis tristique,
                    nisi elit vulputate lacus, et lacinia massa lorem in turpis. Sed et mi non sem
                    cursus interdum. Sed molestie nulla vitae lacinia dapibus. Nullam lobortis sem
                    at mattis eleifend.
                  </p>

                  <h3 className="text-dark">Quisque consectetur</h3>
                  <p className="text-light fs-5">
                    Quisque consectetur magna in neque placerat porttitor semper at lacus. Phasellus
                    eu enim in elit luctus mattis. Duis volutpat arcu eget pulvinar congue. Maecenas
                    nec pulvinar diam. Donec sed est quis lectus dapibus mollis ultrices sed magna.
                    Nunc ultricies condimentum varius. Proin ornare lorem ex, eu pellentesque elit
                    tristique nec. Mauris quis bibendum odio, a tincidunt libero. Sed commodo tellus
                    cursus ex tempus, sed bibendum erat sodales. Quisque mi arcu, dapibus vitae
                    imperdiet a, lobortis vitae augue. Phasellus pharetra ullamcorper velit.
                    Phasellus ornare eu arcu vel ullamcorper. Donec dui tortor, eleifend nec
                    dignissim eu, rutrum vitae diam. Praesent dictum congue arcu, bibendum faucibus
                    ante tristique nec.
                  </p>

                  <h3 className="text-dark">Suspendisse ut</h3>
                  <p className="text-light fs-5">
                    Donec condimentum massa ut vulputate accumsan. Ut lacinia semper quam sed
                    convallis. Aliquam aliquam, mauris vitae varius viverra, nulla magna dapibus
                    justo, et bibendum dui lacus a dolor. Suspendisse ut tortor pretium, varius
                    mauris ac, posuere leo. Donec tempus lorem purus, a tristique enim tristique
                    eu.&nbsp;
                  </p>
                  <ul className="fs-5 mb-5">
                    <li>
                      <strong>Donec condimentum</strong>: Sed sit amet tristique libero. Fusce vel
                      lorem vitae mauris vestibulum porttitor. Praesent lacinia, nunc in mollis
                      tristique, nisi elit vulputate lacus
                    </li>
                    <li>
                      <strong>Ut lacinia</strong>: Sed sit amet tristique libero. Fusce vel lorem
                      vitae mauris vestibulum porttitor. Praesent lacinia, nunc in mollis tristique,
                      nisi elit vulputate lacus
                    </li>
                    <li>
                      <strong>Aliquam aliquam</strong>: Sed sit amet tristique libero. Fusce vel
                      lorem vitae mauris vestibulum porttitor. Praesent lacinia, nunc in mollis
                      tristique, nisi elit vulputate lacus
                    </li>
                    <li>
                      <strong>Suspendisse u</strong>t: Sed sit amet tristique libero. Fusce vel
                      lorem vitae mauris vestibulum porttitor. Praesent lacinia, nunc in mollis
                      tristique, nisi elit vulputate lacus
                    </li>
                  </ul>
                  <div className="video__frame mb-5">
                    <iframe
                      className="video__iframe"
                      src="https://www.youtube.com/embed/I2aNCNBz5D0"
                      scrolling="no"
                      title="lofi hip hop radio - beats to relax/study to"
                    ></iframe>
                  </div>

                  <div className="border border-2 p-3 d-inline-block">
                    <div className="form-check d-flex align-items-center mb-2">
                      <label className="form-check-label">
                        <Form.Check type="checkbox" className="text-info fs-4" />I found this
                        article helpful
                      </label>
                    </div>
                    <div className="form-check d-flex align-items-center mb-3">
                      <label className="form-check-label">
                        <Form.Check type="checkbox" className="text-info fs-4" />I did not find this
                        article helpful
                      </label>
                    </div>

                    <Button variant="info" size="lg" className="fs-6 fw-bold">
                      Submit
                    </Button>
                  </div>
                </Col>
                <Col md="4">
                  <Sticky offsetTop={120} containerSelectorFocus="#containerWrap">
                    <div className="bg-lighter p-20p">
                      <div className="fw-semibold text-dark fs-6 pb-2 border-bottom mb-2">
                        Related Articles
                      </div>
                      <ul className="list-unstyled fs-5">
                        <li className="mb-12p">
                          <a href="#" className="text-subtext d-block py-6p lh-1">
                            Managing your Admin account
                          </a>
                        </li>
                        <li className="mb-12p">
                          <a href="#" className="text-subtext d-block py-6p lh-1">
                            How to create an Organization account
                          </a>
                        </li>
                        <li className="mb-12p">
                          <a href="#" className="text-subtext d-block py-6p lh-1">
                            How to accept Crypto as a payment method
                          </a>
                        </li>
                        <li className="mb-12p">
                          <a href="#" className="text-subtext d-block py-6p lh-1">
                            How to set up your Bank Account to receive your donations
                          </a>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-primary p-20p text-white rounded mt-20p text-center mb-4">
                      <div className=" fw-semibold mb-20p">
                        Still can't find what you're looking for?
                      </div>
                      <Button
                        to="/help-contact"
                        variant="info"
                        size="lg"
                        className="btn-block fw-bold"
                      >
                        Submit a Request
                      </Button>
                    </div>
                  </Sticky>
                </Col>
              </Row>
            </div>
          </Container>

          <HelpContentFooter />
        </div>
        <Footer />
      </Page>
    </>
  );
};

export default HelpArticle;
