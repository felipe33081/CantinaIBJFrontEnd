import React from 'react';
import DataSetMasterContainer from 'containers/DataSetMasterContainer';
import { localizationOptions } from 'helpers/table.helpers';
import MaterialTable from 'material-table';
import { TablePagination } from '@material-ui/core';
import Helper from 'helpers/format.helpers';

function OnDemandQueryPesquisaProtesto({ data, addDataset, value, disabled, loading }) {
	const [rowsPerPage, setRowsPerPage] = React.useState(localStorage.getItem('rowsPerPage') || 5);

	const onRowsPerPageChange = (page) => {
		setRowsPerPage(page);
		localStorage.setItem('rowsPerPage', page);
	};
	const protest = data?.result;

	return (
		<DataSetMasterContainer disabled={disabled} dataSet={data} onClickUpdateData={() => addDataset(value)} loading={loading}>
			<>
				<small><strong>Origem:</strong> {protest?.origin ? protest?.origin : "N/D"}</small><br />
				<small><strong>Status:</strong> {protest?.baseStatus ? protest?.baseStatus : "N/D"}</small><br />
				<small><strong>Total de protestos:</strong> {protest?.totalProtests ? protest?.totalProtests : "N/D"}</small><br />
				<small><strong>Soma total de protestos:</strong> {protest?.totalProtestsValue ? Helper.formatCurrencyAsIs(data?.result?.totalProtestsValue) : "N/D"}</small><br />
				<MaterialTable
					title=""
					columns={[
						{ title: 'Estado', field: 'state' },
						{ title: 'Total de Protestos', field: 'totalProtests' },
						{ title: 'Data primeiro protesto', field: 'totalProtests', render: ({ firstProtestDate }) => firstProtestDate && new Date(firstProtestDate).toLocaleDateString('pt-BR') },
						{ title: 'Data último protesto', field: 'totalProtests', render: ({ lastProtestDate }) => lastProtestDate && new Date(lastProtestDate).toLocaleDateString('pt-BR') },
					]}
					data={protest?.protestItems}
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
			</>
		</DataSetMasterContainer>

	);
}

export default OnDemandQueryPesquisaProtesto;