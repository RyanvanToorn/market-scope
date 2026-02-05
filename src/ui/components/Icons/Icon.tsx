import type { StandardComponentProps } from '@interfaces/standard-component-props';
import { Icon as MUIIcon } from '@mui/material';
import styles from './Icon.module.css';

export interface IconProps extends StandardComponentProps {
  children?: React.ReactNode;
}

export function Icon(props: IconProps): React.ReactElement | null {
  return (
    <MUIIcon id={props.id} className={`${styles.Icon} ${props.extendedClass}`} sx={props.sx}>
      {props.children}
    </MUIIcon>
  );
}
