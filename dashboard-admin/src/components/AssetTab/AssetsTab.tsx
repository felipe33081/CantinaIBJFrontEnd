import React, { useEffect, forwardRef } from 'react';
import { Box, Select, TextField, InputAdornment, MenuItem, Button } from '@material-ui/core';
import MaterialTable from 'material-table';
import { localizationOptions } from '../../helpers/table.helpers';
import NumberFormat from 'react-number-format';
import Helper from 'helpers/format.helpers';
import { AssetTabProps, NumberInputProps, SelectProps, AssetType } from 'components/AssetTab/types';

const SelectComponent = ({ fields, value, onChange, disabled }: SelectProps) => {
	return (
		<>
			<Select
				fullWidth
				value={value}
				// component={() => <TextField />}
				disabled={disabled}
				onChange={onChange}
			>
				<MenuItem value={""}></MenuItem>
				{fields && fields.map(field => (
					<MenuItem key={field.value} value={field.value}>{field.name}</MenuItem>
				))}
			</Select>
		</>
	);
};

const NumberInput = ({ value, onChange, disabled }: NumberInputProps) => {
	return (
		<>
			<NumberFormat
				customInput={TextField}
				fixedDecimalScale={true}
				thousandSeparator="."
				onValueChange={(event) => onChange(Number(event.value) * 100)}
				decimalSeparator=","
				decimalScale={2}
				defaultValue={value}
				disabled={disabled}
				fullWidth
				InputProps={{
					startAdornment: <InputAdornment position="start">R$  </InputAdornment>,
				}}
			/>
		</>
	);
};

const assetTypeFields = [
	{ name: 'Selecione', value: '' },
	{ name: 'Dinheiro', value: 'Cash' },
	{ name: 'Contas a receber', value: 'AccountsReceivable' },
	{ name: 'Inventário', value: 'Inventory' },
	{ name: 'Investimentos', value: 'Investments' },
	{ name: 'Veículos', value: 'Vehicles' },
	{ name: 'Mobília', value: 'Furniture' },
	{ name: 'Patente', value: 'Patents' },
	{ name: 'Imóvel', value: 'RealEstate ' },
];


function AssetTab(props: AssetTabProps) {

	const { assets, setAssets } = props;
	const addAssetButton = React.useRef<HTMLDivElement | null>(null);
	const [editingTable, setEditingTable] = React.useState(false);
	const [rowsPerPage, setRowsPerPage] = React.useState(5);

	useEffect(() => {
		if (assets.length < 1 && addAssetButton.current) {
			addAssetButton.current.click();
			setEditingTable(true);
		}
	}, []);


	let actions = [
		{
			icon: 'delete',
			tooltip: 'Excluir documento',
			onClick: (event: any, rowData: AssetType | AssetType[]) => deleteAsset(rowData)
		}

	];

	const deleteAsset = function (rowData: AssetType | AssetType[]) {
		if (Array.isArray(rowData)) {
			setAssets([]);
		}
		if (!Array.isArray(rowData) && rowData.id) {
			let index = assets.map(f => f.id).indexOf(rowData.id);
			assets.splice(index, 1);
			setAssets([...assets]);
		}
	};


	const onRowsPerPageChange = (page: number) => {
		setRowsPerPage(page);
	};


	const table = <MaterialTable
		title={<Button onClick={() => {
			addAssetButton.current && addAssetButton.current.click();
			setEditingTable(true);

		}} disabled={editingTable} variant="contained" color="primary"> + bem ou direito</Button>}
		icons={{
			Add: forwardRef((props, ref) => <div ref={addAssetButton} />)
		}}
		editable={{
			onRowAdd: newData =>
				new Promise((resolve, reject) => {
					setTimeout(() => {
						setEditingTable(false);
						setAssets([...assets, newData]);
						resolve('');
					}, 1000);
				}),
			onRowUpdate: (newData, oldData) => {
				return new Promise(resolve => {
					if (oldData) {
						// @ts-ignore
						let index = assets.map(f => f.id ? f.id : f.tableData.id).indexOf(oldData.id ? oldData.id : oldData.tableData.id);
						let newAssets = [...assets];
						newAssets[index] = newData;
						setAssets(newAssets);
						setEditingTable(false);
					}
					resolve('');
				});
			},
			onRowAddCancelled: () => {
				return new Promise(resolve => {
					setEditingTable(false);
					resolve('');
				});
			},
		}}
		columns={[
			{
				title: 'Descrição',
				field: 'description',
				cellStyle: { textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: 200 },
				editComponent: (props) => {
					return (<TextField
						fullWidth={true}
						value={props.value}
						onChange={(event) => props.onChange(event.target.value)}
					/>);
				}
			},
			{
				title: 'Valor estimado',
				field: 'estimatedValue',
				render: ({ estimatedValue }) => Helper.formatCurrency(estimatedValue),
				editComponent: (props) => {
					return (<NumberInput
						value={props.value}
						onChange={(event) => props.onChange(event)}
					/>);
				}
			},
			{
				title: 'Quitado',
				field: 'settled',
				render: ({ settled }) => settled ? 'Sim' : 'Não',
				editComponent: props => (
					<SelectComponent
						value={props.value}
						onChange={(event) => props.onChange(event.target.value)}
						fields={[
							{ name: 'Selecione', value: '' },
							{ name: 'Sim', value: true },
							{ name: 'Não', value: false },
						]}
					/>
				)
			},
			{
				title: 'Tipo',
				field: 'assetType',
				render: ({ assetType }) => (assetTypeFields?.find(asset => asset.value == assetType))?.name,
				editComponent: props => (<SelectComponent
					value={props.value}
					fields={assetTypeFields}
					onChange={(event) => props.onChange(event.target.value)}

				/>)
			},
		]}
		// onRowsPerPageChange={onRowsPerPageChange}
		actions={actions}
		options={{
			pageSize: rowsPerPage,
			pageSizeOptions: [1, 5, 10, 20],
			actionsColumnIndex: -1,
			toolbarButtonAlignment: 'left',
			search: false
		}}
		data={assets}
		localization={localizationOptions}
	/>;


	return (
		<>
			<Box p={1}>
				{table}
			</Box>
		</>
	);
}

export default AssetTab;