import { FC } from 'react';
import { Stack, Text } from '@walless/gui';

import SearchBar from './SearchBar';

export const ProfileScreen: FC = () => {
	const handleSearch = (value: string) => {
		console.log(value);
	};

	return (
		<Stack>
			<Stack
				display="flex"
				alignItems="center"
				gap={24}
				paddingHorizontal={14}
				paddingVertical={20}
			>
				<Text fontSize={20} lineHeight={26} fontWeight="500">
					Choose a layout to start
				</Text>

				<SearchBar
					placeholder="Explore exciting project"
					onSearch={handleSearch}
				/>
			</Stack>
		</Stack>
	);
};

export default ProfileScreen;
