import { Checkbox, FormHelperText, InputLabel, makeStyles, TextField } from '@material-ui/core';
import { Controller } from 'react-hook-form';


const useHelperTextStyles = makeStyles(() => ({
	root: {
		color: 'red'
	}
}));


const CheckboxComponent = ({ control, name, label, id, errors, required, disabled, onChangeField }) => {

	const helperTextStyles = useHelperTextStyles();
	return (

		<Controller
			render={({ field }) => (
				<>
					<InputLabel htmlFor={id} id={`${id}-label`} shrink>{ required ? `${label} *` : label}</InputLabel>
					<Checkbox
						{...field}
						id={id}
						required={required}
						disabled={disabled}
						color="default"
						inputProps={{ 'aria-label': 'secondary checkbox' }}
						{...(onChangeField && { onChange: onChangeField })}
						checked={field.value}
					/>
					<FormHelperText classes={{ root: helperTextStyles.root }}>{errors && errors.message}</FormHelperText>
				</>)}
			control={control}
			name={name}
		/>);
};

export default CheckboxComponent;