import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import type { ActionMetadata } from '@walless/graphql';
import type { HistoryItem } from '@walless/graphql';

import { extractDataFromMetadata } from '../internal';

interface Props {
	style?: ViewStyle;
	data: HistoryItem;
}

const Item: FC<Props> = ({ style, data }) => {
	const extractedMetadata = extractDataFromMetadata(
		data.action!.metadata as ActionMetadata[],
	);

	return (
		<View style={[styles.container, style]}>
			<Text style={styles.dateText}>
				{new Date(data.doneAt).toLocaleString()}
			</Text>

			<View style={styles.horizontalSpaceBetweenContainer}>
				<Text style={styles.mainText}>{extractedMetadata.name}</Text>
				<Text style={styles.pointText}>
					+ {data.action?.points || 0} points
				</Text>
			</View>
		</View>
	);
};

export default Item;

const styles = StyleSheet.create({
	container: {
		gap: 8,
	},
	dateText: {
		fontSize: 14,
		color: '#798997',
	},
	horizontalSpaceBetweenContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	mainText: {
		fontSize: 16,
		color: 'white',
	},
	pointText: {
		fontSize: 14,
		color: '#2FC879',
	},
});
