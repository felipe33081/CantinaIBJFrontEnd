import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonIconStyle = styled.button`
    width: 42px;
    height: 42px;
    color: #999;
    background-color: transparent;
    border-radius: 50%;
    border: 0;
    transition: background-color 0.6s ease;
    cursor: pointer;

    &:hover {
        background-color: #e7e7e7;
    }

    &:focus {
        outline: 0;
    }
`;

const ButtonIcon = ({ iconClassName, className }) => (
	<ButtonIconStyle className={className}>
		<i className={`fas ${iconClassName}`} />
	</ButtonIconStyle>
);

ButtonIcon.propTypes = {
	iconClassName: PropTypes.string.isRequired
};

export default ButtonIcon;