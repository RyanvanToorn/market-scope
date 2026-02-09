import type { StandardComponentProps } from '@interfaces/standard-component-props';
import { AppBar as MUIAppBar } from '@mui/material';
import styles from "./AppBar.module.css"



export interface AppBarProps extends StandardComponentProps{
    children?: React.ReactNode;
}

export function AppBar(props: AppBarProps): React.ReactElement | null{
    return (
        <MUIAppBar position='relative' id={props.id} className={`${styles.AppBar} ${props.extendedClass ?? ''}`} sx={props.sx}>
            {props.children}
        </MUIAppBar>
    )
}

