import { StyleSheet } from 'react-native';

import type { MissionBoxType } from './internal';

export const sharedStyle = StyleSheet.create({
	componentContainer: {
		paddingHorizontal: 15,
	},
});

export const missionBoxWidth = 140;

export const mockMission: MissionBoxType[] = [
	{
		title: 'Create project',
		colors: ['#EC74A2', '#F4B999'],
	},
	{
		title: 'Invite 5 firends',
		colors: ['#906AF5', '#D763F5'],
	},
	{
		title: 'Game Design',
		colors: ['#66C9EB', '#5D79D3'],
	},
];
