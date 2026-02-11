import { Box } from "@components/Box/Box";
import styles from "./Dashboard.module.css";
import { useBasicLayout } from "@layouts/BasicLayout";
import { useEffect } from "react";

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
      {props.temp}
      <h1>Dashboard</h1>
    </Box>
  );
}
