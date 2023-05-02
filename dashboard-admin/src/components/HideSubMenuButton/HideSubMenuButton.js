import { ArrowDropUpIcon } from "../../assets";


function HideSubMenuButton({ handler, currentLabel }) {
	return (
		<div className="square">
			<ArrowDropUpIcon className="arrow-drop-up" />
		</div>
	);
}

export default HideSubMenuButton;
