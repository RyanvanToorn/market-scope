import { Box } from "@components/Box/Box";
import styles from "./Testing.module.css";
import { useEffect } from "react";
import { useBasicLayout } from "@layouts/BasicLayout";
import { Paper } from "@components/Paper/Paper";

export interface TestingProps {
    temp?: string;
}

export function Testing(props: TestingProps): React.ReactElement | null {
    const { setLayout } = useBasicLayout();

    useEffect(() => {
        setLayout(prev => ({
            ...prev,
            title: 'Testing'
        }));
    }, [setLayout]);

    return (
    <Box extendedClass={styles.Testing}>
        <Paper extendedClass={styles.TestingPaper}>
            {props.temp}
        </Paper>
    </Box>);
}
