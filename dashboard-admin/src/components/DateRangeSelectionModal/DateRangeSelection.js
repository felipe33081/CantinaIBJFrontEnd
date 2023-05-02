import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import {
	DangerAlert,
	DatePickerInput
} from 'components';

class DateRangeSelectionModal extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			errorMessages: [],
			initialDate: props.initialDate,
			finalDate:  props.finalDate,
		};
	}

	confirmDateFilter() {
		const { finalFilter, errorMessages } = this.validateDateFilter();
		var newState = null;
		if (errorMessages && errorMessages.length) {
			newState = {
				...this.state,
				errorMessages
			};

		} else {
			const { initialDate, finalDate } = finalFilter;

			newState = {
				errorMessages: [],
				initialDate,
				finalDate
			};

			const { onFilter } = this.props;
			onFilter(initialDate, finalDate);
		}

		this.setState(newState);
	}

	validateDateFilter() {
		var { initialDate, finalDate } = this.state;

		const errorMessages = [];

		if (initialDate !== null && finalDate !== null && initialDate > finalDate) {
			errorMessages.push(' - Data inicial maior que a data final.');
		}

		if (errorMessages.length > 0) {
			return { errorMessages };
		}

		const finalFilter = {
			initialDate,
			finalDate
		};

		return { finalFilter };
	}

	changeDateFilter(datePeriodName, value) {
		const newState = {
			...this.state,
			[datePeriodName]: value
		};

		this.setState(newState);
	}

	getFieldPlaceholderByType() {
		const { type } = this.props;
		if (type === DatePickerInput.Type.DATE_TIME) {
			return 'dd/mm/aaaa hh:mm:ss';
		}
		return 'dd/mm/aaaa';
	}

	render() {
		const { initialDate, finalDate, errorMessages } = this.state;
		const { onCloseModal, type } = this.props;

		return (
			<div className='uk-modal uk-open uk-display-block' onClick={onCloseModal}>
				<div className='uk-modal-dialog' onClick={event => event.stopPropagation()}>
					<button className='uk-modal-close-default' type='button' data-uk-close onClick={onCloseModal}></button>
					<div className='uk-modal-header'>
						<h3 className='uk-modal-title uk-text-lead uk-text-uppercase'>Período de comparação</h3>
					</div>
					<div className='uk-modal-body'>
						<div className='wt-form uk-form-stacked'>
							{errorMessages.length > 0 && <DangerAlert msg={errorMessages.map((item, index) => <span className='uk-margin-remove uk-display-block' key={index}>{item}</span>)} />}
							<div className='uk-grid-small uk-child-width-1-2@s' data-uk-grid>
								<div>
									<div className='uk-form-controls'>
										<DatePickerInput label='Data Inicial'
											placeholder={this.getFieldPlaceholderByType()}
											value={initialDate}
											type={type}
											onChange={date => this.changeDateFilter('initialDate', date)} />
									</div>
								</div>
								<div>
									<div className='uk-form-controls'>
										<DatePickerInput label='Data Final'
											placeholder={this.getFieldPlaceholderByType()}
											value={finalDate}
											type={type}
											onChange={date => this.changeDateFilter('finalDate', date)} />
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='uk-modal-footer uk-text-right@s' data-uk-margin>
						<button type='button'
							className='uk-width-1-1 uk-width-auto@s uk-margin-small-right wt-button wt-button-ghost uk-button uk-modal-close' 
							onClick={onCloseModal}>Cancelar</button>
						<button className='uk-width-1-1 uk-width-auto@s wt-button uk-button'
							type='button'
							onClick={() => this.confirmDateFilter()}>Confirmar</button>
					</div>
				</div>
			</div>
		);
	}
}

DateRangeSelectionModal.propTypes = {
	onFilter: PropTypes.func.isRequired,
	type: PropTypes.oneOf([DatePickerInput.Type.DATE, DatePickerInput.Type.DATE_TIME]),
	initialDate: PropTypes.instanceOf(Date),
	finalDate: PropTypes.instanceOf(Date),
	onCloseModal: PropTypes.func
};

DateRangeSelectionModal.defaultProps = {
	type: DatePickerInput.Type.DATE
};

export default DateRangeSelectionModal;