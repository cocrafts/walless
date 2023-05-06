import { type FC } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ModalConfigs } from '@walless/gui';
import { ExtensionDocument } from '@walless/store';

import RemoveSymbol from './RemoveSymbol';

interface Props {
	name: string;
}

const RemoveLayout: FC<{ config: ModalConfigs }> = ({ config }) => {
	const { name } = config.context as ExtensionDocument;
	return (
		<View style={styles.container}>
			<View style={styles.layoutInfoContainer}>
				<Image
					source={{ uri: '/img/app_logo.png' }}
					alt=""
					style={styles.image}
				/>
				{name}
			</View>
			<View style={styles.separatingLine} />
			<View style={styles.removeCTAContainer}>
				Remove this layout
				<RemoveSymbol />
			</View>
		</View>
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
	closeSymbolContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		width: 40,
		height: 40,
	},
});

export default RemoveLayout;
