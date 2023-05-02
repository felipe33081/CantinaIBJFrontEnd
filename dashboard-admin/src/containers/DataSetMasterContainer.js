import React, { useState } from 'react';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import ReactJson from 'react-json-view';
import ModalWithLoading from 'components/ModalWithLoading-deprecated/ModalDeprecated';
import { isEmpty } from 'lodash';

function DataSetMasterContainer({ children, dataSet, onClickUpdateData, disabled, loading }) {

	const [modal, setModal] = useState(false);

	const closeModal = () => {
		setModal(false);
	};

	const openModal = () => {
		setModal(true);
	};

	const useScan3 = !!+window.__RUNTIME_CONFIG__.REACT_APP_USE_SCAN3;
	const isSeletorTenant = window.__RUNTIME_CONFIG__.REACT_APP_SELETOR_TENANTS;

	return (
		<>
			{!isEmpty(dataSet?.result) || dataSet?.result === null ?
				<>
					{modal &&
						<ModalWithLoading
							title='Valores originais'
							onCloseModal={closeModal}>
							<ReactJson src={dataSet} />
						</ModalWithLoading>
					}
					{children}
					<Box p={3}>
						<small>Gerado em: {new Date(dataSet?.updatedAt || dataSet?.createdAt).toLocaleDateString('pt-BR')}</small>
						<br />
						<Grid container spacing={2}>
							<Grid item xs={3}>
								<Button className='button-large' color="primary" disabled={disabled || loading} onClick={onClickUpdateData} variant="contained" fullWidth>
									{loading ?
										<div className="spinner"><i className="fa fa-spinner" color="#FFF" size={100} /></div>
										: <Typography component="span" style={{ color: "white", textTransform: 'none', }}>&nbsp;Atualizar dados</Typography>}
								</Button>
							</Grid>
							{isSeletorTenant && !useScan3 ? <Grid item xs={3}>
								<Button className='button-large' onClick={openModal} color="primary" variant="contained" fullWidth>
									<Typography component="span" style={{ color: "white", textTransform: 'none', }}>&nbsp;Ver dados originais</Typography></Button>
							</Grid> : null}
						</Grid>
					</Box>
				</>
				:
				<Grid container spacing={2}>
					<Grid item xs={2}>
						<Button className='button-large' onClick={onClickUpdateData} disabled={loading} color="primary" variant="contained" fullWidth>
							{loading ?
								<div className="spinner"><i className="fa fa-spinner" color="#FFF" size={100} /></div>
								: <Typography component="span" style={{ color: "white", textTransform: 'none', }}>&nbsp;Obter dados</Typography>}
						</Button>
					</Grid>
				</Grid>
			}
		</>

	);
}

export default DataSetMasterContainer;