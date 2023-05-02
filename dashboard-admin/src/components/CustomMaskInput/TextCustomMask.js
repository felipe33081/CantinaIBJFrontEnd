import MaskedInput from "react-text-mask";

export default function TextCustomMask(props) {
	const { inputRef, mask, ...other } = props;	
	return (
		<MaskedInput
			{...other}
			ref={ref => {
				inputRef(ref ? ref.inputElement : null);
			}}
			mask={mask}
			placeholderChar={"\u2000"}
			guide
			keepCharPositions
		/>
	);
}
