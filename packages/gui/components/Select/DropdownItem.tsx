import { type FC, useState } from 'react';
import { Image, StyleSheet, ViewStyle } from 'react-native';
import { StyleProp } from 'react-native';
import { Hoverable, Text, View } from '@walless/gui';
import { Check } from '@walless/icons';

interface Props {
	selected: boolean;
	name: string;
	icon: string;
	style: StyleProp<ViewStyle>;
	onPress: () => void;
}

const DropdownItem: FC<Props> = ({ selected, name, icon, onPress, style }) => {
	const [isHover, setIsHover] = useState(false);
	const iconSrc = { uri: icon };

	const containerStyle = [
		styles.itemButton,
		isHover && { backgroundColor: '#1F2A34' },
		style,
	];

	return (
		<Hoverable
			onPress={onPress}
			onHoverIn={() => setIsHover(true)}
			onHoverOut={() => setIsHover(false)}
			style={containerStyle}
		>
			<Image source={iconSrc} style={styles.icon} />
			<Text style={[styles.text, isHover && { color: '#FFFFFF' }]}>{name}</Text>
			{selected && (
				<View style={styles.checkIcon}>
					<Check size={16} color="#566674" />
				</View>
			)}
		</Hoverable>
	);
};

const styles = StyleSheet.create({
	itemButton: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		gap: 9,
		paddingVertical: 12,
		paddingHorizontal: 7,
		borderRadius: 11,
		width: 320,
		height: 40,
	},
	icon: {
		width: 18,
		height: 18,
		borderRadius: 8,
	},
	text: {
		color: '#566674',
		fontSize: 14,
	},
	checkIcon: {
		marginLeft: 'auto',
	},
});

export default DropdownItem;
