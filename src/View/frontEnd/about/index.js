import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Col, Container, Row } from 'react-bootstrap';

import { Link, useNavigate } from 'react-router-dom';
import MarqueeList from '../Component/molecules/marquee-list';
import DefaultLayout from '../Component/templates/default-layout';

import './style.scss';

const About = (props) => {
  // console.log(props.campaignAdminList)
  const navigate = useNavigate();
  return (
    <DefaultLayout className="about">
      <div className="section--hero section--design">
        <Container fluid>
          <Row>
            <Col md="5" className="mb-4 mb-sm-0">
              <div className="about__content-1">
                <h1 className="about__title display-6 fw-bolder text-dark">
                  A Crowdfunding Platform for Charities
                </h1>
                <p className="fs-5 text-light fw-regular mb-4 lh-1.5">
                  Charities post products they need, donors provide the funding, the charity
                  purchases the products. The only platoform that brings you complete transaprency;
                  you choose how charities spend your money.
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
            <Col md="7">
              <div className="mw-600 d-flex align-items-center  justify-content-sm-center">
                <img
                  src="https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/626f21b70f1d0f40951a1eb6_Savings-amico.svg"
                  className="img-fluid"
                  alt=""
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <Container fluid>
        <h4 className="fs-1 fw-bolder text-center text-dark">Our services</h4>
        <Row className="section--hero pt-0 pt-sm-5 mt-0 mt-sm-5 mb-5 pb-0 pb-sm-5">
          <Col md="6">
            <div className="d-flex align-items-center  justify-content-sm-center">
              <img
                src="https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/626df2f3a0717a4b4ca2d22c_Profile%20pic-rafiki%20(1).svg"
                className="img-fluid"
                alt=""
              />
            </div>
          </Col>
          <Col md="6">
            <div className="">
              <div className="circle"></div>
              <div className="d-flex flex-column align-items-start ">
                Your donations, all in one place
              </div>
              <h3 className="fs-1 fw-bolder text-dark pt-3">Discover unique opportunities</h3>
              <p className="fs-5 text-light mb-3 lh-1.5">
                Browse categories and filter results based on your donation preferences. Our
                geo-location system shows you posts from charities near you so you can support your
                local organizations.
              </p>
            </div>
            <div className="d-flex align-items-center flex-wrap mw-600">
              <div className="page__circle d-flex align-items-center bg-lighter rounded-circle p-3 justify-content-center">
                <img
                  src="https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/5f47d53712617fc3ca56b307_emoji.svg"
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div className="seperator flex__1"></div>
              <div className="page__circle d-flex align-items-center bg-lighter rounded-circle p-3 justify-content-center">
                <img
                  src="https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/61fed883243c845a8478a637_2022%20(Icon).svg"
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div className="seperator flex__1"></div>
              <div className="page__circle d-flex align-items-center bg-lighter rounded-circle p-3 justify-content-center">
                <img
                  src="https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/5eb5c601301ea31f94e1caa8_town.svg"
                  className="img-fluid"
                  alt=""
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row className="section--hero pt-0 pt-sm-5 mt-0 mt-sm-5 mb-5 pb-0 pb-sm-5">
          <Col md="6" className="pt-5">
            <div className="d-flex flex-column align-items-start">
              <div className="about__label d-flex flex-column align-items-start ">Donations</div>
              <h3 className="fs-1 fw-bolder text-dark pt-3">Tangible Giving</h3>
              <p className="fs-5 text-light mb-3 lh-1.5">
                Charities are often asked what they need, not how much they need. Donorport allows
                you to see these needs and provide the funding.
              </p>
            </div>
          </Col>
          <Col md="6">
            <div className="d-flex justify-content-center justify-content-sm-between mb-0 mb-sm-5 flex-wrap gap-5 gap-sm-0">
              <div className="bigcircle">
                <img
                  src="https://uploads-ssl.webflow.com/59df9e77ad9420000140eafe/624ba8a3688ae7c3ef86a416_20139509001_front_a06_%402.png"
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div className="bigcircle _2 bigcircle _2 mb-0 mb-sm-5">
                <img
                  src="https://uploads-ssl.webflow.com/59df9e77ad9420000140eafe/5f7b731470e7e18043959c58_s-l300.png"
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div className="bigcircle">
                <img
                  src="https://uploads-ssl.webflow.com/59df9e77ad9420000140eafe/5c2c24cdbda7359a71d94025_aj1_top3.png"
                  className="img-fluid"
                  alt=""
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <div className="section--hero pt-0 pt-sm-5 mt-0 mt-sm-5 mb-5 pb-0 pb-sm-5 row row section--cityscape">
        <img
          src="https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/621fbd2a971cc27a3898b387_60e47ee6c4af646a50d5b8e3_hero-illustration.svg"
          className="cityscape"
          alt=""
        />
        <Container fluid>
          <Row>
            <Col md="6" className="pt-5">
              <div>
                <div className="about__label d-flex flex-column align-items-start ">
                  How it Works
                </div>
                <h3 className="fs-1 fw-bolder text-dark pt-3">Transparent</h3>
                <p className="fs-5 text-light mb-3 lh-1.5">
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
                <img
                  src="https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/5f3af12f2f29c830ab1e3a3c_box.svg"
                  className="about__step-icon"
                  alt=""
                />
              </div>
              <h4 className="mb-1 fw-bolder text-dark text-center">Charity creates a post</h4>
              <p className="text-light text-center fs-5">
                An organziation creates a post for products they need.
              </p>
            </Col>
            <Col md="4" className="position-relative mb-5 mb-sm-0">
              <div className="d-flex justify-content-center mb-2">
                <img
                  src="https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/60088347cb80b5186f9e1ead_donate.svg"
                  className="about__step-icon"
                  alt=""
                />
              </div>
              <h4 className="mb-1 fw-bolder text-dark text-center">Donors provide the funding</h4>
              <p className="text-light text-center fs-5">
                Donors send funds to pay for the products posted by the organizations.
              </p>
            </Col>
            <Col md="4" className="position-relative">
              <div className="d-flex justify-content-center mb-2">
                <img
                  src="https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/5ea77ef8debb84eec8354d5b_bank.svg"
                  className="about__step-icon"
                  alt=""
                />
              </div>
              <h4 className="mb-1 fw-bolder text-dark text-center">Charity buys the products</h4>
              <p className="text-light text-center fs-5">
                The organizations use the funding provided by the donors to purchase the products.
              </p>
            </Col>
          </Row>
        </Container>
      </div>

      <Container fluid>
        <Row className="section--hero pt-0 pt-sm-5 mt-0 mt-sm-5 mb-5 pb-0 pb-sm-5 row row d-flex justify-content-between">
          <div className="ourbrand__item d-flex align-items-center justify-content-cente gap-1">
            <img
              src="https://uploads-ssl.webflow.com/59df9e77ad9420000140eafe/626cb8aafbea8678573371cd_Tim_Hortons_logo.svg"
              className="img-fluid ourbrand__img"
              alt=""
            />
          </div>
          <div className="ourbrand__item d-flex align-items-center justify-content-center">
            <img
              src="https://uploads-ssl.webflow.com/59df9e77ad9420000140eafe/626f437fab93d764b284564d_McDonald%27s_Golden_Arches.svg"
              className="img-fluid ourbrand__img"
              alt=""
            />
          </div>
          <div className="ourbrand__item d-flex align-items-center justify-content-center">
            <img
              src="https://uploads-ssl.webflow.com/59df9e77ad9420000140eafe/6271d71d721c60e1ee063619_Crocs_wordmark.svg"
              className="img-fluid ourbrand__img"
              alt=""
            />
          </div>
          <div className="ourbrand__item d-flex align-items-center justify-content-center">
            <img
              src="https://uploads-ssl.webflow.com/59df9e77ad9420000140eafe/626f4471dc441c225745284c_Target_logo.svg"
              className="img-fluid ourbrand__img"
              alt=""
            />
          </div>
          <div className="ourbrand__item d-flex align-items-center justify-content-center">
            <img
              src="https://uploads-ssl.webflow.com/59df9e77ad9420000140eafe/624de9e9e4496f32fd5463ad_brand_chichis.png"
              className="img-fluid ourbrand__img"
              alt=""
            />
          </div>
          <div className="ourbrand__item d-flex align-items-center justify-content-center">
            <img
              src="https://uploads-ssl.webflow.com/59df9e77ad9420000140eafe/626f44aef1df651c17c8f3e6_Purina-logo.svg"
              className="img-fluid ourbrand__img"
              alt=""
            />
          </div>
          <div className="ourbrand__item d-flex align-items-center justify-content-center">
            <img
              src="https://uploads-ssl.webflow.com/59df9e77ad9420000140eafe/61f88ffad85ed5121f3c986c_Dunkin-Donuts-01.svg"
              className="img-fluid ourbrand__img"
              alt=""
            />
          </div>
        </Row>
      </Container>

      <section className="section--hero pb-0 pt-0 row">
        <Container fluid>
          <div className="p-5 rounded-5 bg-lighter">
            <Row>
              <Col md="7">
                <div className="pe-sm-5 me-sm-4">
                  <h3 className="fs-1 fw-bolder text-dark">Our Standard</h3>
                  <p className="fs-5 text-light mb-3 lh-1.5">
                    Donorport promises to remain a platform for the people which is why we bring you
                    all types of content created by our approved non-profits & charities. We approve
                    non-profits.
                  </p>
                  <p className="fs-5 text-light lh-1.5">
                    To learn more check out our&nbsp;
                    <Link to="/home" className="text-dark">
                      partnerships page.
                    </Link>
                  </p>
                </div>
              </Col>
              <Col md="5">
                <ul className="list-unstyled fs-5 text-light">
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
        <Row className="section--hero pt-0 pt-sm-5 mt-0 mt-sm-5 mb-5 pb-0 pb-sm-5">
          <Col md="6">
            <div className="d-flex align-items-center justify-content-center pe-sm-5 mb-5">
              <img
                src="https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/6271b1e2ec98d212a842735e_To%20do%20list-rafiki.svg"
                className="mw-600 w-100 img-fluid"
                alt=""
              />
            </div>
          </Col>
          <Col md="6">
            <div className="d-flex flex-column align-items-start">
              <div className="about__label d-flex flex-column align-items-start ">
                Tax Management
              </div>
              <h3 className="fs-1 fw-bolder text-dark pt-3">Centralized Giving</h3>
              <p className="fs-5 text-light mb-3 lh-1.5">
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
        <Row className="section--hero pb-0 pt-0">
          <Col md="6">
            <div className="d-flex flex-column align-items-start">
              <div className="about__label d-flex flex-column align-items-start ">
                Payment Options
              </div>
              <h3 className="fs-1 fw-bolder text-dark pt-3">Modern Solutions</h3>
              <p className="fs-5 text-light mb-3 lh-1.5">
                As technology advances, so does the neeed for platforms to adopt the latest
                solutions. Donorport is committed to accepting all major forms of payment making it
                easier than ever to donate.
              </p>
            </div>
          </Col>
          <Col md="6">
            <div className="circle circle--small"></div>
          </Col>
        </Row>
      </Container>
      <Container fluid>
        <Row className="section--hero pt-0 pb-0">
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
                <img
                  src="https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/620f2668a5060779fa814fd9_stripe-seeklogo.com.svg"
                  className="img-fluid"
                  alt=""
                />
              </div>
              {/*<div className="crypto__icon-24">
                <img
                  src="https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/620f25f58e8ffe7b1df84772_PayPal.svg"
                  className="img-fluid"
                  alt=""
                />
              </div>

              <div className="crypto__icon-24">
                <img
                  src="https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/620f2720b58d094391f75d07_Google_Pay_(GPay)_Logo_(2018-2020).svg"
                  className="img-fluid"
                  alt=""
                />
              </div>*/}
            </div>
            <p className="fs-5 text-light mb-3 mb-sm-3 pb-sm-5 pb-0 lh-1.5">
              Donorport accepts several forms of traditional payment methods including credit cards
              & interac debit. Choose the payment method that works best for your giving.
            </p>
          </Col>
          <Col md="6">
            <div className="d-flex gap-2 mb-3">
              <div className="crypto__icon p-0">
                <img
                  src="https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/620e5d6c9582b74e722c3122_ethereum-eth.svg"
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div className="crypto__icon p-0">
                <img
                  src="https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/620e5d4c36e4c982f37e9894_Bitcoin.svg"
                  className="img-fluid"
                  alt=""
                />
              </div>
              <div className="crypto__icon p-0">
                <img
                  src="https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/620e5ca7ee8035585abb93b9_usd-coin-usdc-logo.svg"
                  className="img-fluid"
                  alt=""
                />
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
        <Row className="section--hero pb-0 pt-0 row">
          <Col md="6" className="pt-5">
            <div className="d-flex flex-column align-items-start">
              <div className="about__label d-flex flex-column align-items-start ">Our Partners</div>
              <h3 className="fs-1 fw-bolder text-dark pt-3">Trusted Charities</h3>
              <p className="fs-5 text-light mb-3 lh-1.5">
                Only registered charities and non-profits in good standing are allowed to post on
                Donorport so you can be sure your donation is secure.
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </DefaultLayout>
  );
};

export default About;
