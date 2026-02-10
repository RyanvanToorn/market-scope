import { Box } from "@components/Box/Box";
import styles from "./Dashboard.module.css";

export interface DashboardProps{
    temp?: string;
}

export function Dashboard(props: DashboardProps): React.ReactElement | null {
    return (
        <Box extendedClass={styles.Dashboard}>
        </Box>
    );
}