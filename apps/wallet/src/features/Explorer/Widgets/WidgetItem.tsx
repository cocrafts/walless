import type { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { runtime } from '@walless/core';
import { Text } from '@walless/gui';
import type { WidgetDocument } from '@walless/store';
import assets from 'utils/assets';
import { useWidgets } from 'utils/hooks';
import { navigate } from 'utils/navigation';
import { addWidgetToStorage } from 'utils/storage';

interface WidgetItemProps {
	widget: WidgetDocument;
}

const WidgetItem: FC<WidgetItemProps> = ({ widget }) => {
	const coverImgResource = runtime.isMobile
		? assets.widget[widget._id]?.storeMeta.coverUri
		: { uri: widget.storeMeta.coverUri };

	const addedWidgets = useWidgets().map((widget) => widget._id);
	const isAdded = addedWidgets.includes(widget._id);

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

	const handleOnPress = () => {
		if (isAdded) {
			handleOpenWidget(widget._id);
		} else handleAddWidget(widget);
	};

	return (
		<View style={styles.container}>
			<Image style={styles.coverImage} source={coverImgResource} />
			<View style={styles.middlePart}>
				<Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
					{widget.name}
				</Text>
				<Text style={styles.description} numberOfLines={2} ellipsizeMode="tail">
					{widget.storeMeta.description}
				</Text>
				{/* <View style={styles.loveAndActiveContainer}>
					<View style={styles.loveAndActiveDisplay}>
						<Heart colors={['#D93737', '#D93737']} size={12} />
						<Text style={styles.loveText}>{widget.storeMeta.loveCount}</Text>
					</View>
					<View style={styles.loveAndActiveDisplay}>
						<View style={styles.activeIcon} />
						<Text style={styles.activeText}>
							{widget.storeMeta.activeCount}
						</Text>
					</View>
				</View> */}
			</View>
			<TouchableOpacity
				style={[styles.button, isAdded ? styles.openBtn : styles.addBtn]}
				onPress={handleOnPress}
			>
				<Text style={isAdded ? styles.openBtnText : styles.addBtnText}>
					{isAdded ? 'Open' : 'Add'}
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default WidgetItem;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
	},
	coverImage: {
		width: 75,
		height: 50,
		borderRadius: 6,
	},
	middlePart: {
		flex: 1,
		gap: 4,
	},
	title: {
		color: '#ffffff',
		fontSize: 14,
		fontWeight: '500',
	},
	loveAndActiveContainer: {
		flexDirection: 'row',
		gap: 10,
	},
	loveAndActiveDisplay: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 4,
	},
	activeIcon: {
		width: 10,
		height: 10,
		borderRadius: 6,
		backgroundColor: '#37B681',
	},
	activeText: {
		color: '#37B681',
		fontSize: 10,
	},
	loveText: {
		color: '#4E5C69',
		fontSize: 10,
	},
	button: {
		alignSelf: 'center',
		borderRadius: 8,
		width: 62,
		height: 30,
		justifyContent: 'center',
		alignItems: 'center',
	},
	addBtn: {
		backgroundColor: '#19A3E1',
	},
	openBtn: {
		backgroundColor: '#2D3C4A',
	},
	openBtnText: {
		color: '#19A3E1',
		fontSize: 12,
		fontWeight: '500',
	},
	addBtnText: {
		color: '#ffffff',
		fontSize: 12,
		fontWeight: '500',
	},
	description: {
		color: '#566573',
		fontSize: 12,
	},
});
