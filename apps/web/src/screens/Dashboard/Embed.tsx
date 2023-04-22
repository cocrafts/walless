import { FC } from 'react';
import { Stack, Text } from '@walless/ui';
import SolanaDashboard from 'screens/Dashboard/Solana';
import SuiDashboard from 'screens/Dashboard/Sui';
import { useParams } from 'utils/hooks';

export const Embed: FC = () => {
	const { id } = useParams<'id'>();

	if (id === 'solana') {
		return <SolanaDashboard />;
	} else if (id === 'sui') {
		return <SuiDashboard />;
	}

	return (
		<Stack>
			<Text>EmbeddedApp</Text>
		</Stack>
	);
};

export default Embed;
