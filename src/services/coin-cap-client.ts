
/* NEED TO ADD ACREDITATION/REQUIRED ACKNOWLEDGEMENT !!!!!!!!!*/

/* ============= Price Response Types ============= */

export interface PriceBySymbolResponse {
    data: {
        [symbol: string]: string;
    };
}

export interface PriceByAddressResponse {
    data: {
        address: string;
        network: string;
        priceUsd: string;
    };
}

/* ============= Asset Types ============= */

export interface Asset {
    id: string;
    symbol: string;
    slug: string;
    name: string;
    priceUsd: string;
    marketCapUsd: string;
    volumeUsd24Hr: string;
    changePercent24Hr: string;
    supply: string;
    maxSupply: string;
    updated: number;
}

export interface AssetsResponse {
    data: Asset[];
    timestamp: number;
}

export interface AssetResponse {
    data: Asset;
    timestamp: number;
}

export interface Market {
    exchangeId: string;
    baseId: string;
    baseSymbol: string;
    quoteId: string;
    quoteSymbol: string;
    priceUsd: string;
    volumeUsd24Hr: string;
    updated: number;
}

export interface AssetMarketsResponse {
    data: Market[];
    timestamp: number;
}

export interface HistoryPoint {
    priceUsd: string;
    time: number;
}

export interface AssetHistoryResponse {
    data: HistoryPoint[];
    timestamp: number;
}

export interface MarketCapHistoryPoint {
    marketCapUsd: string;
    time: number;
}

export interface MarketCapHistoryResponse {
    data: MarketCapHistoryPoint[];
    timestamp: number;
}

/* ============= Exchange Types ============= */

export interface Exchange {
    exchangeId: string;
    name: string;
    rank: string;
    percentTotalVolume: string;
    volumeUsd: string;
    tradingPairs: string;
    socket: boolean;
    updated: number;
}

export interface ExchangesResponse {
    data: Exchange[];
    timestamp: number;
}

export interface ExchangeResponse {
    data: Exchange;
    timestamp: number;
}

/* ============= Markets Response Types ============= */

export interface MarketsResponse {
    data: Market[];
    timestamp: number;
}

/* ============= Rates Types ============= */

export interface Rate {
    id: string;
    symbol: string;
    currencySymbol: string;
    rateUsd: string;
    type: string;
}

export interface RatesResponse {
    data: Rate[];
    timestamp: number;
}

export interface RateResponse {
    data: Rate;
    timestamp: number;
}

/* ============= Technical Analysis Types ============= */

export interface TADataPoint {
    time: number;
    value: string;
}

export interface TASMAResponse {
    data: TADataPoint[];
    timestamp: number;
}

export interface TAEMAResponse {
    data: TADataPoint[];
    timestamp: number;
}

export interface TAMACDDataPoint {
    time: number;
    macd: string;
    signal: string;
    histogram: string;
}

export interface TAMACDResponse {
    data: TAMACDDataPoint[];
    timestamp: number;
}

export interface TAVWAPResponse {
    data: {
        time: number;
        vwap: string;
    };
    timestamp: number;
}

export interface Candlestick {
    time: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
}

export interface TACandlestickResponse {
    data: Candlestick[];
    timestamp: number;
}

export interface TARSIResponse {
    data: TADataPoint[];
    timestamp: number;
}

export interface TAAllLatestResponse {
    data: {
        sma: TADataPoint;
        ema: TADataPoint;
        rsi: TADataPoint;
        macd: TAMACDDataPoint;
        vwap: {
            time: number;
            vwap: string;
        };
    };
    timestamp: number;
}

/* ============= CSV Listing Types ============= */

export interface Listing {
    symbol: string;
    name: string;
    ipoYear: string;
    delistingDate?: string;
    status: string;
}

export class CoinCapClient {
    private apiKey: string;
    private baseUrl: string = " rest.coincap.io/v3";

    constructor(apiKey: string) {
        this.apiKey = apiKey;
    }

    /* Price */
    public async getPriceBySymbol(symbol: string): Promise<PriceBySymbolResponse>{
        try {
            const url = new URL(`${this.baseUrl}/price/byaddress`);
            // url.searchParams.append('address', tokenAddress);
            // url.searchParams.append('network', network);
            const response = await fetch(url.toString());

            if (!response.ok) {
                throw new Error(`getPriceBySymbol - HTTP error! Status: ${response.status}`);
            }

            const data = await response.text();

            return data;
        } catch (error) {
            console.warn(error);
            return error as Error;
        }
    }

    public async getPriceByAddress(tokenAddress: string, network: string): Promise<PriceByAddressResponse>{
        try {
            const url = new URL(`${this.baseUrl}/price/byaddress`);
            // url.searchParams.append('address', tokenAddress);
            // url.searchParams.append('network', network);
            const response = await fetch(url.toString());

            if (!response.ok) {
                throw new Error(`getPriceByAddress - HTTP error! Status: ${response.status}`);
            }

            const data = await response.text();

            return data;
        } catch (error) {
            console.warn(error);
            return error as Error;
        }
    }

