import type { WatchlistItem } from "@interfaces/watchlist-item";
import { createContext, useContext } from "react";

interface WatchlistContextValue {
	watchlist: WatchlistItem[];
	updateWatchlist: (next: WatchlistItem[] | ((prev: WatchlistItem[]) => WatchlistItem[])) => void;
}

export const WatchlistContext = createContext<WatchlistContextValue | undefined>(undefined);

export const useWatchlist = () => {
	const context = useContext(WatchlistContext);
	if (!context) {
		throw new Error("useWatchlist must be used within WatchlistProvider");
	}
	return context;
};
