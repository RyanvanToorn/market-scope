import type { StandardComponentProps } from "@interfaces/standard-component-props";
import styles from "./MenuItem.module.css"
import {MenuItem as MUIMenuItem} from '@mui/material/';

export interface MenuItemProps extends StandardComponentProps{
    contents?: React.ReactNode;
}

export function MenuItem(props: MenuItemProps): React.ReactElement | null  {

    if (props.isVisible === false){
        return null;
    }

    return (
        <MUIMenuItem id={props.id} className={`${styles.MenuItem} ${props.extendedClass ?? ''}`} sx={props.sx}>
            {props.contents}
        </MUIMenuItem>
    );
}