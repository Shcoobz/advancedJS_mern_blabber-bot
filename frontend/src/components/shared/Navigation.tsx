import { Link } from 'react-router-dom';

import '../../css/components/shared/Navigation.css';

/**
 * Properties for the Navigation component.
 * @prop {string} to - Destination URL for the navigation link.
 * @prop {string} text - Display text of the link.
 * @prop {string} [className] - Optional additional CSS classes for styling.
 * @prop {() => Promise<void>} [onClick] - Optional click handler that may perform asynchronous actions.
 */
type Props = {
  to: string;
  text: string;
  className?: string;
  onClick?: () => Promise<void>;
};

/**
 * Creates a navigation link using the React Router's Link component, which can be styled and potentially performs an action on click.
 * @param {Props} props - The properties passed to customize the navigation link.
 * @returns {JSX.Element} - A styled link element for navigation.
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
