import { RootRoute, Route, createRouter, RootRouteWithContext } from '@tanstack/react-router'
import BasicLayout from './ui/layouts/BasicLayout'
import Dashboard from './screens/Dashboard/Dashboard'
import AssetSearch from './screens/AssetSearch/AssetSearch'
import Watchlist from './screens/Watchlist/Watchlist'

// Root route wraps the persistent layout
const rootRoute = new RootRoute({
  component: BasicLayout,
})

// Dashboard route
const dashboardRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/dashboard',
  component: Dashboard,
})

// Asset Search route
const searchRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/search',
  component: AssetSearch,
})

// Watchlist route
const watchlistRoute = new Route({
  getParentRoute: () => rootRoute,
  path: '/watchlist',
  component: Watchlist,
})

// Create the route tree
const routeTree = rootRoute.addChildren([
  dashboardRoute,
  searchRoute,
  watchlistRoute,
])

// Create and export the router
export const router = createRouter({ routeTree })

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}