import { BasicLayout } from "@layouts/BasicLayout";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@theme/theme"
import './index.css';
import { AppSettingsProvider } from "./context/AppSettingsContext";

function App() {

  return (
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
  )
}

export default App
