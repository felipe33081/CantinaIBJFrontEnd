import { Box, MenuItem, TextField } from '@material-ui/core';
import React, { useMemo } from 'react';
import { useDropzone } from 'react-dropzone';
import MaterialTable from 'material-table';
import { localizationOptions } from 'helpers/table.helpers';
import { Select } from '@material-ui/core';
import * as uploadService from 'services/files';
import typeOfDocument from 'global/enums/typeOfDocument';

const baseStyle = {
	cursor: 'pointer',
	flex: 1,
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	padding: '20px',
	borderWidth: 2,
	borderRadius: 2,
	borderColor: '#eeeeee',
	borderStyle: 'dashed',
	backgroundColor: '#fafafa',
	color: '#bdbdbd',
	outline: 'none',
	transition: 'border .24s ease-in-out'
};

const activeStyle = {
	borderColor: '#2196f3'
};

const acceptStyle = {
	borderColor: '#00e676'
};

const rejectStyle = {
	borderColor: '#ff1744'
};


const SelectComponent = ({ fields, value, onChange, disabled }) => {
	return (
		<>
			<Select
				fullWidth
				value={value}
				component={TextField}
				disabled={disabled}
				{...(onChange && { onChange })}
			>
				<MenuItem value={""}></MenuItem>
				{fields && fields.map(field => (
					<MenuItem key={field.value} value={field.value}>{field.name}</MenuItem>
				))}
			</Select>
		</>
	);
};

export function UploadTab(props) {
	const { readOnly, files, setFiles, showDropzone = true, editable = true } = props;

	const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
		accept: 'image/*,.pdf,.doc,.docx,.xlsx,.xsl,.rar,.zip',
		onDrop: async acceptedFiles => {
			acceptedFiles.map(async file => {
				Toast.showSuccessMessage("Iniciando upload");
				let responseUrlSigned = await uploadService.getSignedUrl(file.name).then(response => {
					return response?.data;
				});
				await uploadService.uploadFile(file, responseUrlSigned.putUrl).then(_ => {
					Toast.showSuccessMessage("Upload concluído");
					setFiles(prevState => ([
						...prevState, {
							id: null,
							displayName: file.name,
							tempUrl: responseUrlSigned.getUrl,
							fileName: responseUrlSigned.filename,
							fileType: "Document"
						}
					]));
				});
			});
		}
	});

	const deleteFile = function (rowData) {
		let index = files.map(f => f.fileName).indexOf(rowData.fileName);
		files.splice(index, 1);
		setFiles([...files]);
	};

	let actions = [
		{
			icon: 'search',
			tooltip: 'Abrir documento',
			onClick: (_, rowData) => window.open(rowData.tempUrl, "_blank")
		},
		rowData => ({
			icon: 'delete',
			tooltip: 'Excluir documento',
			onClick: (_, rowData) => { deleteFile(rowData); },
			hidden: rowData.id != null && readOnly
		})
	];

	const table = <MaterialTable
		title={props.title || "Documentos"}
		{...(editable && {
			editable: {
				onRowUpdate: (newData, oldData) =>
					new Promise(resolve => {
						let index = oldData.tableData.id;
						let newFiles = [...files];
						newFiles[index] = newData;
						setFiles(newFiles);
						resolve();
					})
			}
		})}
		columns={[
			{
				title: 'Nome',
				field: 'displayName',
				cellStyle: { textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', maxWidth: 300 },
				editComponent: (props) => {
					return (<TextField
						fullWidth
						value={props.value}
						onChange={(event) => props.onChange(event.target.value)}
					/>);
				}
			},
			{
				title: 'Tipo',
				field: 'fileType',
				render: ({ fileType }) => (typeOfDocument?.find(asset => asset.value == fileType))?.name,
				editComponent: props => (
					<SelectComponent
						value={props.value}
						onChange={(event) => props.onChange(event.target.value)}
						fields={typeOfDocument}
					/>
				)
			},
			{
				title: 'Data de criação',
				field: 'createdAt',
				render: ({ createdAt }) => createdAt && new Date(createdAt).toLocaleString('pt-BR'),
				editComponent: props => {
					return false;
				}
			}
		]}
		actions={actions}
		options={{
			pageSize: files?.length > 2 ? 5 : 2,
			pageSizeOptions: [2, 5, 10, 20],
			actionsColumnIndex: -1
		}}
		data={files}
		localization={localizationOptions}
	/>;

	const style = useMemo(() => ({
		...baseStyle,
		...(isDragActive ? activeStyle : {}),
		...(isDragAccept ? acceptStyle : {}),
		...(isDragReject ? rejectStyle : {})
	}), [
		isDragActive,
		isDragReject,
		isDragAccept
	]);

	return (
		<>
			{showDropzone && <Box p={2}>
				<div {...getRootProps({ style })}>
					<input {...getInputProps()} />
					<p>Arraste e solte alguns arquivos para carregar, ou clique para escolher</p>
				</div>
			</Box>}
			<Box p={1}>
				{table}
			</Box>
		</>
	);
}

import * as Icons from "@material-ui/icons";
import Toast from 'components/Toast/Toast';

export default function DynamicIcon({ iconName }) {
	const Icon = Icons[iconName];
	return Icon ? <><Icon /><span>{iconName}</span></> : <span>{iconName}</span>;
};
