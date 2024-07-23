import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Container, Row } from 'react-bootstrap';

import { Link, useNavigate } from 'react-router-dom';
import MarqueeList from '../Component/molecules/marquee-list';
import DefaultLayout from '../Component/templates/default-layout';
//import file from '../../../assets/images/contract.svg';
import ad1 from '../../../assets/images/ad1.svg';
import ad2 from '../../../assets/images/ad2.svg';
import ad3 from '../../../assets/images/ad3.png';
import ad4 from '../../../assets/images/ad4.svg';
import ad5 from '../../../assets/images/ad5.svg';
import ad6 from '../../../assets/images/ad6.svg';
import ad7 from '../../../assets/images/ad7.svg';
import emoji from '../../../assets/images/emoji.svg';
import building from '../../../assets/images/architectonic.svg';
import logo from '../../../assets/images/logo.svg';
//import hero from '../../../assets/images/hero.svg';
import bank from '../../../assets/images/bank.svg';
import donate from '../../../assets/images/donate.svg';
import box from '../../../assets/images/box.svg';
import list from '../../../assets/images/list.svg';
import stripe from '../../../assets/images/stripe.svg';
import mobile from '../../../assets/images/mobile.svg';
import bike from '../../../assets/images/bike.png';
import banana from '../../../assets/images/banana.png';
import nike from '../../../assets/images/nike.png';
import city from '../../../assets/images/city.svg';
import crypto1 from '../../../assets/images/crypto1.svg';
import crypto2 from '../../../assets/images/crypto2.svg';
import crypto3 from '../../../assets/images/crypto3.svg';
import Page from '../../../components/Page';

import './style.scss';

