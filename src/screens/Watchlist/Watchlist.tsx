import { Box } from "@components/Box/Box";
import styles from "./Watchlist.module.css";
import { BasicLayout } from "@layouts/BasicLayout";

export interface WatchlistProps{
    temp?: string;
}

export function Watchlist(props: WatchlistProps): React.ReactElement | null {
    return (
        <Box extendedClass={styles.Watchlist}>
        </Box>
    );
}