import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { regular } from '@fortawesome/fontawesome-svg-core/import.macro';
import './style.scss';
import Page from '../../../components/Page';
import Logo from '../Component/atoms/logo';
import Toggle from '../Component/organisms/toggle';

const Activation = (props) => {
  const blocks = props.blocks;
  const activateCode = props.activateCode;

  return (
    <Page
      title="Donorport | Activate"
      description="Activate you charity account. For more information about the application process please naviagte to the About Us page"
    >
      <div className="frontend_pages">
        {' '}
        <div className="container d-flex flex-column flex-sm-row password-reset position-relative p-0">
          {' '}
          <div className="apply__left p-5 col-sm-6 col-md-5 mw-600">
            <div className="d-flex gap-1 align-items-center mt-5">
              <Logo />
              <Toggle />
            </div>
            <div className="d-flex flex-column gap-5">
              <div>
                <h1 className="pt-5 mt-5 fw-bolder pt-2 mb-4">Activate</h1>
                <p className="text-light mb-2 mw-600">
                  Enter your 4 digit activation code you received in the box below to activate your
                  account. Once you have activated your account, log in using the credientials you
                  entered when you created your account.
                </p>
                <div className="d-flex gap-3 flex-wrap mt-5 mb-1 mw-600">
                  <div className="flex-grow-1 d-flex">
                    <div className="activate__code d-flex gap-1 flex-grow-1 justify-content-around">
                      {blocks}
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    className="flex-grow-1 activate__button fw-bold py-2 px-4"
                    style={{ height: 'auto', borderRadius: '36px' }}
                    onClick={() => activateCode()}
                  >
                    Activate
                  </Button>
                </div>
              </div>

              <footer className="mt-auto main-footer w-100">
                <div className="container-fluid">
                  <div className="d-flex gap-3 footer-bottom py-5 fs-6">
                    <div>&copy; 2025 Donorport, Inc.</div>
                    <a href="/privacy">Privacy Policy</a>
                    <a href="/terms">Terms of Service</a>
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Activation;
