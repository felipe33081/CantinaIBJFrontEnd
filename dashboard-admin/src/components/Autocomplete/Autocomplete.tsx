import { FormHelperText, makeStyles, TextField, Typography } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useTenant } from "contexts/tenant";
import debounce from "random/debounce";
import React, { useCallback, useEffect, useState } from "react";
import { AutocompleteLocalProps } from "./types";

const useHelperTextStyles = makeStyles(() => ({
	root: {
		color: 'red'
	}
}));

function AutocompleteLocal({
	id,
	options,
	errors,
	params,
	fetch,
	onChange,
	defaultValue,
	required,
	label

}: AutocompleteLocalProps) {

	const helperTextStyles = useHelperTextStyles();
	const [searchField, setSearchField] = useState("");
	const { selectedTenant } = useTenant();
	const { page, size } = params;

	const verify = useCallback(
		debounce((name: string) => {
			fetch(page, size, name, selectedTenant);
		}, 500),
		[]
	);

	useEffect(() => {
		fetch(page, size);
	}, []);

	useEffect(() => {
		verify(searchField);
	}, [searchField]);

	return (
		<>
			{/*@ts-ignore */}
			<Typography variant="subtitle2" component="div" htmlFor={id} shrink required={true} style={{ color: "#5F5F5F", paddingBottom: 10 }}><strong>{required ? `${label} *` : label}</strong></Typography>
			<Autocomplete
				noOptionsText={"Nenhum registro foi encontrado."}
				options={options}
				id={id}
				fullWidth
				defaultValue={defaultValue}
				getOptionSelected={(props) => {
					return props.id;
				}}
				getOptionLabel={(option) => {
					return option.name ?? "";
				}}
				renderInput={(params) => (
					<TextField
						{...params}
						InputProps={{
							...params.InputProps,
							disableUnderline: true,
							style: {
								backgroundColor: '#FFFF',
								borderRadius: 10,
								height: 48,
								paddingLeft: 10,
								borderBottom: 0,
								border: errors && errors.message ? '1px solid red' : ''
							},
							onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
								setSearchField(event?.currentTarget?.value);
							},
						}}
					/>
				)}
				disablePortal={true}
				onChange={onChange}
			/>
			<FormHelperText classes={{ root: helperTextStyles.root }}>{errors && errors.message}</FormHelperText>
		</>
	);

}

export default AutocompleteLocal;