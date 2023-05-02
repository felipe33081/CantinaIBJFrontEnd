import React, { useState } from 'react';
import DataSetMasterContainer from 'containers/DataSetMasterContainer';
import Helper from 'helpers/format.helpers';
import MaterialTable from 'material-table';
import { localizationOptions } from 'helpers/table.helpers';
import { TablePagination } from '@material-ui/core';
import ModalWithLoading from 'components/ModalWithLoading-deprecated/ModalDeprecated';

const formatDate = (date) => {
	switch (date) {
		case "0001-01-01T00:00:00":
		case null:
		case undefined:
		case "":
			return "N/D";
		default:
			return new Date(date).toLocaleDateString('pt-BR');
	}
};


function Processes({ data, addDataset, value, disabled, loading }) {

	const [rowsPerPage, setRowsPerPage] = useState(localStorage.getItem('rowsPerPage') || 5);
	const [modal, setModal] = useState(false);

	const onRowsPerPageChange = (page) => {
		setRowsPerPage(page);
		localStorage.setItem('rowsPerPage', page);
	};

	const closeModal = () => {
		setModal(false);
	};

	const Result = data?.result?.processes;
	var passiveLawsuits = Result?.lawsuits?.filter(p => p.parties?.filter(p => p.doc == data.doc && p.polarity == "PASSIVE").length > 0);
	var notPassiveLawsuits = Result?.lawsuits?.filter(p => p.parties?.filter(p => p.doc == data.doc && p.polarity != "PASSIVE").length > 0);

	const firstColumn = () => {
		const process = modal;
		return (
			<div>
				<small><strong>Número:</strong> {process.number}</small><br />
				<small><strong>Tipo:</strong> {process.type}</small><br />
				<small><strong>Valor:</strong> {Helper.formatCurrency(process.value * 100)}</small><br />
				<small><strong>Assunto:</strong> {process.mainSubject}</small><br />
				<small><strong>Tribunal:</strong> {process.courtName}</small><br />
				<small><strong>Instância:</strong> {process.courtLevel}</small><br />
				<small><strong>Distrito do tribunal:</strong> {process.courtDistrict ? process.courtDistrict : 'N/D'}</small><br />
				<small><strong>Vara do tribunal:</strong> {process.judgingBody ? process.judgingBody : 'N/D'}</small><br />
				<small><strong>Status:</strong> {process?.status}</small><br />
				<small><strong>Estado:</strong> {process?.state}</small><br />
				<small><strong>Volumes:</strong> {process?.numberOfVolumes}</small><br />
				<small><strong>Páginas:</strong> {process?.numberOfPages}</small><br />
				<small><strong>Partes:</strong> {process?.numberOfParties}</small><br />
				<small><strong>Movimentações:</strong> {process?.numberOfUpdates}</small><br />
				<small><strong>Idade do processo em dias:</strong> {process?.lawSuitAge}</small><br />
				<small><strong>Valor total da causa extraído do processo:</strong> {process.value}</small><br />
				<small><strong>Data de publicação:</strong> {process.publicationDate && new Date(process.publicationDate).toLocaleDateString('pt-BR')}</small><br />
				<small><strong>Data de notificação das partes do processo:</strong> {process.noticeDate && new Date(process.noticeDate).toLocaleDateString('pt-BR')}</small><br />
				<small><strong>Data da úlitma movimentação:</strong> {process.lastMovementDate && new Date(process.lastMovementDate).toLocaleDateString('pt-BR')}</small><br />
				<small><strong>Data da captura inicial do processo:</strong> {process.captureDate && new Date(process.captureDate).toLocaleDateString('pt-BR')}</small><br />
				<small><strong>Data da última atualização dos dados:</strong> {process.lastUpdate && new Date(process.lastUpdate).toLocaleDateString('pt-BR')}</small><br />
			</div>
		);
	};

	const parties = () => {
		const process = modal;
		return (<>
			{process.parties?.map((partie, index) => {
				const keysWithValues = partie.partyDetails ? Object.keys(partie.partyDetails).filter(key => !!partie.partyDetails[key]) : [];
				return (
					<div key={index}>
						<small><strong>Documento:</strong> {Helper.formatDocumentNumber(partie.doc)}</small><br />
						<small><strong>Nome:</strong> {partie.name}</small><br />
						<small><strong>Polaridade:</strong> {partie.polarity}</small><br />
						<small><strong>Tipo:</strong> {partie.type}</small><br />
						<small><strong>Detalhes:</strong> </small>
						<div>
							{keysWithValues.map(key => (
								<span key={key}><small>{key} - {partie.partyDetails[key]}</small><br /></span>
							))}
						</div>
						<br />
						<br />
					</div>);
			})}
		</>);
	};

	const sumReducer = (partialSum, a) => partialSum + a;

	return (
		<DataSetMasterContainer dataSet={data} disabled={disabled} onClickUpdateData={() => addDataset(value)} loading={loading}>
			<>
				<small><strong>Total de processos:</strong> {data?.result?.totalLawsuits}</small><br />
				<small><strong>Total de processos como autor:</strong> {data?.result?.totalLawsuitsAsAuthor}</small><br />
				<small><strong>Total de processos como réu:</strong> {data?.result?.totalLawsuitsAsDefendant}</small><br />
				<small><strong>Data da primeira ocorrência de processo em que a pessoa está envolvida:</strong> {formatDate(data?.result?.firstLawsuitDate)}</small><br />
				<small><strong>Data da última ocorrência de processo em que a pessoa está envolvida:</strong> {formatDate(data?.result?.lastLawsuitDate)}</small><br />
				<br />
				<small><strong>Soma do valor total das causas:</strong> {data?.result?.sumTotalProcessesValue ? Helper.formatCurrency(data?.result?.sumTotalProcessesValue) : 'N/D'}</small><br />
				<small><strong>Soma do valor das casusas como parte passiva:</strong> {Helper.formatCurrency(passiveLawsuits?.map(c => c.Value)?.filter(c => c > 0).reduce(sumReducer, 0) * 100)}</small><br />
				<small><strong>Soma do valor das casusas como outras partes:</strong> {Helper.formatCurrency(notPassiveLawsuits?.map(c => c.Value)?.filter(c => c > 0).reduce(sumReducer, 0) * 100)}</small><br />
				<br />
				<MaterialTable
					title=""
					columns={[
						{ title: 'Número', render: ({ number }) => number },
						{ title: 'Tipo', render: ({ type }) => type },
						{ title: 'Assunto', render: ({ mainSubject }) => mainSubject },
						{ title: 'Tribunal', render: ({ courtName }) => courtName },
						{ title: 'Status', render: ({ status }) => status },

					].filter(x => x !== undefined)}
					actions={[
						{
							icon: 'search',
							tooltip: 'Ver ações',
							position: 'row',
							onClick: (_, rowData) => setModal(rowData)
						},
					]}
					data={Result || []}
					localization={localizationOptions}
					onChangeRowsPerPage={onRowsPerPageChange}
					onRowsPerPageChange={onRowsPerPageChange}
					components={{
						Pagination: props => (
							<TablePagination
								{...props}
								rowsPerPageOptions={[5, 10, 20]}
							/>
						),
					}}
					options={{
						actionsColumnIndex: -1,
						pageSize: rowsPerPage,
						debounceInterval: 500,
					}}
				/>
			</>
			<>{modal &&
				<ModalWithLoading
					title='Informações detalhada'
					onCloseModal={closeModal}>
					<div id='scrollbar'>
						<div>{firstColumn()}</div>
						<hr style={{ borderTop: '3px solid #e5e5e5' }} /><br />
						<div>{parties()}</div>
					</div>
				</ModalWithLoading>
			} </>
		</DataSetMasterContainer>
	);
}

export default Processes;