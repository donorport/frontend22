import { useState } from 'react';
import { Button, Row, Container, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import DefaultLayout from '../Component/templates/default-layout';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import './style.scss';
import Page from '../../../components/Page';
import spacing from '../../../assets/images/grid.svg';
import logo from '../../../assets/images/logo.svg';
import full from '../../../assets/images/full-logo.svg';
import white from '../../../assets/images/full-logo(white).svg';

/* eslint-disable global-require, import/no-dynamic-require */

const Media = () => {

  const onDownload = (fileName) => {
    const link = document.createElement('a');
    link.download = fileName;
    link.href = require(`../../../assets/images/${fileName}`).default;
    link.click();
  };

  const onDownloadKit = () => {
    const zip = new JSZip();

    const addFileToZip = (fileName, fileUrl) => {
      return fetch(fileUrl)
        .then((response) => response.blob())
        .then((blob) => {
          zip.file(fileName, blob);
        });
    };

    const files = [
      {
        fileName: 'full-logo.svg',
        fileUrl: require('../../../assets/images/full-logo.svg').default
      },
      {
        fileName: 'full-logo(white).svg',
        fileUrl: require('../../../assets/images/full-logo(white).svg').default
      },
      { fileName: 'logo.svg', fileUrl: require('../../../assets/images/logo.svg').default }
    ];

    const promises = files.map((file) => addFileToZip(file.fileName, file.fileUrl));

    Promise.all(promises)
      .then(() => {
        zip.generateAsync({ type: 'blob' })
          .then((blob) => {
            saveAs(blob, 'media-kit.zip');
          })
          .catch((error) => console.error(error));
      })
      .catch((error) => console.error(error));
  };
  
  return (
    <Page
      title="Donorport | Media"
      description="Share the Donorport brand with your customers, clients and community"
    >
      <DefaultLayout>
        <div className="password-reset position-relative">
          <Container fluid className="position-relative pb-5 pt-5">
            <div className="mw-600">
              <h1 className=" fw-bolder mb-6p pt-2">Media</h1>
              <div className="fs-5 text-light mb-4">
                If you’ve received permission to use our logo, product icons, or other trademarks,
                follow these guidelines.
              </div>

              {/* <div className="note note-info ">
                We're excited to share Donorport with the world. If you're a member of the media and
                would like to know more about us, please get in touch with us at press@donorport.com
              </div>*/}
            </div>
            <div className="mb-3 pt-5">
              <h4 className="fw-bolder ">Brand Assets</h4>
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
                      <h4 className="fw-bolder mb-0 ">Adhere to proper clear space</h4>
                    </div>
                    <div className="d-flex">
                      <div className="media__icon flex-shrink-0 me-2">&nbsp;</div>
                      <div>
                        The amount of clear space around our logo should be equal to or greater than
                        the height of the circle logo.
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="d-flex align-items-center">
                      <div className="media__icon flex-shrink-0 d-flex align-items-center justify-content-center me-2">
                        <FontAwesomeIcon icon={solid('close')} className="text-danger me-0" />
                      </div>
                      <h4 className="fw-bolder mb-0 ">Don’t overcrowd things</h4>
                    </div>
                    <div className="d-flex">
                      <div className="media__icon flex-shrink-0 me-2">&nbsp;</div>
                      <div>
                        Don’t crowd the logo with images, text, or other graphics that compromise
                        its impact.
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

            <h4 className="fw-bolder  mb-1">Logo</h4>
            <div className="d-sm-flex align-items-center gap-3 mb-5">
              <div className="media__box position-relative d-flex p-3 justify-content-center align-items-center rounded border border-2 mb-2 mb-sm-0">
                <img src={full} alt="" className="img-fluid" />
                <div className="btn__wrap d-flex align-items-center justify-content-center">
                  <Button
                    onClick={() => onDownload('full-logo.svg')}
                    variant="info"
                    size="lg"
                    className="btn__download fw-bold"
                  >
                    Download
                  </Button>
                </div>
              </div>
              <div className="media__box position-relative d-flex p-3 justify-content-center align-items-center rounded border border-2 bg-black mb-2 mb-sm-0">
                <img src={white} alt="" className="img-fluid" />
                <div className="btn__wrap d-flex align-items-center justify-content-center">
                  <Button
                    onClick={() => onDownload('full-logo(white).svg')}
                    variant="info"
                    size="lg"
                    className="btn__download fw-bold"
                  >
                    Download
                  </Button>
                </div>
              </div>
              <div className="media__box position-relative d-flex p-3 justify-content-center align-items-center rounded border border-2">
                <img src={logo} alt="" className="img-fluid" />
                <div className="btn__wrap d-flex align-items-center justify-content-center">
                  <Button
                    onClick={() => onDownload('logo.svg')}
                    variant="info"
                    size="lg"
                    className="btn__download fw-bold"
                  >
                    Download
                  </Button>
                </div>
              </div>
            </div>

            <Button onClick={onDownloadKit} variant="primary" size="lg" className="fw-bold fs-6">
              Download Kit
            </Button>
          </Container>
        </div>
      </DefaultLayout>
    </Page>
  );
};

export default Media;
