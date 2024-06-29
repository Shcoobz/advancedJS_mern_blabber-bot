import { Link } from 'react-router-dom';

import { FOOTER } from '../../constants/constants';

import '../../css/components/footer/Footer.css';

/**
 * Footer component of the application that displays footer credit text and a link to the creator's GitHub.
 */
function Footer() {
  /**
   * The main content of the footer, containing dynamic text and a hyperlink to the creator's GitHub profile.
   */
  const footerContent = (
    <div className='footer-container'>
      <p className='footer-text'>
        {FOOTER.CREDIT_TEXT}
        <span>
          <Link className='link-white navigation' to={FOOTER.GITHUB_PROFILE}>
            {FOOTER.CREATOR}
          </Link>
        </span>
        {FOOTER.SEPARATOR}
        <span>
          <Link className='link-white navigation' to={FOOTER.PROJECT_PORTFOLIO}>
            {FOOTER.PROJECT_PORTFOLIO_NAME}
          </Link>
        </span>
      </p>
    </div>
  );

  return <footer>{footerContent}</footer>;
}

export default Footer;
