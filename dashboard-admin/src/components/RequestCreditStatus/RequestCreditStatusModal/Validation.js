import { string, object, number } from 'yup';

export const getValidationSchemaCreditRequest = object().shape({
	personId: string(),
	productId: string().nullable(),
	requestedLimit: number().typeError('Valor precisa ser um número.')


});

export const defaultValuesCreditRequest = (personId) => {
	return {
		personId: personId,
		productId: null,
		requestedLimit: 0
	};
};
