import type { FC } from 'react';
import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Text, View } from '@walless/gui';
import { Exclamation } from '@walless/icons';

interface Props {
	name: string;
	description: string;
}

const ToolDescription: FC<Props> = ({ name, description }) => {
	const [hovered, setHovered] = useState(false);

	return (
		<Pressable
			style={styles.container}
			onHoverIn={() => setHovered(true)}
			onHoverOut={() => setHovered(false)}
		>
			<Text style={styles.title} numberOfLines={1}>
				{name}
			</Text>
			<View style={styles.descriptionContainer}>
				{hovered && (
					<View style={styles.popup}>
						<Text style={styles.text}>{description}</Text>
						<View style={styles.popupArrow} />
					</View>
				)}
				<Exclamation size={12} color="#FFFFFF4D" />
			</View>
		</Pressable>
	);
};

export default ToolDescription;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	title: {
		color: '#ffffff',
		fontSize: 16,
	},
	descriptionContainer: {
		position: 'relative',
	},
	popup: {
		width: 200,
		padding: 12,
		borderRadius: 10,
		position: 'absolute',
		bottom: 'calc(100% + 12px)',
		left: -94,
		backgroundColor: '#19232C',
		shadowColor: 'rgba(0, 0, 0, 0.5)',
		shadowRadius: 12,
		alignItems: 'center',
	},
	popupArrow: {
		position: 'absolute',
		bottom: -6,
		transform: [
			{
				rotate: '45deg',
			},
		],
		width: 12,
		height: 12,
		borderRadius: 3,
		backgroundColor: '#19232C',
	},
	text: {
		fontSize: 13,
		textAlign: 'center',
	},
});
