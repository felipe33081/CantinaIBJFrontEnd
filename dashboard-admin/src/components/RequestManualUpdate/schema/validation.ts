import { object, string } from "yup";

const genericRequired = 'Esse campo é obrigatório.';

export const validationSchema = object().shape({

	newStatus: string().typeError("Não é um status válido.").required("Novo Status: Precisa ser preenchido."),
	newTimelineType: string().when("timelineAction", {
		is: (value: string) => value != "" && value == "EndAndCreateNew",
		then: string().typeError("Não é um tipo de timeline válido.").required("Novo Tipo de Timeline: Precisa ser preenchido."),
		otherwise: string().nullable().notRequired()
	}),
	newTimelineDescription: string().when("timelineAction", {
		is: (value: string) => value != "" && value == "EndAndCreateNew",
		then: string().typeError("Não é uma descrição válida.").required("Nova Descrição: Precisa ser preenchida."),
		otherwise: string().nullable().notRequired()
	}),
	workflowAction: string().nullable(),
	timelineAction: string().nullable(),
});

export const defaultValues = {
	newStatus: null,
	timelineAction: 'None',
	workflowAction: 'None',	
	newTimelineType: 'Finished',
	newTimelineDescription: null
};