import { Autocomplete } from "@components/Autocomplete/Autocomplete";
import { Box } from "@components/Box/Box";
import { Button } from "@components/Button/Button";
import { TextField } from "@components/TextField/TextField";
import { Typography } from "@components/Typography/Typography";
import type { Listing } from "@interfaces/Listing";
import { useAssetsQuery, useListingsQuery } from "@query/cached-api-controller-methods";
import type { Asset } from "@services/coin-cap-client";
import type { AssetType } from "@type/asset-type";
import { useState } from "react";
import styles from "./MarketSearch.styles.module.css";

type MarketSearchProps = {
	startingMode?: AssetType;
};

export function MarketSearch({ startingMode = "Currencies" }: MarketSearchProps): React.ReactElement | null {
	const [currentAssetTypeFilter, setCurrentAssetTypeFilter] = useState<AssetType>(startingMode);
	const [selectedListing, setSelectedListing] = useState<Listing | Asset | null>(null);
	const [inputValue, setInputValue] = useState("");
	const [shouldFetch, setShouldFetch] = useState(false);

	const assetsQuery = useAssetsQuery({ enabled: currentAssetTypeFilter === "Crypto" && shouldFetch });
	const listingsQuery = useListingsQuery({ enabled: currentAssetTypeFilter === "Equities" && shouldFetch });

	const isLoading =
		currentAssetTypeFilter === "Crypto" ? assetsQuery.isFetching : currentAssetTypeFilter === "Equities" ? listingsQuery.isFetching : false;

	let listings: Listing[] | Asset[];

	switch (currentAssetTypeFilter) {
		case "Crypto": {
			// CoinCap assets are a different shape than `Listing`; keep empty until mapped.
			listings = assetsQuery.data?.data ?? [];
			break;
		}
		case "Equities": {
			listings = listingsQuery.data ?? [];
			break;
		}
		default: {
			listings = [];
			break;
		}
	}

	return (
		<Box extendedClass={styles.MarketSearch}>
			<Box
				sx={{
					width: "100%",
					minHeight: "3rem",
					backgroundColor: "white",
					display: "flex",
					flexDirection: "row",
				}}
			>
				{/* Temporary display of filter state */}
				<Typography variant="body1" text={currentAssetTypeFilter} sx={{ color: "red" }} />

				{/* Temporary test of filter state */}
				<Button onClick={() => setCurrentAssetTypeFilter("Equities")}>Equities</Button>
				<Button onClick={() => setCurrentAssetTypeFilter("Crypto")}>Crypto</Button>
				<Button onClick={() => setCurrentAssetTypeFilter("Currencies")}>Currencies</Button>
			</Box>

			<Autocomplete<Listing | Asset>
				options={listings}
				loading={isLoading}
				onOpen={() => setShouldFetch(true)}
				value={selectedListing}
				onChange={(_, newValue) => {
					setSelectedListing(newValue);
				}}
				inputValue={inputValue}
				onInputChange={(_, newInputValue) => {
					setInputValue(newInputValue);
					if (newInputValue.trim().length > 0) {
						setShouldFetch(true);
					}
				}}
				getOptionLabel={(option) => `${option.symbol} - ${option.name}`}
				isOptionEqualToValue={(option, value) => option.symbol === value.symbol}
				filterOptions={(options, state) => {
					return options.filter(
						(option) =>
							option.symbol.toLowerCase().includes(state.inputValue.toLowerCase()) ||
							option.name.toLowerCase().includes(state.inputValue.toLowerCase()),
					);
				}}
				renderInput={(params) => <TextField {...params} label="Search markets" placeholder="Enter symbol or name..." />}
				noOptionsText="No markets found"
				loadingText="Loading..."
			/>
		</Box>
	);
}
