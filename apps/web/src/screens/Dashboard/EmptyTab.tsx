import { FC } from 'react';
import { Stack, Text } from '@walless/ui';

export const EmptyTab: FC = () => {
	return (
		<Stack>
			<Text textAlign="center" color="#566674" fontSize={13} marginTop={120}>
				Not available yet
			</Text>
		</Stack>
	);
};

export default EmptyTab;
