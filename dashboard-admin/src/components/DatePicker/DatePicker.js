import { FormHelperText, makeStyles, Typography } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { Controller } from "react-hook-form";

const useHelperTextStyles = makeStyles(() => ({
	root: {
		color: 'red'
	}
}));

const DatePicker = ({ style = {}, control, label, id, variant, name, disabled, errors, required, disableFuture, disablePast, fullWidth, InputLabelProps, onChangeDate = null }) => {

	const helperTextStyles = useHelperTextStyles();

	return (
		<Controller
			render={({ field }) => {
				let composedOnChange = field.onChange;

				if (onChangeDate) {
					composedOnChange = (...args) => {
						onChangeDate(...args);
						field.onChange(...args);
					};
				}
				return (<>
					<Typography variant="subtitle2" component="div" style={{ color: "#5F5F5F", paddingBottom: 10 }}><strong>{required ? `${label} *` : label}</strong></Typography>
					<KeyboardDatePicker
						{...field}
						id={id}
						fullWidth={fullWidth}
						format="dd/MM/yyyy"
						placeholder="dd/mm/aaaa"
						variant={variant}
						disableFuture={disableFuture}
						disablePast={disablePast}
						disabled={disabled}
						InputLabelProps={InputLabelProps}
						InputProps={{
							disableUnderline: true
						}}
						helperText={false}
						style={{ backgroundColor: 'white', borderRadius: 10, height: 48, padding: 10, border: errors && errors.message ? '1px solid red' : '', ...style }}
						onChange={composedOnChange}
					/>
					{errors && <FormHelperText classes={{ root: helperTextStyles.root }}>{errors.message}</FormHelperText>}
				</>);
			}}
			control={control}
			name={name}
		/>);
};

export default DatePicker;