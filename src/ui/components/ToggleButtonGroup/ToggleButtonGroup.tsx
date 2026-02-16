import type { StandardComponentProps } from '@interfaces/standard-component-props';
import { ToggleButtonGroup as MUIToggleButtonGroup } from '@mui/material';
import styles from './ToggleButtonGroup.module.css';

export interface ToggleButtonGroupProps extends StandardComponentProps {
    children?: React.ReactNode;
}

export function ToggleButtonGroup(props: ToggleButtonGroupProps): React.ReactElement | null {

  if (props.isVisible === false){
        return null;
    }

  return (
    <MUIToggleButtonGroup id={props.id} className={`${styles.ToggleButtonGroup} ${props.extendedClass ?? ''}`} sx={props.sx}>
        {props.children}
    </MUIToggleButtonGroup>
  );
}
