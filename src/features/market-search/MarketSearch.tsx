import { Autocomplete } from "@components/Autocomplete/Autocomplete";
import { Box } from "@components/Box/Box";
import { TextField } from "@components/TextField/TextField";
import type { Listing } from "@interfaces/Listing";
import { useState } from "react";
import styles from "./MarketSearch.styles.module.css";

// Mock data - TODO: Replace with API calls
const MOCK_LISTINGS: Listing[] = [
	{
		symbol: "AAPL",
		name: "Apple Inc.",
		exchange: "NASDAQ",
		assetType: "Equities",
		ipoDate: new Date("1980-12-12"),
		delistingDate: null,
		status: "Active",
	},
	{
		symbol: "GOOGL",
		name: "Alphabet Inc.",
		exchange: "NASDAQ",
		assetType: "Equities",
		ipoDate: new Date("2004-08-19"),
		delistingDate: null,
		status: "Active",
	},
	{
		symbol: "MSFT",
		name: "Microsoft Corporation",
		exchange: "NASDAQ",
		assetType: "Equities",
		ipoDate: new Date("1986-03-13"),
		delistingDate: null,
		status: "Active",
	},
	{
		symbol: "TSLA",
		name: "Tesla Inc.",
		exchange: "NASDAQ",
		assetType: "Equities",
		ipoDate: new Date("2010-06-29"),
		delistingDate: null,
		status: "Active",
	},
	{
		symbol: "META",
		name: "Meta Platforms Inc.",
		exchange: "NASDAQ",
		assetType: "Equities",
		ipoDate: new Date("2012-05-18"),
		delistingDate: null,
		status: "Active",
	},
];

export function MarketSearch(): React.ReactElement | null {
	const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
	const [inputValue, setInputValue] = useState("");

	return (
		<Box extendedClass={styles.MarketSearch}>
			<Autocomplete<Listing>
				options={MOCK_LISTINGS}
				value={selectedListing}
				onChange={(_, newValue) => {
					setSelectedListing(newValue);
				}}
				inputValue={inputValue}
				onInputChange={(_, newInputValue) => {
					setInputValue(newInputValue);
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
