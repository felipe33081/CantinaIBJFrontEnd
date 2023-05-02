import styled from 'styled-components';

const DatePickerContainer = styled.div`
	.react-datepicker-wrapper {
		width: 100%;
	}

	.uk-form-controls {
		position: inherit !important;
	}
`;

const ClearIcon = styled.i`
	position: absolute;
	top: 41px;
	right: 12px;
	cursor: pointer;

	&:hover {
		color: #545252;
	}
`;

export {
	DatePickerContainer,
	ClearIcon
};