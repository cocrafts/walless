import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import type { Networks } from '@walless/core';
import { View } from '@walless/gui';

import { FullHistoryFeature } from '../../Profile';

interface Props {
	network: Networks;
}

const ActivityTab: FC<Props> = ({ network }) => {
	return (
		<View style={styles.container}>
			<FullHistoryFeature network={network} />
		</View>
	);
};

export default ActivityTab;

const styles = StyleSheet.create({
	container: {
		paddingVertical: 8,
	},
});
