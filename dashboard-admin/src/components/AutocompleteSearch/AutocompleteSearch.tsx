import React, { useEffect, useState, useCallback } from 'react';
import { Typography, TextField, FormHelperText, makeStyles } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import debounce from '../../random/debounce';
import { useTenant } from '../../contexts/tenant';
import { AutocompleteProps } from './types';

const useHelperTextStyles = makeStyles(() => ({
	root: {
		color: 'red'
	}
}));

function AutocompleteWithSearch({
	id,
	displayField,
	setValue,
	options,
	label,
	watch,
	disabled,
	required,
	errors,
	onChange,
	fetch,
	endAdornment,
	showEndAdornment = false,
	params }: AutocompleteProps) {

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
				disabled={disabled}
				noOptionsText={'Nenhum registro foi encontrado.'}
				value={{ value: watch(id), name: watch(displayField) }}
				options={options}
				id={id}
				name={id}
				fullWidth
				getOptionSelected={(props) => {
					return props.value == watch(id);
				}}
				label={label}
				// @ts-ignore
				getOptionLabel={(option) => option.name ?? option.groupName ?? ""}
				renderInput={(params) => <TextField
					{...params}
					onChange={(event) => setSearchField(event.target.value)}
					InputProps={{
						...params.InputProps,
						disableUnderline: true,
						style: { backgroundColor: 'white', borderRadius: 10, height: 48, paddingLeft: 10, borderBottom: 0, border: errors && errors.message ? '1px solid red' : '' },
						onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
							setSearchField(event?.currentTarget?.value);
							setValue(displayField, event?.currentTarget?.value);
						},
						endAdornment: (
							<React.Fragment>
								{params.InputProps.endAdornment}
								{showEndAdornment ? endAdornment : ''}
							</React.Fragment>
						)
					}}
					// @ts-ignore
					shrink
				/>}
				disablePortal={true}
				// @ts-ignore
				onChange={onChange}
			/>
			<FormHelperText classes={{ root: helperTextStyles.root }}>{errors && errors.message}</FormHelperText>
		</>);

};
export default AutocompleteWithSearch;