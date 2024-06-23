import { Link } from 'react-router-dom';

import { CREATOR, FOOTER_CREDIT_TEXT, GITHUB_URL } from '../../constants/constants';

import '../../css/components/footer/Footer.css';

/**
 * Footer component of the application that displays footer credit text and a link to the creator's GitHub.
 * This component uses constants for dynamic values and a CSS file for styling.
 *
 * @returns {JSX.Element} The footer section of the application, which includes dynamic text and a hyperlink.
 */
function Footer() {
  /**
   * The main content of the footer, containing dynamic text and a hyperlink to the creator's GitHub profile.
   * Utilizes the `FOOTER_CREDIT_TEXT` for the credit text and `CREATOR` for the GitHub link text, both sourced from constants.
   * The `GITHUB_URL` constant is used as the destination for the link.
   */
  const footerContent = (
    <div className='footer-container'>
      <p className='footer-text'>
        {FOOTER_CREDIT_TEXT}
        <span>
          <Link className='link-white navigation' to={GITHUB_URL}>
            {CREATOR}
          </Link>
        </span>
      </p>
    </div>
  );

  return <footer>{footerContent}</footer>;
}

export default Footer;
