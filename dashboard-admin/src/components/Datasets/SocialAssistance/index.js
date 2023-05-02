import React from 'react';
import DataSetMasterContainer from 'containers/DataSetMasterContainer';
import MaterialTable from 'material-table';
import { localizationOptions } from 'helpers/table.helpers';
import Helper from 'helpers/format.helpers';

function SocialAssistance({ data, addDataset, value, disabled, loading }) {
	const result = data?.result?.socialPrograms;

	return (
		<DataSetMasterContainer dataSet={data} disabled={disabled} onClickUpdateData={() => addDataset(value)} loading={loading}>
			<MaterialTable
				title=""
				columns={[
					{ title: 'Programa', field: 'programName' },
					{ title: 'Local', render: ({ programCountry, programState }) => programCountry + ' ' + programState },
					{ title: 'Início', render: ({ assistanceStartDate }) => assistanceStartDate && new Date(assistanceStartDate).toLocaleDateString('pt-BR') },
					{ title: 'Fim', render: ({ assistanceEndDate }) => assistanceEndDate && new Date(assistanceEndDate).toLocaleDateString('pt-BR') },
					{ title: 'Valor recebido', render: ({ assistanceAmount }) => Helper.formatCurrency((assistanceAmount || 0) * 100) },
					{ title: 'Parcelas', field: 'totalInstallments' }

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


export default SocialAssistance;