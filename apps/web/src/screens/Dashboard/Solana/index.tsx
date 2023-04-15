import { FC } from 'react';
import { Stack, Text } from '@walless/gui';

interface Props {
	variant?: string;
}

export const SolanaDashboard: FC<Props> = () => {
	return (
		<Stack>
			<Text>SolanaDashboard</Text>
		</Stack>
	);
};

export default SolanaDashboard;
