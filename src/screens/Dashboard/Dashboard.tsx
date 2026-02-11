import { Box } from "@components/Box/Box";
import styles from "./Dashboard.module.css";
import { useBasicLayout } from "@layouts/BasicLayout";
import { useEffect } from "react";
import { Paper } from "@components/Paper/Paper";

export interface DashboardProps {
  temp?: string;
}

export function Dashboard(props: DashboardProps): React.ReactElement | null {
  const { setLayout } = useBasicLayout();

  useEffect(() => {
    setLayout((prev) => ({
      ...prev,
      title: "Dashboard",
    }));
  }, [setLayout]);

  return (
    <Box extendedClass={styles.Dashboard}>
        <Paper extendedClass={styles.DashboardPaper}>

            {props.temp}
        </Paper>
    </Box>);
}
