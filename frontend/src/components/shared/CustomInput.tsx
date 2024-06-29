import { TextField } from '@mui/material';
import '../../css/components/shared/CustomInput.css';

/**
 * Defines the properties for the CustomInput component.
 */
type Props = {
  name: string;
  type: string;
  label: string;
};

/**
 * CustomInput creates a styled text field based on Material-UI's TextField component.
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
