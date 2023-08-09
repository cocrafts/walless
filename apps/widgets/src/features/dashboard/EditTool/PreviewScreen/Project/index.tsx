import type { FC } from 'react';
import { View } from '@walless/gui';

import ScreenContainer from '../components/ScreenContainer';

import LayoutCard from './LayoutCard';
import SearchBar from './SearchBar';
import SkeletonLayoutCard from './SkeletonLayoutCard';

const Project: FC = () => {
	return (
		<ScreenContainer>
			<View>
				<View>
					<SearchBar />
				</View>
				<LayoutCard />
				<View>
					<SkeletonLayoutCard />
				</View>
			</View>
		</ScreenContainer>
	);
};

export default Project;
