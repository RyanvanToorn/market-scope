import { Box } from "@components/Box/Box";
import styles from "./BasicLayout.module.css";
import { AppBar } from "@components/AppBar/AppBar";
import { Sidebar } from "@features/sidebar/sidebar";
import { useState } from "react";
import { Typography } from "@components/Typography/Typography";
import { Link } from "@components/Link/Link";
import { Button } from "@components/Button/Button";
import { Icon } from "@components/Icon/Icon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useLocation } from "@tanstack/react-router";
import React from "react";
import { BasicMenu, type BasicMenuItem } from "@features/basic-menu/basic-menu";

export type BasicLayoutState = {
	title: string;
	layoutBodyContents?: React.ReactNode | null;
	layoutFooterContents?: React.ReactNode | null;
	sidebarHeaderContents?: React.ReactNode | null;
	sidebarBodyContents?: React.ReactNode | null;
}

type BasicLayoutContextType = {
	layout: BasicLayoutState;
	setLayout: React.Dispatch<React.SetStateAction<BasicLayoutState>>
}


const BasicLayoutContext = React.createContext<BasicLayoutContextType | null>(null)

export function BasicLayout(): React.ReactElement | null {
	const location = useLocation();
	console.log("Location: ",location.href);

	const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

	const [layout, setLayout] = useState<BasicLayoutState>({
    	title: 'Test',
    	layoutBodyContents: null,
    	sidebarBodyContents: null,
  	})

	const menuItems: BasicMenuItem[] = [{label: "Item 1"},{label: "Item 2"},{label: "Item 3"}]

	const closeSidebar = () => {
		setSidebarOpen(false);
	};

	const toggleSidebar = () => {
		setSidebarOpen(!isSidebarOpen);
	};



	return (
		<BasicLayoutContext.Provider value={{ layout, setLayout }}>
		<Box extendedClass={styles.BasicLayout}>
			<Box extendedClass={styles.BasicLayoutTop}>
				<AppBar extendedClass={styles.AppBar}>
					<BasicMenu menuItems={menuItems} />
					<Box extendedClass={styles.TitleContainer}>
						<Typography text={"Market Scope"} variant="h1" extendedClass={styles.Title} sx={titleSx} />
					</Box>

					<Box extendedClass={styles.LinkContainer}>
						<DashboardLink />
						<WatchlistLink />
						<SettingsLink />
					</Box>
					<Box extendedClass={styles.AccountContainer}>
						<Button onClick={toggleSidebar} extendedClass={styles.AccountButton}>
							<Icon icon={AccountCircleIcon} extendedClass={styles.AccountButtonIcon} />
						</Button>
					</Box>
				</AppBar>
			</Box>

			<Box extendedClass={styles.BasicLayoutMiddle}>
				<Box extendedClass={styles.ContentContainer}>

				</Box>

				<Box extendedClass={styles.SidebarContainer}>
					<Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
				</Box>
			</Box>

			<Box extendedClass={styles.BasicLayoutBottom}>
				<Box extendedClass={styles.BottombarContainer}>

				</Box>
			</Box>
		</Box>
		</BasicLayoutContext.Provider>
	);
}

const titleSx = {
	fontSize: "2rem",
	fontFamily: "'Fjalla One', sans-serif",
};

const linkTextSx = {
	fontFamily: "'Fjalla One', sans-serif",
};

const linkIconSx = {
	fontSize: "2rem",
};

// Move to features and make generic
function DashboardLink(): React.ReactElement | null {
	return (
		<Link
			href={"dashboard"}
			extendedClass={styles.Link}
			contents={
				<Box extendedClass={styles.LinkWrapper}>
					<Icon icon={SpaceDashboardIcon} extendedClass={styles.LinkIcon} sx={linkIconSx} />
					<Typography text={"Dashboard"} extendedClass={styles.LinkText} sx={linkTextSx} />
				</Box>
			}
		/>
	);
}

function WatchlistLink(): React.ReactElement | null {
	return (
		<Link
			href={"watchlist"}
			extendedClass={styles.Link}
			contents={
				<Box extendedClass={styles.LinkWrapper}>
					<Icon icon={ListAltIcon} extendedClass={styles.LinkIcon} sx={linkIconSx} />
					<Typography text={"Watchlist"} extendedClass={styles.LinkText} sx={linkTextSx} />
				</Box>
			}
		/>
	);
}

function SettingsLink(): React.ReactElement | null {
	return (
		<Link
			href={"settings"}
			extendedClass={styles.Link}
			contents={
				<Box extendedClass={styles.LinkWrapper}>
					<Icon icon={SettingsIcon} extendedClass={styles.LinkIcon} sx={linkIconSx} />
					<Typography text={"Settings"} extendedClass={styles.LinkText} sx={linkTextSx} />
				</Box>
			}
		/>
	);
}
