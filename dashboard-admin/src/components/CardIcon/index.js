import React from 'react';
import PropTypes from 'prop-types';


const CardIcon = ({ icon, symbol, value, label, color }) => (
	<div className="wt-card-small">
		<div className="card-item">
			{icon}
			<div className="wt-card-title uk-margin-small-right">
				<span className="small">{symbol}</span>
				<span className="large">{value}</span>
				<br />
				<label>{label}</label>
			</div>
		</div>
	</div >
);

CardIcon.propTypes = {
	icon: PropTypes.string,
	symbol: PropTypes.string,
	value: PropTypes.any,
	label: PropTypes.string,
	color: PropTypes.string,
};

export default CardIcon;