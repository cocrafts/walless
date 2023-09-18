import type { FC } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import SolanaDashboard from 'screens/Dashboard/Solana';
import SuiDashboard from 'screens/Dashboard/Sui';
import { useParams } from 'utils/hooks';

import AptosDashboard from './Aptos';
import { KoalaGacha } from './KoalaGacha';
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
	} else if (id === '000003') {
		return (
			<Image
				style={styles.image}
				source={{ uri: '/img/explore/ur-mock-layout.png' }}
				resizeMode="cover"
			/>
		);
	} else if (id === '000005') {
		return <KoalaGacha />;
	} else if (id === 'aptos') {
		return <AptosDashboard />;
	}

	return (
		<View>
			<Text>EmbeddedApp</Text>
		</View>
	);
};

export default Embed;

const styles = StyleSheet.create({
	image: {
		width: 352,
		height: 600,
	},
});
