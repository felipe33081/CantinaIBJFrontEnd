import React, { useState } from 'react';
import DataSetMasterContainer from 'containers/DataSetMasterContainer';
import Helper from 'helpers/format.helpers';
import MaterialTable from 'material-table';
import { localizationOptions } from 'helpers/table.helpers';
import ModalWithLoading from 'components/ModalWithLoading-deprecated/ModalDeprecated';
import { TablePagination } from '@material-ui/core';

function OwnersLawsuits({ data, addDataset, value, disabled, loading }) {
	const [rowsPerPage, setRowsPerPage] = useState(localStorage.getItem('rowsPerPage') || 5);
	const [modal, setModal] = useState(false);

	const onRowsPerPageChange = (page) => {
		setRowsPerPage(page);
		localStorage.setItem('rowsPerPage', page);
	};

	const closeModal = () => {
		setModal(false);
	};

	const Result = data?.result;
	var asAuthor = Result?.totalLawsuitsAsAuthor;
	var asDef = Result?.totalLawsuitsAsDefendant;
	var asOther = Result?.totalLawsuitsAsOther;

	const firstColumn = () => {
		const process = modal;

		return (
			<div>
				<small><strong>Número:</strong> {process.number}</small><br />
				{/* Disponibilizar Tipo após o mesmo ser retornado via API */}
				{/* <small><strong>Tipo:</strong> {process.type}</small><br /> */}
				<small><strong>Valor:</strong> {Helper.formatCurrency(process.value * 100)}</small><br />
				<small><strong>Assunto:</strong> {process.mainSubject}</small><br />
				<small><strong>Tribunal:</strong> {process.courtName}</small><br />
				<small><strong>Instância:</strong> {process.courtLevel}</small><br />
				<small><strong>Distrito do tribunal:</strong> {process.courtDistrict}</small><br />
				<small><strong>Vara do tribunal:</strong> {process.judgingBody}</small><br />
				<small><strong>Status:</strong> {process.status}</small><br />
				<small><strong>Estado:</strong> {process.state}</small><br />
				<small><strong>Volumes:</strong> {process.numberOfVolumes}</small><br />
				<small><strong>Páginas:</strong> {process.numberOfPages}</small><br />
				<small><strong>Partes:</strong> {process.numberOfParties}</small><br />
				<small><strong>Movimentações:</strong> {process.numberOfUpdates}</small><br />
				<small><strong>Idade do processo em dias:</strong> {process.lawSuitAge}</small><br />
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
		return (
			<>
				{process.parties?.map((partie, index) => {
					const keysWithValues = partie ? Object.keys(partie).filter(key => !!partie[key]) : [];
					return (
						<div key={index}>
							<small><strong>Documento:</strong> {Helper.formatDocumentNumber(partie.doc)}</small><br />
							<small><strong>Nome:</strong> {partie.name}</small><br />
							<small><strong>Polaridade:</strong> {partie.polarity}</small><br />
							<small><strong>Tipo:</strong> {partie.type}</small><br />
							<div>
								{keysWithValues.map(key => (
									<span key={key}><small>{key} - {partie[key]}</small><br /></span>
								))}
							</div>
							<br />
						</div>);
				})}
			</>
		);
	};

	return (
		<DataSetMasterContainer dataSet={data} disabled={disabled} onClickUpdateData={() => addDataset(value)} loading={loading}>
			<>
				<small><strong>Total de processos como autor:</strong> {asAuthor}</small><br />
				<small><strong>Total de processos como réu:</strong> {asDef}</small><br />
				<small><strong>Total de processos como outros:</strong> {asOther}</small><br />
				<br />

				{/*Após realizar a soma do valor total via api, disponibilizar o mesmo na interface. *\}
				{/* <small><strong>Soma do valor total das causas:</strong> {Result?.lawsuits?.value}</small><br /> */}
				<br />
				<MaterialTable
					title=""
					columns={[
						{ title: 'Número', render: ({ number }) => number },
						//Disponibilizar Tipo após o mesmo ser retornado via API
						//{ title: 'Tipo', render: ({ type }) => type },
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
					data={Result?.lawsuits || []}
					localization={localizationOptions}
					onChangeRowsPerPage={onRowsPerPageChange}
					onRowsPerPageChange={onRowsPerPageChange}
					components={{
						Pagination: props => (
							<TablePagination
								{...props}
								rowsPerPageOptions={[1, 5, 10, 20]}
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
			<>{
				modal &&
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

export default OwnersLawsuits;