import React from 'react';
import DataSetMasterContainer from 'containers/DataSetMasterContainer';
import Helper from 'helpers/format.helpers';
import moment from 'moment';

function removeTimeZone(dateString) {

	let birthDate = '';

	if (dateString.split('+').length > 1) {
		let date = dateString.split('+');

		birthDate = date[0];
	}
	return moment(birthDate).format('DD/MM/YYYY');

};

function BasicData({ data, addDataset, value, disabled, loading }) {

	const Result = data?.result;
	const scoreName = Result?.nameUniquenessScore;
	const birthDate = Result?.birthDate;

	return <>
		<DataSetMasterContainer dataSet={data} disabled={disabled} onClickUpdateData={() => addDataset(value)} loading={loading}>
			<div>
				<small>Nome: {Result?.name }</small><br />
				<small>Nacionalidade: {Result?.nationality }</small><br />
				<small>Falecido: {Result?.dead  ? "Sim" : "Não"}</small><br />
				<small>Idade: {Result?.age}</small><br />
				<small>Gênero: {Result?.gender === 'M' ? 'Masculino' : Result?.gender === 'F' ? 'Feminino' : Result?.gender}</small><br />
				<small>Documento: {Helper.formatDocumentNumber(Result?.taxIdNumber)}</small><br />
				<small>Score do nome: {scoreName ? scoreName * 100 + '%' : ""}</small><br />
				<small>Origem: {Result?.taxIdOrigin}</small><br />
				<small>Status: {Result?.taxIdStatus}</small><br />
				<small>Data de Nascimento: {birthDate ? removeTimeZone(birthDate) : "N/D"}</small><br />
				<small>Qtd. processos: {Result?.totalLawsuits ? Result?.totalLawsuits : "N/D"}</small><br />
			</div>
		</DataSetMasterContainer>
	</>;
}

export default BasicData;