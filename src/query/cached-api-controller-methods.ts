import { useAPIController } from "@context/APIControllerContext";
import { useQuery } from "@tanstack/react-query";

type CachedQueryOptions = {
	enabled?: boolean;
	staleTime?: number;
};

export function useListingsQuery(options: CachedQueryOptions = {}) {
	const api = useAPIController();

	return useQuery({
		queryKey: ["listings"],
		queryFn: () => api.getAllSymbols(),
		enabled: options.enabled ?? true,
		staleTime: options.staleTime ?? 24 * 60 * 1000,
	});
}

export function useAssetsQuery(options: CachedQueryOptions = {}) {
	const api = useAPIController();

	return useQuery({
		queryKey: ["assets"],
		queryFn: () => api.getAssets(),
		enabled: options.enabled ?? true,
		staleTime: options.staleTime ?? 24 * 60 * 1000,
	});
}
