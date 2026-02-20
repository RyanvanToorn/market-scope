import { Autocomplete } from "@components/Autocomplete/Autocomplete";
import { Box } from "@components/Box/Box";
import { MenuItem } from "@components/MenuItem/MenuItem";
import { Select } from "@components/Select/Select";
import { TextField } from "@components/TextField/TextField";
import type { Listing } from "@interfaces/Listing";
import { useAssetsQuery, useListingsQuery } from "@query/cached-api-controller-methods";
import type { Asset } from "@services/coin-cap-client";
import type { AssetType } from "@type/asset-type";
import { useState } from "react";
import styles from "./AssetTypeAutocomplete.styles.module.css";

type AssetTypeAutocompleteProps = {
	startingMode?: AssetType;
};

export function AssetTypeAutocomplete({ startingMode = "Currencies" }: AssetTypeAutocompleteProps): React.ReactElement | null {
	const [currentAssetTypeFilter, setCurrentAssetTypeFilter] = useState<AssetType>(startingMode);
	const [selectedListing, setSelectedListing] = useState<Listing | Asset | null>(null);
	const [inputValue, setInputValue] = useState("");
	const [shouldFetch, setShouldFetch] = useState(false);

	const assetsQuery = useAssetsQuery({ enabled: currentAssetTypeFilter === "Crypto" && shouldFetch });
	const listingsQuery = useListingsQuery({ enabled: (currentAssetTypeFilter === "Equities" || currentAssetTypeFilter === "ETFs") && shouldFetch });

	const isLoading =
		currentAssetTypeFilter === "Crypto"
			? assetsQuery.isFetching
			: currentAssetTypeFilter === "Equities" || currentAssetTypeFilter === "ETFs"
				? listingsQuery.isFetching
				: false;

	let listings: Listing[] | Asset[];

	switch (currentAssetTypeFilter) {
		case "Crypto": {
			listings = assetsQuery.data?.data ?? [];
			console.log("Listings Crypto: ", listings);
			break;
		}
		case "Equities": {
			if (listingsQuery.data) {
				listings = listingsQuery.data.filter((l) => l.assetType === "Stock" && l.status === "Active");
				console.log("Listings Equities: ", listings);
			} else {
				listings = [];
			}

			break;
		}
		case "ETFs": {
			if (listingsQuery.data) {
				listings = listingsQuery.data.filter((l) => l.assetType === "ETF" && l.status === "Active");
				console.log("Listings ETFs: ", listings);
			} else {
				listings = [];
			}

			break;
		}
		default: {
			listings = [];
			break;
		}
	}
	console.log("Listings test");

	return (
		<Box
			extendedClass={styles.AssetTypeAutocomplete}
			sx={{
				display: "flex",
				flexDirection: "row",
				width: "100%",
				p: "0.5rem",
				alignItems: "center",
				justifyContent: "flex-end",
			}}
		>
			<Autocomplete<Listing | Asset>
				options={listings}
				loading={isLoading}
				sx={{ minWidth: "20%" }}
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
			<AssetTypeFilter value={currentAssetTypeFilter} onChange={setCurrentAssetTypeFilter} />
		</Box>
	);
}

// Keep parity with AssetType in src/types/asset-type
const filterOptions: AssetType[] = ["Equities", "ETFs", "Indices", "Commodities", "Crypto", "Currencies", "Bonds"];

type MarketFilterProps = {
	value: AssetType;
	onChange: (value: AssetType) => void;
};

function AssetTypeFilter({ value, onChange }: MarketFilterProps): React.ReactElement | null {
	return (
		<Box extendedClass={styles.AssetTypeFilter} sx={{ m: "0.5rem", minWidth: "20%" }}>
			<Select<AssetType>
				value={value}
				fullWidth={true}
				onChange={(event) => {
					onChange(event.target.value as AssetType);
				}}
			>
				{filterOptions.map((t) => (
					<MenuItem key={t} value={t}>
						{t}
					</MenuItem>
				))}
			</Select>
		</Box>
	);
}
