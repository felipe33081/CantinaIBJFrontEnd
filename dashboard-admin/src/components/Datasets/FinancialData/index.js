import React from 'react';
import DataSetMasterContainer from 'containers/DataSetMasterContainer';
import MaterialTable from 'material-table';
import { localizationOptions } from 'helpers/table.helpers';

function FinancialData({ data, addDataset, value, disabled, loading }) {
	const Result = data?.result;

	return (
		<DataSetMasterContainer dataSet={data} disabled={disabled} onClickUpdateData={() => addDataset(value)} loading={loading}>
			<label className="uk-text-bolder">Patrimonio Total Estimado:</label> {Result?.totalAssets}<br />
			<br />
			<label className="uk-text-bolder">Renda estimada mensal</label><br />
			<small><strong>Atividade Empresarial: </strong>
				{Result?.companyOwnership ? Result?.companyOwnership : "N/D"}</small>
			<br />
			<small><strong>Minitério do Trabalho: </strong> {Result?.mte ? Result?.mte : "N/D"}</small><br />
			<small><strong>IBGE: </strong>{Result?.ibge ? Result?.ibge : "N/D"}</small><br />
			<small><strong>Externo: </strong>{Result?.externalProvider ? Result?.externalProvider : "N/D"}</small><br />
			<br />
			<MaterialTable
				title="Declaração de Imposto de Renda"
				columns={[
					{ title: 'Ano', field: 'year' },
					{ title: 'Status', field: 'status' },
					{ title: 'Banco', field: 'bank' },
					{ title: 'Agência', field: 'branch' },
					{ title: 'Lote', field: 'batch' },
					{ title: 'Premium', render: ({ isVipBranch }) => isVipBranch ? 'Sim' : 'Não' },
					{ title: 'Captura', render: ({ captureDate }) => captureDate && new Date(captureDate).toLocaleDateString('pt-BR') },
				]}
				data={Result?.taxes || []}
				localization={localizationOptions}
				options={{
					pageSize: Result?.taxes?.length < 5 ? (Result?.taxes?.length) : 5,
					pageSizeOptions: [1, 5, 10, 20]
				}}
			/>
		</DataSetMasterContainer>
	);
}

export default FinancialData;