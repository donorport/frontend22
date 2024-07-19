// core
import React, { useState, useEffect } from 'react';

// third party
import {
  Col,
  Container,
  Row
  //Button
} from 'react-bootstrap';

// app specific
// import SuggestionWrapper from "@components/molecules/suggestion-wrapper";
// import {
//   Header,
//   Footer,
//   History,
//   SuggestedList,
//   ItemDetailMain,
//   SimilarItems,
// } from "@components/organisms";

//import Header from '../Component/organisms/header';
import Footer from '../Component/organisms/footer';
import History from '../Component/organisms/history';
import SuggestedList from '../Component/organisms/suggested-list';
import ItemDetailMain from '../Component/organisms/item-detail-main';
import SimilarItems from '../Component/organisms/similar-items';
import SuggestionWrapper from '../Component/molecules/suggestion-wrapper';
import helper from '../../../Common/Helper';
import { GalleryImg } from '../Component/atoms';
import WidgetTitle from '../Component/atoms/widget-title';
import TagTitle from '../Component/atoms/tag-title';
import { useSelector } from 'react-redux';
import funded from '../../../assets/images/funded-badge.png';
// style
import './style.scss';
import HeaderController from '../../../Controller/frontEnd/HeaderController';
import { Link } from 'react-router-dom';

// class ItemDetail extends React.Component {
//   render() {
//     return (
//       <>
//         <Header />
//         <SuggestionWrapper>
//           <SuggestedList />
//         </SuggestionWrapper>
//         <Container fluid className="py-5">
//           <Row>
//             <Col md="7" className="mb-4 mb-0">
//               <ItemDetailMain progress={70} />
//             </Col>
//             <Col md="5">
//               <div className="d-none d-sm-block project__detail-img mb-3">
//                 <img
//                   className="img-fluid"
//                   alt=""
//                   src=""
//                 />
//               </div>
//               <History />
//             </Col>
//           </Row>
//         </Container>
//         <Container fluid>
//           <Row className="py-5 border-top">
//             <Col md="6" className="mb-4 mb-0">
//               <SimilarItems />
//             </Col>
//             <Col md="6"></Col>
//           </Row>
//         </Container>

//         <Footer />
//       </>
//     );
//   }
// }

