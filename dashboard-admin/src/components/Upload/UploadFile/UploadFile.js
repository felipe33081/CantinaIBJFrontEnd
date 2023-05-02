import React, { useMemo } from 'react';
import * as uploadService from 'services/files';
import { useDropzone } from 'react-dropzone';
import Toast from 'components/Toast/Toast';
import { Alert } from '@material-ui/lab';

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
	transition: 'border .24s ease-in-out',
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

const UploadUpdateFile = (props) => {
	const { showDropzone = true, currentUpload, fieldName, setValue } = props;

	const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
		accept: '.docx',
		onDrop: async acceptedFiles => {
			acceptedFiles.map(async file => {
				Toast.showSuccessMessage("Iniciando upload");
				let responseUrlSigned = currentUpload?.putUrl;
				if (responseUrlSigned == undefined) {
					await uploadService.getSignedUrl(file.name).then(response => {
						setValue(`${fieldName}.displayName`, file.name);
						setValue(`${fieldName}.fileName`, response?.data?.filename);
						setValue(`${fieldName}.fileType`, "Document");
						setValue(`${fieldName}.tempGetUrl`, response?.data?.getUrl);
						setValue(`${fieldName}.tempPutUrl`, response?.data?.putUrl);
						responseUrlSigned = response?.data?.putUrl;
					});
				}
				await uploadService.uploadFile(file, responseUrlSigned).then(_ => {
					Toast.showSuccessMessage("Upload concluído");
				}).catch(_ =>
					Toast.showErrorMessage("Não foi possivel realizar o Upload")
				);
			});
		}
	});

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
			{showDropzone &&
                <div style={{ width: "100%" }}>
                	<p style={{ textAlign: "center" }}>
                		{currentUpload?.fileName ? <Alert severity="warning">Atenção, o documento {currentUpload.fileName} será atualizado!</Alert> : <>Carregando novo documento</>}
                	</p>
                	<div {...getRootProps({ style })}>
                		<input {...getInputProps()} />
                		<p>Arraste e solte alguns arquivos para carregar, ou clique para escolher</p>
                	</div>
                </div>
			}
		</>
	);
};

export default UploadUpdateFile;