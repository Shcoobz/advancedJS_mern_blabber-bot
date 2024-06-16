import { Link } from 'react-router-dom';

import '../../css/components/shared/Navigation.css';

type Props = {
  to: string;
  bgColor: string;
  text: string;
  textColorClass: string;
  onClick?: () => Promise<void>;
};

function Navigation({ to, bgColor, text, textColorClass, onClick }: Props) {
  return (
    <Link onClick={onClick} className={`navigation ${bgColor} ${textColorClass}`} to={to}>
      {text}
    </Link>
  );
}

export default Navigation;
