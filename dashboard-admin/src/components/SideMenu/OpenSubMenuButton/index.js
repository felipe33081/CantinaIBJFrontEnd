import { Button } from "@material-ui/core";
import { ArrowDropDownIcon } from "../../../assets";


function OpenSubMenuButton({ handler, currentLabel }) {
	return (
		<div className="square">
			<ArrowDropDownIcon className="arrow-drop-down" />
		</div>
	);
}

export default OpenSubMenuButton;
