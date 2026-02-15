import { Box } from "@components/Box/Box";
import styles from "./Dashboard.module.css";
import { useBasicLayout } from "@layouts/BasicLayout";
import { useEffect } from "react";
import { Paper } from "@components/Paper/Paper";
import { Typography } from "@components/Typography/Typography";
import { useTheme } from "@mui/material/styles";
import {theme} from "@theme/theme"

export interface DashboardProps {
  temp?: string;
}

const tiles = [
  "Equities",
  "ETFs",
  "Indices",
  "Commodities",
  "Crypto",
  "Currencies",
  "Bonds",
  "Market Overview",
];

export function Dashboard(props: DashboardProps): React.ReactElement | null {
  const { setLayout } = useBasicLayout();
  const theme = useTheme();

  const tileBorderRadius =
    typeof theme.shape.borderRadius === "number"
      ? theme.shape.borderRadius * 2
      : `calc(${theme.shape.borderRadius} * 2)`;

  useEffect(() => {
    setLayout((prev) => ({
      ...prev,
      title: "Dashboard",
    }));
  }, [setLayout]);

  return (
    <Box extendedClass={styles.Dashboard}>
      <Paper
        extendedClass={styles.DashboardPaper}
        sx={{
          // keep the screen centered and responsive
          p: { xs: 2, sm: 3, md: 4 },
          bgcolor: "background.default",
        }}
      >
        <Box
          sx={{
            width: "min(1100px, 100%)",
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, minmax(0, 1fr))",
              md: "repeat(3, minmax(0, 1fr))",
            },
            gap: { xs: 2, sm: 2.5, md: 3 }, // theme spacing scale
          }}
        >
          {tiles.map((label) => (
            <Paper
              key={label}
              sx={{
                borderRadius: tileBorderRadius,
                minHeight: 140,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: "background.paper",
                boxShadow: 1,
                transition: theme.transitions.create(["transform", "box-shadow"], {
                  duration: theme.transitions.duration.short,
                }),
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: 4,
                },
              }}
            >
              <Typography
                text={label}
                sx={{
                  fontFamily: theme.typography.fontFamily,
                  fontSize: { xs: "1.5rem", md: "2rem" },
                  fontWeight: 700,
                  color: "text.primary",
                }}
              />
            </Paper>
          ))}
        </Box>
      </Paper>
    </Box>
  );
}