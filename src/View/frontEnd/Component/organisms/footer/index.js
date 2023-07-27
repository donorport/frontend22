import React, { useState, useEffect } from 'react';
import { Button, Container, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, brands, regular } from '@fortawesome/fontawesome-svg-core/import.macro';

// import IconButton from "@components/molecules/icon-button";
// import FooterCategoryLinks from "@components/molecules/footer-category-links";
import IconButton from '../../molecules/icon-button';
import FooterCategoryLinks from '../../molecules/footer-category-links';
import { useSelector, useDispatch } from 'react-redux';
import categoryApi from '../../../../../Api/admin/category';
import logo from '../../../../../assets/images/logo.svg';

import './style.scss';

function Footer() {
  const user = useSelector((state) => state.user);
  const [categoryList, setCategoryList] = useState([]);
  const userData = JSON.parse(localStorage.getItem('userData'));

  const getCategoryList = async () => {
    const categoryList = await categoryApi.listCategory();
    if (categoryList.data.success === true) {
      setCategoryList(categoryList.data.data);
    }
  };
  useEffect(() => {
    (async () => {
      // console.log(user)
      await getCategoryList();
    })();
  }, []);
// Before the problematic span
console.log('user:', user);
console.log('userData:', userData);
  return (
    <div className="footer border-top px-1">
      <Container fluid className="footer__top">
        <Row className="border-bottom pb-4 mb-4">
          <Col md="5" className="mb-3 mb-sm-0">
            <div className="loop__text pe-sm-5 me-sm-5 text-center text-sm-start">
              <h3 className="heading-4 mb-12p">Stay in the loop</h3>
              <p>
                Join our mailing list to stay in the loop with our newest feature releases,
                non-profit partners, and tips and tricks for navigating Donorport.
              </p>
              <div className="footer__newsletter d-flex align-items-center">
                <input
                  className="form-control form-control-lg"
                  placeholder="Your email address"
                  type="text"
                  name="Newsletter"
                />
                <Button size="lg" className="fw-bold btn__newsletter ms-2 flex-shrink-0">
                  Sign up
                </Button>
              </div>
            </div>
          </Col>
          <Col md="7" className="text-center text-sm-start">
            <h3 className="heading-4 mb-12p">Join the community</h3>
            <div className="footer__socialwrap d-flex justify-content-center justify-content-sm-start">
              <IconButton
                size="lg"
                href="https://www.twitter.com/donorporthq"
                icon={<FontAwesomeIcon icon={brands('twitter')} />}
                target="_blank"
              />
              <IconButton
                size="lg"
                href="https://www.facebook.com/donorporthq"
                icon={<FontAwesomeIcon icon={brands('facebook')} />}
                target="_blank"
              />

              <IconButton
                size="lg"
                href="https://www.instagram.com/donorporthq"
                icon={<FontAwesomeIcon icon={brands('instagram')} />}
                target="_blank"
              />
              <IconButton
                size="lg"
                href="https://discord.gg/rcGR4w6Wpu"
                icon={<FontAwesomeIcon icon={brands('discord')} />}
                target="_blank"
              />
              <IconButton
                size="lg"
                href="mailto:info@donorport.com&subject=General Information"
                icon={<FontAwesomeIcon icon={solid('envelope')} />}
                target="_blank"
              />
            </div>
          </Col>
        </Row>
      </Container>

      <Container fluid>
        <Row className="footer__middle pb-2">
          <Col sm className="footer__block logo text-center text-sm-start mb-2 mb-sm-0">
            <a href="/" className="d-inline-flex align-items-center mb-2">
              <img
                src={logo}
                alt=""
                className="svg__logo"
              />

              <div className="svg__name ms-1 text-dark">Donorport</div>
            </a>
            <p>
              The world's first and largest crowd-funding platform for non-profits
              &amp;&nbsp;charities. Donate directly to the needs of the organization and help them
              fund all of their product needs.
            </p>
          </Col>
          <Col className="footer__block mb-2 mb-sm-0 text-center text-sm-start">
            <FooterCategoryLinks categoryName="Home" list={[]} />
          </Col>
          <Col className="footer__block mb-2 mb-sm-0 text-center text-sm-start">
            <FooterCategoryLinks categoryName="Support" list={[]} />
          </Col>
          <Col className="footer__block text-center text-sm-start">
            <FooterCategoryLinks categoryName="Information" list={[]} />
          </Col>
          <Col className="footer__block text-center text-sm-start">
            <FooterCategoryLinks categoryName="Marketplace" list={categoryList} />
          </Col>
        </Row>
        <div className="footer__bottom d-sm-flex align-items-center border-top text-center text-sm-start">
          <div className="d-flex justify-content-center mb-2 mb-sm-0">
            <div className="copyright mb-1 mb-sm-0">
              <div>© {new Date().getFullYear()} Donorport, Inc.</div>
            </div>
            <div className="copyright mb-1 mb-sm-0 ms-1">
              <FontAwesomeIcon icon={regular('earth-americas')} />
              <span className="ms-1">
                {user.countrySortName ? user.countrySortName : userData ? userData.country : ''}
              </span>
            </div>
          </div>
          <ul className="list-unstyled mb-0 d-flex align-items-center justify-content-center justify-content-sm-start ms-auto mt-3 mt-sm-0">
            <li className="footer__link-item me-4">
              <a href="/privacy" className="footer__link">
                Privacy Policy
              </a>
            </li>
            <li className="footer__link-item">
              <a href="/terms" className="footer__link">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>
      </Container>
    </div>
  );
}

export default Footer;
