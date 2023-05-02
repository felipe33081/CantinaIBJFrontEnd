import React, { useState, useEffect } from 'react';
import {ContentContainer} from 'components';
import MaterialTable from 'material-table';
import Helper from 'helpers/format.helpers';
import { localizationOptions } from 'helpers/table.helpers';
import { getCreditNoteList, restoreCreditFromDeleted } from 'services/creditNote';
import { Button, MenuItem, Select, TablePagination, TextField } from '@material-ui/core';
import { KeyboardDatePicker } from '@material-ui/pickers';
import FilterListIcon from '@material-ui/icons/FilterList';
import moment from 'moment';
import ActionBar from 'components/ActionBar/ActionBar';
import { useTenant } from 'contexts/tenant';
import { useLoading } from 'contexts/loading';
import AnalysisStatusColumnComponent from 'components/DastasetsStatusColumn/ColumnsStatus';
import { TableContainer } from 'containers/TableContainer';
import ScoreSale from 'components/Datasets/ScoreClearSale/ScoreSale';
import { useHeader } from 'contexts/header';
import ModalComponent from 'components/Modal/ModalComponent';

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
	const [rowsPerPage, setRowsPerPage] = useState(localStorage.getItem('rowsPerPage') || 5);
	const [_, setSelectedRows] = useState([]);
	const [enableFilter, setEnableFilter] = useState(false);
	const { loading } = useLoading();
	const { selectedTenant } = useTenant();
	const tableRef = React.useRef(null);
	const isSeletorTenant = !!+window.__RUNTIME_CONFIG__.REACT_APP_SELETOR_TENANTS;
	const isRootTenancy = window.__RUNTIME_CONFIG__.REACT_APP_TENANT_TYPE == '0';
	const useCreditAnalysis = !!+window.__RUNTIME_CONFIG__.REACT_APP_USE_CREDIT_ANALYSIS_DATASET;
	const useComplianceAnalysis = !!+window.__RUNTIME_CONFIG__.REACT_APP_USE_COMPLIANCE_ANALYSIS_DATASET;
	const { setTitle } = useHeader();

	const [toggleModal, setToggleModal] = useState(false);
	const [modalData, setModalData] = useState([]);

	useEffect(() => {
		setTitle("Operações Excluídas");
	}, []);  

	const actions = {
		onRefresh: () => tableRef?.current?.onQueryChange(),
	};

	const onRowsPerPageChange = (page) => {
		setRowsPerPage(page);
		localStorage.setItem('rowsPerPage', page);
	};

	const handleToggleModal = () => {
		setToggleModal(!toggleModal);
	};
  
	const handleRestore = (data) => {
		restoreCreditFromDeleted(data.id);
		handleToggleModal();
		setTimeout(() => {
			return actions.onRefresh();
		}, 500);
	};

	return (
		<ContentContainer>
			{!hideActions && <ActionBar {...actions} hideSubmit={true} />}

			{toggleModal === true && (
				<ModalComponent
					open={toggleModal}
					onClose={handleToggleModal}
					title="Restaurar Operação"
					subtitle="Tem certeza que deseja restaurar essa operação?"
					buttonText="Restaurar"
					children={<></>}
					onClick={() => handleRestore(modalData)}
				/>
			)}

			<TableContainer>
				{!hideActions && <>
					<div className='uk-width-auto@m uk-width-1-1'>
						<div className='uk-width-auto@m uk-width-1-1'>
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
					title={title || "Excluídas"}
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
							icon: 'edit',
							tooltip: 'Restaurar operação',
							position: 'row',
							onClick: (_ev, rowData) => {
								handleToggleModal();
								setModalData(rowData);
							}
						},
					]}
					data={(allParams) =>
						new Promise((resolve, _reject) => {
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
								isDeleted: true,
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

								}).catch(() => {
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
						selection: false,
						showSelectAllCheckbox: false,
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