import { Box } from "@components/Box/Box";
import { LineChart } from "@components/LineChart/LineChart";
import { Paper } from "@components/Paper/Paper";
import { Typography } from "@components/Typography/Typography";
import type { LineSeries } from "@mui/x-charts/LineChart";
import { useTimeSeriesDailyQuery, useTimeSeriesMonthlyQuery, useTimeSeriesWeeklyQuery } from "@query/cached-api-controller-methods";
import type { TimeSeriesData } from "@services/alpha-vantage-client";
import type { AssetType } from "@type/asset-type";
import * as Styles from "./AssetOverview.styles";

/* Parity needs to be ensured with AssetTypes from src/types/AssetTypes */
function toLineSeries(data: TimeSeriesData | undefined): LineSeries[] {
	if (!data) return [];
	const sorted = Object.entries(data.timeSeries).sort(([a], [b]) => a.localeCompare(b));
	return [{ data: sorted.map(([, point]) => point.close) }];
}

export interface AssetOverviewProps {
	/** The asset's type */
	assetType: AssetType;
	/** The asset's unique identifier @example symbol value or coin name */
	symbol: string;
	/** The asset's name */
	name: string | undefined;
	/** The asset's description */
	description?: string;
}

export function AssetOverview(props: AssetOverviewProps): React.ReactElement | null {
	const timeSeriesDailyQuery = useTimeSeriesDailyQuery({ enabled: props.symbol !== "", assetSymbol: props.symbol, assetType: props.assetType });
	const timeSeriesWeeklyQuery = useTimeSeriesWeeklyQuery({ enabled: props.symbol !== "", assetSymbol: props.symbol, assetType: props.assetType });
	const timeSeriesMonthlyQuery = useTimeSeriesMonthlyQuery({ enabled: props.symbol !== "", assetSymbol: props.symbol, assetType: props.assetType });

	const dailySeries = toLineSeries(timeSeriesDailyQuery.data);
	const weeklySeries = toLineSeries(timeSeriesWeeklyQuery.data);
	const monthlySeries = toLineSeries(timeSeriesMonthlyQuery.data);

	return (
		<Box sx={Styles.AssetOverviewRootSx} extendedClass="AssetOverview">
			<Box extendedClass="TitleRow" sx={Styles.TitleRowSx}>
				<Typography text={`${props.symbol} - ${props.name}`} variant="h5" />
			</Box>
			<Box extendedClass="GraphRow" sx={Styles.GraphRowSx}>
				<Paper>
					<LineChart series={dailySeries} loading={timeSeriesDailyQuery.isFetching} width={500} height={300} />
				</Paper>

				<Paper>
					<LineChart series={weeklySeries} loading={timeSeriesWeeklyQuery.isFetching} width={500} height={300} />
				</Paper>

				<Paper>
					<LineChart series={monthlySeries} loading={timeSeriesMonthlyQuery.isFetching} width={500} height={300} />
				</Paper>
			</Box>
			<Box extendedClass="DetailRow" sx={Styles.DetailRowSx}></Box>
		</Box>
	);
}
