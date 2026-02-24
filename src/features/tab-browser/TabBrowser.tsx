import { Box } from "@components/Box/Box";
import { Button } from "@components/Button/Button";
import { Icon } from "@components/Icon/Icon";
import { Tab, type TabProps } from "@components/Tabs/Tab";
import { Tabs } from "@components/Tabs/Tabs";
import { AssetOverview } from "@features/asset-overview/AssetOverview";
import { AssetTypeAutocomplete } from "@features/asset-type-autocomplete/AssetTypeAutocomplete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import type { SxProps, Theme } from "@mui/material";
import type { AssetType } from "@type/asset-type";
import { type ReactNode, useMemo, useState } from "react";
import styles from "./TabBrowser.module.css";

type TabPanelProps = {
	current: number;
	value: number;
	children: ReactNode;
	sx: SxProps<Theme>;
};

function TabPanel({ current, value, children, sx }: TabPanelProps) {
	const isSelected = current === value;

	if (!isSelected) {
		return null;
	}

	return (
		<Box id={`tabpanel-${value}`} aria-labelledby={`tab-${value}`} sx={sx}>
			{children}
		</Box>
	);
}

type TabHeaderProps = TabProps & {
	onClose: (tabToClose: number) => void;
};

function TabHeader({ onClose, value, ...tabProps }: TabHeaderProps): React.ReactElement {
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-between",
				alignItems: "center",
				flex: "1",
				maxWidth: "20rem",
				minWidth: "10rem",
			}}
		>
			<Tab
				value={value}
				{...tabProps}
				sx={{
					flex: "1",
				}}
			/>
			<Button
				onClick={() => onClose(Number(value))}
				sx={{
					p: "0.5rem",
					minWidth: "1rem",
				}}
			>
				<Icon icon={CloseIcon} />
			</Button>
		</Box>
	);
}

type TabDefinition = {
	value: number;
	label: string;
	assetType: AssetType | undefined;
	identifier: string | undefined;
};

export type TabBrowserProps = {
	initialTabs?: TabDefinition[];
};

const defaultTabs: TabDefinition[] = [{ value: 1, label: "Tab 1", assetType: undefined, identifier: undefined }];

export function TabBrowser(props: TabBrowserProps): React.ReactElement | null {
	const initialTabs = useMemo(() => props.initialTabs ?? defaultTabs, [props.initialTabs]);

	const [tabs, setTabs] = useState<TabDefinition[]>(initialTabs);
	const [currentTabNumber, setCurrentTabNumber] = useState<number>(tabs[0]?.value ?? 1);
	const [currentAssetType, setCurrentAssetType] = useState<AssetType | undefined>(undefined);

	function setCurrentTab(_event: React.SyntheticEvent, newValue: number): void {
		setCurrentTabNumber(newValue);
		const selectedTab = tabs.find((tab) => tab.value === newValue);
		setCurrentAssetType(selectedTab?.assetType);
	}

	function handleAssetTypeChange(assetType: AssetType): void {
		setCurrentAssetType(assetType);
	}

	function handleAssetSelect(identifier: string): void {
		setTabs((previousTabs) =>
			previousTabs.map((tab) => (tab.value === currentTabNumber ? { ...tab, identifier, assetType: currentAssetType } : tab)),
		);

		console.log("Tab selected - identifier: ", identifier);
	}

	function addTab() {
		setTabs((previousTabs) => {
			const maxValue = previousTabs.reduce((max, tab) => Math.max(max, tab.value), 0);
			const nextValue = maxValue + 1;
			const nextTab: TabDefinition = {
				value: nextValue,
				label: `Tab ${nextValue}`,
				assetType: undefined,
				identifier: undefined,
			};

			setCurrentTabNumber(nextValue);
			return [...previousTabs, nextTab];
		});
	}

	function closeTab(tabToClose: number) {
		setTabs((previousTabs) => {
			const nextTabs = previousTabs.filter((tab) => tab.value !== tabToClose);

			setCurrentTabNumber((previousCurrent) => {
				if (previousCurrent !== tabToClose) {
					return previousCurrent;
				}

				const closedIndex = previousTabs.findIndex((tab) => tab.value === tabToClose);
				if (closedIndex === -1) {
					return previousCurrent;
				}

				const previousTab = previousTabs[closedIndex - 1];
				if (previousTab != null) {
					return previousTab.value;
				}

				const nextTab = previousTabs[closedIndex + 1];
				if (nextTab != null) {
					return nextTab.value;
				}

				return nextTabs[0]?.value ?? 1;
			});

			return nextTabs;
		});
	}

	return (
		<Box
			sx={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<Box
				sx={{
					width: "100%",
					display: "flex",
					flexDirection: "row",
				}}
				extendedClass={styles.BrowserHeader}
			>
				<Tabs value={currentTabNumber} extendedClass={styles.Tabs} onChange={setCurrentTab}>
					{tabs.map((tab) => (
						<TabHeader
							key={tab.value}
							id={`tab-${tab.value}`}
							aria-controls={`tabpanel-${tab.value}`}
							value={tab.value}
							label={tab.label}
							extendedClass={styles.Tab}
							onClose={closeTab}
						/>
					))}
				</Tabs>
				<Button extendedClass={styles.TabAddButton} onClick={addTab}>
					<Icon icon={AddCircleOutlineIcon} />
				</Button>
			</Box>
			<Box
				extendedClass={styles.BrowserContents}
				sx={{
					padding: 1,
					width: "100%",
					height: "100%",
					flex: "1",
					boxSizing: "border-box",
					backgroundColor: "var(--color-neutral-7)",
					display: "flex",
				}}
			>
				{tabs.map((tab) => (
					<TabPanel key={tab.value} current={currentTabNumber} value={tab.value} sx={{ display: "flex", flex: "1" }}>
						<Box sx={{ flex: "1", display: "flex", flexDirection: "column" }}>
							<Box sx={{ display: "flex", flexDirection: "row", justifyContent: "flex-end" }}>
								<AssetTypeAutocomplete startingMode={currentAssetType} onAssetSelect={handleAssetSelect} onAssetTypeChange={handleAssetTypeChange} />
							</Box>
							<AssetOverview assetType={tab.assetType} identifier={tab.identifier} />
						</Box>
					</TabPanel>
				))}
			</Box>
		</Box>
	);
}
