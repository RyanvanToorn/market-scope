import { BasicLayout } from "@layouts/BasicLayout";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "@theme/theme"
import './index.css';

function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <BasicLayout>
      
        </BasicLayout>
      </ThemeProvider>
    </>
  )
}

export default App
