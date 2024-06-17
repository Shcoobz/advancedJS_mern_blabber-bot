import { Link } from 'react-router-dom';

import '../../css/components/shared/Navigation.css';

type Props = {
  to: string;
  text: string;
  className?: string;
  onClick?: () => Promise<void>;
};

function Navigation({ to, text, className, onClick }: Props) {
  return (
    <Link onClick={onClick} className={`navigation ${className}`} to={to}>
      {text}
    </Link>
  );
}
export default Navigation;
