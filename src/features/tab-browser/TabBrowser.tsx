import { Box } from "@components/Box/Box";
import { Button } from "@components/Button/Button";
import { Icon } from "@components/Icon/Icon";
import { Tab } from "@components/Tabs/Tab";
import { Tabs } from "@components/Tabs/Tabs";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { type ReactNode, useState } from "react";
import styles from "./TabBrowser.module.css";

type TabPanelProps = {
	current: number;
	value: number;
	children: ReactNode;
};

function TabPanel({ current, value, children }: TabPanelProps) {
	const isSelected = current === value;

	return (
		<Box isVisible={isSelected} aria-labelledby={`tab-${value}`}>
			{isSelected ? children : null}
		</Box>
	);
}

export function TabBrowser(): React.ReactElement | null {
	const tabSx = {};
	const tabsSx = {};

	const [currentTabNumber, setCurrentTabNumber] = useState<number>(1);

	function setCurrentTab(_event: React.SyntheticEvent, newValue: number): void {
		setCurrentTabNumber(newValue);
	}

	function addTab() {
		console.log("Tab Added");
	}

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "row",
			}}
		>
			<Tabs value={currentTabNumber} extendedClass={styles.Tabs} sx={tabsSx} onChange={setCurrentTab}>
				<Tab value={1} label="Tab 1" extendedClass={styles.Tab} sx={tabSx} />
				<Tab value={2} label="Tab 2" extendedClass={styles.Tab} sx={tabSx} />
				<Tab value={3} label="Tab 3" extendedClass={styles.Tab} sx={tabSx} />
				<Tab value={4} label="Tab 4" extendedClass={styles.Tab} sx={tabSx} />
				<Tab value={5} label="Tab 5" extendedClass={styles.Tab} sx={tabSx} />
			</Tabs>
			<Button extendedClass={styles.TabAddButton} onClick={addTab} children={<Icon icon={AddCircleOutlineIcon} />} />

			<Box sx={{ padding: 2 }}>
				<TabPanel current={currentTabNumber} value={1}>
					<Box>Content for Tab 1</Box>
				</TabPanel>
				<TabPanel current={currentTabNumber} value={2}>
					<Box>Content for Tab 2</Box>
				</TabPanel>
				<TabPanel current={currentTabNumber} value={3}>
					<Box>Content for Tab 3</Box>
				</TabPanel>
				<TabPanel current={currentTabNumber} value={4}>
					<Box>Content for Tab 4</Box>
				</TabPanel>
				<TabPanel current={currentTabNumber} value={5}>
					<Box>Content for Tab 5</Box>
				</TabPanel>
			</Box>
		</Box>
	);
}
