import type { StandardComponentProps } from "@interfaces/standard-component-props";
import MUIIconButton from "@mui/material/IconButton";
import styles from "./IconButton.styles.module.css";

export interface IconButtonProps {
	onClick?: () => void;
	icon: React.ReactNode;
}

export interface IconButtonProps extends StandardComponentProps {
	children?: React.ReactNode;
	anchor?: "bottom" | "left" | "right" | "top";
}

export function IconButton(props: IconButtonProps): React.ReactElement | null {
	if (props.isVisible === false) {
		return null;
	}

	return (
		<MUIIconButton id={props.id} className={`${styles.IconButton} ${props.extendedClass ?? ""}`} sx={props.sx}>
			{props.icon}
		</MUIIconButton>
	);
}
