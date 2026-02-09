import type { StandardComponentProps } from '@interfaces/standard-component-props';
import { Tabs as MUITabs } from '@mui/material';
import styles from './Tabs.module.css';

export interface TabsProps extends StandardComponentProps {
  children?: React.ReactNode;
}

export function Tabs(props: TabsProps): React.ReactElement | null {

  if (props.isVisible === false){
        return null;
    }

  return (
    <MUITabs id={props.id} className={`${styles.Tabs} ${props.extendedClass ?? ''}`} sx={props.sx}>
      {props.children}
    </MUITabs>
  );
}
