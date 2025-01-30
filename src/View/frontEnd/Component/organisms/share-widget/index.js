import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { solid, regular, brands } from '@fortawesome/fontawesome-svg-core/import.macro';

import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import helper from '../../../../../Common/Helper';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  EmailShareButton,
  EmailIcon,
  LinkedinIcon,
  FacebookIcon,
  TwitterIcon
} from 'react-share';
import ClickAwayListener from '@mui/base/ClickAwayListener';
import './style.scss';

function ShareWidget({ page, text, pageTitle, currUrl }) {
  const [active, setActive] = useState(0);
  const [copySuccess, setCopySuccess] = useState('Copy Link');
  const location = useLocation();
  const [currentPageLink, setCurrentPageLink] = useState('');
  
  function copyToClipboard() {
    navigator.clipboard.writeText(currentPageLink);
    setCopySuccess('Copied!');
  }

  const handleClose = () => {
    setActive(false);
  };

  useEffect(() => {
    setCurrentPageLink(helper.apiPath + location.pathname);
  }, [location]);

  const onClickShare = () => {
    // if (navigator.share) {
    navigator
      .share({
        title: pageTitle,
        url: currUrl,
        text: text
      })
      .then(() => {
        //  console.log('Thanks for sharing!');
      })
      .catch(console.error);

    //  } else {
    //      shareDialog.classList.remove('hidden');
    //  }
  };

  return (
    <div className="position-relative">
      {/*FOR DESKTOP: launches modal with react-share*/}
      <Button
        size="md"
        onClick={() => setActive(!active)}
        className="ms-1 d-none d-sm-flex text-white"
      >
        <FontAwesomeIcon className="me-0 me-sm-1" icon={regular('share')} /> Share
      </Button>
      {/*FOR MOBILE: launches Navigator on mobile devices*/}
      <Button size="sm" onClick={() => onClickShare()} className="ms-1 d-flex d-sm-none text-white">
        <FontAwesomeIcon className="ms-0 ms-sm-1" icon={regular('share')} />
      </Button>

      {active ? (
        <div className="share-dialog share-dialog--post">
          <ClickAwayListener onClickAway={handleClose}>
            <div className="sh__box">
              <div className="d-flex flex-row">
                <div className="sh__header flex-grow-1">
                  <div>Share this post.</div>
                </div>
                <div className="sh__header">
                  <Button
                    variant="link"
                    onClick={() => {
                      setActive(!active);
                      setCopySuccess('Copy Link');
                    }}
                    className="icon icon--close"
                  >
                    <FontAwesomeIcon icon={regular('close')} />
                  </Button>
                </div>
              </div>
              <div className="sh__list gap-2">
                {/* <a
                href="https://www.twitter.com"
                className="sh__type sh__type--twitter"
              >
                <FontAwesomeIcon icon={brands("twitter")} />
              </a> */}
                <TwitterShareButton
                  //title={pageTitle + "- " + text}
                  title={text}
                  hashtags={['Donation', 'Charity']}
                  url={currUrl}
                  // hashtags={["hashtag1", "hashtag2"]}
                >
                  <TwitterIcon size={38} borderRadius={9} />
                </TwitterShareButton>

                {/* <a
                href="https://www.twitter.com"
                className="sh__type sh__type--facebook"
              >
                <FontAwesomeIcon icon={brands("facebook")} />
              </a> */}
                <FacebookShareButton
                  title={pageTitle + '- ' + text}
                  url={currUrl}
                  quote={text}
                  // className="Demo__some-network__share-button"
                >
                  <FacebookIcon size={38} borderRadius={9} />
                </FacebookShareButton>

                {/* <EmailShareButton
                  url={currentPageLink}
                  quote={currentPageLink}
                  className="Demo__some-network__share-button"
                >
                  <EmailIcon size={32} round />
                </EmailShareButton> */}

                {/* <a
                href="https://www.twitter.com"
                className="sh__type sh__type--email"
              >
                <FontAwesomeIcon icon={solid("envelope")} />
              </a> */}

                {/* <a
                href="https://www.twitter.com"
                className="sh__type sh__type--linkedin"
              >
                <FontAwesomeIcon icon={brands("linkedin-in")} />
              </a> */}

                <LinkedinShareButton
                  url={currUrl}
                  title={text}
                  summary={text}
                  source={pageTitle}
                  target="_blank"
                >
                  <LinkedinIcon size={38} borderRadius={9} />
                </LinkedinShareButton>
              </div>
              <div className="sh__header share__header--sub">
                <div>Or copy link</div>
              </div>
              <div className="sh__link">
                <a href="#" className="icon icon--secure">
                  <FontAwesomeIcon icon={solid('lock')} />
                </a>
                <div className="sh__url">{currUrl}</div>
                <Button
                  size="sm"
                  className="btn-outline-primary"
                  variant={copySuccess === 'Copied!' ? 'info' : 'outline-info'}
                  onClick={() => copyToClipboard()}
                >
                  {copySuccess}
                </Button>
              </div>
            </div>
          </ClickAwayListener>
        </div>
      ) : (
        ''
      )}
    </div>
  );
}

export default ShareWidget;
