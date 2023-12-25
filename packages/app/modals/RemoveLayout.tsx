import type { FC } from 'react';
import type { ViewStyle } from 'react-native';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import type { ModalConfigs } from '@walless/gui';
import { modalActions, Text, View } from '@walless/gui';
import { BackspaceRemove } from '@walless/icons';
import { modules } from '@walless/ioc';
import type { WidgetDocument } from '@walless/store';

export interface RemoveContextProps {
	item: WidgetDocument;
}

export const RemoveLayout: FC<{
	config: ModalConfigs;
	onRemoveLayout?: (item: WidgetDocument) => void;
}> = ({ config, onRemoveLayout }) => {
	const { item } = config.context as RemoveContextProps;

	const handleRemoveLayout = () => {
		onRemoveLayout?.(item);
		modalActions.destroy(`navigator-orb-${item._id}`);
	};

	const imageBackground: ViewStyle = {
		justifyContent: 'center',
		alignItems: 'center',
		width: 36,
		height: 36,
		borderRadius: 6,
		backgroundColor: item.networkMeta?.iconColor || 'white',
	};

	return (
		<TouchableOpacity style={styles.container} onPress={handleRemoveLayout}>
			<View style={styles.layoutInfoContainer}>
				<View style={imageBackground}>
					<Image
						source={modules.asset.widget[item._id].widgetMeta.cardIcon}
						alt="network logo"
						style={styles.image}
					/>
				</View>
				<Text style={styles.layoutTitle}>{item.name}</Text>
			</View>
			<View style={styles.separatingLine} />
			<View style={styles.removeCTAContainer}>
				<Text style={styles.removeButton}>Remove this layout</Text>
				<BackspaceRemove />
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#00080E',
		width: 194,
		height: 94,
		borderRadius: 8,
		paddingVertical: 12,
		paddingHorizontal: 8,
		gap: 6,
	},
	layoutInfoContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
	layoutTitle: {
		fontSize: 12,
		fontWeight: '500',
	},
	removeButton: {
		fontSize: 10,
		fontWeight: '400',
		color: '#587A90',
	},
	separatingLine: {
		backgroundColor: '#203C4E',
		width: 180,
		height: 1,
	},
	removeCTAContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	image: {
		width: 20,
		height: 20,
	},
});

export default RemoveLayout;
