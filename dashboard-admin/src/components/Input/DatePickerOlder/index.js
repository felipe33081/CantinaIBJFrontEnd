import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import ptBr from 'date-fns/locale/pt-BR';
import { InputWithLabel } from '../../index';
import { DatePickerContainer, ClearIcon } from './styled';

import 'react-datepicker/dist/react-datepicker.css';

registerLocale('pt-BR', ptBr);
setDefaultLocale('pt-BR');

class DatePickerInput extends PureComponent {
	constructor(props) {
		super(props);

		const { value } = props;

		this.state = {
			date: value
		};
	}

	onDatePicked(date) {
		this.setState({ date });

		const { onChange } = this.props;
		onChange(date);
	}

	render() {
		const { label, errorMessage, type, placeholder, disabled } = this.props;

		const CustomInput = React.forwardRef(({ onClick, value }, ref) => (
			<InputWithLabel
				disabled={disabled}
				errorMessage={errorMessage}
				label={label}
				placeholder={placeholder}
				readOnly={true}
				onClick={onClick}
				value={value}
				ref={ref}>
				{!disabled && (
					<ClearIcon className='fas fa-times' onClick={this.onDatePicked.bind(this, null)} />
				)}
			</InputWithLabel>
		));

		return (
			<DatePickerContainer>
				<DatePicker
					locale='pt-BR'
					dateFormat={type}
					selected={this.state.date}
					timeFormat='HH:mm'
					showTimeInput={type === DatePickerInput.Type.DATE_TIME}
					onChange={date => this.onDatePicked(date)}
					timeInputLabel='Hora:'
					customInput={<CustomInput />}
				/>

			</DatePickerContainer>
		);
	}
}

DatePickerInput.Type = {
	DATE: 'dd/MM/yyyy',
	DATE_TIME: 'dd/MM/yyyy HH:mm'
};

DatePickerInput.propTypes = {
	value: PropTypes.objectOf(Date),
	onChange: PropTypes.func.isRequired,
	label: PropTypes.string,
	errorMessage: PropTypes.string,
	disabled: PropTypes.bool,
	className: PropTypes.string,
	type: PropTypes.string
};

DatePickerInput.defaultProps = {
	type: DatePickerInput.Type.DATE
};

export default DatePickerInput;