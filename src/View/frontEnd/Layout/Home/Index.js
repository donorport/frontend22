import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular, solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import { Button, Container, Row, Col, FormControl, InputGroup } from 'react-bootstrap';
import { Product, FilterDropdown, LadderMenu } from '../../Component/organisms';
// import { ProgressBar } from "react-bootstrap";
import { useEffect, useState } from 'react';
import './style.scss';
import HeaderController from '../../../../Controller/frontEnd/HeaderController';
import IconText from '../../Component/molecules/icon-text';
import helper, { getCalculatedPrice } from '../../../../Common/Helper';
import { Link } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import corrupt from '../../../../assets/images/corrupt.png';
import receipt from '../../../../assets/images/receipt.svg';
import coats from '../../../../assets/images/COATS.png';
import buoy from '../../../../assets/images/buoy.png';
import { useSelector } from 'react-redux';

//const title = {
//color: '#6b68f8'
//};
const ProductsUnavailableLocation = ({ user }) => {
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
        // <Col sm="6" md="4" lg="3" className="mb-2" key={index}>
        <Col sm="6" md="4" lg="3" className="p-2" key={index}>
          <Product
            {...item}
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
        </Col>
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
  <div className="fw-semibold ">
    Price: Low to High
    <span className="ms-2">
      <FontAwesomeIcon icon={solid('dollar-sign')} />
      <FontAwesomeIcon icon={solid('down')} className="ml-3p" />
    </span>
  </div>,

  <div className="fw-semibold ">
    Price: High to Low
    <span className="ms-2">
      <FontAwesomeIcon icon={solid('dollar-sign')} />
      <FontAwesomeIcon icon={solid('up')} className="ml-3p" />
    </span>
  </div>,

  <div className="fw-semibold ">Oldest</div>,

  <div className="fw-semibold ">Recently Listed</div>,

  <div className="fw-semibold ">
    Least Funded
    <span className="ms-2">
      <FontAwesomeIcon icon={solid('percent')} />
      <FontAwesomeIcon icon={solid('down')} className="ml-3p" />
    </span>
  </div>,

  <div className="fw-semibold ">
    Most Funded
    <span className="ms-2">
      <FontAwesomeIcon icon={solid('percent')} />
      <FontAwesomeIcon icon={solid('up')} className="ml-3p" />
    </span>
  </div>
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

  return (
    <>
      {/* {loading && <CircularProgress />} */}

      <HeaderController productList={props.productList} isHeaderGeo={true} />
      <Container fluid className="d-flex p-0" style={{ height: '100vh', overflow: 'hidden' }}>
        <div className="home--left border border-right"
          style={{ height: '100vh', position: 'sticky', top: 0, overflowY: 'auto' }}
        >
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
            {/* <div className="filter__search-wrap my-1 my-sm-0 order-3 order-sm-2">
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
            </div> */}

            <div className="grab__info ms-auto d-none align-items-center order-2 order-sm-3">
              <Button variant="link" className="p-1 fs-5 d-none d-sm-block">
                {/* <FontAwesomeIcon
              icon={regular("circle-question")}
              className="text-info"
            /> */}
              </Button>
              <div className="grab__dropdown-wrap ms-sm-2 mb-2 mb-sm-0">
                {/* <GrabDropdown /> */}
              </div>
            </div>
          </Container>
        </div>
        <div className="home--container" style={{ flex: 1, padding: '0 16px' }}>
          {' '}
          <div className="p-5 border home--top" style={{borderRadius: '28px'}}>
            <img style={{width: '650px',borderRadius: '28px'}} src={coats}></img>
            {/* {!CampaignAdminAuthToken && (
              <Container className="donate__header d-flex align-items-center" fluid>
                <div className="donate-section mt-2 p-2 d-sm-flex align-items-center flex-grow-1">
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
                  <div className="fs-6 p-sm-2 p-0 py-2 d-sm-flex align-items-center flex-grow-1 mt-sm-0 mt-2 lh-md-md">
                    <FontAwesomeIcon
                      icon={regular('circle-question')}
                      style={{ color: '#5f5df8' }}
                    />
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
            )} */}
          </div>
          <div className="">
            {' '}
            <Container fluid>
              {/* {user.countrySortName === 'CA' && ( */}
              <div className="d-sm-flex align-items-center py-sm-20p py-0 pt-20p pt-sm-0">
                <div className="mb-1 mb-sm-0">{props.productList.length} items</div>
                <div className="tag__list d-flex align-items-center flex__1 ms-sm-2 gap-1 mb-2 mb-sm-0 overflow-auto px-sm-0 px-2 mx-sm-0 mx-n2">
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
                              {/* <img
                        alt=""
                        className="img-fluid"
                        src=""
                      /> */}
                              {/* <i
                          className={c.iconDetails[0].class}
                          style={{
                            fontFamily: 'fontAwesome',
                            color: c.color,
                            fontStyle: 'normal',
                            marginLeft: '1.5px'
                          }}
                        ></i> */}
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 640 512"
                              >
                                <path d={c.icon} fill={c.color}></path>
                              </svg>
                            </span>
                            <span className="flex__1 ms-1 fs-5 fw-semibold text-subtext text-nowrap">
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
                        {/* <FontAwesomeIcon icon={solid('paperclip')} color="#3a94d4" /> */}
                        <img style={{ height: '21px' }} src={receipt}></img>
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

                  {/* <div className="filter__item d-flex align-items-center bg-lighter rounded-pill py-1 px-2">
              <span className="filter__item-icon">
                <img
                  alt=""
                  className="img-fluid"
                  src=""
                />
              </span>
              <span className="flex__1 ms-1 fs-5 fw-semibold text-subtext">
                Science
              </span>
              <Button variant="link" className="ms-2 p-0 fs-4 lh-1">
                <FontAwesomeIcon
                  icon={solid("close")}
                  className="text-light"
                />
              </Button>
            </div> */}
                </div>
                {props.advertisementList?.length > 0 && (
                  <div className="mb-3 mb-sm-0">
                    <IconText
                      size="42"
                      icon={
                        // <FontAwesomeIcon icon="fa-solid fa-rectangle-ad" />
                        <FontAwesomeIcon icon={solid('rectangle-ad')} className="fs-4 text-info" />
                      }
                    >
                      {props.advertisementList?.map((ad, i) => {
                        console.log('map over advertisementList:', { ad });
                        if (ad?.website && ad?.logo)
                          return (
                            <a href={ad.website} target="_blank" rel="noreferrer" key={i}>
                              <img
                                src={helper.sponsorLogoResizePath + ad.logo}
                                alt="sponsor"
                                className="pe-2"
                                style={{ maxHeight: '55px' }}
                              />
                            </a>
                          );
                      })}
                    </IconText>
                  </div>
                )}
                <div>
                  <LadderMenu
                    items={items}
                    activeKey={selectedKey}
                    // setSelectedKey={setSelectedKey}
                    onChangeFilterOption={props.onChangeFilterOption}
                  />
                </div>
              </div>
              {/* )} */}
            </Container>
            {loading ? (
              <div className="mt-5 d-flex justify-content-center">
                <CircularProgress />
              </div>
            ) : (
              <Container fluid className="py-2">
                <Row>{productsList}</Row>
              </Container>
            )}
          </div>
        </div>
      </Container>

      {/* {!CampaignAdminAuthToken && user.countrySortName === 'CA' && ( */}
    </>
  );
}
