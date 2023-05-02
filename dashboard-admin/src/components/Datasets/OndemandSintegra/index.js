import React from 'react';
import DataSetMasterContainer from 'containers/DataSetMasterContainer';

function OndemandSintegra({ data, addDataset, value, disabled, loading }) {
	const result = data?.result?.items[0];

	return (
		<DataSetMasterContainer dataSet={data} disabled={disabled} onClickUpdateData={() => addDataset(value)} loading={loading}>
			<small><strong>CNPJ:</strong> {result?.idNumber ? result?.idNumber : "N/D"}</small><br />
			<small><strong>Estado:</strong> {result?.State ? result?.state : "N/D"}</small><br />
			<small><strong>Razão social:</strong> {result?.officialName ? result?.officialName : "N/D"}</small><br />
			<small><strong>Nome fantasia:</strong> {result?.businessName ? result?.businessName : "N/D"}</small><br />
			<small><strong>Data de Fundação:</strong> {result?.foundingDate ? result?.foundingDate : "N/D"}</small><br />
			<small><strong>Inscrição Estadual:</strong> {result?.stateRegistration ? result?.stateRegistration : "N/D"}</small><br />
			<small><strong>Núcleo do endereço:</strong> {result && result["addressCore"] ? result["addressCore"] : "N/D"}</small><br />
			<small><strong>Número de porta do endereço:</strong> {result && result["number"] ? result["number"] : "N/D"}</small><br />
			<small><strong>Complemento do endereço:</strong> {result && result["complement"] ? result["complement"] : "N/D"}</small><br />
			<small><strong>Bairro do endereço:</strong> {result && result["neighborhood"] ? result["neighborhood"] : "N/D"}</small><br />
			<small><strong>Cidade:</strong> {result && result["city"] ? result["city"] : "N/D"}</small><br />
			<small><strong>Estado:</strong> {result && result["addressState"] ? result["addressState"] : "N/D"}</small><br />
			<small><strong>CEP:</strong> {result && result["zipCode"] ? result["zipCode"] : "N/D"}</small><br />
			<small><strong>Natureza Legal:</strong> {result?.legalnature ? result?.legalnature : "N/D"}</small><br />
			<small><strong>Status:</strong> {result?.status ? result?.status : "N/D"}</small><br />
			<small><strong>Situação fiscal:</strong> {result?.fiscaloccurrence ? result?.fiscaloccurrence : "N/D"}</small><br />
			<small><strong>Posto de fiscalização:</strong> {result?.fiscaloffice ? result?.fiscaloffice : "N/D"}</small><br />
			<small><strong>Regime de ICMS:</strong> {result?.icmsregime ? result?.icmsregime : "N/D"}</small><br />
			<small><strong>Atividade principal:</strong> {result?.maineconomicactivity ? result?.maineconomicactivity : "N/D"}</small><br />
			<small><strong>Data de registro para emissão de NFe:</strong> {result?.nferegistrationdt ? result?.nferegistrationdt : "N/D"}</small><br />
			<small><strong>Casos de obrigatoriedade de NFe:</strong> {result?.nfemandatoryindicator ? result?.nfemandatoryindicator : "N/D"}</small><br />
			<small><strong>Início da obrigatoriedade de NFe:</strong> {result?.nfemandatorystartdt ? result?.nfemandatorystartdt : "N/D"}</small><br />
		</DataSetMasterContainer>
	);
}

export default OndemandSintegra;