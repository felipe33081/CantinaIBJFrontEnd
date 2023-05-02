import React, { useState, useEffect } from 'react';
import Accordions from 'components/Accordion/Accordion';
import * as datasetService from '../../../services/dataset';
import QueryFgts from 'components/Datasets/Fgts';
import { Toast } from 'components';

const FgtsDataset = ({ loading, setLoading, idPerson, typePerson }) => {
	const [datasets, setDatasets] = useState();

	useEffect(() => {
		getDatasetsByUserId();
	}, []);

	const getDatasetsByUserId = () => {
		setLoading(true);
		datasetService.getDatasetsByUserId(typePerson, idPerson).then(response => {
			setDatasets(response?.data);
			setLoading(false);
		}).catch(err => {
			console.log('err', err);
			setLoading(false);
		});
	};

	const generateDataset = (reportName) => {
		Toast.showInfoMessage("Dataset foi solicitado");
		setLoading(true);
		datasetService.fetchDataSetReport(typePerson, idPerson, reportName).then(response => {
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

	const findProperDataset = (datasetName) => datasets?.find(dataset => dataset?.dataSet == datasetName);

	const query = [
		{
			name: 'Saque-aniversário FGTS',
			value: 'Fgts',
			key: 'fgts',
			children: <QueryFgts data={findProperDataset("fgts")} value='Fgts' addDataset={() => generateDataset("Fgts")} disabled={loading} loading={loading} />
		},
	];

	return (
		<Accordions accordions={query} />
	);
};

export default FgtsDataset;