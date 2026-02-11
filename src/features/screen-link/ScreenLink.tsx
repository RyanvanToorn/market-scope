import { Link } from "@components/Link/Link";
import styles from "./ScreenLink.styles.module.css";
import type { SvgIconProps } from '@mui/material';
import { Typography } from "@components/Typography/Typography";
import { Icon } from "@components/Icon/Icon";
import { Box } from "@components/Box/Box";


export interface ScreenLinkProps {
    href: string;
    icon: React.ElementType<SvgIconProps>;
    label: string;
}

const linkTextSx = {
    fontFamily: "'Fjalla One', sans-serif",
};

const linkIconSx = {
    fontSize: "2rem",
};

export function ScreenLink(props: ScreenLinkProps): React.ReactElement | null{
    return (

		<Link
			href={props.href}
			extendedClass={styles.Link}
			contents={
				<Box extendedClass={styles.LinkWrapper}>
					<Icon icon={props.icon} extendedClass={styles.LinkIcon} sx={linkIconSx} />
					<Typography text={props.label} extendedClass={styles.LinkText} sx={linkTextSx} />
				</Box>
			}
		/>
	);
}