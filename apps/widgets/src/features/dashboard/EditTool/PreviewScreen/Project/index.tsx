import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '@walless/gui';
import { Search } from '@walless/icons';

import ScreenContainer from '../components/ScreenContainer';

import LayoutCard from './LayoutCard';
import SkeletonLayoutCard from './SkeletonLayoutCard';

const Project: FC = () => {
	return (
		<ScreenContainer>
			<View style={styles.search}>
				<Search size={20} color="#293642" />
			</View>
			<LayoutCard />
			<SkeletonLayoutCard />
		</ScreenContainer>
	);
};

export default Project;

const styles = StyleSheet.create({
	search: {
		padding: 8,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: '#364654',
		paddingVertical: 10,
	},
});
