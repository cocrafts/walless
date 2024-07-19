import type { FC } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from '@walless/gui';
import type { WidgetDocument } from '@walless/store';

interface Props {
	widget: WidgetDocument;
}

const PixeverseCard: FC<Props> = ({ widget }) => {
	return (
		<View style={styles.container}>
			<View>
				<Image
					style={styles.coverImage}
					source={{ uri: widget.storeMeta.coverUri }}
				/>
				<Image
					style={styles.iconImage}
					source={{ uri: widget.storeMeta.iconUri }}
				/>
			</View>

			<View style={styles.infoContainer}>
				<Text style={styles.title}>Pixeverse</Text>

				<Text
					style={[styles.description]}
					numberOfLines={2}
					ellipsizeMode="tail"
				>
					{widget.storeMeta.description}
				</Text>

				<View style={styles.addButton}>
					<Text style={styles.buttonText}>Add</Text>
				</View>
			</View>
		</View>
	);
};

export default PixeverseCard;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		backgroundColor: '#182027',
		paddingHorizontal: 12,
		paddingVertical: 12,
		borderRadius: 12,
		gap: 12,
	},
	coverImage: {
		width: 112,
		height: 80,
		borderRadius: 8,
	},
	iconImage: {
		position: 'absolute',
		bottom: 4,
		right: 4,
		width: 28,
		height: 28,
		borderRadius: 4,
	},
	infoContainer: {
		flex: 1,
		justifyContent: 'space-between',
	},
	title: {
		color: '#ffffff',
		fontWeight: '500',
	},
	description: {
		fontSize: 10,
		color: '#566674',
	},
	addButton: {
		backgroundColor: '#198CCA',
		paddingHorizontal: 16,
		paddingVertical: 4,
		borderColor: '#17A3E1',
		borderWidth: 1,
		borderRadius: 8,
		width: 'fit-content',
	},
	buttonText: {
		color: '#ffffff',
		fontWeight: '500',
	},
});
