import React from 'react';
import PropTypes from 'prop-types';
import {
	DotsLoadingIndicatorStyle,
	CircularLoadingIndicatorStyle
} from './styled';


const CircularLoadingIndicator = () => (
	<CircularLoadingIndicatorStyle>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</CircularLoadingIndicatorStyle>
);

const DotsLoadingIndicator = () => (
	<DotsLoadingIndicatorStyle>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
		<div></div>
	</DotsLoadingIndicatorStyle>
);

const LoadingIndicator = ({ type }) => {
	if (type === 'dots') {
		return <DotsLoadingIndicator />;
	}
	return <CircularLoadingIndicator />;
};

LoadingIndicator.propTypes = {
	type: PropTypes.string
};

LoadingIndicator.defaultProps = {
	type: 'dots' // or circular.
};

export default LoadingIndicator;
