import type { StandardComponentProps } from '@interfaces/standard-component-props';
import { TextField as MUITextField } from '@mui/material';
import styles from './TextInput.module.css';

export interface TextFieldProps extends StandardComponentProps {}

export function TextField(props: TextFieldProps): React.ReactElement | null {

  if (props.isVisible === false){
        return null;
    }

  return (
    <MUITextField id={props.id} className={`${styles.TextField} ${props.extendedClass ?? ''}`} sx={props.sx} />
  );
}
