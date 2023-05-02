import DataSetMasterContainer from 'containers/DataSetMasterContainer';
import Helper from 'helpers/format.helpers';


function OnlinePresence({data, addDataset, value, disabled, loading }) {
	const presence = data?.result;
	
	return (
		<DataSetMasterContainer dataSet={data} disbaled={disabled} onClickUpdateData={()=>addDataset(value)} loading={loading}>
    	<small>*Score vai de "A" (maior relevância ou importância) até "H" (menor relevância ou importância).</small><br />
			<small><strong>Utilização:</strong> {presence?.internetUsageLevelV3}</small><br />
			<small><strong>Vendas:</strong> {presence?.esellerV3}</small><br />
			<small><strong>Compras:</strong> {presence?.eshopperV3}</small><br />
			<small><strong>Última captura:</strong> {presence?.lastWebPassageDate && Helper.formatDate(presence?.lastWebPassageDate)}</small><br />
			<small><strong>Total de passagens:</strong> {presence?.totalWebPassages}</small><br />
		</DataSetMasterContainer>
	);}

export default OnlinePresence;