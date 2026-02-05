import type { StandardComponentProps } from '@interfaces/standard-component-props';
import { Drawer as MUIDrawer } from '@mui/material';
import styles from './Drawer.module.css';

export interface DrawerProps extends StandardComponentProps {
  children?: React.ReactNode;
  anchor?: 'bottom' | 'left' | 'right' | 'top'
}

export function Drawer(props: DrawerProps) {
  return (
    <MUIDrawer id={props.id} className={`${styles.Drawer} ${props.extendedClass}`} sx={props.sx}>
      {props.children}
    </MUIDrawer>
  );
}
