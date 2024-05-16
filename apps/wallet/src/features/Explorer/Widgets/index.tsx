import { StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import { mockLayoutCards } from 'browser/kernel/utils/mockExtension';

import CategoryButtons from './CategoryButtons';
import WidgetItem from './WidgetItem';

const Widgets = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Enhance your collection</Text>
			<CategoryButtons />
			<View style={styles.layoutList}>
				{mockLayoutCards.map((card) => (
					<WidgetItem
						key={card._id}
						coverImage={card.storeMeta.coverUri}
						title={card.name}
						description={card.storeMeta.description}
						activeCount={card.storeMeta.activeCount}
						loveCount={card.storeMeta.loveCount}
						onPress={() => {}}
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
