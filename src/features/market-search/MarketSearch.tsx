import { Autocomplete } from "@components/Autocomplete/Autocomplete";
import { Box } from "@components/Box/Box";
import { TextField } from "@components/TextField/TextField";
import type { Listing } from "@interfaces/Listing";
import { useAssetsQuery, useListingsQuery } from "@query/cached-api-controller-methods";
import type { Asset } from "@services/coin-cap-client";
import { useState } from "react";
import styles from "./MarketSearch.styles.module.css";

type MarketSearchProps = {
	mode: "crypto" | "stock" | "other";
};

export function MarketSearch(props: MarketSearchProps): React.ReactElement | null {
	const [selectedListing, setSelectedListing] = useState<Listing | Asset | null>(null);
	const [inputValue, setInputValue] = useState("");
	const [shouldFetch, setShouldFetch] = useState(false);

	const assetsQuery = useAssetsQuery({ enabled: props.mode === "crypto" && shouldFetch });
	const listingsQuery = useListingsQuery({ enabled: props.mode === "stock" && shouldFetch });

	const isLoading = props.mode === "crypto" ? assetsQuery.isFetching : props.mode === "stock" ? listingsQuery.isFetching : false;

	let listings: Listing[] | Asset[];
	switch (props.mode) {
		case "crypto": {
			// CoinCap assets are a different shape than `Listing`; keep empty until mapped.
			listings = assetsQuery.data?.data ?? [];
			break;
		}
		case "stock": {
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
