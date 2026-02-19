import type { Exchange } from "@type/exchange";
import type { ListingStatus } from "@type/listing-status";

export interface Listing {
	symbol: string;
	name: string;
	exchange: Exchange;
	assetType: string;
	ipoDate: Date;
	delistingDate: Date | null;
	status: ListingStatus;
}
