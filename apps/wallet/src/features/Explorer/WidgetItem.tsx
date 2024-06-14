import type { FC } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import { runtime } from '@walless/core';
import { Hoverable, Text, View } from '@walless/gui';
import type { WidgetDocument } from '@walless/store';
import assets from 'utils/assets';
import { navigate } from 'utils/navigation';
import { addWidgetToStorage } from 'utils/storage';

interface Props {
	style?: StyleProp<ViewStyle>;
	widget: WidgetDocument;
	isAdded: boolean;
}

const ExplorerWidgetItem: FC<Props> = ({ style, widget, isAdded }) => {
	const coverImgResource = runtime.isMobile
		? assets.widget[widget._id]?.storeMeta.coverUri
		: { uri: widget.storeMeta.coverUri };

	const logoImgResource = runtime.isMobile
		? assets.widget[widget._id]?.storeMeta.iconUri
		: { uri: widget.storeMeta.iconUri };

	const onAddBtnPress = () => {
		addWidgetToStorage(widget._id, widget);
		navigate('Dashboard', {
			screen: 'Explore',
			params: {
				screen: 'Widget',
				params: { screen: 'Default', params: { id: widget._id } },
			},
		});
	};

	const btnWidth = runtime.isMobile ? { width: 80 } : { width: '50%' };

	return (
		<View horizontal style={[styles.container, style]}>
			<View style={styles.coverContainer}>
				<Image source={coverImgResource} style={styles.coverImg} />
				<Image source={logoImgResource} style={styles.logoImg} />
			</View>
			<View style={styles.detailContainer}>
				<View style={{ gap: 5 }}>
					<Text style={styles.title}>{widget.name}</Text>
					<Text style={styles.normalText} numberOfLines={2}>
						{widget.storeMeta.description}
					</Text>
					{/* NOTE: uncomment the below block if we have loveCount and activeCount */}
					{/* <View horizontal style={{ gap: 10 }}>
						<View horizontal style={styles.subContainer}>
							<Heart colors={['red', 'red']} size={10} />
							<Text style={styles.normalText}>0 love</Text>
						</View>
						<View horizontal style={styles.subContainer}>
							<View style={styles.activeIndicator} />
							<Text style={styles.normalText}>0 active</Text>
						</View>
					</View> */}
				</View>

				<Hoverable style={[styles.addBtn, btnWidth]} onPress={onAddBtnPress}>
					<Text style={styles.addText}>{isAdded ? 'Open' : 'Add'}</Text>
				</Hoverable>
			</View>
		</View>
	);
};

export default ExplorerWidgetItem;

const styles = StyleSheet.create({
	container: {
		paddingVertical: 15,
		borderBottomWidth: 1,
		borderBottomColor: '#24303A',
	},
	coverContainer: {
		position: 'relative',
	},
	coverImg: {
		width: 150,
		height: 100,
		borderRadius: 10,
	},
	logoImg: {
		position: 'absolute',
		right: 5,
		bottom: 5,
		width: 30,
		height: 30,
		aspectRatio: 1,
		borderRadius: 6,
	},
	detailContainer: {
		justifyContent: 'space-between',
		flex: 1,
		marginLeft: 20,
	},
	title: {
		fontSize: 16,
		fontWeight: '500',
		color: '#FFFFFF',
	},
	subContainer: {
		alignItems: 'center',
		gap: 5,
	},
	normalText: {
		color: '#798997',
	},
	subText: {
		opacity: 0.5,
	},
	activeIndicator: {
		height: 8,
		aspectRatio: 1,
		borderRadius: 7,
		backgroundColor: '#37B681',
	},
	addBtn: {
		borderRadius: 5,
		paddingVertical: 5,
		marginTop: 10,
		backgroundColor: '#0694D3',
		alignItems: 'center',
	},
	addText: {
		color: '#ffffff',
	},
});
