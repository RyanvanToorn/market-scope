import { LineChart as MUILineChart } from "@mui/x-charts/LineChart";
import styles from "./LineChart.module.css";
import type { StandardComponentProps } from "@interfaces/standard-component-props";

export interface LineChartProps extends StandardComponentProps {
	series: number[];
	xLabels: string[];
}

export function LineChart(props: LineChartProps): React.ReactElement | null {
	if (props.isVisible === false) {
		return null;
	}

	return <MUILineChart className={`${styles.LineChart} ${props.extendedClass ? props.extendedClass : ""}`} />;
}
