import type { StandardComponentProps } from '@interfaces/standard-component-props';
import { Box as MUIBox } from '@mui/material';
import styles from './Box.module.css';

export interface BoxProps extends StandardComponentProps {
  children?: React.ReactNode;
}

export function Box(props: BoxProps): React.ReactElement | null {
  return (
    <MUIBox id={props.id} className={`${styles.Box} ${props.extendedClass ?? ''}`} sx={props.sx}>
      {props.children}
    </MUIBox>
  );
}
