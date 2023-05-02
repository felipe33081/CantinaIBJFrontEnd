import React from 'react';
import {
	ButtonStyle,
	LinkButtonStyle
} from './styled';
import classNames from 'classnames';

const Button = ({ children, className, ...otherProps }) => {
	return (
		<ButtonStyle {...otherProps} className={classNames('uk-button', className)}>
			{children}
		</ButtonStyle>
	);
};

const PrimaryButton = (props) => (<Button backgroundColor={'#077e9f'} backgroundColorHover={'#055f78'} {...props} />);

const GreenButton = (props) => (<Button backgroundColor={'#32d296'} backgroundColorHover={'#389874'} {...props} />);

const LinkButton = ({ children, className, ...otherProps }) => (
	<LinkButtonStyle
		className={classNames('uk-button-link', className)}
		{...otherProps}>
		{children}
	</LinkButtonStyle>
);

export {
	PrimaryButton,
	LinkButton,
	GreenButton
};