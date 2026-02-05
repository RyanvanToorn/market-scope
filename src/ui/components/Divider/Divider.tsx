import type { StandardComponentProps } from '@interfaces/standard-component-props';
import { Divider as MUIDivider } from '@mui/material';
import styles from './Divider.module.css';

export interface DividerProps extends StandardComponentProps {
    orientation: 'horizontal' | 'vertical';
}

export function Divider(props: DividerProps) {
  return (
    <MUIDivider id={props.id} className={`${styles.Divider} ${props.extendedClass}`} sx={props.sx} />
  );
}
