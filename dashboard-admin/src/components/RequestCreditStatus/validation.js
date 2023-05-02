import { string, object, number, date } from 'yup';

export const getValidationApproval = object().shape({
	creditStatusRequestId: string(),
	action: string(),
	creditLimit: number().typeError('Valor precisa ser um número.').nullable(),
	validUntil: date().typeError('Data inválida'),
	message: string().nullable()

});

export const defaultValuesApproval = {
	creditStatusRequestId: "",
	action: null,
	creditLimit: 0,
	validUntil: new Date().toDateString(),
	message: null
};
