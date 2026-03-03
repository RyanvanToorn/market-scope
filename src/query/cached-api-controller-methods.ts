import { useAPIController } from "@context/APIControllerContext";
import { useQuery } from "@tanstack/react-query";
import type { AssetType } from "@type/asset-type";
import type { ChartType } from "@type/chart-type";

interface CachedQueryOptions {
	enabled?: boolean;
	staleTime?: number;
}

interface AssetSpecificQueryOptions extends CachedQueryOptions {
	assetSymbol: string;
	assetType: AssetType;
}

const defaultStateTime = 24 * 60 * 1000;

/** Util function to ensure keys are standardized */
function buildQueryKey(assetSymbol: string, assetType: AssetType, chartType: ChartType): string {
	return `${assetSymbol}-${assetType}-${chartType}`;
}

/** Fetch all listings - alpha vantage */
export function useListingsQuery(options: CachedQueryOptions = {}) {
	const api = useAPIController();

	return useQuery({
		queryKey: ["listings"],
		queryFn: () => api.getAllSymbols(),
		enabled: options.enabled ?? true,
		staleTime: options.staleTime ?? defaultStateTime,
	});
}

/** Fetch all assets - coin cap */
export function useAssetsQuery(options: CachedQueryOptions = {}) {
	const api = useAPIController();

	return useQuery({
		queryKey: ["assets"],
		queryFn: () => api.getAssets(),
		enabled: options.enabled ?? true,
		staleTime: options.staleTime ?? defaultStateTime,
	});
}

/** Fetch daily data for equities - alpha vantage */
export function useTimeSeriesDailyQuery(options: AssetSpecificQueryOptions) {
	const api = useAPIController();

	const key = buildQueryKey(options.assetSymbol, options.assetType, "Daily");

	return useQuery({
		queryKey: [key],
		queryFn: () => api.getTimeSeriesDaily(options.assetSymbol),
		enabled: options.enabled ?? true,
		staleTime: options.staleTime ?? defaultStateTime,
	});
}

/** Fetch weekly data for equities - alpha vantage */
export function useTimeSeriesWeeklyQuery(options: AssetSpecificQueryOptions) {
	const api = useAPIController();

	const key = buildQueryKey(options.assetSymbol, options.assetType, "Weekly");

	return useQuery({
		queryKey: [key],
		queryFn: () => api.getTimeSeriesWeekly(options.assetSymbol),
		enabled: options.enabled ?? true,
		staleTime: options.staleTime ?? defaultStateTime,
	});
}

/** Fetch monthly data for equities - alpha vantage */
export function useTimeSeriesMonthlyQuery(options: AssetSpecificQueryOptions) {
	const api = useAPIController();

	const key = buildQueryKey(options.assetSymbol, options.assetType, "Monthly");

	return useQuery({
		queryKey: [key],
		queryFn: () => api.getTimeSeriesMonthly(options.assetSymbol),
		enabled: options.enabled ?? true,
		staleTime: options.staleTime ?? defaultStateTime,
	});
}
