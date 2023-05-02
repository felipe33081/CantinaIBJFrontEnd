import React from 'react';
import DataSetMasterContainer from 'containers/DataSetMasterContainer';
import MaterialTable from 'material-table';
import { localizationOptions } from 'helpers/table.helpers';

function PhonesExtended({ data, addDataset, value, disabled, loading }) {
	const result = data?.result?.phones;

	return (
		<DataSetMasterContainer dataSet={data} disabled={disabled} onClickUpdateData={() => addDataset(value)} loading={loading}>
			<>
				<MaterialTable
					title=""
					columns={[
						{ title: 'Número', field: 'number' },
						{ title: 'Cód. Área', field: 'areaCode' },
						{ title: 'Cód. País', field: 'countryCode' },
						{ title: 'Tipo', field: 'type' },
						{ title: 'Ativo', render: ({ isActive }) => isActive ? "Sim" : "Não" },
						{ title: 'Operadora', field: 'currentCarrier', render: ({ currentCarrier }) => currentCarrier ? currentCarrier : "N/D" },
						{ title: 'Última passagem', render: ({ globalLastPassageDate }) => globalLastPassageDate && new Date(globalLastPassageDate).toLocaleDateString('pt-BR') },
					]}
					data={result || []}
					options={{
						pageSize: result?.length < 5 ? (result?.length) : 5,
						pageSizeOptions: [1, 5, 10, 20]
					}}
					localization={localizationOptions}
				/>
			</>
		</DataSetMasterContainer>
	);
}

export default PhonesExtended;