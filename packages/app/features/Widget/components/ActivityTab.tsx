import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import type { Networks } from '@walless/core';

import { FullHistoryFeature } from '../../Profile';

interface Props {
	network: Networks;
}

const ActivityTab: FC<Props> = ({ network }) => {
	return (
		<ScrollView style={styles.container}>
			<FullHistoryFeature network={network} />
		</ScrollView>
	);
};

export default ActivityTab;

const styles = StyleSheet.create({
	container: {
		paddingVertical: 8,
	},
});
