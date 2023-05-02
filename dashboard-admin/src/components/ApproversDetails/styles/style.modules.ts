import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	body: {
		maxWidth: "100%",
		margin: "0 auto",
		marginBottom: "60px",
	},
	header: {
		marginTop: "-25px",
		padding: theme.spacing(0, 1, 1),
		textAlign: 'left',
		color: theme.palette.text.secondary,
		borderBottom: '3px solid #e9ecef',
		borderTopLeftRadius: '0.3rem',
		borderTopRightRadius: '0.3rem'
	},
	span: {
		fontWeight: 700,
		textAlign: 'center',
		fontSize: 20
	},
	typography: {
		textAlign: 'left',
		color: "#5F5F5F",
		fontFamily: 'sans-serif',
		fontSize: 16,
	},
	bold: {
		fontWeight: "bold",
	},
	approved: {
		color: "green",
		fontWeight: "bold",
	},
	reproved: {
		color: "red",
		fontWeight: "bold",
	}
}));

export default useStyles;
