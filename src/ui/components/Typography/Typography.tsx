import type { StandardComponentProps } from '@interfaces/standard-component-props';
import { Typography as MUITypography } from '@mui/material';
import styles from './Typograhy.module.css';

export interface TypographyProps extends StandardComponentProps {
  children?: React.ReactNode;
}

export function Typography(props: TypographyProps) {
  return (
    <MUITypography id={props.id} className={`${styles.Typography} ${props.extendedClass}`} sx={props.sx}>
      {props.children}
    </MUITypography>
  );
}
