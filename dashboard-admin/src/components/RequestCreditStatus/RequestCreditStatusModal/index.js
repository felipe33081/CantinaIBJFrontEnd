import { Box, Button, Grid } from '@material-ui/core';
import React, { useState } from 'react';
import ModalWithLoading from 'components/ModalWithLoading-deprecated/ModalDeprecated';
import * as RequestCredit from 'services/creditStatusRequest';
import AutocompleteWithSearch from 'components/AutocompleteSearch/AutocompleteSearch';
import { yupResolver } from '@hookform/resolvers/yup';
import { getValidationSchemaCreditRequest, defaultValuesCreditRequest } from 'components/RequestCreditStatus/RequestCreditStatusModal/Validation';
import getFormFunctions from 'helpers/form-helpers';
import { useForm, useFormState } from 'react-hook-form';
import NumberInput from "components/NumberInput/NumberInput";
import { useProduct } from 'contexts/product';

function RequestCreditStatusModal({
	idPerson
}) {
	const [modal, setModal] = useState(false);
	const { getProductsList, productOptionsList } = useProduct();
	const { handleSubmit, setValue, watch, getValues, control } = useForm({
		resolver: yupResolver(getValidationSchemaCreditRequest),
		defaultValues: defaultValuesCreditRequest(idPerson)
	});

	const { errors } = useFormState({ control });

	const closeModal = () => {
		setModal(false);
	};

	const openModal = () => {
		setModal(true);
	};

	const onSubmit = (values) => {
		const formValues = getValues();
		RequestCredit.postCreditStatusRequest(formValues)
			.then(response => {
				window.location.reload();
				if (response?.data) {
					setModal(false);
				}
			})
			.catch(error => {
				setModal(false);
				console.log(error);
			});
	};
	const { inputBind, inputBindNumber } = getFormFunctions({ validationSchema: getValidationSchemaCreditRequest, setValue, control, errors });

	return (
		<>
			{modal &&
				<form>
					<ModalWithLoading
						title='Solicitar Crédito'
						onCloseModal={closeModal}>
						<Grid>
							<AutocompleteWithSearch
								id="productId"
								name="productId"
								displayField="productIdDisplay"
								fullWidth
								label="Produto"
								watch={watch}
								setValue={setValue}
								fetch={getProductsList}
								options={productOptionsList}
								params={{
									page: 0,
									size: 10
								}}
								{...inputBind(`productId`)}
								onChange={(_, options) => {
									setValue("productId", options?.value || '');
									setValue("productIdDisplay", options?.name || '');
								}}
							/>
						</Grid>
						<br />
						<Grid container direction='column' justifyContent='center' spacing={8}>
							<Grid item>
								<NumberInput
									id="requestedLimit"
									label="Valor solicitado"
									fullWidth
									name="requestedLimit"
									adornmentText="R$"
									{...inputBindNumber("requestedLimit")}
								/>
							</Grid>
						</Grid>
						<Grid container justifyContent='center' spacing={10}>
							<Grid item>
								<Button color="secondary" variant='contained' onClick={handleSubmit(onSubmit)}>Enviar</Button>
							</Grid>
						</Grid>
					</ModalWithLoading>
				</form>
			}
			<Box p={3}>
				<Grid container spacing={2}>
					<Grid item xs={3}>
						<Button onClick={openModal} color="primary" variant="contained" fullWidth>Solicitar</Button>
					</Grid>
				</Grid>
			</Box>
		</>

	);
}

export default RequestCreditStatusModal;