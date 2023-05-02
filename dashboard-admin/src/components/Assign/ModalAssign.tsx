import AutocompleteWithSearch from 'components/AutocompleteSearch/AutocompleteSearch';
import { Button, Grid, Typography } from '@material-ui/core';
import { yupResolver } from '@hookform/resolvers/yup';
import getFormFunctions from 'helpers/form-helpers';
import { useOperator } from 'contexts/operator';
import { useGroup } from 'contexts/group';
import { useForm, useFormState, FieldValues } from 'react-hook-form';
import { validationSchema, defaultValues } from './schema/validation';
import Toast from 'components/Toast/Toast';
import { assign } from 'services/assign';
import { useTenant } from 'contexts/tenant';
import ModalComponent from 'components/Modal/ModalComponent';
import React from 'react';
import AutocompleteLocal from 'components/Autocomplete/Autocomplete';

export default function ModalAssign({ recordType, recordId, onCloseModal }: any) {

	const { getTenantList, tenantList, selectedTenant, setSelectedTenant } = useTenant();
	const { operatorOptionList, getOperatorList } = useOperator();
	const { groupOptionList, getGroupList } = useGroup();

	const { handleSubmit, setValue, control, watch } = useForm({
		resolver: yupResolver(validationSchema),
		defaultValues: defaultValues
	});

	const { errors } = useFormState({ control });

	const { inputBind } = getFormFunctions({ validationSchema, setValue, control, errors });

	const handleAssign = async (values: FieldValues) => {
		const { userId, groupName } = values;
		assign(recordType, recordId, userId, groupName, selectedTenant).then(resp => {
			Toast.showSuccessMessage("Atribuido com sucesso.");
			onCloseModal(), window.location.reload();
		}).catch(err => console.log("Error:", err));
	};

	const onSubmit = (values: FieldValues) => {
		handleAssign(values);
	};

	const onError = (values: FieldValues) => {
		Toast.showErrorMessage("Há campos inválidos, por favor verifique os valores digitados.");
		console.log(values);
	};

	return (
		<ModalComponent
			title="Atribuir"
			subtitle="Selecione um correspondente, operador ou grupo"
			onClose={onCloseModal}
			open={true}
			enableButton={false}
			children={
				<>
					<form
						onSubmit={handleSubmit(onSubmit, onError)}
					>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<AutocompleteLocal
									id="tenant"
									label="Correspondente"
									params={{
										page: 0,
										size: 10
									}}
									fetch={getTenantList}
									options={tenantList}
									{...inputBind(`tenant`)}
									onChange={(_: any, options: { id: string, name: string }) => {
										setValue("tenant", options?.id || '');
										setValue("tenantDisplayName", options?.name || '');
										setSelectedTenant(options);
									}} />
							</Grid>
							<Grid item xs={12}>
								<AutocompleteWithSearch
									endAdornment={undefined}
									id="userId"
									displayField="username"
									label="Operadores"
									watch={watch}
									setValue={setValue}
									params={{
										page: 0,
										size: 10
									}}
									fetch={getOperatorList}
									options={operatorOptionList}
									{...inputBind(`userId`)}
									onChange={(_: React.ChangeEvent<HTMLInputElement>, options: { id: string, name: string }) => {
										setValue('username', options?.name);
										setValue('userId', options?.id);
									}}
								/>
							</Grid>
							<Grid item xs={12}>
								<AutocompleteWithSearch
									endAdornment={undefined}
									//@ts-ignore
									id="groupName"
									//@ts-ignore
									name="groupName"
									displayField="groupName"
									label="Grupos"
									watch={watch}
									setValue={setValue}
									fetch={getGroupList}
									options={groupOptionList}
									params={{
										page: 0,
										size: 10
									}}
									{...inputBind(`groupName`)}
									onChange={(_: any, options: any) => {
										setValue("groupName", options?.groupName || '');
										
									}} />
							</Grid>
						</Grid>
						<Grid container justifyContent='center' spacing={10}>
							<Grid item >
								<Button color="primary" variant='contained' type='submit' fullWidth size='large'>
									<Typography style={{ textTransform: 'none' }} component="span" >Atribuir
									</Typography>
								</Button>
							</Grid>
						</Grid>
					</form>
				</>
			}
		/>

	);
}