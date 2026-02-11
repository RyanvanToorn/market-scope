import { Box } from "@components/Box/Box";
import styles from "./Dashboard.module.css";

export interface DashboardProps {
	temp?: string;
}

export function Dashboard(props: DashboardProps): React.ReactElement | null {
	return (
		<Box extendedClass={styles.DashboardContainer}>
			{props.temp}
			<Box extendedClass={styles.Dashboard}>
				{props.temp}
				<Box extendedClass={styles.DashboardTopRow}></Box>
				<Box extendedClass={styles.DashboardMiddleRow}></Box>
				<Box extendedClass={styles.DashboardBottomRow}></Box>
			</Box>
		</Box>
	);
}
