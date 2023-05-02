import React from 'react';
import DataSetMasterContainer from 'containers/DataSetMasterContainer';

function Passages({data, addDataset, value, disabled, loading}) {
	const passages = data?.result;
	
	return (
		<DataSetMasterContainer disabled={disabled} dataSet={data} onClickUpdateData={()=>addDataset(value)} loading={loading}>
			<small><strong>Total:</strong> {passages?.totalPassages}</small><br />
			<small><strong>Ruins:</strong> {passages?.badPassages}</small><br />
			<small><strong>Boas:</strong> {passages?.goodPassages}</small><br />
		</DataSetMasterContainer>
	);
}

export default Passages;