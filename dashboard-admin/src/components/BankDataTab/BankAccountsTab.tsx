import React, { forwardRef, useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TextField, MenuItem, Button, Box, InputLabel, Select as SelectUI } from '@material-ui/core';
import MaterialTable from 'material-table';
import { Edit } from "@material-ui/icons";
import { localizationOptions } from '../../helpers/table.helpers';
import { Toast } from "../index";
import { Container } from "assets/style";
import { Autocomplete } from '@material-ui/lab';
import bankCodeFields from './bankCodeFields';
import { CustomInputProps, AutoCompleteProps, BankAccountsTabProps, BankAccountType } from "./types";
import { pixTypes } from 'pages/BankAccountRequest/Details/OptionsFields/options.pixType';
import TextCustomMask from 'components/CustomMaskInput/TextCustomMask';
import Helper from 'helpers/format.helpers';

const Select = ({ options, value, onChange, disabled, defaultValue, required }: CustomInputProps) => {
	return (
		<>
			<InputLabel required={required} shrink style={{ color: 'red' }}>{" "}</InputLabel>
			<SelectUI
				fullWidth
				value={value}
				defaultValue={defaultValue}
				disabled={disabled}
				onChange={onChange}
			>
				{options && options.map(field => (
					<MenuItem key={field.value} value={field.value}>{field.name}</MenuItem>
				))}
			</SelectUI>
		</>
	);
};

const AutoCompleteBankComponent = ({ options, value, disabled, onChange, required }: AutoCompleteProps) => {

	return (
		<>
			<InputLabel required={required} shrink style={{ color: 'red' }}>{" "}</InputLabel>
			<Autocomplete
				disabled={disabled}
				fullWidth
				noOptionsText={'Nenhum registro foi encontrado.'}
				value={value}
				options={options}
				getOptionLabel={(option) => {
					var value = option.value ?? option;
					var found = options?.find(bank => bank.value == value)?.name ?? "";
					return found;
				}}
				renderInput={(params) => { return (<TextField {...params} />); }}
				onChange={onChange}
			/>
		</>
	);
};

const optionsOperation = [
	{ name: "Transferência", value: "Transfer" },
	{ name: "Pix", value: "Pix" }
];

