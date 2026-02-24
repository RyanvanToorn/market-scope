import { Box } from "@components/Box/Box";
import { LineChart } from "@components/LineChart/LineChart";
import { Typography } from "@components/Typography/Typography";
import type { AssetType } from "@type/asset-type";

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

const AssetOverviewRootSx = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	maxWidth: "100%",
	maxHeight: "100%",
};

const TitleRowSx = {
	display: "flex",
	flexDirection: "row",
	alignItems: "center",
	justifyContent: "flex-start",
	width: "100%",
	p: 2,
};

const GraphRowSx = {
	flex: "1",
	maxHeight: "100%",
	maxWidth: "100%",
};

const DetailRowSx = {};

export function AssetOverview(props: AssetOverviewProps): React.ReactElement | null {
	if (props.assetType === undefined) {
		return null;
	}

	const loaders = {
		isLoadingChart1: false,
		isLoadingChart2: false,
		isLoadingChart3: false,
	};

	return (
		<Box sx={AssetOverviewRootSx} extendedClass="AssetOverview">
			<Box extendedClass="TitleRow" sx={TitleRowSx}>
				<Typography text={`${props.symbol} - ${props.name}`} />
			</Box>
			<Box extendedClass="GraphRow" sx={GraphRowSx}>
				<LineChart series={[]} loading={loaders.isLoadingChart1} width={200} height={200} />
				<LineChart series={[]} loading={loaders.isLoadingChart2} width={200} height={200} />
				<LineChart series={[]} loading={loaders.isLoadingChart3} width={200} height={200} />
			</Box>
			<Box extendedClass="DetailRow" sx={DetailRowSx}></Box>
		</Box>
	);
}
