import { Link } from 'react-router-dom';
import '../../css/components/shared/Navigation.css';

type Props = {
  to: string;
  bg: string;
  text: string;
  textColor: string;
  onClick?: () => Promise<void>;
};

function Navigation(props: Props) {
  return (
    <Link
      onClick={props.onClick}
      className='navigation'
      to={props.to}
      style={{ background: props.bg, color: props.textColor }}>
      {props.text}
    </Link>
  );
}

export default Navigation;
