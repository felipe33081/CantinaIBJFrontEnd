import React from 'react';
import { ComponentMeta, ComponentStory } from "@storybook/react";
import DatePicker from "../DatePicker";
import {InputController} from "../../TextInput/stories/InputController";
import PickersProvider from "./PickersProvider";
import CenterView from "./CenterView";

export default {
	title: 'Components/DatePicker',
	component: DatePicker,
	decorators: [InputController(false), PickersProvider, CenterView]
} as ComponentMeta<typeof DatePicker>;

const Template: ComponentStory<typeof DatePicker> = (args) => <DatePicker {...args} />;

export const defaultView = Template.bind({});

defaultView.args = {
	label: 'Data',
	name: 'datePicker'
};
