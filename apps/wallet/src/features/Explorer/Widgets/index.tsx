import type { FC } from 'react';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { WidgetCategory } from '@walless/core';
import { Text } from '@walless/gui';
import type { WidgetDocument } from '@walless/store';

import CategoryButtons from './CategoryButtons';
import WidgetItem from './WidgetItem';

interface Props {
	widgets: WidgetDocument[];
}

const Widgets: FC<Props> = ({ widgets }) => {
	const [renderedWidgets, setRenderedWidgets] = useState<WidgetDocument[]>(
		widgets.filter((widget) => widget.category === WidgetCategory.NETWORK),
	);

	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<Text style={styles.title}>Enhance your collection</Text>
				<Text style={styles.description}>
					Evolving your worlds filled with exciting events
				</Text>
			</View>

			<CategoryButtons widgets={widgets} setWidgets={setRenderedWidgets} />

			<ScrollView
				style={styles.layoutList}
				contentContainerStyle={styles.listStyle}
				showsVerticalScrollIndicator={false}
			>
				{renderedWidgets.length === 0 ? (
					<Text style={styles.noWidgetsText}>
						There&apos;s no widgets in this section
					</Text>
				) : (
					renderedWidgets.map((widget) => (
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
		marginTop: 32,
		paddingHorizontal: 16,
	},
	titleContainer: {
		gap: 4,
	},
	title: {
		fontSize: 18,
		fontWeight: '500',
		color: '#ffffff',
	},
	description: {
		fontSize: 13,
		color: '#A4B3C1',
	},
	layoutList: {
		height: 340,
	},
	listStyle: {
		gap: 20,
	},
	noWidgetsText: {
		color: '#ffffff',
	},
});
