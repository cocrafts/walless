import { StyleSheet } from 'react-native';
import { aptosState } from '@walless/engine';
import { View } from '@walless/gui';
import { useSnapshot } from 'valtio';

import DirectTransfer from './DirectTransfer';

const AptosTokensTab = () => {
	const aptosSnap = useSnapshot(aptosState);

	return (
		<View style={styles.container}>
			<DirectTransfer directTransfer={aptosSnap.directTransfer} />
		</View>
	);
};

export default AptosTokensTab;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		rowGap: 10,
		paddingTop: 16,
		paddingBottom: 60,
	},
});
