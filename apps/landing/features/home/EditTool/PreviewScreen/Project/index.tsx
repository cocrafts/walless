import { type FC } from 'react';
import { Stack } from '@walless/ui';

import ScreenContainer from '../components/ScreenContainer';

import LayoutCard from './LayoutCard';
import SearchBar from './SearchBar';
import SkeletonLayoutCard from './SkeletonLayoutCard';

const Project: FC = () => {
	return (
		<ScreenContainer>
			<Stack paddingVertical={28}>
				<Stack marginBottom={20}>
					<SearchBar />
				</Stack>

				<LayoutCard />

				<Stack marginTop={28}>
					<SkeletonLayoutCard />
				</Stack>
			</Stack>
		</ScreenContainer>
	);
};

export default Project;
