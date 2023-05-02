import React, { useState, useEffect } from 'react';
import { Grid, Box, Button } from '@material-ui/core';
import { getValidation, defaultValues } from './validation';
import { useForm, useFormState } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import getFormFunctions from 'helpers/form-helpers';
import ModalWithLoading from 'components/ModalWithLoading-deprecated/ModalDeprecated';
import * as  Cnab from 'services/filesCnab';
import SelectComponent from "components/Select/Select";
import AutocompleteWithSearch from 'components/AutocompleteSearch/AutocompleteSearch';
import { useFund } from 'contexts/fund';
import * as creditNoteService from 'services/creditNote';

function ModalCNAB({ onCloseModal, selectedRows, fundList }) {

	const { getFundsList, fundOptionsList } = useFund();
	const [cnab, setCnab] = useState("");
	const { handleSubmit, setValue, getValues, control, watch } = useForm({
		resolver: yupResolver(getValidation(cnab)),
		defaultValues: defaultValues(cnab)
	});
	const isRootTenancy = window.__RUNTIME_CONFIG__.REACT_APP_TENANT_TYPE == '0';
	var formCnab = watch("cnab");

	useEffect(() => {
		setCnab(formCnab);
	}, [formCnab]);

	const { errors } = useFormState({ control });

	const { inputBind } = getFormFunctions({ validationSchema: getValidation(cnab), setValue, control, errors });

	const cnab400 = async () => {
		await Cnab.postCNAB400(selectedRows.map(row => row.id))
			.then(result => {
				return window.open(result.data.tempUrl, "_blank");
			});
	};

	const cnab400B = async () => {
		await Cnab.postCNAB400B(selectedRows.map(row => row.id))
			.then(result => {
				return window.open(result.data.tempUrl, "_blank");
			});
	};

	const cnab444 = async () => {
		const fundId = getValues("fundId");
		await Cnab.postCNAB444(selectedRows.map(row => row.id), fundId)
			.then(result => {
				return window.open(result.data.tempUrl, "_blank");
			});
	};

	const cnab500 = async () => {
		const fundId = getValues("fundId");
		await Cnab.postCNAB500(selectedRows.map(row => row.id), fundId)
			.then(result => {
				return window.open(result.data.tempUrl, "_blank");
			});
	};

	const cnab550 = async () => {
		const fundId = getValues("fundId");
		await Cnab.postCNAB550(selectedRows.map(row => row.id), fundId)
			.then(result => {
				return window.open(result.data.tempUrl, "_blank");
			});
	};

	const reportLiquidation = async () => {
		await Cnab.liquidationFileWebCred(selectedRows.map(row => row.id))
			.then(result => {
				return window.open(result.data.tempUrl, "_blank");
			});
	};

	const reportVortx = async () => {
		await creditNoteService.generateVortx(selectedRows.map(row => row.id))
			.then(result => {
				return window.open(result.tempUrl, "_blank");
			});
	};

	const cnabType = [
		isRootTenancy ? { name: 'Relatório de Liquidação', value: "liquidationFile" } : undefined,
		isRootTenancy ? { name: 'Remessa Vortx', value: "Vortx"} : undefined,
		{ name: 'CNAB 400', value: "Cnab400" },
		{ name: 'CNAB 400B', value: "Cnab400B" },
		{ name: 'CNAB 444', value: "Cnab444" },
		{ name: 'CNAB 500', value: "Cnab500" },
		{ name: 'CNAB 550', value: "Cnab550" },
	].filter(x => x !== undefined);

	return (
		<ModalWithLoading title={'Selecione o tipo de relatório'} onCloseModal={onCloseModal}>
			<form style={{ margin: "10px" }}
				onSubmit={handleSubmit(values => {
					const selectedValue = values.cnab;
					switch (selectedValue) {
						case "Cnab400":
							cnab400();
							break;
						case "Cnab400B":
							cnab400B();
							break;
						case "Cnab444":
							cnab444();
							break;
						case "Cnab500":
							cnab500();
							break;
						case "Cnab550":
							cnab550();
							break;
						case "liquidationFile":
							reportLiquidation();
							break;
						case "Vortx":
							reportVortx();
							break;
					}
				})}
			>
				<Box py={3}>
					<Grid item >
						<SelectComponent
							id="cnab"
							name="cnab"
							label="Tipo de Relatório"
							{...inputBind("cnab")}
							defaultValue={false}
							fields={cnabType}
						/>
					</Grid>
					<br />
					{(watch("cnab") == "Cnab500" || watch("cnab") == "Cnab444" || watch("cnab") == "Cnab550") && <Grid item >
						<AutocompleteWithSearch
							id="fundId"
							name="fundId"
							displayField="fundIdDisplay"
							fullWidth
							label="Fundo Cessionário"
							watch={watch}
							setValue={setValue}
							rowData={{ fundId: selectedRows?.fundId, fundIdDisplay: selectedRows?.fundIdDisplay }}
							params={{
								page: 0,
								size: 10
							}}
							fetch={getFundsList}
							options={fundOptionsList}
							{...inputBind(`fundId`)}
							onChange={(ev, options) => {
								setValue("fundId", options?.value || '');
								setValue("fundIdDisplay", options?.name || '');
							}}
						/>
					</Grid>}
				</Box>
				<Grid container justifyContent='center' spacing={5}>
					<Grid item>
						<Button color="secondary" type="submit" variant='contained' >Enviar</Button>
					</Grid>
				</Grid>
			</form>
		</ModalWithLoading>

	);
}
export default ModalCNAB;
