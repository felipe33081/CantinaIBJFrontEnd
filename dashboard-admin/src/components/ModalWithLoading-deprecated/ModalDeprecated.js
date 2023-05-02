import React from 'react';
import PropTypes from 'prop-types';

const ModalWithLoading = (props) => {
	const {
		onConfirm,
		onCloseModal,
		title,
		children,
		confirmText,
		secondaryButtonText
	} = props;

	let loading = false;

	return (
		<div className='uk-modal uk-open uk-display-block disablePrint' style={{ zIndex: 1300 }}>
			<div className='uk-modal-dialog disablePrint' style={{ backgroundColor: '#f5f5f5', width: "730px" }}>
				<button className='uk-modal-close-default disablePrint' type='button' onClick={onCloseModal} data-uk-close></button>
				<div className='uk-modal-header' style={{ backgroundColor: '#f5f5f5' }} >
					<h3 className='uk-modal-title uk-text-lead uk-text-uppercase disablePrint' >{title}</h3>
				</div>
				<div className='uk-modal-body disablePrint' style={{ backgroundColor: '#f5f5f5' }}>
					{children}
				</div>
				<div className='uk-modal-footer uk-text-right@s disablePrint' data-uk-margin style={{ backgroundColor: '#f5f5f5' }}>
					<button className='uk-width-1-1 uk-width-auto@s uk-margin-small-right wt-button wt-button-ghost uk-button uk-modal-close disablePrint' type='button' onClick={onCloseModal}>{secondaryButtonText}</button>
					{onConfirm && <button className='uk-width-1-1 uk-width-auto@s wt-button uk-button uk-modal-close' type='button' onClick={onConfirm}>{confirmText}</button>}
				</div>
			</div>
		</div>
	);
};

ModalWithLoading.propTypes = {
	onConfirm: PropTypes.func,
	onCloseModal: PropTypes.func,
	requestKey: PropTypes.string,
	title: PropTypes.string,
	children: PropTypes.any,
	confirmText: PropTypes.string,
	secondaryButtonText: PropTypes.string,
	request: PropTypes.object,
};

ModalWithLoading.defaultProps = {
	confirmText: 'Confirmar',
	secondaryButtonText: 'Cancelar'
};

export default ModalWithLoading;