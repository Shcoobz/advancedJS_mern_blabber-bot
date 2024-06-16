import { TextField } from '@mui/material';
import '../../css/components/shared/CustomInput.css';

type Props = {
  name: string;
  type: string;
  label: string;
};

function CustomInput(props: Props) {
  return (
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
}

export default CustomInput;