    /* Assets */

    public async getAssets(): Promise<AssetsResponse>{
        try {
            const response = await fetch(`${this.baseUrl}/assets`);

            if (!response.ok) {
                throw new Error(`getAssets - HTTP error! Status: ${response.status}`);
            }

            const data = await response.text();

            return data;
        } catch (error) {
            console.warn(error);
            return error as Error;
        }
    }

    public async getAsset(slug: string): Promise<AssetResponse>{
        try {
            const response = await fetch(`${this.baseUrl}/assets/${slug}`);

            if (!response.ok) {
                throw new Error(`getAsset - HTTP error! Status: ${response.status}`);
            }

            const data = await response.text();

            return data;
        } catch (error) {
            console.warn(error);
            return error as Error;
        }
    }

    public async getAssetMarkets(slug: string): Promise<AssetMarketsResponse>{
        try {
            const response = await fetch(`${this.baseUrl}/assets/${slug}/markets`);

            if (!response.ok) {
                throw new Error(`getAssetMarkets - HTTP error! Status: ${response.status}`);
            }

            const data = await response.text();

            return data;
        } catch (error) {
            console.warn(error);
            return error as Error;
        }
    }

    public async getAssetHistory(slug: string): Promise<AssetHistoryResponse>{
        try {
            const response = await fetch(`${this.baseUrl}/assets/${slug}/history`);

            if (!response.ok) {
                throw new Error(`getAssetHistory - HTTP error! Status: ${response.status}`);
            }

            const data = await response.text();

            return data;
        } catch (error) {
            console.warn(error);
            return error as Error;
        }
    }

    public async getAssetTotalMarketCapHistory(): Promise<MarketCapHistoryResponse>{
        try {
            const response = await fetch(`${this.baseUrl}/assets/totals/total-marketcap-history`);

            if (!response.ok) {
                throw new Error(`getAssetTotalMarketCapHistory - HTTP error! Status: ${response.status}`);
            }

            const data = await response.text();

            return data;
        } catch (error) {
            console.warn(error);
            return error as Error;
        }
    }

    public async getAssetMarketCapHistory(slug: string): Promise<MarketCapHistoryResponse>{
        try {
            const response = await fetch(`${this.baseUrl}/assets/${slug}/marketcap-history`);

            if (!response.ok) {
                throw new Error(`getAssetMarketCapHistory - HTTP error! Status: ${response.status}`);
            }

            const data = await response.text();

            return data;
        } catch (error) {
            console.warn(error);
            return error as Error;
        }
    }

    /* Exchanges */

    public async getExchanges(): Promise<ExchangesResponse>{
        try {
            const response = await fetch(`${this.baseUrl}/exchanges`);

            if (!response.ok) {
                throw new Error(`getExchanges - HTTP error! Status: ${response.status}`);
            }

            const data = await response.text();

            return data;
        } catch (error) {
            console.warn(error);
            return error as Error;
        }
    }

    public async getExchange(exchange: string): Promise<ExchangeResponse>{
        try {
            const response = await fetch(`${this.baseUrl}/exchanges/${exchange}`);

            if (!response.ok) {
                throw new Error(`getExchange - HTTP error! Status: ${response.status}`);
            }

            const data = await response.text();

            return data;
        } catch (error) {
            console.warn(error);
            return error as Error;
        }
    }

    /* Markets */

    public async getMarkets(): Promise<MarketsResponse>{
        try {
            const response = await fetch(`${this.baseUrl}/markets`);

            if (!response.ok) {
                throw new Error(`getMarkets - HTTP error! Status: ${response.status}`);
            }

            const data = await response.text();

            return data;
        } catch (error) {
            console.warn(error);
            return error as Error;
        }
    }

    /* Rates */

    public async getRates(): Promise<RatesResponse>{
        try {
            const response = await fetch(`${this.baseUrl}/rates`);

            if (!response.ok) {
                throw new Error(`getRates - HTTP error! Status: ${response.status}`);
            }

            const data = await response.text();

            return data;
        } catch (error) {
            console.warn(error);
            return error as Error;
        }
    }

    public async getRate(slug: string): Promise<RateResponse>{
        try {
            const response = await fetch(`${this.baseUrl}/rates/${slug}`);

            if (!response.ok) {
                throw new Error(`getRate - HTTP error! Status: ${response.status}`);
            }

            const data = await response.text();

            return data;
        } catch (error) {
            console.warn(error);
            return error as Error;
        }
    }

    /* Technical Analysis */
    
    public async getTechnicalAnalysisSMAFull(slug: string): Promise<TASMAResponse>{
        try {
            const response = await fetch(`${this.baseUrl}/ta/${slug}/sma`);

            if (!response.ok) {
                throw new Error(`getTechnicalAnalysisSMAFull - HTTP error! Status: ${response.status}`);
            }

            const data = await response.text();

            return data;
        } catch (error) {
            console.warn(error);
            return error as Error;
        }
    }

