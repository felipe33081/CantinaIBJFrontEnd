import React, { useState, useEffect } from 'react';
import * as creditNoteService from 'services/creditNote';
import {
	ContentContainer, ModalWithLoading, Toast,
} from 'components';
import { Link, useHistory } from 'react-router-dom';
import MaterialTable from 'material-table';
import Helper from 'helpers/format.helpers';
import { localizationOptions } from 'helpers/table.helpers';
import { getCreditNoteList, deleteCreditNoteById } from 'services/creditNote';
import { Button, Grid, MenuItem, Select, TablePagination, TextField, Typography } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import FilterListIcon from '@material-ui/icons/FilterList';
import moment from 'moment';
import { useUser } from 'contexts/user';
import ActionBar from 'components/ActionBar/ActionBar';
import ModalCNAB from './Cnab/index';
import { useTenant } from 'contexts/tenant';
import { useLoading } from 'contexts/loading';
import AnalysisStatusColumnComponent from 'components/DastasetsStatusColumn/ColumnsStatus';
import { useFund } from 'contexts/fund';
import { TableContainer } from 'containers/TableContainer';
import ScoreSale from 'components/Datasets/ScoreClearSale/ScoreSale';

const statusFilteringFields = [
	{
		name: 'Aprovação de Crédito',
		value: 'CreditApproval'
	},
	{
		name: 'Aprovação de Compliance',
		value: 'ComplianceApproval'
	},
	{
		name: 'Aprovação de Instrumento',
		value: 'InstrumentApproval'
	},
	{
		name: 'Validação de Assinaturas',
		value: 'SignaturesValidation'
	},
	{
		name: 'Coleta de assinaturas',
		value: 'Signatures'
	},
	{
		name: 'Erro',
		value: 'Error'
	},
	{
		name: 'Encerrado',
		value: 'Finished'
	},
	{
		name: 'Cancelada',
		value: 'Canceled'
	},
	{
		name: 'Aguardando Liquidação',
		value: 'WaitLiquidation'
	},
	{
		name: 'Liquidação',
		value: 'Liquidation'
	},
	{
		name: 'Revisão de Pagamento',
		value: 'PaymentRevision'
	},
	{
		name: 'Rascunho',
		value: 'Draft'
	},
	{
		name: 'Reprovado',
		value: 'Disapproved',
	},
	{
		name: 'Revisão',
		value: 'Revision'
	}
];

