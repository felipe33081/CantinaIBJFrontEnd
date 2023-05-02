import React from 'react';
import DataSetMasterContainer from 'containers/DataSetMasterContainer';
import MaterialTable from 'material-table';
import { localizationOptions } from 'helpers/table.helpers';
import Helper from 'helpers/format.helpers';

function ProfessionData({ data, addDataset, value, disabled, loading }) {
	const result = data?.result?.jobs;

	return (
		<DataSetMasterContainer dataSet={data} disabled={disabled} onClickUpdateData={() => addDataset(value)} loading={loading}>
			<MaterialTable
				title=""
				columns={[
					{ title: 'Setor', field: 'sector' },
					{ title: 'CNPJ', draggable: false, render: ({ companyIdNumber }) => Helper.formatDocumentNumber(companyIdNumber) },
					{ title: 'Companhia', field: 'companyName' },
					{ title: 'Área', field: 'area' },
					{ title: 'Cargo', field: 'level' },
					{ title: 'Status', render: ({ status }) => status == "ACTIVE" ? "Ativo" : "Inativo" },
					{ title: 'Renda', render: ({ income }) => Helper.formatCurrency(income) },
					{ title: 'Início', render: ({ startDate }) => startDate && new Date(startDate).toLocaleDateString('pt-BR') },
					{ title: 'Fim', render: ({ endDate }) => endDate && new Date(endDate).toLocaleDateString('pt-BR') },
				]}
				data={result || []}
				localization={localizationOptions}
				options={{
					pageSize: (result?.length < 5) ? (result?.length) : 5,
					pageSizeOptions: [1, 5, 10, 20]
				}}
			/>
		</DataSetMasterContainer>
	);
}

export default ProfessionData;