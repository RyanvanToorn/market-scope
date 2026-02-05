import type { StandardComponentProps } from '@interfaces/standard-component-props';
import { Tooltip as MUITooltip } from '@mui/material';
import styles from './Tooltip.module.css';

export interface TooltipProps extends StandardComponentProps {
  children?: React.ReactNode;
}

export function Tooltip(props: TooltipProps) {
  return (
    <MUITooltip id={props.id} className={`${styles.Tooltip} ${props.extendedClass}`} sx={props.sx}>
      {props.children}
    </MUITooltip>
  );
}