    public async getTechnicalAnalysisSMALatest(slug: string): Promise<TASMAResponse>{
        try {
            const response = await fetch(`${this.baseUrl}/ta/${slug}/sma/latest`);

            if (!response.ok) {
                throw new Error(`getTechnicalAnalysisSMALatest - HTTP error! Status: ${response.status}`);
            }

            const data = await response.text();

            return data;
        } catch (error) {
            console.warn(error);
            return error as Error;
        }
    }

    public async getTechnicalAnalysisEMAFull(slug: string): Promise<TAEMAResponse>{
        try {
            const response = await fetch(`${this.baseUrl}/ta/${slug}/ema`);

            if (!response.ok) {
                throw new Error(`getTechnicalAnalysisEMAFull - HTTP error! Status: ${response.status}`);
            }

            const data = await response.text();

            return data;
        } catch (error) {
            console.warn(error);
            return error as Error;
        }
    }

    public async getTechnicalAnalysisEMALatest(slug: string): Promise<TAEMAResponse>{
        try {
            const response = await fetch(`${this.baseUrl}/ta/${slug}/ema/latest`);

            if (!response.ok) {
                throw new Error(`getTechnicalAnalysisEMALatest - HTTP error! Status: ${response.status}`);
            }

            const data = await response.text();

            return data;
        } catch (error) {
            console.warn(error);
            return error as Error;
        }
    }

    public async getTechnicalAnalysisMACDFull(slug: string): Promise<TAMACDResponse>{
        try {
            const response = await fetch(`${this.baseUrl}/ta/${slug}/macd`);

            if (!response.ok) {
                throw new Error(`getTechnicalAnalysisMACDFull - HTTP error! Status: ${response.status}`);
            }

            const data = await response.text();

            return data;
        } catch (error) {
            console.warn(error);
            return error as Error;
        }
    }

    public async getTechnicalAnalysisMACDLatest(slug: string): Promise<TAMACDResponse>{
        try {
            const response = await fetch(`${this.baseUrl}/ta/${slug}/macd/latest`);

            if (!response.ok) {
                throw new Error(`getTechnicalAnalysisMACDLatest - HTTP error! Status: ${response.status}`);
            }

            const data = await response.text();

            return data;
        } catch (error) {
            console.warn(error);
            return error as Error;
        }
    }

    public async getTechnicalAnalysisVWAPLatest(slug: string): Promise<TAVWAPResponse>{
        try {
            const response = await fetch(`${this.baseUrl}/ta/${slug}/vwap/latest`);

            if (!response.ok) {
                throw new Error(`getTechnicalAnalysisVWAPLatest - HTTP error! Status: ${response.status}`);
            }

            const data = await response.text();

            return data;
        } catch (error) {
            console.warn(error);
            return error as Error;
        }
    }

    public async getTechnicalAnalysisCandlesticks(slug: string): Promise<TACandlestickResponse>{
        try {
            const response = await fetch(`${this.baseUrl}/ta/${slug}/candlesticks`);

            if (!response.ok) {
                throw new Error(`getTechnicalAnalysisCandlesticks - HTTP error! Status: ${response.status}`);
            }

            const data = await response.text();

            return data;
        } catch (error) {
            console.warn(error);
            return error as Error;
        }
    }

    public async getTechnicalAnalysisRSIFull(slug: string): Promise<TARSIResponse>{
        try {
            const response = await fetch(`${this.baseUrl}/ta/${slug}/rsi`);

            if (!response.ok) {
                throw new Error(`getTechnicalAnalysisRSIFull - HTTP error! Status: ${response.status}`);
            }

            const data = await response.text();

            return data;
        } catch (error) {
            console.warn(error);
            return error as Error;
        }
    }

    public async getTechnicalAnalysisRSILatest(slug: string): Promise<TARSIResponse>{
        try {
            const response = await fetch(`${this.baseUrl}/ta/${slug}/rsi/latest`);

            if (!response.ok) {
                throw new Error(`getTechnicalAnalysisRSILatest - HTTP error! Status: ${response.status}`);
            }

            const data = await response.text();

            return data;
        } catch (error) {
            console.warn(error);
            return error as Error;
        }
    }

    public async getTechnicalAnalysisGetAllLatest(slug: string): Promise<TAAllLatestResponse>{
        try {
            const response = await fetch(`${this.baseUrl}/ta/${slug}/allLatest`);

            if (!response.ok) {
                throw new Error(`getTechnicalAnalysisGetAllLatest - HTTP error! Status: ${response.status}`);
            }

            const data = await response.text();

            return data;
        } catch (error) {
            console.warn(error);
            return error as Error;
        }
    }

    public async getListingStatus(): Promise<Listing[]> {
        try {
            const response = await fetch(`${this.baseUrl}?function=LISTING_STATUS&apikey=${this.apiKey}`);

            if (!response.ok) {
                throw new Error(`getListingStatus - HTTP error! Status: ${response.status}`);
            }

            const csvData = await response.text();
            const parsedData = parseCSV(csvData) as Listing[];

            return parsedData;
        } catch (error) {
            console.warn(error);
            return error as Error;
        }
    }

}
