import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer>
      <div
        style={{
          width: '100%',
          minHeight: '20vh',
          maxHeight: '30vh',
          marginTop: 60,
        }}>
        <p style={{ fontSize: '15px', textAlign: 'center', padding: '20px' }}>
          Built by
          <span>
            <Link
              style={{ color: 'white' }}
              className='navigation'
              to={'https://shcoobz.github.io/'}>
              Shcoobz
            </Link>
          </span>
        </p>
      </div>
    </footer>
  );
}

export default Footer;
