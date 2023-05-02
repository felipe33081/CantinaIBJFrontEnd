import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
	InputWithLabel
} from 'components';
import moment from 'moment';

class DateInput extends PureComponent {
	constructor(props) {
		super(props);

		const { initialValue } = props;

		if (initialValue) {
			this.state = {
				value: moment(props.initialValue).format('DD/MM/YYYY')
			};
		} else {
			this.state = {
				value: null
			};
		}
	}

	onDateChange(rawValue) {
		this.setState({ value: rawValue });
		const { onDateChanged } = this.props;
		const momentDate = moment(rawValue, 'DD/MM/YYYY', true);
		onDateChanged(momentDate.isValid() ? momentDate.toDate() : null);
	}

	render() {
		const { value } = this.state;
		const { label, errorMessage } = this.props;
		return (
			<InputWithLabel
				label={label}
				placeholder='DD/MM/AAAA'
				mask='99/99/9999'
				value={value}
				onChange={event => this.onDateChange(event.target.value)}
				errorMessage={errorMessage} />
		);
	}
}

DateInput.propTypes = {
	initialValue: PropTypes.objectOf(Date),
	onDateChanged: PropTypes.func.isRequired
};

export default DateInput;