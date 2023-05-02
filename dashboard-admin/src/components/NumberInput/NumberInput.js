import { FormHelperText, InputAdornment, makeStyles, TextField, Typography } from '@material-ui/core';
import { useController, Controller } from 'react-hook-form';
import NumberFormat from 'react-number-format';

const useHelperTextStyles = makeStyles(() => ({
	root: {
		color: 'red'
	}
}));


const NumberInput = ({ style = {}, control, name, label, id, errors, value = null, adornmentText, required, disabled, onValueChange, decimalScale = 2 }) => {

	const helperTextStyles = useHelperTextStyles();
	return (

		<Controller
			render={({ field }) => (
				<>
					<Typography variant="subtitle2" component="div" style={{ color: "#5F5F5F", paddingBottom: 10 }}><strong>{ required ? `${label} *` : label}</strong></Typography>
					<NumberFormat
						id={id}
						value={field.value}
						customInput={TextField}
						fixedDecimalScale={true}
						thousandSeparator="."
						decimalSeparator=","
						decimalScale={decimalScale}
						disabled={disabled}
						{...(value && { value })}
						{...(onValueChange && { onValueChange })}
						fullWidth
						style={{ backgroundColor: 'white', borderRadius: 10, height: 48, padding: 10, border: errors && errors.message ? '1px solid red' : '', ...style }}
						InputProps={{
							disableUnderline: true,
							startAdornment: <InputAdornment position="start">{adornmentText} </InputAdornment>,
						}}
					/>
					<FormHelperText classes={{ root: helperTextStyles.root }} required={required}>{errors && errors.message}</FormHelperText>
				</>)}
			control={control}
			name={name}
		/>);
};

export default NumberInput;