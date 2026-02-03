import type { Listing } from "@interfaces/Listing";
import { parseCSV } from "@utils/csv-parser";

export class AlphaVantageClient {
	private apiKey: string;
	private baseUrl: string = "https://www.alphavantage.co/query";

	constructor(apiKey: string) {
		this.apiKey = apiKey;
	}

	public async getListingStatus(): Promise<Listing[]> {
		try {
			const response = await fetch(
				`${this.baseUrl}?function=LISTING_STATUS&apikey=${this.apiKey}`,
			);

			const csvData = await response.text();
			const parsedData = parseCSV(csvData) as Listing[];

			return parsedData;
		} catch (error) {
			console.warn(error);
			return error;
		}
	}

	public async getTimeSeriesDaily(symbol: string): Promise<any> {
		try {
			const response = await fetch(
				`${this.baseUrl}?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${this.apiKey}`,
			);

			const data = await response.json();

			// Validate before casting
			if (!Array.isArray(data)) {
				throw new Error("Invalid Time Series data");
			}

			return data as ;
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

			const data = await response.json();
			return data;
		} catch (error) {
			console.warn(error);
			return error;
		}
	}
}
