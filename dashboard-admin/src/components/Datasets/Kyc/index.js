import React from 'react';
import DataSetMasterContainer from 'containers/DataSetMasterContainer';
import MaterialTable from 'material-table';
import { localizationOptions } from 'helpers/table.helpers';
import { TablePagination } from '@material-ui/core';

function Kyc({ data, addDataset, value, disabled, loading }) {
	const [rowsPerPage, setRowsPerPage] = React.useState(localStorage.getItem('rowsPerPage') || 5);

	const onRowsPerPageChange = (page) => {
		setRowsPerPage(page);
		localStorage.setItem('rowsPerPage', page);
	};

	const Result = data?.result;
	const firstPEPOccurenceDate = Result?.firstPEPOccurenceDate && new Date(Result?.firstPEPOccurenceDate).toLocaleDateString('pt-BR');
	const lastPEPOccurenceDate = Result?.lastPEPOccurenceDate && new Date(Result?.lastPEPOccurenceDate).toLocaleDateString('pt-BR');
	const firstSanctionDate = Result?.firstSanctionDate && new Date(Result?.firstSanctionDate).toLocaleDateString('pt-BR');
	const lastSanctionDate = Result?.lastSanctionDate && new Date(Result?.lastSanctionDate).toLocaleDateString('pt-BR');

	return (
		<DataSetMasterContainer dataSet={data} disabled={disabled} onClickUpdateData={() => addDataset(value)} loading={loading}>
			<label className="uk-text-bolder">PEP</label><br />
			<small><strong>PEP:</strong> {Result?.isCurrentlyPEP ? "Sim" : "Não"}</small><br />
			<small><strong>Primeiro registro:</strong> {firstPEPOccurenceDate ? firstPEPOccurenceDate : "N/D"}</small><br />
			<small><strong>Último registro:</strong> {lastPEPOccurenceDate ? lastPEPOccurenceDate : "N/D"}</small><br />
			<MaterialTable
				title=""
				columns={[
					{ title: 'Nível', field: 'level' },
					{ title: 'Cargo', field: 'jobTitle' },
					{ title: 'Departamento', field: 'department' },
					{ title: 'Motivo', field: 'motive' },
					{ title: 'Fonte', field: 'source' },
					{ title: 'Início', render: ({ startDate }) => startDate && new Date(startDate).toLocaleDateString('pt-BR') },
					{ title: 'Fim', render: ({ endDate }) => endDate && new Date(endDate).toLocaleDateString('pt-BR') },
					{ title: 'Nome original', render: ({ details }) => details?.originalName },
					{ title: 'Nome de sanção', render: ({ details }) => details?.pepName },
				]}
				data={Result?.pepHistory || []}
				onChangeRowsPerPage={onRowsPerPageChange}
				onRowsPerPageChange={onRowsPerPageChange}
				localization={localizationOptions}
				components={{
					Pagination: props => (
						<TablePagination
							{...props}
							rowsPerPageOptions={[5, 10, 20, 50]}
						/>
					),
				}}
				options={{
					actionsColumnIndex: -1,
					pageSize: rowsPerPage,
					debounceInterval: 500,
				}}
			/>
			<br />
			<label className="uk-text-bolder">Sanções</label><br />
			<small><strong>Está sobre sanção:</strong> {Result?.isCurrentlySanctioned ? "Sim" : "Não"}</small><br />
			<small><strong>Primeiro registro:</strong> {firstSanctionDate ? firstSanctionDate : "N/D"}</small><br />
			<small><strong>Último registro:</strong> {lastSanctionDate ? lastSanctionDate : "N/D"}</small><br />
			<MaterialTable
				title=""
				columns={[
					{ title: 'Fonte', field: 'source' },
					{ title: 'Tipo', field: 'type' },
					{ title: 'Similaridade', field: 'matchRate' },
					{ title: 'Início', render: ({ startDate }) => startDate && new Date(startDate).toLocaleDateString('pt-BR') },
					{ title: 'Fim', render: ({ endDate }) => endDate && new Date(endDate).toLocaleDateString('pt-BR') },
					{ title: 'Nome original', render: ({ details }) => details?.originalName },
					{ title: 'Nome de sanção', render: ({ details }) => details?.sanctionName },
				]}
				data={Result?.sanctionsHistory || []}
				onChangeRowsPerPage={onRowsPerPageChange}
				onRowsPerPageChange={onRowsPerPageChange}
				localization={localizationOptions}
				components={{
					Pagination: props => (
						<TablePagination
							{...props}
							rowsPerPageOptions={[5, 10, 20, 50]}
						/>
					),
				}}
				options={{
					actionsColumnIndex: -1,
					pageSize: rowsPerPage,
					debounceInterval: 500,
				}}
			/>
		</DataSetMasterContainer>
	);
}

export default Kyc;