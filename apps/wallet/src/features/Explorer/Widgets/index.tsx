import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { WidgetType } from '@walless/core';
import { Text, View } from '@walless/gui';
import type { WidgetDocument } from '@walless/store';
import { mockWidgets } from 'state/widget';
import { useWidgets } from 'utils/hooks';
import { navigate } from 'utils/navigation';
import { addWidgetToStorage } from 'utils/storage';

import CategoryButtons from './CategoryButtons';
import WidgetItem from './WidgetItem';

const Widgets = () => {
	const [widgets, setWidgets] = useState<WidgetDocument[]>(
		mockWidgets.filter((item) => item.widgetType === WidgetType.NETWORK),
	);

	const activeWidgets = useWidgets().map((widget) => widget._id);

	const handleOpenWidget = (id: string) => {
		navigate('Dashboard', {
			screen: 'Explore',
			params: { screen: 'Widget', params: { id } },
		});
	};
	const handleAddWidget = (widget: WidgetDocument) => {
		addWidgetToStorage(widget._id, widget);
		handleOpenWidget(widget._id);
	};

	console.log('widgets', widgets);

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Enhance your collection</Text>
			<CategoryButtons setWidgets={setWidgets} />
			<View style={styles.layoutList}>
				{widgets.map((card) => (
					<WidgetItem
						key={card._id}
						coverImage={card.storeMeta.coverUri}
						title={card.name}
						description={card.storeMeta.description}
						activeCount={card.storeMeta.activeCount}
						loveCount={card.storeMeta.loveCount}
						isAdded={activeWidgets.includes(card._id)}
						onPress={() => {
							if (activeWidgets.includes(card._id)) {
								handleOpenWidget(card._id);
								return;
							}
							handleAddWidget(card);
						}}
					/>
				))}
			</View>
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
		gap: 10,
	},
});
