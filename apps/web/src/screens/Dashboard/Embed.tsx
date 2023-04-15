import { FC } from 'react';
import { Stack, Text } from '@walless/gui';
import SolanaDashboard from 'screens/Dashboard/Solana';
import SuiDashboard from 'screens/Dashboard/Sui';
import { useParams } from 'utils/hooks';

type params = 'network' | 'variant';

export const Embed: FC = () => {
	const { network, variant } = useParams<params>();

	if (network === 'solana') {
		return <SolanaDashboard variant={variant} />;
	} else if (network === 'sui') {
		return <SuiDashboard variant={variant} />;
	}

	return (
		<Stack>
			<Text>EmbeddedApp</Text>
		</Stack>
	);
};

export default Embed;
