import { Box } from "@components/Box/Box";
import styles from "./sidebar.module.css";
import { Button } from "@components/Button/Button";
import { Icon } from "@components/Icon/Icon";
import CloseIcon from '@mui/icons-material/Close';

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
                    <Box extendedClass={styles.SidebarHeaderButtonBox}>
                        <Button extendedClass="standard-button" onClick={props.onClose}>
                            <Icon icon={CloseIcon}/>
                        </Button>
                    </Box>
                    {props.headerContents}
                </Box>
                <Box extendedClass={styles.SidebarBody}>
                    {props.bodyContents}
                </Box>
            </Box>
        </Box>
    );
} 