import React from 'react';
import {ComponentMeta, ComponentStory} from '@storybook/react';
import AssetTab from "./AssetsTab";
import { ASSET_TYPES } from 'components/AssetTab/types';

export default {
	title: 'Componentes/AssetTab',
	component: AssetTab,
} as ComponentMeta<typeof AssetTab>;

const Template: ComponentStory<typeof AssetTab> = (args) => <AssetTab {...args} />;

export const defaultView = Template.bind({});

defaultView.args = {
	assets: [{ description: 'aa', estimatedValue: 0, settled: false, assetType: ASSET_TYPES.CASH, id: '1' }],
	setAssets: () => null,
};