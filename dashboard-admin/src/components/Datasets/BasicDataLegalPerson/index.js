import React from 'react';
import DataSetMasterContainer from 'containers/DataSetMasterContainer';

function BasicData({ data, addDataset, value, disabled, loading }) {
	const Result = data?.result;
	
	return <>
		<DataSetMasterContainer dataSet={data} disabled={disabled} onClickUpdateData={() => addDataset(value)} loading={loading}>
			<div>
				<small>Idade: {Result?.age}</small><br />
				<small>Fundação:{new Date(Result?.foundedDate).toLocaleDateString('pt-BR')}</small><br />
				<small>Razão social: {Result?.officialName}</small><br />
				<small>Match da razão social(%): {Result?.officialNameInputNameMatchPercentage}</small><br />
				<small>Score da razão social: {Result?.officialNameUniquenessScore}</small><br />
				<small>Nome fantasia: {Result?.tradeName}</small><br />
				<small>Match do nome fantasia(%): {Result?.tradeNameInputNameMatchPercentage}</small><br />
				<small>Score do nome fantasia: {Result?.tradeNameUniquenessScore}</small><br />
				<small>Origem: {Result?.taxIdOrigin}</small><br />
				<small>Status: {Result?.taxIdStatus}</small><br />
				<small>Data do status:{new Date(Result?.taxIdStatusDate).toLocaleDateString('pt-BR')}</small><br />
				<small>Regime: {Result?.taxRegime}</small><br />
				<small>Qtd. processos: {Result?.totalLawsuits ? Result?.totalLawsuits : "N/D"}</small><br />
			</div>
		</DataSetMasterContainer>
	</>;
}

export default BasicData;