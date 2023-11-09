import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { ScrollView, StyleSheet } from 'react-native';
import { mockWidgets } from '@walless/engine';
import { Text, View } from '@walless/gui';
import type { WidgetDocument } from '@walless/store';

import { useSafeAreaInsets } from '../../utils/hooks';

import WidgetItem from './components/WidgetItem';

interface Props {
	widgets?: WidgetDocument[];
}

export const WidgetExplorerFeat: FC<Props> = ({ widgets = mockWidgets }) => {
	const insets = useSafeAreaInsets();
	const container: ViewStyle = { ...styles.container, marginTop: insets.top };

	return (
		<View style={container}>
			<View style={styles.topContainer}>
				<Text style={styles.title}>
					Explore the world&apos;s custom desing layout
				</Text>
			</View>
			<ScrollView>
				<View style={{ marginHorizontal: 15 }}>
					{widgets.map((widget) => (
						<WidgetItem key={widget._id} widget={widget} />
					))}
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 10,
	},
	topContainer: {
		alignItems: 'center',
		marginBottom: 5,
	},
	title: {
		fontSize: 18,
		fontWeight: '500',
		textAlign: 'center',
		maxWidth: 200,
	},
});

export default WidgetExplorerFeat;
