import { Container, Accordion } from 'react-bootstrap';

import './style.scss';

const FAQ = () => {
  return (
    <Container fluid className="position-relative py-5 mb-5">
      <h1 className=" fw-bolder mb-6p text-center">FAQ</h1>
      <div className="fs-5 fw-semibold text-light mb-4 text-center">
        Browse our most commonly asked questions
      </div>
      <Accordion defaultActiveKey="0" className="faq__accordion mw-800 mx-auto border" alwaysOpen>
        <Accordion.Item eventKey="0" className="border-top-0 border-start-0 border-end-0 px-4">
          <Accordion.Header className="py-2  border-0">
            <span className="fs-5 fw-semibold">Is Donorport a non-profit or charity?</span>
          </Accordion.Header>
          <Accordion.Body className="pt-0 pb-4 text-light fs-5">
            Donorport is a platform that links users with non-profits and charities, even though it
            isn't a non-profit or charity itself. When you donate through Donorport, your
            contribution goes straight to the non-profit or charity that created the post.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="1" className="border-start-0 border-end-0 px-4">
          <Accordion.Header className="py-2  border-0">
            <span className="fs-5 fw-semibold">
              Does Donorport charge a fee to use the platform?
            </span>
          </Accordion.Header>
          <Accordion.Body className="pt-0 pb-4 text-light fs-5">
            Donorport offers free posting and fundraising features for non-profits and charities. To
            support the platform's administration costs, a nominal fee of 2.79% is applied to the
            donor's subtotal at checkout in addition to the 2.20% payment processing fee charged by
            Stripe.{' '}
            <a href="/pricing" className="link" target="_blank">
              Click here
            </a>{' '}
            for more information about the Donorport pricing structure.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="2" className="border-start-0 border-end-0 px-4">
          <Accordion.Header className="py-2  border-0">
            <span className="fs-5 fw-semibold">
              I made a donation in error, can I get a refund?
            </span>
          </Accordion.Header>
          <Accordion.Body className="pt-0 pb-4 text-light fs-5">
            Donors are entitled to a refund if the item they donated to has not already been fully
            funded or purchased by the organization. To request a refund please contact{' '}
            <a href="mailto:support@donorport.com" className="link">
              support
            </a>
            &nbsp;with your transaction ID number.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="3" className="border-start-0 border-end-0 px-4">
          <Accordion.Header className="py-2  border-0">
            <span className="fs-5 fw-semibold">Will Donorport issue a tax receipt every year?</span>
          </Accordion.Header>
          <Accordion.Body className="pt-0 pb-4 text-light fs-5">
            Donorport monitors tax receipt-eligible donations and provides organizations with the
            capability to upload donation receipts directly onto the platform. Users can access a
            comprehensive overview of all donations made throughout each tax year, along with the
            option to download or email individual receipts conveniently bundled as a .zip file.
          </Accordion.Body>
        </Accordion.Item>

        <Accordion.Item eventKey="4" className="border-bottom-0 border-start-0 border-end-0 px-4">
          <Accordion.Header className="py-2  border-0">
            <span className="fs-5 fw-semibold">
              Are there obligations of the charities when they sign up?
            </span>
          </Accordion.Header>
          <Accordion.Body className="pt-0 pb-4 text-light fs-5">
            At Donorport, there are no obligations for charities upon signing up. Posting and
            receiving funding are entirely free, and organizations are not bound by any commitments.
            Charities retain the freedom to delete their posts or accounts at any time without
            facing any penalties.
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
    </Container>
  );
};

export default FAQ;
