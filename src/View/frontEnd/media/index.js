import { Button, Row, Container, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import DefaultLayout from '../Component/templates/default-layout';
import './style.scss';
import Page from '../../../components/Page';
import spacing from '../../../assets/images/grid.svg';
import logo from '../../../assets/images/logo.svg';
import full from '../../../assets/images/full-logo.svg';
import white from '../../../assets/images/full-logo(white).svg';

const Media = () => {
  return (
    <Page title="Donorport | Sponsors">
      <DefaultLayout>
        <div className="password-reset position-relative">
          <Container fluid className="position-relative pb-5 pt-5">
            <div className="mw-600">
              <h1 className="text-dark fw-bolder mb-6p pt-2">Media</h1>
              <div className="fs-5 text-light mb-4">
                If you’ve received permission to use our logo, product icons, or other trademarks,
                follow these guidelines.
              </div>

              {/* <div className="note note-info text-dark">
                We're excited to share Donorport with the world. If you're a member of the media and
                would like to know more about us, please get in touch with us at press@donorport.com
              </div>*/}
            </div>
            <div className="mb-3 pt-5">
              <h4 className="fw-bolder text-dark">Brand Assets</h4>
              <div className="fs-5 text-light mb-2">
                In most cases, you’re welcome to use our icons in your materials, but make sure to
                keep the relationship between our products truthful and clear.
              </div>
            </div>

            <Row className="mb-5">
              <Col md="6">
                <div className="media__box media__box--lg position-relative d-flex mt-1 p-3 justify-content-center align-items-center rounded border bg-lighter border-2 mw-400 mb-2 mb-sm-0">
                  <img src={spacing} alt="" className="img-fluid" />
                </div>
              </Col>
              <Col md="6" className="d-flex align-items-center">
                <div>
                  <div className="mb-4">
                    <div className="d-flex align-items-center">
                      <div className="media__icon flex-shrink-0 d-flex align-items-center justify-content-center me-2">
                        <FontAwesomeIcon icon={solid('check')} className="text-success me-0" />
                      </div>
                      <h4 className="fw-bolder mb-0 text-dark">Adhere to proper clear space</h4>
                    </div>
                    <div className="d-flex">
                      <div className="media__icon flex-shrink-0 me-2">&nbsp;</div>
                      <div className="text-dark">
                        The amount of clear space around our logo should be equal to or greater than
                        the height of the circle logo.
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <div className="d-flex align-items-center">
                      <div className="media__icon flex-shrink-0 d-flex align-items-center justify-content-center me-2">
                        <FontAwesomeIcon icon={solid('close')} className="text-danger me-0" />
                      </div>
                      <h4 className="fw-bolder mb-0 text-dark">Don’t overcrowd things</h4>
                    </div>
                    <div className="d-flex">
                      <div className="media__icon flex-shrink-0 me-2">&nbsp;</div>
                      <div className="text-dark">
                        Don’t crowd the logo with images, text, or other graphics that compromise
                        its impact.
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

            <h4 className="fw-bolder text-dark mb-1">Logo</h4>
            <div className="d-sm-flex align-items-center gap-3 mb-5">
              <div className="media__box position-relative d-flex p-3 justify-content-center align-items-center rounded border border-2 mb-2 mb-sm-0">
                <img src={full} alt="" className="img-fluid" />
                <div className="btn__wrap d-flex align-items-center justify-content-center">
                  <Button variant="info" size="lg" className="btn__download fw-bold">
                    Download
                  </Button>
                </div>
              </div>
              <div className="media__box position-relative d-flex p-3 justify-content-center align-items-center rounded border border-2 bg-black mb-2 mb-sm-0">
                <img src={white} alt="" className="img-fluid" />
                <div className="btn__wrap d-flex align-items-center justify-content-center">
                  <Button variant="info" size="lg" className="btn__download fw-bold">
                    Download
                  </Button>
                </div>
              </div>
              <div className="media__box position-relative d-flex p-3 justify-content-center align-items-center rounded border border-2">
                <img src={logo} alt="" className="img-fluid" />
                <div className="btn__wrap d-flex align-items-center justify-content-center">
                  <Button variant="info" size="lg" className="btn__download fw-bold">
                    Download
                  </Button>
                </div>
              </div>
            </div>

            <Button variant="primary" size="lg" className="fw-bold fs-6">
              Download Kit (3mb)
            </Button>
          </Container>
        </div>
      </DefaultLayout>
    </Page>
  );
};

export default Media;
