import React from 'react';
import DataSetMasterContainer from 'containers/DataSetMasterContainer';
import { Table } from 'assets/style';

function EmailAge({ data, addDataset, value, disabled, loading }) {

	const emailVerification = data?.result;

	const generateConfidenceMatrix = (item) => {
		const matrix = [['Email', item?.emailToFullNameConfidence, item?.emailToLastNameConfidence, item?.emailToPhoneConfidence, item?.emailToBillAddressConfidence, item?.emailToShipAddressConfidence, item?.emailToIpConfidence],
			['IP', item?.ipToFullNameConfidence, item?.ipToLastNameConfidence, item?.ipToPhoneConfidence, item?.ipToBillAddressConfidence, item?.ipToShipAddressConfidence],
			['Endereço de envio', item?.shipAddressToFullNameConfidence, item?.shipAddressToLastNameConfidence, item?.phoneToShipAddressConfidence, item?.shipAddressToBillAddressConfidence],
			['Endereço da conta', item?.billAddressToFullNameConfidence, item?.billAddressToLastNameConfidence, item?.phoneToBillAddressConfidence],
			['Telefone', item?.phoneToFullNameConfidence, item?.phoneToLastNameConfidence]
		];

		return (
			<Table>
				<thead>
					<td></td>
					<td>Nome</td>
					<td>Sobrenome</td>
					<td>Telefone</td>
					<td>Endereço da conta</td>
					<td>Endereço de envio</td>
					<td>IP</td>
				</thead>
				<tbody>
					{matrix.map((row, i) =>
						<tr>
							{row.map((item, j) => {
								return (<td>{item}</td>);
							})}
						</tr>
					)}
				</tbody>

			</Table>
		);
	};

	return (
		<DataSetMasterContainer dataSet={data} disabled={disabled} onClickUpdateData={() => addDataset(value)} loading={loading}>

			{generateConfidenceMatrix(emailVerification)}
			<div className="uk-margin" >
				<label className="uk-form-label">Consulta de e-mail</label>
				<br />
				<small>Score: {emailVerification?.eaScore}</small><br />
				<small>Nível: {emailVerification?.fraudRisk}</small><br />
				<small>Descritivo: {emailVerification?.eaAdvice}</small><br />
				<small>Razão: {emailVerification?.eaReason}</small><br />
				<small>Faixa: {emailVerification?.eaRiskBand}</small><br />
				<small>Existe: {emailVerification?.emailExists}</small><br />
				{emailVerification?.sourceIndustry && <span><small>Indústria: {emailVerification?.sourceIndustry}</small><br /></span>}
				{emailVerification?.fraudType && <span><small>Tipo de fraude: {emailVerification?.fraudType}</small><br /></span>}

			</div>
		</DataSetMasterContainer>
	);
}

export default EmailAge;