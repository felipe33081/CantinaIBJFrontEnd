import PropTypes from 'prop-types';
import { ImageOutlined, DeleteForeverOutlined, SendOutlined, ThumbUpOutlined, ThumbDownOutlined, FileCopyOutlined } from '@material-ui/icons';
import { Box, Button, Grid, Typography } from '@material-ui/core';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import RefreshOutlined from '@material-ui/icons/RefreshOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import InsertDriveFileOutlinedIcon from '@material-ui/icons/InsertDriveFileOutlined';
import UpdateRoundedIcon from '@material-ui/icons/UpdateRounded';
import CancelScheduleSendIcon from '@material-ui/icons/CancelScheduleSend';
import PrintIcon from '@material-ui/icons/Print';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import NotificationsIcon from '@material-ui/icons/Notifications';
import PdfIcon from "../../assets/icons/PDFIcon";
import UploadIcon from "../../assets/icons/UploadIcon";
import PaymentIcon from '@material-ui/icons/Payment';
import InsertLinkIcon from '@material-ui/icons/InsertLink';
import { OperatorsIcon, SecurityIcon } from '../../assets';
import { ActionBarProps } from './types';

const ActionBar = (props: ActionBarProps) => {
	const {
		onAssign,
		onManualUpdate,
		onSavePermission,
		onResetPassword,
		onDisableMFA,
		onPrint,
		onPaymentRevision,
		onGenerateAssignment,
		onCancel,
		onCreateCNAB,
		onRecoverSimulate,
		onCreateDraft,
		onPreview,
		onCreateAssignment,
		onAssignmentPreview,
		onReport,
		onDelete,
		onSimulate,
		onUpdateFiles,
		onSendApproval,
		onSendApprovalRevision,
		onSendNotification,
		onCredPayOperationWebhook, 
		onGeneratePaymentLink,
		onSendEmail,
		OnApproveInstrument,
		onApprove,
		onReject,
		onSignature,
		onApproveSignature,
		onRejectSignature,
		onApproveLiquid,
		onClone,
		onRefresh,
		onExportPdf,
		onExportXlsx,
		disableGeneratePaymentLink = false,
		disableExportPdf = false,
		disableExportXlsx = false,
		disableApproveOrReject = false,
		disableGenerateAssignment = false,
		disableSendApproval = false,
		disableSendApprovalRevision = false,
		disableSendNotification = false, 
		disableCredPayOperationWebhook = false,
		disableClone = false,
		disableOnApproveInstrument = false,
		disabledAll,
		hideSubmit = false,
		isDirty
	} = props;

	const disabledOnreject = (OnApproveInstrument && disableApproveOrReject && disableOnApproveInstrument) || (onApprove && disableOnApproveInstrument && disableApproveOrReject);

	return (
		<Box mb={2} className="disablePrint">
			<Grid container spacing={1}>
				{onUpdateFiles && <Grid item>
					<Button className="button-send" color="primary" variant="contained" disabled={disabledAll} onClick={onUpdateFiles || disabledAll}>
						<UpdateRoundedIcon />&nbsp;
						<Typography component='span' style={{ color: "white", textTransform: 'none' }}>Atualizar Docs</Typography>
					</Button>
				</Grid>}

				{!hideSubmit && !onUpdateFiles &&
					<Grid item>
						<Button className="button-actionBar" type="submit" variant="contained" disabled={disabledAll} style={{ backgroundColor: isDirty == true ? "#f50057" : "#5F5F5F" }}>
							<SaveOutlinedIcon style={{ color: "#fff" }} />
							<Typography component="span" style={{ color: "white", textTransform: 'none', }} >&nbsp;Salvar</Typography>
						</Button>
					</Grid>
				}

				{onSavePermission && <Grid item>
					<Button className="button-large" color="primary" variant="contained" disabled={disabledAll} onClick={onSavePermission || disabledAll} style={{ backgroundColor: "#5F5F5F" }}>
						<SaveOutlinedIcon />
						<Typography component="span" style={{ color: "white", textTransform: 'none' }} >&nbsp;Salvar Permissões</Typography>
					</Button>
				</Grid>}

				{onResetPassword &&
					<Grid item>
						<Button className="button-actionBar" variant="contained" onClick={onResetPassword} color="primary">
							<VpnKeyIcon />
							<Typography component="span" style={{ color: "white", textTransform: 'none', }} >&nbsp;Resetar Senha</Typography>
						</Button>
					</Grid>}

				{onDisableMFA &&
					<Grid item>
						<Button className="button-large" variant="contained" onClick={onDisableMFA} color="primary">
							<LockOutlinedIcon />
							<Typography component="span" style={{ color: "white", textTransform: 'none', }} >&nbsp;Desabilitar MFA</Typography>
						</Button>
					</Grid>}

				{onRefresh &&
					<Grid item>
						<Button className="button-actionBar" variant="contained" onClick={onRefresh} style={{ backgroundColor: "#5F5F5F" }}>
							<RefreshOutlined style={{ color: "white" }} />
							<Typography component="span" style={{ color: "white", textTransform: 'none', }} >&nbsp;Atualizar</Typography>
						</Button>
					</Grid>}

				{onCreateDraft && !onPreview && <Grid item>
					<Button className="button-actionBar" variant="contained" disabled={disabledAll} onClick={onCreateDraft || disabledAll} style={{ backgroundColor: "#5F5F5F" }}>
						<InsertDriveFileOutlinedIcon style={{ color: "white" }} />
						<Typography component="span" style={{ color: "white", textTransform: 'none' }} >&nbsp;Gerar Contrato</Typography>
					</Button>
				</Grid>}

				{onPreview && <Grid item>
					<Button className="button-large" variant="contained" size="large" color="primary" target="_blank" disabled={disabledAll} href={onPreview?.tempUrl} style={{ backgroundColor: "#5F5F5F" }}>
						<VisibilityOutlinedIcon style={{ color: "white" }} />
						<Typography component="span" style={{ color: "white", textTransform: 'none' }} >&nbsp;Exibir Contrato</Typography>
					</Button>
				</Grid>}

				{onCreateAssignment && !onAssignmentPreview && <Grid item>
					<Button className="button-show-docs" variant="contained" size="large" color="primary" disabled={disabledAll} onClick={onCreateAssignment || disabledAll} style={{ backgroundColor: "#5F5F5F" }}>
						<InsertDriveFileOutlinedIcon style={{ color: "white" }} />
						<Typography component="span" style={{ color: "white", textTransform: 'none' }} >&nbsp;Gerar Cessão</Typography>
					</Button>
				</Grid>}

				{onAssignmentPreview && <Grid item>
					<Button className="button-show-docs" variant="contained" size="large" color="primary" target="_blank" disabled={disabledAll} href={onAssignmentPreview?.tempUrl} style={{ backgroundColor: "#5F5F5F" }}>
						<VisibilityOutlinedIcon style={{ color: "white" }} />
						<Typography component="span" style={{ color: "white", textTransform: 'none' }} >&nbsp;Exibir Cessão</Typography>
					</Button>
				</Grid>}

				{onReport && <Grid item>
					<Button className='button-large' variant="contained" size="large" color="primary" target="_blank" disabled={disabledAll} href={onReport?.result} style={{ backgroundColor: "#5F5F5F" }}>
						<VisibilityOutlinedIcon style={{ color: "white" }} />
						<Typography component="span" style={{ color: "white", textTransform: 'none' }} >&nbsp;Relatório de Crédito</Typography>
					</Button>
				</Grid>}

				{onRecoverSimulate && <Grid item>
					<Button className='button-large' variant="contained" size="large" disabled={disabledAll} onClick={onRecoverSimulate} style={{ backgroundColor: "#FFFFFF" }}>
						<ImageOutlined style={{ color: "#5F5F5F" }} />
						<Typography component="span" style={{ color: "#5F5F5F", textTransform: 'none', }}>&nbsp;Recuperar simulação</Typography>
					</Button>
				</Grid>}

				{onSimulate && <Grid item>
					<Button className="button-actionBar" variant="contained" disabled={!onSimulate || disabledAll} onClick={onSimulate} style={{ backgroundColor: "#FFFFFF" }}>
						<ImageOutlined style={{ color: "#5F5F5F" }} />
						<Typography component="span" style={{ color: "#5F5F5F", textTransform: 'none', }}>&nbsp;Simular</Typography>
					</Button>
				</Grid>}

				{onDelete && <Grid item>
					<Button className="button-actionBar" color="secondary" variant="contained" disabled={!onDelete || disabledAll} onClick={onDelete}>
						<DeleteForeverOutlined />
						<Typography component="span" style={{ color: "white", textTransform: 'none', }}>Excluir</Typography>
					</Button>
				</Grid>}

				{onClone && <Grid item>
					<Button className="button-actionBar" color="primary" variant="contained" disabled={disableClone} onClick={onClone}>
						<FileCopyOutlined /><Typography component="span" style={{ textTransform: 'none' }} >&nbsp;Clonar</Typography>
					</Button>
				</Grid>}

				{onSendApproval && <Grid item>
					<Button className='button-large' color="primary" variant="contained" disabled={disableSendApproval} onClick={onSendApproval || disabledAll}>
						<SendOutlined />
						<Typography component="span" style={{ textTransform: 'none' }} >&nbsp;Enviar para aprovação</Typography>
					</Button>
				</Grid>}

				{onSendApprovalRevision && <Grid item>
					<Button className='button-large' color="primary" variant="contained" disabled={disableSendApprovalRevision} onClick={onSendApprovalRevision || disabledAll}>
						<SendOutlined />
						<Typography component="span" style={{ textTransform: 'none' }} >&nbsp;Concluir Revisão</Typography>
					</Button>
				</Grid>}

				{onSendEmail && <Grid item>
					<Button className="button-send" color="primary" variant="contained" disabled={disabledAll} onClick={onSendEmail || disabledAll}>
						<MailOutlineIcon />
						<Typography component="span" style={{ textTransform: 'none' }} >&nbsp;Enviar Docs</Typography>
					</Button>
				</Grid>}

				{OnApproveInstrument && <Grid item>
					<Button className='button-large' color="primary" variant="contained" disabled={disableOnApproveInstrument} onClick={OnApproveInstrument || disabledAll}>
						<ThumbUpOutlined />
						<Typography component="span" style={{ textTransform: 'none' }} >&nbsp;Aprovar Instrumento</Typography>
					</Button>
				</Grid>}

				{onApprove && <Grid item>
					<Button className="button-actionBar" color="primary" variant="contained" disabled={disableApproveOrReject} onClick={onApprove || disabledAll}>
						<ThumbUpOutlined />
						<Typography component="span" style={{ textTransform: 'none' }} >&nbsp;Aprovar</Typography>
					</Button>
				</Grid>}

				{onApproveLiquid && <Grid item>
					<Button className="button-actionBar" color="primary" variant="contained" onClick={onApproveLiquid || disabledAll}>
						<ThumbUpOutlined />
						<Typography component="span" style={{ color: "white", textTransform: 'none' }} >&nbsp;Aprovar</Typography>
					</Button>
				</Grid>}

				{onReject && <Grid item>
					<Button className="button-actionBar" color="secondary" variant="contained" disabled={disabledOnreject} onClick={onReject || disabledAll}>
						<ThumbDownOutlined />
						<Typography component="span" style={{ textTransform: 'none' }} >&nbsp;Rejeitar</Typography>
					</Button>
				</Grid>}

				{onCancel && <Grid item>
					<Button className="button-actionBar" color="secondary" variant="contained" disabled={!onCancel || disabledAll} onClick={onCancel}>
						<CancelScheduleSendIcon />
						<Typography component="span" style={{ textTransform: 'none', }}>&nbsp;Cancelar</Typography>
					</Button>
				</Grid>}

				{onCreateCNAB && <Grid item>
					<Button className="button-actionBar" type="submit" variant="contained" color="primary" disabled={disabledAll} onClick={onCreateCNAB || disabledAll} style={{ backgroundColor: "#5F5F5F" }}>
						<InsertDriveFileOutlinedIcon style={{ color: "white" }} />
						<Typography component="span" style={{ color: "white", textTransform: 'none' }} >&nbsp;Gerar Relatório</Typography>
					</Button>
				</Grid>}

				{onGenerateAssignment && <Grid item>
					<Button className='button-large' variant="contained" size="large" style={disableGenerateAssignment ? {} : { backgroundColor: "#5F5F5F" }} disabled={disableGenerateAssignment} onClick={onGenerateAssignment}>
						<PlayCircleOutlineIcon style={disableGenerateAssignment ? {} : { color: "white" }} />
						<Typography component="span" style={disableGenerateAssignment ? { textTransform: 'none' } : { color: "white", textTransform: 'none' }} >&nbsp;Iniciar Cessão em lote</Typography>
					</Button>
				</Grid>}

				{onSignature && <Grid item>
					<Button className='button-large' color="primary" variant="contained" onClick={onSignature || disabledAll}>
						<SendOutlined />&nbsp;
						<Typography component='span' style={{ color: "white", textTransform: 'none' }}>Concluir assinaturas</Typography>
					</Button>
				</Grid>}

				{onApproveSignature && <Grid item>
					<Button className='button-large' color="primary" variant="contained" onClick={onApproveSignature || disabledAll}>
						<ThumbUpOutlined />&nbsp;
						<Typography component="span" style={{ color: "white", textTransform: 'none' }} >Aprovar assinaturas</Typography>
					</Button>
				</Grid>}

				{onRejectSignature && <Grid item>
					<Button className='button-large' color="secondary" variant="contained" onClick={onRejectSignature || disabledAll}>
						<ThumbDownOutlined />&nbsp;
						<Typography component="span" style={{ color: "white", textTransform: 'none' }} >Rejeitar assinaturas</Typography>
					</Button>
				</Grid>}

				{onPaymentRevision && <Grid item>
					<Button className="button-send" color="primary" variant="contained" onClick={onPaymentRevision || disabledAll}>
						<SendOutlined />&nbsp;
						<Typography component="span" style={{ color: "white", textTransform: 'none' }} >Concluir Revisão</Typography>
					</Button>
				</Grid>}

				{onExportPdf && <Grid item>
					<Button className="button-large" variant="contained" disabled={disableExportPdf} onClick={onExportPdf} style={{ backgroundColor: "#AD0B00"}}>
						<PdfIcon />&nbsp;
						<Typography component="span" style={{ color: "white", textTransform: 'none' }} >Exportar PDF</Typography>
					</Button>
				</Grid>}

				{onExportXlsx && <Grid item>
					<Button className="button-large" variant="contained" disabled={disableExportXlsx} onClick={onExportXlsx} style={{ backgroundColor: "#4BB543"}}>
						<UploadIcon />&nbsp;
						<Typography component="span" style={{ color: "white", textTransform: 'none' }} >Exportar Planilha</Typography>
					</Button>
				</Grid>}

				{onPrint && <Grid item>
					<Button className="button-actionBar" variant="contained" disabled={disabledAll} onClick={onPrint} style={{ backgroundColor: "#5F5F5F" }}>
						<PrintIcon style={{ color: "#fff" }} /><Typography component="span" style={{ color: "white", textTransform: 'none', }} >&nbsp;Imprimir</Typography>
					</Button>
				</Grid>}

				{onAssign && <Grid item>
					<Button className="button-actionBar" color="primary" variant="contained" disabled={disabledAll} onClick={onAssign || disabledAll}>
						<OperatorsIcon />
						<Typography component="span" style={{ textTransform: 'none' }} >&nbsp;Atribuir</Typography>
					</Button>
				</Grid>}

				{onManualUpdate && <Grid item>
					<Button className="button-actionBar" color="primary" variant="contained" disabled={disabledAll} onClick={onManualUpdate || disabledAll}>
						<SecurityIcon />
						<Typography component="span" style={{ textTransform: 'none' }} >&nbsp;Atualizar</Typography>
					</Button>
				</Grid>}

				{onSendNotification && <Grid item>
					<Button className='button-actionBar' style={{whiteSpace: "nowrap"}} color="primary" variant="contained" disabled={disableSendNotification} onClick={onSendNotification || disabledAll}> 
						<NotificationsIcon />
						<Typography component="span" style={{ textTransform: 'none' }}>&nbsp; Enviar signatário </Typography>
					</Button>
				</Grid>}

				{onCredPayOperationWebhook && <Grid item>
					<Button className='button-actionBar' color="primary" variant="contained" disabled={disableCredPayOperationWebhook} onClick={onCredPayOperationWebhook || disabledAll}>
						<PaymentIcon />
						<Typography component="span" style={{ textTransform: 'none' }}>&nbsp; Verificar Pagamento </Typography>
					</Button>
				</Grid>}

				{onGeneratePaymentLink && <Grid item>
					<Button className='button-actionBar' color="primary" variant="contained" disabled={disableGeneratePaymentLink} onClick={onGeneratePaymentLink || disabledAll}>
						<InsertLinkIcon />
						<Typography component="span" style={{ textTransform: 'none' }}>&nbsp; Gerar link de pagamento </Typography>
					</Button>
				</Grid>}
			</Grid>
		</Box >

	);
};

ActionBar.propTypes = {
	type: PropTypes.string,
};

ActionBar.defaultProps = {
	type: 'text',
};

export default ActionBar;