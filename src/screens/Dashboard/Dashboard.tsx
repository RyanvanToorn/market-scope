import { Box } from "@components/Box/Box";
import styles from "./Dashboard.module.css";
import { BasicLayout } from "@layouts/BasicLayout";
import { Typography } from "@components/Typography/Typography";

export interface DashboardProps{
    temp?: string;
}

export function Dashboard(props: DashboardProps): React.ReactElement | null {
    return (
        <Box extendedClass={styles.Dashboard}>
        </Box>
    );
}