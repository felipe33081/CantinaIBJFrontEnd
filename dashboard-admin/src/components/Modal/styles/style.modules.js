import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	paper: {
		top: `50%`,
		left: `50%`,
		transform: `translate(-50%, -50%)`,
		position: "absolute",
		display: "flex",
		flexWrap: "wrap",
		height: "auto",
		maxWidth: "570px",
		maxHeight: '80vh', // Define a altura máxima do modal
        overflowY: 'auto', // Permite a rolagem vertical
		backgroundColor: "#F5F5F5",
		boxShadow: theme.shadows[6],
		padding: theme.spacing(5, 6, 3),
		borderRadius: "10px",
	},
	body: {
		maxWidth: "100%",
		margin: "0 auto",
		marginBottom: "10px",
	},
	header: {
		marginTop: "-25px",
		padding: theme.spacing(0, 1, 1),
		textAlign: 'center',
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
		textAlign: 'center',
		color: "#5F5F5F",
		fontFamily: 'sans-serif',
		fontSize: 15
	},
	modalverpedidos: {
		backgroundColor: "#367fa9",
		'&:hover': {
		backgroundColor: "#286090",
		},
		color: "white",
		marginTop: "10px",
		marginBottom: "10px"
	},
	buttonFecharModel: {
		backgroundColor: "#5F5F5F",
		color: "white",
		'&:hover': {
		backgroundColor: "#3f3f3f",
		},
	},
	ordersInClients: {
        borderBottom: '3px solid #e9ecef',
        display: 'block', // Faz com que o divisor ocupe a largura total disponível
        margin: '8px 0', // Adiciona algum espaço ao redor do divisor
    },
	productItem: {
		backgroundColor: "black",
		color: "black",
        paddingBottom: '2px', // Espaço para o divisor
        marginBottom: '8px', // Espaço abaixo do divisor
    },
}));

export default useStyles;
