import { type FC } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { modalActions, Text, View } from '@walless/gui';
import { ModalConfigs } from '@walless/gui';
import { ExtensionDocument } from '@walless/store';
import { db } from 'utils/pouch';
import { router } from 'utils/routing';

import RemoveSymbol from './RemoveSymbol';

const RemoveLayout: FC<{ config: ModalConfigs }> = ({ config }) => {
	const { name, networkMeta, _id } = config.context as ExtensionDocument;
	const removeLayout = async () => {
		config.context._deleted = true;
		await db.put(config.context);
		await router.navigate('/');
		modalActions.destroy(`navigator-orb-${_id}`);
	};
	const imageBackground = {
		justifyContent: 'center',
		alignItems: 'center',
		width: 36,
		height: 36,
		borderRadius: 6,
		backgroundColor: networkMeta?.iconColor || 'white',
	};

	return (
		<TouchableOpacity style={styles.container} onPress={removeLayout}>
			<View style={styles.layoutInfoContainer}>
				<View style={imageBackground}>
					<Image
						source={{ uri: networkMeta?.iconUri }}
						alt=""
						style={styles.image}
					/>
				</View>
				<Text style={styles.layoutTitle}>{name}</Text>
			</View>
			<View style={styles.separatingLine} />
			<View style={styles.removeCTAContainer}>
				<Text style={styles.removeButton}>Remove this layout</Text>
				<RemoveSymbol />
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
		alignItems: 'baseline',
		justifyContent: 'space-between',
	},
	image: {
		width: 20,
		height: 20,
	},
});

export default RemoveLayout;
