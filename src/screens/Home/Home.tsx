import { Box } from "@components/Box/Box";
import styles from "./Home.module.css";

export interface HomeProps {
    temp?: string;
}

export function Home(props: HomeProps): React.ReactElement | null {
    return <Box extendedClass={styles.Home}>
        {props.temp}
    </Box>;
}
