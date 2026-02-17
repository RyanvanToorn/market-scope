import { Box } from "@components/Box/Box";
import styles from "./Home.module.css";
import { useBasicLayout } from "@layouts/BasicLayout";
import { useEffect } from "react";
import { Paper } from "@components/Paper/Paper";


export function Home(): React.ReactElement | null {
    const { setLayout } = useBasicLayout();

    useEffect(() => {
        setLayout(prev => ({
            ...prev,
            title: 'Home'
        }));
    }, [setLayout]);

    return (
    <Box extendedClass={styles.Home}>
        <Paper extendedClass={styles.HomePaper} sx={{
            borderRadius: "0rem"
        }}>
            
        </Paper>
    </Box>);
}
