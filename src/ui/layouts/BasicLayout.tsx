import { Box } from "@components/Box/Box";
import styles from "./BasicLayout.module.css";
import { AppBar } from "@components/AppBar/AppBar";
import { useState } from "react";
import { Typography } from "@components/Typography/Typography";
import { Button } from "@components/Button/Button";
import { Icon } from "@components/Icon/Icon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ScienceIcon from '@mui/icons-material/Science';
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import { useLocation, useNavigate } from "@tanstack/react-router";
import React from "react";
import { Sidebar } from "@features/sidebar/sidebar";
import SettingsIcon from "@mui/icons-material/Settings";
import { ScreenLink } from "@features/screen-link/ScreenLink";
import type { Theme } from "@mui/material";
import { Outlet } from "@tanstack/react-router";


export type BasicLayoutState = {
	title: string;
	sidebarHeaderContents?: React.ReactNode | null;
	sidebarBodyContents?: React.ReactNode | null;
}

type BasicLayoutContextType = {
	layout: BasicLayoutState;
	setLayout: React.Dispatch<React.SetStateAction<BasicLayoutState>>
}


const BasicLayoutContext = React.createContext<BasicLayoutContextType | null>(null)

export function useBasicLayout() {
	const context = React.useContext(BasicLayoutContext);
	if (!context) {
		throw new Error('useBasicLayout must be used within BasicLayout');
	}
	return context;
}

export function BasicLayout(): React.ReactElement | null {
	const location = useLocation();
	const navigate = useNavigate();
	console.log("Location: ",location.href);

	const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);

	const [layout, setLayout] = useState<BasicLayoutState>({
    	title: 'Initial',
    	sidebarBodyContents: null,
		sidebarHeaderContents: null,
  	})

	const closeSidebar = () => {
		setSidebarOpen(false);
	};

	const toggleSidebar = () => {
		setSidebarOpen(!isSidebarOpen);
	};

	function titleOnClick(){
		navigate({ to: "/home" });
	}



	return (
		<BasicLayoutContext.Provider value={{ layout, setLayout }}>
		<Box extendedClass={styles.BasicLayout}>
			<Box extendedClass={styles.BasicLayoutTop}>
				<AppBar extendedClass={styles.AppBar}>
					<Box extendedClass={styles.TitleContainer} onClick={titleOnClick} sx={titleContainerSx}>
						<Typography text={"Market Scope"} variant="h1" extendedClass={styles.Title} sx={titleSx} />
					</Box>

					<Box extendedClass={styles.LinkContainer}>
						<ScreenLink href={"dashboard"} label={"Dashboard"} icon={SpaceDashboardIcon}/>
						<ScreenLink href={"watchlist"} label={"Watchlist"} icon={ListAltIcon}/>
						<ScreenLink href={"settings"} label={"Settings"} icon={SettingsIcon}/>
						<ScreenLink href={"testing"} label={"Testing"} icon={ScienceIcon}/>
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
					<Outlet />
				</Box>

				<Box extendedClass={styles.SidebarContainer}>
					<Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} headerContents={layout.sidebarHeaderContents} bodyContents={layout.sidebarBodyContents} />
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

const titleContainerSx = (theme: Theme) => ({
	cursor: "pointer",
	borderRadius: theme.shape.borderRadius,
	transition: theme.transitions.create(["background-color", "box-shadow"], {
		duration: theme.transitions.duration.short,
	}),
	"&:hover": {
		backgroundColor: theme.palette.action.hover,
	},
	"&:active": {
		backgroundColor: theme.palette.action.selected,
	},
	"&:focus-visible": {
		outline: `2px solid ${theme.palette.primary.main}`,
		outlineOffset: 2,
	},
});