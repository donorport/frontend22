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
import buoy from '../../../../assets/images/buoy.png';
import { useSelector } from 'react-redux';

//const title = {
//color: '#6b68f8'
//};
const ProductsUnavailableLocation = ({ user }) => (
  <div className="container">
    <div className="empty__modal">
      <div className="empty__block">
        <div className="empty__container">
          <div className="empty__circle empty--small mb-5 mt-5">
            <img src={buoy} alt="" />
          </div>
          <div className="empty__message">
            {user.countrySortName !== '' ? (
              <p className="fs-3 fw-bold text-dark">
                Donorport is currently unavailable in{' '}
                <a href="#" className="link">
                  {user.countryName}
                </a>
              </p>
            ) : (
              <p className="fs-3 fw-bold text-dark">
                Donorport is currently unavailable in your location
              </p>
            )}

            <div className="fs-5 text-light">
              <p>
                Check back later or{' '}
                <a
                  className="link"
                  target="_blank"
                  href="https://www.twitter.com/donorporthq"
                  rel="noreferrer"
                >
                  tweet us
                </a>{' '}
                and let use know where we should set sails for next or learn more{' '}
                <a className="link" href="/about">
                  about us
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

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
              <p className="item__title project__title">There are no results in this range</p>
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
  <div className="fw-semibold text-dark">
    Price: Low to High
    <span className="ms-2">
      <FontAwesomeIcon icon={solid('dollar-sign')} />
      <FontAwesomeIcon icon={solid('down')} className="ml-3p" />
    </span>
  </div>,

  <div className="fw-semibold text-dark">
    Price: High to Low
    <span className="ms-2">
      <FontAwesomeIcon icon={solid('dollar-sign')} />
      <FontAwesomeIcon icon={solid('up')} className="ml-3p" />
    </span>
  </div>,

  <div className="fw-semibold text-dark">Oldest</div>,

  <div className="fw-semibold text-dark">Recently Listed</div>,

  <div className="fw-semibold text-dark">
    Least Funded
    <span className="ms-2">
      <FontAwesomeIcon icon={solid('percent')} />
      <FontAwesomeIcon icon={solid('down')} className="ml-3p" />
    </span>
  </div>,

  <div className="fw-semibold text-dark">
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

      <HeaderController isHeaderGeo={true} />

      <div className="bg-lighter border-bottom">
        <Container
          className="d-flex flex-column flex-sm-row align-items-center py-2 "
          fluid
          style={{ minHeight: '90px' }}
        >
          {user.countrySortName === 'CA' && (
            <div className="filter__dropdown-wrap mb-2 mb-sm-0 ">
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
            </div>
          )}
          <div className="filter__search-wrap my-1 my-sm-0 order-3 order-sm-2">
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

                {/* <li className="search__tag" onClick={() => alert('k')} style={{ backgroundColor: "rgb(34, 144, 143)", marginRight: "10px" }}><span>blankets</span><a href="javascript:void(0)">x</a></li>
                <li className="search__tag " style={{ backgroundColor: "rgb(34, 144, 143)", marginRight: "10px" }}><span>designlab</span><a href="javascript:void(0)">x</a></li> */}

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

                    {/* 
                    <FormControl
                      placeholder=""
                      value={props.suggestionTag}
                      style={{zIndex:"1"}}

                      // disabled
                    /> */}
                  </InputGroup>
                  {/* <input type="text" className="autofill__bg" disabled="" value={props.suggestionTag} style={{ color: "rgb(214, 215, 220)", top: " -4px", outline: "none", width: "88px" }}></input> */}
                </li>
              </ul>
            </div>
          </div>

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
      {!CampaignAdminAuthToken && user.countrySortName === 'CA' && (
        <Container className="d-flex align-items-center" fluid>
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
              <span className="d-none d-sm-inline-block mx-1">to these items:</span>
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
              <FontAwesomeIcon icon={regular('circle-question')} style={{ color: '#5f5df8' }} />
              &nbsp; How does it work?&nbsp;
              <Link to="/about" className="link d-inline-block">
                learn more.
              </Link>
              &nbsp; Charities&nbsp;
              <Link to="/apply" className="link d-inline-block">
                click here
              </Link>
              &nbsp;to create your account.
            </div>
          </div>
        </Container>
      )}

      <Container fluid>
        {user.countrySortName === 'CA' && (
          <div className="d-sm-flex align-items-center py-20p">
            <div className="mb-1 mb-sm-0">{props.productList.length} items</div>
            <div className="tag__list d-flex align-items-center flex__1 ms-sm-2 gap-1 mb-2 mb-sm-0 overflow-auto px-sm-0 px-2 mx-sm-0 mx-n2">
              {props.seletedCategoryList.length > 0 &&
                props.categoryList.length > 0 &&
                props.categoryList.map((c) => {
                  return (
                    props.seletedCategoryList.includes(c._id) && (
                      <div key={c._id} className="filter__item d-flex align-items-center bg-lighter rounded-pill py-1 px-2">
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
                    <FontAwesomeIcon icon={solid('paperclip')} color="#3a94d4" />
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
                    <FontAwesomeIcon icon={solid('tag')} color="#947ada" />
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
            {/* {props.advertisementList?.length > 0 && (
              <div className="mb-3 mb-sm-0">
                <IconText
                  size="42"
                  icon={
                    // <FontAwesomeIcon icon="fa-solid fa-rectangle-ad" />
                    <FontAwesomeIcon icon={solid('rectangle-ad')} className="fs-4 text-info" />
                  }
                >
                  {props.advertisementList.map((ad, i) => {
                    if ( ad.website && ad.logo ) return (
                      <a href={ad.website} target="_blank" rel="noreferrer" key={i}>
                        <img
                          src={helper.sponsorLogoResizePath + ad.logo}
                          alt="sponsor"
                          className="px-2"
                          style={{ maxHeight: '55px' }}
                        />
                      </a>
                    );
                  })}
                </IconText>
              </div>
            )} */}
            <div>
              {/* <IconText
              className=""
              icon={
                // <FontAwesomeIcon icon="fa-solid fa-rectangle-ad" />
                <FontAwesomeIcon icon={solid("rectangle-ad")} className="fs-4 text-info" />
              }
            >
              These items are tax deductible.
            </IconText> */}
              <LadderMenu
                items={items}
                activeKey={selectedKey}
                // setSelectedKey={setSelectedKey}
                onChangeFilterOption={props.onChangeFilterOption}
              />
            </div>
          </div>
        )}
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
    </>
  );
}
