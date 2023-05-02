import React, { useState } from 'react';
import { Grid, Typography, TablePagination } from '@material-ui/core';
import { ContentContainer } from 'components';
import MaterialTable from 'material-table';
import Helper from 'helpers/format.helpers';
import { localizationOptions } from 'helpers/table.helpers';
import { DangerAlert } from 'components';
import DataSetMasterContainer from 'containers/DataSetMasterContainer';
import { sum } from 'lodash';
import { Alert } from '@material-ui/lab';

const QueryFgts = ({ data, addDataset, disabled, loading }) => {
	const [rowsPerPage, setRowsPerPage] = useState(localStorage.getItem('rowsPerPage') || 5);

	const onRowsPerPageChange = (page) => {
		setRowsPerPage(page);
		localStorage.setItem('rowsPerPage', page);
	};

	const periodos = data?.result?.periodos;
	let error = data?.result?.codigo && `${data?.result?.codigo} - ${data?.result?.descricao}`;
	let error2 = data?.result?.erro && `${data?.result?.erro} - ${data?.result?.mensagem}`;
	if (data?.result?.erro == "429") {
		error2 = data?.result?.erro && `${data?.result?.erro} - O serviço de consulta ao FGTS está indisponível no momento. Tente novamente em alguns segundos.`;
	}

	return (
		<DataSetMasterContainer dataSet={data} disabled={disabled} onClickUpdateData={() => addDataset()} loading={loading}>
			<>
				<Grid item>
					{data?.result?.existeSaldoDesconsiderado ? <Alert severity="warning" >Existe saldo desconsiderado. Isso pode fazer com que o saldo disponível fique bloqueado para novos adiantamentos.</Alert> : ""}
					<br />
					{error && <DangerAlert msg={`${error}`} />}
					{error2 && <DangerAlert msg={`${error2}`} />}
					{!error && !error2 && <>
						<Typography><strong> Data do Saldo: </strong> {data?.result?.dataSaldo}</Typography>
						<Typography><strong> Existe Saldo Desconsiderado: </strong> {data?.result?.existeSaldoDesconsiderado ? "Sim" : "Não"}</Typography>
						<Typography><strong> Quantidade de Pedidos: </strong> {data?.result?.qtdPedidos ?? 0}</Typography>
						<Typography><strong> Soma das Parcelas Disponíveis : </strong> {data?.result?.periodos && Helper.formatCurrency(sum(periodos.map(items => items.valor).splice(0, 10).map(y => y * 100)))}</Typography>
					</>}
				</Grid>
				<br />
				{!error && <Grid container spacing={2}>
					<ContentContainer>
						<MaterialTable
							title=''
							columns={[
								{
									title: 'Data Repasse', field: 'dataRepasse'
								},
								{
									title: 'Valor', field: 'valor',
									render: ({ valor }) => Helper.formatCurrency(valor * 100)
								}
							].filter(x => x !== undefined)}
							data={periodos}
							onChangeRowsPerPage={onRowsPerPageChange}
							onRowsPerPageChange={onRowsPerPageChange}
							localization={localizationOptions}
							components={{
								Pagination: props => (
									<TablePagination
										{...props}
										rowsPerPageOptions={[5, 10, 20, 50]}
									/>
								),
							}}
							options={{
								search: false,
								actionsColumnIndex: -1,
								pageSize: rowsPerPage,
								debounceInterval: 500,
								searchAutoFocus: true
							}}
						/>
					</ContentContainer>
				</Grid>}
			</>
		</DataSetMasterContainer >
	);
};

export default QueryFgts;