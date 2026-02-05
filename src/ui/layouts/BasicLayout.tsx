import { Box } from "@components/Box/Box";
import styles from "./BasicLayout.module.css";
import { AppBar } from "@components/AppBar/AppBar";
import { APIButton } from "@features/api-button/api-button";



export function BasicLayout(): React.ReactElement | null {
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

            </Box>
        </Box>

        <Box extendedClass={styles.BasicLayoutBottom}>
            <Box extendedClass={styles.BottombarContainer}>

            </Box>
        </Box>
        </Box>
    )
}
