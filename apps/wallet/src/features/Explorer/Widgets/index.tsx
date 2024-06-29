import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { WidgetType } from '@walless/core';
import type { WidgetDocument } from '@walless/store';
import { mockWidgets } from 'state/widget';

import CategoryButtons from './CategoryButtons';
import WidgetItem from './WidgetItem';

const Widgets = () => {
	const [widgets, setWidgets] = useState<WidgetDocument[]>(
		mockWidgets.filter((item) => item.widgetType === WidgetType.NETWORK),
	);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Enhance your collection</Text>
			<CategoryButtons setWidgets={setWidgets} />
			<ScrollView
				style={styles.layoutList}
				contentContainerStyle={styles.listStyle}
				showsVerticalScrollIndicator={false}
			>
				{widgets.length === 0 ? (
					<Text style={styles.noWidgetsText}>
						There&apos;s no widgets in this section
					</Text>
				) : (
					widgets.map((widget) => (
						<WidgetItem key={widget._id} widget={widget} />
					))
				)}
			</ScrollView>
		</View>
	);
};

export default Widgets;

const styles = StyleSheet.create({
	container: {
		gap: 16,
		marginVertical: 8,
		paddingHorizontal: 16,
	},
	title: {
		fontSize: 18,
		fontWeight: '500',
		color: '#ffffff',
	},
	layoutList: {
		height: 340,
	},
	listStyle: {
		gap: 10,
	},
	noWidgetsText: {
		color: '#ffffff',
	},
});
