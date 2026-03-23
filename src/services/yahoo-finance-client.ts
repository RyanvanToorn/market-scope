export interface GraphDataParams {
	symbol: string;
	languageCode?: string;
	region?: string;
	interval?: "1m" | "5m" | "15m" | "30m" | "1d" | "1w";
	period1: number;
	period2: number;
}

/* ============= Raw API Response Types ============= */

interface YahooFinanceTradingPeriod {
	timezone: string;
	start: number;
	end: number;
	gmtoffset: number;
}

interface YahooFinanceMeta {
	currency: string;
	symbol: string;
	exchangeName: string;
	fullExchangeName: string;
	instrumentType: string;
	firstTradeDate: number;
	regularMarketTime: number;
	hasPrePostMarketData: boolean;
	gmtoffset: number;
	timezone: string;
	exchangeTimezoneName: string;
	regularMarketPrice: number;
	fiftyTwoWeekHigh: number;
	fiftyTwoWeekLow: number;
	regularMarketDayHigh: number;
	regularMarketDayLow: number;
	regularMarketVolume: number;
	longName: string;
	shortName: string;
	chartPreviousClose: number;
	previousClose: number;
	scale: number;
	priceHint: number;
	currentTradingPeriod: {
		pre: YahooFinanceTradingPeriod;
		regular: YahooFinanceTradingPeriod;
		post: YahooFinanceTradingPeriod;
	};
	tradingPeriods: {
		pre: YahooFinanceTradingPeriod[][];
		regular: YahooFinanceTradingPeriod[][];
		post: YahooFinanceTradingPeriod[][];
	};
	dataGranularity: string;
	range: string;
	validRanges: string[];
}

interface YahooFinanceQuote {
	open: (number | null)[];
	high: (number | null)[];
	low: (number | null)[];
	close: (number | null)[];
	volume: (number | null)[];
}

interface YahooFinanceChartResult {
	meta: YahooFinanceMeta;
	timestamp: number[];
	indicators: {
		quote: YahooFinanceQuote[];
	};
}

interface YahooFinanceChartResponse {
	chart: {
		result: YahooFinanceChartResult[];
		error: unknown;
	};
}

/* ============= Transformed Output Types ============= */

export interface YahooFinancePlotPoint {
	timestamp: number;
	open: number | null;
	high: number | null;
	low: number | null;
	close: number | null;
	volume: number | null;
}

export interface GraphData {
	meta: YahooFinanceMeta;
	plotPoints: YahooFinancePlotPoint[];
}

export class YahooFinanceClient {
	private baseUrl: string = "https://query1.finance.yahoo.com/";

	public async getGraphData(params: Partial<GraphDataParams>): Promise<GraphData | Error> {
		const symbol = params.symbol;
		const languageCode = params.languageCode || "en-US";
		const region = params.region || "US";
		const interval = params.interval || "1m";
		const period1 = params.period1;
		const period2 = params.period2;

		try {
			const response = await fetch(
				`${this.baseUrl}v8/finance/chart/${symbol}?period1=${period1}&period2=${period2}&interval=${interval}&includePrePost=true&events=div%7Csplit%7Cearn&lang=${languageCode}&region=${region}&source=cosaic`,
			);

			if (!response.ok) {
				throw new Error(`getGraphData - HTTP error! Status: ${response.status}`);
			}

			const rawData: YahooFinanceChartResponse = await response.json();
			return this.transformGraphData(rawData);
		} catch (error) {
			console.warn(error);
			return error as Error;
		}
	}

	private transformGraphData(rawData: YahooFinanceChartResponse): GraphData {
		const result = rawData.chart.result[0];
		const quote = result.indicators.quote[0];

		const plotPoints: YahooFinancePlotPoint[] = result.timestamp.map((ts, i) => ({
			timestamp: ts,
			open: quote.open[i] ?? null,
			high: quote.high[i] ?? null,
			low: quote.low[i] ?? null,
			close: quote.close[i] ?? null,
			volume: quote.volume[i] ?? null,
		}));

		return {
			meta: result.meta,
			plotPoints,
		};
	}
}
