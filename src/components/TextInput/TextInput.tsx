import type { StandardComponentProps } from '@interfaces/standard-component-props';
import { TextField as MUITextField } from '@mui/material';
import styles from './TextInput.module.css';

export interface TextInputProps extends StandardComponentProps {}

export function TextInput(props: TextInputProps) {
  return (
    <MUITextField id={props.id} className={`${styles.TextInput} ${props.extendedClass}`} sx={props.sx} />
  );
}
