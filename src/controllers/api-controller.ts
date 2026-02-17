import type { Listing } from "@interfaces/Listing";
import type { AlphaVantageClient, TimeSeriesData } from "@services/alpha-vantage-client";
import type {
	AssetHistoryResponse,
	AssetMarketsResponse,
	AssetResponse,
	AssetsResponse,
	CoinCapClient,
	ExchangeResponse,
	ExchangesResponse,
	MarketCapHistoryResponse,
	MarketsResponse,
	PriceByAddressResponse,
	PriceBySymbolResponse,
	RateResponse,
	RatesResponse,
	TAAllLatestResponse,
	TACandlestickResponse,
	TAEMAResponse,
	TAMACDResponse,
	TARSIResponse,
	TASMAResponse,
	TAVWAPResponse,
} from "@services/coin-cap-client";

export class APIController {
	private alphaClient: AlphaVantageClient;
	private coinCapClient: CoinCapClient;

	constructor(alphaClient: AlphaVantageClient, coinCapClient: CoinCapClient) {
		this.alphaClient = alphaClient;
		this.coinCapClient = coinCapClient;
	}

	/* Alpha Vantage */
	async getAllSymbols(): Promise<Listing[] | undefined> {
		const listings = await this.alphaClient.getListingStatus();
		return listings as Listing[] | undefined;
	}

	/* Alpha Vantage */
	async getTimeSeriesDaily(symbol: string): Promise<TimeSeriesData | undefined> {
		const dailyData: TimeSeriesData | undefined = (await this.alphaClient.getTimeSeriesDaily(symbol)) as TimeSeriesData | undefined;
		return dailyData;
	}

	/* Alpha Vantage */
	async getTimeSeriesWeekly(symbol: string): Promise<TimeSeriesData | undefined> {
		const dailyData: TimeSeriesData | undefined = (await this.alphaClient.getTimeSeriesWeekly(symbol)) as TimeSeriesData | undefined;
		return dailyData;
	}

	/* Alpha Vantage */
	async getTimeSeriesMonthly(symbol: string): Promise<TimeSeriesData | undefined> {
		const dailyData: TimeSeriesData | undefined = (await this.alphaClient.getTimeSeriesMonthly(symbol)) as TimeSeriesData | undefined;
		return dailyData;
	}

	/* CoinCap */
	async getPriceBySymbol(symbol: string): Promise<PriceBySymbolResponse | undefined> {
		const data: PriceBySymbolResponse | undefined = (await this.coinCapClient.getPriceBySymbol(symbol)) as PriceBySymbolResponse | undefined;
		return data;
	}

	/* CoinCap */
	async getPriceByAddress(tokenAddress: string, network: string): Promise<PriceByAddressResponse | undefined> {
		const data: PriceByAddressResponse | undefined = (await this.coinCapClient.getPriceByAddress(tokenAddress, network)) as
			| PriceByAddressResponse
			| undefined;
		return data;
	}

	/* CoinCap */
	async getAssets(): Promise<AssetsResponse | undefined> {
		const data: AssetsResponse | undefined = (await this.coinCapClient.getAssets()) as AssetsResponse | undefined;
		return data;
	}

	/* CoinCap */
	async getAsset(slug: string): Promise<AssetResponse | undefined> {
		const data: AssetResponse | undefined = (await this.coinCapClient.getAsset(slug)) as AssetResponse | undefined;
		return data;
	}

	/* CoinCap */
	async getAssetMarkets(slug: string): Promise<AssetMarketsResponse | undefined> {
		const data: AssetMarketsResponse | undefined = (await this.coinCapClient.getAssetMarkets(slug)) as AssetMarketsResponse | undefined;
		return data;
	}

	/* CoinCap */
	async getAssetHistory(slug: string): Promise<AssetHistoryResponse | undefined> {
		const data: AssetHistoryResponse | undefined = (await this.coinCapClient.getAssetHistory(slug)) as AssetHistoryResponse | undefined;
		return data;
	}

	/* CoinCap */
	async getAssetTotalMarketCapHistory(): Promise<MarketCapHistoryResponse | undefined> {
		const data: MarketCapHistoryResponse | undefined = (await this.coinCapClient.getAssetTotalMarketCapHistory()) as
			| MarketCapHistoryResponse
			| undefined;
		return data;
	}

	/* CoinCap */
	async getAssetMarketCapHistory(slug: string): Promise<MarketCapHistoryResponse | undefined> {
		const data: MarketCapHistoryResponse | undefined = (await this.coinCapClient.getAssetMarketCapHistory(slug)) as
			| MarketCapHistoryResponse
			| undefined;
		return data;
	}