export default (props) => {
	const { hideActions, title, initialDate, finalDate } = props;
	const history = useHistory();
	const [rowsPerPage, setRowsPerPage] = useState(localStorage.getItem('rowsPerPage') || 5);
	const [selectedRows, setSelectedRows] = useState([]);
	const [enableFilter, setEnableFilter] = useState(false);
	const { loading, addLoader, completeLoader } = useLoading();
	const [openModalReject, setOpenModalReject] = useState(false);
	const { fundList } = useFund([]);
	const [modalCNAB, setModalCNAB] = useState(false);
	const [messageReject, setMessageReject] = useState(null);
	const { user } = useUser();
	const { selectedTenant } = useTenant();
	const tableRef = React.useRef(null);
	const isSeletorTenant = !!+window.__RUNTIME_CONFIG__.REACT_APP_SELETOR_TENANTS;
	const isRootTenancy = window.__RUNTIME_CONFIG__.REACT_APP_TENANT_TYPE == '0';
	const isAdminGroup = user?.payload['cognito:groups']?.includes('Admin');
	const useCreditAnalysis = !!+window.__RUNTIME_CONFIG__.REACT_APP_USE_CREDIT_ANALYSIS_DATASET;
	const useComplianceAnalysis = !!+window.__RUNTIME_CONFIG__.REACT_APP_USE_COMPLIANCE_ANALYSIS_DATASET;

	const showSendApproval = (status) => {
		const lengthAllStatusThatIncludesString = status.filter(st => ['Disapproved', 'Error', 'Draft', 'Revision'].includes(st)).length;
		if (
			status?.length > 0 &&
			isAdminGroup &&
			!!+window.__RUNTIME_CONFIG__.REACT_APP_SEND_CREDIT_APPROVAL &&
			status?.length === lengthAllStatusThatIncludesString
		) return true;

		return;

	};

	const rowStatus = selectedRows.map(row => row.status);
	
	const showApproveAndReject = (status) => {

		const lengthAllStatusThatIncludesString = status.filter(st => ['ComplianceApproval', 'CreditApproval', 'Liquidation', 'ManualLiquidation'].includes(st)).length;
		if (
			status?.length > 0 &&
			isRootTenancy &&
			!!+window.__RUNTIME_CONFIG__.REACT_APP_APPROVE_REJECT_CREDIT &&
			status.length === lengthAllStatusThatIncludesString
		) return true;
		return;
	};

	const showApproveInstrumentAndReject = (status) => {

		const lengthAllStatusThatIncludesString = status.filter(st => ['InstrumentApproval'].includes(st)).length;
		if (
			status?.length > 0 &&
			isRootTenancy &&
			!!+window.__RUNTIME_CONFIG__.REACT_APP_APPROVE_REJECT_CREDIT &&
			status.length === lengthAllStatusThatIncludesString
		) return true;
		return;
	};

	const disableClone = () => {
		return selectedRows.length === 1;
	};

	const cloneCreditNote = async () => {
		addLoader('cloneCreditNote');
		selectedRows.map(operation => {
			creditNoteService.getCreditNoteById(operation.id).then(result => {
				creditNoteService.cloneCreditNote(result.data, selectedTenant).then(data => {
					Toast.showSuccessMessage('Operação duplicada com sucesso');
					completeLoader("cloneCreditNote");
					history.push('/ccb/editar?id=' + data);

				}).catch(err => {
					Toast.showErrorMessage("Não foi possíve clonar a operação");
					completeLoader("cloneCreditNote");
					console.log(err);
				});

			}).catch(err => {
				Toast.showErrorMessage("Não foi possíve clonar a operação");
				completeLoader("cloneCreditNote");
				console.log(err);
			});
		});
	};

	const deleteSelected = async () => {
		addLoader("deleteOps");
		selectedRows.map(row => {
			creditNoteService.deleteCreditNoteById(row?.id)
				.then(_ => {
					tableRef.current.onQueryChange();
					completeLoader("deleteOps");
				})
				.catch(err => {
					tableRef.current.onQueryChange();
					completeLoader("deleteOps");
				});
		});
		setSelectedRows([]);
	};

	const sendApprovalCreditNote = async () => {
		addLoader("sendApprovalCreditNote");
		selectedRows.map(row => {
			creditNoteService.sumbitApprovalCreditNoteById(row?.id)
				.then(_ => {
					tableRef.current.onQueryChange();
					completeLoader("sendApprovalCreditNote");
				})
				.catch(err => {
					tableRef.current.onQueryChange();
					completeLoader("sendApprovalCreditNote");
				});
		});
		setSelectedRows([]);
	};

	const approveCreditNote = async () => {

		addLoader("approveCreditNote");
		selectedRows.map(row => {
			creditNoteService.approveCreditNoteById(row?.id, row.status)
				.then(response => {
					tableRef.current.onQueryChange();
					completeLoader("approveCreditNote");
				})
				.catch(err => {
					completeLoader("approveCreditNote");
					tableRef.current.onQueryChange();

				});
		});
		setSelectedRows([]);
	};

	const approveInstrumentCreditNote = async () => {
		addLoader("approveInstrumentCreditNote");
		selectedRows.map(row => {
			creditNoteService.approveCreditNoteById(row?.id, row.status)
				.then(response => {
					tableRef.current.onQueryChange();
					completeLoader("approveInstrumentCreditNote");
				})
				.catch(err => {
					completeLoader("approveInstrumentCreditNote");
					tableRef.current.onQueryChange();

				});
		});
		setSelectedRows([]);

	};

	const generateAssignment = async () => {
		addLoader("generateAssignment");
		creditNoteService.generateBatchAssignment(selectedRows.map(row => row.id))
			.then(result => {
				completeLoader("generateAssignment");
			})
			.catch(error => {
				completeLoader("generateAssignment");
				console.log(error);
			});
	};

	const generateVortx = async () => {
		addLoader("generateVortx");
		creditNoteService.generateVortx(selectedRows.map(row => row.id))
			.then(result => {
				completeLoader("generateVortx");
			})
			.catch(error => {
				completeLoader("generateVortx");
				console.log(error);
			});
	};

	const handleModalReject = () => {
		setOpenModalReject(true);
	};

	const handleModalCNAB = () => {
		setModalCNAB(true);
	};

	const handleCloseModalCNAB = () => {
		setModalCNAB(false);

	};

	const everySelectedHasFund = selectedRows.length > 0 && selectedRows.every(row => row.fundId);

	const actions = {
		onGenerateAssignment: generateAssignment,
		onGenerateVortx: generateVortx,
		disableGenerateAssignment: !everySelectedHasFund,
		onCreateCNAB: handleModalCNAB,
		onSendApproval: sendApprovalCreditNote,
		onDelete: selectedRows.length > 0 && deleteSelected,
		disableSendApproval: !showSendApproval(rowStatus),
		onApprove: !!+window.__RUNTIME_CONFIG__.REACT_APP_APPROVE_REJECT_CREDIT && approveCreditNote,
		OnApproveInstrument: approveInstrumentCreditNote,
		disableOnApproveInstrument: !showApproveInstrumentAndReject(rowStatus),
		onReject: !!+window.__RUNTIME_CONFIG__.REACT_APP_APPROVE_REJECT_CREDIT && handleModalReject,
		disableApproveOrReject: !showApproveAndReject(rowStatus),
		onClone: cloneCreditNote,
		disableClone: !disableClone(),
		onRefresh: () => tableRef?.current?.onQueryChange(),
	};

	const handleCloseModalReject = () => {
		setOpenModalReject(false);
		setMessageReject(null);
	};

	const handleRejectOp = async () => {
		addLoader("handleRejectOp");
		await selectedRows.map(row => {
			creditNoteService.disapproveCreditNoteById(row.id, messageReject)
				.then(_ => {
					completeLoader("handleRejectOp");
					setOpenModalReject(false);
				})
				.catch(err => {
					completeLoader("handleRejectOp");
					setOpenModalReject(false);
				});
		});
	};

	const onRowsPerPageChange = (page) => {
		setRowsPerPage(page);
		localStorage.setItem('rowsPerPage', page);
	};

	return (
		<ContentContainer>
			{!hideActions && <ActionBar {...actions} hideSubmit={true} />}

			{modalCNAB &&
				<ModalCNAB onCloseModal={handleCloseModalCNAB} selectedRows={selectedRows} fundList={fundList} />
			}

			{openModalReject &&
				<>
					<ModalWithLoading title='Digite o motivo da reprovação' onCloseModal={handleCloseModalReject}>
						<Grid container direction='column' justifyContent='center' spacing={2}>
							<Grid item >
								<TextField rows={4} multiline label="Motivo da reprovação" fullWidth onChange={(event) => setMessageReject(event.target.value)}></TextField>
							</Grid>
							<Grid item>
								<Button disabled={!messageReject?.length} color="secondary" variant='contained' onClick={() => handleRejectOp()}>Rejeitar</Button>
							</Grid>
						</Grid>
					</ModalWithLoading>
				</>
			}

			<TableContainer>
				{!hideActions && <>
					<div className='uk-width-auto@m uk-width-1-1'>
						<div className='uk-width-auto@m uk-width-1-1'>
							<Link to='/ccb/nova' style={{ backgroundColor: '#3f51b5', textDecoration: "none" }} className='wt-button wt-button-lowercase uk-button'>
								<i className='fa fa-plus uk-margin-small-right' style={{ color: "white" }}></i>
								<Typography component="span" style={{ color: "white", textTransform: 'none', }}>Adicionar nova operação</Typography>
							</Link>
							<Button style={{ marginLeft: 10 }} onClick={() => setEnableFilter(!enableFilter)} >
								<FilterListIcon /> Filtrar
							</Button>
						</div>
					</div>
					<br />
				</>
				}
				<MaterialTable
					tableRef={tableRef}
					title={title || "Operações"}
					columns={[
						isSeletorTenant ? { title: 'Correspondente', field: 'tenantDisplay', filtering: false } : undefined,
						{ title: 'Operação', field: 'creditNoteNo', filtering: true, render: ({ creditNoteNo }) => `#${creditNoteNo}`, },
						{ title: 'Tomador', field: 'personDisplay', cellStyle: { textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: 300 } },
						{ title: 'Valor do Principal', field: 'amortization.principalAmountInCents', filtering: false, render: (props) => props?.amortization?.principalAmountInCents && Helper.formatCurrency(props?.amortization?.principalAmountInCents) },
						{
							title: 'Status',
							field: 'statusDisplay',
							filtering: true,
							filterComponent: (props) => <Select
								{...props}
								fullWidth
								onChange={(e) => props.onFilterChanged(props?.columnDef?.tableData?.id, e.target.value)}
								component={TextField}
							>
								<MenuItem value={""}>Todos</MenuItem>
								{statusFilteringFields && statusFilteringFields.map(field => (
									<MenuItem key={field.value} value={field.value}>{field.name}</MenuItem>
								))}
							</Select>
						},
						{ title: 'Taxa (%)', field: 'amortization.apr', filtering: false, render: (props) => props?.amortization?.apr && (Helper.percentFormat(props.amortization.apr * 100)) },
						{
							title: 'Data de Início',
							field: 'amortization.startDate',
							render: ({ amortization }) => amortization.startDate && new Date(amortization.startDate).toLocaleDateString('pt-BR'),
							filterComponent: (props) => <KeyboardDatePicker
								{...props}
								format="dd/MM/yyyy"
								InputLabelProps={{ shrink: true }}
								placeholder="dd/mm/aaaa"
								variant="inline"
								value={props?.columnDef?.tableData?.filterValue || null}
								disableFuture={true}
								onChange={(e) => props.onFilterChanged(props?.columnDef?.tableData?.id, e)}
								helperText={false}
							/>
						},
						useComplianceAnalysis ? {
							title: 'Análise de Compliance',
							field: 'statusMotorAnalysis',
							filtering: false,
							render: (props) => <AnalysisStatusColumnComponent endpoint={'CreditNote'} row={props} datasetName="complianceanalysis" />
						} : undefined,
						useCreditAnalysis ? {
							title: 'Análise de Crédito',
							field: 'statusMotorCredit',
							filtering: false, render: (props) => <AnalysisStatusColumnComponent endpoint={'CreditNote'} row={props} datasetName="creditanalysis" />
						} : undefined,
						isRootTenancy ? {
							title: 'Score de Risco',
							render: (props) => <ScoreSale discriminator={props.personDiscriminator} id={props.personId} />
						} : undefined
					].filter(x => x !== undefined)}
					actions={[
						{
							icon: 'search',
							tooltip: 'Editar operação',
							position: 'row',
							onClick: (ev, rowData) => {
								ev.ctrlKey ?
									window.open(`/ccb/editar?id=${rowData.id}`, '_blank') :
									history.push(`/ccb/editar?id=${rowData.id}`);
							}
						},
					]}
					editable={{
						onRowDelete: oldData =>
							new Promise(resolve => {
								deleteCreditNoteById(oldData.id).then(_ => {
									resolve();
								}).catch(err => {
									resolve();
								});
							})
					}}
					data={(allParams) =>
						new Promise((resolve, reject) => {
							const { page, pageSize, search, filters, orderBy, orderDirection } = allParams;

							const startDate = filters.find(f => f.column.field === 'amortization.startDate')?.value;

							let filterFinalDate = null;
							let filterInitialDate = null;

							if (startDate && enableFilter) {
								filterFinalDate =
									moment(startDate).isValid() &&
									moment(startDate).format("YYYY-MM-DD") + "T23:59:59";

								filterInitialDate =
									moment(startDate).isValid() &&
									moment(startDate).format("YYYY-MM-DD") + "T00:00:00";
							}

							if (finalDate) {
								filterFinalDate =
									moment(finalDate).isValid() &&
									moment(finalDate).format("YYYY-MM-DD") + "T23:59:59";
							}

							if (initialDate) {
								filterInitialDate =
									moment(initialDate).isValid() &&
									moment(initialDate).format("YYYY-MM-DD") + "T00:00:00";
							}

							const filtersValues = {
								personDisplay: enableFilter && filters.find(f => f.column.field === 'personDisplay')?.value,
								initialDate: filterInitialDate, // validating date and setting 00:00
								finalDate: filterFinalDate, // validating date and setting 23:59
								status: enableFilter && filters.find(f => f.column.field === 'statusDisplay')?.value,
								creditNoteNo: enableFilter && filters.find(c => c.column.field === 'creditNoteNo')?.value,
								page,
								size: pageSize,
								searchString: search,
								orderByField: orderBy?.field,
								orderByDirection: orderDirection
							};

							getCreditNoteList(filtersValues, selectedTenant)
								.then(async result => {
									if (result) {
										resolve({
											data: result?.data,
											page: result?.page,
											totalCount: result?.totalItems,
										});
									} else resolve({
										data: [],
										page: 0,
										totalCount: 0,
									});

								}).catch(err => {
									resolve({
										data: [],
										page: 0,
										totalCount: 0,
									});
								});
						})
					}
					localization={localizationOptions}
					onChangeRowsPerPage={onRowsPerPageChange}
					onRowsPerPageChange={onRowsPerPageChange}
					components={{
						Pagination: props => (
							<TablePagination
								{...props}
								rowsPerPageOptions={[5, 10, 20, 50]}
							/>
						),
					}}
					isLoading={loading}
					options={{
						selection: true,
						actionsColumnIndex: -1,
						pageSize: rowsPerPage,
						debounceInterval: 500,
						searchAutoFocus: true,
						addRowPosition: 'row',
						filtering: enableFilter
					}}
					onSelectionChange={(rows) => setSelectedRows(rows)}
				/>
			</TableContainer>
		</ContentContainer>
	);
};