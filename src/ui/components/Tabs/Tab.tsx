import type { StandardComponentProps } from "@interfaces/standard-component-props";
import { Tab as MUITab } from '@mui/material';
import styles from "./Tab.module.css";

export interface TabProps extends StandardComponentProps{
    value: string;
    label: string;
    disabled?: boolean;
    icon?: React.ReactElement;
    iconPosition?: "bottom" | "end" | "start" | "top";
    wrapped?: boolean;
}

export function Tab(props: TabProps): React.ReactElement | null {

    if (props.isVisible === false){
        return null;
    }

    return (
        <MUITab value={props.value} label={props.label} disabled={props.disabled} className={`${styles.Tab} ${props.extendedClass? props.extendedClass : ''}`}
        icon={props.icon} iconPosition={props.iconPosition} wrapped={props.wrapped}/>
    );
}