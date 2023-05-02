import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import AccordionComponent from "./Accordion";

export default {
	title: 'Components/Accordion',
	component: AccordionComponent,
} as ComponentMeta<typeof AccordionComponent>;

const Template: ComponentStory<typeof AccordionComponent> = (args) => <AccordionComponent {...args} />;

export const defaultView = Template.bind({});

defaultView.args = {
	title: 'Teste',
	accordions: [
		{ name: 'Item 1' },
		{ name: 'Item 2' },
		{ name: 'Item 3', children: <h1>Lorem ipsum</h1> },
	],
};