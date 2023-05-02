import { Modal, Grid, Typography } from '@material-ui/core';
import moment from 'moment';
import 'moment/locale/pt-br';
import useStyles from './styles/style.modules';
import { ApproversDetailsProps } from './types';
import Helpers from 'helpers/format.helpers';

const ApproversDetails = ({ data }: ApproversDetailsProps) => {
	const classes = useStyles();

	return (
		<Grid container spacing={8}>
			<Grid item xs={10}>
				<div className={classes.body}>
					{data.errorMessage && <p>Ocorreu um erro no processamento desta operação. {data.errorMessage}</p>}
					{data.approvals.length === 0 && <Typography>Nenhuma aprovação encontrada.</Typography>}
					{data.approvals.length > 0 && data.approvals.map(a => {
						return (
							<Grid container spacing={6}>
								<Grid item xs={12}>
									<Typography className={`${classes.typography}`}>
										{a.actionDisplay === "Aprovar" ? (<span className={classes.approved}>Aprovado</span>)
											: (<span className={classes.approved}>Reprovado</span>)}{" "}
										por <span className={classes.bold}>{a.user.userIdDisplay}</span>{" "}
										no dia <span className={classes.bold}>{Helpers.formatServerDateToString(a.createdAt)}</span>
									</Typography>
								</Grid>
							</Grid>);
					})}
				</div>
			</Grid>
		</Grid>
	);
};

export default ApproversDetails;