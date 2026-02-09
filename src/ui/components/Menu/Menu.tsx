import type { StandardComponentProps } from '@interfaces/standard-component-props';
import { Menu as MUIMenu } from '@mui/material';
import styles from './Menu.module.css';

export interface MenuProps extends StandardComponentProps {
  isOpen: boolean;
  children?: React.ReactNode;
}

export function Menu(props: MenuProps): React.ReactElement | null {
  return (
    <MUIMenu open={props.isOpen} id={props.id} className={`${styles.Menu} ${props.extendedClass ?? ''}`} sx={props.sx}>
      {props.children}
    </MUIMenu>
  );
}