const About = (props) => {
  // console.log(props.campaignAdminList)
  const navigate = useNavigate();
  let video = 'https://www.youtube.com/watch?v=tKBEgyJWYjo';

  let videoid = video ? video.split('?v=')[1].split('&')[0] : '';
  let embedlink = video ? 'https://www.youtube.com/embed/' + videoid : '';

  return (
    <Page
      title="Donorport | About Us"
      description="Donate directly to the needs of the organization and help them fund all of their material needs."
    >
      <DefaultLayout className="about">
        <div className="section--abouthero section--design">
          <Container fluid>
            <Row>
              <Col md="4" className="mb-4 mb-sm-0">
                <div className="about__content-1">
                  <h3 className="fs-1 fw-bolder pt-3">A Donation Marketplace</h3>
                  <p className="text-light fw-regular mb-4 lh-1.5">
                    Charities list what they need, donors buy it, and the charity gets it. Our
                    platform gives you full transparency, so you decide where your money goes.
                  </p>
                  <div className="d-flex align-items-center gap-2 mb-2 pb-5">
                    <Button
                      onClick={() => navigate('/apply')}
                      variant="primary"
                      className="fw-bold fs-16 px-14"
                      size="lg"
                    >
                      Start Listing
                    </Button>
                    <Link to="/home" className="about-nobg w-bold fs-6 px-4">
                      Home
                    </Link>
                  </div>
                </div>
              </Col>
              <Col md="7" className="d-flex justify-content-center">
                <div className="w-100 mw-600 d-flex align-items-center  justify-content-sm-center">
                  {/* <img src={hero} className="img-fluid" alt="" /> */}
                  <div className="w-100 project-video-wrap">
                    <iframe
                      title="project-details-video"
                      key="project-details-video"
                      width="498"
                      height="280"
                      src={embedlink}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
        <Container fluid>
          {/* <h4 className="fs-1 fw-bolder text-center ">Our services</h4> */}
          <Row className="section--abouthero pt-0 pt-sm-5 mt-0 mt-sm-5 mb-5 pb-0 pb-sm-5">
            <Col md="6">
              <div className="d-none d-sm-flex align-items-center justify-content-sm-center">
                <img src={mobile} className="img-fluid" alt="" />
              </div>
            </Col>
            <Col md="6">
              <div>
                <div className="circle"></div>
                <div className="d-flex flex-column align-items-start ">
                  Your donations, all in one place
                </div>
                <h3 className="fs-1 fw-bolder  pt-3">Discover unique opportunities</h3>
                <p className="text-light mb-3 lh-1.5">
                  Browse categories and filter results based on your donation preferences. Our
                  geo-location system shows you posts from charities near you so you can support
                  your local organizations.
                </p>
              </div>
              <div className="d-flex align-items-center flex-wrap mw-600">
                <div className="page__circle d-flex align-items-center bg-lighter rounded-circle p-3 justify-content-center">
                  <img src={emoji} className="img-fluid" alt="" />
                </div>
                <div className="seperator flex__1"></div>
                <div className="page__circle d-flex align-items-center bg-lighter rounded-circle p-3 justify-content-center">
                  <img src={logo} className="img-fluid" alt="" />
                </div>
                <div className="seperator flex__1"></div>
                <div className="page__circle d-flex align-items-center bg-lighter rounded-circle p-3 justify-content-center">
                  <img src={building} className="img-fluid" alt="" />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <Row className="section--abouthero pt-0 pt-sm-5 mt-0 mt-sm-5 mb-5 pb-0 pb-sm-5">
            <Col md="6" className="pt-5">
              <div className="d-flex flex-column align-items-start">
                <div className="about__label d-flex flex-column align-items-start ">Donations</div>
                <h3 className="fs-1 fw-bolder  pt-3">Tangible Giving</h3>
                <p className="text-light mb-3 lh-1.5">
                  Charities are often asked what they need, not how much they need. Donorport allows
                  you to see these needs and provide the funding.
                </p>
              </div>
            </Col>
            <Col md="6">
              <div className="d-flex justify-content-center justify-content-sm-between mb-0 mb-sm-5 flex-wrap gap-5 gap-sm-0">
                <div className="bigcircle">
                  <img src={banana} className="img-fluid" alt="" />
                </div>
                <div className="bigcircle _2 bigcircle _2 mb-0 mb-sm-5">
                  <img src={bike} className="img-fluid" alt="" />
                </div>
                <div className="bigcircle">
                  <img src={nike} className="img-fluid" alt="" />
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <div className="section--abouthero pt-0 pt-sm-5 mt-0 mt-sm-5 mb-5 pb-0 pb-sm-5 row row section--cityscape">
          <img src={city} className="cityscape" alt="" />
          <Container fluid>
            <Row>
              <Col md="6" className="pt-5">
                <div>
                  <div className="about__label d-flex flex-column align-items-start ">
                    How it Works
                  </div>
                  <h3 className="fs-1 fw-bolder  pt-3">Transparent</h3>
                  <p className="text-light mb-3 lh-1.5">
                    A simple solution to the charity fundraising problem. Now you can see where your
                    money goes; hand pick from needs posted by hundreds of organizations.
                  </p>
                </div>
              </Col>
              <Col md="6"></Col>
            </Row>
          </Container>
          <Container fluid>
            <Row className="mt-5">
              <Col md="4" className="position-relative mb-5 mb-sm-0">
                <div className="d-flex justify-content-center mb-2">
                  <img src={box} className="about__step-icon" alt="" />
                </div>
                <h4 className="mb-1 fw-bolder  text-center">Charity creates a post</h4>
                <p className="text-light text-center fs-5">
                  An organziation creates a post for products they need.
                </p>
              </Col>
              <Col md="4" className="position-relative mb-5 mb-sm-0">
                <div className="d-flex justify-content-center mb-2">
                  <img src={donate} className="about__step-icon" alt="" />
                </div>
                <h4 className="mb-1 fw-bolder  text-center">Donors provide the funding</h4>
                <p className="text-light text-center fs-5">
                  Donors send funds to pay for the products posted by the organizations.
                </p>
              </Col>
              <Col md="4" className="position-relative">
                <div className="d-flex justify-content-center mb-2">
                  <img src={bank} className="about__step-icon" alt="" />
                </div>
                <h4 className="mb-1 fw-bolder  text-center">Charity buys the products</h4>
                <p className="text-light text-center fs-5">
                  The organizations use the funding provided by the donors to purchase the products.
                </p>
              </Col>
            </Row>
          </Container>
        </div>

        <Container fluid>
          <Row className="section--abouthero pt-0 pt-sm-5 mt-0 mt-sm-5 mb-5 pb-0 pb-sm-5 row row d-flex justify-content-between">
            <div className="ourbrand__item d-flex align-items-center justify-content-cente gap-1">
              <img src={ad1} className="img-fluid ourbrand__img" alt="" />
            </div>
            <div className="ourbrand__item d-flex align-items-center justify-content-center">
              <img src={ad2} className="img-fluid ourbrand__img" alt="" />
            </div>
            <div className="ourbrand__item d-flex align-items-center justify-content-center">
              <img src={ad3} className="img-fluid ourbrand__img" alt="" />
            </div>
            <div className="ourbrand__item d-flex align-items-center justify-content-center">
              <img src={ad4} className="img-fluid ourbrand__img" alt="" />
            </div>
            <div className="ourbrand__item d-flex align-items-center justify-content-center">
              <img src={ad5} className="img-fluid ourbrand__img" alt="" />
            </div>
            <div className="ourbrand__item d-flex align-items-center justify-content-center">
              <img src={ad6} className="img-fluid ourbrand__img" alt="" />
            </div>
            <div className="ourbrand__item d-flex align-items-center justify-content-center">
              <img src={ad7} className="img-fluid ourbrand__img" alt="" />
            </div>
          </Row>
        </Container>

        <section className="section--abouthero pb-0 pt-0 row">
          <Container fluid>
            <div className="p-5 rounded-5 bg-lighter">
              <Row>
                <Col md="7">
                  <div className="pe-sm-5 me-sm-4">
                    <h3 className="fs-1 fw-bolder ">Our Standard</h3>
                    <p className="text-light mb-3 lh-1.5">
                      Donorport promises to remain a platform for the people which is why we bring
                      you all types of content created by our approved non-profits & charities. We
                      approve non-profits.
                    </p>
                    <p className="fs-5 text-light lh-1.5">
                      To learn more check out our&nbsp;
                      <Link to="/home">
                        partnerships page.
                      </Link>
                    </p>
                  </div>
                </Col>
                <Col md="5">
                  <ul className="list-unstyled text-light">
                    <li className="d-flex align-items-center pt-2">
                      <div className="icon icon--shield">
                        <FontAwesomeIcon
                          icon={solid('shield-check')}
                          className="fs-3 me-1 text-success p-12p mr-12p"
                        />
                      </div>
                      <div>Charities keep 100% of your donation</div>
                    </li>
                    <li className="d-flex align-items-center pt-2">
                      <div className="icon icon--shield">
                        <FontAwesomeIcon
                          icon={solid('shield-check')}
                          className="fs-3 me-1 text-success p-12p mr-12p"
                        />
                      </div>
                      <div>Donorport never interferes with your donations</div>
                    </li>
                    <li className="d-flex align-items-center pt-2">
                      <div className="icon icon--shield">
                        <FontAwesomeIcon
                          icon={solid('shield-check')}
                          className="fs-3 me-1 text-success p-12p mr-12p"
                        />
                      </div>
                      <div>We will maintain your privacy and anonymity</div>
                    </li>
                  </ul>
                </Col>
              </Row>
            </div>
          </Container>
        </section>

        <Container fluid>
          <Row className="section--abouthero pt-0 pt-sm-5 mt-0 mt-sm-5 mb-5 pb-0 pb-sm-5">
            <Col md="6">
              <div className="d-flex align-items-center justify-content-center pe-sm-5 mb-5">
                <img src={list} className="mw-600 w-100 img-fluid" alt="" />
              </div>
            </Col>
            <Col md="6">
              <div className="d-flex flex-column align-items-start">
                <div className="about__label d-flex flex-column align-items-start ">
                  Tax Management
                </div>
                <h3 className="fs-1 fw-bolder  pt-3">Centralized Giving</h3>
                <p className="text-light mb-3 lh-1.5">
                  When you donate on Donorport, your tax receipts are uploaded directly to the
                  platform so you can view, download, and track all of your receipts for every
                  donation, each year.
                </p>
                <ul className="list-unstyled fs-5 text-light">
                  <li className="d-flex align-items-center pt-2">
                    <div className="icon icon--shield">
                      <FontAwesomeIcon
                        icon={solid('bolt')}
                        className="fs-3 me-1 text-primary p-12p mr-12p"
                      />
                    </div>
                    <span>All of your tax receipts in one place</span>
                  </li>
                  <li className="d-flex align-items-center pt-2">
                    <div className="icon icon--shield">
                      <FontAwesomeIcon
                        icon={solid('pencil')}
                        className="fs-3 me-1 text-primary p-12p mr-12p"
                      />
                    </div>
                    <span>View, download, review & share your receipts every year</span>
                  </li>
                  <li className="d-flex align-items-center pt-2">
                    <div className="icon icon--shield">
                      <FontAwesomeIcon
                        icon={solid('check')}
                        className="fs-3 me-1 text-primary p-12p mr-12p"
                      />
                    </div>
                    <span>Encrypted files maintain your privacy and security</span>
                  </li>
                </ul>
              </div>
            </Col>
          </Row>
        </Container>

        <Container fluid>
          <Row className="section--abouthero pb-0 pt-0">
            <Col md="6">
              <div className="d-flex flex-column align-items-start">
                <div className="about__label d-flex flex-column align-items-start ">
                  Payment Options
                </div>
                <h3 className="fs-1 fw-bolder  pt-3">Modern Solutions</h3>
                <p className="text-light mb-3 lh-1.5">
                  As technology advances, so does the neeed for platforms to adopt the latest
                  solutions. Donorport is committed to accepting all major forms of payment making
                  it easier than ever to donate.
                </p>
              </div>
            </Col>
            <Col md="6">
              <div className="circle circle--small"></div>
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <Row className="section--abouthero pt-0 pb-0">
            <Col md="6">
              <div className="d-flex gap-3 mb-3 py-6p flex-wrap">
                <div className="d-flex align-items-center text-success">
                  <FontAwesomeIcon icon={regular('building-columns')} className="fs-4 me-1" />
                  <span>Bank</span>
                </div>
                <div className="d-flex align-items-center text-success">
                  <FontAwesomeIcon icon={regular('credit-card-front')} className="fs-4 me-1" />
                  <span>Card</span>
                </div>
                <div className="crypto__icon-24">
                  <img src={stripe} className="img-fluid" alt="" />
                </div>
                {/*<div className="crypto__icon-24">
                <img
                  src=""
                  className="img-fluid"
                  alt=""
                />
              </div>

              <div className="crypto__icon-24">
                <img
                  src=""
                  className="img-fluid"
                  alt=""
                />
              </div>*/}
              </div>
              <p className="fs-5 text-light mb-3 mb-sm-3 pb-sm-5 pb-0 lh-1.5">
                Donorport accepts several forms of traditional payment methods including credit
                cards & interac debit. Choose the payment method that works best for your giving.
              </p>
            </Col>
            <Col md="6">
              <div className="d-flex gap-2 mb-3">
                <div className="crypto__icon p-0">
                  <img src={crypto1} className="img-fluid" alt="" />
                </div>
                <div className="crypto__icon p-0">
                  <img src={crypto2} className="img-fluid" alt="" />
                </div>
                <div className="crypto__icon p-0">
                  <img src={crypto3} className="img-fluid" alt="" />
                </div>
              </div>
              <p className="fs-5 text-light mb-0 mb-sm-3 pb-sm-5 pb-0 lh-1.5">
                Donorport understands the importance of privacy, which is why we have pledged to
                integrate cryptocurrency on our platform so you can send your donations anonymously
                (coming soon).
              </p>
            </Col>
          </Row>
        </Container>

        <section className="py-0 py-sm-3">
          <MarqueeList campaignAdminList={props.campaignAdminList} />
        </section>

        <Container fluid>
          <Row className="section--abouthero pb-0 pt-0 row">
            <Col md="6" className="pt-5">
              <div className="d-flex flex-column align-items-start">
                <div className="about__label d-flex flex-column align-items-start ">
                  Our Partners
                </div>
                <h3 className="fs-1 fw-bolder  pt-3">Trusted Charities</h3>
                <p className="text-light mb-3 lh-1.5">
                  Only registered charities and non-profits in good standing are allowed to post on
                  Donorport so you can be sure your donation is secure.
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </DefaultLayout>
    </Page>
  );
};

export default About;
