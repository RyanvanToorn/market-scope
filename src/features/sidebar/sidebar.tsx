import { Box } from "@components/Box/Box";
import styles from "./sidebar.module.css";

export interface SidebarProps{
    isOpen: boolean;
    headerContents?: React.ReactNode;
    bodyContents?: React.ReactNode;
}

export function Sidebar(): React.ReactElement | null{
    return (
        <Box className={styles.Sidebar}>
            <Box className={styles.SidebarHeader}>

            </Box>
            <Box className={styles.SidebarBody}>
                
            </Box>
        </Box>
    );
} 