function BankAccountsTab(props: BankAccountsTabProps) {

	const { bankAccounts, setBankAccounts, errors } = props;
	const addbankButton = React.useRef<HTMLDivElement | null>(null);
	const [editingTable, setEditingTable] = useState(false);
	const [isTransfer, setIsTransfer] = useState(true);
	const [isAgAcc, setIsAgAcc] = useState(true);
	const tableRef = React.useRef(null);

	useEffect(() => {
		if (bankAccounts.length < 1 && addbankButton.current) {
			addbankButton.current.click();
			setEditingTable(true);
		}
	}, []);

	const location = useLocation();
	const isLegalPerson = location.pathname.includes('juridica');

	const bankTypeFields = useMemo(() => {
		const fields = [
			{ name: 'Pagamento', value: 'NaturalSimpleAccount' },
			{ name: 'Conta Corrente', value: `${isLegalPerson ? 'Legal' : 'Natural'}CheckingAccount` },
			{ name: 'Poupança', value: `${isLegalPerson ? 'Legal' : 'Natural'}SavingsAccount` }
		];

		if (isLegalPerson) {
			fields.unshift({ name: 'Conta Escrow', value: `EscrowAccount` });
		}
		return fields;
	}, [isLegalPerson]);

	const isBankValid = (data: BankAccountType) => {
		if (data.pixKeyTypeValue === "AgencyAndAccount" && data.bankCode && data.agency && data.account) return true;
		if (data.operationTypeValue && data.pixKeyTypeValue != "AgencyAndAccount" && data.keyPix) return true;
		if (data.bankCode && data.type && data.agency && data.account) return true;

	};

	const handleMessageBankAccount = (isTransfer: Boolean, isAgAcc: Boolean) => {
		isTransfer ? Toast.showErrorMessage("Os seguintes campos são obrigatórios: Banco, Tipo, Agência, Conta e Conta conjunta são obrigatórios.")
			: isAgAcc ? Toast.showErrorMessage("Os seguintes campos são obrigatórios: Banco, Agência e Conta.") :
				Toast.showErrorMessage('Os seguintes campos são obrigatórios: Tipo de Operação, Chave Pix e Tipo de chave Pix.');
	};

	const table = <MaterialTable
		tableRef={tableRef}
		title={<Button onClick={() => {
			if (addbankButton.current) {
				addbankButton.current.click();
				setEditingTable(!!editingTable);
			}
		}} disabled={editingTable} variant="contained" color="primary"> + conta bancária</Button>}
		icons={{
			Add: forwardRef((props, ref) => <div ref={addbankButton} />),
			Edit: forwardRef((props, ref) => {
				return (
					<Edit {...props} onClick={() => {
						setTimeout(() => {
							setEditingTable(!!editingTable);
						}, 10);
					}} ref={ref} />
				);
			}),
		}}
		// @ts-ignore
		columns={[
			{
				title: <div style={{ fontSize: 14, minWidth: 100, display: 'inline-block', textAlign: 'center' }}>Tipo de Operação</div>,
				field: 'operationTypeValue',
				render: ({ operationTypeValue }: BankAccountType) => (optionsOperation?.find(bank => bank.value == operationTypeValue))?.name,
				editComponent: (props: any) => {
					props.value === 'Pix' ? setIsTransfer(false) : setIsTransfer(true);
					var disable = props.value === 'Pix' || props.value === 'Transfer' && true;
					return (
						<Select
							disabled={disable}
							required={true}
							value={props.value}
							defaultValue={false}
							onChange={(event) => {
								props.onChange(event.target.value);
							}}
							options={optionsOperation}
						/>);
				}
			},
			{
				title: <div style={{ fontSize: 14, minWidth: 100, display: 'inline-block', textAlign: 'center' }}>Tipo de chave Pix</div>,
				field: "pixKeyTypeValue",
				render: ({ pixKeyTypeValue }: BankAccountType) => (pixTypes?.find(pix => pix.value == pixKeyTypeValue))?.name,
				editComponent: (props: any) => {
					props.value === 'AgencyAndAccount' ? setIsAgAcc(true) : setIsAgAcc(false);
					var disable = props.value === 'AgencyAndAccount' || props.value === 'LegalRegistrationNumber' ||
						props.value === 'Email' || props.value === 'Phone' || props.value === "NaturalRegistrationNumber" && true;
					return (
						!isTransfer ? <Select
							disabled={disable}
							required={true}
							value={props.value}
							defaultValue={false}
							onChange={(event) => {
								props.onChange(event.target.value);
								event.target.value !== "AgencyAndAccount" && setIsAgAcc(false);
								event.target.value === "AgencyAndAccount" && setIsAgAcc(true);
							}}
							options={pixTypes}
						/> : <></>
					);
				}
			},
			{
				title: <div style={{ fontSize: 14, minWidth: 250, display: 'inline-block', textAlign: 'center' }}>Chave Pix</div>,
				field: "keyPix",
				render: ({ pixKeyTypeValue, keyPix }: BankAccountType) => {
					return pixKeyTypeValue !== "AgencyAndAccount" && (
						<div style={{ fontSize: 14, minWidth: 250, display: 'inline-block', textAlign: 'center' }}>{Helper.formatPixValue(pixKeyTypeValue, keyPix)}</div>
					);
				},
				cellStyle: () => {
					return {
						whiteSpace: 'nowrap',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						maxWidth: 200,
						minWidth: 200,
						width: 200,
					};
				},
				editComponent: (props: any) => {
					return !isTransfer && !isAgAcc ? <TextField
						required
						label=" "
						value={props?.value?.startsWith("+55") ? props?.value?.slice(3) : props?.value}
						placeholder={props.rowData.pixKeyTypeValue == "Phone" ? "11999999999" : "CPF/CNPJ, celular, e-mail ou aleatória"}
						fullWidth
						InputLabelProps={{ style: { color: 'red' }, shrink: true }}
						inputProps={{
							inputComponent: TextCustomMask,
						}}
						onChange={(event) => {
							const value = Helper.formatPixValue(props.rowData.pixKeyTypeValue, event.target.value);
							props.onChange(value);
						}}
					/> : <></>;
				}
			},
			{
				title: <div style={{ fontSize: 14, minWidth: 250, display: 'inline-block', textAlign: 'center' }}>Banco</div>,
				field: 'bankCode',
				render: ({ bankCode }: any) => (bankCodeFields?.find(bank => bank.value == bankCode))?.name,
				cellStyle: () => {
					return {
						whiteSpace: 'nowrap',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						maxWidth: 200,
						minWidth: 200,
						width: 200,
					};
				},
				editComponent: (props: any) => {
					return isTransfer || isAgAcc ? <AutoCompleteBankComponent
						required={true}
						value={props.value}
						options={bankCodeFields}
						onChange={(event, selected) => {
							if (selected && selected.value) {
								props.onChange(selected.value);
							}
						}}
					/> : <></>;
				}
			},
			{
				title: 'Tipo',
				field: 'type',
				render: ({ type }: BankAccountType) => (bankTypeFields?.find(bank => bank.value == type))?.name,
				editComponent: (props: any) => {
					return isTransfer ? <Select
						required={true}
						value={props.value}
						options={bankTypeFields}
						onChange={(event) => props.onChange(event.target.value)}
					/> : <></>;
				}
			},
			{
				title: 'Agência',
				field: 'agency',
				editComponent: (props: any) => {
					return isTransfer || isAgAcc ? <TextField
						required
						label=" "
						placeholder='0000'
						value={props.value}
						InputLabelProps={{ style: { color: 'red' }, shrink: true }}
						onChange={(event) => {
							var value = event.target.value.length > 4 ? event.target.value.substring(0, 4) : event.target.value;
							props.onChange(value);
						}}
					/> : <></>;
				}
			},
			{
				title: 'Conta',
				field: 'account',
				editComponent: (props: any) =>
					isTransfer || isAgAcc ? <TextField
						required
						label=" "
						value={props.value}
						InputLabelProps={{ style: { color: 'red' }, shrink: true }}
						onChange={(event) => props.onChange(event.target.value)}
					/> : <></>
			},
			{
				title: 'Dígito da conta',
				field: 'accountDigit',
				editComponent: (props: any) => (
					isTransfer || isAgAcc ? <TextField
						label=" "
						value={props.value}
						onChange={(event) => {
							var value = event.target.value.length > 1 ? event.target.value.substring(0, 1) : event.target.value;
							props.onChange(value);
						}}
					/> : <></>
				)
			},
			{
				title: 'Conta conjunta',
				field: 'jointAccount',
				render: ({ jointAccount }: BankAccountType) => isTransfer ? jointAccount ? 'Sim' : 'Não' : '',
				editComponent: (props: any) => (
					isTransfer ? <Select
						required={true}
						value={props.value}
						defaultValue={false}
						onChange={(event) => props.onChange(event.target.value)}
						options={[
							{ name: 'Sim', value: true },
							{ name: 'Não', value: false },
						]}
					/> : <></>
				)
			}
		].filter(Boolean)}
		editable={{
			onRowAdd: newData =>
				new Promise((resolve, reject) => {
					if (isBankValid(newData)) {
						setEditingTable(false);
						// @ts-ignore
						setBankAccounts(data => [...data, newData]);
						resolve('');
					} else {
						reject();
						handleMessageBankAccount(isTransfer, isAgAcc);
					}
				}),
			onRowUpdate: (newData, oldData) => {
				setEditingTable(false);
				return new Promise((resolve, reject) => {
					if (isBankValid(newData)) {
						let dataUpdate = [...bankAccounts];
						const index = oldData?.tableData.id as any;
						dataUpdate[index] = newData;
						setBankAccounts([...dataUpdate]);
						resolve('');
					} else {
						reject();
						handleMessageBankAccount(isTransfer, isAgAcc);
					}

				});
			},
			onRowUpdateCancelled: () => {
				return new Promise(resolve => {
					setEditingTable(false);
					resolve('');
				});
			},
			onRowAddCancelled: () => {
				return new Promise(resolve => {
					setEditingTable(false);
					resolve('');
				});
			},
			onRowDelete: oldData =>
				new Promise((resolve, reject) => {
					setEditingTable(false);
					let dataDelete = [...bankAccounts];
					const index = oldData.tableData.id;
					// @ts-ignore
					dataDelete.splice(index, 1);
					setBankAccounts([...dataDelete]);
					resolve('');
				}),
		}}
		options={{
			pageSize: 5,
			pageSizeOptions: [1, 5, 10, 20],
			actionsColumnIndex: -1,
			toolbarButtonAlignment: 'left',
			searchFieldAlignment: 'right',
		}}
		data={bankAccounts}
		localization={localizationOptions}
	/>;

	return (
		<Container>
			<Box p={1}>
				{errors?.bankAccounts?.length > 0 &&
					<p style={{ color: 'red' }}>Banco, Tipo, Agência, Conta e Conta conjunta são obrigatórios.</p>
				}
				{table}
			</Box>
		</Container>
	);
}

export default BankAccountsTab;