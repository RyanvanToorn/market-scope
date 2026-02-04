import type { Listing } from "@interfaces/listing";
import { parseCSV } from "@utils/csv-parser";




export interface TimeSeriesDailyData{
	"Meta Data": {},
	"Time Series (Daily)": {
		
	}
};

export interface TimeSeriesWeeklyData{
	"Meta Data": {},
	"Weekly Time Series": {

	}
};

export interface TimeSeriesMonthlyData{
	"Meta Data": {},
	"Monthly Time Series":{

	}
};

export class AlphaVantageClient {
	private apiKey: string;
	private baseUrl: string = "https://www.alphavantage.co/query";

	constructor(apiKey: string) {
		this.apiKey = apiKey;
	}

	public async getListingStatus(): Promise<Listing[] | undefined> {
		try {
			const response = await fetch(
				`${this.baseUrl}?function=LISTING_STATUS&apikey=${this.apiKey}`,
			);

			if (!response.ok) {
				throw new Error(`getListingStatus - HTTP error! Status: ${response.status}`);
			}

			const csvData = await response.text();
			const parsedData = parseCSV(csvData) as Listing[];

			return parsedData;
		} catch (error) {
			console.warn(error);
			return undefined;
		}
	}

	public async getTimeSeriesDaily(symbol: string): Promise<any> {
		try {
			const response = await fetch(
				`${this.baseUrl}?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${this.apiKey}`,
			);

			if (!response.ok) {
				throw new Error(`getTimeSeriesDaily - HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();

			// Validate before casting
			if (!Array.isArray(data)) {
				throw new Error("Invalid Time Series data");
			}

			return data;
		} catch (error) {
			console.warn(error);
			return error;
		}
	}

	public async getTimeSeriesWeekly(symbol: string): Promise<any> {
		try {
			const response = await fetch(
				`${this.baseUrl}?function=TIME_SERIES_WEEKLY&symbol=${symbol}&apikey=${this.apiKey}`,
			);

			if (!response.ok) {
				throw new Error(`getTimeSeriesWeekly - HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.warn(error);
			return error;
		}
	}

	public async getTimeSeriesMonthly(symbol: string): Promise<any> {
		try {
			const response = await fetch(
				`${this.baseUrl}?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${this.apiKey}`,
			);

			if (!response.ok) {
				throw new Error(`getTimeSeriesMonthly - HTTP error! Status: ${response.status}`);
			}

			const data = await response.json();
			return data;
		} catch (error) {
			console.warn(error);
			return error;
		}
	}
}
