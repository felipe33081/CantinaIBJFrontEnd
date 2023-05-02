import React, { FC } from "react";
import './centerView.css';

const CenterView = (Story: FC) => (
	<div className="container">
		<Story />
	</div>
);

export default CenterView;
