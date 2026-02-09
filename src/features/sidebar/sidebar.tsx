import { Box } from "@components/Box/Box";
import styles from "./sidebar.module.css";
import { Button } from "@components/Button/Button";
import { Icon } from "@components/Icon/Icon";
import CloseIcon from '@mui/icons-material/Close';
import { Paper } from "@components/Paper/Paper";

export interface SidebarProps{
    isOpen: boolean;
    onClose: ()=>void;
    headerContents?: React.ReactNode;
    bodyContents?: React.ReactNode;
}

export function Sidebar(props: SidebarProps): React.ReactElement | null{

    if(!props.isOpen){
        return null
    }


    return (
        <Box extendedClass={styles.SidebarContainer}>
            <Box extendedClass={styles.Sidebar}>
                <Box extendedClass={styles.SidebarHeader}>
                    <Paper>
                        <Box extendedClass={styles.SidebarHeaderButtonBox}>
                            <Button extendedClass="standard-button" onClick={props.onClose} variant="contained">
                                <Icon icon={CloseIcon}/>
                            </Button>
                        </Box>
                        {props.headerContents}
                    </Paper>
                </Box>
                <Box extendedClass={styles.SidebarBody}>
                    <Paper>
                        {props.bodyContents}
                    </Paper>
                </Box>
            </Box>
        </Box>
    );
} 