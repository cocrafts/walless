import type { FC } from 'react';
import { StyleSheet } from 'react-native';
import { FullHistoryFeature } from '@walless/app';
import type { Networks } from '@walless/core';

interface Props {
	network: Networks;
}

const ActivityTab: FC<Props> = ({ network }) => {
	return <FullHistoryFeature style={styles.container} network={network} />;
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
