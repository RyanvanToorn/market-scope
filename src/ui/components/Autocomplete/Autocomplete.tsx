import type { StandardComponentProps } from "@interfaces/standard-component-props";
import { Autocomplete as MUIAutocomplete, type AutocompleteRenderInputParams } from "@mui/material";
import styles from "./Autocomplete.module.css";

export interface AutoCompleteProps extends StandardComponentProps {
	options: Array<any>;
	renderInput: (params: AutocompleteRenderInputParams) => React.ReactNode;
	autoComplete?: boolean;
	autoHighlight?: boolean;
	autoSelect?: boolean;
	blurOnSelect?: boolean;
	clearIcon?: React.ReactNode;
	clearOnEscape?: boolean;
	disableClearable?: boolean;
	disablePortal?: boolean;
	freeSolo?: boolean;
	fullWidth?: boolean;
	onChange: (event: React.SyntheticEvent, value: Value | Array<Value>, reason: string, details?: string) => void;
}

export function AutoComplete(props: AutoCompleteProps): React.ReactElement | null {
	if (props.isVisible === false) {
		return null;
	}

	return (
		<MUIAutocomplete
			id={props.id}
			className={`${styles.Autocomplete} ${props.extendedClass ?? ""}`}
			sx={props.sx}
			renderInput={props.renderInput}
			options={props.options}
			autoComplete={props.autoComplete}
			autoHighlight={props.autoHighlight}
			autoSelect={props.autoSelect}
			blurOnSelect={props.blurOnSelect}
			clearIcon={props.clearIcon}
			clearOnEscape={props.clearOnEscape}
		/>
	);
}
