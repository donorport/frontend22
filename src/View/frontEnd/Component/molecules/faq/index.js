import { Container, Accordion } from "react-bootstrap";

import './style.scss';

const FAQ = () => {
    return (
        <Container fluid className="position-relative py-5">
        <h1 className=" fw-bolder mb-6p text-center">
          Frequently Asked Questions
        </h1>
        <div className="fs-5 fw-semibold text-light mb-4 text-center">
          Browse our most commonly asked questions
        </div>
        <Accordion
          defaultActiveKey="0"
          className="faq__accordion mw-960 mx-auto"
          alwaysOpen
        >
          <Accordion.Item
            eventKey="0"
            className="border-start-0 border-end-0"
          >
            <Accordion.Header className="py-2  border-0">
              <span className="fs-5 fw-semibold">
                Is Donorport a non-profit or charity?
              </span>
            </Accordion.Header>
            <Accordion.Body className="pt-0 pb-4 text-light fs-5">
              Donorport is a platform that connects our users with non-profits
              and charities and does not have non-profit or charity status.
              Donations made on Donorport go directly to the non-profit or
              charity that created the post.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item
            eventKey="1"
            className="border-start-0 border-end-0"
          >
            <Accordion.Header className="py-2  border-0">
              <span className="fs-5 fw-semibold">
                Does Donorport charge a fee to use the platform?
              </span>
            </Accordion.Header>
            <Accordion.Body className="pt-0 pb-4 text-light fs-5">
              Donorport is free for non-profits and charities to create posts
              and receive funding. In order to cover the administration costs,
              2% is added to the donor's subtotal at checkout.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item
            eventKey="2"
            className="border-start-0 border-end-0"
          >
            <Accordion.Header className="py-2  border-0">
              <span className="fs-5 fw-semibold">
                I made a donation in error, can I get a refund?
              </span>
            </Accordion.Header>
            <Accordion.Body className="pt-0 pb-4 text-light fs-5">
              Donors are entitled to a refund if the item they donated to has
              not already been fully funded or the item is an ongoing need. To
              request a refund please contact Donorport Support with your
              transaction ID number.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item
            eventKey="3"
            className="border-start-0 border-end-0"
          >
            <Accordion.Header className="py-2  border-0">
              <span className="fs-5 fw-semibold">
                Will Donorport issue me a tax receipt every year?
              </span>
            </Accordion.Header>
            <Accordion.Body className="pt-0 pb-4 text-light fs-5">
              For the posts marked as tax eligible, Donorport will organize
              all of your tax receipts on your profile page under the Tax tab.
              Here you will find the total balance of donations made for each
              tax year as well as the option to download or email each receipt
              as a .zip file.
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item
            eventKey="4"
            className="border-start-0 border-end-0"
          >
            <Accordion.Header className="py-2  border-0">
              <span className="fs-5 fw-semibold">
                Can I receive a tax receipt if I donated in cryptocurrency?
              </span>
            </Accordion.Header>
            <Accordion.Body className="pt-0 pb-4 text-light fs-5">
              Donations in cryptocurrency are eligible for tax deductions in
              Canada and the United States as well as a number of other
              operating countries. We recommend to always check with your
              national tax laws and confirm eligibility with an accountant
              before donating.
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Container>
    )
}

export default FAQ;