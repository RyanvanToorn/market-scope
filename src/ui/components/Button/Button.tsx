import type { StandardComponentProps } from '@interfaces/standard-component-props';
import { Button as MUIButton } from '@mui/material';
import styles from './Button.module.css';

export interface ButtonProps extends StandardComponentProps {
  children?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
}

export function Button(props: ButtonProps) {
  return (
    <MUIButton id={props.id} className={`${styles.Button} ${props.extendedClass}`} sx={props.sx} color={props.color}>
      {props.children}
    </MUIButton>
  );
}
