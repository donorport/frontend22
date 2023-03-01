import { Button, Container, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';
import Avatar from '../Component/atoms/avatar';
import DefaultLayout from '../Component/templates/default-layout';

import './style.scss';

const VerifiedDonors = () => {
  return (
    <DefaultLayout>
      <div className="password-reset position-relative">
        <Container fluid className="position-relative pb-5 pt-5">
          <h1 className="text-dark fw-bolder mb-6p pt-2">Verified Donors</h1>
          <div className="fs-5 text-light mb-5 mw-600">
            Show your fans / followers your commitment to the community by becoming verified. Apply
            to become a verified donor. Verified accounts are able to leave comments on their
            donations.
          </div>
          <div className="d-flex align-items-center bg-lighter p-2 rounded-4 mw-400">
            <Avatar size={46} avatarUrl="" border={0} shadow={false} />
            <div className="ms-3 flex__1">
              <div className="d-flex align-items-center mb-3p">
                <span className="fw-bold text-dark">David Abbott</span>
                <FontAwesomeIcon icon={solid('badge-check')} className="ml-12p fs-5 text-info" />
              </div>
              <div className="d-flex align-items-center text-lighter fs-7 fw-semibold">
                <FontAwesomeIcon icon={solid('heart')} className="me-1" />
                Donated
              </div>
            </div>
            <div className="ml-12p fs-7 fw-normal text-end">
              <div className="text-success fs-5 fw-bold">$10</div>
              <div className="text-lighter fw-bold fs-8">1 hr ago</div>
            </div>
          </div>
          <Form className="mw-400">
            <div className="input__wrap d-flex">
              <label className="input__label flex__1">
                <input type="text" />
                <span className="input__span">Name</span>
              </label>
            </div>
            <div className="input__wrap d-flex">
              <label className="input__label flex__1">
                <input type="email" />
                <span className="input__span">Email</span>
              </label>
            </div>
            <div className="input__wrap d-flex">
              <label className="input__label flex__1">
                <input type="email" />
                <span className="input__span">Confirm Email</span>
              </label>
            </div>

            <div className="input__wrap d-flex">
              <label className="input__label flex__1">
                <textarea rows={5}></textarea>
                <span className="input__span">Tell us why you want to be verified</span>
              </label>
            </div>
            <div className="text-end text-dark mb-2">
              <span className="fw-bold mr-6p">240</span> chars remaining
            </div>
            <Button variant="primary" size="lg" className="fw-bold px-5">
              Apply
            </Button>
          </Form>
        </Container>
      </div>
    </DefaultLayout>
  );
};

export default VerifiedDonors;
