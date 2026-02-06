import type { StandardComponentProps } from '@interfaces/standard-component-props';
import { Button as MUIButton } from '@mui/material';
import styles from './Button.module.css';

export interface ButtonProps extends StandardComponentProps {
  children?: React.ReactNode;
  color?: 'primary' | 'secondary' | 'success' | 'error' | 'info' | 'warning';
  onClick?:()=>void;
}

export function Button(props: ButtonProps): React.ReactElement | null {
  return (
    <MUIButton id={props.id} className={`${styles.Button} ${props.extendedClass}`} onClick={props.onClick} sx={props.sx} color={props.color}>
      {props.children}
    </MUIButton>
  );
}
