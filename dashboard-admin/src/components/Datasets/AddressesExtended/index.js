import React from 'react';
import DataSetMasterContainer from 'containers/DataSetMasterContainer';
import MaterialTable from 'material-table';
import Helper from 'helpers/format.helpers';
import { localizationOptions } from 'helpers/table.helpers';
import { TablePagination } from '@material-ui/core';

const type = (address) => {
	switch (address.type) {
		case "WORK":
			return "Trabalho";
		case "HOME":
			return "Casa";
		case "OFFICIAL REGISTRATION":
			return "Registro oficial";
		default:
			return "-";
	}
};

function AddressesExtended({ data, addDataset, value, disabled, loading }) { 
	const [rowsPerPage, setRowsPerPage] = React.useState(localStorage.getItem('rowsPerPage') || 5);

	const address = data?.result?.addresses;

	const onRowsPerPageChange = (page) => {
		setRowsPerPage(page);
		localStorage.setItem('rowsPerPage', page);
	};

	return (
		<DataSetMasterContainer disabled={disabled} dataSet={data} onClickUpdateData={() => addDataset(value)} loading={loading}>
			<>
				<MaterialTable
					title=""
					columns={[
						{ title: 'Tipo', draggable: false, render: (address) => type(address) },
						{ title: 'Logradouro', draggable: false, render: ({ typology, addressMain }) => (`${typology} ${addressMain}`) },
						{ title: 'Número', field: 'number', draggable: false },
						{ title: 'Bairro', field: 'neighborhood', draggable: false },
						{ title: 'CEP', field: 'zipCode', draggable: false, render: ({ zipCode }) => Helper.formatCEP(zipCode) },
						{ title: 'Cidade', field: 'city', draggable: false },
						{ title: 'Estado', field: 'state', draggable: false }
					]}
					data={address}
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

export default AddressesExtended;