import type { FC } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import SectionContainer from 'components/SectionContainer';
import { resources } from 'utils/config';

import { sharedStyles } from '../shared';

import TopDeveloper from './TopDeveloperSection';

export const Developer: FC = () => {
	return (
		<SectionContainer style={styles.container}>
			<TopDeveloper />
			<Text style={[sharedStyles.title, styles.title]}>
				Deliver seamless and unique experience to your users
			</Text>
			<Text style={styles.subText}>
				Other Game studio can use our SDK and release our customized layout on
				Walless on our layout store
			</Text>
			<Image source={resources.home.developer.main} style={styles.mainImage} />
			<View horizontal style={styles.stepContainer}>
				<Text style={styles.stepLabel}>1. Access to @walless/SDK</Text>
				<Text style={styles.stepLabel}>2. Submit your layout</Text>
				<Text style={styles.stepLabel}>3. Notify your user your layout</Text>
			</View>
		</SectionContainer>
	);
};

export default Developer;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	title: {
		maxWidth: 650,
		marginTop: 15,
		textAlign: 'center',
	},
	subText: {
		maxWidth: 720,
		marginTop: 15,
		textAlign: 'center',
		fontSize: 20,
		opacity: 0.5,
	},
	mainImage: {
		width: 900,
		marginTop: 40,
		height: 'auto',
		aspectRatio: 1258 / 739,
	},
	stepContainer: {
		marginTop: 30,
		justifyContent: 'center',
	},
	stepLabel: {
		paddingHorizontal: 30,
		color: '#566674',
		fontWeight: '500',
	},
});
