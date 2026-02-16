import { BasicLayout } from "@layouts/BasicLayout";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@theme/theme"
import './index.css';
import { AppSettingsProvider } from "./context/AppSettingsContext";
import { StrictMode } from "react";

function App() {

  return (
    <StrictMode>
    <>
    {/* Providers */}
      <ThemeProvider theme={theme}>
        <AppSettingsProvider>

          {/* Persistant Components */}
          <BasicLayout>
      
          </BasicLayout>

          
        </AppSettingsProvider>
      </ThemeProvider>
    </>
    </StrictMode>
  )
}

export default App
