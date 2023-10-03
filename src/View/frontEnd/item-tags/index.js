import { Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import ListItemImg from '../Component/atoms/list-item-img';
import DefaultLayout from '../Component/templates/default-layout';
import Page from '../../../components/Page';
import receipt from '../../../assets/images/receipt.svg';
import './style.scss';

const ItemTags = () => {
  return (
    <Page
      title="Donorport | Badges"
      description="Learn about each post type and quickly determine if your donation is tax eligible, has already been purchased, or will receive followup media"
    >
      <DefaultLayout>
        <div className="password-reset position-relative">
          <Container fluid className="position-relative pb-5 pt-5">
            <div className="mw-600">
              <h1 className=" fw-bolder mb-6p pt-2">Post Tags</h1>
              <div className="fs-5 text-light pb-5 mb-3 mw-600">
                Every item posted by an organization is marked with symbols to quickly show the
                donors the status and type of each item. From the item's eligibility for tax
                receipts, whether the item has already been purchased, whether your donation is
                helping pick up the tab, or if the item is related to a project.
              </div>

              <ul className="list-unstyled mb-0 mb-sm-5">
                <li className="d-flex align-items-center py-3">
                  <div className="trust__image list__item-img flex-shrink-0">
                    <img style={{ height: '32px' }} src={receipt}></img>
                  </div>
                  {/* <ListItemImg
                    size={84}
                    className="flex-shrink-0"
                    icon={
                      <FontAwesomeIcon icon={solid('paperclip')} className="fs-2 text-info p-3" />
                    }
                  /> */}
                  <div className="ms-3">
                    <h3 className="fs-4 mb-0 fw-bolder ">Tax Receipt Eligible</h3>
                    <div className="text-light fs-5 lh-1.5">
                      Items marked with this symbol are eligible to receive a tax receipt. If you
                      are interested in tax deductible giving, look for the items marked with the
                      calculator icon.
                    </div>
                  </div>
                </li>

                <li className="d-flex align-items-center py-3">
                  <ListItemImg
                    size={84}
                    className="trust__image flex-shrink-0"
                    icon={
                      <FontAwesomeIcon
                        icon={solid('tag')}
                        color="rgb(148, 122, 218)"
                        className="fs-2 p-3"
                      />
                    }
                  />
                  <div className="ms-3">
                    <h3 className="fs-4 mb-0 fw-bolder ">Tab Item</h3>
                    <div className="text-light fs-5 lh-1.5">
                      These are items that the organization has already purchased. By donating to
                      Tab items, you are helping the organization recouperate the costs of the
                      purchase they've already made.
                    </div>
                  </div>
                </li>
                <li className="d-flex align-items-center py-3">
                  <ListItemImg
                    size={84}
                    className="trust__image flex-shrink-0"
                    icon={
                      <FontAwesomeIcon icon={solid('camera')} className="fs-2 text-primary p-3" />
                    }
                  />
                  <div className="ms-3">
                    <h3 className="fs-4 mb-0 fw-bolder ">Media</h3>
                    <div className="text-light fs-5 lh-1.5">
                      Items marked with a camera indicate that the charity will upload follow-up
                      media for your donation. You will be able to track this media on your profile
                      page inside of the Items tab.
                    </div>
                  </div>
                </li>
                <li className="d-flex align-items-center py-3">
                  <ListItemImg
                    size={84}
                    className="trust__image flex-shrink-0"
                    icon={
                      <FontAwesomeIcon icon={solid('bolt')} className="fs-2 text-primary p-3" />
                    }
                  />
                  <div className="ms-3">
                    <h3 className="fs-4 mb-0 fw-bolder ">Project Item</h3>
                    <div className="text-light fs-5 lh-1.5">
                      Items marked with a lightening bolt belong to a group of items the
                      organization has created for a specific event or cause, like a toy drive or
                      fundraiser.
                    </div>
                  </div>
                </li>
                <li className="d-flex align-items-center py-3">
                  <ListItemImg
                    size={84}
                    className="trust__image flex-shrink-0"
                    icon={
                      <FontAwesomeIcon
                        icon={solid('infinity')}
                        color="#756fe4"
                        className="fs-2 p-3"
                      />
                    }
                  />
                  <div className="ms-3">
                    <h3 className="fs-4 fw-bolder mb-0 ">Unlimited Quantity</h3>
                    <div className="text-light fs-5 lh-1.5">
                      Items without a set quantity are marked with the infinity symbol and represent
                      an ongoing need of the organization. The are items that are always needed for
                      day-to-day operations.
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </Container>
        </div>
      </DefaultLayout>
    </Page>
  );
};

export default ItemTags;
