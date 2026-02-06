import { Box } from "@components/Box/Box";
import styles from "./BasicLayout.module.css";
import { AppBar } from "@components/AppBar/AppBar";
import { APIButton } from "@features/api-button/api-button";
import { Sidebar } from "@features/sidebar/sidebar";
import { useState } from "react";






export function BasicLayout(): React.ReactElement | null {
    const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true);

    const closeSidebar = () => {
        setSidebarOpen(false);
    }

    return (
        <Box extendedClass={styles.BasicLayout}>
            <Box extendedClass={styles.BasicLayoutTop}>
                <AppBar/>
            </Box>

        <Box extendedClass={styles.BasicLayoutMiddle}>
            <Box extendedClass={styles.ContentContainer}>
                <APIButton/>
            </Box>
            <Box extendedClass={styles.SidebarContainer}>
                <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar}/>
            </Box>
        </Box>

        <Box extendedClass={styles.BasicLayoutBottom}>
            <Box extendedClass={styles.BottombarContainer}>

            </Box>
        </Box>
        </Box>
    )
}
