import { Box } from "@components/Box/Box";
import styles from "./sidebar.module.css";
import { Button } from "@components/Button/Button";

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
                            {"X"}
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