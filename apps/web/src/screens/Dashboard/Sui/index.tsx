import { FC } from 'react';
import { Stack, Text } from '@walless/gui';

interface Props {
	variant?: string;
}

export const SuiDashboard: FC<Props> = () => {
	return (
		<Stack>
			<Text>SuiDashboard</Text>
		</Stack>
	);
};

export default SuiDashboard;
