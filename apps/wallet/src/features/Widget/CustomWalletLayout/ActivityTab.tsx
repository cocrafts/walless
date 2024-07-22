import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import type { Networks } from '@walless/core';
import HistoryFeature from 'features/History';

interface Props {
	network: Networks;
}

const ActivityTab: FC<Props> = ({ network }) => {
	return <HistoryFeature style={styles.container} network={network} />;
};

export default ActivityTab;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginVertical: 16,
		borderRadius: 10,
		overflow: 'hidden',
	},
});
