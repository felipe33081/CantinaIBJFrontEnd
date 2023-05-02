import React from 'react';
import DataSetMasterContainer from 'containers/DataSetMasterContainer';
import MaterialTable from 'material-table';
import { localizationOptions } from 'helpers/table.helpers';
import { TablePagination } from '@material-ui/core';

function Relationships({ data, value, addDataset, disabled, loading }) {
	const [rowsPerPage, setRowsPerPage] = React.useState(localStorage.getItem('rowsPerPage') || 5);
	const result = data?.result?.items;

	const onRowsPerPageChange = (page) => {
		setRowsPerPage(page);
		localStorage.setItem('rowsPerPage', page);
	};
	
	return (
		<DataSetMasterContainer dataSet={data} disabled={disabled} onClickUpdateData={() => addDataset(value)} loading={loading}>
			<MaterialTable
				title=""
				columns={[
					{ title: 'Documento', field: 'relatedEntityTaxIdNumber' },
					{ title: 'Nome', field: 'relatedEntityName' },
					{ title: 'Tipo', field: 'relationshipType', draggable: false },
					{ title: 'Relação', field: 'relationshipName', draggable: false },
					{ title: 'Nível', field: 'relationshipLevel', draggable: false },
					{ title: 'Início', draggable: false, render: ({ relationshipStartDate }) => relationshipStartDate && new Date(relationshipStartDate).toLocaleDateString('pt-BR') },
					{ title: 'Fim', render: ({ relationshipEndDate }) => relationshipEndDate && new Date(relationshipEndDate).toLocaleDateString('pt-BR') },
				]}
				data={result || []}
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

export default Relationships;