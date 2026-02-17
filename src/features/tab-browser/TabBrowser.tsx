import { Box } from "@components/Box/Box";
import { Button } from "@components/Button/Button";
import { Icon } from "@components/Icon/Icon";
import { Tab, type TabProps } from "@components/Tabs/Tab";
import { Tabs } from "@components/Tabs/Tabs";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import { type ReactNode, useMemo, useState } from "react";
import styles from "./TabBrowser.module.css";

type TabPanelProps = {
	current: number;
	value: number;
	children: ReactNode;
};

function TabPanel({ current, value, children }: TabPanelProps) {
	const isSelected = current === value;

	if (!isSelected) {
		return null;
	}

	return (
		<Box id={`tabpanel-${value}`} aria-labelledby={`tab-${value}`}>
			<Box>{children}</Box>
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
                flex:"1",
			}}
		>
			<Tab value={value} {...tabProps} sx={{
                flex: "1",
            }}/>
			<Button children={<Icon icon={CloseIcon} />} onClick={() => onClose(Number(value))} sx={{
                p:"0.5rem",
                minWidth: "1rem"
            }}/>
		</Box>
	);
}

type TabDefinition = {
	value: number;
	label: string;
	content: ReactNode;
};

export type TabBrowserProps = {
	initialTabs?: TabDefinition[];
};


const tabsSx = {
    flex:"1",
};

const defaultTabs: TabDefinition[] = [
	{ value: 1, label: "Tab 1", content: <Box>Content for Tab 1</Box> },
];

export function TabBrowser(props: TabBrowserProps): React.ReactElement | null {
	const initialTabs = useMemo(() => props.initialTabs ?? defaultTabs, [props.initialTabs]);

	const [tabs, setTabs] = useState<TabDefinition[]>(initialTabs);
	const [currentTabNumber, setCurrentTabNumber] = useState<number>(tabs[0]?.value ?? 1);

	function setCurrentTab(_event: React.SyntheticEvent, newValue: number): void {
		setCurrentTabNumber(newValue);
	}

	function addTab() {
		setTabs((previousTabs) => {
			const maxValue = previousTabs.reduce((max, tab) => Math.max(max, tab.value), 0);
			const nextValue = maxValue + 1;
			const nextTab: TabDefinition = {
				value: nextValue,
				label: `Tab ${nextValue}`,
				content: <Box>Content for Tab {nextValue}</Box>,
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

				return nextTabs[0]?.value ?? 1;
			});

			return nextTabs;
		});
	}

	return (
		<Box
			sx={{
				width:"100%",
                height:"100%",
			}}
		>
            <Box sx={{
                width: "100%",
                display: "flex",
				flexDirection: "row",
            }}
            extendedClass={styles.BrowserHeader}
            >
			    <Tabs value={currentTabNumber} extendedClass={styles.Tabs} sx={tabsSx} onChange={setCurrentTab}>
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
			    <Button extendedClass={styles.TabAddButton} onClick={addTab} children={<Icon icon={AddCircleOutlineIcon} />} />
            </Box>
			<Box extendedClass={styles.BrowserContents} sx={{ 
                padding: 2,
                height: "100%",
                width: "100%",
                backgroundColor: "var(--color-neutral-7)"
                }} >
				{tabs.map((tab) => (
					<TabPanel key={tab.value} current={currentTabNumber} value={tab.value}>
						{tab.content}
					</TabPanel>
				))}
			</Box>
		</Box>
	);
}
