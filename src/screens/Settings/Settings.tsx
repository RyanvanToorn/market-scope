import { Box } from "@components/Box/Box";
import styles from "./Settings.module.css";
import { useEffect } from "react";
import { useBasicLayout } from "@layouts/BasicLayout";

export interface SettingsProps {
	temp?: string;
}

export function Settings(props: SettingsProps): React.ReactElement | null {
	const { setLayout } = useBasicLayout();

    useEffect(() => {
        setLayout(prev => ({
            ...prev,
            title: 'Settings'
        }));
    }, [setLayout]);

    return <Box extendedClass={styles.Settings}>
        {props.temp}
    </Box>;
}
