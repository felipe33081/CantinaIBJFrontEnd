import { Modal, Grid, Typography, Button } from '@material-ui/core';
import useStyles from './styles/style.modules';

const ModalCustomerComponent = ({ open, onClose, title, subtitle, children, onClick = () => { }, buttonText, disabled, enableButton = true }) => {
	const classes = useStyles();

	return (
		<Modal
			open={open}
			onClose={onClose}>
			<div className={classes.paper}>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<div className={classes.header}>
							<Typography variant="h4" style={{ color: "#5F5F5F", fontFamily: 'Arial', }}>{title}</Typography>
						</div>
					</Grid>
					<Grid item xs={12}>
						<div className={classes.body}>
							{children}
							<br />
							{enableButton &&
								<Grid  >
									<Grid item xs={8}>
										<Button
                							className={classes.buttonFecharModel}
											disabled={disabled}
											variant="contained"
											id='button-confirm'
											onClick={() => onClick()}
											children={buttonText}
										/>
									</Grid>
								</Grid>}
						</div>
					</Grid>
				</Grid>
			</div>
		</Modal >
	);
};

export default ModalCustomerComponent;