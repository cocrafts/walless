import type { FC, RefObject } from 'react';
import type { ViewStyle } from 'react-native';
import { View } from 'react-native';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import type { ModalConfigs } from '@walless/gui';
import {
	AnimateDirections,
	BindDirections,
	modalActions,
	Text,
} from '@walless/gui';
import { BackspaceRemove } from '@walless/icons';
import type { WidgetDocument } from '@walless/store';
import assets from 'utils/assets';

import { ModalId } from './types';

interface RemoveLayoutModalContext {
	item: WidgetDocument;
	onRemoveLayout: (item: WidgetDocument) => void;
}

interface RemoveLayoutModalProps {
	context: RemoveLayoutModalContext;
	orbSize: number;
	bindingRef: RefObject<View>;
}

const RemoveLayoutModal: FC<{
	config: ModalConfigs;
}> = ({ config }) => {
	const { item, onRemoveLayout } = config.context as RemoveLayoutModalContext;

	const handleRemoveLayout = () => {
		onRemoveLayout?.(item);
		modalActions.destroy(config.id as string);
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
						source={assets.widget[item._id].widgetMeta.cardIcon}
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

export const showRemoveLayoutModal = (props: RemoveLayoutModalProps) => {
	modalActions.show({
		id: ModalId.RemoveLayout,
		component: RemoveLayoutModal,
		bindingDirection: BindDirections.Right,
		animateDirection: AnimateDirections.Right,
		bindingRef: props.bindingRef,
		positionOffset: { y: props.orbSize / 2 },
		context: props.context,
	});
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
