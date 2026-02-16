import type { StandardComponentProps } from '@interfaces/standard-component-props';
import { TextField as MUITextField } from '@mui/material';
import styles from './TextInput.module.css';

export interface TextFieldProps extends StandardComponentProps {
  onChange?: (event: object) => void;
  autoFocus?: boolean;
  defaultValue?: string;
  disabled?: boolean;
  error?: boolean;
  fullWidth?: boolean;
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
  minRows?: number;
  maxRows?: number;
}

export function TextField(props: TextFieldProps): React.ReactElement | null {

  if (props.isVisible === false){
        return null;
    }

  return (
    <MUITextField id={props.id} className={`${styles.TextField} ${props.extendedClass ?? ''}`} sx={props.sx} 
    autoFocus={props.autoFocus} defaultValue={props.defaultValue} disabled={props.disabled} error={props.error}
    fullWidth={props.fullWidth} placeholder={props.placeholder} required={props.required} multiline={props.multiline}
    minRows={props.minRows} maxRows={props.maxRows} onChange={props.onChange}/>
  );
}