	/* CoinCap */
	async getExchanges(): Promise<ExchangesResponse | undefined> {
		const data: ExchangesResponse | undefined = (await this.coinCapClient.getExchanges()) as ExchangesResponse | undefined;
		return data;
	}

	/* CoinCap */
	async getExchange(exchange: string): Promise<ExchangeResponse | undefined> {
		const data: ExchangeResponse | undefined = (await this.coinCapClient.getExchange(exchange)) as ExchangeResponse | undefined;
		return data;
	}

	/* CoinCap */
	async getMarkets(): Promise<MarketsResponse | undefined> {
		const data: MarketsResponse | undefined = (await this.coinCapClient.getMarkets()) as MarketsResponse | undefined;
		return data;
	}

	/* CoinCap */
	async getRates(): Promise<RatesResponse | undefined> {
		const data: RatesResponse | undefined = (await this.coinCapClient.getRates()) as RatesResponse | undefined;
		return data;
	}

	/* CoinCap */
	async getRate(slug: string): Promise<RateResponse | undefined> {
		const data: RateResponse | undefined = (await this.coinCapClient.getRate(slug)) as RateResponse | undefined;
		return data;
	}

	/* CoinCap */
	async getTechnicalAnalysisSMAFull(slug: string): Promise<TASMAResponse | undefined> {
		const data: TASMAResponse | undefined = (await this.coinCapClient.getTechnicalAnalysisSMAFull(slug)) as TASMAResponse | undefined;
		return data;
	}

	/* CoinCap */
	async getTechnicalAnalysisSMALatest(slug: string): Promise<TASMAResponse | undefined> {
		const data: TASMAResponse | undefined = (await this.coinCapClient.getTechnicalAnalysisSMALatest(slug)) as TASMAResponse | undefined;
		return data;
	}

	/* CoinCap */
	async getTechnicalAnalysisEMAFull(slug: string): Promise<TAEMAResponse | undefined> {
		const data: TAEMAResponse | undefined = (await this.coinCapClient.getTechnicalAnalysisEMAFull(slug)) as TAEMAResponse | undefined;
		return data;
	}

	/* CoinCap */
	async getTechnicalAnalysisEMALatest(slug: string): Promise<TAEMAResponse | undefined> {
		const data: TAEMAResponse | undefined = (await this.coinCapClient.getTechnicalAnalysisEMALatest(slug)) as TAEMAResponse | undefined;
		return data;
	}

	/* CoinCap */
	async getTechnicalAnalysisMACDFull(slug: string): Promise<TAMACDResponse | undefined> {
		const data: TAMACDResponse | undefined = (await this.coinCapClient.getTechnicalAnalysisMACDFull(slug)) as TAMACDResponse | undefined;
		return data;
	}

	/* CoinCap */
	async getTechnicalAnalysisMACDLatest(slug: string): Promise<TAMACDResponse | undefined> {
		const data: TAMACDResponse | undefined = (await this.coinCapClient.getTechnicalAnalysisMACDLatest(slug)) as TAMACDResponse | undefined;
		return data;
	}

	/* CoinCap */
	async getTechnicalAnalysisVWAPLatest(slug: string): Promise<TAVWAPResponse | undefined> {
		const data: TAVWAPResponse | undefined = (await this.coinCapClient.getTechnicalAnalysisVWAPLatest(slug)) as TAVWAPResponse | undefined;
		return data;
	}

	/* CoinCap */
	async getTechnicalAnalysisCandlesticks(slug: string): Promise<TACandlestickResponse | undefined> {
		const data: TACandlestickResponse | undefined = (await this.coinCapClient.getTechnicalAnalysisCandlesticks(slug)) as
			| TACandlestickResponse
			| undefined;
		return data;
	}

	/* CoinCap */
	async getTechnicalAnalysisRSIFull(slug: string): Promise<TARSIResponse | undefined> {
		const data: TARSIResponse | undefined = (await this.coinCapClient.getTechnicalAnalysisRSIFull(slug)) as TARSIResponse | undefined;
		return data;
	}

	/* CoinCap */
	async getTechnicalAnalysisRSILatest(slug: string): Promise<TARSIResponse | undefined> {
		const data: TARSIResponse | undefined = (await this.coinCapClient.getTechnicalAnalysisRSILatest(slug)) as TARSIResponse | undefined;
		return data;
	}

	/* CoinCap */
	async getTechnicalAnalysisGetAllLatest(slug: string): Promise<TAAllLatestResponse | undefined> {
		const data: TAAllLatestResponse | undefined = (await this.coinCapClient.getTechnicalAnalysisGetAllLatest(slug)) as
			| TAAllLatestResponse
			| undefined;
		return data;
	}
}
