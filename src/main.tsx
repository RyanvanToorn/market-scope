import { router } from "@screens/routes";
import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./app.css";
import { AppSettingsProvider } from "@context/AppSettingsContext";
import { AppThemeProvider } from "@theme/AppThemeProvider";

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<AppSettingsProvider>
			<AppThemeProvider>
				<RouterProvider router={router} />
			</AppThemeProvider>
		</AppSettingsProvider>
	</StrictMode>,
);
