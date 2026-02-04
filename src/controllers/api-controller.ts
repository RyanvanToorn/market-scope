import type { Listing } from "@interfaces/listing";
import type { AlphaVantageClient, TimeSeriesData } from "@services/alpha-vantage-client";

export class APIController {
	private client: AlphaVantageClient;

	constructor(client: AlphaVantageClient) {
		this.client = client;
	}

	async getAllSymbols(): Promise<Listing[] | undefined> {
		const listings = await this.client.getListingStatus();
		return listings as Listing[] | undefined;
	}

	async getTimeSeriesDaily(symbol: string): Promise<TimeSeriesData | undefined> {
		const dailyData: TimeSeriesData | undefined = (await this.client.getTimeSeriesDaily(symbol)) as
			| TimeSeriesData
			| undefined;
		return dailyData;
	}

	async getTimeSeriesWeekly(symbol: string): Promise<TimeSeriesData | undefined> {
		const dailyData: TimeSeriesData | undefined = (await this.client.getTimeSeriesWeekly(symbol)) as
			| TimeSeriesData
			| undefined;
		return dailyData;
	}

	async getTimeSeriesMonthly(symbol: string): Promise<TimeSeriesData | undefined> {
		const dailyData: TimeSeriesData | undefined = (await this.client.getTimeSeriesMonthly(
			symbol,
		)) as TimeSeriesData | undefined;
		return dailyData;
	}
}
