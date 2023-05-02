import React from 'react';
import PropTypes from 'prop-types';
import {
	InputMaskStyle,
	LoadingStyle,
	AddonStyle,
} from './styled';
import classNames from 'classnames';

import {
	FormLabel
} from 'components';

const InputWithLabel = (props) => {
	const { 
		label, 
		infoText, 
		disabled, 
		className, 
		errorMessage, 
		type, 
		loading, 
		children, 
		addon, 
		addonRight, 
		style,
		...otherProps 
	} = props;
	
	const classes = classNames('uk-input', className, {
		'uk-disabled': disabled,
		'uk-form-danger': errorMessage
	});
	const addonClasses = classNames('uk-form-icon', {
		'uk-form-icon-flip': addonRight,
	});

	return (
		<div className='uk-margin-remove' style={style}>
			{label &&
				<FormLabel>{label}
					{infoText && <i className='fas fa-info uk-margin-small-left' title={infoText} data-uk-tooltip='pos: right'> </i>}
				</FormLabel>
			}
			<div className='uk-form-controls uk-position-relative'>
				{addon && <AddonStyle className={addonClasses}>{addon}</AddonStyle>}
				<InputMaskStyle
					alwaysShowMask={false}
					type={type}
					maskChar=' '
					disabled={disabled}
					className={classes}
					{...otherProps} />
				{loading &&
					<LoadingStyle type='circle'>
						<div></div>
						<div></div>
						<div></div>
						<div></div>
					</LoadingStyle>
				}
				{children}
			</div>
			{errorMessage && <div className='uk-text-right uk-form-danger uk-text-small' style={{ fontSize: '.775rem' }}>{errorMessage}</div>}
		</div>
	);
};

InputWithLabel.propTypes = {
	onChange: PropTypes.func,
	value: PropTypes.string,
	label: PropTypes.string,
	infoText: PropTypes.string,
	disabled: PropTypes.bool,
	className: PropTypes.string,
	errorMessage: PropTypes.string,
	loading: PropTypes.bool,
	addon: PropTypes.string,
	addonRight: PropTypes.bool,
	style: PropTypes.object,
};

InputWithLabel.defaultProps = {
	type: 'text',
};

export default InputWithLabel;
