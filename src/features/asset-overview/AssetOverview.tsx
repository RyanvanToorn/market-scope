import { Box } from "@components/Box/Box";
import { LineChart } from "@components/LineChart/LineChart";
import type { AssetType } from "@type/asset-type";

/* Parity needs to be ensured with AssetTypes from src/types/AssetTypes */

export interface AssetOverviewProps {
	/** The asset's type */
	assetType: AssetType | undefined;
	/** The asset's unique identifier @example symbol value or coin name */
	identifier: string | undefined;
}

const AssetOverviewRootSx = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	flex: "1",
};

const TitleRowSx = {};

const GraphRowSx = {};

const DetailRowSx = {};

export function AssetOverview(props: AssetOverviewProps): React.ReactElement | null {
	if (props.assetType === undefined) {
		return null;
	}

	return (
		<Box sx={AssetOverviewRootSx}>
			<Box extendedClass="TitleRow" sx={TitleRowSx}></Box>
			<Box extendedClass="GraphRow" sx={GraphRowSx}>
				<LineChart series={[]} />
				<LineChart series={[]} />
				<LineChart series={[]} />
			</Box>
			<Box extendedClass="DetailRow" sx={DetailRowSx}></Box>
		</Box>
	);
}
