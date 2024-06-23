import { TextField } from '@mui/material';
import '../../css/components/shared/CustomInput.css';

/**
 * Defines the properties for the CustomInput component.
 * @property {string} name - Name attribute of the input element.
 * @property {string} type - Type of the input element, e.g., 'text', 'password', etc.
 * @property {string} label - Label text for the input element.
 */
type Props = {
  name: string;
  type: string;
  label: string;
};

/**
 * CustomInput creates a styled text field based on Material-UI's TextField component.
 * It is designed to be reusable with custom styles applied for different parts of the input.
 *
 * @param {Props} props - The properties passed to customize the input component.
 * @returns {JSX.Element} The customized text field component.
 */
function CustomInput(props: Props) {
  /**
   * textField variable contains the JSX for the TextField component configured with props and custom styles.
   */
  const textField = (
    <TextField
      InputLabelProps={{
        className: 'custom-input-label',
      }}
      name={props.name}
      label={props.label}
      type={props.type}
      InputProps={{
        className: 'custom-input-field',
      }}
    />
  );

  return textField;
}

export default CustomInput;
