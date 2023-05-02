import React from 'react';
import DataSetMasterContainer from 'containers/DataSetMasterContainer';
import MaterialTable from 'material-table';
import { localizationOptions } from 'helpers/table.helpers';
import { TablePagination } from '@material-ui/core';

const details = (certificate) => {
	var keysWithValues = certificate?.AdditionalOutputData ? Object.keys(certificate?.AdditionalOutputData).filter(key => !!certificate?.AdditionalOutputData[key] && key.includes("Remark")) : [];

	const result = certificate;
	const emissionDate = result?.emissionDate && new Date(result?.emissionDate).toLocaleDateString('pt-BR');
	const validityDate = result?.validityDate && new Date(result?.validityDate).toLocaleDateString('pt-BR');
	return (
		<>
			<small><strong>Há pendências com a Procuradoria-Geral da Fazenda Nacional(PGFN):</strong> {certificate?.pgfnClearance ? "Não" : "Sim"}</small><br />
			<small><strong>Tipo de consulta:</strong> {result?.queryType ? result?.queryType : "N/D"}</small><br />
			<small><strong>Identificação do pagador de impostos:</strong> {result?.taxPayer ? result?.taxPayer : "N/D"}</small><br />
			<small><strong>Data de emissão:</strong> {emissionDate ? emissionDate : "N/D"}</small><br />
			<small><strong>Data de validade:</strong>{validityDate ? validityDate : "N/D"}</small><br />
			{keysWithValues.map(key => (
				<div className='uk-width-1-1' key={key}>
					<small key={key}><strong>{key}:</strong> {result[key]}</small>
				</div>
			))}
		</>
	);
};

function OnDemandPgfn({ data, addDataset, value, disabled, loading }) {
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
					{ title: 'Origem', field: 'origin' },
					{ title: 'Status', field: 'baseStatus' },
					{ title: '', render: (certificate) => details(certificate) },
				]}
				data={result}
				onChangeRowsPerPage={onRowsPerPageChange}
				onRowsPerPageChange={onRowsPerPageChange}
				localization={localizationOptions}
				components={{
					Pagination: props => (
						<TablePagination
							{...props}
							rowsPerPageOptions={[1, 5, 10, 20, 50]}
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

export default OnDemandPgfn;