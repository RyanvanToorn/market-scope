import { router } from "@screens/routes";
import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./app.css";
import { APIControllerProvider } from "@context/APIControllerProvider";
import { AppSettingsProvider } from "@context/AppSettingsProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppThemeProvider } from "@theme/AppThemeProvider";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
		},
	},
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<AppSettingsProvider>
				<APIControllerProvider>
					<AppThemeProvider>
						<RouterProvider router={router} />
					</AppThemeProvider>
				</APIControllerProvider>
			</AppSettingsProvider>
		</QueryClientProvider>
	</StrictMode>,
);
