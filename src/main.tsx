import { router } from "@screens/routes";
import { RouterProvider } from "@tanstack/react-router";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./app.css";
import { APIControllerProvider } from "@context/APIControllerProvider";
import { AppSettingsProvider } from "@context/AppSettingsProvider";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { AppThemeProvider } from "@theme/AppThemeProvider";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnWindowFocus: false,
			gcTime: 24 * 60 * 60 * 1000, // 24 hours — how long unused cache is kept
		},
	},
});

const persister = createSyncStoragePersister({
	storage: window.localStorage,
	key: "market-scope-query-cache",
});

createRoot(document.getElementById("root")!).render(
	<StrictMode>
		<PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
			<AppSettingsProvider>
				<APIControllerProvider>
					<AppThemeProvider>
						<RouterProvider router={router} />
					</AppThemeProvider>
					<ReactQueryDevtools initialIsOpen={false} />
				</APIControllerProvider>
			</AppSettingsProvider>
		</PersistQueryClientProvider>
	</StrictMode>,
);
