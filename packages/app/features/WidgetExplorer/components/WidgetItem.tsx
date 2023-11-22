import type { FC } from 'react';
import { Image, StyleSheet } from 'react-native';
import { runtime } from '@walless/core';
import { Hoverable, Text, View } from '@walless/gui';
import { Heart } from '@walless/icons';
import { modules, utils } from '@walless/ioc';
import type { WidgetDocument } from '@walless/store';
import { addWidgetToStorage } from '@walless/store';

interface Props {
	widget: WidgetDocument;
}

export const WidgetItem: FC<Props> = ({ widget }) => {
	const coverImgResource = runtime.isMobile
		? modules.asset.widget[widget._id]?.storeMeta.coverUri
		: { uri: widget.storeMeta.coverUri };

	const logoImgResource = runtime.isMobile
		? modules.asset.widget[widget._id]?.storeMeta.iconUri
		: { uri: widget.storeMeta.iconUri };

	const onAddBtnPress = () => {
		addWidgetToStorage(widget._id, widget);
		utils.navigateToWidget(widget._id);
	};

	return (
		<View horizontal style={styles.container}>
			<View style={styles.coverContainer}>
				<Image source={coverImgResource} style={styles.coverImg} />
				<Image source={logoImgResource} style={styles.logoImg} />
			</View>
			<View style={styles.detailContainer}>
				<View style={{ gap: 5 }}>
					<Text style={styles.title}>{widget.name}</Text>
					<Text style={styles.normalText} numberOfLines={1}>
						{widget.storeMeta.description}
					</Text>
					<View horizontal style={{ gap: 10 }}>
						<View horizontal style={styles.subContainer}>
							<Heart colors={['red', 'red']} size={10} />
							<Text style={styles.normalText}>20k love</Text>
						</View>
						<View horizontal style={styles.subContainer}>
							<View style={styles.activeIndicator} />
							<Text style={styles.normalText}>20k love</Text>
						</View>
					</View>
				</View>

				<Hoverable style={styles.addBtn} onPress={onAddBtnPress}>
					<Text>Add</Text>
				</Hoverable>
			</View>
		</View>
	);
};

export default WidgetItem;

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
	},
	detailContainer: {
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
	activeIndicator: {
		height: 8,
		aspectRatio: 1,
		borderRadius: 7,
		backgroundColor: '#37B681',
	},
	addBtn: {
		width: '50%',
		borderRadius: 5,
		paddingVertical: 5,
		marginTop: 10,
		backgroundColor: '#0694D3',
		alignItems: 'center',
	},
});
