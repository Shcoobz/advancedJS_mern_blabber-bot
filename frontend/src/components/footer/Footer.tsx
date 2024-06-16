import { Link } from 'react-router-dom';

import { CREATOR, FOOTER_CREDIT_TEXT, GITHUB_URL } from '../../constants/constants';

import '../../css/components/footer/Footer.css';

function Footer() {
  return (
    <footer>
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
    </footer>
  );
}

export default Footer;
