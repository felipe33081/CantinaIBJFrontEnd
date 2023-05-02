import React, { useState } from 'react';
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Button, Grid, Typography } from '@material-ui/core';
import { ModalWithLoading } from 'components';

function Row({ row, allPersonsList, formatStatus }) {
	const [open, setOpen] = useState(false);

	const isListLogs = row?.logs?.filter( (detailsRow) => formatStatus(detailsRow.bloqueio, detailsRow.alerta, detailsRow.erro));
	const isLogs = row?.logs?.length && isListLogs?.length;

	return (
	  <>
			<TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
				<TableCell align="center" scope="row">
					{row.nome || "Não identificado"}
				</TableCell>
				<TableCell align="center">{!isLogs ? 'OK' : formatStatus(row?.bloqueio, row?.alerta, row?.erro)}</TableCell>
				<TableCell align="center">{isLogs ? <Button color="primary" variant="contained" onClick={() => setOpen(!open)} >Detalhes</Button> : ''}</TableCell>
			</TableRow>
			{isLogs && open ? 
				<ModalWithLoading title="Detalhes" onCloseModal={() => setOpen(false)}>
					<TableRow>
						<TableCell style={{ paddingTop: 0, borderBottom: 'white' }} colSpan={6}>
							<Collapse in={open} timeout="auto" unmountOnExit>
								<Box sx={{ margin: 1 }}>
									<Table size="small" aria-label="purchases">
										<TableHead>
											<TableRow>
												<TableCell>Regra</TableCell>
												<TableCell>Descrição</TableCell>
												<TableCell>Resultado</TableCell>
											</TableRow>
										</TableHead>
										<TableBody>
											{isListLogs.map((detailsRow, index) => (
												<TableRow key={index}>
													<TableCell>{detailsRow.regra_descricao}</TableCell>
													<TableCell align="th">
														{ detailsRow.regra_condicao.length >= 120 ?
															`${detailsRow.regra_condicao.substr(0,120)}...`
															: detailsRow.regra_condicao}
													</TableCell>
													<TableCell>{formatStatus(detailsRow?.bloqueio, detailsRow?.alerta, detailsRow?.erro)}</TableCell>
												</TableRow>
											))}
										</TableBody>
									</Table>
								</Box>
							</Collapse>
						</TableCell>
					</TableRow>
				</ModalWithLoading>
				: '' }
	  </>
	);
}

const TableMotorCredit = ({ rows, allPersonsList }) => {
	const { overview } = rows?.result;

	const formatStatus = (bloqued, alert, erro) => {
		if(bloqued) return 'Bloqueio';
		if(alert) return 'Alerta';		
		return false;
	};


	return (
		<>
			<Grid container direction="column" alignItems="center" spacing={2}>
				<Grid item>
					<Typography variant="h5">Resumo</Typography>
				</Grid>
				<Grid item>
					<Typography ><strong>Produto: </strong>{overview?.nome_grupo_analise}</Typography>
					<Typography><strong> Resultado: </strong> {formatStatus(overview?.bloqueio, overview?.alerta, overview?.erro) || "OK"} </Typography>
					<Typography><strong> Nº CNPJ avaliados: </strong> {overview?.quantidade_cnpj}</Typography>
					<Typography><strong> Nº CNPJ com alerta: </strong> {overview?.quantidade_cnpj_alerta}</Typography>
					<Typography><strong> Nº CNPJ com bloqueio: </strong> {overview?.quantidade_cnpj_bloqueio}</Typography>
					<Typography><strong> Nº CPF avaliados: </strong> {overview?.quantidade_cpf} </Typography>
					<Typography><strong> Nº CPF avaliados com alerta: </strong> {overview?.quantidade_cpf_alerta} </Typography>
					<Typography><strong> Nº CPF avaliados com bloqueio : </strong> {overview?.quantidade_cpf_bloqueio} </Typography>
				</Grid>
				<TableContainer component={Paper}>
					<Table aria-label="collapsible table">
						<TableHead>
							<TableRow>
								<TableCell align="center">Nome</TableCell>
								<TableCell align="center">Status</TableCell>
								<TableCell />
							</TableRow>
						</TableHead>
						<TableBody>
							{rows?.result?.details.map((rowItem)  => 
					    		<Row key={rowItem?.id}  row={rowItem} allPersonsList={allPersonsList} formatStatus={formatStatus} />
							)}
						</TableBody>
					</Table>
				</TableContainer>
			</Grid>
		</>
	);
};

export default TableMotorCredit;