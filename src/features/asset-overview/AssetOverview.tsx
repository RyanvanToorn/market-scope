import { Box } from "@components/Box/Box";
import { LineChart } from "@components/LineChart/LineChart";
import { Paper } from "@components/Paper/Paper";
import { Typography } from "@components/Typography/Typography";
import type { AssetType } from "@type/asset-type";
import { useState } from "react";
import * as Styles from "./AssetOverview.styles";

/* Parity needs to be ensured with AssetTypes from src/types/AssetTypes */

export interface AssetOverviewProps {
	/** The asset's type */
	assetType: AssetType | undefined;
	/** The asset's unique identifier @example symbol value or coin name */
	symbol: string | undefined;
	/** The asset's name */
	name: string | undefined;
	/** The asset's description */
	description?: string;
}

export function AssetOverview(props: AssetOverviewProps): React.ReactElement | null {
	if (props.assetType === undefined) {
		return null;
	}

	const [dailyData, setDailyData] = useState<SeriesType[]>([]);
	const [weeklyData, setWeeklyData] = useState<SeriesType[]>([]);
	const [yearlyData, setYearlyData] = useState<SeriesType[]>([]);

	const [loaders, setLoaders] = useState({
		isLoadingChart1: false,
		isLoadingChart2: false,
		isLoadingChart3: false,
	});

	useEffect(() => {
		if (!props.symbol) return;

		setLoaders({ isLoadingChart1: true, isLoadingChart2: true, isLoadingChart3: true });

		Promise.all([apiClient.getDailyData(props.symbol), apiClient.getWeeklyData(props.symbol), apiClient.getYearlyData(props.symbol)]).then(
			([daily, weekly, yearly]) => {
				setDailyData(daily);
				setWeeklyData(weekly);
				setYearlyData(yearly);
				setLoaders({ isLoadingChart1: false, isLoadingChart2: false, isLoadingChart3: false });
			},
		);
	}, [props.symbol, props.assetType]);

	return (
		<Box sx={Styles.AssetOverviewRootSx} extendedClass="AssetOverview">
			<Box extendedClass="TitleRow" sx={Styles.TitleRowSx}>
				<Typography text={`${props.symbol} - ${props.name}`} variant="h5" />
			</Box>
			<Box extendedClass="GraphRow" sx={Styles.GraphRowSx}>
				<Paper>
					<LineChart series={[]} loading={loaders.isLoadingChart1} width={500} height={300} />
				</Paper>

				<Paper>
					<LineChart series={[]} loading={loaders.isLoadingChart1} width={500} height={300} />
				</Paper>

				<Paper>
					<LineChart series={[]} loading={loaders.isLoadingChart1} width={500} height={300} />
				</Paper>
			</Box>
			<Box extendedClass="DetailRow" sx={Styles.DetailRowSx}></Box>
		</Box>
	);
}
