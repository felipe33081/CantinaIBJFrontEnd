import React from 'react';
import DataSetMasterContainer from 'containers/DataSetMasterContainer';
import MaterialTable from 'material-table';
import { localizationOptions } from 'helpers/table.helpers';


const fisrtColumn = (antecedente) => {

	return (
		<>
			<small><strong>Protocolo:</strong> {antecedente?.protocolNumber}</small><br />
		</>);
};

const secondColumn = (antecedente) => {

	return (
		<>
			<small><strong>CPF:</strong> {antecedente?.idNumber}</small><br />
			<small><strong>Status:</strong> {antecedente?.status}</small><br />
			<small><strong>Número:</strong> {antecedente?.certificateNumber}</small><br />
			<small><strong>Cetificado:</strong> {antecedente?.certificateText}</small><br />
			<small><strong>Emissão:</strong> {antecedente?.emissionDate}</small><br />
			<small><strong>Valido até:</strong> {antecedente?.validUntil}</small><br />
			{/* <small><a href={antecedente?.rawData} target='_blank' rel="noopener noreferrer">Baixar Cetificado</a></small><br /> */}
		</>
	);

};

function OndemandPfAntecedente({ data, addDataset, value, disabled, loading }) {
	const result = data?.result?.certificates;

	return (
		<DataSetMasterContainer dataSet={data} disabled={disabled} onClickUpdateData={() => addDataset(value)} loading={loading}>
			<MaterialTable
				title=""
				columns={[
					{ title: '', render: (antecendente) => fisrtColumn(antecendente) },
					{ title: '', render: (antecendente) => secondColumn(antecendente) },
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

export default OndemandPfAntecedente;