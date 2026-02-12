import type { Listing } from "@interfaces/listing";
import type { AlphaVantageClient, TimeSeriesData } from "@services/alpha-vantage-client";

export class APIController {
	private client: AlphaVantageClient;

	constructor(client: AlphaVantageClient) {
		this.client = client;
	}

	/* Alpha Vantage */
	async getAllSymbols(): Promise<Listing[] | undefined> {
		const listings = await this.client.getListingStatus();
		return listings as Listing[] | undefined;
	}

	/* Alpha Vantage */
	async getTimeSeriesDaily(symbol: string): Promise<TimeSeriesData | undefined> {
		const dailyData: TimeSeriesData | undefined = (await this.client.getTimeSeriesDaily(symbol)) as TimeSeriesData | undefined;
		return dailyData;
	}

	/* Alpha Vantage */
	async getTimeSeriesWeekly(symbol: string): Promise<TimeSeriesData | undefined> {
		const dailyData: TimeSeriesData | undefined = (await this.client.getTimeSeriesWeekly(symbol)) as TimeSeriesData | undefined;
		return dailyData;
	}

	/* Alpha Vantage */
	async getTimeSeriesMonthly(symbol: string): Promise<TimeSeriesData | undefined> {
		const dailyData: TimeSeriesData | undefined = (await this.client.getTimeSeriesMonthly(symbol)) as TimeSeriesData | undefined;
		return dailyData;
	}

	/* CoinCap */
	
}
