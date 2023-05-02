import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FormLabelStyle = styled.label`
	font-weight: 700;
	text-transform: uppercase;
	color: #666
`;

const FormLabel = ({ children }) => (
	<FormLabelStyle className='uk-form-label'>{children}</FormLabelStyle>
);

FormLabel.propTypes = {
	children: PropTypes.any
};

export {
	FormLabel
};