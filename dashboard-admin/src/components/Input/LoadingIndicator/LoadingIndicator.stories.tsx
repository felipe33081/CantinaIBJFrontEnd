import React from 'react';
import { ComponentMeta, ComponentStory } from "@storybook/react";
import LoadingIndicator from ".";

export default {
	title: 'Components/LoadingIndicator',
	component: LoadingIndicator,
} as ComponentMeta<typeof LoadingIndicator>;

const Template: ComponentStory<typeof LoadingIndicator> = (args) => <LoadingIndicator {...args} />;

export const defaultView = Template.bind({});

defaultView.args = {
	type: 'circular'
};