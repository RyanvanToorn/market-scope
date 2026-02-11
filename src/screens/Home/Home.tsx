import { Box } from "@components/Box/Box";
import styles from "./Home.module.css";
import { useBasicLayout } from "@layouts/BasicLayout";
import { useEffect } from "react";

export interface HomeProps {
    temp?: string;
}

export function Home(props: HomeProps): React.ReactElement | null {
    const { setLayout } = useBasicLayout();

    useEffect(() => {
        setLayout(prev => ({
            ...prev,
            title: 'Home'
        }));
    }, [setLayout]);

    return <Box extendedClass={styles.Home}>
        {props.temp}
        <h1>Home</h1>
    </Box>;
}
