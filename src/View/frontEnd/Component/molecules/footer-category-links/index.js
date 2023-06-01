import PropTypes from 'prop-types';
//import { Link } from 'react-router-dom';
import './style.scss';

const propTypes = {
  categoryName: PropTypes.string
};

const defaultProps = {
  categoryName: ''
};

function FooterCategoryLinks({ categoryName, list, ...otherProps }) {
  const sharedProps = {
    categoryName,
    list,
    ...otherProps
  };
  // console.log(sharedProps.list)
  return (
    <div {...otherProps}>
      <div className="footer__category-title d-block mb-2">
        <h5 className="fw-bolder">{sharedProps.categoryName}</h5>
      </div>
      {sharedProps.categoryName === 'Home' && (
        <ul className="list-unstyled footer__links">
          <li className="footer__link-item">
            <a href="/about" className="footer__link">
              About Us
            </a>
          </li>
          <li className="footer__link-item">
            <a href="/media" className="footer__link">
              Press &amp; Media
            </a>
          </li>
          <li className="footer__link-item">
            <a href="/leaderboard" className="footer__link">
              Leaderboard
            </a>
          </li>
          <li className="footer__link-item">
            <a href="/xp" className="footer__link">
              XP
            </a>
          </li>
          <li className="footer__link-item">
            <a href="/ranks" className="footer__link">
              Ranks
            </a>
          </li>
        </ul>
      )}
      {sharedProps.categoryName === 'Support' && (
        <ul className="list-unstyled footer__links">
          <li className="footer__link-item">
            <a href="/apply" className="footer__link">
              Apply to Post
            </a>
          </li>
          {/* <li className="footer__link-item">
            <a href="/help" className="footer__link">
              Help Center
            </a>
          </li>*/}
          <li className="footer__link-item">
            <a href="/partnership" className="footer__link">
              Partnerships
            </a>
          </li>
          <li className="footer__link-item">
            <a href="/sponsors" className="footer__link">
              Sponsorships
            </a>
          </li>
        </ul>
      )}

      {sharedProps.categoryName === 'Information' && (
        <ul className="list-unstyled footer__links">
          <li className="footer__link-item">
            <a href="/trust" className="footer__link">
              Trust &amp; Safety
            </a>
          </li>
          <li className="footer__link-item">
            <a href="/item-tags" className="footer__link">
              Post Tags
            </a>
          </li>
          <li className="footer__link-item">
            <a href="/pricing" className="footer__link">
              Pricing
            </a>
          </li>
        </ul>
      )}
      {sharedProps.categoryName === 'Marketplace' && (
        <ul className="list-unstyled footer__links">
          {sharedProps.list.length > 0 &&
            sharedProps.list.map((l) => {
              return (
                <li className="footer__link-item">
                  <a href={'/categories/' + l.slug} className="footer__link">
                    {l.name}
                  </a>
                </li>
              );
            })}
          {/* <li className="footer__link-item">
            <Link to="/trust" className="footer__link">
              Trust &amp; Safety
            </Link>
          </li>
          <li className="footer__link-item">
            <Link to="/sponsors" className="footer__link">
              Become Verified
            </Link>
          </li>
          <li className="footer__link-item">
            <Link to="/item-tags" className="footer__link">
              Post Tags
            </Link>
          </li> */}
        </ul>
      )}
    </div>
  );
}

FooterCategoryLinks.defaultProps = defaultProps;
FooterCategoryLinks.propTypes = propTypes;

export default FooterCategoryLinks;
