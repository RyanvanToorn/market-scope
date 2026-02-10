import { Box } from "@components/Box/Box";
import styles from "./BasicLayout.module.css";
import { AppBar } from "@components/AppBar/AppBar";
import { APIButton } from "@features/api-button/api-button";
import { Sidebar } from "@features/sidebar/sidebar";
import { useState } from "react";
import { Menu } from "@components/Menu/Menu";
import { Typography } from "@components/Typography/Typography";
import { Link } from "@components/Link/Link";
import { Button } from "@components/Button/Button";
import { Icon } from "@components/Icon/Icon";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useLocation } from "@tanstack/react-router";

export function BasicLayout(): React.ReactElement | null {
	const location = useLocation();

	// Map routes to display text
	const displayTextMap: Record<string, string> = {
		"/dashboard": "Dashboard",
		"/settings": "Settings",
		"/watchlist": "Watchlist",
	};

	const displayText = displayTextMap[location.pathname] || "";

	const [isSidebarOpen, setSidebarOpen] = useState<boolean>(false);
	const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

	const closeSidebar = () => {
		setSidebarOpen(false);
	};

	const openSidebar = () => {
		setSidebarOpen(true);
	};

	const toggleMenu = () => {
		setMenuOpen(!setMenuOpen);
	};

	return (
		<Box extendedClass={styles.BasicLayout}>
			<Box extendedClass={styles.BasicLayoutTop}>
				<AppBar extendedClass={styles.AppBar}>
					<Menu isOpen={isMenuOpen} />
					<Box extendedClass={styles.TitleContainer}>
						<Typography text={"Market Scope"} variant="h1" extendedClass={styles.Title} sx={titleSx} />
					</Box>

					<Box extendedClass={styles.LinkContainer}>
						<Link href={"dashboard"} extendedClass={styles.Link} contents={"Dashboard"} />
						<Link href={"watchlist"} extendedClass={styles.Link} contents={"Watchlist"} />
						<Link href={"settings"} extendedClass={styles.Link} contents={"Settings"} />
					</Box>
					<Box extendedClass={styles.AccountContainer}>
						<Button onClick={openSidebar} extendedClass={styles.AccountButton}>
							<Icon icon={AccountCircleIcon} extendedClass={styles.AccountButtonIcon} />
						</Button>
					</Box>
				</AppBar>
			</Box>

			<Box extendedClass={styles.BasicLayoutMiddle}>
				<Box extendedClass={styles.ContentContainer}>
					<APIButton />
				</Box>

				<Box extendedClass={styles.SidebarContainer}>
					<Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
				</Box>
			</Box>

			<Box extendedClass={styles.BasicLayoutBottom}>
				<Box extendedClass={styles.BottombarContainer}></Box>
			</Box>

			<Typography
				text={displayText}
				sx={{ color: "lime", marginLeft: "0.5rem", marginBottom: "0.5rem", fontSize: "0.5rem", position: "absolute", bottom: "0px", left: "0px" }}
			/>
		</Box>
	);
}

const titleSx = {
	fontSize: "2rem",
	fontFamily: "'Fjalla One', sans-serif",
};
