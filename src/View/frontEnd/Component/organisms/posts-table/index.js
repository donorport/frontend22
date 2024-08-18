import { Button, ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import ListItemImg from '../../atoms/list-item-img';
import './style.scss';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import helper, { priceFormat } from '../../../../../Common/Helper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import moment from 'moment';
import { Link } from 'react-router-dom';
import noimg from '../../../../../assets/images/noimg1.png';
import PropTypes from 'prop-types';

const PostsTable = (props) => {
  let organizationDetails = props.organizationDetails;
  let productList = props.productList;

  const useStyles = makeStyles(() => ({
    ul: {
      // '& .MuiPaginationItem-root': {
      //   color: '#6f6f91 !important'
      // },
      // '& .MuiPaginationItem-root:hover': {
      //   background: '#f2f6fc !important'
      // },
      // '& .Mui-selected': {
      //   background: '#f2f6fc !important'
      // }
    }
  }));
  const classes = useStyles();

  return (
    <>
      <div className="list__table mb-5">
        <div className="list__table-sort d-flex justify-content-sort border-bottom">
          <div className="flex-grow-1">
            <Button
              variant="link"
              className="btn__sort px-0 text-decoration-none"
              onClick={() => props.handleSortingChange('created_at')}
            >
              Date
              {props.sortField === 'created_at' && props.order === 'asc' ? (
                <FontAwesomeIcon icon={solid('angle-up')} className="small ml-6p" />
              ) : (
                <FontAwesomeIcon icon={solid('angle-down')} className="small ml-6p" />
              )}
            </Button>
          </div>
          <Button variant="link" className="btn__sort px-0 text-decoration-none">
            Status
            <FontAwesomeIcon icon={solid('angle-down')} className="small ml-6p" />
          </Button>
        </div>
        <ul
          className="list-unstyled mb-0 list__table-list"
          /*style={{
            minHeight: productList.length > 0 && '600px'
          }}*/
        >
          {productList.length > 0 ? (
            productList.map((product) => {
              //console.log('~~ postTable - productList map:', { product });
              let revenue = Number(product.displayPrice * product.soldout).toLocaleString('en-US', {
                maximumFractionDigits: 2
              });
              if (product._id === '631f84a614725993eb90cd39') console.log('Product Map: ', product);
              return (
                <li key={product._id} className="table__list-item px-2 py-3">
                  <div className="d-xl-flex align-items-center flex-grow-1">
                    <div className="progress__wrap d-flex align-items-center  me-sm-3">
                      <div className="ms-auto ms-sm-0 me-sm-2 post__value">
                        {product.isFulfiled ? (
                          <h6 className="post__status">DONE</h6>
                        ) : product.status === 1 ? (
                          <h6 className="price">
                            {organizationDetails.symbol}
                            {priceFormat(
                              product.displayPrice ? product.displayPrice : product.price
                            )}
                          </h6>
                        ) : product.status === -1 ? (
                          <h6 className="post__status">DRAFT</h6>
                        ) : null}

                        <div className="date text-light fs-7">
                          {moment(product.created_at).fromNow()}
                        </div>
                      </div>
                      <div className="position-relative">
                        <ListItemImg
                          size={68}
                          imgSrc={
                            product.image ? helper.CampaignProductImagePath + product.image : noimg
                          }
                        />
                        {product.projectDetails.length > 0 && (
                          <Link
                            variant="link"
                            className="position-absolute top-0 start-100 translate-middle borde fs-4"
                            to={'/project/' + product.projectDetails[0].projectMainDetails.slug}
                          >
                            <div className="d-flex align-items-center justify-content-center">
                              <FontAwesomeIcon icon={solid('bolt')} className="text-primary me-1" />
                              {/*  {product.projectDetails[0].projectMainDetails.projectImages.length >
                              0 ? (
                                <Avatar
                                  size={26}
                                  border={0}
                                  shadow={false}
                                  avatarUrl={
                                    helper.ProjectImagePath +
                                    product.projectDetails[0].projectMainDetails.projectImages[0]
                                      .image
                                  }
                                />
                              ) : (
                                <FontAwesomeIcon
                                  icon={solid('bolt')}
                                  className="text-primary me-1"
                                />
                              )}
                               <span className="ms-1 fs-6 fw-semibold">
                                {product.projectDetails[0].projectMainDetails.name}
                              </span>*/}
                            </div>
                          </Link>
                        )}
                      </div>
                      <div className="ms-2">
                        <div className="fw-bolder fs-5 mb-3p">{product.headline}</div>
                        <div className="date fs-7 text-light mb-6p">{product.brand}</div>
                        {product.status === 1 && (
                          <Link
                            variant="link"
                            className="fs-6 text-light p-0 fw-normal"
                            to={'/item/' + product.slug}
                          >
                            <FontAwesomeIcon icon={regular('square-up-right')} className="me-1" />{' '}
                            Go to Post
                          </Link>
                        )}
                      </div>
                    </div>
                    <div className="d-flex align-items-center flex-grow-1">
                      {product.status === 1 && (
                        // }
                        <div className="d-flex align-items-center progress__wrap me-2 flex-grow-1">
                          <div
                            className="d-flex flex-grow-1 align-items-center"
                            style={{ maxWidth: '200px' }}
                          >
                            {!product.unlimited && (
                              <span className="qty__tag pl-9p pb-3p pr-9p pt-3p me-sm-1 fw-bold text-light">
                                {product.soldout}/{product.quantity}
                              </span>
                            )}
                            {/* <ProgressBar
                              variant={!product.unlimited ? 'success' : 'infinity'}
                              now={
                                !product.unlimited
                                  ? Math.round((product.soldout / product.quantity) * 100)
                                  : 100
                              }
                              className="flex-grow-1"
                              style={{ maxWidth: '200px' }}
                            /> */}
                            {!product.unlimited ? (
                              <span className="ms-1 fw-semibold">
                                {Math.round((product.soldout / product.quantity) * 100)}%
                              </span>
                            ) : (
                              <div
                                className="unlimited unlimited--home"
                                style={{ marginLeft: '10px' }}
                              >
                                <div className="tag tag--ongoing _2">
                                  <div className="d-flex icon icon--unlimited text-secondary">
                                    <FontAwesomeIcon icon={solid('infinity')} />
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="qty__tag ms-3 p-2 fw-bold ms-auto">
                            <FontAwesomeIcon icon={solid('up')} className="text-success me-1" />{' '}
                            {organizationDetails.symbol}
                            {revenue}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="billing__buttons d-flex align-items-center">
                      <div className="d-flex gap-2 ms-auto align-items-center">
                        {product.isFulfiled ? (
                          product.unlimited ? (
                            <ButtonShowFulfillOrder
                              onClick={() => props.showFulfillOrder(product)}
                            />
                          ) : (
                            <ButtonShowFulfillOrderArrow
                              onClick={() => {
                                console.log('Product: ', product);
                                props.showFulfillOrder(product);
                              }}
                            />
                          )
                        ) : (
                          product.status === 1 &&
                          (product.quantity <= product.soldout || product.unlimited) && (
                            <ButtonShowFulfillOrder
                              onClick={() => {
                                props.showFulfillOrder(product);
                              }}
                            />
                          )
                        )}

                        {/*Product is unlimited: show edit, allow delte if non sold, & allow publish (assuming unpublish is made)*/}
                        {(product.unlimited || (!product.isFulfiled && !product.unlimited)) && (
                          <>
                            <ButtonEditProduct onClick={() => props.editProduct(product)} />

                            {product.soldout <= 0 && (
                              <ButtonDeleteProduct
                                onClick={() => props.deleteProduct(product._id)}
                              />
                            )}

                            {product.status === -1 && (
                              <ButtonPublishProduct
                                onClick={() => props.publishProduct(product._id, product)}
                              />
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <li className="list__table-list p-2 mb-0">No entries to show</li>
          )}
        </ul>
        <div
          className="list__table__footer py-2 d-flex justify-content-center border-top"
          style={{ background: '#f8fafd78' }}
        >
          {props.totalPages > 1 ? (
            <Stack spacing={2}>
              <Pagination
                count={props.totalPages}
                page={props.pageNo}
                onChange={props.paginationOnChange}
                shape="rounded"
                classes={{ ul: classes.ul }}
                showFirstButton
                showLastButton
              />
            </Stack>
          ) : (
            <></>
          )}
        </div>
      </div>
    </>
  );
};

const ButtonPublishProduct = ({ onClick }) => (
  <Button size="sm" variant="info" className=" mr-2" onClick={onClick}>
    Publish
  </Button>
);

const ButtonDeleteProduct = ({ onClick }) => (
  <Button variant="link" className="p-0  mr-2" onClick={onClick}>
    <FontAwesomeIcon icon={solid('trash')} className="text-danger fs-4 me-2" />
  </Button>
);

const ButtonEditProduct = ({ onClick }) => (
  <Button variant="link" className="p-0 mr-2" onClick={onClick}>
    <FontAwesomeIcon icon={solid('edit')} className="text-warning fs-4 me-2" />
  </Button>
);

const ButtonShowFulfillOrder = ({ onClick }) => (
  <Button
    className="order-1"
    variant="secondary"
    size="sm"
    style={{ marginRight: '10px' }}
    onClick={onClick}
  >
    End Post
  </Button>
);

const ButtonShowFulfillOrderArrow = ({ onClick }) => (
  <Button size="sm" variant="primary" onClick={onClick}>
    {/* <FontAwesomeIcon icon={solid('square-up-right')} className="text-success fs-2 me-2" /> */}
    View Post
  </Button>
);

PostsTable.propTypes = {
  organizationDetails: PropTypes.object,
  order: PropTypes.object,
  productList: PropTypes.arrayOf(PropTypes.object),
  totalPages: PropTypes.number,
  pageNo: PropTypes.number,
  sortField: PropTypes.string,
  editProduct: PropTypes.func,
  deleteProduct: PropTypes.func,
  publishProduct: PropTypes.func,
  paginationOnChange: PropTypes.func,
  handleSortingChange: PropTypes.func,
  showFulfillOrder: PropTypes.func
};

PostsTable.defaultProps = {
  organizationDetails: {},
  order: {},
  productList: [],
  totalPages: 0,
  pageNo: 0,
  sortField: '',
  editProduct: () => console.log('editProduct function is required in the PostTable component'),
  deleteProduct: () => console.log('deleteProduct function is required in the PostTable component'),
  publishProduct: () =>
    console.log('publishProduct function is required in the PostTable component'),
  paginationOnChange: () =>
    console.log('paginationOnChange function is required in the PostTable component'),
  handleSortingChange: () =>
    console.log('handleSortingChange function is required in the PostTable component'),
  showFulfillOrder: () =>
    console.log('showFulfillOrder function is required in the PostTable component')
};

export default PostsTable;
