import styled from 'styled-components';
import PropTypes from 'prop-types';

const ButtonStyle = styled.button`
	cursor: pointer;
	transition: 280ms;
	color: white;
	border: 1px solid transparent;
	border-radius: 3px;
	outline: none;
	background-color: ${props => props.backgroundColor};
	text-transform: none;

	&:hover {
		color: white;
		background-color: ${props => props.backgroundColorHover};
	}

	&:disabled {
		opacity: 0.6;
		pointer-events: none;
	}
`;

ButtonStyle.propTypes = {
	backgroundColor: PropTypes.string,
	backgroundColorHover: PropTypes.string
};

const LinkButtonStyle = styled.button`
	border: none;
	cursor: pointer;
`;

export {
	ButtonStyle,
	LinkButtonStyle
};