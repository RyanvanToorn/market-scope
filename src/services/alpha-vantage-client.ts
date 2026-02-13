import type { Listing } from "@interfaces/Listing";
import { parseCSV } from "@utils/csv-parser";

export interface MetaData {
	information: string;
	symbol: string;
	lastRefreshed: string;
	outputSize?: string;
	timeZone: string;
}

export interface PricePoint {
	open: number;
	high: number;
	low: number;
	close: number;
	volume: number;
}

export interface TimeSeriesData {
	metaData: MetaData;
	timeSeries: Record<string, PricePoint>;
}

export class AlphaVantageClient {
	private apiKey: string;
	private baseUrl: string = "https://www.alphavantage.co/query";

	constructor(apiKey: string) {
		this.apiKey = apiKey;
	}

	public async getListingStatus(): Promise<Listing[] | TypeError> {
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

	public async getTimeSeriesDaily(symbol: string): Promise<TimeSeriesData | TypeError> {
		try {
			const response = await fetch(`${this.baseUrl}?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${this.apiKey}`);

			if (!response.ok) {
				throw new Error(`getTimeSeriesDaily - HTTP error! Status: ${response.status}`);
			}

			const rawData = await response.json();
			return this.transformTimeSeriesData(rawData);
		} catch (error) {
			console.warn(error);
			return error as Error;
		}
	}

	public async getTimeSeriesWeekly(symbol: string): Promise<TimeSeriesData | TypeError> {
		try {
			const response = await fetch(`${this.baseUrl}?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=${this.apiKey}`);

			if (!response.ok) {
				throw new Error(`getTimeSeriesWeekly - HTTP error! Status: ${response.status}`);
			}

			const rawData = await response.json();
			return this.transformTimeSeriesData(rawData);
		} catch (error) {
			console.warn(error);
			return error as Error;
		}
	}

	public async getTimeSeriesMonthly(symbol: string): Promise<TimeSeriesData | TypeError> {
		try {
			const response = await fetch(`${this.baseUrl}?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${this.apiKey}`);

			if (!response.ok) {
				throw new Error(`getTimeSeriesMonthly - HTTP error! Status: ${response.status}`);
			}

			const rawData = await response.json();
			return this.transformTimeSeriesData(rawData);
		} catch (error) {
			console.warn(error);
			return error as Error;
		}
	}

	private transformTimeSeriesData(rawData: any): TimeSeriesData {
		const metaData: MetaData = {
			information: rawData["Meta Data"]["1. Information"],
			symbol: rawData["Meta Data"]["2. Symbol"],
			lastRefreshed: rawData["Meta Data"]["3. Last Refreshed"],
			outputSize: rawData["Meta Data"]["4. Output Size"],
			timeZone: rawData["Meta Data"]["5. Time Zone"],
		};

		const timeSeries: Record<string, PricePoint> = {};

		// Handle different time series keys (Daily, Weekly, Monthly)
		const timeSeriesKey = Object.keys(rawData).find((key) => key.startsWith("Time Series"));

		if (!timeSeriesKey) {
			throw new Error("No time series data found in response");
		}

		const rawTimeSeries = rawData[timeSeriesKey];

		for (const [date, prices] of Object.entries(rawTimeSeries)) {
			timeSeries[date] = {
				open: parseFloat((prices as any)["1. open"]),
				high: parseFloat((prices as any)["2. high"]),
				low: parseFloat((prices as any)["3. low"]),
				close: parseFloat((prices as any)["4. close"]),
				volume: parseInt((prices as any)["5. volume"], 10),
			};
		}

		return { metaData, timeSeries };
	}
}