const ItemDetail = (props) => {
  const user = useSelector((state) => state.user);
  let productDetails = props.productDetails;
  let categoryProducts = props.categoryProducts;
  let similerProductsCount = categoryProducts.filter((e) => e._id !== productDetails._id).length;

  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  const userAuthToken = localStorage.getItem('userAuthToken');
  //const token = CampaignAdminAuthToken ? CampaignAdminAuthToken : userAuthToken;
  const [productListByCountry, setProductListByCountry] = useState([]);
  useEffect(() => {
    setProductListByCountry(
      props.productList.filter((v) => {
        return v.campaignDetails.country_id === user.countryId;
      })
    );
  }, [props.productList]);
  // const isSold = productDetails.unlimited
  //   ? productDetails.isFulfiled
  //   : productDetails.quantity <= productDetails.soldout;

  let isFinish =
    !productDetails.unlimited && productDetails.soldout >= productDetails.quantity ? true : false;
  let isFulfiled = productDetails.isFulfiled;

  const isSold = isFinish || (isFulfiled && !productDetails.unlimited) ? true : false;

  let allProjects = productDetails?.projectProducts?.concat(productDetails?.projectDetails);
  allProjects = allProjects?.filter(
    (value, index, self) => index === self.findIndex((t) => t.projectId === value.projectId)
  );
  return (
    <>
      <HeaderController />
      <SuggestionWrapper>
        <SuggestedList
          itemTag="product"
          productList={productListByCountry}
          productId={productDetails?._id}
          productDetails={productDetails}
        />
      </SuggestionWrapper>
      <Container fluid className="py-3 py-sm-5">
        <Row className="gap-md-0 gap-3">
          <Col md="7">
            <ItemDetailMain
              progress={70}
              productDetails={productDetails}
              addToCart={props.addToCart}
              checkItemInCart={props.checkItemInCart}
              addProductToWishlist={props.addProductToWishlist}
              wishListproductIds={props.wishListproductIds}
              followToProduct={props.followToProduct}
              isFollow={props.isFollow}
            />
          </Col>

          <Col md="5">
            <div className="d-none d-sm-flex project__detail-img mb-3">
              <div
                className="item__bg main"
                style={{ backgroundColor: productDetails?.dominantColor }}
              ></div>
              <img
                className="img-fluid"
                alt=""
                src={helper.CampaignProductFullImagePath + productDetails?.image}
                //style={{ opacity: isSold ? '0.2' : '1' }}
              />
              {isSold ? (
                <img
                  src={funded}
                  loading="lazy"
                  alt=""
                  className="sold sold--item"
                  style={{ bottom: '27%', position: 'relative' }}
                ></img>
              ) : (
                ''
              )}
            </div>
            {productDetails?.productImages && productDetails?.productImages.length > 0 && (
              <div className="gallery__container mb-4" style={{ maxWidth: '400px' }}>
                {productDetails?.productImages &&
                  productDetails?.productImages.length > 0 &&
                  productDetails?.productImages.map((img, key) => {
                    if (img.type === 'moreImage') {
                      // console.log(img)
                      return (
                        <GalleryImg
                          key={key}
                          thumbImgSrc={helper.CampaignProductFullImagePath + img.image}
                          bigImgSrc={helper.CampaignProductFullImagePath + img.image}
                        />
                      );
                    }
                    return null; // Ensure to have a return statement for all cases
                  })}
              </div>
            )}

            <History list={props.purchasedItemList} />
          </Col>
        </Row>
      </Container>

      <Container fluid>
        {/* {productDetails?.projectDetails &&
          productDetails?.projectDetails.length > 0 &&
          productDetails?.projectDetails.map((project, i) => {
            return (
              <div>
                <Row className="py-5 border-top">
                  <Col md="6" className="mb-4 mb-0">
                    <TagTitle>Projects</TagTitle>

                    <div>
                      <WidgetTitle>{project.projectDetails.name}</WidgetTitle>

                      <div className="gallery__container">
                        {project.projectDetails?.projectImages &&
                          project.projectDetails?.projectImages.length > 0 &&
                          project.projectDetails?.projectImages.map((img, i) => {
                            // if (img.type === 'moreImage') {

                            return (
                              <GalleryImg
                                key={i}
                                thumbImgSrc={helper.ProjectImagePath + img.image}
                                bigImgSrc={helper.ProjectImagePath + img.image}
                              />
                            );
                            // }
                          })}
                      </div>

                      <Link
                        to={'/project/' + project.projectDetails?.slug}
                        variant="link"
                        className=" btn btn-info text-white"
                      >
                        <span className="fs-6">Go to Project</span>
                      </Link>
                    </div>
                  </Col>
                </Row>
              </div>
            );
          })} */}
        {/* {          console.log(productDetails?.projectProducts)} */}

        {allProjects &&
          allProjects.length > 0 &&
          allProjects.map((project, key) => {
            return (
              <div key={key}>
                <Row className="py-5 border-top">
                  <Col md="6" className="mb-4 mb-0">
                    <TagTitle>Projects</TagTitle>

                    <div className="d-flex flex-column align-items-start justify-content-start">
                      <WidgetTitle>{project.projectDetails.name}</WidgetTitle>

                      <div className="gallery__container">
                        {project.projectDetails?.projectImages &&
                          project.projectDetails?.projectImages.length > 0 &&
                          project.projectDetails?.projectImages.map((img2, i) => {
                            // if (img.type === 'moreImage') {

                            return (
                              <GalleryImg
                                key={i}
                                thumbImgSrc={helper.ProjectImagePath + img2.image}
                                bigImgSrc={helper.ProjectFullImagePath + img2?.image}
                              />
                            );
                            // }
                          })}
                      </div>

                      <Link
                        to={'/project/' + project.projectDetails?.slug}
                        size="lg"
                        className=" btn btn-info text-white mt-5"
                      >
                        <span className="fs-6">Go to Project</span>
                      </Link>
                    </div>
                  </Col>
                </Row>
              </div>
            );
          })}
        {/* {console.log(productDetails)} */}
        {similerProductsCount > 0 && (
          <Row className="py-5 border-top">
            <Col md="6" className="mb-4 mb-0">
              <SimilarItems
                productDetails={productDetails}
                categoryProducts={props.categoryProducts}
                removeCartItem={props.removeCartItem}
                checkItemInCart={props.checkItemInCart}
                pricingFees={props.pricingFees}
                addToCart={props.addToCart}
              />
            </Col>
            <Col md="6"></Col>
          </Row>
        )}
      </Container>

      <Footer />
    </>
  );
};

export default ItemDetail;
