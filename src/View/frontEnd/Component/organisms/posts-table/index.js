import { Button, ProgressBar } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import Avatar from '../../atoms/avatar';
import ListItemImg from '../../atoms/list-item-img';
import './style.scss';
import React, { useEffect } from 'react';
import helper, { priceFormat, getCalculatedPrice } from '../../../../../Common/Helper';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import moment from 'moment';
import { Link } from 'react-router-dom';
import noimg from '../../../../../assets/images/noimg.jpg'

const PostsTable = (props) => {
  let organizationDetails = props.organizationDetails;
  // getProductList={props.getProductList}
  let productList = props.productList;
  const getC = getCalculatedPrice();
  // const CampaignAdmin = JSON.parse(localStorage.getItem('CampaignAdmin'));

  // useEffect(() => {
  //   (async () => {
  //     props.getProductList(organizationDetails._id)
  //   })()
  // }, [organizationDetails])

  // console.log(productList)

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
          style={{
            maxHeight: productList.length > 0 && '600px',
            minHeight: productList.length > 0 && '600px'
          }}
        >
          {productList.length > 0 ? (
            productList.map((product, i) => {
              // console.log(product)
              return (
                <li className="table__list-item p-2">
                  <div className="d-xl-flex align-items-center flex-grow-1">
                    <div
                      className="d-flex align-items-center text-dark me-sm-3 mb-2"
                      style={{ width: '300px' }}
                    >
                      <div className="ms-auto ms-sm-0 me-sm-2 post__value">
                        {
                          product.status === 1 &&

                          <div className="text-success fw-bold fs-5">

                            {organizationDetails.symbol}
                            {priceFormat(product.displayPrice ? product.displayPrice : product.price)}
                            {/* {product.displayPrice ? product.displayPrice : product.price} */}

                          </div>
                        }
                        <div className="text-light fw-light fs-8">
                          {moment(product.created_at).fromNow()}
                        </div>
                      </div>
                      <ListItemImg
                        size={45}
                        imgSrc={product.image ? helper.CampaignProductImagePath + product.image : noimg}
                      />
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
                        {
                          product.status === 1 &&
                          // }
                          <div className="d-flex align-items-center progress__wrap me-2 flex__1">
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
                                  <div className="icon icon--unlimited">
                                    <FontAwesomeIcon icon={solid('infinity')} className="" />
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        }
                      </div>
                    </div>
                    <div className="billing__buttons d-flex align-items-center">
                      {product.projectDetails.length > 0 && (
                        <Button
                          className="project--btn me-auto pt-6p pb-6p pl-6p pr-12p"
                        >
                          <div className="d-flex align-items-center justify-content-center">
                            {product.projectDetails[0].projectMainDetails.projectImages.length >
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
                            ) :
                              <Avatar
                                size={26}
                                border={0}
                                shadow={false}
                                avatarUrl=
                                'https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/5f4ab31be9fe7d7453a60b1f_user.svg'

                              />

                            }
                            <span className="ms-1 fs-7">
                              {product.projectDetails[0].projectMainDetails.name}
                            </span>
                          </div>
                        </Button>
                      )}
                      <div className="ms-auto">
                        {/* <Button variant="link" className="p-0" onClick={() => props.editProduct(product)}>
                            <FontAwesomeIcon
                              icon={solid("edit")}
                              className="text-warning fs-2 me-2"
                            />
                          </Button>
                          {
                            product.quantity <= product.soldout && !product.unlimited &&

                            <Button variant="link" className="p-0">
                              <FontAwesomeIcon
                                icon={solid("square-up-right")}
                                className="text-success fs-2 me-2"
                              />
                            </Button>
                          }

                          <Button variant="link" className="p-0" onClick={() => props.deleteProduct(product._id)}>
                            <FontAwesomeIcon
                              icon={solid("trash")}
                              className="text-danger fs-2 me-2"
                            />
                          </Button>
                          {
                            product.status === -1 &&
                            <Button variant="info" className="" onClick={() => props.publishProduct(product._id)}>
                              Publish
                            </Button>
                          } */}

                        {product.isFulfiled && (
                          <Button
                            variant="link"
                            className="p-0"
                            onClick={() => props.showFulfillOrder(product)}
                          >
                            <FontAwesomeIcon
                              icon={solid('square-up-right')}
                              className="text-success fs-2 me-2"
                            />
                          </Button>
                        )}

                        {(product.status === 1 && product.quantity <= product.soldout && !product.isFulfiled) ||
                          (product.status === 1 && product.unlimited && !product.isFulfiled) ? (
                          <Button
                            variant="success"
                            className="btn-md fw-bold"
                            style={{ marginRight: '10px' }}
                            onClick={() => {
                              props.createPost(true);
                              props.setFulfil(true);
                              props.setFulfilProductDetails(product);
                            }}
                          >
                            Fulfil Order
                          </Button>
                        ) : (
                          <></>
                        )}
                        {!product.isFulfiled && (
                          <>
                            <Button
                              variant="link"
                              className="p-0 mr-2"
                              onClick={() => props.editProduct(product)}
                            >
                              <FontAwesomeIcon
                                icon={solid('edit')}
                                className="text-warning fs-2 me-2"
                              />
                            </Button>
                            {
                              product.soldout <= 0 &&

                              <Button
                                variant="link"
                                className="p-0  mr-2"
                                onClick={() => props.deleteProduct(product._id)}
                              >
                                <FontAwesomeIcon
                                  icon={solid('trash')}
                                  className="text-danger fs-2 me-2"
                                />
                              </Button>
                            }

                            {product.status === -1 && (
                              <Button
                                variant="info"
                                className=" mr-2"
                                onClick={() => props.publishProduct(product._id, product)}
                              >
                                Publish
                              </Button>
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

          {/* 
          <li className="table__list-item p-2">
            <div className="d-xl-flex align-items-center flex-grow-1">
              <div className="d-flex align-items-center text-dark me-sm-3 mb-2">
                <div className="ms-auto ms-sm-0 me-sm-2 post__value">
                  <div className="text-success fw-bold fs-5">$175</div>
                  <div className="text-light fs-8">11 months ago</div>
                </div>
                <ListItemImg
                  size={75}
                  imgSrc="https://uploads-ssl.webflow.com/59df9e77ad9420000140eafe/5c2c261c9a157530d68c2861_rustic-reclaimed-dining-chair-front-view.png"
                />
                <div className="ms-2">
                  <div className="fw-bolder fs-5 mb-3p">Wood Chairs</div>
                  <div className="fs-7 text-light mb-6p">
                    Callum's Wood Finishing
                  </div>
                  <Button variant="link" className="text-light p-0 fw-normal">
                    <FontAwesomeIcon
                      icon={regular("square-up-right")}
                      className="me-1"
                    />{" "}
                    Go to Post
                  </Button>
                </div>
              </div>
              <div className="d-flex align-items-center flex__1 mb-2 mb-sm-0">
                <div className="d-flex align-items-center flex__1">
                  <div className="d-flex align-items-center progress__wrap me-2 flex__1">
                    <span className="qty__tag pl-9p pb-3p pr-9p pt-3p me-sm-1 fw-bold text-light">
                      7/10
                    </span>
                    <ProgressBar
                      variant="success"
                      now={30}
                      className="flex__1"
                    />
                    <span className="text-light ms-1 fw-bold">30%</span>
                  </div>
                </div>
              </div>
              <div className="billing__buttons d-flex align-items-center">
                <Button
                  variant="info"
                  className="me-auto rounded-pill pt-6p pb-6p pl-6p pr-12p"
                >
                  <div className="d-flex align-items-center justify-content-center">
                    <Avatar
                      size={26}
                      border={0}
                      shadow={false}
                      avatarUrl="https://uploads-ssl.webflow.com/59df9e77ad9420000140eafe/5d3f994a03c3fe76a42633a6_1.jpg"
                    />
                    <span className="ms-1 fs-7">E03 Virus</span>
                  </div>
                </Button>
                <div className="ms-auto">
                  <Button variant="link" className="p-0">
                    <FontAwesomeIcon
                      icon={solid("edit")}
                      className="text-warning fs-2 me-2"
                    />
                  </Button>
                  <Button variant="link" className="p-0">
                    <FontAwesomeIcon
                      icon={solid("trash")}
                      className="text-danger fs-2 me-2"
                    />
                  </Button>
                  <Button variant="success" className="rounded-pill fw-bold">
                    Fulfil Order
                  </Button>
                </div>
              </div>
            </div>
          </li> */}
        </ul>
        {props.totalPages > 1 ? (
          <div className="mt-5 d-flex justify-content-center mb-5">
            <Stack spacing={2}>
              <Pagination
                count={props.totalPages}
                variant="outlined"
                color="primary"
                page={props.pageNo}
                onChange={props.handleClick}
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

export default PostsTable;
