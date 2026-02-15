import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  shape: {
    borderRadius: 10,
  },
  typography: {
    fontFamily: "'Fjalla One', system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
  },
  palette: {
    mode: "dark",
    background: {
      default: "#0B1020",
      paper: "#121A2B",
    }
  },
});