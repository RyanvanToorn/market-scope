import { RootRoute, Route, createRouter, redirect } from "@tanstack/react-router";
import { BasicLayout } from "@layouts/BasicLayout";
import { Dashboard } from "@screens/Dashboard/Dashboard";
import { Settings } from "@screens/Settings/Settings";
import { Watchlist } from "@screens/Watchlist/Watchlist";

// Root route wraps the persistent layout
const rootRoute = new RootRoute({
	component: BasicLayout,
	beforeLoad: async ({ location }) => {
		if (location.pathname === "/") {
			throw redirect({
				to: "/dashboard",
			});
		}
	},
});

// Dashboard route
const dashboardRoute = new Route({
	getParentRoute: () => rootRoute,
	path: "/dashboard",
	component: Dashboard,
});

// Settings route
const settingsRoute = new Route({
	getParentRoute: () => rootRoute,
	path: "/settings",
	component: Settings,
});

// Watchlist route
const watchlistRoute = new Route({
	getParentRoute: () => rootRoute,
	path: "/watchlist",
	component: Watchlist,
});

// Create the route tree
const routeTree = rootRoute.addChildren([dashboardRoute, settingsRoute, watchlistRoute]);

// Create and export the router
export const router = createRouter({ routeTree });

// Register router for type safety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}
