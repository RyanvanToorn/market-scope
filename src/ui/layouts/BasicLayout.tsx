import { Box } from "@components/Box/Box";
import styles from "./BasicLayout.module.css";
import { AppBar } from "@components/AppBar/AppBar";
import { APIButton } from "@features/api-button/api-button";
import { Sidebar } from "@features/sidebar/sidebar";
import { useState } from "react";
import { Menu } from "@components/Menu/Menu";
import { Typography } from "@components/Typography/Typography";
import { Link } from "@components/Link/Link";

export function BasicLayout(): React.ReactElement | null {
	const [isSidebarOpen, setSidebarOpen] = useState<boolean>(true);
	const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

	const closeSidebar = () => {
		setSidebarOpen(false);
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
						<Link href={"#"} extendedClass={styles.Link} contents={"Stocks"} />
						<Link href={"#"} extendedClass={styles.Link} contents={"Crypto"} />
						<Link href={"#"} extendedClass={styles.Link} contents={"Indices"} />
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
		</Box>
	);
}

const titleSx = {
	fontSize: "2rem",
	fontFamily: "'Fjalla One', sans-serif",
};
