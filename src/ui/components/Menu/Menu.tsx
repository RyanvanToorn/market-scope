import type { StandardComponentProps } from '@interfaces/standard-component-props';
import { Menu as MUIMenu } from '@mui/material';
import styles from './Menu.module.css';

export interface MenuProps extends StandardComponentProps {
  children?: React.ReactNode;
}

export function Menu(props: MenuProps) {
  return (
    <MUIMenu id={props.id} className={`${styles.Menu} ${props.extendedClass}`} sx={props.sx}>
      {props.children}
    </MUIMenu>
  );
}
