import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Button, Container, Row, Col, FormControl, InputGroup } from 'react-bootstrap';
import { Product, FilterDropdown, LadderMenu } from '../../Component/organisms';
// import { ProgressBar } from "react-bootstrap";
import { useEffect, useState } from 'react';
import './style.scss';
import HeaderController from '../../../../Controller/frontEnd/HeaderController';
import IconText from '../../Component/molecules/icon-text';
import Footer from '../../Component/organisms/footer';
import helper, { getCalculatedPrice } from '../../../../Common/Helper';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import corrupt from '../../../../assets/images/corrupt.png';
import receipt from '../../../../assets/images/receipt.svg';
import coats from '../../../../assets/images/coats.png';
import coatsDark from '../../../../assets/images/coats(dark).png';
import buoy from '../../../../assets/images/buoy.png';
import hero from '../../../../assets/images/bg.svg';
import hero2 from '../../../../assets/images/bgdark.svg';
import { useSelector } from 'react-redux';
import themeService from "../../../../services/themeService";
//const title = {
//color: '#6b68f8'
//};
const ProductsUnavailableLocation = ({ user }) => {
  const [htmlTheme, setHtmlTheme] = useState('light'); // Default theme, assuming 'light'

  useEffect(() => {
    const htmlElement = document.querySelector('html');
    const observer = new MutationObserver(() => {
      setHtmlTheme(htmlElement.getAttribute('data-theme') || 'light');
    });

    observer.observe(htmlElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => {
      observer.disconnect();
    };
  }, []);
  return (
    <div className="container">
      <div className="empty__modal">
        <div className="empty__block">
          <div className="mt-5 empty__container">
            <div className="empty__message">
              {user && user.countrySortName !== '' ? (
                <p className="fs-3 fw-bold ">
                  Donorport is coming to <p className="fs-2 link">{user.countryName}</p>
                </p>
              ) : (
                <p className="fs-3 fw-bold ">
                  Donorport is coming to your location! Click{' '}
                  <a
                    className="link"
                    target="_blank"
                    href="https://www.donorport.com/apply"
                    rel="noreferrer"
                  >
                    here
                  </a>{' '}
                </p>
              )}

              <div className="fs-5 text-light">
                <p>
                  Click{' '}
                  <a
                    className="link"
                    target="_blank"
                    href="https://www.donorport.com/apply"
                    rel="noreferrer"
                  >
                    here
                  </a>{' '}
                  to create your charity account or learn more{' '}
                  <a className="link" href="/about">
                    about us
                  </a>
                </p>
              </div>
            </div>
            <div className="empty__circle empty--small mb-5 mt-5">
              <img src={buoy} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductList = ({ allProps }) =>
  allProps.productList.map(
    (item, index) =>
      item.status === 1 && (
        <div className="d-flex flex-column" key={index}>
          <Product
            {...item}
            isFirst={index === 0}
            addToCart={allProps.addToCart}
            removeCartItem={allProps.removeCartItem}
            checkItemInCart={allProps.checkItemInCart}
            pricingFees={allProps.pricingFees}
            addProductToWishlist={allProps.addProductToWishlist}
            wishListproductIds={allProps.wishListproductIds}
            cartProductIds={allProps.cartProductIds}
            filters={allProps.filters}
            t={allProps.productList.length}
          />
        </div>
      )
  );

const ProductListEmpty = () => (
  <div className="container">
    <div className="empty__modal">
      <div id="noSlider" className="empty__block">
        <div className="empty__container">
          <div className="empty__circle empty--small">
            <img src={corrupt} alt="" />
          </div>
          <div className="empty__message">
            <div className="title title--small ">
              <h4 className="item__title project__title">There are no results in this range</h4>
            </div>
            <div className="empty__text">
              <p>Try broadening your search.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const items = [
  <p>
    Price: Low to High
    <span className="ms-2">
      <FontAwesomeIcon icon={solid('dollar-sign')} />
      <FontAwesomeIcon icon={solid('down')} className="ml-3p" />
    </span>
  </p>,

  <p>
    Price: High to Low
    <span className="ms-2">
      <FontAwesomeIcon icon={solid('dollar-sign')} />
      <FontAwesomeIcon icon={solid('up')} className="ml-3p" />
    </span>
  </p>,

  <p>Oldest</p>,

  <p>Recently Listed</p>,

  <p>
    Least Funded
    <span className="ms-2">
      <FontAwesomeIcon icon={solid('percent')} />
      <FontAwesomeIcon icon={solid('down')} className="ml-3p" />
    </span>
  </p>,

  <p>
    Most Funded
    <span className="ms-2">
      <FontAwesomeIcon icon={solid('percent')} />
      <FontAwesomeIcon icon={solid('up')} className="ml-3p" />
    </span>
  </p>
];

export default function Index(props) {
  // const [selectedKey, setSelectedKey] = useState(3)
  const selectedKey = props.selectedKey;
  const module = props.module;
  const getCalc = getCalculatedPrice();
  let currencySymbol = getCalc.currencySymbol();
  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  const [loading, setLoading] = useState(true);
  const [productsList, setProductsList] = useState('');
  const user = useSelector((state) => state.user);

  const products =
    user.countrySortName !== 'CA' ? (
      <ProductsUnavailableLocation user={user} />
    ) : props.productList && props.productList.length > 0 ? (
      <ProductList allProps={props} />
    ) : (
      <ProductListEmpty />
    );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLoading(false);
    }, 4000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    if (products && props.productList.length > 0) {
      setLoading(false);
    }
    setProductsList(products);
  }, [props.productList, props.wishListproductIds.length]);


  const [htmlTheme, setHtmlTheme] = useState(themeService.getFromStorage() || themeService.detectPreferences());

  useEffect(() => {
    themeService.init();
    const handleThemeChange = () => {
      setHtmlTheme(themeService.getFromStorage());
    };
    
    document.addEventListener('themeChange', handleThemeChange);
    
    return () => {
      document.removeEventListener('themeChange', handleThemeChange);
    };
  }, []);

  return (
    <>
      {/* {loading && <CircularProgress />} */}

      <HeaderController productList={props.productList} isHeaderGeo={true} />
      <img
        className="bgimage"
        style={{ position: 'fixed', top: '0' }}
        src={htmlTheme === 'dark' ? hero2 : hero}
        alt=""
      />

      <div className="section section--hero">
        <div className="container">
          <div className="hero"></div>
          <div className="hero__left">
            <div className="hero__heading">
              <div className="hero__title">
                <h1 className="hero__header">
                  A New Way to<span className="header__alt">Donate.</span>
                </h1>
              </div>
              <p className="text-light">
                The world's first donation marketplace where you choose how charities spend your
                money. Charities post things they need, and you provide the funds.
              </p>
              <Link to="/signup">
                <Button className="mt-3" variant="info">
                  Start Donating
                </Button>
              </Link>
            </div>
          </div>
          <div className="hero__right d-none d-sm-block">
          <img alt="" src={htmlTheme === 'dark' ? coatsDark : coats}></img>
          </div>
        </div>
      </div>
      <div className="section section--filters d-none">
        {!CampaignAdminAuthToken && (
          <Container className="donate__header d-flex align-items-center" fluid>
            <div className="donate-section mt-2 p-2 d-sm-flex align-items-start align-items-lg-center flex-grow-1 flex-column flex-lg-row gap-2">
              <div className="d-flex align-items-center d-sm-inline-bock">
                <span className="me-1">I want to donate up to</span>
                <InputGroup className="donate-value-control">
                  <InputGroup.Text id="btnGroupAddon" className="donate-value-symbol">
                    {currencySymbol}
                  </InputGroup.Text>
                  <FormControl
                    type="text"
                    placeholder="0"
                    maxLength={4}
                    className="donate-value-input ps-1"
                    value={props.price}
                    onChange={(e) => props.onChangeDonatePrice(e)}
                  />
                </InputGroup>
                <span className="d-none d-sm-inline-block mx-1 me-0">to these items:</span>
              </div>
              <Button
                variant="outline-primary"
                style={{ border: '2px solid' }}
                className="btn__cart ms-sm-1 mt-2 mt-sm-0"
                onClick={() => props.onClickAddToCart()}
              >
                Add to Cart ({props.cartProductList.length})
              </Button>
              <div className="fs-6 p-sm-2 p-0 py-2 d-sm-flex align-items-start align-items-lg-center flex-grow-1 flex-column flex-lg-row gap-2 mt-sm-0 mt-2 lh-md-md">
                <FontAwesomeIcon icon={regular('circle-question')} style={{ color: '#5f5df8' }} />
                &nbsp; How does it work?&nbsp;
                <Link to="/about" className="link d-inline-block">
                  learn more.
                </Link>
                &nbsp; Charities,&nbsp;
                <Link to="/apply" className="link d-inline-block">
                  click here
                </Link>
                &nbsp;to create your account or check our&nbsp;
                <Link to="/help" className="link d-inline-block">
                  FAQ
                </Link>
                &nbsp;page.
              </div>
            </div>
          </Container>
        )}
        <div className="d-flex">Categories</div>
        <Container
          className="d-flex flex-column flex-sm-row align-items-center mw-400"
          fluid
          style={{ minHeight: '90px' }}
        >
          <FilterDropdown
            organizationList={props.organizationList}
            categoryList={props.categoryList}
            seletedCategoryList={props.seletedCategoryList}
            onSelectCategory={props.onSelectCategory}
            setfilters={props.setfilters}
            filters={props.filters}
            onClickFilter={props.onClickFilter}
            onChangePriceSlider={props.onChangePriceSlider}
            module={module}
            categoryDetails={props.categoryDetails}
            prodctFilterData={props.prodctFilterData}
          />
          {/* {user.countrySortName === 'CA' && ( */}
          {/* )} */}

          <div className="grab__info ms-auto d-none align-items-center order-2 order-sm-3">
            <Button variant="link" className="p-1 fs-5 d-none d-sm-block">
              {/* <FontAwesomeIcon
              icon={regular("circle-question")}
              className="text-info"
            /> */}
            </Button>
            <div className="grab__dropdown-wrap ms-sm-2 mb-2 mb-sm-0">{/* <GrabDropdown /> */}</div>
          </div>
        </Container>
      </div>
      <div className="section section--colored">
        <div className="filter__search-wrap my-1 my-sm-0 order-3 order-sm-2"></div>
        <Container fluid>
          <div className="d-flex pb-5 flex-column flex-sm-row">
            {' '}
            <div className="search__container">
              <ul
                className="ps-0 ps-sm-2"
                style={{ display: 'flex', listStyle: 'none', marginBottom: 'unset' }}
              >
                {props.searchTag.length > 0 &&
                  props.searchTag.map((tag, i) => {
                    return (
                      <li
                        key={i}
                        className="search__tag"
                        onClick={() => props.deSelectTag(tag.tag)}
                        style={{ backgroundColor: tag.color, marginRight: '10px' }}
                      >
                        <span>{tag.tag}</span>
                        <a href="javascript:void(0)">x</a>
                      </li>
                    );
                  })}

                <li className="d-flex align-items-center">
                  <InputGroup className="input-group__alpha">
                    <InputGroup.Text>
                      <FontAwesomeIcon
                        icon={regular('magnifying-glass')}
                        className="zoom__icon fs-5"
                      />
                    </InputGroup.Text>
                    <FormControl
                      placeholder="Search"
                      value={props.filters.search}
                      onChange={(e) => props.onSearchProduct(e, 'onchange')}
                      onKeyDown={(e) => props.onSearchProduct(e, 'keydown')}
                      style={{ zIndex: '9' }}
                    />
                    <span id="suggestion">{props.suggestionTag}</span>
                  </InputGroup>
                </li>
              </ul>
            </div>
            {/* {user.countrySortName === 'CA' && ( */}
            <div className="d-sm-flex align-items-center gap-1">
              <div className="mb-1 mb-sm-0 text-nowrap text-end text-sm-start">
                {props.productList.length} items
              </div>
              {/* <div className="tag__list d-flex align-items-center flex-grow-1 ms-sm-2 gap-1 mb-2 mb-sm-0 overflow-auto px-sm-0 px-2 mx-sm-0 mx-n2">
                {props.seletedCategoryList.length > 0 &&
                  props.categoryList.length > 0 &&
                  props.categoryList.map((c) => {
                    return (
                      props.seletedCategoryList.includes(c._id) && (
                        <div
                          key={c._id}
                          className="filter__item d-flex align-items-center bg-lighter rounded-pill py-1 px-2"
                        >
                          <span className="filter__item-icon">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 640 512"
                            >
                              <path d={c.icon} fill={c.color}></path>
                            </svg>
                          </span>
                          <span className="flex-grow-1 ms-1 fs-5 fw-semibold text-subtext text-nowrap">
                            {c.name}
                          </span>
                          <Button
                            variant="link"
                            className="ms-2 p-0 fs-4 lh-1"
                            onClick={() => props.removeCatFromFilter(c._id)}
                          >
                            <FontAwesomeIcon icon={solid('close')} className="text-light" />
                          </Button>
                        </div>
                      )
                    );
                  })}

                {props.filters.taxEligible ? (
                  <div className="filter__item d-flex align-items-center bg-lighter rounded-pill py-1 px-2">
                    <span className="filter__item-icon">
                      <img alt="receipt" style={{ height: '21px' }} src={receipt}></img>
                    </span>
                    <Button
                      variant="link"
                      className="ms-2 p-0 fs-4 lh-1"
                      onClick={() =>
                        props.setfilters({
                          ...props.filters,
                          taxEligible: false
                        })
                      }
                    >
                      <FontAwesomeIcon icon={solid('close')} className="text-light" />
                    </Button>
                  </div>
                ) : (
                  <></>
                )}

                {props.filters.postTag ? (
                  <div className="filter__item d-flex align-items-center bg-lighter rounded-pill py-1 px-2">
                    <span className="filter__item-icon">
                      <FontAwesomeIcon icon={solid('clock-rotate-left')} color="#947ada" />
                    </span>
                    <Button
                      variant="link"
                      className="ms-2 p-0 fs-4 lh-1"
                      onClick={() =>
                        props.setfilters({
                          ...props.filters,
                          postTag: false
                        })
                      }
                    >
                      <FontAwesomeIcon icon={solid('close')} className="text-light" />
                    </Button>
                  </div>
                ) : (
                  <></>
                )}

                {props.filters.infinite ? (
                  <div className="filter__item d-flex align-items-center bg-lighter rounded-pill py-1 px-2">
                    <span className="filter__item-icon">
                      <FontAwesomeIcon icon={solid('infinity')} color="#947ada" />
                    </span>
                    <Button
                      variant="link"
                      className="ms-2 p-0 fs-4 lh-1"
                      onClick={() =>
                        props.setfilters({
                          ...props.filters,
                          infinite: false
                        })
                      }
                    >
                      <FontAwesomeIcon icon={solid('close')} className="text-light" />
                    </Button>
                  </div>
                ) : (
                  <></>
                )}
              </div> */}

              <div>
                <LadderMenu
                  items={items}
                  activeKey={selectedKey}
                  // setSelectedKey={setSelectedKey}
                  onChangeFilterOption={props.onChangeFilterOption}
                />
              </div>
            </div>
          </div>
        </Container>
        {loading ? (
          <div className="mt-5 d-flex justify-content-center">
            <CircularProgress />
          </div>
        ) : (
          <div className="container">
            <div className="list"> {productsList}</div>
          </div>
        )}
      </div>
      <Footer />
      {/* {!CampaignAdminAuthToken && user.countrySortName === 'CA' && ( */}
    </>
  );
}
