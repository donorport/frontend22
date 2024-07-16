import {
  Button,
  Container,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { regular } from "@fortawesome/fontawesome-svg-core/import.macro";

// import { HeaderHelp, Footer } from "@components/organisms";
// import HelpBanner from "@components/molecules/help-banner";
// import HelpContentFooter from "@components/molecules/help-content-footer";

import HeaderHelp from "../Component/organisms/header-help";
import HelpBanner from "../Component/molecules/help-banner";
import HelpContentFooter from "../Component/molecules/help-content-footer";
import Footer from "../Component/organisms/footer";

import "./style.scss";

const HelpCategory = () => {
  return (
    <>
      <HeaderHelp />
      <div className="position-relative">
        <HelpBanner shortBanner={true} />

        <div className="py-1 bg-lighter">
          <div className="mw-960 mx-auto d-flex align-items-center">
            <a href="/help" className="breadcrumb-link ">
              Home
            </a>
            <div className="breadcrumb-slash ">/</div>
            <a
              href="/help-categories/non-profits-charities"
              className="breadcrumb-link "
            >
              Non-profits &amp; Charities
            </a>
            <div className="breadcrumb-slash ">/</div>
          </div>
        </div>

        <Container fluid className="py-4">
          <div className="mw-960 mx-auto pt-3">
            <h1 className=" fw-bolder d-flex align-items-center mb-2 pb-5">
              <span className="me-2">Non-profits & Charities</span>
              <FontAwesomeIcon
                icon={regular("heart-half-stroke")}
                className="text-light fs-2"
              />
            </h1>
            <div className="grid__list">
              <div>
                <Button
                  variant="outline-white"
                  className="border text-start p-20p  w-100 h-100 fw-normal fs-5"
                >
                  <div className="text-info mb-1">
                    How often are payments disbursed to my Bank Account?
                  </div>
                  <div className="text-light">
                    Aut et perspiciatis repellendus commodi aspernatur. Non unde
                    qui ut. Ut ea
                  </div>
                </Button>
              </div>
              <div>
                <Button
                  variant="outline-white"
                  className="border text-start p-20p  w-100 h-100 fw-normal fs-5"
                >
                  <div className="text-info mb-1">
                    Managing your Admin account
                  </div>
                  <div className="text-light">
                    Consequuntur recusandae explicabo nihil. Autem asperiores
                    rerum necessitatibus maiores ad minima quas repe
                  </div>
                </Button>
              </div>
              <div>
                <Button
                  variant="outline-white"
                  className="border text-start p-20p  w-100 h-100 fw-normal fs-5"
                >
                  <div className="text-info mb-1">
                    How to create an Organization account
                  </div>
                  <div className="text-light">
                    Architecto perspiciatis eos nemo rerum ut reiciendis dolorem
                    pariatur totam. Iure tempora sit dolor
                  </div>
                </Button>
              </div>
              <div>
                <Button
                  variant="outline-white"
                  className="border text-start p-20p  w-100 h-100 fw-normal fs-5"
                >
                  <div className="text-info mb-1">
                    How to accept Crypto as a payment method
                  </div>
                  <div className="text-light">
                    Corrupti nihil consectetur facere rerum ut dolores et.
                    Tempore sunt
                  </div>
                </Button>
              </div>
              <div>
                <Button
                  variant="outline-white"
                  className="border text-start p-20p  w-100 h-100 fw-normal fs-5"
                >
                  <div className="text-info mb-1">
                    How to set up your Bank Account to receive your donations
                  </div>
                  <div className="text-light">
                    Consequuntur recusandae explicabo nihil. Autem asperiores
                    rerum necessitatibus maiores ad minima quas repe
                  </div>
                </Button>
              </div>
            </div>
          </div>
        </Container>
        
        <HelpContentFooter />
       
      </div>
      <Footer />
    </>
  );
};

export default HelpCategory;
