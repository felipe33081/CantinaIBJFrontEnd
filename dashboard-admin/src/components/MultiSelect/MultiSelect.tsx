import React, { useRef } from "react";
import { Checkbox, FormHelperText, Input, ListItemText, MenuItem, Select, Typography } from "@material-ui/core";
import { useHelperTextStyles, useStyles } from "./style/style.modules";
import { MultiSelectProps } from "./types";

const SelectPlaceholder = ({ placeholder = "", disabled = false }) => {
	return <Input
		disabled={disabled}
		fullWidth
		disableUnderline={true}
		placeholder={placeholder}
	/>;
};

function MultiSelectComponent({ fields, label, onChange, id, required, value, disabled, errors }: MultiSelectProps) {
	const classes = useStyles();
	const helperTextStyles = useHelperTextStyles();
	const inputComponent = useRef<HTMLInputElement>(null);

	return (
		<div>
			{/*@ts-ignore */}
			<Typography variant="subtitle2" component="div" htmlFor={id} shrink required={required} style={{ color: "#5F5F5F", paddingBottom: 10 }}>
				<strong>{required ? `${label} *` : label}</strong>
			</Typography>
			<Select
				ref={inputComponent}
				labelId={id}
				displayEmpty
				id={id}
				multiple
				disabled={disabled}
				fullWidth
				value={value ? value : (fields.values === undefined || fields.values === null) ? "" : fields.values}
				onChange={onChange}
				input={<Input />}
				renderValue={(selected: any) => {
					const isSelected = selected != null && selected !== '';
					if (isSelected && fields) {
						var fieldsForValue = value;
						if (fieldsForValue.length > 0) {
							return fieldsForValue.map((field: any) => {
								return fields.find((f: any) => f.value === field)?.name;

							}).join(', ');

						} else {
							return <em>Selecione</em>;
						}
					}
					if (disabled) {
						return <></>;
					}
					if (!isSelected && !fields?.length) {
						return <SelectPlaceholder disabled={true} placeholder="Nenhuma opção encontrada" />;
					}
					return <></>;
				}}
				disableUnderline
				style={{ backgroundColor: 'white', borderRadius: 10, height: 48, padding: 10, border: errors && errors.message ? '1px solid red' : '' }}
				classes={{ root: classes.selectRoot }}
			>
				{fields && fields.map((field: { name: string, value: string }) => (
					<MenuItem key={field.value} value={field.value}>
						<Checkbox checked={value?.includes(field.value)} color="primary" />
						<ListItemText primary={field.name} />
					</MenuItem>
				))}
				{fields && fields.length == 0 && <MenuItem disabled key="" value="">Nenhuma opção encontrada</MenuItem>}
			</Select>
			<FormHelperText classes={{ root: helperTextStyles.root }}>{errors && errors?.message}</FormHelperText>
		</div>
	);

}
export default MultiSelectComponent;