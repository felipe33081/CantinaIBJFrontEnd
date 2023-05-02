import DataSetMasterContainer from 'containers/DataSetMasterContainer';
import MaterialTable from 'material-table';
import Helper from 'helpers/format.helpers';
import { localizationOptions } from 'helpers/table.helpers';

function OccupationData({ data, addDataset, value, disabled, loading }) {
	const result = data?.result?.jobs;

	return (
		<DataSetMasterContainer dataSet={data} disabled={disabled} onClickUpdateData={() => addDataset(value)} loading={loading}>
			<MaterialTable
				title=""
				columns={[
					{ title: 'CNPJ', draggable: false, render: ({ companyIdNumber }) => Helper.formatDocumentNumber(companyIdNumber), cellStyle: { textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: 200 } },
					{ title: 'Empresa', field: 'companyName' },
					{ title: 'Cargo', field: 'level' },
					{ title: 'Status', render: ({ status }) => status == "ACTIVE" ? "Ativo" : "Inativo" },
					{ title: 'Início', render: ({ startDate }) => startDate && new Date(startDate).toLocaleDateString('pt-BR') },
					{ title: 'Fim', render: ({ endDate }) => endDate && new Date(endDate).toLocaleDateString('pt-BR') },
					{ title: 'Renda estimada', render: ({ income }) => Helper.formatCurrency(income) },
					{ title: 'Setor', field: 'sector' }
				]}
				data={result || []}
				localization={localizationOptions}
				options={{
					pageSize: result?.length < 5 ? (result?.length) : 5,
					pageSizeOptions: [1, 5, 10, 20]
				}}
			/>
		</DataSetMasterContainer>
	);
}

export default OccupationData;