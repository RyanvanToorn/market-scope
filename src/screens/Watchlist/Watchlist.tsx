import { Box } from "@components/Box/Box";
import styles from "./Watchlist.module.css";
import { useBasicLayout } from "@layouts/BasicLayout";
import { useEffect } from "react";

export interface WatchlistProps {
  temp?: string;
}

export function Watchlist(props: WatchlistProps): React.ReactElement | null {
  const { setLayout } = useBasicLayout();

  useEffect(() => {
    setLayout((prev) => ({
      ...prev,
      title: "Watchlist",
    }));
  }, [setLayout]);

  return (
    <Box extendedClass={styles.Watchlist}>
      {props.temp}
      <h1>Watchlist</h1>
    </Box>
  );
}
