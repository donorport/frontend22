import { Button, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid } from '@fortawesome/fontawesome-svg-core/import.macro';

// import DefaultLayout from "@templates/default-layout";
import DefaultLayout from '../Component/templates/default-layout';
import './style.scss';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Page from '../../../components/Page';

const Pricing = () => {
  const user = useSelector((state) => state.user);
  console.log('transaction fee:', user.transactionFee);
  console.log('platform fee:', user.platformFee);
  const lineStyle = {
    // display:" -webkit-box",
    // display: "-webkit-flex",
    // display: "-ms-flexbox",
    display: 'flex',
    width: '0px',
    marginRight: '16px',
    marginLeft: '16px',
    '-webkit-box-pack': 'center',
    '-webkit-justify-content': 'center',
    '-ms-flex-pack': 'center',
    justifyContent: 'center',
    '-webkit-box-align': 'center',
    '-webkit-align-items': 'center',
    '-ms-flex-align': 'center',
    /* align-items: center, */
    // fontFamily: 'Font awesome 5 pro solid 900',
    padding: 'unset',
    fontSize: 'xx-large',
    fontWeight: 700
  };

  const syStyle = {
    // display: -webkit-box,
    // display: -webkit-flex,
    // display: -ms-flexbox,
    display: 'flex',
    width: ' 32px',
    height: '42px',
    minHeight: '42px',
    minWidth: ' 32px',
    '-webkit-box-pack': 'center',
    '-webkit-justify-content': 'center',
    '-ms-flex-pack': 'center',
    justifyContent: 'center',
    '-webkit-box-align': 'center',
    '-webkit-align-items': 'center',
    '-ms-flex-align': 'center',
    alignItems: 'center',
    borderRadius: '50%',
    fontSize: 'xx-large',
    fontWeight: 700
  };
  return (
    <Page
      title="Donorport | Pricing"
      description="Platform Fee: 2.99%; Merchant Fees: 2.9%. + $0.30 per item donated"
    >
      <DefaultLayout>
        <div className="password-reset position-relative">
          <Container fluid className="position-relative pb-5 pt-5">
            <div className="d-flex flex-column">
              <h1 className=" fw-bolder mb-6p pt-2">Pricing and Fees</h1>
              <div className="fs-5 text-light pb-2 mb-3 mw-600">
                It is 100% free for charities to create posts and receive funding on Donorport. Each
                donation goes directly to the organization so they receive every penny they need.
              </div>
              <div className="note fs-5 mb-3">
                Donorport includes sales tax in the display price of each post to ensure the charity
                has the exact amount required to purchase their items. Donorport adds a{' '}
                {user.platformFee ? <span>{user.platformFee}%</span> : <span>2.79%</span>} service
                charge at checkout to continue offering our services to the Donorport community. For
                more information, please visit our{' '}
                <a href="/terms" className="link">
                  Terms of service
                </a>
              </div>
              <div className="row py-4 justify-content-center">
                <div className="col-sm-4 mb-3 mb-md-0">
                  <div className=" text-center h-100">
                    <div className="card-body d-flex flex-column">
                      <div className="mb-4">
                        <h5>Platform Fee</h5>
                        {user.platformFee ? (
                          <span className="display-4">{user.platformFee}%</span>
                        ) : (
                          <span className="display-4">2.79%</span>
                        )}
                      </div>

                      <p>
                        Donorport adds{' '}
                        {user.platformFee ? <span>{user.platformFee}%</span> : <span>2.79%</span>}{' '}
                        at checkout to continue offering our services to donors like you.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-1 " style={lineStyle}>
                  <div className="s" style={syStyle}>
                    +
                  </div>
                </div>

                <div className="col-sm-4 mb-3 mb-md-0">
                  <div className=" text-center h-100">
                    <div className="card-body d-flex flex-column">
                      <div className="mb-4">
                        <h5>Merchant Fees</h5>
                        {user.transactionFee ? (
                          <span className="display-4">{user.transactionFee}%</span>
                        ) : (
                          <span className="display-4">2.20%</span>
                        )}
                      </div>

                      <p>
                        + $0.30 per item donated *including debit and credit card charges (Stripe)
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-sm-1 " style={lineStyle}>
                  <div className="s" style={syStyle}>
                    =
                  </div>
                </div>

                <div className="col-sm-3 mb-3 mb-md-0">
                  <div className=" text-center h-100">
                    <div className="card-body d-flex flex-column">
                      <div className="mb-4">
                        <h5>Total</h5>
                        {/* <span className="display-4">{isNaN(totalFees) ? 0 : totalFees.toFixed(1)}%</span> */}
                        {/* <span className="display-4">5%</span> */}
                        <span className="display-4">
                          {(
                            (Number(user?.platformFee) || 2.79) +
                            (Number(user?.transactionFee) || 2.20)
                          ).toFixed(2)}
                          %
                        </span>
                      </div>

                      <p>Paid by the Donor at checkout (non-deductible)</p>
                    </div>
                  </div>
                </div>
              </div>

              <h4 className=" fw-bolder mb-6p pt-2">Still have questions?</h4>

              <p style={{ color: '#9796b1' }} className="mt-3">
                Learn more about how Donorport can help you raise money for your non-profit or
                charity <Link to="/about">here</Link> .
              </p>
            </div>
          </Container>
        </div>
      </DefaultLayout>
    </Page>
  );
};

export default Pricing;
