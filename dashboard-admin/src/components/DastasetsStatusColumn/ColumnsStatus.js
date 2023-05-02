import React, { useState, useEffect } from 'react';
import DoneIcon from '@material-ui/icons/Done';
import BlockIcon from '@material-ui/icons/Block';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import * as datasetService from '../../services/dataset';
import TableMotorCredit from '../Datasets/TableMotorCredit';
import { ModalWithLoading, Toast } from 'components';
import PlaylistPlayIcon from '@material-ui/icons/PlaylistPlay';

export default function ColumnsStatusComponents(props) {

	const { endpoint, row, datasetName } = props;
	const [state, setState] = useState(null);
	const [openModalState, setOpenModalState] = useState(null);
	const [datasetMotorAnalysis, setDatasetMotorAnalysis] = useState(null);

	useEffect(() => {

		if (!row?.id) return;
		datasetService.getDataSetReport(endpoint, row?.id, datasetName).then(response => {
			setState(response?.data);
		});
	}, [row]);

	const handleMotorAnalysis = () => {
		setState(null);
		Toast.showSuccessMessage("Solicitação de Dataset enviado com sucesso");
		datasetService.fetchDataSetReport(endpoint, row.id, datasetName)
			.then(response => {
				if (response?.data[0]?.status === 'OK') {
					setState(response?.data); Toast.showSuccessMessage("Dataset gerado");
				} else setState([]);
			}).catch(() => setState([]));
	};

	const handleAnalysis = () => {
		datasetService.getDataSetReport(endpoint, row.id, datasetName).then(response => {
			if (response?.data[0]?.result) {
				setDatasetMotorAnalysis(response?.data[0]);
				setOpenModalState(true);
				setState(response.data);
			}
		});
	};

	const handleCloseModalMotorCredit = () => {
		setOpenModalState(false);
	};

	const overview = state?.length && state[0].result?.overview || {};

	const ModalComponent = () => {
		return (
			<>
				{openModalState &&
					<ModalWithLoading title='Relatório de Análise' onCloseModal={handleCloseModalMotorCredit}>
						<TableMotorCredit rows={datasetMotorAnalysis} />
					</ModalWithLoading>
				}
			</>
		);
	};

	return (
		<>
			<ModalComponent />
			<>
				{state == null && <div className="spinner" style={{ fontSize: 14, minWidth: 100, display: 'inline-block', textAlign: 'center' }}><i className="fa fa-spinner" color="#FFF" size={10} /></div>}
				{state?.length == 0 && <PlaylistPlayIcon style={{ color: 'blue', cursor: 'pointer', minWidth: 100, display: 'inline-block', textAlign: 'center' }} onClick={() => handleMotorAnalysis()} />}
				{overview.alerta == false && overview.bloqueio == false && <DoneIcon onClick={() => handleAnalysis()} style={{ color: 'green', cursor: 'pointer', minWidth: 100, display: 'inline-block', textAlign: 'center' }} />}
				{overview.alerta == true && overview.bloqueio == false && <PriorityHighIcon onClick={() => handleAnalysis()} style={{ cursor: 'pointer', minWidth: 100, display: 'inline-block', textAlign: 'center' }} />}
				{overview.bloqueio == true && <BlockIcon onClick={() => handleAnalysis()} style={{ color: 'red', cursor: 'pointer', minWidth: 100, display: 'inline-block', textAlign: 'center' }} />}
			</>
		</>
	);
};