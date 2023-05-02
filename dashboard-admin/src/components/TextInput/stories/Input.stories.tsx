import React from 'react';
import { ComponentStory, ComponentMeta } from "@storybook/react";
import TextFieldComponent from "../TextField";
import {InputController} from "./InputController";
import CenterView from "../../DatePicker/stories/CenterView";

export default {
	title: 'Components/TextInput',
	component: TextFieldComponent,
	decorators: [InputController(false), CenterView],
} as ComponentMeta<typeof TextFieldComponent>;

const Template: ComponentStory<typeof TextFieldComponent> = (args) => <TextFieldComponent {...args} />;

export const defaultView = Template.bind({});
export const inputWithError = Template.bind({});

defaultView.args = {
	label: 'Input label',
	name: 'input',
	errors: { message: null },
	fieldAreaHeight: 48,
	style: { width: 400 },
};

inputWithError.args = {
	label: 'Input label 2',
	name: 'input',
	errors: { message: 'Campo obrigatório' },
	fieldAreaHeight: 48,
	style: { width: 400 },
};