import { makeStyles } from "@material-ui/core";

export const useHelperTextStyles = makeStyles(() => ({
	root: {
		color: 'red'
	},
}));

export const useStyles = makeStyles((theme) => ({
	selectRoot: {
		"&:focus": {
			backgroundColor: "white"
		}
	},
}));