import React from 'react';
import DataSetMasterContainer from 'containers/DataSetMasterContainer';
import Helper from 'helpers/format.helpers';

function Collections({data, addDataset, value, disabled, loading }) {

	const collection = data?.result;

	return (

		<DataSetMasterContainer dataSet={data} disabled={disabled} onClickUpdateData={()=>addDataset(value)} loading={loading}>
			<small><strong>Em cobrança:</strong> {collection?.isCurrentlyOnCollection ? "Sim" : "Não"}</small><br />
			<small><strong>Total:</strong> {collection?.collectionOccurrences}</small><br />
			<small><strong>Origens diferentes:</strong> {collection?.collectionOrigins}</small><br />
			<small><strong>Primeira cobrança:</strong> {collection?.firstCollectionDate && Helper.formatDate(collection?.firstCollectionDate)}</small><br />
			<small><strong>Última cobrança:</strong> {collection?.lastCollectionDate && Helper.formatDate(collection?.lastCollectionDate)}</small><br />
			<small><strong>Quantidade nos últimos 30 dias:</strong> {collection?.last30DaysCollectionOrigins}</small><br />
			<small><strong>Quantidade nos últimos 90 dias:</strong> {collection?.last90DaysCollectionOrigins}</small><br />
			<small><strong>Quantidade no último ano:</strong> {collection?.last365DaysCollectionOrigins}</small><br />     
		</DataSetMasterContainer>
	);
}

export default Collections;