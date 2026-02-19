import { useAPIController } from "@context/APIControllerContext";
import { useQuery } from "@tanstack/react-query";

export function useListingsQuery() {
	const api = useAPIController();

	return useQuery({
		queryKey: ["listings"],
		queryFn: () => api.getAllSymbols(),
		staleTime: 5 * 60 * 1000,
	});
}

export function useAssetsQuery() {
	const api = useAPIController();

	return useQuery({
		queryKey: ["assets"],
		queryFn: () => api.getAssets(), // adjust to your real signature
		staleTime: 5 * 60 * 1000,
	});
}
