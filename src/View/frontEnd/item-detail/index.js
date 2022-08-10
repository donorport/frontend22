// core
import React from "react";

// third party
import { Col, Container, Row, Button } from "react-bootstrap";

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

import Header from "../Component/organisms/header";
import Footer from "../Component/organisms/footer";
import History from "../Component/organisms/history";
import SuggestedList from "../Component/organisms/suggested-list";
import ItemDetailMain from "../Component/organisms/item-detail-main"
import SimilarItems from "../Component/organisms/similar-items";
import SuggestionWrapper from "../Component/molecules/suggestion-wrapper";
import helper from "../../../Common/Helper";
import { GalleryImg } from "../Component/atoms";

// style
import "./style.scss";
import HeaderController from "../../../Controller/frontEnd/HeaderController";
import { Link } from "react-router-dom";


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
//                   src="https://uploads-ssl.webflow.com/59df9e77ad9420000140eafe/5c2c26551110ec14dd05ef15_image%20(1).png"
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
  let productDetails = props.productDetails

  const CampaignAdminAuthToken = localStorage.getItem('CampaignAdminAuthToken');
  const userAuthToken = localStorage.getItem('userAuthToken');
  const token = CampaignAdminAuthToken ? CampaignAdminAuthToken : userAuthToken

  const isSold = productDetails.unlimited ? productDetails.isFulfiled : productDetails.quantity <= productDetails.soldout

  return (
    <>
      <HeaderController />
      <SuggestionWrapper>
        <SuggestedList itemTag="product" productList={props.productList} productId={productDetails?._id} productDetails={productDetails} />
      </SuggestionWrapper>
      <Container fluid className="py-5">
        <Row>
          <Col md="7" className="mb-4 mb-0">


            <ItemDetailMain progress={70} productDetails={productDetails} addToCart={props.addToCart} checkItemInCart={props.checkItemInCart}
              addProductToWishlist={props.addProductToWishlist} wishListproductIds={props.wishListproductIds}
              followToProduct={props.followToProduct}
              isFollow={props.isFollow}
            />
          </Col>
          <Col md="5">
            <div className="d-none d-sm-block project__detail-img mb-3">
              <img
                className="img-fluid"
                alt=""
                src={helper.CampaignProductFullImagePath + productDetails?.image}
              />



            </div>
            <div className="gallery__container m-2">
              {

                productDetails?.productImages && productDetails?.productImages.length > 0 &&
                productDetails?.productImages.map((img, i) => {
                  if (img.type === 'moreImage') {

                    return (
                      <GalleryImg
                        key={i}
                        thumbImgSrc={

                          helper.CampaignProductImagePath + img.image
                        }
                        bigImgSrc={
                          helper.CampaignProductFullImagePath + img.image
                        }
                      />
                    )
                  }
                })
              }

            </div>




            {
              isSold ?

                <img src="https://uploads-ssl.webflow.com/59de7f3f07bb6700016482bc/5d41c138db84bd176388cc01_sold-out.svg" loading="lazy" alt="" className="sold sold--item" style={{ bottom: "27%", position: "relative" }}></img> : ""}


            <History list={props.purchasedItemList} />
          </Col>
        </Row>



      </Container>

      <Container fluid>

        {
          productDetails?.projectDetails && productDetails?.projectDetails.length > 0 &&
          productDetails?.projectDetails.map((project, i) => {
            return (
              <div>
                <Row className="py-5 border-top">
                  <Col md="6" className="mb-4 mb-0">
                    <h6>Projects</h6>

                    <div>
                      <h6 style={{ color: "grey" }}>{project.projectDetails.name}</h6>

                      <div className="gallery__container m-2">
                        {

                          project.projectDetails?.projectImages && project.projectDetails?.projectImages.length > 0 &&
                          project.projectDetails?.projectImages.map((img, i) => {
                            // if (img.type === 'moreImage') {

                            return (
                              <GalleryImg
                                key={i}
                                thumbImgSrc={

                                  helper.ProjectImagePath + img.image
                                }
                                bigImgSrc={
                                  helper.ProjectImagePath + img.image
                                }
                              />
                            )
                            // }
                          })
                        }
                      </div>

                      <Link to={'/project/' + project.projectDetails?.slug} variant="link" className=" btn btn-info text-white">
                        <span className="fs-6">Go to Project</span>
                      </Link>
                    </div>


                  </Col>
                </Row>
              </div>
            )
          })
        }




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
          <Col md="6">

          </Col>
        </Row>
      </Container>

      <Footer />
    </>
  );

}

export default ItemDetail;
