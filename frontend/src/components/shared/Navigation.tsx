import { Link } from 'react-router-dom';

import '../../css/components/shared/Navigation.css';

/**
 * Properties for the Navigation component.
 */
type Props = {
  to: string;
  text: string;
  className?: string;
  onClick?: () => Promise<void>;
};

/**
 * Creates a navigation link using the React Router's Link component, which can be styled and potentially performs an action on click.
 */
function Navigation({ to, text, className, onClick }: Props) {
  /**
   * Construct the Link component with dynamic classes and behavior based on the provided props.
   */
  const navigationLink = (
    <Link onClick={onClick} className={`navigation ${className || ''}`} to={to}>
      {text}
    </Link>
  );

  return navigationLink;
}

export default Navigation;
