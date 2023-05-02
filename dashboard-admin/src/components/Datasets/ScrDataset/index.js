import React, {useState, useEffect} from 'react';
import Scr from 'components/Datasets/Scr';
import Accordions from 'components/Accordion/Accordion';
import * as datasetService from '../../../services/dataset';
import {
	Toast
} from 'components';

const ScrDataset = ({loading, setLoading, idPerson, typePerson}) => {
	const [ datasets, setDatasets ] = useState();

	const getDatasetsByUserId = () =>{
		setLoading(true);
		  datasetService.getDatasetsByUserId(typePerson, idPerson).then(response=>{
			setDatasets(response?.data);
			setLoading(false);
		}).catch(err=>{
			console.log('err', err);
			setLoading(false);
		});
	};
    
	const generateDataset = (reportName) => {
		Toast.showInfoMessage("Dataset foi solicitado");
		datasetService.fetchDataSetReport(typePerson, idPerson, reportName ).then(response => {
			if (response?.data[0]?.status === 'OK') {
				getDatasetsByUserId();
				setLoading(false);
				Toast.showSuccessMessage("Dataset gerado");
			}
			else {
				setLoading(false);
				Toast.showErrorMessage("Não foi possível obter os dados");
			}
		});
	};
    

	useEffect(() => {
		getDatasetsByUserId();
	},[]);

	const findProperDataset = (datasetName) => datasets?.find(dataset=> dataset.dataSet==datasetName);
	
	const accordionData = [
		{
			name: 'Banco Central - SCR',
			key:'bcb_scr',
			value:'bcb_scr',
			children: <Scr data={findProperDataset("scr_bcb")} value='SCR' addDataset={() => generateDataset("ScrBcb")} disabled={loading} loading={loading} />,
		}
	];

	return (
		<Accordions accordions={accordionData}/>
	);

};

export default ScrDataset;