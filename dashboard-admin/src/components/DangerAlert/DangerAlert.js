import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class DangerAlert extends PureComponent {
	state = { hidden: false };

	componentWillReceiveProps(nextProps) {
		this.setState({ hidden: false });
	}

	clear() {
		const { resetError } = this.props;
		if (typeof resetError === 'function') {
			resetError();
		}
		this.setState({ hidden: true });

	}
	render() {
		const { hidden } = this.state;
		const { msg } = this.props;

		if (!msg) {
			return null;
		}

		return (
			<div className={`uk-alert-danger ${hidden ? 'uk-hidden' : ''}`} data-uk-alert>
				<button className="uk-alert-close" onClick={this.clear.bind(this)} data-uk-close></button>
				<p className="uk-margin-remove-top uk-text-small">{msg}</p>
			</div>
		);
	}
}

DangerAlert.propTypes = {
	msg: PropTypes.any,
	resetError: PropTypes.func
};

export default DangerAlert;

