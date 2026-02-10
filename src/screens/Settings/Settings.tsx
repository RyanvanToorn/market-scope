import { Box } from "@components/Box/Box";
import styles from "./Settings.module.css";
import { BasicLayout } from "@layouts/BasicLayout";

export interface SettingsProps{
    temp?: string;
}

export function Settings(props: SettingsProps): React.ReactElement | null {
    return (
        <Box extendedClass={styles.Settings}>
        </Box>
    );
}