import { Box } from "@components/Box/Box";
import styles from "./Browse.module.css";
import { useBasicLayout } from "@layouts/BasicLayout";
import { useEffect } from "react";
import { Paper } from "@components/Paper/Paper";
import { useTheme } from "@mui/material/styles";
import {theme} from "@theme/theme"
import { Tabs } from "@components/Tabs/Tabs";



export function Browse(): React.ReactElement | null {
  const { setLayout } = useBasicLayout();
  const theme = useTheme();

  useEffect(() => {
    setLayout((prev) => ({
      ...prev,
      title: "Browse",
    }));
  }, [setLayout]);

  return (
    <Box extendedClass={styles.Browse}>
      <Paper extendedClass={styles.BrowsePaper} sx={{
            borderRadius: "0rem",
        }}>
        <Tabs />
      </Paper>
    </Box>
  );
}