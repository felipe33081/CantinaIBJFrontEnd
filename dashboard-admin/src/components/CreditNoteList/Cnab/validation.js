import { string, object } from 'yup';

export const getValidation = (cnab) => {
	switch (cnab) {
		case "Cnab500":
			return object().shape({
				fundId: string().required('Esse campo é obrigatório.'),
				cnab: string().required('Esse campo é obrigatório.')
			});
		case "Cnab444":
			return object().shape({
				cnab: string().required('Esse campo é obrigatório.')
			});
		case "Cnab400":
			return object().shape({
				cnab: string().required('Esse campo é obrigatório.')
			});
		case "Cnab550":
			return object().shape({
				cnab: string().required('Esse campo é obrigatório.')
			});
		case "liquidationFile":
			return object().shape({
				cnab: string().required('Esse campo é obrigatório.')
			});
		default:
			return object().shape({
				fundId: string().nullable(),
				cnab: string().required('Esse campo é obrigatório.')
			});
	}
};

export const defaultValues = (cnab) => {
	switch (cnab) {
		case "Cnab500":
			return {
				fundId: "",
				cnab: "Cnab500"
			};
		case "Cnab550":
			return {
				fundId: "",
				cnab: "Cnab550"
			};
		case "Cnab444":
			return {
				cnab: "Cnab444"
			};
		case "Cnab400":
			return {
				cnab: "Cnab400"
			};
		case "liquidationFile":
			return {
				cnab: "liquidationFile"
			};
		default:
			return {
				cnab: ""
			};
	}
};