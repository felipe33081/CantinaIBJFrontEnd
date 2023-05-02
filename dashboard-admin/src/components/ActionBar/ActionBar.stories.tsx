import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ActionBar from "./ActionBar";

export default {
	title: 'Components/ActionBar',
	component: ActionBar,
} as ComponentMeta<typeof ActionBar>;

const Template: ComponentStory<typeof ActionBar> = (args) => <ActionBar {...args} />;

export const defaultView = Template.bind({});

defaultView.args = {};
