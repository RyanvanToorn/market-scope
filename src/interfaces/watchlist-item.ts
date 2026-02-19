import type { AssetType } from "@type/asset-type";

export interface WatchlistItem {
	symbol: string;
	type: AssetType;
	createdOn: Date;
	lastModifiedOn: Date;
}
