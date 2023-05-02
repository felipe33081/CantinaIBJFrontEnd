import { FormHelperText, Input, makeStyles, MenuItem, Select, TextField, Typography } from "@material-ui/core";
import { Controller } from "react-hook-form";


const useHelperTextStyles = makeStyles(() => ({
	root: {
		color: 'red'
	},
}));

const useStyles = makeStyles((theme) => ({
	selectRoot: {
		"&:focus": {
			backgroundColor: "white"
		}
	},
}));

const SelectPlaceholder = ({placeholder, disabled = false }) => {
	return <Input
		disabled={disabled}
		fullWidth
		disableUnderline={true}
		placeholder={placeholder}
	/>;
};

const SelectComponent = ({ fields, control, required = false, loading = false, disabled = false, label, id, name, errors, value = null, onChangeField = null, defaultValue }) => {

	const classes = useStyles();
	const helperTextStyles = useHelperTextStyles();
	
	return (
		<Controller
			render={({ field }) => {

				let composedOnChange = field.onChange;

				if (onChangeField){
					composedOnChange = (...args) => {
						onChangeField(...args);
						field.onChange(...args);
					};
				}
				return (<>
					<Typography variant="subtitle2" component="div" htmlFor={id} shrink required={required} style={{ color: "#5F5F5F", paddingBottom: 10 }}><strong>{ required ? `${label} *` : label}</strong></Typography>
					<Select						
						{...field}
						id={id}
						fullWidth
						name={name}
						displayEmpty
						renderValue={(selected, ...rest) => {							
							const isSelected = selected != null && selected !== '';
							if (isSelected && fields){
								var fieldsForValue = fields.filter(f => f.value == selected);
								if (fieldsForValue.length){
									return <>{fieldsForValue[0].name.includes("+55") ? 'Chave pix: ' + fieldsForValue[0].name.slice(-11) : fieldsForValue[0].name}</>;									
								} else {
									return <em>Selecione novamente</em>;
								}
							}
							if (loading){
								return <SelectPlaceholder disabled={true} placeholder="Carregando..."/>;													
							}
							if (disabled){
								return <></>;
							}							
							if (!disabled && !isSelected && fields?.length) {							
							  	return <em>Selecione</em>;
							}		
							if (!isSelected && !fields?.length){
								return <SelectPlaceholder disabled={true} placeholder="Nenhuma opção encontrada"/>;													
							}
							return <></>;							
						  }}
						disabled={disabled}						
						value={value ? value : (field.value === undefined || field.value === null) ? "" : field.value}
						defaultValue={defaultValue}
						component={TextField}
						disableUnderline						
						style={{ backgroundColor: 'white', borderRadius: 10, height: 48, padding: 10, border: errors && errors.message ? '1px solid red' : '' }}
						classes={{ root: classes.selectRoot }}
						onChange={composedOnChange}
					>
						{fields && fields.map(field => (
							<MenuItem key={field.value} value={field.value}>
								{field.name.includes("+55") ? "Chave pix: " + field.name.slice(-11) : field.name}
							</MenuItem>
						))}
						{fields && fields.length == 0 && <MenuItem disabled key="" value="">Nenhuma opção encontrada</MenuItem>}						
					</Select>
					<FormHelperText classes={{ root: helperTextStyles.root }}>{errors && errors?.message}</FormHelperText>
				</>); 
			}}
			control={control}
			name={name}
		/>);
};

export default SelectComponent;
