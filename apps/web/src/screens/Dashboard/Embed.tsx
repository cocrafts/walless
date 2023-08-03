import type { FC } from 'react';
import { Stack, Text } from '@walless/ui';
import SolanaDashboard from 'screens/Dashboard/Solana';
import SuiDashboard from 'screens/Dashboard/Sui';
import { useParams } from 'utils/hooks';

import TezosDashboard from './Tezos';
import { TRexRunner } from './TRexRunner';

export const Embed: FC = () => {
	const { id } = useParams<'id'>();

	if (id === 'solana') {
		return <SolanaDashboard />;
	} else if (id === 'sui') {
		return <SuiDashboard />;
	} else if (id === '000004') {
		return <TRexRunner />;
	} else if (id === 'tezos') {
		return <TezosDashboard />;
	}

	return (
		<Stack>
			<Text>EmbeddedApp</Text>
		</Stack>
	);
};

export default Embed;
