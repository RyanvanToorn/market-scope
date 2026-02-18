import type { StandardComponentProps } from "@interfaces/standard-component-props";
import { type AutocompleteRenderInputParams, Autocomplete as MUIAutocomplete } from "@mui/material";
import type { AutocompleteProps as MUIAutocompleteProps } from "@mui/material/Autocomplete";
import styles from "./Autocomplete.module.css";

export type AutoCompleteProps<
	TOption,
	Multiple extends boolean | undefined = false,
	DisableClearable extends boolean | undefined = false,
	FreeSolo extends boolean | undefined = false,
> = StandardComponentProps &
	Omit<MUIAutocompleteProps<TOption, Multiple, DisableClearable, FreeSolo>, "id" | "className" | "sx" | "style"> & {
		renderInput: (params: AutocompleteRenderInputParams) => React.ReactNode;
	};

export function AutoComplete<
	TOption,
	Multiple extends boolean | undefined = false,
	DisableClearable extends boolean | undefined = false,
	FreeSolo extends boolean | undefined = false,
>(props: AutoCompleteProps<TOption, Multiple, DisableClearable, FreeSolo>): React.ReactElement | null {
	if (props.isVisible === false) {
		return null;
	}

	const { isVisible, id, extendedClass, sx, style, ...muiProps } = props;

	return <MUIAutocomplete {...muiProps} id={id} className={`${styles.Autocomplete} ${extendedClass ?? ""}`} sx={sx} style={style} />;
}
