export type ActionBarProps = {
    onAssign?: () => void,
    onSavePermission?: () => void,
    onResetPassword?: () => void,
    onDisableMFA?: () => void,
    onPrint?: () => void,
    onPaymentRevision?: () => void,
    onGenerateAssignment?: () => void,
    onCancel?: () => void;
    onCreateCNAB?: () => void;
    onRecoverSimulate?: () => void;
    onCreateDraft?: () => void;
    onPreview?: { tempUrl: string };
    onCreateAssignment?: () => void;
    onAssignmentPreview?: { tempUrl: string };
    onReport?: { result: string };
    onDelete?: () => void;
    onSimulate?: () => void;
    onUpdateFiles?: () => void;
    onSendApproval?: () => void;
    onSendApprovalRevision?: () => void;
    onSendNotification?: () => void;
    onCredPayOperationWebhook?: () => void;
    onGeneratePaymentLink?: () => void;
    onSendEmail?: () => void;
    OnApproveInstrument?: () => void;
    onApprove?: () => void;
    onReject?: () => void;
    onSignature?: () => void;
    onApproveSignature?: () => void;
    onRejectSignature?: () => void;
    onApproveLiquid?: () => void;
    onClone?: () => void;
    onRefresh?: () => void;
    onExportPdf?: () => void;
    onExportXlsx?: () => void;
    onManualUpdate?: () => void,
    disableExportPdf?: boolean,
    disableExportXlsx?: boolean,
    disableSendNotification?:boolean;
    disableCredPayOperationWebhook?: boolean;
    disableGeneratePaymentLink?: boolean;
    disableApproveOrReject?: boolean;
    disableGenerateAssignment?: boolean;
    disableSendApproval?: boolean;
    disableSendApprovalRevision?: boolean;
    disableClone?: boolean;
    disableOnApproveInstrument?: boolean;
    disabledAll?: boolean;
    hideSubmit?: boolean;
    isDirty?: boolean;
    sendDocs?: boolean;
    isRootTenancy?: boolean;
    useAssignment?: boolean;
    useScan3?: boolean;
  };