import ModalComponent from "components/Modal/ModalComponent";
import DatePicker from "components/DatePicker/DatePicker";
import { yupResolver } from '@hookform/resolvers/yup';
import getFormFunctions from 'helpers/form-helpers';
import { Controller, useForm, useFormState, FieldValues } from 'react-hook-form';
import { validationSchema, defaultValues } from './schema/validation';
import Toast from 'components/Toast/Toast';
import { useTenant } from 'contexts/tenant';
import { manualUpdateBankAccount } from 'services/bankAccount';
import SelectComponent from 'components/Select/Select';
import TextFieldComponent from 'components/TextInput/TextField';
import { Grid, FormGroup, FormControlLabel, Box } from '@material-ui/core';
import { optionsNewStatus } from "./OptionsFields/optoins.credit.newStatus";
import { optionsActionsFields } from "./OptionsFields/options.actions";
import { optionsNewTimeline } from "./OptionsFields/options.creditNewTimeLine";
import { manualUpdateCreditNote, sendWebCredCreditNote } from 'services/creditNote';
import { optionsBankAccNewTimeLine } from "./OptionsFields/options.bankAcc.newTimeLine";
import { optionsBankAccNewStatus } from "./OptionsFields/options.bankAcc.newStatus";
import Button from "components/Button/Button";
import CheckboxComponent from "components/CheckBox/Checkbox";

const ModalManualUpdate = (props: any) => {
	const { open, recordId, recordType, handleOpen, onCloseModal } = props;
	const { selectedTenant } = useTenant();
	const { handleSubmit, setValue, control, watch } = useForm({
		resolver: yupResolver(validationSchema),
		defaultValues: defaultValues
	});

	const { errors } = useFormState({ control });

	const { inputBind } = getFormFunctions({ validationSchema, setValue, control, errors });

	const handleCreditNot = async (values: FieldValues) => {
		const { sendWebCred } = values;
		manualUpdateCreditNote(recordId, values, selectedTenant).then(resp => {

			if (sendWebCred) {
				sendWebCredCreditNote(recordId);
			}
			Toast.showSuccessMessage("Atualizado com sucesso.");
		}).finally(() => onCloseModal(true));
	};

	const handleBankAccount = async (values: FieldValues) => {
		manualUpdateBankAccount(recordId, values, selectedTenant).then(resp => {
			Toast.showSuccessMessage("Atualizado com sucesso.");
		}).finally(() => onCloseModal(true));
	};

	// @ts-ignore
	const onSubmit = (values: FieldValues) => {
		handleOpen();
		recordType == "BankAccountRequest" ? handleBankAccount(values) : handleCreditNot(values);
	};

	const onError = (values: FieldValues) => {
		Toast.showErrorMessage("Há campos inválidos, por favor verifique os valores digitados.");
		console.log('values error', values);
	};

	function HandleForm() {

		return (
			<form
				onSubmit={handleSubmit(onSubmit, onError)}
			>
				<Grid container spacing={3}>
					<Grid item xs={12}>
						<SelectComponent
							id="newStatus"
							label="Novo Status"
							{...inputBind("newStatus")}
							defaultValue=""
							fields={recordType == "BankAccountRequest" ? optionsBankAccNewStatus : optionsNewStatus}
						/>
					</Grid>
					<Grid item xs={12}>
						<SelectComponent
							id="timelineAction"
							label="Atualizar linha do tempo"
							{...inputBind("timelineAction")}
							defaultValue="None"
							fields={optionsActionsFields}
						/>
					</Grid>
					{watch('timelineAction') == 'EndAndCreateNew' && <>
						<Grid item xs={12}>
							<SelectComponent
								id="newTimelineType"
								label="Selecione a etapa da linha do tempo"
								{...inputBind("newTimelineType")}
								defaultValue="Finished"
								fields={recordType == "BankAccountRequest" ? optionsBankAccNewTimeLine : optionsNewTimeline}
							/>
						</Grid>
						<Grid item xs={12}>
							<Controller
								render={({ field }) => (
									<>
										<Grid item xs={12}>
											<TextFieldComponent
												id="newTimelineDescription"
												fullWidth
												type="text"
												label="Descrição da linha do tempo"
												margin="dense"
												multiline={true}
												rows={3}
												fieldAreaHeight={90}
												{...inputBind("newTimelineDescription")}
												required={true}
											/>
										</Grid>
									</>)}
								control={control}
								name="newTimelineDescription" />
						</Grid>
					</>}
					<Grid item xs={12}>
						<SelectComponent
							id="workflowAction"
							label="Encerrar esteira"
							{...inputBind("workflowAction")}
							defaultValue="None"
							fields={optionsActionsFields}
						/>
					</Grid>
					{watch('newStatus') === 'Finished' && <DatePicker
						disablePast={false}
						id="acceptanceDate"
						label="Data de liquidação"
						variant="inline"
						fullWidth
						InputLabelProps={{ shrink: true, required: true }}
						{...inputBind("acceptanceDate")}
						name="acceptanceDate"
						disableFuture={false}
					/>}
					{recordType != "BankAccountRequest" &&
						<Grid item xs={12}>
							<FormGroup>
								<FormControlLabel
									control={
										//@ts-ignore
										<CheckboxComponent
											id="sendWebCred"
											{...inputBind("sendWebCred")}
										/>}
									label="Integrar operação com WebCred" />
							</FormGroup>
						</Grid>}
				</Grid>

				<br />
				<Grid container justifyContent='center' spacing={10}>
					<Grid item>
						<Button
							variant="contained"
							type="submit"
							children={"Atualizar"}
						/>
					</Grid>
				</Grid>
			</form>
		);
	};

	return (
		<ModalComponent
			open={open}
			onClose={onCloseModal}
			title="Atualização Manual"
			subtitle="Tem certeza que deseja atualizar manualmente?"
			enableButton={false}
			children={<HandleForm />}
			onClick={function (): void {
				throw new Error("Function not implemented.");
			}} />
	);

};

export default ModalManualUpdate;