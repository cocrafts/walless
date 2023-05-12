import { StyleSheet } from 'react-native';
import { type SlideOption } from '@walless/gui';

import One from './One';
import Two from './Two';

export const slides: SlideOption[] = [
	{
		id: 'one',
		component: One,
	},
	{
		id: 'two',
		component: Two,
	},
];

export const sharedStyles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 50,
	},
});
