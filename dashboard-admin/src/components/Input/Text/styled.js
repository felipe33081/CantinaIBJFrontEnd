import styled from 'styled-components';
import InputMask from 'react-input-mask';
import {
	CircularLoadingIndicatorStyle
} from 'components/Input/LoadingIndicator/styled';

const InputMaskStyle = styled(InputMask)`
	border-radius: 3px;
	&:focus {
		border-color: #ff8203;
		outline: none
	}

	&:disabled {
		background-color: #eee;
	}
`;

const LoadingStyle = styled(CircularLoadingIndicatorStyle)`
	position: absolute;
	right: 8px;
	top: calc(50% - 16px);
`;

const AddonStyle = styled('span')`
	&:not(.uk-form-icon-flip)~.uk-input {
		padding-left: 50px !important;
	}

	.uk-form-icon-flip~.uk-input {
		padding-right: 50px !important;
		overflow: hidden;
	}

	& {
		background-color: #DFE2E8; 
		color: #626a76; 
		font-weight: bold;
	}

	&.uk-form-icon-flip {
		margin: 1px 1px 1px 0;
		border-radius: 0 2px 2px 0;
	}

	&:not(.uk-form-icon-flip) {
		margin: 1px 0 1px 1px;
		border-radius: 2px 0 0 2px;
	}
`;

export {
	InputMaskStyle,
	LoadingStyle,
	AddonStyle,
};