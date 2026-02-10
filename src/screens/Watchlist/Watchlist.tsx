import { Box } from "@components/Box/Box";
import styles from "./Watchlist.module.css";

export interface WatchilistProps{
    temp?: string;
}

export function Watchlist(props: WatchilistProps): React.ReactElement | null {
    return (
        <Box extendedClass={styles.Watchlist}>
            {props.temp}
        </Box>
    );
}