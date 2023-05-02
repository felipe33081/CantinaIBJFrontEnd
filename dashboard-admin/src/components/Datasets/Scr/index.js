import React from 'react';
import DataSetMasterContainer from 'containers/DataSetMasterContainer';
import { Paper, TableRow, TableContainer, TableCell, TableBody, Table } from '@material-ui/core';
import { DangerAlert } from 'components';
import Helper from 'helpers/format.helpers';


function Scr({ data, addDataset, value, disabled, loading }) {

	let msgs = data?.result?.listaDeMensagensDeValidacao;
	let fluxoConsolidado = data?.result?.fluxoConsolidado;
	let dataSCR = data?.result?.dataBaseConsultada;
	let error = data?.result?.Status?.scr_bcb && data?.result?.Status.scr_bcb[0]?.Message;
	
	return (
		<DataSetMasterContainer dataSet={data} disabled={disabled} onClickUpdateData={() => addDataset(value)} loading={loading}>
			{msgs && msgs.map(m => <DangerAlert msg={`${m.codigo} - ${m.mensagem}`} />)}
			{error && <DangerAlert msg={`${error}`}/>}
			
			{fluxoConsolidado && <><b>Data-Base: {Helper.formatYearMonthToMonthYear(dataSCR)}</b><br/></>}
			{data?.result?.fluxoConsolidado && <TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
					<TableBody>
						<TableRow key={1}>
							<TableCell component="th" scope="row">
								<b>Vencer - Total</b>
							</TableCell>
							<TableCell component="th" scope="row"></TableCell>
							<TableCell align="right"><b>{Helper.formatCurrency(fluxoConsolidado?.vencerTotal * 100)}</b></TableCell>
						</TableRow>

						<TableRow key={2}>
							<TableCell scope="row" size={"small"} />
							<TableCell scope="row" >
								Até 30 dias e Vencidos até 14 dias
							</TableCell>
							<TableCell align="right">{Helper.formatCurrency(fluxoConsolidado?.vencerAte30diasVencidoAte14dias * 100)}</TableCell>
						</TableRow>

						<TableRow key={3}>
							<TableCell scope="row" size={"small"} />
							<TableCell scope="row">
								31 a 60 dias
							</TableCell>
							<TableCell align="right">{Helper.formatCurrency(fluxoConsolidado?.vencer31a60dias * 100)}</TableCell>
						</TableRow>
						<TableRow key={4}>
							<TableCell scope="row" size={"small"} />
							<TableCell scope="row">
								61 a 90 dias
							</TableCell>
							<TableCell align="right">{Helper.formatCurrency(fluxoConsolidado?.vencer61a90dias * 100)}</TableCell>
						</TableRow>
						<TableRow key={5}>
							<TableCell scope="row" size={"small"} />
							<TableCell scope="row">
								91 a 180 dias
							</TableCell>
							<TableCell align="right">{Helper.formatCurrency(fluxoConsolidado?.vencer91a180dias * 100)}</TableCell>
						</TableRow>
						<TableRow key={6}>
							<TableCell scope="row" size={"small"} />
							<TableCell scope="row">
								181 a 360 dias
							</TableCell>
							<TableCell align="right">{Helper.formatCurrency(fluxoConsolidado?.vencer181a360dias * 100)}</TableCell>
						</TableRow>
						<TableRow key={7}>
							<TableCell scope="row" size={"small"} />
							<TableCell scope="row">
								Acima 360 dias
							</TableCell>
							<TableCell align="right">{Helper.formatCurrency(fluxoConsolidado?.vencerAcima360dias * 100)}</TableCell>
						</TableRow>
						<TableRow key={8}>
							<TableCell scope="row" size={"small"} />
							<TableCell scope="row">
								Indeterminado
							</TableCell>
							<TableCell align="right">{Helper.formatCurrency(fluxoConsolidado?.vencerPrazoIndeterminado * 100)}</TableCell>
						</TableRow>
					</TableBody>

					<TableRow key={1}>
						<TableCell component="th" scope="row">
							<b>Vencido - Total</b>
						</TableCell>
						<TableCell component="th" scope="row"></TableCell>
						<TableCell align="right"><b>{Helper.formatCurrency(fluxoConsolidado?.vencidoTotal * 100)}</b></TableCell>
					</TableRow>

					<TableRow key={2}>
						<TableCell scope="row" size={"small"} />
						<TableCell scope="row" >
							15 a 30 dias
						</TableCell>
						<TableCell align="right">{Helper.formatCurrency(fluxoConsolidado?.vencido15a30dias * 100)}</TableCell>
					</TableRow>

					<TableRow key={3}>
						<TableCell scope="row" size={"small"} />
						<TableCell scope="row">
							31 a 60 dias
						</TableCell>
						<TableCell align="right">{Helper.formatCurrency(fluxoConsolidado?.vencido31a60dias * 100)}</TableCell>
					</TableRow>
					<TableRow key={4}>
						<TableCell scope="row" size={"small"} />
						<TableCell scope="row">
							61 a 90 dias
						</TableCell>
						<TableCell align="right">{Helper.formatCurrency(fluxoConsolidado?.vencido61a90dias * 100)}</TableCell>
					</TableRow>
					<TableRow key={5}>
						<TableCell scope="row" size={"small"} />
						<TableCell scope="row">
							91 a 180 dias
						</TableCell>
						<TableCell align="right">{Helper.formatCurrency(fluxoConsolidado?.vencido91a180dias * 100)}</TableCell>
					</TableRow>
					<TableRow key={6}>
						<TableCell scope="row" size={"small"} />
						<TableCell scope="row">
							181 a 360 dias
						</TableCell>
						<TableCell align="right">{Helper.formatCurrency(fluxoConsolidado?.vencido181a360dias * 100)}</TableCell>
					</TableRow>
					<TableRow key={7}>
						<TableCell scope="row" size={"small"} />
						<TableCell scope="row">
							Acima 360 dias
						</TableCell>
						<TableCell align="right">{Helper.formatCurrency(fluxoConsolidado?.vencidoAcima360dias * 100)}</TableCell>
					</TableRow>

					<TableRow key={1}>
						<TableCell component="th" scope="row">
							<b>Prejuizo - Total</b>
						</TableCell>
						<TableCell component="th" scope="row"></TableCell>
						<TableCell align="right"><b>{Helper.formatCurrency(fluxoConsolidado?.vencidoTotal * 100)}</b></TableCell>
					</TableRow>

					<TableRow key={2}>
						<TableCell scope="row" size={"small"} />
						<TableCell scope="row" >
							Até 12 meses
						</TableCell>
						<TableCell align="right">{Helper.formatCurrency(fluxoConsolidado?.vencido15a30dias * 100)}</TableCell>
					</TableRow>

					<TableRow key={2}>
						<TableCell scope="row" size={"small"} />
						<TableCell scope="row" >
							Acima de 12 meses
						</TableCell>
						<TableCell align="right">{Helper.formatCurrency(fluxoConsolidado?.vencido15a30dias * 100)}</TableCell>
					</TableRow>


					<TableRow key={1}>
						<TableCell component="th" scope="row">
							<b>Coobrigação - Total</b>
						</TableCell>
						<TableCell component="th" scope="row"></TableCell>
						<TableCell align="right"><b>{Helper.formatCurrency(fluxoConsolidado?.coobrigacaoTotal * 100)}</b></TableCell>
					</TableRow>

					<TableRow key={2}>
						<TableCell scope="row" size={"small"} />
						<TableCell scope="row" >
							Coobrigação Assumida
						</TableCell>
						<TableCell align="right">{Helper.formatCurrency(fluxoConsolidado?.coobrigacaoAssumida * 100)}</TableCell>
					</TableRow>

					<TableRow key={3}>
						<TableCell scope="row" size={"small"} />
						<TableCell scope="row" >
							Coobrigação Prestadas
						</TableCell>
						<TableCell align="right">{Helper.formatCurrency(fluxoConsolidado?.coobrigacaoPrestadas * 100)}</TableCell>
					</TableRow>



					<TableRow key={1}>
						<TableCell component="th" scope="row">
							<b>Créditos a Liberar - Total</b>
						</TableCell>
						<TableCell component="th" scope="row"></TableCell>
						<TableCell align="right"><b>{Helper.formatCurrency(fluxoConsolidado?.creditosALiberarTotal * 100)}</b></TableCell>
					</TableRow>

					<TableRow key={2}>
						<TableCell scope="row" size={"small"} />
						<TableCell scope="row" >
							Créditos a Liberar até 360 dias
						</TableCell>
						<TableCell align="right">{Helper.formatCurrency(fluxoConsolidado?.creditosALiberarAte360dias * 100)}</TableCell>
					</TableRow>

					<TableRow key={3}>
						<TableCell scope="row" size={"small"} />
						<TableCell scope="row" >
							Créditos a Liberar acima de 360 dias
						</TableCell>
						<TableCell align="right">{Helper.formatCurrency(fluxoConsolidado?.creditosALiberarAcima360dias * 100)}</TableCell>
					</TableRow>



					<TableRow key={1}>
						<TableCell component="th" scope="row">
							<b>Limites de Crédito - Total</b>
						</TableCell>
						<TableCell component="th" scope="row"></TableCell>
						<TableCell align="right"><b>{Helper.formatCurrency(fluxoConsolidado?.limiteCreditoTotal * 100)}</b></TableCell>
					</TableRow>

					<TableRow key={2}>
						<TableCell scope="row" size={"small"} />
						<TableCell scope="row" >
							Limite de Crédito com vencimento até 360 dias
						</TableCell>
						<TableCell align="right">{Helper.formatCurrency(fluxoConsolidado?.limiteCreditoAte360dias * 100)}</TableCell>
					</TableRow>

					<TableRow key={3}>
						<TableCell scope="row" size={"small"} />
						<TableCell scope="row" >
							Limite de Crédito com vencimento acima 360 dias
						</TableCell>
						<TableCell align="right">{Helper.formatCurrency(fluxoConsolidado?.limiteCreditoAcima360dias * 100)}</TableCell>
					</TableRow>
				</Table>
			</TableContainer>}
		</DataSetMasterContainer >
	);
}

export default Scr;