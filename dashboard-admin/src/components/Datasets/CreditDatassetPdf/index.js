import React, { useEffect, useState } from 'react';
import * as datasetService from '../../../services/dataset';
import { Toast } from 'components';
import Accordions from 'components/Accordion/Accordion';
import DataSetMasterContainer from 'containers/DataSetMasterContainer';
import { Box, Button, Grid, makeStyles } from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles({
	button: {
		backgroundColor: '#3f51b5',
		'&:hover': {
			color: 'white',
		}
	},
});

const CreditDatassetPdf = ({ legalPersonId, setLoading }) => {
	const classes = useStyles();
	const [dasasetReportPdf, setDatasetReportPdf] = useState(null);
	const [intervalPdfId, setIntervalPdfId] = useState(null);

	useEffect(() => {
		if (dasasetReportPdf?.result == 'Em Execução') {
			const intervalCreditPdf = setInterval(() => {
				getCreditPdf();
			}, 3000);
			setIntervalPdfId(intervalCreditPdf);
		}
		return () => { clearInterval(intervalPdfId); };
	}, [dasasetReportPdf]);

	useEffect(() => {
		getCreditPdf();
		return () => { clearInterval(intervalPdfId); };
	}, []);

	useEffect(() => {
		if (dasasetReportPdf) {
			clearInterval(intervalPdfId);
			setLoading(false);
		}
	}, [dasasetReportPdf]);

	const getCreditPdf = () => {
		datasetService.getDataSetReport('LegalPerson', legalPersonId, 'pdfreport').then(response => {
			if (response?.data.length > 0) {
				return setDatasetReportPdf(response?.data[0]);
			};
			return false;
		});
	};

	async function generateDatasetReportPdf() {
		Toast.showInfoMessage("Relatório de Crédito foi solicitado");
		await datasetService.fetchDataSetReport('LegalPerson', legalPersonId, 'pdfreport').then(response => {
			Toast.showSuccessMessage("Relatório de Crédito gerado");
			if (response?.data?.status.toLowerCase() !== 'erro') {
				const intervalCreditPdf = setInterval(() => {
					getCreditPdf();
				}, 3000);
				setIntervalPdfId(intervalCreditPdf);
			}
		}).catch(err => console.log("Error:", err));
	};

	var currentData = moment();
	var updateData = moment(dasasetReportPdf?.updatedAt);
	var diffDays = currentData.diff(updateData, 'days');

	const legalAccordionData = [
		{
			name: 'Relatório de Crédito',
			value: 'rel_cred',
			key: 'rel_cred',
			children:
				<DataSetMasterContainer onClickUpdateData={() => generateDatasetReportPdf()} dataSet={dasasetReportPdf} children={
					<Box p={3}>
						<Grid container spacing={1}>
							<Grid item xs={3}>
								{dasasetReportPdf?.result == 'Em Execução' ? <div className="spinner" style={{ fontSize: 15, minWidth: 100, display: 'inline-block', textAlign: 'center' }}>
									<Button disabled>
										<i className="fa fa-spinner" color="#FFF" size={15} />&nbsp;Em Execução</Button></div>
									: <Button className={classes.button} target="_blank" href={dasasetReportPdf?.result} color="primary" variant="contained" fullWidth>Ver relatório</Button>
								}
							</Grid>
						</Grid>
					</Box>
				} disabled={diffDays > 2 ? false : true} />
		}
	];

	return (
		<Accordions accordions={legalAccordionData} />
	);
};

export default CreditDatassetPdf;