import type { WatchlistItem } from "@interfaces/watchlist-item";
import { watchlistStorage } from "@utils/watchlist-storage";
import { useState } from "react";
import { WatchlistContext } from "./WatchlistContext";

export const WatchlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [watchlist, setWatchlist] = useState<WatchlistItem[]>(() => watchlistStorage.load());

	const updateWatchlist = (next: WatchlistItem[] | ((prev: WatchlistItem[]) => WatchlistItem[])) => {
		setWatchlist((prev) => {
			const updated = typeof next === "function" ? next(prev) : next;
			watchlistStorage.save(updated);
			return updated;
		});
	};

	return <WatchlistContext.Provider value={{ watchlist, updateWatchlist }}>{children}</WatchlistContext.Provider>;
};
