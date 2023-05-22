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
      '& .MuiPaginationItem-root': {
        color: '#6f6f91 !important'
      },
      '& .MuiPaginationItem-root:hover': {
        background: '#f2f6fc !important'
      },
      '& .Mui-selected': {
        background: '#f2f6fc !important'
      }
    }
  }));
  const classes = useStyles();

  return (
    <>
      <div className="list__table mb-5">
        <div className="list__table-sort d-flex justify-content-sort">
          <div className="flex__1">
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
              console.log('~~ postTable - productList map:', { product });
              let revenue = Number(product.displayPrice * product.soldout).toLocaleString('en-US', {
                maximumFractionDigits: 2
              });
              if (product._id === '631f84a614725993eb90cd39') console.log('Product Map: ', product);
              return (
                <li key={product._id} className="table__list-item p-2 border-bottom">
                  <div className="d-xl-flex align-items-center flex-grow-1">
                    <div className="progress__wrap d-flex align-items-center text-dark me-sm-3 mb-2">
                      <div className="ms-auto ms-sm-0 me-sm-2 post__value">
                        {product.status === 1 && (
                          <div className="text-light fw-bold fs-5">
                            {organizationDetails.symbol}
                            {priceFormat(
                              product.displayPrice ? product.displayPrice : product.price
                            )}
                            {/* {product.displayPrice ? product.displayPrice : product.price} */}
                          </div>
                        )}
                        <div className="text-light fw-light fs-8">
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
                        <div className="fs-7 text-light mb-6p">{product.brand}</div>
                        {product.status === 1 && (
                          <Link
                            variant="link"
                            className="text-light p-0 fw-normal"
                            to={'/item/' + product.slug}
                          >
                            <FontAwesomeIcon icon={regular('square-up-right')} className="me-1" />{' '}
                            Go to Post
                          </Link>
                        )}
                      </div>
                    </div>
                    <div className="d-flex align-items-center flex__1 mb-2 mb-sm-0">
                      <div className="d-flex align-items-center flex__1">
                        {product.status === 1 && (
                          // }
                          <div className="d-flex align-items-center progress__wrap me-2 flex__1">
                            <div
                              className="d-flex flex__1 align-items-center"
                              style={{ maxWidth: '200px' }}
                            >
                              {!product.unlimited && (
                                <span className="qty__tag pl-9p pb-3p pr-9p pt-3p me-sm-1 fw-bold text-light">
                                  {product.soldout}/{product.quantity}
                                </span>
                              )}
                              <ProgressBar
                                variant={!product.unlimited ? 'success' : 'infinity'}
                                now={
                                  !product.unlimited
                                    ? Math.round((product.soldout / product.quantity) * 100)
                                    : 100
                                }
                                className="flex__1"
                                style={{ maxWidth: '200px' }}
                              />
                              {!product.unlimited ? (
                                <span className="text-light ms-1 fw-bold">
                                  {Math.round((product.soldout / product.quantity) * 100)}%
                                </span>
                              ) : (
                                <div
                                  className="unlimited unlimited--home"
                                  style={{ marginLeft: '10px' }}
                                >
                                  <div className="tag tag--ongoing _2">
                                    <div className="d-flex icon icon--unlimited">
                                      <FontAwesomeIcon icon={solid('infinity')} className="" />
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                            <div className="qty__tag ms-3 p-2 fw-bold text-light ms-auto">
                              <FontAwesomeIcon icon={solid('up')} className="text-success me-1" />{' '}
                              {organizationDetails.symbol}
                              {revenue}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="billing__buttons d-flex align-items-center">
                      <div className="ms-auto">
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
                              <ButtonDeleteProduct onClick={() => props.deleteProduct(product._id)} />
                            )}

                            {product.status === -1 && (
                              <ButtonPublishProduct onClick={() => props.publishProduct(product._id, product)} />
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
            <li className="table__list-item p-2 fw-bold d-flex justify-content-center">
              No entries to show
            </li>
          )}
        </ul>

        {props.totalPages > 1 ? (
          <div
            className="py-2 mt-2 d-flex justify-content-center border-top"
            style={{ background: '#f8fafd78' }}
          >
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
          </div>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

const ButtonPublishProduct = ({onClick}) => (
  <Button
    variant="info"
    className=" mr-2"
    onClick={onClick}
  >
    Publish
  </Button>
)

const ButtonDeleteProduct = ({onClick}) => (
  <Button
    variant="link"
    className="p-0  mr-2"
    onClick={onClick}
  >
    <FontAwesomeIcon
      icon={solid('trash')}
      className="text-danger fs-2 me-2"
    />
  </Button>
)

const ButtonEditProduct = ({onClick}) => (
  <Button
    variant="link"
    className="p-0 mr-2"
    onClick={onClick}
  >
    <FontAwesomeIcon
      icon={solid('edit')}
      className="text-warning fs-2 me-2"
    />
  </Button>
)

const ButtonShowFulfillOrder = ({onClick}) => (
  <Button
    variant="success"
    className="btn-md fw-bold"
    style={{ marginRight: '10px' }}
    onClick={onClick}
  >
    Fulfill Order
  </Button>
)

const ButtonShowFulfillOrderArrow = ({onClick}) => (
  <Button
    variant="link"
    className="p-0"
    onClick={onClick}
  >
    <FontAwesomeIcon
      icon={solid('square-up-right')}
      className="text-success fs-2 me-2"
    />
  </Button>
)

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
