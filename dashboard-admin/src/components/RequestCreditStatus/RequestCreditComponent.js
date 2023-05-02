import React, { useState } from 'react';
import Accordions from 'components/Accordion/Accordion';
import RequestCreditStatusMasterContainer from 'components/RequestCreditStatus/RequestCreditStatusModal';
import { Grid, Typography, TablePagination, Button, TextField } from '@material-ui/core';
import * as RequestCredit from 'services/creditStatusRequest';
import { ContentContainer, DatePicker, Select } from 'components';
import MaterialTable from 'material-table';
import HelperFormat from 'helpers/format.helpers';
import Helper from 'helpers/message.helpers';
import { localizationOptions } from 'helpers/table.helpers';
import ModalWithLoading from 'components/ModalWithLoading-deprecated/ModalDeprecated';
import { yupResolver } from '@hookform/resolvers/yup';
import { getValidationApproval, defaultValuesApproval } from 'components/RequestCreditStatus/validation';
import { useForm, useFormState } from 'react-hook-form';
import NumberInput from "components/NumberInput/NumberInput";
import getFormFunctions from 'helpers/form-helpers';
import TextFieldComponent from 'components/TextInput/TextField';

const RequestCreditStatus = ({ person }) => {

	const personId = person.id || person.personId;
	const [rowsPerPage, setRowsPerPage] = useState(localStorage.getItem('rowsPerPage') || 5);
	const [modalId, setModalId] = useState(false);
	const { setValue, getValues, watch, control } = useForm({
		resolver: yupResolver(getValidationApproval),
		defaultValues: defaultValuesApproval
	});

	const { errors } = useFormState({ control });

	const { inputBind, inputBindNumber } = getFormFunctions({ validationSchema: getValidationApproval, setValue, control, errors });

	const closeModal = () => {
		setModalId(false);
	};

	const onRowsPerPageChange = (page) => {
		setRowsPerPage(page);
		localStorage.setItem('rowsPerPage', page);
	};

	const onSubmit = () => {
		const formValues = getValues();
		RequestCredit.postCreditApproval(formValues, modalId)
			.then(response => {
				window.location.reload();
				if (response?.data) {
					setModalId(false);
				}
			})
			.catch(error => {
				setModalId(false);
				console.log(error);
			});
	};

	const isRootTenancy = window.__RUNTIME_CONFIG__.REACT_APP_TENANT_TYPE == '0';

	const request = [
		{
			name: 'Limite de Crédito',
			value: 'sol_cred',
			children:
				<><Grid item>
					<Typography><strong> Status: </strong> {Helper.typeStatus(person?.personCreditStatus?.status)}</Typography>
					<Typography><strong> Limite Aprovado: </strong> {HelperFormat.formatCurrency(person?.personCreditStatus?.approvedLimit)}</Typography>
				</Grid>
				<Grid container spacing={2}>
					<ContentContainer>
						<MaterialTable
							title={<strong style={{ fontSize: "20px" }}>Solicitações de Limite de Crédito</strong>}
							columns={[
								{
									title: 'Solicitado em', field: 'createdAt',
									render: ({ createdAt }) => createdAt && new Date(createdAt).toLocaleDateString('pt-BR'),
								},
								{
									title: 'Limite Solicitado', field: 'requestedLimit',
									render: ({ requestedLimit }) => HelperFormat.formatCurrency(requestedLimit)
								},
								{
									title: 'Limite Aprovado', field: 'approvedLimit',
									render: ({ approvedLimit }) => HelperFormat.formatCurrency(approvedLimit)
								},
								{ title: 'Status', field: 'statusDisplay' }								
							].filter(x => x !== undefined)}
							actions={isRootTenancy ? [
								rowData => ({
									icon: 'search',
									tooltip: 'Editar solicitação de limite de crédito ',
									position: 'row',
									onClick: (_, rowData) => setModalId(rowData.id),
									hidden: rowData.status != "Pending"
								})
							] : null}
							data={({ page, pageSize, search }) =>
								new Promise((resolve, reject) => {
									RequestCredit.getCreditStatusRequestList(page, pageSize, search, personId)
										.then(result => {
											if (result)
												resolve({
													data: result.data,
													page: result.page,
													totalCount: result.totalItems,
												});
											else {
												resolve({
													data: [],
													page: 0,
													totalCount: 0,
												});
											}
										}).catch(err => reject(err));
								})
							}
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
						<>{modalId &&
								<ModalWithLoading
									title='Operação'
									onCloseModal={closeModal}>
									<Grid container direction='column' justifyContent='center' spacing={4}>
										<Grid item>
											<Select
												id="action"
												name="action"
												label="Resultado"
												fullWidth
												defaultValue=""
												{...inputBind(`action`)}
												fields={[{ name: 'Reprovado', value: "NOK" }, { name: 'OK', value: "OK" }]} />
										</Grid>
										{watch("action") == "OK" && <Grid item>
											<NumberInput
												id="creditLimit"
												label="Limite de Crédito"
												fullWidth
												name="creditLimit"
												adornmentText="R$"
												{...inputBindNumber("creditLimit")} />
										</Grid>}
										<Grid item>
											<DatePicker
												id="validUntil"
												label="Prazo de validade"
												fullWidth
												variant="inline"
												name="validUntil"
												{...inputBind("validUntil")}
											/>
										</Grid>
										{watch("action") != "OK" && <Grid item>
											<TextFieldComponent
												multiline
												id="message"
												fullWidth
												name="message"
												label="Observações"
												component={TextField}
												{...inputBind(`message`)}
											/>
										</Grid>}
									</Grid>
									<Grid container justifyContent='center' spacing={5}>
										<Grid item >
											<Button color="secondary" variant='contained' onClick={() => onSubmit()}>Enviar</Button>
										</Grid>
									</Grid>
								</ModalWithLoading>
						} </>
					</ContentContainer>
				</Grid>
				<RequestCreditStatusMasterContainer idPerson={person?.id || person.personId} /></>,
			key: 'sol_cred'
		},
	];

	return (
		<Accordions accordions={request} />
	);
};

export default RequestCreditStatus;