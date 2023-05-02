import { Checkbox, InputLabel,  } from '@material-ui/core';
import { Controller } from 'react-hook-form';


const CustomCheckbox = ({ control, name, label, id, customOnChange, bool }) => {
	return (
		<Controller
			render={({ field }) => {
				let composeOnChange = field.onChange;
				 if(customOnChange) {
					composeOnChange = (...args) => {
						customOnChange(...args);
						field.onChange(...args);
				 };
				}
				return (
					<>
						<InputLabel htmlFor={id} id={`${id}-label`} shrink>{label}</InputLabel>
						<Checkbox
							{...field}
							id={id}
							color="default"
							inputProps={{ 'aria-label': 'secondary checkbox' }}
							{...(composeOnChange && { onChange: composeOnChange })}
							checked={field.value || bool}
						/>
					</>);
			}
			}
			control={control}
			name={name}
		/>);
};

export default CustomCheckbox;