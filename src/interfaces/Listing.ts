import type { AssetType } from "@type/asset-type";
import type { Exchange } from "@type/exchange";
import type { ListingStatus } from "@type/listing-status";

export interface Listing{
    symbol: string,
    name: string,
    exchange: Exchange,
    assetType: AssetType,
    ipoDate: Date,
    delistingDate: Date | null,
    status: ListingStatus
}