import React, { useState, useEffect } from 'react';
import { Button, Container, div, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, brands, regular } from '@fortawesome/fontawesome-svg-core/import.macro';

// import IconButton from "@components/molecules/icon-button";
// import FooterCategoryLinks from "@components/molecules/footer-category-links";
import IconButton from '../../molecules/icon-button';
import FooterCategoryLinks from '../../molecules/footer-category-links';
import { useSelector } from 'react-redux';
import categoryApi from '../../../../../Api/admin/category';
import Logo from '../../atoms/logo';

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
    <div className="footer">
      <Container className="d-flex flex-column" fluid>
        <div className="footer__wrap">
          {' '}
          <div className="footer__block flex-grow-1 logo text-start mb-2 mb-sm-0">
            <Logo />
            <p className="mt-12p">
              The world's first and largest crowd-funding platform for non-profits
              &amp;&nbsp;charities.
            </p>
            <div className="mt-3 d-flex gap-2 fs-4">
              <FontAwesomeIcon icon={brands('facebook')} />
              <FontAwesomeIcon icon={brands('twitter')} />
              <FontAwesomeIcon icon={brands('square-instagram')} />
            </div>
          </div>
          <div className="footer__middle pb-2">
            <div className="footer__block p-0 text-start">
              <FooterCategoryLinks categoryName="Home" list={[]} />
            </div>
            <div className="footer__block p-0 text-start">
              <FooterCategoryLinks categoryName="Support" list={[]} />
            </div>
            <div className="footer__block p-0 text-start">
              <FooterCategoryLinks categoryName="Information" list={[]} />
            </div>
          </div>
        </div>

        <div className="footer__bottom mt-3 py-5 d-sm-flex align-items-center border-top text-center text-sm-start">
          <div className="d-flex justify-content-center mb-2 mb-sm-0">
            <div className="copyright mb-1 mb-sm-0">
              <div>© {new Date().getFullYear()} Donorport, Inc.</div>
            </div>
            <div className="copyright mb-1 mb-sm-0 ms-1">
              <FontAwesomeIcon icon={regular('earth-americas')} />
              <span className="logo-span ms-1">
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
