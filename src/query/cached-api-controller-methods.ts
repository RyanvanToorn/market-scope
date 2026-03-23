import { useAPIController } from "@context/APIControllerContext";
import { useQuery } from "@tanstack/react-query";
import type { AssetType } from "@type/asset-type";

interface CachedQueryOptions {
	enabled?: boolean;
	staleTime?: number;
}

interface AssetSpecificQueryOptions extends CachedQueryOptions {
	assetSymbol: string;
	assetType: AssetType;
}

const defaultStateTime = 24 * 60 * 1000;

/** Fetch all listings - alpha vantage */
export function useListingsQuery(options: CachedQueryOptions = {}) {
	const api = useAPIController();

	return useQuery({
		queryKey: ["listings", "all"],
		queryFn: () => api.getAllSymbols(),
		enabled: options.enabled ?? true,
		staleTime: options.staleTime ?? defaultStateTime,
	});
}

/** Fetch all assets - coin cap */
export function useAssetsQuery(options: CachedQueryOptions = {}) {
	const api = useAPIController();

	return useQuery({
		queryKey: ["assets", "all"],
		queryFn: () => api.getAssets(),
		enabled: options.enabled ?? true,
		staleTime: options.staleTime ?? defaultStateTime,
	});
}

/** Fetch daily data for equities - alpha vantage */
export function useTimeSeriesDailyQuery(options: AssetSpecificQueryOptions) {
	const api = useAPIController();

	return useQuery({
		queryKey: ["timeSeries", options.assetType, options.assetSymbol, "Daily"],
		queryFn: () => {
			console.log("Fetching time series daily data for: ", options.assetSymbol);
			return api.getTimeSeriesDaily(options.assetSymbol);
		},
		enabled: (options.enabled ?? true) && !!options.assetSymbol,
		staleTime: options.staleTime ?? defaultStateTime,
	});
}

/** Fetch weekly data for equities - alpha vantage */
export function useTimeSeriesWeeklyQuery(options: AssetSpecificQueryOptions) {
	const api = useAPIController();

	return useQuery({
		queryKey: ["timeSeries", options.assetType, options.assetSymbol, "Weekly"],
		queryFn: () => {
			console.log("Fetching time series weekly data for: ", options.assetSymbol);
			return api.getTimeSeriesWeekly(options.assetSymbol);
		},
		enabled: (options.enabled ?? true) && !!options.assetSymbol,
		staleTime: options.staleTime ?? defaultStateTime,
	});
}

/** Fetch monthly data for equities - alpha vantage */
export function useTimeSeriesMonthlyQuery(options: AssetSpecificQueryOptions) {
	const api = useAPIController();

	return useQuery({
		queryKey: ["timeSeries", options.assetType, options.assetSymbol, "Monthly"],
		queryFn: () => {
			console.log("Fetching time series monthly data for: ", options.assetSymbol);
			return api.getTimeSeriesMonthly(options.assetSymbol);
		},
		enabled: (options.enabled ?? true) && !!options.assetSymbol,
		staleTime: options.staleTime ?? defaultStateTime,
	});
}
