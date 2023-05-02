import { object, string } from "yup";

const genericRequired = 'Esse campo é obrigatório.';

export const validationSchema = object().shape({
	userId: string().when("groupName", {
		is: (value: string) => value === "",
		then: string().typeError("Operador: Precisa ser preenchido.").required(genericRequired),
		otherwise: string().nullable().notRequired()
	}),
	groupName: string().when("userId", {
		is: (value: string) => value === "",
		then: string().typeError("Grupo: Precisa ser preenchido.").required(genericRequired),
		otherwise: string().nullable().notRequired()
	}),
	tenant: string().when(["userId", "groupName"], {
		is: (id: string, groupName: string) => id === "" && groupName === "",
		then: string().typeError("Tenant: Precisa ser preenchido.").required(genericRequired),
		otherwise: string().nullable().notRequired(),
	})
}, [['userId', 'groupName']]);

export const defaultValues = {
	username: "",
	tenantDisplayName: "",
	userId: "",
	groupName: "",
	tenant: ""
};