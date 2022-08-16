import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  solid,
  regular,
  brands,
} from "@fortawesome/fontawesome-svg-core/import.macro";

import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import helper from "../../../../../Common/Helper";
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton, EmailShareButton, EmailIcon, LinkedinIcon, FacebookIcon, TwitterIcon, } from "react-share";

import "./style.scss";

function ShareWidget() {
  const [active, setActive] = useState(0);
  const [copySuccess, setCopySuccess] = useState('Copy Link');
  const location = useLocation()
  const [currentPageLink, setCurrentPageLink] = useState('');



  function copyToClipboard() {
    navigator.clipboard.writeText(currentPageLink)
    setCopySuccess('Copied!');
  };


  useEffect(() => {
    setCurrentPageLink(helper.websitePath + location.pathname)
  }, [location])


  const onClickShare = ()=>{
    // if (navigator.share) { 
      navigator.share({
         title: 'Donorport',
         url: currentPageLink,
         text: 'Check out Social Chain on Donorport',
       }).then(() => {
        //  console.log('Thanks for sharing!');
       })
       .catch(console.error);

      //  } else {
      //      shareDialog.classList.remove('hidden');
      //  }
  }


  return (
    <div className="position-relative">
      {/* <Button variant="link" onClick={() => setActive(!active)} className="btn__share text-light"> */}
      <Button variant="link" onClick={() => onClickShare()} className="btn__share text-light">

        <FontAwesomeIcon icon={regular("share-nodes")} />
      </Button>
      {active ? (
        <div className="share-dialog share-dialog--post">
          <div className="sh__box">
            <div className="sh__header">
              <Button
                variant="link"
                onClick={() => {
                  setActive(!active)
                  setCopySuccess('Copy Link')
                }
                }
                className="icon icon--close"
              >
                <FontAwesomeIcon icon={regular("close")} />
              </Button>
            </div>
            <div className="sh__header">
              <div>Share this post.</div>
            </div>
            <div className="sh__list">

              {/* <a
                href="https://www.twitter.com"
                className="sh__type sh__type--twitter"
              >
                <FontAwesomeIcon icon={brands("twitter")} />
              </a> */}
              <TwitterShareButton
                title='Twitter'
                url={currentPageLink}
              // hashtags={["hashtag1", "hashtag2"]}
              >
                <TwitterIcon size={32} round />

              </TwitterShareButton>


              {/* <a
                href="https://www.twitter.com"
                className="sh__type sh__type--facebook"
              >
                <FontAwesomeIcon icon={brands("facebook")} />
              </a> */}

              <FacebookShareButton
                url={currentPageLink}
                quote={currentPageLink}
                className="Demo__some-network__share-button"
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>


              <EmailShareButton
                url={currentPageLink}
                quote={currentPageLink}
                className="Demo__some-network__share-button"
              >
                <EmailIcon size={32} round />
              </EmailShareButton>

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
                url={currentPageLink}
                // source=""
                // quote={currentPageLink}
                // hashtag={"#hashtag #new"}
                // description={"aiueo"}
                className="Demo__some-network__share-button"
              >
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>

            </div>
            <div className="sh__header share__header--sub">
              <div>Or copy link</div>
            </div>
            <div className="sh__link">
              <a href="#" className="icon icon--secure">
                <FontAwesomeIcon icon={solid("lock")} />
              </a>
              <div className="sh__url">
                {currentPageLink}
              </div>
              <Button variant={copySuccess === 'Copied!' ? 'info' : "outline-info"} onClick={() => copyToClipboard()}
              >{copySuccess}</Button>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default ShareWidget;
