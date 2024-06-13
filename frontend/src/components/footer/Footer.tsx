import { Link } from 'react-router-dom';
import '../../css/components/footer/Footer.css';

function Footer() {
  return (
    <footer>
      <div className='footer-container'>
        <p className='footer-text'>
          Built by
          <span>
            <Link className='link-white navigation' to={'https://shcoobz.github.io/'}>
              Shcoobz
            </Link>
          </span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
